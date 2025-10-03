import { Route, Routes } from "react-router-dom";
import type { RefObject } from "react";

// pages
import Home from "../components/pages/Home";
import About from "../components/pages/About";
import Service from "../components/pages/Services";
import NotFoundPage from "../components/pages/NotFound";
import Faq from "../components/pages/Faq";

interface ContentProps {
  ContentProps: RefObject<HTMLDivElement | null>;
}

export default function AppRouter({ ContentProps }: ContentProps) {
  return (
    <div ref={ContentProps} className="w-full">
      <Routes>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
