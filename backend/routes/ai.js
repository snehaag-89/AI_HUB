import express from "express";
import authMiddleware from "../middleware/auth.js";
import OpenAI from "openai";

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Notes Summarizer
router.post("/summarize", authMiddleware, async (req, res) => {
  const { text } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: `Summarize this text: ${text}` }],
    });
    res.json({ summary: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "AI summarization failed" });
  }
});

// Code Debugger
router.post("/code-debugger", authMiddleware, async (req, res) => {
  const { code } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: `Debug this code and explain issues if any. Return corrected code:\n${code}`,
        },
      ],
    });
    res.json({ result: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Code debugging failed" });
  }
});

// Interview Simulator
router.post("/interview", authMiddleware, async (req, res) => {
  const { role, answers } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: `Simulate an interview for role "${role}". Evaluate answers: "${answers}"`,
        },
      ],
    });
    res.json({ evaluation: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Interview simulation failed" });
  }
});

// Resume Analyzer
router.post("/resume", authMiddleware, async (req, res) => {
  const { resumeText } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: `Analyze this resume, extract skills, suggest improvements:\n${resumeText}`,
        },
      ],
    });
    res.json({ analysis: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Resume analysis failed" });
  }
});

// Caption/Content Generator
router.post("/caption", authMiddleware, async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: `Generate catchy captions, hashtags or short content for: "${prompt}"`,
        },
      ],
    });
    res.json({ caption: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Caption generation failed" });
  }
});

export default router;