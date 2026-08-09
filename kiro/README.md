# 🧾 Kiro

> **Less typing. More recording.**
> 
> Kiro is a privacy-first receipt scanner designed to read receipts locally in the browser, let you review and correct what it finds, and export a clean CSV — without sending receipt data to a backend.

<p align="center">
  <img src="assets/kiro-banner.svg" alt="Kiro Banner" width="100%">
</p>

---

> **Status: On hold.**  
> The interactive UI (`index.html`) and the design system (`css/styles.css`) are complete and reviewed. Camera hardware, OCR, the field parser, and CSV export are not yet implemented — see *Known Limitations* below. This README reflects the project as it stands paused, and will be updated as work resumes.

---

### 📌 Overview

Receipt handling for liquidation reports, reimbursements, and expense tracking usually means one of two bad options: type everything out by hand, or hand your financial documents to a cloud service and hope for the best. Kiro exists to remove the typing without asking for that trust.

#### 🎯 The Problem
Manually re-typing merchant names, dates, and totals off a paper receipt is slow, repetitive, and error-prone — especially for anyone processing more than a handful at a time (employees filing liquidation reports, freelancers, consultants, small business owners, students). 

The tools that promise to automate this often do it by uploading receipt images to a server somewhere.

#### 💡 The Solution
Kiro is designed to read receipts locally, in the browser, using Tesseract.js. Nothing requires an account, and nothing is exported until you explicitly choose to.

* **OCR assists; you verify.**
* The only thing that leaves your device in the local-first V1 workflow is the CSV file you deliberately download.

---

### 🎨 Product Philosophy

* **Local by Default** — OCR and parsing run entirely on-device.
* **Connected by Choice** — Any future integration (Google Sheets, accounting tools) is opt-in and arrives in a later version, never assumed.
* **Privacy by Design** — There is no backend for receipt data to leak from, because there is no backend.
* **Security by Design** — Least-privilege permissions, camera access only on explicit intent, validated file input, safe DOM handling, and formula-injection-safe CSV export.
* **OCR assists, humans verify** — Every extracted field is a suggestion, editable, and never exported without user approval. If confidence is low, Kiro leaves a field blank rather than guessing.
* **Simple software earns trust** — Every screen has exactly one job.

---

### 🛠️ Features

* **Scan or Upload** — A dedicated camera capture screen, or drag-and-drop / browse-to-upload, each a distinct, focused experience.
* **Preview before processing** — Retake, Replace Image, or Continue, so nothing is read by accident.
* **Local OCR with honest progress** — A plain-language checklist (*Reading receipt → Recognizing text → Finding important information → Preparing review*) instead of an anonymous spinner.
* **Fully editable review screen** — Merchant, Date, Amount, Tax, Currency, Receipt Number, and Notes, grouped into Receipt Details and Extracted Fields, each with Reset/Clear actions and a confidence legend (🟢 high confidence / 🟡 needs review).
* **CSV export** — The only way data leaves the device in V1, and only when you tap the button after reviewing the extracted information.
* **On-device privacy badge** — An interactive privacy badge on every relevant screen, expanding into a plain-language explanation of what stays local and why.
* **Google Sheets — disabled** — Clearly labeled “Coming in Version 3,” rather than pretending to work.

---

### 🖼️ Screenshots

*(placeholder — screenshots will be added here once the project resumes)*

---

### 🔒 Privacy Philosophy

Privacy in Kiro isn’t a settings toggle — it’s architectural.

* **Version 1 has no backend**, no database, no user accounts, no authentication, no analytics, and no tracking cookies. There is nothing to configure because there is nothing collecting data in the first place.
* **Camera permission** is requested only on an explicit “Scan Receipt” tap — never on page load.
* **Receipt images** are never uploaded and never intentionally persisted.
* **Extracted information** is never transmitted over the network during local processing.
* **Nothing persists** after the tab is closed — no `localStorage`, no `IndexedDB`, no cookies.
* Processed receipt data is not retained as a permanent local archive.
* In the intended V1 architecture, receipt processing does not require a network connection. Static application assets are served normally; `Tesseract.js` will be vendored locally rather than fetched from a CDN.

---

### 🛡️ Security Decisions

| Concern | Decision |
| :--- | :--- |
| **Camera permission** | Requested only on explicit “Scan Receipt” tap, with automatic fallback to a file input if denied or unavailable |
| **File validation** | Validate MIME type, extension, file size, and image dimensions before OCR; reject unsupported or malformed files |
| **File names** | Uploaded filenames are never trusted or used directly for internal storage |
| **OCR assets** | Planned to be vendored locally under `/vendor/tesseract/` rather than fetched from a CDN, so the deployed app has no runtime third-party OCR dependency |
| **CSV injection** | Every exported string value is sanitized: values starting with `=`, `+`, `-`, `@`, tab, or carriage return are single-quote-escaped |
| **Memory hygiene** | `URL.revokeObjectURL()` on every image replace/clear; camera tracks stopped immediately after capture |
| **DOM manipulation** | No unsanitized `innerHTML`; text content set via safe DOM APIs |
| **Data retention** | Nothing survives a closed tab or a “Process Another” tap |
| **User approval** | Extracted values remain editable and are never exported until explicitly approved by the user |

---

### 📐 Architecture

```text
Welcome
  ↓
Scan Receipt or Upload Receipt
  ↓
Preview (Retake / Replace Image / Continue)
  ↓
Local OCR
  ↓
Field Extraction
  ↓
Review (editable fields)
  ↓
User Approval
  ↓
Generate CSV
  ↓
Download CSV
  ↓
Success

### 📐 Architecture

```text
Welcome
  ↓
Scan Receipt or Upload Receipt
  ↓
Preview (Retake / Replace Image / Continue)
  ↓
Local OCR
  ↓
Field Extraction
  ↓
Review (editable fields)
  ↓
User Approval
  ↓
Generate CSV
  ↓
Download CSV
  ↓
Success
```

> No step reaches a server during the local-first V1 workflow.  
> The full data-flow story, screen-by-screen behavior, and security model are documented in detail in [`docs/blueprint.md`](docs/blueprint.md).

---

### 📂 Folder Structure

```text
kiro/
├── index.html              — the full interactive UI (navigation flow complete; OCR mocked)
├── README.md               — this file
├── LICENSE
│
├── css/
│   └── styles.css          — the design system: tokens, components, screens
│
├── js/                     — planned module split (not yet implemented):
│   ├── app.js              — screen flow coordination
│   ├── ui.js               — view transitions, toasts
│   ├── camera.js           — getUserMedia lifecycle
│   ├── upload.js           — file input + drag & drop
│   ├── ocr.js              — Tesseract worker setup
│   ├── parser.js           — regex/heuristic field extraction
│   ├── export.js           — CSV generation + sanitization
│   ├── privacy.js          — privacy card / popover state
│   └── utils.js            — shared helpers
│
├── vendor/
│   └── tesseract/          — reserved for the local Tesseract worker/wasm/traineddata
│
├── assets/
│   ├── logo.svg
│   ├── icons/
│   └── screenshots/
│
└── docs/
    ├── blueprint.md        — the full product & architecture spec
    ├── roadmap.md          — V2+ ideas (not built)
    └── decisions.md        — architectural decision log
```

---

### 🚀 Installation

Kiro has no dependencies to install and no build step.

Clone the repo and open `index.html` in a browser, or serve the folder with any static file server:

```bash
git clone <this-repo-url>
cd kiro
python3 -m http.server 8000
# then open http://localhost:8000
```

> *Note: A local server (rather than opening `index.html` directly via `file://`) is recommended once camera support is implemented, since `getUserMedia` requires a secure context (HTTPS or localhost).*

---

### 🌐 Deployment

Kiro is a static site — deploy it as-is to:

* **GitHub Pages** — enable Pages on this repo, pointing at the root or a `docs/`-style output branch.
* **Vercel** — import the repo with no build command and no output directory override; it’s served as-is.

Either option gives you HTTPS by default, which is required for camera access in production.

---

### 🗺️ Roadmap

Each version is a complete, honest product on its own rather than a partially implemented foundation for a future version:

* **V1 — Local-First Foundation** — local OCR, deterministic extraction, review, validation, and CSV export.
* **V2 — Smarter Extraction** — smarter parsing, merchant cleanup, confidence indicators, and better detection.
* **V3 — Connected by Choice** — optional Google Sheets integration and optional cloud connections.
* **V4 — Automation** — optional workflow automation via n8n and monthly reports.
* **V5 — Optional Intelligence** — optional AI assistance, categorization, duplicate detection, and smart suggestions.

See [`docs/roadmap.md`](docs/roadmap.md) for the detailed scope and version boundaries.

---

### ⚠️ Known Limitations

Since the project is currently on hold, these are open rather than finished:

1. **Camera capture is simulated.** The Scan screen shows a realistic camera UI (crop guide, corner guides, flash animation) but does not yet call `navigator.mediaDevices.getUserMedia()`.
2. **OCR is mocked.** The Processing screen’s checklist and progress bar are simulated; no image is actually run through Tesseract.js in `index.html`.
3. **CSV export is mocked.** The Export screen’s “Download CSV” button simulates the action; no file is actually written yet.
4. **The `js/` modules don’t exist yet.** `app.js`, `camera.js`, `upload.js`, `ocr.js`, `parser.js`, `export.js`, `privacy.js`, and `utils.js` are specified in the blueprint and folder structure but not yet written.
5. **`vendor/tesseract/` is empty.** The local Tesseract worker, WebAssembly core, and `eng.traineddata` still need to be downloaded and vendored in.
6. **No automated tests.**
7. **Security controls** described above are design requirements for V1. File validation, safe filename handling, CSV sanitization, and memory cleanup are not yet fully implemented in the paused build.

---

### 📄 License

See [LICENSE](LICENSE).
