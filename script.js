// DARK/LIGHT MODE
const themeBtn = document.getElementById('themeToggle');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeBtn.innerText = document.body.classList.contains('dark') ? 'Light Mode' : 'Dark Mode';
});

// PROJECT SLIDER
const projectWrapper = document.querySelector('.project-wrapper');
const leftBtn = document.querySelector('.slide-left');
const rightBtn = document.querySelector('.slide-right');
let projectIndex = 0;
const projects = document.querySelectorAll('.project-card');

function updateSlider() {
  projectWrapper.style.transform = `translateX(-${projectIndex * 320}px)`;
}
leftBtn.addEventListener('click', () => {
  projectIndex = projectIndex > 0 ? projectIndex - 1 : projects.length -1;
  updateSlider();
});
rightBtn.addEventListener('click', () => {
  projectIndex = projectIndex < projects.length -1 ? projectIndex +1 : 0;
  updateSlider();
});

// RESUME ZOOM
const zoomIn = document.getElementById('zoomIn');
const zoomOut = document.getElementById('zoomOut');
const resumeFrame = document.querySelector('.resume-frame');
let scale = 1;
zoomIn.addEventListener('click', () => { scale += 0.1; resumeFrame.style.transform = `scale(${scale})`; });
zoomOut.addEventListener('click', () => { scale -= 0.1; resumeFrame.style.transform = `scale(${scale})`; });

// SERVICES IMAGE HOVER
document.querySelectorAll('.service').forEach(service=>{
  const imagesDiv = service.querySelector('.preview-images');
  const imageUrls = service.dataset.images ? service.dataset.images.split(',') : [];
  let current = 0;
  let interval;
  service.addEventListener('mouseenter', ()=>{
    if(imageUrls.length===0) return;
    interval = setInterval(()=>{
      imagesDiv.innerHTML = `<img src="${imageUrls[current]}" width="100">`;
      current = (current+1)%imageUrls.length;
    }, 1000);
  });
  service.addEventListener('mouseleave', ()=>{
    clearInterval(interval);
    imagesDiv.innerHTML = '';
  });
});

// DROP-DOWN NAVIGATION (STAY OPEN)
document.querySelectorAll('.dropdown').forEach(dropdown=>{
  const button = dropdown.querySelector('.dropbtn');
  const content = dropdown.querySelector('.dropdown-content');
  dropdown.addEventListener('mouseenter', ()=>{ content.style.display='block'; });
  dropdown.addEventListener('mouseleave', ()=>{ content.style.display='none'; });
});
