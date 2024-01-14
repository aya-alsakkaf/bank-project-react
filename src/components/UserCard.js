import React, { useState } from "react";
import TransferMoney from "./TransferAmount";
import { profilePicture } from "../api/auth";
import { useMutation } from "@tanstack/react-query";
import ROUTER from "../navigation";
import { useNavigate } from "react-router-dom";

export const UserCard = ({ image, username, addClass, profile, balance }) => {
  const baseImg = "https://react-bank-project.eapi.joincoded.com/";
  const [show, setShow] = useState(false);
  const onClose = () => setShow(false);
  const onOpen = () => setShow(true);
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.files[0] });
    } else {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }
  };

  console.log(userInfo);

  const { mutate, isSuccess } = useMutation({
    mutationFn: () => profilePicture(userInfo),
    onSuccess: () => {
      navigate(ROUTER.PROFILE);
    },
    mutationKey: ["profilePicture"],
  });
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Add register logic here
    mutate();
  };
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure className="px-5 pt-5">
        <img
          src={baseImg + image}
          alt="User Profile"
          className={profile ? addClass : "w-24 h-24 rounded-full mb-4"}
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{username}</h2>

        <p className="font-bold">Balance: {balance}</p>
        {profile ? (
          <>
            <form onSubmit={handleFormSubmit}>
              <div className="mt-3">
                <div className="flex items-center justify-center">
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
              <button
                type="submit"
                className="btn  hover:bg-green-500 hover:text-white  mt-3"
              >
                Save
              </button>
            </form>

            {isSuccess ? (
              <div
                role="alert"
                className="alert alert-success bg-green-500 text-white mt-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p> Profile Picture Saved </p>
              </div>
            ) : (
              <> </>
            )}
          </>
        ) : (
          <>
            <div className="card-actions">
              <button
                className="btn btn-ghost hover:bg-green-500 hover:text-white"
                onClick={onOpen}
              >
                Transfer
              </button>
            </div>
          </>
        )}
      </div>
      <TransferMoney
        show={show}
        onClose={onClose}
        onSave={() => {}}
        username={username}
      />
    </div>
  );
};
