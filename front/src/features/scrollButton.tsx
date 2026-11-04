import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

/**
 * Eased scroll to a vertical position.
 * The duration grows with the distance (short hops stay quick, long ones
 * don't rush), and the animation stops if the user scrolls by hand.
 */
const smoothScrollTo = (targetY: number) => {
  const maxY = document.documentElement.scrollHeight - window.innerHeight;
  const y = Math.max(0, Math.min(targetY, maxY));
  const distance = Math.abs(y - window.scrollY);
  if (distance < 2) return;

  const duration = Math.min(1.6, Math.max(0.6, distance / 1800));
  gsap.to(window, {
    duration,
    ease: "power2.inOut",
    scrollTo: { y, autoKill: true },
    overwrite: true,
  });
};

/** Scrolls down to the contact form in the footer */
export const scrollToSection = () => {
  const footer = document.getElementById("footer");
  if (!footer) return;
  // Align the bottom of the footer with the bottom of the screen
  const bottom = footer.getBoundingClientRect().bottom + window.scrollY;
  smoothScrollTo(bottom - window.innerHeight);
};

export const scrollToId = (id: string, behavior: ScrollBehavior = "smooth") => {
  const target = document.getElementById(id);
  if (!target) return;

  if (behavior !== "smooth") {
    target.scrollIntoView({ block: "start", behavior });
    return;
  }

  // Respect the element's scroll-margin-top (e.g. scroll-mt-8)
  const marginTop = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
  smoothScrollTo(target.getBoundingClientRect().top + window.scrollY - marginTop);
};
