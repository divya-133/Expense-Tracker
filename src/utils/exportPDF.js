import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportPDF = (data) => {
  const doc = new jsPDF();
  doc.text("BudgetWise Transactions", 14, 16);

  autoTable(doc, {
    startY: 20,
    head: [["Category", "Amount", "Date"]],
    body: data.map(x => [x.category, x.amount, x.date])
  });

  doc.save("transactions.pdf");
};
