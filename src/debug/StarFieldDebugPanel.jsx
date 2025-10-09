import { useEffect, useState } from "react";
import {
  setGridOverlay,
  setRainbowMode,
  setLowResMode,
  setInvertMode,
  triggerShake,
  releaseVisualEffects,
  rainEffectController,
  fireConfetti,
  typeSoundController,
  gravityController,
} from "./effects/index.js";

const isDebug = import.meta.env.DEV;

const triggerSpawn = variant => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("starfield:spawn", {
      detail: { variant: variant ?? null },
    })
  );
};

const cursorOptions = [
  { id: "auto", label: "Default", sample: "auto" },
  { id: "crosshair", label: "Crosshair", sample: "crosshair" },
  { id: "pointer", label: "Pointer", sample: "pointer" },
  { id: "cell", label: "Cell", sample: "cell" },
  { id: "not-allowed", label: "Not Allowed", sample: "not-allowed" },
  { id: "grab", label: "Grab", sample: "grab" },
];

const trailOptions = [
  { id: "none", label: "None" },
  { id: "spark", label: "Blue Sparks" },
  { id: "ember", label: "Embers" },
  { id: "pixel", label: "Pixels" },
  { id: "emoji-sparkle", label: "Emoji Sparkles" },
  { id: "emoji-star", label: "Emoji Stars" },
  { id: "emoji-heart", label: "Emoji Hearts" },
  { id: "emoji-code", label: "Emoji </>" },
];

const emojiTrailQuickOptions = [
  { id: "emoji-sparkle", label: "Sparkles", sample: "✨" },
  { id: "emoji-star", label: "Stars", sample: "⭐" },
  { id: "emoji-heart", label: "Hearts", sample: "💖" },
  { id: "emoji-code", label: "Code", sample: "</>" },
];

const buildToggleButtonClass = active =>
  `flex w-full items-center justify-between rounded border px-2.5 py-1 text-[0.72rem] font-semibold transition ${
    active
      ? "border-emerald-400/60 bg-emerald-500/20 text-emerald-100 shadow-[0_0_12px_rgba(16,185,129,0.25)]"
      : "border-white/20 bg-white/5 text-white/70 hover:border-white/30 hover:bg-white/12"
  }`;

const PanelSection = ({ title, description, children }) => (
  <section className="rounded-lg border border-white/20 bg-white/[0.03] p-3">
    <header className="mb-2">
      <h3 className="text-[0.62rem] uppercase tracking-[0.3em] text-white/45">{title}</h3>
      {description ? (
        <p className="mt-1 text-[0.63rem] leading-relaxed text-white/35">{description}</p>
      ) : null}
    </header>
    <div className="flex flex-wrap items-center gap-1.5 text-white/75">{children}</div>
  </section>
);

const EffectToggle = ({ label, active, onToggle }) => (
  <button type="button" className={buildToggleButtonClass(active)} onClick={onToggle}>
    <span>{label}</span>
    <span className="text-[0.6rem] uppercase tracking-[0.28em] opacity-80">{active ? "On" : "Off"}</span>
  </button>
);

export default function StarFieldDebugPanel() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [cursorMenuOpen, setCursorMenuOpen] = useState(false);
  const [trailMenuOpen, setTrailMenuOpen] = useState(false);
  const [meteorMenuOpen, setMeteorMenuOpen] = useState(false);
  const [flashlightMode, setFlashlightMode] = useState(false);
  const [gridOverlayEnabled, setGridOverlayEnabled] = useState(false);
  const [rainbowModeEnabled, setRainbowModeEnabled] = useState(false);
  const [lowResModeEnabled, setLowResModeEnabled] = useState(false);
  const [invertModeEnabled, setInvertModeEnabled] = useState(false);
  const [rainEnabled, setRainEnabled] = useState(false);
  const [typeSoundEnabled, setTypeSoundEnabled] = useState(false);
  const [gravityEnabled, setGravityEnabled] = useState(false);
  const [appliedCursor, setAppliedCursor] = useState("auto");
  const [pendingCursor, setPendingCursor] = useState("auto");
  const trailDefaults = { type: "ember", density: 1.5, duration: 700 };
  const meteorTrailDefaults = { density: 1.6, duration: 720, sizeVariance: 8, spread: 18 };
  const [appliedTrail, setAppliedTrail] = useState(() => ({ ...trailDefaults }));
  const [pendingTrail, setPendingTrail] = useState(() => ({ ...trailDefaults }));
  const [appliedMeteorTrail, setAppliedMeteorTrail] = useState(() => ({ ...meteorTrailDefaults }));
  const [pendingMeteorTrail, setPendingMeteorTrail] = useState(() => ({ ...meteorTrailDefaults }));

  useEffect(() => {
    if (!isDebug) return undefined;

    const root = document.documentElement;
    if (flashlightMode) {
      root.classList.add("debug-flashlight");
    } else {
      root.classList.remove("debug-flashlight");
    }

    window.dispatchEvent(
      new CustomEvent("starfield:flashlight", {
        detail: { enabled: flashlightMode },
      })
    );

    return () => {
      root.classList.remove("debug-flashlight");
      window.dispatchEvent(
        new CustomEvent("starfield:flashlight", {
          detail: { enabled: false },
        })
      );
    };
  }, [flashlightMode]);

  useEffect(() => {
    if (!isDebug) return undefined;

    const root = document.documentElement;
    if (!appliedCursor || appliedCursor === "auto") {
      root.removeAttribute("data-debug-cursor");
      root.style.removeProperty("--debug-cursor");
    } else {
      root.setAttribute("data-debug-cursor", appliedCursor);
      root.style.setProperty("--debug-cursor", appliedCursor);
    }

    return () => {
      root.removeAttribute("data-debug-cursor");
      root.style.removeProperty("--debug-cursor");
    };
  }, [appliedCursor]);

  useEffect(() => {
    if (!cursorMenuOpen) {
      setPendingCursor(appliedCursor);
    }
  }, [cursorMenuOpen, appliedCursor]);

  useEffect(() => {
    if (!trailMenuOpen) {
      setPendingTrail(appliedTrail);
    }
  }, [trailMenuOpen, appliedTrail]);

  useEffect(() => {
    if (!meteorMenuOpen) {
      setPendingMeteorTrail(appliedMeteorTrail);
    }
  }, [meteorMenuOpen, appliedMeteorTrail]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(
      new CustomEvent("starfield:meteorTrail", {
        detail: appliedMeteorTrail,
      })
    );
  }, [appliedMeteorTrail]);

  useEffect(() => {
    if (!isDebug) return undefined;
    setGridOverlay(gridOverlayEnabled);
    return () => {
      if (gridOverlayEnabled) {
        setGridOverlay(false);
      }
    };
  }, [gridOverlayEnabled]);

  useEffect(() => {
    if (!isDebug) return undefined;
    setRainbowMode(rainbowModeEnabled);
    return () => {
      if (rainbowModeEnabled) {
        setRainbowMode(false);
      }
    };
  }, [rainbowModeEnabled]);

  useEffect(() => {
    if (!isDebug) return undefined;
    setLowResMode(lowResModeEnabled);
    return () => {
      if (lowResModeEnabled) {
        setLowResMode(false);
      }
    };
  }, [lowResModeEnabled]);

  useEffect(() => {
    if (!isDebug) return undefined;
    setInvertMode(invertModeEnabled);
    return () => {
      if (invertModeEnabled) {
        setInvertMode(false);
      }
    };
  }, [invertModeEnabled]);

  useEffect(() => {
    if (!isDebug) return undefined;
    if (rainEnabled) {
      rainEffectController.enable();
    } else {
      rainEffectController.disable();
    }
    return () => {
      rainEffectController.disable();
    };
  }, [rainEnabled]);

  useEffect(() => {
    if (!isDebug) return undefined;
    if (typeSoundEnabled) {
      typeSoundController.enable();
    } else {
      typeSoundController.disable();
    }
    return () => {
      typeSoundController.disable();
    };
  }, [typeSoundEnabled]);

  useEffect(() => {
    if (!isDebug) return undefined;
    if (gravityEnabled) {
      gravityController.enable();
    } else {
      gravityController.disable();
    }
    return () => {
      gravityController.disable();
    };
  }, [gravityEnabled]);

  useEffect(() => {
    if (!isDebug) return undefined;
    return () => {
      releaseVisualEffects();
      rainEffectController.disable();
      typeSoundController.release();
      gravityController.release();
    };
  }, []);

  if (!isDebug) return null;

  const dispatchTrailConfig = config => {
    window.dispatchEvent(
      new CustomEvent("starfield:trail", {
        detail: {
          enabled: config.type !== "none" && config.density > 0,
          type: config.type,
          density: config.density,
          duration: config.duration,
        },
      })
    );
  };

  const handleApplyCursor = () => {
    setAppliedCursor(pendingCursor);
    setCursorMenuOpen(false);
  };

  const handleApplyTrail = () => {
    setAppliedTrail(pendingTrail);
    setTrailMenuOpen(false);
    dispatchTrailConfig(pendingTrail);
  };

  const handleQuickTrailSelect = type => {
    setAppliedTrail(prev => {
      const next = { ...prev, type };
      dispatchTrailConfig(next);
      return next;
    });
    setPendingTrail(prev => ({ ...prev, type }));
  };

  const handleApplyMeteorTrail = () => {
    setAppliedMeteorTrail(pendingMeteorTrail);
    setMeteorMenuOpen(false);
  };

  const handleTogglePanel = () => {
    setPanelOpen(prev => !prev);
    if (panelOpen) {
      setCursorMenuOpen(false);
      setTrailMenuOpen(false);
      setPendingCursor(appliedCursor);
      setPendingTrail(appliedTrail);
      setMeteorMenuOpen(false);
      setPendingMeteorTrail(appliedMeteorTrail);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-[60] text-xs text-white/80">
      {!panelOpen ? (
        <button
          type="button"
          className="rounded-full border border-white/20 bg-slate-900/80 px-3 py-2 font-semibold uppercase tracking-[0.32em] text-white/70 shadow-lg backdrop-blur transition hover:bg-slate-900/90"
          data-debug-panel
          onClick={handleTogglePanel}
        >
          Debug
        </button>
      ) : (
        <div
          className="relative w-[320px] max-w-sm rounded-xl border border-white/15 bg-slate-950/85 px-3 py-4 shadow-2xl backdrop-blur"
          data-debug-panel
        >
          <div className="mb-3 flex items-center justify-between gap-4 text-[0.6rem] uppercase tracking-[0.32em] text-white/45">
            <span>Debug Tools</span>
            <button
              type="button"
              className="rounded border border-white/15 bg-white/5 px-2 py-1 text-[0.7rem] font-semibold text-white/65 transition hover:bg-white/10"
              onClick={handleTogglePanel}
            >
              Close
            </button>
          </div>
          <div className="flex flex-col gap-3 text-[0.75rem] text-white/75">
            <PanelSection title="Starfield Entities" description="Summon particles and flip the flashlight shader.">
              <button
                type="button"
                className="rounded border border-white/20 bg-white/10 px-2.5 py-1 font-semibold text-white/85 transition hover:bg-white/20"
                onClick={() => triggerSpawn(null)}
              >
                Random Spawn
              </button>
              <button
                type="button"
                className="rounded border border-cyan-400/40 bg-cyan-500/10 px-2.5 py-1 font-semibold text-cyan-100 transition hover:bg-cyan-500/20"
                onClick={() => triggerSpawn("meteor")}
              >
                Meteor
              </button>
              <button
                type="button"
                className="rounded border border-sky-400/40 bg-sky-500/10 px-2.5 py-1 font-semibold text-sky-100 transition hover:bg-sky-500/20"
                onClick={() => triggerSpawn("streak")}
              >
                Comet
              </button>
              <div className="ml-auto flex items-center gap-2 rounded border border-white/10 bg-white/5 px-2 py-1">
                <span className="text-[0.6rem] uppercase tracking-[0.28em] text-white/45">Flashlight</span>
                <button
                  type="button"
                  onClick={() => setFlashlightMode(prev => !prev)}
                  className={`relative flex h-7 w-12 items-center rounded-full border border-white/20 bg-slate-950/70 px-1 transition-colors duration-200 ease-out ${
                    flashlightMode
                      ? "border-cyan-300/60 bg-cyan-500/20 shadow-[0_0_14px_rgba(129,212,250,0.35)]"
                      : ""
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 rounded-full border border-white/25 transition-all duration-250 ease-out ${
                      flashlightMode
                        ? "translate-x-5 border-cyan-200/70 bg-gradient-to-b from-cyan-200 via-cyan-100 to-cyan-300 shadow-[0_0_12px_rgba(129,212,250,0.6)]"
                        : "translate-x-0 bg-gradient-to-b from-white/85 via-white/70 to-white/60"
                    }`}
                  />
                </button>
              </div>
            </PanelSection>

            <PanelSection title="Pointer & Trails" description="Swap cursors or fine-tune comet and emoji trails.">
              <div className="relative">
                <button
                  type="button"
                  className="rounded border border-indigo-400/40 bg-indigo-500/10 px-2.5 py-1 font-semibold text-indigo-100 transition hover:bg-indigo-500/20"
                  onClick={() => {
                    setTrailMenuOpen(false);
                    setMeteorMenuOpen(false);
                    setCursorMenuOpen(prev => !prev);
                  }}
                >
                  Cursor
                </button>
                {cursorMenuOpen ? (
                  <div className="absolute bottom-full right-0 mb-2 w-48 rounded-lg border border-white/15 bg-slate-950/90 p-3 shadow-xl backdrop-blur">
                    <p className="mb-2 text-[0.65rem] uppercase tracking-[0.28em] text-white/45">Select cursor</p>
                    <div className="flex flex-col gap-1">
                      {cursorOptions.map(option => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setPendingCursor(option.id)}
                          className={`flex items-center justify-between rounded border px-2 py-1 text-sm ${
                            pendingCursor === option.id
                              ? "border-indigo-400/60 bg-indigo-500/20 text-indigo-100"
                              : "border-white/10 bg-white/5 text-white/70 hover:border-white/30"
                          }`}
                          style={{ cursor: option.sample }}
                        >
                          <span>{option.label}</span>
                          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-white/40">{option.sample}</span>
                        </button>
                      ))}
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        className="rounded border border-white/15 bg-white/5 px-2 py-1 text-xs font-semibold text-white/70 transition hover:bg-white/10"
                        onClick={() => {
                          setCursorMenuOpen(false);
                          setPendingCursor(appliedCursor);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="rounded border border-emerald-400/40 bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-100 transition hover:bg-emerald-500/20"
                        onClick={handleApplyCursor}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="relative">
                <button
                  type="button"
                  className="rounded border border-rose-400/40 bg-rose-500/10 px-2.5 py-1 font-semibold text-rose-100 transition hover:bg-rose-500/20"
                  onClick={() => {
                    setCursorMenuOpen(false);
                    setMeteorMenuOpen(false);
                    setTrailMenuOpen(prev => !prev);
                  }}
                >
                  Trail
                </button>
                {trailMenuOpen ? (
                  <div className="absolute bottom-full right-0 mb-2 w-56 rounded-lg border border-white/15 bg-slate-950/95 p-3 shadow-xl backdrop-blur">
                    <p className="mb-2 text-[0.65rem] uppercase tracking-[0.28em] text-white/45">Particle trail</p>
                    <div className="flex flex-col gap-1">
                      {trailOptions.map(option => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setPendingTrail(prev => ({ ...prev, type: option.id }))}
                          className={`flex items-center justify-between rounded border px-2 py-1 text-sm ${
                            pendingTrail.type === option.id
                              ? "border-rose-400/60 bg-rose-500/20 text-rose-100"
                              : "border-white/10 bg-white/5 text-white/70 hover:border-white/30"
                          }`}
                        >
                          <span>{option.label}</span>
                          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-white/40">{option.id}</span>
                        </button>
                      ))}
                    </div>
                    <div className="mt-2 space-y-2">
                      <label className="flex flex-col gap-1 text-[0.7rem] uppercase tracking-[0.18em] text-white/40">
                        Density
                        <input
                          type="range"
                          min="0"
                          max="4"
                          step="0.1"
                          value={pendingTrail.density}
                          onChange={event => setPendingTrail(prev => ({ ...prev, density: Number(event.target.value) }))}
                          className="w-full accent-rose-300"
                        />
                        <span className="text-[0.65rem] text-white/55">{pendingTrail.density.toFixed(1)}</span>
                      </label>
                      <label className="flex flex-col gap-1 text-[0.7rem] uppercase tracking-[0.18em] text-white/40">
                        Duration (ms)
                        <input
                          type="range"
                          min="120"
                          max="2000"
                          step="40"
                          value={pendingTrail.duration}
                          onChange={event => setPendingTrail(prev => ({ ...prev, duration: Number(event.target.value) }))}
                          className="w-full accent-rose-300"
                        />
                        <span className="text-[0.65rem] text-white/55">{pendingTrail.duration}ms</span>
                      </label>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        className="rounded border border-white/15 bg-white/5 px-2 py-1 text-xs font-semibold text-white/70 transition hover:bg-white/10"
                        onClick={() => {
                          setTrailMenuOpen(false);
                          setPendingTrail(appliedTrail);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="rounded border border-emerald-400/40 bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-100 transition hover:bg-emerald-500/20"
                        onClick={handleApplyTrail}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="relative">
                <button
                  type="button"
                  className="rounded border border-orange-400/40 bg-orange-500/10 px-2.5 py-1 font-semibold text-orange-100 transition hover:bg-orange-500/20"
                  onClick={() => {
                    setCursorMenuOpen(false);
                    setTrailMenuOpen(false);
                    setMeteorMenuOpen(prev => !prev);
                  }}
                >
                  Meteor Particles
                </button>
                {meteorMenuOpen ? (
                  <div className="absolute bottom-full right-0 mb-2 w-64 rounded-lg border border-white/15 bg-slate-950/95 p-3 shadow-xl backdrop-blur">
                    <p className="mb-2 text-[0.65rem] uppercase tracking-[0.28em] text-white/45">Meteor trail</p>
                    <div className="space-y-2">
                      <label className="flex flex-col gap-1 text-[0.7rem] uppercase tracking-[0.18em] text-white/40">
                        Density
                        <input
                          type="range"
                          min="0"
                          max="6"
                          step="0.1"
                          value={pendingMeteorTrail.density}
                          onChange={event =>
                            setPendingMeteorTrail(prev => ({ ...prev, density: Number(event.target.value) }))
                          }
                          className="w-full accent-orange-300"
                        />
                        <span className="text-[0.65rem] text-white/55">{pendingMeteorTrail.density.toFixed(2)}</span>
                      </label>
                      <label className="flex flex-col gap-1 text-[0.7rem] uppercase tracking-[0.18em] text-white/40">
                        Duration (ms)
                        <input
                          type="range"
                          min="120"
                          max="2000"
                          step="40"
                          value={pendingMeteorTrail.duration}
                          onChange={event =>
                            setPendingMeteorTrail(prev => ({ ...prev, duration: Number(event.target.value) }))
                          }
                          className="w-full accent-orange-300"
                        />
                        <span className="text-[0.65rem] text-white/55">{pendingMeteorTrail.duration}ms</span>
                      </label>
                      <label className="flex flex-col gap-1 text-[0.7rem] uppercase tracking-[0.18em] text-white/40">
                        Size variance
                        <input
                          type="range"
                          min="0"
                          max="30"
                          step="1"
                          value={pendingMeteorTrail.sizeVariance}
                          onChange={event =>
                            setPendingMeteorTrail(prev => ({ ...prev, sizeVariance: Number(event.target.value) }))
                          }
                          className="w-full accent-orange-300"
                        />
                        <span className="text-[0.65rem] text-white/55">{pendingMeteorTrail.sizeVariance.toFixed(0)}px</span>
                      </label>
                      <label className="flex flex-col gap-1 text-[0.7rem] uppercase tracking-[0.18em] text-white/40">
                        Spread
                        <input
                          type="range"
                          min="0"
                          max="48"
                          step="1"
                          value={pendingMeteorTrail.spread}
                          onChange={event =>
                            setPendingMeteorTrail(prev => ({ ...prev, spread: Number(event.target.value) }))
                          }
                          className="w-full accent-orange-300"
                        />
                        <span className="text-[0.65rem] text-white/55">{pendingMeteorTrail.spread.toFixed(0)}px</span>
                      </label>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        className="rounded border border-white/15 bg-white/5 px-2 py-1 text-xs font-semibold text-white/70 transition hover:bg-white/10"
                        onClick={() => {
                          setMeteorMenuOpen(false);
                          setPendingMeteorTrail(appliedMeteorTrail);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="rounded border border-emerald-400/40 bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-100 transition hover:bg-emerald-500/20"
                        onClick={handleApplyMeteorTrail}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </PanelSection>

            <PanelSection title="Visual FX" description="Layer extra vibe onto the current page.">
              <EffectToggle
                label="Grid Overlay"
                active={gridOverlayEnabled}
                onToggle={() => setGridOverlayEnabled(prev => !prev)}
              />
              <EffectToggle
                label="Rainbow Mode"
                active={rainbowModeEnabled}
                onToggle={() => setRainbowModeEnabled(prev => !prev)}
              />
              <EffectToggle
                label="Low-Res Mode"
                active={lowResModeEnabled}
                onToggle={() => setLowResModeEnabled(prev => !prev)}
              />
              <EffectToggle
                label="Invert Colors"
                active={invertModeEnabled}
                onToggle={() => setInvertModeEnabled(prev => !prev)}
              />
              <EffectToggle
                label="Rain Shower"
                active={rainEnabled}
                onToggle={() => setRainEnabled(prev => !prev)}
              />
            </PanelSection>

            <PanelSection title="Cursor & Input Toys" description="Layer sounds and physics onto interactions.">
              <EffectToggle
                label="Type Sound"
                active={typeSoundEnabled}
                onToggle={() => setTypeSoundEnabled(prev => !prev)}
              />
              <EffectToggle
                label="Gravity Mode"
                active={gravityEnabled}
                onToggle={() => setGravityEnabled(prev => !prev)}
              />
              <div className="mt-2 flex w-full flex-wrap gap-1.5">
                {emojiTrailQuickOptions.map(option => (
                  <button
                    key={option.id}
                    type="button"
                    className={`flex-1 min-w-[46%] rounded border px-2 py-1 text-[0.7rem] font-semibold transition ${
                      appliedTrail.type === option.id
                        ? "border-indigo-400/60 bg-indigo-500/25 text-indigo-100 shadow-[0_0_10px_rgba(129,140,248,0.28)]"
                        : "border-white/20 bg-white/10 text-white/70 hover:border-white/30 hover:bg-white/20"
                    }`}
                    onClick={() => handleQuickTrailSelect(option.id)}
                  >
                    <span className="flex items-center gap-1">
                      <span className="text-base">{option.sample}</span>
                      <span>{option.label}</span>
                    </span>
                  </button>
                ))}
              </div>
            </PanelSection>

            <PanelSection title="Quick Actions" description="Hit these for one-off reactions.">
              <button
                type="button"
                className="flex-1 rounded border border-violet-400/40 bg-violet-500/15 px-2.5 py-1 text-[0.72rem] font-semibold text-violet-100 transition hover:scale-[1.01] hover:bg-violet-500/25"
                onClick={() => triggerShake(900)}
              >
                Shake Page
              </button>
              <button
                type="button"
                className="flex-1 rounded border border-amber-400/40 bg-amber-500/15 px-2.5 py-1 text-[0.72rem] font-semibold text-amber-100 transition hover:scale-[1.01] hover:bg-amber-500/25"
                onClick={() => fireConfetti()}
              >
                Confetti Cannon
              </button>
            </PanelSection>
          </div>
        </div>
      )}
    </div>
  );
}

