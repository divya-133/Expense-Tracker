import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar({ isLoggedIn }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="logo">Budgetwise</h2>
      </div>

      <div className="navbar-right">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-btn">Get Started</Link>
          </>
        ) : (
          <>
            <Link to="/register" className="nav-link">Sign Up</Link>
            <Link to="/login" className="nav-btn">Sign In</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

