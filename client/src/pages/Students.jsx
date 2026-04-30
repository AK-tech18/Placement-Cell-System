import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/students.css";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  console.log("Students:", students);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await API.get("/students");
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Improved filter (name + email + branch)
  const filtered = students.filter((s) => {
    const term = search.toLowerCase();
    return (
      s.name?.toLowerCase().includes(term) ||
      s.email?.toLowerCase().includes(term) ||
      s.branch?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="students-page">

      {/* HEADER */}
      <div className="students-header">
        <h1>Students</h1>

        <input
          placeholder="Search by name, email, branch..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {/* LOADING */}
      {loading && <p className="loading">Loading students...</p>}

      {/* GRID */}
      {!loading && (
        <div className="students-grid">
          {filtered.map((s) => (
            <div className="student-card" key={s.id}>
              <div className="avatar">
                {s.name?.charAt(0)?.toUpperCase()}
              </div>

              <h3>{s.name}</h3>
              <p>{s.email}</p>

              <div className="student-meta">
                <span>{s.branch}</span>
                <span>CGPA: {s.cgpa}</span>

                <span
                  className={
                    s.backlogs > 0 ? "danger" : "ok"
                  }
                >
                  Backlogs: {s.backlogs}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && filtered.length === 0 && (
        <div className="empty-state">
          <p>No students found</p>
          <span>Try adjusting your search</span>
        </div>
      )}

      {/* BACK */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>
    </div>
  );
}