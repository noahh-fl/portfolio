import bitefinderThumb from "../assets/bitefinder/screenshots/Bitfinder-thumbnail.png";
import bitefinderDetail from "../assets/bitefinder/screenshots/Detailpage-ss.png";
import bitefinderClip1 from "../assets/bitefinder/videos/clip1.mov";
import bitefinderClip2 from "../assets/bitefinder/videos/clip2.mov";
import bitefinderClip3 from "../assets/bitefinder/videos/clip3.mov";
import swReactSpaThumb from "../assets/mockups/starwars-mockup2.webp";
import swReactSpaSS1 from "../assets/starwars-blog/ss1.png";
import swReactSpaSS2 from "../assets/starwars-blog/ss2.png";
import swReactSpaSS3 from "../assets/starwars-blog/ss3.png";
import swReactSpaDemo from "../assets/starwars-blog/demo.mov";
import javaSlotsThumb from "../assets/javaslots/javaslots-thumbnail.png";
import javaSlotsSS1 from "../assets/javaslots/ss1.png";
import javaSlotsSS2 from "../assets/javaslots/ss2.png";
import javaSlotsSS3 from "../assets/javaslots/ss3.png";
import javaSlotsDemo from "../assets/javaslots/video-demo-jackpot.mov";
import juiceWrldThumb from "../assets/juicewrldAPI/header-ss.png";
import juiceWrldOverview from "../assets/juicewrldAPI/welcomemessage-ss.png";
import juiceWrldAlbums from "../assets/juicewrldAPI/albums-ss.png";
import juiceWrldSongs from "../assets/juicewrldAPI/details-dropdown.png";
import juiceWrldFilters from "../assets/juicewrldAPI/producer-ss.png";
import juiceWrldCollaborators from "../assets/juicewrldAPI/Featuredartists-ss.png";
import juiceWrldEngineers from "../assets/juicewrldAPI/engineers-ss.png";
import juiceWrldAbout from "../assets/juicewrldAPI/about-ss.png";
import swSqlDiagram from "../assets/SW-SQL-ss/diagram.png";
import swSqlSeedRun from "../assets/SW-SQL-ss/runseed-ss.png";
import swSqlTestRun from "../assets/SW-SQL-ss/runtest-ss.png";
import swSqlFavoriteModel from "../assets/SW-SQL-ss/code.ex-ss.png";
import contactListList from "../assets/contactlist-ss/contactlist.exp-ss.png";
import contactListInlineForm from "../assets/contactlist-ss/contact.exp-ss.png";
import contactListDemo from "../assets/contactlist-ss/contactlist-demo.mov";

export const featured = [
  {
    slug: "juicewrld-api",
    title: "Juice WRLD Discography Explorer",
    subtitle: "Type-safe REST API with a React 19 client",
    tech: ["TypeScript", "Express", "React", "Vite", "Tailwind", "npm Workspaces"],
    githubUrl: "https://github.com/noahh-fl/juicewrld-discography",
    liveUrl: "",
    sandboxUrl: "",
    origin: "personal",
    categories: ["personal", "quality"],
    thumbnail: juiceWrldThumb,
    gallery: [juiceWrldOverview, juiceWrldAlbums, juiceWrldSongs, juiceWrldCollaborators, juiceWrldEngineers, juiceWrldAbout],
    media: {
      images: [
        juiceWrldOverview,
        juiceWrldAlbums,
        juiceWrldSongs,
        juiceWrldFilters,
        juiceWrldCollaborators,
        juiceWrldEngineers,
        juiceWrldAbout,
      ],
      videos: [],
    },
    summary:
      "Two-workspace build that exposes a typed Juice WRLD catalogue API and a React experience layering filters, directories, and researcher-friendly metadata.",
    caseStudy: {
      problem:
        "Most discography sites focus on streaming embeds; I wanted a developer-ready API plus a polished client that shares data contracts end-to-end.",
      solution:
        "Modeled canonical track data once, served it through TypeScript Express routes with Swagger-ready docs, and mirrored the shapes in a React 19/Tailwind UI with deep filtering tools.",
      techStack: "TypeScript, Express, React 19, Vite, Tailwind, npm Workspaces",
      role:
        "Solo full-stack engineer shepherding the dataset, API design, React experience, and development ergonomics (proxying, rate limiting, docs).",
      upgrades: [
        "Deploy to a managed host with persistent caching",
        "Wire the API into a live music metadata source",
      ],
    },
  },
  {
    slug: "javaslots",
    title: "JavaSlots — Vanilla JS Slot Machine",
    subtitle: "Stateful reels, layered audio, and QA tooling",
    tech: ["JavaScript", "HTML", "CSS", "Web Audio API"],
    githubUrl: "https://github.com/noahh-fl/javaslots",
    liveUrl: "",
    sandboxUrl: "",
    origin: "personal",
    categories: ["personal", "quality"],
    thumbnail: javaSlotsThumb,
    gallery: [javaSlotsSS1, javaSlotsSS2, javaSlotsSS3],
    media: {
      images: [javaSlotsSS1, javaSlotsSS2, javaSlotsSS3],
      videos: [javaSlotsDemo],
    },
    summary:
      "Polished slot machine that balances bankroll state, animated reels, and responsive UI feedback while keeping the experience arcade-fast.",
    caseStudy: {
      problem:
        "Ship a slot machine that feels like discrete hardware—complete with bankroll management, payouts, and casino-grade feedback—using only the web platform.",
      solution:
        "Built a Vanilla JS state machine for credits, wagers, and paytable outcomes, layered in Web Audio mixing, and exposed QA tools so edge cases are repeatable on demand.",
      techStack: "JavaScript, HTML, CSS, Web Audio API",
      role:
        "Solo engineer: orchestrated reels, audio, HUD interactions, and the debug bias slider so design, engineering, and QA all speak the same language.",
      upgrades: [
        "Persist audio slider preferences locally",
        "Experiment with vibration/haptics for mobile spins",
      ],
    },
  },
  {
    slug: "bitefinder",
    title: "BiteFinder — Group Final (Full-Stack)",
    subtitle: "React front end + Flask API with SQLAlchemy DB",
    tech: ["React", "Vite", "Flask", "SQLAlchemy", "PostgreSQL", "Docker", "Render"],
    githubUrl: "https://github.com/4GeeksAcademy/pt75-group1-final",
    liveUrl: "", // add live demo when deployed
    sandboxUrl: "",
    origin: "school",
    categories: ["school", "quality"],
    thumbnail: bitefinderThumb,
    gallery: [bitefinderThumb, bitefinderDetail],
    media: {
      images: [bitefinderThumb, bitefinderDetail],
      videos: [bitefinderClip1, bitefinderClip2, bitefinderClip3],
    },
    summary: "Full-stack scaffold showing authenticated flows, migrations, and data moving cleanly from DB → API → UI.",
    caseStudy: {
      problem:
        "Our team needed to prove end-to-end capability, not just isolated front-end work, within a two-week capstone sprint.",
      solution:
        "Stood up a React client, Flask API, and SQLAlchemy models with migrations, seed data, auth flow, and Dockerized deployment wiring.",
      techStack: "React, Vite, Flask, SQLAlchemy, PostgreSQL, Docker, Render",
      role:
        "Owned front-end routes and global state, paired on API integration, and handled deployment configuration to keep the team shipping.",
      upgrades: [
        "Add UI + Postman + DB diagram screenshots",
        "Polish seed data and document one-click deploy flow"
      ],
    },
  },
  {
    slug: "sw-data-model",
    title: "Star Wars Data Model (SQLAlchemy)",
    subtitle: "Relational backend with automated ER diagram & seed tooling",
    tech: ["Python 3.13", "SQLAlchemy ORM", "Pipenv", "SQLite", "Pytest"],
    githubUrl: "https://github.com/4GeeksAcademy/starwars-data-modeling-noahh-fl",
    liveUrl: "",
    sandboxUrl: "",
    origin: "school",
    categories: ["school", "quality"],
    thumbnail: swSqlDiagram,
    gallery: [swSqlDiagram, swSqlSeedRun, swSqlTestRun, swSqlFavoriteModel],
    summary:
      "Backend for a Star Wars editorial hub showcasing a normalized SQLAlchemy schema, automated ER diagrams, and guardrail scripts for seeding and testing.",
    caseStudy: {
      problem:
        "Translate the Star Wars editorial concept into a relational backend that balances canonical lore with editor-friendly content workflows.",
      solution:
        "Modeled users, content, and favorites with SQLAlchemy, enforced data integrity through constraints, and wrapped it all in Pipenv tasks for diagramming, seeding, and pytest validation.",
      techStack: "Python 3.13, SQLAlchemy ORM, Pipenv, SQLite, Pytest",
      role:
        "Solo schema designer — authored models, constraints, seed/test automation, and ER diagram tooling.",
      upgrades: [
        "Expand seed fixtures with editor personas and feature timelines",
        "Introduce Alembic migrations and reference API layer stubs"
      ],
    },
  },
  {
    slug: "sw-react-spa",
    title: "Star Wars Atlas (React SPA)",
    subtitle: "Context-driven SWAPI explorer with curated media",
    tech: ["React", "Context API", "Bootstrap", "Tailwind", "Webpack", "Flux pattern"],
    githubUrl: "https://github.com/4GeeksAcademy/star-wars-noahh-fl/tree/master",
    liveUrl: "",
    sandboxUrl: "https://stackblitz.com/github/4GeeksAcademy/star-wars-noahh-fl?file=src/views/home.js",
    origin: "school",
    categories: ["school", "quality"],
    thumbnail: swReactSpaSS1,
    gallery: [swReactSpaSS1, swReactSpaSS2, swReactSpaSS3],
    media: {
      images: [swReactSpaSS1, swReactSpaSS2, swReactSpaSS3],
      videos: [swReactSpaDemo],
    },
    summary:
      "React 18 atlas that layers SWAPI data, curated imagery, and a favorites system across carousels, modal grids, and dossier-style detail pages.",
    caseStudy: {
      problem:
        "Turn raw SWAPI responses into a portfolio-ready experience with art direction, discoverability, and resilient loading states.",
      solution:
        "Designed a Flux-style store that preloads characters, planets, and vehicles, hydrates linked resources on demand, and feeds glassmorphism cards, carousels, and favorites overlays.",
      techStack: "React 18, Context + Flux, React Router 6, Bootstrap 5, Tailwind CDN, Webpack",
      role:
        "Solo front-end engineer shaping data orchestration, component design, and UX polish from bootcamp starter to finished atlas.",
      upgrades: [
        "Swap mock fallbacks for a hosted caching layer",
        "Expand collaborator notes with film timelines",
      ],
    },
  },
  {
    slug: "photo-feed-bootstrap",
    title: "Photo Feed UI (Bootstrap)",
    subtitle: "Responsive social feed layout with modal posting",
    tech: ["HTML", "CSS", "Bootstrap"],
    githubUrl: "https://github.com/4GeeksAcademy/nooah-photo-feed-bootstrap",
    liveUrl: "",
    sandboxUrl: "https://stackblitz.com/github/4GeeksAcademy/nooah-photo-feed-bootstrap?file=index.html",
    origin: "school",
    categories: ["school"],
    gallery: [
      "https://placehold.co/1280x720/0f172a/ffffff?text=Feed+Desktop",
      "https://placehold.co/600x900/020617/ffffff?text=Feed+Mobile",
    ],
    summary: "Pixel-polished UI build that proves comfort with layout systems, alignment, and component theming.",
    caseStudy: {
      problem:
        "Recreate a social-style feed that stayed consistent across screen sizes while showcasing clean card design and interactions.",
      solution:
        "Leveraged Bootstrap's grid utilities with custom CSS tweaks for spacing, built card variations, and wired a modal form demo for posting.",
      techStack: "HTML, CSS, Bootstrap",
      role:
        "Solo UI engineer — focused on responsive spacing, component reuse, and hover/active feedback.",
      upgrades: [
        "Record a short GIF of posting flow",
        "Highlight responsive breakpoints in README"
      ],
    },
  },
  {
    slug: "contact-list",
    title: "Contact List CRUD",
    subtitle: "React SPA with inline CRUD over a shared directory",
    tech: ["React 18", "React Router 6", "Context API", "Flux pattern", "Bootstrap 5", "Webpack"],
    githubUrl: "https://github.com/4GeeksAcademy/noahh-fl-contact-list",
    liveUrl: "",
    sandboxUrl: "https://stackblitz.com/github/4GeeksAcademy/noahh-fl-contact-list?file=src/App.jsx",
    origin: "school",
    categories: ["school", "quality"],
    thumbnail: contactListInlineForm,
    gallery: [contactListInlineForm, contactListList],
    media: {
      images: [contactListList, contactListInlineForm],
      videos: [contactListDemo],
    },
    summary:
      "React 18 single-page app stewarding a shared contact list with inline form editing, routed detail views, and a Flux-style global store.",
    caseStudy: {
      problem:
        "Deliver a school assignment that proved I can orchestrate full CRUD flows, data validation, and component communication inside a modern React experience.",
      solution:
        "Structured a Context-powered store (flux.js) that feeds list and detail routes, built an inline form that swaps between create/update states with validation, and wired Webpack scripts for dev/production parity.",
      techStack: "React 18, React Router 6, Context + Flux store, Bootstrap 5, Webpack",
      role: "Solo developer — owned global store design, CRUD actions, routing, and build ergonomics.",
      upgrades: [
        "Persist contacts to Supabase or localStorage so refreshes keep the roster",
        "Add Cypress smoke tests covering add/edit/delete flows"
      ],
    },
  },
];

export const minis = [
  {
    slug: "landing-page",
    title: "Landing Page",
    tech: ["HTML", "CSS"],
    githubUrl: "https://github.com/4GeeksAcademy/noahh-fl-lading-page",
    sandboxUrl: "https://stackblitz.com/github/4GeeksAcademy/noahh-fl-lading-page?file=index.html",
    summary: "Simple responsive marketing page built with semantic HTML & flexbox.",
  },
  {
    slug: "counter",
    title: "Counter App",
    tech: ["React"],
    githubUrl: "https://github.com/4GeeksAcademy/noahh-fl-counter",
    sandboxUrl: "https://stackblitz.com/github/4GeeksAcademy/noahh-fl-counter?file=src/App.jsx",
    summary: "Interactive counter that explores React hooks and component state.",
  },
  {
    slug: "traffic-light",
    title: "Traffic Light",
    tech: ["React"],
    githubUrl: "https://github.com/4GeeksAcademy/noahh-fl-trafficlight",
    sandboxUrl: "https://stackblitz.com/github/4GeeksAcademy/noahh-fl-trafficlight?file=src/js/component/trafficlight.js",
    summary: "Dynamic stoplight toggle with timed state changes and keyboard support.",
  },
];
