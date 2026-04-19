import React, { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/signup", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%", padding: "13px 16px", borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.1)", fontSize: "14px",
    color: "#fff", outline: "none", boxSizing: "border-box",
    fontFamily: "inherit", background: "rgba(255,255,255,0.07)",
    backdropFilter: "blur(10px)", transition: "all 0.3s",
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", fontFamily: "'Segoe UI', Arial, sans-serif" }}>

      <div style={{ position: "fixed", top: "15%", right: "15%", width: "300px", height: "300px", borderRadius: "50%", background: "rgba(108,99,255,0.15)", filter: "blur(80px)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: "15%", left: "15%", width: "250px", height: "250px", borderRadius: "50%", background: "rgba(249,115,22,0.1)", filter: "blur(80px)", pointerEvents: "none" }} />

      <div style={{ width: "100%", maxWidth: "420px", position: "relative" }}>

        <div style={{ textAlign: "center", marginBottom: "32px" }}>
<img src="/logo.png" alt="AI HUB" style={{ height: "80px", filter: "drop-shadow(0 0 15px rgba(0,180,255,0.6))" }} />
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>Create your account to get started.</p>
        </div>

        <div style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(30px)", WebkitBackdropFilter: "blur(30px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "24px", padding: "36px", boxShadow: "0 25px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)" }}>

          <div style={{ marginBottom: "18px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "rgba(255,255,255,0.6)", marginBottom: "8px" }}>Full Name</label>
            <input name="name" type="text" placeholder="Your Name"
              onChange={handleChange} required style={inputStyle}
              onFocus={e => { e.target.style.borderColor = "rgba(108,99,255,0.6)"; e.target.style.boxShadow = "0 0 20px rgba(108,99,255,0.2)"; }}
              onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }} />
          </div>

          <div style={{ marginBottom: "18px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "rgba(255,255,255,0.6)", marginBottom: "8px" }}>Email</label>
            <input name="email" type="email" placeholder="you@example.com"
              onChange={handleChange} required style={inputStyle}
              onFocus={e => { e.target.style.borderColor = "rgba(108,99,255,0.6)"; e.target.style.boxShadow = "0 0 20px rgba(108,99,255,0.2)"; }}
              onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }} />
          </div>

          <div style={{ marginBottom: "28px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "rgba(255,255,255,0.6)", marginBottom: "8px" }}>Password</label>
            <input name="password" type="password" placeholder="••••••••"
              onChange={handleChange} required style={inputStyle}
              onFocus={e => { e.target.style.borderColor = "rgba(108,99,255,0.6)"; e.target.style.boxShadow = "0 0 20px rgba(108,99,255,0.2)"; }}
              onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }} />
          </div>

          <button onClick={handleSubmit} disabled={loading}
            style={{ width: "100%", padding: "14px", background: loading ? "rgba(108,99,255,0.4)" : "linear-gradient(135deg, #6C63FF, #A855F7)", color: "#fff", border: "none", borderRadius: "12px", fontSize: "15px", fontWeight: "700", cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 8px 25px rgba(108,99,255,0.4)", transition: "all 0.3s" }}
            onMouseOver={e => { if (!loading) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 35px rgba(108,99,255,0.6)"; }}}
            onMouseOut={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 8px 25px rgba(108,99,255,0.4)"; }}>
            {loading ? "Creating account..." : "Create Account →"}
          </button>

          <p style={{ textAlign: "center", marginTop: "22px", fontSize: "13px", color: "rgba(255,255,255,0.3)" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#A5B4FC", fontWeight: "700", textDecoration: "none" }}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;