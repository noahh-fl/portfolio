export default function ContactCard() {
  return (
    <section className="card w-full space-y-4 p-6 text-left md:space-y-5 md:p-8">
      <header className="space-y-1.5">
        <p className="text-xs uppercase tracking-[0.28em] text-white/45">open to collaborate</p>
        <h2 className="text-2xl font-semibold text-white">let's build something</h2>
        <p className="text-white/70 max-w-2xl text-sm leading-relaxed">
          Remote-friendly front-end developer who enjoys pairing on thoughtful UI and steady product polish.
        </p>
      </header>
      <div className="space-y-2 text-sm text-white/70">
        <p>
          <span className="text-white">Email:</span>{" "}
          <a href="mailto:18nflewelling@gmail.com" className="underline-offset-4 hover:underline">
            18nflewelling@gmail.com
          </a>
        </p>
        <p>
          <span className="text-white">Location:</span> Arcata, California (remote preferred)
        </p>
        <p>
          <span className="text-white">Rhythm:</span> steady, communicative, and focused on simple, reliable delivery.
        </p>
      </div>
      <div className="flex flex-wrap gap-3 pt-1">
        <a className="btn" href="mailto:18nflewelling@gmail.com">Start a convo</a>
        <a className="btn" href="https://github.com/noahh-fl" target="_blank" rel="noreferrer">GitHub</a>
        <a className="btn" href="https://www.linkedin.com/in/noahflewelling" target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
    </section>
  );
}
