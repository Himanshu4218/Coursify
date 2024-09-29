"use client";

import { useCallback } from "react";
import { useAppDispatch } from "@/redux/hook";
import { axiosPrivate } from "../utils/apis/axios";
import { refreshAccessToken } from "@/redux/features/user/userSlice";

const useRefreshToken = () => {
  const dispatch = useAppDispatch();

  const refresh = useCallback(async () => {
    try {
      const { data } = await axiosPrivate.get("/api/users/refresh");

      if (data.accessToken) {
        dispatch(refreshAccessToken(data.accessToken));
      }
      return data.accessToken;
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);
  return refresh;
};

export default useRefreshToken;
