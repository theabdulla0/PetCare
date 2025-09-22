const User = require("../models/User");
const Pet = require("../models/Pet");
const Appointment = require("../models/Appointment");
const Activity = require("../models/Activity");

// ---------------- USERS ----------------
const adminFetchUsers = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const users = await User.find({ status: "active" }).select("-password");
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const adminSoftDeleteUser = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const userId = req.params.id;

    // Prevent admin from deactivating themselves
    if (req.user._id.toString() === userId) {
      return res
        .status(400)
        .json({ success: false, message: "Cannot deactivate yourself" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { status: "inactive" }, // soft delete by setting status
      { new: true } // return the updated document
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: `User "${updatedUser.name}" has been deactivated`,
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// ---------------- PETS ----------------
const adminFetchPets = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }
    const pets = await Pet.find()
      .populate("owner", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json(pets);
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const adminDeletePet = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const petId = req.params.id;
    const deletedPet = await Pet.findByIdAndDelete(petId);
    if (!deletedPet)
      return res.status(404).json({ success: false, message: "Pet not found" });

    return res
      .status(200)
      .json({ success: true, message: "Pet deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// ---------------- APPOINTMENTS ----------------
const adminFetchAppointments = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const appointments = await Appointment.find().populate(
      "pet owner",
      "name email"
    );
    return res.status(200).json(appointments);
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const adminDeleteAppointment = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const appointmentId = req.params.id;
    const deletedAppointment = await Appointment.findByIdAndDelete(
      appointmentId
    );
    if (!deletedAppointment)
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });

    return res
      .status(200)
      .json({ success: true, message: "Appointment deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// ---------------- ACTIVITIES ----------------
const adminFetchActivities = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const activities = await Activity.find().populate(
      "pet owner",
      "name email"
    );
    return res.status(200).json(activities);
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const adminDeleteActivity = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const activityId = req.params.id;
    const deletedActivity = await Activity.findByIdAndDelete(activityId);
    if (!deletedActivity)
      return res
        .status(404)
        .json({ success: false, message: "Activity not found" });

    return res
      .status(200)
      .json({ success: true, message: "Activity deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  adminFetchUsers,
  adminSoftDeleteUser,
  adminFetchPets,
  adminDeletePet,
  adminFetchAppointments,
  adminDeleteAppointment,
  adminFetchActivities,
  adminDeleteActivity,
};
