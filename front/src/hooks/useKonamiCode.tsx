import { useEffect, useRef } from "react";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const isTyping = (target: EventTarget | null) => {
  const el = target as HTMLElement | null;
  if (!el || !el.tagName) return false;
  return (
    el.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName)
  );
};

/**
 * Fires the callback once the Konami code has been typed (↑ ↑ ↓ ↓ ← → ← → B A).
 */
export function useKonamiCode(onUnlock: () => void) {
  const onUnlockRef = useRef(onUnlock);

  useEffect(() => {
    onUnlockRef.current = onUnlock;
  }, [onUnlock]);

  useEffect(() => {
    let progress = 0;

    const onKeyDown = (event: KeyboardEvent) => {
      if (isTyping(event.target)) return;

      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;

      if (key === KONAMI[progress]) {
        progress += 1;
        if (progress === KONAMI.length) {
          progress = 0;
          onUnlockRef.current();
        }
        return;
      }

      progress = key === KONAMI[0] ? 1 : 0;
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
}
