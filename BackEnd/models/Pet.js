const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: { type: String, enum: ["dog", "cat", "other"] },
    name: { type: String, required: true, trim: true },
    breed: { type: String },
    age: { type: Number },
    gender: { type: String, enum: ["male", "female"] },
    weight: { type: Number },
    medicalHistory: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pet", PetSchema);
