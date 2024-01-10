import React from "react";
import { LogoNav } from "../components/LogoNav";
import { Link } from "react-router-dom";
import ROUTER from "../navigation";

export const NavBar = () => {
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
            <li>
              <a className="">Home</a>
            </li>
            <li>
              <a>Transactions</a>
            </li>
            <li>
              <a>Users</a>
            </li>
            <li>
              <a>Profile</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost hover:bg-transparent text-xl">
          <LogoNav />
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to={ROUTER.HOME}> Home </Link>
          </li>
          <li>
            <Link to={ROUTER.TRANSACTIONS}> Transactions </Link>
          </li>
          <li>
            <Link to={ROUTER.USERS}> Users </Link>
          </li>
          <li>
            <Link to={ROUTER.PROFILE}> Profile </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn bg-green-500 text-white">Logout</a>
      </div>
    </div>
  );
};
