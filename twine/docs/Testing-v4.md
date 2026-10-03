# Testing Twine V4

## Automated checks run during the V4 build

**Timezone and recommendation logic (38 checks, all passed)**

| Area | Checked |
| --- | --- |
| Offsets | New York, London, Sydney, India (+5:30), Kathmandu (+5:45), Yangon (+6:30) read at the real date |
| Day length | New York 23h (Mar 8) and 25h (Nov 1); London 23h and 25h; Sydney 23h (Oct 4) and 25h (Apr 5); Kathmandu 24h |
| Slots | 23h day gives 46 half-hour slots; 25h day gives 50 |
| Round trip | Local wall-clock to instant and back is stable across 10 zones and 8 dates, including DST days |
| Mixed DST | New York to London is 4h in mid-March (US switched, UK not yet) and 5h in April |
| Non-hour zones | Kathmandu times land on :15/:45 |
| Scoring | Three picks, at least 90 minutes apart, ordered by score |
| Comfort | Ideal, Workable and Rough boundaries |
| Awkward case | Sydney + New York + London returns compromise ratings, not false "ideal" |
| Past times | Earlier times are never suggested; a past date returns no picks |
| Search | Accent-insensitive; keyword aliases (delhi, rangoon); all city zones valid |

**Page behavior (49 checks, all passed, in a simulated browser)**
City picker open, search, keyboard (arrows, Escape, focus return), search all zones; add and remove participants; presets and custom hours; validation; calculating; choosing alternatives; copy summary; light/dark theme; past-date message; labelled inputs and buttons; no network or storage APIs in the file.

## Manual checklist (browser)

- [ ] Opens by double-clicking the file (Chrome, Safari, Firefox)
- [ ] Phone width: timeline readable, tap targets comfortable
- [ ] Tab through the page: focus is always visible
- [ ] Copy summary pastes correctly
- [ ] Dark mode follows the system on first load
- [ ] A date across a DST change (e.g. 2026-03-08 with New York) looks right

## Known notes

- Results are a snapshot of the inputs at calculation time. Change inputs, then press **Find another time**.
- Automated tests ran in a simulated browser, not on real devices.
