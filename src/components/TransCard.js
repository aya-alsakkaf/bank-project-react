import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getTransactions } from "../api/auth";

export const TransCard = ({ amount, type, date }) => {
  return (
    <div className="card w-[80vw] bg-base-100 shadow mt-3">
      <div className="card-body col-3 flex flex-row justify-around">
        <p
          className={
            type === "withdraw"
              ? "text-red-500 w-full"
              : "text-green-500 w-full"
          }
        >
          {" "}
          {type === "withdraw" ? "-" : "+"} {amount}{" "}
        </p>
        <p className="text-black w-full"> {date} </p>
        <p className="text-black w-full"> {type} </p>
      </div>
    </div>
  );
};
