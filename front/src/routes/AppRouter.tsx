import { Navigate, Route, Routes } from "react-router-dom";
import type { RefObject } from "react";
import { useScrollToHash } from "../hooks/useScrollToHash";
import { PAGE_CONTENT_ID } from "../features/pageTransition";

// pages
import Home from "../components/pages/Home";
import About from "../components/pages/About";
import Service from "../components/pages/Services";
import NotFoundPage from "../components/pages/NotFound";
import Faq from "../components/pages/Faq";
import LegalPage from "../components/pages/LegalPage";

interface ContentProps {
  ContentProps: RefObject<HTMLDivElement | null>;
}

export default function AppRouter({ ContentProps }: ContentProps) {
  useScrollToHash();

  return (
    <div ref={ContentProps} id={PAGE_CONTENT_ID} className="w-full">
      <Routes>
        <Route index element={<Home />} />
        <Route path="/cabinet" element={<About />} />
        {/* Old address kept for existing links */}
        <Route path="/about" element={<Navigate to="/cabinet" replace />} />
        <Route path="/service" element={<Service />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/mentions-legales" element={<LegalPage key="notice" page="notice" />} />
        <Route path="/vie-privee" element={<LegalPage key="privacy" page="privacy" />} />
        <Route path="/cookies" element={<LegalPage key="cookies" page="cookies" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
