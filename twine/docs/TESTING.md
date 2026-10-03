# Testing & Verification 

This is a record of what was actually checked in Twine V4's timezone and scoring logic, not a claim of full automated test coverage. There's no CI pipeline here — this is a single-file offline app — so verification was done by extracting the live code from `index.html` and running it directly in Node against known-correct real-world timezone facts.

Every result below was **re-run against the V4 file** (Node 22). Results from earlier versions were not carried over on trust.

## How to reproduce

The timezone, city and scoring logic sits between two comment markers in `twine-v4.html`:

```
/* ==== LOGIC:START ... */
/* ==== LOGIC:END ==== */
```

Pull that block out, wrap it in `new Function(...)`, return the functions you want (`plan`, `zoned`, `mins`, `offMs`, `offLabel`, `grade`, `ALL`, `extra`, `norm`), and call them. To make results repeatable, stub `Date.now` to a fixed date (the planner never suggests the past). Page behavior was driven in `jsdom` with `matchMedia` and `scrollIntoView` stubbed.

---

## 1. DST offset correctness

Offsets come from `offMs()`, which asks the browser for the target zone's wall-clock at the real instant. Sampled at 12:00 UTC on each date.

| Case | Timezone | Date | Expected (min) | Result |
|---|---|---|---|---|
| Winter (EST) | `America/New_York` | Jan 15, 2026 | −300 | ✅ −300 |
| Summer (EDT) | `America/New_York` | Jul 15, 2026 | −240 | ✅ −240 |
| Winter (GMT) | `Europe/London` | Jan 15, 2026 | 0 | ✅ 0 |
| Summer (BST) | `Europe/London` | Jul 15, 2026 | +60 | ✅ +60 |
| Post-fallback (EST) | `America/New_York` | Nov 8, 2026 | −300 | ✅ −300 |
| Fall-back day | `America/New_York` | Nov 1, 2026 | −240 before 2 AM, −300 after | ✅ see note |

**Note on Nov 1:** the first pass expected −240 for the whole day and got −300 at 12:00 UTC. The test was wrong, not the app. Clocks fall back at 2:00 AM local (06:00 UTC), so the offset is correct only for the moment you ask about. Re-checked by time of day: −240 at 00:00 and 05:00 UTC, −300 at 06:00, 07:00 and 12:00 UTC. ✅

## 2. The DST "gap window"

The US and most of Europe both observe DST but switch on different dates, so for a few weeks the usual 5-hour New York ↔ London gap becomes 4 hours.

```
9:00 AM New York, Mar 15, 2026
Slot in UTC:           2026-03-15T13:00:00.000Z
NY offset:             -240  (EDT, already in DST)
London local minutes:  780  →  1:00 PM        ✅ (expected 13:00)

Same 9:00 AM New York on Apr 15 (both in DST):  London 2:00 PM  ✅ (5-hour gap restored)
```

The app never special-cases "US" or "Europe". It asks each city's own IANA identifier for its live offset on that exact date.

## 3. Southern Hemisphere DST

```
Sydney, Jan 15, 2026 (DST on):   +660 min (UTC+11)  ✅
Sydney, Jul 15, 2026 (DST off):  +600 min (UTC+10)  ✅
```

Sydney's DST runs October to April.

## 4. 23-hour and 25-hour days (new in V4 checks)

The planner finds the owner's real local midnight-to-midnight window, then steps in 30-minute slots.

| Zone | Date | Real day length | Slots offered |
|---|---|---|---|
| New York | Mar 8, 2026 (spring forward) | 23 h | 46 ✅ |
| New York | Nov 1, 2026 (fall back) | 25 h | 50 ✅ |
| New York | Jun 10, 2026 (normal) | 24 h | 48 ✅ |
| London | Mar 29 / Oct 25, 2026 | 23 h / 25 h | ✅ |
| Sydney | Oct 4, 2026 (DST starts) | 23 h | 46 ✅ |
| Sydney | Apr 5, 2026 (DST ends) | 25 h | 50 ✅ |
| Kathmandu | Jun 1, 2026 | 24 h | ✅ |

Wall-clock → instant → wall-clock round trips were also checked for 10 zones × 8 dates (including DST days, Lord Howe's 30-minute shift, and Tehran). No mismatches outside the skipped hour itself.

## 5. Mexico's 2022 DST abolition + the Tijuana exception

```
America/Mexico_City  | winter: -360 | summer: -360 | changes? false   ✅
America/Monterrey    | winter: -360 | summer: -360 | changes? false   ✅
America/Cancun       | winter: -300 | summer: -300 | changes? false   ✅
America/Tijuana      | winter: -480 | summer: -420 | changes? true    ✅ (the exception)
```

In V4, Mexico City is in the curated list. Tijuana, Monterrey and Cancún are reachable through **Search all time zones** (searching "tijuana" finds it ✅).

## 6. Search correctness

Search normalizes both the query and the data (Unicode NFD, diacritics stripped) before matching.

| Search | Result |
|---|---|
| `sao paulo` | ✅ Brazil — São Paulo |
| `bogota` | ✅ Colombia — Bogotá |
| `Zürich` | ✅ Switzerland — Zurich |
| `delhi` | ✅ India — Mumbai (keyword alias) |
| `rangoon` | ✅ Myanmar — Yangon |
| `saigon` | ✅ Vietnam — Ho Chi Minh City |
| `kathmandu` | ✅ Nepal — Kathmandu |
| `cordoba`, `asuncion`, `cancun`, `tijuana` | ✅ found under *Search all time zones* (named after their IANA identifier) |
| `male`, `hagatna` | ❌ no results. These cities aren't in V4's lists. Their zones are named `Indian/Maldives` and `Pacific/Guam`, and `maldives` and `guam` both work ✅ |

## 7. Data integrity

| Check | Result |
|---|---|
| Every curated IANA zone resolves via `Intl.DateTimeFormat` | ✅ 93/93 valid, 0 invalid |
| Duplicate `(city, timezone)` pairs | ✅ 0 |
| Additional zones from `Intl.supportedValuesOf` (all-zones search) | ✅ 326 in the test engine, all valid |
| Curated region counts | Asia 27, Europe 24, Americas 26, Africa & Middle East 10, Pacific 6 (= 93) |

If your own timezone isn't in the curated list, the picker adds a "Your city" entry for it.

## 8. Multi-participant scheduling

Method: take the exact instant the scoring engine picks, then recompute each participant's local time with a **second, independent converter** (`toLocaleString`, sharing no code with the app) and compare. Every participant-time below matched.

| Scenario | Picks | Participant-times compared | Match |
|---|---|---|---|
| Manila + New York, London, Sydney (Jul 15, 2026) | 3 | 12 | ✅ |
| Manila + New York, London, Sydney, São Paulo (Jul 15, 2026) | 3 | 15 | ✅ |
| UTC + Tokyo, LA, Cairo, Mumbai-zone, Buenos Aires, Auckland, Dubai (Dec 15, 2026) | 3 | 24 | ✅ |
| New York + London on US spring-forward day (Mar 8, 2026) | 3 | 6 | ✅ |
| New York + London on fall-back day (Nov 1, 2026) | 3 | 6 | ✅ |
| Sydney + Kathmandu + New York on Sydney DST start (Oct 4, 2026) | 3 | 9 | ✅ |
| Yangon + Kathmandu + Kolkata (Jun 10, 2026) | 3 | 9 | ✅ |

What the ratings did:

- **Sydney + New York + London + Manila:** no time is ideal for all four. The best pick was labeled "Works for most" and the other two "Someone's compromising", with Sydney landing at 11 PM. Twine did not claim a perfect match.
- **Kathmandu and Yangon:** picks land on :15 and :45 local times (for example 7:15 AM and 10:45 AM in Kathmandu), as expected for non-hour offsets. Yangon, Kathmandu and Kolkata line up as +6:30, +5:45 and +5:30.
- **New York + London on both US transition days:** every pick was rated "Ideal for everyone", with the correct 4-hour (Mar 8) and 5-hour (Nov 1) gap.
- Picks are always at least 90 minutes apart and ordered by score. A date in the past returns no picks, and a same-day search never returns times earlier than "now".

## 9. Broader DST sweep (18 zones)

| Timezone | Winter (Jan) | Summer (Jul) |
|---|---|---|
| `America/New_York` | −300 | −240 |
| `America/Los_Angeles` | −480 | −420 |
| `Europe/London` | 0 | +60 |
| `Europe/Berlin` | +60 | +120 |
| `Australia/Sydney` (reversed) | +660 | +600 |
| `Pacific/Auckland` (reversed) | +780 | +720 |
| `America/Mexico_City` | −360 | −360 |
| `America/Tijuana` | −480 | −420 |
| `Asia/Tokyo` | +540 | +540 |
| `Asia/Kolkata` | +330 | +330 |
| `Asia/Kathmandu` | +345 | +345 |
| `Asia/Yangon` | +390 | +390 |
| `Asia/Dubai` | +240 | +240 |
| `Africa/Cairo` (DST reinstated 2023) | +120 | +180 |
| `Africa/Johannesburg` | +120 | +120 |
| `America/Sao_Paulo` | −180 | −180 |
| `America/Argentina/Buenos_Aires` | −180 | −180 |
| `America/Santiago` (reversed) | −180 | −240 |

All 18 ✅. Values come straight from the browser's timezone database, so rule changes (like Egypt's 2023 reinstatement) need no code changes.

## 10. Page behavior (49 checks, in a simulated browser)

City picker open, search, arrow-key navigation, Escape, focus return, and "search all zones"; add and remove participants; presets and custom hours switching to "Custom"; validation errors; calculating; choosing an alternative (focus stays on it); copy summary; light/dark theme; the "no time left" message for a past date; a result staying stable if you change your own location afterward; inputs labelled; buttons named; one `<h1>`; no network or storage APIs in the file.

### Clipboard (copy summary)

| Scenario | Result |
|---|---|
| No Clipboard API at all | ✅ falls back to `execCommand('copy')`, shows "Copied!" |
| Clipboard API works | ✅ uses it directly |
| Clipboard API denies permission | ✅ falls back, shows "Copied!" |

The fallback is the safety net for `file://` and sandboxed pages.

## 11. Accessibility measurements

Contrast ratios computed from the actual colors:

| Pair | Light | Dark |
|---|---|---|
| Muted text on card | 5.76:1 | 6.18:1 |
| Muted text on soft panel | 4.71:1 | 4.90:1 |
| White text on accent button | 5.86:1 | 5.22:1 |
| Focus ring on card | 5.82:1 | 6.67:1 |

Two contrast gaps relative to V3 were found and fixed: light-mode muted text (4.27:1 → 5.76:1) and dark-mode accent text (3.0:1, now uses the lighter lilac).

## Known issues

- **Zones that switch DST at local midnight (e.g. Havana, Santiago):** if your own location is one of these and you plan on exactly the spring-forward day (Mar 8, 2026 for Havana; Sep 6, 2026 for Santiago), the "day" is computed starting at 11:00 PM the previous evening, because local midnight doesn't exist that day. It shifts the timeline's starting edge by an hour on those two days only. Found during V4 verification; this logic is inherited unchanged from V3, so it has not been fixed.
- **A nonexistent clock time** (for example 2:30 AM New York on Mar 8) resolves to an hour earlier (1:30 AM) rather than an hour later. This doesn't affect recommendations, because slots are stepped in real elapsed time, not typed in as wall-clock times.

## What's *not* covered

- No visual regression testing and no real-device or real-browser testing. The page was tested in a simulated browser (jsdom), not in Safari, Chrome or Firefox. Open it in each before relying on it.
- No automated test suite lives in the repo. Everything above was run ad hoc against the extracted code and is documented for reproducibility, not wired into CI.
- Comfort scoring thresholds (7 AM–10 PM "workable" window) are a reasonable default, not user-validated.
- Tested up to 8 simultaneous participants; not tested at 20+.
- The original `meet-v2.html` was not available during the V4 conversion, so V4's logic was verified on its own terms and was not diffed against that file.
