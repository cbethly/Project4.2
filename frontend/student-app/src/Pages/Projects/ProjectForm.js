import { useState } from "react";
import { useDispatch } from "react-redux";
import { createProject } from "../../reducers/projectSlice";

import "./styles.css";

function ProjectForm() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [link, setLink] = useState("");
  const [user, setUser] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsSubmitting(true);

    const project = {
      title,
      category,
      description,
      link,
      githubLink,
      user,
    };
    dispatch(createProject({ project }));
    setIsSubmitting(false);
    setSuccessMessage("Project submitted successfully");
    setErrorMessage(
      'There was an error submitting your project. Please try again later."'
    );
  };

  const options = [
    { value: "web", label: "Web" },
    { value: "ai", label: "AI" },
    { value: "android", label: "Android" },
    { value: "iot", label: "IoT" },
    { value: "cybersecurity", label: "Cybersecurity" },
  ];

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
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="">Select a category</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
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
        <label>
          User:
          <input
            type="text"
            value={user}
            onChange={(event) => setUser(event.target.value)}
          />
        </label>
        <br />
        {isSubmitting ? (
          <p>Submitting form...</p>
        ) : (
          <button type="submit" className="submit-button">
            Upload Project
          </button>
        )}
        {successMessage && <p>{successMessage}</p>}
        {errorMessage && <p>{errorMessage}</p>}
      </form>
      <pre>{JSON.stringify(user)}</pre>
    </div>
  );
}

export default ProjectForm;
