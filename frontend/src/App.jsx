import "./App.css";

import Home from "./components/pages/Home/Home";
import Guide from "./components/pages/Guide/Guide";
import { Route, Link, Routes } from "react-router-dom";
import AboutUs from "./components/pages/About us/AboutUs";
import Create from "./components/pages/Create/Create";
import Modal from "./components/layout/modal/Modal";
import { useState } from "react";

export default function App() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {};
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/create" element={<Create />} />
      </Routes>
      <Modal showModal={showModal ? true : false}></Modal>
    </>
  );
}
