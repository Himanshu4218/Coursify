"use client";

import Pagination from "@/app/components/buttons/Pagination";
import UsersCard from "@/app/components/pages/admin/users/UsersCard";
import CardShimmer from "@/app/components/skeletons/CardShimmer";
import PageHeadings from "@/app/components/typography/PageHeadings";
import useAxiosPrivate from "@/app/hooks/useAxiosPrivate";
import React, { Suspense, useCallback, useEffect, useState } from "react";

interface UserCardTypes {
  _id: number;
  username: string;
  last_name: string;
  email: string;
}

const Users = () => {
  const [allUsers, setAllUsers] = useState<UserCardTypes[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchUsers, setSearchUsers] = useState<string>("");
  const [isReload, setIsReload] = useState<boolean>(true);
  const [page, setPage] = useState<number | string>(1);
  const axiosPrivate = useAxiosPrivate();

  //FOR CHANGE PAGES
  const changePages = useCallback(
    (directionOrPage: "next" | "prev" | number) => {
      if (directionOrPage === "prev") {
        setIsLoading(false);
      }

      setPage((prevPage) => {
        if (directionOrPage === 0) return "";

        if (typeof directionOrPage === "number") return directionOrPage;

        if (typeof prevPage === "string") return 1;
        return directionOrPage === "next"
          ? prevPage + 1
          : Math.max(prevPage - 1, 1);
      });
    },
    [page]
  );

  const getAllUsers = useCallback(async () => {
    try {
      const { data } = await axiosPrivate("/api/users/all-users");
      console.log(data);
      setAllUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  }, [axiosPrivate]);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  return (
    <div className="space-y-5">
      <PageHeadings
        heading="All Users"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchUsers(e.target.value)
        }
        setReload={() => setIsReload((prev) => !prev)}
        value={searchUsers}
        isLoading={isLoading}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <Suspense fallback={<CardShimmer size={3} />}>
          {allUsers?.map((user) => (
            <UsersCard
              key={user?._id}
              first_name={user?.username}
              last_name={""}
              image={""}
              email={user?.email}
            />
          ))}
        </Suspense>
      </div>

      <Pagination
        changePages={changePages}
        currentPage={page}
        totalPages={1}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Users;
