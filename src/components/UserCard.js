import React from "react";

export const UserCard = ({ image, email, addClass, profile }) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure className="px-5 pt-5">
        <img
          src={image}
          alt="Profile Picture"
          className={profile ? addClass : "rounded-xl"}
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{email}</h2>
        {profile ? (
          <></>
        ) : (
          <div className="card-actions">
            <button className="btn btn-ghost hover:bg-green-500 hover:text-white">
              Transfer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};