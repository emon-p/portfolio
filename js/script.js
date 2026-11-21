// ---------- Custom cursor ----------
const cursor = document.querySelector('.cursor');
let mouseX = 0, mouseY = 0;
let x = 0, y = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  x += (mouseX - x) * 0.15;
  y += (mouseY - y) * 0.15;
  cursor.style.left = x + 'px';
  cursor.style.top = y + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .project-card, .social-card, .skill-card').forEach((el) => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// ---------- Scroll reveal ----------
const targets = document.querySelectorAll(
  '.section-head, .project-card, .skill-card, .social-card, #about .about-text p, #about .info-card, .about-photo, .quotes h2'
);

targets.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = (i % 4) * 0.1 + 's';
});

// ---------- Number count-up ----------
function countUp(el) {
  const target = Number(el.dataset.target);
  const duration = 1500;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.classList.add('show');

    if (entry.target.classList.contains('skill-card')) {
      countUp(entry.target.querySelector('.count'));
    }

    observer.unobserve(entry.target);
  });
}, { threshold: 0.2 });

targets.forEach((el) => observer.observe(el));