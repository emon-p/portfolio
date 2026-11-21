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
  '.section-head, .project-card, .skill-card, .cat-card, .social-card, #about .about-text p, #about .info-card, .about-photo, .quotes h2'
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
// ---------- Hero letter-by-letter animation ----------
function splitLetters(el, speed, startDelay) {
  const text = el.textContent;
  el.textContent = '';
  el.setAttribute('aria-label', text);

  [...text].forEach((letter, i) => {
    const span = document.createElement('span');
    span.className = 'char';
    span.setAttribute('aria-hidden', 'true');
    span.innerHTML = letter === ' ' ? '&nbsp;' : letter;
    span.style.animationDelay = (startDelay + i * speed) + 's';
    el.appendChild(span);
  });
}

const heroName = document.querySelector('.hero-name');
const heroTag = document.querySelector('.hero-tag');

if (heroName) splitLetters(heroName, 0.09, 0.2);
if (heroTag) splitLetters(heroTag, 0.03, 1.2);
// ---------- Quote word-by-word animation (line er por line) ----------
const quoteSection = document.querySelector('.quotes');
const quoteLines = document.querySelectorAll('.quote-line');

// Prottek shobdo alada span e vaag kora
quoteLines.forEach((line) => {
  const nodes = [...line.childNodes];
  line.innerHTML = '';

  nodes.forEach((node) => {
    const isOutline = node.nodeType === 1 && node.classList.contains('outline');
    const cls = isOutline ? 'outline' : '';

    node.textContent.split(/(\s+)/).forEach((part) => {
      if (!part) return;
      if (/^\s+$/.test(part)) {
        line.appendChild(document.createTextNode(' '));
        return;
      }
      const span = document.createElement('span');
      span.className = ('word ' + cls).trim();
      span.textContent = part;
      line.appendChild(span);
    });
  });
});

// Ek line er shobdo gulo ek ek kore uthbe, shesh hole porer line
function playLine(index) {
  if (index >= quoteLines.length) return;

  const line = quoteLines[index];
  const words = line.querySelectorAll('.word');

  words.forEach((word, i) => {
    word.style.animationDelay = (i * 0.12) + 's';
  });

  line.classList.add('play');

  const duration = words.length * 0.12 + 0.7;
  setTimeout(() => playLine(index + 1), duration * 1000);
}

// Quotes section screen e ashle animation shuru
const quoteObserver = new IntersectionObserver((entries, obs) => {
  if (entries[0].isIntersecting) {
    playLine(0);
    obs.disconnect();
  }
}, { threshold: 0.3 });

if (quoteSection) quoteObserver.observe(quoteSection);