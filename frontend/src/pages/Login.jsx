// import React, { useState } from "react";
// import API from "../services/api";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       const { data } = await API.post("/auth/login", { email, password });
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));
//       navigate("/");
//     } catch (err) { alert(err.response?.data?.message || "Login failed"); }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-4 border rounded">
//       <h2 className="text-xl mb-4">Login</h2>
//       <input className="border p-2 w-full mb-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
//       <input className="border p-2 w-full mb-2" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
//       <button className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
//     </form>
//   );
// }

import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container className="login-wrapper d-flex justify-content-center align-items-center">
      <Card className="login-card shadow p-4">
        <h2 className="login-title gradient-text mb-3 text-center">Login</h2>
        <Form onSubmit={handleSubmit}>
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
          <Button type="submit" className="w-100 btn-gradient">Login</Button>
        </Form>
      </Card>
    </Container>
  );
}
