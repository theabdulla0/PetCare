const express = require("express");
const {
  createInsurance,
  getInsuranceByPet,
  updateInsurance,
  deleteInsurance,
  addClaim,
  updateClaimStatus,
} = require("../controllers/insuarance.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["owner", "admin"]),
  createInsurance
);
router.get(
  "/:petId",
  authMiddleware,
  roleMiddleware(["owner", "vet", "admin"]),
  getInsuranceByPet
);
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["owner", "admin"]),
  updateInsurance
);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["owner", "admin"]),
  deleteInsurance
);

// Claim management
router.post("/:id/claims", authMiddleware, addClaim);
router.put("/:id/claims/:claimId", authMiddleware, updateClaimStatus);

module.exports = router;
