import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiCategory from "../apis/ApiCategory.js"; // Giả định bạn đổi tên file API tương ứng

const initialState = {
  CategoryList: [],
  CategoryTotal: 0,
};

// Thunk để lấy danh sách danh mục
export const getListCategory = createAsyncThunk(
  "category/getListCategory",
  async ({ page, limit }, thunkAPI) => {
    // Gọi sang ApiCategory
    const response = await ApiCategory.getListCategoryApi(page, limit);
    return response;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,

  reducers: {
    resetCategory: (state) => {
      return initialState;
    },
  },

  extraReducers: (builder) => {
    // getListCategory
    builder
      .addCase(getListCategory.pending, (state) => {})
      .addCase(getListCategory.fulfilled, (state, action) => {
        state.CategoryList = action.payload.DT.categories;
        state.CategoryTotal = action.payload.DT.total;
      })
      .addCase(getListCategory.rejected, (state, action) => {});
  },
});

// Export actions
export const { resetCategory } = categorySlice.actions;

// Export reducer
export default categorySlice.reducer;
