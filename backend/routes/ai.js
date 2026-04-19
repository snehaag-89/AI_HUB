import express from "express";
import Groq from "groq-sdk";

const router = express.Router();

const groqChat = async (prompt) => {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const completion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama-3.3-70b-versatile",
    });
    return completion.choices[0].message.content;
};

router.post("/summarize", async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ success: false, error: "Kuch toh likho!" });
        const summary = await groqChat(`Summarize this in simple points:\n\n${text}`);
        res.status(200).json({ success: true, summary });
    } catch (error) {
        console.error("Groq Error:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.post("/code-debugger", async (req, res) => {
    try {
        const { code } = req.body;
        if (!code) return res.status(400).json({ success: false, error: "Code paste karo!" });
        const result = await groqChat(`Find bugs and fix this code. Explain what was wrong:\n\n${code}`);
        res.status(200).json({ success: true, result });
    } catch (error) {
        console.error("Groq Error:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.post("/quiz", async (req, res) => {
    try {
        const { topic } = req.body;
        if (!topic) return res.status(400).json({ success: false, error: "Topic likho!" });
        const result = await groqChat(`Generate 5 MCQ quiz questions with answers on topic: ${topic}`);
        res.status(200).json({ success: true, result });
    } catch (error) {
        console.error("Groq Error:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.post("/email", async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) return res.status(400).json({ success: false, error: "Kuch toh batao!" });
        const result = await groqChat(`Write a professional email for: ${prompt}`);
        res.status(200).json({ success: true, result });
    } catch (error) {
        console.error("Groq Error:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;