import React, { useContext, useState } from "react";
import { BalanceContext } from "../context/BalanaceContext";
import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";
import { deposit, profile, withdraw } from "../api/auth";

export const Home = () => {
  const [userBalance, setUserBalance] = useContext(BalanceContext);
  const queryClient = useQueryClient();
  const [moneyAction, setMoneyAction] = useState("deposit");
  const [amount, setAmount] = useState(0);
  queryClient.invalidateQueries();
  console.log(amount);
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: () => profile(),
  });
  setUserBalance(data?.balance);

  const { mutate: deopsitMoney, isSuccess } = useMutation({
    mutationFn: () => deposit(amount),
    mutationKey: ["deposit"],
  });

  const { mutate: withdrawMoney } = useMutation({
    mutationFn: () => withdraw(amount),
    mutationKey: ["withdraw"],
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (moneyAction === "deposit") {
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
                  }}
                />
                <button className="btn hover:bg-green-500 hover:text-white border-none  text-black mt-3">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
