import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/skills.css"; // 🔥 NEW CSS

export default function Skills() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const studentId = user?.student_id;

  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 FETCH EXISTING SKILLS
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await API.get(`/students/${studentId}`);
        setSkills(res.data?.skills || "");
      } catch (err) {
        console.log("Fetch skills error:", err);
      }
    };

    if (studentId) fetchSkills();
  }, [studentId]);

  // 🔥 UPDATE SKILLS
  const updateSkills = async () => {
    if (!skills.trim()) {
      alert("Please enter at least one skill ❌");
      return;
    }

    try {
      setLoading(true);

      const res = await API.put(`/students/update-skills/${studentId}`, {
        skills,
      });

      alert(res.data.msg || "Skills updated ✅");
    } catch (err) {
      console.error(err);
      alert("Error updating skills ❌");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 SKILL CHIPS
  const skillList = skills
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s !== "");

  return (
    <div className="skills-page">
      <h1 className="skills-title">My Skills 🚀</h1>

      <div className="skills-card">
        <h2>Add / Update Skills</h2>

        <p className="skills-meta">
          Add skills separated by comma (e.g. React, Node, Python)
        </p>

        <input
          className="skills-input"
          type="text"
          placeholder="React, Node, SQL"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        <button
          className="skills-btn"
          onClick={updateSkills}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Skills"}
        </button>

        {/* 🔥 SKILL TAGS PREVIEW */}
        <div className="skills-tags">
          {skillList.length > 0 ? (
            skillList.map((skill, i) => (
              <span key={i} className="skill-chip">
                {skill}
              </span>
            ))
          ) : (
            <p className="skills-meta">No skills added</p>
          )}
        </div>
      </div>

      <button className="skills-back" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>
    </div>
  );
}