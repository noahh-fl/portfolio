const DATA_KEY = "debugGravityOriginal";

class GravityController {
  constructor() {
    this.enabled = false;
    this.pointerDownHandler = this.handlePointerDown.bind(this);
    this.activeElements = new Set();
  }

  shouldIgnoreTarget(target) {
    if (!target) return true;
    if (target.closest("[data-debug-panel]") || target.closest("[data-debug-ignore-gravity]")) {
      return true;
    }
    return false;
  }

  captureOriginalStyles(node) {
    if (!node || node.dataset[DATA_KEY]) return;
    node.dataset[DATA_KEY] = JSON.stringify({
      transform: node.style.transform || "",
      transition: node.style.transition || "",
    });
  }

  restoreOriginalStyles(node) {
    if (!node?.dataset?.[DATA_KEY]) return;
    const payload = node.dataset[DATA_KEY];
    delete node.dataset[DATA_KEY];
    try {
      const parsed = JSON.parse(payload);
      node.style.transform = parsed.transform || "";
      node.style.transition = parsed.transition || "";
    } catch (error) {
      node.style.transform = "";
      node.style.transition = "";
    }
    node.style.removeProperty("will-change");
    node.classList.remove("debug-gravity-active");
  }

  applyGravity(node) {
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
    const distance = Math.max(0, viewportHeight - rect.bottom - 16);
    const tilt = (Math.random() - 0.5) * 8;

    this.captureOriginalStyles(node);

    node.style.willChange = "transform";
    node.style.transition = "transform 1.1s cubic-bezier(0.2, 0.9, 0.25, 1)";
    node.style.transform = `translate3d(0, ${distance.toFixed(2)}px, 0) rotate(${tilt.toFixed(2)}deg)`;
    node.classList.add("debug-gravity-active");
    this.activeElements.add(node);
  }

  handlePointerDown(event) {
    if (!this.enabled) return;
    if (event.button !== 0) return;
    const target = event.target?.closest("a, button, section, article, div, span, li, ul, ol, header, footer, main, aside, nav, figure, img, canvas, p, h1, h2, h3, h4, h5, h6");
    if (!target || this.shouldIgnoreTarget(target)) return;

    this.applyGravity(target);
  }

  enable() {
    if (this.enabled) return;
    if (typeof document === "undefined") return;
    this.enabled = true;
    document.documentElement.classList.add("debug-gravity-mode");
    document.addEventListener("pointerdown", this.pointerDownHandler, true);
  }

  disable() {
    if (!this.enabled) return;
    if (typeof document === "undefined") return;
    this.enabled = false;
    document.documentElement.classList.remove("debug-gravity-mode");
    document.removeEventListener("pointerdown", this.pointerDownHandler, true);
    this.activeElements.forEach(node => this.restoreOriginalStyles(node));
    this.activeElements.clear();
  }

  release() {
    this.disable();
  }
}

export const gravityController = new GravityController();

