import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updatePet, fetchPetById } from "../../features/pet/petSlice";
import LayoutDashboard from "../layoutDashboard";

function EditPet() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentPet, loading, error } = useSelector((state) => state.pets);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    age: "",
    gender: "",
    weight: "",
    medicalHistory: "",
  });

  // Fetch pet if not already loaded
  useEffect(() => {
    if (!currentPet || currentPet._id !== id) {
      dispatch(fetchPetById(id));
    }
  }, [dispatch, id, currentPet]);

  // Populate form once currentPet is available
  useEffect(() => {
    
    if (currentPet && currentPet._id === id) {
      setFormData({
        name: currentPet.name || "",
        breed: currentPet.breed || "",
        age: currentPet.age || "",
        gender: currentPet.gender || "",
        weight: currentPet.weight || "",
        medicalHistory: currentPet.medicalHistory || "",
      });
    }
  }, [currentPet, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentPet) return;
    await dispatch(updatePet({ id: currentPet._id, updates: formData })).unwrap();
    navigate(`/pets/${currentPet._id}`);
  };

  if (loading || !currentPet) {
    return (
      <LayoutDashboard>
        <div className="min-h-screen flex justify-center items-center">
          <p className="text-gray-500">Loading pet...</p>
        </div>
      </LayoutDashboard>
    );
  }

  if (error) {
    return (
      <LayoutDashboard>
        <div className="min-h-screen flex justify-center items-center">
          <p className="text-red-500">{error}</p>
        </div>
      </LayoutDashboard>
    );
  }

  return (
    <LayoutDashboard>
      <div className="min-h-screen bg-green-50 p-6 flex justify-center">
        <div className="bg-white shadow-xl rounded-2xl w-full max-w-2xl p-6">
          <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
            Edit Pet
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block font-semibold mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            {/* Breed */}
            <div>
              <label className="block font-semibold mb-1">Breed</label>
              <input
                type="text"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Age & Gender */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block font-semibold mb-1">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm outline-none focus:ring-2 focus:ring-green-400"
                  min="0"
                />
              </div>
              <div className="flex-1">
                <label className="block font-semibold mb-1">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm outline-none focus:ring-2 focus:ring-green-400"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            {/* Weight */}
            <div>
              <label className="block font-semibold mb-1">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm outline-none focus:ring-2 focus:ring-green-400"
                min="0"
              />
            </div>

            {/* Medical History */}
            <div>
              <label className="block font-semibold mb-1">Medical History</label>
              <textarea
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleChange}
                rows="4"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 justify-end mt-4">
              <button
                type="button"
                onClick={() => navigate(`/pets/${currentPet._id}`)}
                className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </LayoutDashboard>
  );
}

export default EditPet;
