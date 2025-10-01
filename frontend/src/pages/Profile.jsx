import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Container, Badge, ProgressBar, Card } from "react-bootstrap";
import './Profile.css';

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get("/user/profile").then(res => setUser(res.data));
  }, []);

  if (!user) return (
    <div className="loading-container">
      Loading Profile...
    </div>
  );

  const getBadge = () =>
    user.points < 21 ? { text: "Rookie", color: "secondary" } :
    user.points < 51 ? { text: "Contributor", color: "info" } :
    { text: "Mentor", color: "success" };

  return (
    <Container className="my-5 profile-wrapper">
      <Card className="profile-card shadow-sm p-4">
        <h2 className="profile-title gradient-text mb-3">Your Profile</h2>
        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Role:</b> {user.role}</p>

        <h5 className="mt-3">Points</h5>
        <ProgressBar 
          now={Math.min(user.points,100)} 
          label={`${user.points} pts`} 
          className="mb-3 custom-progress-bar" 
        />

        <Badge pill bg={getBadge().color} className="profile-badge">
          {getBadge().text}
        </Badge>
      </Card>
    </Container>
  );
}
