(function () {
  const LANG_KEY = 'cozmixSpaceLang';
  const VIDEO_TIMEOUT_MS = 12000;

  const text = {
    en: {
      loading: 'Loading video...',
      failed: 'Video could not be loaded. Showing the poster image.',
      timeout: 'Video is taking too long. Showing the poster image.',
      soundButton: 'Play with sound',
      soundOn: 'Sound on',
      soundFailed: 'Tap once more to play with sound'
    },
    ja: {
      loading: '動画を読み込み中です...',
      failed: '動画を読み込めませんでした。代わりにposter画像を表示しています。',
      timeout: '動画の読み込みに時間がかかっています。代わりにposter画像を表示しています。',
      soundButton: '音声ありで再生',
      soundOn: '音声ありで再生中',
      soundFailed: 'もう一度タップすると音声ありで再生します'
    }
  };

  function getLang() {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === 'ja' || saved === 'en') return saved;
    return (navigator.language || '').toLowerCase().startsWith('ja') ? 'ja' : 'en';
  }

  function setText(keyOverride) {
    const lang = getLang();
    const t = text[lang] || text.en;
    document.querySelectorAll('[data-video-i18n]').forEach((el) => {
      const key = keyOverride && el.id === 'tm-video-sound-button' ? keyOverride : el.dataset.videoI18n;
      el.textContent = t[key] || text.en[key] || el.textContent;
    });
  }

  function mark(container, state) {
    container.classList.remove('tm-video-loading', 'tm-video-ready', 'tm-video-failed', 'tm-video-timeout');
    container.classList.add(state);
  }

  function showFallback(container, reason) {
    const fallback = document.getElementById('tm-video-fallback');
    const fallbackText = fallback ? fallback.querySelector('[data-video-i18n]') : null;
    if (fallback) fallback.hidden = false;
    mark(container, reason === 'timeout' ? 'tm-video-timeout' : 'tm-video-failed');
    if (fallbackText) {
      fallbackText.dataset.videoI18n = reason === 'timeout' ? 'timeout' : 'failed';
    }
    setText();
  }

  document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('tm-video-container');
    const video = document.getElementById('tm-video');
    const soundButton = document.getElementById('tm-video-sound-button');
    if (!container || !video) return;

    setText();

    let finished = false;
    const timeoutId = window.setTimeout(function () {
      if (!finished && video.readyState < 2) {
        finished = true;
        showFallback(container, 'timeout');
      }
    }, VIDEO_TIMEOUT_MS);

    function ready() {
      if (finished) return;
      finished = true;
      window.clearTimeout(timeoutId);
      const fallback = document.getElementById('tm-video-fallback');
      if (fallback) fallback.hidden = true;
      mark(container, 'tm-video-ready');
    }

    video.addEventListener('loadeddata', ready, { once: true });
    video.addEventListener('canplay', ready, { once: true });
    video.addEventListener('playing', ready, { once: true });
    video.addEventListener('error', function () {
      if (finished) return;
      finished = true;
      window.clearTimeout(timeoutId);
      showFallback(container, 'failed');
    }, { once: true });

    // Try muted autoplay. Browsers usually allow this. If it fails, poster still remains visible.
    const tryPlay = video.play();
    if (tryPlay && typeof tryPlay.catch === 'function') {
      tryPlay.catch(function () {
        // Autoplay may be blocked. Do not mark as failure; the sound button can still start playback.
      });
    }

    if (soundButton) {
      soundButton.addEventListener('click', function () {
        if (container.classList.contains('tm-video-failed') || container.classList.contains('tm-video-timeout')) return;
        video.muted = false;
        video.volume = 1;
        video.controls = true;
        video.loop = false;
        const playPromise = video.play();
        if (playPromise && typeof playPromise.then === 'function') {
          playPromise.then(function () {
            soundButton.dataset.videoI18n = 'soundOn';
            setText('soundOn');
          }).catch(function () {
            soundButton.dataset.videoI18n = 'soundFailed';
            setText('soundFailed');
          });
        } else {
          soundButton.dataset.videoI18n = 'soundOn';
          setText('soundOn');
        }
      });
    }

    document.addEventListener('click', function (e) {
      if (e.target && e.target.classList && e.target.classList.contains('tm-lang-button')) {
        window.setTimeout(setText, 0);
      }
    });

    window.addEventListener('storage', function (e) {
      if (e.key === LANG_KEY) setText();
    });
  });
})();
