# Surface Area — Career Activity Tracker

A web app version of your Career Development Activity Tracker, fully hosted on
Cloudflare: **Workers** (API) + **D1** (database) + **Workers Static Assets**
(the frontend you're reading this from would be served the same way).

Everything — login, every module, every "+ New entry" and edit — runs from a
single Cloudflare Worker. No separate frontend host, no other vendor.

## What's included

- `schema.sql` — the 8 tables (Networking, Job Apps, Grad School, Grants,
  Articles, LinkedIn Posts, Courses & Certs, Books & Papers), each with
  `created_by` / `created_at` / `updated_by` / `updated_at` so every row keeps
  a record of who logged it and who last touched it — that's the
  accountability layer replacing the spreadsheet's Owner-column-only system.
- `seed.sql` — every row currently in `Career_Development_Activity_Tracker.xlsx`,
  converted to SQL inserts, ready to load into D1 so you start with your real
  data, not a blank app.
- `src/index.js` — the Worker: a passcode + name gate, and CRUD routes for
  all 8 tables.
- `public/` — the frontend (plain HTML/CSS/JS, no build step).

## How sign-in works

There's one shared passcode (so the app isn't public to randoms with the
link) and a name picker (Tomiwa / Ebunoluwa). Whoever is signed in gets
stamped as `created_by` / `updated_by` on every row they touch — automatically,
no extra step. That's intentionally lightweight: not a full account system,
but enough that you can always see who logged or last changed any entry.

## Deploy it — step by step

You'll need a free Cloudflare account and Node.js installed locally.

**1. Install Wrangler (Cloudflare's CLI) and log in**
```bash
npm install -g wrangler
wrangler login
```
This opens a browser tab to authorize Wrangler against your Cloudflare account.

**2. Create the D1 database**
```bash
cd career-tracker
wrangler d1 create career_tracker_db
```
This prints a `database_id`. Copy it into `wrangler.toml`, replacing
`REPLACE_WITH_YOUR_DATABASE_ID`.

**3. Load the schema and your existing data into it**
```bash
wrangler d1 execute career_tracker_db --remote --file=./schema.sql
wrangler d1 execute career_tracker_db --remote --file=./seed.sql
```

**4. Set your passcode and a session secret**
```bash
wrangler secret put APP_PASSCODE
# you'll be prompted to type the shared passcode you and Ebunoluwa will use

wrangler secret put APP_SECRET
# type any long random string — this signs login sessions, you'll never need to remember it
```

**5. Deploy**
```bash
wrangler deploy
```
Wrangler prints a URL like `https://career-activity-tracker.<your-subdomain>.workers.dev`.
That's the whole app — open it, pick your name, enter the passcode.

**6. (Optional) Put it on your own domain**
If you already have a domain on Cloudflare, you can attach a custom domain
to the Worker from the Cloudflare dashboard → Workers & Pages → your worker →
Settings → Domains & Routes → Add Custom Domain. No code changes needed.

## Making changes later

- **Add/edit a field across the board:** update the column list in
  `schema.sql` (for new columns, write a small `ALTER TABLE ... ADD COLUMN`
  migration and run it with `wrangler d1 execute ... --remote --command="..."`),
  add it to the matching table's `columns` array in `src/index.js`, and add
  it to that table's `fields` array in `public/app.js`. The three have to
  stay in sync since the Worker only ever reads/writes whitelisted columns.
- **Change the passcode:** `wrangler secret put APP_PASSCODE` again — existing
  logged-in sessions stay valid until they expire (30 days), only new logins
  need the new code.
- **Back up your data any time:**
  ```bash
  wrangler d1 export career_tracker_db --remote --output=backup.sql
  ```

## Local development

```bash
wrangler dev
```
This runs the Worker + a local D1 instance on your machine. Run the schema
and seed commands above without `--remote` first to populate the local copy.
