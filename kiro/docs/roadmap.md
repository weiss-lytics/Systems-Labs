# Kiro — Roadmap

This roadmap exists to keep Kiro from becoming a stub waiting for a backend. Each version is meant to be a complete, honest product on its own — nothing here is half-built "just in case" ahead of its version.

Nothing below V1 is implemented yet. Nothing above V1 should be started before V1 is finished.

---

## V1 — Local-First Foundation *(current, on hold)*

The core promise: scan or upload a receipt, read it locally, review it, export a CSV. No accounts, no cloud, no automation.

- Camera capture (`getUserMedia`, with graceful fallback)
- Upload via drag-and-drop / file browse
- Local OCR (Tesseract.js, vendored — not CDN-loaded)
- Regex/heuristic field extraction (Merchant, Date, Amount, Tax, Currency, Receipt Number)
- Fully editable review screen
- CSV export with formula-injection sanitization
- No accounts, no database, no analytics, no cloud sync

**Status:** UI and design system complete. Camera, OCR, parser, and export are not yet wired in — see the README's Known Limitations section.

---

## V2 — Smarter Extraction

Still entirely local. This version is about making the OCR/parsing layer trustworthy enough that Review becomes a quick glance instead of a full re-check.

- Smarter parsing (better handling of messy or low-quality receipt scans)
- Merchant name cleanup (normalizing OCR noise into a clean, recognizable name)
- Confidence indicators surfaced per field, driven by real OCR confidence scores rather than the static example used in V1's UI
- Better detection overall — fewer blank fields, fewer wrong guesses

---

## V3 — Connected by Choice

The first version where data can leave the device — but only if the user explicitly turns it on.

- Optional Google Sheets export (the "Coming in Version 3" button from V1 becomes real)
- Optional cloud connections, opt-in and clearly scoped
- Local-only mode remains fully supported — connecting an integration is never required

---

## V4 — Automation

For people processing receipts regularly rather than one at a time.

- Automation via n8n (or a similar workflow tool)
- Monthly reports generated from exported/synced data

---

## V5 — Optional Intelligence

The most capability-heavy version, and the last one currently planned. Everything here is optional and sits on top of the local-first foundation, not a replacement for it.

- Optional AI-assisted categorization
- Duplicate receipt detection
- Smart suggestions (e.g. recurring merchants, likely categories)

---

## Explicitly Not Planned for Any Version Above

Some things are left out on purpose, not by omission:

- Login walls or mandatory accounts — even V3+'s integrations should be opt-in, not gatekept behind sign-up
- Ads or advertising scripts
- Selling or sharing user data — there is no user data collected to sell
- Making local processing optional — Kiro should never require the cloud to do basic scanning and export, even after V3 introduces connected features

---

## How This Roadmap Gets Used

Each version's scope is a ceiling, not a floor — it's fine for a version to ship with less than listed here if something needs more design work. What shouldn't happen is a version quietly picking up scope from the *next* version before its own is done (e.g. no partial AI categorization sneaking into V2 before V3's optional-cloud groundwork exists).
