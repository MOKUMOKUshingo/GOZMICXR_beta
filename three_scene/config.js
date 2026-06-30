// GOZMIX Space runtime configuration
// Change common paths and tuning values here instead of editing main.js.
// Keep paths relative to three_scene/index.html.

export const SPACE_CONFIG = {
  paths: {
    projectVideo: '../video/projectmovie1.mp4',
    mobileProjectVideo: '../video/projectmovie1_mobile.mp4',
    posterImage: '../img/title1-poster.jpg',
    handModel: './assets/XRRightH_New4.glb'
  },

  camera: {
    desktopPosition: [0, 2.0, 8.2]
  },

  movement: {
    vrJumpVelocity: 8.375,
    gravity: 9.2
  },

  startRing: {
    displayY: 0.60,
    collisionTopY: 2.00,
    radius: 2.58
  },

  projectScreen: {
    position: [0, 9.1, -16.0],
    basePitch: 0.48,
    pitchMin: -0.95,
    pitchMax: 0.95,
    yawMin: -1.20,
    yawMax: 1.20,
    width: 17.08,
    height: 9.60,
    curveDepth: 1.45,
    segmentsX: 120,
    segmentsY: 68,
    scrubWidth: 9.2
  },

  arScreen: {
    baseWidth: 4.64,
    baseHeight: 2.608,
    segmentsX: 96,
    segmentsY: 56,
    curveMin: 0.04,
    curveMax: 1.25,
    curveInitial: 0.44,
    scaleMin: 0.45,
    scaleMax: 3.20,
    initialOffset: [0, 2.20, -1.10],
    lookAtLocal: [0, 1.20, 0],
    rMin: 0.75,
    rMax: 7.50,
    thetaMin: -0.35,
    thetaMax: 1.32,
    pitchMin: -0.85,
    pitchMax: 0.85,
    yawMin: -1.25,
    yawMax: 1.25,
    defaultDownTilt: -0.10
  },

  hand: {
    desiredSize: 0.255,
    offset: {
      right: [0.018, -0.018, -0.018],
      left: [-0.018, -0.018, -0.018]
    }
  }
};
