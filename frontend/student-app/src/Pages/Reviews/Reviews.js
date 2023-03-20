import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Review({ projectId }) {
  const [reviewData, setReviewData] = useState({ title: "", comments: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedComments, setSubmittedComments] = useState([]);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZWYxMDJjMmNlMzZiMzllMDk3ZGVlMiIsImlhdCI6MTY3NjYxNzU0NSwiZXhwIjoxNjc5MjA5NTQ1fQ.EGH_TE1v63Fvge9DEGXmy7Aebfqi36t9z1njnqp8qgM";
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    fetch("http://localhost:8000/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // replace token with your authentication token
      },
      body: JSON.stringify({ ...reviewData, project_id: projectId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to submit review.");
        }
        return response.json();
      })
      .then((data) => {
        alert("Review submitted successfully!");
        setSubmittedComments([
          ...submittedComments,
          { comments: data.comments },
        ]);

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
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="">
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
      <div>
        {submittedComments.map((comment) => (
          <div key={comment.id}>
            <p>{comment.comments}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Review;
