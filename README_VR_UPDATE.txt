VR update summary
=================

This package keeps the original GOZMIX COZMIX Space structure and the previous Chico-click transition.
The three_scene page has been upgraded from a simple three.js page to a WebXR-ready VR space.

Main changes:
- WebXR VRButton added/styled.
- renderer.xr.enabled = true and local-floor reference space is used.
- PC desktop mode still supports WASD/arrow keys and drag-to-look.
- Mobile mode still supports the left joystick and drag-to-look.
- VR mode hides the 2D HUD while inside the headset.
- VR headset orientation controls the camera naturally.
- VR controllers get visible rays.
- Hold trigger while pointing at the floor to preview a teleport marker, release to teleport.
- Controller thumbstick movement is supported when the browser/device exposes gamepad axes.
- In-world VR instruction panel was added.

Important:
- WebXR VR mode generally requires HTTPS, such as GitHub Pages, ConoHa with SSL, or localhost for testing.
- three.js is loaded from CDN via importmap, so internet access is required unless you later vendor three.js locally.
