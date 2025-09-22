const express = require("express");
const {
  createHealthRecord,
  getHealthRecords,
  updateHealthRecord,
  deleteHealthRecord,
} = require("../controllers/health.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["owner", "vet", "admin"]),
  createHealthRecord
);
router.get(
  "/:petId",
  authMiddleware,
  roleMiddleware(["owner", "vet", "admin"]),
  getHealthRecords
);
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["owner", "vet", "admin"]),
  updateHealthRecord
);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["owner", "vet", "admin"]),
  deleteHealthRecord
);

module.exports = router;
