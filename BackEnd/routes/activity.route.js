const express = require("express");
const {
  createActivity,
  getActivities,
  updateActivity,
  deleteActivity,
} = require("../controllers/activity.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["owner", "vet", "admin"]),
  createActivity
);
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["owner", "vet", "admin"]),
  getActivities
);
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["owner", "vet", "admin"]),
  updateActivity
);
router.delete(
  "/delete/:id",
  authMiddleware,
  roleMiddleware(["owner", "admin"]),
  deleteActivity
);

module.exports = router;
