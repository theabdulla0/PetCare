const express = require("express");
const {
  addAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/Appointment.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const router = express.Router();

router.post(
  "/add",
  authMiddleware,
  roleMiddleware(["owner", "admin"]),
  addAppointment
);
router.get(
  "/:petId",
  authMiddleware,
  roleMiddleware(["owner", "admin"]),
  getAppointments
);
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["owner", "admin"]),
  updateAppointment
);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["owner", "admin"]),
  deleteAppointment
);

module.exports = router;
