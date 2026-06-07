import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiRecruitment from "../apis/ApiRecruitment.js";

const initialState = {
  RecruitmentList: [],
  RecruitmentTotal: 0,
};

export const getListRecruitment = createAsyncThunk(
  "recruitment/getListRecruitment",
  async ({ page, limit }, thunkAPI) => {
    const response = await ApiRecruitment.getListRecruitmentApi(page, limit);
    return response;
  }
);

const recruitmentSlice = createSlice({
  name: "recruitment",
  initialState,

  reducers: {
    resetRecruitment: (state) => {
      return initialState;
    },
  },

  extraReducers: (builder) => {
    // getListRecruitment
    builder
      .addCase(getListRecruitment.pending, (state) => {})
      .addCase(getListRecruitment.fulfilled, (state, action) => {
        state.RecruitmentList = action.payload.DT.recruitments;
        state.RecruitmentTotal = action.payload.DT.total;
      })
      .addCase(getListRecruitment.rejected, (state, action) => {});
  },
});

// Export actions
export const { resetRecruitment } = recruitmentSlice.actions;

// Export reducer
export default recruitmentSlice.reducer;
