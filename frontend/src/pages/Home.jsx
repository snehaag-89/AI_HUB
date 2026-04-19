import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    { icon: "📝", title: "Notes Summarizer", desc: "Instantly convert long notes into crisp bullet points.", color: "#6C63FF", glow: "rgba(108,99,255,0.4)", tab: "summarizer" },
    { icon: "💻", title: "Code Debugger",    desc: "Paste buggy code — AI will fix and explain it.",        color: "#00D4AA", glow: "rgba(0,212,170,0.4)", tab: "debugger" },
    { icon: "🧠", title: "Quiz Generator",   desc: "Generate instant MCQ quizzes on any topic.",            color: "#A855F7", glow: "rgba(168,85,247,0.4)", tab: "quiz" },
    { icon: "✉️",  title: "Email Writer",     desc: "Get professional emails written in seconds.",           color: "#F97316", glow: "rgba(249,115,22,0.4)", tab: "email" },
  ];

  const handleFeatureClick = (tab) => {
    const token = localStorage.getItem("token");
    navigate(token ? "/dashboard" : "/login", token ? { state: { tab } } : undefined);
  };

  const glass = {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "20px",
  };

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Segoe UI', Arial, sans-serif" }}>

      {/* Navbar */}
      <nav style={{ ...glass, borderRadius: 0, padding: "0 40px", height: "65px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100, borderLeft: "none", borderRight: "none", borderTop: "none" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "26px", filter: "drop-shadow(0 0 10px rgba(108,99,255,0.8))" }}></span>
<img src="/logo.png" alt="AI HUB" style={{ height: "50px", filter: "drop-shadow(0 0 10px rgba(0,180,255,0.6))" }} />
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={() => navigate("/login")}
            style={{ padding: "9px 22px", borderRadius: "10px", border: "1px solid rgba(108,99,255,0.5)", background: "transparent", color: "#A5B4FC", fontWeight: "600", fontSize: "14px", cursor: "pointer", transition: "all 0.3s" }}
            onMouseOver={e => { e.currentTarget.style.background = "rgba(108,99,255,0.2)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(108,99,255,0.3)"; }}
            onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.boxShadow = "none"; }}>
            Login
          </button>
          <button onClick={() => navigate("/signup")}
            style={{ padding: "9px 22px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg, #6C63FF, #A855F7)", color: "#fff", fontWeight: "700", fontSize: "14px", cursor: "pointer", boxShadow: "0 4px 20px rgba(108,99,255,0.5)", transition: "all 0.3s" }}
            onMouseOver={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(108,99,255,0.7)"; }}
            onMouseOut={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(108,99,255,0.5)"; }}>
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ textAlign: "center", padding: "100px 24px 70px", maxWidth: "750px", margin: "0 auto" }}>
        <div style={{ display: "inline-block", background: "rgba(108,99,255,0.15)", border: "1px solid rgba(108,99,255,0.3)", color: "#A5B4FC", fontSize: "13px", fontWeight: "600", padding: "7px 18px", borderRadius: "20px", marginBottom: "24px", boxShadow: "0 0 20px rgba(108,99,255,0.2)" }}>
          ✨ AI-Powered Tools — Free to Use
        </div>
        <h1 style={{ fontSize: "52px", fontWeight: "900", lineHeight: "1.15", margin: "0 0 20px", letterSpacing: "-1px", color: "#fff", textShadow: "0 0 40px rgba(108,99,255,0.5)" }}>
          Work Smarter with<br />
          <span style={{ background: "linear-gradient(135deg, #6C63FF, #A855F7, #F97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            AI Superpowers
          </span>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "18px", lineHeight: "1.7", margin: "0 0 40px" }}>
          Summarize notes, debug code, generate quizzes and write emails — all in one place, powered by AI.
        </p>
        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => navigate("/signup")}
            style={{ padding: "15px 36px", background: "linear-gradient(135deg, #6C63FF, #A855F7)", color: "#fff", border: "none", borderRadius: "12px", fontSize: "16px", fontWeight: "700", cursor: "pointer", boxShadow: "0 8px 30px rgba(108,99,255,0.5)", transition: "all 0.3s" }}
            onMouseOver={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 15px 40px rgba(108,99,255,0.7)"; }}
            onMouseOut={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(108,99,255,0.5)"; }}>
            Get Started Free →
          </button>
          <button onClick={() => navigate("/login")}
            style={{ padding: "15px 30px", background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "12px", fontSize: "16px", fontWeight: "600", cursor: "pointer", backdropFilter: "blur(10px)", transition: "all 0.3s" }}
            onMouseOver={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
            onMouseOut={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}>
            Login
          </button>
        </div>
      </div>

      {/* Features */}
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 24px 100px" }}>
        <h2 style={{ textAlign: "center", fontSize: "24px", fontWeight: "700", color: "rgba(255,255,255,0.9)", marginBottom: "40px" }}>
          Our AI Tools
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "20px" }}>
          {features.map(f => (
            <div key={f.title} onClick={() => handleFeatureClick(f.tab)}
              style={{ ...glass, padding: "28px 22px", cursor: "pointer", transition: "all 0.3s", position: "relative", overflow: "hidden" }}
              onMouseOver={e => { e.currentTarget.style.transform = "translateY(-8px) scale(1.02)"; e.currentTarget.style.boxShadow = `0 20px 50px ${f.glow}`; e.currentTarget.style.border = `1px solid ${f.color}50`; }}
              onMouseOut={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.border = "1px solid rgba(255,255,255,0.1)"; }}>
              <div style={{ position: "absolute", top: "-30px", right: "-30px", width: "100px", height: "100px", borderRadius: "50%", background: f.color, opacity: 0.08, filter: "blur(20px)" }} />
              <div style={{ width: "50px", height: "50px", borderRadius: "14px", background: `${f.color}20`, border: `1px solid ${f.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", marginBottom: "16px", boxShadow: `0 4px 15px ${f.glow}` }}>
                {f.icon}
              </div>
              <h3 style={{ margin: "0 0 10px", fontSize: "15px", fontWeight: "700", color: "#fff" }}>{f.title}</h3>
              <p style={{ margin: "0 0 16px", fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: "1.6" }}>{f.desc}</p>
              <span style={{ fontSize: "12px", fontWeight: "700", color: f.color, letterSpacing: "0.5px" }}>Try Now →</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ ...glass, borderRadius: 0, padding: "70px 24px", textAlign: "center", borderLeft: "none", borderRight: "none", borderBottom: "none" }}>
        <h2 style={{ color: "#fff", fontSize: "28px", fontWeight: "800", margin: "0 0 12px", textShadow: "0 0 30px rgba(108,99,255,0.5)" }}>Start for free — right now!</h2>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "15px", margin: "0 0 30px" }}>Create an account and access all AI tools instantly.</p>
        <button onClick={() => navigate("/signup")}
          style={{ padding: "15px 40px", background: "linear-gradient(135deg, #6C63FF, #A855F7)", color: "#fff", border: "none", borderRadius: "12px", fontSize: "16px", fontWeight: "700", cursor: "pointer", boxShadow: "0 8px 30px rgba(108,99,255,0.5)" }}>
          Create Free Account →
        </button>
      </div>

      {/* Footer */}
      
    </div>
  );
};

export default Home;