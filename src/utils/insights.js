export function generateInsights(transactions, budgets) {
  const insights = [];

  const byCategory = {};
  let totalExpense = 0;

  transactions.forEach(t => {
    if (t.type === "expense") {
      totalExpense += t.amount;
      byCategory[t.category] = (byCategory[t.category] || 0) + t.amount;
    }
  });

  // 1. Overspending categories
  Object.entries(byCategory).forEach(([cat, amt]) => {
    const bud = budgets.find(b => b.category === cat);
    if (bud && amt > bud.limit) {
      insights.push(`⚠️ ${cat} exceeded budget (${amt} > ${bud.limit})`);
    }
  });

  // 2. Highest spending category
  const top = Object.entries(byCategory).sort((a,b)=>b[1]-a[1])[0];
  if (top) insights.push(`💸 Highest spending this month: ${top[0]} (${top[1]})`);

  // 3. Savings level
  const income = transactions.filter(t=>t.type==="income").reduce((s,c)=>s+c.amount,0);
  if (income && totalExpense > income*0.8) {
    insights.push("⚠️ Spending is more than 80% of income! Savings too low.");
  }

  if (insights.length === 0) {
    insights.push("🎉 Great job! You are within budget this month!");
  }

  return insights;
}
