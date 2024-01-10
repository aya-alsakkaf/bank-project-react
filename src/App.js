import { Outlet } from "react-router-dom";
import "./App.css";
import { NavBar } from "./components/NavBar";
import { Login } from "./pages/Login";
import { Footer } from "./components/Footer";
import { useEffect } from "react";

function App() {
  return (
    <div className="w-screen h-screen">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
