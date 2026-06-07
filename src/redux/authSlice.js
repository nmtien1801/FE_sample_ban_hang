import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiAuth from "../apis/ApiAuth.js";
import Cookies from "js-cookie";

const getInitialUserInfo = () => {
  try {
    const userInfo = localStorage.getItem("userInfo");
    return userInfo ? JSON.parse(userInfo) : {};
  } catch (error) {
    return {};
  }
};

const initialState = {
  userInfo: getInitialUserInfo(),
  isLoading: false,
  hasCheckedAuth: false,
  UserList: [],
  UserTotal: 0,
};

export const Login = createAsyncThunk("auth/Login", async (data, thunkAPI) => {
  const response = await ApiAuth.LoginApi(data);
  return response;
});

export const Register = createAsyncThunk(
  "auth/Register",
  async (data, thunkAPI) => {
    const response = await ApiAuth.RegisterApi(data);
    return response;
  }
);

export const UpdateProfile = createAsyncThunk(
  "auth/UpdateProfile",
  async (data, thunkAPI) => {
    const response = await ApiAuth.UpdateProfileApi(data);
    return response;
  }
);

export const GetAccount = createAsyncThunk(
  "auth/GetAccount",
  async (data, thunkAPI) => {
    const response = await ApiAuth.GetAccountApi(data);
    return response;
  }
);

export const getListUser = createAsyncThunk(
  "auth/getListUser",
  async ({ page, limit }, thunkAPI) => {
    const response = await ApiAuth.getListUserApi(page, limit);
    return response;
  }
);

export const logout = createAsyncThunk(
  "auth/Logout",
  async (_, { dispatch }) => {
    Cookies.remove("fr");
    Cookies.remove("refreshToken");
    localStorage.removeItem("userInfo");
    // dispatch(resetLearningClass());

    return null;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    // Login
    builder
      .addCase(Login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Login.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.EC === 0) {
          state.userInfo = action.payload.DT || {};
          localStorage.setItem("userInfo", JSON.stringify(action.payload.DT));
        }
      })
      .addCase(Login.rejected, (state, action) => {
        state.isLoading = false;
      });

    // Register
    builder
      .addCase(Register.pending, (state) => {})
      .addCase(Register.fulfilled, (state, action) => {})
      .addCase(Register.rejected, (state, action) => {});

    // GetAccount
    builder
      .addCase(GetAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetAccount.fulfilled, (state, action) => {
        if (action.payload.EC === 0) {
          state.userInfo = action.payload.DT || {};
          localStorage.setItem("userInfo", JSON.stringify(action.payload.DT));
        }
        state.isLoading = false;
        state.hasCheckedAuth = true;
      })
      .addCase(GetAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.hasCheckedAuth = true;
        // Clear userInfo if GetAccount fails
        state.userInfo = {};
        localStorage.removeItem("userInfo");
      });

    // logout
    builder.addCase(logout.fulfilled, (state) => {
      state.userInfo = {};
      state.isLoading = false;
      state.hasCheckedAuth = true;
    });

    // UpdateProfile
    builder
      .addCase(UpdateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UpdateProfile.fulfilled, (state, action) => {
        if (action.payload.EC === 0) {
          state.userInfo = action.payload.DT || {};
          localStorage.setItem("userInfo", JSON.stringify(action.payload.DT));
        }
        state.isLoading = false;
      })
      .addCase(UpdateProfile.rejected, (state, action) => {
        state.isLoading = false;
      });

    // getListUser
    builder
      .addCase(getListUser.pending, (state) => {})
      .addCase(getListUser.fulfilled, (state, action) => {
        state.UserList = action.payload.DT.user;
        state.UserTotal = action.payload.DT.total;
      })
      .addCase(getListUser.rejected, (state, action) => {});
  },
});

// Export actions
export const {} = authSlice.actions;

// Export reducer
export default authSlice.reducer;
