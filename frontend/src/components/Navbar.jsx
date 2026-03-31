import React from "react";

const Navbar = ({ user, onLogout }) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 20px", background: "#333", color: "#fff" }}>
      <h2>AI Utility Hub</h2>
      <div>
        <span style={{ marginRight: "20px" }}>{user?.name} ({user?.plan})</span>
        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
