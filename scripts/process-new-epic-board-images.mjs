import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// The fish's second photo is another deck angle, not an underside photo.
const sourceDir = process.env.NEW_EPIC_BOARD_SOURCE_DIR || "C:/Users/TpaBa/Desktop/New Epic Boards";
const outputDir = process.env.RENTAL_BOARD_OUTPUT_DIR || "public/rentals/boards/processed";
const boards = [
  { id: "board-13", photos: ["New_Epic_Fish_1.jpg", "New_Epic_Fish_2.jpg"], tail: { left: .35, top: .70, width: .44, height: .20 } },
  { id: "board-14", photos: ["New_Epic_Long_1.jpg", "New_Epic_Long_2.jpg"], tail: { left: .30, top: .74, width: .45, height: .24 } },
  { id: "board-15", photos: ["New_Epic_SingleFin_1.jpg", "New_Epic_SingleFin_2.jpg"], tail: { left: .29, top: .75, width: .46, height: .23 } },
];

const report = [];
for (const board of boards) {
  const dir = path.join(outputDir, board.id);
  await fs.mkdir(dir, { recursive: true });
  const [front, back] = await Promise.all(board.photos.map(file => sharp(path.join(sourceDir, file)).autoOrient().toBuffer()));
  const tailSource = board.id === "board-13" ? front : back;
  const metadata = await sharp(tailSource).metadata();
  const crop = Object.fromEntries(Object.entries(board.tail).map(([key, value]) => [key, Math.round(value * (key === "left" || key === "width" ? metadata.width : metadata.height))]));
  const tail = await sharp(tailSource).extract(crop).toBuffer();
  const assets = [
    { name: "front", input: front, size: 1200, square: true },
    { name: "back", input: back, size: 1200, square: true },
    { name: "fins", input: tail, size: 960, square: true, fit: "cover" },
    { name: "thumb", input: front, size: 320, square: true },
    { name: "front-full", input: front, size: 2400 },
    { name: "back-full", input: back, size: 2400 },
    { name: "fins-full", input: tail, size: 1440, square: true, fit: "cover" },
  ];
  for (const asset of assets) {
    // Square frames keep the entire board visible in existing mobile and desktop cover slots.
    const output = path.join(dir, `${asset.name}.webp`);
    const result = await sharp(asset.input)
      .resize(asset.square ? { width: asset.size, height: asset.size, fit: asset.fit || "contain", background: "#2E2E2E", withoutEnlargement: true } : { height: asset.size, withoutEnlargement: true })
      .webp({ quality: asset.name === "thumb" ? 74 : asset.name.endsWith("full") ? 82 : 78, effort: 6 })
      .toFile(output);
    report.push({ board: board.id, asset: asset.name, width: result.width, height: result.height, bytes: result.size });
  }
}
console.log(JSON.stringify(report, null, 2));
