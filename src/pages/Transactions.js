import React, { useState } from "react";
import { TransCard } from "../components/TransCard";
import { SearchBar } from "../components/SearchBar";
import { getTransactions } from "../api/auth";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "../components/LoadingSpinner";
export const Transactions = () => {
  const [search, setSearch] = useState("");

  const { data: transactions, isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });
  console.log(transactions);

  const transCards = transactions
    ?.filter((trans) => trans.amount.toString().includes(search))
    .map((trans) => <TransCard amount={trans.amount} type={trans.type} />);
  return (
    <div className="h-full">
      <SearchBar setSearch={setSearch} />
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
