import React, { useContext, useState } from "react";
import { BalanceContext } from "../context/BalanaceContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deposit, profile, withdraw } from "../api/auth";
import { LoggedInUserContext } from "../context/LoggedInUserContext";
import { useNavigate } from "react-router-dom";
import ROUTER from "../navigation/index";

export const Home = () => {
  const [userBalance, setUserBalance] = useContext(BalanceContext);
  const [loggedInUser, setLoggedInUser] = useContext(LoggedInUserContext);
  const [invalidAmount, setInvalidAmount] = useState(false);
  const queryClient = useQueryClient();
  const [moneyAction, setMoneyAction] = useState("deposit");
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();
  if (!loggedInUser) {
    navigate(ROUTER.LOGIN);
  }
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: () => profile(),
  });
  setUserBalance(data?.balance);

  const {
    mutate: deopsitMoney,
    isSuccess: depositSucess,
    reset: resetDeopsit,
  } = useMutation({
    mutationFn: () => deposit(amount),
    onSuccess: () => {
      queryClient.invalidateQueries(["transfer"]);
    },
    mutationKey: ["deposit"],
  });

  const {
    mutate: withdrawMoney,
    isSuccess: withdrawSucess,
    isError: withdrawError,
    reset: resetWithdraw,
  } = useMutation({
    mutationFn: () => withdraw(amount),
    mutationKey: ["withdraw"],
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (amount <= 0 || amount === "") {
      setInvalidAmount(true);
    } else if (moneyAction === "deposit") {
      deopsitMoney();
    } else {
      withdrawMoney();
    }
  };

  return (
    <>
      <div className="flex flex-row justify-center">
        <div className="card w-96 bg-base-100 shadow-2xl mt-3">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Your available Balance :</h2>
            <p className="text-xl mt-[30px] animate-bounce">
              {userBalance} <span className="text-green-500">KWD</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center mt-[5rem]">
        <div className="card w-96 bg-base-100 shadow-2xl mt-3">
          <div className="card-body items-center text-center">
            <div className="card-title">
              <p className="text-sm font-medium">Deposit</p>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  onChange={(e) => {
                    setMoneyAction(e.target.checked ? "widthraw" : "deposit");
                  }}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Withdraw
                </span>
              </label>
            </div>
            <div className="mt-2">
              <form onSubmit={handleFormSubmit}>
                <label className="">Amount</label>
                <input
                  type="text"
                  name="amount"
                  id="amount"
                  className="input input-bordered  w-full max-w-2xl mt-3"
                  placeholder="Amount"
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setInvalidAmount(false);
                    resetDeopsit();
                    resetWithdraw();
                  }}
                />
                <button className="btn hover:bg-green-500 hover:text-white border-none  text-black mt-3">
                  Submit
                </button>
              </form>
            </div>

            {depositSucess || withdrawSucess ? (
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
                {moneyAction === "deposit" ? (
                  <span>You have deposited {amount} KWD!</span>
                ) : (
                  <span>You have withdrawn {amount} KWD!</span>
                )}
              </div>
            ) : (
              <></>
            )}

            {invalidAmount || withdrawError ? (
              <div
                role="alert"
                className="alert alert-error bg-red-500 text-white mt-3"
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
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {invalidAmount ? (
                  <span>Amount can not be empty, negative or equal to 0</span>
                ) : (
                  <span>You don't have enough balance to withdraw</span>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
