import React from "react";
import { Link } from "react-router-dom";

const VetNavbar = () => {
  const vet = JSON.parse(localStorage.getItem("user")); // assuming vets login like users

  return (
    <nav className="w-full bg-blue-500 text-white flex justify-between items-center px-6 py-4 shadow-md">
      <div className="text-2xl font-bold">Vet Dashboard</div>
      <div className="flex items-center gap-4">
        <span className="font-semibold">{vet?.name || "Vet Name"}</span>
        <Link
          to="/logout"
          className="bg-white text-blue-500 px-4 py-2 rounded-lg hover:bg-gray-100"
        >
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default VetNavbar;
