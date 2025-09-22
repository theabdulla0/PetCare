import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const LayoutDashboard = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      <Sidebar /> {/* Sidebar shown only here */}
      <div className="flex-grow flex flex-col">
        <Navbar /> {/* Optional: keep top navbar */}
        <main className="flex-grow p-4 sm:p-8 bg-gradient-to-br from-green-50 to-green-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default LayoutDashboard;
