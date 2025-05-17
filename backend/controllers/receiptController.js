const Mentor = require('../models/Mentor');
const Session = require('../models/Session');

exports.generateReceipt = async (req, res) => {
  try {
    const { mentorId } = req.params;
    const mentor = await Mentor.findById(mentorId);
    if (!mentor) return res.status(404).json({ error: 'Mentor not found' });

    const sessions = await Session.find({ mentor: mentorId }).sort({ date: -1 });

    const totalPayout = sessions.reduce((sum, s) => sum + s.payout, 0);
    const gst = +(totalPayout * 0.18).toFixed(2); // 18% GST
    const finalAmount = +(totalPayout - gst).toFixed(2);

    res.json({
      mentor,
      sessions,
      summary: {
        subtotal: totalPayout,
        gst,
        finalAmount,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
