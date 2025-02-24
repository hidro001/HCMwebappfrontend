// ExportButtons.js
import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FaFilePdf, FaFileCsv, FaFileExcel, FaPrint } from "react-icons/fa";

/**
 * @param {Array} data - Array of objects representing table rows
 * @param {Array} columns - Array of column definitions for PDF [{ header: "Col Title", dataKey: "keyInData" }]
 * @param {String} filename - Base name for exported files (default: "Export")
 */
export default function ExportButtons({
  data = [],
  columns = [],
  filename = "Export",
}) {
  // Convert data -> 2D array for CSV
  const generateCSV = (rows) => {
    if (!rows.length) return "";

    // If columns are provided, we'll use them as headers.
    // Otherwise, use keys from the first item.
    const headers = columns.length
      ? columns.map((col) => col.header)
      : Object.keys(rows[0]);

    let csvContent = headers.join(",") + "\n";

    for (const row of rows) {
      const line = columns.length
        ? columns.map((col) => row[col.dataKey] ?? "").join(",")
        : Object.values(row).join(",");
      csvContent += line + "\n";
    }
    return csvContent;
  };

  // Handle CSV
  const handleExportCSV = () => {
    const csv = generateCSV(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${filename}.csv`);
  };

  // Handle Excel
  const handleExportExcel = () => {
    // If columns are provided, create a new array that only includes those columns
    const exportData = columns.length
      ? data.map((row) => {
          const filtered = {};
          columns.forEach((col) => {
            filtered[col.header] = row[col.dataKey] ?? "";
          });
          return filtered;
        })
      : data;

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `${filename}.xlsx`);
  };

  // Handle PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(13);

    if (columns.length) {
      // If columns are defined, use them for the table
      const tableColumnHeaders = columns.map((col) => col.header);
      const tableRows = data.map((row) =>
        columns.map((col) => row[col.dataKey] ?? "")
      );

      doc.text(filename, 14, 15); // Title at top
      doc.autoTable({
        startY: 20,
        head: [tableColumnHeaders],
        body: tableRows,
      });
    } else {
      // If no columns, create from data keys
      if (data.length) {
        const keys = Object.keys(data[0]);
        const tableRows = data.map((row) => keys.map((k) => row[k] ?? ""));
        doc.text(filename, 14, 15);
        doc.autoTable({
          startY: 20,
          head: [keys],
          body: tableRows,
        });
      } else {
        doc.text("No data available", 14, 15);
      }
    }

    doc.save(`${filename}.pdf`);
  };

  // Handle Print
  const handlePrint = () => {
    // This will attempt to print the entire current window/tab
    // If you only want to print a specific table DOM element,
    // you can adapt by creating a separate hidden iframe or using a library.
    window.print();
  };

  return (
    <div className="flex items-center gap-2">
      {/* CSV */}
      <button
        onClick={handleExportCSV}
        className="text-green-600 hover:text-green-800"
        title="Export CSV"
      >
        <FaFileCsv size={18} />
      </button>

      {/* PDF */}
      <button
        onClick={handleExportPDF}
        className="text-pink-600 hover:text-pink-800"
        title="Export PDF"
      >
        <FaFilePdf size={18} />
      </button>

      {/* Print */}
      <button
        onClick={handlePrint}
        className="text-orange-500 hover:text-orange-600"
        title="Print"
      >
        <FaPrint size={18} />
      </button>

      {/* Excel */}
      <button
        onClick={handleExportExcel}
        className="text-blue-600 hover:text-blue-800"
        title="Export Excel"
      >
        <FaFileExcel size={18} />
      </button>
    </div>
  );
}
