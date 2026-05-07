/* ============================================
   NIIVORATECH — JAVASCRIPT
   ============================================ */

// ---------- NAVBAR SCROLL ----------
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ---------- MOBILE MENU ----------
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ---------- SCROLL REVEAL ----------
const revealTargets = document.querySelectorAll(
  '.service-card, .diferencial-item, .step, .info-card, .section__header'
);

revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay ?? 0;
      setTimeout(() => entry.target.classList.add('visible'), Number(delay));
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach(el => revealObserver.observe(el));

// ---------- ACTIVE NAV LINK ----------
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.navbar__links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.navbar__links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// ---------- CONTACT FORM ----------
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = form.name.value.trim();
  const email   = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    shakeForm();
    return;
  }

  if (!isValidEmail(email)) {
    form.email.focus();
    shakeInput(form.email);
    return;
  }

  // Simulate send (replace with actual API/Formspree integration)
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.querySelector('span').textContent = 'Enviando…';

  setTimeout(() => {
    successMsg.classList.add('show');
    form.reset();
    btn.disabled = false;
    btn.querySelector('span').textContent = 'Enviar mensagem';
    setTimeout(() => successMsg.classList.remove('show'), 6000);
  }, 1200);
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function shakeForm() {
  form.style.animation = 'shake 0.4s ease';
  setTimeout(() => form.style.animation = '', 400);
}

function shakeInput(input) {
  input.style.borderColor = '#f87171';
  input.style.animation = 'shake 0.4s ease';
  setTimeout(() => {
    input.style.animation = '';
    input.style.borderColor = '';
  }, 400);
}

// ---------- FOOTER YEAR ----------
document.getElementById('year').textContent = 2025;

// ---------- CSS: SHAKE ANIMATION ----------
const styleEl = document.createElement('style');
styleEl.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%       { transform: translateX(-6px); }
    40%       { transform: translateX(6px); }
    60%       { transform: translateX(-4px); }
    80%       { transform: translateX(4px); }
  }
  .navbar__links a.active { color: var(--cyan) !important; }
`;
document.head.appendChild(styleEl);
