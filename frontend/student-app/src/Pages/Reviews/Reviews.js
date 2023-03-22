import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { createReview } from "../../reducers/reviewSlice";
import "./reviews.css";

function Review() {
  const [text, setComments] = useState("");

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setComments(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(text);

    dispatch(createReview({ text }));
    setComments("");
  };

  return (
    <div className="review-form" style={{ marginTop: "20px", padding: "20px" }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="">
          <Form.Label>Add a Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="comments"
            placeholder="Enter comments"
            value={text}
            onChange={handleInputChange}
          />
        </Form.Group>
        <div className="form-group">
          <Button variant="primary" type="submit">
            Post
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Review;
