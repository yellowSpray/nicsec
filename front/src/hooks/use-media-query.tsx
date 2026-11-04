import { useState, useEffect } from "react";

export function useMediaQuery(query: string) {
  // Read the real value on first render to avoid a layout flash
  const [ value, setValue ] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches)
    }

    const result = window.matchMedia(query)

    result.addEventListener("change", onChange)

    setValue(result.matches)

    return () => result.removeEventListener("change", onChange)
  }, [query])

  return value;
}
