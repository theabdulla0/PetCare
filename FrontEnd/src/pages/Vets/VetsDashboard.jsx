import React from "react";
import VetsLayout from "./VetsLayout";

const VetDashboard = () => {
  const vet = JSON.parse(localStorage.getItem("user"));

  return (
    <VetsLayout>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6 text-blue-600">
          Welcome, {vet?.name || "Vet"}
        </h1>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">Appointments</h3>
            <p className="text-gray-600 mb-4">Manage vet appointments</p>
            <Link
              to="/vet/appointments"
              className="w-full block bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 mb-2"
            >
              View Appointments
            </Link>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">Pets</h3>
            <p className="text-gray-600 mb-4">View or update pet info</p>
            <Link
              to="/vet/pets"
              className="w-full block bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 mb-2"
            >
              View Pets
            </Link>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">Activities</h3>
            <p className="text-gray-600 mb-4">Track or update activities</p>
            <Link
              to="/vet/activities"
              className="w-full block bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 mb-2"
            >
              View Activities
            </Link>
          </div>
        </div>
      </div>
    </VetsLayout>
  );
};

export default VetDashboard;
