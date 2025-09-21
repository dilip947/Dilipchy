// Dark Mode Toggle
const body = document.body;
const toggleDarkMode = () => {
  body.classList.toggle('dark-mode');
  body.classList.toggle('light-mode');
};
document.getElementById('themeToggle').addEventListener('click', toggleDarkMode);

// Dropdown Menu Fix
document.querySelectorAll('.dropdown').forEach(drop => {
  drop.addEventListener('mouseenter', () => {
    drop.querySelector('.dropdown-menu').style.display = 'block';
  });
  drop.addEventListener('mouseleave', () => {
    drop.querySelector('.dropdown-menu').style.display = 'none';
  });
});

// Project Carousel
const slides = document.querySelectorAll('.project-slide');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - index)}%)`;
  });
}

document.querySelector('.carousel-btn.left').addEventListener('click', () => {
  currentSlide = (currentSlide > 0) ? currentSlide - 1 : slides.length - 1;
  showSlide(currentSlide);
});

document.querySelector('.carousel-btn.right').addEventListener('click', () => {
  currentSlide = (currentSlide < slides.length - 1) ? currentSlide + 1 : 0;
  showSlide(currentSlide);
});

showSlide(currentSlide);

// Shuffle Images on Hover
const shuffleContainer = document.querySelector('.shuffle-container');
const shuffleImages = shuffleContainer.querySelectorAll('img');
let shuffleIndex = 0;
let shuffleInterval;

shuffleContainer.addEventListener('mouseenter', () => {
  shuffleInterval = setInterval(() => {
    shuffleImages.forEach((img, idx) => {
      img.classList.toggle('active', idx === shuffleIndex);
    });
    shuffleIndex = (shuffleIndex + 1) % shuffleImages.length;
  }, 1000);
});

shuffleContainer.addEventListener('mouseleave', () => {
  clearInterval(shuffleInterval);
  shuffleImages.forEach(img => img.classList.remove('active'));
});

// Resume Zoom Controls
const resume = document.querySelector('.resume-content');
let zoomLevel = 1;

document.getElementById('zoomIn').addEventListener('click', () => {
  zoomLevel += 0.1;
  resume.style.transform = `scale(${zoomLevel})`;
});

document.getElementById('zoomOut').addEventListener('click', () => {
  zoomLevel = Math.max(0.5, zoomLevel - 0.1);
  resume.style.transform = `scale(${zoomLevel})`;
});
