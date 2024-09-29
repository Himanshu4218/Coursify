import axios from "@/app/utils/apis/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const isBrowser = typeof window !== "undefined";

interface CategoryType {
  _id: string;
  name: string;
  image: string;
  description: string;
}

interface StateType {
  isLoading: boolean;
  error: string | null;
  page: number;
  limit: number;
  categories: CategoryType[];
  hasMore: boolean;
}

const initialState: StateType = {
  isLoading: false,
  error: null,
  page: 1,
  limit: 10,
  categories: [],
  hasMore: true,
};

export const getAllCategories = createAsyncThunk<
  CategoryType[],
  { page: number; limit: number },
  { rejectValue: string; state: { category: StateType } }
>(
  "category/getAllCategories",
  async ({ page, limit }, { rejectWithValue, getState }) => {
    try {
      const state = getState().category;

      if (!state.hasMore) {
        return [];
      }
      const { data } = await axios.get(
        `/api/courses/getAllCategories/?page=${page}&limit=${limit}`
      );
      if (data.categories.length === 0) {
        return rejectWithValue("No more categories");
      }
      return data.categories;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch categories"
      );
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    increment: (state) => {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        const uniqueCategories = action.payload.filter(
          (newCat) => !state.categories.some((cat) => cat._id === newCat._id)
        );

        state.categories = [...state.categories, ...uniqueCategories];

        if (action.payload.length < state.limit) {
          state.hasMore = false;
        }
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload === "No more categories") {
          state.hasMore = false;
        } else {
          state.error = action.payload || "Failed to fetch categories";
        }
      });
  },
});

export const { increment } = categorySlice.actions;

export default categorySlice.reducer;
