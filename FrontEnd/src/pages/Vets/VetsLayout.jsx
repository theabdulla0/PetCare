import React from "react";
import VetsNavbar from "../../components/vets/VetsNavbar";
import VetsSidebar from "../../components/vets/VetsSidebar";

const VetsLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      <VetsSidebar />
      <div className="flex-grow flex flex-col">
        <VetsNavbar />
        <main className="flex-grow p-4 sm:p-8 bg-gradient-to-br from-blue-50 to-blue-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default VetsLayout;
