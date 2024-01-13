import React, { useState } from "react";
import TransferMoney from "./TransferAmount";

export const UserCard = ({ image, username, addClass, profile, balance }) => {
  const baseImg = "https://react-bank-project.eapi.joincoded.com/";
  const [show, setShow] = useState(false);
  const onClose = () => setShow(false);
  const onOpen = () => setShow(true);
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
          <></>
        ) : (
          <div className="card-actions">
            <button
              className="btn btn-ghost hover:bg-green-500 hover:text-white"
              onClick={onOpen}
            >
              Transfer
            </button>
          </div>
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
