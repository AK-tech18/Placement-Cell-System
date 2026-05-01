import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/dashboard.css";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const studentId = user?.student_id;

  // ================= FETCH JOBS =================
  const fetchJobs = useCallback(async () => {
    try {
      const res = await API.get(`/jobs/eligible/${studentId}`);
      setJobs(res.data || []);
    } catch (err) {
      console.error("Fetch Jobs Error:", err);
      alert("Failed to load jobs ❌");
    }
  }, [studentId]);

  // ================= FETCH APPLIED =================
  const fetchAppliedJobs = useCallback(async () => {
    try {
      const res = await API.get(`/jobs/applied/${studentId}`);
      const appliedIds = (res.data || []).map((job) => job.job_id);
      setAppliedJobs(appliedIds);
    } catch (err) {
      console.error("Fetch Applied Jobs Error:", err);
    }
  }, [studentId]);

  // ================= INIT =================
  useEffect(() => {
    if (studentId) {
      fetchJobs();
      fetchAppliedJobs();
    }
  }, [studentId, fetchJobs, fetchAppliedJobs]); // ✅ FIXED

  // ================= APPLY JOB =================
  const applyJob = async (jobId) => {
    try {
      if (!studentId || !jobId) {
        alert("Missing student/job id ❌");
        return;
      }

      if (appliedJobs.includes(jobId)) return;

      const res = await API.post("/jobs/apply", {
        student_id: Number(studentId),
        job_id: Number(jobId),
      });

      alert(res.data?.msg || "Applied Successfully ✅");

      setAppliedJobs((prev) => [...prev, jobId]);
      setSelectedJob(null);
    } catch (err) {
      console.error("Apply Error:", err.response || err);
      alert("Apply failed ❌");
    }
  };

  return (
    <div className="dashboard">
      <h1 className="page-title">Eligible Jobs 🎯</h1>

      {/* JOB LIST */}
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