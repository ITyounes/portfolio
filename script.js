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

// ====== Mobile drawer menu ======
const menuBtn = document.getElementById("menuBtn");
const menuClose = document.getElementById("menuClose");
const menuOverlay = document.getElementById("menuOverlay");
const mobileMenu = document.getElementById("mobileMenu");
const drawerLinks = document.querySelectorAll(".drawer-link");

function openMenu() {
  document.body.classList.add("menu-open");
  menuBtn?.setAttribute("aria-expanded", "true");
  mobileMenu?.setAttribute("aria-hidden", "false");
}

function closeMenu() {
  document.body.classList.remove("menu-open");
  menuBtn?.setAttribute("aria-expanded", "false");
  mobileMenu?.setAttribute("aria-hidden", "true");
}

menuBtn?.addEventListener("click", openMenu);
menuClose?.addEventListener("click", closeMenu);
menuOverlay?.addEventListener("click", closeMenu);

// Ferme le menu quand tu cliques un lien
drawerLinks.forEach(link => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

// Ferme avec la touche ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

// ====== Lang switch (si tu as deja une logique) ======
const drawerLangBtn = document.getElementById("drawerLangBtn");
const topLangBtn = document.getElementById("langBtn");

// Ici j'appelle une fonction toggleLang() si tu l'as déjà.
// Sinon je te mets une version simple juste en dessous.
function syncLangButtons(text) {
  if (topLangBtn) topLangBtn.textContent = text;
  if (drawerLangBtn) drawerLangBtn.textContent = text;
}

// Si tu as deja une fonction, remplace le code ci-dessous par ton appel.
let currentLang = "fr"; // par défaut

function applyLanguage(lang) {
  const elements = document.querySelectorAll("[data-fr][data-en]");
  elements.forEach(el => {
    el.textContent = (lang === "fr") ? el.getAttribute("data-fr") : el.getAttribute("data-en");
  });

  currentLang = lang;
  // Le bouton affiche la langue "à passer" (comme ton bouton EN)
  const next = (lang === "fr") ? "EN" : "FR";
  syncLangButtons(next);
}

function toggleLanguage() {
  applyLanguage(currentLang === "fr" ? "en" : "fr");
}

topLangBtn?.addEventListener("click", toggleLanguage);
drawerLangBtn?.addEventListener("click", toggleLanguage);

// applique au chargement
applyLanguage("fr");

