/* ============================================================
   Portfolio — OUAMRANE Younes | script.js
   ============================================================ */

// ---------- Navbar : ombre au scroll ----------
const nav = document.querySelector(".nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 30);
});

// ---------- Barre de progression de lecture (bas de l'écran) ----------
const progress = document.createElement("div");
progress.className = "progress-bar";
document.body.appendChild(progress);
const updateProgress = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
};
window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);
updateProgress();

// ---------- Scrollspy : section active dans la navbar (page d'accueil) ----------
const spySections = ["parcours", "competences", "projets", "contact"]
  .map(id => document.getElementById(id))
  .filter(Boolean);
if (spySections.length) {
  const navAnchors = [...document.querySelectorAll(".nav__links a")];
  const setActive = id => {
    navAnchors.forEach(a => {
      const href = a.getAttribute("href");
      const isHome = href === "index.html" || href === "./" || href === "/";
      a.classList.toggle("active", id ? href.endsWith("#" + id) : isHome);
    });
  };
  const spyObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
  }, { rootMargin: "-40% 0px -55% 0px" });
  spySections.forEach(s => spyObs.observe(s));
  window.addEventListener("scroll", () => {
    if (window.scrollY < 300) setActive(null);
  }, { passive: true });
}

// ---------- Menu mobile ----------
const burger = document.querySelector(".nav__burger");
const links = document.querySelector(".nav__links");
if (burger) {
  burger.addEventListener("click", () => {
    burger.classList.toggle("open");
    links.classList.toggle("open");
  });
  links.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => {
      burger.classList.remove("open");
      links.classList.remove("open");
    })
  );
}

// ---------- Reveal au scroll ----------
const revealObs = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("in");
      revealObs.unobserve(e.target);
    }
  }),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach(el => revealObs.observe(el));

// ---------- Effet "spotlight" sur les cartes ----------
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  });
});

// ---------- Compteurs animés ----------
const counters = document.querySelectorAll("[data-count]");
const countObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.count;
    const dur = 1400;
    const t0 = performance.now();
    const tick = now => {
      const p = Math.min((now - t0) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target + (el.dataset.suffix || "");
    };
    requestAnimationFrame(tick);
    countObs.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(c => countObs.observe(c));

// ---------- Barres de compétences ----------
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.querySelectorAll(".skill__fill").forEach(f => {
      f.style.width = f.dataset.level + "%";
    });
    skillObs.unobserve(e.target);
  });
}, { threshold: 0.3 });
document.querySelectorAll(".skill-block").forEach(b => skillObs.observe(b));

// ---------- Terminal animé (hero) ----------
const term = document.getElementById("terminal-body");
if (term) {
  const script = [
    { p: "younes@rt-iut:~$", c: " whoami", o: ["Étudiant BUT Réseaux & Télécommunications — IUT Villetaneuse"] },
    { p: "younes@rt-iut:~$", c: " cat interets.txt", o: ["> Administration réseau · Cybersécurité · Systèmes Linux"] },
    { p: "younes@rt-iut:~$", c: " ping alternance.entreprise.fr", o: ["64 bytes from alternance : icmp_seq=1 ttl=64 time=0.4 ms", "<span class='ok'>✔ Disponible pour une alternance dès septembre</span>"] },
    { p: "younes@rt-iut:~$", c: "", o: [] }
  ];
  let li = 0;
  const typeLine = () => {
    if (li >= script.length) {
      term.insertAdjacentHTML("beforeend", `<div><span class="prompt">younes@rt-iut:~$</span> <span class="cursor"></span></div>`);
      return;
    }
    const { p, c, o } = script[li];
    const row = document.createElement("div");
    row.innerHTML = `<span class="prompt">${p}</span><span class="cmd"></span>`;
    term.appendChild(row);
    const cmdEl = row.querySelector(".cmd");
    let ci = 0;
    const typeChar = () => {
      if (ci < c.length) {
        cmdEl.textContent += c[ci++];
        setTimeout(typeChar, 38 + Math.random() * 45);
      } else {
        o.forEach((line, i) =>
          setTimeout(() => {
            term.insertAdjacentHTML("beforeend", `<div class="out">${line}</div>`);
          }, 220 * (i + 1))
        );
        li++;
        setTimeout(typeLine, 220 * (o.length + 1) + 420);
      }
    };
    setTimeout(typeChar, 350);
  };
  const termObs = new IntersectionObserver(e => {
    if (e[0].isIntersecting) { typeLine(); termObs.disconnect(); }
  }, { threshold: 0.4 });
  termObs.observe(term);
}

// ---------- Sommaire : lien actif au scroll ----------
const tocLinks = document.querySelectorAll(".toc a");
if (tocLinks.length) {
  const sections = [...tocLinks].map(a => document.querySelector(a.getAttribute("href")));
  const tocObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        tocLinks.forEach(a => a.classList.remove("active"));
        const link = document.querySelector(`.toc a[href="#${e.target.id}"]`);
        if (link) link.classList.add("active");
      }
    });
  }, { rootMargin: "-30% 0px -60% 0px" });
  sections.forEach(s => s && tocObs.observe(s));
}

// ---------- Bouton retour en haut ----------
const toTop = document.querySelector(".to-top");
if (toTop) {
  window.addEventListener("scroll", () => {
    toTop.classList.toggle("visible", window.scrollY > 500);
  });
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

// ---------- Formulaire de contact (mailto) ----------
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const nom = form.querySelector("#f-nom").value.trim();
    const mail = form.querySelector("#f-mail").value.trim();
    const msg = form.querySelector("#f-msg").value.trim();
    const body = encodeURIComponent(`${msg}\n\n— ${nom} (${mail})`);
    window.location.href = `mailto:ouamraneyounes90@gmail.com?subject=${encodeURIComponent("Contact portfolio — " + nom)}&body=${body}`;
  });
}

// ---------- Année du footer ----------
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
