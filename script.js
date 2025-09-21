// Reveal sections on scroll
const sections = document.querySelectorAll('.section');
const revealOnScroll = () => {
  const trigger = window.innerHeight * 0.8;
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top < trigger) sec.classList.add('visible');
  });
};
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// Cursor glow effect
document.addEventListener('mousemove', e => {
  const cursor = document.createElement('div');
  cursor.className = 'cursor-glow';
  cursor.style.left = e.pageX + 'px';
  cursor.style.top = e.pageY + 'px';
  document.body.appendChild(cursor);
  setTimeout(() => cursor.remove(), 500);
});
