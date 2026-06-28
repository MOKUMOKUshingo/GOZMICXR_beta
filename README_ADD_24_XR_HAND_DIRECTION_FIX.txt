# Add 24 - XR hand direction fix

Base: Add 23.

Fix:
- xr_hand_grip.glb hand direction was still reversed in XR.
- The previous code aligned the GLB wrist-to-palm/finger direction to WebXR grip -Z.
- After checking the GLB skeleton direction, this version aligns it to WebXR grip +Z instead.
- Grip animation, Add21/Add23 HMD-relative locomotion, climb ring, AR/VR settings, and copyright year remain unchanged.

Files changed:
- three_scene/main.js

Video note:
- video/projectmovie1.mp4 is intentionally not bundled. Put your movie at video/projectmovie1.mp4 when testing.
