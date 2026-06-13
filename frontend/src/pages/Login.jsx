import { useState } from "react";
import api from "../services/api";
import backgroundImage from "../assets/background.jpg";
import "./Login.css";

function Login({setToken}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

   async function handleLogin() {
      try {
          const response = await api.post(
              "/api/auth/login",
              {
                  email,
                  password,
              }
          );
          localStorage.setItem(
              "access_token",
              response.data.access_token,
          );
          setToken(response.data.access_token);
          alert("Login successful");
      }
      catch (error) {
          console.log(error.response.data);
      }
  }

  return (
    <div
      className="login-page"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <header className="app-header">
        <h2 className="app-logo">FinTrack</h2>
      </header>
      <div className="login-card">
        <h1 className="login-title">FinTrack</h1>

        <p className="login-subtitle">
          Sign in to manage your finances
        </p>

        <input
          className="login-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <input
          className="login-input"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button
          className="password-toggle"
          type="button"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? "Hide Password" : "Show Password"}
        </button>

        <button
          className="login-button"
          type="button"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;