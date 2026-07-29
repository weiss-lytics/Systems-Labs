# Kiro — Product & Architecture Blueprint

**Version:** 1.0
**Status:** Foundation (pre-implementation)
**Tagline:** Less typing. More recording.

This document is the source of truth for what Kiro V1 is, why it's built
the way it is, and how its pieces fit together. Every implementation
decision in this repo should be traceable back to something written here.

---

## 1. Mission

Kiro removes repetitive manual data entry from receipt handling —
liquidation reports, reimbursements, expense tracking — without asking
the user to trust a cloud service with their financial documents.

Kiro should feel: **calm, trustworthy, minimal, fast, effortless.**

---

## 2. Product Philosophy

- **Local by Default** — OCR and parsing run entirely inside the
  browser. No receipt image or extracted data is ever transmitted.
- **Connected by Choice** — Any future integration (Google Sheets,
  accounting tools) is opt-in and arrives in a later version. V1 has
  none of it.
- **Privacy by Design** — Privacy isn't a checkbox in a settings menu;
  it's an architectural property. There is no backend to leak from.
- **Security by Design** — Least-privilege permissions, camera access
  only on explicit intent, formula-injection-safe CSV export, no
  unsafe DOM manipulation.
- **OCR assists, humans verify** — Extracted fields are suggestions.
  Nothing is exported without the user reviewing and confirming it.
  If confidence is low, Kiro leaves a field blank rather than guessing.
- **Simple software earns trust** — Every screen has exactly one job.

---

## 3. Scope — Version 1 Only

**In scope:**
Camera capture, image upload, drag & drop, local OCR (Tesseract.js),
regex/heuristic field extraction, an editable review screen, and CSV
export.

**Explicitly out of scope for V1** (do not implement):
Google Sheets integration, any AI/cloud API, cloud sync, automation,
user accounts, authentication, a database, analytics, or advertising
scripts. A disabled "Google Sheets — Coming in Version 3" button is
the only trace of this in the UI.

---

## 4. Application Flow

```
Welcome
  ↓
Scan Receipt  or  Upload Receipt
  ↓
Preview (Retake / Replace Image / Continue)
  ↓
Local OCR
  ↓
Review (editable fields)
  ↓
Download CSV
  ↓
Success
```

Each screen is a single, focused step. There is no navigation menu,
no dashboard, and no way to end up somewhere without a clear reason.

---

## 5. Screen-by-Screen Behavior

### 5.1 Welcome / Home
- Logo, tagline, one-line description.
- Two primary actions: **Scan Receipt**, **Upload Receipt**.
- A **Privacy Card** (🔒 Privacy First) listing: OCR runs locally, no
  uploads, no accounts, no tracking, export only when you choose.
- A collapsible **"How Kiro Protects Your Privacy"** panel explaining
  the data path in plain language: *Receipt → Your Browser → OCR →
  Review → CSV. No servers.*
- No permissions are requested on this screen. Camera access is only
  requested the moment the user taps Scan Receipt.

### 5.2 Capture / Upload / Preview
- Camera: `getUserMedia({ video: { facingMode: 'environment' } })`.
  If unavailable or denied, automatically fall back to
  `<input type="file" accept="image/*" capture="environment">` with a
  friendly explanation — never a dead end.
- Upload: click-to-browse and drag & drop, restricted to PNG/JPG/JPEG.
  Files are validated (MIME type + basic signature check) before
  being handed to OCR; unsupported files are rejected with a clear
  message, not a silent failure.
- Preview screen offers **Retake**, **Replace Image**, and
  **Continue**. Whenever an image is replaced or cleared,
  `URL.revokeObjectURL()` is called on the previous object URL to
  avoid leaking browser memory.
- As soon as a photo is captured (or the user leaves the camera view),
  every active track on the camera stream is stopped:
  `stream.getTracks().forEach(track => track.stop())`.

### 5.3 Local OCR
- Tesseract.js runs entirely in-browser. Worker scripts, the
  WebAssembly core, and `eng.traineddata` are loaded from
  `/vendor/tesseract/` — never fetched from a CDN at runtime — so the
  app has no third-party network dependency once deployed.
- Progress is communicated with plain language, not a bare spinner:
  *Reading receipt… → Recognizing text… → Finding important
  information… → Preparing review…*
- The UI thread is never blocked; OCR runs via the Tesseract worker.

### 5.4 Review
- Split layout: receipt preview on one side, editable form on the
  other (stacks vertically on narrow viewports).
- Fields: Merchant, Date, Amount, Tax, Currency, Receipt Number,
  Notes. Every field is a real editable input — nothing read-only.
- A **🔒 Processed Locally** badge is always visible on this screen.
- Fields the parser filled with low confidence are highlighted subtly
  in amber — a nudge to double-check, not an accusation.
- Each field offers **Reset Field** (back to the OCR-suggested value)
  and **Clear Field** (blank it out).

### 5.5 Export
- **Download CSV** generates the file locally via Blob + anchor
  download. Columns: Merchant, Date, Amount, Tax, Currency, Receipt
  Number, Notes.
- Every string value is sanitized against CSV/formula injection:
  values starting with `=`, `+`, `-`, `@`, tab, or carriage return are
  prefixed with a single quote before being written.
- A disabled **Google Sheets — Coming in Version 3** button
  communicates the roadmap without pretending it works today.
- After a successful download, OCR results and image previews are
  cleared from memory (state reset, object URLs revoked).

### 5.6 Success
- Large checkmark, "Safely Recorded."
- *"Your receipt was processed locally. Kiro never kept a copy."*
- **Process Another Receipt** and **Download Again** (re-triggers the
  last CSV generation from the in-memory result, before it's cleared).

---

## 6. Security Model

| Concern | Decision |
|---|---|
| Camera permission | Requested only on explicit "Scan Receipt" tap — never on load |
| Permission denial | Falls back to file input automatically, no dead end |
| File validation | MIME type + extension check before handing to OCR; unsupported formats rejected with a clear message |
| OCR assets | Served from `/vendor/tesseract/`, not a CDN — no runtime third-party dependency |
| Network calls | None. The app makes zero network requests after initial page load |
| CSV injection | Formula-prefix characters (`= + - @` and tab/CR) are single-quote-escaped |
| Memory hygiene | `URL.revokeObjectURL()` on every image replace/clear; camera tracks stopped immediately after capture |
| DOM manipulation | No `innerHTML` with unsanitized input; text content set via safe DOM APIs |
| Data retention | Nothing persists after the tab is closed or "Process Another" is tapped — no localStorage, no IndexedDB, no cookies |

---

## 7. Tech Stack

- HTML5, CSS3, vanilla JavaScript (ES Modules) — no framework, no
  build step, no npm requirement to run the app.
- Tesseract.js, vendored locally under `/vendor/tesseract/` (worker,
  wasm core, `eng.traineddata`) so OCR has no external dependency at
  runtime.
- No paid APIs, no backend, no database.
- Deployable as static files on GitHub Pages or Vercel, served over
  HTTPS (required for `getUserMedia` in production).

---

## 8. Folder Structure

```
kiro/
├── index.html
├── README.md
├── LICENSE
│
├── css/
│   └── styles.css
│
├── js/
│   ├── app.js        — wires modules together, owns the screen flow
│   ├── ui.js          — view transitions, DOM helpers, toasts
│   ├── camera.js       — getUserMedia lifecycle, capture, cleanup
│   ├── upload.js       — file input + drag & drop, validation
│   ├── ocr.js          — Tesseract worker setup and progress events
│   ├── parser.js       — regex/heuristic field extraction
│   ├── export.js       — CSV generation + formula-injection sanitization
│   ├── privacy.js       — privacy card copy + collapsible explainer state
│   └── utils.js        — shared helpers (formatting, small utilities)
│
├── vendor/
│   └── tesseract/      — local worker, wasm core, eng.traineddata
│
├── assets/
│   ├── logo.svg
│   ├── icons/
│   └── screenshots/
│
└── docs/
    ├── blueprint.md    — this file
    ├── roadmap.md      — V2+ ideas, explicitly not built yet
    └── decisions.md    — short log of notable architectural decisions
```

Each `js/` module has one responsibility and does not reach into
another module's internals — `app.js` is the only file that imports
and coordinates the others.

---

## 9. Roadmap Boundary

Version 1 is a complete, honest product on its own — not a stub
waiting for a backend. Anything below this line does not exist yet
and should not be partially implemented "just in case":

- V2: smarter parsing, merchant cleanup, confidence indicators
- V3: optional Google Sheets, optional cloud connections
- V4: automation (n8n), reports
- V5: optional AI assistance, categorization, duplicate detection

---

## 10. Definition of Done for V1

A user can open the deployed page, scan or upload a receipt, watch it
get read locally, correct anything OCR got wrong, download a CSV, and
close the tab — having sent zero bytes about that receipt anywhere.
