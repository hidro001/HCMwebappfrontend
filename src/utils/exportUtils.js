import XLSX from "xlsx";
import { jsPDF } from "jspdf";

export function exportToCSV(data) {
  if (!data || !data.length) return;
  const headers = Object.keys(data[0]);
  const rows = [];
  rows.push(headers.join(","));
  data.forEach(item => {
    const values = headers.map(key => {
      const val = item[key] == null ? "" : String(item[key]).replace(/"/g, '""');
      return `"${val}"`;
    });
    rows.push(values.join(","));
  });
  const csvString = rows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "exported_data.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportToExcel(data) {
  if (!data || !data.length) return;
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, "export.xlsx");
}

export function exportToPDF(data) {
  if (!data || !data.length) return;
  const doc = new jsPDF();
  doc.text(JSON.stringify(data, null, 2), 10, 10);
  doc.save("export.pdf");
}

export function printElementById(elementId) {
  const element = document.getElementById(elementId);
  if (!element) return;
  const html = element.outerHTML;
  const newWindow = window.open("", "_blank", "width=800,height=600");
  newWindow.document.write(`
    <html>
      <head><title>Print</title></head>
      <body>${html}</body>
    </html>
  `);
  newWindow.document.close();
  newWindow.focus();
  newWindow.print();
  newWindow.close();
}
