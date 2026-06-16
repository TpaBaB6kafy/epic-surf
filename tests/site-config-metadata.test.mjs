import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { pathToFileURL } from "node:url";

const socialImagePath = "/social/epic-surf-school-da-nang-og.jpg";
const socialImageUrl = "https://www.surfdanang.com/social/epic-surf-school-da-nang-og.jpg";
const socialImageAlt = "Epic Surf School Da Nang instructors and students at My Khe Beach";

let modulesPromise;

async function loadModules() {
  if (!modulesPromise) {
    modulesPromise = (async () => {
      const tempDir = await mkdtemp(path.join(tmpdir(), "epic-surf-metadata-"));

      const siteConfigSource = await readFile("app/data/siteConfig.js", "utf8");
      const siteConfigHarness = path.join(tempDir, "siteConfig.mjs");
      const linksUrl = pathToFileURL(path.resolve("app/data/links.js")).href;
      await writeFile(
        siteConfigHarness,
        siteConfigSource.replace('from "./links"', `from ${JSON.stringify(linksUrl)}`),
      );

      const siteConfigModule = await import(pathToFileURL(siteConfigHarness));

      return siteConfigModule;
    })();
  }

  return modulesPromise;
}

test("homepage metadata uses the Epic Surf School social preview image", async () => {
  const {
    absoluteUrl,
    buildMetadata,
    siteConfig,
  } = await loadModules();

  assert.equal(siteConfig.ogImage, socialImagePath);
  assert.equal(absoluteUrl(siteConfig.ogImage), socialImageUrl);

  for (const locale of ["en", "ru"]) {
    const metadata = buildMetadata(locale);
    const [openGraphImage] = metadata.openGraph.images;

    assert.deepEqual(openGraphImage, {
      url: socialImagePath,
      secureUrl: socialImageUrl,
      width: 1200,
      height: 630,
      type: "image/jpeg",
      alt: socialImageAlt,
    });
    assert.equal(metadata.twitter.card, "summary_large_image");
    assert.deepEqual(metadata.twitter.images, [
      {
        url: socialImagePath,
        alt: socialImageAlt,
      },
    ]);
    assert.equal(metadata.robots.googleBot["max-image-preview"], "large");
  }
});

test("homepage structured data references the social preview image", async () => {
  const { buildStructuredData } = await loadModules();

  for (const locale of ["en", "ru"]) {
    const structuredData = buildStructuredData(locale);
    const graph = structuredData["@graph"];
    const business = graph.find((item) => item["@id"] === "https://www.surfdanang.com/#business");
    const page = graph.find((item) => item["@id"].endsWith("#webpage"));

    assert.equal(business.image, socialImageUrl);
    assert.equal(page.image, socialImageUrl);
    assert.deepEqual(page.primaryImageOfPage, {
      "@type": "ImageObject",
      url: socialImageUrl,
      width: 1200,
      height: 630,
    });
  }
});
