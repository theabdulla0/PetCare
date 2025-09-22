import React, { useState, useEffect } from "react";
import LayoutDashboard from "../layoutDashboard";
import {
  LuPawPrint,
  LuActivity,
  LuFileText,
  LuCalendar,
  LuClock,
  LuNotebook,
} from "react-icons/lu";
import { fetchPets } from "../../features/pet/petSlice";
import { createActivity } from "../../features/pet/activitySlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

function AddActivity() {
  const [formData, setFormData] = useState({
    pet: "",
    type: "",
    description: "",
    date: "",
    duration: "",
  });
  const [errors, setErrors] = useState({});
  const [pets, setPets] = useState([]);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.activities);

  useEffect(() => {
    const loadPets = async () => {
      try {
        const petsData = await dispatch(fetchPets()).unwrap();
        setPets(petsData);
      } catch (err) {
        console.error("Failed to fetch pets:", err);
      }
    };
    loadPets();
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.pet) newErrors.pet = "Select a pet";
    if (!formData.type) newErrors.type = "Select activity type";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    try {
      await dispatch(createActivity(formData)).unwrap();
      toast.success("Activity added successfully!");

      setFormData({
        pet: "",
        type: "",
        description: "",
        date: "",
        duration: "",
      });
    } catch (err) {
      console.error("Failed to add activity:", err);
      toast.error(err || "Failed to add activity");
    }
  };

  return (
    <LayoutDashboard>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex justify-center items-start py-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-12 w-full max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-green-600 mb-8 text-center">
            Add Activity
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

            {/* Type */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1 flex items-center gap-2">
                <LuActivity className="w-5 h-5 text-green-500" /> Activity Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 shadow-sm ${
                  errors.type
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-green-400"
                }`}
              >
                <option value="">Select type</option>
                <option value="walk">Walk</option>
                <option value="feeding">Feeding</option>
                <option value="play">Play</option>
                <option value="medication">Medication</option>
              </select>
              {errors.type && (
                <p className="text-red-500 text-sm mt-1">{errors.type}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1 flex items-center gap-2">
                <LuFileText className="w-5 h-5 text-green-500" /> Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Optional description"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
                rows={3}
              ></textarea>
            </div>

            {/* Date */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1 flex items-center gap-2">
                <LuCalendar className="w-5 h-5 text-green-500" /> Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1 flex items-center gap-2">
                <LuClock className="w-5 h-5 text-green-500" /> Duration
                (minutes)
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="Optional"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-md flex items-center gap-2 disabled:opacity-50"
              >
                <LuNotebook className="w-5 h-5" />{" "}
                {loading ? "Adding..." : "Add Activity"}
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center mt-2">{error}</p>
            )}
          </form>
        </div>
        <ToastContainer />
      </div>
    </LayoutDashboard>
  );
}

export default AddActivity;
