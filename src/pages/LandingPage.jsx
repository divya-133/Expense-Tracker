import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/landing.css";

function LandingPage({ isLoggedIn, setIsLoggedIn }) {
  return (
    <>
      {/* NAVBAR */}
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      {/* HERO */}
      <section className="landing-hero">
        <div className="hero-left">
          <span className="hero-tag">AI-Driven Personal Finance</span>

          <h1>
            Take Control of <br />
            Your <span>Expenses & Savings</span>
          </h1>

          <p>
            Budgetwise helps you track expenses, manage budgets,
            and build savings with intelligent insights —
            all in one secure platform.
          </p>

          <div className="hero-cta">
            <Link to="/register" className="cta-primary">
              Get Started Free
            </Link>
            <Link to="/login" className="cta-secondary">
              Login
            </Link>
          </div>
        </div>

        <div className="hero-right">
          <div className="summary-card">
            <p className="card-label">This Month</p>
            <h2>₹52,450</h2>
            <span className="growth">+12% savings growth</span>

            <div className="mini-info">
              <div>
                <p>Spent</p>
                <h4>₹18,200</h4>
              </div>
              <div>
                <p>Saved</p>
                <h4>₹6,800</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="trust-bar">
        <div>
          <h3>50K+</h3>
          <p>Active Users</p>
        </div>
        <div>
          <h3>₹10Cr+</h3>
          <p>Expenses Tracked</p>
        </div>
        <div>
          <h3>99.9%</h3>
          <p>Secure Platform</p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <h2>Everything You Need to Manage Money</h2>

        <div className="features-grid">
          <div className="feature-card">
            <h3>Expense Tracking</h3>
            <p>
              Automatically track daily expenses and understand
              where your money goes.
            </p>
          </div>

          <div className="feature-card">
            <h3>Budget Planning</h3>
            <p>
              Set smart budgets and get alerts before overspending.
            </p>
          </div>

          <div className="feature-card">
            <h3>Savings Goals</h3>
            <p>
              Define goals and track progress with clear insights.
            </p>
          </div>

          <div className="feature-card">
            <h3>AI Insights</h3>
            <p>
              Receive intelligent recommendations to improve
              financial health.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <h2>Start Managing Your Money Smarter</h2>
        <p>No credit card required. Free to get started.</p>

        <Link to="/register" className="cta-primary large">
          Create Free Account
        </Link>
      </section>
    </>
  );
}

export default LandingPage;
