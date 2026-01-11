import { createContext, useContext, useEffect, useState } from "react";

const FinanceContext = createContext();

export function FinanceProvider({ children }) {
  const [expenses, setExpenses] = useState(() =>
    JSON.parse(localStorage.getItem("expenses")) || []
  );

  const [budgets, setBudgets] = useState(() =>
    JSON.parse(localStorage.getItem("budgets")) || []
  );

  const [savingsGoals, setSavingsGoals] = useState(() =>
    JSON.parse(localStorage.getItem("savingsGoals")) || []
  );

  // Store changes to localStorage
  useEffect(() => localStorage.setItem("expenses", JSON.stringify(expenses)), [expenses]);
  useEffect(() => localStorage.setItem("budgets", JSON.stringify(budgets)), [budgets]);
  useEffect(() => localStorage.setItem("savingsGoals", JSON.stringify(savingsGoals)), [savingsGoals]);

  // Calculate monthly total expenses
  const monthlyTotals = Array(12).fill(0);
  expenses.forEach(e => {
    const month = new Date(e.date).getMonth(); // 0 - 11
    monthlyTotals[month] += e.amount;
  });

  return (
    <FinanceContext.Provider value={{
      expenses, setExpenses,
      budgets, setBudgets,
      savingsGoals, setSavingsGoals,
      monthlyTotals
    }}>
      {children}
    </FinanceContext.Provider>
  );
}

export const useFinance = () => useContext(FinanceContext);
