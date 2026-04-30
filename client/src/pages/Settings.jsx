import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/settings.css";

export default function Settings() {
  const [theme, setTheme] = useState("dark");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark";
    applyTheme(saved);
  }, []);

  const applyTheme = (t) => {
    setTheme(t);
    localStorage.setItem("theme", t);

    if (t === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.body.setAttribute("data-theme", prefersDark ? "dark" : "light");
    } else {
      document.body.setAttribute("data-theme", t);
    }
  };

  // 🔐 CHANGE PASSWORD
  const handleChangePassword = async () => {
    const oldPassword = prompt("Enter old password");
    const newPassword = prompt("Enter new password");

    if (!oldPassword || !newPassword) return;

    try {
      const res = await API.post("/user/change-password", {
        user_id: user?.id,
        oldPassword,
        newPassword,
      });

      alert(res.data.msg);
    } catch (err) {
      alert("Error updating password");
    }
  };

  // 🚪 LOGOUT ALL
  const handleLogoutAll = async () => {
    try {
      await API.post("/user/logout-all");

      localStorage.clear();
      window.location.href = "/";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="settings-page">
      <h1 className="settings-title">Settings</h1>

      {/* ACCOUNT */}
      <div className="settings-card">
        <h2>Account</h2>

        <div className="form-row">
          <label>Name</label>
          <input placeholder="Aditya" />
        </div>

        <div className="form-row">
          <label>Email</label>
          <input placeholder="student@test.com" />
        </div>

        <div className="form-row">
          <label>Phone</label>
          <input placeholder="+91..." />
        </div>

        <div className="form-row">
          <label>Profile Photo</label>
          <input type="file" />
        </div>

        <p className="meta">Last updated: just now</p>
      </div>

      {/* SECURITY */}
      <div className="settings-card">
        <h2>Security</h2>

        <button className="settings-btn" onClick={handleChangePassword}>
          Change Password
        </button>

        <button className="settings-btn">
          Enable 2FA
        </button>

        <button className="settings-btn danger" onClick={handleLogoutAll}>
          Logout All Devices
        </button>

        <p className="meta">Recent login: Delhi • Chrome</p>
      </div>

      {/* APPEARANCE */}
      <div className="settings-card">
        <h2>Appearance</h2>

        <div className="theme-switch">
          <button
            className={theme === "dark" ? "active" : ""}
            onClick={() => applyTheme("dark")}
          >
            🌙 Dark
          </button>

          <button
            className={theme === "light" ? "active" : ""}
            onClick={() => applyTheme("light")}
          >
            ☀️ Light
          </button>

          <button
            className={theme === "system" ? "active" : ""}
            onClick={() => applyTheme("system")}
          >
            💻 System
          </button>
        </div>
      </div>

      {/* NOTIFICATIONS */}
      <div className="settings-card">
        <h2>Notifications</h2>

        <div className="toggle-row">
          <span>Email Notifications</span>
          <input type="checkbox" defaultChecked />
        </div>

        <div className="toggle-row">
          <span>Security Alerts</span>
          <input type="checkbox" defaultChecked />
        </div>
      </div>

      {/* PREFERENCES */}
      <div className="settings-card">
        <h2>Preferences</h2>

        <div className="form-row">
          <label>Language</label>
          <select>
            <option>English</option>
            <option>Hindi</option>
          </select>
        </div>

        <div className="form-row">
          <label>Timezone</label>
          <select>
            <option>India (IST)</option>
          </select>
        </div>
      </div>

      {/* 🔥 BACK BUTTON */}
      <button
        className="bottom-back"
        onClick={() => navigate(-1)}
      >
        ⬅ Back
      </button>

    </div>
  );
}