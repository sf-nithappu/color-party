// Animals + dinosaurs packs. Run: node src/animals.mjs
import fs from 'fs';
import { f, Rc, El, Ci, Pg, Star, L, rays, Rr, Bg, Ground } from '../scripts/shapes.mjs';
// mirror an absolute-coordinate path (M L C Q z only) around x=220
const mir = (d) => d.replace(/(-?[\d.]+)[ ,](-?[\d.]+)/g, (_, x, y) => `${f(440 - x)} ${y}`);
const both = (d) => [d, mir(d)];
const P = {};

P.cat = { name: 'Cat', pack: 'animals', color: '#ffe8cc', regions: [
  Bg(), Ground(),
  Ci(88, 268, 28),                                              // yarn ball
  'M285 285C355 300 392 240 352 188C340 176 320 188 330 205C352 240 335 262 280 255z', // tail
  El(220, 238, 70, 66),                                         // body
  El(220, 255, 38, 44),                                         // belly
  El(188, 298, 26, 14), El(252, 298, 26, 14),                   // paws
  'M160 112L152 48C175 52 200 66 212 80z', mir('M160 112L152 48C175 52 200 66 212 80z'), // ears
  El(220, 130, 72, 58),                                         // head
  'M172 96L170 68L196 82z', mir('M172 96L170 68L196 82z'),     // inner ears
  Ci(192, 126, 11), Ci(248, 126, 11),                           // eyes
  Pg([[206, 144], [234, 144], [220, 160]]),                     // nose
], deco: [L(160, 150, 120, 142) + L(160, 160, 120, 166) + L(280, 150, 320, 142) + L(280, 160, 320, 166) + 'M220 160C214 176 200 176 196 168M220 160C226 176 240 176 244 168' + L(220, 74, 220, 90) + L(204, 78, 208, 92) + L(236, 78, 232, 92)] };

P.dog = { name: 'Dog', pack: 'animals', color: '#ffe3e3', regions: [
  Bg(), Ground(), Ci(372, 276, 24),                             // ball
  'M150 262C105 262 92 215 112 188C130 200 128 232 162 232z',   // tail
  El(220, 245, 76, 62),                                         // body
  El(184, 300, 28, 15), El(256, 300, 28, 15),                   // paws
  Ci(220, 128, 62),                                             // head
  'M168 88C118 78 100 150 128 195C152 175 168 140 170 112z', mir('M168 88C118 78 100 150 128 195C152 175 168 140 170 112z'), // ears
  Rr(206, 172, 28, 38, 12),                                     // tongue
  El(220, 156, 36, 28),                                         // snout
  El(220, 144, 17, 12),                                         // nose
  Ci(194, 114, 10), Ci(246, 114, 10),                           // eyes
  Rr(168, 192, 104, 22, 10),                                    // collar
  Ci(220, 232, 14),                                             // tag
], deco: [L(220, 156, 220, 172) + 'M196 172C206 182 212 176 220 172C228 176 234 182 244 172'] };

P.elephant = { name: 'Elephant', pack: 'animals', color: '#e7ecf3', regions: [
  Bg(), Ground(), Ci(380, 58, 30),
  'M355 190C385 200 395 235 380 255C365 240 360 225 350 215z', // tail
  Rr(160, 225, 48, 80, 18), Rr(280, 225, 48, 80, 18),           // legs behind
  El(255, 180, 112, 76),                                        // body
  Rr(212, 232, 48, 74, 18), Rr(325, 228, 44, 78, 18),           // legs front
  'M80 160C48 190 62 235 50 262C46 292 92 296 96 262C102 232 104 205 150 190z', // trunk
  Ci(130, 150, 60),                                             // head
  El(180, 150, 40, 60),                                         // ear
  El(180, 158, 22, 38),                                         // inner ear
  Ci(112, 130, 10),                                             // eye
  'M108 200C106 226 120 242 142 238C134 222 132 208 130 196z',  // tusk
], deco: [L(70, 230, 88, 232) + L(66, 248, 84, 250) + L(54, 270, 90, 272)] };

const wing1 = 'M215 150C185 60 90 40 70 105C58 155 130 178 215 168z';
const wing2 = 'M215 172C150 172 100 195 108 242C120 285 192 262 215 195z';
P.butterfly = { name: 'Butterfly', pack: 'animals', color: '#f3d9fa', regions: [
  Bg(), Ground(), Ci(380, 58, 30),
  Ci(60, 282, 17), Ci(386, 284, 17), Ci(120, 296, 14),          // flowers
  wing1, mir(wing1), wing2, mir(wing2),
  Ci(125, 112, 22), Ci(315, 112, 22), Ci(152, 228, 17), Ci(288, 228, 17), // wing spots
  El(220, 178, 15, 62),                                         // body
  Ci(220, 105, 19),                                             // head
], deco: ['M212 90C200 60 180 48 168 52M228 90C240 60 260 48 272 52'] };

P.bird = { name: 'Bird', pack: 'animals', color: '#d0ebff', regions: [
  Bg(), Ground(), Ci(372, 58, 30), El(88, 60, 44, 20),
  Rr(30, 232, 380, 24, 11),                                     // branch
  El(60, 214, 34, 17), El(385, 214, 34, 17),                    // leaves
  'M285 180C335 175 380 150 400 112C392 170 372 205 295 220z', // tail
  El(215, 172, 82, 68),                                         // body
  El(188, 192, 46, 40),                                         // belly
  'M232 140C300 125 320 195 255 222C225 205 208 160 232 140z', // wing
  Ci(165, 112, 46),                                             // head
  'M150 72C140 42 160 30 172 56C178 34 198 40 192 74z',        // crest
  Pg([[124, 104], [82, 120], [124, 134]]),                      // beak
  Ci(150, 100, 9),                                              // eye
  Ci(172, 138, 12),                                             // cheek
], deco: [L(190, 240, 190, 232) + L(225, 240, 225, 232)] };

P.trex = { name: 'T-Rex', pack: 'dinosaurs', color: '#d3f9d8', regions: [
  Bg(), Ground(), Ci(60, 56, 28),
  'M135 165C85 180 40 225 15 275C65 282 120 262 165 232z',     // tail
  Pg([[130, 130], [150, 92], [175, 120]]), Pg([[170, 112], [195, 74], [222, 108]]), Pg([[212, 108], [240, 76], [262, 118]]), // spikes
  El(190, 185, 98, 72),                                         // body
  El(188, 218, 60, 32),                                         // belly
  Rr(135, 240, 52, 66, 20), Rr(215, 245, 48, 60, 20),           // legs
  'M255 112C260 72 300 52 352 58C402 64 424 94 424 122C424 150 400 152 340 152C318 152 292 168 268 152z', // head
  'M300 152C340 152 400 150 418 140C412 172 372 182 324 172z', // jaw
  Rr(268, 188, 40, 28, 14),                                     // arm
  Ci(322, 88, 11),                                              // eye
  Ci(165, 148, 15), Ci(212, 138, 13),                           // spots
], deco: [L(395, 98, 402, 104) + 'M335 150L342 162L350 150M365 150L372 162L380 150'] };

P.diplodocus = { name: 'Diplodocus', pack: 'dinosaurs', color: '#fff3bf', regions: [
  Bg(), Ground(), Ci(80, 58, 30),
  Rr(386, 170, 24, 112, 6), Ci(398, 140, 44),                   // tree
  'M125 180C75 195 50 235 14 228C38 268 105 268 140 245z',      // tail
  Rr(120, 238, 42, 70, 16), Rr(222, 238, 42, 70, 16),           // far legs
  'M250 200C288 160 292 110 288 66L336 66C346 118 346 180 300 230z', // neck
  El(195, 205, 100, 56),                                        // body
  Rr(158, 244, 42, 64, 16), Rr(262, 240, 42, 66, 16),           // near legs
  El(334, 60, 34, 24),                                          // head
  Ci(342, 54, 8),                                               // eye
  Ci(150, 188, 15), Ci(195, 172, 15), Ci(240, 188, 15),         // spots
], deco: [L(355, 66, 366, 70)] };

const shell = 'M112 205L142 172L176 208L208 172L240 208L272 172L304 208L330 200C345 285 295 304 220 304C145 304 98 285 112 205z';
P.egg = { name: 'Dino Egg', pack: 'dinosaurs', color: '#fff0d6', regions: [
  Bg(), Ground(), Ci(372, 58, 30),
  Pg([[196, 100], [208, 70], [222, 100]]), Pg([[222, 98], [236, 66], [252, 100]]), // head spikes
  El(222, 150, 66, 60),                                         // baby head
  Ci(198, 134, 11), Ci(246, 134, 11),                           // eyes
  shell,
  Ci(150, 222, 14), Ci(252, 240, 16), Ci(200, 272, 13),         // spots
  Ci(178, 190, 13), Ci(268, 190, 13),                           // claws
  Pg([[28, 270], [54, 226], [80, 255], [96, 270]]),           // fragment L
  Pg([[338, 275], [358, 232], [382, 258], [400, 232], [418, 275]]), // fragment R
], deco: ['M205 168C215 178 230 178 240 168'] };

fs.mkdirSync('pictures', { recursive: true });
for (const [k, v] of Object.entries(P)) fs.writeFileSync(`pictures/${k}.json`, JSON.stringify(v) + '\n');
console.log('wrote', Object.keys(P).join(' '));
