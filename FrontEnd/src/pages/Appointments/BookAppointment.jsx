import React, { useState, useEffect } from "react";
import LayoutDashboard from "../LayoutDashboard";
import {
  LuPawPrint,
  LuUser,
  LuCalendar,
  LuFileText,
  LuNotebook,
} from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { addAppointment } from "../../features/pet/appointmentSlice";
import { fetchPets } from "../../features/pet/petSlice";


function BookAppointment() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.appointments || {});

  const [formData, setFormData] = useState({
    pet: "",
    vetName: "",
    type: "",
    date: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [pets, setPets] = useState([]);

  useEffect(() => {
    // Fetch pets and store in local state
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
    if (!formData.vetName.trim()) newErrors.vetName = "Enter vet name";
    if (!formData.type.trim()) newErrors.type = "Enter appointment type";
    if (!formData.date) newErrors.date = "Select date";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      await dispatch(addAppointment(formData)).unwrap();
      alert("Appointment booked successfully!");
      setFormData({ pet: "", vetName: "", type: "", date: "", notes: "" });
    } catch (err) {
      alert(err || "Failed to book appointment");
    }
  };

  return (
    <LayoutDashboard>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex justify-center items-start py-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-12 w-full max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-green-600 mb-8 text-center">
            Book an Appointment
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

            {/* Vet Name */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1 flex items-center gap-2">
                <LuUser className="w-5 h-5 text-green-500" /> Vet Name
              </label>
              <input
                type="text"
                name="vetName"
                value={formData.vetName}
                onChange={handleChange}
                placeholder="Vet Name"
                className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 shadow-sm ${
                  errors.vetName
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-green-400"
                }`}
              />
              {errors.vetName && (
                <p className="text-red-500 text-sm mt-1">{errors.vetName}</p>
              )}
            </div>

            {/* Type */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1 flex items-center gap-2">
                <LuFileText className="w-5 h-5 text-green-500" /> Type
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
                <option value="checkup">Check-up</option>
                <option value="vaccination">Vaccination</option>
                <option value="surgery">Surgery</option>
                <option value="emergency">Emergency</option>
                <option value="other">Other</option>
              </select>
              {errors.type && (
                <p className="text-red-500 text-sm mt-1">{errors.type}</p>
              )}
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
                className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 shadow-sm ${
                  errors.date
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-green-400"
                }`}
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date}</p>
              )}
            </div>

            {/* Notes */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1 flex items-center gap-2">
                <LuFileText className="w-5 h-5 text-green-500" /> Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Additional notes (optional)"
                rows={4}
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
                {loading ? "Booking..." : "Book Appointment"}
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center mt-2">{error}</p>
            )}
          </form>
        </div>
      </div>
    </LayoutDashboard>
  );
}

export default BookAppointment;
