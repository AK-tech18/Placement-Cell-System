import Charts from "../components/Charts";
import "../styles/dashboard.css";

export default function Dashboard() {
  return (
    <div>

      {/* 🔥 STATS CARDS */}
      <div className="stats">

        <div className="stat-card glass">
          <h4>Total Students</h4>
          <h2>150</h2>
          <p className="stat-sub">+12 this week</p>
        </div>

        <div className="stat-card glass">
          <h4>Placed</h4>
          <h2>100</h2>
          <p className="stat-sub success">+8% growth</p>
        </div>

        <div className="stat-card glass">
          <h4>Companies</h4>
          <h2>25</h2>
          <p className="stat-sub">Active recruiters</p>
        </div>

        <div className="stat-card glass">
          <h4>Placement %</h4>
          <h2>66%</h2>
          <p className="stat-sub">Overall rate</p>
        </div>

      </div>

      {/* 🔥 CHARTS */}
      <Charts />

    </div>
  );
}