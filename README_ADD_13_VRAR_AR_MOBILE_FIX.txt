# Add 13: VR controller split / AR real-background fallback / mobile video start fix

Base: 3d5start54_add_12_vrar_controller_audio_fix.zip

Changes:

1. VR controller behavior
   - Left controller thumbstick: rotation only.
   - Right controller thumbstick: translation only.
   - This removes the mixed-feeling movement from the left stick.

2. AR entry and real background
   - WebXR AR no longer requires hit-test as a required feature. It is now optional, so START AR has a better chance to enter AR-capable browsers.
   - In WebXR AR, scene background/fog are removed and renderer alpha is transparent so the real surroundings can be seen.
   - Added CAMERA AR fallback button. This uses the device camera as a transparent background when WebXR AR cannot start, useful on browsers/devices without immersive-ar support.

3. Smartphone video/audio
   - Video control buttons now respond to pointer/touch/click more reliably.
   - Buttons use touch-action: manipulation.
   - The video element is reinforced with playsinline/webkit-playsinline.

Important:
- video/projectmovie1.mp4 is not included. Put your large movie at:
  video/projectmovie1.mp4
- True WebXR AR is device/browser dependent. On iPhone Safari, immersive WebXR AR may not be available; use CAMERA AR fallback.
