const cursor = document.querySelector('.cursor');
let mouseX = 0, mouseY = 0;
let x = 0, y = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Cursor ektu ektu kore follow korbe
function animate() {
  x += (mouseX - x) * 0.15;
  y += (mouseY - y) * 0.15;
  cursor.style.left = x + 'px';
  cursor.style.top = y + 'px';
  requestAnimationFrame(animate);
}
animate();

// Link, button, card er upor gele cursor bore hobe
document.querySelectorAll('a, button, .project-card, .social-card').forEach((el) => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// ---------- Scroll reveal + skill animation ----------
const targets = document.querySelectorAll(
  '.section-head, .project-card, .skill-card, .social-card, #about p, #about .info-card, .about-photo, .quotes h2'
);

targets.forEach((el, i) => {
  el.classList.add('reveal');
  // Ektu ektu kore delay dile ekta ekta kore ashbe
  el.style.transitionDelay = (i % 4) * 0.1 + 's';
});

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

    // Skill card e aste ring ar number dui-i chalbe
    if (entry.target.classList.contains('skill-card')) {
      const num = entry.target.querySelector('.count');
      countUp(num);
    }

    observer.unobserve(entry.target);
  });
}, { threshold: 0.2 });

targets.forEach((el) => observer.observe(el));