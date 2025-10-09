import { useEffect, useRef, useState } from "react";

export default function CtaTypingText({ text, speed = 50, delay = 600 }) {
  const [displayed, setDisplayed] = useState("");
  const timeoutRef = useRef(null);

  useEffect(() => {
    let index = 0;

    const typeNext = () => {
      setDisplayed(text.slice(0, index));
      if (index <= text.length) {
        timeoutRef.current = setTimeout(typeNext, speed);
        index += 1;
      }
    };

    timeoutRef.current = setTimeout(typeNext, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, speed, delay]);

  return (
    <span className="cta-type">
      {displayed}
      <span className="cta-type__cursor" aria-hidden="true" />
    </span>
  );
}
