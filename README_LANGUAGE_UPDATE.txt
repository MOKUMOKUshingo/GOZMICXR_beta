Language switch update
======================

Added English / Japanese language switching while preserving the existing COZMIX Space Vibes structure, Chico photo -> three.js transition, VR mode, AR mode, and the top-page video swap.

Main additions:
- css/language-switcher.css
- js/language-switcher.js
- three_scene/language-scene.css
- three_scene/language-scene.js

Behavior:
- A fixed EN / 日本語 switcher appears on the top page.
- The selected language is saved in localStorage as cozmixSpaceLang.
- The Chico gallery entry opens three_scene/index.html with ?lang=en or ?lang=ja.
- The three.js scene reads the same language setting.
- Main HUD text and the 3D/VR/AR guide sprites are localized.

Preserved video behavior:
- Top page video: video/Title1-1_web.mp4
- three.js video screen: ../video/projectmovie1.mp4

Note:
- video/Title1-1_web.mp4 is still only referenced. Add the actual MP4 file to the video folder before publishing if needed.
