import React, { useEffect } from "react";
import LayoutDashboard from "./LayoutDashboard";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "John Doe",
    email: "abc@gami.com",
    phone: "+91 98765 43210",
    location: "Mumbai, India",
  };
  return (
    <LayoutDashboard>
      <div className="min-h-screen bg-gray-50 py-10 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
            <img
              src="https://i.pravatar.cc/150?img=32"
              alt="Profile avatar"
              className="w-28 h-28 rounded-full object-cover border-4 border-green-500"
            />
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-400 mt-1">Role: {user.role}</p>
              <button className="mt-4 px-5 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition">
                Edit Profile
              </button>
            </div>
          </div>

          {/* Details */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">+91 98765 43210</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">Mumbai, India</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow p-6 text-center">
              <p className="text-sm text-gray-500">Appointments</p>
              <p className="text-2xl font-bold text-green-600">12</p>
            </div>
            <div className="bg-white rounded-2xl shadow p-6 text-center">
              <p className="text-sm text-gray-500">Pets Registered</p>
              <p className="text-2xl font-bold text-green-600">3</p>
            </div>
            <div className="bg-white rounded-2xl shadow p-6 text-center">
              <p className="text-sm text-gray-500">Insurance Plans</p>
              <p className="text-2xl font-bold text-green-600">2</p>
            </div>
          </div>
        </div>
      </div>
    </LayoutDashboard>
  );
}

export default Profile;
