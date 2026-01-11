import { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import "../styles/budgets.css";

function Budgets() {
  const { budgets, setBudgets, expenses } = useFinance();
  const [form, setForm] = useState({ category: "", limit: "" });

  const addBudget = () => {
    if (!form.category || !form.limit) return;
    setBudgets([...budgets, { ...form, limit: Number(form.limit) }]);
    setForm({ category: "", limit: "" });
  };

  return (
    <div className="budgets">
      <h2 className="page-title">Budget Monitoring</h2>

      {/* ADD BUDGET */}
      <div className="budget-form">
        <input
          placeholder="Category"
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
        />
        <input
          type="number"
          placeholder="Monthly Limit"
          value={form.limit}
          onChange={e => setForm({ ...form, limit: e.target.value })}
        />
        <button onClick={addBudget}>Add Budget</button>
      </div>

      {/* BUDGET CARDS */}
      <div className="budget-grid">
        {budgets.map(b => {
          const spent = expenses
            .filter(e => e.category === b.category)
            .reduce((s, e) => s + e.amount, 0);

          const usage = Math.round((spent / b.limit) * 100);

          let status = "safe";
          if (usage >= 100) status = "exceeded";
          else if (usage >= 80) status = "warning";

          return (
            <div key={b.category} className={`budget-card ${status}`}>
              <h3>{b.category}</h3>
              <p>Planned: ₹{b.limit}</p>
              <p>Spent: ₹{spent}</p>
              <p>Usage: {usage}%</p>
              <strong>
                {status === "safe" && "✅ Safe"}
                {status === "warning" && "⚠️ Warning"}
                {status === "exceeded" && "❌ Exceeded"}
              </strong>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Budgets;
