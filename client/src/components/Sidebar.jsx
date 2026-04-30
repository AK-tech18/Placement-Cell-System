import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {

  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <div className="sidebar glass">

      <div>
        <div className="profile">
          <div className="avatar-circle"></div>
          <h3>{user?.name || "User"}</h3>
          <p className="muted">Placement Portal</p>
        </div>

        <ul className="menu">

          <li
            className={isActive("/dashboard")}
            onClick={() => navigate("/dashboard")}
          >
            🏠 Dashboard
          </li>

          <li
            className={isActive("/students")}
            onClick={() => navigate("/students")}
          >
            🎓 Students
          </li>

          <li
            className={isActive("/jobs")}
            onClick={() => navigate("/jobs")}
          >
            💼 Jobs
          </li>

          <li
            className={isActive("/applications")}
            onClick={() => navigate("/applications")}
          >
            📄 Applications
          </li>

          {/* 🔥 ADD THIS (Analytics) */}
          <li
            className={isActive("/analytics")}
            onClick={() => navigate("/analytics")}
          >
            📊 Analytics
          </li>

          <li
            className={isActive("/settings")}
            onClick={() => navigate("/settings")}
          >
            ⚙️ Settings
          </li>

          {user?.role === "admin" && (
            <li
              className={isActive("/admin")}
              onClick={() => navigate("/admin")}
            >
              🛠️ Admin
            </li>
          )}

        </ul>
      </div>

      <button className="logout-btn" onClick={logout}>
        🚪 Logout
      </button>

    </div>
  );
}