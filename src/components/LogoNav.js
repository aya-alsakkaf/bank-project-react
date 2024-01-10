import React from "react";
import FSLOGO from "../assets/images/fs-icon.svg";
export const LogoNav = () => {
  return (
    <div className="flex flex-row logo items-center">
      <img src={FSLOGO} alt="FullStack logo" width={"20%"} />
      <h2 className="ms-2 font-bold text-green-500">FULL STACK BANK</h2>
    </div>
  );
};
