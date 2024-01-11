import React, { useContext, useState } from "react";
import CC from "../assets/images/Credit card-bro.svg";
import { LogoNav } from "../components/LogoNav";
import { Link, useNavigate } from "react-router-dom";
import ROUTER from "../navigation";
import { LoggedInUserContext } from "../context/LoggedInUserContext";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth";

export const Login = () => {
  const [userInfo, setUserInfo] = useState({});
  const setLoggedInUser = useContext(LoggedInUserContext);
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: () => login(userInfo),
    mutationKey: ["login"],
    onSuccess: () => {
      navigate(ROUTER.HOME);
      setLoggedInUser(true);
    },
  });

  const handleChange = (e) => {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // console.log(userInfo);
    mutate(userInfo);
  };
  return (
    <div className="m-3 w-{100wh}">
      <Link
        to={ROUTER.HOME}
        className="btn btn-ghost hover:bg-transparent text-xl"
      >
        <LogoNav />
      </Link>
      <div className="sideprofile columns-2 gap-3 mt-[9rem]">
        <img src={CC} alt="Credit Card" width={"70%"} className="ml-6" />

        <div className="loginCard mx-10">
          <h2 className="mx-10 mb-3 text-center text-2xl font-bold leading-9 tracking-tight text-green-500">
            Log in to your account
          </h2>
          <h3 className="text-center mx-10 mb-3 text-base ">
            If you do not have an account,
            <Link to={ROUTER.REGISTER} className="text-blue-600">
              register here
            </Link>
          </h3>
          <div className="ms-3">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    placeholder="Username"
                    required
                    onChange={handleChange}
                    className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-blue-600 hover:text-blue-900"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="password"
                    required
                    onChange={handleChange}
                    className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="btn hover:animate-bounce flex w-full justify-center rounded-md px-3 py-1.5 hover:bg-green-500 hover:text-white  "
                >
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
