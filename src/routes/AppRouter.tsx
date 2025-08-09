import { useEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";

// gsap
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
gsap.registerPlugin(MorphSVGPlugin);

// loader
import OverlayLoader from "../components/ui/OverlayLoader";
import { useLoadingStore } from "../hooks/loadingStore";

// pages
import Home from "../pages/Home";
import About from "../pages/About";
import Service from "../pages/Services";
import NotFoundPage from "../pages/NotFound";
import Faq from "../pages/Faq";

const finalPath =
  "M0.152 0.1 C0.162 0.1 0.17 0.084 0.17 0.064 L0.17 0.036 C0.17 0.016 0.178 0 0.188 0 L0.552 0 C0.562 0 0.57 0.016 0.57 0.036 L0.57 0.064 C0.57 0.084 0.578 0.1 0.588 0.1 L0.982 0.1 C0.992 0.1 1 0.116 1 0.136 L1 0.942 C1 0.974 0.987 1 0.972 1 L0.029 1 C0.013 1 0 0.974 0 0.942 L0 0.136 C0 0.116 0.008 0.1 0.018 0.1 L0.152 0.1 Z";

export default function AppRouter() {
  const isLoading = useLoadingStore((state) => state.isLoading);
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);

  const loaderRef = useRef<SVGSVGElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleLoad = () => setIsLoading(false);
    window.addEventListener("load", handleLoad);
    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("load", handleLoad);
  }, [setIsLoading]);

  useEffect(() => {
    if (!isLoading && loaderRef.current) {
      const circle = loaderRef.current.querySelector("circle");

      gsap.to(circle, {
        duration: 1.5,
        morphSVG: { shape: finalPath },
        scale: 5,
        transformOrigin: "center center",
        ease: "power2.inOut",
        onComplete: () => {
          gsap.to(loaderRef.current.parentElement, {
            opacity: 0,
            duration: 0.6,
            onComplete: () => {
              loaderRef.current.parentElement.style.display = "none";
            },
          });

          // Apparition of content
          gsap.fromTo(
            contentRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
          );
        },
      });
    }
  }, [isLoading]);

  return (
    <>
      {isLoading && <OverlayLoader loaderRef={loaderRef} />}
      <div ref={contentRef} style={{ opacity: 0 }}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
}
