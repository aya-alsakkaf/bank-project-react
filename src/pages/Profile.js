import React, { useContext, useEffect } from "react";
import { UserCard } from "../components/UserCard";
import { useQuery } from "@tanstack/react-query";
import { profile } from "../api/auth";
import ROUTER from "../navigation";
import { useNavigate } from "react-router-dom";
import { LoggedInUserContext } from "../context/LoggedInUserContext";

export const Profile = () => {
  const [loggedInUser, setLoggedInUser] = useContext(LoggedInUserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser) {
      navigate(ROUTER.LOGIN);
    }
  }, []);

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
