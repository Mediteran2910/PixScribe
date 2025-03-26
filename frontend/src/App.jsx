import "./App.css";
import Header from "./components/layout/header/Header";
import Home from "./components/pages/Home/Home";
import Guide from "./components/pages/Guide/Guide";
import { Route, Link, Routes } from "react-router-dom";
import AboutUs from "./components/pages/About us/AboutUs";
import Create from "./components/pages/Create/Create";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </>
  );
}
