import "./App.css";

import Home from "./components/pages/Home/Home";
import Guide from "./components/pages/Guide/Guide";
import { Route, Link, Routes, Router, Navigate } from "react-router-dom";
import AboutUs from "./components/pages/About us/AboutUs";
import Create from "./components/pages/Create/Create";
import Modal from "./components/layout/modal/Modal";
import { useState } from "react";
import Gallery from "./components/pages/Gallery/Gallery";
import { GalleriesProvider } from "./Context/GalleriesContext";
import { ModalProvider } from "./Context/ModalContext";

export default function App() {
  return (
    <ModalProvider>
      <GalleriesProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/create" element={<Create />} />
          <Route path="/gallery" element={<Navigate to="/" />} />
          <Route path="/gallery/:id" element={<Gallery />} />
        </Routes>
      </GalleriesProvider>
      //{" "}
    </ModalProvider>
  );
}
