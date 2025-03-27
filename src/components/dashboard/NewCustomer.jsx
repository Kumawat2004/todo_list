import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./newCustomer.css";

const NewCustomer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editingCustomer = location.state?.customer || null; // ✅ Fixed state retrieval

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingCustomer) {
      setFormData(editingCustomer);
    }
  }, [editingCustomer]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      setError("All fields are required!");
      return;
    }

    let storedCustomers = JSON.parse(localStorage.getItem("customers")) || [];

    if (editingCustomer) {
      storedCustomers = storedCustomers.map((cust) =>
        cust.email === editingCustomer.email ? formData : cust
      );
      setMessage("Customer updated successfully!");
    } else {
      storedCustomers.push(formData);
      setMessage("Customer added successfully!");
    }

    localStorage.setItem("customers", JSON.stringify(storedCustomers));
    window.dispatchEvent(new Event("storage")); // Sync with other tabs

    // ✅ Success message show karne ke baad 2 sec me redirect ho jaye
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="form-container">
      <h1>{editingCustomer ? "Edit Customer" : "Add New Customer"}</h1>

      {message && <p className="message-box success-message">{message}</p>}
      {error && <p className="message-box error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Phone:
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>
        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </label>
        <button type="submit">{editingCustomer ? "Update" : "Create"}</button>
      </form>
    </div>
  );
};

export default NewCustomer;
