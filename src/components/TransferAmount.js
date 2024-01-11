import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { transferMoney } from "../api/auth";

const TransferMoney = ({ show, onClose, onSave, username }) => {
  const [amount, setAmount] = useState(0);
  const queryClient = useQueryClient();
  const { mutate: transfer } = useMutation({
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
    transfer();
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
              }}
              className="w-full px-4 py-2 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
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
