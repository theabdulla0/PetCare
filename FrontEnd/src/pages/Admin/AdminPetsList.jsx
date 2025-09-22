import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPets, deletePet } from "../../features/admin/adminUserSlice"; // make sure deletePet exists
import DeleteCard from "../../components/DeleteCard";
import DeleteButton from "../../components/common/DeletButton";
import LayoutAdmin from "./AdminLayout";

function AdminPetsList() {
  const dispatch = useDispatch();
  const {
    items: petsItems,
    loading,
    error,
  } = useSelector((state) => state.admin.pets);

  const [showDelete, setShowDelete] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchPets());
  }, [dispatch]);

  const handleDelete = (pet) => {
    setSelectedPet(pet);
    setShowDelete(true);
  };

  const confirmDelete = () => {
    if (selectedPet?._id) {
      dispatch(deletePet(selectedPet._id));
    }
    setShowDelete(false);
    setSelectedPet(null);
  };

  // Pagination
  const totalPages = Math.ceil((petsItems?.length || 0) / itemsPerPage);
  const paginatedPets = petsItems?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <LayoutAdmin>
      <div className="min-h-screen p-6 bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">
          Admin Pets
        </h1>

        {loading && (
          <p className="text-center text-gray-500">Loading pets...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg overflow-hidden shadow-md">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Owner</th>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedPets && paginatedPets.length > 0 ? (
                  paginatedPets.map((pet) => (
                    <tr
                      key={pet._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3">{pet.name}</td>
                      <td className="px-4 py-3">{pet.owner?.name || "N/A"}</td>
                      <td className="px-4 py-3">
                        {pet.type?.charAt(0).toUpperCase() +
                          pet.type?.slice(1) || "N/A"}
                      </td>
                      <td className="px-4 py-3 flex gap-2">
                        <DeleteButton onClick={() => handleDelete(pet)} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-6 text-gray-500 italic"
                    >
                      No pets found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
            >
              Prev
            </button>
            <span className="px-3 py-1 text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        {/* Delete Modal */}
        {showDelete && (
          <DeleteCard
            isOpen={showDelete}
            title="Delete Pet"
            message={`Are you sure you want to delete "${selectedPet?.name}"?`}
            onCancel={() => setShowDelete(false)}
            onConfirm={confirmDelete}
          />
        )}
      </div>
    </LayoutAdmin>
  );
}

export default AdminPetsList;
