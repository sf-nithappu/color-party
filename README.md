# Color Party

No-lose colouring pictures for toddlers (age 4+). 40 big, chunky pictures, a side palette, undo, a rainbow colour and a
wipe. Works on iPad, Android tablets and Mac. Plain static HTML/JS, installable and offline.

Play: https://sf-nithappu.github.io/color-party/

Sister app: [Goofy Kids](https://github.com/sf-nithappu/goofyfish-kids) (16 tiny stick-figure games).

- Colour: tap a colour, then tap or drag over the picture. Finish a picture for a cheer and the next one opens.
- Parents: hold the gear on the home screen for 1.5 s (sound, play timer, full screen, reset).
- Add a picture: see [RULES.md](RULES.md). `pnpm build` then `pnpm check <slug>`.
- Dev: `pnpm install && pnpm dev` (port 5174).

Engine adapted from [goofyfish](https://github.com/nilbuild/goofyfish) (MIT, Kamran Ahmed). See LICENSE.
