import { useEffect, useRef } from "react";
import "./styles/App.css";

import Footer from "./components/common/Footer.tsx";
import Header from "./components/common/Header.tsx";
import AppRouter from "./routes/AppRouter.tsx";
import OverlayLoader from "./components/ui/overlayLoader.tsx";

import { useLoadingStore } from "./hooks/loadingStore";
import gsap from "gsap";
import { Toaster } from "sonner";

function App() {
  // Zustand store for loading state
  // This will be used to manage the loading state across the application
  const isLoading = useLoadingStore((state) => state.isLoading);
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);

  // Refs for header, content, and overlay
  // These refs will be used for animations and managing the DOM elements
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Set loading state to true when the component mounts
  useEffect(() => {
    const handleLoad = () => setIsLoading(false);
    window.addEventListener("load", handleLoad);
    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("load", handleLoad);
  }, [setIsLoading]);

  useEffect(() => {
    if (!isLoading) {
      const tl = gsap.timeline();

      // Fade-out of loader
      tl.to(
        overlayRef.current, {
        opacity: 0,
        duration: 0.1,
        ease: "power2.out",
        onComplete: () => {
          if (overlayRef.current) {
            overlayRef.current.style.display = "none";
          }
        },
      });

      // Fade-in of content
      tl.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" },
        ">"
      );

      // Fade-in of header
      tl.fromTo(
        headerRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" },
        "<"
      );
    }
  }, [isLoading]);


  return (
    <>
      {isLoading && (
        <OverlayLoader OverlayProps={overlayRef} />
      )}
      <Toaster richColors expand={true} position="top-center"/>
      <Header HeaderProps={headerRef} />
      <AppRouter ContentProps={contentRef} />
      <Footer />
    </>
  );
}

export default App;
