import { useState } from "react";
import axios from "axios";

import "./styles.css";

function ProjectForm() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsSubmitting(true);

    const formData = {
      user: "63f7e0c33cd721f735109140",
      title,
      category,
      description,
      link,
      githubLink,
    };

    // Send form data to server using axios
    axios
      .post("http://localhost:8000/api/project", formData)
      .then((response) => {
        setIsSubmitting(false);

        // Handle success response
        console.log("Success:", response.data);
        const projectId = response?.data?._id;
        setSuccessMessage(`Project ${projectId} was submitted Successfully`);
      })

      .catch((error) => {
        setIsSubmitting(false);
        console.error("Error:", error);
        // Handle error response
        setErrorMessage(
          "There was an error submitting the form. Please try again later."
        );
      });

    // Reset the form fields
    setTitle("");
    setCategory("");
    setDescription("");
    setLink("");
    setGithubLink("");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <label>
          Project Title:
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <br />
        <label>
          Category:
          <input
            type="text"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            placeholder="Web, AI, Android, IOT, Cybersecurity ...."
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        <br />
        <label>
          Project link:
          <input
            type="text"
            value={link}
            onChange={(event) => setLink(event.target.value)}
          />
        </label>
        <br />
        <label>
          Github link:
          <input
            type="text"
            value={githubLink}
            onChange={(event) => setGithubLink(event.target.value)}
          />
        </label>
        <br />
        {isSubmitting ? (
          <p>Submitting form...</p>
        ) : (
          <button type="submit" className="submit-button">
            Submit
          </button>
        )}
        {successMessage && <p>{successMessage}</p>}
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default ProjectForm;
