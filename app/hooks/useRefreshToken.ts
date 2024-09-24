"use client";

import { useCallback } from "react";
import axios from "../utils/apis/axios";
import { useAppDispatch } from "@/redux/hook";
import { loginUser } from "@/redux/features/user/userSlice";

const useRefreshToken = () => {
  const dispatch = useAppDispatch();

  const refresh = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/users/refresh", {
        withCredentials: true,
      });

      if (data.accessToken) {
        dispatch(loginUser({ accessToken: data.accessToken }));
      }

      return data.accessToken;
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);
  return refresh;
};

export default useRefreshToken;
