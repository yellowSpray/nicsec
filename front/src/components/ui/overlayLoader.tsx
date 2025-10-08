import type { RefObject } from "react";
import { Loader2 } from "lucide-react";

interface OverlayLoaderProps {
  OverlayProps: RefObject<HTMLDivElement | null>;
}

export default function OverlayLoader({ OverlayProps }: OverlayLoaderProps) {
  
  return (
    <div 
      ref={OverlayProps} 
      className="fixed inset-0 flex justify-center items-center bg-white z-50"
    >
      <Loader2 className="h-10 w-10 animate-spin text-second" />
    </div>
  );
}
