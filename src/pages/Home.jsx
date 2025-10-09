import { useState } from "react";
import { Link } from "react-router-dom";
import FadeSection from "../components/FadeSection.jsx";
import SandboxEmbed from "../components/SandboxEmbed.jsx";
import TechPill from "../components/TechPill.jsx";
import CtaTerminal from "../components/CtaTerminal.jsx";
import SnapDots from "../components/SnapDots.jsx";
import { featured, minis } from "../data/projects";
import { techStack } from "../data/techStack";

export default function Home() {
  const top = featured.slice(0, 3);
  const [activeMiniSlug, setActiveMiniSlug] = useState(minis[0]?.slug ?? null);
  const activeMini = minis.find(m => m.slug === activeMiniSlug);
  const [activeSection, setActiveSection] = useState(0);
  const sectionCount = 5;

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
          <a className="btn" href="https://github.com/noahflewelling" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </FadeSection>

      <FadeSection innerClassName="space-y-5" sectionId={1} onActivate={setActiveSection}>
        <section className="space-y-5">
          <header className="space-y-1 text-center md:text-left">
            <p className="text-xs uppercase tracking-[0.35em] text-white/40">Toolkit</p>
            <h2 className="text-2xl font-semibold">Tech Stack</h2>
            <p className="text-white/60 text-xs leading-relaxed max-w-xl">
              Lightweight cards for a quick glance at the tools I lean on every day.
            </p>
          </header>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
            {techStack.map(item => (
              <article
                key={item.name}
                className="card flex flex-col items-center gap-3 border border-white/10 p-5 text-center transition-transform duration-300 ease-out hover:-translate-y-2 hover:border-white/35"
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

      <FadeSection innerClassName="space-y-4" sectionId={2} onActivate={setActiveSection}>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Featured</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {top.map(p => (
              <article key={p.slug} className="card p-4 space-y-3">
                <div className="aspect-video overflow-hidden rounded-xl border border-white/10 bg-white/5">
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
                <div className="space-y-2">
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

      <FadeSection innerClassName="max-w-4xl" sectionId={4} onActivate={setActiveSection}>
        <section className="grid gap-8 md:grid-cols-[1fr_1.35fr] items-stretch">
          <article className="cta-card space-y-5">
            <header className="cta-card__header">
              <div className="cta-card__avatar">NF</div>
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-white/50">Let’s build something together</p>
                <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                  Noah Flewelling
                  <span aria-hidden>🚀</span>
                </h2>
              </div>
            </header>
            <p className="cta-card__meta">
              I’m Noah — a product-minded developer who enjoys shaping ideas from sketch → prototype → launch. Remote-first, open to
              front-end or full-stack roles, and always curious about new challenges.
            </p>
            <ul className="space-y-1.5 text-sm text-white/70">
              <li><span aria-hidden>📍</span> Based in Tampa, FL (open to remote)</li>
              <li><span aria-hidden>💻</span> Portfolio projects: React, Flask, Tailwind, Bootstrap</li>
              <li><span aria-hidden>🤝</span> I care about teamwork, design, and shipping real things</li>
            </ul>
            <div className="cta-card__links">
              <a className="btn" href="mailto:noah@example.com">Email me</a>
              <a className="btn" href="https://github.com/noahflewelling" target="_blank" rel="noreferrer">GitHub</a>
              <a className="btn" href="https://www.linkedin.com/in/noahflewelling" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
            <div className="space-y-1 pt-3 text-sm text-white/65">
              <p className="text-xs uppercase tracking-[0.3em] text-white/45">Fun fact</p>
              <p>When I’m not coding, you’ll find me experimenting in the kitchen or tinkering with side projects.</p>
            </div>
          </article>
          <CtaTerminal
            lines={[
              { prompt: "$", text: "lets build something together" },
              { prompt: "$", text: "ship polished UX with React & Tailwind" },
              { prompt: "$", text: "wire APIs, automate workflows, deliver results" },
              { prompt: "$", text: "partner with teams that value thoughtful craft" },
            ]}
            className="h-full"
          />
        </section>
      </FadeSection>
    </div>
  );
}
