import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Review({ projectId }) {
  const [reviewData, setReviewData] = useState({ title: "", comments: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    fetch("http://localhost:8000/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...reviewData, project_id: projectId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to submit review.");
        }
        return response.json();
      })
      .then(() => {
        alert("Review submitted successfully!");
        setReviewData({ title: "", comments: "" });
      })
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="reviewTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          placeholder="Enter review title"
          value={reviewData.title}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="reviewcomments">
        <Form.Label>Comments</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="comments"
          placeholder="Enter review comments"
          value={reviewData.comments}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
}

export default Review;
