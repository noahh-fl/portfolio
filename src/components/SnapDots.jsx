export default function SnapDots({ count, activeIndex = 0 }) {
  if (!count || count < 2) return null;

  return (
    <div className="pointer-events-none fixed left-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex">
      {Array.from({ length: count }).map((_, idx) => {
        const isActive = idx === activeIndex;
        return (
          <span
            key={idx}
            className={`h-2.5 w-2.5 rounded-full border border-white/40 transition-all duration-500 ease-out ${
              isActive ? "scale-125 bg-white" : "bg-white/10"
            }`}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}
