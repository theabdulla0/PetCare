import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUsers } from "../../features/admin/adminUserSlice";
import DeleteCard from "../../components/DeleteCard";
import DeleteButton from "../../components/common/DeletButton"; // ensure it accepts onClick
import LayoutAdmin from "./AdminLayout";

function AdminUsersList() {
  const dispatch = useDispatch();
  const {
    items: users,
    loading,
    error,
  } = useSelector((state) => state.admin.users);

  const [showDelete, setShowDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (user) => {
    setSelectedUser(user);
    setShowDelete(true);
  };

  const confirmDelete = () => {
    if (selectedUser?._id) {
      dispatch(deleteUser(selectedUser._id));
    }
    setShowDelete(false);
    setSelectedUser(null);
  };

  // Pagination
  const totalPages = Math.ceil((users?.length || 0) / itemsPerPage);
  const paginatedUsers = users?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <LayoutAdmin>
      <div className="min-h-screen p-6 bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">
          Admin Users
        </h1>

        {loading && (
          <p className="text-center text-gray-500">Loading users...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg overflow-hidden shadow-md">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Role</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers && paginatedUsers.length > 0 ? (
                  paginatedUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3">{user.name}</td>
                      <td className="px-4 py-3">{user.email}</td>
                      <td className="px-4 py-3 capitalize">{user.role}</td>
                      <td className="px-4 py-3 flex gap-2">
                        <DeleteButton onClick={() => handleDelete(user)} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-6 text-gray-500 italic"
                    >
                      No users found
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
            title="Delete User"
            message={`Are you sure you want to delete "${selectedUser?.name}"?`}
            onCancel={() => setShowDelete(false)}
            onConfirm={confirmDelete}
          />
        )}
      </div>
    </LayoutAdmin>
  );
}

export default AdminUsersList;
