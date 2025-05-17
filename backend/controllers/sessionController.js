const Session = require("../models/Session");
const Mentor = require("../models/Mentor");
const PDFDocument = require("pdfkit");

exports.createSession = async (req, res) => {
  try {
    const { mentor, sessionType, duration, date } = req.body;

    const mentorData = await Mentor.findById(mentor);
    if (!mentorData) {
      return res.status(404).json({ error: "Mentor not found" });
    }

    const payout = (mentorData.ratePerHour / 60) * duration;

    const session = new Session({ mentor, sessionType, duration, date, payout });
    await session.save();
    res.status(201).json(session);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.getSessions = async (req, res) => {
  try {
    const sessions = await Session.find().populate("mentor");
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSession = async (req, res) => {
  try {
    const session = await Session.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(session);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteSession = async (req, res) => {
  try {
    await Session.findByIdAndDelete(req.params.id);
    res.json({ message: "Session deleted." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.generateReceipt = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id).populate("mentor");
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    const doc = new PDFDocument();
    let filename = `receipt-${session._id}.pdf`;
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

    doc.pipe(res);

    doc.fontSize(20).text("Receipt", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Mentor: ${session.mentor.name}`);
    doc.text(`Session Type: ${session.sessionType}`);
    doc.text(`Duration: ${session.duration} minutes`);
    doc.text(`Date: ${new Date(session.date).toLocaleDateString()}`);
    doc.text(`Payout: $${session.payout.toFixed(2)}`);
    doc.text(`Status: ${session.status}`);

    doc.end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSessionStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["Pending", "Paid", "Under Review"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const session = await Session.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!session) return res.status(404).json({ error: "Session not found" });

    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

