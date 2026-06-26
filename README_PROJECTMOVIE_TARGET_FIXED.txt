# Project Movie Target Fixed

This package keeps the working top-page video setup unchanged and applies the safe loading / fallback / manual playback flow to the correct target:

  three_scene -> video/projectmovie1.mp4

## What changed

- three_scene/index.html now uses:
  <video id="oceanVideo" src="../video/projectmovie1.mp4" poster="../img/title1-poster.jpg" muted loop playsinline webkit-playsinline preload="metadata"></video>

- three_scene/main.js now starts the 3D/VR/AR movie screen with the poster texture first.
- The THREE.VideoTexture is created and attached only after video playback/loadeddata starts.
- If projectmovie1.mp4 is missing, too slow, or cannot play, the 3D/VR/AR screen stays on img/title1-poster.jpg instead of turning black.
- A Project Movie control panel was added on the three.js page:
  - Play video
  - Play with sound
  - Retry
- The 3D movie screen can be tapped/clicked on desktop/mobile to play/pause.
- In VR, point at the movie screen and pull the trigger to play/pause.
- In AR, after placing the AR gallery, point/tap the small movie panel to play/pause.

## What did not change

- The top page video setup still uses video/Title1-1_web.mp4.
- The language switcher is preserved.
- VR and AR entry are preserved.

## Add your movie

Because projectmovie1.mp4 is heavy, it is intentionally not included. Put your file here:

  video/projectmovie1.mp4

For best WebXR playback, projectmovie1.mp4 should be MP4/H.264/AAC and encoded with:

  -movflags +faststart

A 557MB video can still be heavy for Quest/smartphone WebXR. If it is unstable, create 720p and/or 480p versions next.
