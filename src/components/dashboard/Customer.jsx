import { useNavigate } from "react-router-dom";
import "./customer.css";

const Customer = () => {
  const navigate = useNavigate();

  const handleNewCustomer = () => {
    navigate("/dashboard/new-customer");
  };

  const handleImportCustomers = () => {
    navigate("/dashboard/import-customers");
  };

  return (
    <>
      <button onClick={handleNewCustomer}>New Customer</button>
      <button onClick={handleImportCustomers}>Import Customers</button>
    </>
  );
};

export default Customer;