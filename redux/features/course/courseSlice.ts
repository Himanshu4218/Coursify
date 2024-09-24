import axios from "@/app/utils/apis/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface CourseType {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  skills: string[];
  languages: string[];
}

export const getAllCourses = createAsyncThunk<
  CourseType[],
  void,
  { rejectValue: string }
>("course/getAllCourses", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get("/api/courses/getAllCourses");
    return data.courses;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch courses"
    );
  }
});

const initialState = {
  courses: [] as CourseType[],
  isLoading: false,
  error: "" as string,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCourses.pending, (state, payload) => {
        state.isLoading = true;
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses = action.courses;
      })
      .addCase(getAllCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch categories";
      });
  },
});

export default courseSlice.reducer;
