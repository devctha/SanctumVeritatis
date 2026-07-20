(() => {
  const video = document.querySelector('#storm-video');
  const loader = document.querySelector('#loading-screen');
  const soundButton = document.querySelector('#sound-toggle');
  const soundLabel = soundButton?.querySelector('.sound-label');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const revealPage = () => {
    window.setTimeout(() => loader?.classList.add('is-hidden'), 240);
  };

  if (video) {
    video.addEventListener('canplay', revealPage, { once: true });
    video.addEventListener('error', revealPage, { once: true });
    window.setTimeout(revealPage, 2400);

    if (reducedMotion.matches) {
      video.addEventListener('loadeddata', () => video.pause(), { once: true });
    }
  } else {
    revealPage();
  }

  soundButton?.addEventListener('click', async () => {
    if (!video) return;

    video.muted = !video.muted;
    soundButton.setAttribute('aria-pressed', String(!video.muted));
    soundButton.setAttribute('aria-label', video.muted ? 'Ativar som ambiente' : 'Desativar som ambiente');
    if (soundLabel) soundLabel.textContent = video.muted ? 'Som desativado' : 'Som ativado';

    if (video.paused && !reducedMotion.matches) {
      try { await video.play(); } catch (_) { /* O navegador pode bloquear reprodução automática. */ }
    }
  });

  if (!reducedMotion.matches) {
    window.addEventListener('pointermove', (event) => {
      const x = `${(event.clientX / window.innerWidth) * 100}%`;
      const y = `${(event.clientY / window.innerHeight) * 100}%`;
      document.documentElement.style.setProperty('--pointer-x', x);
      document.documentElement.style.setProperty('--pointer-y', y);
    }, { passive: true });
  }

})();
