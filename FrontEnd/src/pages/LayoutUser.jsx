import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const LayoutUser = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LayoutUser;
