const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor", required: true },
  sessionType: { type: String, required: true },
  duration: { type: Number, required: true }, // in minutes
  date: { type: Date, required: true },
  payout: { type: Number },
  status: {
    type: String,
    enum: ["Pending", "Paid", "Under Review"],
    default: "Pending",
  },
});

module.exports = mongoose.model("Session", sessionSchema);
