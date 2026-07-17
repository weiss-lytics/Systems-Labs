# Deadline Countdown Widget (Pulse) — v2

A focused deadline tracker that separates what needs your attention *now* from everything else. Urgent projects surface at the top with live countdowns; everything beyond a week stays quietly out of the way until you need it.

Built as a single self-contained React component. No external dependencies beyond Google Fonts.

---

## Philosophy

Most deadline tools treat everything equally — a task due in 30 days competes visually with one due in 3 hours. This widget inverts that. It's built around a single question: *what actually needs my attention today?*

The answer lives at the top. Everything else collapses below it.

---

## Features

**Tiered view** — Projects within 7 days appear in the urgent section with a live d · h · m · s countdown. Everything beyond that lives in a collapsible Upcoming section showing only the due date.

**Urgency levels** — Four tiers, color-coded by time remaining:

| Label | Color | Threshold |
|---|---|---|
| EXPIRED | 🔴 `#ff3b5c` | Past due |
| CRITICAL | 🟠 `#ff6b35` | < 12 hours |
| URGENT | 🟡 `#fbbf24` | < 48 hours |
| THIS WEEK | 🟢 `#34d399` | < 7 days |
| UPCOMING | ⬛ `#64748b` | Beyond 7 days |

**Mark as done** — Checkbox on every card. Completed projects dim and strike through in place; they don't disappear, so you keep a sense of progress.

**Edit deadlines** — Hover any card to reveal the edit (✎) button. Update name, date, and time inline without leaving the widget.

**Sort options** — Toggle between three views from the top-right controls:
- ⏱ **Soonest** — chronological, nearest first
- **Az** — alphabetical by project name
- **!!** — by urgency tier

**Add projects** — The `+ ADD PROJECT` button expands an inline form with name, date, and time fields.

---

## Usage

Drop `deadline-countdown-v2.jsx` into any React project and render it:

```jsx
import DeadlineWidgetV2 from './deadline-countdown-v2';

export default function App() {
  return <DeadlineWidgetV2 />;
}
```

The component ships with sample projects so the widget is populated on first load. Replace the `defaultProjects` array at the top of the file with your own data, or clear it to start empty.

---

## Data Shape

Each project entry follows this structure:

```js
{
  id: number,          // unique identifier
  name: string,        // project label
  deadline: string,    // ISO 8601 datetime string
  done: boolean        // completion state
}
```

---

## Customization

**Change the urgency threshold** — Edit `URGENCY_THRESHOLD` at the top of the file. Default is `7 * 24 * 3600000` (7 days in milliseconds).

**Change urgency tier colors** — Edit the `cfg` object. Each tier takes a `color` (border + text) and `dim` (badge background, typically the color at low opacity).

**Typography** — Uses `Syne` (headings) and `DM Mono` (monospace/data) from Google Fonts. Swap the import URL at the top of the `<style>` block to change them.

---

## Tech

- React (hooks: `useState`, `useEffect`)
- Inline styles with CSS-in-JS keyframes via a `<style>` tag
- All state is in-memory; no persistence layer
- Live countdown ticks every second via `setInterval`

---

## Version History

| Version | Notes |
|---|---|
| v1 | Initial build — urgent-only view, 72-hour threshold |
| v2 | Tiered layout, 7-day threshold, mark done, edit, sort |
