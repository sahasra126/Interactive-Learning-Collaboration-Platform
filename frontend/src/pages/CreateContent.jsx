// import React, { useState } from "react";
// import API from "../services/api";
// import { Form, Button, Container } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// export default function CreateContent() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [videoUrl, setVideoUrl] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async e => {
//     e.preventDefault();
//     await API.post("/content", { title, description, videoUrl });
//     alert("Content created successfully!");
//     navigate("/");
//   };

//   return (
//     <Container className="my-4">
//       <h2>Create Learning Content</h2>
//       <Form onSubmit={handleSubmit}>
//         <Form.Control
//           placeholder="Title"
//           className="mb-2"
//           value={title}
//           onChange={e => setTitle(e.target.value)}
//         />
//         <Form.Control
//           as="textarea"
//           rows={3}
//           placeholder="Description"
//           className="mb-2"
//           value={description}
//           onChange={e => setDescription(e.target.value)}
//         />
//         <Form.Control
//           placeholder="Video URL (YouTube/Docs)"
//           className="mb-2"
//           value={videoUrl}
//           onChange={e => setVideoUrl(e.target.value)}
//         />
//         <Button variant="success" type="submit">Submit</Button>
//       </Form>
//     </Container>
//   );
// }


import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import './CreateContent.css'; // We'll create this CSS below

export default function CreateContent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post("/content", { title, description, videoUrl });
      alert("Content created successfully!");
      navigate("/");
    } catch (err) {
      alert("Error creating content");
      console.error(err);
    }
  };

  return (
    <div className="dashboard-wrapper d-flex justify-content-center align-items-center">
      <div className="create-card p-4">
        <h2 className="create-title mb-4 text-center">Create Learning Content</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            className="form-control mb-3"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <textarea
            rows={4}
            placeholder="Description"
            className="form-control mb-3"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Video URL (YouTube/Docs)"
            className="form-control mb-3"
            value={videoUrl}
            onChange={e => setVideoUrl(e.target.value)}
          />
          <button className="btn-submit w-100" type="submit">Submit Content</button>
        </form>
      </div>
    </div>
  );
}
