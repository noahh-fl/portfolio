import { useState } from "react";
import ContactCard from "../components/ContactCard.jsx";
import FadeSection from "../components/FadeSection.jsx";
import SnapDots from "../components/SnapDots.jsx";

const quickHighlights = [
  {
    label: "Bootcamp",
    value: "4Geeks Academy",
    detail: "6-month full-stack sprint",
  },
  {
    label: "Focus",
    value: "Shipping personal builds",
    detail: "Polishing skills while job hunting",
  },
  {
    label: "Mediums",
    value: "Film · Music · Design · Code",
    detail: "Multidisciplinary maker",
  },
];

const bootcampPoints = [
  "Completed a 6-month Full-Stack Bootcamp at 4Geeks Academy with daily pair programming and weekly project demos.",
  "Currently iterating on personal builds to sharpen product instincts while interviewing for my next team.",
  "Documenting learnings and capturing reusable snippets so future teammates have a fast onboarding lane.",
];

const bootcampStacks = [
  {
    label: "Frontend",
    items: ["React", "Vite", "Tailwind", "Component systems"],
  },
  {
    label: "Backend",
    items: ["Flask", "SQLAlchemy", "PostgreSQL", "Docker"],
  },
  {
    label: "Team habits",
    items: ["Agile sprints", "Code reviews", "Pairing", "CI/CD basics"],
  },
];

const creativeTimeline = [
  {
    era: "2008",
    title: "First edits",
    description:
      "Borrowed my parents’ laptop to splice Lego stop-motion clips in Windows Movie Maker and discovered how pacing tells a story.",
    artifact: "Software: Windows Movie Maker",
  },
  {
    era: "Age 12–13",
    title: "Neighborhood film crew",
    description:
      "Shot short films with friends, routing cables through the house and layering soundtracks to learn timing and mood.",
    artifact: "Camera: Flip Video, edits in Sony Vegas",
  },
  {
    era: "High school",
    title: "YouTube + music production",
    description:
      "Built a small channel dropping edits, motion graphics, and original tracks made in Ableton. Collaborated remotely with classmates to keep ideas flowing.",
    artifact: "Ableton Live, Photoshop, After Effects",
  },
  {
    era: "2019",
    title: "Design rabbit hole",
    description:
      "Dove into branding and layout, rebuilding personal sites with responsive design and experimenting with Figma components.",
    artifact: "Tool stack: Figma, Lightroom, modern CSS",
  },
  {
    era: "Now",
    title: "Full-stack storytelling",
    description:
      "Ship React + Flask projects that stitch UI, data, and user empathy together—treating every build like a mini production.",
    artifact: "Stack: React, Vite, Flask, Render",
  },
];

const toolsetGroups = [
  {
    label: "Visual & editing",
    items: ["Photoshop", "Lightroom", "Sony Vegas", "After Effects"],
  },
  {
    label: "Audio & content",
    items: ["Ableton Live", "OBS Studio", "YouTube Studio"],
  },
  {
    label: "Product & code",
    items: ["VS Code", "Git & GitHub", "Figma", "Render", "Postman"],
  },
];

const earlyTechMoments = [
  {
    title: "STEM high school in Maine",
    detail: "Joined project-based engineering courses that framed code as a problem-solving tool rather than a homework assignment.",
    takeaway: "Learned to scope features, assign roles, and present progress in front of peers.",
  },
  {
    title: "Streetwear website launch",
    detail: "Built and maintained a freshman-year streetwear store—shooting product photos, handling orders, and tweaking CSS late at night.",
    takeaway: "Understood how design decisions impact conversion and brand trust.",
  },
  {
    title: "VR game capstone",
    detail: "Led a sophomore team to design a VR experience, coordinating sprints, assigning tasks, and shipping a playable prototype for demo day.",
    takeaway: "Discovered how leadership and technical execution intertwine when deadlines are real.",
  },
  {
    title: "4Geeks Academy",
    detail: "Immersive full-stack bootcamp with daily stand-ups, code reviews, and production-style projects in React and Flask.",
    takeaway: "Solidified habits around version control, testing, and demo-ready polish.",
  },
];

const mindsetStatement = "I like to bring ideas to life, from concept to finished product.";

export default function About() {
  const [activeSection, setActiveSection] = useState(0);
  const sectionCount = 6;

  return (
    <div className="snap-y snap-mandatory h-full">
      <SnapDots count={sectionCount} activeIndex={activeSection} />

      <FadeSection innerClassName="space-y-6 text-center" sectionId={0} onActivate={setActiveSection}>
        <p className="text-sm uppercase tracking-[0.3em] text-white/50">About Noah</p>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
          Creative technologist with a hospitality heart
        </h1>
        <p className="text-white/70 max-w-2xl mx-auto">
          Years of welcoming guests taught me to listen carefully, stay calm, and keep the experience polished. Now I channel that
          mindset into full-stack product work—crafting interfaces, shipping features, and making digital ideas tangible.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {quickHighlights.map(item => (
            <div key={item.label} className="card bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-white/50">{item.label}</p>
              <p className="mt-1 text-lg font-semibold text-white">{item.value}</p>
              <p className="text-sm text-white/60">{item.detail}</p>
            </div>
          ))}
        </div>
      </FadeSection>

      <FadeSection innerClassName="space-y-4" sectionId={1} onActivate={setActiveSection}>
        <section className="card p-6 space-y-3">
          <header className="space-y-1">
            <h2 className="text-xl font-semibold text-white">Bootcamp & skills in motion</h2>
            <p className="text-white/70 text-sm">
              A strong foundation in modern stacks, sharpened by repetition, feedback, and real builds.
            </p>
          </header>
          <ul className="space-y-2 text-sm text-white/75 leading-relaxed">
            {bootcampPoints.map(point => (
              <li key={point} className="flex gap-2">
                <span aria-hidden="true">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <div className="grid gap-3 md:grid-cols-3">
            {bootcampStacks.map(stack => (
              <div key={stack.label} className="rounded-lg border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-white/45">{stack.label}</p>
                <ul className="mt-2 space-y-1 text-sm text-white/70">
                  {stack.items.map(item => (
                    <li key={`${stack.label}-${item}`} className="flex gap-2">
                      <span aria-hidden="true" className="text-white/40">–</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </FadeSection>

      <FadeSection innerClassName="space-y-5" sectionId={2} onActivate={setActiveSection}>
        <section className="card p-6 space-y-4">
          <header className="space-y-1">
            <h2 className="text-xl font-semibold text-white">Creative background</h2>
            <p className="text-white/70 text-sm">
              I grew up glued to a computer—experimenting with cameras, mixing audio, and reverse-engineering how people told
              stories online.
            </p>
          </header>
          <div className="grid gap-6 md:grid-cols-[1fr_1.2fr]">
            <p className="text-sm text-white/70 leading-relaxed">
              Curiosity kept me moving from one medium to the next. Each project—whether a short film, a beat, or a thumbnail—was a
              reason to push into new software and workflows.
            </p>
            <ul className="space-y-4 border-l border-white/15 pl-6">
              {creativeTimeline.map(item => (
                <li key={item.title} className="relative">
                  <span className="absolute -left-[1.35rem] top-1 h-2 w-2 rounded-full bg-cyan-400"></span>
                  <p className="text-xs uppercase tracking-[0.25em] text-white/45">{item.era}</p>
                  <p className="text-white font-semibold">{item.title}</p>
                  <p className="text-sm text-white/70 leading-relaxed">{item.description}</p>
                  {item.artifact ? (
                    <p className="text-xs text-white/45">{item.artifact}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </FadeSection>

      <FadeSection innerClassName="space-y-5" sectionId={3} onActivate={setActiveSection}>
        <section className="card p-6 space-y-4">
          <header className="space-y-1">
            <h2 className="text-xl font-semibold text-white">Design & tools</h2>
            <p className="text-white/70 text-sm">
              I taught myself professional-grade software as soon as it was accessible, and stayed comfortable jumping between
              creative and technical toolchains.
            </p>
          </header>
          <div className="grid gap-4 md:grid-cols-3">
            {toolsetGroups.map(group => (
              <div key={group.label} className="rounded-lg border border-white/10 bg-white/5 p-4 space-y-2">
                <p className="text-xs uppercase tracking-[0.25em] text-white/45">{group.label}</p>
                <ul className="space-y-1 text-sm text-white/70">
                  {group.items.map(item => (
                    <li key={`${group.label}-${item}`} className="flex gap-2">
                      <span aria-hidden="true" className="text-white/35">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </FadeSection>

      <FadeSection innerClassName="space-y-5" sectionId={4} onActivate={setActiveSection}>
        <section className="card p-6 space-y-4">
          <header className="space-y-1">
            <h2 className="text-xl font-semibold text-white">Early tech experience</h2>
            <p className="text-white/70 text-sm">
              Formal programs and self-started projects gave me an early taste of product thinking and team leadership.
            </p>
          </header>
          <ul className="space-y-3 text-sm text-white/75 leading-relaxed">
            {earlyTechMoments.map(entry => (
              <li key={entry.title} className="card bg-white/5 p-4 space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] text-white/45">{entry.title}</p>
                <p className="text-white/80">{entry.detail}</p>
                {entry.takeaway ? (
                  <p className="text-xs text-white/55">Takeaway: {entry.takeaway}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      </FadeSection>

      <FadeSection innerClassName="space-y-6" sectionId={5} onActivate={setActiveSection}>
        <section className="card p-6 space-y-3 max-w-3xl mx-auto">
          <header className="space-y-1">
            <h2 className="text-xl font-semibold text-white">Mindset</h2>
            <p className="text-white/60 text-sm">The throughline across music, film, design, and code.</p>
          </header>
          <blockquote className="border-l-4 border-cyan-400/70 bg-white/5 p-4 text-left">
            <p className="text-lg italic text-white/80">{mindsetStatement}</p>
          </blockquote>
          <p className="text-sm text-white/70 leading-relaxed">
            That drive shows up in how I approach features: start with a clear concept, iterate with intention, and deliver the final
            polish that makes the work feel real.
          </p>
        </section>
        <div className="max-w-3xl mx-auto w-full">
          <ContactCard />
        </div>
      </FadeSection>
    </div>
  );
}
