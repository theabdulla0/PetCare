import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// --------------------- USERS ---------------------
export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return userId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// --------------------- PETS ---------------------
export const fetchPets = createAsyncThunk(
  "admin/fetchPets",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/admin/pets`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deletePet = createAsyncThunk(
  "admin/deletePet",
  async (petId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/admin/pets/${petId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return petId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// --------------------- APPOINTMENTS ---------------------
export const fetchAppointments = createAsyncThunk(
  "admin/fetchAppointments",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/admin/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteAppointment = createAsyncThunk(
  "admin/deleteAppointment",
  async (appointmentId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/admin/appointments/${appointmentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return appointmentId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// --------------------- ACTIVITIES ---------------------
export const fetchActivities = createAsyncThunk(
  "admin/fetchActivities",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/admin/activities`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteActivity = createAsyncThunk(
  "admin/deleteActivity",
  async (activityId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/admin/activities/${activityId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return activityId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// --------------------- SLICE ---------------------
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: { items: [], loading: false, error: null },
    pets: { items: [], loading: false, error: null },
    appointments: { items: [], loading: false, error: null },
    activities: { items: [], loading: false, error: null },
  },
  reducers: {},
  extraReducers: (builder) => {
    // USERS
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.users.loading = true;
        state.users.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users.loading = false;
        state.users.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.users.loading = false;
        state.users.error = action.payload || action.error.message;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users.items = state.users.items.filter(
          (u) => u._id !== action.payload
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.users.error = action.payload || action.error.message;
      });

    // PETS
    builder
      .addCase(fetchPets.pending, (state) => {
        state.pets.loading = true;
        state.pets.error = null;
      })
      .addCase(fetchPets.fulfilled, (state, action) => {
        state.pets.loading = false;
        state.pets.items = action.payload;
      })
      .addCase(fetchPets.rejected, (state, action) => {
        state.pets.loading = false;
        state.pets.error = action.payload || action.error.message;
      })
      .addCase(deletePet.fulfilled, (state, action) => {
        state.pets.items = state.pets.items.filter(
          (p) => p._id !== action.payload
        );
      })
      .addCase(deletePet.rejected, (state, action) => {
        state.pets.error = action.payload || action.error.message;
      });

    // APPOINTMENTS
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.appointments.loading = true;
        state.appointments.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.appointments.loading = false;
        state.appointments.items = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.appointments.loading = false;
        state.appointments.error = action.payload || action.error.message;
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.appointments.items = state.appointments.items.filter(
          (a) => a._id !== action.payload
        );
      })
      .addCase(deleteAppointment.rejected, (state, action) => {
        state.appointments.error = action.payload || action.error.message;
      });

    // ACTIVITIES
    builder
      .addCase(fetchActivities.pending, (state) => {
        state.activities.loading = true;
        state.activities.error = null;
      })
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.activities.loading = false;
        state.activities.items = action.payload;
      })
      .addCase(fetchActivities.rejected, (state, action) => {
        state.activities.loading = false;
        state.activities.error = action.payload || action.error.message;
      })
      .addCase(deleteActivity.fulfilled, (state, action) => {
        state.activities.items = state.activities.items.filter(
          (a) => a._id !== action.payload
        );
      })
      .addCase(deleteActivity.rejected, (state, action) => {
        state.activities.error = action.payload || action.error.message;
      });
  },
});

export default adminSlice.reducer;
