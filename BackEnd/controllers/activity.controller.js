const Activity = require("../models/Activity");
const Pet = require("../models/Pet");
const createActivity = async (req, res) => {
  try {
    const { pet, type, description, duration, date } = req.body;

    if (!pet || !type) {
      return res.status(400).json({ message: "Pet and type are required" });
    }

    const activity = await Activity.create({
      pet,
      type,
      description,
      duration,
      date,
    });

    res.status(201).json({ success: true, activity });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create activity", error: error.message });
  }
};

// Get all activities for a pet
const getActivities = async (req, res) => {
  try {
    const userId = req.user._id;
    const userPets = await Pet.find({ owner: userId }).select("_id");
    const petIds = userPets.map((pet) => pet._id);

    const activities = await Activity.find({ pet: { $in: petIds } })
      .populate("pet", "name breed age")
      .sort({ date: -1 });
    res.status(200).json({ success: true, activities });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch activities", error: error.message });
  }
};

// Update activity
const updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const activity = await Activity.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.status(200).json({ success: true, activity });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update activity", error: error.message });
  }
};

// Delete activity
const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const activity = await Activity.findByIdAndDelete(id);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.status(200).json({ success: true, message: "Activity deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete activity", error: error.message });
  }
};

module.exports = {
  createActivity,
  getActivities,
  updateActivity,
  deleteActivity,
};
