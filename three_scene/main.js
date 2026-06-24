import * as THREE from 'three';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import { ARButton } from 'three/addons/webxr/ARButton.js';

const app = document.getElementById('app');
const hud = document.getElementById('hud');
const mobileControls = document.getElementById('mobileControls');
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

const vrButton = VRButton.createButton(renderer);
vrButton.id = 'VRButton';
vrButton.addEventListener('click', () => {
  if (!renderer.xr.isPresenting) requestedXRMode = 'vr';
});
document.body.appendChild(vrButton);

const arButton = ARButton.createButton(renderer, {
  requiredFeatures: ['hit-test'],
  optionalFeatures: ['dom-overlay'],
  domOverlay: { root: document.body }
});
arButton.id = 'ARButton';
arButton.addEventListener('click', () => {
  if (!renderer.xr.isPresenting) requestedXRMode = 'ar';
});
document.body.appendChild(arButton);

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
  ctx.font = options.font || '46px Arial';
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

const title = makeTextSprite("Chico's morning-bus fear opened this 3D ocean.");
title.position.set(0, 5.2, -8.5);
scene.add(title);

const vrGuide = makeTextSprite([
  'VR MODE',
  'Trigger: teleport  /  Thumbstick: move'
], {
  width: 1200,
  height: 320,
  font: '44px Arial',
  lineHeight: 62,
  scaleX: 7.6,
  scaleY: 2.05,
  background: 'rgba(0, 53, 74, 0.68)'
});
vrGuide.position.set(0, 3.3, -4.4);
scene.add(vrGuide);

const portalGroup = new THREE.Group();
scene.add(portalGroup);

const ringGeometry = new THREE.TorusGeometry(2.3, 0.045, 16, 128);
const ringMaterial = new THREE.MeshStandardMaterial({ color: 0x69e6ff, emissive: 0x0b8cb4, emissiveIntensity: 1.25 });
const ring = new THREE.Mesh(ringGeometry, ringMaterial);
ring.position.set(0, 2.3, -7.0);
portalGroup.add(ring);

const video = document.getElementById('oceanVideo');
video.play().catch(() => {});
const videoTexture = new THREE.VideoTexture(video);
videoTexture.colorSpace = THREE.SRGBColorSpace;
const videoScreen = new THREE.Mesh(
  new THREE.PlaneGeometry(4.1, 2.3),
  new THREE.MeshBasicMaterial({ map: videoTexture, toneMapped: false, side: THREE.DoubleSide })
);
videoScreen.position.set(0, 2.3, -7.03);
portalGroup.add(videoScreen);

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
  title.visible = visible;
  vrGuide.visible = visible;
  portalGroup.visible = visible;
  particles.visible = visible;
  cards.forEach((card) => { card.visible = visible; });
  cardBacks.forEach((back) => { back.visible = visible; });
  if (!visible) teleportMarker.visible = false;
}

const arContent = new THREE.Group();
arContent.name = 'Ocean Vibes AR Mini Gallery';
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
arPortal.position.set(0, 0.55, -0.55);
arContent.add(arPortal);

const arPortalRing = new THREE.Mesh(
  new THREE.TorusGeometry(0.32, 0.011, 16, 96),
  new THREE.MeshStandardMaterial({ color: 0x69e6ff, emissive: 0x0b8cb4, emissiveIntensity: 1.35 })
);
arPortal.add(arPortalRing);

const arVideoScreen = new THREE.Mesh(
  new THREE.PlaneGeometry(0.56, 0.315),
  new THREE.MeshBasicMaterial({ map: videoTexture, toneMapped: false, transparent: true, opacity: 0.96, side: THREE.DoubleSide })
);
arVideoScreen.position.z = -0.006;
arPortal.add(arVideoScreen);

const arLabel = makeTextSprite(['Ocean Vibes AR', 'tap a surface to place'], {
  width: 1024,
  height: 300,
  font: '54px Arial',
  lineHeight: 66,
  scaleX: 0.9,
  scaleY: 0.26,
  background: 'rgba(0, 53, 74, 0.70)'
});
arLabel.position.set(0, 1.02, -0.55);
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

function placeARContent() {
  if (currentXRMode !== 'ar' || !arReticle.visible) return;
  arPlacePosition.setFromMatrixPosition(arReticle.matrix);
  arContent.position.copy(arPlacePosition);
  arContent.position.y += 0.015;
  renderer.xr.getCamera(camera).getWorldPosition(arCameraWorld);
  arContent.lookAt(arCameraWorld.x, arContent.position.y, arCameraWorld.z);
  arContent.visible = true;
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
const controllers = [];
for (let i = 0; i < 2; i++) {
  const controller = renderer.xr.getController(i);
  controller.userData.index = i;
  controller.userData.selecting = false;
  controller.userData.teleportPoint = new THREE.Vector3();
  controller.userData.hasTeleportPoint = false;

  const ray = new THREE.Line(controllerLineGeometry, controllerRayMaterial.clone());
  ray.name = 'XR Controller Ray';
  ray.scale.z = 9;
  controller.add(ray);

  const handle = new THREE.Mesh(
    new THREE.SphereGeometry(0.045, 16, 10),
    new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x28758d, emissiveIntensity: 0.7 })
  );
  controller.add(handle);

  controller.addEventListener('selectstart', () => {
    if (currentXRMode === 'ar') return;
    controller.userData.selecting = true;
  });
  controller.addEventListener('selectend', () => {
    if (currentXRMode === 'ar') {
      placeARContent();
      return;
    }
    if (controller.userData.hasTeleportPoint) teleportTo(controller.userData.teleportPoint);
    controller.userData.selecting = false;
    controller.userData.hasTeleportPoint = false;
    teleportMarker.visible = false;
  });

  player.add(controller);
  controllers.push(controller);
}

const keys = new Set();
window.addEventListener('keydown', (e) => keys.add(e.key.toLowerCase()));
window.addEventListener('keyup', (e) => keys.delete(e.key.toLowerCase()));

let yaw = 0;
let pitch = 0;
let pointerActive = false;
let lastX = 0;
let lastY = 0;

renderer.domElement.addEventListener('pointerdown', (e) => {
  if (renderer.xr.isPresenting) return;
  if (e.target.closest && e.target.closest('#stickBase')) return;
  pointerActive = true;
  lastX = e.clientX;
  lastY = e.clientY;
});

window.addEventListener('pointerup', () => { pointerActive = false; });
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

  const forwardVec = new THREE.Vector3(Math.sin(yaw), 0, -Math.cos(yaw));
  const sideVec = new THREE.Vector3(Math.cos(yaw), 0, Math.sin(yaw));
  player.position.addScaledVector(forwardVec, forward * speed * delta);
  player.position.addScaledVector(sideVec, side * speed * delta);
  clampPlayerPosition();
}

function getXRInputAxes() {
  const session = renderer.xr.getSession();
  if (!session) return { x: 0, y: 0 };
  let x = 0;
  let y = 0;

  for (const source of session.inputSources) {
    if (!source.gamepad || !source.gamepad.axes) continue;
    const axes = source.gamepad.axes;
    const ax = Math.abs(axes[2] || 0) > 0.12 ? axes[2] : (Math.abs(axes[0] || 0) > 0.12 ? axes[0] : 0);
    const ay = Math.abs(axes[3] || 0) > 0.12 ? axes[3] : (Math.abs(axes[1] || 0) > 0.12 ? axes[1] : 0);
    if (Math.abs(ax) + Math.abs(ay) > Math.abs(x) + Math.abs(y)) {
      x = ax;
      y = ay;
    }
  }
  return { x, y };
}

const tmpDirection = new THREE.Vector3();
const tmpSide = new THREE.Vector3();

function updateXRMovement(delta) {
  const axes = getXRInputAxes();
  if (Math.abs(axes.x) < 0.12 && Math.abs(axes.y) < 0.12) return;

  const xrCamera = renderer.xr.getCamera(camera);
  xrCamera.getWorldDirection(tmpDirection);
  tmpDirection.y = 0;
  if (tmpDirection.lengthSq() < 0.001) tmpDirection.set(0, 0, -1);
  tmpDirection.normalize();
  tmpSide.set(tmpDirection.z, 0, -tmpDirection.x).normalize();

  const speed = 2.2;
  player.position.addScaledVector(tmpDirection, -axes.y * speed * delta);
  player.position.addScaledVector(tmpSide, axes.x * speed * delta);
  clampPlayerPosition();
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
  const session = renderer.xr.getSession();
  currentXRMode = requestedXRMode || (session && session.environmentBlendMode !== 'opaque' ? 'ar' : 'vr');
  document.body.classList.toggle('in-vr', currentXRMode === 'vr');
  document.body.classList.toggle('in-ar', currentXRMode === 'ar');
  camera.position.set(0, 0, 0);
  camera.rotation.set(0, 0, 0);
  pointerActive = false;
  resetStick();
  if (hud) hud.style.display = 'none';
  if (mobileControls) mobileControls.style.display = 'none';

  if (currentXRMode === 'ar') {
    player.position.set(0, 0, 0);
    scene.background = null;
    scene.fog = null;
    renderer.setClearColor(0x000000, 0);
    setVRSceneVisible(false);
    arContent.visible = false;
    arReticle.visible = false;
  } else {
    scene.background = defaultBackground;
    scene.fog = defaultFog;
    renderer.setClearColor(0x000000, 1);
    setVRSceneVisible(true);
    arContent.visible = false;
    arReticle.visible = false;
  }
});

renderer.xr.addEventListener('sessionend', () => {
  document.body.classList.remove('in-vr', 'in-ar');
  currentXRMode = null;
  requestedXRMode = null;
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
});

const clock = new THREE.Clock();

function animate(timestamp, frame) {
  const delta = Math.min(clock.getDelta(), 0.05);
  const t = clock.elapsedTime;

  if (renderer.xr.isPresenting && currentXRMode === 'ar') {
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
    updateDesktopMovement(delta);
    camera.rotation.set(pitch, yaw, 0);
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
