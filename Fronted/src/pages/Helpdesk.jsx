import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SERVER_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_URL = `${SERVER_URL}/api`;
const HELPDESK_EMAILS = ["helpdesk@gmail.com", "helpesk@gmail.com"];

const Helpdesk = () => {
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
    const response = await fetch(`${API_URL}/helpdesk`);
    const data = await response.json();

    if (response.ok) {
      setVisitors(data.filter((visitor) => visitor.status !== "Pending"));
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchVisitors();
    }
  }, [isLoggedIn]);

  const loginHelpdesk = () => {
    if (HELPDESK_EMAILS.includes(email)) {
      setIsLoggedIn(true);
    } else {
      alert("Use helpdesk@gmail.com");
    }
  };

  const markTime = async (id, type) => {
    await fetch(`${API_URL}/helpdesk/${id}/${type}`, {
      method: "PATCH",
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
          <h1>Helpdesk Login</h1>
          <input
            className="inputs"
            type="email"
            value={email}
            placeholder="helpdesk@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="submit" onClick={loginHelpdesk}>
            Show Visitors
          </button>
        </div>
      ) : (
        <div className="employee">
          <h1 className="heading-employee">Approved / Rejected Visitors</h1>

          {visitors.map((visitor) => {
            const qrText = `Visitor: ${visitor.name}, Email: ${visitor.email}, Status: ${visitor.status}`;

            return (
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
                <p>Status: {visitor.status}</p>

                {visitor.status === "Approved" && (
                  <>
                    <img
                      className="qr-code"
                      alt="Visitor QR code"
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(qrText)}`}
                    />
                    <div className="button-row">
                      <button className="approve" onClick={() => markTime(visitor._id, "checkin")}>
                        Check In
                      </button>
                      <button className="submit small-button" onClick={() => markTime(visitor._id, "checkout")}>
                        Check Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Helpdesk;
