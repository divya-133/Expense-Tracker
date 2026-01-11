import { createContext, useContext, useEffect, useState } from "react";

const FinanceContext = createContext();

export function FinanceProvider({ children }) {
  // EXPENSES
  const [expenses, setExpenses] = useState(() =>
    JSON.parse(localStorage.getItem("expenses")) || []
  );

  // INCOME
  const [incomes, setIncomes] = useState(() =>
    JSON.parse(localStorage.getItem("incomes")) || []
  );

  // BUDGETS
  const [budgets, setBudgets] = useState(() =>
    JSON.parse(localStorage.getItem("budgets")) || []
  );

  // SAVINGS GOALS
  const [savingsGoals, setSavingsGoals] = useState(() =>
    JSON.parse(localStorage.getItem("savingsGoals")) || []
  );

  // ===== SYNC WITH LOCAL STORAGE =====
  useEffect(() => localStorage.setItem("expenses", JSON.stringify(expenses)), [expenses]);
  useEffect(() => localStorage.setItem("incomes", JSON.stringify(incomes)), [incomes]);
  useEffect(() => localStorage.setItem("budgets", JSON.stringify(budgets)), [budgets]);
  useEffect(() => localStorage.setItem("savingsGoals", JSON.stringify(savingsGoals)), [savingsGoals]);

  // ===== MONTHLY TOTAL EXPENSES =====
  const monthlyExpenseTotals = Array(12).fill(0);
  expenses.forEach((e) => {
    const month = new Date(e.date).getMonth();
    monthlyExpenseTotals[month] += e.amount;
  });

  // ===== MONTHLY TOTAL INCOME =====
  const monthlyIncomeTotals = Array(12).fill(0);
  incomes.forEach((i) => {
    const month = new Date(i.date).getMonth();
    monthlyIncomeTotals[month] += i.amount;
  });

  return (
    <FinanceContext.Provider
      value={{
        // Data
        expenses,
        incomes,
        budgets,
        savingsGoals,

        // Setters
        setExpenses,
        setIncomes,
        setBudgets,
        setSavingsGoals,

        // Monthly Calculations
        monthlyExpenseTotals,
        monthlyIncomeTotals
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export const useFinance = () => useContext(FinanceContext);
