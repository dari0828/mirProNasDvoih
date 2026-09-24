/* ================= ЗАСТАВКА → ГЛАВНАЯ ================= */
const gate = document.getElementById('gate');
const home = document.getElementById('home');

if (gate && home) {
  document.querySelectorAll('.gate-line, .gate-btn').forEach((el) => {
    const delay = parseFloat(el.dataset.delay || 0) * 1000;
    setTimeout(() => el.classList.add('show'), delay);
  });

  document.getElementById('gate-open')?.addEventListener('click', () => {
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
      eggMain.classList.add('pulse');
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

/* ================= ПОЯВЛЕНИЕ ПО СТРОЧКАМ (unspeakable, whispers, unsaid) ================= */
const lineBlocks = document.querySelectorAll('.unspeakable, .whispers, .unsaid');
lineBlocks.forEach((block) => {
  const lines = block.querySelectorAll('p');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        lines.forEach((line, i) => {
          setTimeout(() => line.classList.add('show'), i * 900);
        });
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  io.observe(block);
});

/* ================= РАЗБРОСАННЫЕ СЛОВА ================= */
const scattered = document.querySelector('.scattered-words');
if (scattered) {
  const words = scattered.querySelectorAll('span');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        words.forEach((w, i) => {
          setTimeout(() => w.classList.add('show'), i * 200);
        });
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  io.observe(scattered);
}

/* ================= СЛОВА-ВОСПОМИНАНИЯ (страница «ты») ================= */
const wordItems = document.querySelectorAll('.word-item');
const wordModal = document.getElementById('word-modal');
const wordModalClose = document.getElementById('word-modal-close');

if (wordItems.length && wordModal) {
  const modalTitle = wordModal.querySelector('h2');
  const modalContent = wordModal.querySelector('.word-modal-content');

  wordItems.forEach((item) => {
    item.addEventListener('click', () => {
      const key = item.dataset.key;
      const template = document.getElementById(`tpl-${key}`);
      if (!template) return;

      modalTitle.textContent = item.textContent.trim();
      modalContent.innerHTML = '';
      modalContent.appendChild(template.content.cloneNode(true));

      wordModal.hidden = false;
      document.body.style.overflow = 'hidden';

      // Перезапуск видео, если оно есть
      const v = modalContent.querySelector('video');
      if (v) { v.currentTime = 0; v.play().catch(() => {}); }
    });
  });

  wordModalClose?.addEventListener('click', () => {
    wordModal.hidden = true;
    document.body.style.overflow = '';
    const v = modalContent.querySelector('video');
    if (v) v.pause();
  });

  wordModal.addEventListener('click', (e) => {
    if (e.target === wordModal) wordModalClose.click();
  });
}

/* ================= ПОЛАРОИДЫ ================= */
document.querySelectorAll('.polaroid').forEach((p) => {
  p.addEventListener('click', () => p.classList.toggle('flipped'));
});

/* ================= ЛИЛИЯ ================= */
document.querySelectorAll('.card-ify[data-lily]').forEach((card) => {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        card.classList.add('lily-open');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  io.observe(card);
});

/* ================= КОНВЕРТ ================= */
const envelope = document.getElementById('envelope');
const letterContent = document.getElementById('letter-content');
envelope?.addEventListener('click', () => {
  envelope.classList.add('open');
  setTimeout(() => letterContent?.classList.add('show'), 600);
});

/* ================= ПИСЬМО — ПОЯВЛЕНИЕ АБЗАЦЕВ ================= */
const finalLetter = document.querySelector('.final-letter');
if (finalLetter) {
  const ps = finalLetter.querySelectorAll('p');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        ps.forEach((p, i) => setTimeout(() => p.classList.add('show'), i * 500));
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  io.observe(finalLetter);
}

/* ================= ПАСХАЛКА ♢ (1 клик) ================= */
const eggDiamond = document.getElementById('egg-diamond');
const secretDiamond = document.getElementById('secret-diamond');
eggDiamond?.addEventListener('click', () => {
  secretDiamond.hidden = false;
  document.body.style.overflow = 'hidden';
});
document.getElementById('secret-diamond-close')?.addEventListener('click', () => {
  secretDiamond.hidden = true;
  document.body.style.overflow = '';
});

/* ================= ПАСХАЛКА 🌙 (1 клик) ================= */
const eggMoon = document.getElementById('egg-moon');
const secretMoon = document.getElementById('secret-moon');
eggMoon?.addEventListener('click', () => {
  secretMoon.hidden = false;
  document.body.style.overflow = 'hidden';
});
document.getElementById('secret-moon-close')?.addEventListener('click', () => {
  secretMoon.hidden = true;
  document.body.style.overflow = '';
});

/* ================= ЛЕПЕСТКИ (страница «письмо») ================= */
const petalsContainer = document.querySelector('.petals');
if (petalsContainer) {
  const count = 22;
  for (let i = 0; i < count; i++) {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.style.left = Math.random() * 100 + '%';
    petal.style.animationDuration = (8 + Math.random() * 8) + 's';
    petal.style.animationDelay = (Math.random() * 10) + 's';
    petal.style.transform = `scale(${0.5 + Math.random()})`;
    petal.style.opacity = 0.2 + Math.random() * 0.4;
    petalsContainer.appendChild(petal);
  }
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
