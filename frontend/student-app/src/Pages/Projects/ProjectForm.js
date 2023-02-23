import { useState } from 'react';
import axios from 'axios';
import './styles.css';

function ProjectForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [links, setLinks] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsSubmitting(true);

    const formData = {
      title,
      description,
      links,
    };

    // Send form data to server using axios
    axios.post('http://localhost:8000/api/project', formData)
      .then((response) => {
        setIsSubmitting(false);

        // Handle success response 
        console.log('Success:', response.data);
      })
      .catch((error) => {
        setIsSubmitting(false);
        console.error('Error:', error);
        // Handle error response
        setErrorMessage('There was an error submitting the form. Please try again later.');
      });

    // Reset the form fields
    setTitle('');
    setDescription('');
    setLinks('');
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label>
        Project title:
        <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
      </label>
      <br />
      <label >
        Description:
        <textarea value={description} onChange={(event) => setDescription(event.target.value)} />
      </label>
      <br />
      <label>
        Project links:
        <input type="text" value={links} onChange={(event) => setLinks(event.target.value)} />
      </label>
      <br />
      {isSubmitting ? (
        <p>Submitting form...</p>
      ) : (
        <button type="submit" className='button'>Submit</button>
      )}
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
}

export default ProjectForm;
