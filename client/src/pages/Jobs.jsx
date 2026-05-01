import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../services/api";
import "../styles/dashboard.css";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ STRICT student id (IMPORTANT)
  const studentId = user?.student_id;

  useEffect(() => {
    if (studentId) {
      fetchJobs();
      fetchAppliedJobs();
    }
  }, [studentId]);

  // ================= FETCH JOBS =================
  const fetchJobs = async () => {
    try {
      const res = await API.get(`/jobs/eligible/${studentId}`);
      setJobs(res.data || []);
    } catch (err) {
      console.error("Fetch Jobs Error:", err);
    }
  };

  // ================= FETCH APPLIED =================
  const fetchAppliedJobs = async () => {
    try {
      const res = await API.get(`/jobs/applied/${studentId}`);
      const appliedIds = (res.data || []).map((job) => job.job_id);
      setAppliedJobs(appliedIds);
    } catch (err) {
      console.error("Fetch Applied Jobs Error:", err);
    }
  };

  // ================= APPLY JOB =================
  const applyJob = async (jobId) => {
    try {
      // 🔥 HARD DEBUG (IMPORTANT)
      console.log("Applying:", { studentId, jobId });

      if (!studentId || !jobId) {
        alert("Missing student/job id ❌");
        return;
      }

      if (appliedJobs.includes(jobId)) return;

      const res = await axios.post(
        "http://localhost:5000/api/jobs/apply",
        {
          student_id: Number(studentId), // 🔥 ensure number
          job_id: Number(jobId),
        }
      );

      alert(res.data.msg || "Applied Successfully ✅");

      setAppliedJobs((prev) => [...prev, jobId]);
      setSelectedJob(null);
    } catch (err) {
      console.error("Apply Error FULL:", err.response || err);
      alert("Apply failed ❌ Check console");
    }
  };

  return (
    <div className="dashboard">
      <h1 className="page-title">Eligible Jobs 🎯</h1>

      <div className="job-list">
        {jobs.length === 0 ? (
          <p style={{ opacity: 0.6 }}>No eligible jobs available</p>
        ) : (
          jobs.map((job) => (
            <div
              className="job-card"
              key={job.id}
              onClick={() => setSelectedJob(job)}
            >
              <h3>{job.title}</h3>
              <p>{job.company}</p>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {selectedJob && (
        <div className="modal-overlay" onClick={() => setSelectedJob(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedJob.title}</h2>
            <p><strong>Company:</strong> {selectedJob.company}</p>
            <p><strong>Min CGPA:</strong> {selectedJob.min_cgpa}</p>
            <p><strong>Branches:</strong> {selectedJob.allowed_branches}</p>
            <p><strong>Max Backlogs:</strong> {selectedJob.max_backlogs}</p>

            <button
              className="apply-btn"
              disabled={appliedJobs.includes(selectedJob.id)}
              onClick={() => applyJob(selectedJob.id)}
            >
              {appliedJobs.includes(selectedJob.id)
                ? "Applied ✔"
                : "Apply"}
            </button>

            <button
              className="close-btn"
              onClick={() => setSelectedJob(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <button className="bottom-back" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>
    </div>
  );
} 