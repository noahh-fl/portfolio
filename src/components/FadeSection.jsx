import { useEffect, useRef, useState } from "react";

export default function FadeSection({
  children,
  className = "",
  innerClassName = "",
  fullWidth = false,
  edgeToEdge = false,
  snap = true,
  sectionId = null,
  onActivate,
}) {
  const ref = useRef(null);
  const [isActive, setIsActive] = useState(!snap);

  useEffect(() => {
    if (!snap) {
      setIsActive(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true);
          if (sectionId !== null && typeof onActivate === "function") {
            onActivate(sectionId);
          }
        } else {
          setIsActive(false);
        }
      },
      { threshold: 0.55 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, [snap, sectionId, onActivate]);

  const sectionClasses = [
    snap ? "snap-start snap-always min-h-screen flex items-center" : "py-16",
    snap ? "transition-opacity duration-700 ease-out px-6" : "px-6",
    isActive || !snap ? "opacity-100" : "opacity-20",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section ref={ref} className={sectionClasses}>
      <div
        className={`w-full ${fullWidth ? (edgeToEdge ? "max-w-none" : "max-w-none px-6") : "container max-w-5xl"} ${innerClassName}`.trim()}
      >
        {children}
      </div>
    </section>
  );
}
