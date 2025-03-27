import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboardHome.css";

const DashboardHome = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);

  // Load customers from localStorage on mount
  useEffect(() => {
    const storedCustomers = JSON.parse(localStorage.getItem("customers")) || [];
    setCustomers(storedCustomers);
  }, []);

  // Listen for localStorage updates across tabs
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedCustomers = JSON.parse(localStorage.getItem("customers")) || [];
      setCustomers(updatedCustomers);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleAddCustomer = () => {
    navigate("/dashboard/new-customer");
  };

  // ✅ Fixed edit function (Correct format me data bhejna)
  const handleEditCustomer = (customer) => {
    navigate("/dashboard/new-customer", { state: { customer } });
  };

  const handleDeleteCustomer = (index) => {
    const updatedCustomers = customers.filter((_, i) => i !== index);
    localStorage.setItem("customers", JSON.stringify(updatedCustomers));
    setCustomers(updatedCustomers);
    window.dispatchEvent(new Event("storage")); // Sync with other tabs
  };

  const handleDeleteAll = () => {
    if (window.confirm("Are you sure you want to delete all customers?")) {
      localStorage.removeItem("customers");
      setCustomers([]);
      window.dispatchEvent(new Event("storage")); // Sync with other tabs
    }
  };

  return (
    <div className="dashboard-home">
      <h1>Customer Management</h1>

      <div className="table-actions">
        <button className="add-btn" onClick={handleAddCustomer}>Add Customer</button>
        <button className="delete-all-btn" onClick={handleDeleteAll}>Delete All</button>
      </div>

      <div className="table-container">
        <table className="customer-table">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone No.</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((customer, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.address}</td>
                  <td className="action-buttons">
                    <button className="edit-btn" onClick={() => handleEditCustomer(customer)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDeleteCustomer(index)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">No customers available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardHome;
