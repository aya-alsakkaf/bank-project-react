import React from "react";
import { TransCard } from "../components/TransCard";
import { SearchBar } from "../components/SearchBar";

export const Transactions = () => {
  return (
    <div className="h-[100vh]">
      <SearchBar />
      <div className="flex flex-col justify-between items-center mt-4 ">
        <TransCard amount={128} type={"withdraw"} date={"12/12/2023"} />
        <TransCard amount={128} type={"deopsit"} date={"12/12/2023"} />
      </div>
    </div>
  );
};
