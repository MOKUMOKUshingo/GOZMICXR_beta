// Language text and locale detection for the three.js scene.
export const LANG_KEY = 'cozmixSpaceLang';
export const sceneTexts = {
  en: {
    arName: 'COZMIX Space AR Mini Gallery',
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

export function getSceneLang() {
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

