GOZMIX Space 1 - Safe Publish Package

Entry point:
- index.html

Main 3D/XR scene:
- three_scene/index.html
- three_scene/main.js

Required external movie:
- Put your movie file here when testing/publishing:
  video/projectmovie1.mp4

Optional mobile fallback movie:
- If needed, put a mobile-friendly version here:
  video/projectmovie1_mobile.mp4

Notes:
- This package keeps the Add37 behavior and removes only development history notes and placeholder text files.
- For GOSMIC upload compatibility, the ZIP name and the inner root folder name are both:
  gozmix_space1_safe
- VR/AR features should be tested on HTTPS or localhost.


Maintenance update
------------------
This package includes three_scene/config.js.
Common values such as video paths, hand GLB path, screen sizes, AR screen limits,
start-ring collision height, and VR jump power can now be changed in config.js
without editing the large main.js file directly.

Current hand model:
three_scene/assets/XRRightH_New3.glb
