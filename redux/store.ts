import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/redux/features/user/userSlice";
import categoryReducer from "@/redux/features/category/categorySlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      category: categoryReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
