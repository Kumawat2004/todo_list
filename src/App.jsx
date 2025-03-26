import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/dashboard/Login";
import Dashboard from "./components/dashboard/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main app routes */}
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
