import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiPost from "../apis/ApiPost.js";

const initialState = {
  PostList: [],
  PostTotal: 0,
};

export const getListPost = createAsyncThunk(
  "post/getListPost",
  async ({ page, limit }, thunkAPI) => {
    const response = await ApiPost.getListPostApi(page, limit);
    return response;
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,

  reducers: {
    resetPost: (state) => {
      return initialState;
    },
  },

  extraReducers: (builder) => {
    // getListPost
    builder
      .addCase(getListPost.pending, (state) => {})
      .addCase(getListPost.fulfilled, (state, action) => {
        state.PostList = action.payload.DT.posts;
        state.PostTotal = action.payload.DT.total;
      })
      .addCase(getListPost.rejected, (state, action) => {});
  },
});

// Export actions
export const { resetPost } = postSlice.actions;

// Export reducer
export default postSlice.reducer;
