// src/redux/appointmentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://petcare-j2ff.onrender.com/api";

// ========== Thunks ==========

// Add new appointment
export const addAppointment = createAsyncThunk(
  "appointments/addAppointment",
  async (appointmentData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API_URL}/appointments/add`,
        appointmentData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return res.data.appointment;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Add failed");
    }
  }
);

// Fetch all appointments
export const fetchAppointments = createAsyncThunk(
  "appointments/fetchAppointments",
  async (petId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/appointments/${petId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.appointments;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Fetch failed");
    }
  }
);

// Update appointment
export const updateAppointment = createAsyncThunk(
  "appointments/updateAppointment",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${API_URL}/appointments/update/${id}`,
        updates,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data.appointment;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
  }
);

// Delete appointment
export const deleteAppointment = createAsyncThunk(
  "appointments/deleteAppointment",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/appointments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Delete failed");
    }
  }
);

// ========== Slice ==========
const appointmentSlice = createSlice({
  name: "appointments",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add
      .addCase(addAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateAppointment.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (a) => a._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      // Delete
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.items = state.items.filter((a) => a._id !== action.payload);
      });
  },
});

export default appointmentSlice.reducer;
