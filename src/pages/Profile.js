import React from "react";
import { UserCard } from "../components/UserCard";

export const Profile = () => {
  return (
    <div className=" h-[100vh] m-4 mx-10 flex justify-center items-center">
      <UserCard
        profile={true}
        addClass={"rounded-full"}
        image={
          "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
        }
        email={"test@test"}
      />
    </div>
  );
};
