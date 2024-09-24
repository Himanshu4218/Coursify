'use client';

import Pagination from "@/app/components/buttons/Pagination";
import UsersCard from "@/app/components/pages/admin/users/UsersCard";
import CardShimmer from "@/app/components/skeletons/CardShimmer";
import PageHeadings from "@/app/components/typography/PageHeadings";
import useDebounce from "@/app/hooks/useDebounce";
import { getRequest } from "@/app/utils/apis/apiRequests";
import { ENDPOINTS } from "@/app/utils/apis/endpoints";
import dynamic from "next/dynamic";
import React, { Suspense, useCallback, useEffect, useState } from "react";


const Heading = dynamic(() => import("@/app/components/typography/Heading"));

interface UserCardTypes {
  data: {
    id: number;
    first_name: string;
    last_name: string;
    profile_image: string;
    email: string;
  }[];
  last_page: number; 
}

const Users = () => {

  const [allUsers, setAllUsers] = useState<UserCardTypes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchUsers, setSearchUsers] = useState<string>("");
  const [isReload, setIsReload] = useState<boolean>(true);
  const [page, setPage] = useState<number | string>(1);

  //FOR GET ALL USERS DATA
  const getAllUsers = useCallback(async (search?: string, value?: number) => {
    try {
      setIsLoading(true)
      const url = `${ENDPOINTS.GET_ALL_USERS}?page=${value || page}&per_page=10&search=${search}`;
      const response = await getRequest(url);

      if (response?.data?.data) {
        console.log(response)
        setAllUsers(response?.data);
      } else {
        console.error('No data found in the response');
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  //FOR CHANGE PAGES
  const changePages = useCallback((directionOrPage: 'next' | 'prev' | number) => {
    if (directionOrPage === 'prev') {
      setIsLoading(false);
    }

    setPage(prevPage => {
      if (directionOrPage === 0) return "";

      if (typeof directionOrPage === 'number') return directionOrPage;

      if (typeof prevPage === 'string') return 1;
      return directionOrPage === 'next' ? prevPage + 1 : Math.max(prevPage - 1, 1);
    });

  }, [page]);

  //FOR DEBOUNCING
  const debouncedSearchUsers = useDebounce(searchUsers, 300);

  useEffect(() => {
    getAllUsers(debouncedSearchUsers, Number(page || 1));
  }, [page, debouncedSearchUsers, isReload])


  return (
    <div className="space-y-5">
      
      <PageHeadings
        heading="All Users"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchUsers(e.target.value)}
        setReload={() => setIsReload(prev => !prev)}
        value={searchUsers}
        isLoading={isLoading}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <Suspense fallback={<CardShimmer length={[1, 2, 3]} />}>
          {
            allUsers?.data?.map((user) => (
              <UsersCard
                key={user?.id}
                first_name={user?.first_name}
                last_name={user?.last_name}
                image={user?.profile_image}
                email={user?.email}
              />
            ))
          }
        </Suspense>
      </div>

      <Pagination
        changePages={changePages}
        currentPage={page}
        totalPages={allUsers?.last_page ? allUsers.last_page : 1}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Users;
