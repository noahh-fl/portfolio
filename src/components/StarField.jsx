import { useEffect, useState } from "react";

import meteorAsset from "../assets/meteor.png";

const MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const limitOffset = (value, size) => {
  if (!Number.isFinite(size) || size <= 0) return 0;
  const remainder = value % size;
  return Number.isFinite(remainder) ? remainder : 0;
};

function usePrefersReducedMotion() {
  const [prefers, setPrefers] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia(MOTION_QUERY).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mediaQuery = window.matchMedia(MOTION_QUERY);
    const updatePreference = event => setPrefers(event.matches);

    updatePreference(mediaQuery);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updatePreference);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(updatePreference);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", updatePreference);
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(updatePreference);
      }
    };
  }, []);

  return prefers;
}

export default function StarField({
  speedNear = 0.6,
  speedFar = 0.25,
  tileHeight = 512,
  direction = -1,
  scrollSelector = "[data-scroll-container]",
  smoothing = 0.15,
} = {}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [comets, setComets] = useState([]);

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return () => {};
    }

    const root = document.documentElement;
    let scrollTarget = null;
    let rafId = 0;
    let animatedValue = 0;
    let appliedValue = 0;

    const resolveScrollTarget = () => {
      if (scrollTarget && scrollTarget !== window && scrollTarget.isConnected) {
        return scrollTarget;
      }
      const node = scrollSelector ? document.querySelector(scrollSelector) : null;
      scrollTarget = node || window;
      return scrollTarget;
    };

    const readScrollPosition = () => {
      const target = resolveScrollTarget();
      if (target === window) {
        return window.scrollY || window.pageYOffset || 0;
      }
      return target?.scrollTop || 0;
    };

    const applyOffsets = scrollY => {
      const near = limitOffset(scrollY * speedNear * direction, tileHeight);
      const far = limitOffset(scrollY * speedFar * direction, tileHeight);
      const entityOffset = scrollY * direction;
      root.style.setProperty("--stars-y-1", `${near}px`);
      root.style.setProperty("--stars-y-2", `${far}px`);
      root.style.setProperty("--stars-entity-offset", `${entityOffset}px`);
      appliedValue = scrollY;
    };

    if (prefersReducedMotion) {
      applyOffsets(0);
      return () => {
        root.style.setProperty("--stars-y-1", "0px");
        root.style.setProperty("--stars-y-2", "0px");
        root.style.setProperty("--stars-entity-offset", "0px");
      };
    }

    const damping = Math.min(Math.max(smoothing ?? 0.15, 0.05), 0.35);

    const animate = () => {
      const targetValue = readScrollPosition();
      animatedValue += (targetValue - animatedValue) * damping;
      if (Math.abs(animatedValue - appliedValue) > 0.1) {
        applyOffsets(animatedValue);
      }
      rafId = window.requestAnimationFrame(animate);
    };

    animatedValue = appliedValue = readScrollPosition();
    applyOffsets(animatedValue);
    rafId = window.requestAnimationFrame(animate);

    const handleResize = () => {
      scrollTarget = null;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafId) window.cancelAnimationFrame(rafId);
      root.style.setProperty("--stars-y-1", "0px");
      root.style.setProperty("--stars-y-2", "0px");
      root.style.setProperty("--stars-entity-offset", "0px");
      scrollTarget = null;
    };
  }, [prefersReducedMotion, speedNear, speedFar, tileHeight, direction, scrollSelector, smoothing]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let timers = [];
    let cleanupFns = [];
    let active = true;
    let trailConfig = { enabled: false, type: "none", density: 0, duration: 600 };
    let trailCarry = 0;
    let meteorTrailConfig = { density: 1.6, duration: 720, sizeVariance: 8, spread: 18 };
    let meteorTrailType = "ember";
    const emojiTrailContent = {
      "emoji-sparkle": "✨",
      "emoji-star": "⭐",
      "emoji-heart": "💖",
      "emoji-code": "</>",
    };

    const trailLayer = document.createElement("div");
    trailLayer.className = "cursor-trail-layer";
    document.body.appendChild(trailLayer);

    const scheduleRemoval = (id, duration) => {
      const timeout = window.setTimeout(() => {
        setComets(prev => prev.filter(comet => comet.id !== id));
      }, duration + 400);
      timers.push(timeout);
    };

    const appendTrailParticle = (type, x, y, duration, jitter = 0, sizeJitter = 0, limit = 220) => {
      if (!trailLayer || !type || type === "none") return;
      const particle = document.createElement("span");
      particle.className = `cursor-trail-particle cursor-trail-particle--${type}`;
      const emojiSymbol = emojiTrailContent[type];
      if (emojiSymbol) {
        particle.textContent = emojiSymbol;
        particle.classList.add("cursor-trail-particle--emoji");
        if (type === "emoji-code") {
          particle.classList.add("cursor-trail-particle--emoji-code");
        }
      }
      const jitterX = jitter ? (Math.random() - 0.5) * jitter : 0;
      const jitterY = jitter ? (Math.random() - 0.5) * jitter : 0;
      particle.style.left = `${x + jitterX}px`;
      particle.style.top = `${y + jitterY}px`;
      particle.style.animationDuration = `${duration}ms`;
      if (sizeJitter) {
        particle.style.setProperty("--trail-size-jitter", `${sizeJitter}px`);
      }
      trailLayer.appendChild(particle);
      window.setTimeout(() => particle.remove(), duration + 80);
      while (trailLayer.childElementCount > limit) {
        trailLayer.firstElementChild?.remove();
      }
    };

    const spawnComet = (requestedVariant = null) => {
      if (!active) return;

      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const random = Math.random();
      const variant = requestedVariant ?? (random < 0.4 ? "streak" : random < 0.8 ? "meteor" : "asteroid");
      const viewportWidth = typeof window !== "undefined" ? window.innerWidth || 1 : 1;
      const viewportHeight = typeof window !== "undefined" ? window.innerHeight || 1 : 1;
      const aspectRatio = viewportHeight / viewportWidth;
      const isManual = Boolean(requestedVariant);

      const toUnit = (value, unit) => `${value.toFixed(3)}${unit}`;

      if (variant === "streak") {
        const baseX = isManual ? -18 : -12 + Math.random() * 6;
        const baseY = isManual ? 20 + Math.random() * 60 : 8 + Math.random() * 70;
        const travelX = isManual ? 120 + Math.random() * 15 : 48 + Math.random() * 32;
        const travelY = isManual ? 12 + Math.random() * 22 : 14 + Math.random() * 18;
        const midX = travelX * 0.5 + (Math.random() - 0.5) * 6;
        const midY = travelY * 0.45 + (Math.random() - 0.5) * 4;
        const duration = 2300 + Math.random() * 1800;
        const spin = (Math.random() - 0.5) * 20;
        const trailLength = 12 + Math.random() * 6;
        const thickness = 1 + Math.random() * 1.4;
        const angleDeg = (Math.atan2(travelY * aspectRatio, travelX) * 180) / Math.PI;

        const comet = {
          id,
          variant,
          duration,
          baseX: toUnit(baseX, "vw"),
          baseY: toUnit(baseY, "vh"),
          deltaX: toUnit(travelX, "vw"),
          deltaY: toUnit(travelY, "vh"),
          midX: toUnit(midX, "vw"),
          midY: toUnit(midY, "vh"),
          spin: toUnit(spin, "deg"),
          angle: toUnit(angleDeg, "deg"),
          trailLength: toUnit(trailLength, "vw"),
          thickness: toUnit(thickness, "px"),
        };

        setComets(prev => {
          const trimmed = prev.length > 5 ? prev.slice(1) : prev;
          return [...trimmed, comet];
        });
        scheduleRemoval(id, duration);
        return;
      }

      if (variant === "meteor") {
        const startX = isManual ? -16 + Math.random() * 12 : -18 + Math.random() * 14;
        const startY = isManual ? -8 + Math.random() * 16 : -12 + Math.random() * 26;
        const travelX = isManual ? 148 + Math.random() * 16 : 132 + Math.random() * 28;
        const travelY = isManual ? 62 + Math.random() * 18 : 58 + Math.random() * 28;
        const duration = 4800 + Math.random() * 2800;
        const size = 30 + Math.random() * 28;
        const tilt = (Math.random() - 0.5) * 20;
        const spinDuration = 4.2 + Math.random() * 2.8;

        const startPx = {
          x: (startX / 100) * viewportWidth,
          y: (startY / 100) * viewportHeight,
        };
        const endPx = {
          x: startPx.x + (travelX / 100) * viewportWidth,
          y: startPx.y + (travelY / 100) * viewportHeight,
        };
        const directionVec = (() => {
          const dx = endPx.x - startPx.x;
          const dy = endPx.y - startPx.y;
          const length = Math.hypot(dx, dy) || 1;
          return { x: dx / length, y: dy / length };
        })();

        const comet = {
          id,
          variant,
          duration,
          startX: toUnit(startX, "vw"),
          startY: toUnit(startY, "vh"),
          deltaX: toUnit(travelX, "vw"),
          deltaY: toUnit(travelY, "vh"),
          size: toUnit(size, "px"),
          tilt: toUnit(tilt, "deg"),
          spinDuration: `${spinDuration.toFixed(2)}s`,
        };

        setComets(prev => {
          const trimmed = prev.length > 6 ? prev.slice(1) : prev;
          return [...trimmed, comet];
        });
        scheduleRemoval(id, duration);
        const stopEmitter = createMeteorTrailEmitter({
          id,
          duration,
          initialPoint: startPx,
          initialDirection: directionVec,
        });
        cleanupFns.push(stopEmitter);
        return;
      }

      const baseX = isManual ? 5 + Math.random() * 20 : Math.random() * 100;
      const baseY = isManual ? 20 + Math.random() * 60 : Math.random() * 90;
      const travelX = isManual ? 60 + Math.random() * 24 : (Math.random() - 0.5) * 18;
      const travelY = isManual ? 24 + Math.random() * 30 : 14 + Math.random() * 26;
      const midX = travelX * 0.55 + (Math.random() - 0.5) * 6;
      const midY = travelY * 0.5 + (Math.random() - 0.5) * 6;
      const duration = 9500 + Math.random() * 5500;
      const spinRate = 9 + Math.random() * 6;
      const size = 9 + Math.random() * 7;

      const asteroid = {
        id,
        variant,
        duration,
        baseX: toUnit(baseX, "vw"),
        baseY: toUnit(baseY, "vh"),
        deltaX: toUnit(travelX, "vw"),
        deltaY: toUnit(travelY, "vh"),
        midX: toUnit(midX, "vw"),
        midY: toUnit(midY, "vh"),
        size: toUnit(size, "px"),
        spinRate: `${spinRate.toFixed(2)}s`,
      };

      setComets(prev => {
        const trimmed = prev.length > 6 ? prev.slice(1) : prev;
        return [...trimmed, asteroid];
      });
      scheduleRemoval(id, duration);
    };

    const scheduleNext = () => {
      if (!active) return;
      const delay = 9000 + Math.random() * 14000;
      const timeout = window.setTimeout(() => {
        spawnComet();
        scheduleNext();
      }, delay);
      timers.push(timeout);
    };

    if (prefersReducedMotion) {
      active = false;
      timers.forEach(t => window.clearTimeout(t));
      timers = [];
      setComets([]);
      return () => {};
    }

    const debugListener = event => {
      if (!active) return;
      const requested = event.detail?.variant ?? null;
      spawnComet(requested);
    };

    window.addEventListener("starfield:spawn", debugListener);

    const handleFlashlightToggle = event => {
      const enable = Boolean(event.detail?.enabled);
      const root = document.documentElement;
      if (enable) {
        root.classList.add("debug-flashlight");
      } else {
        root.classList.remove("debug-flashlight");
      }
    };

    const handlePointerMove = event => {
      const root = document.documentElement;
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;
      root.style.setProperty("--cursor-x", `${x}%`);
      root.style.setProperty("--cursor-y", `${y}%`);

      if (trailConfig.enabled) {
        trailCarry += Math.max(0, trailConfig.density);
        let spawnCount = Math.floor(trailCarry);
        trailCarry -= spawnCount;
        if (spawnCount <= 0 && trailConfig.density > 0) {
          spawnCount = 1;
          trailCarry = 0;
        }
        const limit = Math.min(220, 40 + trailConfig.density * 40);
        for (let i = 0; i < spawnCount; i += 1) {
          appendTrailParticle(
            trailConfig.type,
            event.clientX,
            event.clientY,
            trailConfig.duration,
            14,
            trailConfig.type === "pixel" ? 0 : Math.random() * 4,
            limit
          );
        }
      }
    };

    window.addEventListener("starfield:flashlight", handleFlashlightToggle);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    const handleTrailConfig = event => {
      const detail = event.detail ?? {};
      const nextType = detail.type ?? "none";
      meteorTrailType = nextType;
      if (!detail.enabled || !nextType || nextType === "none" || detail.density <= 0) {
        trailConfig = { enabled: false, type: "none", density: 0, duration: 600 };
        trailCarry = 0;
        trailLayer.innerHTML = "";
        return;
      }
      trailConfig = {
        enabled: true,
        type: nextType,
        density: Number(detail.density) || 1,
        duration: Number(detail.duration) || 600,
      };
      trailCarry = 0;
    };

    window.addEventListener("starfield:trail", handleTrailConfig);

    const handleMeteorTrailConfig = event => {
      const detail = event.detail ?? {};
      const rawDensity = Number(detail.density);
      const rawDuration = Number(detail.duration);
      const rawSizeVariance = Number(detail.sizeVariance);
      const rawSpread = Number(detail.spread);
      meteorTrailConfig = {
        density: Number.isFinite(rawDensity) ? Math.max(0, rawDensity) : meteorTrailConfig.density,
        duration: Number.isFinite(rawDuration) ? Math.max(120, rawDuration) : meteorTrailConfig.duration,
        sizeVariance: Number.isFinite(rawSizeVariance) ? Math.max(0, rawSizeVariance) : meteorTrailConfig.sizeVariance,
        spread: Number.isFinite(rawSpread) ? Math.max(0, rawSpread) : meteorTrailConfig.spread,
      };
    };

    window.addEventListener("starfield:meteorTrail", handleMeteorTrailConfig);

    const createMeteorTrailEmitter = ({ id, duration, initialPoint, initialDirection }) => {
      const root = document.documentElement;
      const meteorSelector = `[data-meteor-id="${id}"]`;

      const getOffset = () => {
        const inline = root.style.getPropertyValue("--stars-entity-offset");
        const computed = inline || window.getComputedStyle(root).getPropertyValue("--stars-entity-offset");
        const parsed = parseFloat(computed);
        return Number.isFinite(parsed) ? parsed : 0;
      };

      const getSettings = () => {
        const { density, duration: particleDuration, sizeVariance, spread } = meteorTrailConfig;
        return {
          type: meteorTrailType,
          density: Number.isFinite(Number(density)) ? Number(density) : 0,
          duration: Number.isFinite(Number(particleDuration)) ? Number(particleDuration) : 600,
          sizeVariance: Number.isFinite(Number(sizeVariance)) ? Number(sizeVariance) : 0,
          spread: Number.isFinite(Number(spread)) ? Number(spread) : 0,
        };
      };

      const limitForDensity = density => Math.min(360, 140 + Math.max(0, density) * 80);

      let rafId = 0;
      let carry = 0;
      let lastPoint = {
        x: initialPoint?.x ?? -40,
        y: (initialPoint?.y ?? 0) + getOffset(),
      };
      let lastDirection = initialDirection ?? { x: 0.86, y: 0.52 };
      const startTime = performance.now();

      const emitParticle = (point, direction, settings) => {
        if (!settings) return;
        const { type, duration: particleDuration, spread, sizeVariance, density } = settings;
        if (!type || type === "none" || particleDuration <= 0) return;
        const backwards = 10;
        const spawnX = point.x - direction.x * backwards;
        const spawnY = point.y - direction.y * backwards;
        const jitter = Math.max(0, spread);
        const sizeJitter = Math.max(0, sizeVariance) ? Math.random() * Math.max(0, sizeVariance) : 0;
        appendTrailParticle(type, spawnX, spawnY, particleDuration, jitter, sizeJitter, limitForDensity(density));
      };

      const step = () => {
        if (!active) return;
        const settings = getSettings();
        const meteorEl = document.querySelector(meteorSelector);
        if (!meteorEl) {
          if (performance.now() - startTime < duration + 240) {
            rafId = window.requestAnimationFrame(step);
          }
          return;
        }

        const rect = meteorEl.getBoundingClientRect();
        const currentPoint = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };

        const dx = currentPoint.x - lastPoint.x;
        const dy = currentPoint.y - lastPoint.y;
        const distance = Math.hypot(dx, dy);
        if (distance > 0.2) {
          const dirX = dx / distance;
          const dirY = dy / distance;
          lastDirection = { x: dirX, y: dirY };
          carry += Math.max(0, settings.density) * (distance / 14);
          while (carry >= 1) {
            carry -= 1;
            emitParticle(currentPoint, lastDirection, settings);
          }
        }
        lastPoint = currentPoint;

        if (performance.now() - startTime < duration + 240) {
          rafId = window.requestAnimationFrame(step);
        }
      };

      const initialSettings = getSettings();
      if (initialSettings.type && initialSettings.type !== "none" && initialSettings.density > 0) {
        emitParticle(lastPoint, lastDirection, initialSettings);
      }

      rafId = window.requestAnimationFrame(step);
      return () => window.cancelAnimationFrame(rafId);
    };

    const firstDelay = 4000 + Math.random() * 6000;
    const initialTimeout = window.setTimeout(() => {
      spawnComet();
      scheduleNext();
    }, firstDelay);
    timers.push(initialTimeout);

    return () => {
      active = false;
      timers.forEach(t => window.clearTimeout(t));
      timers = [];
      window.removeEventListener("starfield:spawn", debugListener);
      window.removeEventListener("starfield:flashlight", handleFlashlightToggle);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("starfield:trail", handleTrailConfig);
      window.removeEventListener("starfield:meteorTrail", handleMeteorTrailConfig);
      document.documentElement.classList.remove("debug-flashlight");
      trailLayer.remove();
      cleanupFns.forEach(fn => fn());
      cleanupFns = [];
    };
  }, [prefersReducedMotion]);

  return (
    <>
      <div className="starry-layer starry-layer--2" aria-hidden="true" />
      <div className="starry-layer starry-layer--1" aria-hidden="true" />
      <div className="starry-layer starry-layer--twinkle-a" aria-hidden="true" />
      <div className="starry-layer starry-layer--twinkle-b" aria-hidden="true" />
      <div className="star-entity-layer" aria-hidden="true">
        {comets.map(comet => {
          if (comet.variant === "asteroid") {
            return (
              <span
                key={comet.id}
                aria-hidden="true"
                className="star-asteroid"
                style={{
                  "--base-x": comet.baseX,
                  "--base-y": comet.baseY,
                  "--delta-x": comet.deltaX,
                  "--delta-y": comet.deltaY,
                  "--mid-x": comet.midX,
                  "--mid-y": comet.midY,
                  "--asteroid-duration": `${comet.duration}ms`,
                  "--size": comet.size,
                  "--spin-rate": comet.spinRate,
                }}
              />
            );
          }

          if (comet.variant === "meteor") {
            return (
              <span
                key={comet.id}
                aria-hidden="true"
                className="star-meteor"
                style={{
                  "--start-x": comet.startX,
                  "--start-y": comet.startY,
                  "--delta-x": comet.deltaX,
                  "--delta-y": comet.deltaY,
                  "--meteor-size": comet.size,
                  "--meteor-tilt": comet.tilt,
                  "--meteor-spin-duration": comet.spinDuration,
                  "--meteor-duration": `${comet.duration}ms`,
                }}
                data-meteor-id={comet.id}
              >
                <img src={meteorAsset} alt="" className="star-meteor__sprite" />
              </span>
            );
          }

          return (
            <span
              key={comet.id}
              aria-hidden="true"
              className="star-comet star-comet--streak"
              style={{
                "--base-x": comet.baseX,
                "--base-y": comet.baseY,
                "--delta-x": comet.deltaX,
                "--delta-y": comet.deltaY,
                "--mid-x": comet.midX,
                "--mid-y": comet.midY,
                "--angle": comet.angle,
                "--spin": comet.spin,
                "--comet-duration": `${comet.duration}ms`,
                "--trail-length": comet.trailLength,
                "--thickness": comet.thickness,
              }}
            />
          );
        })}
      </div>
    </>
  );
}
