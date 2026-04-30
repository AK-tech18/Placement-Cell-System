import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 🔥 ADD
import API from "../services/api";
import "../styles/dashboard.css";

export default function Admin() {
  const [apps, setApps] = useState([]);
  const navigate = useNavigate(); // 🔥 ADD

  // 🔥 form state
  const [form, setForm] = useState({
    title: "",
    company: "",
    min_cgpa: "",
    allowed_branches: "",
    max_backlogs: "",
    recruiter_id: 1,
  });

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await API.get("/admin/applications");
      setApps(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 ADD JOB
  const addJob = async () => {
    try {
      if (!form.title || !form.company) {
        alert("Title & Company required");
        return;
      }

      const payload = {
        ...form,
        min_cgpa: Number(form.min_cgpa),
        max_backlogs: Number(form.max_backlogs),
      };

      await API.post("/jobs/create", payload);

      alert("Job added successfully");

      setForm({
        title: "",
        company: "",
        min_cgpa: "",
        allowed_branches: "",
        max_backlogs: "",
        recruiter_id: 1,
      });

    } catch (err) {
      console.error(err);
      alert("Error adding job");
    }
  };

  // 🔥 UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/admin/applications/${id}`, { status });

      setApps((prev) =>
        prev.map((app) =>
          app.id === id ? { ...app, status } : app
        )
      );

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard">
      <h1 className="page-title">Admin Panel 🛠️</h1>

      {/* 🔥 ADD JOB FORM */}
      <div className="form-card">
        <h2>Add Job</h2>

        <input
          name="title"
          placeholder="Job Title"
          value={form.title}
          onChange={handleChange}
        />

        <input
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={handleChange}
        />

        <input
          name="min_cgpa"
          type="number"
          placeholder="Min CGPA"
          value={form.min_cgpa}
          onChange={handleChange}
        />

        <input
          name="allowed_branches"
          placeholder="Branches (CSE,IT)"
          value={form.allowed_branches}
          onChange={handleChange}
        />

        <input
          name="max_backlogs"
          type="number"
          placeholder="Max Backlogs"
          value={form.max_backlogs}
          onChange={handleChange}
        />

        <button className="btn place" onClick={addJob}>
          Add Job
        </button>
      </div>

      {/* 🔥 APPLICATION TABLE */}
      <div className="table-container">
        <table className="app-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Job</th>
              <th>Company</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {apps.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No Applications Found
                </td>
              </tr>
            ) : (
              apps.map((app) => (
                <tr key={app.id}>
                  <td>{app.student}</td>
                  <td>{app.title}</td>
                  <td>{app.company}</td>

                  <td>
                    <span className={`status ${app.status}`}>
                      {app.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn short"
                      onClick={() => updateStatus(app.id, "shortlisted")}
                    >
                      Shortlist
                    </button>

                    <button
                      className="btn reject"
                      onClick={() => updateStatus(app.id, "rejected")}
                    >
                      Reject
                    </button>

                    <button
                      className="btn place"
                      onClick={() => updateStatus(app.id, "placed")}
                    >
                      Place
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 🔥 BACK BUTTON (BOTTOM) */}
      <button
        className="bottom-back"
        onClick={() => navigate(-1)}
      >
        ⬅ Back
      </button>
    </div>
  );
}