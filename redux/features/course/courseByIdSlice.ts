import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CourseType } from "./courseSlice";
import axios from "@/app/utils/apis/axios";

interface StateType {
  course: CourseType | null;
  isLoading: boolean;
  error: string | null;
}

export const getCourseById = createAsyncThunk<
  CourseType,
  { id: string },
  { rejectValue: string }
>("course/getCourseById", async ({ id }, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`api/courses/course/${id}`);
    return data.course;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch courses"
    );
  }
});

const initialState: StateType = {
  course: null,
  isLoading: false,
  error: null,
};

const courseByIdSlice = createSlice({
  name: "courseById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourseById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCourseById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.course = action.payload;
      })
      .addCase(getCourseById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch the course";
      });
  },
});

export default courseByIdSlice.reducer;
