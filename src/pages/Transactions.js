import React, { useState, useContext, useEffect } from "react";
import { TransCard } from "../components/TransCard";
import { SearchBar } from "../components/SearchBar";
import { getTransactions } from "../api/auth";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "../components/LoadingSpinner";
import ROUTER from "../navigation";
import { useNavigate } from "react-router-dom";
import { LoggedInUserContext } from "../context/LoggedInUserContext";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export const Transactions = () => {
  const dayjs = require("dayjs");
  const currentDate = new Date().toDateString();
  const formatDate = (date) => dayjs(date).format("DD/MM/YYYY");
  const [loggedInUser, setLoggedInUser] = useContext(LoggedInUserContext);
  const navigate = useNavigate();
  const [valueFrom, setValueFrom] = useState(dayjs(currentDate));
  const [valueTo, setValueTo] = useState(dayjs(currentDate));
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [date, setDate] = useState(false);

  if (!loggedInUser) {
    navigate(ROUTER.LOGIN);
  }

  const { data: transactions, isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  // const filterSearch = transactions?.filter((trans) =>
  //   trans.amount.toString().includes(search)
  // );

  // const searchDate = filterSearch?.filter((trans) => {
  //   return date
  //     ? formatDate(trans.createdAt) >= formatDate(valueFrom) &&
  //         formatDate(trans.createdAt) <= formatDate(valueTo)
  //     : true;
  // });
  // const searchType = searchDate?.filter((trans) =>
  //   filter === "" ? trans : trans.type === filter
  // );
  // const transCards = searchType
  //   ?.sort(
  //     (transA, transB) =>
  //       new Date(transB.createdAt) - new Date(transA.createdAt)
  //   )
  //   ?.map((trans) => (
  //     <TransCard
  //       key={trans._id}
  //       amount={trans.amount}
  //       type={trans.type}
  //       date={dayjs(trans.createdAt).format("DD/MM/YYYY")}
  //     />
  //   ));

  const transCards = transactions
    ?.filter(
      (trans) =>
        trans.amount.toString().includes(search) &&
        trans.type.includes(filter) &&
        (!date ||
          (formatDate(trans.createdAt) >= formatDate(valueFrom) &&
            formatDate(trans.createdAt) <= formatDate(valueTo)))
    )
    .sort(
      (transA, transB) =>
        new Date(transB.createdAt) - new Date(transA.createdAt)
    )
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
      <div className="flex flex-col justify-center items-center">
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
              onChange={() => {
                setFilter("");
                setDate(false);
              }}
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
              onChange={() => {
                setFilter("deposit");
                setDate(false);
              }}
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
              onChange={() => {
                setFilter("withdraw");
                setDate(false);
              }}
            />
            <span className="label-text mx-3">Withdraw</span>
          </label>
          <label className="label cursor-pointer">
            <input
              type="radio"
              id="transfer"
              name="filter"
              value="transfer"
              className="radio checked:bg-green-500"
              checked={filter === "transfer"}
              onChange={() => {
                setFilter("transfer");
                setDate(false);
              }}
            />
            <span className="label-text mx-3">Transfer</span>
          </label>
          <label className="label cursor-pointer">
            <input
              type="radio"
              id="All"
              name="date"
              value="date"
              className="radio checked:bg-green-500"
              checked={date === true}
              onChange={() => {
                setDate(true);
                setFilter("");
              }}
            />
            <span className="label-text mx-3">By Date</span>
          </label>
        </form>
        {date ? (
          <div className="flex flex-row mt-2">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  label="From"
                  value={valueFrom}
                  onChange={(newValueFrom) => setValueFrom(newValueFrom)}
                />
                <DatePicker
                  label="To"
                  value={valueTo}
                  onChange={(newValueTo) => setValueTo(newValueTo)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
        ) : (
          <></>
        )}
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
