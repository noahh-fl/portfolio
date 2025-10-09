import { useState } from "react";
import { Link } from "react-router-dom";
import FadeSection from "../components/FadeSection.jsx";
import SandboxEmbed from "../components/SandboxEmbed.jsx";
import TechPill from "../components/TechPill.jsx";
import SnapDots from "../components/SnapDots.jsx";
import { featured, minis } from "../data/projects";
import { techStack } from "../data/techStack";

export default function Home() {
  const top = featured.slice(0, 3);
  const [activeMiniSlug, setActiveMiniSlug] = useState(minis[0]?.slug ?? null);
  const activeMini = minis.find(m => m.slug === activeMiniSlug);
  const [activeSection, setActiveSection] = useState(0);
  const sectionCount = 4;

  return (
    <div className="snap-y snap-mandatory h-full">
      <SnapDots count={sectionCount} activeIndex={activeSection} />
      <FadeSection
        fullWidth
        edgeToEdge
        innerClassName="flex flex-col items-center gap-6 text-center px-12 lg:px-16"
        sectionId={0}
        onActivate={setActiveSection}
      >
        <div className="flex h-[220px] w-full max-w-4xl items-center justify-center px-[clamp(2.5rem,10vw,8rem)]">
          <h1 className="text-[clamp(3rem,9vw,5.5rem)] font-light uppercase tracking-[0.3em] text-white">
            Noah Flewelling
          </h1>
        </div>
        <p className="text-white/70 max-w-2xl">
          Full-stack-minded React developer. I build clean UIs, wire APIs, and ship fast.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link className="btn" to="/projects">View Projects</Link>
          <a className="btn" href="https://github.com/noahh-fl" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </FadeSection>

      <FadeSection innerClassName="space-y-5" sectionId={1} onActivate={setActiveSection}>
        <section className="space-y-5 max-w-5xl mx-auto">
          <header className="space-y-1 text-center md:text-left">
            <p className="text-xs uppercase tracking-[0.35em] text-white/40">Toolkit</p>
            <h2 className="text-2xl font-semibold">Tech Stack</h2>
            <p className="text-white/60 text-xs leading-relaxed max-w-xl">the tools i'm most comfortable with.</p>
          </header>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
            {techStack.map(item => (
              <article
                key={item.name}
                className="card flex flex-col items-center gap-3 border border-white/10 p-5 text-center transition-transform duration-300 ease-out hover:-translate-y-2 hover:border-white/35 cursor-default"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-lg border border-white/15 backdrop-blur-sm ${
                    item.iconClassName ?? "bg-white/10"
                  }`}
                >
                  <img src={item.icon} alt={item.name} className="h-8 w-8 object-contain" />
                </div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">{item.name}</h3>
              </article>
            ))}
          </div>
        </section>
      </FadeSection>

      <FadeSection innerClassName="space-y-5" sectionId={2} onActivate={setActiveSection}>
        <section className="space-y-5">
          <header className="space-y-1 text-center md:text-left">
            <p className="text-xs uppercase tracking-[0.35em] text-white/40">Showcase</p>
            <h2 className="text-2xl font-semibold">Featured</h2>
            <p className="text-white/60 text-xs leading-relaxed max-w-xl">my best work.</p>
          </header>
          <div className="space-y-5">
            {top.map(p => (
              <article
                key={p.slug}
                className="card overflow-hidden border border-white/10 bg-white/5 md:grid md:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)]"
              >
                <div className="aspect-video w-full bg-white/5 border-b border-white/10 md:aspect-auto md:h-full md:min-h-[160px] md:border-b-0 md:border-r md:border-white/10">
                  {p.thumbnail ? (
                    <img
                      src={p.thumbnail}
                      alt={`${p.title} preview`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="grid h-full place-items-center text-xs uppercase tracking-[0.4em] text-white/50">
                      Screenshot coming soon
                    </div>
                  )}
                </div>
                <div className="space-y-3 p-4">
                  <div className="space-y-1">
                    <h3 className="font-semibold">{p.title}</h3>
                    <p className="text-sm text-white/70">{p.subtitle}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {p.tech.map(t => (
                      <TechPill key={t} label={t} variant="box" />
                    ))}
                  </div>
                  <div className="flex gap-2 pt-1">
                    <Link className="btn" to={`/projects/${p.slug}`}>
                      Details
                    </Link>
                    <a className="btn" href={p.githubUrl} target="_blank" rel="noreferrer">
                      GitHub
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </FadeSection>

      <FadeSection innerClassName="space-y-4" sectionId={3} onActivate={setActiveSection}>
        <section className="space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="text-xl font-semibold">Mini Projects</h2>
            {activeMini?.githubUrl ? (
              <a
                className="btn"
                href={activeMini.githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                View repo
              </a>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-2">
            {minis.map(m => {
              const isActive = m.slug === activeMiniSlug;

              return (
                <button
                  key={m.slug}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveMiniSlug(m.slug)}
                  className={`mini-box transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
                    isActive
                      ? "mini-box--active"
                      : "mini-box--idle"
                  }`}
                >
                  <span className="mini-box__label">{m.title}</span>
                </button>
              );
            })}
          </div>
          {activeMini?.sandboxUrl ? (
            <SandboxEmbed src={activeMini.sandboxUrl} title={`${activeMini.title} playground`} />
          ) : (
            <p className="text-sm text-white/60">Select a project to load an interactive preview.</p>
          )}
        </section>
      </FadeSection>
    </div>
  );
}
