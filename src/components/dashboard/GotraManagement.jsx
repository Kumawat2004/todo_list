import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboardHome.css";

const Gotra = () => {
  const navigate = useNavigate();
  const [gotras, setGotras] = useState([]);

  // Load Gotras from localStorage on mount
  useEffect(() => {
    const storedGotras = JSON.parse(localStorage.getItem("gotras")) || [];
    setGotras(storedGotras);
  }, []);

  // Listen for localStorage updates across tabs
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedGotras = JSON.parse(localStorage.getItem("gotras")) || [];
      setGotras(updatedGotras);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleAddGotra = () => {
    navigate("/dashboard/gotra-form");
  };

  const handleEditGotra = (gotra) => {
    navigate("/dashboard/gotra-form", { state: gotra });
  };

  const handleDeleteGotra = (id) => {
    const updatedGotras = gotras.filter((gotra) => gotra.id !== id);
    localStorage.setItem("gotras", JSON.stringify(updatedGotras, null, 2));
    setGotras(updatedGotras);
    window.dispatchEvent(new Event("storage")); // Notify other components
  };

  const handleDeleteAll = () => {
    if (window.confirm("Are you sure you want to delete all Gotras?")) {
      localStorage.removeItem("gotras");
      setGotras([]);
      window.dispatchEvent(new Event("storage")); // Notify other components
    }
  };

  return (
    <div className="dashboard-home gotra-management">
      <h1>Gotra Management</h1>

      <div className="gotra-actions">
        <button className="add-gotra-btn" onClick={handleAddGotra}>
          Add Gotra
        </button>
        <button className="delete-all-btn" onClick={handleDeleteAll}>
          Delete All
        </button>
      </div>

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
                  <td>{gotra.gotar_name_english}</td>
                  <td>{gotra.gotar_name_hindi}</td>
                  <td className="gotra-action-buttons">
                    <button
                      className="gotra-edit-btn"
                      onClick={() => handleEditGotra(gotra)}
                    >
                      Edit
                    </button>
                    <button
                      className="gotra-delete-btn"
                      onClick={() => handleDeleteGotra(gotra.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="gotra-no-data">
                  No Gotras available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Gotra;
