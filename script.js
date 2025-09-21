// ---------- Particles ----------
particlesJS("particles-js", {
  "particles": {
    "number": {"value":70, "density": {"enable": true, "value_area": 900}},
    "color": {"value": ["#64ffda", "#00cfff", "#6f8cff"]},
    "shape": {"type": "circle"},
    "opacity": {"value": 0.28},
    "size": {"value": 3},
    "line_linked": {"enable": false},
    "move": {"enable": true, "speed": 1.6, "direction": "none", "out_mode": "out"}
  },
  "interactivity": {
    "events": {"onhover": {"enable": true, "mode": "repulse"}}
  }
});

// ---------- Helpers ----------
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));

// ---------- Top ribbon blur on scroll ----------
const topRibbon = document.querySelector('.top-ribbon');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const st = window.scrollY;
  if (st > 40) topRibbon.classList.add('scrolled'); else topRibbon.classList.remove('scrolled');
  lastScroll = st <= 0 ? 0 : st;
});

// ---------- Theme toggle (Dark = navy, Light = white) ----------
const themeToggle = $('#themeToggle');
function setLight() {
  document.body.classList.remove('dark-theme');
  document.body.classList.add('light-theme');
  themeToggle.textContent = 'Dark Mode';
  // adjust colors for light - we flip CSS variables by adding light-theme class
  document.body.style.background = '#ffffff';
  document.body.style.color = '#08121a';
}
function setDark() {
  document.body.classList.remove('light-theme');
  document.body.classList.add('dark-theme');
  themeToggle.textContent = 'Light Mode';
  document.body.style.background = 'var(--navy)';
  document.body.style.color = '#f5f7fa';
}
// start as dark (navy)
setDark();
themeToggle.addEventListener('click', () => {
  if (document.body.classList.contains('dark-theme')) setLight(); else setDark();
});

// ---------- Smooth nav click (works with scroll-snapping) ----------
$$('.nav-right a').forEach(a => {
  if (a.getAttribute('href') && a.getAttribute('href').startsWith('#')) {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({behavior:'smooth', block:'start'});
    });
  }
});

// ---------- Dropdown behavior: stay open while hovered ----------
const dropdown = document.querySelector('.dropdown');
if (dropdown) {
  // CSS handles :hover; add JS to keep open if user enters and leaves quickly
  dropdown.addEventListener('mouseenter', () => dropdown.classList.add('open'));
  dropdown.addEventListener('mouseleave', () => dropdown.classList.remove('open'));
  // keep the dropdown-menu visible while open class exists
  const observer = new MutationObserver(() => {
    const menu = dropdown.querySelector('.dropdown-menu');
    if (dropdown.classList.contains('open')) menu.style.display = 'flex';
    else menu.style.display = '';
  });
  observer.observe(dropdown, { attributes: true, attributeFilter: ['class'] });
}

// ---------- Project buttons (View / Download) ----------
$$('.proj-view, .proj-download'); // noop (for dropdown)
$$('.proj-actions button').forEach(b => {
  b.addEventListener('click', (e) => {
    const link = b.dataset.link;
    if (link) window.open(link, '_blank');
  });
});

// card buttons
$$('.project-card .btn.view').forEach(b => {
  b.addEventListener('click', () => window.open(b.dataset.link, '_blank'));
});
$$('.project-card .btn.download').forEach(b => {
  b.addEventListener('click', () => window.open(b.dataset.link, '_blank'));
});

// also wire dropdown project buttons
$$('.proj-item .proj-actions button').forEach(btn => {
  btn.addEventListener('click', () => {
    const link = btn.dataset.link;
    if (link) window.open(link, '_blank');
  });
});

// ---------- Resume blur effect when scrolling past top of resume -->
const resumeSection = document.querySelector('#resume');
if (resumeSection) {
  window.addEventListener('scroll', () => {
    const rect = resumeSection.getBoundingClientRect();
    const topEdge = rect.top;
    // if scrolled above resume top, increase blur edges
    const blurElements = $$('.resume-blur-edge');
    let intensity = 0;
    if (topEdge < window.innerHeight * 0.3) {
      intensity = Math.min(20, Math.abs(window.innerHeight * 0.3 - topEdge) / 10);
    }
    blurElements.forEach(el => el.style.backdropFilter = `blur(${intensity}px)`);
  });
}

// ---------- GSAP Animations: scroll transitions, parallax, flip projects ----------
gsap.registerPlugin(ScrollTrigger);

// fade & word reveal for about/services text
gsap.utils.toArray('.about-text p, .service-card, .project-meta, .muted').forEach((el, i) => {
  gsap.from(el, {
    opacity: 0,
    y: 30,
    duration: 0.9,
    delay: 0.1 * i,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  });
});

// parallax hero: left moves down slowly, right moves up slightly on scroll
gsap.to('.left-box', {
  yPercent: 12,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero-section',
    start: 'top top',
    end: 'bottom top',
    scrub: 0.9
  }
});
gsap.to('.right-box', {
  yPercent: -8,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero-section',
    start: 'top top',
    end: 'bottom top',
    scrub: 0.9
  }
});

// project flip as it enters viewport
gsap.utils.toArray('.project-card').forEach((card) => {
  gsap.fromTo(card, {
    rotateX: 14,
    transformOrigin: 'center center',
    scale: 0.98,
    filter: 'blur(4px) brightness(.9)'
  }, {
    rotateX: 0,
    scale: 1,
    filter: 'blur(0px) brightness(1)',
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: card,
      start: 'top 85%',
      end: 'top 40%',
      scrub: 0.8
    }
  });
});

// fancy header reveal on load
gsap.from('.top-ribbon', { y: -40, opacity: 0, duration: 1, ease: 'power4.out' });

// contact big bar lift animation when enters
gsap.from('.contact-bigbar', {
  y: 150, opacity: 0, duration: 1.2, ease: 'power3.out',
  scrollTrigger: { trigger: '.contact-section', start: 'top 90%' }
});

// section overlay blur/update on scroll (subtle)
ScrollTrigger.create({
  onUpdate: self => {
    const progress = self.progress;
    // dynamic subtle global overlay — motion blur like effect by adjusting body filter
    const blurVal = Math.min(6, progress * 6);
    document.body.style.backdropFilter = `blur(${blurVal}px)`;
  },
  trigger: '#scroll-container',
  start: 'top top',
  end: 'bottom bottom',
  scrub: true
});

// ---------- Parallax floating gradients (subtle) ----------
const floatingBg = document.createElement('div');
floatingBg.className = 'floating-gradients';
document.body.appendChild(floatingBg);
floatingBg.style.position = 'fixed';
floatingBg.style.inset = '0';
floatingBg.style.zIndex = '-1';
floatingBg.style.pointerEvents = 'none';
floatingBg.style.background = 'radial-gradient(circle at 10% 20%, rgba(100,255,218,0.06), transparent 8%), radial-gradient(circle at 80% 80%, rgba(0,200,255,0.05), transparent 10%)';
floatingBg.style.transition = 'transform 0.6s ease';

// subtle movement with scroll
window.addEventListener('scroll', () => {
  const s = window.scrollY;
  floatingBg.style.transform = `translateY(${s * 0.02}px)`;
});

// ---------- mobile adjustments for dropdown tap ----------
if ('ontouchstart' in window) {
  // toggle dropdown on tap for mobile
  const drop = document.querySelector('.dropdown');
  if (drop) {
    drop.addEventListener('click', (e) => {
      const menu = drop.querySelector('.dropdown-menu');
      if (menu.style.display === 'flex') menu.style.display = 'none';
      else menu.style.display = 'flex';
      e.stopPropagation();
    });
    document.body.addEventListener('click', () => {
      const menu = drop.querySelector('.dropdown-menu');
      if (menu) menu.style.display = '';
    });
  }
}
