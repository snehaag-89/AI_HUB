import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  plan: { type: String, default: "free" },    // free or paid
  credits: { type: Number, default: 5 },      // daily AI usage credits
  history: [{ type: mongoose.Schema.Types.ObjectId, ref: "History" }]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User; // Modern ES Module export