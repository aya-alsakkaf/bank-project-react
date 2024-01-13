import React from "react";
import { UserCard } from "../components/UserCard";
import { useQuery } from "@tanstack/react-query";
import { profile } from "../api/auth";

export const Profile = () => {
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: () => profile(),
  });

  return (
    <div className=" h-full m-4 mx-10 flex justify-center items-center">
      <UserCard
        profile={true}
        addClass={"rounded-full"}
        image={`${data?.image}`}
        username={data?.username}
      />
    </div>
  );
};
