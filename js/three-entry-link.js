(function () {
  const TARGET_CAPTION = "Chico's main fear was missing the morning bus.";
  const THREE_PAGE = 'three_scene/index.html';
  const LANG_KEY = 'oceanVibesLang';

  function normalize(text) {
    return (text || '').replace(/\s+/g, ' ').trim();
  }

  function markThreeEntrances() {
    const figures = document.querySelectorAll('figure.effect-chico.tm-gallery-item');
    figures.forEach((figure) => {
      const caption = figure.querySelector('figcaption p');
      if (caption && normalize(caption.textContent) === TARGET_CAPTION) {
        figure.classList.add('tm-three-entry');
        figure.setAttribute('tabindex', '0');
        figure.setAttribute('role', 'button');
        figure.setAttribute('aria-label', document.documentElement.lang === 'ja' ? 'three.js 3D空間を開く' : 'Open the three.js 3D scene');
      }
    });
  }

  function getCurrentLang() {
    try {
      const saved = localStorage.getItem(LANG_KEY);
      if (saved === 'ja' || saved === 'en') return saved;
    } catch (e) {}
    return document.documentElement.lang === 'ja' ? 'ja' : 'en';
  }

  function openThreeScene() {
    const separator = THREE_PAGE.indexOf('?') === -1 ? '?' : '&';
    window.location.href = THREE_PAGE + separator + 'lang=' + encodeURIComponent(getCurrentLang());
  }

  document.addEventListener('DOMContentLoaded', markThreeEntrances);

  document.addEventListener('click', function (event) {
    const figure = event.target.closest('figure.tm-three-entry');
    if (!figure) return;
    event.preventDefault();
    openThreeScene();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const figure = event.target.closest('figure.tm-three-entry');
    if (!figure) return;
    event.preventDefault();
    openThreeScene();
  });
})();
