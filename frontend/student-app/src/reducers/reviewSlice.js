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

//get user reviews

export const getUserReviews = createAsyncThunk(
  "reviews/getUserReviews",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await reviewService.getUserReviews(token);
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

//delete review

export const deleteReviews = createAsyncThunk(
  "reviews/delete",
  async (reviewId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await reviewService.deleteReviews(reviewId, token);
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
        state.reviews.push(action.payload);
      })
      .addCase(createReview.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(getUserReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserReviews.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.reviews = action.payload;
      })
      .addCase(getUserReviews.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(deleteReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteReviews.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.reviews = state.reviews.filter(
          (review) => review.id !== action.payload
        );
      })
      .addCase(deleteReviews.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = reviewSlice.actions;
export default reviewSlice.reducer;
