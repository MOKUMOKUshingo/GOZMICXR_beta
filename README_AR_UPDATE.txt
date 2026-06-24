AR UPDATE
=========

This build keeps the original 3d5start54 / Ocean Vibes template structure and the existing Chico-photo click route:

  gallery photo with caption "Chico's main fear was missing the morning bus."
  -> three_scene/index.html

Added to three_scene:

1. START AR button
   - Uses WebXR immersive-ar through three.js ARButton.
   - Requires hit-test support.
   - Works only on supported AR browsers/devices over HTTPS or localhost.

2. AR hit-test placement
   - Press START AR.
   - Move the phone/headset to scan a floor, table, or other flat surface.
   - A cyan reticle appears when a surface is detected.
   - Tap/select the surface to place a small Ocean Vibes AR gallery.

3. VR preserved
   - ENTER VR remains available.
   - Existing VR teleport and thumbstick movement remain in the same file.

4. PC/mobile preserved
   - PC: WASD / arrow keys + drag look.
   - Mobile non-AR mode: on-screen stick + swipe look.

Important notes:

- AR support depends heavily on device/browser.
- iPhone Safari generally does not support standard WebXR AR in the same way Chrome Android does.
- Android Chrome with WebXR ARCore support is the most realistic mobile test target.
- Meta Quest Browser may support immersive-vr and, depending on browser/device settings, may support mixed-reality/AR features differently.
- GitHub Pages, ConoHa HTTPS, or localhost should be used for testing.
