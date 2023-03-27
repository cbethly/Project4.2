import axios from "axios";

const API_URL = "http://localhost:5000/api/reviews/";

//create review

const createReview = async (reviewData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, reviewData, config);

  return response.data;
};

//get user reviews

const getUserReviews = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// delete reviews
const deleteReviews = async (reviewId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + reviewId, config);

  return response.data;
};

const reviewService = {
  createReview,
  getUserReviews,
  deleteReviews,
};

export default reviewService;
