// TYPING EFFECT
const typingText=["Business Analytics","Finance","Dashboarding","Data Visualization"];
let i=0,j=0,isDeleting=false;
const typingElem=document.querySelector(".typing");
function type(){
  let fullText=typingText[i];
  let current=isDeleting? fullText.substring(0,j--): fullText.substring(0,j++);
  typingElem.textContent=current;
  if(!isDeleting && j===fullText.length){isDeleting=true; setTimeout(type,1000); return;}
  if(isDeleting && j===0){isDeleting=false;i=(i+1)%typingText.length; setTimeout(type,200); return;}
  setTimeout(type,isDeleting?50:100);
}
type();

// SKILL BAR ANIMATION ON SCROLL
const skillFills=document.querySelectorAll(".skill-fill");
window.addEventListener("scroll",()=>{
  const trigger=window.innerHeight*0.8;
  skillFills.forEach(bar=>{
    const top=bar.getBoundingClientRect().top;
    if(top<trigger){bar.style.width=bar.dataset.percent;}
  });
});

// PROJECT BUTTON LINKS
document.querySelectorAll(".view-btn").forEach(btn=>btn.addEventListener("click",()=>window.open(btn.dataset.link,"_blank")));

// CONTACT FORM DEMO
document.getElementById("contact-form").addEventListener("submit",e=>{
  e.preventDefault(); alert("Message sent! (Demo only)"); e.target.reset();
});

// DARK/LIGHT MODE TOGGLE
const themeBtn=document.getElementById("themeBtn");
themeBtn.addEventListener("click",()=>{
  if(document.body.classList.contains("dark")){
    document.body.classList.replace("dark","light");
    themeBtn.textContent="Dark Mode";
  }else{
    document.body.classList.replace("light","dark");
    themeBtn.textContent="Light Mode";
  }
});
// Default dark mode
document.body.classList.add("dark");

// GSAP Animations
gsap.from(".hero-left img",{opacity:0,x:-50,duration:1});
gsap.from(".hero-right h1",{opacity:0,x:50,duration:1,delay:0.3});
gsap.from(".hero-right h2",{opacity:0,x:50,duration:1,delay:0.5});
gsap.from(".hero-links a",{opacity:0,y:20,duration:1,delay:0.7, stagger:0.2});
gsap.from("#about",{opacity:0,y:50,duration:1, delay:0.9});
gsap.from("#skills",{opacity:0,y:50,duration:1, delay:1.1});
gsap.from("#projects",{opacity:0,y:50,duration:1, delay:1.3});
gsap.from("#resume",{opacity:0,y:50,duration:1, delay:1.5});
gsap.from("#contact",{opacity:0,y:50,duration:1, delay:1.7});

// PARTICLES JS INIT
particlesJS("particles-js",{
  "particles": {
    "number": {"value":50,"density":{"enable":true,"value_area":800}},
    "color":{"value":"#64ffda"},
    "shape":{"type":"circle"},
    "opacity":{"value":0.3},
    "size":{"value":3},
    "move":{"enable":true,"speed":1.5,"direction":"none","out_mode":"out"}
  }
});
