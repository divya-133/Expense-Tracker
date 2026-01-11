import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/layout.css";

function DashboardLayout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("currentUser"));

  const logout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div className="layout">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2 className="brand">Budgetwise</h2>

        <nav className="menu">
          <Link to="dashboard">📊 Dashboard</Link>
          <Link to="transactions">💸 Transactions</Link>
          <Link to="budgets">📁 Budgets</Link>
          <Link to="savings">🎯 Savings</Link>
        </nav>
      </aside>

      {/* MAIN */}
      <div className="main">

        {/* HEADER */}
        <header className="topbar">
          <div className="topbar-title">
            Personal Finance Dashboard
          </div>

          {/* PROFILE */}
          <div className="profile" onClick={() => setOpen(!open)}>
            <div className="avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            {open && (
              <div className="profile-dropdown">
                <div className="profile-info">
                  <strong>{user?.name}</strong>
                  <span>{user?.email}</span>
                </div>

                <button onClick={logout} className="logout-btn">
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="content">
          <Outlet />
        </main>
      </div>

    </div>
  );
}

export default DashboardLayout;
