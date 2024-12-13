import { useState } from "react";
import "./App.css";
import Navber from "./components/Navber";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <Navber />
      <ToastContainer />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
