/* ========================================
   RAMZZ PORTFOLIO - Main Page Engine
======================================== */

const STORAGE_KEY = "ramzzPortfolio";

const defaultData = {
  displayName: "Rama",
  welcomeLine: "Halo,",
  welcomeName: "Welcome to RAMZZ",
  welcomeSub: "Portfolio & Creative Space",
  jobTitle: "Full-Stack Developer & Creative Technologist",
  profilePhoto: "",
  heroSubtitle: "Full-Stack Developer & Creative Technologist specializing in immersive web experiences.",
  aboutTitle: "Building experiences that feel alive",
  aboutText: "I'm a passionate developer who believes the web should be more than static pages. Every project I touch gets a unique personality — smooth animations, thoughtful interactions, and designs that make people stop and stare. From concept to deployment, I craft digital products that leave a lasting impression.",
  contactEmail: "hello@ramzz.dev",
  contactLocation: "Jakarta, Indonesia",
  stats: { projects: 50, years: 5, clients: 30 },
  skills: [
    { name: "JavaScript", icon: "fab fa-js", level: 95 },
    { name: "React / Next.js", icon: "fab fa-react", level: 90 },
    { name: "Node.js", icon: "fab fa-node-js", level: 85 },
    { name: "Python", icon: "fab fa-python", level: 80 },
    { name: "UI/UX Design", icon: "fas fa-pencil-ruler", level: 88 },
    { name: "Three.js / WebGL", icon: "fas fa-cube", level: 75 },
    { name: "CSS / Animation", icon: "fab fa-css3-alt", level: 92 },
    { name: "TypeScript", icon: "fas fa-code", level: 85 }
  ],
  projects: [
    { id: 1, title: "Nebula Commerce", category: "web", desc: "Immersive e-commerce platform with 3D product previews and AI recommendations.", tags: ["React", "Three.js", "Node"], icon: "fas fa-shopping-bag", image: "" },
    { id: 2, title: "Orbit Dashboard", category: "app", desc: "Real-time analytics dashboard with custom data visualization and smooth transitions.", tags: ["Vue", "D3.js", "Firebase"], icon: "fas fa-chart-line", image: "" },
    { id: 3, title: "Lumina Brand", category: "design", desc: "Complete brand identity and interactive website for a luxury lifestyle brand.", tags: ["Figma", "GSAP", "Webflow"], icon: "fas fa-palette", image: "" },
    { id: 4, title: "Pulse Social", category: "app", desc: "Next-gen social platform focused on creative communities and micro-interactions.", tags: ["React Native", "GraphQL"], icon: "fas fa-users", image: "" },
    { id: 5, title: "Aether Portfolio", category: "web", desc: "Award-winning personal portfolio with particle systems and WebGL effects.", tags: ["Vanilla JS", "Canvas", "GLSL"], icon: "fas fa-star", image: "" },
    { id: 6, title: "Void Magazine", category: "design", desc: "Editorial website with cinematic scroll storytelling and typography experiments.", tags: ["Next.js", "Framer Motion"], icon: "fas fa-book-open", image: "" }
  ],
  experience: [
    { id: 1, date: "2023 — Present", title: "Senior Frontend Engineer", company: "Stellar Labs", desc: "Leading the design system and building immersive product experiences for enterprise clients." },
    { id: 2, date: "2021 — 2023", title: "Creative Developer", company: "Pixel & Code", desc: "Crafted award-winning websites and interactive installations for global brands." },
    { id: 3, date: "2019 — 2021", title: "Frontend Developer", company: "Ramzz Digital", desc: "Built responsive web applications and contributed to open-source animation libraries." }
  ]
};

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...structuredClone(defaultData), ...JSON.parse(raw) };
  } catch (e) {}
  return structuredClone(defaultData);
}

let data = loadData();

// Apply welcome text to loader immediately
(function applyWelcome() {
  const line = document.getElementById("welcomeLine1");
  const name = document.getElementById("welcomeName");
  const sub = document.getElementById("welcomeSub");
  if (line && data.welcomeLine) line.textContent = data.welcomeLine;
  if (name && data.welcomeName) name.textContent = data.welcomeName;
  if (sub && data.welcomeSub) sub.textContent = data.welcomeSub;
})();


function $(sel) { return document.querySelector(sel); }
function $$(sel) { return document.querySelectorAll(sel); }

window.addEventListener("load", () => {
  const bar = document.getElementById("loaderBar");
  let progress = 0;
  const tick = setInterval(() => {
    progress += Math.random() * 18 + 8;
    if (progress > 100) progress = 100;
    if (bar) bar.style.width = progress + "%";
    if (progress >= 100) clearInterval(tick);
  }, 280);

  setTimeout(() => {
    $("#loader")?.classList.add("hidden");
    initApp();
  }, 3200);
});

function initApp() {
  initParticles();
  initCursor();
  initNavbar();
  renderContent();
  initAnimations();
  initFilters();
  initContactForm();
  initCounters();
  initMusic();
}

function initParticles() {
  const canvas = document.getElementById("nebula");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let particles = [];
  let mouse = { x: null, y: null };
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.6 + 0.2;
      const r = Math.random();
      this.color = r > 0.6
        ? `rgba(168, 180, 196, ${this.opacity})`
        : r > 0.3
          ? `rgba(120, 130, 150, ${this.opacity})`
          : `rgba(140, 150, 165, ${this.opacity})`;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (mouse.x && mouse.y) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          this.x -= dx * 0.01;
          this.y -= dy * 0.01;
        }
      }
      if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  for (let i = 0; i < 120; i++) particles.push(new Particle());

  function connect() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(160, 170, 185, ${0.1 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);
    const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.7);
    grad.addColorStop(0, "rgba(10, 5, 30, 0.3)");
    grad.addColorStop(1, "rgba(5, 5, 16, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    particles.forEach((p) => { p.update(); p.draw(); });
    connect();
    requestAnimationFrame(animate);
  }
  animate();
}

function initCursor() {
  const cursor = $(".cursor");
  const follower = $(".cursor-follower");
  if (!cursor) return;
  let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
  });

  (function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX - 20 + "px";
    follower.style.top = followerY - 20 + "px";
    requestAnimationFrame(animateFollower);
  })();

  const hoverables = "a, button, .skill-card, .project-card, .filter-btn, .admin-btn, .social-btn";
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(hoverables)) {
      cursor.classList.add("hover");
      follower.classList.add("hover");
    }
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(hoverables)) {
      cursor.classList.remove("hover");
      follower.classList.remove("hover");
    }
  });
}

function initNavbar() {
  const navbar = $(".navbar");
  const links = $$(".nav-link");
  const menuToggle = $("#menuToggle");
  const mobileMenu = $("#mobileMenu");

  window.addEventListener("scroll", () => {
    navbar?.classList.toggle("scrolled", window.scrollY > 50);
    const sections = $$("section[id]");
    let current = "";
    sections.forEach((sec) => {
      if (window.scrollY >= sec.offsetTop - 200) current = sec.getAttribute("id");
    });
    links.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  });

  menuToggle?.addEventListener("click", () => mobileMenu?.classList.toggle("open"));
  $$(".mobile-link").forEach((link) => {
    link.addEventListener("click", () => mobileMenu?.classList.remove("open"));
  });
}

function renderContent() {
  const sub = $("#heroSubtitle");
  if (sub) sub.textContent = data.heroSubtitle;

  const statEls = $$(".stat-num");
  if (statEls[0]) statEls[0].dataset.count = data.stats?.projects ?? 50;
  if (statEls[1]) statEls[1].dataset.count = data.stats?.years ?? 5;
  if (statEls[2]) statEls[2].dataset.count = data.stats?.clients ?? 30;

  const aboutTitle = $("#aboutTitle");
  const aboutText = $("#aboutText");
  if (aboutTitle) aboutTitle.textContent = data.aboutTitle;
  if (aboutText) aboutText.textContent = data.aboutText;

  const profileImg = $("#profileImg");
  const profileIcon = $("#profileIcon");
  if (data.profilePhoto && profileImg) {
    profileImg.src = data.profilePhoto;
    profileImg.style.display = "block";
    if (profileIcon) profileIcon.style.display = "none";
  }

  const email = $("#contactEmail");
  const loc = $("#contactLocation");
  if (email) email.textContent = data.contactEmail;
  if (loc) loc.textContent = data.contactLocation;

  const skillsContainer = $("#skillsContainer");
  if (skillsContainer) {
    skillsContainer.innerHTML = data.skills.map((s) => `
      <div class="skill-card reveal">
        <div class="skill-icon"><i class="${s.icon}"></i></div>
        <div class="skill-name">${s.name}</div>
        <div class="skill-bar"><div class="skill-progress" data-level="${s.level}"></div></div>
      </div>
    `).join("");
  }

  const projectsGrid = $("#projectsGrid");
  if (projectsGrid) {
    projectsGrid.innerHTML = data.projects.map((p) => `
      <div class="project-card reveal" data-category="${p.category}">
        <div class="project-image" ${p.image ? `style="background-image:url('${p.image}');background-size:cover;background-position:center;"` : ""}>
          ${p.image ? "" : `<i class="${p.icon || "fas fa-star"}"></i>`}
        </div>
        <div class="project-info">
          <div class="project-category">${p.category}</div>
          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.desc}</p>
          <div class="project-tags">
            ${(p.tags || []).map((t) => `<span class="project-tag">${t}</span>`).join("")}
          </div>
        </div>
      </div>
    `).join("");
  }

  const timeline = $("#timeline");
  if (timeline) {
    timeline.innerHTML = data.experience.map((e) => `
      <div class="timeline-item">
        <div class="timeline-date">${e.date}</div>
        <div class="timeline-title">${e.title}</div>
        <div class="timeline-company">${e.company}</div>
        <p class="timeline-desc">${e.desc}</p>
      </div>
    `).join("");
  }
}

function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        if (entry.target.classList.contains("skill-card")) {
          const bar = entry.target.querySelector(".skill-progress");
          if (bar) setTimeout(() => { bar.style.width = bar.dataset.level + "%"; }, 200);
        }
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

  setTimeout(() => {
    $$(".reveal, .timeline-item, .skill-card").forEach((el) => observer.observe(el));
  }, 100);

  $$(".section-header").forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });
}

function initCounters() {
  const counters = $$(".stat-num");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.dataset.count;
        let current = 0;
        const step = target / 50;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(current);
          }
        }, 25);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach((c) => observer.observe(c));
}

function initFilters() {
  $$(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      $$(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      $$(".project-card").forEach((card) => {
        if (filter === "all" || card.dataset.category === filter) {
          card.classList.remove("hidden");
          card.style.display = "";
        } else {
          card.classList.add("hidden");
          setTimeout(() => {
            if (card.classList.contains("hidden")) card.style.display = "none";
          }, 400);
        }
      });
    });
  });
}


// ========== MUSIC / FAVORITE SONG ==========
function initMusic() {
  const audio = document.getElementById("bgMusic");
  const card = document.getElementById("favSong");
  const btn = document.getElementById("musicToggle");
  const icon = document.getElementById("musicIcon");
  if (!audio || !btn) return;

  let playing = false;

  const setPlaying = (on) => {
    playing = on;
    card?.classList.toggle("playing", on);
    if (icon) icon.className = on ? "fas fa-pause" : "fas fa-play";
  };

  btn.addEventListener("click", async () => {
    try {
      if (playing) {
        audio.pause();
        setPlaying(false);
      } else {
        await audio.play();
        setPlaying(true);
      }
    } catch (err) {
      alert("File lagu belum ditemukan.
Pastikan about-you.mp3 ada di folder yang sama.");
      console.warn("Music error:", err);
    }
  });

  audio.addEventListener("ended", () => setPlaying(false));
  audio.addEventListener("pause", () => { if (!audio.ended) setPlaying(false); });
  audio.addEventListener("play", () => setPlaying(true));
}

function initContactForm() {
  $("#contactForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Pesan terkirim! Saya akan segera membalas.");
    e.target.reset();
  });
}
