function InsightModal({ expenses, budgets, savingsGoals, monthlyTotals, closeModal }) {
  let tips = [];

  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const totalBudget = budgets.reduce((s, b) => s + b.limit, 0);

  if (totalBudget > 0 && totalExpenses > totalBudget)
    tips.push("🚨 You exceeded your overall budget!");

  if (totalExpenses > totalBudget * 0.8)
    tips.push("⚠️ You are very close to exceeding budget.");

  /* Category spikes */
  const categories = {};
  expenses.forEach(e => categories[e.category] = (categories[e.category] || 0) + e.amount);
  let topCategory = Object.entries(categories).sort((a,b)=>b[1]-a[1])[0];
  if (topCategory) tips.push(`💡 Highest spending: ${topCategory[0]} (₹${topCategory[1]})`);

  /* Savings */
  if (savingsGoals.length === 0) tips.push("⭐ Create a savings goal to start building wealth!");

  /* Month comparison */
  const last = monthlyTotals[10] || 0;
  const current = monthlyTotals[11] || 0;
  if (current > last) tips.push("📈 Spending increased from last month");

  if (tips.length === 0) tips.push("🎉 Your spending is healthy. Keep it up!");

  return (
    <div className="insight-overlay">
      <div className="insight-box">
        <h3>AI Spending Insights</h3>
        <ul>
          {tips.map((t,i)=><li key={i}>{t}</li>)}
        </ul>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
}

export default InsightModal;
