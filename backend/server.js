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
    'https://payout-automation-frontend.onrender.com', // your production frontend
    'http://localhost:5000' // your local development
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
// Add this middleware right after CORS setup
app.use((req, res, next) => {
  console.log('Incoming request:', req.method, req.url);
  console.log('Origin:', req.headers.origin);
  next();
});

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Pre-flight request handling

app.use("/api/mentors", mentorRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/receipts", receiptRoutes);


app.get("/", (req, res) => res.send("Payout Automation System API"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
