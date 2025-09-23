const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ["owner", "vet", "admin"], default: "owner" },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    profile: {
      imageURL: { type: String, trim: true },
      address: { type: String, trim: true },
      phone: { type: Number, maxLength: 10 },
      city: { type: String, trim: true },
      country: { type: String, trim: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
