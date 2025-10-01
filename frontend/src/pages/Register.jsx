// import React, { useState } from "react";
// import API from "../services/api";
// import { useNavigate } from "react-router-dom";

// export default function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("learner");
//   const navigate = useNavigate();

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       await API.post("/auth/register", { name, email, password, role });
//       alert("Registered successfully! Please login.");
//       navigate("/login");
//     } catch (err) {
//       alert(err.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="container mt-5 p-4 border rounded">
//       <h2 className="mb-3">Register</h2>
//       <input className="form-control mb-2" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
//       <input className="form-control mb-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
//       <input className="form-control mb-2" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
//       <select className="form-control mb-3" value={role} onChange={e => setRole(e.target.value)}>
//         <option value="learner">Learner</option>
//         <option value="mentor">Mentor</option>
//       </select>
//       <button className="btn btn-primary w-100">Register</button>
//     </form>
//   );
// }

import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";
import './Register.css';

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("learner");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post("/auth/register", { name, email, password, role });
      alert("Registered successfully! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Container className="register-wrapper d-flex justify-content-center align-items-center">
      <Card className="register-card shadow p-4">
        <h2 className="register-title gradient-text mb-4 text-center">Register</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Control
            type="text"
            placeholder="Name"
            className="mb-3"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Form.Control
            type="email"
            placeholder="Email"
            className="mb-3"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Form.Control
            type="password"
            placeholder="Password"
            className="mb-3"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Form.Select
            className="mb-4"
            value={role}
            onChange={e => setRole(e.target.value)}
          >
            <option value="learner">Learner</option>
            <option value="mentor">Mentor</option>
          </Form.Select>
          <Button type="submit" className="w-100 btn-gradient">Register</Button>
        </Form>
      </Card>
    </Container>
  );
}
