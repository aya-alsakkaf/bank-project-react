import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { transferMoney } from "../api/auth";

const TransferMoney = ({ show, onClose, onSave, username }) => {
  const [amount, setAmount] = useState(0);
  const queryClient = useQueryClient();
  const [invalidAmount, setInvalidAmount] = useState(false);
  const {
    mutate: transfer,
    isError,
    isSuccess,
    reset,
  } = useMutation({
    mutationFn: () =>
      transferMoney({
        amount,
        username,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["transfer"]);
      onClose();
    },
  });
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (amount <= 0 || amount === "") {
      setInvalidAmount(true);
    } else {
      transfer();
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white rounded-md shadow-md w-full max-w-md p-6 overflow-scroll max-h-[70%]">
        <h2 className="text-3xl text-black font-semibold mb-6">
          Transfer Money to {username}
        </h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-black text-sm font-medium mb-2"
            >
              Amount
            </label>
            <input
              type="text"
              id="amount"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setInvalidAmount(false);
                reset();
              }}
              className="w-full px-4 py-2 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          {isSuccess ? (
            <>
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
                <span>You have transfered {amount} KWD!</span>
              </div>
            </>
          ) : (
            <></>
          )}
          {invalidAmount || isError ? (
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
                <span>You don't have enough balance to transfer</span>
              )}
            </div>
          ) : (
            <></>
          )}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 btn-outline text-black rounded-md hover:bg-green-500 transition-colors hover:text-white"
            >
              Transfer
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 px-4 py-2 bg-gray-500 text-black hover:text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransferMoney;
