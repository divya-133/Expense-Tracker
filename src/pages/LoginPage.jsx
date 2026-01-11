import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function LoginPage({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      setError("Enter email & password");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);

      setIsLoggedIn(true);
      navigate("/app/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Login to continue</p>
        </div>

        <div className="auth-field">
          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="auth-field password-field">
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
          <span className="eye" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* 🔴 ERROR BELOW PASSWORD */}
        {error && <p className="auth-error">{error}</p>}

        <button className="auth-btn" onClick={handleLogin}>
          Login
        </button>

        <div className="auth-footer">
          Don’t have an account?
          <a href="/register"> Register</a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
