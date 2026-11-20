// DeadlineX frontend: rendering, filtering, and small UI interactions live here.
const $ = (selector) => document.querySelector(selector);
const state = { tasks: [], page: "overview", query: "", sort: "Soonest", filters: { priority: "All priorities", category: "All types", status: "All statuses" }, month: new Date(new Date().getFullYear(), new Date().getMonth(), 1), selectedDate: dateKey(new Date()), deleteId: null, localMode: false };
const categoryNames = ["Assignment", "Exam", "Lab Record", "Project", "Other"];
const safe = (value = "") => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);

function dateKey(date) { const d = new Date(date); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; }
function localDate(date) { return date.toLocaleDateString("en-US", { month: "short", day: "numeric" }); }
function status(task) { if (task.completed) return "Completed"; return new Date(task.deadline) < new Date() ? "Overdue" : "Pending"; }
function dayDistance(value) { const target = new Date(value); target.setHours(0, 0, 0, 0); const today = new Date(); today.setHours(0, 0, 0, 0); return Math.round((target - today) / 86400000); }
function dueLabel(task) { if (task.completed) return "Done"; const delta = dayDistance(task.deadline); if (delta < 0) return "Overdue"; if (delta === 0) return "Due today"; if (delta === 1) return "Tomorrow"; return localDate(task.deadline); }
function clockLabel(value) { return new Date(value).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }); }
function whenClass(task) { if (task.completed) return "done"; if (status(task) === "Overdue") return "overdue"; if (dayDistance(task.deadline) === 0) return "today"; return ""; }
function initials(name) { return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0].toUpperCase()).join("") || "AM"; }
function getProfile() { try { return JSON.parse(localStorage.getItem("deadlinex-profile")) || { name: "Alex Morgan", theme: "Light", reminders: true, weeklyDigest: false }; } catch { return { name: "Alex Morgan", theme: "Light", reminders: true, weeklyDigest: false }; } }
function setProfileName(name) { const profile = getProfile(); localStorage.setItem("deadlinex-profile", JSON.stringify({ ...profile, name })); }
function sampleTasks() {
  const at = (offset, time) => { const d = new Date(); d.setDate(d.getDate() + offset); const [h, m] = time.split(":"); d.setHours(Number(h), Number(m), 0, 0); return d.toISOString(); };
  return [
    { id: "sample-1", title: "Reading response: The Odyssey", description: "A short reflection on books nine and ten.", subject: "Modern Literature", category: "Assignment", deadline: at(0, "17:00"), priority: "Low", completed: true, completedAt: new Date().toISOString() },
    { id: "sample-2", title: "Organic chemistry lab report", description: "Add the observations and analysis from this week’s experiment.", subject: "Organic Chemistry", category: "Lab Record", deadline: at(1, "23:00"), priority: "High", completed: false },
    { id: "sample-3", title: "Statistics problem set 4", description: "Exercises 1–12 from chapter six.", subject: "Statistics", category: "Assignment", deadline: at(2, "18:00"), priority: "Medium", completed: false },
    { id: "sample-4", title: "Group presentation slides", description: "Share the final deck with your project group.", subject: "Environmental Science", category: "Project", deadline: at(4, "14:00"), priority: "Medium", completed: false },
    { id: "sample-5", title: "Midterm exam: Calculus II", description: "Review integration techniques and series.", subject: "Calculus II", category: "Exam", deadline: at(7, "09:00"), priority: "High", completed: false },
  ];
}

async function api(path, options = {}) {
  const response = await fetch(path, { ...options, headers: { "Content-Type": "application/json", ...(options.headers || {}) } });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error || "Could not reach the planner.");
  return body;
}
async function loadTasks() {
  try {
    state.tasks = await api("/api/tasks");
    state.localMode = false;
  } catch (error) {
    // Local mode keeps the sample usable until a Firebase service account is connected.
    state.localMode = true;
    try { state.tasks = JSON.parse(localStorage.getItem("deadlinex-tasks")) || sampleTasks(); }
    catch { state.tasks = sampleTasks(); }
    localStorage.setItem("deadlinex-tasks", JSON.stringify(state.tasks));
    toast("Demo mode · Connect Firebase to save tasks to your database");
  }
  render();
}
async function saveLocal() { localStorage.setItem("deadlinex-tasks", JSON.stringify(state.tasks)); }
function updateTaskCount() { $("#nav-count").textContent = state.tasks.filter((task) => !task.completed).length; }
function profileUI() { const name = getProfile().name || "Alex Morgan"; $("#sidebar-name").textContent = name; $("#sidebar-initials").textContent = initials(name); $("#top-avatar").textContent = initials(name); }
function render() {
  profileUI(); updateTaskCount(); document.body.classList.toggle("dark-theme", getProfile().theme === "Dark");
  document.querySelectorAll(".page-view").forEach((view) => view.classList.toggle("hidden", view.id !== `view-${state.page}`));
  const pageName = { overview: "Overview", tasks: "My tasks", calendar: "Calendar", progress: "Progress", settings: "Settings" }[state.page];
  $("#crumb-page").textContent = pageName;
  document.querySelectorAll(".nav-link").forEach((link) => link.classList.toggle("active", link.dataset.page === state.page));
  if (state.page === "overview") renderOverview();
  if (state.page === "tasks") renderTasks();
  if (state.page === "calendar") renderCalendar();
  if (state.page === "progress") renderProgress();
  if (state.page === "settings") renderSettings();
}
function go(page) { state.page = page; $("#sidebar").classList.remove("open"); render(); window.scrollTo({ top: 0, behavior: "smooth" }); }
function heading(kicker, title, description, action = "") { return `<div class="page-heading"><div><div class="eyebrow">${kicker}</div><h1>${title}</h1><p>${description}</p></div>${action}</div>`; }
function addButton(label = "Add a task") { return `<button class="button primary-button" data-action="add"><span>＋</span>${label}</button>`; }
function emptyState(icon, title, copy, action = true) { return `<div class="empty-state"><span class="empty-icon">${icon}</span><strong>${title}</strong><p>${copy}</p>${action ? addButton("Add your first task") : ""}</div>`; }
function taskItem(task, compact = false) {
  const isDone = task.completed;
  return `<div class="deadline-item ${compact ? "compact" : ""}">
    <button class="round-check ${isDone ? "is-done" : ""}" data-action="toggle" data-id="${safe(task.id)}" aria-label="${isDone ? "Mark incomplete" : "Mark complete"}">${isDone ? "✓" : ""}</button>
    <div class="deadline-main" data-action="edit" data-id="${safe(task.id)}" role="button" tabindex="0"><div class="deadline-title ${isDone ? "struck" : ""}">${safe(task.title)}</div><div class="deadline-sub">${safe(task.subject)} <span>·</span> ${safe(task.category)}</div></div>
    <i class="priority-dot ${task.priority.toLowerCase()}" title="${safe(task.priority)} priority"></i><span class="deadline-when ${whenClass(task)}">${dueLabel(task)} · ${clockLabel(task.deadline)}</span>
  </div>`;
}
function weeklyChart() {
  const days = Array.from({ length: 7 }, (_, index) => { const date = new Date(); date.setDate(date.getDate() - (6 - index)); return { date, label: date.toLocaleDateString("en-US", { weekday: "short" }), count: 0 }; });
  state.tasks.filter((task) => task.completedAt).forEach((task) => { const key = dateKey(task.completedAt); const point = days.find((day) => dateKey(day.date) === key); if (point) point.count++; });
  const max = Math.max(3, ...days.map((day) => day.count)); const x = (i) => 30 + i * 48; const y = (n) => 138 - (n / max) * 110;
  const points = days.map((day, i) => `${x(i)},${y(day.count)}`).join(" ");
  return `<svg viewBox="0 0 330 168" role="img" aria-label="Tasks completed during the last seven days"><defs><linearGradient id="area-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#6c8edc" stop-opacity=".2"/><stop offset="1" stop-color="#6c8edc" stop-opacity="0"/></linearGradient></defs><path class="chart-grid" d="M20 28H320 M20 82H320 M20 138H320"/><polygon class="chart-area" points="${x(0)},138 ${points} ${x(6)},138"/><polyline class="chart-line" points="${points}"/>${days.map((day, i) => `<circle class="chart-point" cx="${x(i)}" cy="${y(day.count)}" r="3.5"/><text class="chart-label" x="${x(i)}" y="160" text-anchor="middle">${day.label}</text>`).join("")}<text class="chart-label" x="3" y="31">${max}</text><text class="chart-label" x="8" y="141">0</text></svg>`;
}
function renderOverview() {
  const today = new Date(); const hour = today.getHours(); const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening"; const name = safe((getProfile().name || "Alex").split(" ")[0]);
  const active = state.tasks.filter((task) => !task.completed); const completed = state.tasks.filter((task) => task.completed); const overdue = active.filter((task) => status(task) === "Overdue"); const dueToday = active.filter((task) => dayDistance(task.deadline) === 0); const upcoming = active.filter((task) => new Date(task.deadline) >= new Date()).sort((a, b) => new Date(a.deadline) - new Date(b.deadline)).slice(0, 5);
  const stats = [{ label: "Active tasks", value: active.length, note: `${dueToday.length} due today`, icon: "☷", tone: "" }, { label: "Completed", value: completed.length, note: `${state.tasks.length ? Math.round(completed.length / state.tasks.length * 100) : 0}% of all tasks`, icon: "✓", tone: "green" }, { label: "Overdue", value: overdue.length, note: overdue.length ? "Needs a little attention" : "You’re all caught up", icon: "◷", tone: "red" }, { label: "Due today", value: dueToday.length, note: "One day at a time", icon: "◷", tone: "amber" }];
  const action = addButton("Add a task");
  $("#view-overview").innerHTML = `${heading(today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }).toUpperCase(), `${greeting}, ${name}`, "Here’s a gentle look at what’s coming up.", action)}
    <div class="stats-grid">${stats.map((item) => `<article class="stat-card"><div class="stat-head">${item.label}<span class="stat-icon ${item.tone}">${item.icon}</span></div><div class="stat-number">${item.value}</div><div class="stat-note">${item.note}</div></article>`).join("")}</div>
    <div class="dashboard-columns"><section class="panel"><div class="panel-head"><div><h2>Coming up</h2><p>A short list to keep you on track.</p></div><button class="link-button" data-page="tasks">See all <span>→</span></button></div><div class="deadline-list">${upcoming.length ? upcoming.map((task) => taskItem(task)).join("") : emptyState("✓", "Nothing due soon", "You have room to breathe. Add a task whenever you need.")}</div></section>
      <section class="panel"><div class="panel-head"><div><h2>A look at your week</h2><p>Tasks you’ve marked complete.</p></div><span class="week-label">Last 7 days</span></div><div class="chart">${weeklyChart()}</div></section></div>
    <div class="focus-strip"><span class="focus-stamp">✳</span><div class="focus-copy"><strong>A little progress is still progress.</strong><span>${dueToday.length ? `You’ve got ${dueToday.length} task${dueToday.length === 1 ? "" : "s"} due today.` : "Pick one small thing and start there."}</span></div><button data-page="tasks">Open my tasks →</button></div>`;
}
function filteredTasks() {
  const query = state.query.trim().toLowerCase();
  const result = state.tasks.filter((task) => (!query || `${task.title} ${task.subject} ${task.category} ${task.description || ""}`.toLowerCase().includes(query)) && (state.filters.priority === "All priorities" || task.priority === state.filters.priority) && (state.filters.category === "All types" || task.category === state.filters.category) && (state.filters.status === "All statuses" || status(task) === state.filters.status));
  if (state.sort === "Latest") return result.sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
  if (state.sort === "Priority") return result.sort((a, b) => ["High", "Medium", "Low"].indexOf(a.priority) - ["High", "Medium", "Low"].indexOf(b.priority));
  return result.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
}
function renderTasks() {
  const tasks = filteredTasks(); const filtersActive = state.filters.priority !== "All priorities" || state.filters.category !== "All types" || state.filters.status !== "All statuses";
  const categoryOptions = categoryNames.map((name) => `<option ${state.filters.category === name ? "selected" : ""}>${name}</option>`).join("");
  $("#view-tasks").innerHTML = `${heading("YOUR COURSEWORK", "My tasks", "All the little things you need to remember.", addButton())}<section class="panel task-list-panel"><div class="toolbar"><div class="list-label">All tasks <span>${tasks.length}</span></div><div class="toolbar-right"><button class="button quiet-button filter-button" data-action="filters">☷ <span class="filter-word">Filters</span></button><select class="control" id="task-sort" aria-label="Sort tasks"><option value="Soonest">Soonest first</option><option value="Latest">Latest first</option><option value="Priority">Priority</option></select></div></div>
    <div class="filter-bar ${state.filtersOpen ? "" : "hidden"}"><select class="control" data-filter="priority"><option>All priorities</option>${["High", "Medium", "Low"].map((x) => `<option ${state.filters.priority === x ? "selected" : ""}>${x}</option>`).join("")}</select><select class="control" data-filter="category"><option>All types</option>${categoryOptions}</select><select class="control" data-filter="status"><option>All statuses</option>${["Pending", "Completed", "Overdue"].map((x) => `<option ${state.filters.status === x ? "selected" : ""}>${x}</option>`).join("")}</select><button class="reset-filters" data-action="clear-filters">Clear filters</button></div>
    ${tasks.length ? `<div class="task-head"><span>TASK</span><span>PRIORITY</span><span>DUE</span><span>STATUS</span><span></span></div><div>${tasks.map((task) => `<div class="task-row"><button class="round-check ${task.completed ? "is-done" : ""}" data-action="toggle" data-id="${safe(task.id)}" aria-label="Toggle complete">${task.completed ? "✓" : ""}</button><button class="task-title-button" data-action="edit" data-id="${safe(task.id)}"><strong class="${task.completed ? "struck" : ""}">${safe(task.title)}</strong><span>${safe(task.subject)} <i>·</i> ${safe(task.category)}</span></button><span class="priority-cell"><i class="priority-dot ${task.priority.toLowerCase()}"></i>${safe(task.priority)}</span><span class="date-cell ${whenClass(task)}">${dueLabel(task)}<small>${clockLabel(task.deadline)}</small></span><span class="status ${status(task).toLowerCase()}">${status(task)}</span><button class="row-delete" data-action="delete" data-id="${safe(task.id)}" aria-label="Delete task">···</button></div>`).join("")}</div><div class="table-foot">Showing ${tasks.length} task${tasks.length === 1 ? "" : "s"} · Saved automatically</div>` : emptyState(state.query || filtersActive ? "⌕" : "☷", state.query || filtersActive ? "No tasks found" : "No tasks yet", state.query || filtersActive ? "Try a different search or loosen your filters." : "Add your first deadline and we’ll help you keep track.", !(state.query || filtersActive))}</section>`;
  const sort = $("#task-sort"); if (sort) sort.value = state.sort || "Soonest";
}
function renderCalendar() {
  const year = state.month.getFullYear(), month = state.month.getMonth(); const firstDay = new Date(year, month, 1); const mondayOffset = (firstDay.getDay() + 6) % 7; const daysCount = new Date(year, month + 1, 0).getDate();
  const dates = Array.from({ length: 42 }, (_, index) => new Date(year, month, index - mondayOffset + 1));
  const selected = state.tasks.filter((task) => dateKey(task.deadline) === state.selectedDate).sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  const monthLabel = state.month.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  $("#view-calendar").innerHTML = `${heading("PLAN AHEAD", "Calendar", "See your deadlines laid out, one day at a time.", addButton())}<div class="calendar-layout"><section class="panel calendar-panel"><div class="month-toolbar"><div><h2>${monthLabel}</h2><span>Choose a day to see what’s on</span></div><div class="month-actions"><button class="today-button" data-action="today">Today</button><button data-action="month-prev" aria-label="Previous month">‹</button><button data-action="month-next" aria-label="Next month">›</button></div></div><div class="calendar-grid">${["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => `<div class="weekday">${day}</div>`).join("")}${dates.map((date) => { const key = dateKey(date); const inMonth = date.getMonth() === month; const tasks = state.tasks.filter((task) => dateKey(task.deadline) === key); return `<button class="calendar-day ${inMonth ? "" : "outside"} ${key === dateKey(new Date()) ? "today" : ""} ${key === state.selectedDate ? "selected" : ""}" data-action="select-date" data-date="${key}"><span class="day-number">${date.getDate()}</span>${tasks.slice(0, 2).map((task) => `<span class="calendar-chip ${task.priority.toLowerCase()}">${safe(task.title)}</span>`).join("")}${tasks.length > 2 ? `<small>+${tasks.length - 2}</small>` : ""}</button>`; }).join("")}</div><div class="calendar-legend"><span><i class="priority-dot high"></i> High</span><span><i class="priority-dot medium"></i> Medium</span><span><i class="priority-dot low"></i> Low</span></div></section>
      <section class="panel day-panel"><div class="eyebrow">SELECTED DAY</div><h3>${new Date(`${state.selectedDate}T12:00:00`).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</h3>${selected.length ? selected.map((task) => `<div class="day-item"><i class="day-color ${task.completed ? "done" : status(task) === "Overdue" ? "overdue" : ""}"></i><div class="day-item-content"><strong>${safe(task.title)}</strong><span>${safe(task.subject)} · ${clockLabel(task.deadline)}</span><small>${safe(task.priority)} priority · ${status(task)}</small></div><button data-action="toggle" data-id="${safe(task.id)}" aria-label="Toggle completion">${task.completed ? "✓" : "○"}</button></div>`).join("") : emptyState("▦", "A quiet day", "Nothing due on this date.", true)}</section></div>`;
}
function renderProgress() {
  const total = state.tasks.length, done = state.tasks.filter((task) => task.completed).length, overdue = state.tasks.filter((task) => status(task) === "Overdue").length, active = total - done; const completion = total ? Math.round(done / total * 100) : 0;
  const categories = categoryNames.map((name, index) => ({ name, count: state.tasks.filter((task) => task.category === name).length, color: ["#6385d5", "#9886c8", "#5ca487", "#dda957", "#9aa5b4"][index] })).filter((item) => item.count);
  const subjects = Object.entries(state.tasks.reduce((all, task) => { all[task.subject] = (all[task.subject] || 0) + 1; return all; }, {})).sort((a, b) => b[1] - a[1]);
  $("#view-progress").innerHTML = `${heading("YOUR SEMESTER", "Progress", "A little perspective on how your workload is going.")}<div class="analytics-top"><section class="panel metric-panel"><div class="metric-head"><span class="stat-icon">↗</span><div><strong>Completion</strong><small>Tasks finished so far</small></div></div><div class="metric-big">${completion}<small>%</small></div><div class="track"><i style="width:${completion}%"></i></div><div class="metric-foot"><span>${done} finished</span><span>${active} left</span></div></section><section class="panel metric-panel"><div class="metric-head"><span class="stat-icon green">☷</span><div><strong>Your workload</strong><small>Current task status</small></div></div><div class="breakdown-numbers"><div><strong>${done}</strong><span>Done</span></div><div><strong>${active}</strong><span>Pending</span></div><div><strong>${overdue}</strong><span>Overdue</span></div></div><div class="track"><i style="width:${completion}%;background:#58a181"></i></div></section></div>
    <div class="analytics-bottom"><section class="panel analytics-chart-panel"><div class="panel-head"><div><h2>Weekly rhythm</h2><p>Tasks marked done in the last seven days.</p></div></div><div class="chart">${weeklyChart()}</div></section><section class="panel analytics-chart-panel"><div class="panel-head"><div><h2>Task types</h2><p>How your work is spread out.</p></div></div>${categories.length ? `<div class="category-list">${categories.map((item) => `<div class="category-line"><i style="background:${item.color}"></i><span>${safe(item.name)}</span><b>${item.count}</b></div>`).join("")}</div>` : emptyState("↗", "No data just yet", "Add a task and your progress will start to take shape.", false)}</section></div>
    <section class="panel subject-panel"><div class="panel-head"><div><h2>By course</h2><p>A quick look at where your deadlines live.</p></div></div>${subjects.length ? subjects.map(([subject, count], index) => `<div class="subject-row"><div><i class="priority-dot ${["high", "medium", "low"][index % 3]}"></i><strong>${safe(subject)}</strong><span>${count}</span></div><div class="progress-line"><i style="width:${Math.round(count / total * 100)}%"></i></div></div>`).join("") : emptyState("▤", "No courses added yet", "Add a course name to a task to see it here.", false)}</section>`;
}
function renderSettings() {
  const profile = getProfile();
  $("#view-settings").innerHTML = `${heading("YOUR PREFERENCES", "Settings", "A few small choices to make this space feel like yours.")}<div class="settings-layout"><div class="settings-main"><section class="panel settings-section"><div class="settings-heading"><span class="settings-icon">◉</span><div><h2>Your profile</h2><p>Just the basics for your workspace.</p></div></div><form id="profile-form" class="profile-form"><label>Your name<input id="profile-name" maxlength="60" value="${safe(profile.name || "Alex Morgan")}" required></label><label>Email address <span class="optional">Optional</span><input id="profile-email" type="email" value="${safe(profile.email || "")}" placeholder="you@college.edu"></label><button class="button quiet-button" type="submit">Save profile</button></form></section>
    <section class="panel settings-section"><div class="settings-heading"><span class="settings-icon">☼</span><div><h2>Appearance</h2><p>Pick a comfortable view for your day.</p></div></div><div class="settings-choice"><div><strong>Dark theme</strong><small>Use darker colors across DeadlineX.</small></div><button class="switch ${profile.theme === "Dark" ? "on" : ""}" role="switch" aria-checked="${profile.theme === "Dark"}" data-action="theme"><i></i></button></div></section>
    <section class="panel settings-section"><div class="settings-heading"><span class="settings-icon">♧</span><div><h2>Reminders</h2><p>These preferences are saved on this device.</p></div></div><div class="settings-choice"><div><strong>Deadline reminders</strong><small>Show a reminder when a due date is close.</small></div><button class="switch ${profile.reminders ? "on" : ""}" role="switch" aria-checked="${!!profile.reminders}" data-action="reminders"><i></i></button></div><div class="settings-choice"><div><strong>Weekly check-in</strong><small>A quick Monday look at the week ahead.</small></div><button class="switch ${profile.weeklyDigest ? "on" : ""}" role="switch" aria-checked="${!!profile.weeklyDigest}" data-action="digest"><i></i></button></div></section>
    <section class="panel settings-section"><div class="settings-heading"><span class="settings-icon">↕</span><div><h2>Your data</h2><p>Keep a copy of your tasks or move them to another setup.</p></div></div><div class="data-buttons"><button class="button quiet-button" data-action="export">↓ Export tasks</button><label class="button quiet-button import-button">↑ Import a backup<input type="file" id="import-file" accept=".json,application/json" hidden></label><span>${state.tasks.length} task${state.tasks.length === 1 ? "" : "s"} in your planner</span></div><p class="settings-footnote">${state.localMode ? "Demo mode is saving to this browser until Firebase is connected." : "Tasks are saved in your Firebase Firestore database."}</p></section></div><aside class="settings-aside"><span class="aside-star">✳</span><h3>A space that works<br>for you.</h3><p>Your profile and preferences are saved quietly on this device.</p><div class="aside-rule"></div><span>✓ &nbsp; Simple by design</span><span>✓ &nbsp; Your tasks, your pace</span></aside></div>`;
  $("#profile-form").addEventListener("submit", (event) => { event.preventDefault(); const newName = $("#profile-name").value.trim(); if (newName) { localStorage.setItem("deadlinex-profile", JSON.stringify({ ...getProfile(), name: newName, email: $("#profile-email").value.trim() })); render(); toast("Profile saved"); } });
  $("#import-file").addEventListener("change", importBackup);
}
function exportBackup() {
  const data = { app: "DeadlineX", exportedAt: new Date().toISOString(), tasks: state.tasks };
  const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })); const link = document.createElement("a"); link.href = url; link.download = "deadlinex-tasks.json"; link.click(); URL.revokeObjectURL(url); toast("Your backup is ready");
}
async function importBackup(event) {
  const file = event.target.files?.[0]; if (!file) return;
  try {
    const backup = JSON.parse(await file.text()); if (!Array.isArray(backup.tasks)) throw new Error("This file doesn’t look like a DeadlineX task backup.");
    const clean = backup.tasks.map((task) => ({ title: String(task.title || "").trim(), description: String(task.description || ""), subject: String(task.subject || "").trim(), deadline: new Date(task.deadline).toISOString(), category: categoryNames.includes(task.category) ? task.category : "Other", priority: ["Low", "Medium", "High"].includes(task.priority) ? task.priority : "Medium", completed: Boolean(task.completed), ...(task.completedAt ? { completedAt: task.completedAt } : {}) }));
    if (clean.some((task) => !task.title || !task.subject)) throw new Error("Each task needs a title and course name.");
    if (state.localMode) { state.tasks = clean.map((task) => ({ ...task, id: crypto.randomUUID() })).concat(state.tasks); await saveLocal(); }
    else { const imported = []; for (const task of clean) imported.push(await api("/api/tasks", { method: "POST", body: JSON.stringify(task) })); state.tasks = imported.concat(state.tasks); }
    toast(`${clean.length} task${clean.length === 1 ? "" : "s"} imported`); render();
  } catch (error) { toast(error.message || "Couldn’t read that backup"); }
  event.target.value = "";
}

function openTask(task = null) {
  $("#task-form").reset(); $("#form-message").textContent = ""; $("#task-id").value = task?.id || "";
  $("#dialog-title").textContent = task ? "Edit this task" : "Add a task"; $("#save-task").textContent = task ? "Save changes" : "Save task";
  if (task) { $("#task-title").value = task.title; $("#task-description").value = task.description || ""; $("#task-subject").value = task.subject; $("#task-category").value = task.category; $("#task-priority").value = task.priority; const d = new Date(task.deadline); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); $("#task-deadline").value = d.toISOString().slice(0, 16); }
  else { const date = new Date(); date.setMinutes(date.getMinutes() - date.getTimezoneOffset()); $("#task-deadline").value = date.toISOString().slice(0, 16); }
  $("#task-dialog").showModal(); $("#task-title").focus();
}
function formTask() { const d = new Date($("#task-deadline").value); return { title: $("#task-title").value.trim(), description: $("#task-description").value.trim(), subject: $("#task-subject").value.trim(), category: $("#task-category").value, priority: $("#task-priority").value, deadline: d.toISOString(), completed: false }; }
async function submitTask(event) {
  event.preventDefault(); const form = $("#task-form"); if (!form.reportValidity()) return; const id = $("#task-id").value; const old = state.tasks.find((task) => task.id === id); const data = { ...formTask(), completed: old?.completed || false, ...(old?.completedAt ? { completedAt: old.completedAt } : {}) };
  try {
    if (state.localMode) { if (id) state.tasks = state.tasks.map((task) => task.id === id ? { ...task, ...data } : task); else state.tasks.unshift({ ...data, id: crypto.randomUUID() }); await saveLocal(); }
    else { const saved = await api(id ? `/api/tasks/${id}` : "/api/tasks", { method: id ? "PUT" : "POST", body: JSON.stringify(data) }); if (id) state.tasks = state.tasks.map((task) => task.id === id ? saved : task); else state.tasks.unshift(saved); }
    $("#task-dialog").close(); toast(id ? "Changes saved" : "Task added"); render();
  } catch (error) { $("#form-message").textContent = error.message; }
}
async function toggleTask(id) {
  const current = state.tasks.find((task) => task.id === id); if (!current) return; const updated = { ...current, completed: !current.completed, completedAt: current.completed ? null : new Date().toISOString() };
  try { if (!state.localMode) await api(`/api/tasks/${id}`, { method: "PUT", body: JSON.stringify(updated) }); state.tasks = state.tasks.map((task) => task.id === id ? updated : task); if (state.localMode) await saveLocal(); render(); toast(updated.completed ? "Nicely done" : "Task moved back to your list"); }
  catch (error) { toast(error.message); }
}
function askDelete(id) { const task = state.tasks.find((item) => item.id === id); if (!task) return; state.deleteId = id; $("#confirm-copy").textContent = `“${task.title}” will be removed from your list.`; $("#confirm-dialog").showModal(); }
async function deleteTask() {
  const id = state.deleteId; if (!id) return;
  try { if (!state.localMode) await api(`/api/tasks/${id}`, { method: "DELETE" }); state.tasks = state.tasks.filter((task) => task.id !== id); if (state.localMode) await saveLocal(); $("#confirm-dialog").close(); state.deleteId = null; render(); toast("Task deleted"); }
  catch (error) { toast(error.message); }
}
let toastTimer; function toast(message) { const el = $("#toast"); el.textContent = message; el.classList.add("visible"); clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove("visible"), 3200); }

document.addEventListener("click", (event) => {
  const nav = event.target.closest("[data-page]"); if (nav) { go(nav.dataset.page); return; }
  const add = event.target.closest('[data-action="add"]'); if (add) { openTask(); return; }
  const actionTarget = event.target.closest("[data-action]"); if (!actionTarget) return;
  const { action, id } = actionTarget.dataset;
  if (action === "toggle") toggleTask(id);
  if (action === "edit") openTask(state.tasks.find((task) => task.id === id));
  if (action === "delete") askDelete(id);
  if (action === "filters") { state.filtersOpen = !state.filtersOpen; renderTasks(); }
  if (action === "clear-filters") { state.filters = { priority: "All priorities", category: "All types", status: "All statuses" }; renderTasks(); }
  if (action === "month-prev") { state.month = new Date(state.month.getFullYear(), state.month.getMonth() - 1, 1); renderCalendar(); }
  if (action === "month-next") { state.month = new Date(state.month.getFullYear(), state.month.getMonth() + 1, 1); renderCalendar(); }
  if (action === "today") { state.month = new Date(new Date().getFullYear(), new Date().getMonth(), 1); state.selectedDate = dateKey(new Date()); renderCalendar(); }
  if (action === "select-date") { state.selectedDate = actionTarget.dataset.date; renderCalendar(); }
  if (action === "theme" || action === "reminders" || action === "digest") { const key = action === "theme" ? "theme" : action === "reminders" ? "reminders" : "weeklyDigest"; const profile = getProfile(); const next = key === "theme" ? (profile.theme === "Dark" ? "Light" : "Dark") : !profile[key]; localStorage.setItem("deadlinex-profile", JSON.stringify({ ...profile, [key]: next })); renderSettings(); document.body.classList.toggle("dark-theme", getProfile().theme === "Dark"); }
  if (action === "export") exportBackup();
});
document.addEventListener("change", (event) => {
  if (event.target.dataset.filter) { state.filters[event.target.dataset.filter] = event.target.value; renderTasks(); }
  if (event.target.id === "task-sort") { state.sort = event.target.value; renderTasks(); }
});
$("#task-form").addEventListener("submit", submitTask);
$("#close-dialog").addEventListener("click", () => $("#task-dialog").close());
$("#cancel-dialog").addEventListener("click", () => $("#task-dialog").close());
$("#keep-task").addEventListener("click", () => $("#confirm-dialog").close());
$("#confirm-delete").addEventListener("click", deleteTask);
$("#mobile-menu").addEventListener("click", () => $("#sidebar").classList.toggle("open"));
$("#open-settings").addEventListener("click", () => go("settings"));
$("#top-avatar").addEventListener("click", () => go("settings"));
$(".brand").addEventListener("click", (event) => { event.preventDefault(); go("overview"); });
function editProfile() { const current = getProfile().name || "Alex Morgan"; const name = window.prompt("What name would you like DeadlineX to use?", current); if (name && name.trim()) { setProfileName(name.trim()); profileUI(); if (state.page === "overview") renderOverview(); toast("Profile name saved"); } }
$("#global-search").addEventListener("input", (event) => { state.query = event.target.value; if (state.query && state.page !== "tasks") state.page = "tasks"; if (state.page === "tasks") render(); });
$("#global-search").addEventListener("keydown", (event) => { if (event.key === "Escape") { event.target.value = ""; state.query = ""; render(); } });
document.addEventListener("keydown", (event) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); $("#global-search").focus(); } if (event.key === "Escape") $("#sidebar").classList.remove("open"); });
loadTasks();
