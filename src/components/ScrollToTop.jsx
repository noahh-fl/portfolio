import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop({ selectors = [] }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    if (selectors.length) {
      selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(node => {
          if (node && typeof node.scrollTo === "function") {
            node.scrollTo({ top: 0, left: 0, behavior: "instant" });
          }
        });
      });
    }
  }, [pathname, selectors]);

  return null;
}
