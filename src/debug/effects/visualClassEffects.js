const ROOT_CLASS_TARGET = () => (typeof document !== "undefined" ? document.documentElement : null);
const BODY_TARGET = () => (typeof document !== "undefined" ? document.body : null);

const overlayNodes = {};

const OVERLAY_CONFIG = {
  grid: {
    className: "debug-grid-overlay-layer",
    create: () => {
      const node = document.createElement("div");
      node.className = "debug-grid-overlay-layer";
      node.setAttribute("data-debug-overlay", "grid");
      return node;
    },
  },
  rainbow: {
    className: "debug-rainbow-overlay",
    create: () => {
      const node = document.createElement("div");
      node.className = "debug-rainbow-overlay";
      node.setAttribute("data-debug-overlay", "rainbow");
      return node;
    },
  },
};

const ensureOverlay = key => {
  if (typeof document === "undefined") return null;
  if (overlayNodes[key]) {
    return overlayNodes[key];
  }

  const config = OVERLAY_CONFIG[key];
  if (!config) return null;

  const node = config.create();
  document.body.appendChild(node);
  overlayNodes[key] = node;
  return node;
};

const destroyOverlay = key => {
  const node = overlayNodes[key];
  if (!node) return;
  if (node.parentElement) {
    node.parentElement.removeChild(node);
  }
  overlayNodes[key] = null;
};

const toggleRootClass = (className, enabled) => {
  const target = ROOT_CLASS_TARGET();
  if (!target) return;
  target.classList.toggle(className, Boolean(enabled));
};

export const setGridOverlay = enabled => {
  if (enabled) {
    ensureOverlay("grid");
  } else {
    destroyOverlay("grid");
  }
};

export const setRainbowMode = enabled => {
  toggleRootClass("debug-rainbow-mode", enabled);
  if (enabled) {
    ensureOverlay("rainbow");
  } else {
    destroyOverlay("rainbow");
  }
};

export const setLowResMode = enabled => {
  toggleRootClass("debug-low-res", enabled);
};

export const setInvertMode = enabled => {
  toggleRootClass("debug-invert", enabled);
};

const SHAKE_CLASS = "debug-shake";
let shakeTimeout;

export const triggerShake = (duration = 700) => {
  const target = BODY_TARGET();
  if (!target) return;

  target.classList.add(SHAKE_CLASS);
  if (shakeTimeout) {
    clearTimeout(shakeTimeout);
  }
  shakeTimeout = setTimeout(() => {
    target.classList.remove(SHAKE_CLASS);
  }, duration);
};

export const releaseVisualEffects = () => {
  setGridOverlay(false);
  setRainbowMode(false);
  setLowResMode(false);
  setInvertMode(false);
  const target = BODY_TARGET();
  if (target) {
    target.classList.remove(SHAKE_CLASS);
  }
};

