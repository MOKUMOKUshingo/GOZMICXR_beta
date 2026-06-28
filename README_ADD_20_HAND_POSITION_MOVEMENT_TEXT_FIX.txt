ADD 20 changes
==============

1. XR hand alignment
   - Uses three_scene/assets/xr_hand_grip.glb.
   - Keeps the Grip animation control from Add19.
   - Applies handedness-specific yaw correction so the right and left hands point along the controller forward vector.
   - Re-centers the hand after rotation so the wrist sits closer to the controller.

2. VR translation movement
   - Left-stick translation now uses the real XR headset view direction via renderer.xr.getCamera(camera).cameras[0] when available.
   - Movement is no longer based only on fixed world axes or rig yaw.

3. Header brand text
   - Header changed to GOZMIX (blue) + Space (gray).

4. Removed distracting 3D text signs
   - Removed the Chico/VR-guide 3D signboards from the scene.
