Add32 update

Base: Add31.

Changes:
1. Reverted the ADD30 measured index-finger direction correction for xr_hand_grip.glb.
   The hand model keeps the existing GLB/grip setup but no longer applies:
   (sqrt(3)/2, -1/2, 0) -> (0, 0, -1).

2. Removed the AR billboard text object completely from three_scene/main.js.
   The previous AR label/sign saying COZMIX Space AR / tap a surface to place is not created.

3. Removed the visible blue rings from AR mode.
   The AR base ring and AR portal torus are no longer created.

4. AR screen controller edit was changed to spherical-coordinate control:
   - Left stick X: longitude phi
   - Left stick Y: latitude theta
   - Right stick Y: radial distance r
   - Right stick X: parabolic curvature
   - Left trigger: shrink AR screen
   - Right trigger: enlarge AR screen

5. Removed AR SCALE +/- boards. Scaling is now trigger based.

6. Added in-scene scrub bars for arbitrary video seeking:
   - VR/Web large screen has a 3D scrub bar.
   - AR screen has a 3D scrub bar.
   Point at the bar and use trigger/click to jump to that video position.

Video files:
- video/projectmovie1.mp4 is still not included. Put it into video/ when testing.
