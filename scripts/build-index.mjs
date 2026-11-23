// Writes pictures/index.json from every pictures/*.json (name, pack, color). Packs show in the order below.
import { readdir, readFile, writeFile } from 'node:fs/promises';
const PACKS = ['animals', 'sea', 'vehicles', 'home', 'food', 'space', 'dinosaurs', 'friends'];
const files = (await readdir('pictures')).filter((f) => f.endsWith('.json') && f !== 'index.json').sort();
const all = [];
for (const f of files) {
  const j = JSON.parse(await readFile(`pictures/${f}`, 'utf8'));
  all.push({ slug: f.replace('.json', ''), name: j.name, pack: j.pack, color: j.color || '#fde68a' });
}
all.sort((a, b) => PACKS.indexOf(a.pack) - PACKS.indexOf(b.pack) || a.slug.localeCompare(b.slug));
await writeFile('pictures/index.json', JSON.stringify(all, null, 1) + '\n');
console.log(`pictures/index.json: ${all.length} pictures`);
