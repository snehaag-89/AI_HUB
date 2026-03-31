import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [selectedService, setSelectedService] = useState("notes");

  // State for all AI services
  const [notesText, setNotesText] = useState("");
  const [notesSummary, setNotesSummary] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [debugOutput, setDebugOutput] = useState("");
  const [interviewQuestion, setInterviewQuestion] = useState("");
  const [interviewAnswer, setInterviewAnswer] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [resumeAnalysis, setResumeAnalysis] = useState("");
  const [captionText, setCaptionText] = useState("");
  const [generatedCaption, setGeneratedCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const services = [
    { id: "notes", name: "Notes Summarizer" },
    { id: "code", name: "Code Debugger" },
    { id: "interview", name: "Interview Simulator" },
    { id: "resume", name: "Resume Analyzer" },
    { id: "caption", name: "Caption Generator" }
  ];

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        await API.get("/protected");
        setUser({ name: "Sneha", plan: "free" }); // replace with backend data
      } catch {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Handlers for AI services
  const handleSummarize = async () => {
    setLoading(true);
    try {
      const res = await API.post("/ai/summarize", { text: notesText });
      setNotesSummary(res.data.summary);
    } catch {
      alert("Failed to summarize");
    }
    setLoading(false);
  };

  const handleDebug = async () => {
    setLoading(true);
    try {
      const res = await API.post("/ai/code-debugger", { code: codeInput });
      setDebugOutput(res.data.result);
    } catch {
      alert("Debugging failed");
    }
    setLoading(false);
  };

  const handleInterview = async () => {
    setLoading(true);
    try {
      const res = await API.post("/ai/interview", { question: interviewQuestion });
      setInterviewAnswer(res.data.answer);
    } catch {
      alert("Failed to simulate interview");
    }
    setLoading(false);
  };

  const handleResume = async () => {
    setLoading(true);
    try {
      const res = await API.post("/ai/resume", { resume: resumeText });
      setResumeAnalysis(res.data.analysis);
    } catch {
      alert("Failed to analyze resume");
    }
    setLoading(false);
  };

  const handleCaption = async () => {
    setLoading(true);
    try {
      const res = await API.post("/ai/caption", { text: captionText });
      setGeneratedCaption(res.data.caption);
    } catch {
      alert("Failed to generate caption");
    }
    setLoading(false);
  };

  return (
    <div>
      <Navbar user={user} onLogout={handleLogout} />
      <div style={{ display: "flex" }}>
        <Sidebar
          services={services}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
        />
        <div style={{ flex: 1, padding: "20px" }}>
          <h2>{services.find(s => s.id === selectedService)?.name}</h2>
          <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
            
            {/* Notes Summarizer */}
            {selectedService === "notes" && (
              <div>
                <textarea
                  placeholder="Paste text here..."
                  value={notesText}
                  onChange={e => setNotesText(e.target.value)}
                  rows={8}
                  cols={60}
                />
                <br />
                <button onClick={handleSummarize}>Summarize</button>
                {loading ? <p>Loading...</p> : <p>{notesSummary}</p>}
              </div>
            )}

            {/* Code Debugger */}
            {selectedService === "code" && (
              <div>
                <textarea
                  placeholder="Paste your code here..."
                  value={codeInput}
                  onChange={e => setCodeInput(e.target.value)}
                  rows={10}
                  cols={60}
                />
                <br />
                <button onClick={handleDebug}>Debug Code</button>
                {loading ? <p>Loading...</p> : <pre>{debugOutput}</pre>}
              </div>
            )}

            {/* Interview Simulator */}
            {selectedService === "interview" && (
              <div>
                <textarea
                  placeholder="Ask a question..."
                  value={interviewQuestion}
                  onChange={e => setInterviewQuestion(e.target.value)}
                  rows={4}
                  cols={60}
                />
                <br />
                <button onClick={handleInterview}>Get Answer</button>
                {loading ? <p>Loading...</p> : <p>{interviewAnswer}</p>}
              </div>
            )}

            {/* Resume Analyzer */}
            {selectedService === "resume" && (
              <div>
                <textarea
                  placeholder="Paste your resume..."
                  value={resumeText}
                  onChange={e => setResumeText(e.target.value)}
                  rows={10}
                  cols={60}
                />
                <br />
                <button onClick={handleResume}>Analyze Resume</button>
                {loading ? <p>Loading...</p> : <p>{resumeAnalysis}</p>}
              </div>
            )}

            {/* Caption Generator */}
            {selectedService === "caption" && (
              <div>
                <textarea
                  placeholder="Describe the image..."
                  value={captionText}
                  onChange={e => setCaptionText(e.target.value)}
                  rows={4}
                  cols={60}
                />
                <br />
                <button onClick={handleCaption}>Generate Caption</button>
                {loading ? <p>Loading...</p> : <p>{generatedCaption}</p>}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;