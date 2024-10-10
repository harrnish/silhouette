import "./App.css";
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import Lenis from "lenis";

import Nav from "./components/Nav/Nav";
import Index from "./pages/Index/Index";
import Info from "./pages/Info/Info";

function App() {
  const location = useLocation();

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis();

    // Listen for the scroll event and log the event data
    lenis.on("scroll", (e) => {
      console.log(e);
    });

    // Use requestAnimationFrame to continuously update the scroll
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });

  return (
    <ReactLenis root>
      <div className="app">
        <Nav />
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route index element={<Index />} />
            <Route path="/info" element={<Info />} />
          </Routes>
        </AnimatePresence>
      </div>
    </ReactLenis>
  );
}

export default App;
