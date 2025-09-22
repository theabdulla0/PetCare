import React from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminSidebar from "../../components/admin/AdminSidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      <AdminSidebar />
      <div className="flex-grow flex flex-col">
        <AdminNavbar />
        <main className="flex-grow p-4 sm:p-8 bg-gradient-to-br from-gray-50 to-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
