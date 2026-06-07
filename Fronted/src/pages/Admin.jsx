import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SERVER_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_URL = `${SERVER_URL}/api`;
const ADMIN_EMAIL = "admin@gmail.com";

const Admin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [visitors, setVisitors] = useState([]);

  const getImageUrl = (image) => {
    if (!image) {
      return "";
    }

    return `${SERVER_URL}/uploads/${image}`;
  };

  const fetchVisitors = async () => {
    const response = await fetch(`${API_URL}/admin`);
    const data = await response.json();

    if (response.ok) {
      setVisitors(data);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchVisitors();
    }
  }, [isLoggedIn]);

  const loginAdmin = () => {
    if (email === ADMIN_EMAIL) {
      setIsLoggedIn(true);
    } else {
      alert("Use admin@gmail.com");
    }
  };

  const deleteVisitor = async (id) => {
    await fetch(`${API_URL}/admin/${id}`, {
      method: "DELETE",
    });

    fetchVisitors();
  };

  const formatTime = (time) => {
    if (!time) {
      return "Not recorded";
    }

    return new Date(time).toLocaleString();
  };

  return (
    <div className="page">
      <button type="button" className="back-button" onClick={() => navigate("/")}>
        Back
      </button>

      {!isLoggedIn ? (
        <div className="panel small-panel">
          <h1>Admin Login</h1>
          <input
            className="inputs"
            type="email"
            value={email}
            placeholder="admin@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="submit" onClick={loginAdmin}>
            Show Report
          </button>
        </div>
      ) : (
        <div className="employee">
          <h1 className="heading-employee">Admin Report</h1>

          {visitors.map((visitor) => (
            <div key={visitor._id} className="visitor-list">
              {visitor.image && (
                <img
                  className="visitor-photo"
                  alt={visitor.name}
                  src={getImageUrl(visitor.image)}
                />
              )}
              <h3 className="visitor-name">{visitor.name}</h3>
              <p>Email: {visitor.email}</p>
              <p>Purpose: {visitor.purpose}</p>
              <p>Date: {new Date(visitor.date).toLocaleDateString()}</p>
              <p>Status: {visitor.status}</p>
              <p>Check In: {formatTime(visitor.checkInTime)}</p>
              <p>Check Out: {formatTime(visitor.checkOutTime)}</p>

              <button className="reject" onClick={() => deleteVisitor(visitor._id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;
