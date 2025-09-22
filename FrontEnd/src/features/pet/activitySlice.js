// src/features/activity/activitySlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://petcare-j2ff.onrender.com/api";

// ========== Thunks ==========

// Create a new activity
export const createActivity = createAsyncThunk(
  "activity/createActivity",
  async (activityData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${API_URL}/activity`, activityData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.activity;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create activity"
      );
    }
  }
);

// Get activities for a specific pet
export const fetchActivities = createAsyncThunk(
  "activity/fetchActivities",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(API_URL / activity, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.activities;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch activities"
      );
    }
  }
);
// Update activity
export const updateActivity = createAsyncThunk(
  "activity/updateActivity",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(`${API_URL}/activity/update/${id}`, updates, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.activity;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update activity"
      );
    }
  }
);

// Delete activity
export const deleteActivity = createAsyncThunk(
  "activity/deleteActivity",
  async (id, { rejectWithValue }) => {
    try {
      // console.log(id);
      const token = localStorage.getItem("token");

      await axios.delete(`${API_URL}/activity/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id; // return deleted ID to remove from state
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete activity"
      );
    }
  }
);

// ========== Slice ==========
const activitySlice = createSlice({
  name: "activities",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearActivityError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createActivity.pending, (state) => {
        state.loading = true;
      })
      .addCase(createActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch
      .addCase(fetchActivities.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateActivity.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (a) => a._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      // Delete
      .addCase(deleteActivity.fulfilled, (state, action) => {
        state.items = state.items.filter((a) => a._id !== action.payload);
      });
  },
});

export const { clearActivityError } = activitySlice.actions;
export default activitySlice.reducer;
