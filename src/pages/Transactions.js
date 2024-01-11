import React, { useState } from "react";
import { TransCard } from "../components/TransCard";
import { SearchBar } from "../components/SearchBar";
import { getTransactions } from "../api/auth";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "../components/LoadingSpinner";

export const Transactions = () => {
  const dayjs = require("dayjs");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const { data: transactions, isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  const transCards = transactions
    ?.filter(
      (trans) =>
        trans.amount.toString().includes(search) ||
        dayjs(trans.createdAt).format("DD/MM/YYYY").includes(search)
    )
    ?.filter((trans) => trans.type.includes(filter))
    ?.sort((a, b) => dayjs(b.createdAt) - dayjs(a.createdAt)) 
    .map((trans) => (
      <TransCard
        amount={trans.amount}
        type={trans.type}
        date={dayjs(trans.createdAt).format("DD/MM/YYYY")}
      />
    ));
  return (
    <div className="h-full">
      <SearchBar setSearch={setSearch} />
      <div className="flex flex-row justify-center">
        <form className="flex flex-row justify-content mt-3">
          <p className="font-bold mt-2 mx-2">Filter: </p>
          <label className="label cursor-pointer">
            <input
              type="radio"
              id="All"
              name="filter"
              value=""
              className="radio checked:bg-green-500"
              checked={filter === ""}
              onChange={() => setFilter("")}
            />
            <span className="label-text mx-3">All</span>
          </label>
          <label className="label cursor-pointer">
            <input
              type="radio"
              id="deposit"
              name="filter"
              value="deposit"
              className="radio checked:bg-green-500"
              checked={filter === "deposit"}
              onChange={() => setFilter("deposit")}
            />
            <span className="label-text mx-3">Deposit</span>
          </label>
          <label className="label cursor-pointer">
            <input
              type="radio"
              id="withdraw"
              name="filter"
              value="withdraw"
              className="radio checked:bg-green-500"
              checked={filter === "withdraw"}
              onChange={() => setFilter("withdraw")}
            />
            <span className="label-text mx-3">Withdraw</span>
          </label>
          <label className="label cursor-pointer">
            <input
              type="radio"
              id="All"
              name="filter"
              value="transfer"
              className="radio checked:bg-green-500"
              checked={filter === "transfer"}
              onChange={() => setFilter("transfer")}
            />
            <span className="label-text mx-3">Transfer</span>
          </label>
        </form>
      </div>
      {isLoading ? (
        <div className="text-center w-full h-full flex justify-center items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex flex-col justify-between items-center mt-4">
          {transCards}
        </div>
      )}
    </div>
  );
};
