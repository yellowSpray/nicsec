import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useLoadingStore } from "./loadingStore";
import { scrollToId } from "../features/scrollButton";
import { consumePendingReveal, revealPage } from "../features/pageTransition";

/**
 * After a route change:
 * - jumps to the element matching the URL hash (e.g. /service#methode)
 * - otherwise starts the new page at the top (the browser keeps the old scroll position in a SPA)
 * - reveals the page if it was covered by fadeOutAndNavigate
 */
export function useScrollToHash() {
  const { pathname, hash } = useLocation();
  const isLoading = useLoadingStore((state) => state.isLoading);
  const lastPathname = useRef<string | null>(null);

  useEffect(() => {
    // The initial loader handles the first appearance of the page
    if (isLoading) return;

    const pathChanged = lastPathname.current !== null && lastPathname.current !== pathname;
    lastPathname.current = pathname;

    const frame = requestAnimationFrame(() => {
      const shouldReveal = consumePendingReveal();

      // Instant jumps: either hidden by the veil, or a fresh page
      if (hash) {
        scrollToId(decodeURIComponent(hash.slice(1)), "instant");
      } else if (shouldReveal || pathChanged) {
        window.scrollTo({ top: 0, behavior: "instant" });
      }

      if (shouldReveal) revealPage();
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, isLoading]);
}
