import "./App.css";
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ReactLenis } from "@studio-freight/react-lenis";

import Nav from "./components/Nav/Nav";
import Index from "./pages/Index/Index";
import Info from "./pages/Info/Info";

function App() {
  const location = useLocation();

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
