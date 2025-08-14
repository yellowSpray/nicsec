import type { RefObject } from "react";
import { Loader2 } from "lucide-react";

interface OverlayLoaderProps {
  OverlayProps: RefObject<HTMLDivElement | null>;
}

export default function OverlayLoader({ OverlayProps }: OverlayLoaderProps) {
  
  return (
    <div ref={OverlayProps} className="flex justify-center items-center h-dvh w-[90dvw] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-50">
      <Loader2 className="h-10 w-10 animate-spin text-second" />
    </div>
  );
}
