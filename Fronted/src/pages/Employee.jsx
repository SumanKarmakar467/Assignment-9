import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api";
const EMPLOYEE_EMAILS = ["employee@gmail.com", "employee@gmial.com"];

const Employee = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [visitors, setVisitors] = useState([]);

  const fetchVisitors = async () => {
    const response = await fetch(`${API_URL}/employee`);
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

  const loginEmployee = () => {
    if (EMPLOYEE_EMAILS.includes(email)) {
      setIsLoggedIn(true);
    } else {
      alert("Use employee@gmail.com");
    }
  };

  const updateStatus = async (id, status) => {
    await fetch(`${API_URL}/employee/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    fetchVisitors();
  };

  return (
    <div className="page">
      <button type="button" className="back-button" onClick={() => navigate("/")}>
        Back
      </button>

      {!isLoggedIn ? (
        <div className="panel small-panel">
          <h1>Employee Login</h1>
          <input
            className="inputs"
            type="email"
            value={email}
            placeholder="employee@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="submit" onClick={loginEmployee}>
            Show Visitors
          </button>
        </div>
      ) : (
        <div className="employee">
          <h1 className="heading-employee">Visitor Appointments</h1>

          {visitors.map((visitor) => (
            <div key={visitor._id} className="visitor-list">
              <h3 className="visitor-name">{visitor.name}</h3>
              <p>Email: {visitor.email}</p>
              <p>Purpose: {visitor.purpose}</p>
              <p>Date: {new Date(visitor.date).toLocaleDateString()}</p>
              <p>Status: {visitor.status}</p>

              {visitor.status === "Pending" && (
                <div className="button-row">
                  <button className="approve" onClick={() => updateStatus(visitor._id, "Approved")}>
                    Approve
                  </button>
                  <button className="reject" onClick={() => updateStatus(visitor._id, "Rejected")}>
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Employee;
