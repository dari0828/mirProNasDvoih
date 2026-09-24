/* ================= ФОНОВАЯ МУЗЫКА ================= */
/* Играет непрерывно, тихо, без ползунка.
   Позиция сохраняется между страницами через sessionStorage. */

const music = document.getElementById('bg-music');

if (music) {
  music.volume = 0.18; // фиксированная тихая громкость

  // Восстанавливаем позицию, если уже играло
  const savedTime = parseFloat(sessionStorage.getItem('musicTime') || '0');
  if (savedTime > 0 && isFinite(savedTime)) {
    music.currentTime = savedTime;
  }

  // Сохраняем позицию каждые 400 мс
  music.addEventListener('timeupdate', () => {
    sessionStorage.setItem('musicTime', music.currentTime.toString());
  });

  // Запускаем только после первого взаимодействия пользователя
  // (браузеры блокируют автозвук без клика)
  const startMusic = () => {
    music.play().catch(() => { /* если не получилось — не страшно */ });
    document.removeEventListener('click', startMusic);
    document.removeEventListener('keydown', startMusic);
    document.removeEventListener('touchstart', startMusic);
  };

  const alreadyStarted = sessionStorage.getItem('musicStarted') === '1';

  if (alreadyStarted) {
    // На внутренних страницах уже пытались запустить — играем сразу
    music.play().catch(() => {
      // если браузер всё же заблокировал — ждём клика
      document.addEventListener('click', startMusic, { once: true });
      document.addEventListener('keydown', startMusic, { once: true });
      document.addEventListener('touchstart', startMusic, { once: true });
    });
  } else {
    // Первый заход: ждём первого клика/тапа
    document.addEventListener('click', startMusic);
    document.addEventListener('keydown', startMusic);
    document.addEventListener('touchstart', startMusic);
    sessionStorage.setItem('musicStarted', '1');
  }

  // Пауза, когда пользователь уходит со вкладки
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
