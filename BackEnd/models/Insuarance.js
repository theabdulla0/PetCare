const mongoose = require("mongoose");

const insuranceSchema = new mongoose.Schema(
  {
    pet: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
    provider: { type: String, required: true },
    policyNumber: { type: String, required: true },
    coverage: { type: String },
    expiryDate: { type: Date },
    claimHistory: [
      {
        date: Date,
        amount: Number,
        status: {
          type: String,
          enum: ["pending", "approved", "rejected"],
          default: "pending",
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Insurance", insuranceSchema);
