import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LayoutDashboard from "../LayoutDashboard";
import { LuSearch, LuFilter } from "react-icons/lu";
import { ToastContainer, toast } from "react-toastify";
import DeleteButton from "../../components/common/DeletButton";
import EditButton from "../../components/common/EditButton";
import {
  fetchActivities,
  deleteActivity,
} from "../../features/pet/activitySlice";
import DeleteCard from "../../components/DeleteCard"; // adjust path

function ActivityList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    items: activities,
    loading,
    error,
  } = useSelector((state) => state.activities);

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const itemsPerPage = 5;

  // Fetch activities on mount
  useEffect(() => {
    dispatch(fetchActivities());
  }, [dispatch]);

  // Filter + search
  const filteredActivities = useMemo(() => {
    return activities
      .filter((act) => {
        const matchesSearch =
          act.pet.name.toLowerCase().includes(search.toLowerCase()) ||
          act.type.toLowerCase().includes(search.toLowerCase()) ||
          (act.description || "").toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filterType ? act.type === filterType : true;
        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [activities, search, filterType]);

  // Pagination
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const paginatedActivities = filteredActivities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Delete handlers
  const handleDelete = (activity) => {
    setSelectedActivity(activity);
    setShowDelete(true);
  };

  const confirmDelete = () => {
    if (selectedActivity?._id) {
      dispatch(deleteActivity(selectedActivity._id));
      toast.success("Activity deleted successfully!");
    } else {
      toast.error("Failed to delete activity. Please try again.");
    }
    setSelectedActivity(null);
    setShowDelete(false);
  };

  return (
    <LayoutDashboard>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex justify-center items-start py-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-12 w-full max-w-5xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-green-600 mb-8 text-center">
            Activity List
          </h1>

          {/* Search + Filter + Add */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="relative flex-1">
              <LuSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search by pet, type, or description"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none shadow-sm"
              />
            </div>

            <div className="flex items-center gap-2">
              <LuFilter className="text-gray-500" />
              <select
                value={filterType}
                onChange={(e) => {
                  setFilterType(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none shadow-sm"
              >
                <option value="">All Types</option>
                <option value="walk">Walk</option>
                <option value="feeding">Feeding</option>
                <option value="play">Play</option>
                <option value="medication">Medication</option>
              </select>

              <Link
                to="/activities/add"
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Add Activity
              </Link>
            </div>
          </div>

          {/* Loading/Error */}
          {loading && (
            <p className="text-center text-gray-500 py-4">
              Loading activities...
            </p>
          )}
          {error && <p className="text-center text-red-500 py-4">{error}</p>}

          {/* Activity Table */}
          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse rounded-lg overflow-hidden shadow-md">
                <thead className="bg-green-100 text-green-700">
                  <tr>
                    <th className="px-4 py-3 text-left">Pet</th>
                    <th className="px-4 py-3 text-left">Type</th>
                    <th className="px-4 py-3 text-left">Description</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Duration</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedActivities.length > 0 ? (
                    paginatedActivities.map((activity) => (
                      <tr
                        key={activity._id}
                        className="border-b hover:bg-green-50 transition"
                      >
                        <td className="px-4 py-3">{activity.pet.name}</td>
                        <td className="px-4 py-3 capitalize">
                          {activity.type}
                        </td>
                        <td className="px-4 py-3">
                          {activity.description || "-"}
                        </td>
                        <td className="px-4 py-3">
                          {new Date(activity.date).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          {activity.duration
                            ? `${activity.duration} mins`
                            : "-"}
                        </td>
                        <td className="px-4 py-3 flex gap-2">
                          <EditButton
                            onClick={() =>
                              navigate(`/activities/edit/${activity._id}`)
                            }
                          />

                          <DeleteButton
                            onClick={() => handleDelete(activity)}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center py-6 text-gray-500 italic"
                      >
                        No activities found
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
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Delete Modal */}
      {showDelete && (
        <DeleteCard
          isOpen={showDelete}
          title="Delete Activity"
          message={`Delete activity "${selectedActivity?.type}" for ${selectedActivity?.pet?.name}?`}
          onCancel={() => setShowDelete(false)}
          onConfirm={confirmDelete}
        />
      )}

      <ToastContainer />
    </LayoutDashboard>
  );
}

export default ActivityList;
