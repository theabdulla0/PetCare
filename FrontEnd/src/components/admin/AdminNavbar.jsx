import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice"; // example auth slice

const AdminNavbar = () => {
  const admin = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // 1. Clear Redux state
    dispatch(logout());
    toast.success("logout successfully");
    navigate("/login", { replace: true });
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-700">Admin Panel</h1>
        <Link
          to="/admin/dashboard"
          className="text-gray-600 hover:text-gray-800 font-medium"
        >
          Dashboard
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-700">
            {admin?.name?.[0]?.toUpperCase() || "A"}
          </div>
          <span className="text-gray-700 font-medium">
            {admin?.name || "Admin"}
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
