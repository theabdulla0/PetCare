import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import petReducer from "../features/pet/petSlice";
import appointmentReducer from "../features/pet/appointmentSlice";
import activityReducer from "../features/pet/activitySlice";
import adminReducer from "../features/admin/adminUserSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pets: petReducer,
    appointments: appointmentReducer,
    activities: activityReducer,
    admin: adminReducer,
  },
});
