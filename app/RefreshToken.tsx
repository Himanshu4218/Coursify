"use client";

import { useEffect } from "react";
import { useAppSelector } from "@/redux/hook";
import useRefreshToken from "./hooks/useRefreshToken";

const RefreshToken = () => {
  const { accessToken, persist } = useAppSelector((state) => state.user.auth);
  const refresh = useRefreshToken();

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log("Error refreshing token", error);
      }
    };
    if (!accessToken && persist) {
      checkAndRefreshToken();
    } else {
      console.log("No need to refresh token");
    }
  }, [accessToken, persist, refresh]);

  return <></>;
};

export default RefreshToken;
