// import React, { useState, useEffect } from "react";
// import API from "../services/api";
// import { Card, Badge, ProgressBar, Collapse } from "react-bootstrap";

// export default function Dashboard() {
//   const [contents, setContents] = useState([]);
//   const [user, setUser] = useState(null);
//   const [open, setOpen] = useState({}); // for collapsible cards

//   useEffect(() => {
//     API.get("/content").then(res => setContents(res.data));
//     API.get("/user/profile").then(res => setUser(res.data));
//   }, []);

//   if (!user) return <p>Loading...</p>;

//   const getBadge = () =>
//     user.points < 21 ? { text: "Rookie", color: "secondary" } :
//     user.points < 51 ? { text: "Contributor", color: "info" } :
//     { text: "Mentor", color: "success" };

//   return (
//     <div className="container my-4">
//       <h2 className="mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>Welcome, {user.name}</h2>

//       {/* Points + Badge */}
//       <div className="mb-4">
//         <ProgressBar now={Math.min(user.points, 100)} label={`${user.points} pts`} className="mb-2" />
//         <Badge bg={getBadge().color}>{getBadge().text}</Badge>
//       </div>

//       <h4 className="mb-3">Recently Added Content</h4>
//       <div className="row">
//         {contents.slice(-6).map((c, idx) => (
//           <div className="col-md-6 col-lg-4 mb-4" key={c._id}>
//             <Card className="shadow-sm h-100">
//               <Card.Body>
//                 <Card.Title>{c.title}</Card.Title>
//                 {c.videoUrl && (
//                   <div className="mb-2">
//                     <iframe
//                       width="100%"
//                       height="180"
//                       src={c.videoUrl}
//                       title={c.title}
//                       className="rounded"
//                     ></iframe>
//                   </div>
//                 )}
//                 <Collapse in={open[idx]}>
//                   <div>
//                     <Card.Text>{c.description}</Card.Text>
//                   </div>
//                 </Collapse>
//                 <button
//                   className="btn btn-sm btn-outline-primary mt-2"
//                   onClick={() => setOpen({ ...open, [idx]: !open[idx] })}
//                 >
//                   {open[idx] ? "Hide Details" : "View Details"}
//                 </button>
//                 <div className="mt-2">
//                   <small className="text-muted">By {c.author?.name}</small>
//                 </div>
//               </Card.Body>
//             </Card>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import API from "../services/api";
import { Card, Badge, ProgressBar, Collapse } from "react-bootstrap";
import "./Dashboard.css"; // Import the CSS file

export default function Dashboard() {
  const [contents, setContents] = useState([]);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState({}); // for collapsible cards

  useEffect(() => {
    API.get("/content").then(res => setContents(res.data));
    API.get("/user/profile").then(res => setUser(res.data));
  }, []);

  if (!user) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading your dashboard...</p>
      </div>
    );
  }

  const getBadge = () =>
    user.points < 21 ? { text: "🌱 Rookie", color: "secondary" } :
    user.points < 51 ? { text: "⭐ Contributor", color: "info" } :
    { text: "🏆 Mentor", color: "success" };

  return (
    <div className="dashboard-wrapper">
      <div className="container my-4">
        {/* Welcome Header */}
        <div className="welcome-card mb-4">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h2 className="welcome-title mb-2">
                Welcome back, <span className="gradient-text">{user.name}</span>
              </h2>
              <p className="welcome-subtitle">Continue your learning journey today</p>
            </div>
            <div className="col-md-4 text-md-end mt-3 mt-md-0">
              <Badge bg={getBadge().color} className="badge-lg">
                {getBadge().text}
              </Badge>
            </div>
          </div>
        </div>

        {/* Points + Progress Section */}
        <div className="stats-card mb-4">
          <div className="stats-header mb-3">
            <div>
              <h5 className="stats-label">Your Points</h5>
              <h3 className="stats-value">{user.points}</h3>
            </div>
            <div className="stats-icon">🎯</div>
          </div>
          <ProgressBar 
            now={Math.min(user.points, 100)} 
            label={`${user.points} pts`} 
            className="custom-progress mb-2" 
          />
          <small className="text-muted">
            {user.points < 21 ? 21 - user.points : user.points < 51 ? 51 - user.points : 100 - user.points} points to next level
          </small>
        </div>

        {/* Recently Added Content */}
        <h4 className="section-title mb-4">Recently Added Content</h4>
        <div className="row">
          {contents.slice(-6).map((c, idx) => (
            <div className="col-md-6 col-lg-4 mb-4" key={c._id}>
              <Card className="content-card h-100">
                <Card.Body>
                  <Card.Title className="content-title">{c.title}</Card.Title>
                  
                  {c.videoUrl && (
                    <div className="video-wrapper mb-3">
                      <iframe
                        width="100%"
                        height="180"
                        src={c.videoUrl}
                        title={c.title}
                        className="rounded"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      ></iframe>
                    </div>
                  )}
                  
                  {!c.videoUrl && (
                    <div className="video-placeholder mb-3">
                      <span className="placeholder-icon">📚</span>
                    </div>
                  )}
                  
                  <Collapse in={open[idx]}>
                    <div>
                      <Card.Text className="content-description">
                        {c.description}
                      </Card.Text>
                    </div>
                  </Collapse>
                  
                  <button
                    className="btn btn-primary btn-details w-100 mt-3"
                    onClick={() => setOpen({ ...open, [idx]: !open[idx] })}
                  >
                    {open[idx] ? "Hide Details ▲" : "View Details ▼"}
                  </button>
                  
                  <div className="author-info mt-3">
                    <div className="author-avatar">
                      {c.author?.name?.charAt(0) || "A"}
                    </div>
                    <small className="text-muted">By {c.author?.name || "Anonymous"}</small>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}