import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reviewService from "../reducers/reviewService";

const initialState = {
  reviews: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//create review
export const createReview = createAsyncThunk(
  "reviews/create",
  async (reviewData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await reviewService.createReview(reviewData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.reviews.push = action.payload;
      })
      .addCase(createReview.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = reviewSlice.actions;
export default reviewSlice.reducer;
