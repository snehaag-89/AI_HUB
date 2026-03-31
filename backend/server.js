import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Local files (ESM imports need .js extension)
//import aiRoutes from "./routes/ai.js";
import authRoutes from "./routes/auth.js";
//import paymentRoutes from "./routes/payment.js";
import authMiddleware from "./middleware/auth.js";

dotenv.config();

const app = express();

// Stripe webhook needs raw body BEFORE express.json()
app.use("/api/payment/webhook", express.raw({ type: "application/json" }));

// Middleware for other routes
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Routes
//app.use("/api/ai", aiRoutes);
app.use("/api/auth", authRoutes);
//app.use("/api/payment", paymentRoutes);

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ msg: `Hello user ${req.user.id}, you are authenticated` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));