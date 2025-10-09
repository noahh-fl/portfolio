import { useState } from "react";
import ContactCard from "../components/ContactCard.jsx";
import FadeSection from "../components/FadeSection.jsx";
import SnapDots from "../components/SnapDots.jsx";

const quickHighlights = [
  {
    label: "Focus",
    value: "Front-end development",
    detail: "Building clean, responsive React interfaces with an eye for usability and structure.",
  },
  {
    label: "Collaboration",
    value: "Reliable teammate",
    detail: "Works closely with designers and developers to turn ideas into smooth, working products.",
  },
  {
    label: "Background",
    value: "Creative to technical",
    detail: "Experience across design, media, and hospitality, now centered on front-end development.",
  },
];

const bootcampPoints = [
  "Graduated from a full-stack bootcamp by shipping a capstone built with React, Flask, and PostgreSQL.",
  "Practiced daily standups, pair sessions, and code reviews to keep the team moving.",
  "Keep momentum with weekly builds that test new components, tooling, and deploys.",
];

const bootcampStacks = [
  {
    label: "Frontend",
    items: ["React", "Vite", "Tailwind CSS", "Accessible UI patterns"],
  },
  {
    label: "Backend",
    items: ["Flask", "PostgreSQL", "REST APIs", "Auth basics"],
  },
  {
    label: "Team habits",
    items: ["Pair programming", "Clear commits", "Retro notes", "Demo prep"],
  },
];

const toolsetGroups = [
  {
    label: "Design",
    items: ["Figma", "Photoshop", "Lightroom", "Premiere Pro"],
  },
  {
    label: "Content",
    items: ["After Effects", "Ableton Live", "OBS Studio", "YouTube Studio"],
  },
  {
    label: "Delivery",
    items: ["VS Code", "Git & GitHub", "Render", "Postman"],
  },
];

const deliveryPrinciples = [
  {
    title: "Steady pace",
    detail: "Break work into clear pieces, share updates early, and flag blockers before they slow the team.",
    takeaway: "Keeps projects moving without last-minute stress.",
  },
  {
    title: "Product alignment",
    detail: "Translate product briefs into tickets and check in with design, content, and QA before handoff.",
    takeaway: "Prevents rework and keeps decisions grounded.",
  },
  {
    title: "Keep improving",
    detail: "Run small retros, document what worked, and fold the lessons into the next build.",
    takeaway: "Every project gets sharper than the last.",
  },
];

export default function About() {
  const [activeSection, setActiveSection] = useState(0);
  const [hoveredHighlight, setHoveredHighlight] = useState(null);
  const [hoveredStack, setHoveredStack] = useState(null);
  const [hoveredToolGroup, setHoveredToolGroup] = useState(null);
  const [hoveredPrinciple, setHoveredPrinciple] = useState(null);
  const sectionCount = 5;

  return (
    <div className="snap-y snap-mandatory h-full">
      <SnapDots count={sectionCount} activeIndex={activeSection} />

      <FadeSection innerClassName="space-y-6 text-center" sectionId={0} onActivate={setActiveSection}>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
          Front-end developer building clean, thoughtful web experiences
        </h1>
        <p className="text-white/70 max-w-2xl mx-auto leading-relaxed">
          I build React interfaces with the same attention to detail I brought to hospitality—calm under pressure, user-focused, and
          reliable. I love designing things that feel smooth, intentional, and a little bit personal.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {quickHighlights.map(item => (
            <div
              key={item.label}
              onMouseEnter={() => setHoveredHighlight(item.label)}
              onMouseLeave={() => setHoveredHighlight(null)}
              className={`card bg-white/5 p-5 transition duration-300 ease-out ${hoveredHighlight
                  ? hoveredHighlight === item.label
                    ? "md:scale-[1.04] md:shadow-lg"
                    : "md:scale-[0.96] md:opacity-80"
                  : "md:scale-100"
                }`}
            >
              <p className="text-xs uppercase tracking-[0.25em] text-white/50">{item.label}</p>
              <p className="mt-1 text-lg font-semibold text-white">{item.value}</p>
              <p className="text-sm text-white/60">{item.detail}</p>
            </div>
          ))}
        </div>
      </FadeSection>

      <FadeSection innerClassName="space-y-6" sectionId={1} onActivate={setActiveSection}>
        <header className="space-y-2 text-center">
          <h2 className="text-3xl font-semibold text-white tracking-tight">Front-end practice</h2>
          <p className="text-white/70 text-sm max-w-2xl mx-auto">
            Bootcamp training plus steady solo projects keep my process organized and ready for production teams.
          </p>
        </header>
        <section className="card p-6 space-y-6">
          <ul className="space-y-2 text-sm text-white/75 leading-relaxed max-w-3xl mx-auto">
            {bootcampPoints.map(point => (
              <li key={point} className="flex gap-2">
                <span aria-hidden="true">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <div className="grid gap-3 md:grid-cols-3">
            {bootcampStacks.map(stack => (
              <div
                key={stack.label}
                onMouseEnter={() => setHoveredStack(stack.label)}
                onMouseLeave={() => setHoveredStack(null)}
                className={`rounded-lg border border-white/10 bg-white/5 p-4 transition duration-300 ease-out ${hoveredStack
                    ? hoveredStack === stack.label
                      ? "md:scale-[1.04] md:shadow-lg"
                      : "md:scale-[0.96] md:opacity-80"
                    : "md:scale-100"
                  }`}
              >
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
      <FadeSection innerClassName="space-y-6" sectionId={2} onActivate={setActiveSection}>
        <header className="space-y-2 text-center">
          <h2 className="text-3xl font-semibold text-white tracking-tight">Tools & workflow</h2>
          <p className="text-white/70 text-sm max-w-2xl mx-auto leading-relaxed">
            A focused toolkit keeps handoffs quick and feedback loops short from first sketch to deploy.
          </p>
        </header>
        <section className="card p-6">
          <div className="grid gap-4 md:grid-cols-3">
            {toolsetGroups.map(group => (
              <div
                key={group.label}
                onMouseEnter={() => setHoveredToolGroup(group.label)}
                onMouseLeave={() => setHoveredToolGroup(null)}
                className={`rounded-lg border border-white/10 bg-white/5 p-4 space-y-2 transition duration-300 ease-out ${hoveredToolGroup
                    ? hoveredToolGroup === group.label
                      ? "md:scale-[1.04] md:shadow-lg"
                      : "md:scale-[0.96] md:opacity-80"
                    : "md:scale-100"
                  }`}
              >
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

      <FadeSection innerClassName="space-y-6" sectionId={3} onActivate={setActiveSection}>
        <header className="space-y-2 text-center">
          <h2 className="text-3xl font-semibold text-white tracking-tight">Working style</h2>
          <p className="text-white/70 text-sm max-w-2xl mx-auto leading-relaxed">
            Clear communication and repeatable habits keep projects steady and collaborative.
          </p>
        </header>
        <section className="card p-6">
          <ul className="space-y-3 text-sm text-white/75 leading-relaxed">
            {deliveryPrinciples.map(entry => (
              <li
                key={entry.title}
                onMouseEnter={() => setHoveredPrinciple(entry.title)}
                onMouseLeave={() => setHoveredPrinciple(null)}
                className={`card bg-white/5 p-4 space-y-2 transition duration-300 ease-out ${hoveredPrinciple
                    ? hoveredPrinciple === entry.title
                      ? "md:scale-[1.04] md:shadow-lg"
                      : "md:scale-[0.96] md:opacity-80"
                    : "md:scale-100"
                  }`}
              >
                <p className="text-xs uppercase tracking-[0.3em] text-white/45">{entry.title}</p>
                <p className="text-white/80">{entry.detail}</p>
                {entry.takeaway ? (
                  <p className="text-xs text-white/55">Lesson: {entry.takeaway}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      </FadeSection>

      <FadeSection innerClassName="space-y-6" sectionId={4} onActivate={setActiveSection}>
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <section className="card p-6 space-y-4">
            <header className="space-y-2 text-center">
              <h2 className="text-3xl font-semibold text-white tracking-tight">Hey, I'm Noah.</h2>
            </header>
            <p className="text-white/70 text-sm leading-relaxed">
              I've always liked building things on a computer—started with videos and graphics, now it's websites. I focus on front-end work
              that feels clear, efficient, and good to use.
            </p>
            <p className="text-white/70 text-sm leading-relaxed">
              Most days I'm refining layouts, writing clean React components, and dialing in the small interactions that make an interface feel
              solid. I like keeping things simple, steady, and well built.
            </p>
            <p className="text-sm text-white/70 leading-relaxed text-center">
              If you're putting together a team and need a dependable front-end developer, I'd love to talk.
            </p>
          </section>
          <div className="w-full">
            <ContactCard />
          </div>
        </div>
      </FadeSection>
    </div>
  );
}
