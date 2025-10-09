import { getTechStyle, getTechAccent } from "../data/techStyles";

export default function TechPill({ label, variant = "pill" }) {
  if (variant === "box") {
    const accent = getTechAccent(label);

    const hexToRgba = (hex, alpha) => {
      const parsed = hex.replace("#", "");
      if (parsed.length !== 6) return `rgba(148, 163, 184, ${alpha})`;
      const bigint = parseInt(parsed, 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    return (
      <span
        className="tech-box transition duration-200 ease-out"
        style={{
          "--accent": accent,
          "--border-color": hexToRgba(accent, 0.35),
          "--fill-color": hexToRgba(accent, 0.18),
          "--text-color": hexToRgba(accent, 0.85),
        }}
      >
        <span className="tech-box__label">{label}</span>
      </span>
    );
  }

  return (
    <span
      className={`pill ${getTechStyle(label)} transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md`}
    >
      {label}
    </span>
  );
}
