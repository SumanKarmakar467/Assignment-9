import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const SERVER_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_URL = `${SERVER_URL}/api`;

const VisitorForm = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    purpose: "",
    date: "",
  });
  const [image, setImage] = useState(null);
  const [checkEmail, setCheckEmail] = useState("");
  const [appointment, setAppointment] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("purpose", formData.purpose);
    data.append("date", formData.date);
    data.append("image", image);

    try {
      await axios.post(`${API_URL}/visitors`, data);
      alert("Appointment submitted. Status is Pending.");

      setFormData({ name: "", email: "", purpose: "", date: "" });
      setImage(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error(error);
      alert("Failed to submit form");
    }
  };

  const checkAppointment = async () => {
    try {
      const response = await axios.get(`${API_URL}/visitors/check/${checkEmail}`);
      setAppointment(response.data);
    } catch (error) {
      console.error(error);
      setAppointment(null);
      alert("No appointment found for this email");
    }
  };

  const qrText = appointment
    ? `Visitor: ${appointment.name}, Email: ${appointment.email}, Status: ${appointment.status}`
    : "";

  const getImageUrl = (image) => {
    if (!image) {
      return "";
    }

    return `${SERVER_URL}/uploads/${image}`;
  };

  return (
    <div className="page">
      <button type="button" className="back-button" onClick={() => navigate("/")}>
        Back
      </button>

      <div className="two-column">
        <form className="panel" onSubmit={handleSubmit}>
          <h1>Visitor Form</h1>

          <input
            className="inputs"
            type="text"
            name="name"
            value={formData.name}
            placeholder="Enter your name"
            onChange={handleChange}
            required
          />

          <input
            className="inputs"
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter your email"
            onChange={handleChange}
            required
          />

          <input
            className="inputs"
            type="text"
            name="purpose"
            value={formData.purpose}
            placeholder="Purpose of visit"
            onChange={handleChange}
            required
          />

          <input
            className="inputs"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <input
            ref={fileInputRef}
            className="inputs"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />

          <button type="submit" className="submit">
            Submit Appointment
          </button>
        </form>

        <div className="panel">
          <h2>Check Appointment</h2>
          <input
            className="inputs"
            type="email"
            value={checkEmail}
            placeholder="Enter your email"
            onChange={(e) => setCheckEmail(e.target.value)}
          />
          <button type="button" className="submit" onClick={checkAppointment}>
            Check Status
          </button>

          {appointment && (
            <div className="visitor-list">
              {appointment.image && (
                <img
                  className="visitor-photo"
                  alt={appointment.name}
                  src={getImageUrl(appointment.image)}
                />
              )}
              <h3>{appointment.name}</h3>
              <p>Status: {appointment.status}</p>
              <p>Purpose: {appointment.purpose}</p>
              <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>

              {appointment.status === "Approved" && (
                <img
                  className="qr-code"
                  alt="Visitor QR code"
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(qrText)}`}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisitorForm;
