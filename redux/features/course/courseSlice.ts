import axios from "@/app/utils/apis/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface CourseType {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  skills: string[];
  language: string;
}

interface StateType {
  isLoading: boolean;
  error: string | null;
  page: number;
  limit: number;
  courses: CourseType[];
  hasMore: boolean;
}

const initialState: StateType = {
  courses: [],
  isLoading: false,
  error: null,
  page: 1,
  limit: 10,
  hasMore: true,
};

export const getAllCourses = createAsyncThunk<
  CourseType[],
  { page: number; limit: number },
  { rejectValue: string; state: { course: StateType } }
>(
  "course/getAllCourses",
  async ({ page, limit }, { rejectWithValue, getState }) => {
    try {
      const state = getState().course;

      if (!state.hasMore) {
        return [];
      }
      const { data } = await axios.get(
        `/api/courses/getAllCourses/?page=${page}&limit=${limit}`
      );

      if (data.courses.length === 0) {
        return rejectWithValue("No more courses");
      }
      return data.courses;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch courses"
      );
    }
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCourses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        const uniqueCourses = action.payload.filter(
          (newCourse) =>
            !state.courses.some((course) => course._id === newCourse._id)
        );

        state.courses = [...state.courses, ...uniqueCourses];

        if (action.payload.length < state.limit) {
          state.hasMore = false;
        }
      })
      .addCase(getAllCourses.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload === "No more courses") {
          state.hasMore = false;
        } else {
          state.error = action.payload || "Failed to fetch courses";
        }
      });
  },
});

export default courseSlice.reducer;
