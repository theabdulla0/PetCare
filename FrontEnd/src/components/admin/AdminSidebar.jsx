import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { LuUser, LuPawPrint, LuCalendar, LuActivity } from "react-icons/lu";

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => setCollapsed(!collapsed);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-200 transition ${
      isActive ? "bg-green-100 text-green-700 font-semibold" : "text-gray-700"
    }`;

  return (
    <aside
      className={`bg-white shadow-md min-h-screen transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        {!collapsed && (
          <h2 className="text-lg font-bold text-gray-700">Admin</h2>
        )}
        <button
          onClick={toggleCollapse}
          className="text-gray-500 hover:text-gray-700 p-1 rounded"
        >
          {collapsed ? "➡️" : "⬅️"}
        </button>
      </div>

      <nav className="mt-4 flex flex-col gap-2">
        <NavLink to="/admin/dashboard" className={linkClass}>
          <LuActivity className="text-xl" />
          {!collapsed && "Dashboard"}
        </NavLink>
        <NavLink to="/admin/users" className={linkClass}>
          <LuUser className="text-xl" />
          {!collapsed && "Users"}
        </NavLink>
        <NavLink to="/admin/pets" className={linkClass}>
          <LuPawPrint className="text-xl" />
          {!collapsed && "Pets"}
        </NavLink>
        <NavLink to="/admin/appointments" className={linkClass}>
          <LuCalendar className="text-xl" />
          {!collapsed && "Appointments"}
        </NavLink>
        {/* Add more admin routes as needed */}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
