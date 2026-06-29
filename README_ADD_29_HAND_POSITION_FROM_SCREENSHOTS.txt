ADD29: XR hand placement/orientation correction

- Base: Add28.
- Reworked xr_hand_grip.glb placement in three_scene/main.js.
- The hand model is attached to WebXR getControllerGrip() and calibrated from the GLB skeleton.
- wrist -> palm/finger direction is aligned to WebXR grip forward (-Z).
- Removed the older accumulated trial rotations from Add25/Add26 as the main calibration path.
- Added a small handedness-dependent wrist offset so the wrist stays near the controller and fingers extend forward.
- Blue ring display/collision settings from Add28 are kept:
  display y = 0.6, collision top y = 2.0, player topY = 2.0.
