const PetModel = require("../models/Pet");

//
const createPet = async (req, res) => {
  try {
    // console.log(req.body);
    const pet = await PetModel.create({ ...req.body, owner: req.user._id });
    // console.log(pet)
    res.status(201).json(pet);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getPets = async (req, res) => {
  try {
    const pets = await PetModel.find({ owner: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPetById = async (req, res) => {
  try {
    const pet = await PetModel.findById(req.params.id);
    if (!pet || pet.owner.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Pet not found" });
    }
    res.json(pet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updatePet = async (req, res) => {
  try {
    const pet = await PetModel.findById(req.params.id);
    if (!pet || pet.owner.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Pet not found" });
    }
    console.log(req.body);
    Object.assign(pet, req.body);
    await pet.save();
    res.json(pet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deletePet = async (req, res) => {
  try {
    const pet = await PetModel.findById(req.params.id);
    if (!pet || pet.owner.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Pet not found" });
    }
    await pet.deleteOne();
    res.json({ message: "Pet deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createPet,
  getPetById,
  getPets,
  updatePet,
  deletePet,
};
