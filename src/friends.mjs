// Friends pack: chunky stick-figure style characters in scenes. Writes pictures/<slug>.json.
import fs from 'fs';
import { f, Rc, El, Ci, Pg, L, Rr, Bg, Ground } from '../scripts/shapes.mjs';

// Thick rounded limb (capsule) from (x1,y1) to (x2,y2) with radius r.
const Cap = (x1, y1, x2, y2, r) => {
  const dx = x2 - x1, dy = y2 - y1, l = Math.hypot(dx, dy), nx = -dy / l * r, ny = dx / l * r;
  return `M${f(x1 + nx)} ${f(y1 + ny)}L${f(x2 + nx)} ${f(y2 + ny)}A${r} ${r} 0 0 0 ${f(x2 - nx)} ${f(y2 - ny)}L${f(x1 - nx)} ${f(y1 - ny)}A${r} ${r} 0 0 0 ${f(x1 + nx)} ${f(y1 + ny)}z`;
};
const Wave = (y, amp = 8, top = false) => `M0 ${y}Q55 ${y - amp * 2} 110 ${y}T220 ${y}T330 ${y}T440 ${y}V320H0z`;
const Cloud = (x, y) => `M${x - 40} ${y + 16}a20 20 0 0 1 8 -34a26 26 0 0 1 48 -6a22 22 0 0 1 24 40z`;
const Note = (x, y) => Ci(x, y, 14) + Rc(x + 8, y - 48, 9, 48) + `M${x + 17} ${y - 48}q22 4 22 28q-12 -14 -22 -10z`;
const Hair = (cx, cy, r) => `M${cx - r} ${cy - 2}A${r} ${r} 0 0 1 ${cx + r} ${cy - 2}Q${cx} ${cy - r * .55} ${cx - r} ${cy - 2}z`;
const Bow = (x, y) => Pg([[x, y], [x - 24, y - 15], [x - 24, y + 15]]) + Pg([[x, y], [x + 24, y - 15], [x + 24, y + 15]]);
const face = (cx, cy) => L(cx - 10, cy - 4, cx - 10, cy - 3) + L(cx + 10, cy - 4, cx + 10, cy - 3) + `M${cx - 9} ${cy + 8}Q${cx} ${cy + 17} ${cx + 9} ${cy + 8}`;
const sun = (x, y) => Ci(x, y, 30);

const P = {};

// HOP: jumping over a puddle
P.hop = { name: 'Hop', pack: 'friends', color: '#d0ebff', regions: [
  Bg(), El(220, 355, 340, 100), sun(62, 58), Cloud(370, 62),
  El(220, 288, 100, 20), Ci(120, 252, 13), Ci(325, 244, 13),
  Cap(200, 172, 168, 214, 13), Cap(240, 172, 282, 200, 13), El(160, 224, 22, 13), El(292, 207, 22, 13),
  Cap(204, 122, 152, 74, 12), Cap(236, 122, 290, 74, 12), Ci(147, 68, 14), Ci(295, 68, 14),
  Rr(192, 108, 56, 66, 22), Rr(194, 160, 52, 30, 10), Ci(220, 72, 30), Hair(220, 72, 31),
], deco: [face(220, 78)] };

// DANCE: dancing with music notes
P.dance = { name: 'Dance', pack: 'friends', color: '#e5dbff', regions: [
  Bg(), El(220, 360, 330, 100),
  Note(70, 130), Note(350, 100), Note(385, 215),
  Cap(172, 205, 150, 262, 13), Cap(212, 205, 255, 252, 13), El(144, 274, 24, 13), El(266, 262, 24, 13),
  Cap(178, 122, 128, 76, 12), Cap(206, 122, 262, 100, 12), Ci(124, 70, 14), Ci(268, 98, 14),
  `M170 106L210 106L246 206Q190 222 134 206z`, Rr(170, 100, 40, 22, 10),
  Ci(190, 74, 29), Hair(190, 74, 30), Ci(160, 66, 13),
], deco: [face(190, 80)] };

// KITE: flying a big kite with bow tail
P.kite = { name: 'Kite', pack: 'friends', color: '#c5f6fa', regions: [
  Bg(), `M-60 330Q60 205 200 250T500 235V340H-60z`, sun(60, 56), Cloud(150, 70),
  Pg([[330, 36], [388, 92], [330, 92]]), Pg([[330, 36], [272, 92], [330, 92]]),
  Pg([[330, 148], [388, 92], [330, 92]]), Pg([[330, 148], [272, 92], [330, 92]]),
  Bow(318, 172), Bow(342, 204), Bow(316, 236),
  Cap(104, 232, 94, 286, 13), Cap(128, 232, 140, 286, 13), El(88, 298, 24, 13), El(146, 298, 24, 13),
  Cap(90, 188, 64, 230, 12), Cap(122, 184, 168, 146, 12), Ci(62, 236, 13), Ci(172, 142, 13),
  Rr(86, 170, 48, 70, 22), Ci(112, 138, 28), Hair(112, 138, 29),
], deco: [`M330 148Q340 160 318 172Q342 186 342 204Q320 220 316 236`, `M316 250Q250 250 176 142`, face(112, 144)] };

// BALL: kicking a football, goal behind
P.ball = { name: 'Kick', pack: 'friends', color: '#d3f9d8', regions: [
  Bg(), Rc(0, 190, 440, 130), Cloud(90, 60), sun(380, 44),
  Rr(262, 78, 160, 128, 10),
  Cap(132, 205, 118, 266, 13), Cap(140, 205, 196, 244, 13), El(112, 278, 25, 13), El(210, 252, 23, 14),
  Cap(112, 146, 76, 176, 12), Cap(138, 146, 182, 120, 12), Ci(70, 182, 13), Ci(188, 116, 13),
  Rr(104, 130, 48, 78, 22), Rr(106, 188, 46, 30, 10), Ci(124, 100, 28), Hair(124, 100, 29),
  Ci(262, 262, 25),
], deco: [L(262, 78, 262, 206) + L(302, 78, 302, 206) + L(342, 78, 342, 206) + L(382, 78, 382, 206) + L(262, 120, 422, 120) + L(262, 163, 422, 163) + `M254 258l8 -8l8 8l-4 10h-8z`, face(124, 106)] };

// SWIM: swimming in the pool with a float ring
const ringSeg = (a0, a1) => {
  const cx = 220, cy = 208, R = [92, 36], r = [54, 18], p = (a, q) => [f(cx + Math.cos(a * Math.PI / 180) * q[0]), f(cy + Math.sin(a * Math.PI / 180) * q[1])];
  const o0 = p(a0, R), o1 = p(a1, R), i0 = p(a0, r), i1 = p(a1, r), big = (a1 - a0) > 180 ? 1 : 0;
  return `M${o0.join(' ')}A${R[0]} ${R[1]} 0 ${big} 1 ${o1.join(' ')}L${i1.join(' ')}A${r[0]} ${r[1]} 0 ${big} 0 ${i0.join(' ')}z`;
};
P.swim = { name: 'Swim', pack: 'friends', color: '#a5d8ff', regions: [
  Bg(), sun(62, 52), Cloud(370, 56), Wave(168, 8),
  ringSeg(200, 340),
  Cap(190, 150, 140, 104, 12), Cap(250, 150, 300, 104, 12), Ci(135, 98, 14), Ci(305, 98, 14),
  Rr(196, 128, 48, 90, 22),
  ringSeg(340, 405), ringSeg(135, 200), ringSeg(45, 135),
  Ci(220, 94, 28), `M190 92A30 30 0 0 1 250 92Q242 78 220 78Q198 78 190 92z`,
  Ci(86, 262, 13), Ci(350, 276, 13), Ci(390, 240, 12),
], deco: [face(220, 100) , `M40 205Q60 195 80 205M330 295Q350 285 370 295`] };

// BIKE: riding a bike
P.bike = { name: 'Bike', pack: 'friends', color: '#ffec99', regions: [
  Bg(), `M-60 330Q120 270 220 280T500 275V340H-60z`, sun(380, 50), Cloud(100, 62),
  Ci(140, 250, 52), Ci(140, 250, 32), Ci(322, 250, 52), Ci(322, 250, 32),
  Pg([[142, 250], [196, 186], [292, 186], [228, 252]]),
  Rr(172, 168, 52, 22, 10), Rr(280, 152, 46, 24, 10),
  Cap(196, 168, 238, 214, 14), Cap(238, 214, 226, 254, 13), El(230, 264, 24, 12),
  Rr(204, 112, 50, 72, 22),
  Cap(240, 124, 292, 156, 12), Ci(298, 160, 13),
  Ci(244, 80, 28), Hair(244, 80, 29),
], deco: [`M140 250L140 250M140 218V282M108 250H172M322 218V282M290 250H354M286 186L322 250`, face(244, 86)] };

for (const [k, v] of Object.entries(P)) fs.writeFileSync(`pictures/${k}.json`, JSON.stringify(v) + '\n');
