const music = document.getElementById('bg-music');

if (music) {
  music.volume = 0.18;

  const savedTime = parseFloat(sessionStorage.getItem('musicTime') || '0');
  if (savedTime > 0 && isFinite(savedTime)) {
    music.currentTime = savedTime;
  }

  music.addEventListener('timeupdate', () => {
    sessionStorage.setItem('musicTime', music.currentTime.toString());
  });

  const startMusic = () => {
    music.play().catch(() => {});
    document.removeEventListener('click', startMusic);
    document.removeEventListener('keydown', startMusic);
    document.removeEventListener('touchstart', startMusic);
  };

  const alreadyStarted = sessionStorage.getItem('musicStarted') === '1';

  if (alreadyStarted) {
    music.play().catch(() => {
      document.addEventListener('click', startMusic, { once: true });
      document.addEventListener('keydown', startMusic, { once: true });
      document.addEventListener('touchstart', startMusic, { once: true });
    });
  } else {
    document.addEventListener('click', startMusic);
    document.addEventListener('keydown', startMusic);
    document.addEventListener('touchstart', startMusic);
    sessionStorage.setItem('musicStarted', '1');
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      music.pause();
      sessionStorage.setItem('musicPaused', '1');
    } else {
      if (sessionStorage.getItem('musicPaused') === '1') {
        music.play().catch(() => {});
        sessionStorage.removeItem('musicPaused');
      }
    }
  });
}
