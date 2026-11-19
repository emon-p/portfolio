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