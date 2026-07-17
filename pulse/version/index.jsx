import { useState, useEffect, useRef } from "react";

const URGENCY_THRESHOLD = 7 * 24 * 3600000; // 1 week

const defaultProjects = [
  { id: 1, name: "Q1 Financial Report", deadline: new Date(Date.now() + 1.5 * 86400000).toISOString(), done: false },
  { id: 2, name: "Client Pitch Deck", deadline: new Date(Date.now() + 0.4 * 86400000).toISOString(), done: false },
  { id: 3, name: "API Security Audit", deadline: new Date(Date.now() + 2.8 * 86400000).toISOString(), done: false },
  { id: 4, name: "Design System v2", deadline: new Date(Date.now() + 14 * 86400000).toISOString(), done: false },
  { id: 5, name: "User Research Survey", deadline: new Date(Date.now() + 0.9 * 86400000).toISOString(), done: false },
  { id: 6, name: "Brand Refresh", deadline: new Date(Date.now() + 20 * 86400000).toISOString(), done: false },
  { id: 7, name: "Product Roadmap 2026", deadline: new Date(Date.now() + 30 * 86400000).toISOString(), done: false },
];

function getTimeLeft(deadline) {
  const diff = new Date(deadline) - new Date();
  if (diff <= 0) return { expired: true, days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  return {
    expired: false,
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
    total: diff,
  };
}

function urgencyLevel(deadline) {
  const diff = new Date(deadline) - new Date();
  if (diff <= 0) return "expired";
  if (diff < 12 * 3600000) return "critical";
  if (diff < 48 * 3600000) return "high";
  if (diff < URGENCY_THRESHOLD) return "moderate";
  return "upcoming";
}

const cfg = {
  expired:  { label: "EXPIRED",   color: "#ff3b5c", dim: "#ff3b5c22" },
  critical: { label: "CRITICAL",  color: "#ff6b35", dim: "#ff6b3522" },
  high:     { label: "URGENT",    color: "#fbbf24", dim: "#fbbf2422" },
  moderate: { label: "THIS WEEK", color: "#34d399", dim: "#34d39922" },
  upcoming: { label: "UPCOMING",  color: "#64748b", dim: "#64748b18" },
};

const sortFns = {
  soonest: (a, b) => new Date(a.deadline) - new Date(b.deadline),
  name: (a, b) => a.name.localeCompare(b.name),
  urgency: (a, b) => {
    const order = ["expired", "critical", "high", "moderate", "upcoming"];
    return order.indexOf(urgencyLevel(a.deadline)) - order.indexOf(urgencyLevel(b.deadline));
  },
};

function Pad(n) { return String(n).padStart(2, "0"); }

function ProjectCard({ project, onDelete, onToggleDone, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(project.name);
  const [editDate, setEditDate] = useState(project.deadline.slice(0, 10));
  const [editTime, setEditTime] = useState(project.deadline.slice(11, 16));
  const [hovered, setHovered] = useState(false);
  const time = getTimeLeft(project.deadline);
  const level = urgencyLevel(project.deadline);
  const c = cfg[level];
  const isUrgent = level !== "upcoming";

  const saveEdit = () => {
    onEdit(project.id, editName, new Date(`${editDate}T${editTime}`).toISOString());
    setEditing(false);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: project.done ? "rgba(255,255,255,0.015)" : hovered ? "rgba(255,255,255,0.045)" : "rgba(255,255,255,0.025)",
        border: `1px solid ${project.done ? "#1e1e1e" : c.color + "44"}`,
        borderLeft: `3px solid ${project.done ? "#2a2a2a" : c.color}`,
        borderRadius: "8px",
        padding: editing ? "16px" : "14px 16px",
        marginBottom: "8px",
        transition: "all 0.2s ease",
        opacity: project.done ? 0.45 : 1,
        animation: "cardIn 0.35s ease both",
      }}
    >
      {editing ? (
        <div>
          <input value={editName} onChange={e => setEditName(e.target.value)}
            style={{ width: "100%", background: "#111", border: "1px solid #333", borderRadius: "5px",
              padding: "8px 10px", color: "#f0f0f0", fontSize: "15px",
              fontFamily: "'DM Mono', monospace", marginBottom: "8px", outline: "none" }} />
          <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
            <input type="date" value={editDate} onChange={e => setEditDate(e.target.value)}
              style={{ flex: 1, background: "#111", border: "1px solid #333", borderRadius: "5px",
                padding: "8px 10px", color: "#f0f0f0", fontSize: "13px",
                fontFamily: "'DM Mono', monospace", outline: "none", colorScheme: "dark" }} />
            <input type="time" value={editTime} onChange={e => setEditTime(e.target.value)}
              style={{ flex: 1, background: "#111", border: "1px solid #333", borderRadius: "5px",
                padding: "8px 10px", color: "#f0f0f0", fontSize: "13px",
                fontFamily: "'DM Mono', monospace", outline: "none", colorScheme: "dark" }} />
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={saveEdit} style={{ flex: 1, background: c.color, border: "none", borderRadius: "5px",
              padding: "8px", color: "#000", fontFamily: "'DM Mono', monospace",
              fontSize: "11px", letterSpacing: "1px", cursor: "pointer", fontWeight: 700 }}>SAVE</button>
            <button onClick={() => setEditing(false)} style={{ flex: 1, background: "transparent",
              border: "1px solid #2a2a2a", borderRadius: "5px", padding: "8px", color: "#555",
              fontFamily: "'DM Mono', monospace", fontSize: "11px", cursor: "pointer" }}>CANCEL</button>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Checkbox */}
          <button onClick={() => onToggleDone(project.id)} style={{
            width: "20px", height: "20px", borderRadius: "4px", border: `1.5px solid ${project.done ? c.color : "#333"}`,
            background: project.done ? c.color : "transparent", cursor: "pointer", flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s",
          }}>
            {project.done && <span style={{ color: "#000", fontSize: "12px", fontWeight: 900, lineHeight: 1 }}>✓</span>}
          </button>

          {/* Main content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: isUrgent && !project.done ? "6px" : "0" }}>
              <span style={{ fontSize: "8px", fontFamily: "'DM Mono', monospace", letterSpacing: "1.5px",
                color: c.color, background: c.dim, padding: "2px 6px", borderRadius: "3px",
                flexShrink: 0 }}>{c.label}</span>
              <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "16px", fontWeight: 600,
                color: project.done ? "#444" : "#e8e8e8", textDecoration: project.done ? "line-through" : "none",
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{project.name}</span>
            </div>

            {/* Countdown (only for urgent, non-done) */}
            {isUrgent && !project.done && (
              <div style={{ display: "flex", gap: "6px", alignItems: "baseline" }}>
                {time.expired ? (
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "13px", color: c.color, letterSpacing: "2px" }}>PAST DUE</span>
                ) : (
                  <>
                    {time.days > 0 && <span style={{ fontFamily: "'DM Mono', monospace" }}>
                      <span style={{ fontSize: "22px", fontWeight: 700, color: c.color }}>{time.days}</span>
                      <span style={{ fontSize: "10px", color: "#555", marginLeft: "1px" }}>d</span>
                    </span>}
                    <span style={{ fontFamily: "'DM Mono', monospace" }}>
                      <span style={{ fontSize: "22px", fontWeight: 700, color: c.color }}>{Pad(time.hours)}</span>
                      <span style={{ fontSize: "10px", color: "#555", marginLeft: "1px" }}>h</span>
                    </span>
                    <span style={{ fontFamily: "'DM Mono', monospace" }}>
                      <span style={{ fontSize: "22px", fontWeight: 700, color: c.color }}>{Pad(time.minutes)}</span>
                      <span style={{ fontSize: "10px", color: "#555", marginLeft: "1px" }}>m</span>
                    </span>
                    <span style={{ fontFamily: "'DM Mono', monospace" }}>
                      <span style={{ fontSize: "18px", fontWeight: 700, color: c.color + "99" }}>{Pad(time.seconds)}</span>
                      <span style={{ fontSize: "10px", color: "#555", marginLeft: "1px" }}>s</span>
                    </span>
                  </>
                )}
              </div>
            )}

            {/* Due date for upcoming */}
            {!isUrgent && (
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#3a3a3a", marginTop: "2px" }}>
                Due {new Date(project.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </div>
            )}
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: "6px", opacity: hovered ? 1 : 0, transition: "opacity 0.15s", flexShrink: 0 }}>
            <button onClick={() => setEditing(true)} title="Edit" style={{
              background: "transparent", border: "1px solid #2a2a2a", borderRadius: "4px",
              color: "#555", cursor: "pointer", padding: "4px 7px", fontSize: "12px",
              transition: "all 0.15s",
            }}
              onMouseEnter={e => { e.target.style.borderColor = "#fbbf24"; e.target.style.color = "#fbbf24"; }}
              onMouseLeave={e => { e.target.style.borderColor = "#2a2a2a"; e.target.style.color = "#555"; }}
            >✎</button>
            <button onClick={() => onDelete(project.id)} title="Delete" style={{
              background: "transparent", border: "1px solid #2a2a2a", borderRadius: "4px",
              color: "#555", cursor: "pointer", padding: "4px 7px", fontSize: "12px",
              transition: "all 0.15s",
            }}
              onMouseEnter={e => { e.target.style.borderColor = "#ff3b5c"; e.target.style.color = "#ff3b5c"; }}
              onMouseLeave={e => { e.target.style.borderColor = "#2a2a2a"; e.target.style.color = "#555"; }}
            >×</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DeadlineWidgetV2() {
  const [projects, setProjects] = useState(defaultProjects);
  const [tick, setTick] = useState(0);
  const [sort, setSort] = useState("soonest");
  const [upcomingOpen, setUpcomingOpen] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("09:00");

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const sorted = [...projects].sort(sortFns[sort]);
  const urgent = sorted.filter(p => urgencyLevel(p.deadline) !== "upcoming");
  const upcoming = sorted.filter(p => urgencyLevel(p.deadline) === "upcoming");
  const doneCount = projects.filter(p => p.done).length;

  const handleAdd = () => {
    if (!newName || !newDate) return;
    setProjects(prev => [...prev, {
      id: Date.now(), name: newName,
      deadline: new Date(`${newDate}T${newTime}`).toISOString(), done: false,
    }]);
    setNewName(""); setNewDate(""); setNewTime("09:00"); setShowAdd(false);
  };

  const handleDelete = id => setProjects(prev => prev.filter(p => p.id !== id));
  const handleToggleDone = id => setProjects(prev => prev.map(p => p.id === id ? { ...p, done: !p.done } : p));
  const handleEdit = (id, name, deadline) => setProjects(prev => prev.map(p => p.id === id ? { ...p, name, deadline } : p));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Mono:wght@400;500&display=swap');
        @keyframes cardIn { from { opacity:0; transform: translateY(-6px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        * { box-sizing: border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #222; border-radius: 2px; }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: "#080808",
        backgroundImage: "radial-gradient(ellipse at 20% 0%, #1a0a0022 0%, transparent 60%), radial-gradient(ellipse at 80% 100%, #0a1a0a22 0%, transparent 60%)",
        display: "flex", justifyContent: "center", padding: "36px 16px",
        fontFamily: "'DM Mono', monospace",
      }}>
        <div style={{ width: "100%", maxWidth: "460px", animation: "fadeUp 0.5s ease both" }}>

          {/* Header */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div>
                <div style={{ fontSize: "9px", letterSpacing: "3px", color: "#333", marginBottom: "6px" }}>
                  DEADLINE TRACKER — V2
                </div>
                <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "32px", fontWeight: 800,
                  color: "#f5f5f5", letterSpacing: "-0.5px", lineHeight: 1 }}>
                  Your Projects
                </h1>
                <div style={{ fontSize: "11px", color: "#383838", marginTop: "6px" }}>
                  {doneCount}/{projects.length} completed · sorted by {sort}
                </div>
              </div>

              {/* Sort controls */}
              <div style={{ display: "flex", gap: "4px" }}>
                {["soonest", "name", "urgency"].map(s => (
                  <button key={s} onClick={() => setSort(s)} style={{
                    background: sort === s ? "#1e1e1e" : "transparent",
                    border: `1px solid ${sort === s ? "#333" : "#1a1a1a"}`,
                    borderRadius: "4px", padding: "5px 8px",
                    color: sort === s ? "#e0e0e0" : "#383838",
                    fontFamily: "'DM Mono', monospace", fontSize: "9px",
                    letterSpacing: "1px", cursor: "pointer", transition: "all 0.15s",
                    textTransform: "uppercase",
                  }}>{s === "soonest" ? "⏱" : s === "name" ? "Az" : "!!"}</button>
                ))}
              </div>
            </div>
            <div style={{ height: "1px", background: "linear-gradient(90deg, #1e1e1e, transparent)", marginTop: "16px" }} />
          </div>

          {/* Urgent section */}
          <div style={{ marginBottom: "8px" }}>
            <div style={{ fontSize: "9px", letterSpacing: "2px", color: "#ff3b5c88", marginBottom: "10px" }}>
              ▲ URGENT · WITHIN 7 DAYS ({urgent.length})
            </div>
            {urgent.length === 0 ? (
              <div style={{ textAlign: "center", padding: "32px 20px", border: "1px dashed #1a1a1a",
                borderRadius: "8px", fontSize: "11px", color: "#2a2a2a", letterSpacing: "1px" }}>
                NO URGENT DEADLINES
              </div>
            ) : (
              urgent.map(p => (
                <ProjectCard key={p.id} project={p}
                  onDelete={handleDelete} onToggleDone={handleToggleDone} onEdit={handleEdit} />
              ))
            )}
          </div>

          {/* Upcoming section */}
          {upcoming.length > 0 && (
            <div style={{ marginTop: "20px" }}>
              <button onClick={() => setUpcomingOpen(o => !o)} style={{
                display: "flex", alignItems: "center", gap: "8px", width: "100%",
                background: "transparent", border: "none", cursor: "pointer", padding: "4px 0",
                marginBottom: "10px",
              }}>
                <div style={{ height: "1px", flex: 1, background: "#1e1e1e" }} />
                <span style={{ fontSize: "9px", letterSpacing: "2px", color: "#2e2e2e",
                  fontFamily: "'DM Mono', monospace", flexShrink: 0 }}>
                  {upcomingOpen ? "▼" : "▶"} UPCOMING ({upcoming.length})
                </span>
                <div style={{ height: "1px", flex: 1, background: "#1e1e1e" }} />
              </button>

              {upcomingOpen && upcoming.map(p => (
                <ProjectCard key={p.id} project={p}
                  onDelete={handleDelete} onToggleDone={handleToggleDone} onEdit={handleEdit} />
              ))}
            </div>
          )}

          {/* Add project */}
          <div style={{ marginTop: "20px" }}>
            {!showAdd ? (
              <button onClick={() => setShowAdd(true)} style={{
                width: "100%", background: "transparent",
                border: "1px dashed #1e1e1e", borderRadius: "8px",
                padding: "13px", cursor: "pointer",
                fontFamily: "'DM Mono', monospace",
                fontSize: "10px", letterSpacing: "2px", color: "#2e2e2e",
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#34d39966"; e.currentTarget.style.color = "#34d399"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e1e1e"; e.currentTarget.style.color = "#2e2e2e"; }}
              >+ ADD PROJECT</button>
            ) : (
              <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid #1e1e1e",
                borderRadius: "8px", padding: "16px", animation: "cardIn 0.3s ease" }}>
                <input placeholder="Project name" value={newName} onChange={e => setNewName(e.target.value)}
                  style={{ width: "100%", background: "#0f0f0f", border: "1px solid #222", borderRadius: "5px",
                    padding: "10px 12px", color: "#f0f0f0", fontSize: "15px",
                    fontFamily: "'Syne', sans-serif", marginBottom: "8px", outline: "none" }} />
                <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                  <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)}
                    style={{ flex: 1, background: "#0f0f0f", border: "1px solid #222", borderRadius: "5px",
                      padding: "10px 12px", color: "#f0f0f0", fontSize: "12px",
                      fontFamily: "'DM Mono', monospace", outline: "none", colorScheme: "dark" }} />
                  <input type="time" value={newTime} onChange={e => setNewTime(e.target.value)}
                    style={{ flex: 1, background: "#0f0f0f", border: "1px solid #222", borderRadius: "5px",
                      padding: "10px 12px", color: "#f0f0f0", fontSize: "12px",
                      fontFamily: "'DM Mono', monospace", outline: "none", colorScheme: "dark" }} />
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button onClick={handleAdd} style={{ flex: 1, background: "#34d399", border: "none",
                    borderRadius: "5px", padding: "10px", color: "#000",
                    fontFamily: "'DM Mono', monospace", fontSize: "11px",
                    letterSpacing: "1px", cursor: "pointer", fontWeight: 700 }}>ADD</button>
                  <button onClick={() => setShowAdd(false)} style={{ flex: 1, background: "transparent",
                    border: "1px solid #1e1e1e", borderRadius: "5px", padding: "10px", color: "#444",
                    fontFamily: "'DM Mono', monospace", fontSize: "11px", cursor: "pointer" }}>CANCEL</button>
                </div>
              </div>
            )}
          </div>

          {/* Legend */}
          <div style={{ marginTop: "28px", display: "flex", gap: "14px", justifyContent: "center",
            flexWrap: "wrap", fontSize: "8px", letterSpacing: "1px" }}>
            {[
              { color: "#ff3b5c", label: "EXPIRED" },
              { color: "#ff6b35", label: "<12H" },
              { color: "#fbbf24", label: "<48H" },
              { color: "#34d399", label: "THIS WEEK" },
              { color: "#64748b", label: "UPCOMING" },
            ].map(({ color, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "5px", color: "#2e2e2e" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: color }} />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
