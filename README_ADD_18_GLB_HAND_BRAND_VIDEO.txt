Add 18 update
=============

Base: 3d5start54_add_17_pcvideo_arhand_fix.zip

Changes:
1. Removed the separate upper-right HTML video UI.
   - The video source element is still kept as a tiny live WebGL source.
   - Playback is intended to appear on the in-scene three.js screen.

2. PC Web video fallback:
   - VR / AR always use video/projectmovie1.mp4.
   - Non-XR PC / smartphone Web can fall back to video/projectmovie1_mobile.mp4 if it exists.
   - This helps when the main projectmovie1.mp4 has a video codec that plays audio but produces black frames on a desktop browser.

3. Controller hands:
   - Added three_scene/assets/xr_hand.glb.
   - The left and right controller hands are generated from this GLB.
   - Trigger input drives the hand animation when the GLB animation is available.

4. Branding text:
   - Replaced legacy legacy sea-theme brand text with COZMIX Space.
   - Replaced legacy template-provider text with GOZMIX/gozmix.
   - Renamed the template CSS/JS filenames to remove the legacy brand words.

5. Removed img/the previously supplied reference image from the package.

Required video files to add locally:
- video/projectmovie1.mp4
- optional for PC/smartphone Web fallback: video/projectmovie1_mobile.mp4
