import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LuCircleUser,
  LuPawPrint,
  LuCalendar,
  LuActivity,
  LuPanelRightDashed,
  LuChevronDown,
  LuChevronRight,
  LuMenu,
  LuX,
} from "react-icons/lu";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // Load from localStorage (default true if not set)
    const saved = localStorage.getItem("sidebarCollapsed");
    return saved ? JSON.parse(saved) : true;
  });
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LuPanelRightDashed className="w-5 h-5" />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <LuCircleUser className="w-5 h-5" />,
    },
    {
      name: "My Pets",
      path: "/pets",
      icon: <LuPawPrint className="w-5 h-5" />,
      submenu: [
        { name: "All Pets", path: "/pets" },
        { name: "Add Pet", path: "/pets/add" },
      ],
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: <LuCalendar className="w-5 h-5" />,
    },
    {
      name: "Activity",
      path: "/activities",
      icon: <LuActivity className="w-5 h-5" />,
    },
  ];

  const toggleDropdown = (name) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const isActiveLink = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-green-500 text-white rounded-lg shadow-md"
        onClick={() => setIsCollapsed((prev) => !prev)}
      >
        {isCollapsed ? (
          <LuMenu className="w-5 h-5" />
        ) : (
          <LuX className="w-5 h-5" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative min-h-screen bg-white border-r border-gray-200 flex flex-col z-40 transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Collapse/Expand Button */}
        <div className="flex items-center justify-between p-4">
          {!isCollapsed && (
            <h2 className="text-xl font-bold text-green-500">Dashboard</h2>
          )}
          <button
            onClick={() => setIsCollapsed((prev) => !prev)}
            className="p-2 rounded-lg hover:bg-green-100 text-gray-700"
          >
            {isCollapsed ? (
              <LuChevronRight className="w-5 h-5" />
            ) : (
              <LuChevronRight className="w-5 h-5 rotate-180" />
            )}
          </button>
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-1 px-2">
          {menuItems.map((item) => (
            <div key={item.name}>
              {item.submenu ? (
                <>
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-green-100 text-gray-700 hover:text-green-600 ${
                      location.pathname.startsWith(item.path)
                        ? "bg-green-100 text-green-600"
                        : ""
                    }`}
                  >
                    {item.icon}
                    {!isCollapsed && <span>{item.name}</span>}
                    {!isCollapsed && (
                      <span className="ml-auto">
                        {activeDropdown === item.name ? (
                          <LuChevronDown className="w-4 h-4" />
                        ) : (
                          <LuChevronRight className="w-4 h-4" />
                        )}
                      </span>
                    )}
                  </button>

                  {!isCollapsed && activeDropdown === item.name && (
                    <div className="pl-8 py-1 space-y-1">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.path}
                          className={`block px-3 py-2 rounded-lg text-sm hover:bg-green-50 ${
                            isActiveLink(sub.path)
                              ? "text-green-600 font-medium"
                              : "text-gray-600"
                          }`}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-green-100 text-gray-700 hover:text-green-600 ${
                    isActiveLink(item.path) ? "bg-green-100 text-green-600" : ""
                  }`}
                >
                  {item.icon}
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {!isCollapsed && (
          <div className="mt-auto p-4 text-xs text-gray-400">
            Hover to expand
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
