import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiStaff from "../apis/ApiStaff.js";

const initialState = {
  listStaff: [],
};

export const getListStaff = createAsyncThunk(
  "staff/getListStaff",
  async (thunkAPI) => {
    const response = await ApiStaff.getListStaffApi();
    return response;
  }
);

const staffSlice = createSlice({
  name: "staff",
  initialState,

  reducers: {
    resetStaff: (state) => {
      return initialState;
    },
  },

  extraReducers: (builder) => {
    // getListStaff
    builder
      .addCase(getListStaff.pending, (state) => {})
      .addCase(getListStaff.fulfilled, (state, action) => {
        state.listStaff = action.payload.DT;
        
      })
      .addCase(getListStaff.rejected, (state, action) => {});
  },
});

// Export actions
export const { resetStaff } = staffSlice.actions;

// Export reducer
export default staffSlice.reducer;
