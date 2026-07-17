import { useState, useEffect } from "react";

// ─── Theme ───────────────────────────────────────────────────────────────────
const themes = {
  light: {
    bg:          "#E8E8F0",   // periwinkle-tinted base
    surface:     "#EEEEF6",   // card surface
    surfaceHover:"#E4E4EE",
    border:      "#D0D0E0",
    borderStrong:"#B0B0CC",
    text:        "#1A1A2E",   // deep ink
    textSub:     "#6B6B8A",
    textGhost:   "#B0B0C8",
    accent:      "#7C7CAE",   // muted lavender
    accentSoft:  "#D4D4EE",
    divider:     "#D8D8E8",
    inputBg:     "#E0E0EC",
    badge:       "#DCDCF0",
    badgeText:   "#5A5A8A",
  },
  dark: {
    bg:          "#0D0D1A",   // midnight blue
    surface:     "#13132A",
    surfaceHover:"#1A1A34",
    border:      "#2A2A4A",
    borderStrong:"#3A3A60",
    text:        "#E8E4F0",   // warm cream
    textSub:     "#8880AA",
    textGhost:   "#3A3860",
    accent:      "#9B8EC4",   // soft violet
    accentSoft:  "#2A2448",
    divider:     "#1E1E38",
    inputBg:     "#0A0A18",
    badge:       "#1E1A38",
    badgeText:   "#9B8EC4",
  },
};

// ─── Urgency ─────────────────────────────────────────────────────────────────
const URGENT_THRESHOLD = 7 * 24 * 3600000;

function getTimeLeft(deadline) {
  const diff = new Date(deadline) - new Date();
  if (diff <= 0) return { expired: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    expired: false,
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000)  / 60000),
    seconds: Math.floor((diff % 60000)    / 1000),
  };
}

function urgencyLevel(deadline) {
  const diff = new Date(deadline) - new Date();
  if (diff <= 0)                    return "expired";
  if (diff < 12 * 3600000)         return "critical";
  if (diff < 48 * 3600000)         return "high";
  if (diff < URGENT_THRESHOLD)     return "moderate";
  return "upcoming";
}

const urgencyMeta = {
  expired:  { label: "Expired",   pulse: "throb",  opacity: 1   },
  critical: { label: "Critical",  pulse: "breathe",opacity: 1   },
  high:     { label: "Urgent",    pulse: "breathe",opacity: 1   },
  moderate: { label: "This week", pulse: "none",   opacity: 1   },
  upcoming: { label: "Upcoming",  pulse: "none",   opacity: 0.45},
};

const sortFns = {
  soonest: (a, b) => new Date(a.deadline) - new Date(b.deadline),
  name:    (a, b) => a.name.localeCompare(b.name),
  urgency: (a, b) => {
    const o = ["expired","critical","high","moderate","upcoming"];
    return o.indexOf(urgencyLevel(a.deadline)) - o.indexOf(urgencyLevel(b.deadline));
  },
};

function pad(n) { return String(n).padStart(2, "0"); }

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

// ─── Card ─────────────────────────────────────────────────────────────────────
function ProjectCard({ project, t, onDelete, onToggleDone, onEdit }) {
  const [editing, setEditing]   = useState(false);
  const [editName, setEditName] = useState(project.name);
  const [editDate, setEditDate] = useState(project.deadline.slice(0, 10));
  const [editTime, setEditTime] = useState(project.deadline.slice(11, 16));

  const time  = getTimeLeft(project.deadline);
  const level = urgencyLevel(project.deadline);
  const meta  = urgencyMeta[level];
  const isUrgent = level !== "upcoming";

  const animClass =
    project.done     ? "" :
    meta.pulse === "throb"   ? "anim-throb" :
    meta.pulse === "breathe" ? "anim-breathe" : "";

  const saveEdit = () => {
    onEdit(project.id, editName, new Date(`${editDate}T${editTime}`).toISOString());
    setEditing(false);
  };

  return (
    <div className={animClass} style={{
      background:   t.surface,
      border:       `1px solid ${t.border}`,
      borderRadius: "10px",
      padding:      editing ? "18px" : "16px 18px",
      marginBottom: "8px",
      opacity:      project.done ? 0.4 : meta.opacity,
      transition:   "opacity 0.3s ease, background 0.2s ease",
    }}>
      {editing ? (
        <div>
          <input value={editName} onChange={e => setEditName(e.target.value)}
            placeholder="Project name"
            style={{ width: "100%", background: t.inputBg, border: `1px solid ${t.border}`,
              borderRadius: "6px", padding: "9px 12px", color: t.text,
              fontFamily: "'Lora', serif", fontSize: "15px",
              marginBottom: "8px", outline: "none" }} />
          <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
            <input type="date" value={editDate} onChange={e => setEditDate(e.target.value)}
              style={{ flex: 1, background: t.inputBg, border: `1px solid ${t.border}`,
                borderRadius: "6px", padding: "9px 12px", color: t.text,
                fontFamily: "'Azeret Mono', monospace", fontSize: "12px",
                outline: "none", colorScheme: "dark" }} />
            <input type="time" value={editTime} onChange={e => setEditTime(e.target.value)}
              style={{ flex: 1, background: t.inputBg, border: `1px solid ${t.border}`,
                borderRadius: "6px", padding: "9px 12px", color: t.text,
                fontFamily: "'Azeret Mono', monospace", fontSize: "12px",
                outline: "none", colorScheme: "dark" }} />
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={saveEdit}
              style={{ flex: 1, background: t.accent, border: "none", borderRadius: "6px",
                padding: "9px", color: "#fff", fontFamily: "'Azeret Mono', monospace",
                fontSize: "11px", letterSpacing: "1px", cursor: "pointer", fontWeight: 600 }}>
              Save
            </button>
            <button onClick={() => setEditing(false)}
              style={{ flex: 1, background: "transparent", border: `1px solid ${t.border}`,
                borderRadius: "6px", padding: "9px", color: t.textSub,
                fontFamily: "'Azeret Mono', monospace", fontSize: "11px", cursor: "pointer" }}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          {/* Checkbox */}
          <button onClick={() => onToggleDone(project.id)} style={{
            width: "18px", height: "18px", borderRadius: "50%",
            border: `1.5px solid ${project.done ? t.accent : t.borderStrong}`,
            background: project.done ? t.accent : "transparent",
            cursor: "pointer", flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
          }}>
            {project.done && <span style={{ color: "#fff", fontSize: "10px", lineHeight: 1 }}>✓</span>}
          </button>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Badge + name row */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: isUrgent && !project.done ? "8px" : "2px" }}>
              <span style={{
                fontSize: "9px", fontFamily: "'Azeret Mono', monospace", letterSpacing: "1px",
                color: t.badgeText, background: t.badge,
                padding: "2px 7px", borderRadius: "20px", flexShrink: 0,
              }}>{meta.label}</span>
              <span style={{
                fontFamily: "'Lora', serif", fontSize: "15px", fontWeight: project.done ? 400 : 600,
                color: project.done ? t.textSub : t.text,
                textDecoration: project.done ? "line-through" : "none",
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>{project.name}</span>
            </div>

            {/* Countdown — urgent only, not done */}
            {isUrgent && !project.done && (
              <div style={{ display: "flex", gap: "4px", alignItems: "baseline" }}>
                {time.expired ? (
                  <span style={{ fontFamily: "'Azeret Mono', monospace", fontSize: "13px",
                    color: t.textSub, letterSpacing: "2px" }}>Past due</span>
                ) : (
                  <>
                    {time.days > 0 && (
                      <span style={{ fontFamily: "'Azeret Mono', monospace" }}>
                        <span style={{ fontSize: "26px", fontWeight: 700, color: t.text }}>{time.days}</span>
                        <span style={{ fontSize: "10px", color: t.textSub, marginLeft: "1px" }}>d </span>
                      </span>
                    )}
                    <span style={{ fontFamily: "'Azeret Mono', monospace" }}>
                      <span style={{ fontSize: "26px", fontWeight: 700, color: t.text }}>{pad(time.hours)}</span>
                      <span style={{ fontSize: "10px", color: t.textSub, marginLeft: "1px" }}>h </span>
                    </span>
                    <span style={{ fontFamily: "'Azeret Mono', monospace" }}>
                      <span style={{ fontSize: "26px", fontWeight: 700, color: t.text }}>{pad(time.minutes)}</span>
                      <span style={{ fontSize: "10px", color: t.textSub, marginLeft: "1px" }}>m </span>
                    </span>
                    <span style={{ fontFamily: "'Azeret Mono', monospace" }}>
                      <span style={{ fontSize: "20px", fontWeight: 500, color: t.textSub }}>{pad(time.seconds)}</span>
                      <span style={{ fontSize: "10px", color: t.textGhost, marginLeft: "1px" }}>s</span>
                    </span>
                  </>
                )}
              </div>
            )}

            {/* Due date — upcoming */}
            {!isUrgent && (
              <span style={{ fontFamily: "'Azeret Mono', monospace", fontSize: "11px", color: t.textGhost }}>
                {formatDate(project.deadline)}
              </span>
            )}
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
            <button onClick={() => setEditing(true)} title="Edit"
              style={{ background: "transparent", border: `1px solid ${t.border}`,
                borderRadius: "5px", color: t.textSub, cursor: "pointer",
                padding: "4px 8px", fontSize: "12px", fontFamily: "'Azeret Mono', monospace",
                transition: "all 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.color = t.accent; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.textSub; }}
            >✎</button>
            <button onClick={() => onDelete(project.id)} title="Delete"
              style={{ background: "transparent", border: `1px solid ${t.border}`,
                borderRadius: "5px", color: t.textSub, cursor: "pointer",
                padding: "4px 8px", fontSize: "12px", fontFamily: "'Azeret Mono', monospace",
                transition: "all 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = t.borderStrong; e.currentTarget.style.color = t.text; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.textSub; }}
            >×</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
const defaultProjects = [
  { id: 1, name: "Q1 Financial Report",  deadline: new Date(Date.now() + 1.5 * 86400000).toISOString(), done: false },
  { id: 2, name: "Client Pitch Deck",    deadline: new Date(Date.now() + 0.4 * 86400000).toISOString(), done: false },
  { id: 3, name: "API Security Audit",   deadline: new Date(Date.now() + 2.8 * 86400000).toISOString(), done: false },
  { id: 4, name: "Design System v3",     deadline: new Date(Date.now() + 14  * 86400000).toISOString(), done: false },
  { id: 5, name: "User Research Survey", deadline: new Date(Date.now() + 0.9 * 86400000).toISOString(), done: false },
  { id: 6, name: "Brand Refresh",        deadline: new Date(Date.now() + 20  * 86400000).toISOString(), done: false },
  { id: 7, name: "Product Roadmap 2026", deadline: new Date(Date.now() + 30  * 86400000).toISOString(), done: false },
];

export default function Pulse() {
  const [mode,          setMode]          = useState("dark");
  const [projects,      setProjects]      = useState(defaultProjects);
  const [sort,          setSort]          = useState("soonest");
  const [upcomingOpen,  setUpcomingOpen]  = useState(true);
  const [showAdd,       setShowAdd]       = useState(false);
  const [newName,       setNewName]       = useState("");
  const [newDate,       setNewDate]       = useState("");
  const [newTime,       setNewTime]       = useState("09:00");
  const [,              setTick]          = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const t        = themes[mode];
  const sorted   = [...projects].sort(sortFns[sort]);
  const urgent   = sorted.filter(p => urgencyLevel(p.deadline) !== "upcoming");
  const upcoming = sorted.filter(p => urgencyLevel(p.deadline) === "upcoming");
  const done     = projects.filter(p => p.done).length;

  const handleAdd = () => {
    if (!newName || !newDate) return;
    setProjects(prev => [...prev, {
      id: Date.now(), name: newName,
      deadline: new Date(`${newDate}T${newTime}`).toISOString(), done: false,
    }]);
    setNewName(""); setNewDate(""); setNewTime("09:00"); setShowAdd(false);
  };

  const handleDelete     = id => setProjects(prev => prev.filter(p => p.id !== id));
  const handleToggleDone = id => setProjects(prev => prev.map(p => p.id === id ? { ...p, done: !p.done } : p));
  const handleEdit       = (id, name, deadline) =>
    setProjects(prev => prev.map(p => p.id === id ? { ...p, name, deadline } : p));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=Azeret+Mono:wght@400;500;600&display=swap');

        @keyframes breathe {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.72; }
        }
        @keyframes throb {
          0%, 100% { opacity: 1;    transform: scale(1); }
          50%       { opacity: 0.6; transform: scale(0.995); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .anim-breathe { animation: breathe 3.5s ease-in-out infinite; }
        .anim-throb   { animation: throb   2s   ease-in-out infinite; }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { border-radius: 2px; }
        input { color-scheme: dark; }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: t.bg,
        transition: "background 0.4s ease",
        display: "flex", justifyContent: "center",
        padding: "48px 16px 80px",
      }}>
        <div style={{ width: "100%", maxWidth: "480px", animation: "fadeUp 0.5s ease both" }}>

          {/* ── Header ────────────────────────────────────────── */}
          <div style={{ marginBottom: "36px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                {/* Wordmark */}
                <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                  <h1 style={{
                    fontFamily: "'Lora', serif", fontSize: "42px", fontWeight: 700,
                    color: t.text, letterSpacing: "-1px", lineHeight: 1,
                  }}>Pulse</h1>
                  <span style={{
                    fontFamily: "'Azeret Mono', monospace", fontSize: "9px",
                    color: t.textGhost, letterSpacing: "2px", marginBottom: "2px",
                  }}>v3</span>
                </div>
                <p style={{
                  fontFamily: "'Lora', serif", fontStyle: "italic",
                  fontSize: "13px", color: t.textSub, marginTop: "4px",
                }}>
                  {done}/{projects.length} done
                </p>
              </div>

              {/* Controls */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
                {/* Theme toggle */}
                <button onClick={() => setMode(m => m === "dark" ? "light" : "dark")}
                  style={{
                    background: t.surface, border: `1px solid ${t.border}`,
                    borderRadius: "20px", padding: "5px 12px",
                    color: t.textSub, cursor: "pointer",
                    fontFamily: "'Azeret Mono', monospace", fontSize: "10px",
                    letterSpacing: "1px", transition: "all 0.2s",
                  }}>
                  {mode === "dark" ? "☀ Light" : "☾ Dark"}
                </button>

                {/* Sort */}
                <div style={{ display: "flex", gap: "4px" }}>
                  {[["soonest","⏱"],["name","Az"],["urgency","!!"]].map(([s, label]) => (
                    <button key={s} onClick={() => setSort(s)} style={{
                      background:  sort === s ? t.accentSoft : "transparent",
                      border:      `1px solid ${sort === s ? t.accent : t.border}`,
                      borderRadius:"5px", padding: "4px 9px",
                      color:       sort === s ? t.accent : t.textGhost,
                      fontFamily:  "'Azeret Mono', monospace", fontSize: "10px",
                      cursor:      "pointer", transition: "all 0.15s",
                    }}>{label}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: "1px", background: t.divider, marginTop: "20px" }} />
          </div>

          {/* ── Urgent section ───────────────────────────────── */}
          <div style={{ marginBottom: "4px" }}>
            <div style={{
              fontFamily: "'Azeret Mono', monospace", fontSize: "9px",
              letterSpacing: "2px", color: t.textGhost,
              marginBottom: "12px", textTransform: "uppercase",
            }}>
              Within 7 days · {urgent.length} project{urgent.length !== 1 ? "s" : ""}
            </div>

            {urgent.length === 0 ? (
              <div style={{
                textAlign: "center", padding: "40px 20px",
                border: `1px dashed ${t.border}`, borderRadius: "10px",
                fontFamily: "'Lora', serif", fontStyle: "italic",
                fontSize: "14px", color: t.textGhost,
              }}>
                Nothing urgent right now.
              </div>
            ) : (
              urgent.map(p => (
                <ProjectCard key={p.id} project={p} t={t}
                  onDelete={handleDelete} onToggleDone={handleToggleDone} onEdit={handleEdit} />
              ))
            )}
          </div>

          {/* ── Upcoming section ─────────────────────────────── */}
          {upcoming.length > 0 && (
            <div style={{ marginTop: "28px" }}>
              <button onClick={() => setUpcomingOpen(o => !o)} style={{
                display: "flex", alignItems: "center", gap: "10px",
                width: "100%", background: "transparent", border: "none",
                cursor: "pointer", padding: "0 0 12px 0",
              }}>
                <div style={{ height: "1px", flex: 1, background: t.divider }} />
                <span style={{
                  fontFamily: "'Azeret Mono', monospace", fontSize: "9px",
                  letterSpacing: "2px", color: t.textGhost, flexShrink: 0,
                  textTransform: "uppercase",
                }}>
                  {upcomingOpen ? "▾" : "▸"} Upcoming · {upcoming.length}
                </span>
                <div style={{ height: "1px", flex: 1, background: t.divider }} />
              </button>

              {upcomingOpen && (
                <div style={{ animation: "slideDown 0.25s ease" }}>
                  {upcoming.map(p => (
                    <ProjectCard key={p.id} project={p} t={t}
                      onDelete={handleDelete} onToggleDone={handleToggleDone} onEdit={handleEdit} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Add project ──────────────────────────────────── */}
          <div style={{ marginTop: "24px" }}>
            {!showAdd ? (
              <button onClick={() => setShowAdd(true)} style={{
                width: "100%", background: "transparent",
                border: `1px dashed ${t.border}`,
                borderRadius: "10px", padding: "14px",
                cursor: "pointer", fontFamily: "'Lora', serif",
                fontStyle: "italic", fontSize: "13px", color: t.textGhost,
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.color = t.accent; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = t.border;  e.currentTarget.style.color = t.textGhost; }}
              >+ Add a project</button>
            ) : (
              <div style={{
                background: t.surface, border: `1px solid ${t.border}`,
                borderRadius: "10px", padding: "18px",
                animation: "slideDown 0.3s ease",
              }}>
                <input placeholder="Project name" value={newName}
                  onChange={e => setNewName(e.target.value)}
                  style={{ width: "100%", background: t.inputBg, border: `1px solid ${t.border}`,
                    borderRadius: "6px", padding: "10px 12px", color: t.text,
                    fontFamily: "'Lora', serif", fontSize: "15px",
                    marginBottom: "8px", outline: "none" }} />
                <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
                  <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)}
                    style={{ flex: 1, background: t.inputBg, border: `1px solid ${t.border}`,
                      borderRadius: "6px", padding: "10px 12px", color: t.text,
                      fontFamily: "'Azeret Mono', monospace", fontSize: "12px",
                      outline: "none", colorScheme: "dark" }} />
                  <input type="time" value={newTime} onChange={e => setNewTime(e.target.value)}
                    style={{ flex: 1, background: t.inputBg, border: `1px solid ${t.border}`,
                      borderRadius: "6px", padding: "10px 12px", color: t.text,
                      fontFamily: "'Azeret Mono', monospace", fontSize: "12px",
                      outline: "none", colorScheme: "dark" }} />
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button onClick={handleAdd} style={{
                    flex: 1, background: t.accent, border: "none", borderRadius: "6px",
                    padding: "10px", color: "#fff", fontFamily: "'Azeret Mono', monospace",
                    fontSize: "11px", letterSpacing: "1px", cursor: "pointer", fontWeight: 600,
                  }}>Add project</button>
                  <button onClick={() => setShowAdd(false)} style={{
                    flex: 1, background: "transparent", border: `1px solid ${t.border}`,
                    borderRadius: "6px", padding: "10px", color: t.textSub,
                    fontFamily: "'Azeret Mono', monospace", fontSize: "11px", cursor: "pointer",
                  }}>Cancel</button>
                </div>
              </div>
            )}
          </div>

          {/* ── Footer ───────────────────────────────────────── */}
          <div style={{
            marginTop: "48px", textAlign: "center",
            fontFamily: "'Lora', serif", fontStyle: "italic",
            fontSize: "11px", color: t.textGhost,
          }}>
            Motion signals urgency. Stillness means you have time.
          </div>

        </div>
      </div>
    </>
  );
}
