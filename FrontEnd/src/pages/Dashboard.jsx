import React from "react";
import { Link } from "react-router-dom";
import LayoutDashboard from "./layoutDashboard";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <LayoutDashboard>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-10">
          {/* Profile Section */}
          <div className="bg-white p-6 rounded-2xl shadow-md mb-10 text-center">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-green-200 flex items-center justify-center text-3xl font-bold text-green-700">
                {user?.name?.[0]?.toUpperCase() || "U"}
              </div>
              <h2 className="text-2xl font-semibold mt-4">
                {user?.name || "User Name"}
              </h2>
              <p className="text-gray-500">{user?.email || "user@email.com"}</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pets Section */}
            <div className="bg-white p-6 rounded-2xl shadow-md text-center">
              <h3 className="text-xl font-semibold mb-2">My Pets</h3>
              <p className="text-gray-600 mb-4">
                View, add, or manage your pets
              </p>
              <Link
                to="/pets/add"
                className="w-full block bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 mb-2"
              >
                Add Pet
              </Link>
              <Link
                to="/pets"
                className="w-full block border border-green-500 text-green-500 py-2 rounded-lg hover:bg-green-50"
              >
                View Pets
              </Link>
            </div>

            {/* Appointments Section */}
            <div className="bg-white p-6 rounded-2xl shadow-md text-center">
              <h3 className="text-xl font-semibold mb-2">Appointments</h3>
              <p className="text-gray-600 mb-4">
                Check or schedule vet appointments
              </p>
              <Link
                to="/appointments/book"
                className="w-full block bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 mb-2"
              >
                Book Appointment
              </Link>
              <Link
                to="/appointments"
                className="w-full block border border-blue-500 text-blue-500 py-2 rounded-lg hover:bg-blue-50"
              >
                My Appointments
              </Link>
            </div>

            {/* Activities Section */}
            <div className="bg-white p-6 rounded-2xl shadow-md text-center">
              <h3 className="text-xl font-semibold mb-2">Activities</h3>
              <p className="text-gray-600 mb-4">Track your pet’s activities</p>
              <Link
                to="/activities/add"
                className="w-full block bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 mb-2"
              >
                Add Activity
              </Link>
              <Link
                to="/activities"
                className="w-full block border border-purple-500 text-purple-500 py-2 rounded-lg hover:bg-purple-50"
              >
                View Activities
              </Link>
            </div>
          </div>
        </div>
      </div>
    </LayoutDashboard>
  );
}

export default Dashboard;
