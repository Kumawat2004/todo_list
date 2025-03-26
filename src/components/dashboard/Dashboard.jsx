import { Routes, Route, Link } from "react-router-dom";
import Customer from "./Customer";
import NewCustomer from "./NewCustomer";
import DashboardHome from "./DashboardHome";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <>
      {/* Sidebar / Navbar */}
      <nav className="sidebar">
        <ul className="menu">
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/dashboard/customer">Customer</Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="content">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="customer" element={<Customer />} />
          <Route path="new-customer" element={<NewCustomer />} />
        </Routes>
      </main>
    </>
  );
};

export default Dashboard;
