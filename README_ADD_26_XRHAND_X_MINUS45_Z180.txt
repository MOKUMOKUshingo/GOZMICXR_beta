ADD 26 - xr_hand_grip.glb additional rotation correction

Base: 3d5start54_add_25_xrhand_x_minus90.zip

Change:
- Kept the existing ADD25 hand transform.
- Added two more rotations to xr_hand_grip.glb relative to the latest hand position/axis:
  1) local X axis: -45 degrees
  2) local Z axis: 180 degrees

Implementation location:
- three_scene/main.js

Exact added code:
  model.rotateX(-Math.PI / 4);
  model.rotateZ(Math.PI);

Maintained:
- xr_hand_grip.glb hand model
- Grip animation control
- HMD/view-direction based VR translation movement
- Blue ring start-position collider
- Copyright 2026
- projectmovie1.mp4 is not bundled. Place it in video/projectmovie1.mp4 when testing.
