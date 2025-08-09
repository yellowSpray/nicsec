import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

// loader
import SpinLoader from "../components/ui/SpinLoader";
import { useLoadingStore } from "../hooks/loadingStore";

// pages
import Home from "../pages/Home";
import About from "../pages/About";
import Service from "../pages/Services";
import NotFoundPage from "../pages/NotFound";
import Faq from "../pages/Faq";

export default function AppRouter() {
  const isLoading = useLoadingStore((state) => state.isLoading);
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
    };
    window.addEventListener("load", handleLoad);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("load", handleLoad);
    };

  }, [setIsLoading]);

  return (
    <>
      {isLoading && <SpinLoader />}
      <Routes>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
