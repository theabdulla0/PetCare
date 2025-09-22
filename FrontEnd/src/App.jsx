import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Dashboard from "./pages/Dashboard";
import AddPet from "./pages/Pets/AddPet";
import AddInsurance from "./pages/Insurance/AddInsurance";
import AddActivity from "./pages/Activities/AddActivity";
import BookAppointment from "./pages/Appointments/BookAppointment";
import PetList from "./pages/Pets/PetList";
import PetDetails from "./pages/Pets/PetDetails";
import EditPet from "./pages/Pets/EditPet";
import AppointmentList from "./pages/Appointments/AppointmentList";
import ActivityList from "./pages/Activities/ActivityList";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminUsersList from "./pages/Admin/AdminUsersList";
import AdminPetsList from "./pages/Admin/AdminPetsList";
import AdminProtected from "./components/admin/AdminProtected";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* user routes */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pets"
          element={
            <ProtectedRoute>
              <PetList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pets/add"
          element={
            <ProtectedRoute>
              <AddPet />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pets/:id"
          element={
            <ProtectedRoute>
              <PetDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pets/edit/:id"
          element={
            <ProtectedRoute>
              <EditPet />
            </ProtectedRoute>
          }
        />
        <Route
          path="/activities/add"
          element={
            <ProtectedRoute>
              <AddActivity />
            </ProtectedRoute>
          }
        />
        <Route
          path="/activities"
          element={
            <ProtectedRoute>
              <ActivityList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/appointments/book"
          element={
            <ProtectedRoute>
              <BookAppointment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <AppointmentList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/insurances/add"
          element={
            <ProtectedRoute>
              <AddInsurance />
            </ProtectedRoute>
          }
        />

        <Route
          path="admin/dashboard"
          element={
            <AdminProtected>
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            </AdminProtected>
          }
        />
        <Route
          path="admin/users"
          element={
            <AdminProtected>
              <ProtectedRoute>
                <AdminUsersList />
              </ProtectedRoute>
            </AdminProtected>
          }
        />
        <Route
          path="admin/pets"
          element={
            <AdminProtected>
              <ProtectedRoute>
                <AdminPetsList />
              </ProtectedRoute>
            </AdminProtected>
          }
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
