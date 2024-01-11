import React from "react";

export const SearchBar = ({setSearch}) => {
  return (
    <div className="w-ful flex justify-center items-center mx-4">
      <form className="w-full flex justify-center items-center">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="input text-center input-bordered w-[80vw] mt-3"
        />
        <button
          type="submit"
          className="btn btn-ghost border-neutral-400 hover:bg-green-600 hover:text-white hover:border-none mt-3 ml-3"
        >
          Search
        </button>
      </form>
    </div>
  );
};
