import React from "react";
import { Link } from "react-router-dom";
import { LuFacebook, LuTwitter, LuInstagram, LuLinkedin } from "react-icons/lu";

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 pt-10 pb-6">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-green-500">PetCare</h3>
          <p className="text-sm text-gray-400">
            PetCare is your trusted platform for pet services, appointments, and
            activities. Caring for pets made easy.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-md font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-green-500 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-green-500 transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/features"
                className="hover:text-green-500 transition-colors"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-green-500 transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-md font-semibold mb-4">Services</h4>
          <ul className="space-y-2">
            <li>
              <Link
                to="/pets"
                className="hover:text-green-500 transition-colors"
              >
                Add Pet
              </Link>
            </li>
            <li>
              <Link
                to="/appointments"
                className="hover:text-green-500 transition-colors"
              >
                Appointments
              </Link>
            </li>
            <li>
              <Link
                to="/activities"
                className="hover:text-green-500 transition-colors"
              >
                Activities
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="hover:text-green-500 transition-colors"
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-md font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-green-500">
              <LuFacebook className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-green-500">
              <LuTwitter className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-green-500">
              <LuInstagram className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-green-500">
              <LuLinkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} PetCare. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
