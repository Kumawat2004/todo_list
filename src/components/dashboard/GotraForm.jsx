import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./newCustomer.css";

// Using dynamic API URL based on environment
const API_URL = `${import.meta.env.VITE_API_URL}/public/api/v1/gotras`;

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

    // Validation check for input fields
    if (!gotra.gotraNameEnglish || !gotra.gotraNameHindi) {
      setError("Both Gotra names are required!");
      setLoading(false);
      return;
    }

    try {
      let response;
      if (existingGotra) {
        // Update existing Gotra
        response = await axios.put(`${API_URL}/${existingGotra.id.timestamp}`, gotra, {
          headers: { "Content-Type": "application/json" },
        });
        console.log("Gotra updated successfully:", response.data);
        setMessage("Gotra updated successfully!");
      } else {
        // Add new Gotra
        response = await axios.post(API_URL, gotra, {
          headers: { "Content-Type": "application/json" },
        });
        console.log("Gotra added successfully:", response.data);
        setMessage("Gotra added successfully!");
      }

      navigate("/dashboard/gotra-management"); // Redirect to Gotra management page after successful submit
    } catch (err) {
      console.error("Error occurred while adding/updating Gotra:", err);

      if (err.response) {
        // Log detailed error response
        console.log("Error response:", err.response);
        setError(err.response.data.message || "Something went wrong while adding/updating Gotra.");
      } else {
        setError("Network error or server not reachable.");
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
