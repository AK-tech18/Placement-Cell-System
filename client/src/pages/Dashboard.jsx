import "../styles/dashboard.css";

export default function Dashboard() {

  const stats = {
    students: 150,
    placed: 100,
    companies: 25,
    percent: 66
  };

  const tips = [
    "Tailor your resume for each job application.",
    "Practice DSA daily for better placements.",
    "Keep your LinkedIn profile updated.",
    "Apply early to increase chances."
  ];

  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  const jobs = [
    { company: "Infosys", role: "Frontend Developer" },
    { company: "Wipro", role: "Data Analyst" }
  ];

  const activities = [
    "You applied to TCS",
    "Infosys shortlisted you",
    "New job posted by Wipro"
  ];

  return (
    <div className="dashboard">

      {/* 🔥 MOTIVATION */}
      <div className="motivation">
        <p className="motivation-label">Career Tip</p>
        <h1>Don’t wait for opportunities. Create them.</h1>
      </div>

      {/* ⚡ ACTIONS */}
      <div className="actions">
        <button className="primary-btn">Apply Job</button>
        <button className="secondary-btn">Upload Resume</button>
        <button className="secondary-btn">Update Profile</button>
      </div>

      {/* 📊 STATS */}
      <div className="stats">
        <div className="stat-card">
          <h4>Total Students</h4>
          <h2>{stats.students}</h2>
        </div>

        <div className="stat-card">
          <h4>Placed</h4>
          <h2>{stats.placed}</h2>
        </div>

        <div className="stat-card">
          <h4>Companies</h4>
          <h2>{stats.companies}</h2>
        </div>

        <div className="stat-card">
          <h4>Placement %</h4>
          <h2>{stats.percent}%</h2>
        </div>
      </div>

      {/* ALERT + TIP */}
      <div className="info-row">
        <div className="alert-box">
          ⚠️ TCS applications close in 2 days
        </div>

        <div className="tip-box">
          💡 {randomTip}
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid">

        <div className="card">
          <h3>Recommended Jobs</h3>
          {jobs.map((job, i) => (
            <div key={i} className="job-item">
              <div>
                <p className="job-role">{job.role}</p>
                <span>{job.company}</span>
              </div>
              <button className="mini-btn">Apply</button>
            </div>
          ))}
        </div>

        <div className="card">
          <h3>My Applications</h3>
          <div className="app-stats">
            <p>Applied <span>8</span></p>
            <p>Shortlisted <span>3</span></p>
            <p>Rejected <span>2</span></p>
            <p>Selected <span>1</span></p>
          </div>
        </div>

      </div>

      <div className="card">
        <h3>Upcoming Drives</h3>
        <p>5 May – Infosys Interview</p>
        <p>8 May – Wipro Drive</p>
      </div>

      <div className="card">
        <h3>Recent Activity</h3>
        {activities.map((a, i) => (
          <p key={i}>• {a}</p>
        ))}
      </div>

    </div>
  );
}