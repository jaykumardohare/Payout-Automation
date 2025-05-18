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
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

app.use("/api/mentors", mentorRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/receipts", receiptRoutes);


app.get("/", (req, res) => res.send("Payout Automation System API"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
