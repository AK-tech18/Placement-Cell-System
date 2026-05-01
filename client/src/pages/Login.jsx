import { useState } from "react";
import "../styles/auth.css";
import "boxicons/css/boxicons.min.css";
import API from "../services/api"; // ✅ IMPORTANT

export default function Login() {
  const [active, setActive] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  // 🔐 LOGIN HANDLER
  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email: loginEmail,
        password: loginPassword,
      });

      const data = res.data;

      if (data.token) {
        localStorage.setItem("token", data.token);

        localStorage.setItem(
          "user",
          JSON.stringify(data.user || { name: "User", role: "student" })
        );

        alert("Login Successful 🚀");
        window.location.href = "/dashboard";
      } else {
        alert(data.msg || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed ❌");
    }
  };

  // 🔐 REGISTER HANDLER
  const handleRegister = async () => {
    try {
      const res = await API.post("/auth/register", {
        name: regUsername,
        email: regEmail,
        password: regPassword,
        role: "student",
      });

      const data = res.data;

      if (res.status === 200 || res.status === 201) {
        alert("Registered successfully. Please login.");
        setActive(false);
      } else {
        alert(data.msg || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Registration failed ❌");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className={`container ${active ? "active" : ""}`}>

        {/* LOGIN */}
        <div className="form-box login">
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            <h1>Login</h1>

            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
              <i className="bx bxs-user"></i>
            </div>

            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
              <i className="bx bxs-lock-alt"></i>
            </div>

            <button type="submit" className="btn">Login</button>

            <p className="social-text">or continue with</p>

            <div className="social-icons">
              <a href="#" className="google" onClick={() => alert("Google OAuth coming soon")}>
                <i className="bx bxl-google"></i>
              </a>

              <a href="#" className="linkedin" onClick={() => alert("LinkedIn OAuth coming soon")}>
                <i className="bx bxl-linkedin"></i>
              </a>
            </div>
          </form>
        </div>

        {/* REGISTER */}
        <div className="form-box register">
          <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
            <h1>Register</h1>

            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                value={regUsername}
                onChange={(e) => setRegUsername(e.target.value)}
                required
              />
              <i className="bx bxs-user"></i>
            </div>

            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                required
              />
              <i className="bx bxs-envelope"></i>
            </div>

            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                required
              />
              <i className="bx bxs-lock-alt"></i>
            </div>

            <button type="submit" className="btn">Register</button>

            <p className="social-text">or sign up with</p>

            <div className="social-icons">
              <a href="#" className="google">
                <i className="bx bxl-google"></i>
              </a>

              <a href="#" className="linkedin">
                <i className="bx bxl-linkedin"></i>
              </a>
            </div>
          </form>
        </div>

        {/* TOGGLE */}
        <div className="toggle-box">
          <div className="toggle-panel toggle-left">
            <h1>Welcome to PCAS</h1>
            <p>Access your placement dashboard</p>
            <button className="toggle-btn" onClick={() => setActive(true)}>
              Register
            </button>
          </div>

          <div className="toggle-panel toggle-right">
            <h1>Welcome Back!</h1>
            <p>Already have an account?</p>
            <button className="toggle-btn" onClick={() => setActive(false)}>
              Login
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}