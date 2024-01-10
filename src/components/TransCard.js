import React from "react";

export const TransCard = ({ amount, type, date }) => {
  return (
    <div className="card w-[80vw] bg-base-100 shadow mt-3">
      <div className="card-body flex flex-row justify-around">
        <p className={type == "withdraw" ? "text-red-500" : "text-green-500"}>
          {" "}
          {type == "withdraw" ? "-" : "+"} {amount}{" "}
        </p>
        <p className="text-black"> {date} </p>
        <p className="text-black"> {type} </p>
      </div>
    </div>
  );
};
