import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./newCustomer.css";

const NewCustomer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editingCustomer = location.state?.customer || null;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

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
    let storedCustomers = JSON.parse(localStorage.getItem("customers")) || [];

    if (editingCustomer) {
      // Update existing customer
      storedCustomers = storedCustomers.map((cust) =>
        cust.email === editingCustomer.email ? formData : cust
      );
    } else {
      // Add new customer
      storedCustomers.push(formData);
    }

    localStorage.setItem("customers", JSON.stringify(storedCustomers));
    navigate("/dashboard");
  };

  return (
    <div className="new">
      <h1>{editingCustomer ? "Edit Customer" : "Add New Customer"}</h1>
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
