ADD 17 update
=============

Base: 3d5start54_add_16_mobile_pc_ar_screen_hand_fix.zip

Main changes:

1. PC Web video visibility fix
- three_scene/index.html keeps the in-scene source as ../video/projectmovie1.mp4.
- three_scene/project-video-safe.css no longer hides #oceanVideo on desktop.
- The real HTML video is visible in the upper-right corner on PC Web and is used as the source for THREE.VideoTexture.
- This is intentional: if a browser plays audio but the WebGL VideoTexture remains black, the visible HTML video confirms decoding and often keeps the frame pipeline alive.

2. VR / AR video source fix
- WebGL / VR / AR screens always use ../video/projectmovie1.mp4.
- ../video/projectmovie1_mobile.mp4 is reserved only for the optional native smartphone player.

3. AR screen update
- AR movie screen is placed about twice as high as the previous add_16 version.
- AR movie screen is doubled in width and height from the previous add_16 version.
- It remains a parabolic curved screen.
- It is slightly tilted downward for easier viewing.

4. Jump adjustment
- VR jump initial velocity changed from 16.75 to 8.375.

5. Hand visual update
- The earlier uncanny hand style was replaced by a translucent blue-purple XR glove style inspired by BluePurpleXRHands.png.
- Trigger value still animates the fingers into a grip.

Video files:
- Put your normal 90MB video here:
  video/projectmovie1.mp4
- Optional smartphone-only fallback:
  video/projectmovie1_mobile.mp4

