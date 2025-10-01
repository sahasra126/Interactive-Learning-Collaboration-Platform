import React, { useState, useEffect } from "react";
import API from "../services/api";
import './LeaderBoard.css';

export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/leaderboard").then(res => setUsers(res.data));
  }, []);

  return (
    <div className="leaderboard-wrapper container my-5">
      <h2 className="section-title mb-4 text-center">Leaderboard</h2>
      <div className="table-responsive leaderboard-card shadow-sm rounded">
        <table className="table table-bordered mb-0 text-center align-middle">
          <thead className="table-header">
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Role</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u._id} className="table-row">
                <td>{i + 1}</td>
                <td>{u.name}</td>
                <td>{u.role}</td>
                <td>{u.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
