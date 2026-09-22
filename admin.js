/* ========================================
   RAMZZ ADMIN PANEL
======================================== */

const STORAGE_KEY = "ramzzPortfolio";
const AUTH_KEY = "ramzzAdminAuth";

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
  socialIg: "https://instagram.com/vrnjrzkyramadhn",
  socialTt: "https://www.tiktok.com/@vrnjrzkyramadhn",
  socialGh: "https://github.com/Rama-010909",
  cloudUrl: "",
  cloudPath: "ramzz",
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
    {
      id: 1,
      title: "Nebula Commerce",
      category: "web",
      desc: "Immersive e-commerce platform with 3D product previews and AI recommendations.",
      tags: ["React", "Three.js", "Node"],
      icon: "fas fa-shopping-bag",
      image: "", link: ""
    },
    {
      id: 2,
      title: "Orbit Dashboard",
      category: "app",
      desc: "Real-time analytics dashboard with custom data visualization and smooth transitions.",
      tags: ["Vue", "D3.js", "Firebase"],
      icon: "fas fa-chart-line",
      image: "", link: ""
    },
    {
      id: 3,
      title: "Lumina Brand",
      category: "design",
      desc: "Complete brand identity and interactive website for a luxury lifestyle brand.",
      tags: ["Figma", "GSAP", "Webflow"],
      icon: "fas fa-palette",
      image: "", link: ""
    },
    {
      id: 4,
      title: "Pulse Social",
      category: "app",
      desc: "Next-gen social platform focused on creative communities and micro-interactions.",
      tags: ["React Native", "GraphQL"],
      icon: "fas fa-users",
      image: "", link: ""
    },
    {
      id: 5,
      title: "Aether Portfolio",
      category: "web",
      desc: "Award-winning personal portfolio with particle systems and WebGL effects.",
      tags: ["Vanilla JS", "Canvas", "GLSL"],
      icon: "fas fa-star",
      image: "", link: ""
    },
    {
      id: 6,
      title: "Void Magazine",
      category: "design",
      desc: "Editorial website with cinematic scroll storytelling and typography experiments.",
      tags: ["Next.js", "Framer Motion"],
      icon: "fas fa-book-open",
      image: "", link: ""
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
      company: "Ramzz Digital",
      desc: "Built responsive web applications and contributed to open-source animation libraries."
    }
  ],
  credentials: { username: "rama", password: "010909" }
};

let data = loadData();
let tempProjectImage = "";

function loadData() {
  try {

    if (raw) {
      const parsed = JSON.parse(raw);
      // Merge with defaults for any missing keys
      return { ...structuredClone(defaultData), ...parsed };
    }
  } catch (e) {}
  return structuredClone(defaultData);
}

async function saveData() {
  return await cloudSave();
}


function getCloudEndpoint() {
  const base = (data.cloudUrl || "").replace(/\/$/, "");
  if (!base) return null;
  const path = (data.cloudPath || "ramzz").replace(/^\/|\/$/g, "") || "ramzz";
  return base + "/" + path + ".json";
}

async function cloudSave() {
  const urlInput = document.getElementById("editCloudUrl");
  const pathInput = document.getElementById("editCloudPath");
  const baseUrl = (urlInput?.value || FIREBASE_URL).trim().replace(/\/+$/, "");
  const path = (pathInput?.value || FIREBASE_PATH).trim().replace(/^\/+|\/+$/g, "");

  data.cloudUrl = baseUrl;
  data.cloudPath = path;

  const response = await fetch(`${baseUrl}/${path}.json`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`Firebase HTTP ${response.status}`);
  }

  const saved = await response.json();
  data = saved || data;
  showToast("Perubahan berhasil disimpan ke Firebase", "success");
  return true;
}

async function cloudLoad() {
  const baseUrl = (data.cloudUrl || FIREBASE_URL).trim().replace(/\/+$/, "");
  const path = (data.cloudPath || FIREBASE_PATH).trim().replace(/^\/+|\/+$/g, "");

  const response = await fetch(`${baseUrl}/${path}.json`, {
    method: "GET",
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Firebase HTTP ${response.status}`);
  }

  const remote = await response.json();
  if (remote && typeof remote === "object") {
    data = remote;
    data.cloudUrl = baseUrl;
    data.cloudPath = path;
    return data;
  }
  return null;
}

function compressImage(file, maxEdge = 900, quality = 0.72) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objUrl = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(objUrl);
      let width = img.width;
      let height = img.height;
      if (width > maxEdge || height > maxEdge) {
        if (width > height) {
          height = Math.round((height * maxEdge) / width);
          width = maxEdge;
        } else {
          width = Math.round((width * maxEdge) / height);
          height = maxEdge;
        }
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d").drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    img.onerror = reject;
    img.src = objUrl;
  });
}


function showToast(msg, type = "success") {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.className = "toast show" + (type === "error" ? " error" : "");
  setTimeout(() => t.classList.remove("show"), 3000);
}

function isLoggedIn() {
  return sessionStorage.getItem(AUTH_KEY) === "true";
}

function setLoggedIn(val) {
  if (val) sessionStorage.setItem(AUTH_KEY, "true");
  else sessionStorage.removeItem(AUTH_KEY);
}

// ========== INIT ==========
document.addEventListener("DOMContentLoaded", () => {
  if (isLoggedIn()) {
    showDashboard();
  } else {
    showLogin();
  }
  bindEvents();
});

function showLogin() {
  document.getElementById("loginScreen").style.display = "flex";
  document.getElementById("adminDashboard").style.display = "none";
}

async function showDashboard() {
  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("adminDashboard").style.display = "flex";
  // Try pull from cloud if configured
  if (data.cloudUrl) {
    const remote = await cloudLoad();
    if (remote) {
      data = { ...structuredClone(defaultData), ...remote };
      // keep credentials if remote missing them
      if (!data.credentials) data.credentials = defaultData.credentials;
      saveData();
      /* cloud merged silently */
    }
  }
  populateAll();
  updateStats();
}

function bindEvents() {

  // Password eye toggle
  const togglePass = document.getElementById("togglePass");
  const loginPass = document.getElementById("loginPass");
  const eyeIcon = document.getElementById("eyeIcon");
  if (togglePass && loginPass) {
    togglePass.addEventListener("click", () => {
      const isPass = loginPass.type === "password";
      loginPass.type = isPass ? "text" : "password";
      eyeIcon.className = isPass ? "fas fa-eye-slash" : "fas fa-eye";
      togglePass.classList.toggle("active", isPass);
    });
  }

  // Login
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const user = document.getElementById("loginUser").value.trim();
    const pass = document.getElementById("loginPass").value;
    if (user === data.credentials.username && pass === data.credentials.password) {
      setLoggedIn(true);
      showDashboard();
      showToast("Login berhasil!");
    } else {
      document.getElementById("loginError").textContent = "Username atau password salah!";
    }
  });

  // Logout
  document.getElementById("logoutBtn").addEventListener("click", () => {
    setLoggedIn(false);
    showLogin();
    showToast("Logged out");
  });

  // Navigation
  document.querySelectorAll(".nav-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".nav-item").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      document.querySelectorAll(".section").forEach((s) => s.classList.remove("active"));
      const sec = document.getElementById("sec-" + btn.dataset.section);
      if (sec) sec.classList.add("active");
      document.getElementById("pageTitle").textContent = btn.textContent.trim();
    });
  });

  // Save All
  document.getElementById("saveBtn").addEventListener("click", saveAll);

  // Profile photo
  document.getElementById("profileInput").addEventListener("change", handleProfileUpload);
  document.getElementById("removeProfileBtn").addEventListener("click", () => {
    data.profilePhoto = "";
    renderProfilePreview();
    showToast("Foto profil dihapus (klik Simpan Semua)");
  });

  // Projects
  document.getElementById("addProjectBtn").addEventListener("click", () => openProjectModal(null));
  document.getElementById("closeProjectModal").addEventListener("click", closeProjectModal);
  document.getElementById("cancelProjectBtn").addEventListener("click", closeProjectModal);
  document.getElementById("saveProjectBtn").addEventListener("click", saveProjectFromModal);
  document.getElementById("projectImageInput").addEventListener("change", handleProjectImageUpload);
  document.getElementById("removeProjectImageBtn").addEventListener("click", () => {
    tempProjectImage = "";
    renderProjectImagePreview("");
  });
  document.getElementById("projectModal").addEventListener("click", (e) => {
    if (e.target.id === "projectModal") closeProjectModal();
  });

  // Skills
  document.getElementById("addSkillBtn").addEventListener("click", () => {
    data.skills.push({ name: "New Skill", icon: "fas fa-code", level: 70 });
    renderSkills();
  });

  // Experience
  document.getElementById("addExpBtn").addEventListener("click", () => {
    data.experience.push({
      id: Date.now(),
      date: "2024 — Present",
      title: "New Role",
      company: "Company",
      desc: "Description"
    });
    renderExperience();
  });

  // Settings
  document.getElementById("updateCredsBtn").addEventListener("click", () => {
    const u = document.getElementById("newUsername").value.trim();
    const p = document.getElementById("newPassword").value;
    if (u) data.credentials.username = u;
    if (p) data.credentials.password = p;
    if (u || p) {
      saveData();
      showToast("Credentials berhasil diupdate!");
      document.getElementById("newUsername").value = "";
      document.getElementById("newPassword").value = "";
    } else {
      showToast("Isi username atau password baru", "error");
    }
  });

  document.getElementById("resetDataBtn").addEventListener("click", () => {
    if (confirm("Yakin reset SEMUA data ke default? Foto & project custom akan hilang!")) {
      data = structuredClone(defaultData);
      saveData();
      populateAll();
      updateStats();
      showToast("Data direset ke default");
    }
  });
}

// ========== POPULATE ==========
function populateAll() {
  // Profile
  document.getElementById("editDisplayName").value = data.displayName || "";
  document.getElementById("editJobTitle").value = data.jobTitle || "";
  renderProfilePreview();

  // Content
  document.getElementById("editWelcomeLine").value = data.welcomeLine || "Halo,";
  document.getElementById("editWelcomeName").value = data.welcomeName || "Welcome to RAMZZ";
  document.getElementById("editWelcomeSub").value = data.welcomeSub || "Portfolio & Creative Space";
  document.getElementById("editHeroSubtitle").value = data.heroSubtitle || "";
  document.getElementById("editAboutTitle").value = data.aboutTitle || "";
  document.getElementById("editAboutText").value = data.aboutText || "";
  document.getElementById("editEmail").value = data.contactEmail || "";
  document.getElementById("editLocation").value = data.contactLocation || "";
  document.getElementById("editSocialIg").value = data.socialIg || "";
  document.getElementById("editSocialTt").value = data.socialTt || "";
  document.getElementById("editSocialGh").value = data.socialGh || "";
  document.getElementById("editStatProjects").value = data.stats?.projects ?? 50;
  document.getElementById("editStatYears").value = data.stats?.years ?? 5;
  document.getElementById("editStatClients").value = data.stats?.clients ?? 30;

  renderProjects();
  renderSkills();
  renderExperience();
}

function updateStats() {
  document.getElementById("statProjects").textContent = data.projects.length;
  document.getElementById("statSkills").textContent = data.skills.length;
  document.getElementById("statExp").textContent = data.experience.length;
  let photos = 0;
  if (data.profilePhoto) photos++;
  data.projects.forEach((p) => { if (p.image) photos++; });
  document.getElementById("statPhotos").textContent = photos;
}

// ========== PROFILE ==========
function renderProfilePreview() {
  const el = document.getElementById("profilePreview");
  if (data.profilePhoto) {
    el.innerHTML = `<img src="${data.profilePhoto}" alt="Profile">`;
    el.style.backgroundImage = "none";
  } else {
    el.innerHTML = `<i class="fas fa-user-astronaut"></i>`;
  }
}

async function handleProfileUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  if (file.size > 8 * 1024 * 1024) {
    showToast("Ukuran foto max 8MB", "error");
    return;
  }
  try {
    showToast("Mengompres foto...");
    data.profilePhoto = await compressImage(file, 900, 0.72);
    renderProfilePreview();
    showToast("Foto siap — klik Simpan Semua (akan sync ke cloud jika URL sudah diisi)");
  } catch (err) {
    showToast("Gagal proses foto", "error");
  }
  e.target.value = "";
}

// ========== PROJECTS ==========
function renderProjects() {
  const list = document.getElementById("projectsList");
  if (!data.projects.length) {
    list.innerHTML = `<p style="color:var(--text3);padding:2rem;text-align:center;">Belum ada project. Klik "Tambah Project".</p>`;
    return;
  }
  list.innerHTML = data.projects
    .map(
      (p, i) => `
    <div class="item-card">
      <div class="item-thumb" ${p.image ? `style="background-image:url('${p.image}')"` : ""}>
        ${p.image ? "" : `<i class="${p.icon || "fas fa-star"}"></i>`}
      </div>
      <div class="item-info">
        <h4>${escapeHtml(p.title)}</h4>
        <p>${escapeHtml(p.desc)}</p>
        <span class="item-badge">${p.category}</span>
      </div>
      <div class="item-actions">
        <button class="btn-edit" onclick="openProjectModal(${i})" title="Edit"><i class="fas fa-pen"></i></button>
        <button class="btn-delete" onclick="deleteProject(${i})" title="Hapus"><i class="fas fa-trash"></i></button>
      </div>
    </div>
  `
    )
    .join("");
}

function openProjectModal(index) {
  const modal = document.getElementById("projectModal");
  tempProjectImage = "";
  if (index === null || index === undefined) {
    document.getElementById("projectModalTitle").textContent = "Tambah Project";
    document.getElementById("editProjectId").value = "";
    document.getElementById("editProjectTitle").value = "";
    document.getElementById("editProjectCategory").value = "web";
    document.getElementById("editProjectIcon").value = "fas fa-star";
    document.getElementById("editProjectDesc").value = "";
    document.getElementById("editProjectTags").value = "";
    document.getElementById("editProjectLink").value = "";
    renderProjectImagePreview("");
  } else {
    const p = data.projects[index];
    document.getElementById("projectModalTitle").textContent = "Edit Project";
    document.getElementById("editProjectId").value = index;
    document.getElementById("editProjectTitle").value = p.title;
    document.getElementById("editProjectCategory").value = p.category;
    document.getElementById("editProjectIcon").value = p.icon || "fas fa-star";
    document.getElementById("editProjectDesc").value = p.desc;
    document.getElementById("editProjectTags").value = (p.tags || []).join(", ");
    document.getElementById("editProjectLink").value = p.link || "";
    tempProjectImage = p.image || "";
    renderProjectImagePreview(p.image || "");
  }
  modal.classList.add("active");
}

function closeProjectModal() {
  document.getElementById("projectModal").classList.remove("active");
}

function renderProjectImagePreview(src) {
  const el = document.getElementById("projectImagePreview");
  if (src) {
    el.classList.add("has-image");
    el.style.backgroundImage = `url('${src}')`;
    el.innerHTML = "";
  } else {
    el.classList.remove("has-image");
    el.style.backgroundImage = "none";
    el.innerHTML = `<i class="fas fa-image"></i><span>Belum ada gambar</span>`;
  }
}

async function handleProjectImageUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  if (file.size > 8 * 1024 * 1024) {
    showToast("Ukuran gambar max 8MB", "error");
    return;
  }
  try {
    tempProjectImage = await compressImage(file, 1200, 0.75);
    renderProjectImagePreview(tempProjectImage);
  } catch (err) {
    showToast("Gagal proses gambar", "error");
  }
  e.target.value = "";
}

function saveProjectFromModal() {
  const idx = document.getElementById("editProjectId").value;
  const title = document.getElementById("editProjectTitle").value.trim();
  if (!title) {
    showToast("Judul project wajib diisi", "error");
    return;
  }
  const obj = {
    id: idx !== "" ? data.projects[+idx].id : Date.now(),
    title,
    category: document.getElementById("editProjectCategory").value,
    icon: document.getElementById("editProjectIcon").value.trim() || "fas fa-star",
    desc: document.getElementById("editProjectDesc").value.trim(),
    tags: document
      .getElementById("editProjectTags")
      .value.split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    link: document.getElementById("editProjectLink").value.trim(),
    image: tempProjectImage
  };
  if (idx !== "") {
    data.projects[+idx] = obj;
  } else {
    data.projects.push(obj);
  }
  closeProjectModal();
  renderProjects();
  updateStats();
  showToast("Project disimpan (klik Simpan Semua untuk apply ke website)");
}

function deleteProject(index) {
  if (confirm(`Hapus project "${data.projects[index].title}"?`)) {
    data.projects.splice(index, 1);
    renderProjects();
    updateStats();
    showToast("Project dihapus");
  }
}

// ========== SKILLS ==========
function renderSkills() {
  const list = document.getElementById("skillsList");
  list.innerHTML = data.skills
    .map(
      (s, i) => `
    <div class="skill-item">
      <input type="text" value="${escapeHtml(s.name)}" data-i="${i}" data-f="name" placeholder="Nama skill" onchange="updateSkill(this)">
      <input type="text" value="${escapeHtml(s.icon)}" data-i="${i}" data-f="icon" placeholder="Icon class" onchange="updateSkill(this)" style="max-width:160px">
      <input type="number" value="${s.level}" data-i="${i}" data-f="level" min="0" max="100" onchange="updateSkill(this)">
      <div class="item-actions">
        <button class="btn-delete" onclick="deleteSkill(${i})"><i class="fas fa-trash"></i></button>
      </div>
    </div>
  `
    )
    .join("");
}

function updateSkill(el) {
  const i = +el.dataset.i;
  const f = el.dataset.f;
  data.skills[i][f] = f === "level" ? +el.value : el.value;
}

function deleteSkill(i) {
  if (confirm("Hapus skill ini?")) {
    data.skills.splice(i, 1);
    renderSkills();
    updateStats();
  }
}

// ========== EXPERIENCE ==========
function renderExperience() {
  const list = document.getElementById("expList");
  list.innerHTML = data.experience
    .map(
      (e, i) => `
    <div class="exp-item" style="flex-wrap:wrap">
      <input type="text" value="${escapeHtml(e.date)}" data-i="${i}" data-f="date" placeholder="Tanggal" onchange="updateExp(this)" style="max-width:140px">
      <input type="text" value="${escapeHtml(e.title)}" data-i="${i}" data-f="title" placeholder="Jabatan" onchange="updateExp(this)">
      <input type="text" value="${escapeHtml(e.company)}" data-i="${i}" data-f="company" placeholder="Perusahaan" onchange="updateExp(this)" style="max-width:160px">
      <input type="text" value="${escapeHtml(e.desc)}" data-i="${i}" data-f="desc" placeholder="Deskripsi" onchange="updateExp(this)" style="flex:2">
      <div class="item-actions">
        <button class="btn-delete" onclick="deleteExp(${i})"><i class="fas fa-trash"></i></button>
      </div>
    </div>
  `
    )
    .join("");
}

function updateExp(el) {
  const i = +el.dataset.i;
  const f = el.dataset.f;
  data.experience[i][f] = el.value;
}

function deleteExp(i) {
  if (confirm("Hapus experience ini?")) {
    data.experience.splice(i, 1);
    renderExperience();
    updateStats();
  }
}

// ========== SAVE ALL ==========
async function saveAll() {
  data.displayName = document.getElementById("editDisplayName").value.trim();
  data.jobTitle = document.getElementById("editJobTitle").value.trim();
  data.welcomeLine = document.getElementById("editWelcomeLine").value.trim();
  data.welcomeName = document.getElementById("editWelcomeName").value.trim();
  data.welcomeSub = document.getElementById("editWelcomeSub").value.trim();
  data.heroSubtitle = document.getElementById("editHeroSubtitle").value.trim();
  data.aboutTitle = document.getElementById("editAboutTitle").value.trim();
  data.aboutText = document.getElementById("editAboutText").value.trim();
  data.contactEmail = document.getElementById("editEmail").value.trim();
  data.contactLocation = document.getElementById("editLocation").value.trim();
  data.socialIg = document.getElementById("editSocialIg").value.trim();
  data.socialTt = document.getElementById("editSocialTt").value.trim();
  data.socialGh = document.getElementById("editSocialGh").value.trim();
  data.stats = {
    projects: +document.getElementById("editStatProjects").value || 0,
    years: +document.getElementById("editStatYears").value || 0,
    clients: +document.getElementById("editStatClients").value || 0
  };
  // cloud config from form
  const cu = document.getElementById("editCloudUrl");
  const cp = document.getElementById("editCloudPath");
  if (cu) data.cloudUrl = cu.value.trim();
  if (cp) data.cloudPath = cp.value.trim() || "ramzz";

  saveData();
  updateStats();
  const result = await cloudSave();
  if (result.skip) {
    showToast("Tersimpan. Isi Firebase URL di Settings untuk sync publik.");
  } else if (result.ok) {
    showToast("Berhasil disimpan ke cloud.");
  } else {
    showToast("Gagal sync cloud: " + (result.error || "cek URL / rules Firebase"), "error");
  }
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Expose for inline onclick
window.openProjectModal = openProjectModal;
window.deleteProject = deleteProject;
window.updateSkill = updateSkill;
window.deleteSkill = deleteSkill;
window.updateExp = updateExp;
window.deleteExp = deleteExp;
