const HealthRecord = require("../models/HealthRecord");

// Create health record
const createHealthRecord = async (req, res) => {
  try {
    const { pet, weight, symptoms, diagnosis, medications, vetNotes, date } =
      req.body;

    if (!pet) {
      return res.status(400).json({ message: "Pet is required" });
    }

    const healthRecord = await HealthRecord.create({
      pet,
      weight,
      symptoms,
      diagnosis,
      medications,
      vetNotes,
      date,
    });

    res.status(201).json({ success: true, healthRecord });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to create health record",
        error: error.message,
      });
  }
};

// Get all records for a pet
const getHealthRecords = async (req, res) => {
  try {
    const { petId } = req.params;

    const records = await HealthRecord.find({ pet: petId })
      .populate("pet", "name breed age")
      .sort({ date: -1 });

    res.status(200).json({ success: true, records });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch records", error: error.message });
  }
};

// Update record
const updateHealthRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const record = await HealthRecord.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!record) {
      return res.status(404).json({ message: "Health record not found" });
    }

    res.status(200).json({ success: true, record });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update record", error: error.message });
  }
};

// Delete record
const deleteHealthRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await HealthRecord.findByIdAndDelete(id);

    if (!record) {
      return res.status(404).json({ message: "Health record not found" });
    }

    res.status(200).json({ success: true, message: "Health record deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete record", error: error.message });
  }
};

module.exports = {
  createHealthRecord,
  getHealthRecords,
  updateHealthRecord,
  deleteHealthRecord,
};
