import { useEffect, useState } from "react";

const Employee = () => {
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    const fetchVisitors = async () => {
      const response = await fetch(
        "http://localhost:5000/api/employee"
      );

      const data = await response.json();

      if (response.ok) {
        setVisitors(data);
      }
    };

    fetchVisitors();
  }, []);

  return (
    <div className="all-visitors">
        <div className="back">
          <button type="button" className="back-button" onClick={() => navigate("/")}>
            ← Back
          </button>
        </div>
        <div className="employee">
      <h1 className="heading-employee">All Visitors List</h1>

      {visitors.map((visitor) => (
        <div key={visitor._id} className="visitor-list">
          <h3 className="visitor-name">{visitor.name}</h3>
          <p className="visitor-para">{visitor.email}</p>
          <p className="visitor-para">{visitor.purpose}</p>
          <p className="visitor-para">{visitor.date}</p>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Employee;