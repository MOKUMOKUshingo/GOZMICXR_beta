Add 11 update: movement, seek controls, and parabolic screen

Base: 3d5start54_add_10_projectmovie_target_fixed.zip

Changes are limited to the three_scene side.

1. WASD movement fix
- Desktop movement now uses camera.getWorldDirection() after the mouse-look rotation is applied.
- W/S moves exactly in the current horizontal viewing direction.
- A/D moves perpendicular to that same direction.
- This fixes the earlier yaw-sign mismatch / stale-rotation issue after dragging the mouse.

2. Rewind / fast-forward
- Added DOM buttons in the project movie panel: -10s and +10s.
- Added keyboard shortcuts: J = -10s, K = play/pause, L = +10s.
- Added 3D raycast buttons under the movie screen so mouse, VR controller, and AR ray/tap can use rewind / play / fast-forward.

3. Parabolic movie screen
- The Project Movie screen is no longer a flat PlaneGeometry.
- It uses a generated parabolic BufferGeometry with UVs, so video/projectmovie1.mp4 or the poster texture maps onto a curved screen.
- The AR mini-screen also uses the same parabolic geometry at a smaller scale.

Video note:
- video/projectmovie1.mp4 is intentionally not included. Put the heavy movie at video/projectmovie1.mp4 before testing.
