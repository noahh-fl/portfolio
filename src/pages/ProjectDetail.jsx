import { useParams, Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import TechPill from "../components/TechPill.jsx";
import SandboxEmbed from "../components/SandboxEmbed.jsx";
import { featured } from "../data/projects";

const workflowIconMap = {
  user: new URL("../assets/icons/workflow-user.svg", import.meta.url).href,
  react: new URL("../assets/icons/workflow-react.svg", import.meta.url).href,
  flask: new URL("../assets/icons/workflow-flask.svg", import.meta.url).href,
  db: new URL("../assets/icons/workflow-db.svg", import.meta.url).href,
  ui: new URL("../assets/icons/workflow-ui.svg", import.meta.url).href,
  form: new URL("../assets/icons/workflow-form.svg", import.meta.url).href,
  context: new URL("../assets/icons/workflow-context.svg", import.meta.url).href,
  api: new URL("../assets/icons/workflow-api.svg", import.meta.url).href,
};

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = featured.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="mx-auto flex h-full max-w-4xl flex-col justify-center gap-4 px-4 py-16">
        <p>Project not found.</p>
        <Link className="btn" to="/projects">
          Back to Projects
        </Link>
      </div>
    );
  }

  if (project.slug === "bitefinder") {
    return <BiteFinderDetail project={project} />;
  }

  if (project.slug === "juicewrld-api") {
    return <JuiceWrldDetail project={project} />;
  }

  if (project.slug === "javaslots") {
    return <JavaSlotsDetail project={project} />;
  }

  if (project.slug === "sw-data-model") {
    return <StarWarsDataModelDetail project={project} />;
  }

  if (project.slug === "sw-react-spa") {
    return <StarWarsReactDetail project={project} />;
  }

  if (project.slug === "ui-lab") {
    return <UiLabDetail project={project} />;
  }

  if (project.slug === "contact-list") {
    return <ContactListDetail project={project} />;
  }

  const { caseStudy } = project;
  const gallery = useMemo(() => {
    if (project.gallery?.length) return project.gallery;
    return ["https://placehold.co/1280x720/0f172a/ffffff?text=Screenshot+Coming+Soon"];
  }, [project.gallery]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex(prev => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex(prev => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  return (
    <article className="project-detail mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 pb-20">
      <div className="pt-6">
        <Link
          to="/projects"
          className="back-link inline-flex items-center gap-2 border border-white/20 bg-white/5 px-3 py-1 text-[0.6rem] uppercase tracking-[0.45em] text-white/70 transition hover:border-white/40 hover:text-white no-underline hover:no-underline"
        >
          <span aria-hidden="true">←</span>
          Back
        </Link>
      </div>

      <header className="space-y-2">
        <p className="text-sm uppercase tracking-[0.3em] text-white/50">Project</p>
        <h1 className="text-3xl font-semibold text-white">{project.title}</h1>
        <p className="text-white/70">{project.subtitle}</p>
      </header>

      <section className="space-y-4">
        <div className="detail-frame relative overflow-hidden bg-white/5">
          <img
            key={gallery[activeIndex]}
            src={gallery[activeIndex]}
            alt={`${project.title} preview ${activeIndex + 1}`}
            className="aspect-video w-full object-cover"
          />
          {gallery.length > 1 && (
            <div className="absolute inset-x-0 bottom-4 flex justify-between px-4 text-xs">
              <button
                type="button"
                onClick={handlePrev}
                className="rounded-full border border-white/30 bg-black/40 px-3 py-2 text-white/80 transition hover:bg-black/70"
                aria-label="Previous screenshot"
              >
                ←
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="rounded-full border border-white/30 bg-black/40 px-3 py-2 text-white/80 transition hover:bg-black/70"
                aria-label="Next screenshot"
              >
                →
              </button>
            </div>
          )}
        </div>
        <p className="text-white/80">{project.summary}</p>
      </section>

      {project.sandboxUrl ? (
        <section className="space-y-4">
          <SandboxEmbed src={project.sandboxUrl} title={`${project.title} playground`} />
        </section>
      ) : null}

      <section className="space-y-4">
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map(t => (
            <TechPill key={t} label={t} variant="box" />
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <a className="btn" href={project.githubUrl} target="_blank" rel="noreferrer">
            GitHub
          </a>
          {project.liveUrl && (
            <a className="btn" href={project.liveUrl} target="_blank" rel="noreferrer">
              Live
            </a>
          )}
        </div>
      </section>

      <section className="space-y-4 text-white/70">
        <h2 className="text-lg font-medium text-white">Case Study Snapshot</h2>
        {caseStudy ? (
          <div className="space-y-3">
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                <strong>Problem:</strong> {caseStudy.problem}
              </li>
              <li>
                <strong>Solution:</strong> {caseStudy.solution}
              </li>
              <li>
                <strong>Tech Stack:</strong> {caseStudy.techStack}
              </li>
              <li>
                <strong>My Role:</strong> {caseStudy.role}
              </li>
            </ul>
            {caseStudy.upgrades?.length ? (
              <div className="space-y-1.5">
                <p className="text-sm uppercase tracking-[0.2em] text-white/50">Up next</p>
                <ul className="list-disc pl-6 space-y-1.5 text-sm">
                  {caseStudy.upgrades.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        ) : (
          <p>Detailed case study coming soon.</p>
        )}
      </section>
    </article>
  );
}

function JuiceWrldDetail({ project }) {
  const detail = {
    strapline: "Full-stack fan build · Personal project",
    heroCopy:
      "Reusable Juice WRLD catalogue that exposes a hardened REST API and a React 19 client sharing the same TypeScript contracts.",
    workspaceNotes: [
      "npm workspaces wire the Express API and Vite client together with a single `npm run dev` command.",
      "Shared TypeScript models flow from the data catalogue to API responses and React rendering.",
      "Vite dev server proxies \"/api\" to Express so the frontend never hard-codes hosts.",
    ],
    backendHighlights: [
      "Express server boots Helmet, CORS, rate limiting, JSON parsing, Swagger scaffolding, and static hosting out of the box.",
      "Canonical dataset normalizes durations, attaches music video metadata, and derives credits before exporting albums, songs, and musicVideos arrays.",
      "Credits route aggregates collaborators so the client can filter by producer, feature, or engineer without additional transforms.",
    ],
    frontendHighlights: [
      "React 19 app preloads every API endpoint in parallel and shares caches for songs, albums, credits, and videos.",
      "Overview page packages project stats, endpoint quick launch grid, hoverable album selector, and a modal disclaimer to reinforce fan intent.",
      "Song explorer stacks filters for album, key, producer, feature, engineer, BPM, duration, year, and \"has video\" with apply/clear workflows and live result counts.",
    ],
    directoryHighlights: [
      "Collaborator directories split producers, featured artists, and engineers with color-coded chips that surface cross-role contributors.",
      "Timeline-aware filters track primary versus supporting roles plus active years to spotlight recurring collaborators.",
      "About page doubles as narrative marketing copy with milestone timeline, source links, and attribution suited for portfolio embeds.",
    ],
    dataSources: [
      "Catalogue stitches albums, deluxe editions, singles, BPM/key data, engineering credits, and official video metadata into one normalized feed.",
      "Timeline and credits cite outlets like Wikipedia, Billboard, and Apple Music to reinforce research-backed accuracy.",
      "Dataset is ready to swap with live sources thanks to consistent IDs and shared type definitions.",
    ],
    developerTouches: [
      "Project ships with rate limiting, CORS configuration, Swagger-ready docs, and static asset hosting for production-conscious polish.",
      "Tailwind utilities and dark-mode gradients give the UI a premium baseline without sacrificing performance.",
      "Typed helper utilities wrap catalogue math (durations, collaborator counts) so both API and UI stay truthful.",
    ],
    flow: [
      { label: "Curated dataset (mock.ts)", iconKey: "db" },
      { label: "Express routes + middleware", iconKey: "api" },
      { label: "Shared TypeScript models", iconKey: "context" },
      { label: "React 19 UI & filters", iconKey: "ui" },
    ],
  };

  const gallery = project.media?.images ?? project.gallery ?? [];
  const heroImage = gallery[0] ?? project.thumbnail;
  const flowPalette = [
    "rgba(148,163,184,0.45)",
    "rgba(56,189,248,0.45)",
    "rgba(99,102,241,0.45)",
    "rgba(159,18,57,0.45)",
  ];
  const flowSteps = detail.flow.map((step, index) => ({
    label: step.label,
    icon: workflowIconMap[step.iconKey] ?? workflowIconMap.api,
    accent: flowPalette[index % flowPalette.length],
  }));

  return (
    <article className="project-detail mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 pb-24">
      <div className="pt-6">
        <Link
          to="/projects"
          className="back-link inline-flex items-center gap-2 border border-white/20 bg-white/5 px-3 py-1 text-[0.6rem] uppercase tracking-[0.45em] text-white/70 transition hover:border-white/40 hover:text-white no-underline hover:no-underline"
        >
          <span aria-hidden="true">←</span>
          Back
        </Link>
      </div>

      <header className="grid gap-6 lg:grid-cols-[1.8fr_1fr]">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-white/40">{detail.strapline}</p>
          <h1 className="text-4xl font-semibold text-white">{project.title}</h1>
          <p className="text-white/70 max-w-3xl leading-relaxed">{detail.heroCopy}</p>
          <p className="text-sm text-white/60">{project.summary}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map(item => (
              <TechPill key={`tech-${item}`} label={item} variant="box" />
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <a className="btn" href={project.githubUrl} target="_blank" rel="noreferrer">
              View Repo
            </a>
          </div>
        </div>
        <div
          className="detail-slab bg-slate-900/55 p-6 text-sm text-white/75"
          style={{
            '--detail-glow':
              "conic-gradient(from 0deg, rgba(148,163,184,0.08), rgba(56,189,248,0.45), rgba(99,102,241,0.4), rgba(148,163,184,0.08))",
          }}
        >
          <p className="text-[0.7rem] uppercase tracking-[0.32em] text-white/55">Workspace flow</p>
          <ul className="mt-3 space-y-2 leading-relaxed">
            {detail.workspaceNotes.map(item => (
              <li key={item} className="flex gap-2 text-sm">
                <span aria-hidden="true">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {heroImage ? (
        <section
          className="detail-frame relative overflow-hidden bg-slate-900/65 p-4"
          style={{
            '--detail-glow':
              "conic-gradient(from 0deg, rgba(99,102,241,0.08), rgba(99,102,241,0.65), rgba(56,189,248,0.35), rgba(99,102,241,0.08))",
          }}
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-900/70 via-transparent to-rose-500/20" />
          <img src={heroImage} alt={`${project.title} hero`} className="relative w-full border border-white/10 object-cover" />
        </section>
      ) : null}

      <section className="grid gap-6 lg:grid-cols-3">
        {detail.backendHighlights.map(item => (
          <div
            key={`backend-${item}`}
            className="detail-slab bg-slate-900/45 p-6 text-sm text-white/75"
            style={{
              '--detail-glow':
                "conic-gradient(from 0deg, rgba(56,189,248,0.08), rgba(56,189,248,0.65), rgba(99,102,241,0.35), rgba(56,189,248,0.08))",
            }}
          >
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/55">API highlight</p>
            <p className="mt-2 leading-relaxed">{item}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {detail.frontendHighlights.map(item => (
          <div
            key={`frontend-${item}`}
            className="detail-slab bg-slate-900/45 p-6 text-sm text-white/75"
            style={{
              '--detail-glow':
                "conic-gradient(from 0deg, rgba(99,102,241,0.08), rgba(99,102,241,0.65), rgba(56,189,248,0.35), rgba(99,102,241,0.08))",
            }}
          >
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/55">Frontend highlight</p>
            <p className="mt-2 leading-relaxed">{item}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {detail.directoryHighlights.map(item => (
          <div
            key={`directory-${item}`}
            className="detail-slab bg-slate-900/45 p-6 text-sm text-white/75"
            style={{
              '--detail-glow':
                "conic-gradient(from 0deg, rgba(159,18,57,0.08), rgba(159,18,57,0.6), rgba(99,102,241,0.35), rgba(159,18,57,0.08))",
            }}
          >
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/55">Directory insight</p>
            <p className="mt-2 leading-relaxed">{item}</p>
          </div>
        ))}
      </section>

      {gallery.length ? (
        <section className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <div
            className="detail-frame relative overflow-hidden bg-slate-900/60 p-4"
            style={{
              '--detail-glow':
                "conic-gradient(from 0deg, rgba(56,189,248,0.08), rgba(56,189,248,0.7), rgba(99,102,241,0.4), rgba(56,189,248,0.08))",
            }}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-900/70 via-transparent to-pink-500/15" />
            <img
              src={gallery[0]}
              alt={`${project.title} overview screen`}
              className="relative w-full border border-white/10 object-cover"
            />
          </div>
          <div className="grid gap-4">
            {gallery.slice(1).map((shot, index) => (
              <div
                key={`juicewrld-shot-${index}`}
                className="detail-frame relative overflow-hidden bg-slate-900/55 p-4"
                style={{
                  '--detail-glow':
                    "conic-gradient(from 0deg, rgba(99,102,241,0.08), rgba(99,102,241,0.65), rgba(56,189,248,0.35), rgba(99,102,241,0.08))",
                }}
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-rose-500/25 via-transparent to-purple-500/15" />
                <img
                  src={shot}
                  alt={`${project.title} UI detail ${index + 2}`}
                  className="relative w-full border border-white/10 object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section
        className="detail-slab bg-slate-900/45 p-6"
        style={{
          '--detail-glow':
            "conic-gradient(from 0deg, rgba(148,163,184,0.08), rgba(148,163,184,0.65), rgba(56,189,248,0.35), rgba(148,163,184,0.08))",
        }}
      >
        <h2 className="text-[0.7rem] uppercase tracking-[0.32em] text-white/55">Data & sources</h2>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/80">
          {detail.dataSources.map(item => (
            <li key={item} className="flex gap-2">
              <span aria-hidden="true">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="detail-slab bg-slate-900/45 p-6"
        style={{
          '--detail-glow':
            "conic-gradient(from 0deg, rgba(99,102,241,0.08), rgba(99,102,241,0.65), rgba(56,189,248,0.35), rgba(99,102,241,0.08))",
        }}
      >
        <h2 className="text-[0.7rem] uppercase tracking-[0.32em] text-white/55">Developer touches</h2>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/80">
          {detail.developerTouches.map(item => (
            <li key={item} className="flex gap-2">
              <span aria-hidden="true">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="detail-slab bg-slate-900/45 p-6"
        style={{
          '--detail-glow':
            "conic-gradient(from 0deg, rgba(56,189,248,0.08), rgba(56,189,248,0.7), rgba(99,102,241,0.35), rgba(56,189,248,0.08))",
        }}
      >
        <h2 className="text-[0.7rem] uppercase tracking-[0.32em] text-white/55">Workflow</h2>
        <div className="detail-workflow">
          {flowSteps.map((step, index) => (
            <div key={`${step.label}-${index}`} className="detail-workflow__item" style={{ '--node-accent': step.accent }}>
              <div className="detail-workflow__node" aria-hidden="true">
                <img src={step.icon} alt={`${step.label} icon`} className="detail-workflow__icon" />
              </div>
              <p className="detail-workflow__label">{step.label}</p>
            </div>
          ))}
        </div>
      </section>

      {project.caseStudy ? (
        <section
          className="detail-slab bg-slate-900/45 p-6 text-white/75"
          style={{
            '--detail-glow':
              "conic-gradient(from 0deg, rgba(148,163,184,0.08), rgba(148,163,184,0.65), rgba(56,189,248,0.35), rgba(148,163,184,0.08))",
          }}
        >
          <h2 className="text-[0.7rem] uppercase tracking-[0.32em] text-white/55">Case study snapshot</h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed">
            <li>
              <strong>Problem:</strong> {project.caseStudy.problem}
            </li>
            <li>
              <strong>Solution:</strong> {project.caseStudy.solution}
            </li>
            <li>
              <strong>Tech Stack:</strong> {project.caseStudy.techStack}
            </li>
            <li>
              <strong>Role:</strong> {project.caseStudy.role}
            </li>
          </ul>
          {project.caseStudy.upgrades?.length ? (
            <div className="mt-4 space-y-2">
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/55">Up next</p>
              <ul className="list-disc pl-6 space-y-1.5 text-sm">
                {project.caseStudy.upgrades.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>
      ) : null}
    </article>
  );
}

function UiLabDetail({ project }) {
  const detail = {
    strapline: "Front-end component lab · Personal build",
    heroCopy:
      "Next.js 15.5 playground that spotlights production-ready UI sections you can preview, inspect, and drop into your next sprint without breaking flow.",
    highlight:
      "Gallery cards span navigation, media, layout, branding, and carousel experiences with a cinematic glassmorphism theme, neon-cyan lighting, and Geist Sans/Mono typography.",
    componentSections: [
      {
        title: "Navigation",
        points: [
          "Responsive navbar pairs desktop links with a mobile drawer, launch CTA, and copy-ready Next.js Link wiring.",
          "Sticky left rail keeps category jumps within thumb reach while radial lighting pulses to orient the viewer.",
        ],
      },
      {
        title: "Branding",
        points: [
          "Framer Motion carousel revolves logos with drag momentum, hover pause, and tilt that reacts to velocity.",
          "Motion values drive depth so stakeholders can feel the brand system before implementation.",
        ],
      },
      {
        title: "Media",
        points: [
          "Image zoom gallery tracks pointer position to set the zoom origin and surface attribution gradients.",
          "Animated thumbnail rail keeps large assets tactile without overwhelming the hero canvas.",
        ],
      },
      {
        title: "Carousels",
        points: [
          "Autoplay hero slider blends gradient scenes, timed transitions, and accessible dot controls.",
          "Manual variant pairs hero slides with interactive thumbnails so teams can scrub the interaction feel.",
        ],
      },
      {
        title: "Layouts",
        points: [
          "Hero and grid patterns lean on marketing storytelling, clear calls-to-action, and hover micro-interactions.",
          "Adaptive columns show how the primitives respond to breakpoints while keeping copy readable.",
        ],
      },
    ],
    interactionDetails: [
      "Code drawers sit beneath each showcase, maxed at 4xl, using react-syntax-highlighter (One Dark) so Tailwind strings stay readable.",
      "Copy buttons debounce success, flip to a “Copied” checkmark, and fail gracefully with console warnings.",
      "Cards stack border glows, drop shadows, and hover rings to keep cohesion across varied content blocks.",
    ],
    copyWorkflow: [
      "Full-size and compact copy buttons let designers grab JSX or Tailwind without hunting through repos.",
      "Drawers collapse on ESC, click-away, or copy confirmation to keep interaction tempo fast.",
      "Long lines auto-wrap with preserved indentation so engineers can paste clean snippets.",
    ],
    techHighlights: [
      {
        label: "Framework",
        items: ["Next.js App Router", "React 19 server/client boundaries", "TypeScript strict mode"],
      },
      {
        label: "Styling",
        items: ["Tailwind CSS v4 via @tailwindcss/postcss", "Glassmorphism theme with neon-cyan cues", "CSS vars driving Geist Sans/Mono"],
      },
      {
        label: "Motion & utilities",
        items: ["Framer Motion carousel momentum", "react-syntax-highlighter (One Dark)", "next/image optimization", "Custom SVG control icons"],
      },
    ],
    extensibility: [
      "Component registry in src/components/gallery/component-gallery.tsx adds showcases via a single ComponentEntry.",
      "Categories auto-group with useMemo so sidebar counts and headings refresh instantly.",
      "Tailwind utility approach makes theming swappable—brands can override tokens without rewiring layouts.",
    ],
    flow: [
      { label: "Component registry & metadata", iconKey: "react" },
      { label: "Category memoization", iconKey: "context" },
      { label: "Next.js App Router surface", iconKey: "api" },
      { label: "Tailwind + motion layer", iconKey: "ui" },
    ],
  };

  const heroShot = project.media?.images?.[0] ?? project.thumbnail;
  const codeShot = project.media?.images?.[1];
  const videos = project.media?.videos ?? [];
  const flowPalette = [
    "rgba(56,189,248,0.45)",
    "rgba(129,140,248,0.45)",
    "rgba(14,165,233,0.45)",
    "rgba(236,72,153,0.45)",
  ];
  const flowSteps = detail.flow.map((step, index) => ({
    label: step.label,
    icon: workflowIconMap[step.iconKey] ?? workflowIconMap.ui,
    accent: flowPalette[index % flowPalette.length],
  }));

  return (
    <article className="project-detail mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 pb-24">
      <div className="pt-6">
        <Link
          to="/projects"
          className="back-link inline-flex items-center gap-2 border border-white/20 bg-white/5 px-3 py-1 text-[0.6rem] uppercase tracking-[0.45em] text-white/70 transition hover:border-white/40 hover:text-white no-underline hover:no-underline"
        >
          <span aria-hidden="true">←</span>
          Back
        </Link>
      </div>

      <header className="grid gap-6 lg:grid-cols-[1.8fr_1fr]">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-white/45">{detail.strapline}</p>
          <h1 className="text-4xl font-semibold text-white">{project.title}</h1>
          <p className="text-white/70 max-w-3xl leading-relaxed">{detail.heroCopy}</p>
          <p className="text-sm text-white/60">{detail.highlight}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map(item => (
              <TechPill key={`tech-${item}`} label={item} variant="box" />
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <a className="btn" href={project.githubUrl} target="_blank" rel="noreferrer">
              View Repo
            </a>
            {project.liveUrl ? (
              <a className="btn" href={project.liveUrl} target="_blank" rel="noreferrer">
                Live
              </a>
            ) : null}
          </div>
        </div>
        <div
          className="detail-slab bg-slate-900/55 p-6 text-sm text-white/75"
          style={{
            '--detail-glow':
              "conic-gradient(from 0deg, rgba(99,102,241,0.08), rgba(56,189,248,0.55), rgba(236,72,153,0.35), rgba(99,102,241,0.08))",
          }}
        >
          <p className="text-[0.7rem] uppercase tracking-[0.32em] text-white/55">Copy-to-production flow</p>
          <ul className="mt-3 space-y-2 leading-relaxed">
            {detail.copyWorkflow.map(item => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {heroShot ? (
        <section
          className="detail-frame relative overflow-hidden bg-slate-900/60 p-4"
          style={{
            '--detail-glow':
              "conic-gradient(from 0deg, rgba(236,72,153,0.08), rgba(56,189,248,0.65), rgba(129,140,248,0.35), rgba(236,72,153,0.08))",
          }}
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/15 via-transparent to-purple-500/20" />
          <img src={heroShot} alt={`${project.title} gallery overview`} className="relative w-full border border-white/10 object-cover" />
        </section>
      ) : null}

      {detail.componentSections.length ? (
        <section className="grid gap-4 lg:grid-cols-2">
          {detail.componentSections.map(section => (
            <div
              key={section.title}
              className="detail-slab bg-slate-900/50 p-5 text-sm text-white/75"
              style={{
                '--detail-glow':
                  "conic-gradient(from 0deg, rgba(56,189,248,0.08), rgba(56,189,248,0.6), rgba(14,165,233,0.35), rgba(56,189,248,0.08))",
              }}
            >
              <p className="text-[0.7rem] uppercase tracking-[0.3em] text-white/55">{section.title}</p>
              <ul className="mt-3 space-y-2 leading-relaxed">
                {section.points.map(point => (
                  <li key={`${section.title}-${point}`} className="flex gap-2">
                    <span aria-hidden="true">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ) : null}

      <section
        className="detail-slab bg-slate-900/45 p-6"
        style={{
          '--detail-glow':
            "conic-gradient(from 0deg, rgba(129,140,248,0.08), rgba(129,140,248,0.65), rgba(56,189,248,0.35), rgba(129,140,248,0.08))",
        }}
      >
        <h2 className="text-[0.7rem] uppercase tracking-[0.32em] text-white/55">Interaction & UX touches</h2>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/80">
          {detail.interactionDetails.map(item => (
            <li key={item} className="flex gap-2">
              <span aria-hidden="true">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {codeShot ? (
        <section
          className="detail-frame relative overflow-hidden bg-slate-900/60 p-4"
          style={{
            '--detail-glow':
              "conic-gradient(from 0deg, rgba(14,165,233,0.08), rgba(14,165,233,0.6), rgba(99,102,241,0.35), rgba(14,165,233,0.08))",
          }}
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-sky-500/20 via-transparent to-rose-500/15" />
          <img src={codeShot} alt={`${project.title} code drawer`} className="relative w-full border border-white/10 object-cover" />
        </section>
      ) : null}

      {detail.techHighlights.length ? (
        <section className="grid gap-4 lg:grid-cols-3">
          {detail.techHighlights.map(group => (
            <div
              key={group.label}
              className="detail-slab bg-slate-900/50 p-5 text-sm text-white/75"
              style={{
                '--detail-glow':
                  "conic-gradient(from 0deg, rgba(236,72,153,0.08), rgba(236,72,153,0.6), rgba(129,140,248,0.35), rgba(236,72,153,0.08))",
              }}
            >
              <p className="text-[0.7rem] uppercase tracking-[0.3em] text-white/55">{group.label}</p>
              <ul className="mt-3 space-y-2 leading-relaxed">
                {group.items.map(item => (
                  <li key={`${group.label}-${item}`} className="flex gap-2">
                    <span aria-hidden="true">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ) : null}

      <section
        className="detail-slab bg-slate-900/45 p-6"
        style={{
          '--detail-glow':
            "conic-gradient(from 0deg, rgba(99,102,241,0.08), rgba(99,102,241,0.65), rgba(56,189,248,0.35), rgba(99,102,241,0.08))",
        }}
      >
        <h2 className="text-[0.7rem] uppercase tracking-[0.32em] text-white/55">Workflow</h2>
        <div className="detail-workflow">
          {flowSteps.map((step, index) => (
            <div key={`${step.label}-${index}`} className="detail-workflow__item" style={{ '--node-accent': step.accent }}>
              <div className="detail-workflow__node" aria-hidden="true">
                <img src={step.icon} alt={`${step.label} icon`} className="detail-workflow__icon" />
              </div>
              <p className="detail-workflow__label">{step.label}</p>
            </div>
          ))}
        </div>
      </section>

      {videos.length ? (
        <section className="grid gap-4 lg:grid-cols-2">
          {videos.map((videoSrc, index) => (
            <div
              key={`ui-lab-video-${index}`}
              className="detail-frame relative overflow-hidden bg-slate-900/60 p-4"
              style={{
                '--detail-glow':
                  "conic-gradient(from 0deg, rgba(56,189,248,0.08), rgba(56,189,248,0.65), rgba(236,72,153,0.35), rgba(56,189,248,0.08))",
              }}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/15" />
              <video
                src={videoSrc}
                controls
                className="relative w-full border border-white/10"
                preload="metadata"
                playsInline
              />
            </div>
          ))}
        </section>
      ) : null}

      <section
        className="detail-slab bg-slate-900/45 p-6 text-white/75"
        style={{
          '--detail-glow':
            "conic-gradient(from 0deg, rgba(148,163,184,0.08), rgba(148,163,184,0.65), rgba(56,189,248,0.35), rgba(148,163,184,0.08))",
        }}
      >
        <h2 className="text-[0.7rem] uppercase tracking-[0.32em] text-white/55">Extensibility hooks</h2>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed">
          {detail.extensibility.map(item => (
            <li key={item} className="flex gap-2">
              <span aria-hidden="true">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {project.caseStudy ? (
        <section
          className="detail-slab bg-slate-900/45 p-6 text-white/75"
          style={{
            '--detail-glow':
              "conic-gradient(from 0deg, rgba(236,72,153,0.08), rgba(236,72,153,0.6), rgba(129,140,248,0.35), rgba(236,72,153,0.08))",
          }}
        >
          <h2 className="text-[0.7rem] uppercase tracking-[0.32em] text-white/55">Case study snapshot</h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed">
            <li>
              <strong>Problem:</strong> {project.caseStudy.problem}
            </li>
            <li>
              <strong>Solution:</strong> {project.caseStudy.solution}
            </li>
            <li>
              <strong>Tech Stack:</strong> {project.caseStudy.techStack}
            </li>
            <li>
              <strong>Role:</strong> {project.caseStudy.role}
            </li>
          </ul>
          {project.caseStudy.upgrades?.length ? (
            <div className="mt-4 space-y-2">
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/55">Up next</p>
              <ul className="list-disc pl-6 space-y-1.5 text-sm">
                {project.caseStudy.upgrades.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>
      ) : null}
    </article>
  );
}

function JavaSlotsDetail({ project }) {
  const detail = {
    strapline: "Vanilla JS arcade · Personal build",
    heroCopy:
      "Built a browser slot machine that behaves like cabinet hardware — animated reels, bankroll management, and layered feedback all orchestrated in plain JavaScript.",
    systems: [
      "State machine keeps wallet funds, machine credits, wagers, and payouts airtight.",
      "Paytable logic handles teasers, full matches, and replenishment triggers without letting the bankroll desync.",
      "HUD, overlays, and alerts stay synced with validation so spins never collide with disabled states.",
    ],
    sections: [
      {
        title: "Core Gameplay",
        items: [
          "Spin three emoji reels with Spin/Max Bet controls, numeric input, and a Clear Bet safety valve.",
          "Wallet vs machine credits flow with insert, withdraw, and auto-replenish unlocks when totals dip below $5.",
          "Paytable applies wager multipliers up to ×25, covers teaser wins, and animates HUD updates in real time.",
        ],
      },
      {
        title: "Audio & Feedback",
        items: [
          "Web Audio API mixes looped music, reel ticks, click sounds, and win chimes through dedicated gain nodes.",
          "Independent sliders for SFX, wins, and music adjust the mix live without clipping.",
          "Win overlay animates payout counts with a Skip option for long celebrations.",
        ],
      },
      {
        title: "User Flow Enhancements",
        items: [
          "Start gate modal captures disclaimer consent before resuming the suspended audio context.",
          "HUD formatting, disabled buttons, and guard rails protect against invalid wagers mid-spin.",
          "Floating settings panel closes with ESC or outside click so adjustments never block play.",
        ],
      },
      {
        title: "Debug & Testing Tools",
        items: [
          "Debug dropdown exposes a Win Bias slider so QA can tilt odds toward the player or the house.",
          "Bias-aware RNG bypasses loss-recovery logic when testing the house edge, keeping streak scripts predictable.",
        ],
      },
      {
        title: "Info & Accessibility",
        items: [
          '"Multiplier Rules" accordion walks through payouts and double-match behavior for transparency.',
          "ARIA attributes, live regions, and keyboard handlers (Enter, Escape) maintain accessible controls.",
        ],
      },
    ],
    implementationFlow: [
      { label: "State orchestrated in app.js", iconKey: "context" },
      { label: "Reels animated with requestAnimationFrame", iconKey: "ui" },
      { label: "Audio buffers mixed via Web Audio API", iconKey: "react" },
      { label: "Win bias tuning for QA", iconKey: "form" },
    ],
  };

  const demoVideo = project.media?.videos?.[0] ?? null;
  const posterImage = project.thumbnail ?? project.media?.images?.[0] ?? null;
  const gallery = project.media?.images ?? project.gallery ?? [];
  const flowPalette = [
    "rgba(251,191,36,0.45)",
    "rgba(244,114,182,0.45)",
    "rgba(45,212,191,0.45)",
    "rgba(129,140,248,0.45)",
  ];
  const flowSteps = detail.implementationFlow.map((step, index) => ({
    label: step.label,
    icon: workflowIconMap[step.iconKey] ?? workflowIconMap.ui,
    accent: flowPalette[index % flowPalette.length],
  }));

  return (
    <article className="project-detail mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 pb-24">
      <div className="pt-6">
        <Link
          to="/projects"
          className="back-link inline-flex items-center gap-2 border border-white/20 bg-white/5 px-3 py-1 text-[0.6rem] uppercase tracking-[0.45em] text-white/70 transition hover:border-white/40 hover:text-white no-underline hover:no-underline"
        >
          <span aria-hidden="true">←</span>
          Back
        </Link>
      </div>

      <header className="grid gap-6 lg:grid-cols-[1.8fr_1fr]">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-white/40">{detail.strapline}</p>
          <h1 className="text-4xl font-semibold text-white">{project.title}</h1>
          <p className="text-white/70 max-w-3xl leading-relaxed">{detail.heroCopy}</p>
          <p className="text-sm text-white/60">{project.summary}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map(item => (
              <TechPill key={`tech-${item}`} label={item} variant="box" />
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <a className="btn" href={project.githubUrl} target="_blank" rel="noreferrer">
              View Repo
            </a>
            {demoVideo ? (
              <a className="btn" href={demoVideo} target="_blank" rel="noreferrer">
                Watch Demo
              </a>
            ) : null}
          </div>
        </div>
        <div
          className="detail-slab bg-slate-900/55 p-6 text-sm text-white/75"
          style={{
            '--detail-glow':
              "conic-gradient(from 0deg, rgba(251,191,36,0.08), rgba(251,191,36,0.65), rgba(244,114,182,0.4), rgba(251,191,36,0.08))",
          }}
        >
          <p className="text-[0.7rem] uppercase tracking-[0.32em] text-white/55">Systems in play</p>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed">
            {detail.systems.map(item => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {demoVideo ? (
        <section
          className="detail-frame relative overflow-hidden bg-slate-900/65"
          style={{
            '--detail-glow':
              "conic-gradient(from 0deg, rgba(244,114,182,0.08), rgba(244,114,182,0.7), rgba(129,140,248,0.35), rgba(244,114,182,0.08))",
          }}
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-rose-500/30 via-transparent to-amber-400/20" />
          <video
            controls
            poster={posterImage}
            className="relative w-full border border-white/10 bg-black object-cover"
          >
            <source src={demoVideo} type="video/quicktime" />
            <source src={demoVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </section>
      ) : null}

      <section className="grid gap-6 lg:grid-cols-3">
        {detail.sections.slice(0, 3).map(section => (
          <div
            key={section.title}
            className="detail-slab bg-slate-900/45 p-6 text-sm text-white/75"
            style={{
              '--detail-glow':
                "conic-gradient(from 0deg, rgba(251,191,36,0.08), rgba(251,191,36,0.65), rgba(244,114,182,0.35), rgba(251,191,36,0.08))",
            }}
          >
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/55">{section.title}</p>
            <ul className="mt-3 space-y-2 leading-relaxed">
              {section.items.map(item => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        {detail.sections.slice(3).map(section => (
          <div
            key={section.title}
            className="detail-slab bg-slate-900/45 p-6 text-sm text-white/75"
            style={{
              '--detail-glow':
                "conic-gradient(from 0deg, rgba(244,114,182,0.08), rgba(244,114,182,0.65), rgba(129,140,248,0.35), rgba(244,114,182,0.08))",
            }}
          >
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/55">{section.title}</p>
            <ul className="mt-3 space-y-2 leading-relaxed">
              {section.items.map(item => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {gallery.length ? (
        <section className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <div
            className="detail-frame relative overflow-hidden bg-slate-900/60 p-4"
            style={{
              '--detail-glow':
                "conic-gradient(from 0deg, rgba(251,191,36,0.08), rgba(251,191,36,0.7), rgba(244,114,182,0.4), rgba(251,191,36,0.08))",
            }}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-400/30 via-transparent to-rose-500/15" />
            <img
              src={gallery[0]}
              alt={`${project.title} interface overview`}
              className="relative w-full border border-white/10 object-cover"
            />
          </div>
          <div className="grid gap-4">
            {gallery.slice(1).map((shot, index) => (
              <div
                key={`javaslots-shot-${index}`}
                className="detail-frame relative overflow-hidden bg-slate-900/55 p-4"
                style={{
                  '--detail-glow':
                    "conic-gradient(from 0deg, rgba(244,114,182,0.08), rgba(244,114,182,0.7), rgba(129,140,248,0.35), rgba(244,114,182,0.08))",
                }}
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-rose-500/25 via-transparent to-purple-500/15" />
                <img
                  src={shot}
                  alt={`${project.title} UI detail ${index + 2}`}
                  className="relative w-full border border-white/10 object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section
        className="detail-slab bg-slate-900/45 p-6"
        style={{
          '--detail-glow':
            "conic-gradient(from 0deg, rgba(129,140,248,0.08), rgba(129,140,248,0.65), rgba(45,212,191,0.35), rgba(129,140,248,0.08))",
        }}
      >
        <h2 className="text-[0.7rem] uppercase tracking-[0.32em] text-white/55">Implementation highlights</h2>
        <div className="detail-workflow">
          {flowSteps.map((step, index) => (
            <div key={`${step.label}-${index}`} className="detail-workflow__item" style={{ '--node-accent': step.accent }}>
              <div className="detail-workflow__node" aria-hidden="true">
                <img src={step.icon} alt={`${step.label} icon`} className="detail-workflow__icon" />
              </div>
              <p className="detail-workflow__label">{step.label}</p>
            </div>
          ))}
        </div>
      </section>

      {project.caseStudy ? (
        <section
          className="detail-slab bg-slate-900/45 p-6 text-white/75"
          style={{
            '--detail-glow':
              "conic-gradient(from 0deg, rgba(251,191,36,0.08), rgba(251,191,36,0.65), rgba(129,140,248,0.35), rgba(251,191,36,0.08))",
          }}
        >
          <h2 className="text-[0.7rem] uppercase tracking-[0.32em] text-white/55">Case study snapshot</h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed">
            <li>
              <strong>Problem:</strong> {project.caseStudy.problem}
            </li>
            <li>
              <strong>Solution:</strong> {project.caseStudy.solution}
            </li>
            <li>
              <strong>Tech Stack:</strong> {project.caseStudy.techStack}
            </li>
            <li>
              <strong>Role:</strong> {project.caseStudy.role}
            </li>
          </ul>
          {project.caseStudy.upgrades?.length ? (
            <div className="mt-4 space-y-2">
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/55">Up next</p>
              <ul className="list-disc pl-6 space-y-1.5 text-sm">
                {project.caseStudy.upgrades.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>
      ) : null}
    </article>
  );
}

function StarWarsDataModelDetail({ project }) {
  const caseStudy = project.caseStudy ?? {};
  const heroShot = project.gallery?.[0] ?? "https://placehold.co/1280x720/0f172a/ffffff?text=Screenshot+Coming+Soon";
  const evidenceShots = [
    { src: project.gallery?.[1], label: "pipenv run seed output" },
    { src: project.gallery?.[2], label: "pipenv run test output" },
    { src: project.gallery?.[3], label: "Favorite model constraints" },
  ].filter(shot => Boolean(shot.src));
  const [diagramOpen, setDiagramOpen] = useState(false);
  const [diagramZoom, setDiagramZoom] = useState(1);
  const [diagramOffset, setDiagramOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ clientX: 0, clientY: 0, originX: 0, originY: 0 });
  const wasDraggingRef = useRef(false);

  const detail = {
    strapline: "SQLAlchemy backend · Solo build",
    overview:
      "Backend for a Star Wars editorial and fandom platform built with Python 3.13, SQLAlchemy ORM, and a custom Pillow-based ER renderer so the schema stays transparent for collaborators.",
    featureGroups: [
      {
        title: "Rich schema coverage",
        items: [
          "Captures users, blog posts, tags, comments, and in-universe resources (Character, Planet, Starship) with normalized tables.",
          "Relationship configuration balances one-to-many, many-to-many, and optional favorite targets without obscuring intent.",
          "Cascade rules mirror editorial workflows so posts own their comments and tagged content stays in sync.",
        ],
      },
      {
        title: "Favorites guardrails",
        items: [
          "CHECK constraint enforces that each favorite points to exactly one resource column.",
          "Composite uniqueness keeps users from saving the same entity twice.",
          "SQLAlchemy relationships back-populate favorites so content views stay aligned with user curation.",
        ],
      },
      {
        title: "Automation & docs",
        items: [
          "Pipenv scripts regenerate the ER diagram, reseed the database, and run the pytest smoke suite.",
          "Seeding output confirms the schema builds cleanly and loads canonical Star Wars fixtures.",
          "Diagram renderer leans on Pillow so the project ships without external Graphviz dependencies.",
        ],
      },
    ],
    domainHighlights: [
      "Blog posts cross-reference characters, planets, or starships while sharing tags through the post_tag association table.",
      "Comments cascade on delete so editorial cleanup never leaves orphan rows behind.",
      "Favorites surface across users, posts, and data entities to power curated collections and follow lists.",
    ],
    commands: [
      {
        command: "pipenv run diagram",
        description: "Regenerates diagram.png with the latest models using the Pillow-based renderer.",
      },
      {
        command: "pipenv run seed",
        description: "Rebuilds the SQLite database, loads canonical Star Wars content, and prints what persists.",
      },
      {
        command: "pipenv run test",
        description: "Executes the pytest suite to ensure invalid favorites fail fast and constraints hold.",
      },
    ],
    futureWork:
      caseStudy.upgrades ?? [
        "Expand seed fixtures with editor personas and feature timelines",
        "Introduce Alembic migrations and reference API layer stubs",
      ],
  };

  useEffect(() => {
    if (!diagramOpen) return undefined;
    const handleKey = event => {
      if (event.key === "Escape") {
        setDiagramOpen(false);
        setDiagramZoom(1);
        setDiagramOffset({ x: 0, y: 0 });
        setIsDragging(false);
        wasDraggingRef.current = false;
        return;
      }
      if (event.key === "+" || event.key === "=") {
        event.preventDefault();
        adjustZoom(0.1);
        return;
      }
      if (event.key === "-" || event.key === "_") {
        event.preventDefault();
        adjustZoom(-0.1);
        return;
      }
      if (event.key.toLowerCase() === "0") {
        event.preventDefault();
        setDiagramZoom(1);
        setDiagramOffset({ x: 0, y: 0 });
        wasDraggingRef.current = false;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [diagramOpen]);

  const openDiagram = () => {
    setDiagramOpen(true);
    setDiagramZoom(1);
    setDiagramOffset({ x: 0, y: 0 });
    setIsDragging(false);
    wasDraggingRef.current = false;
  };

  const adjustZoom = delta => {
    setDiagramZoom(prev => {
      let next = prev + delta;
      if (next < 0.5) next = 0.5;
      if (next > 3) next = 3;
      next = Math.round(next * 100) / 100;
      if (next <= 1 && prev > 1) {
        setDiagramOffset({ x: 0, y: 0 });
        wasDraggingRef.current = false;
      }
      return next;
    });
  };

  const handleDiagramMouseDown = event => {
    if (!diagramOpen) return;
    if (event.button === 0 && event.shiftKey) {
      event.preventDefault();
      setIsDragging(true);
      wasDraggingRef.current = false;
      dragStartRef.current = {
        clientX: event.clientX,
        clientY: event.clientY,
        originX: diagramOffset.x,
        originY: diagramOffset.y,
      };
    }
  };

  const handleDiagramMouseMove = event => {
    if (!diagramOpen || !isDragging) return;
    event.preventDefault();
    const { clientX, clientY } = event;
    const start = dragStartRef.current;
    const dx = clientX - start.clientX;
    const dy = clientY - start.clientY;
    setDiagramOffset({ x: start.originX + dx, y: start.originY + dy });
    if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
      wasDraggingRef.current = true;
    }
  };

  const endDiagramDrag = () => {
    if (!isDragging) return;
    setIsDragging(false);
  };

  return (
    <article className="project-detail mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 pb-24">
      <div className="pt-6">
        <Link
          to="/projects"
          className="back-link inline-flex items-center gap-2 border border-white/20 bg-white/5 px-3 py-1 text-[0.6rem] uppercase tracking-[0.45em] text-white/70 transition hover:border-white/40 hover:text-white no-underline hover:no-underline"
        >
          <span aria-hidden="true">←</span>
          Back
        </Link>
      </div>

      <header className="grid gap-8 lg:grid-cols-[3fr_2fr]">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-white/40">{detail.strapline}</p>
          <h1 className="text-4xl font-semibold text-white">{project.title}</h1>
          <p className="text-white/70 max-w-3xl leading-relaxed">{detail.overview}</p>
          <p className="text-sm text-white/60">{project.summary}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map(item => (
              <TechPill key={`sw-sql-tech-${item}`} label={item} variant="box" />
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <a className="btn" href={project.githubUrl} target="_blank" rel="noreferrer">
              View Repo
            </a>
            {project.liveUrl ? (
              <a className="btn" href={project.liveUrl} target="_blank" rel="noreferrer">
                Live Demo
              </a>
            ) : null}
          </div>
        </div>
        <div className="space-y-5">
          <button
            type="button"
            onClick={openDiagram}
            className="group block cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <figure
              className="detail-frame relative overflow-hidden bg-slate-900/70 transition group-hover:brightness-110"
              style={{
                '--detail-glow':
                  "conic-gradient(from 0deg, rgba(56,189,248,0.05), rgba(56,189,248,0.75), rgba(129,140,248,0.35), rgba(56,189,248,0.05))",
              }}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-900/60 via-transparent to-cyan-500/20" />
              <img
                src={heroShot}
                alt="Star Wars SQLAlchemy ER diagram"
                className="relative w-full border border-white/10 object-contain"
              />
              <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/30 bg-black/55 px-3 py-1 text-[0.55rem] uppercase tracking-[0.3em] text-white/70 shadow-lg">
                <span aria-hidden="true">🔍</span>
                Zoom
              </div>
            </figure>
          </button>
          {caseStudy.role ? (
            <div
              className="detail-slab bg-slate-900/50 p-5 text-sm text-white/75"
              style={{
                '--detail-glow':
                  "conic-gradient(from 0deg, rgba(148,163,184,0.05), rgba(148,163,184,0.6), rgba(56,189,248,0.4), rgba(148,163,184,0.05))",
              }}
            >
              <p className="text-[0.7rem] uppercase tracking-[0.3em] text-white/55">My role</p>
              <p className="mt-2 leading-relaxed">{caseStudy.role}</p>
            </div>
          ) : null}
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-3">
        {detail.featureGroups.map(group => (
          <div
            key={group.title}
            className="detail-slab bg-slate-900/45 p-5 text-sm text-white/75"
            style={{
              '--detail-glow':
                "conic-gradient(from 0deg, rgba(59,130,246,0.05), rgba(59,130,246,0.65), rgba(45,212,191,0.45), rgba(59,130,246,0.05))",
            }}
          >
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/55">{group.title}</p>
            <ul className="mt-2 space-y-2 leading-relaxed">
              {group.items.map(item => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section
        className="detail-slab bg-slate-900/45 p-6 text-white/75"
        style={{
          '--detail-glow':
            "conic-gradient(from 0deg, rgba(56,189,248,0.05), rgba(56,189,248,0.7), rgba(129,140,248,0.35), rgba(56,189,248,0.05))",
        }}
      >
        <h2 className="text-[0.7rem] uppercase tracking-[0.32em] text-white/55">Domain coverage</h2>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed">
          {detail.domainHighlights.map(item => (
            <li key={item} className="flex gap-2">
              <span aria-hidden="true">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {evidenceShots.length ? (
        <section
          className="detail-slab bg-slate-900/45 p-6 text-white/75"
          style={{
            '--detail-glow':
              "conic-gradient(from 0deg, rgba(129,140,248,0.05), rgba(129,140,248,0.6), rgba(56,189,248,0.35), rgba(129,140,248,0.05))",
          }}
        >
          <h2 className="text-[0.7rem] uppercase tracking-[0.32em] text-white/55">Visual evidence</h2>
          <div className="mt-4 space-y-6">
            {evidenceShots.map((shot, index) => (
              <div key={shot.label} className="space-y-4">
                {index > 0 ? <div className="h-px bg-white/15" aria-hidden="true" /> : null}
                <p className="text-xs uppercase tracking-[0.3em] text-white/55">{shot.label}</p>
                <figure
                  className="detail-frame overflow-hidden bg-black/30"
                  style={{
                    '--detail-glow':
                      "conic-gradient(from 0deg, rgba(56,189,248,0.08), rgba(56,189,248,0.5), rgba(129,140,248,0.3), rgba(56,189,248,0.08))",
                  }}
                >
                  <img src={shot.src} alt={shot.label} className="w-full border border-white/10 object-cover" />
                </figure>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section
        className="detail-slab bg-slate-900/50 p-6 text-white/75"
        style={{
          '--detail-glow':
            "conic-gradient(from 0deg, rgba(56,189,248,0.05), rgba(56,189,248,0.75), rgba(129,140,248,0.4), rgba(56,189,248,0.05))",
        }}
      >
        <h2 className="text-[0.7rem] uppercase tracking-[0.32em] text-white/55">How to run it</h2>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed">
          {detail.commands.map(item => (
            <li key={item.command} className="rounded border border-cyan-200/20 bg-slate-900/60 px-4 py-3">
              <code className="block text-xs uppercase tracking-[0.3em] text-cyan-200/80">{item.command}</code>
              <p className="mt-2 text-white/75">{item.description}</p>
            </li>
          ))}
        </ul>
      </section>

      {detail.futureWork?.length ? (
        <section
          className="detail-slab bg-slate-900/45 p-6 text-white/75"
          style={{
            '--detail-glow':
              "conic-gradient(from 0deg, rgba(148,163,184,0.05), rgba(148,163,184,0.6), rgba(56,189,248,0.35), rgba(148,163,184,0.05))",
          }}
        >
          <h2 className="text-[0.7rem] uppercase tracking-[0.3em] text-white/55">Future work</h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed">
            {detail.futureWork.map(item => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <footer className="detail-slab bg-slate-900/45 p-6 text-sm text-white/70">
        <p>
          The project keeps schema, documentation, and automation in lockstep; use the Pipenv commands to regenerate visuals, reseed
          data, and reaffirm integrity whenever the models evolve.
        </p>
      </footer>
      {diagramOpen ? (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/90 p-4 backdrop-blur"
          onMouseMove={handleDiagramMouseMove}
          onMouseUp={endDiagramDrag}
          onMouseLeave={endDiagramDrag}
        >
          <div className="pointer-events-none absolute right-6 top-1/2 z-10 -translate-y-1/2">
            <div className="pointer-events-auto max-w-xs rounded border border-white/25 bg-slate-900/80 px-5 py-4 text-xs text-white/70 shadow-xl backdrop-blur">
              <p className="font-semibold uppercase tracking-[0.3em] text-white/60">Controls</p>
              <ul className="mt-2 space-y-1 leading-relaxed">
                <li>Left click: zoom in</li>
                <li>Right click: zoom out</li>
                <li>Shift + drag: pan</li>
                <li>+ / − / 0: zoom, reset</li>
                <li>Esc: close</li>
              </ul>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setDiagramOpen(false);
              setDiagramZoom(1);
              setDiagramOffset({ x: 0, y: 0 });
              setIsDragging(false);
              wasDraggingRef.current = false;
            }}
            className="absolute right-6 top-6 z-10 rounded-full border border-white/25 bg-black/60 p-2 text-white transition hover:bg-white/20"
            aria-label="Close diagram"
          >
            ✕
          </button>
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 pb-3">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">diagram.png</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => adjustZoom(-0.1)}
                className="rounded border border-white/20 bg-white/10 px-3 py-2 text-sm text-white transition hover:bg-white/20"
              >
                −
              </button>
              <button
                type="button"
                onClick={() => adjustZoom(0.1)}
                className="rounded border border-white/20 bg-white/10 px-3 py-2 text-sm text-white transition hover:bg-white/20"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => {
                  setDiagramZoom(1);
                  setDiagramOffset({ x: 0, y: 0 });
                  wasDraggingRef.current = false;
                }}
                className="rounded border border-white/20 bg-white/10 px-3 py-2 text-sm text-white transition hover:bg-white/20"
              >
                Reset
              </button>
              <span className="text-xs text-white/60">{Math.round(diagramZoom * 100)}%</span>
              <button
                type="button"
                onClick={() => {
                  setDiagramOpen(false);
                  setDiagramZoom(1);
                  setDiagramOffset({ x: 0, y: 0 });
                  setIsDragging(false);
                  wasDraggingRef.current = false;
                }}
                className="rounded border border-white/20 bg-white/10 px-3 py-2 text-sm text-white transition hover:bg-white/20"
              >
                Close
              </button>
            </div>
          </div>
          <div
            className="relative flex flex-1 justify-center overflow-auto"
            onMouseDown={handleDiagramMouseDown}
            onClick={event => {
              if (event.shiftKey || wasDraggingRef.current) {
                wasDraggingRef.current = false;
                return;
              }
              if (event.button === 0) {
                event.preventDefault();
                adjustZoom(0.2);
              }
            }}
            onContextMenu={event => {
              event.preventDefault();
              if (event.shiftKey) return;
              wasDraggingRef.current = false;
              adjustZoom(-0.2);
            }}
          >
            <div className="my-auto">
              <img
                src={heroShot}
                alt="Zoomed Star Wars SQLAlchemy ER diagram"
                style={{
                  transform: `translate(${diagramOffset.x}px, ${diagramOffset.y}px) scale(${diagramZoom})`,
                  transformOrigin: "center center",
                }}
                className={`block max-w-none select-none ${
                  diagramZoom > 1 ? (isDragging ? "cursor-grabbing" : "cursor-grab") : "cursor-zoom-in"
                }`}
                draggable={false}
              />
            </div>
          </div>
          <p className="pt-3 text-center text-xs text-white/50">
            Tip: Shift + drag helps you explore different regions after zooming.
          </p>
        </div>
      ) : null}
    </article>
  );
}
function StarWarsReactDetail({ project }) {
  const detail = {
    strapline: "React 18 SPA · SWAPI Atlas",
    heroCopy:
      "Single-page experience that turns SWAPI endpoints into a cinematic atlas complete with curated art, carousels, and dossier-style detail pages.",
    highlightGroups: [
      {
        title: "Core Experience",
        items: [
          "Home view preloads characters, planets, and vehicles and fans them into dedicated carousel rails.",
          "Swipe-friendly horizontal cards spotlight the galaxy's highlights while keeping deeper exploration one tap away.",
          "Character rail includes a Show All modal grid for scanning the full roster and jumping straight into dossiers.",
          "Detail pages blend hero imagery, metadata chips, and responsive cards covering films, species, vehicles, and more.",
          "Navbar favorites dropdown tracks live counts, deep-links entries, and supports one-click removal without leaving the menu.",
        ],
      },
      {
        title: "Data & Architecture",
        items: [
          "Flux-style Context store exposes loadSomeData, toggleFavorite, and helper actions across the app.",
          "Initial load fetches SWAPI resources concurrently while curated fallbacks keep the UI populated if requests fail.",
          "Character detail refetches by ID and hydrates linked films, species, and starships for dossier-level depth.",
          "imageHelper pairs each resource with curated art hosted on GitHub and gracefully swaps to placeholders when missing.",
          "React Router 6 plus ScrollToTop reset the viewport on every route change for a polished navigation flow.",
        ],
      },
      {
        title: "Visual & UX Polish",
        items: [
          "Tailwind CDN utilities mix with Bootstrap components to deliver glassmorphism cards and layered shadows.",
          "Animated galactic backdrops and twinkling particles set the tone without compromising legibility.",
          "Responsive layouts adapt rails, modal grids, and detail panels from phones to wide displays with intentional spacing.",
          "Accessibility touches — descriptive alt text, aria labels, and keyboard-friendly dropdown controls — are baked in.",
        ],
      },
    ],
    toolkit: [
      "Built from the 4Geeks React/Webpack starter using React 18, Babel, and the Context + Flux architecture.",
      "Webpack dev/common/prod configs deliver hot reload locally and optimized bundles for deployment.",
      "npm scripts cover local dev (`npm start`), production builds, and GitHub Pages deployment automation.",
      "Bootstrap 5, Tailwind CDN, and Font Awesome load via `template.html`, giving instant access to layout and icon systems.",
    ],
    favoritesNotes: [
      "Global favorites state persists across routes and surfaces live counts right inside the navbar menu.",
      "Dropdown removal keeps context intact so users can prune favorites without leaving the page.",
      "First-visit disclaimer modal frames the fan-project intent before guests dive into the atlas.",
    ],
    flow: [
      { label: "loadSomeData fetches SWAPI", iconKey: "api" },
      { label: "Context store normalizes state", iconKey: "context" },
      { label: "imageHelper pairs curated art", iconKey: "ui" },
      { label: "Favorites sync everywhere", iconKey: "form" },
    ],
  };

  const gallery = project.media?.images ?? project.gallery ?? [];
  const demoVideo = project.media?.videos?.[0] ?? null;
  const posterImage = gallery[0] ?? project.thumbnail;
  const flowPalette = [
    "rgba(56,189,248,0.45)",
    "rgba(129,140,248,0.45)",
    "rgba(148,163,184,0.45)",
    "rgba(59,130,246,0.45)",
  ];
  const flowSteps = detail.flow.map((step, index) => ({
    label: step.label,
    icon: workflowIconMap[step.iconKey] ?? workflowIconMap.api,
    accent: flowPalette[index % flowPalette.length],
  }));
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    if (lightboxIndex === null) return undefined;
    const handleKeyDown = event => {
      if (event.key === "Escape") {
        setLightboxIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex]);

  const heroShot = gallery[0] ? { src: gallery[0], idx: 0 } : null;
  const otherShots = gallery.slice(1).map((shot, index) => ({ src: shot, idx: index + 1 }));
  const primaryShots = otherShots.slice(0, 2);
  const extraShots = otherShots.slice(2);

  const renderZoomableImage = (image, className = "") => (
    <button
      type="button"
      onClick={() => setLightboxIndex(image.idx)}
      className={`group relative block overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${className}`}
    >
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/15 via-transparent to-sky-500/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      <img
        src={image.src}
        alt={`${project.title} UI detail ${image.idx + 1}`}
        className="relative block h-full w-full border border-white/10 object-cover"
      />
      <span className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-white/30 bg-black/40 px-2 py-1 text-[0.6rem] uppercase tracking-[0.3em] text-white/70 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        Zoom
      </span>
    </button>
  );

  return (
    <article className="project-detail mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 pb-24">
      <div className="pt-6">
        <Link
          to="/projects"
          className="back-link inline-flex items-center gap-2 border border-white/20 bg-white/5 px-3 py-1 text-[0.6rem] uppercase tracking-[0.45em] text-white/70 transition hover:border-white/40 hover:text-white no-underline hover:no-underline"
        >
          <span aria-hidden="true">←</span>
          Back
        </Link>
      </div>

      <header className="grid gap-6 lg:grid-cols-[3fr_2fr]">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-white/40">{detail.strapline}</p>
          <h1 className="text-4xl font-semibold text-white">{project.title}</h1>
          <p className="text-white/70 max-w-3xl leading-relaxed">{detail.heroCopy}</p>
          <p className="text-sm text-white/60">{project.summary}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map(item => (
              <TechPill key={`starwars-tech-${item}`} label={item} variant="box" />
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <a className="btn" href={project.githubUrl} target="_blank" rel="noreferrer">
              View Repo
            </a>
            {project.sandboxUrl ? (
              <a className="btn" href={project.sandboxUrl} target="_blank" rel="noreferrer">
                Live Sandbox
              </a>
            ) : null}
          </div>
        </div>
        <div
          className="detail-slab bg-slate-900/55 p-6 text-sm text-white/75"
          style={{
            '--detail-glow':
              "conic-gradient(from 0deg, rgba(56,189,248,0.08), rgba(56,189,248,0.65), rgba(129,140,248,0.4), rgba(56,189,248,0.08))",
          }}
        >
          <p className="text-[0.7rem] uppercase tracking-[0.32em] text-white/55">Favorites system</p>
          <ul className="mt-3 space-y-2 leading-relaxed">
            {detail.favoritesNotes.map(item => (
              <li key={item} className="flex gap-2 text-sm">
                <span aria-hidden="true">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {demoVideo ? (
        <section
          className="detail-frame relative overflow-hidden bg-slate-900/65"
          style={{
            '--detail-glow':
              "conic-gradient(from 0deg, rgba(129,140,248,0.08), rgba(129,140,248,0.65), rgba(56,189,248,0.35), rgba(129,140,248,0.08))",
          }}
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-900/70 via-transparent to-indigo-500/20" />
          <video
            controls
            poster={posterImage}
            className="relative w-full border border-white/10 bg-black object-cover"
          >
            <source src={demoVideo} type="video/quicktime" />
            <source src={demoVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </section>
      ) : null}

      <section className="grid gap-6 lg:grid-cols-3">
        {detail.highlightGroups.map(group => (
          <div
            key={group.title}
            className="detail-slab bg-slate-900/45 p-6 text-sm text-white/75"
            style={{
              '--detail-glow':
                "conic-gradient(from 0deg, rgba(56,189,248,0.08), rgba(56,189,248,0.65), rgba(129,140,248,0.35), rgba(56,189,248,0.08))",
            }}
          >
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/55">{group.title}</p>
            <ul className="mt-3 space-y-2 leading-relaxed">
              {group.items.map(item => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {gallery.length ? (
        <section className="space-y-4">
          {primaryShots.length ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {primaryShots.map((shot, index) => (
                <div
                  key={`sw-react-primary-${shot.idx}`}
                  className="detail-frame bg-slate-900/55 p-0"
                  style={{
                    '--detail-glow':
                      "conic-gradient(from 0deg, rgba(148,163,184,0.08), rgba(148,163,184,0.6), rgba(56,189,248,0.3), rgba(148,163,184,0.08))",
                  }}
                >
                  {renderZoomableImage(shot)}
                </div>
              ))}
            </div>
          ) : null}

          {heroShot ? (
            <div
              className="detail-frame bg-slate-900/55 p-0"
              style={{
                '--detail-glow':
                  "conic-gradient(from 0deg, rgba(56,189,248,0.08), rgba(56,189,248,0.7), rgba(129,140,248,0.35), rgba(56,189,248,0.08))",
              }}
            >
              {renderZoomableImage(heroShot)}
            </div>
          ) : null}

          {extraShots.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {extraShots.map((shot, index) => (
                <div
                  key={`sw-react-extra-${shot.idx}`}
                  className="detail-frame bg-slate-900/55 p-0"
                  style={{
                    '--detail-glow':
                      "conic-gradient(from 0deg, rgba(148,163,184,0.08), rgba(148,163,184,0.6), rgba(56,189,248,0.3), rgba(148,163,184,0.08))",
                  }}
                >
                  {renderZoomableImage(shot)}
                </div>
              ))}
            </div>
          ) : null}
        </section>
      ) : null}

      <section
        className="detail-slab bg-slate-900/45 p-6"
        style={{
          '--detail-glow':
            "conic-gradient(from 0deg, rgba(129,140,248,0.08), rgba(129,140,248,0.65), rgba(56,189,248,0.35), rgba(129,140,248,0.08))",
        }}
      >
        <h2 className="text-[0.7rem] uppercase tracking-[0.32em] text-white/55">Tech & tooling</h2>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/80">
          {detail.toolkit.map(item => (
            <li key={item} className="flex gap-2">
              <span aria-hidden="true">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="detail-slab bg-slate-900/45 p-6"
        style={{
          '--detail-glow':
            "conic-gradient(from 0deg, rgba(56,189,248,0.08), rgba(56,189,248,0.7), rgba(129,140,248,0.35), rgba(56,189,248,0.08))",
        }}
      >
        <h2 className="text-[0.7rem] uppercase tracking-[0.32em] text-white/55">Workflow</h2>
        <div className="detail-workflow">
          {flowSteps.map((step, index) => (
            <div key={`${step.label}-${index}`} className="detail-workflow__item" style={{ '--node-accent': step.accent }}>
              <div className="detail-workflow__node" aria-hidden="true">
                <img src={step.icon} alt={`${step.label} icon`} className="detail-workflow__icon" />
              </div>
              <p className="detail-workflow__label">{step.label}</p>
            </div>
          ))}
        </div>
      </section>

      {project.caseStudy ? (
        <section
          className="detail-slab bg-slate-900/45 p-6 text-white/75"
          style={{
            '--detail-glow':
              "conic-gradient(from 0deg, rgba(148,163,184,0.08), rgba(148,163,184,0.65), rgba(56,189,248,0.35), rgba(148,163,184,0.08))",
          }}
        >
          <h2 className="text-[0.7rem] uppercase tracking-[0.32em] text-white/55">Case study snapshot</h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed">
            <li>
              <strong>Problem:</strong> {project.caseStudy.problem}
            </li>
            <li>
              <strong>Solution:</strong> {project.caseStudy.solution}
            </li>
            <li>
              <strong>Tech Stack:</strong> {project.caseStudy.techStack}
            </li>
            <li>
              <strong>Role:</strong> {project.caseStudy.role}
            </li>
          </ul>
          {project.caseStudy.upgrades?.length ? (
            <div className="mt-4 space-y-2">
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/55">Up next</p>
              <ul className="list-disc pl-6 space-y-1.5 text-sm">
                {project.caseStudy.upgrades.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>
      ) : null}

      {lightboxIndex !== null ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded screenshot"
          onClick={() => setLightboxIndex(null)}
        >
          <div className="relative max-h-[90vh] w-full max-w-5xl" onClick={event => event.stopPropagation()}>
            <button
              type="button"
              className="absolute right-3 top-3 rounded-full border border-white/30 bg-black/50 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/70 transition hover:bg-black/80"
              onClick={() => setLightboxIndex(null)}
            >
              Close
            </button>
            <img
              src={gallery[lightboxIndex]}
              alt={`${project.title} expanded screenshot ${lightboxIndex + 1}`}
              className="h-full w-full max-h-[90vh] object-contain"
            />
          </div>
        </div>
      ) : null}
    </article>
  );
}
function ContactListDetail({ project }) {
  const images = (project.media?.images ?? project.gallery ?? []).filter(Boolean);
  const heroImage = project.thumbnail ?? images[0] ?? null;
  const supportingImages = heroImage ? images.filter(src => src !== heroImage) : images;
  const demoVideo = project.media?.videos?.[0] ?? null;

  const detail = {
    overview:
      "React single-page contact manager with inline CRUD flows, routed contact detail views, and a light Flux-style store keeping everything in sync.",
    role:
      "Solo developer owning the component architecture, global state, router wiring, and UX polish for this bootcamp CRUD assignment.",
    highlights: [
      "Inline form swaps between create and edit modes with field-level validation and cancel/reset handling.",
      "Flux-inspired global store (flux.js) centralizes add/update/delete actions so list and detail views stay synchronized.",
      "React Router 6 detail route reads the contact ID from params, hydrates state, and shows a graceful fallback when a record is missing.",
    ],
    stack: ["React 18", "React Router 6", "Context API", "Flux store", "Bootstrap 5", "Webpack"],
    upgrades: [
      "Persist contacts to Supabase or localStorage so refreshes and demos keep their data intact.",
      "Layer Cypress smoke tests that cover add, edit, and delete flows end to end.",
    ],
  };

  return (
    <article className="project-detail mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 pb-24">
      <div className="pt-6">
        <Link
          to="/projects"
          className="back-link inline-flex items-center gap-2 border border-white/20 bg-white/5 px-3 py-1 text-[0.6rem] uppercase tracking-[0.45em] text-white/70 transition hover:border-white/40 hover:text-white no-underline hover:no-underline"
        >
          <span aria-hidden="true">←</span>
          Back
        </Link>
      </div>

      <header className="grid gap-6 lg:grid-cols-[3fr_2fr]">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-white/40">React CRUD · Solo build</p>
          <h1 className="text-4xl font-semibold text-white">{project.title}</h1>
          <p className="text-white/70 max-w-3xl">{detail.overview}</p>
          <div className="flex flex-wrap gap-2">
            <a className="btn" href={project.githubUrl} target="_blank" rel="noreferrer">
              View Repo
            </a>
            {project.liveUrl ? (
              <a className="btn" href={project.liveUrl} target="_blank" rel="noreferrer">
                Live Demo
              </a>
            ) : null}
          </div>
        </div>
        {heroImage ? (
          <div
            className="detail-frame relative overflow-hidden bg-slate-900/60 p-4"
            style={{ '--detail-glow': "conic-gradient(from 0deg, rgba(56,189,248,0.05), rgba(56,189,248,0.75), rgba(236,72,153,0.4), rgba(56,189,248,0.05))" }}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-rose-500/15 opacity-70" />
            <img
              src={heroImage}
              alt={`${project.title} hero screenshot`}
              className="relative w-full border border-white/10 object-contain"
            />
          </div>
        ) : null}
      </header>

      <section
        className="detail-slab bg-slate-900/45 p-6 text-sm text-white/75"
        style={{ '--detail-glow': "conic-gradient(from 0deg, rgba(56,189,248,0.05), rgba(56,189,248,0.7), rgba(236,72,153,0.35), rgba(56,189,248,0.05))" }}
      >
        <h2 className="text-[0.7rem] uppercase tracking-[0.32em] text-white/55">Highlights</h2>
        <ul className="mt-3 space-y-2 leading-relaxed">
          {detail.highlights.map(item => (
            <li key={item} className="flex gap-2">
              <span aria-hidden="true">✶</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {demoVideo ? (
        <section
          className="detail-frame overflow-hidden bg-slate-900/55 p-4"
          style={{ '--detail-glow': "conic-gradient(from 0deg, rgba(236,72,153,0.05), rgba(236,72,153,0.7), rgba(56,189,248,0.35), rgba(236,72,153,0.05))" }}
        >
          <h2 className="mb-3 text-[0.7rem] uppercase tracking-[0.32em] text-white/55">Demo walk-through</h2>
          <video
            controls
            playsInline
            preload="metadata"
            poster={heroImage ?? supportingImages[0] ?? undefined}
            className="w-full rounded border border-white/10 bg-black/60"
          >
            <source src={demoVideo} type="video/mp4" />
            <source src={demoVideo} type="video/quicktime" />
            Your browser does not support the embedded demo. Watch the contact list walkthrough locally.
          </video>
        </section>
      ) : null}

      {supportingImages.length ? (
        <section className="space-y-4">
          <h2 className="text-[0.7rem] uppercase tracking-[0.32em] text-white/55">Interface details</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {supportingImages.map((src, index) => (
              <div
                key={`${project.slug}-support-${index}`}
                className="detail-frame relative overflow-hidden bg-slate-900/60 p-4"
                style={{ '--detail-glow': "conic-gradient(from 0deg, rgba(56,189,248,0.05), rgba(56,189,248,0.7), rgba(236,72,153,0.35), rgba(56,189,248,0.05))" }}
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/18 via-transparent to-rose-500/12 opacity-70" />
                <img
                  src={src}
                  alt={`${project.title} interface screenshot ${index + 1}`}
                  className="relative w-full border border-white/10 object-contain"
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="grid gap-4 lg:grid-cols-2">
        <div
          className="detail-slab bg-slate-900/45 p-6 text-sm text-white/75"
          style={{ '--detail-glow': "conic-gradient(from 0deg, rgba(56,189,248,0.05), rgba(56,189,248,0.7), rgba(236,72,153,0.35), rgba(56,189,248,0.05))" }}
        >
          <h2 className="text-[0.7rem] uppercase tracking-[0.32em] text-white/55">Role</h2>
          <p className="mt-3 leading-relaxed">{detail.role}</p>
        </div>
        <div
          className="detail-slab bg-slate-900/45 p-6 text-sm text-white/75"
          style={{ '--detail-glow': "conic-gradient(from 0deg, rgba(236,72,153,0.05), rgba(236,72,153,0.65), rgba(56,189,248,0.35), rgba(236,72,153,0.05))" }}
        >
          <h2 className="text-[0.7rem] uppercase tracking-[0.32em] text-white/55">Tech stack</h2>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {detail.stack.map(item => (
              <TechPill key={`contact-stack-${item}`} label={item} variant="box" />
            ))}
          </div>
        </div>
      </section>

      <section
        className="detail-slab bg-slate-900/45 p-6 text-sm text-white/75"
        style={{ '--detail-glow': "conic-gradient(from 0deg, rgba(56,189,248,0.05), rgba(56,189,248,0.6), rgba(236,72,153,0.35), rgba(56,189,248,0.05))" }}
      >
        <h2 className="text-[0.7rem] uppercase tracking-[0.32em] text-white/55">Next steps</h2>
        <ul className="mt-3 space-y-2 leading-relaxed">
          {detail.upgrades.map(item => (
            <li key={item} className="flex gap-2">
              <span aria-hidden="true">→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

function BiteFinderDetail({ project }) {
  const detail = {
    overview:
      "Cohort capstone that stitched together a React client and Flask API. We treated it like a production rehearsal—routing, auth, migrations, and deployment all had to actually work, not just demo locally.",
    role:
      "Front-end organization, component styling, debugging fetch flows, and keeping the team unblocked on GitHub. Lots of refactoring, lots of pairing, and plenty of merge-conflict cleanup.",
    frontend: ["React", "Vite", "Bootstrap", "Tailwind"],
    backend: ["Python", "Flask", "SQLAlchemy", "JWT"],
    platform: ["PostgreSQL", "Render", "Vercel"],
    devTools: ["GitHub Codespaces", "Gitpod", "Pipenv"],
    challenges: [
      "Configuring environment variables across dev, Codespaces, and Render without leaking secrets.",
      "Keeping branches tidy so four people could ship without stomping each other’s work.",
      "Debugging CORS and auth handshakes between Flask and the React client.",
    ],
    lessons: [
      "Write the .env checklist before you push—future you will forget.",
      "Small, descriptive commits make merge conflict surgery way faster.",
      "Instrument the API early so the UI can fail gracefully while endpoints are in flux.",
    ],
    workflow: ["User", "React UI", "Flask API", "PostgreSQL", "React UI"],
  };

  const mediaImages = (project.media?.images ?? project.gallery ?? []).filter(Boolean);
  const mediaVideos = (project.media?.videos ?? []).filter(Boolean);
  const mediaSlides = [...mediaImages, ...mediaVideos];
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = mediaSlides.length;
  const workflowPalette = [
    "rgba(56,189,248,0.55)",
    "rgba(14,165,233,0.55)",
    "rgba(16,185,129,0.55)",
    "rgba(251,191,36,0.55)",
    "rgba(139,92,246,0.55)",
  ];
  const workflowSequence = [
    { label: "User", iconKey: "user" },
    { label: "React UI", iconKey: "react" },
    { label: "Flask API", iconKey: "flask" },
    { label: "PostgreSQL", iconKey: "db" },
    { label: "React UI", iconKey: "ui" },
  ];
  const workflowSteps = workflowSequence.map((step, index) => ({
    label: step.label,
    icon: workflowIconMap[step.iconKey] ?? workflowIconMap.user,
    accent: workflowPalette[index % workflowPalette.length],
  }));

  const handlePrev = () => {
    if (!totalSlides) return;
    setActiveSlide(prev => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    if (!totalSlides) return;
    setActiveSlide(prev => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  return (
    <article className="project-detail mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 pb-24">
      <div className="pt-6">
        <Link
          to="/projects"
          className="back-link inline-flex items-center gap-2 border border-white/20 bg-white/5 px-3 py-1 text-[0.6rem] uppercase tracking-[0.45em] text-white/70 transition hover:border-white/40 hover:text-white no-underline hover:no-underline"
        >
          <span aria-hidden="true">←</span>
          Back
        </Link>
      </div>

      {totalSlides > 0 && (
        <section className="detail-frame relative overflow-hidden bg-slate-900/60">
          <div className="flex h-full min-h-[320px] items-center justify-center bg-slate-950/30">
            {mediaSlides[activeSlide]?.endsWith?.(".mov") ? (
              <video
                key={`bitefinder-slide-${activeSlide}`}
                src={mediaSlides[activeSlide]}
                controls
                playsInline
                preload="metadata"
                className="h-full w-full max-h-[560px] object-contain"
              />
            ) : (
              <img
                key={`bitefinder-slide-${activeSlide}`}
                src={mediaSlides[activeSlide]}
                alt={`BiteFinder asset ${activeSlide + 1}`}
                className="h-full w-full max-h-[560px] object-contain"
              />
            )}
          </div>
          {totalSlides > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/55 px-3 py-2 text-white/80 transition hover:bg-black/75"
                aria-label="Previous media"
              >
                ←
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs text-white/70">
                {activeSlide + 1} / {totalSlides}
              </div>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/55 px-3 py-2 text-white/80 transition hover:bg-black/75"
                aria-label="Next media"
              >
                →
              </button>
            </>
          )}
        </section>
      )}

      <header className="space-y-4">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] text-white/40">Group final · Full-stack delivery</p>
          <h1 className="text-4xl font-semibold text-white">{project.title}</h1>
          <p className="text-white/70 max-w-3xl">
            {project.summary}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a className="btn" href={project.githubUrl} target="_blank" rel="noreferrer">
            View Repo
          </a>
          <a
            className="btn"
            href="https://placehold.co/"
            target="_blank"
            rel="noreferrer"
          >
            Deployment Notes
          </a>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-2">
        <div
          className="detail-slab bg-slate-900/50 p-5"
          style={{
            '--detail-glow': "conic-gradient(from 0deg, rgba(56,189,248,0.05), rgba(56,189,248,0.75), rgba(45,212,191,0.55), rgba(56,189,248,0.05))",
            '--detail-border': "rgba(56,189,248,0.25)",
            '--detail-border-hover': "rgba(165,243,252,0.8)",
          }}
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent opacity-80"></div>
          <div className="relative space-y-2">
            <h2 className="text-[0.7rem] uppercase tracking-[0.32em] text-white/55">Overview</h2>
            <p className="text-sm leading-relaxed text-white/75">{detail.overview}</p>
          </div>
        </div>
        <div
          className="detail-slab bg-slate-900/50 p-5"
          style={{
            '--detail-glow': "conic-gradient(from 0deg, rgba(16,185,129,0.05), rgba(16,185,129,0.7), rgba(129,140,248,0.4), rgba(16,185,129,0.05))",
            '--detail-border': "rgba(16,185,129,0.25)",
            '--detail-border-hover': "rgba(110,231,183,0.75)",
          }}
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-transparent opacity-80"></div>
          <div className="relative space-y-2">
            <h2 className="text-[0.7rem] uppercase tracking-[0.32em] text-white/55">My role</h2>
            <p className="text-sm leading-relaxed text-white/75">{detail.role}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <TechStackBlock label="Frontend" items={detail.frontend} />
        <TechStackBlock label="Backend" items={detail.backend} />
        <TechStackBlock label="Platform" items={[...detail.platform, ...detail.devTools]} />
      </section>

      <section
        className="detail-slab bg-slate-900/45 p-6"
        style={{
          '--detail-glow': "conic-gradient(from 0deg, rgba(56,189,248,0.05), rgba(56,189,248,0.7), rgba(165,243,252,0.45), rgba(56,189,248,0.05))",
        }}
      >
        <h2 className="text-[0.7rem] uppercase tracking-[0.32em] text-white/55">Workflow</h2>
        <p className="mt-2 text-sm text-white/70">
          Every user action flows through the full stack—no mock data, no shortcuts. Here’s how the requests move:
        </p>
        <div className="detail-workflow">
          {workflowSteps.map((step, index) => (
            <div
              key={`${step.label}-${index}`}
              className="detail-workflow__item"
              style={{ '--node-accent': step.accent }}
            >
              <div className="detail-workflow__node" aria-hidden="true">
                <img src={step.icon} alt={`${step.label} icon`} className="detail-workflow__icon" />
              </div>
              <p className="detail-workflow__label">{step.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr_3fr]">
        <div className="detail-slab bg-slate-900/45 p-6" style={{ '--detail-glow': "conic-gradient(from 0deg, rgba(148,163,184,0.05), rgba(148,163,184,0.55), rgba(56,189,248,0.35), rgba(148,163,184,0.05))" }}>
          <h2 className="text-[0.7rem] uppercase tracking-[0.32em] text-white/55">Challenges tackled</h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/75">
            {detail.challenges.map(item => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div
          className="detail-slab bg-slate-900/60 p-6 text-white/80"
          style={{
            '--detail-glow': "conic-gradient(from 0deg, rgba(16,185,129,0.05), rgba(16,185,129,0.75), rgba(99,102,241,0.45), rgba(16,185,129,0.05))",
            '--detail-border': "rgba(16,185,129,0.35)",
            '--detail-border-hover': "rgba(134,239,172,0.85)",
          }}
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-emerald-500/15 via-transparent to-cyan-500/10 opacity-80"></div>
          <div className="relative">
            <h2 className="text-[0.7rem] uppercase tracking-[0.32em] text-emerald-200/80">Lessons learned</h2>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-emerald-50/90">
              {detail.lessons.map(item => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true" className="text-emerald-200/80">✶</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <div className="detail-slab bg-slate-900/45 p-5" style={{ '--detail-glow': "conic-gradient(from 0deg, rgba(56,189,248,0.05), rgba(56,189,248,0.7), rgba(14,165,233,0.45), rgba(56,189,248,0.05))" }}>
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-white/55">Frontend vs. API</p>
          <div className="mt-3 grid gap-3 lg:grid-cols-2">
            <div
              className="detail-slab bg-gradient-to-br from-cyan-500/10 via-transparent to-slate-900/80 p-4"
              style={{
                '--detail-glow': "conic-gradient(from 0deg, rgba(14,165,233,0.05), rgba(14,165,233,0.7), rgba(45,212,191,0.45), rgba(14,165,233,0.05))",
                '--detail-border': "rgba(56,189,248,0.3)",
                '--detail-border-hover': "rgba(165,243,252,0.8)",
              }}
            >
              <p className="text-sm font-semibold text-white">React UI</p>
              <p className="mt-2 text-xs text-white/70">Dashboard, list views, protected routes, and clean state flows.</p>
            </div>
            <div
              className="detail-slab bg-gradient-to-br from-emerald-500/10 via-transparent to-slate-900/80 p-4"
              style={{
                '--detail-glow': "conic-gradient(from 0deg, rgba(16,185,129,0.05), rgba(16,185,129,0.75), rgba(56,189,248,0.4), rgba(16,185,129,0.05))",
                '--detail-border': "rgba(16,185,129,0.3)",
                '--detail-border-hover': "rgba(110,231,183,0.85)",
              }}
            >
              <p className="text-sm font-semibold text-white">Flask API</p>
              <p className="mt-2 text-xs text-white/70">JWT auth, SQLAlchemy models, and migrations powering the data.</p>
            </div>
          </div>
        </div>
        <div className="detail-slab bg-slate-900/45 p-5" style={{ '--detail-glow': "conic-gradient(from 0deg, rgba(129,140,248,0.05), rgba(129,140,248,0.65), rgba(236,72,153,0.35), rgba(129,140,248,0.05))" }}>
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-white/55">Deployment proof</p>
          <div className="mt-3 grid gap-3 lg:grid-cols-2">
            <div
              className="detail-slab bg-gradient-to-br from-indigo-500/10 via-transparent to-slate-900/80 p-4"
              style={{
                '--detail-glow': "conic-gradient(from 0deg, rgba(99,102,241,0.05), rgba(99,102,241,0.7), rgba(14,165,233,0.45), rgba(99,102,241,0.05))",
                '--detail-border': "rgba(99,102,241,0.3)",
                '--detail-border-hover': "rgba(165,180,252,0.85)",
              }}
            >
              <p className="text-sm font-semibold text-white">Render Services</p>
              <p className="mt-2 text-xs text-white/70">Hosted Flask API with build & deploy logs tracked per branch.</p>
            </div>
            <div
              className="detail-slab bg-gradient-to-br from-purple-500/10 via-transparent to-slate-900/80 p-4"
              style={{
                '--detail-glow': "conic-gradient(from 0deg, rgba(168,85,247,0.05), rgba(168,85,247,0.7), rgba(56,189,248,0.4), rgba(168,85,247,0.05))",
                '--detail-border': "rgba(168,85,247,0.3)",
                '--detail-border-hover': "rgba(216,180,254,0.85)",
              }}
            >
              <p className="text-sm font-semibold text-white">Vercel Preview</p>
              <p className="mt-2 text-xs text-white/70">Static exports for the React app validating CI before going live.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="detail-slab bg-slate-900/45 p-6 text-sm text-white/70">
        <p>
          Next iteration: capture production screenshots, tighten seed data for demo accounts, and document the one-click deploy
          flow so new collaborators can get up to speed in minutes.
        </p>
      </footer>
    </article>
  );
}

function TechStackBlock({ label, items }) {
  return (
    <div
      className="detail-slab bg-slate-900/45 p-5"
      style={{ '--detail-glow': "conic-gradient(from 0deg, rgba(56,189,248,0.05), rgba(56,189,248,0.65), rgba(45,212,191,0.45), rgba(56,189,248,0.05))" }}
    >
      <p className="text-[0.7rem] uppercase tracking-[0.3em] text-white/55">{label}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {items.map(item => (
          <TechPill key={`${label}-${item}`} label={item} variant="box" />
        ))}
      </div>
    </div>
  );
}
