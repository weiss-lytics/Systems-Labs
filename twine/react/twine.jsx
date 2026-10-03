import { useState, useEffect, useRef } from "react";

/* ✨ Twine V3.3 — Finding time, together.
   Same v2 product logic as V3.1, lighter and smoother: ~110 well-known cities (one per time zone, with
   search keywords), every other IANA zone on demand, isolated live clocks, keyboard-friendly picker.
   Single file, React only. Nothing leaves your browser: no network calls, no storage. */

/* ---------- cities: "flag Name@IANA zone@search keywords" — grouped in 5 regions ---------- */
const GROUPS = { "-1": "Your timezone", 0: "Asia", 1: "Europe", 2: "Americas", 3: "Africa & Middle East", 4: "Pacific", 5: "All time zones" };
const CUR = [
  "🇵🇭 Philippines — Manila@Asia/Manila@cebu davao quezon;🇯🇵 Japan — Tokyo@Asia/Tokyo@osaka kyoto yokohama;🇰🇷 South Korea — Seoul@Asia/Seoul@busan;🇨🇳 China — Beijing@Asia/Shanghai@shanghai shenzhen guangzhou chengdu;🇭🇰 Hong Kong@Asia/Hong_Kong;🇹🇼 Taiwan — Taipei@Asia/Taipei;🇸🇬 Singapore@Asia/Singapore;🇲🇾 Malaysia — Kuala Lumpur@Asia/Kuala_Lumpur@kl penang;🇹🇭 Thailand — Bangkok@Asia/Bangkok@phuket chiang mai;🇻🇳 Vietnam — Ho Chi Minh City@Asia/Ho_Chi_Minh@saigon hanoi da nang;🇮🇩 Indonesia — Jakarta@Asia/Jakarta@bandung surabaya;🇮🇩 Indonesia — Bali@Asia/Makassar@denpasar makassar;🇲🇲 Myanmar — Yangon@Asia/Yangon@rangoon;🇰🇭 Cambodia — Phnom Penh@Asia/Phnom_Penh;🇮🇳 India — Mumbai@Asia/Kolkata@delhi new delhi bangalore bengaluru chennai kolkata hyderabad pune;🇱🇰 Sri Lanka — Colombo@Asia/Colombo;🇳🇵 Nepal — Kathmandu@Asia/Kathmandu;🇧🇩 Bangladesh — Dhaka@Asia/Dhaka;🇵🇰 Pakistan — Karachi@Asia/Karachi@lahore islamabad;🇰🇿 Kazakhstan — Almaty@Asia/Almaty;🇺🇿 Uzbekistan — Tashkent@Asia/Tashkent;🇦🇪 UAE — Dubai@Asia/Dubai@abu dhabi;🇸🇦 Saudi Arabia — Riyadh@Asia/Riyadh@jeddah;🇶🇦 Qatar — Doha@Asia/Qatar;🇮🇷 Iran — Tehran@Asia/Tehran;🇮🇱 Israel — Jerusalem@Asia/Jerusalem@tel aviv;🇹🇷 Türkiye — Istanbul@Europe/Istanbul@ankara turkey",
  "🇬🇧 UK — London@Europe/London@edinburgh manchester england scotland;🇮🇪 Ireland — Dublin@Europe/Dublin;🇮🇸 Iceland — Reykjavik@Atlantic/Reykjavik;🇵🇹 Portugal — Lisbon@Europe/Lisbon@porto;🇪🇸 Spain — Madrid@Europe/Madrid@barcelona;🇫🇷 France — Paris@Europe/Paris@lyon;🇧🇪 Belgium — Brussels@Europe/Brussels;🇳🇱 Netherlands — Amsterdam@Europe/Amsterdam;🇩🇪 Germany — Berlin@Europe/Berlin@munich frankfurt hamburg;🇨🇭 Switzerland — Zurich@Europe/Zurich@geneva;🇦🇹 Austria — Vienna@Europe/Vienna;🇮🇹 Italy — Rome@Europe/Rome@milan;🇨🇿 Czechia — Prague@Europe/Prague;🇵🇱 Poland — Warsaw@Europe/Warsaw@krakow;🇭🇺 Hungary — Budapest@Europe/Budapest;🇩🇰 Denmark — Copenhagen@Europe/Copenhagen;🇸🇪 Sweden — Stockholm@Europe/Stockholm;🇳🇴 Norway — Oslo@Europe/Oslo;🇫🇮 Finland — Helsinki@Europe/Helsinki;🇷🇴 Romania — Bucharest@Europe/Bucharest;🇬🇷 Greece — Athens@Europe/Athens;🇺🇦 Ukraine — Kyiv@Europe/Kiev@kiev;🇷🇺 Russia — Moscow@Europe/Moscow@st petersburg;🇷🇺 Russia — Vladivostok@Asia/Vladivostok",
  "🇺🇸 USA — New York@America/New_York@boston miami atlanta washington philadelphia eastern;🇺🇸 USA — Chicago@America/Chicago@dallas houston austin central;🇺🇸 USA — Denver@America/Denver@salt lake mountain;🇺🇸 USA — Phoenix@America/Phoenix@arizona;🇺🇸 USA — Los Angeles@America/Los_Angeles@san francisco seattle san diego las vegas portland pacific;🇺🇸 USA — Anchorage@America/Anchorage@alaska;🇺🇸 USA — Honolulu@Pacific/Honolulu@hawaii;🇨🇦 Canada — Toronto@America/Toronto@montreal ottawa;🇨🇦 Canada — Vancouver@America/Vancouver;🇨🇦 Canada — Calgary@America/Edmonton@edmonton;🇨🇦 Canada — Halifax@America/Halifax;🇲🇽 Mexico — Mexico City@America/Mexico_City@guadalajara monterrey;🇨🇷 Costa Rica — San José@America/Costa_Rica;🇵🇦 Panama — Panama City@America/Panama;🇨🇺 Cuba — Havana@America/Havana;🇵🇷 Puerto Rico — San Juan@America/Puerto_Rico;🇯🇲 Jamaica — Kingston@America/Jamaica;🇨🇴 Colombia — Bogotá@America/Bogota@medellin;🇵🇪 Peru — Lima@America/Lima;🇪🇨 Ecuador — Quito@America/Guayaquil;🇻🇪 Venezuela — Caracas@America/Caracas;🇧🇷 Brazil — São Paulo@America/Sao_Paulo@rio de janeiro brasilia;🇧🇷 Brazil — Manaus@America/Manaus;🇦🇷 Argentina — Buenos Aires@America/Argentina/Buenos_Aires;🇨🇱 Chile — Santiago@America/Santiago;🇺🇾 Uruguay — Montevideo@America/Montevideo",
  "🇪🇬 Egypt — Cairo@Africa/Cairo;🇲🇦 Morocco — Casablanca@Africa/Casablanca;🇩🇿 Algeria — Algiers@Africa/Algiers;🇸🇳 Senegal — Dakar@Africa/Dakar;🇬🇭 Ghana — Accra@Africa/Accra;🇳🇬 Nigeria — Lagos@Africa/Lagos@abuja;🇪🇹 Ethiopia — Addis Ababa@Africa/Addis_Ababa;🇰🇪 Kenya — Nairobi@Africa/Nairobi;🇹🇿 Tanzania — Dar es Salaam@Africa/Dar_es_Salaam;🇿🇦 South Africa — Johannesburg@Africa/Johannesburg@cape town pretoria durban",
  "🇦🇺 Australia — Sydney@Australia/Sydney@melbourne canberra;🇦🇺 Australia — Brisbane@Australia/Brisbane@queensland;🇦🇺 Australia — Adelaide@Australia/Adelaide;🇦🇺 Australia — Perth@Australia/Perth;🇳🇿 New Zealand — Auckland@Pacific/Auckland@wellington;🇫🇯 Fiji — Suva@Pacific/Fiji",
];
const norm = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const LOCAL = (() => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone; } catch { return "UTC"; } })();
const ALL = [];
CUR.forEach((s, r) => s.split(";").forEach((x) => {
  const [a, tz, kw = ""] = x.split("@"), i = a.indexOf(" "), n = a.slice(i + 1);
  ALL.push({ f: a.slice(0, i), n, tz, r, k: norm(`${n} ${tz} ${kw}`) });
}));
if (!ALL.some((c) => c.tz === LOCAL)) ALL.unshift({ f: "📍", n: "Your city", tz: LOCAL, r: -1, k: norm("your city " + LOCAL) });
// every other IANA zone the browser knows — built only if someone asks for it
const LEGACY = new Set(["Asia/Katmandu", "Asia/Rangoon", "Asia/Calcutta", "Asia/Saigon", "Europe/Kyiv", "Asia/Ujung_Pandang"]);
let EXTRA;
const extra = () => EXTRA || (EXTRA = (() => {
  let z = []; try { z = Intl.supportedValuesOf("timeZone"); } catch {}
  const have = new Set(ALL.map((c) => c.tz));
  return z.filter((t) => t.includes("/") && !t.startsWith("Etc/") && !have.has(t) && !LEGACY.has(t))
    .map((t) => { const n = t.split("/").pop().replace(/_/g, " "); return { f: "🌐", n, tz: t, r: 5, k: norm(`${n} ${t}`) }; });
})());
const short = (c) => c.n.split(" — ").pop();

const PRESETS = { standard: ["✦", "Standard", "09:00", "18:00"], early: ["✳", "Early bird", "06:00", "15:00"], night: ["☾", "Night owl", "12:00", "21:00"], custom: ["✦", "Custom"] };
const HALF = 18e5, OK0 = 420, OK1 = 1320; // "workable" = 7 AM – 10 PM

/* ---------- timezone helpers: Intl only, offsets read from the browser at the real instant ---------- */
const FM = {};
const fmt = (tz, k, o) => FM[tz + k] || (FM[tz + k] = new Intl.DateTimeFormat("en-US", { timeZone: tz, ...o }));
const time = (ms, tz) => fmt(tz, "t", { hour: "numeric", minute: "2-digit", hour12: true }).format(ms);
const dShort = (ms, tz) => fmt(tz, "s", { month: "short", day: "numeric" }).format(ms);
const dLong = (ms, tz) => fmt(tz, "l", { weekday: "long", month: "long", day: "numeric" }).format(ms);
const OFF = {};
const offLabel = (tz, ms = Date.now()) => {
  const k = tz + Math.floor(ms / 36e5); // cached per zone per hour
  if (OFF[k]) return OFF[k];
  let v = "";
  try { v = (fmt(tz, "o", { timeZoneName: "shortOffset" }).formatToParts(ms).find((p) => p.type === "timeZoneName")?.value || "").replace("GMT", "UTC") || "UTC"; } catch {}
  return (OFF[k] = v);
};
const wall = (ms, tz) => {
  const p = fmt(tz, "w", { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", hourCycle: "h23" }).formatToParts(ms);
  const g = (t) => +p.find((x) => x.type === t).value;
  return Date.UTC(g("year"), g("month") - 1, g("day"), g("hour") % 24, g("minute"));
};
const mins = (ms, tz) => { const w = new Date(wall(ms, tz)); return w.getUTCHours() * 60 + w.getUTCMinutes(); };
const offMs = (ms, tz) => wall(ms, tz) - Math.floor(ms / 6e4) * 6e4;
// wall-clock (y-m-d + minutes) in tz -> real UTC instant, correct across DST
const zoned = (y, m, d, min, tz) => {
  const w = Date.UTC(y, m - 1, d, 0, min); let t = w - offMs(w, tz);
  const o2 = offMs(t, tz); if (w - t !== o2) t = w - o2; return t;
};
const todayIn = (tz) => new Date(wall(Date.now(), tz)).toISOString().slice(0, 10);
const toMin = (v) => { const [h, m] = v.split(":").map(Number); return h * 60 + m; };

/* ---------- v2 comfort logic: great / ok / rough, scored, 3 picks ≥ 90 min apart ---------- */
function comfort(m, dur, ps, pe) {
  const e = m + dur;
  if (m >= ps && e <= pe) return "great";
  if (m >= OK0 && e <= OK1) return "ok";
  return "rough";
}
function plan(tzs, date, ps, pe, dur) {
  const [y, mo, d] = date.split("-").map(Number), owner = tzs[0];
  const s0 = zoned(y, mo, d, 0, owner), s1 = zoned(y, mo, d + 1, 0, owner), now = Date.now(), all = [];
  for (let t = s0; t < s1; t += HALF) {
    if (t < now) continue; // never suggest the past
    let score = 0;
    const cf = tzs.map((tz) => {
      const m = mins(t, tz), c = comfort(m, dur, ps, pe);
      if (c === "great") score += 3 + 0.5 * Math.max(0, 1 - Math.abs(m + dur / 2 - (ps + pe) / 2) / ((pe - ps) / 2));
      else if (c === "ok") score += 1;
      else {
        const e = m + dur, dEarly = m < OK0 ? OK0 - m : 1e4, dLate = e > OK1 ? e - OK1 : 1e4;
        const dist = m < OK0 ? Math.min(dEarly, m + 1440 + dur - OK1) : dLate;
        score -= 3 + Math.min(dist / 120, 3);
      }
      return { tz, m, c, early: m < 480 };
    });
    all.push({ t, cf, score });
  }
  all.sort((a, b) => b.score - a.score || a.t - b.t);
  const picks = [];
  for (const s of all) {
    if (picks.length >= 3) break;
    if (picks.every((p) => Math.abs(p.t - s.t) >= 90 * 6e4)) picks.push(s);
  }
  return { picks, s0, s1 };
}
// slot labels: 💜 Ideal for everyone · 🌼 Works for most · 🌙/🌅 Someone's compromising
const grade = (p) => {
  const bad = p.cf.filter((x) => x.c === "rough");
  if (!bad.length) return p.cf.every((x) => x.c === "great") ? { k: "great", chip: "💜 Ideal for everyone", h: "We found a great time!" } : { k: "good", chip: "🌼 Works for most", h: "We found a time that works" };
  return { k: "rough", chip: (bad.some((x) => !x.early) ? "🌙" : "🌅") + " Someone’s compromising", h: "Closest time we could find" };
};
const LABEL = { great: "Ideal", ok: "Workable" };

/* ---------- live time: one small ticking hook, once a minute, paused while the tab is hidden ---------- */
function useNow(ms = 30000) {
  const [n, setN] = useState(Date.now());
  useEffect(() => {
    let i;
    const on = () => { setN(Date.now()); i = setInterval(() => setN(Date.now()), ms); };
    const off = () => clearInterval(i);
    const vis = () => { off(); if (!document.hidden) on(); };
    document.addEventListener("visibilitychange", vis);
    if (!document.hidden) on();
    return () => { off(); document.removeEventListener("visibilitychange", vis); };
  }, [ms]);
  return n;
}
function TopBar({ me }) {
  const now = useNow(), hr = mins(now, me.tz) / 60;
  return (
    <div className="bar"><span><span aria-hidden="true">{hr < 12 ? "☀" : hr < 18 ? "🌤" : "🌙"}</span> {hr < 12 ? "Good morning" : hr < 18 ? "Good afternoon" : "Good evening"}</span>
      <span className="clock"><i aria-hidden="true" />{time(now, me.tz)} · {dLong(now, me.tz)} · {me.f} {short(me)}</span></div>
  );
}
function Glance({ cs }) {
  const now = useNow();
  return (
    <section className="card gl" aria-labelledby="gl-h">
      <p className="eye" id="gl-h">Timezones at a glance</p>
      {cs.map((c, i) => (
        <div className="glr" key={i}><span><span aria-hidden="true">{c.f}</span> <b>{c.n}</b>{i === 0 && <i className="you">You</i>}<small>{offLabel(c.tz, now)}</small></span><strong>{time(now, c.tz)}</strong></div>
      ))}
    </section>
  );
}
function NowMark({ s0, s1 }) {
  const now = useNow();
  return now >= s0 && now < s1 ? <u className="now" style={{ left: ((now - s0) / (s1 - s0)) * 100 + "%" }} /> : null;
}
function Clock({ c, cls }) {
  const now = useNow(), m = mins(now, c.tz);
  return (
    <div className={"clk " + cls}>
      <svg viewBox="0 0 100 104" role="img" aria-label={`${c.n} ${time(now, c.tz)}`}>
        <circle cx="50" cy="55" r="48" className="shd" /><circle cx="50" cy="50" r="49" className="face" /><circle cx="50" cy="50" r="38" className="ring" />
        <line x1="50" y1="50" x2="50" y2="26" className="hand" strokeWidth="3" transform={`rotate(${((m / 60) % 12) * 30} 50 50)`} />
        <line x1="50" y1="50" x2="50" y2="17" className="hand" strokeWidth="2.2" transform={`rotate(${(m % 60) * 6} 50 50)`} />
        <circle cx="50" cy="50" r="3" className="dot" />
      </svg>
      <p><span aria-hidden="true">{c.f}</span> {short(c)}<b>{time(now, c.tz)}</b></p>
    </div>
  );
}

/* ---------- city picker: search, region groups, arrow-key navigation ---------- */
const Chev = () => <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>;

function Picker({ value, onChange, label }) {
  const [open, setOpen] = useState(false), [q, setQ] = useState(""), [more, setMore] = useState(false);
  const ref = useRef(), btn = useRef();
  useEffect(() => {
    if (!open) return;
    const f = (e) => !ref.current?.contains(e.target) && setOpen(false);
    document.addEventListener("pointerdown", f);
    return () => document.removeEventListener("pointerdown", f);
  }, [open]);
  const nq = norm(q.trim());
  const list = ALL.filter((c) => !nq || c.k.includes(nq));
  const ex = more ? extra().filter((c) => !nq || c.k.includes(nq)).slice(0, 60) : [];
  const close = (focus) => { setOpen(false); setMore(false); if (focus) btn.current?.focus(); };
  const key = (e) => {
    if (e.key === "Escape") return close(true);
    const inp = document.activeElement.tagName === "INPUT";
    if (!["ArrowDown", "ArrowUp"].includes(e.key) && !(!inp && ["Home", "End"].includes(e.key))) return;
    const o = [...ref.current.querySelectorAll("[role=option]")], i = o.indexOf(document.activeElement);
    const n = e.key === "ArrowDown" ? i + 1 : e.key === "ArrowUp" ? i - 1 : e.key === "Home" ? 0 : o.length - 1;
    e.preventDefault();
    if (n < 0) ref.current.querySelector("input").focus(); else o[Math.min(n, o.length - 1)]?.focus();
  };
  const row = (c) => (
    <button type="button" role="option" tabIndex={-1} key={c.n + c.tz} aria-selected={c === value} onClick={() => { onChange(c); close(true); }}>
      <span aria-hidden="true">{c.f}</span><b>{c.n}</b><em>{offLabel(c.tz)}</em>
    </button>
  );
  return (
    <div className="pk" ref={ref} onKeyDown={key}>
      <button type="button" ref={btn} className="fld" aria-haspopup="listbox" aria-expanded={open} aria-label={`${label}: ${value.n}, ${offLabel(value.tz)}`} onClick={() => { setOpen(!open); setQ(""); setMore(false); }}>
        <span aria-hidden="true">{value.f}</span><b>{value.n}</b><em>{offLabel(value.tz)}</em><Chev />
      </button>
      {open && (
        <div className="pop">
          <input autoFocus aria-label="Search country or city" placeholder="Search country or city…" value={q} onChange={(e) => setQ(e.target.value)} />
          <div role="listbox" aria-label="Cities" className="lst">
            {[-1, 0, 1, 2, 3, 4].map((r) => { const m = list.filter((c) => c.r === r); return m.length ? <div key={r} role="group" aria-label={GROUPS[r]}><p className="rg">{GROUPS[r]}</p>{m.map(row)}</div> : null; })}
            {ex.length > 0 && <div role="group" aria-label={GROUPS[5]}><p className="rg">{GROUPS[5]}</p>{ex.map(row)}</div>}
            {!list.length && !ex.length && <p className="none">{more ? "No time zone matches that." : "No popular city matches that."}</p>}
          </div>
          {!more && <button type="button" className="all" onClick={() => setMore(true)}>Can’t find it? Search all time zones</button>}
        </div>
      )}
    </div>
  );
}

/* ---------- app ---------- */
export default function Twine() {
  const [dark, setDark] = useState(() => typeof matchMedia !== "undefined" && matchMedia("(prefers-color-scheme: dark)").matches);
  const [swap, setSwap] = useState(false);
  const [me, setMe] = useState(() => ALL.find((c) => c.tz === LOCAL));
  const nid = useRef(1), touched = useRef(false), out = useRef();
  const [others, setOthers] = useState([{ k: 0, c: ALL.find((c) => c.n.includes("New York")) }]);
  const [preset, setPreset] = useState("standard"), [ws, setWs] = useState("09:00"), [we, setWe] = useState("18:00"), [dur, setDur] = useState(30);
  const [date, setDate] = useState(() => todayIn(LOCAL));
  const [res, setRes] = useState(null), [sel, setSel] = useState(0), [copied, setCopied] = useState(false), [err, setErr] = useState("");

  useEffect(() => { if (!touched.current) setDate(todayIn(me.tz)); }, [me]); // follow your "today" until you pick a date
  const toggle = () => { setSwap(true); setDark((d) => !d); setTimeout(() => setSwap(false), 350); };
  const pick = (p) => { setPreset(p); if (p !== "custom") { setWs(PRESETS[p][2]); setWe(PRESETS[p][3]); } };
  const run = () => {
    const ps = toMin(ws), pe = toMin(we);
    if (!date) return setErr("Choose a meeting date.");
    if (!(pe > ps)) return setErr("Your latest end needs to be after your earliest start.");
    setErr("");
    const cs = [me, ...others.map((o) => o.c)], r = plan(cs.map((c) => c.tz), date, ps, pe, dur);
    setRes({ ...r, cs, ps, pe, dur }); setSel(0);
    setTimeout(() => out.current?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" }), 60);
  };
  const p = res?.picks[sel], g = p && grade(p), cs = res?.cs || [];
  const summary = p ? `Meeting on ${dLong(p.t, me.tz)} (${short(me)} time):\n${cs.map((c) => `${c.f} ${c.n}: ${time(p.t, c.tz)} (${dShort(p.t, c.tz)})`).join("\n")}\nDuration: ${res.dur} min` : "";
  const copy = async () => {
    try { await navigator.clipboard.writeText(summary); }
    catch { const t = document.createElement("textarea"); t.value = summary; document.body.appendChild(t); t.select(); try { document.execCommand("copy"); } catch {} t.remove(); }
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };
  const n = res ? Math.round((res.s1 - res.s0) / HALF) : 0;
  const status = copied ? "Copied meeting summary." : p ? `${g.h} ${time(p.t, me.tz)} your time, ${dShort(p.t, me.tz)}.` : res ? "No time left on this date." : "";

  return (
    <div className={"tw" + (swap ? " swap" : "")} data-theme={dark ? "dark" : "light"}>
      <style>{CSS}</style>
      <p className="vh" role="status">{status}</p>
      <div className="wrap">
        <header className="top">
          <div className="brand"><span className="mark" aria-hidden="true">✳</span><div><h2>twine<i>.</i></h2><small>Finding time, together.</small></div></div>
          <button type="button" className="ghost" onClick={toggle} aria-pressed={dark}><span aria-hidden="true">{dark ? "☀" : "☾"}</span> {dark ? "Light mode" : "Dark mode"}</button>
        </header>
        <TopBar me={me} />

        <section className="hero">
          <div><p className="eye">✳ The little timezone planner</p><h1>Good times happen <em>together.</em></h1>
            <p className="lede">Across cities, schedules, and timezones — find a meeting time that feels good for everyone.</p></div>
          <div className="amp" aria-hidden="true">&amp;<span>✦</span><small>A little more in sync.</small></div>
        </section>

        <main className="grid">
          <section className="card plan" aria-labelledby="plan-h">
            <p className="eye">Let’s make a plan</p><h2 id="plan-h">Where is everyone?</h2><p className="sub">Start with the people, we’ll find the moment.</p>
            <div className="lbl"><span className="ic" aria-hidden="true">⌖</span><b>Your location</b><small>Your local time</small></div>
            <Picker value={me} onChange={setMe} label="Your location" />
            <div className="lbl"><span className="ic alt" aria-hidden="true">◍</span><b>Their timezones</b></div>
            {others.map((o, i) => (
              <div key={o.k} className="row">
                <Picker value={o.c} label={`Participant ${i + 1}`} onChange={(c) => setOthers(others.map((x) => (x.k === o.k ? { ...x, c } : x)))} />
                <button type="button" className="x" aria-label={`Remove ${o.c.n}`} onClick={() => { setOthers(others.filter((x) => x.k !== o.k)); setRes(null); }}>×</button>
              </div>
            ))}
            {!others.length && <p className="sub">Add at least one person to meet with.</p>}
            <button type="button" className="add" onClick={() => setOthers([...others, { k: nid.current++, c: ALL.find((c) => c.tz === "Europe/London") }])}>+ Add another timezone</button>

            <hr />
            <p className="eye">Make it yours</p><h3>When do you work best?</h3>
            <label className="lab" htmlFor="d">Meeting date <small>(your local day)</small></label>
            <input id="d" type="date" className="fld in" value={date} onChange={(e) => { touched.current = true; setDate(e.target.value); }} />
            <p className="lab">Your working hours</p>
            <div className="hrs">
              <label><span className="vh">Earliest start</span><input type="time" step="900" className="fld in" value={ws} onChange={(e) => { setWs(e.target.value); setPreset("custom"); }} /></label>
              <span>to</span>
              <label><span className="vh">Latest end</span><input type="time" step="900" className="fld in" value={we} onChange={(e) => { setWe(e.target.value); setPreset("custom"); }} /></label>
            </div>
            <div className="pre" role="group" aria-label="Working hours presets">
              {Object.entries(PRESETS).map(([k, v]) => <button type="button" key={k} aria-pressed={preset === k} className={preset === k ? "on" : ""} onClick={() => pick(k)}><span aria-hidden="true">{v[0]}</span> {v[1]}</button>)}
            </div>
            <div className="dur"><b>Meeting duration</b>
              <label className="sel"><span className="vh">Meeting duration</span>
                <select value={dur} onChange={(e) => setDur(+e.target.value)}>{[[15, "15 minutes"], [30, "30 minutes"], [45, "45 minutes"], [60, "1 hour"], [90, "1.5 hours"], [120, "2 hours"]].map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select><Chev /></label></div>
            {err && <p className="err" role="alert">{err}</p>}
            <button type="button" className="cta" onClick={run} disabled={!others.length}><span aria-hidden="true">✳</span> {res ? "Find another time" : "Find a time that works"}<span className="arr" aria-hidden="true">→</span></button>
            <p className="fine">No spreadsheets, no mental math. Just a good time.</p>
          </section>

          <div className="side" ref={out}>
            {!res ? (
              <section className="card art" aria-label="Preview">
                <p className="eye">A better way to sync</p>
                <div className="clocks"><span className="orb" aria-hidden="true" />
                  <Clock c={others[0]?.c || me} cls="c1" /><Clock c={me} cls="c2" />
                  <p className="quote" aria-hidden="true">Different places.<br /><i>One good moment.</i></p></div>
                <small className="cap">Thoughtful timing, made simple.</small>
              </section>
            ) : !p ? (
              <section className="card"><h2>No time left on this date</h2><p className="sub">Nothing is left in your day for that date. Try another date or widen your hours.</p></section>
            ) : (
              <>
                <section className="card hit" key={sel + "-" + res.s0 + "-" + res.picks[0].t} aria-labelledby="hit-h">
                  <div className="hh"><span className="pill">✨ {sel === 0 ? "Recommended" : "Your choice"}</span><span className="dt">{dShort(p.t, me.tz)}</span></div>
                  <h2 id="hit-h">{g.h}</h2><p className="sub">{g.k === "rough" ? "Someone’s hours won’t line up fully — this comes closest." : "A little moment that brings everyone together."}</p>
                  <div className="inner">
                    <span className="tag">{g.chip}</span>
                    <p className="eye"><span aria-hidden="true">{me.f}</span> Your time · {short(me)}</p>
                    <p className="big">{time(p.t, me.tz)}</p><p className="sub">{dLong(p.t, me.tz)}</p>
                    {p.cf.slice(1).map((x, i) => (
                      <div className="loc" key={i}><span><i className={"pip " + x.c} aria-hidden="true" /> <span aria-hidden="true">{cs[i + 1].f}</span> <b>{cs[i + 1].n}</b>
                        <small>{dShort(p.t, x.tz)} · {LABEL[x.c] || (x.early ? "Early" : "Late")}</small></span><strong>{time(p.t, x.tz)}</strong></div>
                    ))}
                  </div>
                  <p className="note">✦ {g.k === "rough" ? "Worth a quick check with everyone." : "A thoughtful middle ground for your different days."}</p>
                  <button type="button" className="cta" onClick={copy}>{copied ? "✨ Copied!" : "⧉ Copy meeting summary"}</button>
                </section>

                <section className="card opts" aria-labelledby="opt-h">
                  <p className="eye">A few more options</p>
                  <div className="oh"><h3 id="opt-h">Other little windows</h3><small>Choose what feels right</small></div>
                  {res.picks.map((o, i) => (
                    <button type="button" key={o.t} className={"opt" + (i === sel ? " on" : "")} aria-pressed={i === sel} onClick={() => setSel(i)}>
                      <span className="ot"><b>{grade(o).chip}{i === 0 && <i className="rec">✨ Recommended</i>}</b><small>{short(cs[1])} {time(o.t, cs[1].tz)}</small></span>
                      <strong>{time(o.t, me.tz)}</strong><span aria-hidden="true">→</span>
                    </button>
                  ))}
                </section>
                <Glance cs={cs} />
              </>
            )}
          </div>
        </main>

        {res && p && (
          <section className="card tl" aria-labelledby="tl-h">
            <p className="eye">The big picture</p>
            <div className="oh"><h3 id="tl-h">A day, together</h3>
              <span className="leg"><i className="u" /> Preferred <i className="a" /> Workable <i className="p" /> Your pick <i className="nw" /> Now</span></div>
            <p className="sub">{dLong(p.t, me.tz)} in {short(me)} — see where everyone’s day meets yours.</p>
            <div className="tlw">
              {cs.map((c, ri) => (
                <div className="tr" key={ri} role="group" aria-label={`${c.n} timeline: pick at ${time(p.t, c.tz)}`}>
                  <p><span aria-hidden="true">{c.f}</span> <b>{short(c)}</b><small>{ri ? "Meeting with you" : "You"}</small></p>
                  <div><div className="cells" style={{ gridTemplateColumns: `repeat(${n},1fr)` }}>
                    {Array.from({ length: n }, (_, i) => {
                      const t = res.s0 + i * HALF, m = mins(t, c.tz);
                      const k = t >= p.t && t < p.t + res.dur * 6e4 ? "pk" : m >= res.ps && m < res.pe ? "on" : m >= OK0 && m < OK1 ? "ok" : "";
                      return <i key={i} title={time(t, c.tz)} className={k} />;
                    })}
                    <NowMark s0={res.s0} s1={res.s1} /></div>
                    <div className="ticks"><span>{time(res.s0, c.tz)}</span><span>{time(res.s0 + (n / 2) * HALF, c.tz)}</span><span>{time(res.s1, c.tz)}</span></div></div>
                </div>
              ))}
            </div>
            <p className="note">✦ The lilac moment is your selected meeting time. Dim cells are outside 7 AM – 10 PM.</p>
          </section>
        )}
        <footer><span className="fb">✳ twine.<small> Finding time, together.</small></span><span>Designed &amp; crafted with 💜 by Weiss</span></footer>
      </div>
    </div>
  );
}

const CSS = `
.tw{--bg:#faf9f7;--card:#fffefd;--ink:#2d293a;--mut:#7d778a;--ac:#735c82;--lil:#a58bbd;--soft:#ece5f1;--line:#e8e4ec;--fld:#fbfafc;--cell:#e6deef;--ok:#f1ecf5;--pk:#6b5280;--sh:0 8px 30px rgba(90,70,110,.08);--g:#7fb89a;--w:#e3b866;--r:#d08a8a;--shd:rgba(80,60,100,.14);
 min-height:100vh;background:var(--bg);color:var(--ink);font:14px/1.5 -apple-system,"Segoe UI",Inter,system-ui,sans-serif;-webkit-font-smoothing:antialiased;color-scheme:light}
.tw[data-theme=dark]{--bg:#1b181f;--card:#25212b;--ink:#f1ecf6;--mut:#a69fb3;--ac:#7b6489;--lil:#b79fd0;--soft:#3b2f46;--line:#38323f;--fld:#2e2935;--cell:#6a557d;--ok:#332c3b;--pk:#cdb8ec;--sh:0 8px 30px rgba(0,0,0,.3);--shd:rgba(0,0,0,.35);color-scheme:dark}
@media(prefers-reduced-motion:no-preference){.tw.swap,.tw.swap *{transition:background-color .3s ease,border-color .3s ease,color .3s ease,fill .3s ease,stroke .3s ease,box-shadow .3s ease!important}}
.tw *{box-sizing:border-box;margin:0}.tw button,.tw select,.tw input{font:inherit;color:inherit}.tw button{cursor:pointer}
.tw :focus-visible{outline:2px solid var(--lil);outline-offset:2px}
.tw .vh{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
.wrap{max-width:1040px;margin:0 auto;padding:20px 20px 28px}
.top{display:flex;justify-content:space-between;align-items:center;padding-bottom:16px;border-bottom:1px solid var(--line)}
.brand{display:flex;gap:12px;align-items:center}.mark{width:40px;height:40px;border-radius:12px;background:var(--soft);display:grid;place-items:center;color:var(--ac);font-size:18px}
.tw[data-theme=dark] .mark{color:var(--lil)}.brand h2{font-size:22px;letter-spacing:-.04em;line-height:1;margin:0}.brand i{color:var(--lil);font-style:normal}.brand small{color:var(--mut);font-size:11px}
.ghost{border:1px solid var(--line);background:var(--card);border-radius:99px;padding:8px 14px;font-size:12px;font-weight:600;transition:transform .15s,background .2s}.ghost:hover{background:var(--soft)}.ghost:active{transform:scale(.97)}
.bar{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;padding:16px 0;font-size:12px;color:var(--mut)}.bar>span:first-child{color:var(--ink);font-weight:600}
.clock i{display:inline-block;width:5px;height:5px;border-radius:9px;background:var(--lil);margin-right:8px;vertical-align:middle}
.eye{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--ac);font-weight:700}.tw[data-theme=dark] .eye{color:var(--lil)}
.hero{display:flex;justify-content:space-between;align-items:center;gap:20px;padding:6px 0 30px}
h1{font-size:clamp(38px,8vw,64px);line-height:.98;letter-spacing:-.055em;font-weight:700;margin:14px 0 18px}h1 em{font-style:normal;color:var(--lil);background:none;padding:0;font-size:inherit}.lede{max-width:360px;color:var(--mut);font-size:15px}
.amp{position:relative;font:italic 130px/1 "Iowan Old Style",Georgia,serif;color:var(--cell);opacity:.8;padding-right:20px;flex:none}
.amp span{position:absolute;top:0;right:0;font:20px sans-serif;color:var(--lil)}.amp small{display:block;font:italic 11px sans-serif;color:var(--mut);text-align:right}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;align-items:start}.side{display:grid;gap:16px}
.card{background:var(--card);border:1px solid var(--line);border-radius:26px;padding:26px;box-shadow:var(--sh)}
h2{font-size:21px;letter-spacing:-.03em;line-height:1.2;margin-top:8px}h3{font-size:17px;font-weight:500;letter-spacing:-.02em}.sub{color:var(--mut);font-size:12px;margin-top:4px}
.lbl{display:flex;align-items:center;gap:9px;margin:20px 0 8px;font-size:12px}.lbl small{margin-left:auto;color:var(--mut);font-size:11px}
.ic{width:26px;height:26px;border-radius:9px;display:grid;place-items:center;background:#f6e6e6;color:#b36b6b;font-size:12px}.ic.alt{background:var(--soft);color:var(--ac)}
.tw[data-theme=dark] .ic{background:#4a3340}.tw[data-theme=dark] .ic.alt{color:var(--lil)}
.pk{position:relative;flex:1;min-width:0}.row{display:flex;gap:8px;align-items:center;margin-bottom:8px}
.fld,.sel select{width:100%;display:flex;align-items:center;gap:10px;background:var(--fld);border:1px solid var(--line);border-radius:14px;padding:0 14px;height:46px;text-align:left;transition:border-color .2s}
.fld:hover,.sel select:hover{border-color:var(--lil)}.fld b{flex:1;font-weight:600;font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.fld svg,.sel svg{color:var(--mut);flex:none}
em{font-style:normal;font-size:10.5px;color:var(--mut);background:var(--soft);border-radius:99px;padding:2px 8px;white-space:nowrap}
.pop{position:absolute;z-index:20;left:0;right:0;top:calc(100% + 6px);background:var(--card);border:1px solid var(--line);border-radius:16px;box-shadow:0 16px 40px rgba(60,40,80,.2);padding:8px;animation:in .15s ease}
.pop input{width:100%;height:40px;border:1px solid var(--line);border-radius:11px;padding:0 12px;background:var(--fld)}
.lst{max-height:260px;overflow:auto;margin-top:6px}.rg{position:sticky;top:0;background:var(--card);font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--ac);font-weight:700;padding:8px 10px 4px}
.lst button{width:100%;display:flex;gap:10px;align-items:center;border:0;background:none;padding:9px 10px;border-radius:10px;text-align:left;font-size:13px;min-height:42px}.lst button b{flex:1;font-weight:500}
.lst button:hover,.lst button:focus-visible,.lst button[aria-selected=true]{background:var(--soft)}.none{padding:12px;color:var(--mut);font-size:12px}
.all{width:100%;border:0;background:none;color:var(--ac);font-size:11.5px;font-weight:600;padding:10px 6px 4px;min-height:36px;text-align:center}.all:hover{text-decoration:underline}
.x{width:36px;height:36px;flex:none;border-radius:99px;border:1px solid var(--line);background:none;color:var(--mut);font-size:18px}.x:hover{background:var(--soft)}
.add{margin-top:4px;background:none;border:0;color:var(--ac);font-weight:600;font-size:12px;padding:8px 2px;min-height:40px}.tw[data-theme=dark] .add{color:var(--lil)}.add:hover{text-decoration:underline}
hr{border:0;border-top:1px solid var(--line);margin:14px 0 22px}.lab{display:block;font-size:12px;font-weight:600;margin:16px 0 8px}.lab small{color:var(--mut);font-weight:400}
.in{font-size:13px;font-weight:600}.hrs{display:flex;align-items:center;gap:10px;color:var(--mut);font-size:11px}.hrs label{flex:1}
.pre{display:flex;gap:6px;flex-wrap:wrap;margin-top:12px}.pre button{border:1px solid var(--line);background:var(--fld);border-radius:9px;padding:7px 11px;font-size:11px;font-weight:600;min-height:34px;transition:all .15s}
.pre button.on{background:var(--soft);border-color:var(--lil);color:var(--ac)}.tw[data-theme=dark] .pre button.on{color:var(--ink)}.pre button:hover{border-color:var(--lil)}
.dur{display:flex;justify-content:space-between;align-items:center;margin:18px 0 22px;font-size:12px}
.sel{position:relative;display:block;width:150px}.sel select{appearance:none;font-size:13px;font-weight:600;padding-right:34px;height:40px}.sel svg{position:absolute;right:14px;top:14px;pointer-events:none}
.err{color:#b04a4a;font-size:12px;margin:-8px 0 12px}.tw[data-theme=dark] .err{color:#e59a9a}
.cta{width:100%;min-height:50px;border:0;border-radius:14px;background:var(--ac);color:#fff;font-weight:600;font-size:13px;display:flex;align-items:center;justify-content:center;gap:10px;position:relative;box-shadow:0 8px 18px rgba(115,92,130,.28);transition:transform .15s,filter .2s}
.cta:hover{filter:brightness(1.08)}.cta:active{transform:scale(.985)}.cta:disabled{opacity:.5;cursor:not-allowed}.arr{position:absolute;right:16px}.fine{text-align:center;color:var(--mut);font-size:10.5px;margin-top:12px}
.art{background:var(--soft);border-color:transparent;box-shadow:none;min-height:520px;display:flex;flex-direction:column;justify-content:space-between}
.clocks{position:relative;flex:1;min-height:380px}.orb{position:absolute;inset:6%;border:1px solid var(--cell);border-radius:50%;opacity:.7}
.clk{position:absolute;width:44%}.clk .shd{fill:var(--shd)}.clk .face{fill:var(--card)}.clk .ring{fill:none;stroke:var(--cell);stroke-width:.8}.clk .hand{stroke:var(--pk);stroke-linecap:round}.clk .dot{fill:var(--pk)}
.clk svg{width:100%;display:block}.clk p{font-size:10.5px;margin-top:4px;text-align:center;color:var(--mut)}.clk p b{display:block;font-size:13px;color:var(--ink)}
.c1{left:8%;top:2%}.c2{right:4%;bottom:2%}.quote{position:absolute;left:4%;top:50%;font-size:11px;font-weight:600}.quote i{font:italic 15px "Iowan Old Style",Georgia,serif;font-weight:400}.cap{color:var(--mut);font-size:10.5px}
.hit{background:var(--soft);border-color:transparent;animation:in .35s ease}.hh{display:flex;justify-content:space-between;align-items:center}
.pill{background:var(--card);border-radius:99px;padding:5px 11px;font-size:10px;font-weight:700;color:var(--ac)}.dt{font-size:11px;color:var(--mut)}
.hit h2{font-size:26px;font-weight:500;margin:18px 0 4px}.inner{position:relative;background:var(--card);border:1px solid var(--line);border-radius:20px;padding:20px;margin:18px 0 12px}
.tag{position:absolute;right:16px;top:16px;font-size:11px;font-weight:600;background:var(--soft);border-radius:99px;padding:4px 10px}
.big{font-size:clamp(44px,9vw,60px);font-weight:600;letter-spacing:-.05em;line-height:1.05;margin-top:12px;color:var(--pk)}
.loc{display:flex;justify-content:space-between;align-items:center;gap:8px;border-top:1px solid var(--line);margin-top:16px;padding-top:14px}.loc b{font-size:13px}.loc small{display:block;color:var(--mut);font-size:10.5px;margin-left:34px}.loc strong{font-size:22px;letter-spacing:-.03em;font-weight:600}
.pip{display:inline-block;width:8px;height:8px;border-radius:9px;background:var(--r)}.pip.great{background:var(--g)}.pip.ok{background:var(--w)}
.note{font-size:11px;color:var(--mut);margin:0 0 14px}.hit .cta{margin-top:2px}.tl .note{margin:16px 0 0}
.oh{display:flex;justify-content:space-between;align-items:baseline;gap:10px;flex-wrap:wrap;margin-top:6px}.oh small{color:var(--mut);font-size:11px}.opts .oh{margin-bottom:6px}
.opt{width:100%;display:flex;align-items:center;gap:12px;margin-top:10px;padding:11px 14px;border:1px solid var(--line);background:var(--fld);border-radius:14px;text-align:left;min-height:56px;transition:all .15s}
.opt:hover{border-color:var(--lil)}.opt.on{background:var(--soft);border-color:var(--lil)}.opt:active{transform:scale(.99)}
.ot{flex:1;min-width:0}.ot b{display:flex;align-items:center;flex-wrap:wrap;gap:4px 8px;font-size:13px}.rec{font-style:normal;font-size:10px;font-weight:700;background:var(--card);color:var(--ac);border-radius:99px;padding:2px 9px;white-space:nowrap}.ot small{display:block;color:var(--mut);font-size:11px;margin-top:2px}.opt strong{font-size:13px}
.gl{padding:20px 24px}.glr{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:12px 0;border-bottom:1px solid var(--line)}.glr:last-child{border:0;padding-bottom:0}
.glr b{font-size:13px}.glr small{display:block;color:var(--mut);font-size:10.5px;margin-left:24px}.glr strong{font-size:18px;letter-spacing:-.02em}.you{font-style:normal;font-size:10px;font-weight:700;background:var(--soft);color:var(--ac);border-radius:99px;padding:1px 8px;margin-left:8px}
.tl{margin-top:20px}.leg{font-size:10.5px;color:var(--mut)}.leg i{display:inline-block;width:9px;height:9px;border-radius:3px;margin:0 4px 0 10px;vertical-align:middle}.leg .u{background:var(--cell)}.leg .a{background:var(--ok);border:1px solid var(--line)}.leg .p{background:var(--pk)}.leg .nw{width:2px;height:12px;background:var(--r);border-radius:0}
.tlw{margin-top:18px;display:grid;gap:14px}.tr{display:grid;grid-template-columns:110px 1fr;gap:14px;align-items:start}.tr p{font-size:12px}.tr small{display:block;color:var(--mut);font-size:10.5px}
.cells{position:relative;display:grid;gap:2px}.cells i{height:24px;border-radius:3px;background:var(--line);opacity:.55}.cells i.ok{background:var(--ok);opacity:1;outline:1px solid var(--line);outline-offset:-1px}.cells i.on{background:var(--cell);opacity:1}.cells i.pk{background:var(--pk);opacity:1}
.now{position:absolute;top:-3px;bottom:-3px;width:2px;background:var(--r);border-radius:2px;pointer-events:none}.ticks{display:flex;justify-content:space-between;font-size:9.5px;color:var(--mut);margin-top:6px}
footer{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-top:36px;padding-top:18px;border-top:1px solid var(--line);font-size:11px;color:var(--mut)}.fb{font-weight:700;color:var(--ink)}.fb small{font-weight:400;color:var(--mut)}
@keyframes in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@media(max-width:860px){.grid{grid-template-columns:1fr}.amp{font-size:90px}.art{min-height:440px}}
@media(max-width:560px){.wrap{padding:14px 14px 22px}.amp{display:none}.card{padding:20px;border-radius:22px}.tr{grid-template-columns:1fr;gap:6px}.tr p small{display:inline;margin-left:6px}.cells i{height:20px}.cells{gap:1px}.ticks span:nth-child(2){display:none}}
@media(prefers-reduced-motion:reduce){.tw *{animation:none!important}}
`;
