import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './dashboardHome.css';

const GotraManagement = () => {
  const navigate = useNavigate();
  const [gotras, setGotras] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // API Base URL for Netlify
  const API_BASE_URL = "https://vivah-backend-my.onrender.com";

  // Fetch Gotras from API
  const fetchGotras = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/public/api/v1/gotras`);
      console.log('API Response:', response);

      if (Array.isArray(response.data.data)) {
        setGotras(response.data.data);
      } else {
        setError('Data format is incorrect.');
        setGotras([]);
      }
    } catch (err) {
      setError('Failed to fetch gotras.');
      console.error('Error fetching gotras:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGotras();
  }, []);

  return (
    <div className="dashboard-home">
      <h1>Gotra Management</h1>

      {error && <p className="error-message">{error}</p>}

      <div className="table-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="gotra-table">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Gotra Name (English)</th>
                <th>Gotra Name (हिन्दी)</th>
              </tr>
            </thead>
            <tbody>
              {gotras.length > 0 ? (
                gotras.map((gotra, index) => (
                  <tr key={gotra.id.timestamp}>
                    <td>{index + 1}</td>
                    <td>{gotra.gotraNameEnglish}</td>
                    <td>{gotra.gotraNameHindi}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="no-data">No Gotras available</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default GotraManagement;
