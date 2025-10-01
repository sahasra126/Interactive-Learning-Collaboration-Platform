// import React, { useEffect, useState } from "react";
// import API from "../services/api";
// import './ContentList.css'
// export default function ContentList() {
//   const [contents,setContents]=useState([]);

//   useEffect(()=>{ API.get("/contents").then(res=>setContents(res.data)); },[]);

//   return (
//     <div className="p-4">
//       <h2 className="text-xl mb-4">All Contents</h2>
//       <ul>
//         {contents.map(c=>(
//           <li key={c._id} className="border p-2 mb-2 rounded">
//             <strong>{c.title}</strong> by {c.author.name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import API from "../services/api";
import './ContentList.css'; // Your beautiful CSS

export default function ContentList() {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/contents")
      .then(res => setContents(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="loading-container">
      <h2>Loading contents...</h2>
    </div>
  );

  return (
    <div className="dashboard-wrapper container">
      <h2 className="section-title mb-4">All Learning Contents</h2>
      <div className="row g-4">
        {contents.map((c, idx) => (
          <div className="col-md-6 col-lg-4" key={c._id}>
            <div className="content-card p-3">
              <h3 className="content-title">{c.title}</h3>
              
              {c.videoUrl ? (
                <div className="video-wrapper mb-3">
                  <iframe
                    src={c.videoUrl}
                    title={c.title}
                    width="100%"
                    height="180"
                  ></iframe>
                </div>
              ) : (
                <div className="video-placeholder mb-3">
                  <span className="placeholder-icon">🎥</span>
                </div>
              )}

              <p className="content-description">{c.description}</p>

              <div className="author-info">
                <div className="author-avatar">
                  {c.author.name[0].toUpperCase()}
                </div>
                <small>{c.author.name}</small>
              </div>

              <button className="btn-details mt-3 w-100">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
