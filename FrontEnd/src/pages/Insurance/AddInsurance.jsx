import React, { useState, useEffect } from "react";
import LayoutDashboard from "../LayoutDashboard";
import {
  LuPawPrint,
  LuShieldCheck,
  LuFileText,
  LuCalendar,
  LuNotebook,
} from "react-icons/lu";
import axios from "axios";

function AddInsurance() {
  const [formData, setFormData] = useState({
    pet: "",
    provider: "",
    policyNumber: "",
    coverage: "",
    expiryDate: "",
  });

  const [errors, setErrors] = useState({});
  const [pets, setPets] = useState([]);

  useEffect(() => {
    // Optional: fetch pets list for dropdown
    // axios.get("/api/pets").then(res => setPets(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!formData.pet) newErrors.pet = "Select a pet";
    if (!formData.provider.trim()) newErrors.provider = "Enter provider name";
    if (!formData.policyNumber.trim())
      newErrors.policyNumber = "Enter policy number";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    try {
      const response = await axios.post("/api/insurances", formData);
      console.log("Insurance added:", response.data);
      alert("Insurance added successfully!");
      setFormData({
        pet: "",
        provider: "",
        policyNumber: "",
        coverage: "",
        expiryDate: "",
      });
    } catch (error) {
      console.error("Failed to add insurance:", error);
      alert("Failed to add insurance");
    }
  };

  return (
    <LayoutDashboard>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex justify-center items-start py-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-12 w-full max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-green-600 mb-8 text-center">
            Add Insurance
          </h1>

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Pet */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1 flex items-center gap-2">
                <LuPawPrint className="w-5 h-5 text-green-500" /> Pet
              </label>
              <select
                name="pet"
                value={formData.pet}
                onChange={handleChange}
                className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 shadow-sm ${
                  errors.pet
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-green-400"
                }`}
              >
                <option value="">Select pet</option>
                {pets.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>
              {errors.pet && (
                <p className="text-red-500 text-sm mt-1">{errors.pet}</p>
              )}
            </div>

            {/* Provider */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1 flex items-center gap-2">
                <LuShieldCheck className="w-5 h-5 text-green-500" /> Provider
              </label>
              <input
                type="text"
                name="provider"
                value={formData.provider}
                onChange={handleChange}
                placeholder="Provider Name"
                className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 shadow-sm ${
                  errors.provider
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-green-400"
                }`}
              />
              {errors.provider && (
                <p className="text-red-500 text-sm mt-1">{errors.provider}</p>
              )}
            </div>

            {/* Policy Number */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1 flex items-center gap-2">
                <LuFileText className="w-5 h-5 text-green-500" /> Policy Number
              </label>
              <input
                type="text"
                name="policyNumber"
                value={formData.policyNumber}
                onChange={handleChange}
                placeholder="Policy Number"
                className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 shadow-sm ${
                  errors.policyNumber
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-green-400"
                }`}
              />
              {errors.policyNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.policyNumber}
                </p>
              )}
            </div>

            {/* Coverage */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1 flex items-center gap-2">
                <LuFileText className="w-5 h-5 text-green-500" /> Coverage
              </label>
              <input
                type="text"
                name="coverage"
                value={formData.coverage}
                onChange={handleChange}
                placeholder="Coverage Details"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
              />
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1 flex items-center gap-2">
                <LuCalendar className="w-5 h-5 text-green-500" /> Expiry Date
              </label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-md flex items-center gap-2"
              >
                <LuNotebook className="w-5 h-5" /> Add Insurance
              </button>
            </div>
          </form>
        </div>
      </div>
    </LayoutDashboard>
  );
}

export default AddInsurance;
