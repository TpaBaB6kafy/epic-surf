import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";

import {
  buildBoardJobs,
  buildContactSheetPath,
  buildOutputPaths,
  chooseAssetSourceSide,
  chooseSourceSide,
  mergeCropPresets,
} from "../scripts/process-rental-board-images.mjs";

test("buildBoardJobs pairs front and back files case-insensitively", () => {
  const files = [
    "Epic_1_front.JPG",
    "Epic_1_Back.JPG",
    "Epic_2_Back.jpg",
    "Epic_3_front.png",
    "ignored.txt",
  ];

  const jobs = buildBoardJobs({ files, sourceDir: "C:\\source", boardIds: [1, 2, 3] });

  assert.deepEqual(
    jobs.map((job) => ({
      id: job.id,
      boardSlug: job.boardSlug,
      front: job.sources.front && path.basename(job.sources.front),
      back: job.sources.back && path.basename(job.sources.back),
      missing: job.missing,
    })),
    [
      {
        id: 1,
        boardSlug: "board-01",
        front: "Epic_1_front.JPG",
        back: "Epic_1_Back.JPG",
        missing: [],
      },
      {
        id: 2,
        boardSlug: "board-02",
        front: null,
        back: "Epic_2_Back.jpg",
        missing: ["front"],
      },
      {
        id: 3,
        boardSlug: "board-03",
        front: "Epic_3_front.png",
        back: null,
        missing: ["back"],
      },
    ],
  );
});

test("chooseSourceSide prefers front, falls back to back, and respects overrides", () => {
  assert.equal(chooseSourceSide({ front: "front.jpg", back: "back.jpg" }, 1, {}), "front");
  assert.equal(chooseSourceSide({ front: null, back: "back.jpg" }, 2, {}), "back");
  assert.equal(chooseSourceSide({ front: "front.jpg", back: "back.jpg" }, 3, { 3: "back" }), "back");
  assert.equal(chooseSourceSide({ front: "front.jpg", back: null }, 4, { 4: "back" }), "front");
  assert.equal(chooseSourceSide({ front: null, back: null }, 5, {}), null);
});

test("chooseAssetSourceSide supports asset-level defaults and board overrides", () => {
  const sources = { front: "front.jpg", back: "back.jpg" };
  const sourceOverrides = {
    "*": { fins: "back" },
    8: { nose: "back", fins: "front" },
  };

  assert.equal(chooseAssetSourceSide({ sources, boardId: 1, assetName: "main", mainSourceSide: "front", sourceOverrides }), "front");
  assert.equal(chooseAssetSourceSide({ sources, boardId: 1, assetName: "fins", mainSourceSide: "front", sourceOverrides }), "back");
  assert.equal(chooseAssetSourceSide({ sources, boardId: 8, assetName: "nose", mainSourceSide: "front", sourceOverrides }), "back");
  assert.equal(chooseAssetSourceSide({ sources, boardId: 8, assetName: "fins", mainSourceSide: "front", sourceOverrides }), "front");
  assert.equal(chooseAssetSourceSide({
    sources: { front: "front.jpg", back: null },
    boardId: 2,
    assetName: "fins",
    mainSourceSide: "front",
    sourceOverrides,
  }), "front");
});

test("buildOutputPaths creates the expected processed asset file names", () => {
  assert.deepEqual(buildOutputPaths("public/rentals/boards/processed", "board-09"), {
    main: path.join("public/rentals/boards/processed", "board-09", "main.webp"),
    nose: path.join("public/rentals/boards/processed", "board-09", "nose.webp"),
    tail: path.join("public/rentals/boards/processed", "board-09", "tail.webp"),
    fins: path.join("public/rentals/boards/processed", "board-09", "fins.webp"),
    thumb: path.join("public/rentals/boards/processed", "board-09", "thumb.webp"),
  });
});

test("buildContactSheetPath creates a review asset in the processed folder", () => {
  assert.equal(
    buildContactSheetPath("public/rentals/boards/processed"),
    path.join("public/rentals/boards/processed", "contact-sheet.webp"),
  );
});

test("mergeCropPresets applies board-level overrides without mutating defaults", () => {
  const defaults = {
    main: { width: 960, height: 1440, crop: { left: 0.2, top: 0.03, width: 0.6, height: 0.94 } },
    fins: { width: 800, height: 560, crop: { left: 0.2, top: 0.72, width: 0.6, height: 0.24 } },
  };

  const merged = mergeCropPresets(defaults, {
    7: { fins: { crop: { top: 0.68, height: 0.3 } } },
  }, 7);

  assert.equal(merged.fins.width, 800);
  assert.deepEqual(merged.fins.crop, { left: 0.2, top: 0.68, width: 0.6, height: 0.3 });
  assert.equal(defaults.fins.crop.top, 0.72);
});
