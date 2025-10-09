function normalizeUrl(src) {
  try {
    const url = new URL(src);
    const fileParam = url.searchParams.get("file");
    if (fileParam) {
      // Leave slashes intact so StackBlitz can resolve the repo file path
      url.searchParams.set("file", fileParam);
    }

    url.searchParams.set("embed", "1");
    url.searchParams.set("view", "both");
    url.searchParams.set("hideNavigation", "1");
    url.searchParams.set("ctl", "1");
    url.searchParams.set("theme", "dark");
    return url.toString();
  } catch (error) {
    console.warn("Invalid sandbox url", error);
    return src;
  }
}

export default function SandboxEmbed({ src, title }) {
  if (!src) return null;
  const normalized = normalizeUrl(src);

  return (
    <div className="space-y-2">
      <div className="text-sm text-white/60">Try it yourself</div>
      <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 shadow-lg bg-neutral-950">
        <iframe
          src={normalized}
          title={title}
          loading="lazy"
          className="h-[36rem] w-full bg-neutral-950"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; clipboard-write"
          allowFullScreen
        />
      </div>
      <p className="text-xs text-white/50">
        Powered by StackBlitz — edit the code in the embed to see changes instantly.
      </p>
    </div>
  );
}
