import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

export default function Charts() {

  // 🔥 BAR DATA (NO GRADIENT BUG)
  const barData = {
    labels: ["CSE", "IT", "ECE", "ME"],
    datasets: [
      {
        label: "Placed",
        data: [40, 30, 20, 10],
        backgroundColor: ["#6366f1", "#8b5cf6", "#06b6d4", "#10b981"],
        borderRadius: 8
      }
    ]
  };

  // 🔥 PIE DATA
  const pieData = {
    labels: ["Placed", "Not Placed"],
    datasets: [
      {
        data: [100, 50],
        backgroundColor: ["#22c55e", "#ef4444"]
      }
    ]
  };

  // 🔥 COMMON OPTIONS (VERY IMPORTANT)
  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        labels: {
          color: "#e5e5e5" // 🔥 FIX TEXT
        }
      }
    },

    scales: {
      x: {
        ticks: { color: "#e5e5e5" }
      },
      y: {
        ticks: { color: "#e5e5e5" }
      }
    }
  };

  return (
    <div className="charts">

      <div className="chart-box glass">
        <h3>📊 Branch-wise Placement</h3>
        <div className="chart-wrapper">
          <Bar data={barData} options={options} />
        </div>
      </div>

      <div className="chart-box glass">
        <h3>🔥 Placement Ratio</h3>
        <div className="chart-wrapper">
          <Pie data={pieData} options={options} />
        </div>
      </div>

    </div>
  );
}