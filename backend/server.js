const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

const mentorRoutes = require("./routes/mentorRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const receiptRoutes = require("./routes/receiptRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
const corsOptions = {
  origin: [
    'https://payout-automation-frontend.onrender.com', // Your frontend URL
    'http://localhost:5173' // For local testing
  ]
};
app.use(cors(corsOptions));
app.use(cors());

app.use("/api/mentors", mentorRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/receipts", receiptRoutes);


app.get("/", (req, res) => res.send("Payout Automation System API"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
