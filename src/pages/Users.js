import React from "react";
import { UserCard } from "../components/UserCard";

export const Users = () => {
  return (
    <div className="mt-4 mx-10 h-[100vh]">
      <div className="grid grid-cols-3 gap-3 ">
        <UserCard
          image={
            "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          }
          email={"test@test"}
        />

        <UserCard
          image={
            "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          }
          email={"test@test"}
        />
      </div>
    </div>
  );
};
