Add22 update
============

Base: 3d5start54_add_21_hand_grip_movement_sign_delete.zip

Changes:
1. XR hand orientation fix
   - xr_hand_grip.glb is still used.
   - The hand natural forward axis now aligns to controller local +Z instead of -Z,
     because the previous calibration made the fingers face back toward the user.
   - Wrist offset was retuned after the orientation flip.

2. VR movement
   - Add21's HMD/view-direction based translation was kept unchanged.
   - This is the default movement behavior for future edits.

3. Top page video error text removed
   - The first page no longer contains the visible fallback block that said the video fallback message.
   - top-video-safe.js no longer stores that message.
   - If the top video fails, the poster remains silently without an error label.

Video files:
- video/projectmovie1.mp4 is still omitted. Put your optimized projectmovie1.mp4 in video/ before testing.
