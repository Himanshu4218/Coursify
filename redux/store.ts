import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/redux/features/user/userSlice";
import categoryReducer from "@/redux/features/category/categorySlice";
import courseReducer from "@/redux/features/course/courseSlice";
import courseIdReducer from "@/redux/features/course/courseByIdSlice";
import modalReducer from "@/redux/features/modal/modalSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      category: categoryReducer,
      course: courseReducer,
      courseById: courseIdReducer,
      modal: modalReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
