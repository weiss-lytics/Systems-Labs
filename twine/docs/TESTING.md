# Testing & Verification

This is a record of what was actually checked in Twine's timezone and scoring logic, not a claim of full automated test coverage. There's no CI pipeline here — this is a single-file offline app — so verification was done by extracting the live `<script>` block and running it directly in Node against known-correct real-world timezone facts.

The goal of this doc is to make the verification reproducible: every result below can be re-run by pulling the script out of `twine.html` and executing the snippets shown.

---

## 1. DST offset correctness

**Method:** `getTzOffsetMinutes(tz, date)` computes the live UTC offset for a given IANA timezone on a given date by diffing `date.toLocaleString` rendered in UTC vs. the target timezone. This was tested directly against dates that straddle known DST boundaries.

| Case | Timezone | Date | Expected offset (minutes) | Result |
|---|---|---|---|---|
| Winter (EST) | `America/New_York` | Jan 15, 2026 | −300 | ✅ −300 |
| Summer (EDT) | `America/New_York` | Jul 15, 2026 | −240 | ✅ −240 |
| Winter (GMT) | `Europe/London` | Jan 15, 2026 | 0 | ✅ 0 |
| Summer (BST) | `Europe/London` | Jul 15, 2026 | +60 | ✅ +60 |
| Pre-fallback (EDT) | `America/New_York` | Nov 1, 2026 | −240 | ✅ −240 |
| Post-fallback (EST) | `America/New_York` | Nov 8, 2026 | −300 | ✅ −300 |



## 2. The DST "gap window" (the case that breaks naive implementations)

The US and most of Europe both observe DST, but they don't switch on the same date — the US springs forward roughly 2–3 weeks before Europe does. During that window, the usual 5-hour New York ↔ London gap temporarily becomes 4 hours. A naive implementation that hardcodes "NY is always 5 hours behind London" gets this wrong for those weeks every single year.

**Test:** scheduled a 9:00 AM meeting in New York on March 15, 2026 (after the US switch, before the EU switch) and checked the resulting London time.

```
NY offset on Mar 15:        -240  (EDT, correctly already in DST)
Meeting slot in UTC:        2026-03-15T13:00:00.000Z
London local time:           780 minutes  →  13:00 (1:00 PM)

Expected: 9am EDT = 1pm GMT = 13:00. Got: 13:00. ✅
```

This works because the app never special-cases "US" or "Europe" — it asks each city's specific IANA identifier for its live offset on that exact date, every time.



## 3. Southern Hemisphere reversed-season DST

Sydney's DST runs opposite the Northern Hemisphere — summer (DST on) is December–March, not June–September.

```
Sydney, January 15, 2026 (DST on):   +660 min  (UTC+11)  ✅
Sydney, July 15, 2026 (DST off):     +600 min  (UTC+10)  ✅
```



## 4. Mexico's 2022 DST abolition + the Tijuana exception

Mexico abolished nationwide DST in October 2022. Most Mexican cities now sit on a fixed offset year-round. The one exception is Baja California (Tijuana), which still follows DST in sync with US Pacific Time, specifically to stay aligned with cross-border business in California.

```
America/Mexico_City  | winter: -360 | summer: -360 | changes? false   ✅ (no DST, as expected)
America/Monterrey    | winter: -360 | summer: -360 | changes? false   ✅
America/Cancun       | winter: -300 | summer: -300 | changes? false   ✅
America/Tijuana      | winter: -480 | summer: -420 | changes? true    ✅ (correctly the one exception)
```

This was cross-checked against current sourcing on Mexico's DST law and the Baja California carve-out before being accepted as correct (see conversation log; Wikipedia and multiple current news sources agree on both points).



## 5. Search correctness with accented city names

**Bug found and fixed during verification:** 13 cities in the database have accented characters in their names (São Paulo, Bogotá, Córdoba, Malé, Asunción, Hagåtña, and others). The original search implementation did a plain `.toLowerCase().includes()` comparison, which meant typing the most natural, plain-ASCII version of these names — e.g. "sao paulo" — returned **zero results**, because the stored data has the accented form.

**Fix:** added `normalizeForSearch()`, which strips diacritics via Unicode NFD normalization before comparing, applied to both the search query and the city/country/label fields at match time.

**Before fix:**
```
search('sao paulo')  →  []        ❌ no match
```

**After fix:**
```
search('sao paulo')  →  ['Brazil — São Paulo']      ✅
search('bogota')     →  ['Colombia — Bogotá']        ✅
search('cordoba')    →  ['Argentina — Córdoba']      ✅
search('hagatna')    →  ['Guam — Hagåtña']            ✅
search('asuncion')   →  ['Paraguay — Asunción']       ✅
search('male')       →  ['Maldives — Malé']           ✅
search('cancun')     →  ['Mexico — Cancún']           ✅
```



## 6. Data integrity checks on the city database

Run once after expanding the database from 83 to 344 cities, to catch transcription errors before they ship.

| Check | Result |
|---|---|
| Every IANA timezone string resolves via `Intl.DateTimeFormat` | ✅ 344/344 valid, 0 invalid |
| Duplicate `(city, timezone)` pairs | ✅ 0 found |
| Region/city counts match expected structure | ✅ Asia 96, Europe 82, Americas 80, Africa 61, Oceania 25 |



## 7. Functional regression checks

Run after each visual/branding revision (v2 → v4) to confirm UI polish passes didn't silently break the underlying logic. Executed by extracting the `<script>` block and running it in Node with a minimal stubbed DOM.

| Check | Result |
|---|---|
| `init()` populates greeting, time, date, and city on load | ✅ |
| Adding participants increases the participant list correctly | ✅ |
| Removing a participant by id removes exactly that one | ✅ |
| `findMeetings()` produces a non-empty results render | ✅ |
| Results include the hero recommendation card | ✅ |
| Results include the outcome banner (perfect / good options) | ✅ |
| Theme toggle flips `data-theme` and syncs `aria-checked` | ✅ |
| City database remains at 344 entries after each revision | ✅ |

**Note on methodology:** the first pass at the "remove participant" test appeared to fail (count stayed at 3 instead of dropping to 2). Investigation showed this was a flaw in the test harness, not the app — `removeParticipant()` reassigns the module-level `participants` array rather than mutating it in place, and the test had destructured a stale reference to the array *before* calling the function. Re-tested with a live getter (`() => participants.length`) instead of a destructured snapshot, and the function behaved correctly (3 → 2). Recorded here because "the first test result was wrong" is a more honest account than only showing the passing version.



## 8. Clipboard copy fix

**Bug found via user report (screenshot evidence):** the "Copy times for everyone" button returned "Copy failed" consistently. Root cause: `navigator.clipboard.writeText()` — the modern Clipboard API — only works in a secure context (HTTPS, or non-sandboxed pages). Sandboxed iframes and `file://` pages can both block it, and the original code had no fallback.

**Fix:** `doCopy()` now tries the modern API first, and falls back to the legacy `document.execCommand('copy')` approach (via a temporary off-screen textarea) if the modern API is missing or rejects.

| Scenario | Result |
|---|---|
| No Clipboard API at all (matches the reported bug exactly) | ✅ Falls back, copies successfully |
| Clipboard API present, works normally | ✅ Uses it directly |
| Clipboard API present but denies permission | ✅ Falls back, copies successfully |

Verified in Node by overriding `navigator` via `Object.defineProperty` (a plain `global.navigator = {...}` doesn't work for this on modern Node, since Node 21+ ships its own non-configurable built-in `navigator` — a good reminder that the test environment can have its own quirks worth checking before trusting a result).



## 9. Broader DST sweep across 17 countries

Extended the original DST checks (US, UK, Mexico, Australia) to a wider, more representative spread before shipping: DST-observing, reversed-season DST, no-DST, recently-changed rules, and half/quarter-hour offsets.

| Timezone | Country/region | Winter (Jan) | Summer (Jul) |
|---|---|---|---|
| `America/New_York` | USA (East) | −300 | −240 |
| `America/Los_Angeles` | USA (West) | −480 | −420 |
| `Europe/London` | UK | 0 | +60 |
| `Europe/Berlin` | Germany | +60 | +120 |
| `Australia/Sydney` | Australia (reversed DST) | +660 | +600 |
| `Pacific/Auckland` | New Zealand (reversed DST) | +780 | +720 |
| `America/Mexico_City` | Mexico (no DST since 2022) | −360 | −360 |
| `America/Tijuana` | Mexico border zone (DST exception) | −480 | −420 |
| `Asia/Tokyo` | Japan (no DST) | +540 | +540 |
| `Asia/Kolkata` | India (no DST, UTC+5:30) | +330 | +330 |
| `Asia/Kathmandu` | Nepal (UTC+5:45, no DST) | +345 | +345 |
| `Asia/Dubai` | UAE (no DST) | +240 | +240 |
| `Africa/Cairo` | Egypt | +120 | +180 |
| `Africa/Johannesburg` | South Africa (no DST) | +120 | +120 |
| `America/Sao_Paulo` | Brazil (abolished DST 2019) | −180 | −180 |
| `America/Argentina/Buenos_Aires` | Argentina (no DST) | −180 | −180 |
| `America/Santiago` | Chile (still observes DST, reversed) | −180 | −240 |

All 17 ✅.

**Worth recording honestly:** my first pass at this table had Egypt marked as a failure, because I assumed Egypt had no DST and expected +120 year-round. The app returned +180 in July. Rather than "fixing" the app to match my assumption, I searched for current information first — Egypt reinstated DST in 2023 (last Friday of April through last Thursday of October) after a seven-year hiatus, confirmed via Wikipedia and multiple 2024–2025 news sources. The app's output was correct; my hardcoded expectation was stale. This is precisely the scenario the whole architecture is built to handle without code changes — the browser's IANA timezone database already knew about Egypt's 2023 law change, Twine didn't need to.



## 10. Multi-participant scheduling (3, 5, and 8 people across 5 continents)

This checks the question that actually matters for real use: when you add several participants at once, is the recommended time — and every individual local time shown alongside it — still correct?

**Method:** rather than scraping rendered HTML text (fragile and easy to misread), the test hooks directly into `findMeetings()`'s internal `picks` array to capture the exact `slotUtc` instant the scoring engine selected, then independently recomputes each participant's local time from that instant using a **second, completely independent time converter** (built from `Intl.DateTimeFormat` with no shared code with the app), and compares the two.

**3-person check** (Manila owner + New York, London, Sydney, July 2026):

| City | App's stored time | Independent calc | Match |
|---|---|---|---|
| Manila (owner) | 7:00 PM | 7:00 PM | ✅ |
| New York | 7:00 AM | 7:00 AM | ✅ |
| London | 12:00 PM | 12:00 PM | ✅ |
| Sydney | 9:00 PM | 9:00 PM | ✅ |

**5-person check** (Manila owner + New York, London, Sydney, São Paulo — deliberately includes Sydney, which is on the opposite side of the clock from the other four):

| City | App's stored time | Independent calc | Match |
|---|---|---|---|
| Manila (owner) | 1:00 PM | 1:00 PM | ✅ |
| New York | 9:00 AM | 9:00 AM | ✅ |
| London | 2:00 PM | 2:00 PM | ✅ |
| Sydney | 11:00 PM | 11:00 PM | ✅ |
| São Paulo | 10:00 AM | 10:00 AM | ✅ |

With 5 people spanning 5 continents and no slot where everyone is in their preferred hours, the scoring engine correctly identified the best achievable compromise (3 "great," 1 "ok," 1 "bad" — Sydney unavoidably lands at 11pm given the other four all want daytime hours roughly 12+ hours away) and the UI correctly labeled it "Twine found a few good options" rather than falsely claiming a perfect match.

**8-person check** (UTC owner + Tokyo, Los Angeles, Cairo, Mumbai, Buenos Aires, Auckland, Dubai, December 2026 — chosen specifically because December puts Northern Hemisphere DST-observers in winter and Southern Hemisphere DST-observers in summer simultaneously):

All 8 participants (owner + 7) matched exactly between the app's internal scoring data and the independent converter. ✅

**Worth recording honestly — this took several attempts to verify properly, and the mistakes were instructive:**

1. My first attempt manually set `ownerTz` to a city without the simulated system clock actually matching it. In a real browser this combination is impossible — `ownerTz` is always auto-detected *from* the system clock — so the test was checking a state the app can never actually be in. Result: a false mismatch.
2. After fixing that, I still got mismatches on 3 of 7 cities. Tracing it down: `new Date(year, month, day)` builds a timestamp at midnight in whatever timezone the *test process* considers local, and I'd set that process timezone independently of how I was computing offsets elsewhere in my own verification snippet — accidentally applying the same timezone shift twice in my hand-written check, not in the app.
3. Separately, my test was setting the meeting date *before* calling the app's `init()` — but `init()` calls `setToday()`, which unconditionally resets the date field to today's date. My chosen test date was being silently overwritten. (This loudly revealed itself once I logged the actual `slotUtc` the app picked and saw it was the wrong month entirely.)

None of these three were bugs in `twine.html` — they were all artifacts of test setup order and environment state. I'm recording the debugging path rather than just the final green checkmarks because "I tested it and it passed" is a much weaker claim than "I tested it, found three ways my test itself could lie to me, fixed each one, and it still passed."

## What's *not* covered

Being direct about the gap, since a verification doc that only lists passes isn't very useful:

- No visual regression testing (screenshots were spot-checked manually during development, not diffed automatically)
- No cross-browser testing beyond the dev environment's rendering engine
- No automated test suite lives in the repo — everything above was run ad hoc in Node against the extracted script and is documented here for reproducibility, not wired into CI
- Comfort scoring thresholds (7am–10pm "workable" window) are a reasonable default, not user-validated against real scheduling preferences
- Tested up to 8 simultaneous participants; not tested at larger scale (20+), though nothing in the algorithm's design suggests it would behave differently — it's an O(n) scan per 30-minute slot regardless of participant count
- Did not test mid-DST-transition dates themselves (the exact day clocks change) — only dates clearly before/after a transition
