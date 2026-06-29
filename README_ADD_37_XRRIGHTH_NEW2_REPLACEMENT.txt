# ADD 37 - XRRightH_New2.glb replacement

Base: ADD 36.

Changes:
- Replaced the XR hand asset with `three_scene/assets/XRRightH_New2.glb`.
- Removed `three_scene/assets/XRRightH_New1.glb`.
- Updated `three_scene/main.js` so the hand loader uses `./assets/XRRightH_New2.glb`.
- Kept the existing Add36 behavior unchanged: AR A/B/X/Y screen-angle control, VR jump behavior, AR right-stick screen scale/curvature, spherical AR placement, video scrub bar, and existing movement settings.

Video note:
- `video/projectmovie1.mp4` is not bundled. Place it in `video/projectmovie1.mp4` when testing.
