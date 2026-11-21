// DeadLineX Frontend — Aesthetic, Modern & Interactive Application Logic

const $ = (selector) => document.querySelector(selector);

// ---------------------------------------------------------------------------
// SVG Icon Helpers (Crisp Vector Icons)
// ---------------------------------------------------------------------------
const ICONS = {
  check: (s = 16) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  tasks: (s = 16) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,
  calendar: (s = 16) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  clock: (s = 14) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  plus: (s = 15) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  sparkles: (s = 16) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></svg>`,
  edit: (s = 14) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  trash: (s = 14) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
  filter: (s = 14) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`,
  arrowRight: (s = 14) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  trending: (s = 16) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
  alert: (s = 16) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  sun: (s = 16) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
  moon: (s = 16) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
  palette: (s = 16) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`,
  search: (s = 16) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`
};

// ---------------------------------------------------------------------------
// Aesthetic Themes Configuration
// ---------------------------------------------------------------------------
const THEMES = [
  { id: "theme-midnight", name: "Midnight Aurora", dark: true, colors: ["#090d16", "#6366f1", "#a855f7"] },
  { id: "theme-cyber", name: "Cyber Dusk", dark: true, colors: ["#07070f", "#ec4899", "#06b6d4"] },
  { id: "theme-sunset", name: "Sunset Glow", dark: true, colors: ["#0f0a0d", "#f97316", "#f43f5e"] },
  { id: "theme-emerald", name: "Emerald Forest", dark: true, colors: ["#060f0d", "#10b981", "#06b6d4"] },
  { id: "theme-luxe", name: "Pastel Luxe", dark: false, colors: ["#f4f6fb", "#4f46e5", "#7c3aed"] },
];

// ---------------------------------------------------------------------------
// State Management
// ---------------------------------------------------------------------------
const state = {
  tasks: [],
  page: "overview",
  query: "",
  sort: "Soonest",
  quickFilter: "all",
  filtersOpen: false,
  filters: {
    priority: "All priorities",
    category: "All types",
    status: "All statuses"
  },
  month: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  selectedDate: dateKey(new Date()),
  deleteId: null,
  localMode: false
};

const categoryNames = ["Assignment", "Exam", "Lab Record", "Project", "Other"];
const safe = (value = "") => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
})[char]);

// ---------------------------------------------------------------------------
// Date & Time Utility Functions
// ---------------------------------------------------------------------------
function dateKey(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function localDate(date) {
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function status(task) {
  if (task.completed) return "Completed";
  return new Date(task.deadline) < new Date() ? "Overdue" : "Pending";
}

function dayDistance(value) {
  const target = new Date(value);
  target.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((target - today) / 86400000);
}

function dueLabel(task) {
  if (task.completed) return "Completed";
  const delta = dayDistance(task.deadline);
  if (delta < 0) return `Overdue by ${Math.abs(delta)}d`;
  if (delta === 0) return "Due Today";
  if (delta === 1) return "Tomorrow";
  if (delta <= 7) return `In ${delta} days`;
  return localDate(task.deadline);
}

function clockLabel(value) {
  return new Date(value).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function whenClass(task) {
  if (task.completed) return "done";
  if (status(task) === "Overdue") return "overdue";
  if (dayDistance(task.deadline) === 0) return "today";
  return "";
}

function initials(name) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join("") || "AM";
}

// ---------------------------------------------------------------------------
// Interactive Celebration Confetti (Canvas Particle Burst)
// ---------------------------------------------------------------------------
function triggerConfetti(originX, originY) {
  const profile = getProfile();
  if (profile.confetti === false) return;
  const canvas = $("#confetti-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const count = 48;
  const particles = [];
  const palette = ["#6366f1", "#8b5cf6", "#ec4899", "#06b6d4", "#10b981", "#f59e0b", "#f43f5e"];
  const startX = originX || window.innerWidth / 2;
  const startY = originY || window.innerHeight / 2;

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 4 + Math.random() * 8;
    particles.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2.5,
      size: 4 + Math.random() * 5,
      color: palette[Math.floor(Math.random() * palette.length)],
      alpha: 1,
      rotation: Math.random() * 360,
      vRotation: (Math.random() - 0.5) * 16,
      gravity: 0.22,
    });
  }

  let animId;
  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let active = false;
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.vRotation;
      p.alpha -= 0.016;

      if (p.alpha > 0) {
        active = true;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.4);
        ctx.restore();
      }
    }

    if (active) {
      animId = requestAnimationFrame(update);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animId);
    }
  }
  update();
}

// ---------------------------------------------------------------------------
// Tactile Audio Synthesis (Web Audio API)
// ---------------------------------------------------------------------------
function playChime(type = "success") {
  const profile = getProfile();
  if (profile.sound === false) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const t = ctx.currentTime;

    if (type === "success") {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(523.25, t); // C5
      osc1.frequency.exponentialRampToValueAtTime(659.25, t + 0.12); // E5

      osc2.type = "sine";
      osc2.frequency.setValueAtTime(659.25, t + 0.12); // E5
      osc2.frequency.exponentialRampToValueAtTime(783.99, t + 0.25); // G5

      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.38);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(t);
      osc1.stop(t + 0.16);
      osc2.start(t + 0.12);
      osc2.stop(t + 0.38);
    } else if (type === "click") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(440, t);
      osc.frequency.exponentialRampToValueAtTime(220, t + 0.05);
      gain.gain.setValueAtTime(0.04, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.05);
    }
  } catch (err) {
    // Gracefully ignore audio errors (e.g. browser autoplay restrictions)
  }
}

// ---------------------------------------------------------------------------
// Profile & Theme Persistence
// ---------------------------------------------------------------------------
function getProfile() {
  const defaults = {
    name: "Alex Morgan",
    themeId: "theme-midnight",
    theme: "Midnight Aurora",
    isDark: true,
    sound: true,
    confetti: true,
    reminders: true,
    weeklyDigest: false
  };
  try {
    const raw = localStorage.getItem("deadlinex-profile");
    if (!raw) return defaults;
    const parsed = JSON.parse(raw);
    // Backward compatibility for old "Light" / "Dark" strings
    if (parsed.theme === "Dark" && !parsed.themeId) {
      parsed.themeId = "theme-midnight";
      parsed.theme = "Midnight Aurora";
      parsed.isDark = true;
    } else if (parsed.theme === "Light" && !parsed.themeId) {
      parsed.themeId = "theme-luxe";
      parsed.theme = "Pastel Luxe";
      parsed.isDark = false;
    }
    return { ...defaults, ...parsed };
  } catch {
    return defaults;
  }
}

function setProfile(updates) {
  const current = getProfile();
  const next = { ...current, ...updates };
  localStorage.setItem("deadlinex-profile", JSON.stringify(next));
  applyTheme(next.themeId);
}

function applyTheme(themeId) {
  const profile = getProfile();
  const theme = THEMES.find((t) => t.id === themeId) || THEMES[0];

  THEMES.forEach((t) => document.body.classList.remove(t.id));
  document.body.classList.add(theme.id);
  document.body.classList.toggle("dark-theme", theme.dark);

  profile.themeId = theme.id;
  profile.theme = theme.name;
  profile.isDark = theme.dark;
  localStorage.setItem("deadlinex-profile", JSON.stringify(profile));

  // Sync theme-color meta tag
  const meta = $('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", theme.dark ? theme.colors[0] : "#f4f6fb");
  }
}

function toggleThemeMode() {
  const profile = getProfile();
  playChime("click");
  if (profile.isDark) {
    applyTheme("theme-luxe");
    toast("Switched to Pastel Luxe light theme");
  } else {
    applyTheme("theme-midnight");
    toast("Switched to Midnight Aurora dark theme");
  }
  render();
}

// ---------------------------------------------------------------------------
// Sample Tasks Generator
// ---------------------------------------------------------------------------
function sampleTasks() {
  const at = (offset, time) => {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    const [h, m] = time.split(":");
    d.setHours(Number(h), Number(m), 0, 0);
    return d.toISOString();
  };
  return [
    {
      id: "sample-1",
      title: "Reading response: The Odyssey",
      description: "A short reflection on books nine and ten for discussion.",
      subject: "Modern Literature",
      category: "Assignment",
      deadline: at(0, "17:00"),
      priority: "Low",
      completed: true,
      completedAt: new Date().toISOString()
    },
    {
      id: "sample-2",
      title: "Organic chemistry lab report",
      description: "Add observations, reaction mechanisms and analysis from week 4 experiment.",
      subject: "Organic Chemistry",
      category: "Lab Record",
      deadline: at(1, "23:00"),
      priority: "High",
      completed: false
    },
    {
      id: "sample-3",
      title: "Statistics problem set 4",
      description: "Complete exercises 1–12 from chapter six and verify confidence intervals.",
      subject: "Statistics",
      category: "Assignment",
      deadline: at(2, "18:00"),
      priority: "Medium",
      completed: false
    },
    {
      id: "sample-4",
      title: "Group presentation slides",
      description: "Share the finalized pitch deck with your project teammates.",
      subject: "Environmental Science",
      category: "Project",
      deadline: at(4, "14:00"),
      priority: "Medium",
      completed: false
    },
    {
      id: "sample-5",
      title: "Midterm exam: Calculus II",
      description: "Review integration techniques, Taylor series, and parametric equations.",
      subject: "Calculus II",
      category: "Exam",
      deadline: at(7, "09:00"),
      priority: "High",
      completed: false
    }
  ];
}

// ---------------------------------------------------------------------------
// Backend API & Local Storage Synchronization
// ---------------------------------------------------------------------------
async function api(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) }
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error || "Could not reach the planner.");
  return body;
}

async function loadTasks() {
  try {
    state.tasks = await api("/api/tasks");
    state.localMode = false;
  } catch (error) {
    state.localMode = true;
    try {
      state.tasks = JSON.parse(localStorage.getItem("deadlinex-tasks")) || sampleTasks();
    } catch {
      state.tasks = sampleTasks();
    }
    localStorage.setItem("deadlinex-tasks", JSON.stringify(state.tasks));
    toast("✨ Demo mode active · Tasks saved safely in your browser");
  }
  applyTheme(getProfile().themeId || "theme-midnight");
  render();
}

async function saveLocal() {
  localStorage.setItem("deadlinex-tasks", JSON.stringify(state.tasks));
}

function updateTaskCount() {
  const pending = state.tasks.filter((t) => !t.completed).length;
  const countEl = $("#nav-count");
  if (countEl) countEl.textContent = pending;
}

function profileUI() {
  const name = getProfile().name || "Alex Morgan";
  const initialsText = initials(name);
  if ($("#sidebar-name")) $("#sidebar-name").textContent = name;
  if ($("#sidebar-initials")) $("#sidebar-initials").textContent = initialsText;
  if ($("#top-avatar")) $("#top-avatar").textContent = initialsText;
}

// ---------------------------------------------------------------------------
// Page Navigation & Render Pipeline
// ---------------------------------------------------------------------------
function render() {
  profileUI();
  updateTaskCount();
  applyTheme(getProfile().themeId || "theme-midnight");

  document.querySelectorAll(".page-view").forEach((view) => {
    view.classList.toggle("hidden", view.id !== `view-${state.page}`);
  });

  const pageNames = {
    overview: "Overview",
    tasks: "My tasks",
    calendar: "Calendar",
    progress: "Progress",
    settings: "Settings"
  };
  const title = pageNames[state.page] || "Overview";
  if ($("#crumb-page")) $("#crumb-page").textContent = title;

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.page === state.page);
  });

  if (state.page === "overview") renderOverview();
  if (state.page === "tasks") renderTasks();
  if (state.page === "calendar") renderCalendar();
  if (state.page === "progress") renderProgress();
  if (state.page === "settings") renderSettings();
}

function go(page) {
  playChime("click");
  state.page = page;
  $("#sidebar").classList.remove("open");
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function heading(kicker, title, description, action = "") {
  return `
    <div class="page-heading">
      <div>
        <div class="eyebrow">${kicker}</div>
        <h1>${title}</h1>
        <p>${description}</p>
      </div>
      ${action}
    </div>`;
}

function addButton(label = "Add task") {
  return `
    <button class="button primary-button" data-action="add">
      ${ICONS.plus(16)}
      <span>${label}</span>
    </button>`;
}

function emptyState(iconName, title, copy, action = true) {
  const iconMarkup = ICONS[iconName] ? ICONS[iconName](26) : ICONS.sparkles(26);
  return `
    <div class="empty-state">
      <span class="empty-icon">${iconMarkup}</span>
      <strong>${title}</strong>
      <p>${copy}</p>
      ${action ? addButton("Create your first task") : ""}
    </div>`;
}

// ---------------------------------------------------------------------------
// Task Item Component (Used in Overview & Day Panels)
// ---------------------------------------------------------------------------
function taskItem(task, compact = false) {
  const isDone = task.completed;
  return `
    <div class="deadline-item ${compact ? "compact" : ""}">
      <button class="round-check ${isDone ? "is-done" : ""}" data-action="toggle" data-id="${safe(task.id)}" aria-label="${isDone ? "Mark incomplete" : "Mark complete"}">
        ${isDone ? ICONS.check(12) : ""}
      </button>
      <div class="deadline-main" data-action="edit" data-id="${safe(task.id)}" role="button" tabindex="0">
        <div class="deadline-title ${isDone ? "struck" : ""}">${safe(task.title)}</div>
        <div class="deadline-sub">
          <span>${safe(task.subject)}</span>
          <span>·</span>
          <span>${safe(task.category)}</span>
        </div>
      </div>
      <i class="priority-dot ${task.priority.toLowerCase()}" title="${safe(task.priority)} priority"></i>
      <span class="deadline-when ${whenClass(task)}">
        ${dueLabel(task)} · ${clockLabel(task.deadline)}
      </span>
    </div>`;
}

// ---------------------------------------------------------------------------
// Interactive SVG Weekly Rhythm Chart
// ---------------------------------------------------------------------------
function weeklyChart() {
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    return {
      date,
      label: date.toLocaleDateString("en-US", { weekday: "short" }),
      count: 0
    };
  });

  state.tasks.filter((task) => task.completedAt).forEach((task) => {
    const key = dateKey(task.completedAt);
    const point = days.find((day) => dateKey(day.date) === key);
    if (point) point.count++;
  });

  const max = Math.max(3, ...days.map((day) => day.count));
  const x = (i) => 36 + i * 44;
  const y = (n) => 140 - (n / max) * 105;
  const points = days.map((day, i) => `${x(i)},${y(day.count)}`).join(" ");

  return `
    <svg viewBox="0 0 330 170" role="img" aria-label="Tasks completed in the last 7 days">
      <defs>
        <linearGradient id="area-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="var(--accent-primary)" stop-opacity="0.35"/>
          <stop offset="100%" stop-color="var(--accent-primary)" stop-opacity="0.0"/>
        </linearGradient>
      </defs>
      <path class="chart-grid" d="M26 35H320 M26 88H320 M26 140H320"/>
      <polygon class="chart-area" points="${x(0)},140 ${points} ${x(6)},140"/>
      <polyline class="chart-line" points="${points}"/>
      ${days
        .map(
          (day, i) => `
          <circle class="chart-point" cx="${x(i)}" cy="${y(day.count)}" r="4" data-day="${day.label}" data-count="${day.count}">
            <title>${day.label}: ${day.count} task${day.count === 1 ? "" : "s"} done</title>
          </circle>
          <text class="chart-label" x="${x(i)}" y="162" text-anchor="middle">${day.label}</text>`
        )
        .join("")}
      <text class="chart-label" x="8" y="38">${max}</text>
      <text class="chart-label" x="12" y="143">0</text>
    </svg>`;
}

// ---------------------------------------------------------------------------
// Screen: Overview View
// ---------------------------------------------------------------------------
function renderOverview() {
  const today = new Date();
  const hour = today.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const name = safe((getProfile().name || "Alex").split(" ")[0]);

  const active = state.tasks.filter((task) => !task.completed);
  const completed = state.tasks.filter((task) => task.completed);
  const overdue = active.filter((task) => status(task) === "Overdue");
  const dueToday = active.filter((task) => dayDistance(task.deadline) === 0);
  const upcoming = active
    .filter((task) => new Date(task.deadline) >= new Date())
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 5);

  const completionRate = state.tasks.length ? Math.round((completed.length / state.tasks.length) * 100) : 0;

  const stats = [
    {
      label: "Active tasks",
      value: active.length,
      note: dueToday.length ? `${dueToday.length} due today` : "All deadlines clear",
      icon: ICONS.tasks(18),
      tone: ""
    },
    {
      label: "Completed",
      value: completed.length,
      note: `${completionRate}% semester pace`,
      icon: ICONS.check(18),
      tone: "green"
    },
    {
      label: "Overdue",
      value: overdue.length,
      note: overdue.length ? "Needs urgent attention" : "You're all caught up",
      icon: ICONS.alert(18),
      tone: "red"
    },
    {
      label: "Due today",
      value: dueToday.length,
      note: dueToday.length ? "Focus on these first" : "Nothing due today",
      icon: ICONS.clock(18),
      tone: "amber"
    }
  ];

  const dateHeading = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric"
  }).toUpperCase();

  $("#view-overview").innerHTML = `
    ${heading(dateHeading, `${greeting}, ${name} ✨`, "Welcome back to your high-focus academic command center.", addButton())}
    
    <div class="stats-grid">
      ${stats
        .map(
          (item) => `
        <article class="stat-card">
          <div class="stat-head">
            <span>${item.label}</span>
            <span class="stat-icon ${item.tone}">${item.icon}</span>
          </div>
          <div class="stat-number">${item.value}</div>
          <div class="stat-note">${item.note}</div>
        </article>`
        )
        .join("")}
    </div>

    <div class="dashboard-columns">
      <section class="panel">
        <div class="panel-head">
          <div>
            <h2>Coming up next</h2>
            <p>Prioritized deadlines to keep you ahead.</p>
          </div>
          <button class="link-button" data-page="tasks">
            <span>View all</span>
            ${ICONS.arrowRight(14)}
          </button>
        </div>
        <div class="deadline-list">
          ${upcoming.length ? upcoming.map((task) => taskItem(task)).join("") : emptyState("check", "Zero upcoming deadlines", "Take a breath! You are completely on top of your coursework.")}
        </div>
      </section>

      <section class="panel">
        <div class="panel-head">
          <div>
            <h2>Weekly rhythm</h2>
            <p>Tasks completed over the past 7 days.</p>
          </div>
          <span class="week-label">7-Day Activity</span>
        </div>
        <div class="chart">${weeklyChart()}</div>
      </section>
    </div>

    <div class="focus-strip">
      <span class="focus-stamp">${ICONS.sparkles(20)}</span>
      <div class="focus-copy">
        <strong>Consistency compounds into mastery.</strong>
        <span>${dueToday.length ? `You have ${dueToday.length} task${dueToday.length === 1 ? "" : "s"} due today. Knock them out one at a time!` : "Pick one meaningful task to get ahead for tomorrow."}</span>
      </div>
      <button data-page="tasks">
        <span>Go to my tasks</span>
      </button>
    </div>`;
}

// ---------------------------------------------------------------------------
// Task Filtering & Search Logic
// ---------------------------------------------------------------------------
function filteredTasks() {
  const query = state.query.trim().toLowerCase();
  let result = state.tasks.filter((task) => {
    const matchesQuery =
      !query ||
      `${task.title} ${task.subject} ${task.category} ${task.description || ""}`.toLowerCase().includes(query);
    const matchesPriority =
      state.filters.priority === "All priorities" || task.priority === state.filters.priority;
    const matchesCategory =
      state.filters.category === "All types" || task.category === state.filters.category;
    const matchesStatus =
      state.filters.status === "All statuses" || status(task) === state.filters.status;
    return matchesQuery && matchesPriority && matchesCategory && matchesStatus;
  });

  // Apply interactive quick pill filter
  if (state.quickFilter === "pending") {
    result = result.filter((t) => !t.completed);
  } else if (state.quickFilter === "due-soon") {
    result = result.filter((t) => !t.completed && dayDistance(t.deadline) <= 1);
  } else if (state.quickFilter === "high") {
    result = result.filter((t) => t.priority === "High");
  } else if (state.quickFilter === "completed") {
    result = result.filter((t) => t.completed);
  }

  // Sort
  if (state.sort === "Latest") {
    return result.sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
  }
  if (state.sort === "Priority") {
    return result.sort(
      (a, b) => ["High", "Medium", "Low"].indexOf(a.priority) - ["High", "Medium", "Low"].indexOf(b.priority)
    );
  }
  return result.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
}

// ---------------------------------------------------------------------------
// Screen: Tasks View
// ---------------------------------------------------------------------------
function renderTasks() {
  const tasks = filteredTasks();
  const filtersActive =
    state.filters.priority !== "All priorities" ||
    state.filters.category !== "All types" ||
    state.filters.status !== "All statuses";

  const categoryOptions = categoryNames
    .map((name) => `<option ${state.filters.category === name ? "selected" : ""}>${name}</option>`)
    .join("");

  const quickPills = [
    { id: "all", label: "All tasks" },
    { id: "pending", label: "Pending" },
    { id: "due-soon", label: "Due Soon" },
    { id: "high", label: "High Priority" },
    { id: "completed", label: "Completed" }
  ];

  $("#view-tasks").innerHTML = `
    ${heading("COURSEWORK PLANNER", "My tasks", "Organize, track, and complete your academic workload with ease.", addButton())}
    
    <section class="panel task-list-panel">
      <!-- Interactive Quick Filter Pills -->
      <div class="quick-pills-wrap">
        ${quickPills
          .map(
            (p) => `
          <button class="quick-pill ${state.quickFilter === p.id ? "active" : ""}" data-quick="${p.id}">
            ${p.label}
          </button>`
          )
          .join("")}
      </div>

      <div class="toolbar">
        <div class="list-label">
          <span>Showing</span>
          <span class="count-badge">${tasks.length} task${tasks.length === 1 ? "" : "s"}</span>
        </div>
        <div class="toolbar-right">
          <button class="button quiet-button filter-button" data-action="toggle-filters">
            ${ICONS.filter(14)}
            <span class="filter-word">Filter options</span>
          </button>
          <select class="control" id="task-sort" aria-label="Sort tasks">
            <option value="Soonest">Sort: Soonest first</option>
            <option value="Latest">Sort: Latest first</option>
            <option value="Priority">Sort: Highest priority</option>
          </select>
        </div>
      </div>

      <div class="filter-bar ${state.filtersOpen ? "" : "hidden"}">
        <select class="control" data-filter="priority">
          <option>All priorities</option>
          ${["High", "Medium", "Low"]
            .map((x) => `<option ${state.filters.priority === x ? "selected" : ""}>${x}</option>`)
            .join("")}
        </select>
        <select class="control" data-filter="category">
          <option>All types</option>
          ${categoryOptions}
        </select>
        <select class="control" data-filter="status">
          <option>All statuses</option>
          ${["Pending", "Completed", "Overdue"]
            .map((x) => `<option ${state.filters.status === x ? "selected" : ""}>${x}</option>`)
            .join("")}
        </select>
        <button class="reset-filters" data-action="clear-filters">Reset filters</button>
      </div>

      ${
        tasks.length
          ? `
        <div class="task-head">
          <span>TASK</span>
          <span>PRIORITY</span>
          <span>DUE DATE</span>
          <span>STATUS</span>
          <span></span>
        </div>
        <div>
          ${tasks
            .map(
              (task) => `
            <div class="task-row">
              <button class="round-check ${task.completed ? "is-done" : ""}" data-action="toggle" data-id="${safe(task.id)}" aria-label="Toggle complete">
                ${task.completed ? ICONS.check(12) : ""}
              </button>
              <button class="task-title-button" data-action="edit" data-id="${safe(task.id)}">
                <strong class="${task.completed ? "struck" : ""}">${safe(task.title)}</strong>
                <span>${safe(task.subject)} <i>·</i> ${safe(task.category)}</span>
              </button>
              <span class="priority-cell">
                <i class="priority-dot ${task.priority.toLowerCase()}"></i>
                ${safe(task.priority)}
              </span>
              <span class="date-cell ${whenClass(task)}">
                ${dueLabel(task)}
                <small>${clockLabel(task.deadline)}</small>
              </span>
              <span class="status ${status(task).toLowerCase()}">${status(task)}</span>
              <button class="row-delete" data-action="delete" data-id="${safe(task.id)}" aria-label="Delete task" title="Delete task">
                ${ICONS.trash(15)}
              </button>
            </div>`
            )
            .join("")}
        </div>
        <div class="table-foot">
          Showing ${tasks.length} task${tasks.length === 1 ? "" : "s"} · Auto-synced in real-time
        </div>`
          : emptyState(
              state.query || filtersActive || state.quickFilter !== "all" ? "search" : "tasks",
              state.query || filtersActive || state.quickFilter !== "all" ? "No matching tasks found" : "No coursework on record",
              state.query || filtersActive || state.quickFilter !== "all"
                ? "Try adjusting your search terms or relaxing the filters."
                : "Add your upcoming assignments, exams, or projects to stay effortlessly organized.",
              !(state.query || filtersActive || state.quickFilter !== "all")
            )
      }
    </section>`;

  const sortEl = $("#task-sort");
  if (sortEl) sortEl.value = state.sort || "Soonest";
}

// ---------------------------------------------------------------------------
// Screen: Calendar View
// ---------------------------------------------------------------------------
function renderCalendar() {
  const year = state.month.getFullYear();
  const month = state.month.getMonth();
  const firstDay = new Date(year, month, 1);
  const mondayOffset = (firstDay.getDay() + 6) % 7;
  const dates = Array.from(
    { length: 42 },
    (_, index) => new Date(year, month, index - mondayOffset + 1)
  );

  const selectedTasks = state.tasks
    .filter((task) => dateKey(task.deadline) === state.selectedDate)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  const monthLabel = state.month.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const selectedFormatted = new Date(`${state.selectedDate}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric"
  });

  $("#view-calendar").innerHTML = `
    ${heading("SCHEDULE & DEADLINES", "Calendar", "Visual roadmap of all coursework and milestones.", addButton())}
    
    <div class="calendar-layout">
      <section class="panel calendar-panel">
        <div class="month-toolbar">
          <div>
            <h2>${monthLabel}</h2>
            <span>Click any day to inspect its deadlines</span>
          </div>
          <div class="month-actions">
            <button class="today-button" data-action="today">Today</button>
            <button data-action="month-prev" aria-label="Previous month">‹</button>
            <button data-action="month-next" aria-label="Next month">›</button>
          </div>
        </div>

        <div class="calendar-grid">
          ${["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
            .map((day) => `<div class="weekday">${day}</div>`)
            .join("")}
          ${dates
            .map((date) => {
              const key = dateKey(date);
              const inMonth = date.getMonth() === month;
              const tasks = state.tasks.filter((task) => dateKey(task.deadline) === key);
              const isToday = key === dateKey(new Date());
              const isSelected = key === state.selectedDate;

              return `
                <button class="calendar-day ${inMonth ? "" : "outside"} ${isToday ? "today" : ""} ${isSelected ? "selected" : ""}" data-action="select-date" data-date="${key}">
                  <span class="day-number">${date.getDate()}</span>
                  ${tasks
                    .slice(0, 2)
                    .map(
                      (task) => `
                    <span class="calendar-chip ${task.priority.toLowerCase()}">${safe(task.title)}</span>`
                    )
                    .join("")}
                  ${tasks.length > 2 ? `<small>+${tasks.length - 2} more</small>` : ""}
                </button>`;
            })
            .join("")}
        </div>

        <div class="calendar-legend">
          <span><i class="priority-dot high"></i> High Priority</span>
          <span><i class="priority-dot medium"></i> Medium</span>
          <span><i class="priority-dot low"></i> Low</span>
        </div>
      </section>

      <section class="panel day-panel">
        <div class="eyebrow">SELECTED DATE</div>
        <h3>${selectedFormatted}</h3>
        ${
          selectedTasks.length
            ? `
          <div class="day-task-list">
            ${selectedTasks
              .map(
                (task) => `
              <div class="day-item">
                <i class="day-color ${task.completed ? "done" : status(task) === "Overdue" ? "overdue" : ""}"></i>
                <div class="day-item-content">
                  <strong>${safe(task.title)}</strong>
                  <span>${safe(task.subject)} · ${clockLabel(task.deadline)}</span>
                  <small>${safe(task.priority)} priority · ${status(task)}</small>
                </div>
                <button data-action="toggle" data-id="${safe(task.id)}" aria-label="Toggle completion">
                  ${task.completed ? ICONS.check(14) : "○"}
                </button>
              </div>`
              )
              .join("")}
          </div>`
            : emptyState("calendar", "Quiet Day Ahead", "No deadlines scheduled for this date.", false)
        }
        <button class="button quiet-button" style="width: 100%; margin-top: 14px;" data-action="add-for-date" data-date="${state.selectedDate}">
          ${ICONS.plus(14)}
          <span>Add task for this date</span>
        </button>
      </section>
    </div>`;
}

// ---------------------------------------------------------------------------
// Screen: Progress View
// ---------------------------------------------------------------------------
function renderProgress() {
  const total = state.tasks.length;
  const done = state.tasks.filter((task) => task.completed).length;
  const overdue = state.tasks.filter((task) => status(task) === "Overdue").length;
  const active = total - done;
  const completion = total ? Math.round((done / total) * 100) : 0;

  const categoryColors = ["#6366f1", "#a855f7", "#10b981", "#f59e0b", "#06b6d4"];
  const categories = categoryNames
    .map((name, index) => ({
      name,
      count: state.tasks.filter((task) => task.category === name).length,
      color: categoryColors[index % categoryColors.length]
    }))
    .filter((item) => item.count);

  const subjects = Object.entries(
    state.tasks.reduce((all, task) => {
      all[task.subject] = (all[task.subject] || 0) + 1;
      return all;
    }, {})
  ).sort((a, b) => b[1] - a[1]);

  $("#view-progress").innerHTML = `
    ${heading("SEMESTER ANALYTICS", "Progress", "Comprehensive metrics and trends across all your courses.")}
    
    <div class="analytics-top">
      <section class="panel metric-panel">
        <div class="metric-head">
          <span class="stat-icon green">${ICONS.trending(18)}</span>
          <div>
            <strong>Completion Velocity</strong>
            <small>Overall percentage completed</small>
          </div>
        </div>
        <div class="metric-big">${completion}<small>%</small></div>
        <div class="track"><i style="width: ${completion}%"></i></div>
        <div class="metric-foot">
          <span>${done} finished</span>
          <span>${active} remaining</span>
        </div>
      </section>

      <section class="panel metric-panel">
        <div class="metric-head">
          <span class="stat-icon">${ICONS.tasks(18)}</span>
          <div>
            <strong>Workload Distribution</strong>
            <small>Active vs overdue breakdowns</small>
          </div>
        </div>
        <div class="breakdown-numbers">
          <div><strong>${done}</strong><span>Done</span></div>
          <div><strong>${active}</strong><span>Pending</span></div>
          <div><strong style="color: var(--priority-high)">${overdue}</strong><span>Overdue</span></div>
        </div>
        <div class="track"><i style="width: ${completion}%; background: var(--status-done)"></i></div>
      </section>
    </div>

    <div class="analytics-bottom">
      <section class="panel analytics-chart-panel">
        <div class="panel-head">
          <div>
            <h2>Weekly Rhythm</h2>
            <p>Tasks completed in the past seven days.</p>
          </div>
        </div>
        <div class="chart">${weeklyChart()}</div>
      </section>

      <section class="panel analytics-chart-panel">
        <div class="panel-head">
          <div>
            <h2>By Task Category</h2>
            <p>Spread across homework, exams, and projects.</p>
          </div>
        </div>
        ${
          categories.length
            ? `
          <div class="category-list">
            ${categories
              .map(
                (item) => `
              <div class="category-line">
                <i style="background: ${item.color}; color: ${item.color}"></i>
                <span>${safe(item.name)}</span>
                <b>${item.count}</b>
              </div>`
              )
              .join("")}
          </div>`
            : emptyState("sparkles", "No task categories", "Add tasks to see category distribution.", false)
        }
      </section>
    </div>

    <section class="panel subject-panel">
      <div class="panel-head">
        <div>
          <h2>Workload by Subject</h2>
          <p>Task density per enrolled course.</p>
        </div>
      </div>
      ${
        subjects.length
          ? `
        <div>
          ${subjects
            .map(
              ([subject, count], index) => `
            <div class="subject-row">
              <div>
                <i class="priority-dot ${["high", "medium", "low"][index % 3]}"></i>
                <strong>${safe(subject)}</strong>
                <span>${count} task${count === 1 ? "" : "s"}</span>
              </div>
              <div class="progress-line">
                <i style="width: ${Math.round((count / total) * 100)}%"></i>
              </div>
            </div>`
            )
            .join("")}
        </div>`
          : emptyState("sparkles", "No courses yet", "Add course names on your tasks to unlock subject analytics.", false)
      }
    </section>`;
}

// ---------------------------------------------------------------------------
// Screen: Settings & Theme Customization View
// ---------------------------------------------------------------------------
function renderSettings() {
  const profile = getProfile();

  $("#view-settings").innerHTML = `
    ${heading("PREFERENCES & THEME", "Settings", "Customize visual aesthetics, sound, and personal profile.")}
    
    <div class="settings-layout">
      <div class="settings-main">
        <!-- Visual Theme Selector -->
        <section class="panel settings-section">
          <div class="settings-heading">
            <span class="settings-icon">${ICONS.palette(18)}</span>
            <div>
              <h2>Visual Aesthetic & Themes</h2>
              <p>Choose an attractive, modern color palette tailored for your focus.</p>
            </div>
          </div>
          <div class="theme-picker-grid">
            ${THEMES.map(
              (theme) => `
              <div class="theme-card ${profile.themeId === theme.id ? "active" : ""}" data-action="pick-theme" data-theme="${theme.id}">
                <div class="theme-preview-swatch">
                  <span style="flex: 1; background: ${theme.colors[0]}"></span>
                  <span style="flex: 1; background: ${theme.colors[1]}"></span>
                  <span style="flex: 1; background: ${theme.colors[2]}"></span>
                </div>
                <span>${theme.name}</span>
              </div>`
            ).join("")}
          </div>
          <div class="settings-choice">
            <div>
              <strong>Quick Dark / Light Toggle</strong>
              <small>Switch between dark night mode and frosted daylight mode.</small>
            </div>
            <button class="switch ${profile.isDark ? "on" : ""}" role="switch" aria-checked="${profile.isDark}" data-action="toggle-mode">
              <i></i>
            </button>
          </div>
        </section>

        <!-- Student Profile -->
        <section class="panel settings-section">
          <div class="settings-heading">
            <span class="settings-icon">${ICONS.tasks(18)}</span>
            <div>
              <h2>Student Profile</h2>
              <p>Your display name across workspace greetings and exports.</p>
            </div>
          </div>
          <form id="profile-form" class="profile-form">
            <label>
              Your Name
              <input id="profile-name" maxlength="60" value="${safe(profile.name || "Alex Morgan")}" required autocomplete="name">
            </label>
            <label>
              Email Address <span class="optional">Optional</span>
              <input id="profile-email" type="email" value="${safe(profile.email || "")}" placeholder="student@college.edu" autocomplete="email">
            </label>
            <button class="button primary-button" type="submit">Save Profile</button>
          </form>
        </section>

        <!-- Interactive Audio & Celebrations -->
        <section class="panel settings-section">
          <div class="settings-heading">
            <span class="settings-icon">${ICONS.sparkles(18)}</span>
            <div>
              <h2>Interactive Feedback</h2>
              <p>Delightful tactile audio and visual celebrations on completions.</p>
            </div>
          </div>
          <div class="settings-choice">
            <div>
              <strong>Tactile Sound Effects</strong>
              <small>Pleasant synthesized audio chime when ticking off completed tasks.</small>
            </div>
            <button class="switch ${profile.sound !== false ? "on" : ""}" role="switch" aria-checked="${profile.sound !== false}" data-action="sound">
              <i></i>
            </button>
          </div>
          <div class="settings-choice">
            <div>
              <strong>Celebration Confetti</strong>
              <small>Burst of colorful particles whenever a deadline is conquered.</small>
            </div>
            <button class="switch ${profile.confetti !== false ? "on" : ""}" role="switch" aria-checked="${profile.confetti !== false}" data-action="confetti">
              <i></i>
            </button>
          </div>
          <div class="settings-choice">
            <div>
              <strong>Deadline Reminders</strong>
              <small>Visual highlights when deadlines fall due in under 24 hours.</small>
            </div>
            <button class="switch ${profile.reminders ? "on" : ""}" role="switch" aria-checked="${!!profile.reminders}" data-action="reminders">
              <i></i>
            </button>
          </div>
          <div class="settings-choice">
            <div>
              <strong>Weekly Check-in</strong>
              <small>Monday overview recap to kickstart your academic week.</small>
            </div>
            <button class="switch ${profile.weeklyDigest ? "on" : ""}" role="switch" aria-checked="${!!profile.weeklyDigest}" data-action="digest">
              <i></i>
            </button>
          </div>
        </section>

        <!-- Data & Backup -->
        <section class="panel settings-section">
          <div class="settings-heading">
            <span class="settings-icon">${ICONS.calendar(18)}</span>
            <div>
              <h2>Data Management</h2>
              <p>Export your full coursework ledger or import from another backup.</p>
            </div>
          </div>
          <div class="data-buttons">
            <button class="button quiet-button" data-action="export">↓ Export JSON Backup</button>
            <label class="button quiet-button import-button">
              ↑ Import JSON Backup
              <input type="file" id="import-file" accept=".json,application/json" hidden>
            </label>
            <span>${state.tasks.length} task${state.tasks.length === 1 ? "" : "s"} saved</span>
          </div>
          <p class="settings-footnote">
            ${
              state.localMode
                ? "Demo mode active · Tasks are securely persisted in your local browser storage."
                : "Connected to Firebase Firestore · Tasks synchronize directly with cloud database."
            }
          </p>
        </section>
      </div>

      <aside class="settings-aside">
        <span class="aside-star">✨</span>
        <h3>Aesthetic by design.<br>Interactive by nature.</h3>
        <p>DeadLineX is engineered to make college task management rewarding, visually peaceful, and delightfully interactive.</p>
        <div class="aside-rule"></div>
        <span>✓ &nbsp; Keyboard shortcuts: ⌘K to search</span>
        <span>✓ &nbsp; Ambient glowing theme engine</span>
        <span>✓ &nbsp; Instant celebration feedback</span>
      </aside>
    </div>`;

  $("#profile-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const newName = $("#profile-name").value.trim();
    if (newName) {
      setProfile({
        name: newName,
        email: $("#profile-email").value.trim()
      });
      profileUI();
      render();
      playChime("success");
      toast("Profile updated successfully");
    }
  });

  const importInput = $("#import-file");
  if (importInput) importInput.addEventListener("change", importBackup);
}

// ---------------------------------------------------------------------------
// Backup & Export / Import
// ---------------------------------------------------------------------------
function exportBackup() {
  const data = {
    app: "DeadLineX",
    version: "2.0",
    exportedAt: new Date().toISOString(),
    tasks: state.tasks
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `deadlinex-backup-${dateKey(new Date())}.json`;
  link.click();
  URL.revokeObjectURL(url);
  playChime("success");
  toast("✨ Backup exported successfully");
}

async function importBackup(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    const backup = JSON.parse(await file.text());
    if (!Array.isArray(backup.tasks)) {
      throw new Error("Invalid backup: file does not contain a tasks array.");
    }
    const clean = backup.tasks.map((task) => ({
      title: String(task.title || "").trim(),
      description: String(task.description || ""),
      subject: String(task.subject || "").trim(),
      deadline: new Date(task.deadline).toISOString(),
      category: categoryNames.includes(task.category) ? task.category : "Other",
      priority: ["Low", "Medium", "High"].includes(task.priority) ? task.priority : "Medium",
      completed: Boolean(task.completed),
      ...(task.completedAt ? { completedAt: task.completedAt } : {})
    }));

    if (clean.some((t) => !t.title || !t.subject)) {
      throw new Error("Each imported task must have a title and subject.");
    }

    if (state.localMode) {
      state.tasks = clean.map((t) => ({ ...t, id: crypto.randomUUID() })).concat(state.tasks);
      await saveLocal();
    } else {
      const imported = [];
      for (const t of clean) {
        imported.push(await api("/api/tasks", { method: "POST", body: JSON.stringify(t) }));
      }
      state.tasks = imported.concat(state.tasks);
    }
    playChime("success");
    toast(`✨ Successfully imported ${clean.length} task${clean.length === 1 ? "" : "s"}`);
    render();
  } catch (err) {
    toast(`Error: ${err.message || "Could not read that backup file"}`);
  }
  event.target.value = "";
}

// ---------------------------------------------------------------------------
// Task Dialog (Modal for Add / Edit)
// ---------------------------------------------------------------------------
function openTask(task = null, defaultDate = null) {
  $("#task-form").reset();
  $("#form-message").textContent = "";
  $("#task-id").value = task?.id || "";
  $("#dialog-title").textContent = task ? "Edit task details" : "Create a new task";
  $("#save-task").querySelector("span").textContent = task ? "Save changes" : "Create task";

  if (task) {
    $("#task-title").value = task.title;
    $("#task-description").value = task.description || "";
    $("#task-subject").value = task.subject;
    $("#task-category").value = task.category;
    $("#task-priority").value = task.priority;
    const d = new Date(task.deadline);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    $("#task-deadline").value = d.toISOString().slice(0, 16);
  } else {
    const d = defaultDate ? new Date(`${defaultDate}T23:59:00`) : new Date();
    if (!defaultDate) {
      d.setHours(d.getHours() + 4);
    }
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    $("#task-deadline").value = d.toISOString().slice(0, 16);
  }

  $("#task-dialog").showModal();
  $("#task-title").focus();
}

function formTask() {
  const d = new Date($("#task-deadline").value);
  return {
    title: $("#task-title").value.trim(),
    description: $("#task-description").value.trim(),
    subject: $("#task-subject").value.trim(),
    category: $("#task-category").value,
    priority: $("#task-priority").value,
    deadline: d.toISOString(),
    completed: false
  };
}

async function submitTask(event) {
  event.preventDefault();
  const form = $("#task-form");
  if (!form.reportValidity()) return;

  const id = $("#task-id").value;
  const old = state.tasks.find((t) => t.id === id);
  const data = {
    ...formTask(),
    completed: old?.completed || false,
    ...(old?.completedAt ? { completedAt: old.completedAt } : {})
  };

  try {
    if (state.localMode) {
      if (id) {
        state.tasks = state.tasks.map((t) => (t.id === id ? { ...t, ...data } : t));
      } else {
        state.tasks.unshift({ ...data, id: crypto.randomUUID() });
      }
      await saveLocal();
    } else {
      const saved = await api(id ? `/api/tasks/${id}` : "/api/tasks", {
        method: id ? "PUT" : "POST",
        body: JSON.stringify(data)
      });
      if (id) {
        state.tasks = state.tasks.map((t) => (t.id === id ? saved : t));
      } else {
        state.tasks.unshift(saved);
      }
    }
    $("#task-dialog").close();
    playChime("success");
    toast(id ? "Task changes saved ✨" : "New task created ✨");
    render();
  } catch (error) {
    $("#form-message").textContent = error.message;
  }
}

async function toggleTask(id, event) {
  const current = state.tasks.find((t) => t.id === id);
  if (!current) return;

  const willBeDone = !current.completed;
  const updated = {
    ...current,
    completed: willBeDone,
    completedAt: willBeDone ? new Date().toISOString() : null
  };

  if (willBeDone) {
    playChime("success");
    if (event) {
      const rect = event.target.getBoundingClientRect();
      triggerConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
    } else {
      triggerConfetti();
    }
  } else {
    playChime("click");
  }

  try {
    if (!state.localMode) {
      await api(`/api/tasks/${id}`, { method: "PUT", body: JSON.stringify(updated) });
    }
    state.tasks = state.tasks.map((t) => (t.id === id ? updated : t));
    if (state.localMode) await saveLocal();
    render();
    toast(willBeDone ? "🎉 Task completed! Awesome job!" : "Task restored to active list");
  } catch (error) {
    toast(error.message);
  }
}

function askDelete(id) {
  const task = state.tasks.find((item) => item.id === id);
  if (!task) return;
  state.deleteId = id;
  $("#confirm-copy").textContent = `“${task.title}” will be permanently removed from your schedule.`;
  $("#confirm-dialog").showModal();
}

async function deleteTask() {
  const id = state.deleteId;
  if (!id) return;
  try {
    if (!state.localMode) {
      await api(`/api/tasks/${id}`, { method: "DELETE" });
    }
    state.tasks = state.tasks.filter((t) => t.id !== id);
    if (state.localMode) await saveLocal();
    $("#confirm-dialog").close();
    state.deleteId = null;
    playChime("click");
    toast("Task deleted");
    render();
  } catch (error) {
    toast(error.message);
  }
}

let toastTimer;
function toast(message) {
  const el = $("#toast");
  const textEl = el.querySelector(".toast-text");
  if (textEl) textEl.textContent = message;
  el.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("visible"), 3200);
}

// ---------------------------------------------------------------------------
// Global Event Listeners & Interaction Dispatch
// ---------------------------------------------------------------------------
document.addEventListener("click", (event) => {
  // Navigation
  const nav = event.target.closest("[data-page]");
  if (nav) {
    go(nav.dataset.page);
    return;
  }

  // Quick Filter Pills
  const quickPill = event.target.closest("[data-quick]");
  if (quickPill) {
    playChime("click");
    state.quickFilter = quickPill.dataset.quick;
    renderTasks();
    return;
  }

  // Theme Picker Cards
  const themeCard = event.target.closest('[data-action="pick-theme"]');
  if (themeCard) {
    const themeId = themeCard.dataset.theme;
    playChime("click");
    applyTheme(themeId);
    renderSettings();
    toast(`Switched theme to ${getProfile().theme}`);
    return;
  }

  // Add Task Button
  const add = event.target.closest('[data-action="add"]');
  if (add) {
    openTask();
    return;
  }

  const addForDate = event.target.closest('[data-action="add-for-date"]');
  if (addForDate) {
    openTask(null, addForDate.dataset.date);
    return;
  }

  // Action Dispatch
  const actionTarget = event.target.closest("[data-action]");
  if (!actionTarget) return;

  const { action, id, date } = actionTarget.dataset;

  if (action === "toggle") toggleTask(id, event);
  if (action === "edit") openTask(state.tasks.find((t) => t.id === id));
  if (action === "delete") askDelete(id);
  if (action === "toggle-filters") {
    state.filtersOpen = !state.filtersOpen;
    renderTasks();
  }
  if (action === "clear-filters") {
    state.filters = { priority: "All priorities", category: "All types", status: "All statuses" };
    state.quickFilter = "all";
    renderTasks();
  }
  if (action === "month-prev") {
    state.month = new Date(state.month.getFullYear(), state.month.getMonth() - 1, 1);
    renderCalendar();
  }
  if (action === "month-next") {
    state.month = new Date(state.month.getFullYear(), state.month.getMonth() + 1, 1);
    renderCalendar();
  }
  if (action === "today") {
    state.month = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    state.selectedDate = dateKey(new Date());
    renderCalendar();
  }
  if (action === "select-date") {
    state.selectedDate = date;
    renderCalendar();
  }
  if (action === "toggle-mode") {
    toggleThemeMode();
  }
  if (["sound", "confetti", "reminders", "digest"].includes(action)) {
    const key =
      action === "sound"
        ? "sound"
        : action === "confetti"
        ? "confetti"
        : action === "reminders"
        ? "reminders"
        : "weeklyDigest";
    const profile = getProfile();
    const nextVal = !profile[key];
    setProfile({ [key]: nextVal });
    playChime("click");
    renderSettings();
  }
  if (action === "export") exportBackup();
});

// Filter & Sort Change Events
document.addEventListener("change", (event) => {
  if (event.target.dataset.filter) {
    state.filters[event.target.dataset.filter] = event.target.value;
    renderTasks();
  }
  if (event.target.id === "task-sort") {
    state.sort = event.target.value;
    renderTasks();
  }
});

// Dialog & Controls Wiring
$("#task-form").addEventListener("submit", submitTask);
$("#close-dialog").addEventListener("click", () => $("#task-dialog").close());
$("#cancel-dialog").addEventListener("click", () => $("#task-dialog").close());
$("#keep-task").addEventListener("click", () => $("#confirm-dialog").close());
$("#confirm-delete").addEventListener("click", deleteTask);

$("#mobile-menu").addEventListener("click", () => {
  $("#sidebar").classList.toggle("open");
});

$("#open-settings").addEventListener("click", () => go("settings"));
$("#top-avatar").addEventListener("click", () => go("settings"));
$("#theme-toggle-btn").addEventListener("click", toggleThemeMode);

$(".brand").addEventListener("click", (event) => {
  event.preventDefault();
  go("overview");
});

// Search bar input
const searchInput = $("#global-search");
if (searchInput) {
  searchInput.addEventListener("input", (event) => {
    state.query = event.target.value;
    if (state.query && state.page !== "tasks") {
      state.page = "tasks";
    }
    render();
  });
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.target.value = "";
      state.query = "";
      render();
    }
  });
}

// Keyboard shortcuts (⌘K or Ctrl+K for search, Esc to close menus)
document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    const search = $("#global-search");
    if (search) search.focus();
  }
  if (event.key === "Escape") {
    $("#sidebar").classList.remove("open");
  }
});

// Boot the application
loadTasks();
