import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Local files (Ensure .js extensions are present)
import aiRoutes from "./routes/ai.js";
import authRoutes from "./routes/auth.js";
import authMiddleware from "./middleware/auth.js";

// __dirname setup for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// .env file ka exact path set kar rahe hain
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

// Middleware
app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// --- ROUTES ---

// 1. Connection Test Route
app.get("/", (req, res) => {
  res.send("🚀 Server is running smoothly!");
});

// 2. Auth Routes (Signup/Login)
app.use("/api/auth", authRoutes);

// 3. AI Routes (Summarizer/Debugger)
app.use("/api/ai", aiRoutes);

// 4. User Profile Route
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ msg: `Hello user ${req.user.id}, you are authenticated` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  // Debug: Check karein ki key load hui ya nahi
  console.log("🔑 Gemini API Key Status:", process.env.GEMINI_API_KEY ? "Loaded ✅" : "Missing ❌");
});