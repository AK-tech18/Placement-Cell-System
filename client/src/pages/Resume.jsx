import { useState } from "react";
import API from "../services/api";
import "../styles/skills.css";

export default function Resume() {
  const [file, setFile] = useState(null);
  const [feedback, setFeedback] = useState("");

  const uploadResume = async () => {
    if (!file) {
      alert("Select a file ❌");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await API.post("/resume/upload", formData);
      setFeedback(res.data.feedback);
    } catch (err) {
      alert("Upload failed ❌");
    }
  };

  return (
    <div className="skills-page">
      <h1 className="skills-title">Resume Analyzer 📄</h1>

      <div className="skills-card">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button className="skills-btn" onClick={uploadResume}>
          Upload Resume
        </button>
      </div>

      {feedback && (
        <div className="skills-card">
          <h2>Feedback</h2>
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
}