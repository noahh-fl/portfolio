class TypeSoundController {
  constructor() {
    this.enabled = false;
    this.audioContext = null;
    this.listener = this.handleKeydown.bind(this);
    this.lastTrigger = 0;
  }

  ensureContext() {
    if (typeof window === "undefined") return null;
    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextCtor) return null;
    if (!this.audioContext) {
      this.audioContext = new AudioContextCtor();
    }
    if (this.audioContext.state === "suspended") {
      this.audioContext.resume().catch(() => {});
    }
    return this.audioContext;
  }

  handleKeydown(event) {
    if (!this.enabled) return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    if (event.repeat) return;
    if (event.key.length > 1 && event.key !== "Backspace" && event.key !== "Enter" && event.key !== "Tab") {
      return;
    }
    const now = performance.now();
    if (now - this.lastTrigger < 35) {
      return;
    }
    this.lastTrigger = now;
    this.playClick();
  }

  playClick() {
    const context = this.ensureContext();
    if (!context) return;

    const now = context.currentTime;
    const osc = context.createOscillator();
    const gain = context.createGain();
    const filter = context.createBiquadFilter();

    const baseFrequency = 240 + Math.random() * 220;
    const detune = (Math.random() - 0.5) * 60;

    osc.type = "square";
    osc.frequency.setValueAtTime(baseFrequency, now);
    osc.detune.setValueAtTime(detune, now);

    filter.type = "highpass";
    filter.frequency.setValueAtTime(420 + Math.random() * 280, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08 + Math.random() * 0.03);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(context.destination);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  enable() {
    if (this.enabled) return;
    if (typeof document === "undefined") return;
    this.enabled = true;
    this.ensureContext();
    document.addEventListener("keydown", this.listener, true);
  }

  disable() {
    if (!this.enabled) return;
    if (typeof document === "undefined") return;
    this.enabled = false;
    document.removeEventListener("keydown", this.listener, true);
  }

  release() {
    this.disable();
    if (this.audioContext) {
      try {
        if (this.audioContext.state !== "closed") {
          this.audioContext.close();
        }
      } catch (error) {
        // ignore close errors
      }
      this.audioContext = null;
    }
  }
}

export const typeSoundController = new TypeSoundController();

