# Hero background video

Drop your Dubai skyline video here as **dubai-skyline.mp4** (and optionally **dubai-skyline.webm** and **dubai-poster.jpg**).

Recommended: 1920x1080, 10-20 seconds, seamless loop, no audio, H.264, under 8 MB
(example: `ffmpeg -i in.mp4 -an -vf scale=1920:-2 -c:v libx264 -crf 28 -preset slow -movflags +faststart dubai-skyline.mp4`).

If the file is missing, the site automatically shows the animated skyline fallback.