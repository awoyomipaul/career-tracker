// Career Activity Tracker — Cloudflare Worker
// Serves the API under /api/* and falls back to static assets (the frontend) for everything else.

const NAMES = ["Tomiwa", "Ebunoluwa"];
const COOKIE_NAME = "cat_session";
const SESSION_HOURS = 24 * 30; // 30 days

// ---- Table registry -------------------------------------------------------
// Whitelisted column names per table. The API will only ever read/write
// these columns, plus the audit columns (created_by/created_at/updated_by/updated_at)
// which are always set by the server, never by the client.
const TABLES = {
  networking: {
    columns: ["full_name","title_role","company_org","industry","channel","contact_info",
      "connection_source","first_outreach_date","last_contact_date","follow_up_date","status",
      "purpose","relationship_strength","owner","linked_opportunity","priority","notes"],
    numeric: ["relationship_strength"],
  },
  job_apps: {
    columns: ["company","role_title","location","job_type","source","job_url","date_applied",
      "application_deadline","status","salary_range","contact_recruiter","resume_version",
      "cover_letter","interview_date","interview_notes","follow_up_date","owner","notes"],
    numeric: [],
  },
  grad_school: {
    columns: ["university","program_degree","country","degree_level","application_deadline",
      "date_submitted","status","tuition_funding","scholarship_available","gre_gmat_required",
      "sop_status","lor_status","transcript_status","interview_date","decision_date","owner","notes"],
    numeric: [],
  },
  grants: {
    columns: ["program_name","organisation_funder","type","amount_value","eligibility_notes",
      "application_deadline","date_applied","status","documents_required","lors_needed",
      "essay_status","decision_date","owner","link_url","notes"],
    numeric: [],
  },
  articles: {
    columns: ["title","platform","category_topic","format","target_audience","target_word_count",
      "status","idea_date","draft_due_date","submit_publish_date","date_published","link_url",
      "seo_keywords","owner","co_author","performance_notes","notes"],
    numeric: ["target_word_count"],
  },
  linkedin_posts: {
    columns: ["post_topic","post_type","content_pillar","target_audience","draft_caption","status",
      "planned_post_date","date_posted","post_url","owner","hashtags","impressions","likes",
      "comments","notes"],
    numeric: ["impressions","likes","comments"],
  },
  courses_certs: {
    columns: ["name","type","platform_provider","certification_body","stage_module","total_modules",
      "modules_completed","percent_complete","current_module","status","start_date",
      "target_completion","date_completed","study_hours","exam_date","exam_result","owner",
      "link_url","notes"],
    numeric: ["total_modules","modules_completed","percent_complete","study_hours"],
  },
  books_papers: {
    columns: ["title","authors","type","genre_field","publisher_journal","year","source_link",
      "format","status","start_date","date_finished","current_chapter","total_chapters",
      "key_takeaways","rating","owner","notes"],
    numeric: ["year","rating"],
  },
};

// ---- tiny helpers -----------------------------------------------------------
function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: { "content-type": "application/json; charset=utf-8", ...(init.headers || {}) },
  });
}

function badRequest(msg) { return json({ error: msg }, { status: 400 }); }
function unauthorized(msg = "Not signed in") { return json({ error: msg }, { status: 401 }); }
function notFound(msg = "Not found") { return json({ error: msg }, { status: 404 }); }

function toHex(buf) {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function hmac(secret, message) {
  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return toHex(sig);
}

async function makeSessionCookie(name, secret) {
  const expires = Date.now() + SESSION_HOURS * 3600 * 1000;
  const payload = `${name}|${expires}`;
  const sig = await hmac(secret, payload);
  const token = encodeURIComponent(`${payload}|${sig}`);
  const maxAge = SESSION_HOURS * 3600;
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;
}

function clearSessionCookie() {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}

function getCookie(request, key) {
  const header = request.headers.get("Cookie") || "";
  const match = header.match(new RegExp(`(?:^|; )${key}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

async function getSessionUser(request, secret) {
  const raw = getCookie(request, COOKIE_NAME);
  if (!raw) return null;
  const parts = raw.split("|");
  if (parts.length !== 3) return null;
  const [name, expires, sig] = parts;
  const expected = await hmac(secret, `${name}|${expires}`);
  if (expected !== sig) return null;
  if (Date.now() > Number(expires)) return null;
  if (!NAMES.includes(name)) return null;
  return name;
}

function nowIso() {
  return new Date().toISOString();
}

function castValue(key, value, numericCols) {
  if (value === undefined || value === null || value === "") return null;
  if (numericCols.includes(key)) {
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }
  return String(value);
}

// ---- request handlers -------------------------------------------------------
async function handleLogin(request, env) {
  const body = await request.json().catch(() => ({}));
  const { passcode, name } = body;
  if (!passcode || passcode !== env.APP_PASSCODE) {
    return unauthorized("Incorrect passcode.");
  }
  if (!NAMES.includes(name)) {
    return badRequest("Pick Tomiwa or Ebunoluwa.");
  }
  const cookie = await makeSessionCookie(name, env.APP_SECRET);
  return json({ name }, { headers: { "Set-Cookie": cookie } });
}

function handleLogout() {
  return json({ ok: true }, { headers: { "Set-Cookie": clearSessionCookie() } });
}

async function handleMe(request, env) {
  const name = await getSessionUser(request, env.APP_SECRET);
  if (!name) return unauthorized();
  return json({ name });
}

async function handleList(env, tableKey) {
  const { results } = await env.DB.prepare(
    `SELECT * FROM ${tableKey} ORDER BY id DESC`
  ).all();
  return json({ rows: results });
}

async function handleCreate(env, tableKey, body, user) {
  const def = TABLES[tableKey];
  const cols = [];
  const placeholders = [];
  const values = [];
  for (const col of def.columns) {
    cols.push(col);
    placeholders.push("?");
    values.push(castValue(col, body[col], def.numeric));
  }
  cols.push("created_by", "created_at", "updated_by", "updated_at");
  placeholders.push("?", "?", "?", "?");
  const ts = nowIso();
  values.push(user, ts, user, ts);

  const sql = `INSERT INTO ${tableKey} (${cols.join(", ")}) VALUES (${placeholders.join(", ")})`;
  const res = await env.DB.prepare(sql).bind(...values).run();
  const id = res.meta.last_row_id;
  const row = await env.DB.prepare(`SELECT * FROM ${tableKey} WHERE id = ?`).bind(id).first();
  return json({ row }, { status: 201 });
}

async function handleUpdate(env, tableKey, id, body, user) {
  const def = TABLES[tableKey];
  const existing = await env.DB.prepare(`SELECT id FROM ${tableKey} WHERE id = ?`).bind(id).first();
  if (!existing) return notFound("Row not found.");

  const sets = [];
  const values = [];
  for (const col of def.columns) {
    if (col in body) {
      sets.push(`${col} = ?`);
      values.push(castValue(col, body[col], def.numeric));
    }
  }
  sets.push("updated_by = ?", "updated_at = ?");
  values.push(user, nowIso());
  values.push(id);

  const sql = `UPDATE ${tableKey} SET ${sets.join(", ")} WHERE id = ?`;
  await env.DB.prepare(sql).bind(...values).run();
  const row = await env.DB.prepare(`SELECT * FROM ${tableKey} WHERE id = ?`).bind(id).first();
  return json({ row });
}

async function handleDelete(env, tableKey, id) {
  const existing = await env.DB.prepare(`SELECT id FROM ${tableKey} WHERE id = ?`).bind(id).first();
  if (!existing) return notFound("Row not found.");
  await env.DB.prepare(`DELETE FROM ${tableKey} WHERE id = ?`).bind(id).run();
  return json({ ok: true });
}

// ---- router ------------------------------------------------------------
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (!path.startsWith("/api/")) {
      return env.ASSETS.fetch(request);
    }

    try {
      if (path === "/api/login" && request.method === "POST") {
        return await handleLogin(request, env);
      }
      if (path === "/api/logout" && request.method === "POST") {
        return handleLogout();
      }
      if (path === "/api/me" && request.method === "GET") {
        return await handleMe(request, env);
      }

      // Everything below requires a session.
      const user = await getSessionUser(request, env.APP_SECRET);
      if (!user) return unauthorized();

      const parts = path.split("/").filter(Boolean); // ["api", "<table>", "<id>?"]
      const tableKey = parts[1];
      const id = parts[2];

      if (!tableKey || !TABLES[tableKey]) {
        return notFound("Unknown table.");
      }

      if (!id && request.method === "GET") {
        return await handleList(env, tableKey);
      }
      if (!id && request.method === "POST") {
        const body = await request.json().catch(() => ({}));
        return await handleCreate(env, tableKey, body, user);
      }
      if (id && request.method === "PUT") {
        const body = await request.json().catch(() => ({}));
        return await handleUpdate(env, tableKey, Number(id), body, user);
      }
      if (id && request.method === "DELETE") {
        return await handleDelete(env, tableKey, Number(id));
      }

      return notFound();
    } catch (err) {
      return json({ error: String(err && err.message ? err.message : err) }, { status: 500 });
    }
  },
};
