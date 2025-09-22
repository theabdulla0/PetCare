import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPets, deletePet } from "../../features/pet/petSlice";
import {
  LuPawPrint,
  LuSearch,
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import LayoutDashboard from "../layoutDashboard";

function PetList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pets, loading, error } = useSelector((state) => state.pets);

  const [search, setSearch] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const petsPerPage = 6;

  useEffect(() => {
    dispatch(fetchPets());
  }, [dispatch]);

  // --- Filtering & Search ---
  const filteredPets = pets.filter((pet) => {
    const matchesSearch = pet.name.toLowerCase().includes(search.toLowerCase());
    const matchesGender = filterGender ? pet.gender === filterGender : true;
    return matchesSearch && matchesGender;
  });

  // --- Pagination ---
  const totalPages = Math.ceil(filteredPets.length / petsPerPage);
  const indexOfLast = currentPage * petsPerPage;
  const indexOfFirst = indexOfLast - petsPerPage;
  const currentPets = filteredPets.slice(indexOfFirst, indexOfLast);

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  return (
    <LayoutDashboard>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
        <div className="bg-white shadow-xl rounded-2xl p-6">
          <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">
            My Pets
          </h1>

          {/* Search + Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2 shadow-sm w-full sm:w-1/2">
              <LuSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Search pets..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full outline-none text-gray-700"
              />
            </div>

            <select
              value={filterGender}
              onChange={(e) => setFilterGender(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm text-gray-700"
            >
              <option value="">All Genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <Link
              to="/pets/add"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Add New Pet
            </Link>
          </div>

          {/* Pet List */}
          {loading ? (
            <p className="text-center text-gray-600">Loading pets...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : currentPets.length === 0 ? (
            <p className="text-center text-gray-500">No pets found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              {currentPets.map((pet) => (
                <div
                  key={pet._id}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between bg-green-50 border border-green-200 rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow"
                >
                  {/* Clickable details only */}
                  <div
                    className="flex items-center gap-4 mb-4 md:mb-0 flex-grow cursor-pointer"
                    onClick={() => navigate(`/pets/${pet._id}`)}
                  >
                    <LuPawPrint className="text-green-600 w-10 h-10" />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        {pet.name}
                      </h2>
                      <p className="text-gray-600 text-sm">
                        {pet.breed || "Unknown Breed"} •{" "}
                        {pet.age ? `${pet.age} years` : "Age not set"} •{" "}
                        {pet.gender || "Gender not set"}
                      </p>
                      {pet.weight && (
                        <p className="text-gray-500 text-sm">
                          Weight: {pet.weight} kg
                        </p>
                      )}
                      {pet.medicalHistory && (
                        <p className="text-gray-600 text-sm italic">
                          "{pet.medicalHistory}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Buttons outside clickable area */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/pets/edit/${pet._id}`)}
                      className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            `Are you sure you want to delete ${pet.name}?`
                          )
                        ) {
                          dispatch(deletePet(pet._id));
                        }
                      }}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`p-2 rounded-full ${
                  currentPage === 1
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-green-500 text-white hover:bg-green-600"
                }`}
              >
                <LuChevronLeft />
              </button>
              <span className="text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-full ${
                  currentPage === totalPages
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-green-500 text-white hover:bg-green-600"
                }`}
              >
                <LuChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </LayoutDashboard>
  );
}

export default PetList;
