import axios from "axios";

const API_URL = "http://localhost:8000/api/reviews";

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

const reviewService = {
  createReview,
};

export default reviewService;
