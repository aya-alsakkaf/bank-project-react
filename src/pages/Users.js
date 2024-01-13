import React, { useState, useContext, useEffect } from "react";
import { UserCard } from "../components/UserCard";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../api/auth";
import { LoadingSpinner } from "../components/LoadingSpinner";
import ROUTER from "../navigation";
import { useNavigate } from "react-router-dom";
import { LoggedInUserContext } from "../context/LoggedInUserContext";

export const Users = () => {
  const [loggedInUser, setLoggedInUser] = useContext(LoggedInUserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser) {
      navigate(ROUTER.LOGIN);
    }
  }, []);
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
  });

  const usersCard = users?.map((user) => (
    <UserCard
      key={user.id}
      image={user.image}
      username={user.username}
      balance={user.balance}
    />
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
