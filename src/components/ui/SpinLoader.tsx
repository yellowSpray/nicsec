import { Loader2 } from "lucide-react";

export default function spinLoader() {
  return (
    <div className="flex justify-center items-center h-screen w-screen absolute top-0 left-0 bg-white z-50">
      <Loader2 className="h-10 w-10 animate-spin text-second" />
    </div>
  );
}
