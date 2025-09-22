const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const router = express.Router();

const {
  adminFetchUsers,
  adminSoftDeleteUser,
  adminFetchPets,
  adminDeletePet,
  adminFetchAppointments,
  adminDeleteAppointment,
  adminFetchActivities,
  adminDeleteActivity,
} = require("../controllers/admin.controller");

// ---------------- USERS ----------------
router.get(
  "/users",
  authMiddleware,
  roleMiddleware(["admin"]),
  adminFetchUsers
);
router.delete(
  "/users/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  adminSoftDeleteUser
);

// ---------------- PETS ----------------
router.get("/pets", authMiddleware, roleMiddleware(["admin"]), adminFetchPets);
router.delete(
  "/pets/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  adminDeletePet
);

// ---------------- APPOINTMENTS ----------------
router.get(
  "/appointments",
  authMiddleware,
  roleMiddleware(["admin"]),
  adminFetchAppointments
);
router.delete(
  "/appointments/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  adminDeleteAppointment
);

// ---------------- ACTIVITIES ----------------
router.get(
  "/activities",
  authMiddleware,
  roleMiddleware(["admin"]),
  adminFetchActivities
);
router.delete(
  "/activities/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  adminDeleteActivity
);

module.exports = router;
