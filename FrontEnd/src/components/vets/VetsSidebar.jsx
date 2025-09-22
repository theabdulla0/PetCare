import React from "react";
import { Link } from "react-router-dom";

const VetSidebar = () => {
  return (
    <aside className="w-64 bg-blue-600 text-white flex flex-col min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-6">Menu</h2>
      <ul className="flex flex-col gap-4">
        <li>
          <Link
            to="/vet/dashboard"
            className="block py-2 px-4 rounded hover:bg-blue-500"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/vet/appointments"
            className="block py-2 px-4 rounded hover:bg-blue-500"
          >
            Appointments
          </Link>
        </li>
        <li>
          <Link
            to="/vet/pets"
            className="block py-2 px-4 rounded hover:bg-blue-500"
          >
            Pets
          </Link>
        </li>
        <li>
          <Link
            to="/vet/activities"
            className="block py-2 px-4 rounded hover:bg-blue-500"
          >
            Activities
          </Link>
        </li>
        <li>
          <Link
            to="/vet/profile"
            className="block py-2 px-4 rounded hover:bg-blue-500"
          >
            Profile
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default VetSidebar;
