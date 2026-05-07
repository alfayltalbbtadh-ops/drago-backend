console.log("Server starting...");

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";

import stripeRoutes from "./routes/stripe.js";
import authRoutes from "./routes/auth.js";
import orderRoutes from "./routes/orders.js";

dotenv.config();

const app = express();

// Security & middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || "*"
}));

// Stripe webhook (must be before json)
app.use("/webhook", express.raw({ type: "application/json" }));

// JSON parser
app.use(express.json());

// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ DB connected"))
  .catch(err => console.error("❌ DB ERROR:", err));

// Routes
app.use("/api/stripe", stripeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("🚀 DRAGO backend is running");
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
