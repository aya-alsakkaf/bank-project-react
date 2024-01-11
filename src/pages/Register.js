import React, { useContext, useState } from "react";
import CC from "../assets/images/Credit card-bro.svg";
import { LogoNav } from "../components/LogoNav";
import { Link, useNavigate } from "react-router-dom";
import ROUTER from "../navigation";
import { useMutation } from "@tanstack/react-query";
import { register } from "../api/auth";
import { LoggedInUserContext } from "../context/LoggedInUserContext";

export const Register = () => {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();
  const setLoggedInUser = useContext(LoggedInUserContext);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.files[0] });
    } else {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }
  };
  const { mutate } = useMutation({
    mutationFn: () => register(userInfo),
    onSuccess: () => {
      navigate(ROUTER.HOME);
      setLoggedInUser(true);
    },
    mutationKey: ["register"],
  });
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Add register logic here
    mutate();
  };

  return (
    <div className="m-3 w-{100wh}">
      <a className="btn btn-ghost hover:bg-transparent text-xl">
        <LogoNav />
      </a>
      <div className="sideprofile columns-2 gap-3 mt-[9rem]">
        <img src={CC} alt="Credit Card" width={"70%"} className="ml-6" />

        <div className="loginCard mx-10">
          <h2 className="mx-10 mb-3 text-center text-2xl font-bold leading-9 tracking-tight text-green-500">
            Register your account
          </h2>
          <h3 className="text-center mx-10 mb-3 text-base ">
            If you do have an account,
            <Link to={ROUTER.LOGIN} className="text-blue-600">
              login here
            </Link>
          </h3>
          <div className="ms-3">
            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="username"
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
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Upload a Profile Picture
                  </label>
                </div>
                <div>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleChange}
                    required
                    className="file-input file-input-bordered w-full max-w-2xl"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="btn hover:animate-bounce flex w-full justify-center rounded-md px-3 py-1.5 hover:bg-green-500 hover:text-white  "
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
