import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboardHome.css";

const DashboardHome = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const storedCustomers = JSON.parse(localStorage.getItem("customers")) || [];
    setCustomers(storedCustomers);
  }, []);

  const handleDelete = (index) => {
    const updatedCustomers = customers.filter((_, i) => i !== index);
    setCustomers(updatedCustomers);
    localStorage.setItem("customers", JSON.stringify(updatedCustomers));
  };

  const handleDeleteAll = () => {
    setCustomers([]);
    localStorage.removeItem("customers");
  };

  const handleAddCustomer = () => {
    navigate("/dashboard/new-customer");
  };

  const handleEdit = (customer) => {
    navigate("/dashboard/new-customer", { state: { customer } });
  };

  return (
    <div className="dashboard-home">
      <h1>Dashboard Home</h1>

      <div className="table-actions">
        <button className="add-btn" onClick={handleAddCustomer}>Add Customer</button>
        <button className="delete-all-btn" onClick={handleDeleteAll}>Delete All</button>
      </div>

      {/* Responsive Scrollable Table */}
      <div className="table-container">
        <table className="customer-table">
          <thead>
            <tr>
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
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.address}</td>
                  <td className="action-buttons">
                    <button className="edit-btn" onClick={() => handleEdit(customer)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(index)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">No customers available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardHome;
