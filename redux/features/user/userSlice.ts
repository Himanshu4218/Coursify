"use client";

import { createSlice } from "@reduxjs/toolkit";

const isBrowser = typeof window !== "undefined";

const userSlice = createSlice({
  name: "user",
  initialState: {
    auth: {
      accessToken: "",
      persist: isBrowser
        ? JSON.parse(localStorage.getItem("persist") || "false")
        : false,
      isLoggedIn: isBrowser
        ? JSON.parse(localStorage.getItem("isLoggedIn") || "false")
        : false,
    },
  },
  reducers: {
    loginUser: (state, action) => {
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      return {
        ...state,
        auth: { ...state.auth, ...action.payload, isLoggedIn: true },
      };
    },
    refreshAccessToken: (state, action) => {
      return { ...state, auth: { ...state.auth, accessToken: action.payload } };
    },
    logoutUser: (state, action) => {
      localStorage.setItem("isLoggedIn", JSON.stringify(false));
      return {
        ...state,
        auth: { ...state.auth, ...action.payload, isLoggedIn: false },
      };
    },
  },
});

export const { loginUser, refreshAccessToken, logoutUser } = userSlice.actions;

export default userSlice.reducer;
