Add 15 changes

1) Large high parabolic screen
- The three.js project movie screen is now about 3x larger in width/height.
- It is placed around 4x higher than before and tilted downward like a large cinema screen looking over the floor.

2) Jump
- VR jump velocity was multiplied by 5: 3.35 -> 16.75.

3) PC web black-screen video fix
- The primary three.js texture path is now THREE.VideoTexture.
- The previous canvas drawImage bridge is kept only as an emergency fallback.
- This is because some desktop/hardware-decoded MP4 paths can produce black frames when copied through canvas, even while audio continues.

4) Smartphone playback
- Manual mobile playback now opens a real native <video controls> overlay first.
- The overlay explicitly restores touch-action:auto so mobile video controls can receive taps.
- Optional fallback supported: video/projectmovie1_mobile.mp4.

If smartphone still shows "could not be played", the most likely cause is the MP4 encoding, not the three.js code. Create a mobile-safe file with:

ffmpeg -i projectmovie1.mp4 -vf "scale=1280:-2" -c:v libx264 -profile:v baseline -level 3.1 -pix_fmt yuv420p -preset medium -crf 26 -c:a aac -b:a 128k -movflags +faststart projectmovie1_mobile.mp4

Then place it here:
video/projectmovie1_mobile.mp4

Keep the normal file here:
video/projectmovie1.mp4
