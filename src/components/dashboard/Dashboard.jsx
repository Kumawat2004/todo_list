import { Routes, Route, Link } from "react-router-dom";
import Customer from "./Customer";
import NewCustomer from "./NewCustomer";
import DashboardHome from "./DashboardHome";
import Gotra from "./GotraManagement";
import GotraForm from "./GotraForm";
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
          <li>
            <Link to="/dashboard/gotra-management">Gotra Management</Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="content">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="customer" element={<Customer />} />
          <Route path="new-customer" element={<NewCustomer />} />
          <Route path="gotra-management" element={<Gotra />} />
          <Route path="gotra-form" element={<GotraForm/>} />
        </Routes>
      </main>
    </>
  );
};

export default Dashboard;
