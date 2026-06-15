import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);

export const SOURCE_DIR =
  process.env.RENTAL_BOARD_SOURCE_DIR || "C:\\Users\\TpaBa\\Desktop\\Epic_Sait\\FOTO\\Rental page";
export const BACK_DETAIL_SOURCE_DIR =
  process.env.RENTAL_BOARD_BACK_DETAIL_SOURCE_DIR || "C:\\Users\\TpaBa\\Desktop\\Epic_boards";
export const OUTPUT_DIR =
  process.env.RENTAL_BOARD_OUTPUT_DIR || path.join("public", "rentals", "boards", "processed");
export const BOARD_IDS = Array.from({ length: 12 }, (_, index) => index + 1);

export const preferredSourceByBoard = {
  // Example: 4: "back",
};

export const preferredSourceByAsset = {
  "*": {
    front: "front",
    back: "back",
    fins: "back",
  },
  // Example:
  // 7: {
  //   nose: "back",
  // },
};

export const cropPresets = {
  front: {
    width: 1200,
    height: 1800,
    quality: 76,
    fit: "inside",
  },
  back: {
    width: 1200,
    height: 1800,
    quality: 76,
    fit: "inside",
  },
  main: {
    width: 960,
    height: 1440,
    quality: 76,
    fit: "cover",
    crop: { left: 0.18, top: 0.02, width: 0.64, height: 0.96 },
  },
  nose: {
    width: 800,
    height: 560,
    quality: 74,
    fit: "cover",
    rotate: 90,
    crop: { left: 0.34, top: 0.16, width: 0.24, height: 0.34 },
  },
  tail: {
    width: 800,
    height: 560,
    quality: 74,
    fit: "cover",
    rotate: 90,
    crop: { left: 0.34, top: 0.56, width: 0.24, height: 0.34 },
  },
  fins: {
    width: 800,
    height: 560,
    quality: 74,
    fit: "cover",
    rotate: 90,
    crop: { left: 0.34, top: 0.6, width: 0.24, height: 0.34 },
  },
  thumb: {
    width: 320,
    height: 480,
    quality: 70,
    fit: "cover",
    crop: { left: 0.18, top: 0.02, width: 0.64, height: 0.96 },
  },
};

export const cropPresetsByBoard = {
  6: {
    fins: { crop: { left: 0.34, top: 0.58, width: 0.26, height: 0.36 } },
  },
  7: {
    fins: { crop: { left: 0.34, top: 0.58, width: 0.26, height: 0.36 } },
  },
  8: {
    fins: { crop: { left: 0.34, top: 0.58, width: 0.26, height: 0.36 } },
  },
  9: {
    fins: { crop: { left: 0.34, top: 0.58, width: 0.26, height: 0.36 } },
  },
};

export const backDetailCropPresets = {
  "back-nose": {
    width: 800,
    height: 560,
    quality: 78,
    fit: "cover",
    rotate: 90,
    crop: { left: 0.425, top: 0.08, width: 0.15, height: 0.37 },
  },
  "back-middle": {
    width: 800,
    height: 560,
    quality: 78,
    fit: "cover",
    rotate: 90,
    crop: { left: 0.425, top: 0.3, width: 0.15, height: 0.37 },
  },
  "back-tail-fins": {
    width: 800,
    height: 560,
    quality: 78,
    fit: "cover",
    rotate: 90,
    crop: { left: 0.425, top: 0.55, width: 0.15, height: 0.37 },
  },
};

export const backDetailCropPresetsByBoard = {
  1: {
    "back-nose": { crop: { left: 0.45 } },
    "back-middle": { crop: { left: 0.45 } },
    "back-tail-fins": { crop: { left: 0.45 } },
  },
};

const OUTPUT_FILE_NAMES = ["front", "back", "main", "nose", "tail", "fins", "thumb"];
const BACK_DETAIL_FILE_NAMES = ["back-nose", "back-middle", "back-tail-fins"];
const SOURCE_PATTERN = /^Epic_(\d+)_(front|back)\.(jpe?g|png)$/i;
const BACK_DETAIL_SOURCE_PATTERN = /^(\d+)\.(jpe?g|png|webp|tiff?|avif)$/i;
const CONTACT_SHEET_FILE_NAME = "contact-sheet.webp";
const BACK_DETAIL_CONTACT_SHEET_FILE_NAME = "back-details-contact-sheet.webp";

function boardSlug(boardId) {
  return `board-${String(boardId).padStart(2, "0")}`;
}

function deepMerge(base, override = {}) {
  const merged = { ...base };

  for (const [key, value] of Object.entries(override)) {
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      base[key] &&
      typeof base[key] === "object" &&
      !Array.isArray(base[key])
    ) {
      merged[key] = deepMerge(base[key], value);
    } else {
      merged[key] = value;
    }
  }

  return merged;
}

export function mergeCropPresets(defaults, overridesByBoard = {}, boardId) {
  const boardOverrides = overridesByBoard[boardId] || {};

  return Object.fromEntries(
    Object.entries(defaults).map(([assetName, preset]) => [
      assetName,
      deepMerge(preset, boardOverrides[assetName] || {}),
    ]),
  );
}

export function buildOutputPaths(outputDir, slug) {
  return Object.fromEntries(
    OUTPUT_FILE_NAMES.map((name) => [name, path.join(outputDir, slug, `${name}.webp`)]),
  );
}

export function buildBackDetailOutputPaths(outputDir, slug) {
  return Object.fromEntries(
    BACK_DETAIL_FILE_NAMES.map((name) => [name, path.join(outputDir, slug, `${name}.webp`)]),
  );
}

export function buildContactSheetPath(outputDir) {
  return path.join(outputDir, CONTACT_SHEET_FILE_NAME);
}

export function buildBackDetailContactSheetPath(outputDir) {
  return path.join(outputDir, BACK_DETAIL_CONTACT_SHEET_FILE_NAME);
}

export function chooseSourceSide(sources, boardId, preferredByBoard = {}) {
  const preferred = preferredByBoard[boardId];

  if (preferred && sources[preferred]) {
    return preferred;
  }

  if (sources.front) return "front";
  if (sources.back) return "back";

  return null;
}

export function chooseAssetSourceSide({
  sources,
  boardId,
  assetName,
  mainSourceSide,
  sourceOverrides = {},
}) {
  const boardOverrides = sourceOverrides[boardId] || {};
  const defaultOverrides = sourceOverrides["*"] || {};
  const preferred = boardOverrides[assetName] || defaultOverrides[assetName];

  if (preferred && sources[preferred]) {
    return preferred;
  }

  return mainSourceSide;
}

export function buildBoardJobs({ files, sourceDir, boardIds = BOARD_IDS }) {
  const grouped = new Map();

  for (const file of files) {
    const match = file.match(SOURCE_PATTERN);
    if (!match) continue;

    const id = Number(match[1]);
    const side = match[2].toLowerCase();
    const current = grouped.get(id) || { front: null, back: null };
    current[side] = path.join(sourceDir, file);
    grouped.set(id, current);
  }

  return boardIds.map((id) => {
    const sources = grouped.get(id) || { front: null, back: null };
    const missing = ["front", "back"].filter((side) => !sources[side]);

    return {
      id,
      boardSlug: boardSlug(id),
      sources,
      missing,
    };
  });
}

export function buildBackDetailJobs({ files, sourceDir, boardIds = BOARD_IDS }) {
  const sourcesByBoard = new Map();

  for (const file of files) {
    const match = file.match(BACK_DETAIL_SOURCE_PATTERN);
    if (!match) continue;

    const id = Number(match[1]);
    if (!sourcesByBoard.has(id)) sourcesByBoard.set(id, path.join(sourceDir, file));
  }

  return boardIds.map((id) => ({
    id,
    boardSlug: boardSlug(id),
    source: sourcesByBoard.get(id) || null,
    missing: !sourcesByBoard.has(id),
  }));
}

function clamp(number, min, max) {
  return Math.min(Math.max(number, min), max);
}

function cropToPixels(metadata, crop) {
  const sourceWidth = metadata.width;
  const sourceHeight = metadata.height;
  const left = clamp(Math.round(sourceWidth * crop.left), 0, sourceWidth - 1);
  const top = clamp(Math.round(sourceHeight * crop.top), 0, sourceHeight - 1);
  const width = clamp(Math.round(sourceWidth * crop.width), 1, sourceWidth - left);
  const height = clamp(Math.round(sourceHeight * crop.height), 1, sourceHeight - top);

  return { left, top, width, height };
}

async function renderAsset(sourcePath, outputPath, preset) {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });

  if (!preset.crop) {
    await sharp(sourcePath, { failOn: "none" })
      .rotate(preset.rotate || 0)
      .resize(preset.width, preset.height, {
        fit: preset.fit,
        position: "center",
        withoutEnlargement: true,
      })
      .webp({ quality: preset.quality, effort: 5 })
      .toFile(outputPath);
    return;
  }

  const source = sharp(sourcePath, { failOn: "none" });
  const metadata = await source.metadata();
  const extracted = await sharp(sourcePath, { failOn: "none" })
    .extract(cropToPixels(metadata, preset.crop))
    .toBuffer();

  await sharp(extracted, { failOn: "none" })
    .rotate(preset.rotate || 0)
    .resize(preset.width, preset.height, { fit: preset.fit, position: "center" })
    .webp({ quality: preset.quality, effort: 5 })
    .toFile(outputPath);
}

async function createContactSheet({ outputDir, results }) {
  const processed = results.filter((result) => !result.skipped);
  const cellWidth = 180;
  const cellHeight = 128;
  const labelHeight = 28;
  const gap = 10;
  const margin = 18;
  const columns = OUTPUT_FILE_NAMES.length;
  const width = margin * 2 + columns * cellWidth + (columns - 1) * gap;
  const rowHeight = labelHeight + cellHeight;
  const height = margin * 2 + processed.length * rowHeight + (processed.length - 1) * gap;
  const composites = [];

  for (let row = 0; row < processed.length; row += 1) {
    const result = processed[row];
    const outputPaths = buildOutputPaths(outputDir, result.boardSlug);
    const top = margin + row * (rowHeight + gap);
    const label = await sharp({
      create: {
        width: cellWidth,
        height: labelHeight,
        channels: 4,
        background: row % 2 === 0 ? "#2E2E2E" : "#585858",
      },
    })
      .webp({ quality: 82 })
      .toBuffer();

    composites.push({ input: label, left: margin, top });

    for (let column = 0; column < OUTPUT_FILE_NAMES.length; column += 1) {
      const assetName = OUTPUT_FILE_NAMES[column];
      const left = margin + column * (cellWidth + gap);
      const image = await sharp(outputPaths[assetName])
        .resize(cellWidth, cellHeight, { fit: "cover", position: "center" })
        .webp({ quality: 76 })
        .toBuffer();

      composites.push({ input: image, left, top: top + labelHeight });
    }
  }

  const outputPath = buildContactSheetPath(outputDir);
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: "#f6f6f6",
    },
  })
    .composite(composites)
    .webp({ quality: 82, effort: 5 })
    .toFile(outputPath);

  return outputPath;
}

async function createBackDetailContactSheet({ outputDir, results }) {
  const processed = results.filter((result) => !result.skipped);
  if (!processed.length) return null;

  const cellWidth = 320;
  const cellHeight = 224;
  const labelHeight = 28;
  const gap = 10;
  const margin = 18;
  const columns = BACK_DETAIL_FILE_NAMES.length;
  const width = margin * 2 + columns * cellWidth + (columns - 1) * gap;
  const rowHeight = labelHeight + cellHeight;
  const height = margin * 2 + processed.length * rowHeight + (processed.length - 1) * gap;
  const composites = [];

  for (let row = 0; row < processed.length; row += 1) {
    const result = processed[row];
    const outputPaths = buildBackDetailOutputPaths(outputDir, result.boardSlug);
    const top = margin + row * (rowHeight + gap);
    const label = await sharp({
      create: {
        width: cellWidth,
        height: labelHeight,
        channels: 4,
        background: row % 2 === 0 ? "#2E2E2E" : "#585858",
      },
    })
      .webp({ quality: 82 })
      .toBuffer();

    composites.push({ input: label, left: margin, top });

    for (let column = 0; column < BACK_DETAIL_FILE_NAMES.length; column += 1) {
      const assetName = BACK_DETAIL_FILE_NAMES[column];
      const left = margin + column * (cellWidth + gap);
      const image = await sharp(outputPaths[assetName])
        .resize(cellWidth, cellHeight, { fit: "cover", position: "center" })
        .webp({ quality: 76 })
        .toBuffer();

      composites.push({ input: image, left, top: top + labelHeight });
    }
  }

  const outputPath = buildBackDetailContactSheetPath(outputDir);
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: "#f6f6f6",
    },
  })
    .composite(composites)
    .webp({ quality: 82, effort: 5 })
    .toFile(outputPath);

  return outputPath;
}

async function processBoard(job, options) {
  const sourceSide = chooseSourceSide(job.sources, job.id, options.preferredSourceByBoard);

  if (!sourceSide) {
    return {
      ...job,
      skipped: true,
      reason: "missing both front and back",
      created: [],
      sourceSide: null,
    };
  }

  const presets = mergeCropPresets(options.cropPresets, options.cropPresetsByBoard, job.id);
  const outputPaths = buildOutputPaths(options.outputDir, job.boardSlug);
  const sourcePath = job.sources[sourceSide];
  const created = [];

  for (const assetName of OUTPUT_FILE_NAMES) {
    const assetSourceSide = chooseAssetSourceSide({
      sources: job.sources,
      boardId: job.id,
      assetName,
      mainSourceSide: sourceSide,
      sourceOverrides: options.preferredSourceByAsset,
    });
    await renderAsset(job.sources[assetSourceSide] || sourcePath, outputPaths[assetName], presets[assetName]);
    created.push(outputPaths[assetName]);
  }

  return {
    ...job,
    skipped: false,
    created,
    sourceSide,
  };
}

export async function processRentalBoardImages({
  sourceDir = SOURCE_DIR,
  outputDir = OUTPUT_DIR,
  boardIds = BOARD_IDS,
  preferredSourceByBoard: preferred = preferredSourceByBoard,
  preferredSourceByAsset: preferredByAsset = preferredSourceByAsset,
  cropPresets: presets = cropPresets,
  cropPresetsByBoard: presetOverrides = cropPresetsByBoard,
} = {}) {
  const files = await fs.readdir(sourceDir);
  const jobs = buildBoardJobs({ files, sourceDir, boardIds });
  const results = [];

  for (const job of jobs) {
    results.push(
      await processBoard(job, {
        outputDir,
        preferredSourceByBoard: preferred,
        preferredSourceByAsset: preferredByAsset,
        cropPresets: presets,
        cropPresetsByBoard: presetOverrides,
      }),
    );
  }

  const contactSheet = await createContactSheet({ outputDir, results });
  results.contactSheet = contactSheet;

  return results;
}

export async function processBackDetailImages({
  sourceDir = BACK_DETAIL_SOURCE_DIR,
  outputDir = OUTPUT_DIR,
  boardIds = BOARD_IDS,
  cropPresets: presets = backDetailCropPresets,
  cropPresetsByBoard: presetOverrides = backDetailCropPresetsByBoard,
} = {}) {
  const files = await fs.readdir(sourceDir);
  const jobs = buildBackDetailJobs({ files, sourceDir, boardIds });
  const results = [];

  for (const job of jobs) {
    if (!job.source) {
      results.push({ ...job, skipped: true, reason: "new back source image not found", created: [] });
      continue;
    }

    const boardPresets = mergeCropPresets(presets, presetOverrides, job.id);
    const outputPaths = buildBackDetailOutputPaths(outputDir, job.boardSlug);
    const created = [];

    for (const assetName of BACK_DETAIL_FILE_NAMES) {
      await renderAsset(job.source, outputPaths[assetName], boardPresets[assetName]);
      created.push(outputPaths[assetName]);
    }

    results.push({ ...job, skipped: false, created });
  }

  results.contactSheet = await createBackDetailContactSheet({ outputDir, results });
  return results;
}

function printSummary(results) {
  const processed = results.filter((result) => !result.skipped);
  const skipped = results.filter((result) => result.skipped);

  console.log(`Processed boards: ${processed.length}`);
  for (const result of processed) {
    const missing = result.missing.length ? `; missing ${result.missing.join(", ")}` : "";
    console.log(`- ${result.boardSlug}: ${result.sourceSide}${missing}`);
    for (const file of result.created) {
      console.log(`  ${file}`);
    }
  }

  if (results.contactSheet) {
    console.log(`Contact sheet: ${results.contactSheet}`);
  }

  if (skipped.length) {
    console.log("Skipped boards:");
    for (const result of skipped) {
      console.log(`- ${result.boardSlug}: ${result.reason}`);
    }
  }
}

function printBackDetailSummary(results) {
  const processed = results.filter((result) => !result.skipped);
  const skipped = results.filter((result) => result.skipped);

  console.log(`Processed new back detail boards: ${processed.length}`);
  for (const result of processed) {
    console.log(`- ${result.boardSlug}: ${result.source}`);
    for (const file of result.created) console.log(`  ${file}`);
  }

  if (results.contactSheet) console.log(`Back detail contact sheet: ${results.contactSheet}`);

  if (skipped.length) {
    console.log("Skipped new back detail boards:");
    for (const result of skipped) console.log(`- ${result.boardSlug}: ${result.reason}`);
  }
}

if (process.argv[1] === __filename) {
  Promise.all([processRentalBoardImages(), processBackDetailImages()])
    .then(([results, backDetailResults]) => {
      printSummary(results);
      printBackDetailSummary(backDetailResults);
    })
    .catch((error) => {
      console.error(error);
      process.exitCode = 1;
    });
}
