import { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import "../styles/table.css";
import { exportCSV } from "../utils/exportCSV";
import { exportPDF } from "../utils/exportPDF";

function Transactions() {
  const { expenses, setExpenses } = useFinance();

  const [form, setForm] = useState({
    category: "",
    amount: "",
    date: ""
  });

  const [editId, setEditId] = useState(null);

  /* ===== ADD / UPDATE ===== */
  const handleSubmit = () => {
    if (!form.category || !form.amount || !form.date) return;

    if (editId) {
      setExpenses(
        expenses.map(e =>
          e.id === editId ? { ...form, id: editId } : e
        )
      );
      setEditId(null);
    } else {
      setExpenses([
        ...expenses,
        { ...form, id: Date.now(), amount: Number(form.amount) }
      ]);
    }

    setForm({ category: "", amount: "", date: "" });
  };

  /* ===== EDIT ===== */
  const editExpense = (expense) => {
    setForm(expense);
    setEditId(expense.id);
  };

  /* ===== DELETE ===== */
  const deleteExpense = (id) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  return (
    <div className="transactions">

      <h2 className="page-title">Transactions</h2>

      {/* ADD / EDIT FORM */}
      <div className="expense-form">
        <input
          placeholder="Category"
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
        />

        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={e => setForm({ ...form, amount: e.target.value })}
        />

        <input
          type="date"
          value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })}
        />

        <button onClick={handleSubmit}>
          {editId ? "Update Expense" : "Add Expense"}
        </button>
      </div>

{/* EXPORT BUTTONS */}
<div className="export-row">
  <button className="export-btn csv" onClick={() => exportCSV(expenses)}>
    📄 Export CSV
  </button>
  <button className="export-btn pdf" onClick={() => exportPDF(expenses)}>
    🧾 Export PDF
  </button>
</div>

      {/* TABLE */}
      <div className="table-card">
        
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td colSpan="4" className="empty">
                  No transactions added
                </td>
              </tr>
            ) : (
              expenses.map(e => (
                <tr key={e.id}>
                  <td>{e.category}</td>
                  <td>₹{e.amount}</td>
                  <td>{e.date}</td>
                  <td className="actions">
                    <button
                      className="edit"
                      onClick={() => editExpense(e)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete"
                      onClick={() => deleteExpense(e.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Transactions;

