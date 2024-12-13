import { useState } from "react";
import "./App.css";
import Navber from "./components/Navber";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navber />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
