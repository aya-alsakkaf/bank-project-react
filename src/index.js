import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./tailwind.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { NavBar } from "./components/NavBar";
import { Transactions } from "./pages/Transactions";
import { Users } from "./pages/Users";
import { Profile } from "./pages/Profile";
import ROUTER from "./navigation";

const router = createBrowserRouter([
  {
    path: ROUTER.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTER.REGISTER,
    element: <Register />,
  },
  {
    path: ROUTER.HOME,
    element: <App />,
    children: [
      {
        path: ROUTER.HOME,
        element: <Home />,
      },
      {
        path: ROUTER.TRANSACTIONS,
        element: <Transactions />,
      },
      {
        path: ROUTER.USERS,
        element: <Users />,
      },
      {
        path: ROUTER.PROFILE,
        element: <Profile />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>

    <RouterProvider router={router} />
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
