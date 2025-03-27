import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./newCustomer.css";

const GotraForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const existingGotra = location.state || null;

  const [gotra, setGotra] = useState({
    gotar_name_english: "",
    gotar_name_hindi: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (existingGotra) {
      setGotra(existingGotra);
    }
  }, [existingGotra]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!gotra.gotar_name_english || !gotra.gotar_name_hindi) {
      setError("Both Gotra names are required!");
      return;
    }

    const existingGotras = JSON.parse(localStorage.getItem("gotras")) || [];
    let updatedGotras;

    if (existingGotra) {
      updatedGotras = existingGotras.map((g) =>
        g.id === existingGotra.id ? gotra : g
      );
      setMessage("Gotra updated successfully!");
    } else {
      const newGotra = { id: Date.now(), ...gotra };
      updatedGotras = [...existingGotras, newGotra];
      setMessage("Gotra added successfully!");
    }

    localStorage.setItem("gotras", JSON.stringify(updatedGotras));

    //  Success message show hone ke baad 2 sec me dashboard pe redirect
    setTimeout(() => {
      navigate("/dashboard/gotra-management");
    }, 500);
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
            value={gotra.gotar_name_english}
            onChange={(e) => setGotra({ ...gotra, gotar_name_english: e.target.value })}
            required
          />
        </label>
        <label>
          Gotra Name (हिन्दी):
          <input
            type="text"
            value={gotra.gotar_name_hindi}
            onChange={(e) => setGotra({ ...gotra, gotar_name_hindi: e.target.value })}
            required
          />
        </label>
        <button type="submit">{existingGotra ? "Update Gotra" : "Save Gotra"}</button>
      </form>
    </div>
  );
};

export default GotraForm;
