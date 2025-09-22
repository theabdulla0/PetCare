import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { login } from "../../features/auth/authSlice";

function Login() {
  const [email, setEmail] = useState("the.abdulla@hotmail.com");
  const [password, setPassword] = useState("hello1");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);

  // Redirect based on role after login
  useEffect(() => {
    if (user) {
      toast.success("Login successful! Redirecting...");
      setTimeout(() => {
        if (user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard"); // regular user
        }
      }, 1000);
    }
    if (error) {
      toast.error(error);
    }
  }, [user, error, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      await dispatch(login({ email, password })).unwrap();
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Login failed:", err);
      toast.error(err || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md">
        <h1 className="text-center font-bold text-3xl mb-6">Login</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="py-3 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="py-3 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="py-3 px-6 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition-all duration-300"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-green-500 font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Login;
