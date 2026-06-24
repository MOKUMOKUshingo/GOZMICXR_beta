(function () {
  const TARGET_CAPTION = "Chico's main fear was missing the morning bus.";
  const THREE_PAGE = 'three_scene/index.html';

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
        figure.setAttribute('aria-label', 'Open the three.js 3D scene');
      }
    });
  }

  function openThreeScene() {
    window.location.href = THREE_PAGE;
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
