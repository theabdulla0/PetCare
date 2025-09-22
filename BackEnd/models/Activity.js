const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    pet: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
    type: {
      type: String,
      enum: ["walk", "feeding", "play", "medication"],
      required: true,
    },
    description: { type: String },
    date: { type: Date, default: Date.now },
    duration: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);
