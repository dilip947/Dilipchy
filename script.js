// === Libraries are loaded in HTML: GSAP, ScrollTrigger, particles.js ===

// tiny helpers
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));

// ---------- Particles (visual background) ----------
particlesJS("particles-js", {
  "particles": {
    "number": {"value":70,"density":{"enable":true,"value_area":900}},
    "color":{"value":["#64ffda","#00cfff","#6f8cff"]},
    "shape":{"type":"circle"},
    "opacity":{"value":0.28},
    "size":{"value":3},
    "move":{"enable":true,"speed":1.6,"direction":"none","out_mode":"out"}
  },
  "interactivity": {"events":{"onhover":{"enable":true,"mode":"repulse"}}}
});

// ---------- GSAP / ScrollTrigger setup ----------
gsap.registerPlugin(ScrollTrigger);

// top ribbon behavior on scroll
const topRibbon = document.getElementById('topRibbon');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) topRibbon.classList.add('scrolled'); else topRibbon.classList.remove('scrolled');
});

// ---------- TYPING (name/job) animation - reveals typed line ----------
const typingLine = document.getElementById('typingLine');
const phrases = ["Business Analytics", "Finance", "Dashboarding", "Data Visualization"];
let ti = 0, tj = 0, deleting = false;
function typeLoop() {
  const full = phrases[ti];
  if (!deleting) {
    typingLine.textContent = full.slice(0, ++tj);
    if (tj === full.length) { deleting = true; setTimeout(typeLoop, 1000); return; }
  } else {
    typingLine.textContent = full.slice(0, --tj);
    if (tj === 0) { deleting = false; ti = (ti + 1) % phrases.length; setTimeout(typeLoop, 300); return; }
  }
  setTimeout(typeLoop, deleting ? 50 : 90);
}
typeLoop();

// ---------- DROPDOWN behavior: stays while inside ----------------
const projectsDropdown = $('#projectsDropdown');
const projectsMenu = $('#projectsMenu');
// Use enter/leave with class open and small delay to avoid flicker
let dropdownTimeout;
if (projectsDropdown) {
  projectsDropdown.addEventListener('mouseenter', () => {
    clearTimeout(dropdownTimeout);
    projectsDropdown.classList.add('open');
  });
  projectsDropdown.addEventListener('mouseleave', () => {
    // wait small time so user can move to menu
    dropdownTimeout = setTimeout(()=> projectsDropdown.classList.remove('open'), 220);
  });
  // make sure moving cursor inside menu cancels hiding
  projectsMenu.addEventListener('mouseenter', () => { clearTimeout(dropdownTimeout); projectsDropdown.classList.add('open'); });
  projectsMenu.addEventListener('mouseleave', () => { dropdownTimeout = setTimeout(()=> projectsDropdown.classList.remove('open'), 220); });
}

// ---------- Theme toggle: animated GSAP color morph ----------
const themeToggle = $('#themeToggle');
function setThemeDark() {
  document.body.classList.remove('theme-light'); document.body.classList.add('theme-dark');
  themeToggle.textContent = 'Light Mode';
  // animate background color via GSAP for smoothness
  gsap.to(document.body, { backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--navy'), color: getComputedStyle(document.documentElement).getPropertyValue('--text-light'), duration: 0.7 });
}
function setThemeLight() {
  document.body.classList.remove('theme-dark'); document.body.classList.add('theme-light');
  themeToggle.textContent = 'Dark Mode';
  gsap.to(document.body, { backgroundColor: '#ffffff', color: getComputedStyle(document.documentElement).getPropertyValue('--text-dark'), duration: 0.7 });
}
// default dark
setThemeDark();
themeToggle.addEventListener('click', () => {
  if (document.body.classList.contains('theme-dark')) setThemeLight(); else setThemeDark();
});

// ---------- Projects dropdown buttons (from top dropdown) ----------
$$('.proj-view, .proj-download').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const link = btn.dataset.link;
    if (link) window.open(link, '_blank');
  });
});

// ---------- SERVICES: hover previews ----------
const svcDash = $('#svc-dashboard');
const svcPreviewDash = $('#svcPreviewDash');
const svcFin = $('#svc-finmodel');
const finCanvas = document.getElementById('finCanvas');
let finCtx;
if (finCanvas) finCtx = finCanvas.getContext('2d');

if (svcDash && svcPreviewDash) {
  svcDash.addEventListener('mouseenter', () => {
    gsap.to(svcPreviewDash, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power3.out' });
  });
  svcDash.addEventListener('mouseleave', () => {
    gsap.to(svcPreviewDash, { autoAlpha: 0, y: 8, duration: 0.35 });
  });
}
// financial modeling preview: draw a small animated sparkline
if (svcFin && svcPreviewFin = $('#svcPreviewFin')) {
  svcFin.addEventListener('mouseenter', () => {
    gsap.to(svcPreviewFin, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power3.out' });
    startFinAnimation();
  });
  svcFin.addEventListener('mouseleave', () => {
    gsap.to(svcPreviewFin, { autoAlpha: 0, y: 8, duration: 0.35 });
    stopFinAnimation();
  });
}

// tiny animated line chart for Financial Modeling
let finAnimId = null;
function startFinAnimation(){
  if (!finCtx) return;
  const W = finCanvas.width, H = finCanvas.height;
  finCtx.clearRect(0,0,W,H);
  let t=0;
  function draw(){
    t+=0.02;
    finCtx.clearRect(0,0,W,H);
    // gradient bg
    const g = finCtx.createLinearGradient(0,0,0,H);
    g.addColorStop(0,'rgba(100,255,218,0.06)');
    g.addColorStop(1,'rgba(0,0,0,0)');
    finCtx.fillStyle = g; finCtx.fillRect(0,0,W,H);

    // draw random-ish smooth curve
    finCtx.beginPath();
    const points = [];
    for(let i=0;i<40;i++){
      const x = (i/39)*W;
      const y = H/2 + Math.sin(i*0.4 + t*1.5)* (H*0.18) + Math.cos(i*0.2 + t*0.8)*(H*0.06);
      points.push([x,y]);
    }
    finCtx.moveTo(points[0][0], points[0][1]);
    for(let i=1;i<points.length;i++){
      finCtx.lineTo(points[i][0], points[i][1]);
    }
    finCtx.strokeStyle = 'rgba(100,255,218,0.95)';
    finCtx.lineWidth = 2.6;
    finCtx.stroke();

    // shade below curve
    finCtx.lineTo(W,H); finCtx.lineTo(0,H); finCtx.closePath();
    const grad = finCtx.createLinearGradient(0,0,0,H);
    grad.addColorStop(0,'rgba(100,255,218,0.12)');
    grad.addColorStop(1,'rgba(100,255,218,0.02)');
    finCtx.fillStyle = grad;
    finCtx.fill();

    finAnimId = requestAnimationFrame(draw);
  }
  if (!finAnimId) draw();
}
function stopFinAnimation(){ if (finAnimId) cancelAnimationFrame(finAnimId); finAnimId = null; if (finCtx) finCtx.clearRect(0,0,finCanvas.width,finCanvas.height); }

// ---------- CAROUSEL (GSAP-powered) ----------
const carousel = $('#carousel');
const slides = $$('.slide');
const leftBtn = $('#carouselLeft');
const rightBtn = $('#carouselRight');
let activeIndex = 0;

function updateCarousel(index, direction='right') {
  activeIndex = (index + slides.length) % slides.length;

  slides.forEach((s, i) => {
    s.classList.remove('is-active');
    // position by offset
    const offset = i - activeIndex;
    // use gsap to animate transform and shadow/blur
    const x = offset * (window.innerWidth < 980 ? 340 : 460);
    const z = -Math.abs(offset) * 120;
    const scale = i === activeIndex ? 1 : 0.94;
    const blur = i === activeIndex ? 0 : 4;
    gsap.to(s, { x: x, z: z, scale: scale, filter: `blur(${blur}px)`, duration: 0.9, ease: 'power3.out' });
    if (i === activeIndex) {
      s.classList.add('is-active');
      // subtle lift
      gsap.fromTo(s, { y: 18 }, { y: 0, duration: 0.7, ease: 'power3.out' });
    }
  });

  // ensure active slide is focused (for accessibility)
  slides[activeIndex].scrollIntoView({ behavior: 'smooth', inline: 'center' });
}

// init carousel positions
updateCarousel(0);
leftBtn.addEventListener('click', () => updateCarousel(activeIndex - 1, 'left'));
rightBtn.addEventListener('click', () => updateCarousel(activeIndex + 1, 'right'));

// click project buttons inside slides
$$('.slide .btn.view, .slide .btn.download').forEach(btn => {
  btn.addEventListener('click', () => {
    const link = btn.dataset.link;
    if (link) window.open(link, '_blank');
  });
});

// keyboard arrow support
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') updateCarousel(activeIndex - 1);
  if (e.key === 'ArrowRight') updateCarousel(activeIndex + 1);
});

// ---------- flip & motion blur on scroll for slides ----------
slides.forEach((card) => {
  gsap.fromTo(card, { rotateY: 18, opacity: 0.8, filter: 'blur(6px)' }, {
    rotateY: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out',
    scrollTrigger: { trigger: card, start: 'top 80%', end: 'top 40%', scrub: true }
  });
});

// ---------- reveal words for about text (word-by-word) ----------
function splitAndReveal(selector) {
  const el = $(selector);
  if (!el) return;
  const text = el.textContent.trim();
  const words = text.split(' ');
  el.innerHTML = words.map(w => `<span class="word" style="display:inline-block;opacity:0;transform:translateY(14px)">${w}&nbsp;</span>`).join('');
  gsap.to('.word', {
    opacity:1, y:0, stagger:0.03, duration:0.6, ease: 'power3.out',
    scrollTrigger: { trigger: selector, start: 'top 85%' }
  });
}
splitAndReveal('.reveal-words');

// ---------- Resume blur effect based on scroll proximity ----------
const resumeSection = $('#resume');
const blurEdges = $$('.resume-blur-edge');
if (resumeSection) {
  ScrollTrigger.create({
    trigger: resumeSection,
    start: 'top bottom',
    end: 'bottom top',
    onUpdate: self => {
      const progress = self.progress; // 0..1
      const blurPx = Math.min(18, progress * 18);
      blurEdges.forEach(be => be.style.backdropFilter = `blur(${blurPx}px)`);
    }
  });
}

// ---------- CTA hover glow for buttons ----------
$$('.btn, .carousel-arrow, .big-btn').forEach(btn => {
  btn.addEventListener('mouseenter', (e) => {
    gsap.to(btn, { y: -6, boxShadow: '0 20px 50px rgba(0,0,0,0.35)', duration: 0.28 });
  });
  btn.addEventListener('mouseleave', (e) => {
    gsap.to(btn, { y: 0, boxShadow: 'none', duration: 0.28 });
  });
});

// ---------- Accessibility & mobile: dropdown click open ----------
if ('ontouchstart' in window) {
  const drop = $('#projectsDropdown');
  if (drop) {
    drop.addEventListener('click', (ev) => {
      drop.classList.toggle('open');
      const menu = $('#projectsMenu');
      menu.style.display = drop.classList.contains('open') ? 'flex' : '';
      ev.stopPropagation();
    });
    document.body.addEventListener('click', () => {
      const menu = $('#projectsMenu');
      if (menu) menu.style.display = '';
      drop.classList.remove('open');
    });
  }
}

// ---------- small performance tweak: reduce animations on low-power devices ----------
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 2) {
  gsap.globalTimeline.timeScale(1.4);
}
