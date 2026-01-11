import { useState } from "react";

function TransactionFilter({ onFilter }) {
  const [month, setMonth] = useState("");
  const [category, setCategory] = useState("");

  const applyFilter = () => {
    onFilter({ month, category });
  };

  return (
    <div className="filter-box">
      <select value={month} onChange={e => setMonth(e.target.value)}>
        <option value="">All Months</option>
        {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
          .map((m, i) => (
            <option key={i} value={i}>{m}</option>
          ))}
      </select>

      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Shopping">Shopping</option>
        <option value="Bills">Bills</option>
        <option value="Others">Others</option>
      </select>

      <button onClick={applyFilter}>Filter</button>
    </div>
  );
}

export default TransactionFilter;
