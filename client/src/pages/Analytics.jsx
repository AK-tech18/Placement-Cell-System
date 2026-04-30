import { useEffect, useState } from "react";
import axios from "axios";
import {
  Bar,
  Pie
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function Analytics() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    placedStudents: 0,
    companies: 0,
    placementPercent: 0,
  });

  const [branchData, setBranchData] = useState([]);
  const [statusData, setStatusData] = useState([]);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const s = await axios.get("http://localhost:5000/api/admin/stats");
      const b = await axios.get("http://localhost:5000/api/admin/branch-stats");
      const st = await axios.get("http://localhost:5000/api/admin/status-stats");

      setStats(s.data || {});
      setBranchData(b.data || []);
      setStatusData(st.data || []);
    } catch (err) {
      console.error("❌ Analytics Error:", err);
    }
  };

  // 🔥 FIXED BAR CHART
  const branchChart = {
    labels: branchData.map((b) => b.branch),
    datasets: [
      {
        label: "Placed Students",
        data: branchData.map((b) => b.placed),
        backgroundColor: "#00d4ff",
        borderRadius: 10,
        barPercentage: 0.4,
        categoryPercentage: 0.5,
      },
    ],
  };

  // 🔥 FIXED PIE CHART
  const statusChart = {
    labels: statusData.map((s) => s.status),
    datasets: [
      {
        data: statusData.map((s) => s.count),
        backgroundColor: [
          "#00ffa3",
          "#ff4d6d",
          "#ffd166",
          "#4cc9f0",
        ],
        borderWidth: 0,
      },
    ],
  };

  // 🔥 FINAL OPTIONS (IMPORTANT)
  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        labels: {
          color: "#fff",
        },
      },
    },

    scales: {
      x: {
        ticks: { color: "#aaa" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#aaa",
          stepSize: 1,
        },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
    },
  };

  return (
    <div className="dashboard">
      <h1>Analytics 📊</h1>

      {/* STATS */}
      <div className="stats">
        <div className="stat-card">
          <h4>Total Students</h4>
          <h2>{stats.totalStudents}</h2>
        </div>

        <div className="stat-card">
          <h4>Placed</h4>
          <h2>{stats.placedStudents}</h2>
        </div>

        <div className="stat-card">
          <h4>Companies</h4>
          <h2>{stats.companies}</h2>
        </div>

        <div className="stat-card">
          <h4>Placement %</h4>
          <h2>{stats.placementPercent}%</h2>
        </div>
      </div>

      {/* CHARTS */}
      <div className="charts-grid">

        <div className="chart-card">
          <h3>Branch-wise Placement</h3>
          {branchData.length > 0 ? (
            <Bar data={branchChart} options={options} />
          ) : (
            <p>No data</p>
          )}
        </div>

        <div className="chart-card">
          <h3>Application Status</h3>
          {statusData.length > 0 ? (
            <Pie data={statusChart} />
          ) : (
            <p>No data</p>
          )}
        </div>

      </div>
    </div>
  );
}