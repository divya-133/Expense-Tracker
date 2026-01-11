export const exportCSV = (data) => {
  const headers = ["Category,Amount,Date"];
  const rows = data.map(x => `${x.category},${x.amount},${x.date}`);
  const csvContent = [headers, ...rows].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "transactions.csv";
  link.click();
};
