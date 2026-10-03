# 📆 Twine

**Finding time, together.**

Plan meetings across timezones without DST headaches.

A lightweight, privacy-first timezone meeting planner built with HTML, CSS, and Vanilla JavaScript, in a single file.

---

<p align="center">
  <img src="assets/twine_banner.svg" alt="Twine Banner" width="100%">
</p>

## The Problem

I built Twine because I regularly schedule meetings with people across timezones and found existing tools frustrating to use. Most felt overly complicated, cluttered, or relied on basic UTC offset math that quietly breaks during Daylight Saving Time transitions — the kind of bug you don't notice until you've already double-booked someone an hour off.

I wanted a tool that removes the mental math and makes scheduling feel simple, visual, reliable, and a little delightful.

## The Solution

Twine helps you quickly find the best meeting time across multiple timezones. It focuses on:

- 🌸 Visual clarity over spreadsheets of offsets
- 🌍 DST-safe timezone conversion, verified against real edge cases (see below)
- 🤝 Comfort-aware recommendations, not a giant grid of every possible hour
- 🧠 Low cognitive load — you answer "when works for you," Twine does the rest
- 🔒 Private by design — nothing you enter ever leaves your browser
- 💜 A calm, friendly user experience

## Features

- 🌍 IANA timezone support: 94 well-known cities (one per timezone, searchable by nearby city names like "delhi" or "saigon"), plus every other IANA zone through **Search all time zones**
- ⏰ DST-aware conversions that read live offsets from the browser at the actual meeting date, not hardcoded UTC math
- 🤝 A best-time recommendation plus two alternatives, each rated per person as **Ideal**, **Workable**, or a compromise, with a plain-language reason ("Ideal for everyone", "Works for most", "Someone's compromising")
- ⚙️ Your working hours (Standard, Early bird, Night owl, or custom), meeting duration, and meeting date
- 📊 A full-day timeline for every participant showing preferred hours, workable hours, your selected time, and the current time
- 🕐 Live local clocks and a "timezones at a glance" panel
- ⏳ Never suggests a time that has already passed
- 🌙 Dark and light mode
- 📱 Responsive design for phone, tablet, and desktop
- ➕ Multiple participants, add/remove on the fly
- 📋 One-click copy of the agreed time in everyone's local timezone
- ♿ Accessible by default — semantic HTML, labelled controls, full keyboard navigation in the city picker, visible focus states, a screen-reader status line, and meaning never carried by color alone

## Privacy

Twine is local-first, and the browser enforces it rather than just trusting me:

- No accounts, backend, database, analytics, cookies, or storage
- No external API calls, CDNs, or fonts
- A built-in Content-Security-Policy blocks all network access from the page
- Clipboard access only happens when you press **Copy meeting summary**

### Tech Stack

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![Dependencies](https://img.shields.io/badge/Dependencies-0-success)
![Offline](https://img.shields.io/badge/Offline-100%25-blue)
![API](https://img.shields.io/badge/API-Native_Intl-purple)

* **Frontend:** HTML5, CSS3 (Custom Properties, Flexbox, Grid)
* **Logic & Data:** Vanilla JavaScript (ES6+), Native Browser `Intl` API
* **Architecture:** Zero-dependency, single-file HTML, 100% offline-first

> **Zero Overhead:** No frameworks. No build tools. No external dependencies. No CDNs. Open the `index.html` file in any browser and it works immediately.

## Technical Challenges

Building Twine taught me that timezone handling is a lot more complex than UTC math. Some of what came up:

- **Daylight Saving Time isn't a single global on/off switch.** The US and most of Europe both observe it, but on different dates — which means for a few weeks every spring, the usual 5-hour gap between New York and London briefly becomes 4 hours. I tested this exact window directly (scheduled a 9am NY meeting on a date inside that gap and confirmed the London time landed correctly) rather than assuming the math held.
- **Not every day has 24 hours.** On a spring-forward day the planner has 46 half-hour slots to offer; on a fall-back day it has 50. Twine reads the day's real start and end from the timezone database, so the timeline and recommendations stay correct on those days.
- **Some countries don't observe DST at all, and the exceptions have exceptions.** Mexico abolished nationwide DST in 2022 — except Tijuana, which still follows it to stay in sync with California's clock across the border. Twine gets both right because it never special-cases a country; it asks each city's specific timezone identifier for its live offset. (Tijuana lives in *Search all time zones*.)
- **DST runs backwards south of the equator.** Sydney's DST runs from October to April, not through the northern summer. Verified separately, including its 23-hour and 25-hour transition days.
- **Not every timezone sits on a clean hour.** Kathmandu is UTC+5:45, Yangon is UTC+6:30, India is UTC+5:30. These aren't custom-handled — they fall out naturally from using the browser's real timezone database instead of writing offset math by hand, which is itself the lesson: the right move was knowing not to reinvent this.
- **"Comfortable" is more than "inside office hours."** Each person's slot is scored by how well it fits their working hours and a wider workable window (7 AM – 10 PM), so Twine can say honestly when someone is compromising, and pick the least painful option when no perfect time exists.
- **Search breaks quietly on accented names.** São Paulo, Bogotá, and a dozen other cities in the dataset have diacritics. Typing the plain-ASCII version of the name — which is what most people actually type — originally returned zero results. Fixed by normalizing both the query and the data before matching.

Full verification notes, including the exact test inputs and outputs for each case above, are in [`TESTING.md`](./docs/TESTING.md).

## 🎯 Key Design Decisions

Twine intentionally prioritizes simplicity over feature count.

- **Browser-native timezone handling** — Uses the browser's IANA timezone database instead of maintaining timezone rules manually.
- **Recommendations over giant grids** — Surface a few good options instead of overwhelming users with every possible hour.
- **Comfort over arithmetic** — Rate times by how they feel for each person, not just whether they overlap.
- **Single-file architecture** — Keep the app lightweight, portable, and runnable without installation.
- **Local-first** — No APIs, accounts, or internet connection required once opened.
- **Human-first design** — Reduce cognitive load through visual timelines and approachable language instead of exposing timezone complexity.

## Why I Built This

Twine started from a real workflow problem in my day-to-day work. I frequently coordinate with people across countries and wanted something reliable, without reaching for a bloated scheduling tool to solve a problem that's really just "what time is it for both of us, comfortably."

After a few rounds of iteration — structure, then branding, then visual polish, then a rebuild back down to a single dependency-free file — Twine became one of my more refined personal projects. It reflects how I like to approach building things: identify the friction, understand the edge cases that actually break naive solutions, and design something simple on the surface that's been pushed on underneath.

If I have to survive corporate life, I might as well build beautiful little tools that make it easier. 🌸

## 🧵 Version History

| Version | What it is |
| --- | --- |
| V1–V2 | The original working planner, where the timezone and recommendation logic was proven |
| V3 | Same logic with a new visual direction, built in React |
| **V4** | The polished, final version: V3's design and logic as one dependency-free HTML file, with accessibility and contrast refinements |

## 💡 Lessons Learned

Building Twine reinforced several engineering principles that extend beyond timezone software:

- **Leverage standards instead of reinventing them.** The browser's IANA timezone database is more reliable than maintaining custom UTC offset logic.
- **Edge cases deserve first-class attention.** Daylight Saving Time, 23- and 25-hour days, non-hour offsets, and international naming conventions all surfaced real-world issues that required thoughtful testing.
- **Simple interfaces often hide complex systems.** Reducing cognitive load for users meant handling technical complexity behind the scenes.
- **Rebuilding is a good test of understanding.** Moving from React back to a single file only worked because the logic was kept separate from the interface.
- **Validation is part of development.** Testing real-world scenarios was just as important as implementing the features themselves.

## 🤖 AI-Assisted Development

This project was built using an AI-assisted workflow.

I defined the product goals, user experience, visual direction, and technical requirements based on my own experience coordinating meetings across timezones. I used **Claude** as a development partner to accelerate HTML, CSS, and Vanilla JavaScript implementation, troubleshoot issues, and iterate on the product more efficiently.

Every feature, edge case, and timezone calculation was independently tested and validated by me against real-world scenarios to ensure accuracy and reliability.

## Philosophy

Twine exists to answer one simple question:

> When can we comfortably meet?

The goal isn't to overwhelm anyone with timezone technicalities — it's to make scheduling feel effortless, visual, and human.

## Roadmap

**Shipped**

- Core timezone planning across 94 curated cities and every IANA zone
- DST-aware conversions, verified against real edge cases
- Meeting recommendations with comfort scoring and alternatives
- Copy-to-clipboard for sharing agreed times
- Responsive layout, dark/light mode, accessibility pass
- Single-file V4 with a browser-enforced no-network policy

**Future ideas**

- `.ics` calendar export for the recommended time
- Saved/recent participant presets (would mean revisiting the current no-storage approach deliberately, likely opt-in)
- Promote more cities from the all-zones list into the curated list, especially in Africa and Oceania
- Recurring meeting support

---
