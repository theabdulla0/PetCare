const Insurance = require("../models/Insuarance");

// Create new insurance record
const createInsurance = async (req, res) => {
  try {
    const { pet, provider, policyNumber, coverage, expiryDate } = req.body;

    if (!pet || !provider || !policyNumber) {
      return res
        .status(400)
        .json({ message: "Pet, provider, and policy number are required" });
    }

    const insurance = await Insurance.create({
      pet,
      provider,
      policyNumber,
      coverage,
      expiryDate,
    });

    res.status(201).json({ success: true, insurance });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create insurance", error: error.message });
  }
};

// Get insurance by pet
const getInsuranceByPet = async (req, res) => {
  try {
    const { petId } = req.params;

    const insurance = await Insurance.findOne({ pet: petId }).populate(
      "pet",
      "name breed age"
    );

    if (!insurance) {
      return res
        .status(404)
        .json({ message: "No insurance found for this pet" });
    }

    res.status(200).json({ success: true, insurance });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch insurance", error: error.message });
  }
};

// Update insurance details
const updateInsurance = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const insurance = await Insurance.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!insurance) {
      return res.status(404).json({ message: "Insurance not found" });
    }

    res.status(200).json({ success: true, insurance });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update insurance", error: error.message });
  }
};

// Delete insurance
const deleteInsurance = async (req, res) => {
  try {
    const { id } = req.params;

    const insurance = await Insurance.findByIdAndDelete(id);

    if (!insurance) {
      return res.status(404).json({ message: "Insurance not found" });
    }

    res.status(200).json({ success: true, message: "Insurance deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete insurance", error: error.message });
  }
};

// Add a claim
const addClaim = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, amount, status } = req.body;

    const insurance = await Insurance.findById(id);
    if (!insurance) {
      return res.status(404).json({ message: "Insurance not found" });
    }

    insurance.claimHistory.push({ date, amount, status });
    await insurance.save();

    res.status(200).json({ success: true, insurance });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add claim", error: error.message });
  }
};

// Update claim status
const updateClaimStatus = async (req, res) => {
  try {
    const { id, claimId } = req.params;
    const { status } = req.body;

    const insurance = await Insurance.findById(id);
    if (!insurance) {
      return res.status(404).json({ message: "Insurance not found" });
    }

    const claim = insurance.claimHistory.id(claimId);
    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }

    claim.status = status;
    await insurance.save();

    res.status(200).json({ success: true, insurance });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update claim status", error: error.message });
  }
};

module.exports = {
  createInsurance,
  getInsuranceByPet,
  updateInsurance,
  deleteInsurance,
  addClaim,
  updateClaimStatus,
};
