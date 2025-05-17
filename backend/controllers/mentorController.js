const Mentor = require("../models/Mentor");

exports.createMentor = async (req, res) => {
  try {
    const mentor = new Mentor(req.body);
    await mentor.save();
    res.status(201).json(mentor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.json(mentors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMentor = async (req, res) => {
  try {
    const mentor = await Mentor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(mentor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteMentor = async (req, res) => {
  try {
    await Mentor.findByIdAndDelete(req.params.id);
    res.json({ message: "Mentor deleted." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
