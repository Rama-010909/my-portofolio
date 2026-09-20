/* ========================================
   NOVA PORTFOLIO - Interactive Engine
======================================== */

// ========== DEFAULT DATA ==========
const defaultData = {
  heroSubtitle: "Full-Stack Developer & Creative Technologist specializing in immersive web experiences.",
  aboutTitle: "Building experiences that feel alive",
  aboutText: "I'm a passionate developer who believes the web should be more than static pages. Every project I touch gets a unique personality — smooth animations, thoughtful interactions, and designs that make people stop and stare. From concept to deployment, I craft digital products that leave a lasting impression.",
  contactEmail: "hello@nova.dev",
  contactLocation: "Jakarta, Indonesia",
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
    {
      id: 1,
      title: "Nebula Commerce",
      category: "web",
      desc: "Immersive e-commerce platform with 3D product previews and AI recommendations.",
      tags: ["React", "Three.js", "Node"],
      icon: "fas fa-shopping-bag"
    },
    {
      id: 2,
      title: "Orbit Dashboard",
      category: "app",
      desc: "Real-time analytics dashboard with custom data visualization and smooth transitions.",
      tags: ["Vue", "D3.js", "Firebase"],
      icon: "fas fa-chart-line"
    },
    {
      id: 3,
      title: "Lumina Brand",
      category: "design",
      desc: "Complete brand identity and interactive website for a luxury lifestyle brand.",
      tags: ["Figma", "GSAP", "Webflow"],
      icon: "fas fa-palette"
    },
    {
      id: 4,
      title: "Pulse Social",
      category: "app",
      desc: "Next-gen social platform focused on creative communities and micro-interactions.",
      tags: ["React Native", "GraphQL"],
      icon: "fas fa-users"
    },
    {
      id: 5,
      title: "Aether Portfolio",
      category: "web",
      desc: "Award-winning personal portfolio with particle systems and WebGL effects.",
      tags: ["Vanilla JS", "Canvas", "GLSL"],
      icon: "fas fa-star"
    },
    {
      id: 6,
      title: "Void Magazine",
      category: "design",
      desc: "Editorial website with cinematic scroll storytelling and typography experiments.",
      tags: ["Next.js", "Framer Motion"],
      icon: "fas fa-book-open"
    }
  ],
  experience: [
    {
      id: 1,
      date: "2023 — Present",
      title: "Senior Frontend Engineer",
      company: "Stellar Labs",
      desc: "Leading the design system and building immersive product experiences for enterprise clients."
    },
    {
      id: 2,
      date: "2021 — 2023",
      title: "Creative Developer",
      company: "Pixel & Code",
      desc: "Crafted award-winning websites and interactive installations for global brands."
    },
    {
      id: 3,
      date: "2019 — 2021",
      title: "Frontend Developer",
      company: "Nova Digital",
      desc: "Built responsive web applications and contributed to open-source animation libraries."
    }
  ],
  credentials: {
    username: "admin",
    password: "nova2026"
  }
};

// ========== STATE ==========
let data = JSON.parse(localStorage.getItem("novaPortfolio")) || structuredClone(defaultData);
let isLoggedIn = sessionStorage.getItem("novaAdmin") === "true";

// ========== UTILS ==========
function saveData() {
  localStorage.setItem("novaPortfolio", JSON.stringify(data));
}

function showToast(msg, type = "success") {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.className = `toast show ${type}`;
  setTimeout(() => toast.classList.remove("show"), 3000);
}

function $(sel) { return document.querySelector(sel); }
function $$(sel) { return document.querySelectorAll(sel); }

// ========== LOADER ==========
window.addEventListener("load", () => {
  setTimeout(() => {
    $("#loader").classList.add("hidden");
    initApp();
  }, 2200);
});

// ========== INIT ==========
function initApp() {
  initParticles();
  initCursor();
  initNavbar();
  renderContent();
  initAnimations();
  initFilters();
  initContactForm();
  initAdmin();
  initCounters();
}

// ========== PARTICLES (Nebula Canvas) ==========
function initParticles() {
  const canvas = document.getElementById("nebula");
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

  window.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.6 + 0.2;
      this.color = Math.random() > 0.6
        ? `rgba(0, 240, 255, ${this.opacity})`
        : Math.random() > 0.5
          ? `rgba(178, 75, 243, ${this.opacity})`
          : `rgba(255, 45, 149, ${this.opacity})`;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Mouse interaction
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
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.12 * (1 - dist / 100)})`;
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
    // Subtle gradient overlay
    const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.7);
    grad.addColorStop(0, "rgba(10, 5, 30, 0.3)");
    grad.addColorStop(1, "rgba(5, 5, 16, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    particles.forEach(p => {
      p.update();
      p.draw();
    });
    connect();
    requestAnimationFrame(animate);
  }
  animate();
}

// ========== CUSTOM CURSOR ==========
function initCursor() {
  const cursor = $(".cursor");
  const follower = $(".cursor-follower");
  if (!cursor) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX - 20 + "px";
    follower.style.top = followerY - 20 + "px";
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover effects
  const hoverables = "a, button, .skill-card, .project-card, .filter-btn, .admin-btn, .social-btn";
  document.addEventListener("mouseover", e => {
    if (e.target.closest(hoverables)) {
      cursor.classList.add("hover");
      follower.classList.add("hover");
    }
  });
  document.addEventListener("mouseout", e => {
    if (e.target.closest(hoverables)) {
      cursor.classList.remove("hover");
      follower.classList.remove("hover");
    }
  });
}

// ========== NAVBAR ==========
function initNavbar() {
  const navbar = $(".navbar");
  const links = $$(".nav-link");
  const menuToggle = $("#menuToggle");
  const mobileMenu = $("#mobileMenu");
  const mobileLinks = $$(".mobile-link");

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);

    // Active section
    const sections = $$("section[id]");
    let current = "";
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 200) {
        current = sec.getAttribute("id");
      }
    });
    links.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  });

  menuToggle?.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });

  mobileLinks.forEach(link => {
    link.addEventListener("click", () => mobileMenu.classList.remove("open"));
  });
}

// ========== RENDER CONTENT ==========
function renderContent() {
  // Hero
  $("#heroSubtitle").textContent = data.heroSubtitle;

  // About
  $("#aboutTitle").textContent = data.aboutTitle;
  $("#aboutText").textContent = data.aboutText;

  // Contact
  $("#contactEmail").textContent = data.contactEmail;
  $("#contactLocation").textContent = data.contactLocation;

  // Skills
  const skillsContainer = $("#skillsContainer");
  skillsContainer.innerHTML = data.skills.map(s => `
    <div class="skill-card reveal">
      <div class="skill-icon"><i class="${s.icon}"></i></div>
      <div class="skill-name">${s.name}</div>
      <div class="skill-bar"><div class="skill-progress" data-level="${s.level}"></div></div>
    </div>
  `).join("");

  // Projects
  const projectsGrid = $("#projectsGrid");
  projectsGrid.innerHTML = data.projects.map(p => `
    <div class="project-card reveal" data-category="${p.category}">
      <div class="project-image"><i class="${p.icon}"></i></div>
      <div class="project-info">
        <div class="project-category">${p.category}</div>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.desc}</p>
        <div class="project-tags">
          ${p.tags.map(t => `<span class="project-tag">${t}</span>`).join("")}
        </div>
      </div>
    </div>
  `).join("");

  // Experience
  const timeline = $("#timeline");
  timeline.innerHTML = data.experience.map(e => `
    <div class="timeline-item">
      <div class="timeline-date">${e.date}</div>
      <div class="timeline-title">${e.title}</div>
      <div class="timeline-company">${e.company}</div>
      <p class="timeline-desc">${e.desc}</p>
    </div>
  `).join("");
}

// ========== ANIMATIONS (Intersection Observer) ==========
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Skill bars
        if (entry.target.classList.contains("skill-card")) {
          const bar = entry.target.querySelector(".skill-progress");
          if (bar) {
            setTimeout(() => {
              bar.style.width = bar.dataset.level + "%";
            }, 200);
          }
        }
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

  // Observe all reveal elements and timeline
  setTimeout(() => {
    $$(".reveal, .timeline-item, .skill-card").forEach(el => observer.observe(el));
  }, 100);

  // Section headers
  $$(".section-header").forEach(el => {
    el.classList.add("reveal");
    observer.observe(el);
  });
}

// ========== COUNTERS ==========
function initCounters() {
  const counters = $$(".stat-num");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.dataset.count;
        let current = 0;
        const step = target / 60;
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
  counters.forEach(c => observer.observe(c));
}

// ========== PROJECT FILTERS ==========
function initFilters() {
  const buttons = $$(".filter-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;

      $$(".project-card").forEach(card => {
        if (filter === "all" || card.dataset.category === filter) {
          card.classList.remove("hidden");
          card.style.display = "";
        } else {
          card.classList.add("hidden");
          setTimeout(() => { if (card.classList.contains("hidden")) card.style.display = "none"; }, 400);
        }
      });
    });
  });
}

// ========== CONTACT FORM ==========
function initContactForm() {
  $("#contactForm")?.addEventListener("submit", e => {
    e.preventDefault();
    showToast("Message sent! I'll get back to you soon.");
    e.target.reset();
  });
}

// ========== ADMIN SYSTEM ==========
function initAdmin() {
  const adminBtn = $("#adminBtn");
  const loginModal = $("#loginModal");
  const closeLogin = $("#closeLogin");
  const loginForm = $("#loginForm");
  const adminPanel = $("#adminPanel");
  const logoutBtn = $("#logoutBtn");

  // Open login
  adminBtn?.addEventListener("click", () => {
    if (isLoggedIn) {
      openAdmin();
    } else {
      loginModal.classList.add("active");
    }
  });

  closeLogin?.addEventListener("click", () => loginModal.classList.remove("active"));
  loginModal?.addEventListener("click", e => {
    if (e.target === loginModal) loginModal.classList.remove("active");
  });

  // Login
  loginForm?.addEventListener("submit", e => {
    e.preventDefault();
    const user = $("#username").value.trim();
    const pass = $("#password").value;

    if (user === data.credentials.username && pass === data.credentials.password) {
      isLoggedIn = true;
      sessionStorage.setItem("novaAdmin", "true");
      loginModal.classList.remove("active");
      openAdmin();
      showToast("Welcome back, Admin!");
      loginForm.reset();
      $("#loginError").textContent = "";
    } else {
      $("#loginError").textContent = "Invalid username or password";
    }
  });

  // Logout
  logoutBtn?.addEventListener("click", () => {
    isLoggedIn = false;
    sessionStorage.removeItem("novaAdmin");
    adminPanel.classList.remove("active");
    showToast("Logged out successfully");
  });

  // Tabs
  $$(".admin-nav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      $$(".admin-nav-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      $$(".admin-tab").forEach(t => t.classList.remove("active"));
      $(`#tab-${btn.dataset.tab}`)?.classList.add("active");
      $("#adminTitle").textContent = btn.textContent.trim();
    });
  });

  // Save all
  $("#saveAllBtn")?.addEventListener("click", () => {
    // Content
    data.heroSubtitle = $("#editHeroSubtitle").value;
    data.aboutTitle = $("#editAboutTitle").value;
    data.aboutText = $("#editAboutText").value;
    data.contactEmail = $("#editEmail").value;
    data.contactLocation = $("#editLocation").value;

    // Collect projects, skills, experience from lists
    collectProjects();
    collectSkills();
    collectExperience();

    saveData();
    renderContent();
    initAnimations();
    showToast("All changes saved!");
  });

  // Populate edit fields when opening
  function openAdmin() {
    adminPanel.classList.add("active");
    $("#editHeroSubtitle").value = data.heroSubtitle;
    $("#editAboutTitle").value = data.aboutTitle;
    $("#editAboutText").value = data.aboutText;
    $("#editEmail").value = data.contactEmail;
    $("#editLocation").value = data.contactLocation;
    renderAdminLists();
  }

  // Add buttons
  $("#addProjectBtn")?.addEventListener("click", () => {
    data.projects.push({
      id: Date.now(),
      title: "New Project",
      category: "web",
      desc: "Description here",
      tags: ["Tag"],
      icon: "fas fa-star"
    });
    renderAdminLists();
  });

  $("#addSkillBtn")?.addEventListener("click", () => {
    data.skills.push({ name: "New Skill", icon: "fas fa-code", level: 70 });
    renderAdminLists();
  });

  $("#addExpBtn")?.addEventListener("click", () => {
    data.experience.push({
      id: Date.now(),
      date: "2024 — Present",
      title: "New Role",
      company: "Company",
      desc: "Description"
    });
    renderAdminLists();
  });

  // Settings
  $("#updateCredsBtn")?.addEventListener("click", () => {
    const newUser = $("#newUsername").value.trim();
    const newPass = $("#newPassword").value;
    if (newUser) data.credentials.username = newUser;
    if (newPass) data.credentials.password = newPass;
    saveData();
    showToast("Credentials updated!");
    $("#newUsername").value = "";
    $("#newPassword").value = "";
  });

  $("#resetDataBtn")?.addEventListener("click", () => {
    if (confirm("Reset all data to default? This cannot be undone.")) {
      data = structuredClone(defaultData);
      saveData();
      renderContent();
      renderAdminLists();
      openAdmin();
      showToast("Data reset to default");
    }
  });

  // If already logged in (page refresh)
  if (isLoggedIn) {
    // Don't auto open, just keep state
  }
}

function renderAdminLists() {
  // Projects
  const pList = $("#projectsList");
  pList.innerHTML = data.projects.map((p, i) => `
    <div class="admin-list-item" data-index="${i}">
      <input type="text" value="${p.title}" data-field="title" placeholder="Title">
      <select data-field="category">
        <option value="web" ${p.category === "web" ? "selected" : ""}>Web</option>
        <option value="app" ${p.category === "app" ? "selected" : ""}>App</option>
        <option value="design" ${p.category === "design" ? "selected" : ""}>Design</option>
      </select>
      <input type="text" value="${p.desc}" data-field="desc" placeholder="Description">
      <input type="text" value="${p.tags.join(", ")}" data-field="tags" placeholder="Tags (comma)">
      <div class="item-actions">
        <button class="item-btn delete" data-type="project" data-index="${i}"><i class="fas fa-trash"></i></button>
      </div>
    </div>
  `).join("");

  // Skills
  const sList = $("#skillsList");
  sList.innerHTML = data.skills.map((s, i) => `
    <div class="admin-list-item" data-index="${i}">
      <input type="text" value="${s.name}" data-field="name" placeholder="Skill name">
      <input type="text" value="${s.icon}" data-field="icon" placeholder="Icon class">
      <input type="number" value="${s.level}" data-field="level" min="0" max="100" style="width:80px">
      <div class="item-actions">
        <button class="item-btn delete" data-type="skill" data-index="${i}"><i class="fas fa-trash"></i></button>
      </div>
    </div>
  `).join("");

  // Experience
  const eList = $("#expList");
  eList.innerHTML = data.experience.map((e, i) => `
    <div class="admin-list-item" data-index="${i}">
      <input type="text" value="${e.date}" data-field="date" placeholder="Date">
      <input type="text" value="${e.title}" data-field="title" placeholder="Title">
      <input type="text" value="${e.company}" data-field="company" placeholder="Company">
      <input type="text" value="${e.desc}" data-field="desc" placeholder="Description">
      <div class="item-actions">
        <button class="item-btn delete" data-type="exp" data-index="${i}"><i class="fas fa-trash"></i></button>
      </div>
    </div>
  `).join("");

  // Delete handlers
  $$(".item-btn.delete").forEach(btn => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.type;
      const idx = +btn.dataset.index;
      if (type === "project") data.projects.splice(idx, 1);
      if (type === "skill") data.skills.splice(idx, 1);
      if (type === "exp") data.experience.splice(idx, 1);
      renderAdminLists();
    });
  });
}

function collectProjects() {
  const items = $$("#projectsList .admin-list-item");
  data.projects = Array.from(items).map((item, i) => {
    const inputs = item.querySelectorAll("[data-field]");
    const obj = { id: data.projects[i]?.id || Date.now() + i, icon: data.projects[i]?.icon || "fas fa-star" };
    inputs.forEach(inp => {
      if (inp.dataset.field === "tags") {
        obj.tags = inp.value.split(",").map(t => t.trim()).filter(Boolean);
      } else {
        obj[inp.dataset.field] = inp.value;
      }
    });
    return obj;
  });
}

function collectSkills() {
  const items = $$("#skillsList .admin-list-item");
  data.skills = Array.from(items).map(item => {
    const obj = {};
    item.querySelectorAll("[data-field]").forEach(inp => {
      obj[inp.dataset.field] = inp.dataset.field === "level" ? +inp.value : inp.value;
    });
    return obj;
  });
}

function collectExperience() {
  const items = $$("#expList .admin-list-item");
  data.experience = Array.from(items).map((item, i) => {
    const obj = { id: data.experience[i]?.id || Date.now() + i };
    item.querySelectorAll("[data-field]").forEach(inp => {
      obj[inp.dataset.field] = inp.value;
    });
    return obj;
  });
}
