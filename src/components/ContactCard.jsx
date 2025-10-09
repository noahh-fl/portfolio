export default function ContactCard() {
  return (
    <section className="card w-full space-y-4 p-6 text-left md:space-y-5 md:p-8">
      <header className="space-y-1.5">
        <p className="text-xs uppercase tracking-[0.28em] text-white/45">Open to collaborate</p>
        <h2 className="text-2xl font-semibold text-white">Let's build something</h2>
        <p className="text-white/70 max-w-2xl text-sm leading-relaxed">
          Remote-first collaborator, open to product-minded front-end or full-stack roles.
        </p>
      </header>
      <div className="space-y-2 text-sm text-white/70">
        <p>
          <span className="text-white">Email:</span>{" "}
          <a href="mailto:noahflewellingdev@gmail.com" className="underline-offset-4 hover:underline">
            noahflewellingdev@gmail.com
          </a>
        </p>
        <p>
          <span className="text-white">Location:</span> Tampa, FL • Open to remote
        </p>
        <p>
          <span className="text-white">Rhythm:</span> I love shaping ideas from sketch → prototype → launch.
        </p>
      </div>
      <div className="flex flex-wrap gap-3 pt-1">
        <a className="btn" href="mailto:noahflewellingdev@gmail.com">Start a convo</a>
        <a className="btn" href="https://github.com/noahflewelling" target="_blank" rel="noreferrer">GitHub</a>
        <a className="btn" href="https://www.linkedin.com/in/noahflewelling" target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
    </section>
  );
}
