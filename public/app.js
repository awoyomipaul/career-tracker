// ============================================================================
// Table configuration — keys/field order MUST match the Worker's column whitelist.
// ============================================================================
const OWNER_OPTIONS = ["Tomiwa", "Ebunoluwa", "Both"];

const CONFIG = {
  networking: {
    emoji: "🤝", label: "Networking",
    desc: "Log every person you're reaching out to via LinkedIn, Email, Phone or Text.",
    titleField: "full_name", subtitleField: "title_role", deadlineField: "follow_up_date",
    listColumns: ["full_name", "company_org", "status", "follow_up_date", "owner", "notes"],
    fields: [
      { key: "full_name", label: "Full name", type: "text" },
      { key: "title_role", label: "Title / role", type: "text" },
      { key: "company_org", label: "Company / org", type: "text" },
      { key: "industry", label: "Industry", type: "text" },
      { key: "channel", label: "Channel", type: "text", list: ["LinkedIn", "Email", "Phone", "Text", "Call", "In-Person"] },
      { key: "contact_info", label: "Contact info (handle / email / number)", type: "text" },
      { key: "connection_source", label: "Connection source", type: "text" },
      { key: "first_outreach_date", label: "First outreach date", type: "date" },
      { key: "last_contact_date", label: "Last contact date", type: "date" },
      { key: "follow_up_date", label: "Follow-up date", type: "date" },
      { key: "status", label: "Status", type: "text", list: ["Not Started", "Message Sent", "Replied", "Call Scheduled", "Closed"] },
      { key: "purpose", label: "Purpose", type: "textarea" },
      { key: "relationship_strength", label: "Relationship strength (1–5)", type: "number", min: 1, max: 5 },
      { key: "owner", label: "Owner", type: "select", options: OWNER_OPTIONS },
      { key: "linked_opportunity", label: "Linked opportunity", type: "text" },
      { key: "priority", label: "Priority", type: "select", options: ["⭐", "⭐⭐", "⭐⭐⭐"] },
      { key: "notes", label: "Notes", type: "textarea" },
    ],
  },
  job_apps: {
    emoji: "💼", label: "Job Apps",
    desc: "One row per job application. Track status from Wishlist to Offer.",
    titleField: "company", subtitleField: "role_title", deadlineField: "application_deadline",
    listColumns: ["company", "role_title", "status", "application_deadline", "owner", "notes"],
    fields: [
      { key: "company", label: "Company", type: "text" },
      { key: "role_title", label: "Role / title", type: "text" },
      { key: "location", label: "Location", type: "text" },
      { key: "job_type", label: "Job type", type: "text", list: ["Full-Time", "Part-Time", "Contract", "Internship"] },
      { key: "source", label: "Source", type: "text", list: ["LinkedIn", "Website", "Referral", "JobMag"] },
      { key: "job_url", label: "Job URL", type: "text" },
      { key: "date_applied", label: "Date applied", type: "date" },
      { key: "application_deadline", label: "Application deadline", type: "date" },
      { key: "status", label: "Status", type: "text", list: ["Wishlist", "Applied", "Assessment", "Interview", "Offer", "Rejected"] },
      { key: "salary_range", label: "Salary range", type: "text" },
      { key: "contact_recruiter", label: "Contact / recruiter", type: "text" },
      { key: "resume_version", label: "Resume version", type: "text" },
      { key: "cover_letter", label: "Cover letter?", type: "select", options: ["Yes", "No", "In Progress"] },
      { key: "interview_date", label: "Interview date", type: "date" },
      { key: "interview_notes", label: "Interview notes", type: "textarea" },
      { key: "follow_up_date", label: "Follow-up date", type: "date" },
      { key: "owner", label: "Owner", type: "select", options: OWNER_OPTIONS },
      { key: "notes", label: "Notes", type: "textarea" },
    ],
  },
  grad_school: {
    emoji: "🎓", label: "Grad School",
    desc: "Track every university, program, deadline, SOP & LOR progress.",
    titleField: "university", subtitleField: "program_degree", deadlineField: "application_deadline",
    listColumns: ["university", "program_degree", "status", "application_deadline", "owner", "notes"],
    fields: [
      { key: "university", label: "University", type: "text" },
      { key: "program_degree", label: "Program / degree", type: "text" },
      { key: "country", label: "Country", type: "text" },
      { key: "degree_level", label: "Degree level", type: "text", list: ["MSc", "MBA", "MPA", "MA", "PhD"] },
      { key: "application_deadline", label: "Application deadline", type: "date" },
      { key: "date_submitted", label: "Date submitted", type: "date" },
      { key: "status", label: "Status", type: "text", list: ["Researching", "Preparing", "Submitted", "Interview", "Accepted", "Rejected", "Waitlisted"] },
      { key: "tuition_funding", label: "Tuition / funding", type: "text" },
      { key: "scholarship_available", label: "Scholarship available?", type: "text" },
      { key: "gre_gmat_required", label: "GRE/GMAT required?", type: "select", options: ["Yes", "No"] },
      { key: "sop_status", label: "SOP status", type: "text", list: ["Not Started", "Drafting", "Submitted"] },
      { key: "lor_status", label: "LOR status (# secured/needed)", type: "text" },
      { key: "transcript_status", label: "Transcript status", type: "text" },
      { key: "interview_date", label: "Interview date", type: "date" },
      { key: "decision_date", label: "Decision date", type: "date" },
      { key: "owner", label: "Owner", type: "select", options: OWNER_OPTIONS },
      { key: "notes", label: "Notes", type: "textarea" },
    ],
  },
  grants: {
    emoji: "🌟", label: "Grants",
    desc: "Fellowships, scholarships, accelerators, prizes — log amount & deadline.",
    titleField: "program_name", subtitleField: "organisation_funder", deadlineField: "application_deadline",
    listColumns: ["program_name", "organisation_funder", "status", "application_deadline", "owner", "notes"],
    fields: [
      { key: "program_name", label: "Grant / program name", type: "text" },
      { key: "organisation_funder", label: "Organisation / funder", type: "text" },
      { key: "type", label: "Type", type: "text", list: ["Grant", "Fellowship", "Scholarship", "Accelerator", "Residency", "Prize"] },
      { key: "amount_value", label: "Amount / value", type: "text" },
      { key: "eligibility_notes", label: "Eligibility notes", type: "textarea" },
      { key: "application_deadline", label: "Application deadline", type: "date" },
      { key: "date_applied", label: "Date applied", type: "date" },
      { key: "status", label: "Status", type: "text", list: ["Researching", "Preparing", "Applied", "Awarded", "Rejected"] },
      { key: "documents_required", label: "Documents required", type: "text" },
      { key: "lors_needed", label: "LORs needed?", type: "text" },
      { key: "essay_status", label: "Essay / proposal status", type: "text", list: ["Not Started", "Drafting", "Submitted"] },
      { key: "decision_date", label: "Decision date", type: "date" },
      { key: "owner", label: "Owner", type: "select", options: OWNER_OPTIONS },
      { key: "link_url", label: "Link / URL", type: "text" },
      { key: "notes", label: "Notes", type: "textarea" },
    ],
  },
  articles: {
    emoji: "✍️", label: "Articles",
    desc: "Blog posts, essays & long-form content — ideas, drafts, published links.",
    titleField: "title", subtitleField: "platform", deadlineField: "draft_due_date",
    listColumns: ["title", "platform", "status", "draft_due_date", "owner", "notes"],
    fields: [
      { key: "title", label: "Article title / working title", type: "text" },
      { key: "platform", label: "Platform / publication", type: "text" },
      { key: "category_topic", label: "Category / topic", type: "text" },
      { key: "format", label: "Format", type: "text", list: ["Essay", "Op-ed", "Newsletter", "Blog Post", "Research Piece"] },
      { key: "target_audience", label: "Target audience", type: "text" },
      { key: "target_word_count", label: "Target word count", type: "number" },
      { key: "status", label: "Status", type: "text", list: ["Idea", "Outline", "Drafting", "Editing", "Submitted", "Published"] },
      { key: "idea_date", label: "Idea date", type: "date" },
      { key: "draft_due_date", label: "Draft due date", type: "date" },
      { key: "submit_publish_date", label: "Submit / publish date", type: "date" },
      { key: "date_published", label: "Date published", type: "date" },
      { key: "link_url", label: "Link / URL (when live)", type: "text" },
      { key: "seo_keywords", label: "SEO keywords / tags", type: "text" },
      { key: "owner", label: "Owner", type: "select", options: OWNER_OPTIONS },
      { key: "co_author", label: "Co-author?", type: "select", options: ["Yes", "No"] },
      { key: "performance_notes", label: "Performance notes", type: "textarea" },
      { key: "notes", label: "Notes", type: "textarea" },
    ],
  },
  linkedin_posts: {
    emoji: "📣", label: "LinkedIn Posts",
    desc: "Short-form posts & content — drafts, scheduled dates, engagement notes.",
    titleField: "post_topic", subtitleField: "content_pillar", deadlineField: "planned_post_date",
    listColumns: ["post_topic", "content_pillar", "status", "planned_post_date", "owner", "notes"],
    fields: [
      { key: "post_topic", label: "Post topic / hook (first line)", type: "textarea" },
      { key: "post_type", label: "Post type", type: "text", list: ["Text Post", "Carousel", "Poll", "Video", "Repost"] },
      { key: "content_pillar", label: "Content pillar / theme", type: "text" },
      { key: "target_audience", label: "Target audience", type: "text" },
      { key: "draft_caption", label: "Draft / caption", type: "textarea" },
      { key: "status", label: "Status", type: "text", list: ["Idea", "Drafting", "Draft Ready", "Scheduled", "Posted"] },
      { key: "planned_post_date", label: "Planned post date", type: "date" },
      { key: "date_posted", label: "Date posted", type: "date" },
      { key: "post_url", label: "Post URL (when live)", type: "text" },
      { key: "owner", label: "Owner", type: "select", options: OWNER_OPTIONS },
      { key: "hashtags", label: "Hashtags", type: "text" },
      { key: "impressions", label: "Impressions", type: "number" },
      { key: "likes", label: "Likes", type: "number" },
      { key: "comments", label: "Comments", type: "number" },
      { key: "notes", label: "Notes", type: "textarea" },
    ],
  },
  courses_certs: {
    emoji: "📚", label: "Courses & Certs",
    desc: "Courses by module progress + certifications as one row per stage.",
    titleField: "name", subtitleField: "stage_module", deadlineField: "target_completion",
    listColumns: ["name", "stage_module", "status", "target_completion", "owner", "notes"],
    fields: [
      { key: "name", label: "Name", type: "text" },
      { key: "type", label: "Type", type: "select", options: ["Course", "Cert Stage"] },
      { key: "platform_provider", label: "Platform / provider", type: "text" },
      { key: "certification_body", label: "Certification body", type: "text" },
      { key: "stage_module", label: "Stage / module", type: "text" },
      { key: "total_modules", label: "Total modules or stages", type: "number" },
      { key: "modules_completed", label: "Modules completed", type: "number" },
      { key: "percent_complete", label: "% complete (0–1)", type: "number", step: "0.01" },
      { key: "current_module", label: "Current module / topic", type: "text" },
      { key: "status", label: "Status", type: "text", list: ["Not Started", "In Progress", "Completed"] },
      { key: "start_date", label: "Start date", type: "date" },
      { key: "target_completion", label: "Target completion", type: "date" },
      { key: "date_completed", label: "Date completed", type: "date" },
      { key: "study_hours", label: "Study hours logged", type: "number" },
      { key: "exam_date", label: "Exam date (certs only)", type: "date" },
      { key: "exam_result", label: "Exam result", type: "text" },
      { key: "owner", label: "Owner", type: "select", options: OWNER_OPTIONS },
      { key: "link_url", label: "Link / URL", type: "text" },
      { key: "notes", label: "Notes / next action", type: "textarea" },
    ],
  },
  books_papers: {
    emoji: "📖", label: "Books & Papers",
    desc: "Books, academic papers, research reports — what you're reading and studying.",
    titleField: "title", subtitleField: "authors", deadlineField: null,
    listColumns: ["title", "authors", "status", "owner", "notes"],
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "authors", label: "Author(s)", type: "text" },
      { key: "type", label: "Type", type: "select", options: ["Book", "Academic Paper"] },
      { key: "genre_field", label: "Genre / field", type: "text" },
      { key: "publisher_journal", label: "Publisher / journal", type: "text" },
      { key: "year", label: "Year", type: "number" },
      { key: "source_link", label: "Source / link", type: "text" },
      { key: "format", label: "Format", type: "select", options: ["Physical", "eBook", "PDF"] },
      { key: "status", label: "Status", type: "text", list: ["Want to Read", "Reading", "Finished"] },
      { key: "start_date", label: "Start date", type: "date" },
      { key: "date_finished", label: "Date finished", type: "date" },
      { key: "current_chapter", label: "Current chapter / page", type: "text" },
      { key: "total_chapters", label: "Total chapters / pages", type: "text" },
      { key: "key_takeaways", label: "Key takeaways / summary", type: "textarea" },
      { key: "rating", label: "Rating (1–5)", type: "number", min: 1, max: 5 },
      { key: "owner", label: "Owner", type: "select", options: OWNER_OPTIONS },
      { key: "notes", label: "Notes", type: "textarea" },
    ],
  },
};

const TABLE_ORDER = ["networking", "job_apps", "grad_school", "grants", "articles", "linkedin_posts", "courses_certs", "books_papers"];

// ============================================================================
// State
// ============================================================================
const state = {
  user: null,
  active: "dashboard",
  cache: {},     // tableKey -> rows[]
  editing: null, // { table, id } or null for create
};

// ============================================================================
// DOM refs
// ============================================================================
const el = (id) => document.getElementById(id);
const loginScreen = el("login-screen");
const appEl = el("app");
const railNav = el("rail-nav");
const whoBadge = el("who-badge");
const moduleEyebrow = el("module-eyebrow");
const moduleTitle = el("module-title");
const moduleDesc = el("module-desc");
const tableWrap = el("table-wrap");
const newRowBtn = el("new-row-btn");
const modalBackdrop = el("modal-backdrop");
const modalTitle = el("modal-title");
const rowForm = el("row-form");
const deleteRowBtn = el("delete-row-btn");

// ============================================================================
// API helper
// ============================================================================
async function api(path, opts = {}) {
  const res = await fetch(`/api${path}`, {
    ...opts,
    headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
  });
  if (res.status === 401) {
    showLogin();
    throw new Error("Session expired");
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

// ============================================================================
// Login
// ============================================================================
let selectedName = null;
document.querySelectorAll(".name-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    selectedName = btn.dataset.name;
    document.querySelectorAll(".name-btn").forEach((b) => b.classList.toggle("active", b === btn));
  });
});

el("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const errorEl = el("login-error");
  errorEl.textContent = "";
  if (!selectedName) { errorEl.textContent = "Pick who you are first."; return; }
  const passcode = el("passcode-input").value;
  const btn = el("login-submit");
  btn.disabled = true; btn.textContent = "Checking…";
  try {
    const data = await api("/login", { method: "POST", body: JSON.stringify({ name: selectedName, passcode }) });
    state.user = data.name;
    await boot();
  } catch (err) {
    errorEl.textContent = err.message || "Couldn't sign in.";
  } finally {
    btn.disabled = false; btn.textContent = "Enter";
  }
});

el("logout-btn").addEventListener("click", async () => {
  await api("/logout", { method: "POST" }).catch(() => {});
  state.user = null;
  showLogin();
});

function showLogin() {
  loginScreen.classList.remove("hidden");
  appEl.classList.add("hidden");
}

function showApp() {
  loginScreen.classList.add("hidden");
  appEl.classList.remove("hidden");
}

// ============================================================================
// Boot
// ============================================================================
async function boot() {
  whoBadge.innerHTML = `Signed in as<br><b>${state.user}</b>`;
  showApp();
  buildNav();
  await Promise.all(TABLE_ORDER.map(loadTable));
  selectTable(state.active);
}

function buildNav() {
  railNav.innerHTML = "";

  const dashBtn = document.createElement("button");
  dashBtn.className = "rail-item";
  dashBtn.dataset.key = "dashboard";
  dashBtn.innerHTML = `<span>📊</span><span>Dashboard</span>`;
  dashBtn.addEventListener("click", () => selectTable("dashboard"));
  railNav.appendChild(dashBtn);

  TABLE_ORDER.forEach((key) => {
    const cfg = CONFIG[key];
    const btn = document.createElement("button");
    btn.className = "rail-item";
    btn.dataset.key = key;
    btn.innerHTML = `<span>${cfg.emoji}</span><span>${cfg.label}</span><span class="count" id="count-${key}">0</span>`;
    btn.addEventListener("click", () => selectTable(key));
    railNav.appendChild(btn);
  });
}

async function loadTable(key) {
  const data = await api(`/${key}`);
  state.cache[key] = data.rows;
  const countEl = el(`count-${key}`);
  if (countEl) countEl.textContent = data.rows.length;
}

function selectTable(key) {
  state.active = key;
  document.querySelectorAll(".rail-item").forEach((b) => b.classList.toggle("active", b.dataset.key === key));

  if (key === "dashboard") {
    moduleEyebrow.textContent = "Overview";
    moduleTitle.textContent = "Dashboard";
    moduleDesc.textContent = "Everything you and Ebunoluwa are tracking, in one place.";
    newRowBtn.classList.add("hidden");
    renderDashboard();
    return;
  }

  newRowBtn.classList.remove("hidden");
  const cfg = CONFIG[key];
  moduleEyebrow.textContent = `${cfg.emoji} Module`;
  moduleTitle.textContent = cfg.label;
  moduleDesc.textContent = cfg.desc;
  renderTable(key);
}

// ============================================================================
// Deadline pulse
// ============================================================================
function pulseFor(dateStr) {
  if (!dateStr) return { cls: "none", label: "—" };
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return { cls: "none", label: dateStr };
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const diffDays = Math.round((d - today) / (1000 * 60 * 60 * 24));
  const label = d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  if (diffDays < 0) return { cls: "overdue", label };
  if (diffDays <= 7) return { cls: "soon", label };
  return { cls: "clear", label };
}

// ============================================================================
// Table rendering
// ============================================================================
function fieldLabel(key, cfg) {
  const f = cfg.fields.find((f) => f.key === key);
  return f ? f.label : key;
}

function renderTable(key) {
  const cfg = CONFIG[key];
  const rows = state.cache[key] || [];

  if (rows.length === 0) {
    tableWrap.innerHTML = `<div class="empty-state"><h3>Nothing logged yet</h3><p>Click "+ New entry" to add your first ${cfg.label.toLowerCase()} row.</p></div>`;
    return;
  }

  const cols = cfg.listColumns;
  let html = `<table class="data-table"><thead><tr>`;
  cols.forEach((c) => { html += `<th>${fieldLabel(c, cfg)}</th>`; });
  html += `<th class="col-actions">Actions</th>`;
  html += `</tr></thead><tbody>`;

  rows.forEach((row) => {
    html += `<tr data-id="${row.id}">`;
    cols.forEach((c, idx) => {
      const label = fieldLabel(c, cfg);
      if (idx === 0) {
        html += `<td data-label="${label}" class="cell-hide-mobile-label"><span class="cell-primary">${escapeHtml(row[cfg.titleField] || "(untitled)")}</span>`;
        if (cfg.subtitleField && row[cfg.subtitleField]) {
          html += `<div class="cell-muted">${escapeHtml(row[cfg.subtitleField])}</div>`;
        }
        html += `</td>`;
        return;
      }
      if (c === cfg.subtitleField) return; // already shown under title
      if (c === cfg.deadlineField) {
        const p = pulseFor(row[c]);
        html += `<td data-label="${label}"><div class="pulse-row"><span class="pulse-dot ${p.cls}"></span>${p.label}</div></td>`;
        return;
      }
      if (c === "owner") {
        html += `<td data-label="${label}"><span class="owner-chip">${escapeHtml(row.owner || "—")}</span></td>`;
        return;
      }
      if (c === "notes") {
        html += `<td data-label="${label}"><div class="cell-notes cell-muted">${escapeHtml(row.notes || "")}</div></td>`;
        return;
      }
      html += `<td data-label="${label}">${escapeHtml(row[c] ?? "")}</td>`;
    });
    html += `<td class="col-actions" data-label="Actions">
      <button type="button" class="row-action-btn edit-btn">Edit</button>
      <button type="button" class="row-action-btn delete-btn">Delete</button>
    </td>`;
    html += `</tr>`;
  });
  html += `</tbody></table>`;
  tableWrap.innerHTML = html;

  tableWrap.querySelectorAll("tbody tr").forEach((tr) => {
    const id = Number(tr.dataset.id);
    const row = rows.find((r) => r.id === id);

    tr.addEventListener("click", (e) => {
      if (e.target.closest(".row-action-btn")) return;
      openModal("edit", key, row);
    });

    tr.querySelector(".edit-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      openModal("edit", key, row);
    });

    tr.querySelector(".delete-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      deleteEntry(key, row.id, cfg.label);
    });
  });
}

async function deleteEntry(table, id, label) {
  if (!confirm(`Delete this ${label.toLowerCase()} entry? This can't be undone.`)) return;
  try {
    await api(`/${table}/${id}`, { method: "DELETE" });
    await loadTable(table);
    if (state.active === table) renderTable(table);
    else if (state.active === "dashboard") renderDashboard();
  } catch (err) {
    alert(err.message || "Couldn't delete this entry.");
  }
}

// ============================================================================
// Dashboard
// ============================================================================
function renderDashboard() {
  const totalRows = TABLE_ORDER.reduce((sum, k) => sum + (state.cache[k] || []).length, 0);

  let cardsHtml = '<div class="dash-grid">';
  TABLE_ORDER.forEach((key) => {
    const cfg = CONFIG[key];
    const rows = state.cache[key] || [];
    let nextDeadline = null;
    if (cfg.deadlineField) {
      rows.forEach((r) => {
        const raw = r[cfg.deadlineField];
        if (!raw) return;
        const d = new Date(raw);
        if (isNaN(d.getTime())) return;
        if (!nextDeadline || d < nextDeadline.date) nextDeadline = { date: d, raw };
      });
    }
    const deadlineHtml = nextDeadline
      ? (() => { const p = pulseFor(nextDeadline.raw); return `<div class="pulse-row"><span class="pulse-dot ${p.cls}"></span>Next: ${p.label}</div>`; })()
      : `<span class="dash-card-sub">No dates tracked</span>`;
    cardsHtml += `
      <button type="button" class="dash-card" data-key="${key}">
        <div class="dash-card-top"><span class="dash-card-emoji">${cfg.emoji}</span><span class="dash-card-count">${rows.length}</span></div>
        <div class="dash-card-label">${cfg.label}</div>
        ${deadlineHtml}
      </button>`;
  });
  cardsHtml += "</div>";

  const events = [];
  TABLE_ORDER.forEach((key) => {
    const cfg = CONFIG[key];
    if (!cfg.deadlineField) return;
    (state.cache[key] || []).forEach((row) => {
      const raw = row[cfg.deadlineField];
      if (!raw) return;
      const d = new Date(raw);
      if (isNaN(d.getTime())) return;
      events.push({ key, cfg, row, date: d, raw });
    });
  });
  events.sort((a, b) => a.date - b.date);

  let listHtml;
  if (events.length === 0) {
    listHtml = `<div class="empty-state"><h3>No dates logged yet</h3><p>Deadlines you add across any module will show up here, soonest first.</p></div>`;
  } else {
    listHtml = '<div class="dash-events">';
    events.slice(0, 25).forEach((e) => {
      const p = pulseFor(e.raw);
      const title = e.row[e.cfg.titleField] || "(untitled)";
      listHtml += `
        <div class="dash-event-row" data-key="${e.key}" data-id="${e.row.id}">
          <span class="pulse-dot ${p.cls}"></span>
          <span class="dash-event-date">${p.label}</span>
          <span class="dash-event-table">${e.cfg.emoji} ${e.cfg.label}</span>
          <span class="dash-event-title">${escapeHtml(title)}</span>
          <span class="owner-chip">${escapeHtml(e.row.owner || "—")}</span>
        </div>`;
    });
    listHtml += "</div>";
  }

  tableWrap.innerHTML = `
    <div class="dash-wrap">
      <div class="dash-summary-line">${totalRows} total entries tracked across 8 modules.</div>
      ${cardsHtml}
      <h3 class="dash-section-title">Upcoming &amp; overdue</h3>
      ${listHtml}
    </div>`;

  tableWrap.querySelectorAll(".dash-card").forEach((btn) => {
    btn.addEventListener("click", () => selectTable(btn.dataset.key));
  });
  tableWrap.querySelectorAll(".dash-event-row").forEach((rowEl) => {
    rowEl.addEventListener("click", () => {
      const key = rowEl.dataset.key;
      const id = Number(rowEl.dataset.id);
      const row = (state.cache[key] || []).find((r) => r.id === id);
      if (row) openModal("edit", key, row);
    });
  });
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// ============================================================================
// Modal / form
// ============================================================================
function openModal(mode, key, row) {
  const cfg = CONFIG[key];
  state.editing = mode === "edit" ? { table: key, id: row.id } : { table: key, id: null };
  modalTitle.textContent = mode === "edit" ? `Edit ${cfg.label.toLowerCase()} entry` : `New ${cfg.label.toLowerCase()} entry`;
  deleteRowBtn.classList.toggle("hidden", mode !== "edit");

  rowForm.innerHTML = "";
  cfg.fields.forEach((f) => {
    const wrap = document.createElement("div");
    wrap.className = "form-field";
    const value = row ? (row[f.key] ?? "") : "";
    let inputHtml = "";
    if (f.type === "textarea") {
      inputHtml = `<textarea name="${f.key}">${escapeHtml(value)}</textarea>`;
    } else if (f.type === "select") {
      const opts = f.options.map((o) => `<option value="${o}" ${o === value ? "selected" : ""}>${o}</option>`).join("");
      inputHtml = `<select name="${f.key}"><option value="">—</option>${opts}</select>`;
    } else if (f.type === "number") {
      inputHtml = `<input type="number" name="${f.key}" value="${escapeHtml(value)}" ${f.min !== undefined ? `min="${f.min}"` : ""} ${f.max !== undefined ? `max="${f.max}"` : ""} ${f.step ? `step="${f.step}"` : ""} />`;
    } else if (f.type === "date") {
      inputHtml = `<input type="date" name="${f.key}" value="${escapeHtml(toDateInputValue(value))}" />`;
    } else if (f.list) {
      const listId = `list-${key}-${f.key}`;
      const opts = f.list.map((o) => `<option value="${o}"></option>`).join("");
      inputHtml = `<input type="text" name="${f.key}" value="${escapeHtml(value)}" list="${listId}" /><datalist id="${listId}">${opts}</datalist>`;
    } else {
      inputHtml = `<input type="text" name="${f.key}" value="${escapeHtml(value)}" />`;
    }
    wrap.innerHTML = `<label>${f.label}</label>${inputHtml}`;
    rowForm.appendChild(wrap);
  });

  if (mode === "edit" && (row.created_by || row.updated_by)) {
    const note = document.createElement("p");
    note.className = "audit-note";
    note.textContent = `Created by ${row.created_by || "—"} on ${formatTs(row.created_at)} · Last edited by ${row.updated_by || "—"} on ${formatTs(row.updated_at)}`;
    rowForm.appendChild(note);
  }

  modalBackdrop.classList.remove("hidden");
}

function toDateInputValue(v) {
  if (!v) return "";
  const d = new Date(v);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

function formatTs(v) {
  if (!v) return "—";
  const d = new Date(v);
  if (isNaN(d.getTime())) return v;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function closeModal() {
  modalBackdrop.classList.add("hidden");
  state.editing = null;
}

el("modal-close").addEventListener("click", closeModal);
el("cancel-row-btn").addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", (e) => { if (e.target === modalBackdrop) closeModal(); });

el("new-row-btn").addEventListener("click", () => openModal("create", state.active, null));

rowForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const { table, id } = state.editing;
  const cfg = CONFIG[table];
  const formData = new FormData(rowForm);
  const body = {};
  cfg.fields.forEach((f) => { body[f.key] = formData.get(f.key) || ""; });

  const saveBtn = el("save-row-btn");
  saveBtn.disabled = true; saveBtn.textContent = "Saving…";
  try {
    if (id) {
      await api(`/${table}/${id}`, { method: "PUT", body: JSON.stringify(body) });
    } else {
      await api(`/${table}`, { method: "POST", body: JSON.stringify(body) });
    }
    await loadTable(table);
    if (state.active === table) renderTable(table);
    else if (state.active === "dashboard") renderDashboard();
    closeModal();
  } catch (err) {
    alert(err.message || "Couldn't save this entry.");
  } finally {
    saveBtn.disabled = false; saveBtn.textContent = "Save";
  }
});

deleteRowBtn.addEventListener("click", async () => {
  const { table, id } = state.editing;
  if (!id) return;
  if (!confirm("Delete this entry? This can't be undone.")) return;
  try {
    await api(`/${table}/${id}`, { method: "DELETE" });
    await loadTable(table);
    if (state.active === table) renderTable(table);
    else if (state.active === "dashboard") renderDashboard();
    closeModal();
  } catch (err) {
    alert(err.message || "Couldn't delete this entry.");
  }
});

// ============================================================================
// Init: check existing session
// ============================================================================
(async function init() {
  try {
    const data = await api("/me");
    state.user = data.name;
    await boot();
  } catch {
    showLogin();
  }
})();
