const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

const mentorRoutes = require("./routes/mentorRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const receiptRoutes = require("./routes/receiptRoutes");

dotenv.config();

// Initialize Express
const app = express();

// Enhanced CORS configuration
const corsOptions = {
  origin: [
    'https://payout-automation-frontend.onrender.com',
    'http://localhost:5173',
    'http://127.0.0.1:5173'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

// Debugging middleware
app.use((req, res, next) => {
  console.log('Incoming request:', req.method, req.url);
  console.log('Headers:', req.headers);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Routes
app.use("/api/mentors", mentorRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/receipts", receiptRoutes);

app.get("/", (req, res) => res.send("Payout Automation System API"));

// Connect to DB and start server
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});