import React from "react";
import LayoutUser from "./LayoutUser";

function About() {
  return (
    <LayoutUser>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10">
        <div className="bg-white rounded-2xl shadow-lg max-w-4xl w-full p-8">
          {/* Heading */}
          <h1 className="text-4xl font-bold text-center text-green-600 mb-6">
            About Us
          </h1>

          {/* Image + Intro */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
            <img
              src="https://www.petsfolio.com/in/wp-content/themes/petsfolio/images/hpy-1.png"
              alt="About Pet Care"
              className="rounded-xl shadow-md w-full md:w-1/2"
            />
            <p className="text-gray-700 text-lg leading-relaxed md:w-1/2">
              Welcome to our Pet Care platform! We are passionate about helping
              pet owners manage their pets’ health, activities, and well-being
              while staying connected with vets and caregivers. Our mission is
              to make pet care easier, smarter, and more reliable for everyone.
            </p>
          </div>

          {/* Mission & Vision Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-green-50 rounded-xl shadow hover:shadow-md transition">
              <h2 className="text-2xl font-semibold text-green-600 mb-3">
                Our Mission
              </h2>
              <p className="text-gray-700">
                To empower pet owners with the right tools and knowledge to take
                better care of their pets, ensuring a happy and healthy life for
                every furry friend.
              </p>
            </div>

            <div className="p-6 bg-green-50 rounded-xl shadow hover:shadow-md transition">
              <h2 className="text-2xl font-semibold text-green-600 mb-3">
                Our Vision
              </h2>
              <p className="text-gray-700">
                To build a trusted digital ecosystem where pet owners, vets, and
                service providers collaborate seamlessly for holistic pet care.
              </p>
            </div>
          </div>
        </div>
      </div>
    </LayoutUser>
  );
}

export default About;
