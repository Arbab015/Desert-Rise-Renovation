# Hero background videos

The hero rotates through `hero-1.mp4`, `hero-2.mp4` ... (each with a poster image `hero-1.jpg` ...).
The list is `HERO_SLIDES` in `src/constants/site.js`: add or remove entries to change how many there are.

Recommended per clip: 1920x1080, up to 15 seconds, no audio track, H.264, about 3 MB
(example: `ffmpeg -t 15 -i in.mp4 -an -vf scale=1920:-2,fps=24 -c:v libx264 -crf 28 -movflags +faststart hero-1.mp4`).

If a file is missing it is skipped, and with no videos at all the animated skyline is shown.

Optional music: put a track at `public/audio/hero.mp3` (see `HERO_AUDIO` in `src/constants/site.js`).
The sound button only appears when that file exists.
