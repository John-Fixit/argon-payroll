// // import * as XLSX from "xlsx";
// // import * as FileSaver from "file-saver";

// // export const exportExcel = async ({ excelData, fileName, is_grouped, is_nominal_report }) => {
// //   const fileType =
// //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
// //   const fileExtension = ".xlsx";

// //   // If there's no data, return early
// //   if (!excelData || excelData?.length === 0) return;

// //   if (is_grouped) {
// //     // Dynamically generate headers based on the first section's data keys
// //     const firstSectionData = excelData?.[0]?.data;
// //     const headers =
// //       firstSectionData?.length > 0
// //         ? Object.keys(firstSectionData[0])?.map((header) =>
// //             header?.toUpperCase()
// //           )
// //         : [];

// //     // Start with an empty sheet and insert the headers first
// //     const ws = XLSX.utils.aoa_to_sheet([headers]);
// //     let rowOffset = 1; // Start after the headers row

// //     excelData?.forEach((section) => {
// //       // Add a merged header row for each section (e.g., "Governor Table")
// //       XLSX.utils.sheet_add_aoa(ws, [[section?.header]], {
// //         origin: { r: rowOffset, c: 0 },
// //       });

// //       ws["!merges"] = ws["!merges"] || [];
// //       ws["!merges"].push({
// //         s: { r: rowOffset, c: 0 },
// //         e: { r: rowOffset, c: headers?.length - 1 },
// //       });

// //       // Apply bold style to the group header
// //       ws[`A${rowOffset + 1}`].s = {
// //         font: { bold: true },
// //         alignment: { horizontal: "center" },
// //       };

// //       rowOffset += 1;

// //       // Add the data rows for the group
// //       const dataRows = section?.data?.map((row) =>
// //         headers?.map((header) => row[header?.toLowerCase()] || "")
// //       );
// //       XLSX.utils.sheet_add_aoa(ws, dataRows, {
// //         origin: { r: rowOffset, c: 0 },
// //       });

// //       rowOffset += dataRows.length; // Move the offset after the data
// //     });

// //     const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
// //     const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
// //     const data = new Blob([excelBuffer], { type: fileType });
// //     FileSaver.saveAs(data, fileName + fileExtension);
// //   } else {
// //     const ws = XLSX.utils.json_to_sheet(excelData);
// //     const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
// //     const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
// //     const data = new Blob([excelBuffer], { type: fileType });
// //     FileSaver.saveAs(data, fileName + fileExtension);
// //   }
// // };

import * as XLSX from "xlsx-js-style"; // Changed from "xlsx" to "xlsx-js-style"
import * as FileSaver from "file-saver";

export const exportExcel = async ({
  excelData,
  fileName,
  is_grouped,
  is_nominal_report,
}) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  // If there's no data, return early
  if (!excelData || excelData?.length === 0) return;

  if (is_grouped) {
    // Dynamically generate headers based on the first section's data keys
    const firstSectionData = excelData?.[0]?.data;
    const headers =
      firstSectionData?.length > 0
        ? Object.keys(firstSectionData[0])?.map((header) =>
            header?.toUpperCase()
          )
        : [];

    // Start with an empty sheet and insert the headers first
    const ws = XLSX.utils.aoa_to_sheet([headers]);

    // Apply header styling only if is_nominal_report is true
    if (is_nominal_report) {
      headers.forEach((_, colIndex) => {
        const cellAddress = XLSX.utils.encode_cell({ r: 0, c: colIndex });
        if (!ws[cellAddress]) ws[cellAddress] = {};
        ws[cellAddress].s = {
          font: { bold: true, name: "Arial", sz: 11 },
          alignment: {
            horizontal: "center",
            vertical: "center",
            wrapText: true,
          },
          fill: { fgColor: { rgb: "D3D3D3" } },
          border: {
            top: { style: "thin", color: { rgb: "000000" } },
            bottom: { style: "thin", color: { rgb: "000000" } },
            left: { style: "thin", color: { rgb: "000000" } },
            right: { style: "thin", color: { rgb: "000000" } },
          },
        };
      });
    }

    let rowOffset = 1; // Start after the headers row

    excelData?.forEach((section) => {
      // Add a merged header row for each section (e.g., "Governor Table")
      XLSX.utils.sheet_add_aoa(ws, [[section?.header]], {
        origin: { r: rowOffset, c: 0 },
      });

      ws["!merges"] = ws["!merges"] || [];
      ws["!merges"].push({
        s: { r: rowOffset, c: 0 },
        e: { r: rowOffset, c: headers?.length - 1 },
      });

      // Apply bold style to the group header
      const groupHeaderCell = `A${rowOffset + 1}`;
      if (!ws[groupHeaderCell]) ws[groupHeaderCell] = {};
      ws[groupHeaderCell].s = {
        font: { bold: true },
        alignment: { horizontal: "center" },
      };

      rowOffset += 1;

      // Add the data rows for the group
      const dataRows = section?.data?.map((row) =>
        headers?.map((header) => row[header?.toLowerCase()] || "")
      );
      XLSX.utils.sheet_add_aoa(ws, dataRows, {
        origin: { r: rowOffset, c: 0 },
      });

      // Apply data cell styling only if is_nominal_report is true
      if (is_nominal_report) {
        dataRows.forEach((row, rowIndex) => {
          row.forEach((_, colIndex) => {
            const cellAddress = XLSX.utils.encode_cell({
              r: rowOffset + rowIndex,
              c: colIndex,
            });
            if (!ws[cellAddress]) ws[cellAddress] = {};
            ws[cellAddress].s = {
              font: { name: "Arial", sz: 10 },
              alignment: {
                horizontal: "left",
                vertical: "top",
                wrapText: true,
              },
              border: {
                top: { style: "thin", color: { rgb: "000000" } },
                bottom: { style: "thin", color: { rgb: "000000" } },
                left: { style: "thin", color: { rgb: "000000" } },
                right: { style: "thin", color: { rgb: "000000" } },
              },
            };
          });
        });
      }

      rowOffset += dataRows.length; // Move the offset after the data
    });

    // Set column widths if is_nominal_report is true
    if (is_nominal_report) {
      ws["!cols"] = headers.map(() => ({ wch: 20 }));
    }

    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  } else {
    const ws = XLSX.utils.json_to_sheet(excelData);

    // Apply styling for non-grouped data if is_nominal_report is true
    if (is_nominal_report) {
      const range = XLSX.utils.decode_range(ws["!ref"]);

      // Style headers
      for (let col = range.s.c; col <= range.e.c; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
        if (!ws[cellAddress]) continue;
        ws[cellAddress].s = {
          font: { bold: true, name: "Arial", sz: 11 },
          alignment: {
            horizontal: "center",
            vertical: "center",
            wrapText: true,
          },
          fill: { fgColor: { rgb: "D3D3D3" } },
          border: {
            top: { style: "thin", color: { rgb: "000000" } },
            bottom: { style: "thin", color: { rgb: "000000" } },
            left: { style: "thin", color: { rgb: "000000" } },
            right: { style: "thin", color: { rgb: "000000" } },
          },
        };
      }

      // Style data cells
      for (let row = range.s.r + 1; row <= range.e.r; row++) {
        for (let col = range.s.c; col <= range.e.c; col++) {
          const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
          if (!ws[cellAddress]) continue;
          ws[cellAddress].s = {
            font: { name: "Arial", sz: 10 },
            alignment: { horizontal: "left", vertical: "top", wrapText: true },
            border: {
              top: { style: "thin", color: { rgb: "000000" } },
              bottom: { style: "thin", color: { rgb: "000000" } },
              left: { style: "thin", color: { rgb: "000000" } },
              right: { style: "thin", color: { rgb: "000000" } },
            },
          };
        }
      }

      // Set column widths
      ws["!cols"] = Array(range.e.c - range.s.c + 1).fill({ wch: 20 });
    }

    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  }
};
