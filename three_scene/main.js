import * as THREE from 'three';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import { ARButton } from 'three/addons/webxr/ARButton.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';

const LANG_KEY = 'cozmixSpaceLang';
const sceneTexts = {
  en: {
    arName: 'COZMIX Space AR Mini Gallery',
    arLabel: ['COZMIX Space AR', 'tap a surface to place'],
    vrButton: 'ENTER VR',
    arButton: 'START AR',
    cameraARButton: 'CAMERA AR',
    exitCameraAR: 'EXIT CAMERA AR',
    videoLabel: 'PROJECT MOVIE',
    videoWaiting: 'The large movie is not loaded yet. The poster is shown until the video can play.',
    videoLoading: 'Loading projectmovie1.mp4... If it is hundreds of MB, this can take time.',
    videoReady: 'Video metadata is ready. Press Play video or tap the movie screen.',
    videoPlayingMuted: 'Playing muted in the 3D / VR / AR screen.',
    videoPlayingSound: 'Playing with sound in the 3D / VR / AR screen.',
    videoPaused: 'Paused. Press Play video or tap the movie screen to resume.',
    videoBuffering: 'Buffering video data...',
    videoError: 'projectmovie1.mp4 could not be played. Showing the poster instead.',
    playMuted: 'Play video',
    playSound: 'Play with sound',
    retryVideo: 'Retry',
    rewindVideo: '-10s',
    forwardVideo: '+10s',
    videoSeekingBack: 'Rewound 10 seconds.',
    videoSeekingForward: 'Fast-forwarded 10 seconds.',
    videoSeekUnknown: 'Video duration is not ready yet. Wait until metadata is loaded.',
    playNative: 'Mobile player',
    nativeNote: 'If mobile inline playback fails, use this native video player.'
  },
  ja: {
    arName: 'COZMIX Space AR ミニギャラリー',
    arLabel: ['COZMIX Space AR', '床や机をタップして配置'],
    vrButton: 'VRに入る',
    arButton: 'ARを開始',
    cameraARButton: 'カメラAR',
    exitCameraAR: 'カメラAR終了',
    videoLabel: 'PROJECT MOVIE',
    videoWaiting: '大容量動画はまだ読み込んでいません。再生できるまではposter画像を表示します。',
    videoLoading: 'projectmovie1.mp4を読み込み中です。数百MBある場合は時間がかかります。',
    videoReady: '動画メタデータを確認しました。「映像を再生」または画面タップで再生できます。',
    videoPlayingMuted: '3D / VR / AR空間内で無音再生中です。',
    videoPlayingSound: '3D / VR / AR空間内で音声あり再生中です。',
    videoPaused: '一時停止中です。再生ボタンまたは動画スクリーンを押すと再開します。',
    videoBuffering: '動画データをバッファ中です。',
    videoError: 'projectmovie1.mp4を再生できません。代わりにposter画像を表示しています。',
    playMuted: '映像を再生',
    playSound: '音声ありで再生',
    retryVideo: '再読込',
    rewindVideo: '-10秒',
    forwardVideo: '+10秒',
    videoSeekingBack: '10秒巻き戻しました。',
    videoSeekingForward: '10秒早送りしました。',
    videoSeekUnknown: '動画の長さをまだ取得できません。メタデータ読み込み後に操作できます。',
    playNative: 'スマホ再生',
    nativeNote: 'スマホで3D内再生できない場合は、このネイティブ再生で確認できます。'
  }
};

function getSceneLang() {
  const fromUrl = new URLSearchParams(window.location.search).get('lang');
  if (fromUrl === 'ja' || fromUrl === 'en') {
    try { localStorage.setItem(LANG_KEY, fromUrl); } catch (e) {}
    return fromUrl;
  }
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === 'ja' || saved === 'en') return saved;
  } catch (e) {}
  return (navigator.language || '').toLowerCase().startsWith('ja') ? 'ja' : 'en';
}

const sceneLang = getSceneLang();
const tr = sceneTexts[sceneLang];
const canvasFontFamily = sceneLang === 'ja' ? 'Arial, \"Hiragino Sans\", \"Yu Gothic\", sans-serif' : 'Arial';
const SHOW_SCENE_TEXT_SIGNS = false;

function setXRButtonLabels() {
  if (sceneLang !== 'ja') return;
  const vr = document.getElementById('VRButton');
  const ar = document.getElementById('ARButton');
  if (vr && /ENTER VR/i.test(vr.textContent)) vr.textContent = tr.vrButton;
  if (ar && /START AR/i.test(ar.textContent)) ar.textContent = tr.arButton;
}


const app = document.getElementById('app');
const hud = document.getElementById('hud');
const mobileControls = document.getElementById('mobileControls');
const projectVideoPanel = document.getElementById('projectVideoPanel');
const projectVideoLabel = document.getElementById('projectVideoLabel');
const projectVideoStatus = document.getElementById('projectVideoStatus');
const playProjectMuted = document.getElementById('playProjectMuted');
const playProjectSound = document.getElementById('playProjectSound');
const rewindProjectVideo = document.getElementById('rewindProjectVideo');
const forwardProjectVideo = document.getElementById('forwardProjectVideo');
const reloadProjectVideo = document.getElementById('reloadProjectVideo');
const openNativeProjectVideo = document.getElementById('openNativeProjectVideo');
const nativeVideoOverlay = document.getElementById('nativeVideoOverlay');
const nativeProjectVideo = document.getElementById('nativeProjectVideo');
const closeNativeVideo = document.getElementById('closeNativeVideo');
const directProjectVideoLink = document.getElementById('directProjectVideoLink');
const nativeVideoNote = document.getElementById('nativeVideoNote');
if (projectVideoLabel) projectVideoLabel.textContent = tr.videoLabel;
if (playProjectMuted) playProjectMuted.textContent = tr.playMuted;
if (playProjectSound) playProjectSound.textContent = tr.playSound;
if (rewindProjectVideo) rewindProjectVideo.textContent = tr.rewindVideo;
if (forwardProjectVideo) forwardProjectVideo.textContent = tr.forwardVideo;
if (reloadProjectVideo) reloadProjectVideo.textContent = tr.retryVideo;
if (openNativeProjectVideo) openNativeProjectVideo.textContent = tr.playNative || 'Mobile player';
if (nativeVideoNote) nativeVideoNote.textContent = tr.nativeNote || '';
if (nativeProjectVideo) {
  nativeProjectVideo.playsInline = true;
  nativeProjectVideo.setAttribute('playsinline', '');
  nativeProjectVideo.setAttribute('webkit-playsinline', '');
  nativeProjectVideo.preload = 'metadata';
}
const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.matchMedia('(pointer: coarse)').matches;
if (isMobile) document.body.classList.add('is-mobile');

const scene = new THREE.Scene();
const defaultBackground = new THREE.Color(0x061b2a);
const defaultFog = new THREE.Fog(0x061b2a, 18, 76);
scene.background = defaultBackground;
scene.fog = defaultFog;

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 180);
camera.rotation.order = 'YXZ';
const desktopCameraPosition = new THREE.Vector3(0, 2.0, 8.2);
camera.position.copy(desktopCameraPosition);

const player = new THREE.Group();
player.name = 'XR Player Rig';
player.add(camera);
scene.add(player);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
renderer.xr.setReferenceSpaceType('local');
renderer.setClearColor(0x000000, 1);
app.appendChild(renderer.domElement);

let requestedXRMode = null;
let currentXRMode = null;
let cameraARActive = false;
let cameraARStream = null;
let cameraARVideo = null;

const vrButton = VRButton.createButton(renderer);
vrButton.id = 'VRButton';
vrButton.addEventListener('click', () => {
  if (!renderer.xr.isPresenting) requestedXRMode = 'vr';
});
document.body.appendChild(vrButton);

const arButton = ARButton.createButton(renderer, {
  optionalFeatures: ['hit-test', 'dom-overlay', 'local-floor'],
  domOverlay: { root: document.body }
});
arButton.id = 'ARButton';
arButton.addEventListener('click', () => {
  if (!renderer.xr.isPresenting) requestedXRMode = 'ar';
});
document.body.appendChild(arButton);

const cameraARButton = document.createElement('button');
cameraARButton.id = 'CameraARButton';
cameraARButton.type = 'button';
cameraARButton.textContent = tr.cameraARButton || 'CAMERA AR';
cameraARButton.addEventListener('click', () => {
  if (cameraARActive) stopCameraARFallback();
  else startCameraARFallback();
});
document.body.appendChild(cameraARButton);
setXRButtonLabels();
setTimeout(setXRButtonLabels, 300);
setTimeout(setXRButtonLabels, 1200);

const hemi = new THREE.HemisphereLight(0x9fdfff, 0x08202d, 2.0);
scene.add(hemi);

const keyLight = new THREE.DirectionalLight(0xffffff, 2.1);
keyLight.position.set(4, 9, 6);
scene.add(keyLight);

const rimLight = new THREE.PointLight(0x59d7ff, 45, 42);
rimLight.position.set(-6, 5, 5);
scene.add(rimLight);

const loader = new THREE.TextureLoader();
const photoPaths = [
  '../img/gallery/portrait-01.jpg', '../img/gallery/nature-01.jpg', '../img/gallery/animal-01.jpg', '../img/gallery/building-01.jpg',
  '../img/gallery/portrait-02.jpg', '../img/gallery/nature-02.jpg', '../img/gallery/animal-02.jpg', '../img/gallery/building-02.jpg',
  '../img/gallery/portrait-03.jpg', '../img/gallery/animal-03.jpg', '../img/gallery/building-03.jpg', '../img/gallery/portrait-04.jpg'
];

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function makeTextSprite(text, options = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = options.width || 1024;
  canvas.height = options.height || 256;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = options.background || 'rgba(0, 36, 56, 0.72)';
  roundRect(ctx, 18, 32, canvas.width - 36, canvas.height - 68, 34);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.35)';
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.fillStyle = '#ffffff';
  ctx.font = options.font || `46px ${canvasFontFamily}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const lines = Array.isArray(text) ? text : [text];
  const lineHeight = options.lineHeight || 54;
  const startY = canvas.height / 2 - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((line, i) => ctx.fillText(line, canvas.width / 2, startY + i * lineHeight));

  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(options.scaleX || 7.8, options.scaleY || 1.95, 1);
  return sprite;
}

const floorGeometry = new THREE.CircleGeometry(38, 128);
const floorMaterial = new THREE.MeshStandardMaterial({
  color: 0x064960,
  metalness: 0.08,
  roughness: 0.35,
  transparent: true,
  opacity: 0.64,
  side: THREE.DoubleSide
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.name = 'Teleport Floor';
floor.rotation.x = -Math.PI / 2;
floor.position.y = -1.0;
scene.add(floor);

const grid = new THREE.GridHelper(70, 70, 0x6ee6ff, 0x1a5666);
grid.position.y = -0.98;
grid.material.transparent = true;
grid.material.opacity = 0.25;
scene.add(grid);

const portalGroup = new THREE.Group();
scene.add(portalGroup);

const ringGeometry = new THREE.TorusGeometry(2.3, 0.055, 20, 128);
const ringMaterial = new THREE.MeshStandardMaterial({ color: 0x69e6ff, emissive: 0x0b8cb4, emissiveIntensity: 1.25 });
const ring = new THREE.Mesh(ringGeometry, ringMaterial);
ring.name = 'Start Position Climb Ring';
// Put the blue ring at the protagonist start position and lay it flat so it
// works as a climbable portal/platform instead of a distant vertical sign.
ring.position.set(0, 0.42, 0);
ring.rotation.x = Math.PI / 2;
portalGroup.add(ring);

// Invisible collision volume for the start ring. The visible torus is thin, so
// the player uses this low cylinder as the walkable/climbable platform.
const startRingCollision = new THREE.Mesh(
  new THREE.CylinderGeometry(2.58, 2.58, 0.42, 64),
  new THREE.MeshBasicMaterial({ visible: false })
);
startRingCollision.name = 'Start Position Climb Ring Collision';
startRingCollision.position.set(0, 0.21, 0);
portalGroup.add(startRingCollision);

const startRingPlatform = { x: 0, z: 0, radius: 2.58, topY: 0.42 };
const tmpClimbHeadWorld = new THREE.Vector3();

function getClimbGroundYAtXZ(x, z) {
  const dx = x - startRingPlatform.x;
  const dz = z - startRingPlatform.z;
  return (dx * dx + dz * dz <= startRingPlatform.radius * startRingPlatform.radius)
    ? startRingPlatform.topY
    : xrGroundY;
}

function getCurrentClimbGroundY() {
  camera.getWorldPosition(tmpClimbHeadWorld);
  return getClimbGroundYAtXZ(tmpClimbHeadWorld.x, tmpClimbHeadWorld.z);
}

const video = document.getElementById('projectVideoSource');
const PROJECT_VIDEO_SRC = '../video/projectmovie1.mp4';
const PROJECT_VIDEO_MOBILE_SRC = '../video/projectmovie1_mobile.mp4';
let selectedProjectVideoSrc = PROJECT_VIDEO_SRC;
let selectedNativeProjectVideoSrc = PROJECT_VIDEO_SRC;
let webVideoFallbackAvailable = false;

function shouldUseProjectMovieSource() {
  // The in-scene three.js / VR / AR screen must always use projectmovie1.mp4.
  return true;
}

function chooseSceneVideoSource() {
  // Keep the 3D screen source fixed. projectmovie1_mobile.mp4 is used only by
  // the optional smartphone native player, never by the VR/AR/3D screen.
  return PROJECT_VIDEO_SRC;
}

function setProjectSceneVideoSource(src = PROJECT_VIDEO_SRC) {
  const nextSrc = src || PROJECT_VIDEO_SRC;
  selectedProjectVideoSrc = nextSrc;
  if (video && video.src !== new URL(nextSrc, window.location.href).href) {
    video.pause();
    video.src = nextSrc;
    try { video.load(); } catch (e) {}
  }
}

function setNativeProjectVideoSource(src = PROJECT_VIDEO_SRC) {
  selectedNativeProjectVideoSrc = src || PROJECT_VIDEO_SRC;
  if (nativeProjectVideo && nativeProjectVideo.src !== new URL(selectedNativeProjectVideoSrc, window.location.href).href) {
    nativeProjectVideo.pause();
    nativeProjectVideo.src = selectedNativeProjectVideoSrc;
  }
  if (directProjectVideoLink) directProjectVideoLink.href = selectedNativeProjectVideoSrc;
}

function setProjectVideoSources(src = PROJECT_VIDEO_SRC) {
  setProjectSceneVideoSource(PROJECT_VIDEO_SRC);
  setNativeProjectVideoSource(src || PROJECT_VIDEO_SRC);
}

async function canUseVideoFile(url) {
  try {
    const response = await fetch(url, { method: 'HEAD', cache: 'no-store' });
    return response && response.ok;
  } catch (error) {
    return false;
  }
}

async function initializeProjectVideoSource() {
  webVideoFallbackAvailable = await canUseVideoFile(PROJECT_VIDEO_MOBILE_SRC);
  const sceneSrc = PROJECT_VIDEO_SRC;
  const nativeSrc = (isMobile && webVideoFallbackAvailable) ? PROJECT_VIDEO_MOBILE_SRC : PROJECT_VIDEO_SRC;
  setProjectSceneVideoSource(PROJECT_VIDEO_SRC);
  setNativeProjectVideoSource(nativeSrc);
  try { video.load(); } catch (e) {}
  try { if (nativeProjectVideo) nativeProjectVideo.load(); } catch (e) {}
  return sceneSrc;
}

video.muted = true;
video.loop = true;
video.playsInline = true;
video.controls = false;
video.setAttribute('playsinline', '');
video.setAttribute('webkit-playsinline', '');
video.preload = 'auto';
setProjectVideoSources(PROJECT_VIDEO_SRC);
const projectVideoSourceReady = initializeProjectVideoSource();

const posterTexture = loader.load('../img/title1-poster.jpg');
posterTexture.colorSpace = THREE.SRGBColorSpace;

let videoTexture = null;
let htmlVideoTexture = null;
const videoFrameCanvas = document.createElement('canvas');
const videoFrameContext = videoFrameCanvas.getContext('2d', { alpha: false });
let canvasVideoTexture = null;
let canvasBridgeFailed = false;
let useCanvasBridge = false; // Direct THREE.VideoTexture is the primary path. Canvas bridge is kept only as an emergency fallback.
let videoEverPlayed = false;
let videoLoadTimer = null;
const videoPlayObjects = [];
const videoControlObjects = [];
const videoInteractiveObjects = [];

function addVideoInteractiveObject(object, action = 'toggle') {
  object.userData.projectVideoAction = action;
  videoInteractiveObjects.push(object);
  if (action === 'toggle') videoPlayObjects.push(object);
  else videoControlObjects.push(object);
}

function isObjectVisibleInScene(object) {
  let current = object;
  while (current) {
    if (current.visible === false) return false;
    current = current.parent;
  }
  return true;
}

function findProjectVideoAction(object) {
  if (!isObjectVisibleInScene(object)) return null;
  let current = object;
  while (current) {
    if (current.userData && current.userData.projectVideoAction) return current.userData.projectVideoAction;
    current = current.parent;
  }
  return null;
}

function createParabolicScreenGeometry(width, height, widthSegments = 48, heightSegments = 28, depth = 0.42) {
  const geometry = new THREE.BufferGeometry();
  const positions = [];
  const uvs = [];
  const indices = [];

  for (let y = 0; y <= heightSegments; y++) {
    const v = y / heightSegments;
    const py = (0.5 - v) * height;
    const ny = (py / (height * 0.5));
    for (let x = 0; x <= widthSegments; x++) {
      const u = x / widthSegments;
      const px = (u - 0.5) * width;
      const nx = px / (width * 0.5);
      const pz = depth * (nx * nx + 0.16 * ny * ny);
      positions.push(px, py, pz);
      uvs.push(u, 1 - v);
    }
  }

  for (let y = 0; y < heightSegments; y++) {
    for (let x = 0; x < widthSegments; x++) {
      const a = y * (widthSegments + 1) + x;
      const b = a + 1;
      const c = a + (widthSegments + 1);
      const d = c + 1;
      indices.push(a, c, b, b, c, d);
    }
  }

  geometry.setIndex(indices);
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.computeVertexNormals();
  return geometry;
}

function makeVideoControlButton(label, action, width = 0.88, height = 0.32) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 180;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(0, 62, 84, 0.86)';
  roundRect(ctx, 18, 18, canvas.width - 36, canvas.height - 36, 58);
  ctx.fill();
  ctx.strokeStyle = 'rgba(155, 227, 255, 0.72)';
  ctx.lineWidth = 6;
  ctx.stroke();
  ctx.fillStyle = '#ffffff';
  ctx.font = `700 58px ${canvasFontFamily}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, canvas.width / 2, canvas.height / 2 + 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, toneMapped: false, side: THREE.DoubleSide });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height), material);
  mesh.name = `Project Movie Control: ${action}`;
  mesh.userData.projectVideoAction = action;
  return mesh;
}

const videoMaterial = new THREE.MeshBasicMaterial({
  map: posterTexture,
  toneMapped: false,
  side: THREE.DoubleSide
});
let arVideoMaterial = null;

function setProjectVideoStatus(message, state = '') {
  if (!projectVideoStatus) return;
  projectVideoStatus.textContent = message;
  if (projectVideoPanel) {
    projectVideoPanel.classList.toggle('is-playing', state === 'playing');
    projectVideoPanel.classList.toggle('is-error', state === 'error');
  }
}

function showPosterOnVideoScreens() {
  showDesktopVideoOverlay(false);
  videoMaterial.map = posterTexture;
  videoMaterial.needsUpdate = true;
  if (arVideoMaterial) {
    arVideoMaterial.map = posterTexture;
    arVideoMaterial.needsUpdate = true;
  }
}

function applyProjectVideoMap(texture) {
  if (!texture) return;
  videoMaterial.map = texture;
  videoMaterial.needsUpdate = true;
  if (arVideoMaterial) {
    arVideoMaterial.map = texture;
    arVideoMaterial.needsUpdate = true;
  }
}

function buildHTMLVideoTexture() {
  const texture = new THREE.VideoTexture(video);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  return texture;
}

function rebuildHTMLVideoTexture() {
  if (htmlVideoTexture) {
    try { htmlVideoTexture.dispose(); } catch (e) {}
  }
  htmlVideoTexture = buildHTMLVideoTexture();
  videoTexture = htmlVideoTexture;
  applyProjectVideoMap(htmlVideoTexture);
  return htmlVideoTexture;
}

function ensureFallbackHTMLVideoTexture() {
  if (!htmlVideoTexture) htmlVideoTexture = buildHTMLVideoTexture();
  return htmlVideoTexture;
}

function ensureCanvasVideoTexture() {
  if (!canvasVideoTexture) {
    videoFrameCanvas.width = 16;
    videoFrameCanvas.height = 9;
    canvasVideoTexture = new THREE.CanvasTexture(videoFrameCanvas);
    canvasVideoTexture.colorSpace = THREE.SRGBColorSpace;
    canvasVideoTexture.minFilter = THREE.LinearFilter;
    canvasVideoTexture.magFilter = THREE.LinearFilter;
    canvasVideoTexture.generateMipmaps = false;
  }
  return canvasVideoTexture;
}

function resizeVideoFrameCanvas() {
  const vw = video.videoWidth || 1280;
  const vh = video.videoHeight || 720;
  if (!vw || !vh) return false;
  const maxW = 1280;
  const scale = Math.min(1, maxW / vw);
  const w = Math.max(2, Math.round(vw * scale));
  const h = Math.max(2, Math.round(vh * scale));
  if (videoFrameCanvas.width !== w || videoFrameCanvas.height !== h) {
    videoFrameCanvas.width = w;
    videoFrameCanvas.height = h;
  }
  return true;
}

function sampleVideoFrameLooksBlack() {
  if (!video || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA || !video.videoWidth || !video.videoHeight) return false;
  try {
    const sample = document.createElement('canvas');
    sample.width = 24;
    sample.height = 14;
    const ctx = sample.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(video, 0, 0, sample.width, sample.height);
    const data = ctx.getImageData(0, 0, sample.width, sample.height).data;
    let total = 0;
    let lit = 0;
    for (let i = 0; i < data.length; i += 4) {
      const y = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
      total += y;
      if (y > 18) lit += 1;
    }
    const mean = total / (data.length / 4);
    return mean < 8 && lit < 5;
  } catch (e) {
    return false;
  }
}

function maybeFallbackFromBlackDesktopVideo() {
  // Do not replace the in-scene source with projectmovie1_mobile.mp4.
  // If WebGL VideoTexture is black on PC, the live HTML video is projected
  // over the 3D screen as a visual fallback while the same projectmovie1.mp4
  // continues to feed the VR/AR screen.
  if (renderer.xr.isPresenting || cameraARActive) return;
  if (video && !video.paused && sampleVideoFrameLooksBlack()) {
    showDesktopVideoOverlay(true);
    setProjectVideoStatus('PC Web fallback: showing the live projectmovie1.mp4 element on the in-scene screen.', 'loading');
  }
}

function updateVideoFrameTexture(force = false) {
  if (!video || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) return false;

  // Primary path: use THREE.VideoTexture directly. On some desktop browsers the
  // canvas drawImage bridge can stay black while audio plays, especially with
  // hardware-decoded MP4. Direct VideoTexture is more reliable for this case.
  if (!useCanvasBridge || canvasBridgeFailed || !videoFrameContext) {
    const texture = ensureFallbackHTMLVideoTexture();
    texture.needsUpdate = true;
    applyProjectVideoMap(texture);
    return true;
  }

  try {
    resizeVideoFrameCanvas();
    videoFrameContext.drawImage(video, 0, 0, videoFrameCanvas.width, videoFrameCanvas.height);
    const texture = ensureCanvasVideoTexture();
    texture.needsUpdate = true;
    applyProjectVideoMap(texture);
    return true;
  } catch (error) {
    canvasBridgeFailed = true;
    const texture = ensureFallbackHTMLVideoTexture();
    texture.needsUpdate = true;
    applyProjectVideoMap(texture);
    return true;
  }
}

function ensureVideoTexture() {
  videoTexture = (!useCanvasBridge || canvasBridgeFailed) ? ensureFallbackHTMLVideoTexture() : ensureCanvasVideoTexture();
  if (!updateVideoFrameTexture(true)) applyProjectVideoMap(videoTexture);
}

function syncNativeProjectVideoTime() {
  if (!nativeProjectVideo || !video) return;
  try {
    if (Number.isFinite(video.currentTime) && Math.abs((nativeProjectVideo.currentTime || 0) - video.currentTime) > 1.2) {
      nativeProjectVideo.currentTime = video.currentTime;
    }
  } catch (e) {}
}

async function openNativeProjectVideoOverlay(withSound = true) {
  if (!nativeProjectVideo || !nativeVideoOverlay) return false;
  try { await projectVideoSourceReady; } catch (e) {}
  nativeVideoOverlay.hidden = false;
  nativeVideoOverlay.setAttribute('aria-hidden', 'false');
  syncNativeProjectVideoTime();
  nativeProjectVideo.muted = !withSound;
  if (withSound) nativeProjectVideo.removeAttribute('muted');
  else nativeProjectVideo.setAttribute('muted', '');
  nativeProjectVideo.volume = withSound ? 1.0 : 0.0;
  try {
    // Force the native element to evaluate the selected src after the overlay
    // becomes visible. This helps mobile Safari / Chrome recover from a prior
    // failed hidden-video play attempt.
    if (!nativeProjectVideo.src) nativeProjectVideo.src = selectedNativeProjectVideoSrc;
    if (nativeProjectVideo.readyState === 0) nativeProjectVideo.load();
    const promise = nativeProjectVideo.play();
    if (promise && typeof promise.then === 'function') await promise;
    setProjectVideoStatus(withSound ? tr.videoPlayingSound : tr.videoPlayingMuted, 'playing');
    return true;
  } catch (error) {
    setProjectVideoStatus(tr.videoError + ' 直接リンクも試してください。', 'error');
    return false;
  }
}

function closeNativeProjectVideoOverlay() {
  if (!nativeVideoOverlay || !nativeProjectVideo) return;
  try {
    if (video && Number.isFinite(nativeProjectVideo.currentTime)) video.currentTime = nativeProjectVideo.currentTime;
  } catch (e) {}
  nativeProjectVideo.pause();
  nativeVideoOverlay.hidden = true;
  nativeVideoOverlay.setAttribute('aria-hidden', 'true');
}

async function startProjectVideo(withSound = false, source = 'manual') {
  if (!video) return false;
  try { await projectVideoSourceReady; } catch (e) {}
  clearTimeout(videoLoadTimer);

  // Mobile browsers often reject hidden-video + WebGL texture playback even
  // when the same file plays in a normal video element. A real user tap on the
  // panel should therefore open the native player first.
  if (isMobile && source === 'manual' && !renderer.xr.isPresenting && !cameraARActive && nativeProjectVideo && nativeVideoOverlay) {
    return openNativeProjectVideoOverlay(withSound);
  }

  // Browsers allow muted autoplay, but sound usually needs a user gesture.
  // XR select / trigger is a user gesture, so when withSound=true we explicitly
  // remove the muted attribute as well as the muted property.
  if (withSound) {
    video.muted = false;
    video.removeAttribute('muted');
    video.volume = 1.0;
  } else {
    video.muted = true;
    video.setAttribute('muted', '');
    video.volume = 0.0;
  }

  setProjectVideoStatus(tr.videoLoading, 'loading');
  try {
    if (video.readyState === 0) video.load();
    const playPromise = video.play();
    if (playPromise && typeof playPromise.then === 'function') await playPromise;
    // Keep playback inside the three.js screen only. The HTML video element
    // remains a tiny live source for WebGL, but no separate desktop UI is shown.
    rebuildHTMLVideoTexture();
    ensureVideoTexture();
    if (!renderer.xr.isPresenting && !cameraARActive && !isMobile) showDesktopVideoOverlay(true);
    setTimeout(() => updateVideoFrameTexture(true), 80);
    setTimeout(() => updateVideoFrameTexture(true), 320);
    setTimeout(maybeFallbackFromBlackDesktopVideo, 900);
    setTimeout(maybeFallbackFromBlackDesktopVideo, 2200);
    videoEverPlayed = true;
    setProjectVideoStatus(withSound ? tr.videoPlayingSound : tr.videoPlayingMuted, 'playing');
    return true;
  } catch (error) {
    // If sound playback was blocked, keep a safe muted fallback instead of
    // leaving the XR screen black or stopped.
    if (withSound && source !== 'auto') {
      try {
        video.muted = true;
        video.setAttribute('muted', '');
        video.volume = 0.0;
        const mutedPlayPromise = video.play();
        if (mutedPlayPromise && typeof mutedPlayPromise.then === 'function') await mutedPlayPromise;
        ensureVideoTexture();
        videoEverPlayed = true;
        setProjectVideoStatus(tr.videoPlayingMuted, 'playing');
        return true;
      } catch (mutedError) {
        // fall through to poster fallback
      }
    }
    showPosterOnVideoScreens();
    const blocked = source === 'auto';
    if (isMobile && !blocked && nativeProjectVideo && nativeVideoOverlay) {
      return openNativeProjectVideoOverlay(withSound);
    }
    setProjectVideoStatus(blocked ? tr.videoWaiting : tr.videoError, blocked ? '' : 'error');
    return false;
  }
}

function toggleProjectVideo(withSound = false) {
  if (!video) return;
  if (video.paused || video.ended) {
    startProjectVideo(withSound, 'manual');
  } else if (withSound && video.muted) {
    // In VR, the user often starts with muted autoplay.
    // A trigger press on the screen should promote it to sound, not pause it.
    startProjectVideo(true, 'xr-select');
  } else {
    video.pause();
    setProjectVideoStatus(tr.videoPaused, '');
  }
}

function seekProjectVideo(seconds) {
  if (!video || !Number.isFinite(video.duration) || video.duration <= 0) {
    setProjectVideoStatus(tr.videoSeekUnknown, '');
    if (video && video.readyState === 0) video.load();
    return;
  }
  const nextTime = THREE.MathUtils.clamp((video.currentTime || 0) + seconds, 0, Math.max(0, video.duration - 0.05));
  try {
    video.currentTime = nextTime;
    ensureVideoTexture();
    setProjectVideoStatus(seconds < 0 ? tr.videoSeekingBack : tr.videoSeekingForward, video.paused ? '' : 'playing');
  } catch (error) {
    setProjectVideoStatus(tr.videoSeekUnknown, '');
  }
}

function runProjectVideoAction(action, withSound = false) {
  const wantsXRSound = currentXRMode === 'vr' || currentXRMode === 'ar';
  if (action === 'rewind') {
    seekProjectVideo(-10);
  } else if (action === 'forward') {
    seekProjectVideo(10);
  } else if (action === 'sound') {
    startProjectVideo(true, wantsXRSound ? 'xr-select' : 'manual');
  } else {
    toggleProjectVideo(withSound || wantsXRSound);
  }
}

function reloadProjectMovie() {
  if (!video) return;
  clearTimeout(videoLoadTimer);
  video.pause();
  try { video.currentTime = 0; } catch (e) {}
  video.load();
  showPosterOnVideoScreens();
  setProjectVideoStatus(tr.videoLoading, 'loading');
  startProjectVideo(false, 'manual');
}

function bindVideoButton(button, handler) {
  if (!button) return;
  let handledAt = 0;
  const run = (event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const now = performance.now();
    if (now - handledAt < 350) return;
    handledAt = now;
    handler();
  };
  button.addEventListener('pointerup', run);
  button.addEventListener('touchend', run, { passive: false });
  button.addEventListener('click', (event) => {
    if (performance.now() - handledAt < 650) {
      event.preventDefault();
      return;
    }
    run(event);
  });
}

bindVideoButton(playProjectMuted, () => startProjectVideo(false, 'manual'));
bindVideoButton(playProjectSound, () => startProjectVideo(true, 'manual'));
bindVideoButton(rewindProjectVideo, () => seekProjectVideo(-10));
bindVideoButton(forwardProjectVideo, () => seekProjectVideo(10));
bindVideoButton(reloadProjectVideo, reloadProjectMovie);
bindVideoButton(openNativeProjectVideo, () => openNativeProjectVideoOverlay(true));
bindVideoButton(closeNativeVideo, closeNativeProjectVideoOverlay);

video.addEventListener('loadedmetadata', () => {
  if (!videoEverPlayed) setProjectVideoStatus(tr.videoReady, '');
});
video.addEventListener('loadeddata', () => { ensureVideoTexture(); updateVideoFrameTexture(true); });
video.addEventListener('canplay', () => {
  if (!videoEverPlayed && video.paused) setProjectVideoStatus(tr.videoReady, '');
});
video.addEventListener('playing', () => {
  ensureVideoTexture();
  updateVideoFrameTexture(true);
  setProjectVideoStatus(video.muted ? tr.videoPlayingMuted : tr.videoPlayingSound, 'playing');
});
video.addEventListener('waiting', () => setProjectVideoStatus(tr.videoBuffering, 'loading'));
video.addEventListener('stalled', () => setProjectVideoStatus(tr.videoBuffering, 'loading'));
video.addEventListener('pause', () => {
  if (!video.ended && videoEverPlayed) setProjectVideoStatus(tr.videoPaused, '');
});
video.addEventListener('error', () => {
  showPosterOnVideoScreens();
  showDesktopVideoOverlay(false);
  setProjectVideoStatus(tr.videoError, 'error');
});

if (video.requestVideoFrameCallback) {
  const onProjectVideoFrame = () => {
    if (!video.paused && !video.ended) {
      const texture = ensureFallbackHTMLVideoTexture();
      texture.needsUpdate = true;
      applyProjectVideoMap(texture);
    }
    video.requestVideoFrameCallback(onProjectVideoFrame);
  };
  video.requestVideoFrameCallback(onProjectVideoFrame);
} else {
  setInterval(() => {
    if (!video.paused && !video.ended) updateVideoFrameTexture(true);
  }, 250);
}

if (nativeProjectVideo) {
  nativeProjectVideo.addEventListener('play', () => {
    if (video && !video.paused) video.pause();
    setProjectVideoStatus(tr.videoPlayingSound, 'playing');
  });
  nativeProjectVideo.addEventListener('pause', () => {
    if (!nativeProjectVideo.ended) setProjectVideoStatus(tr.videoPaused, '');
  });
  nativeProjectVideo.addEventListener('timeupdate', () => {
    if (nativeVideoOverlay && !nativeVideoOverlay.hidden && video) {
      try { video.currentTime = nativeProjectVideo.currentTime; } catch (e) {}
    }
  });
  nativeProjectVideo.addEventListener('error', () => {
    setProjectVideoStatus(tr.videoError + ' 直接リンク、またはprojectmovie1_mobile.mp4を試してください。', 'error');
  });
}
if (nativeVideoOverlay) {
  nativeVideoOverlay.addEventListener('click', (event) => {
    if (event.target === nativeVideoOverlay) closeNativeProjectVideoOverlay();
  });
}

setProjectVideoStatus(tr.videoWaiting, '');
videoLoadTimer = setTimeout(() => {
  if (!videoEverPlayed) setProjectVideoStatus(tr.videoWaiting, '');
}, 7000);
setTimeout(() => startProjectVideo(false, 'auto'), 350);

const projectScreenGroup = new THREE.Group();
projectScreenGroup.name = 'Large High Tilted Project Movie Screen Group';
// About 3x larger than the previous screen, placed about 4x higher and tilted
// downward so it feels like a large VR cinema screen looking over the floor.
projectScreenGroup.position.set(0, 9.1, -16.0);
projectScreenGroup.rotation.x = 0.48;
portalGroup.add(projectScreenGroup);

const projectScreenWidth = 17.08;
const projectScreenHeight = 9.60;
const videoScreen = new THREE.Mesh(
  createParabolicScreenGeometry(projectScreenWidth, projectScreenHeight, 120, 68, 1.45),
  videoMaterial
);
videoScreen.name = 'Project Movie Large High Parabolic Screen';
videoScreen.position.set(0, 0, 0);
projectScreenGroup.add(videoScreen);
addVideoInteractiveObject(videoScreen, 'toggle');

const rewindButton3D = makeVideoControlButton(tr.rewindVideo, 'rewind', 1.55, 0.48);
rewindButton3D.position.set(-2.75, -5.35, 0.56);
projectScreenGroup.add(rewindButton3D);
addVideoInteractiveObject(rewindButton3D, 'rewind');

const playButton3D = makeVideoControlButton('PLAY', 'toggle', 1.70, 0.48);
playButton3D.position.set(0, -5.35, 0.56);
projectScreenGroup.add(playButton3D);
addVideoInteractiveObject(playButton3D, 'toggle');

const forwardButton3D = makeVideoControlButton(tr.forwardVideo, 'forward', 1.55, 0.48);
forwardButton3D.position.set(2.75, -5.35, 0.56);
projectScreenGroup.add(forwardButton3D);
addVideoInteractiveObject(forwardButton3D, 'forward');

const desktopOverlayCorners = [
  new THREE.Vector3(-projectScreenWidth / 2, projectScreenHeight / 2, 0.72),
  new THREE.Vector3(projectScreenWidth / 2, projectScreenHeight / 2, 0.72),
  new THREE.Vector3(projectScreenWidth / 2, -projectScreenHeight / 2, 0.72),
  new THREE.Vector3(-projectScreenWidth / 2, -projectScreenHeight / 2, 0.72)
];
let desktopVideoOverlayForced = false;

function showDesktopVideoOverlay(show = true) {
  desktopVideoOverlayForced = !!show;
  if (!video) return;
  document.body.classList.toggle('desktop-video-overlay-active', desktopVideoOverlayForced && !renderer.xr.isPresenting && !cameraARActive && !isMobile);
}

function updateDesktopVideoOverlay() {
  if (!video) return;
  const active = desktopVideoOverlayForced && !renderer.xr.isPresenting && !cameraARActive && !isMobile;
  document.body.classList.toggle('desktop-video-overlay-active', active);
  if (!active) return;

  projectScreenGroup.updateWorldMatrix(true, false);
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const corner of desktopOverlayCorners) {
    const p = corner.clone().applyMatrix4(projectScreenGroup.matrixWorld).project(camera);
    const x = (p.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-p.y * 0.5 + 0.5) * window.innerHeight;
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }
  const pad = 4;
  const left = THREE.MathUtils.clamp(minX - pad, -window.innerWidth, window.innerWidth * 2);
  const top = THREE.MathUtils.clamp(minY - pad, -window.innerHeight, window.innerHeight * 2);
  const width = THREE.MathUtils.clamp(maxX - minX + pad * 2, 8, window.innerWidth * 2);
  const height = THREE.MathUtils.clamp(maxY - minY + pad * 2, 8, window.innerHeight * 2);
  video.style.left = `${left}px`;
  video.style.top = `${top}px`;
  video.style.width = `${width}px`;
  video.style.height = `${height}px`;
}

const cards = [];
const cardBacks = [];
const cardGeometry = new THREE.PlaneGeometry(1.6, 2.15);
const cardBackMaterial = new THREE.MeshStandardMaterial({ color: 0x022b3a, roughness: 0.62, metalness: 0.05, side: THREE.DoubleSide });

photoPaths.forEach((path, i) => {
  const texture = loader.load(path);
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
  const card = new THREE.Mesh(cardGeometry, material);
  const angle = -Math.PI * 0.76 + i * (Math.PI * 1.52 / (photoPaths.length - 1));
  const radius = 8.5;
  card.position.set(Math.sin(angle) * radius, 1.55 + Math.sin(i * 0.9) * 0.32, -3.0 - Math.cos(angle) * radius);
  card.lookAt(0, 1.6, 3.5);
  cards.push(card);
  scene.add(card);

  const back = new THREE.Mesh(cardGeometry, cardBackMaterial);
  back.position.copy(card.position);
  back.quaternion.copy(card.quaternion);
  back.translateZ(-0.025);
  scene.add(back);
  cardBacks.push(back);
});

const particleGeometry = new THREE.BufferGeometry();
const particleCount = 360;
const positions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount; i++) {
  const r = 10 + Math.random() * 35;
  const a = Math.random() * Math.PI * 2;
  positions[i * 3] = Math.cos(a) * r;
  positions[i * 3 + 1] = Math.random() * 11 - 0.5;
  positions[i * 3 + 2] = Math.sin(a) * r - 12;
}
particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const particles = new THREE.Points(
  particleGeometry,
  new THREE.PointsMaterial({ color: 0x9be3ff, size: 0.045, transparent: true, opacity: 0.72 })
);
scene.add(particles);


function setVRSceneVisible(visible) {
  floor.visible = visible;
  grid.visible = visible;
  portalGroup.visible = visible;
  particles.visible = visible;
  cards.forEach((card) => { card.visible = visible; });
  cardBacks.forEach((back) => { back.visible = visible; });
  if (!visible) teleportMarker.visible = false;
}

const arContent = new THREE.Group();
arContent.name = tr.arName;
arContent.visible = false;
scene.add(arContent);

const arBase = new THREE.Mesh(
  new THREE.RingGeometry(0.42, 0.48, 72),
  new THREE.MeshBasicMaterial({ color: 0x69e6ff, transparent: true, opacity: 0.56, side: THREE.DoubleSide })
);
arBase.rotation.x = -Math.PI / 2;
arBase.position.y = 0.012;
arContent.add(arBase);

const arGrid = new THREE.GridHelper(1.25, 8, 0x9be3ff, 0x2e8294);
arGrid.position.y = 0.018;
arGrid.material.transparent = true;
arGrid.material.opacity = 0.42;
arContent.add(arGrid);

const arPortal = new THREE.Group();
arPortal.position.set(0, 2.20, -1.10);
arPortal.rotation.x = 0.22;
arContent.add(arPortal);

const arPortalRing = new THREE.Mesh(
  new THREE.TorusGeometry(2.36, 0.030, 16, 128),
  new THREE.MeshStandardMaterial({ color: 0x69e6ff, emissive: 0x0b8cb4, emissiveIntensity: 1.35 })
);
arPortal.add(arPortalRing);

arVideoMaterial = new THREE.MeshBasicMaterial({
  map: videoTexture || posterTexture,
  toneMapped: false,
  transparent: true,
  opacity: 0.96,
  side: THREE.DoubleSide
});
const arVideoScreen = new THREE.Mesh(
  createParabolicScreenGeometry(4.64, 2.608, 72, 42, 0.44),
  arVideoMaterial
);
arVideoScreen.name = 'Project Movie AR Parabolic Screen';
arVideoScreen.position.z = -0.035;
arPortal.add(arVideoScreen);
addVideoInteractiveObject(arVideoScreen, 'toggle');

// AR controller/screen-tap rays are less precise than desktop mouse rays.
// Add a transparent, slightly larger touch target so a trigger aimed at the
// mini screen reliably toggles the movie.
const arVideoHitTarget = new THREE.Mesh(
  new THREE.PlaneGeometry(5.40, 3.16),
  new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.001, depthWrite: false, side: THREE.DoubleSide })
);
arVideoHitTarget.name = 'Project Movie AR Large Hit Target';
arVideoHitTarget.position.z = 0.035;
arPortal.add(arVideoHitTarget);
addVideoInteractiveObject(arVideoHitTarget, 'toggle');

const arRewindButton = makeVideoControlButton(tr.rewindVideo, 'rewind', 1.18, 0.38);
arRewindButton.position.set(-1.72, -1.66, 0.20);
arPortal.add(arRewindButton);
addVideoInteractiveObject(arRewindButton, 'rewind');

const arPlayButton = makeVideoControlButton('▶', 'toggle', 1.18, 0.38);
arPlayButton.position.set(0, -1.66, 0.20);
arPortal.add(arPlayButton);
addVideoInteractiveObject(arPlayButton, 'toggle');

const arForwardButton = makeVideoControlButton(tr.forwardVideo, 'forward', 1.18, 0.38);
arForwardButton.position.set(1.72, -1.66, 0.20);
arPortal.add(arForwardButton);
addVideoInteractiveObject(arForwardButton, 'forward');

const arLabel = makeTextSprite(tr.arLabel, {
  width: 1024,
  height: 300,
  font: `54px ${canvasFontFamily}`,
  lineHeight: 66,
  scaleX: 0.9,
  scaleY: 0.26,
  background: 'rgba(0, 53, 74, 0.70)'
});
arLabel.position.set(0, 2.72, -0.72);
arContent.add(arLabel);

const arCardGeometry = new THREE.PlaneGeometry(0.20, 0.27);
const arCards = [];
photoPaths.slice(0, 7).forEach((path, i) => {
  const texture = loader.load(path);
  texture.colorSpace = THREE.SRGBColorSpace;
  const arCard = new THREE.Mesh(
    arCardGeometry,
    new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide })
  );
  const angle = -Math.PI * 0.50 + i * (Math.PI / 6);
  arCard.position.set(Math.sin(angle) * 0.58, 0.35 + Math.sin(i * 0.8) * 0.035, -0.28 - Math.cos(angle) * 0.22);
  arCard.lookAt(0, 0.37, 0.18);
  arContent.add(arCard);
  arCards.push(arCard);
});

const arReticle = new THREE.Mesh(
  new THREE.RingGeometry(0.12, 0.155, 36),
  new THREE.MeshBasicMaterial({ color: 0x9be3ff, transparent: true, opacity: 0.86, side: THREE.DoubleSide })
);
arReticle.rotation.x = -Math.PI / 2;
arReticle.matrixAutoUpdate = false;
arReticle.visible = false;
scene.add(arReticle);

let hitTestSource = null;
let hitTestSourceRequested = false;

function resetARHitTest() {
  hitTestSource = null;
  hitTestSourceRequested = false;
  arReticle.visible = false;
}

function updateARHitTest(frame) {
  if (!frame || currentXRMode !== 'ar') return;

  const session = renderer.xr.getSession();
  if (!session) return;

  if (!hitTestSourceRequested) {
    session.requestReferenceSpace('viewer').then((viewerSpace) => {
      session.requestHitTestSource({ space: viewerSpace }).then((source) => {
        hitTestSource = source;
      }).catch(() => {
        hitTestSource = null;
      });
    }).catch(() => {
      hitTestSource = null;
    });

    session.addEventListener('end', resetARHitTest, { once: true });
    hitTestSourceRequested = true;
  }

  if (!hitTestSource) return;

  const referenceSpace = renderer.xr.getReferenceSpace();
  const hitTestResults = frame.getHitTestResults(hitTestSource);

  if (hitTestResults.length > 0) {
    const hit = hitTestResults[0];
    const pose = hit.getPose(referenceSpace);
    arReticle.visible = true;
    arReticle.matrix.fromArray(pose.transform.matrix);
  } else {
    arReticle.visible = false;
  }
}

const arCameraWorld = new THREE.Vector3();
const arPlacePosition = new THREE.Vector3();

function getActiveViewCamera() {
  return renderer.xr.isPresenting ? renderer.xr.getCamera(camera) : camera;
}

function orientARContentTowardCamera() {
  getActiveViewCamera().getWorldPosition(arCameraWorld);
  arContent.lookAt(arCameraWorld.x, arContent.position.y, arCameraWorld.z);
}

function placeARContent() {
  if (currentXRMode !== 'ar' || !arReticle.visible) return false;
  arPlacePosition.setFromMatrixPosition(arReticle.matrix);
  arContent.position.copy(arPlacePosition);
  arContent.position.y += 0.015;
  orientARContentTowardCamera();
  arContent.visible = true;
  return true;
}

function placeARContentInFrontOfCamera() {
  if (currentXRMode !== 'ar') return false;
  const xrCamera = renderer.xr.getCamera(camera);
  const forward = new THREE.Vector3();
  xrCamera.getWorldPosition(arCameraWorld);
  xrCamera.getWorldDirection(forward);
  forward.y = 0;
  if (forward.lengthSq() < 0.0001) forward.set(0, 0, -1);
  forward.normalize();
  arContent.position.copy(arCameraWorld).addScaledVector(forward, 1.15);
  arContent.position.y = Math.max(arCameraWorld.y - 0.55, -0.2);
  orientARContentTowardCamera();
  arContent.visible = true;
  return true;
}

function placeCameraARContentInFrontOfCamera() {
  const forward = new THREE.Vector3();
  camera.updateMatrixWorld(true);
  camera.getWorldPosition(arCameraWorld);
  camera.getWorldDirection(forward);
  if (forward.lengthSq() < 0.0001) forward.set(0, 0, -1);
  forward.normalize();
  arContent.position.copy(arCameraWorld).addScaledVector(forward, 1.35);
  arContent.position.y = arCameraWorld.y - 0.38;
  orientARContentTowardCamera();
  arContent.visible = true;
  return true;
}

async function startCameraARFallback() {
  if (renderer.xr.isPresenting || cameraARActive) return;
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    setProjectVideoStatus('Camera AR is not available in this browser.', 'error');
    return;
  }

  try {
    if (!cameraARVideo) {
      cameraARVideo = document.createElement('video');
      cameraARVideo.id = 'cameraARBackground';
      cameraARVideo.autoplay = true;
      cameraARVideo.muted = true;
      cameraARVideo.playsInline = true;
      cameraARVideo.setAttribute('playsinline', '');
      cameraARVideo.setAttribute('webkit-playsinline', '');
      document.body.insertBefore(cameraARVideo, app);
    }

    cameraARStream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: { ideal: 'environment' },
        width: { ideal: 1280 },
        height: { ideal: 720 }
      },
      audio: false
    });
    cameraARVideo.srcObject = cameraARStream;
    await cameraARVideo.play();

    cameraARActive = true;
    document.body.classList.add('in-camera-ar');
    cameraARButton.textContent = tr.exitCameraAR || 'EXIT CAMERA AR';
    scene.background = null;
    scene.fog = null;
    renderer.setClearColor(0x000000, 0);
    setVRSceneVisible(false);
    arReticle.visible = false;
    player.position.set(0, 0, 0);
    camera.position.copy(desktopCameraPosition);
    camera.rotation.set(pitch, yaw, 0);
    placeCameraARContentInFrontOfCamera();
    startProjectVideo(false, 'auto');
  } catch (error) {
    setProjectVideoStatus('Camera AR could not start. Please allow camera access or use WebXR AR on Android Chrome.', 'error');
    stopCameraARFallback();
  }
}

function stopCameraARFallback() {
  cameraARActive = false;
  document.body.classList.remove('in-camera-ar');
  cameraARButton.textContent = tr.cameraARButton || 'CAMERA AR';
  if (cameraARStream) {
    cameraARStream.getTracks().forEach((track) => track.stop());
    cameraARStream = null;
  }
  if (cameraARVideo) cameraARVideo.srcObject = null;
  scene.background = defaultBackground;
  scene.fog = defaultFog;
  renderer.setClearColor(0x000000, 1);
  setVRSceneVisible(true);
  arContent.visible = false;
  camera.position.copy(desktopCameraPosition);
  camera.rotation.set(pitch, yaw, 0);
}

const boundaryRadius = 19.5;
const teleportPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 1.0);
const teleportMarker = new THREE.Mesh(
  new THREE.RingGeometry(0.36, 0.52, 42),
  new THREE.MeshBasicMaterial({ color: 0x9be3ff, transparent: true, opacity: 0.88, side: THREE.DoubleSide })
);
teleportMarker.rotation.x = -Math.PI / 2;
teleportMarker.position.y = -0.91;
teleportMarker.visible = false;
scene.add(teleportMarker);

const controllerRayMaterial = new THREE.LineBasicMaterial({ color: 0x9be3ff, transparent: true, opacity: 0.78 });
const controllerLineGeometry = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, 0, -1)
]);
function createCapsulePart(radius, length, color, emissive = 0x123744) {
  const material = new THREE.MeshStandardMaterial({
    color,
    emissive,
    emissiveIntensity: 0.28,
    roughness: 0.38,
    metalness: 0.38
  });
  return new THREE.Mesh(new THREE.CapsuleGeometry(radius, length, 8, 16), material);
}


const xrHandLoader = new GLTFLoader();
const XR_HAND_ASSET_PATH = './assets/xr_hand_grip.glb';
let xrHandSource = null;
let xrHandClip = null;
let xrHandLoadPromise = null;

function loadXRHandAsset() {
  if (xrHandSource) return Promise.resolve({ scene: xrHandSource, clip: xrHandClip });
  if (xrHandLoadPromise) return xrHandLoadPromise;
  xrHandLoadPromise = xrHandLoader.loadAsync(XR_HAND_ASSET_PATH).then((gltf) => {
    xrHandSource = gltf.scene;
    xrHandClip = THREE.AnimationClip.findByName(gltf.animations || [], 'Grip') || (gltf.animations && gltf.animations[0]) || null;
    if (xrHandClip) console.info(`XR hand animation loaded: ${xrHandClip.name || '(unnamed)'}, ${xrHandClip.duration.toFixed(3)}s`);
    return { scene: xrHandSource, clip: xrHandClip };
  }).catch((error) => {
    console.warn('xr_hand_grip.glb load failed. Falling back to simple XR glove.', error);
    return { scene: null, clip: null };
  });
  return xrHandLoadPromise;
}

function createMinimalFallbackHand(handedness = 'right') {
  const side = handedness === 'left' ? -1 : 1;
  const group = new THREE.Group();
  group.name = `${handedness} temporary XR glove fallback`;
  const mat = new THREE.MeshPhysicalMaterial({
    color: 0x9ca6ff,
    emissive: 0x263dff,
    emissiveIntensity: 0.10,
    roughness: 0.28,
    metalness: 0.0,
    transparent: true,
    opacity: 0.52,
    transmission: 0.12,
    side: THREE.DoubleSide
  });
  const palm = new THREE.Mesh(new THREE.SphereGeometry(0.045, 24, 16), mat);
  palm.scale.set(0.72, 0.36, 1.06);
  palm.position.set(side * 0.018, -0.030, 0.060);
  group.add(palm);
  for (let i = 0; i < 4; i++) {
    const finger = new THREE.Mesh(new THREE.CapsuleGeometry(0.0085, 0.082 - i * 0.006, 10, 14), mat);
    finger.rotation.x = Math.PI / 2;
    finger.position.set(side * (-0.028 + i * 0.018), -0.025, 0.126 + Math.abs(i - 1.5) * 0.006);
    group.add(finger);
  }
  const thumb = new THREE.Mesh(new THREE.CapsuleGeometry(0.009, 0.062, 10, 14), mat);
  thumb.rotation.set(Math.PI / 2, side * 0.45, side * -0.58);
  thumb.position.set(side * 0.056, -0.032, 0.082);
  group.add(thumb);
  group.visible = true;
  return group;
}

function removeOtherHandParts(root, handedness) {
  // xr_hand_grip.glb contains both hands. Keep only the requested side so each
  // controller receives one correct GLB hand instead of an offset double-hand.
  // In this asset, GLOBAL_MAIN_CONTROL_R is the right-hand rig and
  // GLOBAL_MAIN_CONTROL_R1 is the mirrored left-hand rig.
  const removeNames = handedness === 'left'
    ? ['Hand_Low', 'GLOBAL_MAIN_CONTROL_R']
    : ['Hand_Low1', 'GLOBAL_MAIN_CONTROL_R1'];
  const removeSet = new Set(removeNames);
  const toRemove = [];
  root.traverse((obj) => {
    if (removeSet.has(obj.name)) toRemove.push(obj);
  });
  toRemove.forEach((obj) => {
    if (obj.parent) obj.parent.remove(obj);
  });
}

function stylizeLoadedXRHand(root) {
  root.traverse((obj) => {
    if (!obj.isMesh && !obj.isSkinnedMesh) return;
    obj.frustumCulled = false;
    obj.castShadow = false;
    obj.receiveShadow = false;
    obj.material = new THREE.MeshPhysicalMaterial({
      color: 0xa9aeff,
      emissive: 0x4557ff,
      emissiveIntensity: 0.12,
      roughness: 0.18,
      metalness: 0.0,
      transparent: true,
      opacity: 0.62,
      transmission: 0.14,
      thickness: 0.16,
      clearcoat: 0.62,
      clearcoatRoughness: 0.18,
      side: THREE.DoubleSide,
      depthWrite: false
    });
  });
}

const handBasisMatrix = new THREE.Matrix4();
const handBox = new THREE.Box3();
const handSize = new THREE.Vector3();
const handCenter = new THREE.Vector3();

const handWristWorld = new THREE.Vector3();
const handPalmWorld = new THREE.Vector3();
const handForwardLocal = new THREE.Vector3();
const handForwardTarget = new THREE.Vector3(0, 0, 1);
const handAlignQuat = new THREE.Quaternion();

function findHandNode(model, handedness, role) {
  const left = handedness === 'left';
  const candidates = {
    wrist: left ? ['Root_joint_023', '_rootJoint'] : ['Root_joint_01', '_rootJoint'],
    palm: left ? ['HANDPALM_joint_024', 'HANDPALM_cntrl'] : ['HANDPALM_joint_02', 'HANDPALM_cntrl'],
    middle: left ? ['MIDDLE_F_UP_TOP_joint_032', 'MIDDLE_F_TOP_joint_031'] : ['MIDDLE_F_UP_TOP_joint_010', 'MIDDLE_F_TOP_joint_09']
  }[role] || [];
  for (const name of candidates) {
    const node = model.getObjectByName(name);
    if (node) return node;
  }
  return null;
}

function normalizeLoadedHandModel(model, handedness = 'right') {
  model.position.set(0, 0, 0);
  model.rotation.set(0, 0, 0);
  model.scale.set(1, 1, 1);
  model.updateMatrixWorld(true);

  handBox.setFromObject(model);
  handBox.getSize(handSize);
  const maxDim = Math.max(handSize.x, handSize.y, handSize.z) || 1;
  const desired = 0.255;
  const scale = desired / maxDim;
  model.scale.setScalar(scale);
  model.updateMatrixWorld(true);

  // Self-calibration from the GLB skeleton:
  // wrist -> palm / middle-finger direction is the hand's natural forward axis.
  // Align the wrist -> palm/finger direction to the WebXR grip forward axis.
  // The previous -Z alignment made xr_hand_grip.glb face back toward the player.
  // For this asset in WebXR grip space, the correct visible hand direction is +Z.
  const wrist = findHandNode(model, handedness, 'wrist');
  const palm = findHandNode(model, handedness, 'palm') || findHandNode(model, handedness, 'middle');
  if (wrist && palm) {
    wrist.getWorldPosition(handWristWorld);
    palm.getWorldPosition(handPalmWorld);
    handForwardLocal.subVectors(handPalmWorld, handWristWorld).normalize();
    if (handForwardLocal.lengthSq() > 0.0001) {
      handAlignQuat.setFromUnitVectors(handForwardLocal, handForwardTarget);
      model.quaternion.premultiply(handAlignQuat);
    }
  } else {
    handAlignQuat.setFromUnitVectors(new THREE.Vector3(1, 0, 0), handForwardTarget);
    model.quaternion.premultiply(handAlignQuat);
  }

  model.updateMatrixWorld(true);
  const wristAfter = findHandNode(model, handedness, 'wrist');
  if (wristAfter) {
    wristAfter.getWorldPosition(handWristWorld);
    model.position.sub(handWristWorld);
  } else {
    handBox.setFromObject(model);
    handBox.getCenter(handCenter);
    model.position.sub(handCenter);
  }

  // The WebXR grip pose sits inside the physical controller grip. Put the wrist
  // slightly behind and below that origin so the fingers point naturally out of
  // the controller instead of floating around its center.
  model.position.x += handedness === 'left' ? -0.012 : 0.012;
  model.position.y -= 0.032;
  model.position.z += 0.030;
}

function setupGripAction(container, model, clip) {
  if (!clip) return;
  const mixer = new THREE.AnimationMixer(model);
  const action = mixer.clipAction(clip);
  action.setLoop(THREE.LoopOnce, 1);
  action.clampWhenFinished = true;
  action.enabled = true;
  action.paused = true;
  action.play();
  action.time = 0;
  mixer.update(0);
  container.userData.handMixer = mixer;
  container.userData.handClip = clip;
  container.userData.handAction = action;
}

function attachLoadedXRHand(container, handedness = 'right') {
  loadXRHandAsset().then(({ scene: sourceScene, clip }) => {
    if (!sourceScene) return;
    container.clear();
    const model = SkeletonUtils.clone(sourceScene);
    model.name = `${handedness} xr_hand_grip.glb controller hand`;
    removeOtherHandParts(model, handedness);
    stylizeLoadedXRHand(model);
    normalizeLoadedHandModel(model, handedness);
    container.add(model);
    container.userData.loadedGLBHand = model;
    setupGripAction(container, model, clip);
  });
}

function createXRHandModel(handedness = 'right') {
  const container = new THREE.Group();
  container.name = `${handedness} xr_hand_grip.glb hand container`;
  container.userData.handedness = handedness;
  container.userData.grip = 0;
  container.userData.gripTarget = 0;
  container.add(createMinimalFallbackHand(handedness));
  attachLoadedXRHand(container, handedness);
  return container;
}

function setXRHandGrip(handModel, targetGrip, delta = 1 / 60) {
  if (!handModel) return;
  const target = THREE.MathUtils.clamp(targetGrip, 0, 1);
  handModel.userData.gripTarget = target;
  const current = handModel.userData.grip || 0;
  const t = THREE.MathUtils.damp(current, target, 18, delta);
  handModel.userData.grip = t;

  if (handModel.userData.handMixer && handModel.userData.handClip && handModel.userData.handAction) {
    const duration = handModel.userData.handClip.duration || 1;
    const action = handModel.userData.handAction;
    action.enabled = true;
    action.paused = false;
    action.time = duration * t;
    handModel.userData.handMixer.update(0);
    action.paused = true;
    return;
  }

  // Fallback glove: subtly tilt fingers when the trigger/grip is pulled.
  handModel.children.forEach((child, index) => {
    if (index > 0) child.rotation.x = Math.PI / 2 - t * 0.72;
  });
}

function getButtonValue(source, indices) {
  if (!source || !source.gamepad || !source.gamepad.buttons) return 0;
  let value = 0;
  for (const index of indices) {
    const button = source.gamepad.buttons[index];
    if (!button) continue;
    value = Math.max(value, Number.isFinite(button.value) ? button.value : (button.pressed ? 1 : 0));
  }
  return value;
}

function getTriggerValueFromInputSource(source) {
  return getButtonValue(source, [0]);
}

function getGripButtonValueFromInputSource(source) {
  // index 1 is commonly the squeeze/grip button; keep index 0 as a fallback so
  // trigger-only controllers still animate the hand.
  return getButtonValue(source, [1, 0]);
}

function updateXRHandModels(delta = 1 / 60) {
  const session = renderer.xr.getSession();
  const handContainers = (typeof controllerGrips !== 'undefined' && controllerGrips.length) ? controllerGrips : controllers;
  if (!session) {
    handContainers.forEach((grip) => {
      const paired = grip.userData.pairedController || grip;
      const target = paired.userData.selecting || paired.userData.squeezeGripping ? 1 : 0;
      setXRHandGrip(grip.userData.handModel, target, delta);
    });
    return;
  }
  const sources = Array.from(session.inputSources);
  handContainers.forEach((grip, index) => {
    const handedness = grip.userData.handedness || (index === 0 ? 'left' : 'right');
    const fallback = sources[index];
    const source = sources.find((item) => item.handedness === handedness) || fallback;
    const paired = grip.userData.pairedController || grip;
    const buttonGrip = getGripButtonValueFromInputSource(source);
    const eventGrip = (paired.userData.selecting || paired.userData.squeezeGripping) ? 1 : 0;
    setXRHandGrip(grip.userData.handModel, Math.max(buttonGrip, eventGrip), delta);
  });
}

function setControllerHandModel(controller, handedness = 'right') {
  const normalized = handedness === 'left' ? 'left' : 'right';
  if (controller.userData.handedness === normalized && controller.userData.handModel) return;
  if (controller.userData.handModel) controller.remove(controller.userData.handModel);
  controller.userData.handedness = normalized;
  const handModel = createXRHandModel(normalized);
  controller.userData.handModel = handModel;
  controller.add(handModel);
}

const controllers = [];
const controllerGrips = [];
for (let i = 0; i < 2; i++) {
  const controller = renderer.xr.getController(i);
  controller.userData.index = i;
  controller.userData.selecting = false;
  controller.userData.squeezeGripping = false;
  controller.userData.teleportPoint = new THREE.Vector3();
  controller.userData.hasTeleportPoint = false;

  const ray = new THREE.Line(controllerLineGeometry, controllerRayMaterial.clone());
  ray.name = 'XR Controller Ray';
  ray.scale.z = 9;
  controller.add(ray);

  const controllerGrip = renderer.xr.getControllerGrip(i);
  controllerGrip.userData.index = i;
  controllerGrip.userData.pairedController = controller;
  controller.userData.visualGrip = controllerGrip;
  setControllerHandModel(controllerGrip, i === 0 ? 'left' : 'right');

  controller.addEventListener('connected', (event) => {
    const handedness = event.data && (event.data.handedness === 'left' || event.data.handedness === 'right')
      ? event.data.handedness
      : (i === 0 ? 'left' : 'right');
    controller.userData.handedness = handedness;
    setControllerHandModel(controllerGrip, handedness);
  });

  controller.addEventListener('disconnected', () => {
    controller.userData.selecting = false;
    controller.userData.squeezeGripping = false;
  });

  controller.addEventListener('squeezestart', () => {
    controller.userData.squeezeGripping = true;
  });

  controller.addEventListener('squeezeend', () => {
    controller.userData.squeezeGripping = false;
  });

  controller.addEventListener('selectstart', () => {
    if (currentXRMode === 'ar') {
      controller.userData.selecting = true;
      return;
    }
    controller.userData.selecting = true;
  });
  controller.addEventListener('selectend', () => {
    if (currentXRMode === 'ar') {
      const arAction = arContent.visible ? getProjectVideoActionFromController(controller, true) : null;
      if (arAction) {
        runProjectVideoAction(arAction, true);
      } else if (!arContent.visible) {
        const placed = placeARContent();
        if (!placed) placeARContentInFrontOfCamera();
      } else {
        // If the mini gallery is already visible and the trigger missed the
        // small screen, keep the content usable by re-orienting it toward the
        // current camera instead of doing nothing.
        orientARContentTowardCamera();
      }
      controller.userData.selecting = false;
      return;
    }
    const vrAction = getProjectVideoActionFromController(controller);
    if (vrAction) {
      runProjectVideoAction(vrAction, true);
    } else if (controller.userData.hasTeleportPoint) {
      teleportTo(controller.userData.teleportPoint);
    }
    controller.userData.selecting = false;
    controller.userData.hasTeleportPoint = false;
    teleportMarker.visible = false;
  });

  player.add(controller);
  player.add(controllerGrip);
  controllers.push(controller);
  controllerGrips.push(controllerGrip);
}

const videoRaycaster = new THREE.Raycaster();
const pointerNDC = new THREE.Vector2();
const xrRayMatrix = new THREE.Matrix4();

function getProjectVideoActionFromCamera(clientX, clientY) {
  if (renderer.xr.isPresenting) return null;
  const rect = renderer.domElement.getBoundingClientRect();
  pointerNDC.x = ((clientX - rect.left) / rect.width) * 2 - 1;
  pointerNDC.y = -((clientY - rect.top) / rect.height) * 2 + 1;
  videoRaycaster.setFromCamera(pointerNDC, camera);
  const hits = videoRaycaster.intersectObjects(videoInteractiveObjects, true);
  for (const hit of hits) {
    const action = findProjectVideoAction(hit.object);
    if (action) return action;
  }
  return null;
}

function findActionFromCurrentRaycaster() {
  const hits = videoRaycaster.intersectObjects(videoInteractiveObjects, true);
  for (const hit of hits) {
    const action = findProjectVideoAction(hit.object);
    if (action) return action;
  }
  return null;
}

function getProjectVideoActionFromXRViewCenter() {
  const xrCamera = renderer.xr.getCamera(camera);
  videoRaycaster.ray.origin.setFromMatrixPosition(xrCamera.matrixWorld);
  xrCamera.getWorldDirection(videoRaycaster.ray.direction).normalize();
  return findActionFromCurrentRaycaster();
}

function getProjectVideoActionFromController(controller, allowViewCenterFallback = false) {
  xrRayMatrix.identity().extractRotation(controller.matrixWorld);
  videoRaycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
  videoRaycaster.ray.direction.set(0, 0, -1).applyMatrix4(xrRayMatrix).normalize();
  const controllerAction = findActionFromCurrentRaycaster();
  if (controllerAction) return controllerAction;
  return allowViewCenterFallback ? getProjectVideoActionFromXRViewCenter() : null;
}

let pointerDownVideoAction = null;

const keys = new Set();
window.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  if (!renderer.xr.isPresenting && key === 'j') {
    e.preventDefault();
    seekProjectVideo(-10);
    return;
  }
  if (!renderer.xr.isPresenting && key === 'l') {
    e.preventDefault();
    seekProjectVideo(10);
    return;
  }
  if (!renderer.xr.isPresenting && key === 'k') {
    e.preventDefault();
    toggleProjectVideo(false);
    return;
  }
  keys.add(key);
});
window.addEventListener('keyup', (e) => keys.delete(e.key.toLowerCase()));

let yaw = 0;
let pitch = 0;
let pointerActive = false;
let lastX = 0;
let lastY = 0;

renderer.domElement.addEventListener('pointerdown', (e) => {
  if (renderer.xr.isPresenting) return;
  if (e.target.closest && e.target.closest('#stickBase')) return;
  pointerDownVideoAction = getProjectVideoActionFromCamera(e.clientX, e.clientY);
  pointerActive = true;
  lastX = e.clientX;
  lastY = e.clientY;
});

window.addEventListener('pointerup', (e) => {
  const pointerUpAction = getProjectVideoActionFromCamera(e.clientX, e.clientY);
  if (pointerActive && pointerDownVideoAction && pointerUpAction === pointerDownVideoAction) {
    runProjectVideoAction(pointerUpAction, false);
  }
  pointerActive = false;
  pointerDownVideoAction = null;
});
window.addEventListener('pointermove', (e) => {
  if (!pointerActive || renderer.xr.isPresenting) return;
  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;
  lastX = e.clientX;
  lastY = e.clientY;
  yaw -= dx * 0.0032;
  pitch -= dy * 0.0026;
  pitch = THREE.MathUtils.clamp(pitch, -1.15, 1.15);
});

const stick = { active: false, id: null, x: 0, y: 0 };
const stickBase = document.getElementById('stickBase');
const stickKnob = document.getElementById('stickKnob');

function setStick(clientX, clientY) {
  const rect = stickBase.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const dx = clientX - cx;
  const dy = clientY - cy;
  const max = rect.width * 0.35;
  const len = Math.hypot(dx, dy);
  const scale = len > max ? max / len : 1;
  const sx = dx * scale;
  const sy = dy * scale;
  stick.x = sx / max;
  stick.y = sy / max;
  stickKnob.style.transform = `translate(${sx}px, ${sy}px)`;
}

function resetStick() {
  stick.active = false;
  stick.id = null;
  stick.x = 0;
  stick.y = 0;
  stickKnob.style.transform = 'translate(0px, 0px)';
}

stickBase.addEventListener('pointerdown', (e) => {
  stick.active = true;
  stick.id = e.pointerId;
  stickBase.setPointerCapture(e.pointerId);
  setStick(e.clientX, e.clientY);
});

stickBase.addEventListener('pointermove', (e) => {
  if (!stick.active || e.pointerId !== stick.id) return;
  setStick(e.clientX, e.clientY);
});

stickBase.addEventListener('pointerup', resetStick);
stickBase.addEventListener('pointercancel', resetStick);

function clampPlayerPosition() {
  player.position.x = THREE.MathUtils.clamp(player.position.x, -boundaryRadius, boundaryRadius);
  player.position.z = THREE.MathUtils.clamp(player.position.z, -boundaryRadius, 16);
}

const desktopForwardVec = new THREE.Vector3();
const desktopSideVec = new THREE.Vector3();
const worldUpVec = new THREE.Vector3(0, 1, 0);

function updateDesktopMovement(delta) {
  const speed = 4.4;
  let forward = 0;
  let side = 0;

  if (keys.has('w') || keys.has('arrowup')) forward += 1;
  if (keys.has('s') || keys.has('arrowdown')) forward -= 1;
  if (keys.has('a') || keys.has('arrowleft')) side -= 1;
  if (keys.has('d') || keys.has('arrowright')) side += 1;

  if (isMobile) {
    side += stick.x;
    forward += -stick.y;
  }

  camera.getWorldDirection(desktopForwardVec);
  desktopForwardVec.y = 0;
  if (desktopForwardVec.lengthSq() < 0.0001) desktopForwardVec.set(0, 0, -1);
  desktopForwardVec.normalize();
  desktopSideVec.crossVectors(desktopForwardVec, worldUpVec).normalize();

  player.position.addScaledVector(desktopForwardVec, forward * speed * delta);
  player.position.addScaledVector(desktopSideVec, side * speed * delta);
  clampPlayerPosition();
}

function extractGamepadStickAxes(gamepad) {
  if (!gamepad || !gamepad.axes) return { x: 0, y: 0 };
  const axes = gamepad.axes;
  const safe = (v) => Number.isFinite(v) ? v : 0;
  const stick23 = { x: safe(axes[2]), y: safe(axes[3]) };
  const stick01 = { x: safe(axes[0]), y: safe(axes[1]) };
  // Meta Quest / WebXR thumbsticks normally use axes[2]/axes[3]. Prefer them
  // when they are present, because axes[0]/axes[1] can be a touchpad/thumb-rest
  // source on some runtimes and makes movement feel world-fixed or skewed.
  if (axes.length >= 4 && Math.abs(stick23.x) + Math.abs(stick23.y) > 0.02) return stick23;
  return stick01;
}

function getXRInputAxesByHand(handedness) {
  const session = renderer.xr.getSession();
  if (!session) return { x: 0, y: 0 };

  let fallbackIndex = handedness === 'left' ? 0 : 1;
  let fallbackSource = null;
  let index = 0;
  for (const source of session.inputSources) {
    if (!source.gamepad) continue;
    if (source.handedness === handedness) return extractGamepadStickAxes(source.gamepad);
    if (index === fallbackIndex) fallbackSource = source;
    index += 1;
  }

  return fallbackSource ? extractGamepadStickAxes(fallbackSource.gamepad) : { x: 0, y: 0 };
}

function applyDeadzone(value, deadzone = 0.16) {
  if (Math.abs(value) < deadzone) return 0;
  const sign = Math.sign(value);
  return sign * ((Math.abs(value) - deadzone) / (1 - deadzone));
}

const tmpDirection = new THREE.Vector3();
const tmpSide = new THREE.Vector3();
const tmpHeadBefore = new THREE.Vector3();
const tmpHeadAfter = new THREE.Vector3();
const tmpHeadQuaternion = new THREE.Quaternion();

function getXRHeadCamera() {
  const xrCamera = renderer.xr.getCamera(camera);
  if (xrCamera && Array.isArray(xrCamera.cameras) && xrCamera.cameras.length > 0) {
    return xrCamera.cameras[0];
  }
  return xrCamera || camera;
}

function getXRHeadBasisHorizontal(forwardOut, rightOut) {
  // Use the real view camera first, because the user expects translation to
  // follow the direction they are currently looking, not fixed world axes.
  camera.updateMatrixWorld(true);
  camera.getWorldDirection(forwardOut);
  forwardOut.y = 0;

  if (forwardOut.lengthSq() < 0.0001) {
    const headCamera = getXRHeadCamera();
    headCamera.updateMatrixWorld(true);
    headCamera.getWorldDirection(forwardOut);
    forwardOut.y = 0;
  }

  if (forwardOut.lengthSq() < 0.0001) {
    forwardOut.set(Math.sin(player.rotation.y), 0, -Math.cos(player.rotation.y));
  }

  forwardOut.normalize();
  rightOut.crossVectors(forwardOut, worldUpVec);
  if (rightOut.lengthSq() < 0.0001) rightOut.set(1, 0, 0);
  rightOut.normalize();
  return { forward: forwardOut, right: rightOut };
}

function getXRHeadForwardHorizontal(out) {
  getXRHeadBasisHorizontal(out, tmpSide);
  return out;
}

function rotatePlayerAroundHead(deltaYaw) {
  if (Math.abs(deltaYaw) < 0.00001) return;
  const xrCamera = getXRHeadCamera();
  xrCamera.getWorldPosition(tmpHeadBefore);
  player.rotation.y += deltaYaw;
  player.updateMatrixWorld(true);
  xrCamera.getWorldPosition(tmpHeadAfter);
  player.position.x += tmpHeadBefore.x - tmpHeadAfter.x;
  player.position.z += tmpHeadBefore.z - tmpHeadAfter.z;
}

let xrVerticalVelocity = 0;
let xrJumpButtonWasDown = false;
const xrGroundY = 0;

function isJumpButtonPressedFromSource(source) {
  if (!source || !source.gamepad || !source.gamepad.buttons) return false;
  const buttons = source.gamepad.buttons;
  // Quest-style A/X or thumbstick-click buttons usually appear at these indices.
  // Trigger is intentionally excluded because it is already used for selection.
  return [3, 4, 5].some((index) => buttons[index] && buttons[index].pressed);
}

function isXRJumpButtonPressed() {
  const session = renderer.xr.getSession();
  if (!session) return false;
  for (const source of session.inputSources) {
    if (isJumpButtonPressedFromSource(source)) return true;
  }
  return false;
}

function updateXRJump(delta) {
  const jumpPressed = isXRJumpButtonPressed();
  const groundY = currentXRMode === 'vr' ? getCurrentClimbGroundY() : xrGroundY;
  const grounded = player.position.y <= groundY + 0.001;
  if (jumpPressed && !xrJumpButtonWasDown && grounded && currentXRMode === 'vr') {
    xrVerticalVelocity = 8.375;
  }
  xrJumpButtonWasDown = jumpPressed;

  if (currentXRMode !== 'vr') {
    player.position.y = xrGroundY;
    xrVerticalVelocity = 0;
    return;
  }

  if (!grounded || xrVerticalVelocity > 0) {
    xrVerticalVelocity -= 9.2 * delta;
    player.position.y += xrVerticalVelocity * delta;
    if (player.position.y < groundY) {
      player.position.y = groundY;
      xrVerticalVelocity = 0;
    }
  } else if (player.position.y < groundY) {
    player.position.y = groundY;
  }
}

function updateXRMovement(delta) {
  const leftAxesRaw = getXRInputAxesByHand('left');
  const rightAxesRaw = getXRInputAxesByHand('right');
  const leftX = applyDeadzone(leftAxesRaw.x);
  const leftY = applyDeadzone(leftAxesRaw.y);
  const rightX = applyDeadzone(rightAxesRaw.x);

  // Right controller: rotation only.
  if (Math.abs(rightX) > 0) {
    const turnSpeed = 1.85;
    rotatePlayerAroundHead(-rightX * turnSpeed * delta);
  }

  // Left controller: translation only, always relative to the current view yaw.
  // Push up = move toward what the headset is looking at. Left/right = strafe
  // relative to that same view direction. No world-fixed X/Z movement is used.
  if (Math.abs(leftX) > 0 || Math.abs(leftY) > 0) {
    getXRHeadBasisHorizontal(tmpDirection, tmpSide);
    const move = new THREE.Vector3();
    move.addScaledVector(tmpDirection, -leftY);
    move.addScaledVector(tmpSide, leftX);
    if (move.lengthSq() > 1) move.normalize();
    if (move.lengthSq() > 0.0001) {
      const speed = 2.2;
      player.position.addScaledVector(move, speed * delta);
      clampPlayerPosition();
    }
  }

  updateXRJump(delta);
}

const tempMatrix = new THREE.Matrix4();
const tempRay = new THREE.Ray();
const tempPoint = new THREE.Vector3();

function updateControllerTeleport(controller) {
  controller.userData.hasTeleportPoint = false;
  if (!controller.userData.selecting) return;

  tempMatrix.identity().extractRotation(controller.matrixWorld);
  tempRay.origin.setFromMatrixPosition(controller.matrixWorld);
  tempRay.direction.set(0, 0, -1).applyMatrix4(tempMatrix).normalize();

  const hit = tempRay.intersectPlane(teleportPlane, tempPoint);
  if (!hit) return;
  const distance = tempRay.origin.distanceTo(tempPoint);
  if (distance > 18 || Math.hypot(tempPoint.x, tempPoint.z) > boundaryRadius) return;

  controller.userData.teleportPoint.copy(tempPoint);
  controller.userData.hasTeleportPoint = true;
  teleportMarker.position.x = tempPoint.x;
  teleportMarker.position.z = tempPoint.z;
  teleportMarker.visible = true;
}

function teleportTo(point) {
  const headWorld = new THREE.Vector3();
  camera.getWorldPosition(headWorld);
  player.position.x += point.x - headWorld.x;
  player.position.z += point.z - headWorld.z;
  clampPlayerPosition();
}

renderer.xr.addEventListener('sessionstart', () => {
  if (cameraARActive) stopCameraARFallback();
  const session = renderer.xr.getSession();
  currentXRMode = requestedXRMode || (session && session.environmentBlendMode !== 'opaque' ? 'ar' : 'vr');
  xrVerticalVelocity = 0;
  xrJumpButtonWasDown = false;
  document.body.classList.toggle('in-vr', currentXRMode === 'vr');
  document.body.classList.toggle('in-ar', currentXRMode === 'ar');
  camera.position.set(0, 0, 0);
  camera.rotation.set(0, 0, 0);
  pointerActive = false;
  resetStick();
  if (hud) hud.style.display = 'none';
  if (mobileControls) mobileControls.style.display = 'none';

  showDesktopVideoOverlay(false);
  setProjectSceneVideoSource(PROJECT_VIDEO_SRC);
  rebuildHTMLVideoTexture();
  ensureVideoTexture();

  if (currentXRMode === 'ar') {
    player.position.set(0, 0, 0);
    scene.background = null;
    scene.fog = null;
    renderer.setClearColor(0x000000, 0);
    setVRSceneVisible(false);
    arContent.visible = false;
    arReticle.visible = false;
    startProjectVideo(false, 'auto');
  } else {
    scene.background = defaultBackground;
    scene.fog = defaultFog;
    renderer.setClearColor(0x000000, 1);
    setVRSceneVisible(true);
    arContent.visible = false;
    arReticle.visible = false;
    startProjectVideo(false, 'auto');
  }
});

renderer.xr.addEventListener('sessionend', () => {
  if (cameraARActive) stopCameraARFallback();
  document.body.classList.remove('in-vr', 'in-ar');
  currentXRMode = null;
  requestedXRMode = null;
  player.position.y = 0;
  xrVerticalVelocity = 0;
  xrJumpButtonWasDown = false;
  resetARHitTest();
  scene.background = defaultBackground;
  scene.fog = defaultFog;
  renderer.setClearColor(0x000000, 1);
  setVRSceneVisible(true);
  arContent.visible = false;
  camera.position.copy(desktopCameraPosition);
  camera.rotation.set(pitch, yaw, 0);
  if (hud) hud.style.display = '';
  if (mobileControls) mobileControls.style.display = '';
  teleportMarker.visible = false;
  setProjectSceneVideoSource(chooseSceneVideoSource());
  rebuildHTMLVideoTexture();
  ensureVideoTexture();
});

const clock = new THREE.Clock();

function animate(timestamp, frame) {
  const delta = Math.min(clock.getDelta(), 0.05);
  const t = clock.elapsedTime;

  updateVideoFrameTexture(false);
  updateDesktopVideoOverlay();
  updateXRHandModels(delta);

  if (cameraARActive) {
    camera.rotation.set(pitch, yaw, 0);
    camera.updateMatrixWorld(true);
    placeCameraARContentInFrontOfCamera();
  } else if (renderer.xr.isPresenting && currentXRMode === 'ar') {
    updateARHitTest(frame);
  } else if (renderer.xr.isPresenting) {
    updateXRMovement(delta);
    let anyTeleport = false;
    controllers.forEach((controller) => {
      updateControllerTeleport(controller);
      anyTeleport = anyTeleport || controller.userData.hasTeleportPoint;
    });
    if (!anyTeleport) teleportMarker.visible = false;
  } else {
    camera.rotation.set(pitch, yaw, 0);
    camera.updateMatrixWorld(true);
    updateDesktopMovement(delta);
  }

  floor.position.y = -1.03 + Math.sin(t * 0.9) * 0.025;
  ring.rotation.z = Math.sin(t * 0.65) * 0.06;
  ring.scale.setScalar(1 + Math.sin(t * 1.8) * 0.025);
  arPortalRing.rotation.z = -t * 0.45;
  arPortalRing.scale.setScalar(1 + Math.sin(t * 1.7) * 0.035);
  particles.rotation.y += delta * 0.018;
  teleportMarker.rotation.z += delta * 1.6;

  cards.forEach((card, i) => {
    card.position.y += Math.sin(t * 1.2 + i) * 0.0009;
  });

  arCards.forEach((card, i) => {
    card.position.y += Math.sin(t * 1.5 + i) * 0.00008;
  });

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
