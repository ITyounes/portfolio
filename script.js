let isEnglish = false;

const langBtn = document.getElementById("langBtn");
const translatables = document.querySelectorAll("[data-fr]");
const navItems = document.querySelectorAll(".nav-item");

function updateLanguage() {
  translatables.forEach(element => {
    element.innerHTML = isEnglish
      ? element.dataset.en
      : element.dataset.fr;
  });

  langBtn.textContent = isEnglish ? "FR" : "EN";
}

langBtn.addEventListener("click", () => {
  isEnglish = !isEnglish;
  updateLanguage();

  langBtn.classList.add("animate");
  setTimeout(() => {
    langBtn.classList.remove("animate");
  }, 200);
});

navItems.forEach(item => {
  item.addEventListener("click", () => {
    navItems.forEach(link => link.classList.remove("active"));
    item.classList.add("active");
  });
});

updateLanguage();





const nodes = document.querySelectorAll(".node");
const baseRadius = 170;
let angle = 0;

const speed = 0.002;
let time = 0;

function animate() {
  angle += speed;

  time += 0.03;
  const bounce = Math.sin(time) * 6; 

  nodes.forEach((node, index) => {
    const nodeAngle =
      angle + (index * (Math.PI * 2) / nodes.length);

    const radius = baseRadius + bounce;

    const x = Math.cos(nodeAngle) * radius;
    const y = Math.sin(nodeAngle) * radius;

    node.style.left = `calc(50% + ${x}px - 27px)`;
    node.style.top  = `calc(50% + ${y}px - 27px)`;
  });

  requestAnimationFrame(animate);
}

animate();




document.addEventListener("DOMContentLoaded", () => {

  const items = document.querySelectorAll('.timeline-item');
  const timeline = document.querySelector('.timeline-container');
  const line = document.querySelector('.animated-line');

  const lineObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        line.style.width = "90%";
      }
    });
  }, { threshold: 0.3 });
  lineObserver.observe(timeline);

  let delay = 0;
  items.forEach(item => {
    item.style.transitionDelay = `${delay}s`;
    delay += 0.22;
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.4 });

  items.forEach(item => observer.observe(item));
});






document.addEventListener("DOMContentLoaded", () => {

  const tabs = document.querySelectorAll(".skill-tab");
  const panels = document.querySelectorAll(".skill-panel");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {

      tabs.forEach(t => t.classList.remove("active"));
      panels.forEach(p => p.classList.remove("active"));

      tab.classList.add("active");

      const target = tab.dataset.skill;
      document.getElementById(target).classList.add("active");
    });
  });

});





const tabs = document.querySelectorAll(".skill-tab");
const panels = document.querySelectorAll(".skill-panel");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {

    tabs.forEach(t => t.classList.remove("active"));
    panels.forEach(p => p.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(tab.dataset.target).classList.add("active");
  });
});

