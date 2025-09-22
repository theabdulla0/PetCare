import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../features/auth/authSlice"; // make sure path is correct
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (message && !error) {
      toast.success("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    }
    if (error) {
      toast.error(error);
    }
  }, [message, error, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setFormError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setFormError("Password must be at least 6 characters");
      return;
    }

    try {
      await dispatch(signUp({ name, email, password })).unwrap();
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Signup failed:", err);
      setFormError(err || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-center font-bold text-3xl mb-6 text-gray-800">
          Sign Up
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            className="py-3 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="py-3 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className="py-3 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {formError && (
            <p className="text-sm text-red-500 text-center">{formError}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="py-3 px-6 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition-all duration-300"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          <p className="text-sm text-center text-gray-600 mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-green-500 underline">
              Login
            </Link>
          </p>
        </form>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}

export default SignUp;
