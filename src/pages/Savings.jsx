import { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import "../styles/savings.css";

function Savings() {
  const { savingsGoals, setSavingsGoals, expenses, budgets } = useFinance();
  const [form, setForm] = useState({ name: "", target: "" });

  /* ===== GLOBAL BUDGET HEALTH ===== */
  const totalBudget = budgets.reduce((s, b) => s + b.limit, 0);
  const totalExpense = expenses.reduce((s, e) => s + e.amount, 0);
  const budgetUsage =
    totalBudget > 0 ? Math.round((totalExpense / totalBudget) * 100) : 0;

  /* ===== CREATE GOAL ===== */
  const addGoal = () => {
    if (!form.name || !form.target) return;

    setSavingsGoals([
      ...savingsGoals,
      {
        id: Date.now(),
        name: form.name,
        target: Number(form.target),
        saved: 0,
        createdAt: new Date().toISOString()
      }
    ]);

    setForm({ name: "", target: "" });
  };

  /* ===== ADD SAVINGS ===== */
  const addSavings = (id) => {
    setSavingsGoals(
      savingsGoals.map(g =>
        g.id === id ? { ...g, saved: g.saved + 500 } : g
      )
    );
  };

  return (
    <div className="savings">

      <h2 className="page-title">Savings Goals</h2>

      {/* ===== GLOBAL ALERT ===== */}
      {budgetUsage >= 80 && (
        <div className={`alert ${budgetUsage >= 100 ? "danger" : "warning"}`}>
          {budgetUsage >= 100
            ? "❌ Budget exceeded — savings goals may fail"
            : "⚠️ High spending detected — savings may slow down"}
        </div>
      )}

      {/* ===== CREATE GOAL ===== */}
      <div className="savings-form">
        <input
          placeholder="Goal Name (e.g. Emergency Fund)"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="number"
          placeholder="Target Amount (₹)"
          value={form.target}
          onChange={e => setForm({ ...form, target: e.target.value })}
        />

        <button onClick={addGoal}>Create Goal</button>
      </div>

      {/* ===== GOALS LIST ===== */}
      <div className="goals-grid">
        {savingsGoals.map(g => {
          const progress =
            g.target > 0 ? Math.round((g.saved / g.target) * 100) : 0;

          /* ===== STATUS ===== */
          let status = "ontrack";
          if (progress < 40 || budgetUsage >= 80) status = "delayed";
          if (progress >= 100) status = "completed";

          /* ===== ESTIMATED COMPLETION ===== */
          const monthsPassed = Math.max(
            1,
            Math.floor(
              (Date.now() - new Date(g.createdAt)) / (1000 * 60 * 60 * 24 * 30)
            )
          );

          const avgMonthlySavings = g.saved / monthsPassed;
          const monthsLeft =
            avgMonthlySavings > 0
              ? Math.ceil((g.target - g.saved) / avgMonthlySavings)
              : "∞";

          return (
            <div key={g.id} className={`goal-card ${status}`}>

              <div className="goal-header">
                <h3>{g.name}</h3>
                <span className="status">
                  {status === "completed" && "🏆 Completed"}
                  {status === "ontrack" && "✅ On Track"}
                  {status === "delayed" && "⚠️ Delayed"}
                </span>
              </div>

              <p>Target: ₹{g.target}</p>
              <p>Saved: ₹{g.saved}</p>

              {/* PROGRESS */}
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>

              <p className="progress-text">
                {progress}% • Est. completion: {monthsLeft} months
              </p>

              {status !== "completed" && (
                <button onClick={() => addSavings(g.id)}>
                  + Add ₹500
                </button>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
}

export default Savings;
