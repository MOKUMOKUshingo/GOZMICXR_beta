Add21 changes

1. XR hand visuals now use xr_hand_grip.glb on WebXR controller grip spaces rather than target-ray spaces.
   This places the hand at the actual controller grip pose and drives the existing Grip animation from trigger/squeeze/gamepad input.
2. VR left-stick translation is recalculated from the current view/headset direction each frame.
3. The 3D title / VR guide / video helper signboards were removed from three_scene/main.js, not just hidden.

Place video/projectmovie1.mp4 manually before testing the movie screen.
