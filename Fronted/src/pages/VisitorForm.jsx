import axios from "axios";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const VisitorForm = () => {
   const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    purpose: "",
    date: "",
  });

  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

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
      await axios.post(
        "http://localhost:5000/api/visitors",
        data
      );

      alert("Visitor Added Successfully");

      // Clear form fields
      setFormData({
        name: "",
        email: "",
        purpose: "",
        date: "",
      });

      // Clear image state
      setImage(null);

      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error(error);
      alert("Failed to submit form");
    }
  };

  return (
    <div className="visitor-form">
      <form className="form" onSubmit={handleSubmit}>
        <div className="back">
          <button type="button" className="back-button" onClick={() => navigate("/")}>
            ← Back
          </button>
        </div>

        <div className="int">
          <h1>Visitor's Form</h1>
        </div>

        <div className="int">
          <input
            className="inputs"
            type="text"
            name="name"
            value={formData.name}
            placeholder="Enter your name..."
            onChange={handleChange}
            required
          />
        </div>

        <div className="int">
          <input
            className="inputs"
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter your email..."
            onChange={handleChange}
            required
          />
        </div>

        <div className="int">
          <input
            className="inputs"
            type="text"
            name="purpose"
            value={formData.purpose}
            placeholder="Enter your purpose..."
            onChange={handleChange}
            required
          />
        </div>

        <div className="int">
          <input
            className="inputs"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="int">
          <input
            ref={fileInputRef}
            className="inputs-img"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>

        <div className="int">
          <button type="submit" className="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default VisitorForm;