Add19 update
============

Base: 3d5start54_add_18_glbhand_brand_pcvideo_fix.zip

Main changes:

1. XR hand model / grip animation
   - Replaced three_scene/assets/xr_hand.glb with three_scene/assets/xr_hand_grip.glb.
   - The code now searches for the animation clip named "Grip".
   - VR select / squeeze / grip buttons drive the Grip animation manually:
       action.time = clip.duration * gripValue
       mixer.update(0)
   - The hand is re-centered after loading so it sits closer to the controller grip point.
   - Controller connected events are used to attach the actual left/right hand instead of relying only on controller index.

2. VR movement
   - Left-stick translation is now based on the current headset/camera facing direction.
   - Right-stick rotation remains separate.
   - Jump amount remains the Add17 half-strength value.

3. PC Web video black-screen workaround
   - Removed the separate right-top video UI.
   - The three.js screen still uses video/projectmovie1.mp4.
   - If PC WebGL VideoTexture stays black, the same live <video> element is projected over the 3D screen area as an in-scene fallback.
   - VR / AR still use projectmovie1.mp4 for the in-scene texture.

4. Branding text balance
   - Awkward brand text was normalized.
   - Confirmed no remaining text occurrence of "ocean" or "TemplateMo" in text files.

Video files not included:
   video/projectmovie1.mp4
   video/projectmovie1_mobile.mp4

Place your 90MB projectmovie1.mp4 here for checking:
   video/projectmovie1.mp4
