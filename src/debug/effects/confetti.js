const COLORS = ["#FDE047", "#60A5FA", "#F97316", "#22D3EE", "#F472B6", "#A855F7", "#34D399"];

export const fireConfetti = (count = 140) => {
  if (typeof document === "undefined") return;

  const container = document.createElement("div");
  container.className = "debug-confetti-layer";
  container.setAttribute("data-debug-overlay", "confetti");
  document.body.appendChild(container);

  for (let index = 0; index < count; index += 1) {
    const piece = document.createElement("span");
    piece.className = "debug-confetti-piece";
    piece.style.backgroundColor = COLORS[index % COLORS.length];
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.width = `${6 + Math.random() * 8}px`;
    piece.style.height = `${10 + Math.random() * 14}px`;
    piece.style.animationDelay = `${Math.random() * 0.25}s`;
    piece.style.animationDuration = `${1.2 + Math.random() * 0.8}s`;
    piece.style.setProperty("--confetti-rotation", `${Math.random() * 720 - 360}deg`);
    piece.style.setProperty("--confetti-drift", `${Math.random() * 120 - 60}px`);
    container.appendChild(piece);

    piece.addEventListener(
      "animationend",
      () => {
        piece.remove();
      },
      { once: true }
    );
  }

  setTimeout(() => {
    container.remove();
  }, 2400);
};

