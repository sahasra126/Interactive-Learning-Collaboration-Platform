import React, { useState, useEffect } from "react";
import API from "../services/api";
import { Card, Button, ListGroup, Form } from "react-bootstrap";
import './Forum.css';

export default function Forum() {
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState("");

  const fetchPosts = async () => {
    const { data } = await API.get("/forum");
    setPosts(data);
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    await API.post("/forum", { question, description });
    setQuestion(""); setDescription("");
    fetchPosts();
  };

  const handleComment = async (postId) => {
    if (!commentText) return;
    await API.post(`/forum/${postId}/comment`, { text: commentText });
    setCommentText("");
    fetchPosts();
  };

  return (
    <div className="forum-wrapper container my-5">
      <h2 className="forum-title mb-4 text-center gradient-text">Discussion Forum</h2>
      
      <Form onSubmit={handleSubmit} className="mb-5 forum-form p-3 rounded shadow">
        <Form.Control
          placeholder="Question"
          className="mb-2"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          required
        />
        <Form.Control
          as="textarea"
          rows={2}
          placeholder="Description"
          className="mb-2"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        <Button type="submit" className="btn-submit w-100">Post Question</Button>
      </Form>

      {posts.map(p => (
        <Card className="mb-4 forum-card" key={p._id}>
          <Card.Body>
            <Card.Title className="gradient-text">{p.question}</Card.Title>
            <Card.Text>{p.description}</Card.Text>
            <small className="text-muted">By {p.author?.name}</small>

            <ListGroup className="mt-3">
              {p.comments.map((c,i) => (
                <ListGroup.Item key={i} className="comment-item">
                  {c.text} <small className="text-muted">- {c.author?.name}</small>
                </ListGroup.Item>
              ))}
            </ListGroup>

            <Form.Control
              placeholder="Add comment"
              className="mt-3 mb-2 comment-input"
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
            />
            <Button size="sm" className="btn-comment" onClick={() => handleComment(p._id)}>Comment</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
