const palette = {
  React: { classes: "bg-sky-500/20 text-sky-200 border-sky-500/30", accent: "#38bdf8" },
  "Context API": { classes: "bg-sky-500/20 text-sky-200 border-sky-500/30", accent: "#38bdf8" },
  Vite: { classes: "bg-amber-500/20 text-amber-200 border-amber-500/30", accent: "#facc15" },
  Flask: { classes: "bg-lime-500/20 text-lime-200 border-lime-500/30", accent: "#a3e635" },
  SQLAlchemy: { classes: "bg-emerald-500/20 text-emerald-200 border-emerald-500/30", accent: "#34d399" },
  PostgreSQL: { classes: "bg-cyan-500/20 text-cyan-200 border-cyan-500/30", accent: "#22d3ee" },
  Docker: { classes: "bg-blue-500/20 text-blue-200 border-blue-500/30", accent: "#60a5fa" },
  Render: { classes: "bg-indigo-500/20 text-indigo-200 border-indigo-500/30", accent: "#818cf8" },
  Tailwind: { classes: "bg-teal-500/20 text-teal-200 border-teal-500/30", accent: "#2dd4bf" },
  Python: { classes: "bg-yellow-500/20 text-yellow-100 border-yellow-500/30", accent: "#facc15" },
  ERAlchemy: { classes: "bg-rose-500/20 text-rose-100 border-rose-500/30", accent: "#fb7185" },
  Bootstrap: { classes: "bg-violet-500/20 text-violet-200 border-violet-500/30", accent: "#a855f7" },
  HTML: { classes: "bg-orange-500/20 text-orange-200 border-orange-500/30", accent: "#fb923c" },
  CSS: { classes: "bg-sky-400/20 text-sky-100 border-sky-400/30", accent: "#38bdf8" },
  Webpack: { classes: "bg-blue-400/20 text-blue-100 border-blue-400/30", accent: "#60a5fa" },
  REST: { classes: "bg-fuchsia-500/20 text-fuchsia-100 border-fuchsia-500/30", accent: "#e879f9" },
  "REST APIs": { classes: "bg-fuchsia-500/20 text-fuchsia-100 border-fuchsia-500/30", accent: "#e879f9" },
};

const fallback = { classes: "bg-white/15 text-white border-white/20", accent: "#94a3b8" };

export function getTechStyle(label) {
  return (palette[label] ?? fallback).classes;
}

export function getTechAccent(label) {
  return (palette[label] ?? fallback).accent;
}
