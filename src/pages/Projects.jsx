import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import FadeSection from "../components/FadeSection.jsx";
import TechPill from "../components/TechPill.jsx";
import { featured } from "../data/projects";

const FILTERS = [
  { key: "all", label: "All Projects" },
  { key: "school", label: "School Prompt" },
  { key: "personal", label: "Personal" },
  { key: "quality", label: "Portfolio Picks" },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");

  const counts = useMemo(() => {
    const tally = new Map();
    FILTERS.forEach(filter => {
      if (filter.key === "all") {
        tally.set(filter.key, featured.length);
        return;
      }

      const count = featured.filter(project => project.categories?.includes(filter.key)).length;
      tally.set(filter.key, count);
    });
    return tally;
  }, []);

  const visibleProjects = useMemo(() => {
    if (activeFilter === "all") return featured;
    return featured.filter(project => project.categories?.includes(activeFilter));
  }, [activeFilter]);

  return (
    <div className="min-h-screen pb-24">
      <FadeSection snap={false} innerClassName="space-y-6">
        <header className="space-y-3">
          <h1 className="text-2xl font-semibold">Projects</h1>
          <p className="text-white/70">
            A curated set of builds spanning school prompts and personal experiments. Filters let you dial in the type of work you
            want to review.
          </p>
        </header>

        <section className="projects-banner">
          <div className="projects-banner__inner">
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">4Geeks Academy prompts</p>
            <div className="space-y-1 text-white/80">
              <h2 className="text-lg font-semibold text-white">Classroom foundations, production polish.</h2>
              <p className="text-sm leading-relaxed">
                Every project below started as an instructor brief. I layered in my own structure, styling, and refinements—future
                personal builds will sit alongside these.
              </p>
            </div>
            <div className="projects-filter">
              {FILTERS.map(filter => {
                const count = counts.get(filter.key) ?? 0;
                const disabled = filter.key !== "all" && count === 0;
                const isActive = activeFilter === filter.key;
                return (
                  <button
                    key={filter.key}
                    type="button"
                    className={`projects-filter__btn${isActive ? " is-active" : ""}`}
                    onClick={() => !disabled && setActiveFilter(filter.key)}
                    aria-pressed={isActive}
                    aria-disabled={disabled}
                    disabled={disabled}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <div className="grid gap-6 md:grid-cols-2">
          {visibleProjects.map(project => (
            <article key={project.slug} className="project-card">
              <div className="project-card__body">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                    <p className="text-sm text-white/70">{project.subtitle}</p>
                  </div>
                  {project.origin === "school" ? (
                    <span className="project-card__origin">
                      <span aria-hidden="true">✹</span>
                      School
                    </span>
                  ) : null}
                </div>
                <p className="text-sm leading-relaxed text-white/70">{project.summary}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="aspect-video overflow-hidden border border-white/10 bg-white/5">
                    {project.thumbnail ? (
                      <img
                        src={project.thumbnail}
                        alt={`${project.title} preview`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="grid h-full place-items-center text-xs uppercase tracking-[0.4em] text-white/45">
                        Preview coming soon
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {project.tech.map(tech => (
                      <TechPill key={tech} label={tech} variant="box" />
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link className="btn" to={`/projects/${project.slug}`}>
                    Details
                  </Link>
                  <a className="btn" href={project.githubUrl} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                  {project.liveUrl ? (
                    <a className="btn" href={project.liveUrl} target="_blank" rel="noreferrer">
                      Live
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </FadeSection>
    </div>
  );
}
