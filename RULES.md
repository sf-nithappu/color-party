# Color Party: rules and how to add a picture

Color Party is plain static HTML/JS (no build step except `pnpm build`, which refreshes the picture index and the
offline cache list). `paint.html?p=<slug>` loads `pictures/<slug>.json`; the launcher `index.html` lists
`pictures/index.json`.

## Toddler rules (age 4+, iPad / Android tablet / Mac)
- Nothing ends, loses or scores. No text, no reading. Every tap does something.
- Big targets: no tiny parts. Every region must be easy to hit with a fat finger.
- Instant feedback (sound + splash + confetti) is handled by the engine.
- No network calls, no external assets. Keep the top-left 110px free (home button): nothing in the picture matters there
  because the frame is centred, but don't rely on it.

## Picture file: `pictures/<slug>.json`
```json
{ "name": "Fish", "pack": "sea", "color": "#d0ebff",
  "regions": ["M0 0h440v320h-440z", "..."],
  "deco": ["M120 165L138 175"] }
```
- Frame is **440 wide x 320 tall**. Coordinates are in that space.
- `regions`: SVG path strings (`d`), drawn **back to front**; the child can tap any one to colour it. Each is filled
  (nonzero rule) and outlined in ink (3px). Later regions sit on top and win the tap, so draw the big background first.
  - `regions[0]` is always the full background `M0 0h440v320h-440z` (sky/water/wall).
  - A hill/ground/floor is usually region 1. Then the main subject made of several parts, then small extras.
  - Each region should be one closed shape (end with `z`). No holes: to show a window on a house, draw the window as its
    own region on top of the wall.
  - Minimum size about 24 x 24 units for the smallest region (eyes about r=8 are fine). Aim for **8 to 20 regions**.
- `deco`: strokes only (not tappable): whiskers, rays, smile lines, wheel spokes. Keep few.
- `pack`: one of animals, sea, vehicles, home, food, space, dinosaurs, friends.
- `color`: a pastel hex used on the launcher tile.
- Style: simple, chunky, friendly, symmetrical where it helps. Think big-shape toddler colouring page.

## Writing pictures
Write a generator `src/<pack>.mjs` that imports helpers from `scripts/shapes.mjs` (Rc, El, Ci, Pg, Star, L, rays, Rr, Bg,
Ground; or raw SVG path strings with curves) and writes `pictures/<slug>.json`. Then:

```
pnpm build                 # refresh pictures/index.json and sw.js
pnpm check <slug> ...      # plays ?bot on 4 device sizes; fails on console errors; screenshots in tmp/check/
```
LOOK at the screenshots (`tmp/check/<slug>-ipad-landscape.png`). The picture is drawn uncoloured with the bot's random fills;
check that the subject is recognisable, parts do not hide each other unreasonably, and nothing is too small.
