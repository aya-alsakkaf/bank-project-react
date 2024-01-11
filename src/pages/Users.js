import React from "react";
import { UserCard } from "../components/UserCard";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../api/auth";
import { LoadingSpinner } from "../components/LoadingSpinner";

export const Users = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
  });

  const usersCard = users?.map((user) => (
    <UserCard key={user.id} image={user.image} username={user.username} />
  ));

  return (
    <div className="mt-4 mx-10">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-3 gap-3 ">{usersCard}</div>
      )}
    </div>
  );
};
