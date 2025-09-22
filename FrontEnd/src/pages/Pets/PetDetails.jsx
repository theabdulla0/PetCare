import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LuPawPrint } from "react-icons/lu";
import { useSelector, useDispatch } from "react-redux";
import { deletePet, fetchPets } from "../../features/pet/petSlice";
import LayoutDashboard from "../layoutDashboard";

function PetDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pets, loading, error } = useSelector((state) => state.pets);

  const [pet, setPet] = useState(null);
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    // If pet exists in Redux, use it
    const foundPet = pets.find((p) => p._id === id);
    if (foundPet) {
      setPet(foundPet);
    } else {
      // Otherwise, fetch pets
      dispatch(fetchPets());
    }
  }, [dispatch, pets, id]);

  useEffect(() => {
    if (!pet) {
      const foundPet = pets.find((p) => p._id === id);
      if (foundPet) setPet(foundPet);
    }
  }, [pets, pet, id]);

  if (loading || !pet) {
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
        <div className="bg-white shadow-xl rounded-2xl w-full max-w-4xl p-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <LuPawPrint className="text-green-600 w-10 h-10" />
              <div>
                <h1 className="text-3xl font-bold text-green-700">{pet.name}</h1>
                <p className="text-gray-600">{pet.breed || "Unknown Breed"}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <button
                onClick={() => navigate(`/pets/edit/${pet._id}`)}
                className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  if (window.confirm(`Are you sure you want to delete ${pet.name}?`)) {
                    dispatch(deletePet(pet._id));
                    navigate("/pets");
                  }
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-green-50 rounded-lg shadow-inner">
              <p>
                <span className="font-semibold">Age:</span> {pet.age || "Not set"}
              </p>
              <p>
                <span className="font-semibold">Gender:</span> {pet.gender || "Not set"}
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg shadow-inner">
              <p>
                <span className="font-semibold">Weight:</span> {pet.weight || "Not set"} kg
              </p>
              {pet.medicalHistory && (
                <p className="italic text-gray-600">
                  <span className="font-semibold">Medical History:</span> "{pet.medicalHistory}"
                </p>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6 border-b border-gray-200">
            <nav className="-mb-px flex gap-4">
              {["general", "medical", "vaccinations", "activities"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 font-medium ${
                    activeTab === tab
                      ? "border-b-2 border-green-500 text-green-700"
                      : "text-gray-500 hover:text-green-600"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === "general" && (
              <div className="space-y-2 text-gray-700">
                <p><span className="font-semibold">Name:</span> {pet.name}</p>
                <p><span className="font-semibold">Breed:</span> {pet.breed || "Not set"}</p>
                <p><span className="font-semibold">Age:</span> {pet.age || "Not set"}</p>
                <p><span className="font-semibold">Gender:</span> {pet.gender || "Not set"}</p>
                <p><span className="font-semibold">Weight:</span> {pet.weight || "Not set"} kg</p>
              </div>
            )}

            {activeTab === "medical" && (
              <div className="space-y-2 text-gray-700">
                {pet.medicalHistory ? (
                  <p>{pet.medicalHistory}</p>
                ) : (
                  <p className="text-gray-500 italic">No medical history available.</p>
                )}
              </div>
            )}

            {activeTab === "vaccinations" && (
              <div className="space-y-2 text-gray-700">
                {pet.vaccinations?.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {pet.vaccinations.map((v, idx) => (
                      <li key={idx}>{v}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic">No vaccination records.</p>
                )}
              </div>
            )}

            {activeTab === "activities" && (
              <div className="space-y-2 text-gray-700">
                {pet.activities?.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {pet.activities.map((a, idx) => (
                      <li key={idx}>{a}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic">No activity records.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </LayoutDashboard>
  );
}

export default PetDetails;
