const EMOJIS = ["✨", "🍔", "🍕", "🌈", "💾", "🛸", "⭐️", "💡", "🎉"];

class RainEffectController {
  constructor() {
    this.layer = null;
    this.dropTimer = null;
  }

  ensureLayer() {
    if (typeof document === "undefined") return null;
    if (this.layer) return this.layer;

    const layer = document.createElement("div");
    layer.className = "debug-rain-layer";
    layer.setAttribute("data-debug-overlay", "rain");
    document.body.appendChild(layer);
    this.layer = layer;
    return layer;
  }

  spawnDrop() {
    if (!this.layer) return;
    const drop = document.createElement("span");
    drop.className = "debug-rain-drop";
    drop.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    drop.style.left = `${Math.random() * 100}%`;
    drop.style.fontSize = `${0.85 + Math.random() * 0.75}rem`;
    drop.style.animationDuration = `${3.5 + Math.random() * 2.5}s`;
    drop.style.animationDelay = `${Math.random() * 0.5}s`;
    drop.style.setProperty("--rain-drift", `${Math.random() * 60 - 30}px`);
    this.layer.appendChild(drop);

    const remove = () => drop.remove();
    drop.addEventListener("animationend", remove, { once: true });
  }

  enable() {
    if (this.dropTimer) return;
    const layer = this.ensureLayer();
    if (!layer) return;
    layer.classList.add("debug-rain-layer--active");
    this.dropTimer = setInterval(() => this.spawnDrop(), 320);
  }

  disable() {
    if (this.dropTimer) {
      clearInterval(this.dropTimer);
      this.dropTimer = null;
    }

    if (this.layer) {
      this.layer.classList.remove("debug-rain-layer--active");
      setTimeout(() => {
        if (this.layer) {
          this.layer.querySelectorAll(".debug-rain-drop").forEach(node => node.remove());
          this.layer.remove();
          this.layer = null;
        }
      }, 600);
    }
  }
}

export const rainEffectController = new RainEffectController();

