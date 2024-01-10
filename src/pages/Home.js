import React from "react";
import { NavBar } from "../components/NavBar";
import { LogoNav } from "../components/LogoNav";
import { Footer } from "../components/Footer";

export const Home = () => {
  return (
    <>
      <div className="flex flex-row justify-center">
        <div className="card w-96 bg-base-100 shadow-2xl mt-3">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Your available Balance :</h2>
            <p className="text-xl mt-[30px]">
              8940.00 <span className="text-green-500">KWD</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center mt-[5rem]">
        <div className="card w-96 bg-base-100 shadow-2xl mt-3">
          <div className="card-body items-center text-center">
            <div className="card-title">
              <p className="text-sm font-medium">Deposit</p>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" class="sr-only peer" />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Withdraw
                </span>
              </label>
            </div>
            <div className="mt-2">
              <form>
                <label className="">Amount</label>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-2xl mt-3"
                  placeholder="Amount"
                />
                <button className="btn hover:bg-green-500 hover:text-white border-none text-black mt-3">
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
