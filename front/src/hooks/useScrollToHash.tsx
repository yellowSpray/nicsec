import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLoadingStore } from "./loadingStore";
import { scrollToId } from "../features/scrollButton";
import { consumePendingReveal, revealPage } from "../features/pageTransition";

/**
 * After a route change:
 * - jumps to the element matching the URL hash (e.g. /service#methode)
 * - reveals the page if it was covered by fadeOutAndNavigate
 */
export function useScrollToHash() {
  const { pathname, hash } = useLocation();
  const isLoading = useLoadingStore((state) => state.isLoading);

  useEffect(() => {
    // The initial loader handles the first appearance of the page
    if (isLoading) return;

    const frame = requestAnimationFrame(() => {
      const shouldReveal = consumePendingReveal();

      // Instant jump: the movement is hidden by the veil
      if (hash) {
        scrollToId(decodeURIComponent(hash.slice(1)), "instant");
      } else if (shouldReveal) {
        window.scrollTo({ top: 0, behavior: "instant" });
      }

      if (shouldReveal) revealPage();
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, isLoading]);
}
