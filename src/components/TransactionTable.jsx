function TransactionTable({ data }) {
  return (
    <table className="txn-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Category</th>
          <th>Description</th>
          <th>Amount</th>
        </tr>
      </thead>

      <tbody>
        {data.length === 0 ? (
          <tr><td colSpan="4" style={{ textAlign: "center" }}>No Records Found</td></tr>
        ) : (
          data.map((tx, i) => (
            <tr key={i}>
              <td>{tx.date}</td>
              <td>{tx.category}</td>
              <td>{tx.description}</td>
              <td>₹{tx.amount}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default TransactionTable;
