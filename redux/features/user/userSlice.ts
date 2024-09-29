"use client";

import axios from "@/app/utils/apis/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const isBrowser = typeof window !== "undefined";

interface UserType {
  isAdmin: boolean;
  accessToken: string;
  persist: boolean;
}

interface StateType {
  userInfo: UserType;
}

export const loginUser = createAsyncThunk<
  UserType,
  { email: string; password: string },
  { rejectValue: string }
>("user/loginUser", async (values, { rejectWithValue }) => {
  try {
    const { data } = await axios.post("/api/users/login", values);
    return data.user;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to login user"
    );
  }
});

const initialState: StateType = {
  userInfo: {
    isAdmin: isBrowser
      ? JSON.parse(localStorage.getItem("isAdmin") || "false")
      : false,
    accessToken: "",
    persist: isBrowser
      ? JSON.parse(localStorage.getItem("persist") || "false")
      : false,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    refreshAccessToken: (state, action) => {
      state.userInfo.accessToken = action.payload;
    },
    logoutUser: (state) => {
      state.userInfo = {
        isAdmin: false,
        accessToken: "",
        persist: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      localStorage.setItem("isAdmin", action.payload.isAdmin.toString());
      state.userInfo = {
        ...action.payload,
        persist: state.userInfo.persist,
      };
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      console.error("Failed to log in:", action.payload);
    });
  },
});

export const { refreshAccessToken, logoutUser } = userSlice.actions;

export default userSlice.reducer;
