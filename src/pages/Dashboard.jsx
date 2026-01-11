import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { useFinance } from "../context/FinanceContext";
import MonthlyTrendChart from "../components/MonthlyTrendChart";
import "../styles/dashboard.css";

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const {
  expenses = [],
  budgets = [],
  incomes = [],
  savingsGoals = [],
  monthlyTotals = [] 
} = useFinance() || {};
  const [showInsights, setShowInsights] = useState(false);

  /* ==== KPI ==== */
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const totalIncome = incomes.reduce((s, i) => s + i.amount, 0);
  const balanceLeft = totalIncome - totalExpenses;

  /* ==== Alert ==== */
  let alertText = "🟢 You're spending safely!";
  if (totalExpenses > totalIncome) alertText = "🔴 Expenses crossed income!";
  else if (totalExpenses > totalIncome * 0.8)
    alertText = "🟡 Warning: expenses nearing income";

  /* ==== Donut Chart ==== */
  const categoryTotals = {};
  expenses.forEach((e) => {
    categoryTotals[e.category] =
      (categoryTotals[e.category] || 0) + e.amount;
  });

  const donutData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#4f46e5",
          "#22c55e",
          "#f97316",
          "#0ea5e9",
          "#ef4444",
          "#a855f7",
        ],
        borderWidth: 0
      }
    ]
  };

  /* ==== Auto Insights (basic AI feel) ==== */
  let insights = [];

  if (totalExpenses > totalIncome)
    insights.push("⚠ You spent more than you earned this month!");
  if (balanceLeft > 0)
    insights.push(`👍 You saved ₹${balanceLeft} this month.`);
  const topCategory = Object.entries(categoryTotals).sort((a,b) => b[1]-a[1])[0];
  if (topCategory)
    insights.push(`💰 Most spent on ${topCategory[0]} (₹${topCategory[1]})`);
  if (totalExpenses < totalIncome * 0.5)
    insights.push("👏 Excellent control! Expenses are less than 50% of income.");

  return (
    <div className="dashboard">

      {/* Header Row */}
      <div className="dashboard-header">
        <h2 className="page-title">Dashboard</h2>
        <button className="insight-btn" onClick={() => setShowInsights(true)}>
          ✨ Monthly Insights
        </button>
      </div>

      {/* KPI CARDS */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <p>Total Income</p>
          <h3>₹{totalIncome}</h3>
        </div>
        <div className="kpi-card">
          <p>Total Expenses</p>
          <h3>₹{totalExpenses}</h3>
        </div>
        <div className="kpi-card">
          <p>Balance Left</p>
          <h3>₹{balanceLeft}</h3>
        </div>
      </div>

      {/* ALERT */}
      <div className="alert-box">{alertText}</div>

      {/* ANALYTICS */}
      <div className="dashboard-grid">
        <div className="chart-card">
          <h3>Expense Breakdown</h3>
          <div className="chart-wrapper">
            <Doughnut data={donutData} />
          </div>
        </div>

        <div className="chart-card">
          <h3>Monthly Trend</h3>
          <div className="chart-wrapper">
            <MonthlyTrendChart monthlyTotals={monthlyTotals} />
          </div>
        </div>
      </div>

      {/* POPUP INSIGHTS MODAL */}
      {showInsights && (
        <div className="modal-overlay" onClick={() => setShowInsights(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>💡 Monthly Insights</h3>
            <ul>
              {insights.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
            <button className="close-btn" onClick={() => setShowInsights(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
