# 🗺️ Kiro — Roadmap

> *This roadmap keeps Kiro intentionally incremental. Each version is a complete, honest product on its own rather than a partially implemented foundation for a future version.*

---

* **Rule of Scope:** Nothing below V1 is implemented yet. Nothing above V1 should be started before V1 is finished.

---

## 📌 V1 — Local-First Foundation
*(current, on hold)*

**The core promise:** Scan or upload a receipt, read it locally, review it, and export a CSV. No accounts. No cloud. No automation.

### 📥 Input & Capture
*   Camera capture (`getUserMedia`, with graceful fallback)
*   Upload via drag-and-drop / file browse
*   Supported image formats defined and validated
*   File size and image dimension limits
*   Safe filename handling
*   Reject unsupported or malformed files

### ⚡ Local Processing
*   Local OCR (`Tesseract.js`, vendored — not CDN-loaded)
*   Regex/heuristic field extraction:
    *   Merchant
    *   Date
    *   Amount
    *   Tax
    *   Currency
    *   Receipt Number

### 👁️ Review
*   Fully editable review screen
*   User remains in control of all extracted values
*   No automatic submission or export

### 📊 Export
*   CSV export
*   Formula-injection sanitization
*   Export only user-approved data

### 🔒 Privacy & Security
*   No accounts, database, analytics, or cloud sync
*   No third-party document processing
*   Receipt files remain local during processing
*   Processed files can be deleted
*   Temporary processing data should not become a permanent receipt archive

> **Status:** UI and design system complete. Camera, OCR, parser, export, and file-processing safeguards are not yet wired in — see the README’s *Known Limitations* section.

---

## 🎯 V2 — Smarter Extraction
*Still entirely local.*

This version is about making the OCR/parsing layer trustworthy enough that Review becomes a quick glance instead of a full re-check.

*   Smarter parsing for messy or low-quality receipt scans
*   Merchant name cleanup and OCR-noise normalization
*   Better amount, date, tax, and currency detection
*   Confidence indicators surfaced per field (driven by real OCR/extraction results rather than static UI examples)
*   Better overall detection (fewer blank fields and incorrect guesses)

*Note: No cloud services or AI APIs are introduced in V2.*

---

## 🔗 V3 — Connected by Choice
*The first version where data can leave the device — but only if the user explicitly turns it on.*

*   Optional Google Sheets export
*   Optional cloud connections
*   Explicit opt-in for every external integration
*   Clearly scoped permissions & user-visible connection status
*   Ability to disconnect integrations at any time
*   Local-only mode remains fully supported

> **Privacy Boundary:** V1 and V2 remain fully local. V3 introduces external connectivity as an optional capability, not a requirement.

---

## 🤖 V4 — Automation
*For people processing receipts regularly rather than one at a time.*

*   Automation via `n8n` (or a similar workflow tool)
*   Scheduled or batch workflows
*   Monthly reports generated from exported/synced data
*   Automation remains opt-in
*   Local/manual processing remains available

*Automation should extend Kiro’s workflow without replacing the user’s ability to review and control their data.*

---

## 🧠 V5 — Optional Intelligence
*The most capability-heavy version, and the last one currently planned.*

Everything here is optional and sits on top of the local-first foundation, not as a replacement for it.

*   Optional AI-assisted categorization
*   Duplicate receipt detection
*   Smart suggestions:
    *   Recurring merchants
    *   Likely categories
    *   Other useful patterns

*AI should assist the user rather than silently make irreversible decisions.*

---

## 🚫 Explicitly Not Planned for Any Version

Some things are left out on purpose, not by omission:

*   **Login walls or mandatory accounts:** Even V3+ integrations should be opt-in, not gatekept behind sign-up.
*   **Ads or advertising scripts:** No selling/sharing user data or collecting data for behavioral profiling.
*   **Mandatory cloud processing:** Local processing is never optional; Kiro should never require the cloud to perform basic scanning, extraction, review, or export.
*   **Automatic submission:** Never submit without explicit user approval or turn Kiro into a permanently connected service by default.

---

## 🛠️ How This Roadmap Gets Used

Each version’s scope is a **ceiling, not a floor**. It’s fine for a version to ship with less than listed if something needs more design work. What shouldn’t happen is a version quietly picking up scope from the next version before its own work is complete.

*Example: No partial AI categorization sneaking into V2 before V3’s optional-cloud groundwork exists.*

Each version should follow this lifecycle:
`Designed` → `Built` → `Tested` → `Documented` → `Finished` before the next version begins.

---

<p align="center">
  <b>Guiding Principle</b><br>
  <i>Small workflow. Big output. Privacy by default.</i><br>
  <code>Scan → Extract → Review → Approve → Export</code>
</p>
