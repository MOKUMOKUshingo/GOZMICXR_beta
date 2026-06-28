ADD25 - xr_hand_grip local X -90 degree correction

Base: 3d5start54_add_24_xrhand_direction_final_fix.zip

Change:
- three_scene/main.js
  - Applies a final local X-axis rotation of -90 degrees to xr_hand_grip.glb after the latest wrist-centering, axis alignment, and controller offset.
  - Existing Grip animation handling is preserved.
  - Existing HMD/view-direction based VR movement is preserved.
  - Existing blue ring/collision/copyright fixes are preserved.

Video note:
- video/projectmovie1.mp4 is still not bundled. Place it in video/projectmovie1.mp4 for playback testing.
