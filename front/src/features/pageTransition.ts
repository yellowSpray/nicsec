import gsap from "gsap";

/** id of the wrapper around the routed pages (see AppRouter) */
export const PAGE_CONTENT_ID = "page-content";

let pendingReveal = false;
let veil: HTMLDivElement | null = null;

/**
 * Full-screen veil in the page background colour.
 * Fading the whole viewport (header + content + footer) at once feels
 * more natural than fading only part of the page.
 */
function getVeil() {
  if (veil && document.body.contains(veil)) return veil;

  veil = document.createElement("div");
  veil.setAttribute("aria-hidden", "true");
  Object.assign(veil.style, {
    position: "fixed",
    inset: "0",
    background: "#ffffff",
    opacity: "0",
    pointerEvents: "none",
    zIndex: "9999",
  });
  document.body.appendChild(veil);
  return veil;
}

/**
 * Covers the page with the veil, then navigates.
 * The veil is removed by revealPage (called from useScrollToHash)
 * once the new page is rendered and positioned.
 */
export function fadeOutAndNavigate(navigate: (to: string) => void, to: string) {
  const el = getVeil();
  pendingReveal = true;

  gsap.killTweensOf(el);
  el.style.pointerEvents = "auto"; // block clicks during the transition
  gsap.to(el, {
    opacity: 1,
    duration: 0.3,
    ease: "sine.inOut",
    onComplete: () => navigate(to),
  });
}

/** Returns true (once) if the page is covered and waiting to be revealed */
export function consumePendingReveal() {
  const pending = pendingReveal;
  pendingReveal = false;
  return pending;
}

export function revealPage() {
  const el = getVeil();

  gsap.killTweensOf(el);
  gsap.to(el, {
    opacity: 0,
    duration: 0.45,
    delay: 0.05,
    ease: "sine.inOut",
    onComplete: () => {
      el.style.pointerEvents = "none";
    },
  });
}
