import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './dashboardHome.css';

const GotraManagement = () => {
  const navigate = useNavigate();
  const [gotras, setGotras] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch Gotras from API
  const fetchGotras = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/public/api/v1/gotras');
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

  // Navigate to Add Gotra form
  const handleAddGotra = () => navigate('/dashboard/gotra-form');

  // Navigate to Edit Gotra form
  const handleEditGotra = (gotra) => navigate('/dashboard/gotra-form', { state: gotra });

  // Delete a specific Gotra
  const handleDeleteGotra = async (id) => {
    if (window.confirm('Are you sure you want to delete this Gotra?')) {
      try {
        const response = await axios.delete(`/public/api/v1/gotras/${id}`);
        console.log("Gotra deleted:", response.data);
        setGotras(gotras.filter((gotra) => gotra.id.timestamp !== id)); // Remove deleted Gotra from state
      } catch (err) {
        setError('Error deleting gotra.');
        console.error('Error deleting gotra:', err);
      }
    }
  };

  // Delete all Gotras
  const handleDeleteAll = async () => {
    if (window.confirm('Are you sure you want to delete all Gotras?')) {
      try {
        const response = await axios.delete('/public/api/v1/gotras');
        console.log("All Gotras deleted:", response.data);
        setGotras([]); // Clear all gotras from local state
      } catch (err) {
        setError('Error deleting all gotras.');
        console.error('Error deleting all gotras:', err);
      }
    }
  };

  return (
    <div className="dashboard-home">
      <h1>Gotra Management</h1>

      {error && <p className="error-message">{error}</p>}

      <div className="table-actions">
        <button className="add-btn" onClick={handleAddGotra}>Add Gotra</button>
        <button className="delete-all-btn" onClick={handleDeleteAll}>Delete All</button>
      </div>

      <div className="table-container">
        {loading && <p>Loading...</p>}
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
                <tr key={gotra.id.timestamp}>
                  <td>{index + 1}</td>
                  <td>{gotra.gotraNameEnglish}</td>
                  <td>{gotra.gotraNameHindi}</td>
                  <td className="action-buttons">
                    <button className="edit-btn" onClick={() => handleEditGotra(gotra)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDeleteGotra(gotra.id.timestamp)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-data">No Gotras available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GotraManagement;
