import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Imports (ensure files exist in src/pages/)
import Signup from "./pages/Signup"; 
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* 1. Default Route: Direct Signup par bhejega */}
          <Route path="/" element={<Navigate to="/signup" />} />
          
          {/* 2. Signup Route */}
          <Route path="/signup" element={<Signup />} />

          {/* 3. Login Route (Yeh miss ho gaya tha) */}
          <Route path="/login" element={<Login />} />
          
          {/* 4. Dashboard Route */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* 5. Catch-all: Agar user galat URL dale toh wapas signup par bhej do */}
          <Route path="*" element={<Navigate to="/signup" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;