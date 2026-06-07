import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SERVER_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_URL = `${SERVER_URL}/api`;
const EMPLOYEE_EMAILS = ["employee@gmail.com", "employee@gmial.com"];

const Employee = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [visitors, setVisitors] = useState([]);
  const [visitorEmail, setVisitorEmail] = useState("");

  const visitorFormLink = `${window.location.origin}/visitors`;

  const getImageUrl = (image) => {
    if (!image) {
      return "";
    }

    return `${SERVER_URL}/uploads/${image}`;
  };

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

  const copyInviteLink = async () => {
    await navigator.clipboard.writeText(visitorFormLink);
    alert("Visitor form link copied");
  };

  const sendInviteEmail = () => {
    if (!visitorEmail) {
      alert("Enter visitor email first");
      return;
    }

    const subject = "Visitor Appointment Form";
    const body = `Hello, please fill this visitor appointment form: ${visitorFormLink}`;

    window.location.href = `mailto:${visitorEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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

          <div className="invite-box">
            <h2>Invite Visitor</h2>
            <p>Share this link with a visitor so they can fill the visitor form.</p>
            <input className="inputs" type="text" value={visitorFormLink} readOnly />
            <input
              className="inputs"
              type="email"
              value={visitorEmail}
              placeholder="Visitor email"
              onChange={(e) => setVisitorEmail(e.target.value)}
            />
            <div className="button-row">
              <button className="submit" type="button" onClick={copyInviteLink}>
                Copy Link
              </button>
              <button className="approve" type="button" onClick={sendInviteEmail}>
                Send Invite Email
              </button>
            </div>
          </div>

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
