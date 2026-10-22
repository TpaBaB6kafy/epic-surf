import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test, afterEach } from "node:test";

const source = await readFile(new URL("../app/utils/metaPixel.js", import.meta.url), "utf8");
const { META_PIXEL_ID, trackMetaPageView } = await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);

afterEach(() => {
  delete globalThis.window;
  delete globalThis.document;
});

function browser(hostname = "www.surfdanang.com") {
  const scripts = [];
  globalThis.window = { location: { hostname } };
  globalThis.document = {
    createElement: () => ({}),
    querySelector: () => scripts[0] || null,
    head: { appendChild: (script) => scripts.push(script) },
  };
  return { scripts, calls: () => window.fbq.queue.map((args) => Array.from(args)) };
}

test("server rendering does not require browser globals", () => {
  assert.equal(trackMetaPageView("/"), false);
});

test("local, preview and unrelated domains never load the Pixel", () => {
  for (const host of ["localhost", "127.0.0.1", "epic-surf-preview.vercel.app", "surfdanang.com.example.org"]) {
    const { scripts } = browser(host);
    assert.equal(trackMetaPageView("/"), false);
    assert.equal(scripts.length, 0);
    assert.equal(window.fbq, undefined);
  }
});

test("production page views queue before the SDK loads, with one init and script", () => {
  const { scripts, calls } = browser();
  assert.equal(trackMetaPageView("/"), true);
  assert.equal(trackMetaPageView("/"), false);
  assert.equal(trackMetaPageView("/surfboard-rental-danang"), true);
  assert.equal(trackMetaPageView("/surfboard-rental-danang"), false);
  assert.equal(trackMetaPageView("/"), true);
  assert.equal(scripts.length, 1);
  assert.equal(scripts[0].src, "https://connect.facebook.net/en_US/fbevents.js");
  assert.equal(scripts[0].async, true);
  assert.deepEqual(calls(), [
    ["init", META_PIXEL_ID],
    ["trackSingle", META_PIXEL_ID, "PageView"],
    ["trackSingle", META_PIXEL_ID, "PageView"],
    ["trackSingle", META_PIXEL_ID, "PageView"],
  ]);
});

test("SDK dispatch keeps working after load and an effect replay stays deduplicated", () => {
  browser("surfdanang.com");
  trackMetaPageView("/ru");
  const liveCalls = [];
  window.fbq.callMethod = (...args) => liveCalls.push(args);
  assert.equal(trackMetaPageView("/ru"), false);
  assert.equal(trackMetaPageView("/ru/partners"), true);
  assert.deepEqual(liveCalls, [["trackSingle", META_PIXEL_ID, "PageView"]]);
});

test("Meta history tracking is disabled before the SDK can install its listener", () => {
  browser();
  let disabledAtLoad = false;
  document.head.appendChild = () => {
    disabledAtLoad = window.fbq.disablePushState === true;
  };
  assert.equal(trackMetaPageView("/"), true);
  assert.equal(disabledAtLoad, true);
});

test("an existing SDK and fbq are reused", () => {
  const { scripts } = browser();
  scripts.push({ src: "https://connect.facebook.net/en_US/fbevents.js" });
  const calls = [];
  const existingFbq = (...args) => calls.push(args);
  window.fbq = existingFbq;
  assert.equal(trackMetaPageView("/vi/partners"), true);
  assert.equal(window.fbq, existingFbq);
  assert.equal(scripts.length, 1);
  assert.deepEqual(calls, [["init", META_PIXEL_ID], ["trackSingle", META_PIXEL_ID, "PageView"]]);
});

test("design-system pages and missing paths send nothing", () => {
  const { scripts } = browser();
  for (const path of [null, "", "/design-system", "/design-system/take-off"]) {
    assert.equal(trackMetaPageView(path), false);
  }
  assert.equal(scripts.length, 0);
});

test("script insertion and vendor errors do not escape into the page", () => {
  browser();
  document.head.appendChild = () => { throw new Error("script blocked"); };
  assert.equal(trackMetaPageView("/"), false);
  assert.equal(window.__epicMetaPixel.initialized, undefined);

  browser();
  window.fbq = () => { throw new Error("vendor unavailable"); };
  assert.equal(trackMetaPageView("/"), false);
  assert.equal(window.__epicMetaPixel.lastPathname, undefined);
});
