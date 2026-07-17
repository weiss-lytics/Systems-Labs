# 🌸 Kiri

**Clear the mist. Build the vision.**

Kiri is a personal ideation tool that turns messy, stream-of-consciousness notes into clean, structured documentation and visual blueprints — built for solo builders who think faster than they organize.

> *"A beautiful place where ideas go to grow up."*

📱 **[Try the interactive prototype →](./kiri-prototype.html)**
📐 **[View the wireframes & design rationale →](./kiri-wireframes.html)**

<!--
  📸 ADD HERO SCREENSHOT OR GIF HERE
  Recommended: a short GIF showing Dump → Structure → Blueprint in one flow
  ![Kiri walkthrough](./assets/kiri-demo.gif)
-->

---

## What's in this repo

This project is documented across three connected pieces — read in this order for the full picture:

| | File | What it shows |
|---|---|---|
| **1** | [`kiri-wireframes.html`](./kiri-wireframes.html) | Low-fidelity wireframes with embedded design rationale — the *why* behind every screen, before any real UI existed |
| **2** | [`kiri-prototype.html`](./kiri-prototype.html) | A clickable, stateful prototype — the *how it actually works*, built to test the flow on real devices |
| **3** | This README | The *what and why* — problem, process, and roadmap, tying the other two together |

Each file is fully self-contained (open it directly in a browser, no install needed) — so a recruiter or hiring manager can click through the actual thinking and the actual product in under five minutes.

---

## The Problem

I take notes constantly — in Apple Notes, mid-walk, mid-thought — but most of those ideas never go anywhere. Either I forget them, or I find them weeks later and can't reconstruct what I meant. Writing full documentation for a half-formed idea feels like overkill, and reading someone else's (or my own) wall of text later is something I'll always procrastinate on.

I wanted something in between: faster than a doc, clearer than a note.

## The Idea

Kiri sits between a notes app and a documentation tool. You dump your raw, unfiltered thoughts. AI organizes them into clean, scannable sections. Then it generates a visual blueprint — a diagram you can screenshot, reference, and actually want to look back at.

```
🌱 Dump  →  ✨ Structure  →  📐 Blueprint  →  🗂 Vault
```

No full tech docs. No blank-page pressure. Just enough structure to start building.

<!--
  📸 ADD FLOW DIAGRAM OR SCREENSHOT HERE
  ![Core flow](./assets/core-flow.png)
-->

---

## Features

- **Brain dump** — a frictionless text input with no required fields, structure, or formatting
- **Rich input toolbar** — attach voice notes, images, links, and code snippets to a dump
- **AI structuring** — converts raw notes into organized sections (Overview, Features, Tech Direction, Challenges, Future Ideas)
- **Visual blueprint generation** — turns structured notes into a clean, node-based diagram
- **Idea vault** — a searchable, filterable archive of every blueprint you've created
- **Export** — download any blueprint as PNG, JPG, or PDF
- **Dark mode** — full light/dark theming, persisted across sessions

<!--
  📸 ADD FEATURE SCREENSHOTS HERE
  ![Dump screen](./assets/dump-screen.png)
  ![Blueprint view](./assets/blueprint-view.png)
  ![Vault](./assets/vault.png)
-->

---

## Design Process

This prototype went through a few real iterations before landing where it is:

1. **Ideation & blueprinting** — I used Kiri's own concept (dump → structure → blueprint) to scope Kiri itself before writing any code. The product's philosophy proved itself out on day one.
2. **Low-fidelity wireframes** — see [`kiri-wireframes.html`](./kiri-wireframes.html) — built a separate wireframe document to think through information architecture, user flows, and design rationale before touching real UI. Every screen includes sticky-note annotations explaining the reasoning behind each decision.
3. **Interactive prototype** — see [`kiri-prototype.html`](./kiri-prototype.html) — built a clickable, stateful HTML/CSS/JS prototype to validate the core loop felt right on mobile before committing to a real stack.
4. **Iteration from use** — testing the prototype surfaced real gaps (a missing download button, an awkward "See all" link) that shaped the next round of changes.

I'm intentionally building this for myself first. If I don't reach for it daily, that's a signal worth listening to before shipping it to anyone else.

<!--
  📸 ADD WIREFRAME / PROCESS SCREENSHOTS HERE
  ![Wireframe board](./assets/wireframes.png)
-->

---

## Design Language

Kiri's visual identity is intentionally not another cold developer tool:

| | |
|---|---|
| **Aesthetic** | Editorial structure with soft, kawaii-leaning warmth |
| **Palette** | Cream, dusty rose, lavender, charcoal |
| **Typography** | Playfair Display (serif headlines) · DM Sans (body/UI) · DM Mono (tags/labels) |
| **Tone** | Calm, intentional, a little playful — built by a woman in tech who didn't want her own tool to feel boring |

---

## Tech Stack

This prototype is a **single self-contained HTML file** — vanilla HTML, CSS, and JavaScript, no frameworks, no build step, no dependencies. It runs by opening the file directly in a browser.

```
Frontend       Vanilla HTML / CSS / JavaScript
Persistence    In-memory state (prototype) → localStorage planned for v3
Export         Canvas API (PNG/JPG), client-side rendering
```

**Planned production stack (post-validation):**

```
Frontend       Next.js + Tailwind CSS
AI             Claude API
Database       Supabase
Hosting        Vercel
```

I chose to prototype in plain HTML/CSS/JS first specifically to validate UX flow and interaction design without the overhead of a framework — the goal was speed of iteration, not production architecture.

---

## Roadmap

- [x] **v1** — Core loop: dump → structure → blueprint → vault, mobile-friendly, single user
- [x] **v2** — Dark mode, rich input toolbar (voice/image/link/code), navigation polish
- [ ] **v3** — Real AI integration (Claude API), blueprint visual themes (blueprint-style, whiteboard, cyberpunk), voice transcription
- [ ] **v4** — Onboarding, multi-user accounts, public sharing
- [ ] **v5** — Collaboration, public blueprint gallery, community features

---

## Running Locally

No installation required — both files are fully self-contained.

```bash
git clone https://github.com/your-username/kiri.git
cd kiri

open kiri-wireframes.html   # design rationale & wireframes
open kiri-prototype.html    # interactive prototype
```

---

## Why I Built This

I wanted a tool that matched how my brain actually works — fast, nonlinear, allergic to long documentation — and I wanted to prove out the idea by using it myself before asking anyone else to. This repo is that proof of work: from raw concept, through wireframes, to a working interactive prototype.

---

Designed & built by Weiss 💟
