import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/dashboard.css";

export default function MyApplications() {
  const [apps, setApps] = useState([]);
  const navigate = useNavigate();

  // 🔥 extract once (outside useEffect)
  const user = JSON.parse(localStorage.getItem("user"));
  const studentId = user?.id; // 🔥 NO HARD CODE
  console.log("USER:", user);
  console.log("studentId:", studentId);

  useEffect(() => {
    fetchApplied(studentId);
  }, [studentId]); // ✅ now stable → no warning

  const fetchApplied = async (id) => {
    try {
      const res = await API.get(`/jobs/applied/${id}`);
      console.log("Applied Jobs:", res.data);
      setApps(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard">
      <h1 className="page-title">My Applications 📄</h1>

      <div className="table-container">
        <table className="app-table">
          <thead>
            <tr>
              <th>Job</th>
              <th>Company</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {apps.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ textAlign: "center", padding: "20px" }}>
                  No Applications Found
                </td>
              </tr>
            ) : (
              apps.map((app, index) => (
                <tr key={index}>
                  <td>{app.title}</td>
                  <td>{app.company}</td>
                  <td>
                    <span className={`status ${app.status?.toLowerCase()}`}>
                      {app.status || "applied"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <button className="back-btn bottom-back" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>
    </div>
  );
}