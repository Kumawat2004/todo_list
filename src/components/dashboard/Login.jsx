import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="login bg-white w-[350px] h-[400px] rounded-[5px] shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-5">Login</h1>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
              size="30"
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>
          <div className="mt-1 flex gap-2">
            <input type="checkbox" name="" id="rember" />
            <label htmlFor="rember" className="block ">
              Remember me
            </label>
          </div>

          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
          <div className="text-center mt-4">
            <a href="#" className="text-blue-500">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
