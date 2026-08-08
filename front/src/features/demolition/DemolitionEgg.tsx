import { useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import { useKonamiCode } from "@/hooks/useKonamiCode";
import { startDemolition } from "./demolitionGame";

/**
 * Easter egg: type the Konami code (↑ ↑ ↓ ↓ ← → ← → B A) and a tiny pixel
 * detective drops on the page to tear it down, brick by brick. ESC rebuilds it.
 */
export default function DemolitionEgg() {
  const { t } = useTranslation();
  const stopRef = useRef<(() => void) | null>(null);

  const unlock = useCallback(() => {
    if (stopRef.current) return;

    stopRef.current = startDemolition(
      {
        jump: t("easterEgg.jump"),
        smash: t("easterEgg.smash"),
        quit: t("easterEgg.quit"),
      },
      () => {
        stopRef.current = null;
      }
    );
  }, [t]);

  useKonamiCode(unlock);

  useEffect(() => {
    return () => {
      stopRef.current?.();
      stopRef.current = null;
    };
  }, []);

  return null;
}
