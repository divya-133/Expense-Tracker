import { Doughnut, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from "chart.js";
import { useFinance } from "../context/FinanceContext";
import "../styles/dashboard.css";

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

function Dashboard() {
  const { expenses, budgets, savingsGoals, monthlyTotals } = useFinance();

  /* ===== CALCULATIONS ===== */
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const totalBudget = budgets.reduce((s, b) => s + b.limit, 0);

  const budgetUsage =
    totalBudget > 0 ? Math.round((totalExpenses / totalBudget) * 100) : 0;

  let alertText = "✅ Budget Safe";
  let alertClass = "safe";

  if (budgetUsage >= 100) {
    alertText = "❌ Budget Exceeded";
    alertClass = "danger";
  } else if (budgetUsage >= 80) {
    alertText = "⚠️ Warning: High Spending";
    alertClass = "warning";
  }

  /* ===== CATEGORY TOTALS ===== */
  const categoryTotals = {};
  expenses.forEach(e => {
    categoryTotals[e.category] =
      (categoryTotals[e.category] || 0) + e.amount;
  });

  const topCategory =
    Object.keys(categoryTotals).length > 0
      ? Object.entries(categoryTotals).sort((a,b) => b[1]-a[1])[0][0]
      : "None";

  const donutData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#4f46e5", "#22c55e", "#f97316", "#0ea5e9", "#ef4444"
        ],
        borderWidth: 0
      }
    ]
  };

  /* ===== MONTHLY TREND CHART ===== */
  const lineData = {
    labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    datasets: [{
      label: "Expenses by Month",
      data: monthlyTotals,
      borderColor: "#4f46e5",
      backgroundColor: "rgba(79, 70, 229, 0.15)",
      tension: 0.35,
      fill: true
    }]
  };

  /* ===== SMART TIP ===== */
  let smartTip = "Great job managing your expenses!";
  if (topCategory !== "None") {
    smartTip = `💡 Spend less on ${topCategory} to improve savings.`;
  }

  return (
    <div className="dashboard">
      <h2 className="page-title">Dashboard</h2>

      {/* KPI CARDS */}
      <div className="kpi-grid">
        <div className="kpi-card"><p>Total Expenses</p><h3>₹{totalExpenses}</h3></div>
        <div className="kpi-card"><p>Budget Usage</p><h3>{budgetUsage}%</h3></div>
        <div className="kpi-card"><p>Active Savings Goals</p><h3>{savingsGoals.length}</h3></div>
      </div>

      {/* ALERT */}
      <div className={`alert-box ${alertClass}`}>{alertText}</div>

      {/* ANALYTICS */}
      <div className="dashboard-grid">
        <div className="chart-card">
          <h3>Expense Breakdown</h3>
          <div className="chart-wrapper"><Doughnut data={donutData} /></div>
        </div>

        <div className="chart-card">
          <h3>Expenses Trend</h3>
          <div className="chart-wrapper"><Line data={lineData} /></div>
        </div>
      </div>

      {/* SMART TIP */}
      <div className="info-card">
        <h3>Smart Insight</h3>
        <p>{smartTip}</p>
      </div>

    </div>
  );
}

export default Dashboard;
