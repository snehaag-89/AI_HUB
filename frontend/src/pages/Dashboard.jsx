import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../services/api";

const Dashboard = () => {
  const [, setUser] = useState(null);
  const [text, setText] = useState("");
  const [code, setCode] = useState("");
  const [topic, setTopic] = useState("");
  const [emailPrompt, setEmailPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("summarizer");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/protected");
        setUser(res.data);
      } catch (err) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };
    fetchProfile();
  }, [navigate]);

  useEffect(() => {
    if (location.state?.tab) setActiveTab(location.state.tab);
  }, [location.state]);

  const callAPI = async (endpoint, body, key) => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }
    setLoading(true);
    setResult("");
    try {
      const res = await API.post(endpoint, body);
      setResult(res.data[key]);
    } catch (err) {
      alert("Something failed! Check backend console.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const tools = [
    { id: "summarizer", icon: "📝", label: "Notes Summarizer", color: "#6C63FF", glow: "rgba(108,99,255,0.5)" },
    { id: "debugger",   icon: "💻", label: "Code Debugger",    color: "#00D4AA", glow: "rgba(0,212,170,0.5)" },
    { id: "quiz",       icon: "🧠", label: "Quiz Generator",   color: "#A855F7", glow: "rgba(168,85,247,0.5)" },
    { id: "email",      icon: "✉️",  label: "Email Writer",     color: "#F97316", glow: "rgba(249,115,22,0.5)" },
  ];

  const activeTool = tools.find(t => t.id === activeTab);

  const glass = {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "20px",
  };

  const inputStyle = {
    width: "100%", padding: "14px 16px", borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.1)", fontSize: "14px",
    color: "#fff", outline: "none", boxSizing: "border-box",
    fontFamily: "inherit", background: "rgba(255,255,255,0.07)",
    resize: "vertical", lineHeight: "1.6", transition: "all 0.3s",
  };

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Segoe UI', Arial, sans-serif" }}>

      {/* Background glows */}
      <div style={{ position: "fixed", top: "10%", left: "5%", width: "400px", height: "400px", borderRadius: "50%", background: "rgba(108,99,255,0.08)", filter: "blur(100px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "10%", right: "5%", width: "350px", height: "350px", borderRadius: "50%", background: "rgba(168,85,247,0.08)", filter: "blur(100px)", pointerEvents: "none", zIndex: 0 }} />

      {/* Navbar */}
      <nav style={{ ...glass, borderRadius: 0, padding: "0 32px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100, borderLeft: "none", borderRight: "none", borderTop: "none" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => navigate("/")}>
<img src="/logo.png" alt="AI HUB" style={{ height: "50px", filter: "drop-shadow(0 0 10px rgba(0,180,255,0.6))" }} />        
        </div>
        <button onClick={handleLogout}
          style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", padding: "8px 18px", borderRadius: "10px", cursor: "pointer", fontSize: "13px", fontWeight: "600", transition: "all 0.3s" }}
          onMouseOver={e => { e.currentTarget.style.background = "rgba(239,68,68,0.2)"; e.currentTarget.style.color = "#FCA5A5"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.4)"; }}
          onMouseOut={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}>
          Logout
        </button>
      </nav>

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "40px 24px", position: "relative", zIndex: 1 }}>

        {/* Welcome */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "800", color: "#fff", margin: "0 0 6px", textShadow: "0 0 30px rgba(108,99,255,0.4)" }}>Welcome back! 👋</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", margin: 0 }}>Choose a tool below to get started.</p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "24px", flexWrap: "wrap" }}>
          {tools.map(tool => (
            <button key={tool.id}
              onClick={() => { setActiveTab(tool.id); setResult(""); }}
              style={{
                padding: "10px 20px", borderRadius: "12px", cursor: "pointer",
                fontWeight: "700", fontSize: "13px", display: "flex", alignItems: "center", gap: "7px",
                transition: "all 0.3s",
                background: activeTab === tool.id ? `linear-gradient(135deg, ${tool.color}, ${tool.color}99)` : "rgba(255,255,255,0.07)",
                color: activeTab === tool.id ? "#fff" : "rgba(255,255,255,0.5)",
                border: activeTab === tool.id ? "none" : "1px solid rgba(255,255,255,0.1)",
                boxShadow: activeTab === tool.id ? `0 8px 25px ${tool.glow}` : "none",
                transform: activeTab === tool.id ? "translateY(-2px)" : "none",
              }}>
              <span style={{ fontSize: "16px" }}>{tool.icon}</span> {tool.label}
            </button>
          ))}
        </div>

        {/* Tool Card */}
        <div style={{ ...glass, overflow: "hidden", boxShadow: `0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)` }}>
          <div style={{ height: "3px", background: `linear-gradient(90deg, ${activeTool?.color}, ${activeTool?.color}50)`, boxShadow: `0 0 20px ${activeTool?.glow}` }} />
          <div style={{ padding: "32px" }}>

            {activeTab === "summarizer" && (
              <div>
                <h2 style={{ margin: "0 0 6px", fontSize: "18px", fontWeight: "700", color: "#fff" }}>📝 Notes Summarizer</h2>
                <p style={{ margin: "0 0 20px", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>Paste your long notes and get a crisp summary.</p>
                <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Paste your notes here..."
                  style={{ ...inputStyle, height: "160px" }}
                  onFocus={e => { e.target.style.borderColor = "rgba(108,99,255,0.5)"; e.target.style.boxShadow = "0 0 20px rgba(108,99,255,0.15)"; }}
                  onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }} />
                <button onClick={() => callAPI("/ai/summarize", { text }, "summary")} disabled={loading}
                  style={{ marginTop: "16px", padding: "12px 28px", background: loading ? "rgba(108,99,255,0.3)" : "linear-gradient(135deg, #6C63FF, #8B5CF6)", color: "#fff", border: "none", borderRadius: "12px", cursor: loading ? "not-allowed" : "pointer", fontSize: "14px", fontWeight: "700", boxShadow: "0 8px 25px rgba(108,99,255,0.4)", transition: "all 0.3s" }}>
                  {loading ? "Summarizing..." : "✨ Summarize"}
                </button>
              </div>
            )}

            {activeTab === "debugger" && (
              <div>
                <h2 style={{ margin: "0 0 6px", fontSize: "18px", fontWeight: "700", color: "#fff" }}>💻 Code Debugger</h2>
                <p style={{ margin: "0 0 20px", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>Paste buggy code and get it fixed with explanation.</p>
                <textarea value={code} onChange={e => setCode(e.target.value)} placeholder="Paste your buggy code here..."
                  style={{ ...inputStyle, height: "160px", fontFamily: "monospace", fontSize: "13px", background: "rgba(0,0,0,0.2)" }}
                  onFocus={e => { e.target.style.borderColor = "rgba(0,212,170,0.5)"; e.target.style.boxShadow = "0 0 20px rgba(0,212,170,0.15)"; }}
                  onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }} />
                <button onClick={() => callAPI("/ai/code-debugger", { code }, "result")} disabled={loading}
                  style={{ marginTop: "16px", padding: "12px 28px", background: loading ? "rgba(0,212,170,0.3)" : "linear-gradient(135deg, #00D4AA, #00B894)", color: "#fff", border: "none", borderRadius: "12px", cursor: loading ? "not-allowed" : "pointer", fontSize: "14px", fontWeight: "700", boxShadow: "0 8px 25px rgba(0,212,170,0.4)", transition: "all 0.3s" }}>
                  {loading ? "Analyzing..." : "🔍 Fix Code"}
                </button>
              </div>
            )}

            {activeTab === "quiz" && (
              <div>
                <h2 style={{ margin: "0 0 6px", fontSize: "18px", fontWeight: "700", color: "#fff" }}>🧠 Quiz Generator</h2>
                <p style={{ margin: "0 0 20px", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>Enter any topic and get 5 MCQ questions instantly.</p>
                <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. Python, World War II, Photosynthesis..."
                  style={{ ...inputStyle, height: "auto", resize: "none" }}
                  onFocus={e => { e.target.style.borderColor = "rgba(168,85,247,0.5)"; e.target.style.boxShadow = "0 0 20px rgba(168,85,247,0.15)"; }}
                  onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }} />
                <button onClick={() => callAPI("/ai/quiz", { topic }, "result")} disabled={loading}
                  style={{ marginTop: "16px", padding: "12px 28px", background: loading ? "rgba(168,85,247,0.3)" : "linear-gradient(135deg, #A855F7, #7C3AED)", color: "#fff", border: "none", borderRadius: "12px", cursor: loading ? "not-allowed" : "pointer", fontSize: "14px", fontWeight: "700", boxShadow: "0 8px 25px rgba(168,85,247,0.4)", transition: "all 0.3s" }}>
                  {loading ? "Generating..." : "🎯 Generate Quiz"}
                </button>
              </div>
            )}

            {activeTab === "email" && (
              <div>
                <h2 style={{ margin: "0 0 6px", fontSize: "18px", fontWeight: "700", color: "#fff" }}>✉️ Email Writer</h2>
                <p style={{ margin: "0 0 20px", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>Describe what you need and get a professional email.</p>
                <textarea value={emailPrompt} onChange={e => setEmailPrompt(e.target.value)} placeholder="e.g. Leave application to my manager for 3 days..."
                  style={{ ...inputStyle, height: "130px" }}
                  onFocus={e => { e.target.style.borderColor = "rgba(249,115,22,0.5)"; e.target.style.boxShadow = "0 0 20px rgba(249,115,22,0.15)"; }}
                  onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }} />
                <button onClick={() => callAPI("/ai/email", { prompt: emailPrompt }, "result")} disabled={loading}
                  style={{ marginTop: "16px", padding: "12px 28px", background: loading ? "rgba(249,115,22,0.3)" : "linear-gradient(135deg, #F97316, #EA580C)", color: "#fff", border: "none", borderRadius: "12px", cursor: loading ? "not-allowed" : "pointer", fontSize: "14px", fontWeight: "700", boxShadow: "0 8px 25px rgba(249,115,22,0.4)", transition: "all 0.3s" }}>
                  {loading ? "Writing..." : "📧 Write Email"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Result */}
        {result && (
          <div style={{ marginTop: "24px", ...glass, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)" }}>
            <div style={{ padding: "14px 24px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00D4AA", display: "inline-block", boxShadow: "0 0 10px rgba(0,212,170,0.8)" }}></span>
              <span style={{ fontSize: "13px", fontWeight: "700", color: "rgba(255,255,255,0.6)" }}>Result</span>
            </div>
            <div style={{ padding: "24px" }}>
              <pre style={{ whiteSpace: "pre-wrap", margin: 0, fontSize: "14px", lineHeight: "1.8", color: "rgba(255,255,255,0.8)", fontFamily: "inherit" }}>{result}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;