import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

function Auth({ setIsLoggedIn }) {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const submit = () => {
    setIsLoggedIn(true);
    navigate("/dashboard");
  };

  return (
    <div className="auth-layout">
      <div className="auth-left">
        <h1>Budgetwise</h1>
        <p>AI-driven money management platform</p>
      </div>

      <div className="auth-right">
        <h2>{isLogin ? "Login" : "Create Account"}</h2>

        {!isLogin && <input placeholder="Full Name" />}
        <input placeholder="Email" />
        <input type="password" placeholder="Password" />

        <button onClick={submit}>
          {isLogin ? "Login" : "Register"}
        </button>

        <p onClick={() => setIsLogin(!isLogin)} className="switch">
          {isLogin ? "New user? Register" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}

export default Auth;
