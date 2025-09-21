// =============== PARTICLES ===============
particlesJS("particles-js", {
  "particles": {
    "number": {"value":80,"density":{"enable":true,"value_area":800}},
    "color":{"value":["#64ffda","#00cfff","#ff64da"]},
    "shape":{"type":"circle"},
    "opacity":{"value":0.3},
    "size":{"value":3},
    "move":{"enable":true,"speed":2,"direction":"none","out_mode":"out"}
  },
  "interactivity":{"events":{"onhover":{"enable":true,"mode":"repulse"}}}
});

// =============== HERO TYPING ===============
const typingText = "Business Analytics | Finance | Dashboarding";
const typingElement = document.querySelector(".typing");
let index = 0;
function type() {
  if(index < typingText.length){
    typingElement.textContent += typingText.charAt(index);
    index++;
    setTimeout(type,100);
  }
}
type();

// =============== DARK/LIGHT MODE ===============
const themeBtn = document.getElementById("themeBtn");
themeBtn.addEventListener("click", ()=>{
  document.body.classList.toggle("dark-mode");
  if(document.body.classList.contains("dark-mode")){
    themeBtn.textContent = "Light Mode";
  } else {
    themeBtn.textContent = "Dark Mode";
  }
});

// =============== PROJECT BUTTONS ===============
document.querySelectorAll(".view-btn").forEach(btn=>{
  btn.addEventListener("click",()=> window.open(btn.dataset.link));
});
document.querySelectorAll(".download-btn").forEach(btn=>{
  btn.addEventListener("click",()=> window.open(btn.dataset.link));
});

// =============== SKILL BAR ANIMATION ===============
const skillFills = document.querySelectorAll(".skill-fill");
window.addEventListener("scroll",()=>{
  skillFills.forEach(fill=>{
    const skillTop = fill.getBoundingClientRect().top;
    if(skillTop < window.innerHeight - 50){
      fill.style.width = fill.dataset.percent;
    }
  });
});

// =============== GSAP SCROLL ANIMATIONS ===============
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".section").forEach(section=>{
  gsap.from(section,{
    opacity:0,
    y:50,
    duration:1,
    scrollTrigger:{
      trigger:section,
      start:"top 80%",
      toggleActions:"play none none none"
    }
  });
});

// =============== PARALLAX HERO =================
gsap.to(".hero-left",{
  yPercent:20,
  ease:"none",
  scrollTrigger:{
    trigger:".hero-section",
    start:"top top",
    scrub:true
  }
});
gsap.to(".hero-right",{
  yPercent:-20,
  ease:"none",
  scrollTrigger:{
    trigger:".hero-section",
