import React from "react";
import { Link } from "react-router-dom";
import AdminLayout from "./AdminLayout";

function AdminDashboard() {
  const admin = JSON.parse(localStorage.getItem("user")); 

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Profile Section */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-10 text-center">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold text-gray-700">
              {admin?.name?.[0]?.toUpperCase() || "A"}
            </div>
            <h2 className="text-2xl font-semibold mt-4">
              {admin?.name || "Admin Name"}
            </h2>
            <p className="text-gray-500">{admin?.email || "admin@email.com"}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Users Section */}
          <div className="bg-white p-6 rounded-2xl shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">Manage Users</h3>
            <p className="text-gray-600 mb-4">Add, edit or remove users</p>
            <Link
              to="/admin/users/add"
              className="w-full block bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 mb-2"
            >
              Add User
            </Link>
            <Link
              to="/admin/users"
              className="w-full block border border-green-500 text-green-500 py-2 rounded-lg hover:bg-green-50"
            >
              View Users
            </Link>
          </div>

          {/* Pets Section */}
          <div className="bg-white p-6 rounded-2xl shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">Manage Pets</h3>
            <p className="text-gray-600 mb-4">View and manage pets</p>
            <Link
              to="/admin/pets"
              className="w-full block bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 mb-2"
            >
              View Pets
            </Link>
          </div>

          {/* Appointments Section */}
          <div className="bg-white p-6 rounded-2xl shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">Appointments</h3>
            <p className="text-gray-600 mb-4">Check or manage appointments</p>
            <Link
              to="/admin/appointments"
              className="w-full block bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 mb-2"
            >
              View Appointments
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
