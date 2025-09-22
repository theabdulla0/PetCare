import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// --- Thunks ---
// 1. Add Pet
export const addPet = createAsyncThunk(
  "pets/addPet",
  async (petData, thunkAPI) => {
    try {
      const token = localStorage.getItem("token"); // if using JWT
      const response = await axios.post(`${API_URL}/pets`, petData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(token);
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add pet"
      );
    }
  }
);

// 2. Fetch Pets
export const fetchPets = createAsyncThunk(
  "pets/fetchPets",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/pets`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch pets"
      );
    }
  }
);

export const fetchPetById = createAsyncThunk(
  "pets/fetchById",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_URL}/pets/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch pets"
      );
    }
  }
);

// 3. Update Pet
export const updatePet = createAsyncThunk(
  "pets/updatePet",
  async ({ id, updates }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      console.log(updates);
      const response = await axios.put(`${API_URL}/pets/${id}`, updates, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update pet"
      );
    }
  }
);

// 4. Delete Pet
export const deletePet = createAsyncThunk(
  "pets/deletePet",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/pets/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id; // return deleted pet ID
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete pet"
      );
    }
  }
);

// --- Slice ---
const petSlice = createSlice({
  name: "pets",
  initialState: {
    pets: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Add Pet
    builder
      .addCase(addPet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPet.fulfilled, (state, action) => {
        state.loading = false;
        state.pets.push(action.payload);
      })
      .addCase(addPet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Pets
    builder
      .addCase(fetchPets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPets.fulfilled, (state, action) => {
        state.loading = false;
        state.pets = action.payload;
      })
      .addCase(fetchPets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Pet
    builder
      .addCase(updatePet.fulfilled, (state, action) => {
        const index = state.pets.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) {
          state.pets[index] = action.payload;
        }
      })
      .addCase(updatePet.rejected, (state, action) => {
        state.error = action.payload;
      });

    builder
      .addCase(fetchPetById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPetById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPet = action.payload;
      })
      .addCase(fetchPetById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    // Delete Pet
    builder
      .addCase(deletePet.fulfilled, (state, action) => {
        state.pets = state.pets.filter((p) => p._id !== action.payload);
      })
      .addCase(deletePet.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default petSlice.reducer;
