# Add 27 - Blue Ring Collision Height

Changed the climbable blue start ring/platform height.

Important coordinate note:
- In this three.js/WebXR scene, Y is the vertical/up axis.
- X/Z are horizontal ground-plane axes.
- Therefore, raising the blue ring/collision is done by increasing Y, not Z.

Changes:
- Added START_RING_TOP_Y = 1.20.
- Moved the visible blue ring to y = 1.20.
- Raised the invisible collision cylinder to extend from y = 0 to y = 1.20.
- Updated startRingPlatform.topY to 1.20 so the player can stand on the higher platform.

Existing preserved:
- Add26 hand rotation corrections.
- View-direction based VR locomotion.
- Grip animation.
- Copyright 2026.
