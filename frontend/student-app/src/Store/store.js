import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authSlice";
import reviewReducer from "../reducers/reviewSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    reviews: reviewReducer,
  },
});
