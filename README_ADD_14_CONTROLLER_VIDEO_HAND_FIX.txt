Add 14 update
=============

Base: 3d5start54_add_13_controller_ar_mobile_fix.zip

Changes made in three_scene:

1. VR controller mapping
   - Left controller stick is translation-only.
   - Right controller stick is rotation-only.
   - Jump added for XR button input. Trigger is excluded because it is used for selection.
   - Intended jump inputs: A/X button or thumbstick-click depending on browser/device mapping.

2. Smartphone video fallback
   - Added a native mobile video player overlay for projectmovie1.mp4.
   - The existing 3D screen still tries to play projectmovie1.mp4 inside three.js.
   - If mobile inline VideoTexture playback fails, the mobile/native player can be opened from the new button.

3. PC black-screen video fix
   - The three.js project movie screen now uses a CanvasTexture bridge fed from the HTML video frame.
   - If drawing to canvas fails, it falls back to THREE.VideoTexture.
   - This is intended to avoid the case where audio plays but the 3D video screen stays black.

4. VR hand model
   - Replaced the sphere controller handles with procedural futuristic hand models.
   - Pulling the trigger gradually closes the fingers into a grip.
   - No external hand model asset is required.

video/projectmovie1.mp4 is not included in this ZIP. Place your 90MB optimized file at:

  video/projectmovie1.mp4
