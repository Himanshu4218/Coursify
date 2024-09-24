import axios from "@/app/utils/apis/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const isBrowser = typeof window !== "undefined";

interface CategoryType {
  _id: number;
  name: string;
  image: string;
  description: string;
}

interface StateType {
  isLoading: boolean;
  error: string | null;
  categories: CategoryType[];
}

const initialState: StateType = {
  isLoading: false,
  error: null,
  categories: [],
};

export const getAllCategories = createAsyncThunk<
  CategoryType[],
  void,
  { rejectValue: string }
>("category/getAllCategories", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get("/api/courses/getAllCategories");
    return data.categories;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch categories"
    );
  }
});

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch categories";
      });
  },
});

export default categorySlice.reducer;
