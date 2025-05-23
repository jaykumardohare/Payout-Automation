const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  ratePerHour: { type: Number, required: true },
});

module.exports = mongoose.model("Mentor", mentorSchema);
