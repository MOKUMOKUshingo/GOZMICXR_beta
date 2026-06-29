Add36 changes

Base: 3d5start54_add_35_vr_buttons_grip_hand.zip

1. XR hand model replacement
- Replaced the previous XR hand GLB with three_scene/assets/XRRightH_New1.glb.
- The loader now uses ./assets/XRRightH_New1.glb.
- The previous XRRightHand_grip_origin.glb has been removed from the package.

2. AR-only screen angle buttons
- A/B on the right controller now adjust the AR movie screen pitch only during AR mode.
- X/Y on the left controller now adjust the AR movie screen yaw only during AR mode.
- These buttons no longer adjust the large movie screen in VR mode.

3. VR jump restored
- In VR mode, jump accepts thumbstick-click plus A/B/X/Y.
- Trigger is still excluded from jump because it is used for video selection / interaction.

4. Existing behavior preserved
- Add34 AR right stick behavior is preserved:
  right stick vertical = screen scale
  right stick horizontal = parabolic curvature
- Add32 AR spherical left stick behavior is preserved:
  left stick = phi/theta
- VR movement remains the HMD/view-direction-based translation method.
- video/projectmovie1.mp4 is not bundled; place it in video/projectmovie1.mp4 when testing.
