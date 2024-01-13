import React, { useContext } from "react";
import { LogoNav } from "../components/LogoNav";
import { Link, NavLink } from "react-router-dom";
import ROUTER from "../navigation";
import { logout } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { LoggedInUserContext } from "../context/LoggedInUserContext";
import { act } from "react-dom/test-utils";

export const NavBar = () => {
  const navigate = useNavigate();
  const setLoggedInUser = useContext(LoggedInUserContext);
  const activeLink = "bg-green-500 text-white hover:bg-green-500";
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li className="mx-2">
              <NavLink
                className={({ isActive }) => (isActive ? activeLink : "")}
                to={ROUTER.HOME}
              >
                {" "}
                Home{" "}
              </NavLink>
            </li>
            <li className="mx-2">
              <NavLink
                to={ROUTER.TRANSACTIONS}
                className={({ isActive }) => (isActive ? activeLink : "")}
              >
                {" "}
                Transactions{" "}
              </NavLink>
            </li>
            <li className="mx-2">
              <NavLink
                to={ROUTER.USERS}
                className={({ isActive }) => (isActive ? activeLink : "")}
              >
                {" "}
                Users{" "}
              </NavLink>
            </li>
            <li className="mx-2">
              <NavLink
                to={ROUTER.PROFILE}
                className={({ isActive }) => (isActive ? activeLink : "")}
              >
                {" "}
                Profile{" "}
              </NavLink>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost hover:bg-transparent text-xl">
          <LogoNav />
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li className="mx-2">
            <NavLink
              className={({ isActive }) => (isActive ? activeLink : "")}
              to={ROUTER.HOME}
            >
              {" "}
              Home{" "}
            </NavLink>
          </li>
          <li className="mx-2">
            <NavLink
              to={ROUTER.TRANSACTIONS}
              className={({ isActive }) => (isActive ? activeLink : "")}
            >
              {" "}
              Transactions{" "}
            </NavLink>
          </li>
          <li className="mx-2">
            <NavLink
              to={ROUTER.USERS}
              className={({ isActive }) => (isActive ? activeLink : "")}
            >
              {" "}
              Users{" "}
            </NavLink>
          </li>
          <li className="mx-2">
            <NavLink
              to={ROUTER.PROFILE}
              className={({ isActive }) => (isActive ? activeLink : "")}
            >
              {" "}
              Profile{" "}
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <a
          className="btn bg-green-500 text-white"
          onClick={() => {
            navigate(ROUTER.LOGIN);
            logout();
            setLoggedInUser(false);
          }}
        >
          Logout
        </a>
      </div>
    </div>
  );
};
