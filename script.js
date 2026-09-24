/* ================= ЗАСТАВКА → ГЛАВНАЯ ================= */
const gate = document.getElementById('gate');
const home = document.getElementById('home');

if (gate && home) {
  // Показать строки и кнопку с задержкой
  document.querySelectorAll('.gate-line, .gate-btn').forEach((el) => {
    const delay = parseFloat(el.dataset.delay || 0) * 1000;
    setTimeout(() => el.classList.add('show'), delay);
  });

  // Клик по кнопке "открыть"
  const openBtn = document.getElementById('gate-open');
  openBtn?.addEventListener('click', () => {
    gate.classList.add('fade-out');
    setTimeout(() => {
      gate.hidden = true;
      home.hidden = false;
    }, 1200);
  });
}

/* ================= ПАСХАЛКА ✦ (2 клика) ================= */
const eggMain = document.getElementById('egg-main');
const secret = document.getElementById('secret');
const secretBack = document.getElementById('secret-back');

if (eggMain && secret) {
  let clicks = 0;
  eggMain.addEventListener('click', () => {
    clicks++;
    if (clicks === 1) {
      eggMain.classList.add('pulse'); // намёк, что тут что-то есть
    } else if (clicks >= 2) {
      secret.hidden = false;
      document.body.style.overflow = 'hidden';
    }
  });

  secretBack?.addEventListener('click', () => {
    secret.hidden = true;
    document.body.style.overflow = '';
    eggMain.classList.remove('pulse');
    clicks = 0;
  });
}

/* ================= ПОЯВЛЕНИЕ ПРИ СКРОЛЛЕ ================= */
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach((el) => io.observe(el));
}

/* ================= ПЛАВНЫЙ ПЕРЕХОД МЕЖДУ СТРАНИЦАМИ ================= */
document.querySelectorAll('a[href$=".html"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('#')) return;
    e.preventDefault();
    document.body.style.transition = 'opacity 0.9s ease, filter 0.9s ease';
    document.body.style.opacity = '0';
    document.body.style.filter = 'blur(6px)';
    setTimeout(() => { window.location.href = href; }, 850);
  });
});
