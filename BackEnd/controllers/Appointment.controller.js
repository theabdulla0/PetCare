const Appointment = require("../models/Appointment");

const addAppointment = async (req, res) => {
  try {
    const { pet, vetName, type, date, notes } = req.body;
    if (!pet || !vetName || !type || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const appointment = await Appointment.create({
      pet,
      vetName,
      type,
      date,
      notes,
      status: "pending",
    });
    res.status(201).json({ success: true, appointment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create appointment", error: error.message });
  }
};

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("pet", "name breed age") // include pet details
      .sort({ date: 1 });

    res.status(200).json({ success: true, appointments });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch appointments", error: error.message });
  }
};

const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const appointment = await Appointment.findByIdAndUpdate(id, updates, {
      new: true,
    }).populate("pet", "name breed age");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ success: true, appointment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update appointment", error: error.message });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByIdAndDelete(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ success: true, message: "Appointment deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete appointment", error: error.message });
  }
};

module.exports = {
  addAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
};
