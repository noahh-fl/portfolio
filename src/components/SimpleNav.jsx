import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "GitHub", to: "https://github.com/noahh-fl", external: true },
];

export default function SimpleNav() {
  const [revealInitials, setRevealInitials] = useState(false);

  useEffect(() => {
    const container = document.querySelector("[data-scroll-container]");

    const handleScroll = () => {
      const offset = container ? container.scrollTop : window.scrollY;
      setRevealInitials(offset > 160);
    };

    handleScroll();
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinkClass = isActive =>
    `nav-link ${isActive ? "nav-link--active" : ""}`;

  const headerClasses = revealInitials
    ? "border-b border-white/10 bg-neutral-950/90 backdrop-blur-xl"
    : "border-b border-white/5 bg-neutral-950/40 backdrop-blur-lg";

  const wrapperPadding = revealInitials ? "py-2.5" : "py-3.5";
  const navTextScale = revealInitials ? "text-[0.58rem]" : "text-[0.62rem]";

  return (
    <header className={`relative fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out ${headerClasses}`}>
      <NavLink
        to="/"
        aria-label="Home"
        className={`nav-initials absolute top-1/2 flex h-10 w-16 -translate-y-1/2 items-center justify-center border border-white/15 bg-white/5 text-xs font-semibold uppercase tracking-[0.6em] text-white/70 transition duration-300 no-underline hover:no-underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50 ${
          revealInitials ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        NF
      </NavLink>
      <div className={`mx-auto w-full transition-all duration-300 ease-out ${revealInitials ? "max-w-5xl px-3" : "max-w-6xl px-4"}`}>
        <div className={`flex items-center justify-center transition-all duration-300 ease-out ${wrapperPadding}`}>
          <nav
            className={`flex items-center justify-center gap-6 uppercase tracking-[0.45em] transition-transform duration-300 ease-out ${navTextScale}`}
          >
            {links.map(link => {
              if (link.external) {
                return (
                  <a
                    key={link.to}
                    href={link.to}
                    target="_blank"
                    rel="noreferrer"
                    className="nav-link"
                  >
                    {link.label}
                  </a>
                );
              }

              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    navLinkClass(isActive)
                  }
                >
                  {link.label}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
