import React from "react";
import { UserCard } from "../components/UserCard";
import { useQuery } from "@tanstack/react-query";
import { profile } from "../api/auth";

export const Profile = () => {
 
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: () => profile(),
  });
  console.log(data);
  return (
    <div className=" h-full m-4 mx-10 flex justify-center items-center">
      <UserCard
        profile={true}
        addClass={"rounded-full"}
        image={
          "https://t4.ftcdn.net/jpg/04/91/52/35/360_F_491523506_Fy81BhTXgg02iSnJE0h1txuKhThSKuDx.jpg"
        }
        username={data?.username}
      />
    </div>
  );
};
