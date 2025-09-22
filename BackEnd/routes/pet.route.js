const express = require("express");
const router = express.Router();

const {
  createPet,
  getPetById,
  getPets,
  updatePet,
  deletePet,
} = require("../controllers/pet.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

router.post("/", authMiddleware, roleMiddleware(["owner", "admin"]), createPet);
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["owner", "vet", "admin"]),
  getPets
);
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(["owner", "vet", "admin"]),
  getPetById
);
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["owner", "admin"]),
  updatePet
);
router.delete("/:id", authMiddleware, roleMiddleware(['owner',"admin"]), deletePet);

module.exports = router;
