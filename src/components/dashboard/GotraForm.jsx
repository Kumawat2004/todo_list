import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const GotraForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const existingGotra = location.state || null;

  const [gotra, setGotra] = useState({ english: "", hindi: "" });

  useEffect(() => {
    if (existingGotra) {
      setGotra(existingGotra);
    }
  }, [existingGotra]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!gotra.english || !gotra.hindi) {
      alert("Please enter both Gotra names.");
      return;
    }

    const existingGotras = JSON.parse(localStorage.getItem("gotras")) || [];

    let updatedGotras;
    if (existingGotra) {
      // Update existing Gotra
      updatedGotras = existingGotras.map((g) =>
        g.id === existingGotra.id ? gotra : g
      );
    } else {
      // Add new Gotra
      const newGotra = { id: Date.now(), ...gotra };
      updatedGotras = [...existingGotras, newGotra];
    }

    // Save to localStorage
    localStorage.setItem("gotras", JSON.stringify(updatedGotras));
    window.dispatchEvent(new Event("storage"));

    navigate("/dashboard/gotra-management");
  };

  return (
    <div className="new">
      <h1>{existingGotra ? "Edit Gotra" : "Add Gotra"}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Gotra Name (English):
          <input
            type="text"
            value={gotra.english}
            onChange={(e) => setGotra({ ...gotra, english: e.target.value })}
            required
          />
        </label>
        <label>
          Gotra Name (हिन्दी):
          <input
            type="text"
            value={gotra.hindi}
            onChange={(e) => setGotra({ ...gotra, hindi: e.target.value })}
            required
          />
        </label>
        <button type="submit">{existingGotra ? "Update Gotra" : "Save Gotra"}</button>
      </form>
    </div>
  );
};

export default GotraForm;
