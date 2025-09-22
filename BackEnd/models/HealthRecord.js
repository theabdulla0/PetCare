const mongoose = require("mongoose");

const healthRecordSchema = new mongoose.Schema(
  {
    pet: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
    weight: { type: Number },
    symptoms: { type: String },
    diagnosis: { type: String },
    medications: [{ name: String, dosage: String, frequency: String }],
    vetNotes: { type: String },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HealthRecord", healthRecordSchema);
