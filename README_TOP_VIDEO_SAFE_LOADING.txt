Top video safe loading update
=============================

Base:
- 3d5start54_lang_title1_projectmovie1.zip

Changed top/first page video design:
- Top page now references: video/Title1-1_web.mp4
- The heavy video file itself is not bundled here. Place your optimized MP4 at that path before publishing.
- The poster image is bundled at: img/title1-poster.jpg
- three.js video remains unchanged: three_scene/index.html references ../video/projectmovie1.mp4

Added:
- css/top-video-safe.css
- js/top-video-safe.js
- img/title1-poster.jpg

Behavior:
1. The page tries to load the lightweight top video first.
2. A loading message is shown while the browser prepares the video.
3. If the video cannot be loaded or takes too long, the poster image remains visible as a fallback.
4. A user-click button starts audio playback. The background autoplay video stays muted by default.
5. The loading/fallback/audio button text inherits the existing English/Japanese language setting.

Recommended video encoding:
ffmpeg -i Title1-1.mp4 -vf "scale=1280:-2" -c:v libx264 -preset medium -crf 26 -c:a aac -b:a 128k -movflags +faststart Title1-1_web.mp4
