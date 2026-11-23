// Home + food packs: tree flower suncloud umbrella / apple icecream cake pizza banana
import fs from 'fs';
import { f, Rc, El, Ci, Pg, Star, L, Rr, Bg, rays } from '../scripts/shapes.mjs';

const hill = (cx, top, w) => `M${cx - w} 330Q${cx - w} ${top} ${cx} ${top}Q${cx + w} ${top} ${cx + w} 330z`;
// fluffy cloud, flat bottom
const cloud = (cx, cy, w) => {
  const h = w * 0.5;
  return `M${cx - w} ${cy}A${w * .3} ${w * .3} 0 0 1 ${cx - w * .7} ${cy - w * .5}A${w * .4} ${w * .4} 0 0 1 ${cx} ${cy - h * 1.2}A${w * .35} ${w * .35} 0 0 1 ${cx + w * .7} ${cy - w * .45}A${w * .3} ${w * .3} 0 0 1 ${cx + w} ${cy}z`;
};
// scalloped blossom: n petals around radius R
const blossom = (cx, cy, R, n, r) => {
  const pt = i => { const a = i / n * Math.PI * 2 - Math.PI / 2; return [f(cx + Math.cos(a) * R), f(cy + Math.sin(a) * R)]; };
  let d = `M${pt(0).join(' ')}`;
  for (let i = 1; i <= n; i++) d += `A${r} ${r} 0 0 1 ${pt(i % n).join(' ')}`;
  return d + 'z';
};
// scoop with scalloped bottom (3 bumps)
const scoop = (cx, cy, w, h) => {
  const s = w * 2 / 3;
  return `M${cx - w} ${cy}C${cx - w} ${cy - h * 1.35} ${cx + w} ${cy - h * 1.35} ${cx + w} ${cy}A${s / 2} ${h * .55} 0 0 1 ${f(cx + w - s)} ${cy}A${s / 2} ${h * .55} 0 0 1 ${f(cx + w - 2 * s)} ${cy}A${s / 2} ${h * .55} 0 0 1 ${cx - w} ${cy}z`;
};
const drop = (x, y) => `M${x} ${y}C${x + 6} ${y + 14} ${x + 14} ${y + 20} ${x + 14} ${y + 28}a14 14 0 0 1 -28 0C${x - 14} ${y + 20} ${x - 6} ${y + 14} ${x} ${y}z`;
const flame = (x, y) => `M${x} ${y}C${x + 12} ${y + 12} ${x + 13} ${y + 20} ${x} ${y + 28}C${x - 13} ${y + 20} ${x - 12} ${y + 12} ${x} ${y}z`;
const rotPath = (pts, ox, oy, deg, tx = 0, ty = 0) => { // pts: cubic list
  const a = deg * Math.PI / 180, c = Math.cos(a), s = Math.sin(a);
  return pts.map(([x, y]) => [f(ox + (x - ox) * c - (y - oy) * s + tx), f(oy + (x - ox) * s + (y - oy) * c + ty)]);
};
const banana = (px, py, deg) => { // pivot at stem end (px,py); body extends to the left, curving down
  const P = [[0, 0], [-40, 80], [-170, 90], [-210, 10], [-175, 55], [-60, 40], [0, 0]]; // M p0 C p1 p2 p3 C p4 p5 p6
  const Q = [[0, 0], [-20, 115], [-150, 125], [-195, 20], [-150, 28], [-60, 18], [0, 0]];
  const q = rotPath(Q.map(([x, y]) => [px + x, py + y]), px, py, deg);
  return `M${q[0].join(' ')}C${q[1].join(' ')} ${q[2].join(' ')} ${q[3].join(' ')}C${q[4].join(' ')} ${q[5].join(' ')} ${q[6].join(' ')}z`;
};

const P = {};

P.tree = {
  name: 'Tree', pack: 'home', color: '#d8f5a2',
  regions: [Bg(), hill(220, 255, 330), Ci(62, 56, 30), cloud(330, 70, 55),
    'M180 292C192 270 196 230 190 170L240 170C234 230 238 270 252 292z',
    Ci(140, 130, 56), Ci(290, 130, 56), Ci(215, 78, 58), Ci(215, 150, 54),
    Ci(160, 120, 14), Ci(272, 112, 14), Ci(212, 88, 14), Ci(215, 160, 14), Ci(306, 150, 13),
    Rc(375, 200, 18, 90), Rc(350, 150, 68, 56), Pg([[340, 152], [384, 112], [428, 152]]), Ci(384, 178, 11)],
  deco: [rays(62, 56, 30, 8)]
};

const flower = (cx, base, top, R, n, r) => ({
  stem: `M${cx - 9} ${base}L${cx - 9} ${top}L${cx + 9} ${top}L${cx + 9} ${base}z`,
  leaf: `M${cx + 9} ${base - 40}C${cx + 40} ${base - 80} ${cx + 70} ${base - 60} ${cx + 66} ${base - 40}C${cx + 50} ${base - 20} ${cx + 25} ${base - 20} ${cx + 9} ${base - 40}z`,
  bloom: blossom(cx, top - 8, R, n, r), center: Ci(cx, top - 8, R * 0.5)
});
{
  const a = flower(95, 300, 150, 52, 7, 26), b = flower(220, 300, 110, 62, 8, 30), c = flower(345, 300, 160, 50, 6, 28);
  P.flower = {
    name: 'Flower Garden', pack: 'home', color: '#ffd6e7',
    regions: [Bg(), hill(220, 250, 330), Ci(380, 50, 30), cloud(90, 55, 50),
      a.stem, a.leaf, a.bloom, a.center, b.stem, b.leaf, b.bloom, b.center, c.stem, c.leaf, c.bloom, c.center],
    deco: [rays(380, 50, 30, 8)]
  };
}

P.suncloud = {
  name: 'Sunny Day', pack: 'home', color: '#fff3bf',
  regions: [Bg(), Ci(220, 130, 85), hill(80, 262, 190), hill(360, 275, 190),
    Ci(190, 118, 12), Ci(250, 118, 12), Ci(160, 150, 14), Ci(280, 150, 14),
    cloud(125, 240, 90), cloud(325, 232, 80), cloud(380, 62, 40), cloud(60, 60, 36)],
  deco: ['M190 148Q220 175 250 148',
    ...Array.from({ length: 7 }, (_, i) => { const a = Math.PI + (i + .5) / 7 * Math.PI, c = Math.cos(a), s = Math.sin(a); return L(f(220 + c * 98), f(130 + s * 98), f(220 + c * 120), f(130 + s * 120)); })].join('')
    ? ['M190 148Q220 175 250 148' + Array.from({ length: 7 }, (_, i) => { const a = Math.PI + (i + .5) / 7 * Math.PI, c = Math.cos(a), s = Math.sin(a); return L(f(220 + c * 98), f(130 + s * 98), f(220 + c * 122), f(130 + s * 122)); }).join('')] : []
};

{
  const panels = [
    'M70 165Q70 60 220 40L150 165A40 22 0 0 1 70 165z',
    'M220 40L150 165A35 22 0 0 0 220 165z',
    'M220 40L290 165A35 22 0 0 1 220 165z',
    'M370 165Q370 60 220 40L290 165A40 22 0 0 0 370 165z'];
  P.umbrella = {
    name: 'Rainy Umbrella', pack: 'home', color: '#d0ebff',
    regions: [Bg(), cloud(105, 100, 85), cloud(345, 90, 75), hill(220, 270, 330), El(100, 292, 70, 18),
      ...panels, Rc(211, 170, 18, 105),
      drop(50, 120), drop(100, 170), drop(380, 130), drop(330, 195), drop(420, 190)],
    deco: []
  };
  // puddle on the right in front, shaft ends above ground
}

P.apple = {
  name: 'Apple', pack: 'food', color: '#ffc9c9',
  regions: [Bg(), hill(220, 270, 330), Ci(380, 55, 30), cloud(70, 60, 46), El(220, 285, 120, 18),
    'M220 100C190 70 110 80 110 160C110 235 160 285 200 270Q220 262 240 270C280 285 330 235 330 160C330 80 250 70 220 100z',
    'M142 130C150 110 168 104 178 108C165 125 160 150 160 175C150 165 138 150 142 130z',
    'M212 100Q214 65 236 45L250 56Q234 74 232 102z',
    'M242 78C262 40 307 40 322 55C307 88 267 95 242 78z', Ci(185, 160, 10), Ci(255, 160, 10)],
  deco: ['M195 195Q220 220 245 195']
};

P.icecream = {
  name: 'Ice Cream', pack: 'food', color: '#ffe3f1',
  regions: [Bg(), hill(220, 285, 330), Ci(58, 58, 30), cloud(370, 60, 50),
    Pg([[148, 178], [292, 178], [220, 312]]),
    scoop(220, 182, 76, 34), scoop(220, 140, 64, 32), scoop(220, 98, 52, 30), Ci(220, 58, 16)],
  deco: [L(159, 198, 252, 252) + L(281, 198, 188, 252) + L(180, 238, 234, 285) + L(260, 238, 206, 285)]
};

{
  const drip = (x, w, y) => { const n = Math.round(w / 40), s = w / n; let d = `M${x} ${y}h${w}v14`; for (let i = 0; i < n; i++) d += `a${s / 2} 16 0 0 1 ${-s} 0`; return d + 'z'; };
  const cs = [155, 220, 285];
  P.cake = {
    name: 'Birthday Cake', pack: 'food', color: '#ffe8cc',
    regions: [Bg(), Rc(0, 258, 440, 62), El(220, 266, 190, 22),
      Rr(80, 190, 280, 74, 12), drip(80, 280, 190), Rr(125, 120, 190, 72, 12), drip(125, 190, 120),
      ...cs.map(x => Rr(x - 10, 78, 20, 44, 5)), ...cs.map(x => flame(x, 46)),
      Ci(125, 232, 12), Ci(220, 236, 12), Ci(315, 232, 12)],
    deco: [L(100, 30, 100, 42) + L(340, 30, 340, 42) + L(80, 70, 92, 76) + L(360, 70, 348, 76)]
  };
}

P.pizza = {
  name: 'Pizza', pack: 'food', color: '#ffe0b3',
  regions: [Bg(), Rc(0, 215, 440, 105), El(220, 180, 190, 128), El(220, 180, 164, 108),
    Ci(155, 145, 22), Ci(285, 140, 22), Ci(220, 240, 22),
    Ci(210, 105, 13), Ci(320, 185, 13), Ci(120, 185, 13), Ci(280, 235, 13), Ci(160, 240, 13)],
  deco: [L(220, 180, 220, 72) + L(220, 180, 330, 224) + L(220, 180, 110, 224)]
};

P.banana = {
  name: 'Bananas', pack: 'food', color: '#fff3bf',
  regions: [Bg(), hill(220, 270, 330), Ci(60, 56, 30), El(210, 285, 170, 20),
    banana(350, 55, -82), banana(350, 55, -46), banana(350, 55, -10),
    Rr(336, 25, 36, 50, 10)],
  deco: []
};

fs.mkdirSync('pictures', { recursive: true });
for (const [k, v] of Object.entries(P)) fs.writeFileSync(`pictures/${k}.json`, JSON.stringify(v) + '\n');
console.log(Object.keys(P).join(' '));
