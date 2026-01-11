import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    const { name, email, password, confirmPassword } = form;

    // FRONT-END VALIDATION
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      // store only name (firebase tracks email internally)
      localStorage.setItem("userName", name);

      navigate("/login");
    } catch (err) {
  if (err.code === "auth/email-already-in-use") {
    setError("Email already registered");
  } else if (err.code === "auth/invalid-email") {
    setError("Invalid email format");
  } else if (err.code === "auth/weak-password") {
    setError("Password must be at least 6 characters");
  } else {
    setError("Registration failed. Try again.");
  }
}
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Start managing your money smarter</p>
        </div>

        <div className="auth-field">
          <label>Full Name</label>
          <input
            placeholder="Your name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
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
            placeholder="Create password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
          <span className="eye" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <div className="auth-field password-field">
          <label>Confirm Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm password"
            value={form.confirmPassword}
            onChange={e =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
          />
        </div>

        {/* 🔴 ERROR BELOW PASSWORD */}
        {error && <p className="auth-error">{error}</p>}

        <button className="auth-btn" onClick={handleRegister}>
          Register
        </button>

        <div className="auth-footer">
          Already have an account?
          <a href="/login"> Login</a>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
