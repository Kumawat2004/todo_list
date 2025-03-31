import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./newCustomer.css";

const API_URL = "https://vivah-backend-my.onrender.com/public/api/v1/gotras";

const GotraForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const existingGotra = location.state || null;

  const [gotra, setGotra] = useState({ gotraNameEnglish: "", gotraNameHindi: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (existingGotra) {
      setGotra(existingGotra);
    }
  }, [existingGotra]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    if (!gotra.gotraNameEnglish || !gotra.gotraNameHindi) {
      setError("Both Gotra names are required!");
      setLoading(false);
      return;
    }

    try {
      if (existingGotra) {
        // Update existing Gotra
        console.log("Updating Gotra", gotra);
        const response = await axios.put(`${API_URL}/${existingGotra.id}`, gotra);
        setMessage("Gotra updated successfully!");
      } else {
        // Add new Gotra
        console.log("Adding Gotra", gotra);
        const response = await axios.post(API_URL, gotra);
        setMessage("Gotra added successfully!");
      }
      navigate("/dashboard/gotra-management");
    } catch (err) {
      console.error("Error occurred while adding/updating Gotra:", err);

      // Display detailed error message from the response if available
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // API returns a detailed message
      } else {
        setError("Something went wrong! Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h1>{existingGotra ? "Edit Gotra" : "Add Gotra"}</h1>

      {message && <p className="message-box success-message">{message}</p>}
      {error && <p className="message-box error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Gotra Name (English):
          <input
            type="text"
            value={gotra.gotraNameEnglish}
            onChange={(e) => setGotra({ ...gotra, gotraNameEnglish: e.target.value })}
            required
          />
        </label>
        <label>
          Gotra Name (हिन्दी):
          <input
            type="text"
            value={gotra.gotraNameHindi}
            onChange={(e) => setGotra({ ...gotra, gotraNameHindi: e.target.value })}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : existingGotra ? "Update Gotra" : "Save Gotra"}
        </button>
      </form>
    </div>
  );
};

export default GotraForm;
