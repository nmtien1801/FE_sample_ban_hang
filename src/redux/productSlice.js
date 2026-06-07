import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiProduct from "../apis/ApiProduct.js";

const initialState = {
  ProductList: [],
  ProductTotal: 0,
  ProductDropdown: [],
  searchResults: [],
  isSearching: false,
};

export const getListProduct = createAsyncThunk(
  "product/getListProduct",
  async ({ page, limit, keyword }, thunkAPI) => {
    const response = await ApiProduct.getListProductApi(page, limit, keyword);
    return response;
  },
);

export const getListProductDropdown = createAsyncThunk(
  "product/getListProductDropdown",
  async (thunkAPI) => {
    const response = await ApiProduct.getListProductDropdownApi();
    return response;
  },
);

const productSlice = createSlice({
  name: "product",
  initialState,

  reducers: {
    resetProduct: (state) => {
      return initialState;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
      state.isSearching = true;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.isSearching = false;
    },
  },

  extraReducers: (builder) => {
    // getListProduct
    builder
      .addCase(getListProduct.pending, (state) => {})
      .addCase(getListProduct.fulfilled, (state, action) => {
        state.ProductList = action.payload.DT.products;
        state.ProductTotal = action.payload.DT.total;
      })
      .addCase(getListProduct.rejected, (state, action) => {});

    // getListProductDropdown
    builder
      .addCase(getListProductDropdown.pending, (state) => {})
      .addCase(getListProductDropdown.fulfilled, (state, action) => {
        state.ProductDropdown = action.payload.DT;
      })
      .addCase(getListProductDropdown.rejected, (state, action) => {});
  },
});

// Export actions
export const { resetProduct, setSearchResults, clearSearchResults } =
  productSlice.actions;

// Export reducer
export default productSlice.reducer;
