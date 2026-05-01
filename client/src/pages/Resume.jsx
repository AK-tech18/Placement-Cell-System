import { useState } from "react";
import API from "../services/api";
import "../styles/skills.css";

export default function Resume() {
  const [file, setFile] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadResume = async () => {
    if (!file) {
      alert("Select a file ❌");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", file); // ✅ must match backend

      console.log("Uploading file:", file);

      // ❌ DO NOT SET HEADERS MANUALLY
      const res = await API.post("/resume/upload", formData);

      console.log("Response:", res.data);

      setFeedback(res.data.feedback);
    } catch (err) {
      console.error("Upload Error:", err.response || err);
      alert(err?.response?.data?.msg || "Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="skills-page">
      <h1 className="skills-title">Resume Analyzer 📄</h1>

      <div className="skills-card">
        <input
          type="file"
          accept=".pdf" // ✅ only PDF
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          className="skills-btn"
          onClick={uploadResume}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Resume"}
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