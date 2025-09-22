const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    pet: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
    vetName: { type: String, required: true },
    type: {
      type: String,
      enum: ["checkup", "vaccination", "surgery", "emergency", "other"],
      required: true,
    },
    date: { type: Date },
    notes: { type: String },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    reminderSent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
