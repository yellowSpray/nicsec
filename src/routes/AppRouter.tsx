import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Service from "../pages/Services";
import NotFoundPage from "../pages/NotFound";
import Faq from "../pages/Faq";

export default function AppRouter() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/service" element={<Service />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
