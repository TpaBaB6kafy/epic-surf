import sharp from 'sharp';
import { mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
// Originals are read only; preserve proportions and EXIF orientation.
const folders = process.argv.slice(2);
if (folders.length !== 2) throw new Error('Supply Umka and surf source folders');
const records = [];
await mkdir('qa-output/gallery', { recursive: true });
for (const [albumIndex, folder] of folders.entries()) {
  const album = ['umka-party', 'surf-life'][albumIndex];
  const files = (await readdir(folder)).filter(name => /\.jpe?g$/i.test(name)).sort();
  await mkdir(`public/gallery/${album}`, { recursive: true });
  const thumbs = [];
  for (const [index, name] of files.entries()) {
    const input = path.join(folder, name);
    const id = `${album}-${String(index + 1).padStart(2, '0')}`;
    const metadata = await sharp(input).metadata();
    const variants = [];
    for (const [size, quality] of [[480, 80], [960, 82], [2400, 86]]) {
      const src = `/gallery/${album}/${id}-${size}.webp`;
      const info = await sharp(input).rotate().resize({ width: size, height: size, fit: 'inside', withoutEnlargement: true }).toColourspace('srgb').webp({ quality, effort: 6 }).toFile(`public${src}`);
      variants.push({ src, width: info.width, height: info.height, bytes: info.size });
    }
    records.push({ id, album, original: name, originalWidth: metadata.width, originalHeight: metadata.height, originalBytes: (await stat(input)).size, variants });
    const tile = await sharp(input).rotate().resize(230, 160, { fit: 'contain', background: '#202020' }).png().toBuffer();
    const label = Buffer.from(`<svg width="240" height="200"><text x="10" y="190" font-size="16" fill="white">${id}</text></svg>`);
    const cell = await sharp({ create: { width: 240, height: 200, channels: 3, background: '#202020' } }).composite([{ input: tile, top: 0, left: 0 }, { input: label }]).png().toBuffer();
    thumbs.push({ input: cell, left: (index % 5) * 240, top: Math.floor(index / 5) * 200 });
    console.log(`${id}: ${variants.map(v => Math.round(v.bytes / 1024) + ' KB').join(' / ')}`);
  }
  await sharp({ create: { width: 1200, height: Math.ceil(files.length / 5) * 200, channels: 3, background: '#202020' } }).composite(thumbs).jpeg({ quality: 88 }).toFile(`qa-output/gallery/${album}-contact.jpg`);
}
await writeFile('app/data/gallery-imports.json', JSON.stringify(records, null, 2) + '\n');
console.log(JSON.stringify({ count: records.length, originalBytes: records.reduce((s, p) => s + p.originalBytes, 0), webBytes: records.reduce((s, p) => s + p.variants.reduce((a, v) => a + v.bytes, 0), 0) }));
