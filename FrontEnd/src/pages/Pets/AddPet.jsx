import React, { useState } from "react";
import LayoutDashboard from "../layoutDashboard";
import { LuPawPrint, LuHeart, LuNotebook } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPet } from "../../features/pet/petSlice";

function AddPet() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pets, error, loading } = useSelector((state) => state.pets);
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    age: "",
    gender: "",
    weight: "",
    medicalHistory: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Please enter a pet name";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    try {
      const resultAction = await dispatch(addPet(formData));

      if (addPet.fulfilled.match(resultAction)) {
        alert("Pet added successfully!");
        setFormData({
          name: "",
          breed: "",
          age: "",
          gender: "",
          weight: "",
          medicalHistory: "",
        });
        navigate("/pets");
      } else {
        alert(resultAction.payload || "Failed to add pet");
      }
    } catch (err) {
      console.error("Error adding pet:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <LayoutDashboard>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex justify-center items-start py-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-12 w-full max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-green-600 mb-8 text-center">
            Add a New Pet
          </h1>

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Pet Name */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Pet Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your pet's name"
                className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 shadow-sm ${
                  errors.name
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-green-400"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Breed */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
                >
                  <option value="">Select Type</option>
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Breed
                </label>
                <input
                  type="text"
                  name="breed"
                  value={formData.breed}
                  onChange={handleChange}
                  placeholder="Breed"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
                />
              </div>
            </div>

            {/* Age & Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Age (years)
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Age"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            {/* Weight */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="Optional"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
              />
            </div>

            {/* Special Notes */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Special Notes
              </label>
              <textarea
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleChange}
                placeholder="Any additional info about your pet"
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-md flex items-center gap-2"
              >
                <LuNotebook className="w-5 h-5" />
                Add Pet
              </button>
            </div>
          </form>
        </div>
      </div>
    </LayoutDashboard>
  );
}

export default AddPet;
