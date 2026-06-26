(function () {
  const LANG_KEY = 'cozmixSpaceLang';
  const supported = ['en', 'ja'];
  const text = {
    en: {
      title: 'COZMIX Space Vibes 3D / VR / AR Scene',
      back: '← Gallery',
      backLabel: 'Back to COZMIX Space Vibes gallery',
      eyebrow: 'three.js portal',
      heading: 'COZMIX Space Vibes 3D / VR / AR',
      description: 'PC: WASD + drag. Video: J / K / L = rewind / play / fast-forward. Mobile: stick + swipe. VR: press ENTER VR. AR: press START AR, scan a floor or desk, then tap to place the COZMIX Space Vibes mini gallery.',
      mobileHint: 'DRAG TO LOOK'
    },
    ja: {
      title: 'COZMIX Space Vibes 3D / VR / AR 空間',
      back: '← ギャラリーへ戻る',
      backLabel: 'COZMIX Space Vibesギャラリーへ戻る',
      eyebrow: 'three.js ポータル',
      heading: 'COZMIX Space Vibes 3D / VR / AR',
      description: 'PC：WASD + ドラッグ。動画：J / K / L = 巻き戻し / 再生停止 / 早送り。スマホ：左下スティック + スワイプ。VR：ENTER VR。AR：START ARを押し、床や机をスキャンしてタップすると小さなギャラリーを配置できます。',
      mobileHint: 'スワイプで視点移動'
    }
  };

  function getLang() {
    const fromUrl = new URLSearchParams(window.location.search).get('lang');
    if (supported.includes(fromUrl)) {
      localStorage.setItem(LANG_KEY, fromUrl);
      return fromUrl;
    }
    const saved = localStorage.getItem(LANG_KEY);
    if (supported.includes(saved)) return saved;
    return (navigator.language || '').toLowerCase().startsWith('ja') ? 'ja' : 'en';
  }

  function ensureSwitcher(lang) {
    let el = document.querySelector('.scene-language-switcher');
    if (!el) {
      el = document.createElement('div');
      el.className = 'scene-language-switcher';
      el.setAttribute('aria-label', 'Language switcher');
      el.innerHTML = '<button type="button" class="scene-lang-button" data-lang="en">EN</button><button type="button" class="scene-lang-button" data-lang="ja">日本語</button>';
      document.body.appendChild(el);
      el.addEventListener('click', (event) => {
        const button = event.target.closest('[data-lang]');
        if (!button) return;
        const next = button.dataset.lang;
        localStorage.setItem(LANG_KEY, next);
        const url = new URL(window.location.href);
        url.searchParams.set('lang', next);
        window.location.href = url.toString();
      });
    }
    el.querySelectorAll('[data-lang]').forEach((button) => {
      button.classList.toggle('active', button.dataset.lang === lang);
      button.setAttribute('aria-pressed', String(button.dataset.lang === lang));
    });
  }

  function apply() {
    const lang = getLang();
    const t = text[lang];
    document.documentElement.lang = lang;
    document.title = t.title;
    document.body.classList.toggle('scene-lang-ja', lang === 'ja');
    document.body.classList.toggle('scene-lang-en', lang === 'en');
    ensureSwitcher(lang);

    const back = document.getElementById('backLink');
    const eyebrow = document.querySelector('#titleBlock .eyebrow');
    const heading = document.querySelector('#titleBlock h1');
    const desc = document.querySelector('#titleBlock p');
    const mobileHint = document.getElementById('mobileHint');
    if (back) {
      back.textContent = t.back;
      back.setAttribute('aria-label', t.backLabel);
      back.href = '../index.html?lang=' + encodeURIComponent(lang) + '#gallery';
    }
    if (eyebrow) eyebrow.textContent = t.eyebrow;
    if (heading) heading.textContent = t.heading;
    if (desc) desc.textContent = t.description;
    if (mobileHint) mobileHint.textContent = t.mobileHint;
  }

  window.CozmixLang = { get: getLang };
  document.addEventListener('DOMContentLoaded', apply);
})();
