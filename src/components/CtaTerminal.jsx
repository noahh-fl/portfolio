import { useEffect, useRef, useState } from "react";

const DEFAULT_LINES = [
  { prompt: "$", text: "npm run build" },
  { prompt: "$", text: "shipping interactive prototypes" },
  { prompt: "$", text: "collaborating with teams" },
  { prompt: "$", text: "deploying to production" },
];

export default function CtaTerminal({
  lines = DEFAULT_LINES,
  typingSpeed = 45,
  lineDelay = 500,
  className = "",
}) {
  const [renderedLines, setRenderedLines] = useState([]);
  const lineIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const rafRef = useRef(null);
  const lastTimestampRef = useRef(0);

  useEffect(() => {
    setRenderedLines([]);
    lineIndexRef.current = 0;
    charIndexRef.current = 0;
    lastTimestampRef.current = 0;

    const step = timestamp => {
      if (!lastTimestampRef.current) {
        lastTimestampRef.current = timestamp;
      }

      const elapsed = timestamp - lastTimestampRef.current;
      if (elapsed >= typingSpeed) {
        lastTimestampRef.current = timestamp;
        typeNextCharacter();
      }

      rafRef.current = requestAnimationFrame(step);
    };

    const typeNextCharacter = () => {
      const currentLine = lines[lineIndexRef.current];
      if (!currentLine) {
        cancelAnimationFrame(rafRef.current);
        return;
      }

      const nextLength = charIndexRef.current + 1;
      const completeText = currentLine.text.slice(0, nextLength);

      setRenderedLines(prev => {
        const updated = [...prev];
        if (updated[lineIndexRef.current]) {
          updated[lineIndexRef.current] = { ...currentLine, text: completeText };
        } else {
          updated.push({ ...currentLine, text: completeText });
        }
        return updated;
      });

      charIndexRef.current = nextLength;

      if (nextLength > currentLine.text.length) {
        lineIndexRef.current += 1;
        charIndexRef.current = 0;
        lastTimestampRef.current += lineDelay;
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [lines, typingSpeed, lineDelay]);

  return (
    <div className={`cta-terminal ${className}`.trim()}>
      <div className="cta-terminal__header" aria-hidden="true">
        <span className="cta-terminal__dot cta-terminal__dot--red" />
        <span className="cta-terminal__dot cta-terminal__dot--yellow" />
        <span className="cta-terminal__dot cta-terminal__dot--green" />
      </div>
      <div className="cta-terminal__body">
        {renderedLines.map((line, idx) => (
          <div key={idx} className="cta-terminal__line">
            <span className="cta-terminal__prompt">{line.prompt}</span>
            <span className="cta-terminal__text">
              {line.text}
              {idx === renderedLines.length - 1 && line.text.length < (lines[idx]?.text.length ?? 0) ? (
                <span className="cta-type__cursor" aria-hidden="true" />
              ) : null}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
