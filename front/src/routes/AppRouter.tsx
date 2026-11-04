import { Route, Routes } from "react-router-dom";
import type { RefObject } from "react";
import { useScrollToHash } from "../hooks/useScrollToHash";
import { PAGE_CONTENT_ID } from "../features/pageTransition";

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
  useScrollToHash();

  return (
    <div ref={ContentProps} id={PAGE_CONTENT_ID} className="w-full">
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
