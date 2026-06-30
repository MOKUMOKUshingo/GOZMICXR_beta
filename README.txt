GOZMIX Space 1 - public / upload build

Entry point:
- index.html

Runtime movie:
- Put the large movie at: video/projectmovie1.mp4
- Optional mobile fallback: video/projectmovie1_mobile.mp4

Main editable settings:
- three_scene/config.js

Three.js scene modules:
- three_scene/main.js: main scene wiring and runtime loop
- three_scene/config.js: paths, screen sizes, movement, AR/VR tuning
- three_scene/modules/scene-i18n.js: scene language text and language detection
- three_scene/modules/screen-geometry.js: parabolic screen geometry
- three_scene/modules/xr-input.js: WebXR gamepad axis helpers

XR hand model:
- three_scene/assets/XRRightH_New4.glb

Public upload shape:
- This ZIP has a single root folder whose name matches the ZIP name.
- For the current GOSMIC/Django uploader, keep this one-root-folder structure.
