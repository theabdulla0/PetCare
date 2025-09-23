import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://petcare-j2ff.onrender.com/api";

// ---------------------- SIGN UP ----------------------
export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, {
        name,
        email,
        password,
      });
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "SignUp failed"
      );
    }
  }
);

// ---------------------- LOGIN ----------------------
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Login failed"
      );
    }
  }
);

// ---------------------- LOGOUT ----------------------
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return null;
  } catch (error) {
    return thunkAPI.rejectWithValue("Logout failed.");
  }
});

// ---------------------- FORGOT PASSWORD ----------------------
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/signup/forgot-password`,
        { email }
      );
      return response.data; // e.g., { message: "Email sent" }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Forgot password failed"
      );
    }
  }
);

// ---------------------- RESET PASSWORD ----------------------
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, newPassword }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/signup/reset-password`,
        { token, newPassword }
      );
      return response.data; // e.g., { message: "Password reset successful" }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Reset password failed"
      );
    }
  }
);

// ---------------------- SLICE ----------------------

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    message: null, // for forgot/reset password success messages
  },
  reducers: {
    resetAuthState: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    // SignUp
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message || "Signup successful";
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          _id: action.payload._id,
          name: action.payload.name,
          email: action.payload.email,
          role: action.payload.role,
          createdAt: action.payload.createdAt,
        };
        state.token = action.payload.token;

        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Logout
    builder
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.error = null;
        state.message = "Logged out successfully";
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
      });

    // Forgot Password
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message =
          action.payload.message || "Email sent for password reset.";
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Reset Password
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message || "Password reset successful.";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
export const { resetAuthState } = authSlice.actions;
