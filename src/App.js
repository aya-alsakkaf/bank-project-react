import { Outlet } from "react-router-dom";
import "./App.css";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { useEffect, useState } from "react";
import { getToken } from "./api/storage/token";
import { LoggedInUserContext } from "./context/LoggedInUserContext";
import { BalanceContext } from "./context/BalanaceContext";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(false);
  const [userBalance, setUserBalance] = useState(0);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setLoggedInUser(true);
    }
  }, []);

  return (
    <LoggedInUserContext.Provider value={setLoggedInUser}>
      <div className="w-screen min-h-screen">
        <NavBar />
        <BalanceContext.Provider value={[userBalance, setUserBalance]}>
          <Outlet />
        </BalanceContext.Provider>
        <Footer />
      </div>
    </LoggedInUserContext.Provider>
  );
}

export default App;
