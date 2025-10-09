import { useState } from "react";
import ContactCard from "../components/ContactCard.jsx";
import FadeSection from "../components/FadeSection.jsx";
import SnapDots from "../components/SnapDots.jsx";

const quickHighlights = [
  {
    label: "current focus",
    value: "front-end & product polish",
    detail: "building thoughtful react projects every week",
  },
  {
    label: "background",
    value: "hospitality → business → code",
    detail: "years of welcoming guests taught me to listen first",
  },
  {
    label: "origin story",
    value: "kid with a borrowed laptop",
    detail: "edited videos, made music, and never stopped tinkering",
  },
];

const bootcampPoints = [
  "Quit my hotel job to chase code full-time and soak up everything a full-stack bootcamp threw at me.",
  "Pair programming, daily labs, and late-night docs turned into a habit of breaking problems down with teammates.",
  "Still iterating on personal builds so the muscle memory stays sharp while I look for the right crew.",
];

const bootcampStacks = [
  {
    label: "frontend",
    items: ["React", "Vite", "Tailwind", "Component systems"],
  },
  {
    label: "backend",
    items: ["Flask", "PostgreSQL", "REST APIs", "Auth flows"],
  },
  {
    label: "team habits",
    items: ["Pairing", "Clean commits", "Retro notes", "Demo-ready polish"],
  },
];

const creativeHighlights = [
  {
    title: "borrowed computers",
    description:
      "i hopped between my parents’, grandparents’, and any spare computer just to learn what every button did.",
    note: "photoshop, illustrator, premiere—whatever adobe tool i could open, i tried.",
  },
  {
    title: "diy film studio",
    description:
      "got a macbook at 11, filmed family shorts, and even played with lego + clay stop motion just to see stories come alive.",
    note: "iMovie first, then premiere when i got brave enough.",
  },
  {
    title: "youtube era",
    description:
      "built my own pc, recorded gaming videos, and taught myself those wild 3d intros before moving on to cleaner design work.",
    note: "even snuck in music production and motion graphics nights.",
  },
];

const toolsetGroups = [
  {
    label: "visual & editing",
    items: ["Photoshop", "Lightroom", "Premiere Pro", "After Effects"],
  },
  {
    label: "audio & content",
    items: ["Ableton Live", "OBS Studio", "YouTube Studio"],
  },
  {
    label: "product & code",
    items: ["VS Code", "Git & GitHub", "Figma", "Render", "Postman"],
  },
];

const earlyTechMoments = [
  {
    title: "stem fridays",
    detail:
      "went to a stem high school where every friday was for student-led projects—first a raspberry pi game, then a unity vr build.",
    takeaway: "figured out how to share progress, ask better questions, and keep momentum with a tiny team.",
  },
  {
    title: "streetwear storefront",
    detail:
      "teamed up with a friend to launch a clothing line, handled product photos, and learned the quirks of a bigcartel theme.",
    takeaway: "saw how small css tweaks can make people trust you enough to buy.",
  },
  {
    title: "bootcamp leap",
    detail:
      "after hospitality and business classes, i went all-in on a full-time bootcamp and solo study sessions to get back into code.",
    takeaway: "built a habit of shipping weekly projects and documenting the process for others.",
  },
];

const mindsetStatement = "i just want to keep making things that feel welcoming, whether it's a UI, a video, or a full product.";

export default function About() {
  const [activeSection, setActiveSection] = useState(0);
  const [hoveredStack, setHoveredStack] = useState(null);
  const sectionCount = 6;

  return (
    <div className="snap-y snap-mandatory h-full">
      <SnapDots count={sectionCount} activeIndex={activeSection} />

      <FadeSection innerClassName="space-y-6 text-center" sectionId={0} onActivate={setActiveSection}>
        <p className="text-sm uppercase tracking-[0.3em] text-white/50">about me.</p>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
          still that kid figuring things out on a borrowed computer
        </h1>
        <p className="text-white/70 max-w-2xl mx-auto leading-relaxed">
          hospitality work, business classes, and a whole lot of self-teaching shaped how i build. i listen first, stay calm when
          things break, and keep polishing until the experience feels welcoming.
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

      <FadeSection innerClassName="space-y-5" sectionId={1} onActivate={setActiveSection}>
        <section className="card p-6 space-y-4">
          <header className="space-y-2 text-center">
            <h2 className="text-3xl font-semibold text-white tracking-tight">bootcamp & skills in motion</h2>
            <p className="text-white/70 text-sm max-w-2xl mx-auto">
              i left valet shifts behind for a full-time bootcamp, soaking up feedback and late-night labs. that pace stuck with me.
            </p>
          </header>
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
                className={`rounded-lg border border-white/10 bg-white/5 p-4 transition duration-300 ease-out ${
                  hoveredStack
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

      <FadeSection innerClassName="space-y-5" sectionId={2} onActivate={setActiveSection}>
        <section className="card p-6 space-y-5">
          <header className="space-y-2">
            <h2 className="text-3xl font-semibold text-white tracking-tight">creative background</h2>
            <p className="text-white/70 text-sm leading-relaxed">
              computers were my playground. if i could open the app, i’d try to make something with it—films, music, graphics, you name it.
            </p>
          </header>
          <div className="grid gap-4 md:grid-cols-3">
            {creativeHighlights.map(highlight => (
              <article key={highlight.title} className="rounded-lg border border-white/10 bg-white/5 p-4 space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] text-white/45">{highlight.title}</p>
                <p className="text-sm text-white/70 leading-relaxed">{highlight.description}</p>
                <p className="text-xs text-white/50">{highlight.note}</p>
              </article>
            ))}
          </div>
        </section>
      </FadeSection>

      <FadeSection innerClassName="space-y-5" sectionId={3} onActivate={setActiveSection}>
        <section className="card p-6 space-y-4">
          <header className="space-y-2 text-center">
            <h2 className="text-3xl font-semibold text-white tracking-tight">design & tools</h2>
            <p className="text-white/70 text-sm max-w-2xl mx-auto leading-relaxed">
              adobe apps, figma boards, github repos—i’ve bounced between them since i was a kid. the mix keeps me curious and fast.
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
          <header className="space-y-2 text-center">
            <h2 className="text-3xl font-semibold text-white tracking-tight">early tech experience</h2>
            <p className="text-white/70 text-sm max-w-2xl mx-auto leading-relaxed">
              pulling from school projects, side hustles, and a leap into bootcamp—each season kept me close to building things by hand.
            </p>
          </header>
          <ul className="space-y-3 text-sm text-white/75 leading-relaxed">
            {earlyTechMoments.map(entry => (
              <li key={entry.title} className="card bg-white/5 p-4 space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] text-white/45">{entry.title}</p>
                <p className="text-white/80">{entry.detail}</p>
                {entry.takeaway ? (
                  <p className="text-xs text-white/55">lesson: {entry.takeaway}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      </FadeSection>

      <FadeSection innerClassName="space-y-6" sectionId={5} onActivate={setActiveSection}>
        <section className="card p-6 space-y-4 max-w-3xl mx-auto">
          <header className="space-y-2 text-center">
            <h2 className="text-3xl font-semibold text-white tracking-tight">mindset / let’s build something</h2>
            <p className="text-white/60 text-sm leading-relaxed">
              music, film, design, code—it’s all the same itch to make something people feel good using.
            </p>
          </header>
          <blockquote className="border-l-4 border-cyan-400/70 bg-white/5 p-4 text-left">
            <p className="text-lg italic text-white/80">{mindsetStatement}</p>
          </blockquote>
          <p className="text-sm text-white/70 leading-relaxed text-center">
            i’m patient, collaborative, and always down to share what i learn. if we’re building together, i’ll bring curiosity and a calm
            pace that keeps the team moving.
          </p>
        </section>
        <div className="max-w-3xl mx-auto w-full">
          <ContactCard />
        </div>
      </FadeSection>
    </div>
  );
}
