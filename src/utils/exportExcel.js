import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportExcel = (data) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const file = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(file, "transactions.xlsx");
};
