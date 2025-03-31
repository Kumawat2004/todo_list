import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./dashboardHome.css";

const API_URL = "https://vivah-backend-my.onrender.com/public/api/v1/gotras";

const Gotra = () => {
  const navigate = useNavigate();
  const [gotras, setGotras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchGotras();
  }, []);

  const fetchGotras = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      
      console.log("API Response:", response); // Log the full response to check the data structure
      // Check the data structure
      setGotras(response.data.data || response.data); // If response has "data" key, handle accordingly
    } catch (err) {
      // Log the error for better debugging
      console.error("Error fetching gotras:", err);
      if (err.response) {
        // Handle case where response exists but request failed (e.g., 4xx or 5xx status codes)
        setError(`Error: ${err.response.data?.message || 'Failed to fetch Gotras'}`);
      } else if (err.request) {
        // Handle case where no response is received from the server
        setError("Network error: No response from the server.");
      } else {
        // Handle other unexpected errors
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddGotra = () => navigate("/dashboard/gotra-form");
  const handleEditGotra = (gotra) => navigate("/dashboard/gotra-form", { state: gotra });

  const handleDeleteGotra = async (id) => {
    if (window.confirm("Are you sure you want to delete this Gotra?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setGotras(gotras.filter((gotra) => gotra.id !== id));
      } catch (err) {
        setError("Error deleting gotra.");
        console.error("Error deleting gotra:", err);
      }
    }
  };

  const handleDeleteAll = async () => {
    if (window.confirm("Are you sure you want to delete all Gotras?")) {
      try {
        await axios.delete(API_URL);
        setGotras([]);
      } catch (err) {
        setError("Error deleting all gotras.");
        console.error("Error deleting all gotras:", err);
      }
    }
  };

  return (
    <div className="dashboard-home gotra-management">
      <h1>Gotra Management</h1>

      {error && <p className="error-message">{error}</p>}

      <div className="gotra-actions">
        <button className="add-gotra-btn" onClick={handleAddGotra}>Add Gotra</button>
        <button className="delete-all-btn" onClick={handleDeleteAll}>Delete All</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="gotra-table-container">
          <table className="gotra-table">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Gotra Name (English)</th>
                <th>Gotra Name (हिन्दी)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {gotras.length > 0 ? (
                gotras.map((gotra, index) => (
                  <tr key={gotra.id}>
                    <td>{index + 1}</td>
                    <td>{gotra.gotraNameEnglish}</td>
                    <td>{gotra.gotraNameHindi}</td>
                    <td className="gotra-action-buttons">
                      <button className="gotra-edit-btn" onClick={() => handleEditGotra(gotra)}>Edit</button>
                      <button className="gotra-delete-btn" onClick={() => handleDeleteGotra(gotra.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="gotra-no-data">No Gotras available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Gotra;
