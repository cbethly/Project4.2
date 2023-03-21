import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { createReview } from "../../reducers/reviewSlice";

function Review() {
  const [reviews, setReviews] = useState("");

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setReviews(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(reviews);

    dispatch(createReview({ reviews }));
    setReviews("");
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="">
          <Form.Label>Comments</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="comments"
            placeholder="Enter comments"
            value={reviews}
            onChange={handleInputChange}
          />
        </Form.Group>
        <div className="form-group">
          <Button variant="primary" type="submit">
            Send
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Review;
