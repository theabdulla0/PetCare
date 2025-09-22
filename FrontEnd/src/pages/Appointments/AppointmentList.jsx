import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAppointments,
  deleteAppointment,
} from "../../features/pet/appointmentSlice";
import {
  LuCalendar,
  LuUser,
  LuPawPrint,
  LuChevronLeft,
  LuChevronRight,
  LuSearch,
} from "react-icons/lu";
import LayoutDashboard from "../layoutDashboard";
import { useNavigate } from "react-router-dom";

function AppointmentList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    items: appointments,
    loading,
    error,
  } = useSelector((state) => state.appointments);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 6;

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  // --- Filtering & Search ---
  const filteredAppointments =
    appointments?.filter((app) => {
      const petMatch = app.pet?.name
        ?.toLowerCase()
        .includes(search.toLowerCase());
      const vetMatch = app.vetName.toLowerCase().includes(search.toLowerCase());
      const statusMatch = filterStatus ? app.status === filterStatus : true;
      return (petMatch || vetMatch) && statusMatch;
    }) || [];

  // --- Pagination ---
  const totalPages = Math.ceil(
    filteredAppointments.length / appointmentsPerPage
  );
  const indexOfLast = currentPage * appointmentsPerPage;
  const indexOfFirst = indexOfLast - appointmentsPerPage;
  const currentAppointments = filteredAppointments.slice(
    indexOfFirst,
    indexOfLast
  );

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  return (
    <LayoutDashboard>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
        <div className="bg-white shadow-xl rounded-2xl p-6">
          <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">
            Appointments
          </h1>

          {/* Search + Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2 shadow-sm w-full sm:w-1/2">
              <LuSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Search by pet or vet..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full outline-none text-gray-700"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm text-gray-700"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Appointment List */}
          {loading ? (
            <p className="text-center text-gray-600">Loading appointments...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : currentAppointments.length === 0 ? (
            <p className="text-center text-gray-500">No appointments found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              {currentAppointments.map((app) => (
                <div
                  key={app._id}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between bg-green-50 border border-green-200 rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow"
                >
                  <div
                    className="flex items-center gap-4 mb-4 md:mb-0 flex-grow cursor-pointer"
                    onClick={() => navigate(`/appointments/${app._id}`)}
                  >
                    <LuPawPrint className="text-green-600 w-10 h-10" />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        {app.pet?.name || "Unknown Pet"}
                      </h2>
                      <p className="text-gray-600 text-sm">
                        Vet: {app.vetName} •{" "}
                        {new Date(app.date).toLocaleDateString()} • Status:{" "}
                        {app.status}
                      </p>
                      {app.notes && (
                        <p className="text-gray-500 text-sm italic">
                          "{app.notes}"
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            `Are you sure you want to delete this appointment?`
                          )
                        ) {
                          dispatch(deleteAppointment(app._id));
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

export default AppointmentList;
