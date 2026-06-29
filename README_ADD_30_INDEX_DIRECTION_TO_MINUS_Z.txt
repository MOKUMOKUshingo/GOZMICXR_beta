ADD30 - XR hand index direction calibration

Base: 3d5start54_add_29_hand_position_from_screenshots.

Change:
- In three_scene/main.js, the measured visible index-finger direction
  (sqrt(3)/2, -1/2, 0) is explicitly rotated onto the WebXR forward ray axis
  (0, 0, -1).
- This uses THREE.Quaternion().setFromUnitVectors(...) and premultiplies the
  GLB hand model quaternion in controller-grip local space.
- Blue controller ray direction remains local -Z.
- Add28 blue ring settings and Add21 view-direction-based VR translation are preserved.

Video note:
- video/projectmovie1.mp4 is still not bundled. Put it under video/ for testing.
