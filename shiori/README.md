# 栞 Shiori

<p align="center">
  <img src="./assets/shiori-hero.svg" alt="Shiori: a task card moves from Inbox to In Progress to Done, completing a checklist and filling a progress ring along the way." width="100%">
</p>

**One task at a time.**

 Shiori (栞) is the Japanese word for a bookmark — something small that quietly holds your place so you can pick up right where you left off, without pressure. That’s the whole idea behind this app: a personal Kanban board that doesn’t shout at you.

---

Most productivity tools are built to make you feel behind. Dense grids, notification badges, streak guilt, a hundred features you never asked for. 

Shiori is the opposite bet — a calm workspace that only ever asks one question: **What should I work on next?**

There’s no login, no server, no account, no sync service quietly farming your data. It’s a single HTML file. You open it, you use it, it remembers everything on your own machine, and that’s the entire product.

---

### 🌿 Philosophy

* **Peaceful over powerful.** If a feature would make the interface feel busier, it’s probably not going in.
* **Yours, entirely.** No backend, no telemetry, no dependency on anyone else’s servers staying up. Your tasks live in your browser’s storage, on your device, full stop.
* **Calm interface, fast thinking.** Muted colors, restrained motion, soft edges — the app should never compete for attention with the work itself.
* **One next action.** Every task can hold a single “next action” — because the hardest part of a task is rarely the whole thing, it’s knowing the very next step.
* **Capture automatically. Move predictably. Suggest gently. Never surprise.** Shiori’s automation — auto-start, auto-complete, and reopening — only ever saves clicks. It never rewrites your data, never blocks a manual override, and never guesses at something you didn’t already tell it.

---

### 🛠️ Features

#### 📋 Board
* **Six columns:** Inbox → Backlog → Ready Next → In Progress → Paused → Completed
* Drag and drop between columns, collapsible columns, and pinned tasks
* Priority shown as a soft color accent, never a loud badge
* Subtle date labels on cards (*Due today*, *Due tomorrow*, *Overdue · 2d*) — never a loud badge and never changes a task’s status on its own

#### ⚡ Smart Lifecycle
Shiori quietly handles task housekeeping so you don’t have to:
* Checking the first checklist item automatically moves the task to **In Progress**
* Checking the last checklist item automatically moves the task to **Completed**, with a `completedAt` timestamp
* Reopening a Completed task restores it to wherever it actually was before — never dumped back to Inbox
* A lightweight history log on every task records what changed and when — created, moved, completed, reopened, and checklist/priority/due-date changes
* Automation is undoable, never blocks a manual move, and only saves clicks without taking away control

#### 🗂️ Task Panel
* Slides in from the side instead of popping up over your work
* Title, description, priority, status, due date, tags, and next action
* Checklist with drag-to-reorder and automatic progress tracking
* **Tag autocomplete:** Suggests tags you’ve already used elsewhere, so `design` and `Design` don’t quietly become two different tags
* Freeform notes, linked resources, and a running history of what changed and when
* A gentle, skippable “What’s the next action?” prompt appears when a task moves from Backlog to Ready Next with no next action set yet — never blocks the move

#### 📊 Dashboard
* A single **Today** list merging what’s due, what’s overdue, and what has a next action queued
* Answers “What should I work on next?” in one glance instead of six
* In Progress, Paused, and Completed Today at a glance
* A single circular progress indicator instead of a dozen charts
* A rotating, quiet reminder that it’s fine to take a tea break

#### 📝 Notes
* Simple, auto-saving freeform notes with lightweight Markdown-style formatting
* No separate save button, ever
* Optionally link a note to a task; a small chip takes you straight to that task’s panel

#### 🔍 Search & Filters
* Instant search across titles, descriptions, notes, checklists, and tags
* Filter by priority, tag, due today, this week, or completed
* A search or filter with no matches clearly reads as “no matches”, never “no tasks”

#### 🔒 Data
* Everything saves automatically to `localStorage`
* Export the whole thing to JSON, import it back, or reset entirely
* Undo on delete, column moves, and clearing completed tasks — nothing is permanently gone by accident
* Old saved data is migrated safely and silently — nothing is lost when Shiori adds new fields under the hood

---

### ⌨️ Keyboard Shortcuts

| Key | Action |
| :--- | :--- |
| <kbd>N</kbd> | New task (quick add) |
| <kbd>/</kbd> | Focus search |
| <kbd>Esc</kbd> | Close panel / quick add |
| <kbd>⌘</kbd>/<kbd>Ctrl</kbd> + <kbd>S</kbd> | Export data |
| <kbd>Space</kbd> | Toggle a focused checklist item |

---

### 🚀 Getting Started

There’s no install step:

1. Download `shiori-v2.4.html` — the current version
2. Double-click it, or open it in any modern browser
3. Start adding tasks

> Your data stays entirely in that browser’s local storage. If you switch browsers or devices, use **Settings → Export** to move your data over via the JSON file, then **Import** it on the other side.

---

### 💻 Tech

* **Vanilla HTML, CSS, and JavaScript** — no frameworks, no build step, no `npm`
* Zero external dependencies or CDN calls
* Works completely offline
* Everything lives in one `.html` file by design, so it’s as portable as a bookmark

---

### 📜 Versions

Shiori has grown along two tracks: an early **Visual / UX line** that shaped the design language, and a **Smart Flow line** that picked up from v4 and taught the app to understand a task’s lifecycle — without ever redesigning it.

#### 🎨 Visual / UX Line

| Version | What changed |
| :--- | :--- |
| **v1** | Original build — warm neutral palette (soft paper / charcoal), full feature set |
| **v2** | Palette pass — pastel periwinkle, dusty pink, and muted gold instead of the original neutrals |
| **v3** | Polish pass on v2 — refined type scale, a breathing progress ring, softer motion throughout |
| **v4** | Usability pass — undo extended to column moves and clearing completed, a first-run nudge on an empty board, an Overdue count, clearer “no matches” states, optional note-to-task linking |

#### ⚡ Smart Flow Line
*Functionality only, built on v4. Same visual language throughout.*

| Version | What changed |
| :--- | :--- |
| **v2.1** | Task state engine — reliable status lifecycle, `completedAt` / `previousStatus` tracking, subtle date labels, a lightweight history log, a gentle Next Action prompt, and safe migration for old saved data |
| **v2.2** | Checklist auto-completion — checking a task’s last checklist item automatically completes it, reusing the same completion path as a manual complete or a drag into Completed |
| **v2.3** | Simplification pass — merged Waiting + On Hold into one Paused column, dropped the unused favorite field, collapsed the emoji picker behind a small toggle, and condensed the dashboard from six cards to four |
| **v2.4** | **Current.** Checking a task’s first checklist item now moves it to In Progress automatically; tags gained autocomplete with case-insensitive matching so near-duplicate tags don’t quietly pile up |

*Earlier versions are kept in the repository as complete, working snapshots of each stage. `shiori-v2.4.html` is the version to actually use.*

> **Throughline:** Make the same small tool feel calmer, clearer, and a little smarter under the hood — never louder, never more complicated on the surface.

---

### 📄 License

MIT — do whatever you’d like with it. 🌷
