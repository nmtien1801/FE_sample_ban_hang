import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import staffReducer from "./staffSlice";
import productReducer from "./productSlice";
import categoryReducer from "./categorySlice";
import postReducer from "./postSlice";
import recruitmentReducer from "./recruitmentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    staff: staffReducer,
    product: productReducer,
    category: categoryReducer,
    post: postReducer,
    recruitment: recruitmentReducer,
  },
});
