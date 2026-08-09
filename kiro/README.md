# Kiro

**Less typing. More recording.**

Kiro is a privacy-first receipt scanner. You capture or upload a receipt, it's read entirely inside your browser, you review and correct what it found, and you export a clean CSV — all without a single byte of your receipt ever leaving your device.

> **Status: On hold.** The interactive UI (`index.html`) and the design system (`css/styles.css`) are complete and reviewed. Camera hardware, OCR, the field parser, and CSV export are not yet implemented — see [Known Limitations](#known-limitations) below. This README reflects the project as it stands paused, and will be updated as work resumes.

---

## Overview

Receipt handling for liquidation reports, reimbursements, and expense tracking usually means one of two bad options: type everything out by hand, or hand your financial documents to a cloud service and hope for the best. Kiro exists to remove the typing without asking for that trust.

## The Problem

Manually re-typing merchant names, dates, and totals off a paper receipt is slow, repetitive, and error-prone — especially for anyone processing more than a handful at a time (employees filing liquidation reports, freelancers, consultants, small business owners, students). The tools that promise to automate this usually do it by uploading your receipt images to a server somewhere.

## The Solution

Kiro reads the receipt locally, in the browser, using Tesseract.js. Nothing is uploaded, nothing requires an account, and nothing is exported until you explicitly choose to. OCR assists; you verify. The only thing that ever leaves your device is the CSV file you deliberately download.

## Product Philosophy

- **Local by Default** — OCR and parsing run entirely on-device.
- **Connected by Choice** — Any future integration (Google Sheets, accounting tools) is opt-in and arrives in a later version, never assumed.
- **Privacy by Design** — There is no backend for your data to leak from, because there is no backend.
- **Security by Design** — Least-privilege permissions, camera access only on explicit intent, formula-injection-safe CSV export.
- **OCR assists, humans verify** — Every extracted field is a suggestion, editable, and never exported without your review. If confidence is low, Kiro leaves a field blank rather than guessing.
- **Simple software earns trust** — Every screen has exactly one job.

## Features

- **Scan or Upload** — a dedicated camera capture screen, or drag-and-drop / browse-to-upload, each a distinct, focused experience.
- **Preview before processing** — Retake, Replace Image, or Continue, so nothing gets read by accident.
- **Local OCR with honest progress** — a plain-language checklist (*Reading receipt → Recognizing text → Finding important information → Preparing review*) instead of an anonymous spinner.
- **Fully editable review screen** — Merchant, Date, Amount, Tax, Currency, Receipt Number, and Notes, grouped into Receipt Details and Extracted Fields, each with Reset/Clear actions and a confidence legend (🟢 high confidence / 🟡 needs review).
- **CSV export** — the only way data leaves the device, and only when you tap the button.
- **An interactive "On-device" privacy badge** on every relevant screen, expanding into a plain-language explanation of what stays local and why.
- **Google Sheets — disabled**, clearly labeled "Coming in Version 3," rather than pretending to work.

## Screenshots

*(placeholder — screenshots will be added here once the project resumes)*

---

## Privacy Philosophy

Privacy in Kiro isn't a settings toggle — it's architectural. Version 1 has no backend, no database, no user accounts, no authentication, no analytics, and no tracking cookies. There is nothing to configure because there is nothing collecting data in the first place.

- Camera permission is requested only on an explicit "Scan Receipt" tap — never on page load.
- Receipt images are never uploaded and never stored.
- Extracted information is never transmitted over the network.
- Nothing persists after the tab is closed — no `localStorage`, no `IndexedDB`, no cookies.
- The only network activity the page makes at all is loading its own static assets (and, in the sandbox build, fetching the Tesseract.js library itself — see [Known Limitations](#known-limitations)).

## Security Decisions

| Concern | Decision |
|---|---|
| Camera permission | Requested only on explicit "Scan Receipt" tap, with automatic fallback to a file input if denied or unavailable |
| File validation | Uploaded files are checked before being handed to OCR; unsupported formats are rejected with a clear message |
| OCR assets | Planned to be vendored locally under `/vendor/tesseract/` rather than fetched from a CDN, so the deployed app has no runtime third-party dependency |
| CSV injection | Every exported string value is sanitized: values starting with `=`, `+`, `-`, `@`, tab, or carriage return are single-quote-escaped |
| Memory hygiene | `URL.revokeObjectURL()` on every image replace/clear; camera tracks stopped immediately after capture |
| DOM manipulation | No unsanitized `innerHTML`; text content set via safe DOM APIs |
| Data retention | Nothing survives a closed tab or a "Process Another" tap |

## Architecture

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

No step reaches a server. The full data-flow story, screen-by-screen behavior, and the security model are documented in detail in [`docs/blueprint.md`](docs/blueprint.md).

## Tech Stack

- HTML5, CSS3, vanilla JavaScript — no framework, no build step, no npm requirement to run the app.
- [Tesseract.js](https://github.com/naptha/tesseract.js) for local, in-browser OCR (planned to be vendored, not CDN-loaded, for the production build).
- No paid APIs, no backend, no database.
- Deployable as static files on GitHub Pages or Vercel, served over HTTPS (required for `getUserMedia`).

## Folder Structure

```
kiro/
├── index.html          — the full interactive UI (navigation flow complete; OCR mocked)
├── README.md            — this file
├── LICENSE
│
├── css/
│   └── styles.css       — the design system: tokens, components, screens
│
├── js/                   — planned module split (not yet implemented):
│   ├── app.js             screen flow coordination
│   ├── ui.js               view transitions, toasts
│   ├── camera.js            getUserMedia lifecycle
│   ├── upload.js             file input + drag & drop
│   ├── ocr.js                Tesseract worker setup
│   ├── parser.js             regex/heuristic field extraction
│   ├── export.js             CSV generation + sanitization
│   ├── privacy.js            privacy card / popover state
│   └── utils.js              shared helpers
│
├── vendor/
│   └── tesseract/        — reserved for the local Tesseract worker/wasm/traineddata
│
├── assets/
│   ├── logo.svg
│   ├── icons/
│   └── screenshots/
│
└── docs/
    ├── blueprint.md      — the full product & architecture spec
    ├── roadmap.md        — V2+ ideas (not built)
    └── decisions.md      — architectural decision log
```

## Installation

Kiro has no dependencies to install and no build step. Clone the repo and open `index.html` in a browser, or serve the folder with any static file server:

```bash
git clone <this-repo-url>
cd kiro
python3 -m http.server 8000
# then open http://localhost:8000
```

A local server (rather than opening `index.html` directly via `file://`) is recommended once camera support is implemented, since `getUserMedia` requires a secure context (HTTPS or `localhost`).

## Deployment

Kiro is a static site — deploy it as-is to:

- **GitHub Pages** — enable Pages on this repo, pointing at the root or a `docs/`-style output branch.
- **Vercel** — import the repo with no build command and no output directory override; it's served as-is.

Either option gives you HTTPS by default, which is required for camera access in production.

## Roadmap

Version 1 is meant to be a complete, honest product on its own — not a stub waiting for a backend.

- **V2** — smarter parsing, merchant cleanup, confidence indicators, better detection
- **V3** — optional Google Sheets integration, optional cloud connections
- **V4** — automation (n8n), monthly reports
- **V5** — optional AI assistance, categorization, duplicate detection

See [`docs/roadmap.md`](docs/roadmap.md) for more detail as it's fleshed out.

## Known Limitations

Since the project is currently on hold, these are open rather than finished:

- **Camera capture is simulated.** The Scan screen shows a realistic camera UI (crop guide, corner guides, flash animation) but does not yet call `navigator.mediaDevices.getUserMedia()`.
- **OCR is mocked.** The Processing screen's checklist and progress bar are simulated; no image is actually run through Tesseract.js in `index.html`. A separate functional sandbox build (outside this repo structure) exercises real Tesseract.js OCR with regex-based field parsing, but that logic hasn't been ported into the modular `js/` structure yet.
- **CSV export is mocked.** The Export screen's "Download CSV" button simulates the action; no file is actually written yet.
- **The `js/` modules don't exist yet.** `app.js`, `camera.js`, `upload.js`, `ocr.js`, `parser.js`, `export.js`, `privacy.js`, and `utils.js` are specified in the blueprint and folder structure but not yet written.
- **`vendor/tesseract/` is empty.** The local Tesseract worker, WebAssembly core, and `eng.traineddata` still need to be downloaded and vendored in before OCR can run without a CDN dependency.
- **No automated tests.**

## Future Versions

See [Roadmap](#roadmap) above and [`docs/roadmap.md`](docs/roadmap.md).

## License

See [`LICENSE`](LICENSE).
