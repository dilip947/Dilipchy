// Typing Animation
const typingText = ["Business Analytics", "Finance", "Dashboarding", "Data Visualization"];
let i=0, j=0, currentText="", isDeleting=false;
const typingElem = document.querySelector(".typing");

function type() {
  if(i >= typingText.length) i=0;
  const fullText = typingText[i];
  if(isDeleting){
    currentText = fullText.substring(0,j--);
  }else{
    currentText = fullText.substring(0,j++);
  }
  typingElem.textContent = currentText;
  if(!isDeleting && j === fullText.length){ isDeleting=true; setTimeout(type,1000); return; }
  if(isDeleting && j===0){ isDeleting=false; i++; setTimeout(type,200); return; }
  setTimeout(type,isDeleting?50:100);
}
type();

// Animate Skill Bars
window.addEventListener("load", () => {
  document.querySelectorAll(".progress-bar div").forEach(bar => {
    bar.style.width = bar.dataset.width;
  });
});

// Project Modal Logic
document.querySelectorAll(".view-btn").forEach(btn=>{
  btn.addEventListener("click", e=>{
    const modal = document.getElementById(btn.dataset.modal);
    modal.style.display="flex";
  });
});
document.querySelectorAll(".close").forEach(span=>{
  span.addEventListener("click", e=>{
    span.parentElement.parentElement.style.display="none";
  });
});
window.addEventListener("click", e=>{
  if(e.target.classList.contains("modal")) e.target.style.display="none";
});

// Project Filter
const filterButtons = document.querySelectorAll(".project-filters button");
const projects = document.querySelectorAll(".project-card");
filterButtons.forEach(btn=>{
  btn.addEventListener("click", ()=>{
    const filter = btn.dataset.filter;
    projects.forEach(p=>{
      if(filter==="all" || p.dataset.category.includes(filter)) p.style.display="block";
      else p.style.display="none";
    });
  });
});

// Contact form (simple alert validation)
document.getElementById("contact-form").addEventListener("submit", e=>{
  e.preventDefault();
  alert("Message sent! (For demo purposes)");
  e.target.reset();
});
