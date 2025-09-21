// HERO TYPING EFFECT
const typingText = ["Business Analytics", "Finance", "Dashboarding", "Data Visualization"];
let i=0, j=0, isDeleting=false;
const typingElem = document.querySelector(".typing");

function type() {
  let fullText = typingText[i];
  let current = isDeleting ? fullText.substring(0, j--) : fullText.substring(0, j++);
  typingElem.textContent = current;

  if(!isDeleting && j===fullText.length){ isDeleting=true; setTimeout(type,1000); return;}
  if(isDeleting && j===0){ isDeleting=false; i=(i+1)%typingText.length; setTimeout(type,200); return;}
  setTimeout(type,isDeleting?50:100);
}
type();

// PROJECT FILTER
const filterBtns = document.querySelectorAll(".project-filters button");
const projects = document.querySelectorAll(".project-card");
filterBtns.forEach(btn => btn.addEventListener("click", ()=>{
  const filter = btn.dataset.filter;
  projects.forEach(p => p.style.display = (filter==='all'||p.dataset.category.includes(filter)) ? 'block':'none');
}));

// PROJECT MODALS (Open links)
document.querySelectorAll(".view-btn").forEach(btn=>{
  btn.addEventListener("click", ()=> window.open(btn.dataset.link, "_blank"));
});

// SKILLS CHART (Chart.js)
const ctx = document.getElementById('skillsChart').getContext('2d');
const skillsChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["Power BI & Tableau", "Excel & DAX", "Python & SQL", "Financial Analysis"],
    datasets: [{
      label: 'Skill Level %',
      data: [90,100,60,85],
      backgroundColor:'#64ffda'
    }]
  },
  options: {
    indexAxis:'y',
    scales:{ x:{ max:100 } },
    plugins:{ legend:{ display:false } }
  }
});

// GSAP Animations
gsap.from(".hero-container", {opacity:0, y:-50, duration:1});
gsap.from("#about", {opacity:0, y:50, duration:1, delay:0.2});
gsap.from("#skills", {opacity:0, y:50, duration:1, delay:0.4});
gsap.from("#projects", {opacity:0, y:50, duration:1, delay:0.6});
gsap.from("#resume", {opacity:0, y:50, duration:1, delay:0.8});
gsap.from("#contact", {opacity:0, y:50, duration:1, delay:1});

// CONTACT FORM ALERT
document.getElementById("contact-form").addEventListener("submit", e=>{
  e.preventDefault();
  alert("Message sent! (Demo only)");
  e.target.reset();
});
