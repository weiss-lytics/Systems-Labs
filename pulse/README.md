# Pulse

A focused deadline tracker that separates what needs your attention *now* from everything else. Urgent projects surface at the top with live countdowns; everything beyond a week stays quietly out of the way until you need it.

Built as a single self-contained React component. No external dependencies beyond Google Fonts.

---

## Philosophy

Most deadline tools treat everything equally — a task due in 30 days competes visually with one due in 3 hours. Pulse inverts that. It's built around a single question: *what actually needs my attention today?*

The answer lives at the top. Everything else collapses below it.

Urgency is communicated through motion, not color. Critical cards breathe. Expired cards throb. Upcoming cards are still. You feel the difference before you read it.

---

## Features

**Tiered view** — Projects within 7 days appear in the urgent section with a live d · h · m · s countdown. Everything beyond that lives in a collapsible Upcoming section showing only the due date.

**Urgency levels** — Five tiers, signaled by animation and opacity:

| Label | Signal | Threshold |
|---|---|---|
| Expired | Slow throb | Past due |
| Critical | Breathing pulse | < 12 hours |
| Urgent | Breathing pulse | < 48 hours |
| This week | Still | < 7 days |
| Upcoming | Still, ghosted | Beyond 7 days |

**Light & dark mode** — Toggle between periwinkle + lavender (light) and midnight blue + soft violet (dark). Theme token system keeps both modes consistent throughout.

**Mark as done** — Circular checkbox on every card. Completed projects dim and strike through in place; they don't disappear, so you keep a sense of progress.

**Edit deadlines** — Click the ✎ button on any card to update the name, date, and time inline.

**Sort options** — Toggle between three views from the top-right controls:
- ⏱ **Soonest** — chronological, nearest first
- **Az** — alphabetical by project name
- **!!** — by urgency tier

**Add projects** — The *+ Add a project* button expands an inline form with name, date, and time fields.

---

## Usage

Drop `pulse-v3.jsx` into any React project and render it:

```jsx
import Pulse from './pulse-v3';

export default function App() {
  return <Pulse />;
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

**Change the urgency threshold** — Edit `URGENT_THRESHOLD` at the top of the file. Default is `7 * 24 * 3600000` (7 days in milliseconds).

**Change the palette** — Edit the `themes` object. Each mode (`light` / `dark`) is a flat token map — background, surface, border, text, accent, and so on. All component styles derive from these tokens, so a palette swap propagates everywhere.

**Typography** — Uses `Lora` (serif, for headings and project names) and `Azeret Mono` (monospace, for countdowns, badges, and controls) from Google Fonts. Swap the import URL at the top of the `<style>` block to change them.

**Animation timing** — The `breathe` and `throb` keyframes live in the `<style>` block. Adjust duration and easing there to tune the motion feel.

---

## Tech

- React (hooks: `useState`, `useEffect`)
- Inline styles with CSS-in-JS keyframes via a `<style>` tag
- Theme token system — all colors derived from the active `themes[mode]` object
- All state is in-memory; no persistence layer
- Live countdown ticks every second via `setInterval`

---

## Version History

| Version | Notes |
|---|---|
| v1 | Initial build — urgent-only view, 72-hour threshold, color-coded tiers |
| v2 | Tiered layout, 7-day threshold, mark done, inline edit, sort controls |
| v3 | Renamed to Pulse — editorial redesign, motion-based urgency, dual light/dark theme, no color coding |
