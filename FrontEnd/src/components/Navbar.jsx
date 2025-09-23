import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import {
  LuCircleUser,
  LuChevronDown,
  LuSearch,
  LuMenu,
  LuX,
} from "react-icons/lu";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // mobile dropdown toggle
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const SearchBox = (
    <div className="hidden lg:flex items-center w-70 max-w-sm h-10 bg-white border border-gray-300 rounded-full px-4 shadow-sm">
      <input
        type="text"
        placeholder="Search pets or services"
        className="flex-grow bg-transparent text-gray-700 placeholder-gray-400 outline-none"
      />
      <LuSearch className="w-5 h-5 text-gray-500 ml-2" />
    </div>
  );

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
      <Link to="/" className="flex items-center font-bold text-green-500">
        PetCare
      </Link>

      {SearchBox}

      <nav
        className={`${
          isMobileMenuOpen ? "flex" : "hidden"
        } lg:flex flex-col lg:flex-row gap-4 lg:gap-6 items-center text-sm lg:text-base 
           absolute lg:static top-16 left-0 right-0 bg-white p-6 lg:p-0 shadow-lg lg:shadow-none transition-all`}
      >
        <Link
          to="/"
          className="text-gray-700 hover:text-green-500 transition-colors"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="text-gray-700 hover:text-green-500 transition-colors"
        >
          About
        </Link>
        <Link
          to="/blog"
          className="text-gray-700 hover:text-green-500 transition-colors"
        >
          Blog
        </Link>
        <Link
          to="/contact-us"
          className="text-gray-700 hover:text-green-500 transition-colors"
        >
          Contact
        </Link>

        {!user ? (
          <>
            <Link
              to="/login"
              className="px-4 py-1 border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <div className="relative group">
            {/* Desktop hover */}
            <div className="hidden lg:flex relative group">
              <div className="flex items-center gap-1 cursor-pointer">
                <LuCircleUser className="w-5 h-5 text-gray-700" />
                <span className="text-gray-700 font-semibold">{user.name}</span>
                <LuChevronDown className="w-4 h-4 text-gray-700" />
              </div>

              <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Mobile tap */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-1 text-gray-700 font-semibold"
              >
                <LuCircleUser className="w-5 h-5" />
                {user.name}
                <LuChevronDown className="w-4 h-4" />
              </button>
              {isProfileOpen && (
                <div className="mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2 flex flex-col">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      <button
        className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <LuX className="w-6 h-6" />
        ) : (
          <LuMenu className="w-6 h-6" />
        )}
      </button>
    </header>
  );
};

export default Navbar;
