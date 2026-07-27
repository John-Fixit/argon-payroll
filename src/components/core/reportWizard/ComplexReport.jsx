// *************** complex table V4 ***************
/* eslint-disable no-unused-vars */

/* eslint-disable react/prop-types */
import { useMemo, useState } from "react";
import {
  cn,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { formatNumberWithComma } from "../../../utils/utitlities";
import ActionButton from "../../forms/FormElements/ActionButton";
import { MdOutlineFileDownload, MdPrint } from "react-icons/md";
import propType from "prop-types";
import * as XLS from "xlsx";

// Utility function to chunk array into groups of specified size
const chunkArray = (array, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

// Function to process complex data structure
function processComplexData(complexData) {
  const processedData = [];
  let totalStaffCount = 0;

  Object.keys(complexData).forEach((headquarter) => {
    const headquarterData = {
      headquarter: headquarter.trim(),
      departments: [],
      totalNet: 0,
      totalGross: 0,
      totalDeduction: 0,
      staffCount: 0,
    };

    Object.keys(complexData[headquarter]).forEach((department) => {
      const departmentData = {
        department: department.trim(),
        records: [],
        totalNet: 0,
        headers: [],
        staffCount: 0,
        totalGross: 0,
        totalDeduction: 0,
      };

      // Extract records from department (ignore the keys like "P2271")
      const departmentRecords = complexData[headquarter][department];
      const recordsArray = Object.values(departmentRecords);

      // Get unique headers for this department, excluding fixed columns and Grade/Step related fields
      const fixedColumns = ["S/N", "Name", "Empno", "Grade/Step"];
      const excludedFields = ["Grd", "Stp", "Grade", "Step"]; // These should not appear as separate columns
      const departmentHeaders = new Set();
      recordsArray.forEach((record) => {
        Object.keys(record).forEach((key) => {
          // Skip if it's a fixed column or excluded field
          const isFixedColumn = fixedColumns.some(
            (fixed) =>
              key.toLowerCase().includes(fixed.toLowerCase()) ||
              fixed.toLowerCase().includes(key.toLowerCase())
          );
          const isExcludedField = excludedFields.some(
            (excluded) => key.toLowerCase() === excluded.toLowerCase()
          );

          if (!isFixedColumn && !isExcludedField) {
            departmentHeaders.add(key);
          }
        });
      });

      departmentData.headers = Array.from(departmentHeaders);
      departmentData.records = recordsArray.map((record, index) => ({
        ...record,
        "S/N": index + 1,
      }));
      departmentData.staffCount = recordsArray.length;

      // Calculate department total
      recordsArray.forEach((record) => {
        departmentData.totalNet += parseFloat(record.Net || 0);
        departmentData.totalGross += parseFloat(record.Gross || 0);
        departmentData.totalDeduction += parseFloat(record.Deduction || 0);
      });

      headquarterData.departments.push(departmentData);
      headquarterData.totalNet += departmentData.totalNet;
      headquarterData.totalGross += departmentData.totalGross;
      headquarterData.totalDeduction += departmentData.totalDeduction;
      headquarterData.staffCount += departmentData.staffCount;
    });

    processedData.push(headquarterData);
    totalStaffCount += headquarterData.staffCount;
  });

  return { processedData, totalStaffCount };
}

// Main component for handling complex payroll data
const ComplexPayrollReportTable = ({ tableData, title }) => {
  const [isPrintMode, setIsPrintMode] = useState(false);

  const { processedData, totalStaffCount } = useMemo(() => {
    return processComplexData(tableData);
  }, [tableData]);

  // Calculate overall total
  const overallTotal = useMemo(() => {
    return processedData.reduce((total, hq) => total + hq.totalNet, 0);
  }, [processedData]);
  const overallGrossTotal = useMemo(() => {
    return processedData.reduce((total, hq) => total + hq.totalGross, 0);
  }, [processedData]);
  const overallDeductionTotal = useMemo(() => {
    return processedData.reduce((total, hq) => total + hq.totalDeduction, 0);
  }, [processedData]);

  // Print all departments using react-to-print library alternative
  // Enhanced print function that works with drawers
  const handlePrintAll = () => {
    // Create a new window for printing
    const printWindow = window.open("", "_blank", "width=1200,height=800");

    // Generate HTML content for printing
    const printContent = generatePrintHTMLWithRepeatingHeaders(
      processedData,
      overallTotal,
      overallGrossTotal,
      overallDeductionTotal,
      totalStaffCount,
      title
    );

    printWindow.document.writeln(printContent);
    printWindow.document.close();

    // Wait for content to load, then print
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 1000);
    };
  };

  const handlePrintAlla = () => {
    setIsPrintMode(true);

    // Create print styles
    const printStyles = document.createElement("style");
    printStyles.textContent = `
      @media print {
        body * {
          visibility: hidden;
        }
        
        .print-container, .print-container * {
          visibility: visible;
        }
        
        .print-container {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
        }
        
        .department-page {
          page-break-before: always;
          page-break-after: always;
          min-height: 100vh;
        }
        
        .department-page:first-child {
          page-break-before: auto;
        }
        
        .complex-payroll-table {
          width: 100% !important;
          border-collapse: collapse !important;
        }
        
        .complex-payroll-table th,
        .complex-payroll-table td {
          border: 1px solid #000 !important;
          padding: 6px 8px !important;
          font-size: 8px !important;
          text-align: left !important;
        }
        
        .header-row {
          background-color: #1e40af !important;
          color: white !important;
          font-weight: bold !important;
        }
        
        .header-row-alt {
          background-color: #3b82f6 !important;
          color: white !important;
          font-weight: bold !important;
        }
        
        .hq-title {
          font-size: 14px !important;
          font-weight: bold !important;
          text-align: center !important;
          background-color: #e0e0e0 !important;
        }
        
        .dept-title {
          font-size: 12px !important;
          font-weight: bold !important;
          text-align: center !important;
          background-color: #f5f5f5 !important;
        }
        
        .total-row {
          background-color: #ffffcc !important;
          font-weight: bold !important;
        }
        
        .data-row-even {
          background-color: #fafafa !important;
        }
        
        .data-row-odd {
          background-color: #ffffff !important;
        }
        
        .name-cell {
          white-space: normal !important;
          word-wrap: break-word !important;
          max-width: 150px !important;
        }
        
        .no-print {
          display: none !important;
        }
        
        @page {
          margin: 0.5in;
          size: landscape;
        }
      }
    `;
    document.head.appendChild(printStyles);

    setTimeout(() => {
      window.print();
      setIsPrintMode(false);
      document.head.removeChild(printStyles);
    }, 100);
  };

  const exportToExcel = (
    processedData,
    totalStaffCount,
    overallTotal,
    title
  ) => {
    try {
      const XLSX = XLS;
      const wb = XLSX.utils.book_new();

      // Create summary worksheet first
      const summaryData = [];

      summaryData.push({ Summary: title });
      summaryData.push({ Summary: "" }); // Empty row
      summaryData.push({ Summary: "PAYROLL REPORT SUMMARY" });
      summaryData.push({ Summary: "" }); // Empty row

      // Add summary by headquarters
      summaryData.push({ Summary: "BREAKDOWN BY HEADQUARTERS:" });
      summaryData.push({ Summary: "" }); // Empty row

      processedData.forEach((hqData) => {
        summaryData.push({ Summary: `${hqData.headquarter}:` });
        summaryData.push({
          Summary: `  • Gross: ${formatNumberWithComma(hqData.totalGross)}`,
        });
        summaryData.push({
          Summary: `  • Deduction: ${formatNumberWithComma(
            hqData.totalDeduction
          )}`,
        });
        summaryData.push({
          Summary: `  • Net: ${formatNumberWithComma(hqData.totalNet)}`,
        });
        summaryData.push({ Summary: `  • Staff Count: ${hqData.staffCount}` });
        summaryData.push({ Summary: "" }); // Empty row

        hqData.departments.forEach((deptData) => {
          summaryData.push({ Summary: `    └─ ${deptData.department}:` });
          summaryData.push({
            Summary: `       • Gross: ${formatNumberWithComma(
              deptData.totalGross
            )}`,
          });
          summaryData.push({
            Summary: `       • Deduction: ${formatNumberWithComma(
              deptData.totalDeduction
            )}`,
          });
          summaryData.push({
            Summary: `       • Net: ${formatNumberWithComma(
              deptData.totalNet
            )}`,
          });
          summaryData.push({
            Summary: `       • Staff: ${deptData.staffCount}`,
          });
          summaryData.push({ Summary: "" }); // Empty row for spacing
        });
        summaryData.push({ Summary: "" }); // Extra empty row after each HQ
      });

      // Grand totals
      const grandTotalGross = processedData.reduce(
        (total, hq) => total + hq.totalGross,
        0
      );
      const grandTotalDeduction = processedData.reduce(
        (total, hq) => total + hq.totalDeduction,
        0
      );

      summaryData.push({ Summary: "GRAND TOTALS:" });
      summaryData.push({
        Summary: `Grand Gross Total: ${formatNumberWithComma(grandTotalGross)}`,
      });
      summaryData.push({
        Summary: `Grand Deduction Total: ${formatNumberWithComma(
          grandTotalDeduction
        )}`,
      });
      summaryData.push({
        Summary: `Grand Net Total: ${formatNumberWithComma(overallTotal)}`,
      });
      summaryData.push({ Summary: `Total Staff Count: ${totalStaffCount}` });

      // Create summary worksheet
      const summaryWs = XLSX.utils.json_to_sheet(summaryData);

      // Style summary worksheet
      if (summaryWs["!ref"]) {
        const range = XLSX.utils.decode_range(summaryWs["!ref"]);
        for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
          const cellRef = XLSX.utils.encode_cell({ r: rowNum, c: 0 });
          const cell = summaryWs[cellRef];

          if (cell && cell.v) {
            const cellValue = String(cell.v);

            if (cellValue === title) {
              if (!cell.s) cell.s = {};
              cell.s.font = { bold: true, size: 16 };
              cell.s.fill = { fgColor: { rgb: "4F81BD" } };
              cell.s.alignment = { horizontal: "center" };
            } else if (
              cellValue.includes("SUMMARY") ||
              cellValue.includes("GRAND TOTALS:")
            ) {
              if (!cell.s) cell.s = {};
              cell.s.font = { bold: true, size: 14 };
              cell.s.fill = { fgColor: { rgb: "4F81BD" } };
            } else if (
              cellValue.includes("BREAKDOWN") ||
              cellValue.includes("Grand ")
            ) {
              if (!cell.s) cell.s = {};
              cell.s.font = { bold: true };
              cell.s.fill = { fgColor: { rgb: "90EE90" } };
            } else if (
              !cellValue.includes("└─") &&
              !cellValue.includes("•") &&
              cellValue.includes(":") &&
              !cellValue.includes("Grand")
            ) {
              if (!cell.s) cell.s = {};
              cell.s.font = { bold: true };
              cell.s.fill = { fgColor: { rgb: "FFFFE0" } };
            }
          }
        }

        // Auto-size the summary column
        summaryWs["!cols"] = [{ wch: 80 }];
      }

      // Add summary as first worksheet
      XLSX.utils.book_append_sheet(wb, summaryWs, "Summary");

      // Create individual worksheets for each department
      let worksheetIndex = 1;

      processedData.forEach((hqData, hqIndex) => {
        hqData.departments.forEach((deptData, deptIndex) => {
          // Create worksheet data for this specific department
          const isFirstDept = deptIndex === 0;
          const isLastCurrentDept = deptIndex === hqData.departments.length - 1;
          const deptWorksheetData = [];

          // Add title row for the department
          deptWorksheetData.push({ Column1: title });
          deptWorksheetData.push({ Column1: "" }); // Empty row

          // Add headquarter info
          if (isFirstDept) {
            deptWorksheetData.push({
              Column1: `HEADQUARTER: ${hqData.headquarter}`,
            });
            deptWorksheetData.push({ Column1: "" }); // Empty row
          }

          // Add department info
          deptWorksheetData.push({
            Column1: `DEPARTMENT: ${deptData.department}`,
          });
          deptWorksheetData.push({
            Column1: `Total Records: ${deptData.records.length}`,
          });
          deptWorksheetData.push({ Column1: "" }); // Empty row for spacing

          // Get headers specific to THIS department only
          const deptSpecificHeaders = new Set();
          deptData.records.forEach((record) => {
            Object.keys(record).forEach((key) => {
              deptSpecificHeaders.add(key);
            });
          });

          // Convert to array and sort with priority order
          const priorityOrder = [
            "S/N",
            "Name",
            "Empno",
            "Grade",
            "Step",
            "Grd",
            "Stp",
          ];
          const sortedHeaders = Array.from(deptSpecificHeaders).sort((a, b) => {
            const aIndex = priorityOrder.indexOf(a);
            const bIndex = priorityOrder.indexOf(b);

            if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
            if (aIndex !== -1) return -1;
            if (bIndex !== -1) return 1;
            return a.localeCompare(b);
          });

          // Add column headers row with proper display names
          const columnHeaderRow = {};
          sortedHeaders.forEach((header) => {
            let displayHeader = header;
            if (header === "S/N") {
              displayHeader = "S/N";
            } else if (header === "Name" || header === "name") {
              displayHeader = "NAME";
            } else if (
              header === "Empno" ||
              header === "empno" ||
              header === "EMPNO"
            ) {
              displayHeader = "EMPNO";
            } else if (header === "Grd" || header === "Grade") {
              displayHeader = "GRADE";
            } else if (header === "Stp" || header === "Step") {
              displayHeader = "STEP";
            } else {
              displayHeader = header.replaceAll("_", " ").toUpperCase();
            }
            columnHeaderRow[header] = displayHeader;
          });
          deptWorksheetData.push(columnHeaderRow);

          // Add empty row for better spacing
          const emptyRow = {};
          sortedHeaders.forEach((header) => {
            emptyRow[header] = "";
          });
          deptWorksheetData.push(emptyRow);

          // Add data rows for this department with spacing between records
          deptData.records.forEach((record, recordIndex) => {
            const dataRow = {};
            sortedHeaders.forEach((header) => {
              let value = record[header];

              // Handle different key variations
              if (value === undefined || value === null) {
                const lowerHeader = header.toLowerCase();
                const recordKeys = Object.keys(record);

                const matchingKey = recordKeys.find(
                  (key) => key.toLowerCase() === lowerHeader
                );

                if (matchingKey) {
                  value = record[matchingKey];
                }
              }

              // Special handling for Grade/Step combination
              if (header === "Grade" && record["Grd"]) {
                value = record["Grd"];
              } else if (header === "Step" && record["Stp"]) {
                value = record["Stp"];
              }

              dataRow[header] =
                value !== undefined && value !== null ? value : "";
            });

            deptWorksheetData.push(dataRow);

            // Add spacing row after every 5 records for better readability
            // if ((recordIndex + 1) % 5 === 0 && recordIndex !== deptData.records.length - 1) {
            //   deptWorksheetData.push(emptyRow);
            // }
          });

          // Add empty rows before totals
          deptWorksheetData.push(emptyRow);
          deptWorksheetData.push(emptyRow);

          // Add department totals
          const deptTotalRow = {};
          sortedHeaders.forEach((header, index) => {
            if (index === 0) {
              deptTotalRow[header] = `DEPARTMENT TOTALS:`;
            } else if (index === 1) {
              deptTotalRow[header] = `Gross: ${formatNumberWithComma(
                deptData.totalGross
              )}`;
            } else if (index === 2) {
              deptTotalRow[header] = `Deduction: ${formatNumberWithComma(
                deptData.totalDeduction
              )}`;
            } else if (index === 3) {
              deptTotalRow[header] = `Net: ${formatNumberWithComma(
                deptData.totalNet
              )}`;
            } else if (index === 4) {
              deptTotalRow[header] = `Staff Count: ${deptData.staffCount}`;
            } else {
              deptTotalRow[header] = "";
            }
          });
          deptWorksheetData.push(deptTotalRow);

          // Add empty row
          deptWorksheetData.push(emptyRow);

          // Add headquarter totals
          if (isLastCurrentDept) {
            const hqTotalRow = {};
            sortedHeaders.forEach((header, index) => {
              if (index === 0) {
                hqTotalRow[
                  header
                ] = `HEADQUARTER TOTALS (${hqData.headquarter}):`;
              } else if (index === 1) {
                hqTotalRow[header] = `Gross: ${formatNumberWithComma(
                  hqData.totalGross
                )}`;
              } else if (index === 2) {
                hqTotalRow[header] = `Deduction: ${formatNumberWithComma(
                  hqData.totalDeduction
                )}`;
              } else if (index === 3) {
                hqTotalRow[header] = `Net: ${formatNumberWithComma(
                  hqData.totalNet
                )}`;
              } else if (index === 4) {
                hqTotalRow[header] = `Staff Count: ${hqData.staffCount}`;
              } else {
                hqTotalRow[header] = "";
              }
            });
            deptWorksheetData.push(hqTotalRow);
          }

          // Create worksheet
          const ws = XLSX.utils.json_to_sheet(deptWorksheetData);

          // Auto-size columns based on content
          if (ws["!ref"]) {
            const range = XLSX.utils.decode_range(ws["!ref"]);
            const columnWidths = [];

            for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
              let maxWidth = 12;

              for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
                const cellRef = XLSX.utils.encode_cell({
                  r: rowNum,
                  c: colNum,
                });
                const cell = ws[cellRef];

                if (cell && cell.v) {
                  const cellValue = String(cell.v);
                  maxWidth = Math.max(maxWidth, cellValue.length);
                }
              }

              columnWidths.push({ wch: Math.min(maxWidth + 2, 60) });
            }

            ws["!cols"] = columnWidths;
          }

          // Add styling to different row types
          if (ws["!ref"]) {
            const range = XLSX.utils.decode_range(ws["!ref"]);
            for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
              for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
                const cellRef = XLSX.utils.encode_cell({
                  r: rowNum,
                  c: colNum,
                });
                const cell = ws[cellRef];

                if (cell && cell.v) {
                  const cellValue = String(cell.v);

                  // Style different row types
                  if (cellValue === title) {
                    if (!cell.s) cell.s = {};
                    cell.s.font = { bold: true, size: 16 };
                    cell.s.fill = { fgColor: { rgb: "4F81BD" } };
                    cell.s.alignment = { horizontal: "center" };
                  } else if (cellValue.startsWith("HEADQUARTER:")) {
                    if (!cell.s) cell.s = {};
                    cell.s.font = { bold: true, size: 14 };
                    cell.s.fill = { fgColor: { rgb: "E0E0E0" } };
                    cell.s.alignment = { horizontal: "center" };
                  } else if (cellValue.startsWith("DEPARTMENT:")) {
                    if (!cell.s) cell.s = {};
                    cell.s.font = { bold: true, size: 12 };
                    cell.s.fill = { fgColor: { rgb: "F5F5F5" } };
                    cell.s.alignment = { horizontal: "center" };
                  } else if (cellValue.startsWith("Total Records:")) {
                    if (!cell.s) cell.s = {};
                    cell.s.font = { bold: true };
                    cell.s.fill = { fgColor: { rgb: "F0F8FF" } };
                  } else if (cellValue.startsWith("DEPARTMENT TOTALS:")) {
                    if (!cell.s) cell.s = {};
                    cell.s.font = { bold: true };
                    cell.s.fill = { fgColor: { rgb: "FFFFCC" } };
                  } else if (cellValue.startsWith("HEADQUARTER TOTALS")) {
                    if (!cell.s) cell.s = {};
                    cell.s.font = { bold: true };
                    cell.s.fill = { fgColor: { rgb: "E3F2FD" } };
                  } else if (
                    cellValue.includes("Gross:") ||
                    cellValue.includes("Deduction:") ||
                    cellValue.includes("Net:") ||
                    cellValue.includes("Staff Count:")
                  ) {
                    if (!cell.s) cell.s = {};
                    cell.s.font = { bold: true };
                  }

                  // Style column headers
                  if (
                    cellValue.match(
                      /^(S\/N|NAME|EMPNO|GRADE|STEP|[A-Z_\s]+)$/
                    ) &&
                    cellValue.length < 30 &&
                    !cellValue.includes("TOTAL") &&
                    !cellValue.includes("HEADQUARTER") &&
                    !cellValue.includes("DEPARTMENT") &&
                    !cellValue.includes(":") &&
                    rowNum > 5
                  ) {
                    // Only style headers that appear after the initial info rows
                    if (!cell.s) cell.s = {};
                    cell.s.font = { bold: true };
                    cell.s.fill = { fgColor: { rgb: "D9D9D9" } };
                    cell.s.alignment = { horizontal: "center" };
                  }
                }
              }
            }
          }

          // Create a clean worksheet name
          const cleanHQ = hqData.headquarter
            .replace(/[^\w\s]/gi, "")
            .substring(0, 15);
          const cleanDept = deptData.department
            .replace(/[^\w\s]/gi, "")
            .substring(0, 15);
          const worksheetName = `${cleanHQ}-${cleanDept}`.substring(0, 31); // Excel worksheet name limit

          // Add worksheet to workbook
          XLSX.utils.book_append_sheet(wb, ws, worksheetName);

          worksheetIndex++;
        });
      });

      // Generate file name with timestamp
      const timestamp = new Date()
        .toISOString()
        .slice(0, 19)
        .replace(/:/g, "-");
      const fileName = `${title}_Department_Worksheets_${timestamp}.xlsx`;

      // Save file
      XLSX.writeFile(wb, fileName);

      console.log(
        `Excel export completed successfully - ${
          worksheetIndex - 1
        } department worksheets created with proper spacing and formatting`
      );
    } catch (error) {
      console.error("Excel export failed:", error);
      alert("Excel export failed. Please check the console for details.");
    }
  };

  // v6
  // const exportToExcel = (processedData, totalStaffCount, overallTotal, title) => {
  //   try {
  //     const XLSX = XLS;
  //     const wb = XLSX.utils.book_new();

  //     // Create a single comprehensive worksheet that mirrors the table structure
  //     const allExcelData = [];

  //     // Add title row
  //     allExcelData.push({ 'Column1': title });
  //     allExcelData.push({ 'Column1': '' }); // Empty row

  //     processedData.forEach((hqData, hqIndex) => {
  //       hqData.departments.forEach((deptData, deptIndex) => {
  //         const isFirstDept = deptIndex === 0;
  //         const isLastCurrentDept = deptIndex === hqData.departments.length - 1;

  //         // Get headers specific to THIS department only
  //         const deptSpecificHeaders = new Set();
  //         deptData.records.forEach(record => {
  //           Object.keys(record).forEach(key => {
  //             deptSpecificHeaders.add(key);
  //           });
  //         });

  //         // Convert to array and sort with priority order
  //         const priorityOrder = ['S/N', 'Name', 'Empno', 'Grade', 'Step', 'Grd', 'Stp'];
  //         const sortedHeaders = Array.from(deptSpecificHeaders).sort((a, b) => {
  //           const aIndex = priorityOrder.indexOf(a);
  //           const bIndex = priorityOrder.indexOf(b);

  //           if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
  //           if (aIndex !== -1) return -1;
  //           if (bIndex !== -1) return 1;
  //           return a.localeCompare(b);
  //         });

  //         // Add headquarter title row (only for first department in HQ)
  //         if (isFirstDept) {
  //           const hqTitleRow = {};
  //           sortedHeaders.forEach((header, index) => {
  //             if (index === 0) {
  //               hqTitleRow[header] = `HEADQUARTER: ${hqData.headquarter}`;
  //             } else {
  //               hqTitleRow[header] = '';
  //             }
  //           });
  //           allExcelData.push(hqTitleRow);
  //         }

  //         // Add department title row
  //         const deptTitleRow = {};
  //         sortedHeaders.forEach((header, index) => {
  //           if (index === 0) {
  //             deptTitleRow[header] = `DEPARTMENT: ${deptData.department} - Total Records: ${deptData.records.length}`;
  //           } else {
  //             deptTitleRow[header] = '';
  //           }
  //         });
  //         allExcelData.push(deptTitleRow);

  //         // Add column headers row with proper display names
  //         const columnHeaderRow = {};
  //         sortedHeaders.forEach(header => {
  //           let displayHeader = header;
  //           if (header === 'S/N') {
  //             displayHeader = 'S/N';
  //           } else if (header === 'Name' || header === 'name') {
  //             displayHeader = 'NAME';
  //           } else if (header === 'Empno' || header === 'empno' || header === 'EMPNO') {
  //             displayHeader = 'EMPNO';
  //           } else if (header === 'Grd' || header === 'Grade') {
  //             displayHeader = 'GRADE';
  //           } else if (header === 'Stp' || header === 'Step') {
  //             displayHeader = 'STEP';
  //           } else {
  //             displayHeader = header.replaceAll("_", " ").toUpperCase();
  //           }
  //           columnHeaderRow[header] = displayHeader;
  //         });
  //         allExcelData.push(columnHeaderRow);

  //         // Add data rows for this department
  //         deptData.records.forEach(record => {
  //           const dataRow = {};
  //           sortedHeaders.forEach(header => {
  //             let value = record[header];

  //             // Handle different key variations
  //             if (value === undefined || value === null) {
  //               const lowerHeader = header.toLowerCase();
  //               const recordKeys = Object.keys(record);

  //               const matchingKey = recordKeys.find(key =>
  //                 key.toLowerCase() === lowerHeader
  //               );

  //               if (matchingKey) {
  //                 value = record[matchingKey];
  //               }
  //             }

  //             // Special handling for Grade/Step combination
  //             if (header === 'Grade' && record['Grd']) {
  //               value = record['Grd'];
  //             } else if (header === 'Step' && record['Stp']) {
  //               value = record['Stp'];
  //             }

  //             dataRow[header] = value !== undefined && value !== null ? value : '';
  //           });

  //           allExcelData.push(dataRow);
  //         });

  //         // Add department total row with all three totals
  //         const deptTotalRow = {};
  //         sortedHeaders.forEach((header, index) => {
  //           if (index === 0) {
  //             deptTotalRow[header] = `DEPARTMENT TOTALS:`;
  //           } else if (index === 1) {
  //             deptTotalRow[header] = `Gross: ${formatNumberWithComma(deptData.totalGross)}`;
  //           } else if (index === 2) {
  //             deptTotalRow[header] = `Deduction: ${formatNumberWithComma(deptData.totalDeduction)}`;
  //           } else if (index === 3) {
  //             deptTotalRow[header] = `Net: ${formatNumberWithComma(deptData.totalNet)}`;
  //           } else {
  //             deptTotalRow[header] = '';
  //           }
  //         });
  //         allExcelData.push(deptTotalRow);

  //         // Add headquarter total row (only for last department in HQ)
  //         if (isLastCurrentDept) {
  //           const hqTotalRow = {};
  //           sortedHeaders.forEach((header, index) => {
  //             if (index === 0) {
  //               hqTotalRow[header] = `HEADQUARTER TOTALS (${hqData.headquarter}):`;
  //             } else if (index === 1) {
  //               hqTotalRow[header] = `Gross: ${formatNumberWithComma(hqData.totalGross)}`;
  //             } else if (index === 2) {
  //               hqTotalRow[header] = `Deduction: ${formatNumberWithComma(hqData.totalDeduction)}`;
  //             } else if (index === 3) {
  //               hqTotalRow[header] = `Net: ${formatNumberWithComma(hqData.totalNet)}`;
  //             } else {
  //               hqTotalRow[header] = '';
  //             }
  //           });
  //           allExcelData.push(hqTotalRow);
  //           allExcelData.push({ 'Column1': '' }); // Empty row after each headquarter
  //         }
  //       });
  //     });

  //     // Add grand totals at the end
  //     const grandTotalGross = processedData.reduce((total, hq) => total + hq.totalGross, 0);
  //     const grandTotalDeduction = processedData.reduce((total, hq) => total + hq.totalDeduction, 0);

  //     allExcelData.push({ 'Column1': '' }); // Empty row
  //     allExcelData.push({ 'Column1': 'GRAND TOTALS:' });
  //     allExcelData.push({ 'Column1': `Grand Gross Total: ${formatNumberWithComma(grandTotalGross)}` });
  //     allExcelData.push({ 'Column1': `Grand Deduction Total: ${formatNumberWithComma(grandTotalDeduction)}` });
  //     allExcelData.push({ 'Column1': `Grand Net Total: ${formatNumberWithComma(overallTotal)}` });
  //     allExcelData.push({ 'Column1': `Total Staff Count: ${totalStaffCount}` });

  //     // Create main worksheet
  //     const ws = XLSX.utils.json_to_sheet(allExcelData);

  //     // Auto-size columns based on content
  //     if (ws['!ref']) {
  //       const range = XLSX.utils.decode_range(ws['!ref']);
  //       const columnWidths = [];

  //       for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
  //         let maxWidth = 12;

  //         for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
  //           const cellRef = XLSX.utils.encode_cell({ r: rowNum, c: colNum });
  //           const cell = ws[cellRef];

  //           if (cell && cell.v) {
  //             const cellValue = String(cell.v);
  //             maxWidth = Math.max(maxWidth, cellValue.length);
  //           }
  //         }

  //         columnWidths.push({ wch: Math.min(maxWidth + 2, 60) });
  //       }

  //       ws['!cols'] = columnWidths;
  //     }

  //     // Add styling to different row types
  //     if (ws['!ref']) {
  //       const range = XLSX.utils.decode_range(ws['!ref']);
  //       for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
  //         for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
  //           const cellRef = XLSX.utils.encode_cell({ r: rowNum, c: colNum });
  //           const cell = ws[cellRef];

  //           if (cell && cell.v) {
  //             const cellValue = String(cell.v);

  //             // Style different row types
  //             if (cellValue === title) {
  //               if (!cell.s) cell.s = {};
  //               cell.s.font = { bold: true, size: 16 };
  //               cell.s.fill = { fgColor: { rgb: "4F81BD" } };
  //               cell.s.alignment = { horizontal: "center" };
  //             } else if (cellValue.startsWith('HEADQUARTER:')) {
  //               if (!cell.s) cell.s = {};
  //               cell.s.font = { bold: true, size: 14 };
  //               cell.s.fill = { fgColor: { rgb: "E0E0E0" } };
  //               cell.s.alignment = { horizontal: "center" };
  //             } else if (cellValue.startsWith('DEPARTMENT:')) {
  //               if (!cell.s) cell.s = {};
  //               cell.s.font = { bold: true };
  //               cell.s.fill = { fgColor: { rgb: "F5F5F5" } };
  //               cell.s.alignment = { horizontal: "center" };
  //             } else if (cellValue.startsWith('DEPARTMENT TOTALS:')) {
  //               if (!cell.s) cell.s = {};
  //               cell.s.font = { bold: true };
  //               cell.s.fill = { fgColor: { rgb: "FFFFCC" } };
  //             } else if (cellValue.startsWith('HEADQUARTER TOTALS')) {
  //               if (!cell.s) cell.s = {};
  //               cell.s.font = { bold: true };
  //               cell.s.fill = { fgColor: { rgb: "E3F2FD" } };
  //             } else if (cellValue.startsWith('GRAND TOTALS:') || cellValue.includes('Grand ')) {
  //               if (!cell.s) cell.s = {};
  //               cell.s.font = { bold: true, size: 12 };
  //               cell.s.fill = { fgColor: { rgb: "90EE90" } };
  //             } else if (cellValue.includes('Gross:') || cellValue.includes('Deduction:') || cellValue.includes('Net:')) {
  //               if (!cell.s) cell.s = {};
  //               cell.s.font = { bold: true };
  //             }

  //             // Style column headers
  //             if (cellValue.match(/^(S\/N|NAME|EMPNO|GRADE|STEP|[A-Z_\s]+)$/) &&
  //                 cellValue.length < 30 &&
  //                 !cellValue.includes('TOTAL') &&
  //                 !cellValue.includes('HEADQUARTER') &&
  //                 !cellValue.includes('DEPARTMENT') &&
  //                 !cellValue.includes('Grand') &&
  //                 !cellValue.includes(':')) {
  //               if (!cell.s) cell.s = {};
  //               cell.s.font = { bold: true };
  //               cell.s.fill = { fgColor: { rgb: "D9D9D9" } };
  //               cell.s.alignment = { horizontal: "center" };
  //             }
  //           }
  //         }
  //       }
  //     }

  //     // Add main worksheet to workbook
  //     XLSX.utils.book_append_sheet(wb, ws, "Complete Payroll Report");

  //     // Create a summary worksheet
  //     const summaryData = [];

  //     summaryData.push({ 'Summary': 'PAYROLL REPORT SUMMARY' });
  //     summaryData.push({ 'Summary': '' });

  //     // Add summary by headquarters
  //     summaryData.push({ 'Summary': 'BREAKDOWN BY HEADQUARTERS:' });
  //     processedData.forEach(hqData => {
  //       summaryData.push({
  //         'Summary': `${hqData.headquarter}:`
  //       });
  //       summaryData.push({
  //         'Summary': `  • Gross: ${formatNumberWithComma(hqData.totalGross)}`
  //       });
  //       summaryData.push({
  //         'Summary': `  • Deduction: ${formatNumberWithComma(hqData.totalDeduction)}`
  //       });
  //       summaryData.push({
  //         'Summary': `  • Net: ${formatNumberWithComma(hqData.totalNet)}`
  //       });
  //       summaryData.push({
  //         'Summary': `  • Staff Count: ${hqData.staffCount}`
  //       });
  //       summaryData.push({ 'Summary': '' });

  //       hqData.departments.forEach(deptData => {
  //         summaryData.push({
  //           'Summary': `    └─ ${deptData.department}:`
  //         });
  //         summaryData.push({
  //           'Summary': `       • Gross: ${formatNumberWithComma(deptData.totalGross)}`
  //         });
  //         summaryData.push({
  //           'Summary': `       • Deduction: ${formatNumberWithComma(deptData.totalDeduction)}`
  //         });
  //         summaryData.push({
  //           'Summary': `       • Net: ${formatNumberWithComma(deptData.totalNet)}`
  //         });
  //         summaryData.push({
  //           'Summary': `       • Staff: ${deptData.staffCount}`
  //         });
  //       });
  //       summaryData.push({ 'Summary': '' });
  //     });

  //     // Grand totals
  //     summaryData.push({ 'Summary': 'GRAND TOTALS:' });
  //     summaryData.push({ 'Summary': `Grand Gross Total: ${formatNumberWithComma(grandTotalGross)}` });
  //     summaryData.push({ 'Summary': `Grand Deduction Total: ${formatNumberWithComma(grandTotalDeduction)}` });
  //     summaryData.push({ 'Summary': `Grand Net Total: ${formatNumberWithComma(overallTotal)}` });
  //     summaryData.push({ 'Summary': `Total Staff Count: ${totalStaffCount}` });

  //     // Create summary worksheet
  //     const summaryWs = XLSX.utils.json_to_sheet(summaryData);

  //     // Style summary worksheet
  //     if (summaryWs['!ref']) {
  //       const range = XLSX.utils.decode_range(summaryWs['!ref']);
  //       for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
  //         const cellRef = XLSX.utils.encode_cell({ r: rowNum, c: 0 });
  //         const cell = summaryWs[cellRef];

  //         if (cell && cell.v) {
  //           const cellValue = String(cell.v);

  //           if (cellValue.includes('SUMMARY') || cellValue.includes('GRAND TOTALS:')) {
  //             if (!cell.s) cell.s = {};
  //             cell.s.font = { bold: true, size: 14 };
  //             cell.s.fill = { fgColor: { rgb: "4F81BD" } };
  //           } else if (cellValue.includes('BREAKDOWN') || cellValue.includes('Grand ')) {
  //             if (!cell.s) cell.s = {};
  //             cell.s.font = { bold: true };
  //             cell.s.fill = { fgColor: { rgb: "90EE90" } };
  //           } else if (!cellValue.includes('└─') && !cellValue.includes('•') && cellValue.includes(':') && !cellValue.includes('Grand')) {
  //             if (!cell.s) cell.s = {};
  //             cell.s.font = { bold: true };
  //             cell.s.fill = { fgColor: { rgb: "FFFFE0" } };
  //           }
  //         }
  //       }

  //       // Auto-size the summary column
  //       summaryWs['!cols'] = [{ wch: 80 }];
  //     }

  //     // Add summary as first worksheet
  //     XLSX.utils.book_append_sheet(wb, summaryWs, "Summary", 0);

  //     // Generate file name with timestamp
  //     const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
  //     const fileName = `${title}_${timestamp}.xlsx`;

  //     // Save file
  //     XLSX.writeFile(wb, fileName);

  //     console.log("Excel export completed successfully - proper headquarter grouping with all totals included");
  //   } catch (error) {
  //     console.error("Excel export failed:", error);
  //     alert("Excel export failed. Please check the console for details.");
  //   }
  // };

  // v5
  // Fixed Excel export function - each department is completely independent
  // v6 - Updated Excel export with proper headquarter grouping and all totals
  // const exportToExcel = (processedData, totalStaffCount, overallTotal, title) => {
  //   try {
  //     const XLSX = XLS;
  //     const wb = XLSX.utils.book_new();

  //     // Create separate worksheet for each department
  //     processedData.forEach((hqData, hqIndex) => {
  //       hqData.departments.forEach((deptData, deptIndex) => {
  //         // Create independent data array for this specific department
  //         const departmentExcelData = [];

  //         // Get headers specific to THIS department only
  //         const deptSpecificHeaders = new Set();
  //         deptData.records.forEach(record => {
  //           Object.keys(record).forEach(key => {
  //             deptSpecificHeaders.add(key);
  //           });
  //         });

  //         // Convert to array and sort with priority order for THIS department
  //         const priorityOrder = ['S/N', 'Name', 'Empno', 'Grade', 'Step'];
  //         const sortedHeaders = Array.from(deptSpecificHeaders).sort((a, b) => {
  //           const aIndex = priorityOrder.indexOf(a);
  //           const bIndex = priorityOrder.indexOf(b);

  //           if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
  //           if (aIndex !== -1) return -1;
  //           if (bIndex !== -1) return 1;
  //           return a.localeCompare(b);
  //         });

  //         // Add headquarter title row
  //         const hqTitleRow = {};
  //         sortedHeaders.forEach((header, index) => {
  //           if (index === 0) {
  //             hqTitleRow[header] = `HEADQUARTER: ${hqData.headquarter}`;
  //           } else {
  //             hqTitleRow[header] = '';
  //           }
  //         });
  //         departmentExcelData.push(hqTitleRow);

  //         // Add department title row
  //         const deptTitleRow = {};
  //         sortedHeaders.forEach((header, index) => {
  //           if (index === 0) {
  //             deptTitleRow[header] = `DEPARTMENT: ${deptData.department} (${deptData.staffCount} staff)`;
  //           } else {
  //             deptTitleRow[header] = '';
  //           }
  //         });
  //         departmentExcelData.push(deptTitleRow);

  //         // Add column headers row with proper display names
  //         const columnHeaderRow = {};
  //         sortedHeaders.forEach(header => {
  //           let displayHeader = header;
  //           if (header === 'S/N') {
  //             displayHeader = 'S/N';
  //           } else if (header === 'Name' || header === 'name') {
  //             displayHeader = 'NAME';
  //           } else if (header === 'Empno' || header === 'empno' || header === 'EMPNO') {
  //             displayHeader = 'EMPNO';
  //           } else if (header === 'Grd' || header === 'Grade') {
  //             displayHeader = 'GRADE';
  //           } else if (header === 'Stp' || header === 'Step') {
  //             displayHeader = 'STEP';
  //           } else {
  //             displayHeader = header.replaceAll("_", " ").toUpperCase();
  //           }
  //           columnHeaderRow[header] = displayHeader;
  //         });
  //         departmentExcelData.push(columnHeaderRow);

  //         // Add data rows for this department (only fields that exist in this department)
  //         deptData.records.forEach(record => {
  //           const dataRow = {};
  //           sortedHeaders.forEach(header => {
  //             // Get value from record, handling different key variations
  //             let value = record[header];

  //             // If direct key doesn't exist, try common variations
  //             if (value === undefined || value === null) {
  //               const lowerHeader = header.toLowerCase();
  //               const recordKeys = Object.keys(record);

  //               const matchingKey = recordKeys.find(key =>
  //                 key.toLowerCase() === lowerHeader
  //               );

  //               if (matchingKey) {
  //                 value = record[matchingKey];
  //               }
  //             }

  //             // Set final value - only include if it actually exists in this record
  //             dataRow[header] = value !== undefined && value !== null ? value : '';
  //           });

  //           departmentExcelData.push(dataRow);
  //         });

  //         // Add department total row
  //         const deptTotalRow = {};
  //         sortedHeaders.forEach((header, index) => {
  //           if (index === 0) {
  //             deptTotalRow[header] = `DEPARTMENT NET TOTAL: ${formatNumberWithComma(deptData.totalNet)}`;
  //           } else {
  //             deptTotalRow[header] = '';
  //           }
  //         });
  //         departmentExcelData.push(deptTotalRow);

  //         // Add headquarter total row
  //         const hqTotalRow = {};
  //         sortedHeaders.forEach((header, index) => {
  //           if (index === 0) {
  //             hqTotalRow[header] = `HEADQUARTER NET TOTAL: ${formatNumberWithComma(hqData.totalNet)}`;
  //           } else {
  //             hqTotalRow[header] = '';
  //           }
  //         });
  //         departmentExcelData.push(hqTotalRow);

  //         // Create worksheet for this department
  //         const ws = XLSX.utils.json_to_sheet(departmentExcelData);

  //         // Auto-size columns based on content
  //         if (ws['!ref']) {
  //           const range = XLSX.utils.decode_range(ws['!ref']);
  //           const columnWidths = [];

  //           for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
  //             let maxWidth = 10;

  //             for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
  //               const cellRef = XLSX.utils.encode_cell({ r: rowNum, c: colNum });
  //               const cell = ws[cellRef];

  //               if (cell && cell.v) {
  //                 const cellValue = String(cell.v);
  //                 maxWidth = Math.max(maxWidth, cellValue.length);
  //               }
  //             }

  //             columnWidths.push({ wch: Math.min(maxWidth + 2, 50) });
  //           }

  //           ws['!cols'] = columnWidths;
  //         }

  //         // Add styling to header rows
  //         if (ws['!ref']) {
  //           const range = XLSX.utils.decode_range(ws['!ref']);
  //           for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
  //             for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
  //               const cellRef = XLSX.utils.encode_cell({ r: rowNum, c: colNum });
  //               const cell = ws[cellRef];

  //               if (cell && cell.v) {
  //                 const cellValue = String(cell.v);

  //                 // Style header rows
  //                 if (cellValue.startsWith('HEADQUARTER:')) {
  //                   if (!cell.s) cell.s = {};
  //                   cell.s.font = { bold: true };
  //                   cell.s.fill = { fgColor: { rgb: "E0E0E0" } };
  //                 } else if (cellValue.startsWith('DEPARTMENT:')) {
  //                   if (!cell.s) cell.s = {};
  //                   cell.s.font = { bold: true };
  //                   cell.s.fill = { fgColor: { rgb: "F5F5F5" } };
  //                 } else if (cellValue.startsWith('DEPARTMENT TOTAL:')) {
  //                   if (!cell.s) cell.s = {};
  //                   cell.s.font = { bold: true };
  //                   cell.s.fill = { fgColor: { rgb: "FFFFE0" } };
  //                 } else if (cellValue.startsWith('HEADQUARTER TOTAL:')) {
  //                   if (!cell.s) cell.s = {};
  //                   cell.s.font = { bold: true };
  //                   cell.s.fill = { fgColor: { rgb: "ADD8E6" } };
  //                 }

  //                 // Style column headers (the row with display names)
  //                 if (cellValue.match(/^(S\/N|NAME|EMPNO|GRADE|STEP|[A-Z_\s]+)$/) &&
  //                     cellValue.length < 30 &&
  //                     !cellValue.includes('TOTAL') &&
  //                     !cellValue.includes('HEADQUARTER') &&
  //                     !cellValue.includes('DEPARTMENT')) {
  //                   if (!cell.s) cell.s = {};
  //                   cell.s.font = { bold: true };
  //                   cell.s.fill = { fgColor: { rgb: "D3D3D3" } };
  //                 }
  //               }
  //             }
  //           }
  //         }

  //         // Create worksheet name (limit to 31 characters for Excel compatibility)
  //         const cleanHQ = hqData.headquarter.replace(/[^\w\s]/g, '').substring(0, 15);
  //         const cleanDept = deptData.department.replace(/[^\w\s]/g, '').substring(0, 15);
  //         const worksheetName = `${cleanHQ}-${cleanDept}`.substring(0, 31);

  //         // Add worksheet to workbook
  //         XLSX.utils.book_append_sheet(wb, ws, worksheetName);
  //       });
  //     });

  //     // Create a summary worksheet with grand totals
  //     const summaryData = [];

  //     // Summary title
  //     summaryData.push({ 'Summary': 'PAYROLL REPORT SUMMARY' });
  //     summaryData.push({ 'Summary': '' });

  //     // Add summary by headquarters
  //     summaryData.push({ 'Summary': 'BREAKDOWN BY HEADQUARTERS:' });
  //     processedData.forEach(hqData => {
  //       summaryData.push({
  //         'Summary': `${hqData.headquarter}: ${formatNumberWithComma(hqData.totalNet)} (${hqData.staffCount} staff)`
  //       });

  //       hqData.departments.forEach(deptData => {
  //         summaryData.push({
  //           'Summary': `  └─ ${deptData.department}: ${formatNumberWithComma(deptData.totalNet)} (${deptData.staffCount} staff)`
  //         });
  //       });
  //       summaryData.push({ 'Summary': '' });
  //     });

  //     // Grand totals
  //     summaryData.push({ 'Summary': `GRAND NET TOTAL: ${formatNumberWithComma(overallTotal)}` });
  //     summaryData.push({ 'Summary': `TOTAL STAFF COUNT: ${totalStaffCount}` });

  //     // Create summary worksheet
  //     const summaryWs = XLSX.utils.json_to_sheet(summaryData);

  //     // Style summary worksheet
  //     if (summaryWs['!ref']) {
  //       const range = XLSX.utils.decode_range(summaryWs['!ref']);
  //       for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
  //         const cellRef = XLSX.utils.encode_cell({ r: rowNum, c: 0 });
  //         const cell = summaryWs[cellRef];

  //         if (cell && cell.v) {
  //           const cellValue = String(cell.v);

  //           if (cellValue.includes('SUMMARY') || cellValue.includes('GRAND NET TOTAL') || cellValue.includes('TOTAL STAFF COUNT')) {
  //             if (!cell.s) cell.s = {};
  //             cell.s.font = { bold: true, size: 14 };
  //             cell.s.fill = { fgColor: { rgb: "90EE90" } };
  //           } else if (cellValue.includes('BREAKDOWN')) {
  //             if (!cell.s) cell.s = {};
  //             cell.s.font = { bold: true };
  //             cell.s.fill = { fgColor: { rgb: "FFFFE0" } };
  //           }
  //         }
  //       }

  //       // Auto-size the summary column
  //       summaryWs['!cols'] = [{ wch: 80 }];
  //     }

  //     // Add summary as first worksheet
  //     XLSX.utils.book_append_sheet(wb, summaryWs, "Summary", 0);

  //     // Generate file name with timestamp
  //     const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
  //     const fileName = `${title}${timestamp}.xlsx`;

  //     // Save file
  //     XLSX.writeFile(wb, fileName);

  //     console.log("Excel export completed successfully - each department is independent with no empty columns");
  //   } catch (error) {
  //     console.error("Excel export failed:", error);
  //     alert("Excel export failed. Please check the console for details.");
  //   }
  // };

  // v4
  // Fixed Excel export function with independent department structures
  // const exportToExcel = (processedData, totalStaffCount, overallTotal) => {
  //   try {
  //     // Create workbook and worksheet
  //     const XLSX = XLS;
  //     const wb = XLSX.utils.book_new();

  //     // Prepare data for Excel - each department is completely independent
  //     const excelData = [];

  //     processedData.forEach((hqData, hqIndex) => {
  //       hqData.departments.forEach((deptData, deptIndex) => {
  //         // Get headers specific to THIS department only
  //         const thisDeptHeaders = new Set();
  //         deptData.records.forEach(record => {
  //           Object.keys(record).forEach(key => {
  //             thisDeptHeaders.add(key);
  //           });
  //         });

  //         // Convert to array and sort with priority order for THIS department
  //         const priorityOrder = ['S/N', 'Name', 'Empno', 'Grd', 'Stp'];
  //         const thisDeptSortedHeaders = Array.from(thisDeptHeaders).sort((a, b) => {
  //           const aIndex = priorityOrder.indexOf(a);
  //           const bIndex = priorityOrder.indexOf(b);

  //           if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
  //           if (aIndex !== -1) return -1;
  //           if (bIndex !== -1) return 1;
  //           return a.localeCompare(b);
  //         });

  //         // Add headquarter header row (spans only this department's columns)
  //         const hqHeaderRow = {};
  //         thisDeptSortedHeaders.forEach((header, index) => {
  //           if (index === 0) {
  //             hqHeaderRow[header] = `HEADQUARTER: ${hqData.headquarter}`;
  //           } else {
  //             hqHeaderRow[header] = '';
  //           }
  //         });
  //         excelData.push(hqHeaderRow);

  //         // Add department header row (spans only this department's columns)
  //         const deptHeaderRow = {};
  //         thisDeptSortedHeaders.forEach((header, index) => {
  //           if (index === 0) {
  //             deptHeaderRow[header] = `DEPARTMENT: ${deptData.department} (${deptData.staffCount} staff)`;
  //           } else {
  //             deptHeaderRow[header] = '';
  //           }
  //         });
  //         excelData.push(deptHeaderRow);

  //         // Add column headers row (only for this department's columns)
  //         const columnHeaderRow = {};
  //         thisDeptSortedHeaders.forEach(header => {
  //           // Format header names for display
  //           let displayHeader = header;
  //           if (header === 'S/N') {
  //             displayHeader = 'S/N';
  //           } else if (header === 'Name' || header === 'name') {
  //             displayHeader = 'NAME';
  //           } else if (header === 'Empno' || header === 'empno' || header === 'EMPNO') {
  //             displayHeader = 'EMPNO';
  //           } else if (header === 'Grd') {
  //             displayHeader = 'GRADE';
  //           } else if (header === 'Stp') {
  //             displayHeader = 'STEP';
  //           } else {
  //             displayHeader = header.replaceAll("_", " ").toUpperCase();
  //           }
  //           columnHeaderRow[header] = displayHeader;
  //         });
  //         excelData.push(columnHeaderRow);

  //         // Add data rows for this department (only using this department's headers)
  //         deptData.records.forEach(record => {
  //           const dataRow = {};
  //           thisDeptSortedHeaders.forEach(header => {
  //             // Get value directly from record using exact key match
  //             let value = record[header];

  //             // If value doesn't exist, set as N/A
  //             if (value === undefined || value === null) {
  //               value = 'N/A';
  //             }

  //             dataRow[header] = value;
  //           });

  //           excelData.push(dataRow);
  //         });

  //         // Add department total row (spans only this department's columns)
  //         const deptTotalRow = {};
  //         thisDeptSortedHeaders.forEach((header, index) => {
  //           if (index === 0) {
  //             deptTotalRow[header] = `DEPARTMENT TOTAL: ${formatNumberWithComma(deptData.totalNet)}`;
  //           } else {
  //             deptTotalRow[header] = '';
  //           }
  //         });
  //         excelData.push(deptTotalRow);

  //         // Add empty row for separation (spans only this department's columns)
  //         const emptyRow = {};
  //         thisDeptSortedHeaders.forEach(header => {
  //           emptyRow[header] = '';
  //         });
  //         excelData.push(emptyRow);
  //       });

  //       // Add headquarter total row (use first department's headers for consistency within HQ)
  //       if (hqData.departments.length > 0) {
  //         const firstDeptHeaders = new Set();
  //         hqData.departments[0].records.forEach(record => {
  //           Object.keys(record).forEach(key => {
  //             firstDeptHeaders.add(key);
  //           });
  //         });

  //         const priorityOrder = ['S/N', 'Name', 'Empno', 'Grd', 'Stp'];
  //         const hqTotalHeaders = Array.from(firstDeptHeaders).sort((a, b) => {
  //           const aIndex = priorityOrder.indexOf(a);
  //           const bIndex = priorityOrder.indexOf(b);

  //           if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
  //           if (aIndex !== -1) return -1;
  //           if (bIndex !== -1) return 1;
  //           return a.localeCompare(b);
  //         });

  //         const hqTotalRow = {};
  //         hqTotalHeaders.forEach((header, index) => {
  //           if (index === 0) {
  //             hqTotalRow[header] = `HEADQUARTER TOTAL: ${formatNumberWithComma(hqData.totalNet)}`;
  //           } else {
  //             hqTotalRow[header] = '';
  //           }
  //         });
  //         excelData.push(hqTotalRow);

  //         // Add empty row for separation between headquarters
  //         const separatorRow = {};
  //         hqTotalHeaders.forEach(header => {
  //           separatorRow[header] = '';
  //         });
  //         excelData.push(separatorRow);
  //       }
  //     });

  //     // Add grand totals (use the most comprehensive header set from any department)
  //     let grandTotalHeaders = [];
  //     if (processedData.length > 0 && processedData[0].departments.length > 0) {
  //       const comprehensiveHeaders = new Set();
  //       processedData[0].departments[0].records.forEach(record => {
  //         Object.keys(record).forEach(key => {
  //           comprehensiveHeaders.add(key);
  //         });
  //       });

  //       const priorityOrder = ['S/N', 'Name', 'Empno', 'Grd', 'Stp'];
  //       grandTotalHeaders = Array.from(comprehensiveHeaders).sort((a, b) => {
  //         const aIndex = priorityOrder.indexOf(a);
  //         const bIndex = priorityOrder.indexOf(b);

  //         if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
  //         if (aIndex !== -1) return -1;
  //         if (bIndex !== -1) return 1;
  //         return a.localeCompare(b);
  //       });
  //     }

  //     // Add grand totals
  //     if (grandTotalHeaders.length > 0) {
  //       const grandTotalRow = {};
  //       grandTotalHeaders.forEach((header, index) => {
  //         if (index === 0) {
  //           grandTotalRow[header] = `GRAND TOTAL: ${formatNumberWithComma(overallTotal)}`;
  //         } else {
  //           grandTotalRow[header] = '';
  //         }
  //       });
  //       excelData.push(grandTotalRow);

  //       const totalStaffRow = {};
  //       grandTotalHeaders.forEach((header, index) => {
  //         if (index === 0) {
  //           totalStaffRow[header] = `TOTAL STAFF COUNT: ${totalStaffCount}`;
  //         } else {
  //           totalStaffRow[header] = '';
  //         }
  //       });
  //       excelData.push(totalStaffRow);
  //     }

  //     // Create worksheet - DON'T include headers automatically
  //     const ws = XLSX.utils.json_to_sheet(excelData, {
  //       skipHeader: true // This prevents the automatic header row
  //     });

  //     // Auto-size columns based on content
  //     if (ws['!ref']) {
  //       const range = XLSX.utils.decode_range(ws['!ref']);
  //       const columnWidths = [];

  //       for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
  //         let maxWidth = 10; // minimum width

  //         for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
  //           const cellRef = XLSX.utils.encode_cell({ r: rowNum, c: colNum });
  //           const cell = ws[cellRef];

  //           if (cell && cell.v) {
  //             const cellValue = String(cell.v);
  //             maxWidth = Math.max(maxWidth, cellValue.length);
  //           }
  //         }

  //         columnWidths.push({ wch: Math.min(maxWidth + 2, 50) });
  //       }

  //       ws['!cols'] = columnWidths;
  //     }

  //     // Add styling to important rows
  //     if (ws['!ref']) {
  //       const range = XLSX.utils.decode_range(ws['!ref']);
  //       for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
  //         for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
  //           const cellRef = XLSX.utils.encode_cell({ r: rowNum, c: colNum });
  //           const cell = ws[cellRef];

  //           if (cell && cell.v) {
  //             const cellValue = String(cell.v);

  //             // Style header rows
  //             if (cellValue.startsWith('HEADQUARTER:') ||
  //                 cellValue.startsWith('DEPARTMENT:') ||
  //                 cellValue.startsWith('GRAND TOTAL:') ||
  //                 cellValue.startsWith('TOTAL STAFF COUNT:') ||
  //                 cellValue.startsWith('HEADQUARTER TOTAL:') ||
  //                 cellValue.startsWith('DEPARTMENT TOTAL:')) {

  //               if (!cell.s) cell.s = {};
  //               cell.s.font = { bold: true };

  //               if (cellValue.startsWith('HEADQUARTER:')) {
  //                 cell.s.fill = { fgColor: { rgb: "E0E0E0" } };
  //               } else if (cellValue.startsWith('DEPARTMENT:')) {
  //                 cell.s.fill = { fgColor: { rgb: "F5F5F5" } };
  //               } else if (cellValue.startsWith('GRAND TOTAL:') || cellValue.startsWith('TOTAL STAFF COUNT:')) {
  //                 cell.s.fill = { fgColor: { rgb: "90EE90" } }; // Light green
  //               } else if (cellValue.startsWith('HEADQUARTER TOTAL:')) {
  //                 cell.s.fill = { fgColor: { rgb: "ADD8E6" } }; // Light blue
  //               } else if (cellValue.startsWith('DEPARTMENT TOTAL:')) {
  //                 cell.s.fill = { fgColor: { rgb: "FFFFE0" } }; // Light yellow
  //               }
  //             }

  //             // Style column headers (the actual column names like S/N, NAME, etc.)
  //             if (cellValue.match(/^(S\/N|NAME|EMPNO|GRADE|STEP|[A-Z_\s]+)$/) &&
  //                 cellValue.length < 30 &&
  //                 !cellValue.includes('TOTAL') &&
  //                 !cellValue.includes('HEADQUARTER') &&
  //                 !cellValue.includes('DEPARTMENT')) {
  //               if (!cell.s) cell.s = {};
  //               cell.s.font = { bold: true };
  //               cell.s.fill = { fgColor: { rgb: "D3D3D3" } }; // Light gray
  //             }
  //           }
  //         }
  //       }
  //     }

  //     // Add worksheet to workbook
  //     XLSX.utils.book_append_sheet(wb, ws, "Complex Payroll Report");

  //     // Generate file name with timestamp
  //     const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
  //     const fileName = `Complex_Payroll_Report_${timestamp}.xlsx`;

  //     // Save file
  //     XLSX.writeFile(wb, fileName);

  //     console.log("Excel export completed successfully with independent department structures");
  //   } catch (error) {
  //     console.error("Excel export failed:", error);
  //     alert("Excel export failed. Please check the console for details.");
  //   }
  // };

  // v3 work
  // Updated Excel export function with department-specific headers
  // const exportToExcel = (processedData, totalStaffCount, overallTotal) => {
  //   try {
  //     // Create workbook and worksheet
  //     const XLSX = XLS;
  //     const wb = XLSX.utils.book_new();

  //     // Prepare data for Excel
  //     const excelData = [];

  //     processedData.forEach(hqData => {
  //       hqData.departments.forEach(deptData => {
  //         // Get department-specific headers from the current department's records
  //         const deptHeaders = new Set();
  //         deptData.records.forEach(record => {
  //           Object.keys(record).forEach(key => {
  //             deptHeaders.add(key);
  //           });
  //         });

  //         // Convert to array and sort with priority order
  //         const priorityOrder = ['S/N', 'Name', 'Empno', 'Grade', 'Step'];
  //         const sortedDeptHeaders = Array.from(deptHeaders).sort((a, b) => {
  //           const aIndex = priorityOrder.indexOf(a);
  //           const bIndex = priorityOrder.indexOf(b);

  //           if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
  //           if (aIndex !== -1) return -1;
  //           if (bIndex !== -1) return 1;
  //           return a.localeCompare(b);
  //         });

  //         // Add headquarter header row
  //         const hqHeaderRow = {};
  //         sortedDeptHeaders.forEach((header, index) => {
  //           if (index === 0) {
  //             hqHeaderRow[header] = `HEADQUARTER: ${hqData.headquarter}`;
  //           } else {
  //             hqHeaderRow[header] = '';
  //           }
  //         });
  //         excelData.push(hqHeaderRow);

  //         // Add department header row
  //         const deptHeaderRow = {};
  //         sortedDeptHeaders.forEach((header, index) => {
  //           if (index === 0) {
  //             deptHeaderRow[header] = `DEPARTMENT: ${deptData.department} (${deptData.staffCount} staff)`;
  //           } else {
  //             deptHeaderRow[header] = '';
  //           }
  //         });
  //         excelData.push(deptHeaderRow);

  //         // Add column headers row
  //         const columnHeaderRow = {};
  //         sortedDeptHeaders.forEach(header => {
  //           // Format header names for display
  //           let displayHeader = header;
  //           if (header === 'S/N') {
  //             displayHeader = 'S/N';
  //           } else if (header === 'Name' || header === 'name') {
  //             displayHeader = 'NAME';
  //           } else if (header === 'Empno' || header === 'empno' || header === 'EMPNO') {
  //             displayHeader = 'EMPNO';
  //           } else if (header === 'Grade' || header === 'Grd') {
  //             displayHeader = 'GRADE';
  //           } else if (header === 'Step' || header === 'Stp') {
  //             displayHeader = 'STEP';
  //           } else {
  //             displayHeader = header.replaceAll("_", " ").toUpperCase();
  //           }
  //           columnHeaderRow[header] = displayHeader;
  //         });
  //         excelData.push(columnHeaderRow);

  //         // Add data rows for this department
  //         deptData.records.forEach(record => {
  //           const dataRow = {};
  //           sortedDeptHeaders.forEach(header => {
  //             // Handle different possible key variations
  //             let value = record[header];

  //             // Handle Grade/Step mapping
  //             if (header === 'Grade' && value === undefined) {
  //               value = record['Grd'];
  //             }
  //             if (header === 'Step' && value === undefined) {
  //               value = record['Stp'];
  //             }

  //             // If direct key doesn't exist, try common variations
  //             if (value === undefined || value === null) {
  //               const lowerHeader = header.toLowerCase();
  //               const recordKeys = Object.keys(record);

  //               // Find matching key with case-insensitive search
  //               const matchingKey = recordKeys.find(key =>
  //                 key.toLowerCase() === lowerHeader
  //               );

  //               if (matchingKey) {
  //                 value = record[matchingKey];
  //               }
  //             }

  //             // Set final value
  //             dataRow[header] = value !== undefined && value !== null ? value : 'N/A';
  //           });

  //           excelData.push(dataRow);
  //         });

  //         // Add department total row
  //         const deptTotalRow = {};
  //         sortedDeptHeaders.forEach((header, index) => {
  //           if (index === 0) {
  //             deptTotalRow[header] = `DEPARTMENT TOTAL: ${formatNumberWithComma(deptData.totalNet)}`;
  //           } else {
  //             deptTotalRow[header] = '';
  //           }
  //         });
  //         excelData.push(deptTotalRow);

  //         // Add empty row for separation
  //         const emptyRow = {};
  //         sortedDeptHeaders.forEach(header => {
  //           emptyRow[header] = '';
  //         });
  //         excelData.push(emptyRow);
  //       });

  //       // For HQ totals, use the first department's headers for consistency
  //       const firstDeptHeaders = (() => {
  //         const headers = new Set();
  //         if (hqData.departments[0]) {
  //           hqData.departments[0].records.forEach(record => {
  //             Object.keys(record).forEach(key => {
  //               headers.add(key);
  //             });
  //           });
  //         }
  //         const priorityOrder = ['S/N', 'Name', 'Empno', 'Grade', 'Step'];
  //         return Array.from(headers).sort((a, b) => {
  //           const aIndex = priorityOrder.indexOf(a);
  //           const bIndex = priorityOrder.indexOf(b);

  //           if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
  //           if (aIndex !== -1) return -1;
  //           if (bIndex !== -1) return 1;
  //           return a.localeCompare(b);
  //         });
  //       })();

  //       // Add headquarter total row
  //       const hqTotalRow = {};
  //       firstDeptHeaders.forEach((header, index) => {
  //         if (index === 0) {
  //           hqTotalRow[header] = `HEADQUARTER TOTAL: ${formatNumberWithComma(hqData.totalNet)}`;
  //         } else {
  //           hqTotalRow[header] = '';
  //         }
  //       });
  //       excelData.push(hqTotalRow);

  //       // Add empty row for separation between headquarters
  //       const separatorRow = {};
  //       firstDeptHeaders.forEach(header => {
  //         separatorRow[header] = '';
  //       });
  //       excelData.push(separatorRow);
  //     });

  //     // For grand totals, use the first department's headers for consistency
  //     const grandTotalHeaders = (() => {
  //       const headers = new Set();
  //       if (processedData[0]?.departments[0]) {
  //         processedData[0].departments[0].records.forEach(record => {
  //           Object.keys(record).forEach(key => {
  //             headers.add(key);
  //           });
  //         });
  //       }
  //       const priorityOrder = ['S/N', 'Name', 'Empno', 'Grade', 'Step'];
  //       return Array.from(headers).sort((a, b) => {
  //         const aIndex = priorityOrder.indexOf(a);
  //         const bIndex = priorityOrder.indexOf(b);

  //         if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
  //         if (aIndex !== -1) return -1;
  //         if (bIndex !== -1) return 1;
  //         return a.localeCompare(b);
  //       });
  //     })();

  //     // Add grand totals
  //     const grandTotalRow = {};
  //     grandTotalHeaders.forEach((header, index) => {
  //       if (index === 0) {
  //         grandTotalRow[header] = `GRAND TOTAL: ${formatNumberWithComma(overallTotal)}`;
  //       } else {
  //         grandTotalRow[header] = '';
  //       }
  //     });
  //     excelData.push(grandTotalRow);

  //     const totalStaffRow = {};
  //     grandTotalHeaders.forEach((header, index) => {
  //       if (index === 0) {
  //         totalStaffRow[header] = `TOTAL STAFF COUNT: ${totalStaffCount}`;
  //       } else {
  //         totalStaffRow[header] = '';
  //       }
  //     });
  //     excelData.push(totalStaffRow);

  //     // Create worksheet with all the data
  //     const ws = XLSX.utils.json_to_sheet(excelData);

  //     // Auto-size columns based on content
  //     if (ws['!ref']) {
  //       const range = XLSX.utils.decode_range(ws['!ref']);
  //       const columnWidths = [];

  //       for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
  //         let maxWidth = 10; // minimum width

  //         for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
  //           const cellRef = XLSX.utils.encode_cell({ r: rowNum, c: colNum });
  //           const cell = ws[cellRef];

  //           if (cell && cell.v) {
  //             const cellValue = String(cell.v);
  //             maxWidth = Math.max(maxWidth, cellValue.length);
  //           }
  //         }

  //         columnWidths.push({ wch: Math.min(maxWidth + 2, 50) });
  //       }

  //       ws['!cols'] = columnWidths;
  //     }

  //     // Add some styling to header rows (if XLSX supports it)
  //     if (ws['!ref']) {
  //       const range = XLSX.utils.decode_range(ws['!ref']);
  //       for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
  //         for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
  //           const cellRef = XLSX.utils.encode_cell({ r: rowNum, c: colNum });
  //           const cell = ws[cellRef];

  //           if (cell && cell.v) {
  //             const cellValue = String(cell.v);

  //             // Style header rows
  //             if (cellValue.startsWith('HEADQUARTER:') ||
  //                 cellValue.startsWith('DEPARTMENT:') ||
  //                 cellValue.startsWith('GRAND TOTAL:') ||
  //                 cellValue.startsWith('TOTAL STAFF COUNT:') ||
  //                 cellValue.startsWith('HEADQUARTER TOTAL:') ||
  //                 cellValue.startsWith('DEPARTMENT TOTAL:')) {

  //               if (!cell.s) cell.s = {};
  //               cell.s.font = { bold: true };

  //               if (cellValue.startsWith('HEADQUARTER:')) {
  //                 cell.s.fill = { fgColor: { rgb: "E0E0E0" } };
  //               } else if (cellValue.startsWith('DEPARTMENT:')) {
  //                 cell.s.fill = { fgColor: { rgb: "F5F5F5" } };
  //               } else if (cellValue.startsWith('GRAND TOTAL:') || cellValue.startsWith('TOTAL STAFF COUNT:')) {
  //                 cell.s.fill = { fgColor: { rgb: "90EE90" } }; // Light green
  //               } else if (cellValue.startsWith('HEADQUARTER TOTAL:')) {
  //                 cell.s.fill = { fgColor: { rgb: "ADD8E6" } }; // Light blue
  //               } else if (cellValue.startsWith('DEPARTMENT TOTAL:')) {
  //                 cell.s.fill = { fgColor: { rgb: "FFFFE0" } }; // Light yellow
  //               }
  //             }

  //             // Style column headers
  //             if (cellValue.match(/^(S\/N|NAME|EMPNO|GRADE|STEP|[A-Z_\s]+)$/) &&
  //                 cellValue.length < 30 &&
  //                 !cellValue.includes('TOTAL') &&
  //                 !cellValue.includes('HEADQUARTER') &&
  //                 !cellValue.includes('DEPARTMENT')) {
  //               if (!cell.s) cell.s = {};
  //               cell.s.font = { bold: true };
  //               cell.s.fill = { fgColor: { rgb: "D3D3D3" } }; // Light gray
  //             }
  //           }
  //         }
  //       }
  //     }

  //     // Add worksheet to workbook
  //     XLSX.utils.book_append_sheet(wb, ws, "Complex Payroll Report");

  //     // Generate file name with timestamp
  //     const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
  //     const fileName = `Complex_Payroll_Report_${timestamp}.xlsx`;

  //     // Save file
  //     XLSX.writeFile(wb, fileName);

  //     console.log("Excel export completed successfully with dynamic headers");
  //   } catch (error) {
  //     console.error("Excel export failed:", error);
  //     alert("Excel export failed. Please check the console for details.");
  //   }
  // };

  // v2
  // Updated Excel export function with dynamic headers and no fixed columns
  // const exportToExcel = (processedData, totalStaffCount, overallTotal) => {
  //   try {
  //     // Create workbook and worksheet
  //     const XLSX = XLS;
  //     const wb = XLSX.utils.book_new();

  //     // Prepare data for Excel
  //     const excelData = [];

  //     // Get all unique headers across all departments for consistent column structure
  //     const allHeaders = new Set();
  //     processedData.forEach(hqData => {
  //       hqData.departments.forEach(deptData => {
  //         // Add all record keys as headers (including fixed ones like S/N, Name, etc.)
  //         deptData.records.forEach(record => {
  //           Object.keys(record).forEach(key => {
  //             allHeaders.add(key);
  //           });
  //         });
  //         // Also add any headers that might be in the department headers array
  //         deptData.headers.forEach(header => {
  //           allHeaders.add(header);
  //         });
  //       });
  //     });

  //     // Convert to array and sort for consistent ordering
  //     const sortedHeaders = Array.from(allHeaders).sort((a, b) => {
  //       // Prioritize certain columns to appear first
  //       const priorityOrder = ['S/N', 'Name', 'Empno', 'Grd', 'Stp'];
  //       const aIndex = priorityOrder.indexOf(a);
  //       const bIndex = priorityOrder.indexOf(b);

  //       if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
  //       if (aIndex !== -1) return -1;
  //       if (bIndex !== -1) return 1;
  //       return a.localeCompare(b);
  //     });

  //     processedData.forEach(hqData => {
  //       hqData.departments.forEach(deptData => {
  //         // Add headquarter header row
  //         const hqHeaderRow = {};
  //         sortedHeaders.forEach((header, index) => {
  //           if (index === 0) {
  //             hqHeaderRow[header] = `HEADQUARTER: ${hqData.headquarter}`;
  //           } else {
  //             hqHeaderRow[header] = '';
  //           }
  //         });
  //         excelData.push(hqHeaderRow);

  //         // Add department header row
  //         const deptHeaderRow = {};
  //         sortedHeaders.forEach((header, index) => {
  //           if (index === 0) {
  //             deptHeaderRow[header] = `DEPARTMENT: ${deptData.department} (${deptData.staffCount} staff)`;
  //           } else {
  //             deptHeaderRow[header] = '';
  //           }
  //         });
  //         excelData.push(deptHeaderRow);

  //         // Add column headers row
  //         const columnHeaderRow = {};
  //         sortedHeaders.forEach(header => {
  //           // Format header names for display
  //           let displayHeader = header;
  //           if (header === 'S/N') {
  //             displayHeader = 'S/N';
  //           } else if (header === 'Name' || header === 'name') {
  //             displayHeader = 'NAME';
  //           } else if (header === 'Empno' || header === 'empno' || header === 'EMPNO') {
  //             displayHeader = 'EMPNO';
  //           } else {
  //             displayHeader = header.replaceAll("_", " ").toUpperCase();
  //           }
  //           columnHeaderRow[header] = displayHeader;
  //         });
  //         excelData.push(columnHeaderRow);

  //         // Add data rows for this department
  //         deptData.records.forEach(record => {
  //           const dataRow = {};
  //           sortedHeaders.forEach(header => {
  //             // Handle different possible key variations
  //             let value = record[header];

  //             // If direct key doesn't exist, try common variations
  //             if (value === undefined || value === null) {
  //               const lowerHeader = header.toLowerCase();
  //               const recordKeys = Object.keys(record);

  //               // Find matching key with case-insensitive search
  //               const matchingKey = recordKeys.find(key =>
  //                 key.toLowerCase() === lowerHeader
  //               );

  //               if (matchingKey) {
  //                 value = record[matchingKey];
  //               }
  //             }

  //             // Set final value
  //             dataRow[header] = value !== undefined && value !== null ? value : 'N/A';
  //           });

  //           excelData.push(dataRow);
  //         });

  //         // Add department total row
  //         const deptTotalRow = {};
  //         sortedHeaders.forEach((header, index) => {
  //           if (index === 0) {
  //             deptTotalRow[header] = `DEPARTMENT TOTAL: ${formatNumberWithComma(deptData.totalNet)}`;
  //           } else {
  //             deptTotalRow[header] = '';
  //           }
  //         });
  //         excelData.push(deptTotalRow);

  //         // Add empty row for separation
  //         const emptyRow = {};
  //         sortedHeaders.forEach(header => {
  //           emptyRow[header] = '';
  //         });
  //         excelData.push(emptyRow);
  //       });

  //       // Add headquarter total row
  //       const hqTotalRow = {};
  //       sortedHeaders.forEach((header, index) => {
  //         if (index === 0) {
  //           hqTotalRow[header] = `HEADQUARTER TOTAL: ${formatNumberWithComma(hqData.totalNet)}`;
  //         } else {
  //           hqTotalRow[header] = '';
  //         }
  //       });
  //       excelData.push(hqTotalRow);

  //       // Add empty row for separation between headquarters
  //       const separatorRow = {};
  //       sortedHeaders.forEach(header => {
  //         separatorRow[header] = '';
  //       });
  //       excelData.push(separatorRow);
  //     });

  //     // Add grand totals
  //     const grandTotalRow = {};
  //     sortedHeaders.forEach((header, index) => {
  //       if (index === 0) {
  //         grandTotalRow[header] = `GRAND TOTAL: ${formatNumberWithComma(overallTotal)}`;
  //       } else {
  //         grandTotalRow[header] = '';
  //       }
  //     });
  //     excelData.push(grandTotalRow);

  //     const totalStaffRow = {};
  //     sortedHeaders.forEach((header, index) => {
  //       if (index === 0) {
  //         totalStaffRow[header] = `TOTAL STAFF COUNT: ${totalStaffCount}`;
  //       } else {
  //         totalStaffRow[header] = '';
  //       }
  //     });
  //     excelData.push(totalStaffRow);

  //     // Create worksheet with all the data
  //     const ws = XLSX.utils.json_to_sheet(excelData, {
  //       header: sortedHeaders
  //     });

  //     // Auto-size columns based on content
  //     const columnWidths = sortedHeaders.map(header => {
  //       let maxWidth = header.length;

  //       excelData.forEach(row => {
  //         const cellValue = String(row[header] || '');
  //         maxWidth = Math.max(maxWidth, cellValue.length);
  //       });

  //       // Set minimum width and maximum width limits
  //       return {
  //         wch: Math.min(Math.max(maxWidth + 2, 10), 50)
  //       };
  //     });

  //     ws['!cols'] = columnWidths;

  //     // Add some styling to header rows (if XLSX supports it)
  //     const range = XLSX.utils.decode_range(ws['!ref']);
  //     for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
  //       for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
  //         const cellRef = XLSX.utils.encode_cell({ r: rowNum, c: colNum });
  //         const cell = ws[cellRef];

  //         if (cell && cell.v) {
  //           const cellValue = String(cell.v);

  //           // Style header rows
  //           if (cellValue.startsWith('HEADQUARTER:') ||
  //               cellValue.startsWith('DEPARTMENT:') ||
  //               cellValue.startsWith('GRAND TOTAL:') ||
  //               cellValue.startsWith('TOTAL STAFF COUNT:') ||
  //               cellValue.startsWith('HEADQUARTER TOTAL:') ||
  //               cellValue.startsWith('DEPARTMENT TOTAL:')) {

  //             if (!cell.s) cell.s = {};
  //             cell.s.font = { bold: true };

  //             if (cellValue.startsWith('HEADQUARTER:')) {
  //               cell.s.fill = { fgColor: { rgb: "E0E0E0" } };
  //             } else if (cellValue.startsWith('DEPARTMENT:')) {
  //               cell.s.fill = { fgColor: { rgb: "F5F5F5" } };
  //             } else if (cellValue.startsWith('GRAND TOTAL:') || cellValue.startsWith('TOTAL STAFF COUNT:')) {
  //               cell.s.fill = { fgColor: { rgb: "90EE90" } }; // Light green
  //             } else if (cellValue.startsWith('HEADQUARTER TOTAL:')) {
  //               cell.s.fill = { fgColor: { rgb: "ADD8E6" } }; // Light blue
  //             } else if (cellValue.startsWith('DEPARTMENT TOTAL:')) {
  //               cell.s.fill = { fgColor: { rgb: "FFFFE0" } }; // Light yellow
  //             }
  //           }

  //           // Style column headers (rows that contain formatted header names)
  //           if (sortedHeaders.includes(cellValue) ||
  //               sortedHeaders.some(h => h.replaceAll("_", " ").toUpperCase() === cellValue)) {
  //             if (!cell.s) cell.s = {};
  //             cell.s.font = { bold: true };
  //             cell.s.fill = { fgColor: { rgb: "D3D3D3" } }; // Light gray
  //           }
  //         }
  //       }
  //     }

  //     // Add worksheet to workbook
  //     XLSX.utils.book_append_sheet(wb, ws, "Complex Payroll Report");

  //     // Generate file name with timestamp
  //     const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
  //     const fileName = `Complex_Payroll_Report_${timestamp}.xlsx`;

  //     // Save file
  //     XLSX.writeFile(wb, fileName);

  //     console.log("Excel export completed successfully with dynamic headers");
  //   } catch (error) {
  //     console.error("Excel export failed:", error);
  //     alert("Excel export failed. Please check the console for details.");
  //   }
  // };

  // v1
  // Function to export to Excel with dynamic headers
  // const exportToExcel = (processedData, totalStaffCount, overallTotal) => {
  //   try {
  //     // Create workbook and worksheet
  //     const XLSX =  XLS;
  //     const wb = XLSX.utils.book_new();

  //     // Prepare data for Excel
  //     const excelData = [];

  //     processedData.forEach(hqData => {
  //       hqData.departments.forEach(deptData => {
  //         // Add headquarter header
  //         excelData.push({
  //           'S/N': '',
  //           'Name': `HEADQUARTER: ${hqData.headquarter}`,
  //           'Empno': '',
  //           'Grade/Step': '',
  //           ...Object.fromEntries(deptData.headers.map(h => [h, '']))
  //         });

  //         // Add department header
  //         excelData.push({
  //           'S/N': '',
  //           'Name': `DEPARTMENT: ${deptData.department} (${deptData.staffCount} staff)`,
  //           'Empno': '',
  //           'Grade/Step': '',
  //           ...Object.fromEntries(deptData.headers.map(h => [h, '']))
  //         });

  //         // Add column headers
  //         const headerRow = {
  //           'S/N': 'S/N',
  //           'Name': 'NAME',
  //           'Empno': 'EMPNO',
  //           'Grade/Step': 'GRADE/STEP'
  //         };
  //         deptData.headers.forEach(header => {
  //           headerRow[header] = header.replaceAll("_", " ").toUpperCase();
  //         });
  //         excelData.push(headerRow);

  //         // Add data rows
  //         deptData.records.forEach(record => {
  //           const dataRow = {
  //             'S/N': record['S/N'],
  //             'Name': record['Name'] || record['name'] || 'N/A',
  //             'Empno': record['Empno'] || record['empno'] || record['EMPNO'] || 'N/A',
  //             'Grade/Step': record['Grd'] && record['Stp'] ?
  //               `${record['Grd']}/${record['Stp']}` :
  //               record['Grade'] && record['Step'] ?
  //               `${record['Grade']}/${record['Step']}` : 'N/A'
  //           };

  //           deptData.headers.forEach(header => {
  //             dataRow[header] = record[header] || 'N/A';
  //           });

  //           excelData.push(dataRow);
  //         });

  //         // Add department total
  //         excelData.push({
  //           'S/N': '',
  //           'Name': `DEPARTMENT TOTAL: ${formatNumberWithComma(deptData.totalNet)}`,
  //           'Empno': '',
  //           'Grade/Step': '',
  //           ...Object.fromEntries(deptData.headers.map(h => [h, '']))
  //         });

  //         // Add empty row for separation
  //         excelData.push({
  //           'S/N': '',
  //           'Name': '',
  //           'Empno': '',
  //           'Grade/Step': '',
  //           ...Object.fromEntries(deptData.headers.map(h => [h, '']))
  //         });
  //       });

  //       // Add headquarter total
  //       excelData.push({
  //         'S/N': '',
  //         'Name': `HEADQUARTER TOTAL: ${formatNumberWithComma(hqData.totalNet)}`,
  //         'Empno': '',
  //         'Grade/Step': '',
  //         ...Object.fromEntries(hqData.departments[0]?.headers?.map(h => [h, '']) || [])
  //       });

  //       // Add empty row for separation
  //       excelData.push({
  //         'S/N': '',
  //         'Name': '',
  //         'Empno': '',
  //         'Grade/Step': '',
  //         ...Object.fromEntries(hqData.departments[0]?.headers?.map(h => [h, '']) || [])
  //       });
  //     });

  //     // Add grand totals
  //     excelData.push({
  //       'S/N': '',
  //       'Name': `GRAND TOTAL: ${formatNumberWithComma(overallTotal)}`,
  //       'Empno': '',
  //       'Grade/Step': '',
  //       ...Object.fromEntries(processedData[0]?.departments[0]?.headers?.map(h => [h, '']) || [])
  //     });

  //     excelData.push({
  //       'S/N': '',
  //       'Name': `TOTAL STAFF COUNT: ${totalStaffCount}`,
  //       'Empno': '',
  //       'Grade/Step': '',
  //       ...Object.fromEntries(processedData[0]?.departments[0]?.headers?.map(h => [h, '']) || [])
  //     });

  //     // Create worksheet
  //     const ws = XLSX.utils.json_to_sheet(excelData);

  //     // Add worksheet to workbook
  //     XLSX.utils.book_append_sheet(wb, ws, "Payroll Report");

  //     // Generate file name with timestamp
  //     const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
  //     const fileName = `Complex_Payroll_Report_${timestamp}.xlsx`;

  //     // Save file
  //     XLSX.writeFile(wb, fileName);

  //     console.log("Excel export completed successfully");
  //   } catch (error) {
  //     console.error("Excel export failed:", error);
  //     alert("Excel export failed. Please make sure XLSX library is available.");
  //   }
  // };

  const handleExportToExcel = () => {
    exportToExcel(processedData, totalStaffCount, overallTotal, title);
  };

  const TopContent = () => (
    <div className="flex justify-end gap-2 mb-4 no-print">
      <ActionButton
        className="flex gap-1 items-center"
        onClick={handlePrintAll}
      >
        <MdPrint size={16} /> Print All Department
      </ActionButton>
      <ActionButton
        className="flex gap-1 items-center"
        onClick={handleExportToExcel}
      >
        Export as Excel <MdOutlineFileDownload size={20} />
      </ActionButton>
    </div>
  );

  return (
    <>
      <TopContent />

      <div
        className={cn(
          isPrintMode && "print-container",
          "bg-white shadow-sm border border-gray-100 rounded-[14px]"
        )}
      >
        {processedData.map((hqData, hqIndex) => (
          <div key={hqIndex}>
            {hqData.departments.map((deptData, deptIndex) => (
              <div key={`${hqIndex}-${deptIndex}`} className="department-page">
                <DepartmentTable
                  headquarter={hqData.headquarter}
                  department={deptData}
                  headquarterTotal={hqData.totalNet}
                  hqData={hqData}
                  overallTotal={overallTotal}
                  overallGrossTotal={overallGrossTotal}
                  overallDeductionTotal={overallDeductionTotal}
                  totalStaffCount={totalStaffCount}
                  isPrint={isPrintMode}
                  isFirst={hqIndex === 0 && deptIndex === 0}
                  isLastDept={
                    hqIndex === processedData.length - 1 &&
                    deptIndex === hqData.departments.length - 1
                  }
                  isLastCurrentDept={
                    deptIndex === processedData[hqIndex].departments.length - 1
                  }
                  isFirstDept={deptIndex === 0}
                  title={title}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

// Separate component for rendering individual department tables
const DepartmentTable = ({
  headquarter,
  department,
  headquarterTotal,
  hqData,
  overallTotal,
  overallGrossTotal,
  overallDeductionTotal,
  totalStaffCount,
  isPrint,
  isLastDept,
  isFirstDept,
  isLastCurrentDept,
  title,
  isFirst,
}) => {
  // Fixed columns that should remain single (keep Grade/Step as a combined column)
  const fixedColumns = ["S/N", "Name", "Empno", "Grade/Step"];

  // Chunk only the non-fixed headers into groups of 8 (back to 8 since we have 4 fixed columns)
  const headerChunks = useMemo(() => {
    return chunkArray(department.headers, 8);
  }, [department.headers]);

  // console.log(headerChunks)

  // Calculate total columns needed for each row
  const maxColumnsPerRow = fixedColumns.length + 8;

  return (
    // shadow-sm border border-gray-100 rounded-[14px]
    <div
      className={`bg-white  p-4 mb-6 rounded-[14px] ${
        isPrint ? "department-content" : ""
      }`}
    >
      <div className="overflow-x-auto rounded-md">
        <table className="complex-payroll-table w-full border-collapsem rounded-md">
          <tbody className="rounded-md">
            {/* Title Row */}
            {isFirst && (
              <tr>
                <td
                  colSpan={maxColumnsPerRow}
                  className="hq-title px-4 py-3 font-bold text-center text-lg"
                >
                  {title}
                </td>
              </tr>
            )}
            {/* Headquarter Title Row */}
            {isFirstDept && (
              <tr>
                <td
                  colSpan={maxColumnsPerRow}
                  className="hq-title border border-gray-300  px-4 py-3 bg-gray-200 font-bold text-center text-lg"
                >
                  {headquarter}
                </td>
              </tr>
            )}

            {/* Department Title Row with Record Count */}
            <tr>
              <td
                colSpan={maxColumnsPerRow}
                className="dept-title border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-center"
              >
                {department.department} - Total Records:{" "}
                {department.records.length}
              </td>
            </tr>

            {/* Multi-row Headers - Fixed columns only in first row */}
            {headerChunks.map((headerChunk, chunkIndex) => (
              <tr
                key={`header-chunk-${chunkIndex}`}
                className={chunkIndex === 0 ? "header-row" : "header-row-alt"}
              >
                {/* Fixed columns only in the first header row */}
                {chunkIndex === 0
                  ? fixedColumns.map((fixedHeader, fixedIndex) => (
                      <th
                        key={`fixed-header-${fixedIndex}`}
                        className="border border-gray-500 px-3 py-2 bg-[#374151] text-white font-bold text-center text-xs min-w-[80px]"
                      >
                        {fixedHeader.toUpperCase()}
                      </th>
                    ))
                  : // Empty cells for subsequent header rows with matching header styling
                    fixedColumns.map((_, fixedIndex) => (
                      <th
                        key={`empty-fixed-header-${chunkIndex}-${fixedIndex}`}
                        className="border border-gray-500 px-3 py-2 bg-[#374151] text-white min-w-[80px]"
                      ></th>
                    ))}

                {/* Dynamic headers for this chunk */}
                {headerChunk.map((header, headerIndex) => (
                  <th
                    key={`header-${chunkIndex}-${headerIndex}`}
                    className={`border border-gray-500 px-2 py-2 font-bold text-center text-xs min-w-[70px] text-white ${
                      "bg-[#374151]"
                      //   chunkIndex === 0 ? 'bg-blue-700' : 'bg-blue-600'
                    }`}
                  >
                    {header?.replaceAll("_", " ")?.toUpperCase()}
                  </th>
                ))}

                {/* Fill remaining cells if this chunk is smaller than 8 */}
                {headerChunk.length < 8 &&
                  Array.from({ length: 8 - headerChunk.length }).map(
                    (_, emptyIndex) => (
                      <th
                        key={`empty-header-${chunkIndex}-${emptyIndex}`}
                        className={`border border-gray-500 px-2 py-2 ${
                          "bg-[#374151]"
                          // chunkIndex === 0 ? 'bg-blue-700' : 'bg-blue-600'
                        }`}
                      ></th>
                    )
                  )}
              </tr>
            ))}

            {/* Data Rows - Each record spans multiple rows based on header chunks */}
            {department.records.map((record, recordIndex) =>
              headerChunks.map((headerChunk, chunkIndex) => (
                <tr
                  key={`record-${recordIndex}-chunk-${chunkIndex}`}
                  className={`
                    ${
                      chunkIndex === headerChunks.length - 1
                        ? "border-b-2 border-gray-400"
                        : ""
                    }
                    
                    ${
                      recordIndex % 2 === 0
                        ? "data-row-even bg-gray-100"
                        : "data-row-odd bg-white"
                    }
                  `}
                >
                  {/* Fixed columns data - only show in first chunk row */}
                  {chunkIndex === 0 ? (
                    <>
                      <td className="border border-gray-300 px-3 py-2 text-center text-xs font-medium">
                        {record["S/N"]}
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-left text-xs name-cell whitespace-normal break-words min-w-[120px]">
                        {record["Name"] || record["name"] || "N/A"}
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-xs font-medium">
                        {record["Empno"] ||
                          record["empno"] ||
                          record["EMPNO"] ||
                          "N/A"}
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-xs font-medium">
                        {record["Grd"] && record["Stp"]
                          ? `${record["Grd"]}/${record["Stp"]}`
                          : record["Grade"] ||
                            (record["Grade"] == 0 && record["Step"]) ||
                            record["Step"] == 0
                          ? `${record["Grade"]}/${record["Step"]}`
                          : "N/A"}
                      </td>
                    </>
                  ) : (
                    // Empty cells for subsequent data rows
                    fixedColumns.map((_, fixedIndex) => (
                      <td
                        key={`empty-fixed-data-${recordIndex}-${chunkIndex}-${fixedIndex}`}
                        className="border border-gray-300 px-3 py-2 min-w-[80px]"
                      ></td>
                    ))
                  )}

                  {/* Dynamic data for this chunk */}
                  {headerChunk.map((header, headerIndex) => (
                    <td
                      key={`data-${recordIndex}-${chunkIndex}-${headerIndex}`}
                      className="border border-gray-300 px-2 py-2 text-center text-xs"
                    >
                      {header === "Net" ||
                      header.toLowerCase().includes("net") ||
                      header.toLowerCase().includes("amount") ||
                      header.toLowerCase().includes("salary") ||
                      (Number.isFinite(Number(record[header])) &&
                        record[header] != 0)
                        ? formatNumberWithComma(record[header] || 0)
                        : record[header] === 0
                        ? 0
                        : record[header] || "N/A"}
                    </td>
                  ))}

                  {/* Fill remaining cells if this chunk is smaller than 8 */}
                  {headerChunk.length < 8 &&
                    Array.from({ length: 8 - headerChunk.length }).map(
                      (_, emptyIndex) => (
                        <td
                          key={`empty-data-${recordIndex}-${chunkIndex}-${emptyIndex}`}
                          className="border border-gray-300 px-2 py-2"
                        ></td>
                      )
                    )}
                </tr>
              ))
            )}

            {/* Department Total Row */}
            <tr className="total-row">
              <td
                colSpan={maxColumnsPerRow}
                className="border border-gray-300 px-4 py-3 bg-yellow-100 font-bold text-left text-sm"
              >
                <div className="flex gap-x-5 w-full">
                  <span>
                    <span className=" text-default-700">Total Gross:</span>{" "}
                    {formatNumberWithComma(department.totalGross)}
                  </span>
                  <span>
                    <span className=" text-default-700">Total Deduction:</span>
                    {formatNumberWithComma(department.totalDeduction)}
                  </span>
                  <span>
                    <span className=" text-default-700">Total Net:</span>
                    {formatNumberWithComma(department.totalNet)}
                  </span>
                </div>
                {/*  |  Staff Count: {department.staffCount} */}
              </td>
            </tr>
            {/* Headquarter Total Row */}
            {isLastCurrentDept && (
              <tr className="total-row">
                <td
                  colSpan={maxColumnsPerRow}
                  className="border border-gray-300 px-4 py-3 bg-blue-100 font-bold text-left text-sm"
                >
                  ({headquarter})
                  <div className="flex gap-x-5 w-full mt-1">
                    <span>
                      <span className=" text-default-700">Total Gross:</span>{" "}
                      {formatNumberWithComma(hqData.totalGross)}
                    </span>
                    <span>
                      <span className=" text-default-700">
                        Total Deduction:
                      </span>
                      {formatNumberWithComma(hqData.totalDeduction)}
                    </span>
                    <span>
                      <span className=" text-default-700">Total Net:</span>
                      {formatNumberWithComma(hqData.totalNet)}
                    </span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Overall Grand Total and Staff Sum - Show on last department */}
      {!isPrint && isLastDept && (
        <div className="mt-4 space-y-2">
          <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-400">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">
                Overall Grand Gross Total:
              </span>
              <span className="font-bold text-xl text-blue-700">
                {formatNumberWithComma(overallGrossTotal)}
              </span>
            </div>
          </div>
          <div className="p-3 bg-red-50 rounded border-l-4 border-red-400">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">
                Overall Grand Deduction Total:
              </span>
              <span className="font-bold text-xl text-red-700">
                {formatNumberWithComma(overallDeductionTotal)}
              </span>
            </div>
          </div>
          <div className="p-3 bg-green-50 rounded border-l-4 border-green-400">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">
                Overall Grand Net Total:
              </span>
              <span className="font-bold text-xl text-green-700">
                {formatNumberWithComma(overallTotal)}
              </span>
            </div>
          </div>
          <div className="p-3 bg-purple-50 rounded border-l-4 border-purple-400">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">
                Total Staff Count:
              </span>
              <span className="font-bold text-xl text-purple-700">
                {totalStaffCount}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

DepartmentTable.propTypes = {
  headquarter: propType.string,
  department: propType.object,
  headquarterTotal: propType.number,
  hqData: propType.object,
  overallTotal: propType.number,
  overallGrossTotal: propType.number,
  overallDeductionTotal: propType.number,
  totalStaffCount: propType.number,
  isPrint: propType.bool,
  isLastDept: propType.bool,
  isFirstDept: propType.bool,
  isLastCurrentDept: propType.bool,
  title: propType.any,
  isFirst: propType.bool,
};

export default ComplexPayrollReportTable;

const generatePrintHTMLWithRepeatingHeaders = (
  processedData,
  overallTotal,
  overallGrossTotal,
  overallDeductionTotal,
  totalStaffCount,
  title
) => {
  let htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title}</title>
      <style>
        @media print {
          @page {
            margin: 0.5in;
            size: landscape;
          }
        }
        
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
        }
        
        .department-table {
          width: 100%;
          border-collapse: collapse;
          margin: 0;
          border-top: none;
          border-bottom: none;
        }
        
        .department-table th,
        .department-table td {
          border: 1px solid #d1d5db;
          padding: 6px 8px;
          font-size: 8px;
          text-align: left;
        }
        
        .header-row,
        .header-row-alt {
          background-color: #374151;
          color: white;
          font-weight: bold;
        }

        .header-row th,
        .header-row-alt th {
          border-color: #6b7280;
        }
        
        .table-wrapper {
          border-collapse: collapse;
          width: 100%;
        }
        
        .hq-title {
          font-size: 14px;
          font-weight: bold;
          text-align: center;
          background-color: #e0e0e0;
          padding: 8px;
          border-bottom: 1px solid #d1d5db;
          margin: 0;
        }
        
        .dept-title {
          font-size: 12px;
          font-weight: bold;
          text-align: center;
          background-color: #f5f5f5;
          padding: 6px;
          border-bottom: 1px solid #d1d5db;
          margin: 0;
        }
        
        .total-row {
          background-color: #ffffcc;
          font-weight: bold;
        }
        
        .data-row-even {
          background-color: #f3f4f6;
        }
        
        .data-row-odd {
          background-color: #ffffff;
        }
        
        .name-cell {
          white-space: normal;
          word-wrap: break-word;
          max-width: 150px;
        }
        
        /* Department container - remove automatic page breaks */
        .department-container {
          page-break-before: always;
          min-height: auto;
          display: block;

          
        }
        
        .department-container:first-child {
          page-break-before: auto;
        }


        
        /* Remove internal page breaks to prevent breaks within departments */
        .avoid-break {
          page-break-inside: avoid;
        }
        
        /* Only column headers should repeat, not titles */
        .repeating-header {
          display: table-header-group;
        }
        
        .non-repeating-header {
          display: table-row-group;
        }
        
        tbody {
          display: table-row-group;
        }
        
        tfoot {
          display: table-footer-group;
        }
        
        /* Summary containers inside table wrapper */
        .summary-container {
          background-color: #ffffcc;
          padding: 10px;
          border-top: 1px solid #d1d5db;
          font-weight: bold;
          margin: 0;
        }
        
        .hq-summary-container {
          background-color: #e3f2fd;
          padding: 10px;
          border-top: 1px solid #d1d5db;
          font-weight: 600;
          margin: 0;
        }
        
        .summary-flex {
          display: flex;
          gap: 20px;
          width: 100%;
          justify-content: left;
        }


      </style>
    </head>
    <body>
  `;

  // Generate content for each department with repeating headers
  processedData.forEach((hqData, hqIndex) => {
    if (hqIndex > 0) {
      htmlContent += `<div style="page-break-before: always;"></div>`;
    }

    hqData.departments.forEach((deptData, deptIndex) => {
      let isFirstDept = deptIndex === 0;
      let isLastCurrentDept = deptIndex === hqData.departments.length - 1;
      htmlContent += generateDepartmentHTMLWithRepeatingHeaders(
        hqData,
        deptData,
        title,
        isFirstDept,
        isLastCurrentDept
      );
    });
  });

  // Add grand totals
  htmlContent += `
    <div style="margin-top: 30px; padding: 20px; border: 2px solid #333; page-break-before: always;">
      <h2 style="text-align: center; margin-bottom: 10px;">GRAND TOTALS</h2>
      <p style="font-size: 16px; font-weight: bold;">Overall Grand Gross Total: ${formatNumberWithComma(
        overallGrossTotal
      )}</p>
      <p style="font-size: 16px; font-weight: bold;">Overall Grand Deduction Total: ${formatNumberWithComma(
        overallDeductionTotal
      )}</p>
      <p style="font-size: 16px; font-weight: bold;">Overall Grand Net Total: ${formatNumberWithComma(
        overallTotal
      )}</p>
      <p style="font-size: 16px; font-weight: bold;">Total Staff Count: ${totalStaffCount}</p>
    </div>
  `;

  htmlContent += `
    </body>
    </html>
  `;

  return htmlContent;
};

// // Function to generate HTML for a single department with repeating headers
// const generateDepartmentHTMLWithRepeatingHeaders = (
//   hqData,
//   deptData,
//   title,
//   isFirstDept,
//   isLastCurrentDept
// ) => {
//   const fixedColumns = ["S/N", "Name", "Empno", "Grade/Step"];
//   const headerChunks = chunkArray(deptData.headers, 8);
//   const maxColumnsPerRow = fixedColumns.length + 8;

//   const estimatedPages = estimateDepartmentPages(deptData);

//   console.log(estimatedPages);
//   const endsOnOddPage = estimatedPages % 2 === 1;

//   let departmentHTML = `
//     <div class="department-container" style="page-break-before: ${
//       isFirstDept ? "auto" : "always"
//     };">
//       <div class="table-wrapper">
//         ${
//           isFirstDept
//             ? `
//         <div class="hq-title">
//           ${hqData.headquarter}
//         </div>
//         `
//             : ""
//         }

//         <div class="dept-title">
//           ${
//             deptData.department
//           } ${`(${hqData.headquarter})`} - Total Records: ${
//     deptData.records.length
//   }
//         </div>

//         <table class="department-table">
//   `;

//   // Repeating column headers only
//   let repeatingHeaderHTML = `
//     <thead class="repeating-header">
//   `;

//   headerChunks.forEach((headerChunk, chunkIndex) => {
//     repeatingHeaderHTML += `<tr class="${
//       chunkIndex === 0 ? "header-row" : "header-row-alt"
//     }">`;

//     // Fixed columns
//     if (chunkIndex === 0) {
//       fixedColumns.forEach((fixedHeader) => {
//         repeatingHeaderHTML += `<th>${fixedHeader.toUpperCase()}</th>`;
//       });
//     } else {
//       fixedColumns.forEach(() => {
//         repeatingHeaderHTML += `<th></th>`;
//       });
//     }

//     // Dynamic headers
//     headerChunk.forEach((header) => {
//       repeatingHeaderHTML += `<th>${header
//         .replaceAll("_", " ")
//         .toUpperCase()}</th>`;
//     });

//     // Fill remaining cells
//     if (headerChunk.length < 8) {
//       Array.from({ length: 8 - headerChunk.length }).forEach(() => {
//         repeatingHeaderHTML += `<th></th>`;
//       });
//     }

//     repeatingHeaderHTML += `</tr>`;
//   });

//   repeatingHeaderHTML += `</thead>`;

//   // Add the headers to the table
//   departmentHTML += repeatingHeaderHTML;

//   // Generate table body without internal page breaks
//   departmentHTML += `<tbody>`;

//   deptData.records.forEach((record, recordIndex, deptArr) => {
//     headerChunks.forEach((headerChunk, chunkIndex) => {
//       const rowClass = recordIndex % 2 === 0 ? "data-row-even" : "data-row-odd";

//       // Remove all internal page break logic to prevent breaks within departments
//       departmentHTML += `<tr class="${rowClass}">`;

//       // Fixed columns data
//       if (chunkIndex === 0) {
//         departmentHTML += `<td style="text-align: center;">${record["S/N"]}</td>`;
//         departmentHTML += `<td class="name-cell">${
//           record["Name"] || record["name"] || "N/A"
//         }</td>`;
//         departmentHTML += `<td style="text-align: center;">${
//           record["Empno"] || record["empno"] || record["EMPNO"] || "N/A"
//         }</td>`;
//         const gradeStep =
//           record["Grd"] && record["Stp"]
//             ? `${record["Grd"]}/${record["Stp"]}`
//             : (record["Grade"] || record["Grade"] === 0) &&
//               (record["Step"] || record["Step"] === 0)
//             ? `${record["Grade"]}/${record["Step"]}`
//             : "N/A";
//         departmentHTML += `<td style="text-align: center;">${gradeStep}</td>`;
//       } else {
//         fixedColumns.forEach(() => {
//           departmentHTML += `<td></td>`;
//         });
//       }

//       // Dynamic data
//       headerChunk.forEach((header) => {
//         const value = record[header] === 0 ? 0 : record[header] || "N/A";
//         const isNumeric =
//           header === "Net" ||
//           header.toLowerCase().includes("net") ||
//           header.toLowerCase().includes("amount") ||
//           header.toLowerCase().includes("salary") ||
//           (Number.isFinite(Number(record[header])) && record[header] != 0);

//         const displayValue = isNumeric ? formatNumberWithComma(value) : value;
//         departmentHTML += `<td style="text-align: center;">${displayValue}</td>`;
//       });

//       // Fill remaining cells
//       if (headerChunk.length < 8) {
//         Array.from({ length: 8 - headerChunk.length }).forEach(() => {
//           departmentHTML += `<td></td>`;
//         });
//       }

//       departmentHTML += `</tr>`;
//     });
//   });

//   departmentHTML += `</tbody>`;

//   departmentHTML += `
//         </table>

//         <!-- Department summary inside table wrapper -->
//         <div class="summary-container">
//           <div class="summary-flex">
//             <span>
//               <span style="color: #374151; font-weight: 600;">Total Gross:</span> ${formatNumberWithComma(
//                 deptData.totalGross
//               )}
//             </span>
//             <span>
//               <span style="color: #374151; font-weight: 600;">Total Deduction:</span> ${formatNumberWithComma(
//                 deptData.totalDeduction
//               )}
//             </span>
//             <span>
//               <span style="color: #374151; font-weight: 600;">Total Net:</span> ${formatNumberWithComma(
//                 deptData.totalNet
//               )}
//             </span>
//           </div>
//         </div>

//         ${
//           isLastCurrentDept
//             ? `
//         <div class="hq-summary-container">
//           (${hqData.headquarter})
//           <div class="summary-flex" style="margin-top: 4px;">
//             <span>
//               <span style="color: #374151; font-weight: 600;">Total Gross:</span> ${formatNumberWithComma(
//                 hqData.totalGross
//               )}
//             </span>
//             <span>
//               <span style="color: #374151; font-weight: 600;">Total Deduction:</span> ${formatNumberWithComma(
//                 hqData.totalDeduction
//               )}
//             </span>
//             <span>
//               <span style="color: #374151; font-weight: 600;">Total Net:</span> ${formatNumberWithComma(
//                 hqData.totalNet
//               )}
//             </span>
//           </div>
//         </div>
//         `
//             : ""
//         }
//         ${
//           endsOnOddPage
//             ? ` <div style="page-break-after: always; height: 100vh;" class="department-container">${endsOnOddPage}<div/>`
//             : ""
//         }
//         <div>
//       </div>
//     </div>

//   `;

//   return departmentHTML;
// };

const generateDepartmentHTMLWithRepeatingHeaders = (
  hqData,
  deptData,
  title,
  isFirstDept,
  isLastCurrentDept
) => {
  const fixedColumns = ["S/N", "Name", "Empno", "Grade/Step"];
  const headerChunks = chunkArray(deptData.headers, 8);
  const rowsPerRecord = headerChunks.length; // Each record takes this many rows
  const rowsPerPage = isFirstDept ? 28 : 29;

  // Calculate how many COMPLETE records fit per page
  // We need to account for header rows on first page
  const headerRowCount = headerChunks.length + 1;
  const recordsPerPage = Math.floor(
    (rowsPerPage - headerRowCount) / rowsPerRecord
  );

  console.log(`Rows per record: ${rowsPerRecord}`);
  console.log(`Records per page: ${recordsPerPage}`);

  // Split records into pages based on how many fit
  const recordPages = [];
  for (let i = 0; i < deptData.records.length; i += recordsPerPage) {
    recordPages.push(deptData.records.slice(i, i + recordsPerPage));
  }

  const totalPages = recordPages.length;
  const endsOnOddPage = totalPages % 2 === 1;

  console.log(`Total pages for ${deptData.department}: ${totalPages}`);

  let departmentHTML = `
    <div class="department-container" style="page-break-before: ${
      isFirstDept ? "auto" : "always"
    };">
  `;

  // Generate a table for each page
  recordPages.forEach((pageRecords, pageIndex) => {
    const isFirstPage = pageIndex === 0;
    const isLastPage = pageIndex === recordPages.length - 1;
    const pageNumber = pageIndex + 1; // Page number starts at 1

    departmentHTML += `
      <div class="table-wrapper" ${
        !isFirstPage ? 'style="page-break-before: always;"' : ""
      }>
       <!-- Page number at top -->
        <div class="page-number" style="position: relative; text-align: right; padding-right: 20px; margin-bottom: 10px; color: #666; font-size: 10px;">
          Page ${pageNumber} of ${totalPages}
        </div>
        ${
          isFirstPage && isFirstDept
            ? `
        <div class="hq-title">
          ${hqData.headquarter}
        </div>
        `
            : ""
        }
${
  isFirstPage
    ? `
  <div class="dept-title">
    ${deptData.department} ${`(${hqData.headquarter})`} - Total Records: ${
        deptData.records.length
      }
  </div>`
    : ""
}

        <table class="department-table">
    `;

    // Add repeating headers
    let repeatingHeaderHTML = `<thead class="repeating-header">`;
    headerChunks.forEach((headerChunk, chunkIndex) => {
      repeatingHeaderHTML += `<tr class="${
        chunkIndex === 0 ? "header-row" : "header-row-alt"
      }">`;

      if (chunkIndex === 0) {
        fixedColumns.forEach((fixedHeader) => {
          repeatingHeaderHTML += `<th>${fixedHeader.toUpperCase()}</th>`;
        });
      } else {
        fixedColumns.forEach(() => {
          repeatingHeaderHTML += `<th></th>`;
        });
      }

      headerChunk.forEach((header) => {
        repeatingHeaderHTML += `<th>${header
          .replaceAll("_", " ")
          .toUpperCase()}</th>`;
      });

      if (headerChunk.length < 8) {
        Array.from({ length: 8 - headerChunk.length }).forEach(() => {
          repeatingHeaderHTML += `<th></th>`;
        });
      }

      repeatingHeaderHTML += `</tr>`;
    });
    repeatingHeaderHTML += `</thead>`;

    departmentHTML += repeatingHeaderHTML;

    // Add tbody for this page's records
    departmentHTML += `<tbody>`;

    pageRecords.forEach((record, recordIndex) => {
      const globalRecordIndex = pageIndex * recordsPerPage + recordIndex;

      // Each record spans multiple rows (one per headerChunk)
      headerChunks.forEach((headerChunk, chunkIndex) => {
        const rowClass =
          globalRecordIndex % 2 === 0 ? "data-row-even" : "data-row-odd";

        departmentHTML += `<tr class="${rowClass}">`;

        // Fixed columns data
        if (chunkIndex === 0) {
          departmentHTML += `<td style="text-align: center;">${record["S/N"]}</td>`;
          departmentHTML += `<td class="name-cell">${
            record["Name"] || record["name"] || "N/A"
          }</td>`;
          departmentHTML += `<td style="text-align: center;">${
            record["Empno"] || record["empno"] || record["EMPNO"] || "N/A"
          }</td>`;
          const gradeStep =
            record["Grd"] && record["Stp"]
              ? `${record["Grd"]}/${record["Stp"]}`
              : (record["Grade"] || record["Grade"] === 0) &&
                (record["Step"] || record["Step"] === 0)
              ? `${record["Grade"]}/${record["Step"]}`
              : "N/A";
          departmentHTML += `<td style="text-align: center;">${gradeStep}</td>`;
        } else {
          fixedColumns.forEach(() => {
            departmentHTML += `<td></td>`;
          });
        }

        // Dynamic data
        headerChunk.forEach((header) => {
          const value = record[header] === 0 ? 0 : record[header] || "N/A";
          const isNumeric =
            header === "Net" ||
            header.toLowerCase().includes("net") ||
            header.toLowerCase().includes("amount") ||
            header.toLowerCase().includes("salary") ||
            (Number.isFinite(Number(record[header])) && record[header] != 0);

          const displayValue = isNumeric ? formatNumberWithComma(value) : value;
          departmentHTML += `<td style="text-align: center;">${displayValue}</td>`;
        });

        // Fill remaining cells
        if (headerChunk.length < 8) {
          Array.from({ length: 8 - headerChunk.length }).forEach(() => {
            departmentHTML += `<td></td>`;
          });
        }

        departmentHTML += `</tr>`;
      });
    });

    departmentHTML += `</tbody>`;
    departmentHTML += `</table>`;

    // Add summaries only on the last page
    if (isLastPage) {
      departmentHTML += `
        <div class="summary-container">
          <div class="summary-flex">
            <span>
              <span style="color: #374151; font-weight: 600;">Total Gross:</span> ${formatNumberWithComma(
                deptData.totalGross
              )}
            </span>
            <span>
              <span style="color: #374151; font-weight: 600;">Total Deduction:</span> ${formatNumberWithComma(
                deptData.totalDeduction
              )}
            </span>
            <span>
              <span style="color: #374151; font-weight: 600;">Total Net:</span> ${formatNumberWithComma(
                deptData.totalNet
              )}
            </span>
          </div>
        </div>

        ${
          isLastCurrentDept
            ? `
        <div class="hq-summary-container">
          (${hqData.headquarter})
          <div class="summary-flex" style="margin-top: 4px;">
            <span>
              <span style="color: #374151; font-weight: 600;">Total Gross:</span> ${formatNumberWithComma(
                hqData.totalGross
              )}
            </span>
            <span>
              <span style="color: #374151; font-weight: 600;">Total Deduction:</span> ${formatNumberWithComma(
                hqData.totalDeduction
              )}
            </span>
            <span>
              <span style="color: #374151; font-weight: 600;">Total Net:</span> ${formatNumberWithComma(
                hqData.totalNet
              )}
            </span>
          </div>
        </div>
        `
            : ""
        }
      `;
    }

    departmentHTML += `</div>`; // Close table-wrapper
  });

  // Add blank page if department ends on odd page and not last department
  if (endsOnOddPage) {
    departmentHTML += `
      <div class="blank-page" style="page-break-after: always; height: 100vh;">
        <!-- Blank page for double-sided printing -->
      </div>
    `;
  }

  departmentHTML += `</div>`; // Close department-container

  return departmentHTML;
};

// const generateDepartmentRows = (deptData, fixedColumns) => {
//   const headerChunks = chunkArray(deptData.headers, 8);
//   const rows = [];

//   deptData.records.forEach((record, recordIndex) => {
//     headerChunks.forEach((headerChunk, chunkIndex) => {
//       const rowClass = recordIndex % 2 === 0 ? "data-row-even" : "data-row-odd";

//       rows.push({
//         rowClass,
//         chunkIndex,
//         record,
//         headerChunk,
//         recordIndex,
//       });
//     });
//   });

//   return rows;
// };
// const estimateDepartmentPages = (deptData) => {
//   const fixedColumns = ["S/N", "Name", "Empno", "Grade/Step"];
//   const headerChunks = chunkArray(deptData.headers, 8);

//   // Generate the exact rows that will be rendered
//   const dataRows = generateDepartmentRows(deptData, fixedColumns);

//   // Constants based on your actual layout (measure these in your print preview)
//   const HEADER_ROW_HEIGHT = 20; // pixels or print units
//   const DATA_ROW_HEIGHT = 18;
//   const TITLE_SECTION_HEIGHT = 60; // dept title + spacing
//   const SUMMARY_SECTION_HEIGHT = 80; // summary containers
//   const PAGE_HEIGHT = 700; // usable height per page in landscape

//   // Calculate heights
//   const headerHeight = headerChunks.length * HEADER_ROW_HEIGHT;
//   const dataHeight = dataRows.length * DATA_ROW_HEIGHT;

//   // First page calculation (includes title)
//   let currentPageHeight = TITLE_SECTION_HEIGHT + headerHeight;
//   let pageCount = 1;
//   let rowsOnCurrentPage = 0;

//   // Distribute rows across pages
//   dataRows.forEach((row, index) => {
//     const rowHeight = DATA_ROW_HEIGHT;

//     // Check if adding this row exceeds page height
//     if (currentPageHeight + rowHeight > PAGE_HEIGHT) {
//       // Start new page with repeating header
//       pageCount++;
//       currentPageHeight = headerHeight;
//       rowsOnCurrentPage = 0;
//     }

//     currentPageHeight += rowHeight;
//     rowsOnCurrentPage++;
//   });

//   // Account for summary section on last page
//   if (currentPageHeight + SUMMARY_SECTION_HEIGHT > PAGE_HEIGHT) {
//     pageCount++; // Summary spills to new page
//   }

//   return {
//     totalPages: pageCount,
//     totalRows: dataRows.length,
//     endsOnOddPage: pageCount % 2 === 1,
//     rowsPerPage: Math.ceil(dataRows.length / pageCount),
//   };
// };

// // 3. Updated HTML generation function
// const generateDepartmentHTMLWithRepeatingHeaders = (
//   hqData,
//   deptData,
//   title,
//   isFirstDept,
//   isLastCurrentDept
// ) => {
//   const fixedColumns = ["S/N", "Name", "Empno", "Grade/Step"];
//   const headerChunks = chunkArray(deptData.headers, 8);

//   // Use the same row generation logic
//   const dataRows = generateDepartmentRows(deptData, fixedColumns);
//   const pageEstimate = estimateDepartmentPages(deptData);

//   console.log("Department:", deptData.department);
//   console.log("Estimated pages:", pageEstimate.totalPages);
//   console.log("Ends on odd page:", pageEstimate.endsOnOddPage);
//   console.log("Total rows:", pageEstimate.totalRows);

//   let departmentHTML = `
//     <div class="department-container" style="page-break-before: ${
//       isFirstDept ? "auto" : "always"
//     };">
//       <div class="table-wrapper">
//         ${
//           isFirstDept
//             ? `
//         <div class="hq-title">
//           ${hqData.headquarter}
//         </div>
//         `
//             : ""
//         }

//         <div class="dept-title">
//           ${
//             deptData.department
//           } ${`(${hqData.headquarter})`} - Total Records: ${
//     deptData.records.length
//   } - Pages: ${pageEstimate.totalPages}
//         </div>

//         <table class="department-table">
//   `;

//   // Generate header HTML
//   let repeatingHeaderHTML = `<thead class="repeating-header">`;

//   headerChunks.forEach((headerChunk, chunkIndex) => {
//     repeatingHeaderHTML += `<tr class="${
//       chunkIndex === 0 ? "header-row" : "header-row-alt"
//     }">`;

//     if (chunkIndex === 0) {
//       fixedColumns.forEach((fixedHeader) => {
//         repeatingHeaderHTML += `<th>${fixedHeader.toUpperCase()}</th>`;
//       });
//     } else {
//       fixedColumns.forEach(() => {
//         repeatingHeaderHTML += `<th></th>`;
//       });
//     }

//     headerChunk.forEach((header) => {
//       repeatingHeaderHTML += `<th>${header
//         .replaceAll("_", " ")
//         .toUpperCase()}</th>`;
//     });

//     if (headerChunk.length < 8) {
//       Array.from({ length: 8 - headerChunk.length }).forEach(() => {
//         repeatingHeaderHTML += `<th></th>`;
//       });
//     }

//     repeatingHeaderHTML += `</tr>`;
//   });

//   repeatingHeaderHTML += `</thead>`;
//   departmentHTML += repeatingHeaderHTML;

//   // Generate body using the same rows
//   departmentHTML += `<tbody>`;

//   dataRows.forEach((rowData) => {
//     departmentHTML += `<tr class="${rowData.rowClass}">`;

//     // Fixed columns data
//     if (rowData.chunkIndex === 0) {
//       departmentHTML += `<td style="text-align: center;">${rowData.record["S/N"]}</td>`;
//       departmentHTML += `<td class="name-cell">${
//         rowData.record["Name"] || rowData.record["name"] || "N/A"
//       }</td>`;
//       departmentHTML += `<td style="text-align: center;">${
//         rowData.record["Empno"] ||
//         rowData.record["empno"] ||
//         rowData.record["EMPNO"] ||
//         "N/A"
//       }</td>`;
//       const gradeStep =
//         rowData.record["Grd"] && rowData.record["Stp"]
//           ? `${rowData.record["Grd"]}/${rowData.record["Stp"]}`
//           : (rowData.record["Grade"] || rowData.record["Grade"] === 0) &&
//             (rowData.record["Step"] || rowData.record["Step"] === 0)
//           ? `${rowData.record["Grade"]}/${rowData.record["Step"]}`
//           : "N/A";
//       departmentHTML += `<td style="text-align: center;">${gradeStep}</td>`;
//     } else {
//       fixedColumns.forEach(() => {
//         departmentHTML += `<td></td>`;
//       });
//     }

//     // Dynamic data
//     rowData.headerChunk.forEach((header) => {
//       const value =
//         rowData.record[header] === 0 ? 0 : rowData.record[header] || "N/A";
//       const isNumeric =
//         header === "Net" ||
//         header.toLowerCase().includes("net") ||
//         header.toLowerCase().includes("amount") ||
//         header.toLowerCase().includes("salary") ||
//         (Number.isFinite(Number(rowData.record[header])) &&
//           rowData.record[header] != 0);

//       const displayValue = isNumeric ? formatNumberWithComma(value) : value;
//       departmentHTML += `<td style="text-align: center;">${displayValue}</td>`;
//     });

//     if (rowData.headerChunk.length < 8) {
//       Array.from({ length: 8 - rowData.headerChunk.length }).forEach(() => {
//         departmentHTML += `<td></td>`;
//       });
//     }

//     departmentHTML += `</tr>`;
//   });

//   departmentHTML += `</tbody>`;

//   // Add summaries
//   departmentHTML += `
//         </table>

//         <div class="summary-container">
//           <div class="summary-flex">
//             <span>
//               <span style="color: #374151; font-weight: 600;">Total Gross:</span> ${formatNumberWithComma(
//                 deptData.totalGross
//               )}
//             </span>
//             <span>
//               <span style="color: #374151; font-weight: 600;">Total Deduction:</span> ${formatNumberWithComma(
//                 deptData.totalDeduction
//               )}
//             </span>
//             <span>
//               <span style="color: #374151; font-weight: 600;">Total Net:</span> ${formatNumberWithComma(
//                 deptData.totalNet
//               )}
//             </span>
//           </div>
//         </div>

//         ${
//           isLastCurrentDept
//             ? `
//         <div class="hq-summary-container">
//           (${hqData.headquarter})
//           <div class="summary-flex" style="margin-top: 4px;">
//             <span>
//               <span style="color: #374151; font-weight: 600;">Total Gross:</span> ${formatNumberWithComma(
//                 hqData.totalGross
//               )}
//             </span>
//             <span>
//               <span style="color: #374151; font-weight: 600;">Total Deduction:</span> ${formatNumberWithComma(
//                 hqData.totalDeduction
//               )}
//             </span>
//             <span>
//               <span style="color: #374151; font-weight: 600;">Total Net:</span> ${formatNumberWithComma(
//                 hqData.totalNet
//               )}
//             </span>
//           </div>
//         </div>
//         `
//             : ""
//         }
//       </div>
//     </div>

//       <div style="page-break-after: always; height: 100vh;" class="blank-page">${pageEstimate.totalPages}</div>

//   `;

//   return departmentHTML;
// };

//======================== OLD =======
// v8
// const generatePrintHTMLWithRepeatingHeaders = (processedData, overallTotal, overallGrossTotal, overallDeductionTotal, totalStaffCount, title) => {
//   let htmlContent = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <title>${title}</title>
//       <style>
//         @media print {
//           @page {
//             margin: 0.5in;
//             size: landscape;
//           }
//         }

//         body {
//           font-family: Arial, sans-serif;
//           margin: 0;
//           padding: 20px;
//         }

//         .department-table {
//           width: 100%;
//           border-collapse: collapse;
//           margin: 0;
//           border-top: none;
//           border-bottom: none;
//         }

//         .department-table th,
//         .department-table td {
//           border: 1px solid #d1d5db;
//           padding: 6px 8px;
//           font-size: 8px;
//           text-align: left;
//         }

//         .header-row,
//         .header-row-alt {
//           background-color: #374151;
//           color: white;
//           font-weight: bold;
//         }

//         .header-row th,
//         .header-row-alt th {
//           border-color: #6b7280;
//         }

//         .table-wrapper {
//           border: 1px solid #d1d5db;
//           border-collapse: collapse;
//           width: 100%;
//         }

//         .hq-title {
//           font-size: 14px;
//           font-weight: bold;
//           text-align: center;
//           background-color: #e0e0e0;
//           padding: 8px;
//           border-bottom: 1px solid #d1d5db;
//           margin: 0;
//         }

//         .dept-title {
//           font-size: 12px;
//           font-weight: bold;
//           text-align: center;
//           background-color: #f5f5f5;
//           padding: 6px;
//           border-bottom: 1px solid #d1d5db;
//           margin: 0;
//         }

//         .total-row {
//           background-color: #ffffcc;
//           font-weight: bold;
//         }

//         .data-row-even {
//           background-color: #f3f4f6;
//         }

//         .data-row-odd {
//           background-color: #ffffff;
//         }

//         .name-cell {
//           white-space: normal;
//           word-wrap: break-word;
//           max-width: 150px;
//         }

//         /* Department container for page breaks - each department on separate page */
//         .department-container {
//           page-break-before: always;
//           page-break-after: always;
//           min-height: 100vh;
//           display: block;
//         }

//         .department-container:first-child {
//           page-break-before: auto;
//         }

//         /* More restrictive internal page breaks */
//         .internal-page-break {
//           page-break-before: always;
//         }

//         .avoid-break {
//           page-break-inside: avoid;
//         }

//         /* Only column headers should repeat, not titles */
//         .repeating-header {
//           display: table-header-group;
//         }

//         .non-repeating-header {
//           display: table-row-group;
//         }

//         tbody {
//           display: table-row-group;
//         }

//         tfoot {
//           display: table-footer-group;
//         }

//         /* Summary containers inside table wrapper */
//         .summary-container {
//           background-color: #ffffcc;
//           padding: 10px;
//           border-top: 1px solid #d1d5db;
//           font-weight: bold;
//           margin: 0;
//         }

//         .hq-summary-container {
//           background-color: #e3f2fd;
//           padding: 10px;
//           border-top: 1px solid #d1d5db;
//           font-weight: 600;
//           margin: 0;
//         }

//         .summary-flex {
//           display: flex;
//           gap: 20px;
//           width: 100%;
//           justify-content: left;
//         }
//       </style>
//     </head>
//     <body>
//   `;

//   // Generate content for each department with repeating headers
//   processedData.forEach((hqData, hqIndex) => {
//     hqData.departments.forEach((deptData, deptIndex) => {
//       let isFirstDept = deptIndex === 0;
//       let isLastCurrentDept = deptIndex === hqData.departments.length - 1;
//       htmlContent += generateDepartmentHTMLWithRepeatingHeaders(hqData, deptData, title, isFirstDept, isLastCurrentDept);
//     });
//   });

//   // Add grand totals
//   htmlContent += `
//     <div style="margin-top: 30px; padding: 20px; border: 2px solid #333; page-break-before: always;">
//       <h2 style="text-align: center; margin-bottom: 10px;">GRAND TOTALS</h2>
//       <p style="font-size: 16px; font-weight: bold;">Overall Grand Gross Total: ${formatNumberWithComma(overallGrossTotal)}</p>
//       <p style="font-size: 16px; font-weight: bold;">Overall Grand Deduction Total: ${formatNumberWithComma(overallDeductionTotal)}</p>
//       <p style="font-size: 16px; font-weight: bold;">Overall Grand Net Total: ${formatNumberWithComma(overallTotal)}</p>
//       <p style="font-size: 16px; font-weight: bold;">Total Staff Count: ${totalStaffCount}</p>
//     </div>
//   `;

//   htmlContent += `
//     </body>
//     </html>
//   `;

//   return htmlContent;
// };

// // Function to generate HTML for a single department with repeating headers
// const generateDepartmentHTMLWithRepeatingHeaders = (hqData, deptData, title, isFirstDept, isLastCurrentDept) => {
//   const fixedColumns = ['S/N', 'Name', 'Empno', 'Grade/Step'];
//   const headerChunks = chunkArray(deptData.headers, 8);
//   const maxColumnsPerRow = fixedColumns.length + 8;

//   // More conservative page break calculation - minimize breaks
//   const ROWS_PER_PAGE = 60; // Increased significantly to reduce breaks
//   const totalDataRows = deptData.records.length * headerChunks.length;

//   let departmentHTML = `
//     <div class="department-container" style="page-break-before: ${isFirstDept ? 'auto' : 'always'}; page-break-after: always;">
//       <div class="table-wrapper">
//         ${isFirstDept ? `
//         <div class="hq-title">
//           ${hqData.headquarter}
//         </div>
//         ` : ''}

//         <div class="dept-title">
//           ${deptData.department} - Total Records: ${deptData.records.length}
//         </div>

//         <table class="department-table">
//   `;

//   // Repeating column headers only
//   let repeatingHeaderHTML = `
//     <thead class="repeating-header">
//   `;

//   headerChunks.forEach((headerChunk, chunkIndex) => {
//     repeatingHeaderHTML += `<tr class="${chunkIndex === 0 ? 'header-row' : 'header-row-alt'}">`;

//     // Fixed columns
//     if (chunkIndex === 0) {
//       fixedColumns.forEach(fixedHeader => {
//         repeatingHeaderHTML += `<th>${fixedHeader.toUpperCase()}</th>`;
//       });
//     } else {
//       fixedColumns.forEach(() => {
//         repeatingHeaderHTML += `<th></th>`;
//       });
//     }

//     // Dynamic headers
//     headerChunk.forEach(header => {
//       repeatingHeaderHTML += `<th>${header.replaceAll("_", " ").toUpperCase()}</th>`;
//     });

//     // Fill remaining cells
//     if (headerChunk.length < 8) {
//       Array.from({ length: 8 - headerChunk.length }).forEach(() => {
//         repeatingHeaderHTML += `<th></th>`;
//       });
//     }

//     repeatingHeaderHTML += `</tr>`;
//   });

//   repeatingHeaderHTML += `</thead>`;

//   // Add the headers to the table
//   departmentHTML += repeatingHeaderHTML;

//   // Generate table body with much more restrictive page break logic
//   departmentHTML += `<tbody>`;

//   let currentRowCount = 0;
//   deptData.records.forEach((record, recordIndex) => {
//     headerChunks.forEach((headerChunk, chunkIndex) => {
//       const rowClass = recordIndex % 2 === 0 ? 'data-row-even' : 'data-row-odd';

//       // Extremely restrictive page break logic - avoid breaks within departments
//       const remainingRows = (deptData.records.length - recordIndex) * headerChunks.length;
//       const shouldBreakBefore = currentRowCount > 0 &&
//                                currentRowCount % ROWS_PER_PAGE === 0 &&
//                                remainingRows > 40 && // Only break if we have more than 40 rows left
//                                recordIndex > 15 && // Never break in the first 15 records
//                                chunkIndex === 0 && // Only break at the start of a new record
//                                deptData.records.length > 25; // Only apply breaks for large departments

//       departmentHTML += `<tr class="${rowClass}${shouldBreakBefore ? ' internal-page-break' : ''}">`;

//       // Fixed columns data
//       if (chunkIndex === 0) {
//         departmentHTML += `<td style="text-align: center;">${record['S/N']}</td>`;
//         departmentHTML += `<td class="name-cell">${record['Name'] || record['name'] || 'N/A'}</td>`;
//         departmentHTML += `<td style="text-align: center;">${record['Empno'] || record['empno'] || record['EMPNO'] || 'N/A'}</td>`;
//         const gradeStep = record['Grd'] && record['Stp'] ?
//           `${record['Grd']}/${record['Stp']}` :
//           (record['Grade'] || record['Grade'] === 0) && (record['Step'] || record['Step'] === 0) ?
//           `${record['Grade']}/${record['Step']}` : 'N/A';
//         departmentHTML += `<td style="text-align: center;">${gradeStep}</td>`;
//       } else {
//         fixedColumns.forEach(() => {
//           departmentHTML += `<td></td>`;
//         });
//       }

//       // Dynamic data
//       headerChunk.forEach(header => {
//         const value = record[header] === 0 ? 0 : record[header] || 'N/A';
//         const isNumeric = header === 'Net' || header.toLowerCase().includes('net') ||
//                          header.toLowerCase().includes('amount') || header.toLowerCase().includes('salary') ||
//                          (Number.isFinite(Number(record[header])) && record[header] != 0);

//         const displayValue = isNumeric ? formatNumberWithComma(value) : value;
//         departmentHTML += `<td style="text-align: center;">${displayValue}</td>`;
//       });

//       // Fill remaining cells
//       if (headerChunk.length < 8) {
//         Array.from({ length: 8 - headerChunk.length }).forEach(() => {
//           departmentHTML += `<td></td>`;
//         });
//       }

//       departmentHTML += `</tr>`;
//       currentRowCount++;
//     });
//   });

//   departmentHTML += `</tbody>`;

//   departmentHTML += `
//         </table>

//         <!-- Department summary inside table wrapper -->
//         <div class="summary-container">
//           <div class="summary-flex">
//             <span>
//               <span style="color: #374151; font-weight: 600;">Total Gross:</span> ${formatNumberWithComma(deptData.totalGross)}
//             </span>
//             <span>
//               <span style="color: #374151; font-weight: 600;">Total Deduction:</span> ${formatNumberWithComma(deptData.totalDeduction)}
//             </span>
//             <span>
//               <span style="color: #374151; font-weight: 600;">Total Net:</span> ${formatNumberWithComma(deptData.totalNet)}
//             </span>
//           </div>
//         </div>

//         ${isLastCurrentDept ? `
//         <div class="hq-summary-container">
//           (${hqData.headquarter})
//           <div class="summary-flex" style="margin-top: 4px;">
//             <span>
//               <span style="color: #374151; font-weight: 600;">Total Gross:</span> ${formatNumberWithComma(hqData.totalGross)}
//             </span>
//             <span>
//               <span style="color: #374151; font-weight: 600;">Total Deduction:</span> ${formatNumberWithComma(hqData.totalDeduction)}
//             </span>
//             <span>
//               <span style="color: #374151; font-weight: 600;">Total Net:</span> ${formatNumberWithComma(hqData.totalNet)}
//             </span>
//           </div>
//         </div>
//         ` : ''}
//       </div>
//     </div>
//   `;

//   return departmentHTML;
// };

// const generatePrintHTMLWithRepeatingHeaders = (processedData, overallTotal, overallGrossTotal, overallDeductionTotal, totalStaffCount, title) => {
//   let htmlContent = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <title>${title}</title>
//       <style>
//         @media print {
//           @page {
//             margin: 0.5in;
//             size: landscape;
//           }
//         }

//         body {
//           font-family: Arial, sans-serif;
//           margin: 0;
//           padding: 20px;
//         }

//         .department-table {
//           width: 100%;
//           border-collapse: collapse;
//           margin-bottom: 0;
//         }

//         .department-table th,
//         .department-table td {
//           border: 1px solid #d1d5db;
//           padding: 6px 8px;
//           font-size: 8px;
//           text-align: left;
//         }

//         .header-row,
//         .header-row-alt {
//           background-color: #374151;
//           color: white;
//           font-weight: bold;
//         }

//         .header-row th,
//         .header-row-alt th {
//           border-color: #6b7280;
//         }

//         .hq-title {
//           font-size: 14px;
//           font-weight: bold;
//           text-align: center;
//           background-color: #e0e0e0;
//           width: 100%;
//           padding: 8px;
//           border: 1px solid #d1d5db;
//           border-bottom: none;
//           margin: 0;
//           display: table-caption;
//           caption-side: top;
//         }

//         .dept-title {
//           font-size: 12px;
//           font-weight: bold;
//           text-align: center;
//           background-color: #f5f5f5;
//           width: 100%;
//           padding: 6px;
//           border: 1px solid #d1d5db;
//           border-bottom: none;
//           margin: 0;
//           display: table-caption;
//           caption-side: top;
//         }

//         .total-row {
//           background-color: #ffffcc;
//           font-weight: bold;
//         }

//         .data-row-even {
//           background-color: #f3f4f6;
//         }

//         .data-row-odd {
//           background-color: #ffffff;
//         }

//         .name-cell {
//           white-space: normal;
//           word-wrap: break-word;
//           max-width: 150px;
//         }

//         /* Department container for page breaks - each department on separate page */
//         .department-container {
//           page-break-before: always;
//           page-break-after: always;
//           min-height: 100vh;
//           display: block;
//         }

//         .department-container:first-child {
//           page-break-before: auto;
//         }

//         /* More restrictive internal page breaks */
//         .internal-page-break {
//           page-break-before: always;
//         }

//         .avoid-break {
//           page-break-inside: avoid;
//         }

//         /* Only column headers should repeat, not titles */
//         .repeating-header {
//           display: table-header-group;
//         }

//         .non-repeating-header {
//           display: table-row-group;
//         }

//         tbody {
//           display: table-row-group;
//         }

//         tfoot {
//           display: table-footer-group;
//         }

//         /* Summary containers to match table width exactly */
//         .summary-container {
//           width: 100%;
//           background-color: #ffffcc;
//           padding: 10px;
//           border: 1px solid #d1d5db;
//           border-top: none;
//           font-weight: bold;
//           margin: 0;
//           box-sizing: border-box;
//           display: table-caption;
//           caption-side: bottom;
//         }

//         .hq-summary-container {
//           width: 100%;
//           background-color: #e3f2fd;
//           padding: 10px;
//           border: 1px solid #d1d5db;
//           border-top: none;
//           font-weight: 600;
//           margin: 0;
//           box-sizing: border-box;
//           display: table-caption;
//           caption-side: bottom;
//         }

//         .summary-flex {
//           display: flex;
//           gap: 20px;
//           width: 100%;
//           justify-content: left;
//         }
//       </style>
//     </head>
//     <body>
//   `;

//   // Generate content for each department with repeating headers
//   processedData.forEach((hqData, hqIndex) => {
//     hqData.departments.forEach((deptData, deptIndex) => {
//       let isFirstDept = deptIndex === 0;
//       let isLastCurrentDept = deptIndex === hqData.departments.length - 1;
//       htmlContent += generateDepartmentHTMLWithRepeatingHeaders(hqData, deptData, title, isFirstDept, isLastCurrentDept);
//     });
//   });

//   // Add grand totals
//   htmlContent += `
//     <div style="margin-top: 30px; padding: 20px; border: 2px solid #333; page-break-before: always;">
//       <h2 style="text-align: center; margin-bottom: 10px;">GRAND TOTALS</h2>
//       <p style="font-size: 16px; font-weight: bold;">Overall Grand Gross Total: ${formatNumberWithComma(overallGrossTotal)}</p>
//       <p style="font-size: 16px; font-weight: bold;">Overall Grand Deduction Total: ${formatNumberWithComma(overallDeductionTotal)}</p>
//       <p style="font-size: 16px; font-weight: bold;">Overall Grand Net Total: ${formatNumberWithComma(overallTotal)}</p>
//       <p style="font-size: 16px; font-weight: bold;">Total Staff Count: ${totalStaffCount}</p>
//     </div>
//   `;

//   htmlContent += `
//     </body>
//     </html>
//   `;

//   return htmlContent;
// };

// // Function to generate HTML for a single department with repeating headers
// const generateDepartmentHTMLWithRepeatingHeaders = (hqData, deptData, title, isFirstDept, isLastCurrentDept) => {
//   const fixedColumns = ['S/N', 'Name', 'Empno', 'Grade/Step'];
//   const headerChunks = chunkArray(deptData.headers, 8);
//   const maxColumnsPerRow = fixedColumns.length + 8;

//   // More conservative page break calculation - minimize breaks
//   const ROWS_PER_PAGE = 60; // Increased significantly to reduce breaks
//   const totalDataRows = deptData.records.length * headerChunks.length;

//   let departmentHTML = `
//     <div class="department-container" style="page-break-before: ${isFirstDept ? 'auto' : 'always'}; page-break-after: always;">
//       <table class="department-table">
//         <!-- Non-repeating titles as table captions -->
//         ${isFirstDept ? `
//         <caption class="hq-title">
//           ${hqData.headquarter}
//         </caption>
//         ` : ''}

//         <caption class="dept-title">
//           ${deptData.department} - Total Records: ${deptData.records.length}
//         </caption>
//   `;

//   // Repeating column headers only
//   let repeatingHeaderHTML = `
//     <thead class="repeating-header">
//   `;

//   headerChunks.forEach((headerChunk, chunkIndex) => {
//     repeatingHeaderHTML += `<tr class="${chunkIndex === 0 ? 'header-row' : 'header-row-alt'}">`;

//     // Fixed columns
//     if (chunkIndex === 0) {
//       fixedColumns.forEach(fixedHeader => {
//         repeatingHeaderHTML += `<th>${fixedHeader.toUpperCase()}</th>`;
//       });
//     } else {
//       fixedColumns.forEach(() => {
//         repeatingHeaderHTML += `<th></th>`;
//       });
//     }

//     // Dynamic headers
//     headerChunk.forEach(header => {
//       repeatingHeaderHTML += `<th>${header.replaceAll("_", " ").toUpperCase()}</th>`;
//     });

//     // Fill remaining cells
//     if (headerChunk.length < 8) {
//       Array.from({ length: 8 - headerChunk.length }).forEach(() => {
//         repeatingHeaderHTML += `<th></th>`;
//       });
//     }

//     repeatingHeaderHTML += `</tr>`;
//   });

//   repeatingHeaderHTML += `</thead>`;

//   // Add the headers to the table
//   departmentHTML += repeatingHeaderHTML;

//   // Generate table body with much more restrictive page break logic
//   departmentHTML += `<tbody>`;

//   let currentRowCount = 0;
//   deptData.records.forEach((record, recordIndex) => {
//     headerChunks.forEach((headerChunk, chunkIndex) => {
//       const rowClass = recordIndex % 2 === 0 ? 'data-row-even' : 'data-row-odd';

//       // Extremely restrictive page break logic - avoid breaks within departments
//       const remainingRows = (deptData.records.length - recordIndex) * headerChunks.length;
//       const shouldBreakBefore = currentRowCount > 0 &&
//                                currentRowCount % ROWS_PER_PAGE === 0 &&
//                                remainingRows > 40 && // Only break if we have more than 40 rows left
//                                recordIndex > 15 && // Never break in the first 15 records
//                                chunkIndex === 0 && // Only break at the start of a new record
//                                deptData.records.length > 25; // Only apply breaks for large departments

//       departmentHTML += `<tr class="${rowClass}${shouldBreakBefore ? ' internal-page-break' : ''}">`;

//       // Fixed columns data
//       if (chunkIndex === 0) {
//         departmentHTML += `<td style="text-align: center;">${record['S/N']}</td>`;
//         departmentHTML += `<td class="name-cell">${record['Name'] || record['name'] || 'N/A'}</td>`;
//         departmentHTML += `<td style="text-align: center;">${record['Empno'] || record['empno'] || record['EMPNO'] || 'N/A'}</td>`;
//         const gradeStep = record['Grd'] && record['Stp'] ?
//           `${record['Grd']}/${record['Stp']}` :
//           (record['Grade'] || record['Grade'] === 0) && (record['Step'] || record['Step'] === 0) ?
//           `${record['Grade']}/${record['Step']}` : 'N/A';
//         departmentHTML += `<td style="text-align: center;">${gradeStep}</td>`;
//       } else {
//         fixedColumns.forEach(() => {
//           departmentHTML += `<td></td>`;
//         });
//       }

//       // Dynamic data
//       headerChunk.forEach(header => {
//         const value = record[header] === 0 ? 0 : record[header] || 'N/A';
//         const isNumeric = header === 'Net' || header.toLowerCase().includes('net') ||
//                          header.toLowerCase().includes('amount') || header.toLowerCase().includes('salary') ||
//                          (Number.isFinite(Number(record[header])) && record[header] != 0);

//         const displayValue = isNumeric ? formatNumberWithComma(value) : value;
//         departmentHTML += `<td style="text-align: center;">${displayValue}</td>`;
//       });

//       // Fill remaining cells
//       if (headerChunk.length < 8) {
//         Array.from({ length: 8 - headerChunk.length }).forEach(() => {
//           departmentHTML += `<td></td>`;
//         });
//       }

//       departmentHTML += `</tr>`;
//       currentRowCount++;
//     });
//   });

//   departmentHTML += `</tbody>`;

//   departmentHTML += `
//       </table>

//       <!-- Department summary as table caption -->
//       <div class="summary-container">
//         <div class="summary-flex">
//           <span>
//             <span style="color: #374151; font-weight: 600;">Total Gross:</span> ${formatNumberWithComma(deptData.totalGross)}
//           </span>
//           <span>
//             <span style="color: #374151; font-weight: 600;">Total Deduction:</span> ${formatNumberWithComma(deptData.totalDeduction)}
//           </span>
//           <span>
//             <span style="color: #374151; font-weight: 600;">Total Net:</span> ${formatNumberWithComma(deptData.totalNet)}
//           </span>
//         </div>
//       </div>

//       ${isLastCurrentDept ? `
//       <div class="hq-summary-container">
//         (${hqData.headquarter})
//         <div class="summary-flex" style="margin-top: 4px;">
//           <span>
//             <span style="color: #374151; font-weight: 600;">Total Gross:</span> ${formatNumberWithComma(hqData.totalGross)}
//           </span>
//           <span>
//             <span style="color: #374151; font-weight: 600;">Total Deduction:</span> ${formatNumberWithComma(hqData.totalDeduction)}
//           </span>
//           <span>
//             <span style="color: #374151; font-weight: 600;">Total Net:</span> ${formatNumberWithComma(hqData.totalNet)}
//           </span>
//         </div>
//       </div>
//       ` : ''}
//     </div>
//   `;

//   return departmentHTML;
// };

// v6 break bug
// const generatePrintHTMLWithRepeatingHeaders = (processedData, overallTotal, overallGrossTotal, overallDeductionTotal, totalStaffCount, title) => {
//   let htmlContent = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <title>${title}</title>
//       <style>
//         @media print {
//           @page {
//             margin: 0.5in;
//             size: landscape;
//           }
//         }

//         body {
//           font-family: Arial, sans-serif;
//           margin: 0;
//           padding: 20px;
//         }

//         .department-table {
//           width: 100%;
//           border-collapse: collapse;
//           margin-bottom: 0;
//         }

//         .department-table th,
//         .department-table td {
//           border: 1px solid #d1d5db;
//           padding: 6px 8px;
//           font-size: 8px;
//           text-align: left;
//         }

//         .header-row,
//         .header-row-alt {
//           background-color: #374151;
//           color: white;
//           font-weight: bold;
//         }

//         .header-row th,
//         .header-row-alt th {
//           border-color: #6b7280;
//         }

//         .hq-title {
//           font-size: 14px;
//           font-weight: bold;
//           text-align: center;
//           background-color: #e0e0e0;
//           width: 100%;
//           padding: 8px;
//           border: 1px solid #d1d5db;
//           border-bottom: none;
//           margin: 0;
//         }

//         .dept-title {
//           font-size: 12px;
//           font-weight: bold;
//           text-align: center;
//           background-color: #f5f5f5;
//           width: 100%;
//           padding: 6px;
//           border: 1px solid #d1d5db;
//           border-bottom: none;
//           margin: 0;
//         }

//         .total-row {
//           background-color: #ffffcc;
//           font-weight: bold;
//         }

//         .data-row-even {
//           background-color: #f3f4f6;
//         }

//         .data-row-odd {
//           background-color: #ffffff;
//         }

//         .name-cell {
//           white-space: normal;
//           word-wrap: break-word;
//           max-width: 150px;
//         }

//         /* Department container for page breaks - each department on separate page */
//         .department-container {
//           page-break-before: always;
//           page-break-after: always;
//           min-height: 100vh;
//           display: block;
//         }

//         .department-container:first-child {
//           page-break-before: auto;
//         }

//         /* More restrictive internal page breaks */
//         .internal-page-break {
//           page-break-before: always;
//         }

//         .avoid-break {
//           page-break-inside: avoid;
//         }

//         /* Only column headers should repeat, not titles */
//         .repeating-header {
//           display: table-header-group;
//         }

//         .non-repeating-header {
//           display: table-row-group;
//         }

//         tbody {
//           display: table-row-group;
//         }

//         tfoot {
//           display: table-footer-group;
//         }

//         /* Summary containers to match table width */
//         .summary-container {
//           width: 100%;
//           background-color: #ffffcc;
//           padding: 10px;
//           border: 1px solid #d1d5db;
//           border-top: none;
//           font-weight: bold;
//           margin: 0;
//           box-sizing: border-box;
//         }

//         .hq-summary-container {
//           width: 100%;
//           background-color: #e3f2fd;
//           padding: 10px;
//           border: 1px solid #d1d5db;
//           border-top: none;
//           font-weight: 600;
//           margin: 0;
//           box-sizing: border-box;
//         }

//         .summary-flex {
//           display: flex;
//           gap: 20px;
//           width: 100%;
//           justify-content: left;
//         }
//       </style>
//     </head>
//     <body>
//   `;

//   // Generate content for each department with repeating headers
//   processedData.forEach((hqData, hqIndex) => {
//     hqData.departments.forEach((deptData, deptIndex) => {
//       let isFirstDept = deptIndex === 0;
//       let isLastCurrentDept = deptIndex === hqData.departments.length - 1;
//       htmlContent += generateDepartmentHTMLWithRepeatingHeaders(hqData, deptData, title, isFirstDept, isLastCurrentDept);
//     });
//   });

//   // Add grand totals
//   htmlContent += `
//     <div style="margin-top: 30px; padding: 20px; border: 2px solid #333; page-break-before: always;">
//       <h2 style="text-align: center; margin-bottom: 10px;">GRAND TOTALS</h2>
//       <p style="font-size: 16px; font-weight: bold;">Overall Grand Gross Total: ${formatNumberWithComma(overallGrossTotal)}</p>
//       <p style="font-size: 16px; font-weight: bold;">Overall Grand Deduction Total: ${formatNumberWithComma(overallDeductionTotal)}</p>
//       <p style="font-size: 16px; font-weight: bold;">Overall Grand Net Total: ${formatNumberWithComma(overallTotal)}</p>
//       <p style="font-size: 16px; font-weight: bold;">Total Staff Count: ${totalStaffCount}</p>
//     </div>
//   `;

//   htmlContent += `
//     </body>
//     </html>
//   `;

//   return htmlContent;
// };

// // Function to generate HTML for a single department with repeating headers
// const generateDepartmentHTMLWithRepeatingHeaders = (hqData, deptData, title, isFirstDept, isLastCurrentDept) => {
//   const fixedColumns = ['S/N', 'Name', 'Empno', 'Grade/Step'];
//   const headerChunks = chunkArray(deptData.headers, 8);
//   const maxColumnsPerRow = fixedColumns.length + 8;

//   // More conservative page break calculation
//   const ROWS_PER_PAGE = 50; // Increased to reduce breaks
//   const totalDataRows = deptData.records.length * headerChunks.length;

//   let departmentHTML = `
//     <div class="department-container" style="page-break-before: ${isFirstDept ? 'auto' : 'always'}; page-break-after: always;">
//       <!-- Non-repeating titles matching table width -->
//       ${isFirstDept ? `
//       <div class="hq-title">
//         ${hqData.headquarter}
//       </div>
//       ` : ''}

//       <div class="dept-title" style="${isFirstDept ? 'border-top: none;' : ''}">
//         ${deptData.department} - Total Records: ${deptData.records.length}
//       </div>

//       <table class="department-table" style="border-top: none;">
//   `;

//   // Repeating column headers only
//   let repeatingHeaderHTML = `
//     <thead class="repeating-header">
//   `;

//   headerChunks.forEach((headerChunk, chunkIndex) => {
//     repeatingHeaderHTML += `<tr class="${chunkIndex === 0 ? 'header-row' : 'header-row-alt'}">`;

//     // Fixed columns
//     if (chunkIndex === 0) {
//       fixedColumns.forEach(fixedHeader => {
//         repeatingHeaderHTML += `<th>${fixedHeader.toUpperCase()}</th>`;
//       });
//     } else {
//       fixedColumns.forEach(() => {
//         repeatingHeaderHTML += `<th></th>`;
//       });
//     }

//     // Dynamic headers
//     headerChunk.forEach(header => {
//       repeatingHeaderHTML += `<th>${header.replaceAll("_", " ").toUpperCase()}</th>`;
//     });

//     // Fill remaining cells
//     if (headerChunk.length < 8) {
//       Array.from({ length: 8 - headerChunk.length }).forEach(() => {
//         repeatingHeaderHTML += `<th></th>`;
//       });
//     }

//     repeatingHeaderHTML += `</tr>`;
//   });

//   repeatingHeaderHTML += `</thead>`;

//   // Add the headers to the table
//   departmentHTML += repeatingHeaderHTML;

//   // Generate table body with much more restrictive page break logic
//   departmentHTML += `<tbody>`;

//   let currentRowCount = 0;
//   deptData.records.forEach((record, recordIndex) => {
//     headerChunks.forEach((headerChunk, chunkIndex) => {
//       const rowClass = recordIndex % 2 === 0 ? 'data-row-even' : 'data-row-odd';

//       // Very restrictive page break logic - only break when absolutely necessary
//       const remainingRows = (deptData.records.length - recordIndex) * headerChunks.length;
//       const shouldBreakBefore = currentRowCount > 0 &&
//                                currentRowCount % ROWS_PER_PAGE === 0 &&
//                                remainingRows > 30 && // Only break if we have more than 30 rows left
//                                recordIndex > 10 && // Never break in the first 10 records
//                                chunkIndex === 0; // Only break at the start of a new record, not in the middle

//       departmentHTML += `<tr class="${rowClass}${shouldBreakBefore ? ' internal-page-break' : ''}">`;

//       // Fixed columns data
//       if (chunkIndex === 0) {
//         departmentHTML += `<td style="text-align: center;">${record['S/N']}</td>`;
//         departmentHTML += `<td class="name-cell">${record['Name'] || record['name'] || 'N/A'}</td>`;
//         departmentHTML += `<td style="text-align: center;">${record['Empno'] || record['empno'] || record['EMPNO'] || 'N/A'}</td>`;
//         const gradeStep = record['Grd'] && record['Stp'] ?
//           `${record['Grd']}/${record['Stp']}` :
//           (record['Grade'] || record['Grade'] === 0) && (record['Step'] || record['Step'] === 0) ?
//           `${record['Grade']}/${record['Step']}` : 'N/A';
//         departmentHTML += `<td style="text-align: center;">${gradeStep}</td>`;
//       } else {
//         fixedColumns.forEach(() => {
//           departmentHTML += `<td></td>`;
//         });
//       }

//       // Dynamic data
//       headerChunk.forEach(header => {
//         const value = record[header] === 0 ? 0 : record[header] || 'N/A';
//         const isNumeric = header === 'Net' || header.toLowerCase().includes('net') ||
//                          header.toLowerCase().includes('amount') || header.toLowerCase().includes('salary') ||
//                          (Number.isFinite(Number(record[header])) && record[header] != 0);

//         const displayValue = isNumeric ? formatNumberWithComma(value) : value;
//         departmentHTML += `<td style="text-align: center;">${displayValue}</td>`;
//       });

//       // Fill remaining cells
//       if (headerChunk.length < 8) {
//         Array.from({ length: 8 - headerChunk.length }).forEach(() => {
//           departmentHTML += `<td></td>`;
//         });
//       }

//       departmentHTML += `</tr>`;
//       currentRowCount++;
//     });
//   });

//   departmentHTML += `</tbody>`;

//   departmentHTML += `
//       </table>

//       <!-- Department summary matching table width -->
//       <div class="summary-container">
//         <div class="summary-flex">
//           <span>
//             <span style="color: #374151; font-weight: 600;">Total Gross:</span> ${formatNumberWithComma(deptData.totalGross)}
//           </span>
//           <span>
//             <span style="color: #374151; font-weight: 600;">Total Deduction:</span> ${formatNumberWithComma(deptData.totalDeduction)}
//           </span>
//           <span>
//             <span style="color: #374151; font-weight: 600;">Total Net:</span> ${formatNumberWithComma(deptData.totalNet)}
//           </span>
//         </div>
//       </div>

//       ${isLastCurrentDept ? `
//       <div class="hq-summary-container">
//         (${hqData.headquarter})
//         <div class="summary-flex" style="margin-top: 4px;">
//           <span>
//             <span style="color: #374151; font-weight: 600;">Total Gross:</span> ${formatNumberWithComma(hqData.totalGross)}
//           </span>
//           <span>
//             <span style="color: #374151; font-weight: 600;">Total Deduction:</span> ${formatNumberWithComma(hqData.totalDeduction)}
//           </span>
//           <span>
//             <span style="color: #374151; font-weight: 600;">Total Net:</span> ${formatNumberWithComma(hqData.totalNet)}
//           </span>
//         </div>
//       </div>
//       ` : ''}
//     </div>
//   `;

//   return departmentHTML;
// };

// v5 bug page break
// const generatePrintHTMLWithRepeatingHeaders = (processedData, overallTotal, overallGrossTotal, overallDeductionTotal, totalStaffCount, title) => {
//   let htmlContent = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <title>${title}</title>
//       <style>
//         @media print {
//           @page {
//             margin: 0.5in;
//             size: landscape;
//           }
//         }

//         body {
//           font-family: Arial, sans-serif;
//           margin: 0;
//           padding: 20px;
//         }

//         .department-table {
//           width: 100%;
//           border-collapse: collapse;
//           margin-bottom: 20px;
//         }

//         .department-table th,
//         .department-table td {
//           border: 1px solid #d1d5db;
//           padding: 6px 8px;
//           font-size: 8px;
//           text-align: left;
//         }

//         .header-row,
//         .header-row-alt {
//           background-color: #374151;
//           color: white;
//           font-weight: bold;
//         }

//         .header-row th,
//         .header-row-alt th {
//           border-color: #6b7280;
//         }

//         .hq-title {
//           font-size: 14px;
//           font-weight: bold;
//           text-align: center;
//           background-color: #e0e0e0;
//           width: 100%;
//         }

//         .dept-title {
//           font-size: 12px;
//           font-weight: bold;
//           text-align: center;
//           background-color: #f5f5f5;
//         }

//         .total-row {
//           background-color: #ffffcc;
//           font-weight: bold;
//         }

//         .data-row-even {
//           background-color: #f3f4f6;
//         }

//         .data-row-odd {
//           background-color: #ffffff;
//         }

//         .name-cell {
//           white-space: normal;
//           word-wrap: break-word;
//           max-width: 150px;
//         }

//         /* Department container for page breaks - each department on separate page */
//         .department-container {
//           page-break-before: always;
//           page-break-after: always;
//           min-height: 100vh;
//           display: block;
//         }

//         .department-container:first-child {
//           page-break-before: auto;
//         }

//         /* Internal page breaks within department data */
//         .internal-page-break {
//           page-break-before: always;
//         }

//         .avoid-break {
//           page-break-inside: avoid;
//         }

//         /* Only column headers should repeat, not titles */
//         .repeating-header {
//           display: table-header-group;
//         }

//         .non-repeating-header {
//           display: table-row-group;
//         }

//         tbody {
//           display: table-row-group;
//         }

//         tfoot {
//           display: table-footer-group;
//         }
//       </style>
//     </head>
//     <body>
//   `;

//   // Generate content for each department with repeating headers
//   processedData.forEach((hqData, hqIndex) => {
//     hqData.departments.forEach((deptData, deptIndex) => {
//       let isFirstDept = deptIndex === 0;
//       let isLastCurrentDept = deptIndex === hqData.departments.length - 1;
//       htmlContent += generateDepartmentHTMLWithRepeatingHeaders(hqData, deptData, title, isFirstDept, isLastCurrentDept);
//     });
//   });

//   // Add grand totals
//   htmlContent += `
//     <div style="margin-top: 30px; padding: 20px; border: 2px solid #333; page-break-before: always;">
//       <h2 style="text-align: center; margin-bottom: 10px;">GRAND TOTALS</h2>
//       <p style="font-size: 16px; font-weight: bold;">Overall Grand Gross Total: ${formatNumberWithComma(overallGrossTotal)}</p>
//       <p style="font-size: 16px; font-weight: bold;">Overall Grand Deduction Total: ${formatNumberWithComma(overallDeductionTotal)}</p>
//       <p style="font-size: 16px; font-weight: bold;">Overall Grand Net Total: ${formatNumberWithComma(overallTotal)}</p>
//       <p style="font-size: 16px; font-weight: bold;">Total Staff Count: ${totalStaffCount}</p>
//     </div>
//   `;

//   htmlContent += `
//     </body>
//     </html>
//   `;

//   return htmlContent;
// };

// // Function to generate HTML for a single department with repeating headers
// const generateDepartmentHTMLWithRepeatingHeaders = (hqData, deptData, title, isFirstDept, isLastCurrentDept) => {
//   const fixedColumns = ['S/N', 'Name', 'Empno', 'Grade/Step'];
//   const headerChunks = chunkArray(deptData.headers, 8);
//   const maxColumnsPerRow = fixedColumns.length + 8;

//   // Calculate more accurate rows per page (landscape A4 with 8px font)
//   const ROWS_PER_PAGE = 45; // Increased to better utilize space and reduce breaks
//   const totalDataRows = deptData.records.length * headerChunks.length;

//   let departmentHTML = `
//     <div class="department-container" style="page-break-before: ${isFirstDept ? 'auto' : 'always'}; page-break-after: always;">
//       <!-- Non-repeating titles outside of table -->
//       ${isFirstDept ? `
//       <div style="width: 100%; text-align: center; font-size: 14px; font-weight: bold; background-color: #e0e0e0; padding: 8px; border: 1px solid #d1d5db; border-bottom: none;">
//         ${hqData.headquarter}
//       </div>
//       ` : ''}

//       <div style="width: 100%; text-align: center; font-size: 12px; font-weight: bold; background-color: #f5f5f5; padding: 6px; border: 1px solid #d1d5db; border-bottom: none; ${isFirstDept ? 'border-top: none;' : ''}">
//         ${deptData.department} - Total Records: ${deptData.records.length}
//       </div>

//       <table class="department-table" style="border-top: none;">
//   `;

//   // Repeating column headers only
//   let repeatingHeaderHTML = `
//     <thead class="repeating-header">
//   `;

//   headerChunks.forEach((headerChunk, chunkIndex) => {
//     repeatingHeaderHTML += `<tr class="${chunkIndex === 0 ? 'header-row' : 'header-row-alt'}">`;

//     // Fixed columns
//     if (chunkIndex === 0) {
//       fixedColumns.forEach(fixedHeader => {
//         repeatingHeaderHTML += `<th>${fixedHeader.toUpperCase()}</th>`;
//       });
//     } else {
//       fixedColumns.forEach(() => {
//         repeatingHeaderHTML += `<th></th>`;
//       });
//     }

//     // Dynamic headers
//     headerChunk.forEach(header => {
//       repeatingHeaderHTML += `<th>${header.replaceAll("_", " ").toUpperCase()}</th>`;
//     });

//     // Fill remaining cells
//     if (headerChunk.length < 8) {
//       Array.from({ length: 8 - headerChunk.length }).forEach(() => {
//         repeatingHeaderHTML += `<th></th>`;
//       });
//     }

//     repeatingHeaderHTML += `</tr>`;
//   });

//   repeatingHeaderHTML += `</thead>`;

//   // Add the headers to the table
//   departmentHTML += repeatingHeaderHTML;

//   // Generate table body with improved page break logic
//   departmentHTML += `<tbody>`;

//   let currentRowCount = 0;
//   deptData.records.forEach((record, recordIndex) => {
//     headerChunks.forEach((headerChunk, chunkIndex) => {
//       const rowClass = recordIndex % 2 === 0 ? 'data-row-even' : 'data-row-odd';

//       // Much more conservative page break logic - only break when really necessary
//       const remainingRows = (deptData.records.length - recordIndex) * headerChunks.length;
//       const shouldBreakBefore = currentRowCount > 0 &&
//                                currentRowCount % ROWS_PER_PAGE === 0 &&
//                                remainingRows > 20 && // Only break if we have more than 20 rows left
//                                recordIndex > 5; // Never break in the first 5 records

//       departmentHTML += `<tr class="${rowClass}${shouldBreakBefore ? ' internal-page-break' : ''}">`;

//       // Fixed columns data
//       if (chunkIndex === 0) {
//         departmentHTML += `<td style="text-align: center;">${record['S/N']}</td>`;
//         departmentHTML += `<td class="name-cell">${record['Name'] || record['name'] || 'N/A'}</td>`;
//         departmentHTML += `<td style="text-align: center;">${record['Empno'] || record['empno'] || record['EMPNO'] || 'N/A'}</td>`;
//         const gradeStep = record['Grd'] && record['Stp'] ?
//           `${record['Grd']}/${record['Stp']}` :
//           (record['Grade'] || record['Grade'] === 0) && (record['Step'] || record['Step'] === 0) ?
//           `${record['Grade']}/${record['Step']}` : 'N/A';
//         departmentHTML += `<td style="text-align: center;">${gradeStep}</td>`;
//       } else {
//         fixedColumns.forEach(() => {
//           departmentHTML += `<td></td>`;
//         });
//       }

//       // Dynamic data
//       headerChunk.forEach(header => {
//         const value = record[header] === 0 ? 0 : record[header] || 'N/A';
//         const isNumeric = header === 'Net' || header.toLowerCase().includes('net') ||
//                          header.toLowerCase().includes('amount') || header.toLowerCase().includes('salary') ||
//                          (Number.isFinite(Number(record[header])) && record[header] != 0);

//         const displayValue = isNumeric ? formatNumberWithComma(value) : value;
//         departmentHTML += `<td style="text-align: center;">${displayValue}</td>`;
//       });

//       // Fill remaining cells
//       if (headerChunk.length < 8) {
//         Array.from({ length: 8 - headerChunk.length }).forEach(() => {
//           departmentHTML += `<td></td>`;
//         });
//       }

//       departmentHTML += `</tr>`;
//       currentRowCount++;
//     });
//   });

//   departmentHTML += `</tbody>`;

//   departmentHTML += `
//       </table>

//       <!-- Non-repeating summary outside of table -->
//       <div style="width: 100%; background-color: #ffffcc; padding: 10px; border: 1px solid #d1d5db; border-top: none; font-weight: bold;">
//         <div style="display: flex; gap: 20px; width: 100%; justify-content: left;">
//           <span>
//             <span style="color: #374151; font-weight: 600;">Total Gross:</span> ${formatNumberWithComma(deptData.totalGross)}
//           </span>
//           <span>
//             <span style="color: #374151; font-weight: 600;">Total Deduction:</span> ${formatNumberWithComma(deptData.totalDeduction)}
//           </span>
//           <span>
//             <span style="color: #374151; font-weight: 600;">Total Net:</span> ${formatNumberWithComma(deptData.totalNet)}
//           </span>
//         </div>
//       </div>

//       ${isLastCurrentDept ? `
//       <div style="width: 100%; background-color: #e3f2fd; padding: 10px; border: 1px solid #d1d5db; border-top: none; font-weight: 600;">
//         (${hqData.headquarter})
//         <div style="display: flex; gap: 20px; width: 100%; justify-content: left; margin-top: 4px;">
//           <span>
//             <span style="color: #374151; font-weight: 600;">Total Gross:</span> ${formatNumberWithComma(hqData.totalGross)}
//           </span>
//           <span>
//             <span style="color: #374151; font-weight: 600;">Total Deduction:</span> ${formatNumberWithComma(hqData.totalDeduction)}
//           </span>
//           <span>
//             <span style="color: #374151; font-weight: 600;">Total Net:</span> ${formatNumberWithComma(hqData.totalNet)}
//           </span>
//         </div>
//       </div>
//       ` : ''}
//     </div>
//   `;

//   return departmentHTML;
// };

// v4 bug serious
// const generatePrintHTMLWithRepeatingHeaders = (processedData, overallTotal, overallGrossTotal, overallDeductionTotal, totalStaffCount, title) => {
//   let htmlContent = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <title>${title}</title>
//       <style>
//         @media print {
//           @page {
//             margin: 0.5in;
//             size: landscape;
//           }
//         }

//         body {
//           font-family: Arial, sans-serif;
//           margin: 0;
//           padding: 20px;
//         }

//         .department-table {
//           width: 100%;
//           border-collapse: collapse;
//           margin-bottom: 20px;
//         }

//         .department-table th,
//         .department-table td {
//           border: 1px solid #d1d5db;
//           padding: 6px 8px;
//           font-size: 8px;
//           text-align: left;
//         }

//         .header-row,
//         .header-row-alt {
//           background-color: #374151;
//           color: white;
//           font-weight: bold;
//         }

//         .header-row th,
//         .header-row-alt th {
//           border-color: #6b7280;
//         }

//         .hq-title {
//           font-size: 14px;
//           font-weight: bold;
//           text-align: center;
//           background-color: #e0e0e0;
//           width: 100%;
//         }

//         .dept-title {
//           font-size: 12px;
//           font-weight: bold;
//           text-align: center;
//           background-color: #f5f5f5;
//         }

//         .total-row {
//           background-color: #ffffcc;
//           font-weight: bold;
//         }

//         .data-row-even {
//           background-color: #f3f4f6;
//         }

//         .data-row-odd {
//           background-color: #ffffff;
//         }

//         .name-cell {
//           white-space: normal;
//           word-wrap: break-word;
//           max-width: 150px;
//         }

//         /* Department container for page breaks - each department on separate page */
//         .department-container {
//           page-break-before: always;
//           page-break-after: always;
//           min-height: 100vh;
//           display: block;
//         }

//         .department-container:first-child {
//           page-break-before: auto;
//         }

//         /* Internal page breaks within department data */
//         .internal-page-break {
//           page-break-before: always;
//         }

//         .avoid-break {
//           page-break-inside: avoid;
//         }

//         /* Only column headers should repeat, not titles */
//         .repeating-header {
//           display: table-header-group;
//         }

//         .non-repeating-header {
//           display: table-row-group;
//         }

//         tbody {
//           display: table-row-group;
//         }

//         tfoot {
//           display: table-footer-group;
//         }
//       </style>
//     </head>
//     <body>
//   `;

//   // Generate content for each department with repeating headers
//   processedData.forEach((hqData, hqIndex) => {
//     hqData.departments.forEach((deptData, deptIndex) => {
//       let isFirstDept = deptIndex === 0;
//       let isLastCurrentDept = deptIndex === hqData.departments.length - 1;
//       htmlContent += generateDepartmentHTMLWithRepeatingHeaders(hqData, deptData, title, isFirstDept, isLastCurrentDept);
//     });
//   });

//   // Add grand totals
//   htmlContent += `
//     <div style="margin-top: 30px; padding: 20px; border: 2px solid #333; page-break-before: always;">
//       <h2 style="text-align: center; margin-bottom: 10px;">GRAND TOTALS</h2>
//       <p style="font-size: 16px; font-weight: bold;">Overall Grand Gross Total: ${formatNumberWithComma(overallGrossTotal)}</p>
//       <p style="font-size: 16px; font-weight: bold;">Overall Grand Deduction Total: ${formatNumberWithComma(overallDeductionTotal)}</p>
//       <p style="font-size: 16px; font-weight: bold;">Overall Grand Net Total: ${formatNumberWithComma(overallTotal)}</p>
//       <p style="font-size: 16px; font-weight: bold;">Total Staff Count: ${totalStaffCount}</p>
//     </div>
//   `;

//   htmlContent += `
//     </body>
//     </html>
//   `;

//   return htmlContent;
// };

// // Function to generate HTML for a single department with repeating headers
// const generateDepartmentHTMLWithRepeatingHeaders = (hqData, deptData, title, isFirstDept, isLastCurrentDept) => {
//   const fixedColumns = ['S/N', 'Name', 'Empno', 'Grade/Step'];
//   const headerChunks = chunkArray(deptData.headers, 8);
//   const maxColumnsPerRow = fixedColumns.length + 8;

//   // Calculate more accurate rows per page (landscape A4 with 8px font)
//   const ROWS_PER_PAGE = 35; // Increased from 25 to better utilize space
//   const totalDataRows = deptData.records.length * headerChunks.length;

//   let departmentHTML = `
//     <div class="department-container" style="page-break-before: ${isFirstDept ? 'auto' : 'always'}; page-break-after: always;">
//       <!-- Non-repeating titles outside of table -->
//       ${isFirstDept ? `
//       <div style="width: 100%; text-align: center; font-size: 14px; font-weight: bold; background-color: #e0e0e0; padding: 8px; margin-bottom: 5px; border: 1px solid #d1d5db;">
//         ${hqData.headquarter}
//       </div>
//       ` : ''}

//       <div style="width: 100%; text-align: center; font-size: 12px; font-weight: bold; background-color: #f5f5f5; padding: 6px; margin-bottom: 10px; border: 1px solid #d1d5db;">
//         ${deptData.department} - Total Records: ${deptData.records.length}
//       </div>

//       <table class="department-table">
//   `;

//   // Repeating column headers only
//   let repeatingHeaderHTML = `
//     <thead class="repeating-header">
//   `;

//   headerChunks.forEach((headerChunk, chunkIndex) => {
//     repeatingHeaderHTML += `<tr class="${chunkIndex === 0 ? 'header-row' : 'header-row-alt'}">`;

//     // Fixed columns
//     if (chunkIndex === 0) {
//       fixedColumns.forEach(fixedHeader => {
//         repeatingHeaderHTML += `<th>${fixedHeader.toUpperCase()}</th>`;
//       });
//     } else {
//       fixedColumns.forEach(() => {
//         repeatingHeaderHTML += `<th></th>`;
//       });
//     }

//     // Dynamic headers
//     headerChunk.forEach(header => {
//       repeatingHeaderHTML += `<th>${header.replaceAll("_", " ").toUpperCase()}</th>`;
//     });

//     // Fill remaining cells
//     if (headerChunk.length < 8) {
//       Array.from({ length: 8 - headerChunk.length }).forEach(() => {
//         repeatingHeaderHTML += `<th></th>`;
//       });
//     }

//     repeatingHeaderHTML += `</tr>`;
//   });

//   repeatingHeaderHTML += `</thead>`;

//   // Add the headers to the table
//   departmentHTML += repeatingHeaderHTML;

//   // Generate table body with improved page break logic
//   departmentHTML += `<tbody>`;

//   let currentRowCount = 0;
//   deptData.records.forEach((record, recordIndex) => {
//     headerChunks.forEach((headerChunk, chunkIndex) => {
//       const rowClass = recordIndex % 2 === 0 ? 'data-row-even' : 'data-row-odd';

//       // Improved page break logic - only break when we have sufficient rows
//       // and we're not near the end of the dataset
//       const remainingRows = (deptData.records.length - recordIndex) * headerChunks.length;
//       const shouldBreakBefore = currentRowCount > 0 &&
//                                currentRowCount % ROWS_PER_PAGE === 0 &&
//                                remainingRows > 10 && // Only break if we have more than 10 rows left
//                                recordIndex > 0; // Never break on the first record

//       departmentHTML += `<tr class="${rowClass}${shouldBreakBefore ? ' internal-page-break' : ''}">`;

//       // Fixed columns data
//       if (chunkIndex === 0) {
//         departmentHTML += `<td style="text-align: center;">${record['S/N']}</td>`;
//         departmentHTML += `<td class="name-cell">${record['Name'] || record['name'] || 'N/A'}</td>`;
//         departmentHTML += `<td style="text-align: center;">${record['Empno'] || record['empno'] || record['EMPNO'] || 'N/A'}</td>`;
//         const gradeStep = record['Grd'] && record['Stp'] ?
//           `${record['Grd']}/${record['Stp']}` :
//           (record['Grade'] || record['Grade'] === 0) && (record['Step'] || record['Step'] === 0) ?
//           `${record['Grade']}/${record['Step']}` : 'N/A';
//         departmentHTML += `<td style="text-align: center;">${gradeStep}</td>`;
//       } else {
//         fixedColumns.forEach(() => {
//           departmentHTML += `<td></td>`;
//         });
//       }

//       // Dynamic data
//       headerChunk.forEach(header => {
//         const value = record[header] === 0 ? 0 : record[header] || 'N/A';
//         const isNumeric = header === 'Net' || header.toLowerCase().includes('net') ||
//                          header.toLowerCase().includes('amount') || header.toLowerCase().includes('salary') ||
//                          (Number.isFinite(Number(record[header])) && record[header] != 0);

//         const displayValue = isNumeric ? formatNumberWithComma(value) : value;
//         departmentHTML += `<td style="text-align: center;">${displayValue}</td>`;
//       });

//       // Fill remaining cells
//       if (headerChunk.length < 8) {
//         Array.from({ length: 8 - headerChunk.length }).forEach(() => {
//           departmentHTML += `<td></td>`;
//         });
//       }

//       departmentHTML += `</tr>`;
//       currentRowCount++;
//     });
//   });

//   departmentHTML += `</tbody>`;

//   departmentHTML += `
//       </table>

//       <!-- Non-repeating summary outside of table -->
//       <div style="width: 100%; background-color: #ffffcc; padding: 10px; margin-top: 10px; border: 1px solid #d1d5db; font-weight: bold;">
//         <div style="display: flex; gap: 20px; width: 100%; justify-content: left;">
//           <span>
//             <span style="color: #374151; font-weight: 600;">Total Gross:</span> ${formatNumberWithComma(deptData.totalGross)}
//           </span>
//           <span>
//             <span style="color: #374151; font-weight: 600;">Total Deduction:</span> ${formatNumberWithComma(deptData.totalDeduction)}
//           </span>
//           <span>
//             <span style="color: #374151; font-weight: 600;">Total Net:</span> ${formatNumberWithComma(deptData.totalNet)}
//           </span>
//         </div>
//       </div>

//       ${isLastCurrentDept ? `
//       <div style="width: 100%; background-color: #e3f2fd; padding: 10px; margin-top: 5px; border: 1px solid #d1d5db; font-weight: 600;">
//         (${hqData.headquarter})
//         <div style="display: flex; gap: 20px; width: 100%; justify-content: left; margin-top: 4px;">
//           <span>
//             <span style="color: #374151; font-weight: 600;">Total Gross:</span> ${formatNumberWithComma(hqData.totalGross)}
//           </span>
//           <span>
//             <span style="color: #374151; font-weight: 600;">Total Deduction:</span> ${formatNumberWithComma(hqData.totalDeduction)}
//           </span>
//           <span>
//             <span style="color: #374151; font-weight: 600;">Total Net:</span> ${formatNumberWithComma(hqData.totalNet)}
//           </span>
//         </div>
//       </div>
//       ` : ''}
//     </div>
//   `;

//   return departmentHTML;
// };

// v3 bug
// const generatePrintHTMLWithRepeatingHeaders = (processedData, overallTotal, overallGrossTotal, overallDeductionTotal, totalStaffCount, title) => {
//   let htmlContent = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <title>${title}</title>
//       <style>
//         @media print {
//           @page {
//             margin: 0.5in;
//             size: landscape;
//           }
//         }

//         body {
//           font-family: Arial, sans-serif;
//           margin: 0;
//           padding: 20px;
//         }

//         .department-table {
//           width: 100%;
//           border-collapse: collapse;
//           margin-bottom: 20px;
//         }

//         .department-table th,
//         .department-table td {
//           border: 1px solid #d1d5db;
//           padding: 6px 8px;
//           font-size: 8px;
//           text-align: left;
//         }

//         .header-row,
//         .header-row-alt {
//           background-color: #374151;
//           color: white;
//           font-weight: bold;
//         }

//         .header-row th,
//         .header-row-alt th {
//           border-color: #6b7280;
//         }

//         .hq-title {
//           font-size: 14px;
//           font-weight: bold;
//           text-align: center;
//           background-color: #e0e0e0;
//           width: 100%;
//         }

//         .dept-title {
//           font-size: 12px;
//           font-weight: bold;
//           text-align: center;
//           background-color: #f5f5f5;
//         }

//         .total-row {
//           background-color: #ffffcc;
//           font-weight: bold;
//         }

//         .data-row-even {
//           background-color: #f3f4f6;
//         }

//         .data-row-odd {
//           background-color: #ffffff;
//         }

//         .name-cell {
//           white-space: normal;
//           word-wrap: break-word;
//           max-width: 150px;
//         }

//         /* Department container for page breaks - each department on separate page */
//         .department-container {
//           page-break-before: always;
//           page-break-after: always;
//           min-height: 100vh;
//           display: block;
//         }

//         .department-container:first-child {
//           page-break-before: auto;
//         }

//         /* Internal page breaks within department data */
//         .internal-page-break {
//           page-break-before: always;
//         }

//         .avoid-break {
//           page-break-inside: avoid;
//         }

//         /* Only column headers should repeat, not titles */
//         .repeating-header {
//           display: table-header-group;
//         }

//         .non-repeating-header {
//           display: table-row-group;
//         }

//         tbody {
//           display: table-row-group;
//         }

//         tfoot {
//           display: table-footer-group;
//         }
//       </style>
//     </head>
//     <body>
//   `;

//   // Generate content for each department with repeating headers
//   processedData.forEach((hqData, hqIndex) => {
//     hqData.departments.forEach((deptData, deptIndex) => {
//       let isFirstDept = deptIndex === 0;
//       let isLastCurrentDept = deptIndex === hqData.departments.length - 1;
//       htmlContent += generateDepartmentHTMLWithRepeatingHeaders(hqData, deptData, title, isFirstDept, isLastCurrentDept);
//     });
//   });

//   // Add grand totals
//   htmlContent += `
//     <div style="margin-top: 30px; padding: 20px; border: 2px solid #333; page-break-before: always;">
//       <h2 style="text-align: center; margin-bottom: 10px;">GRAND TOTALS</h2>
//       <p style="font-size: 16px; font-weight: bold;">Overall Grand Gross Total: ${formatNumberWithComma(overallGrossTotal)}</p>
//       <p style="font-size: 16px; font-weight: bold;">Overall Grand Deduction Total: ${formatNumberWithComma(overallDeductionTotal)}</p>
//       <p style="font-size: 16px; font-weight: bold;">Overall Grand Net Total: ${formatNumberWithComma(overallTotal)}</p>
//       <p style="font-size: 16px; font-weight: bold;">Total Staff Count: ${totalStaffCount}</p>
//     </div>
//   `;

//   htmlContent += `
//     </body>
//     </html>
//   `;

//   return htmlContent;
// };

// // Function to generate HTML for a single department with repeating headers
// const generateDepartmentHTMLWithRepeatingHeaders = (hqData, deptData, title, isFirstDept, isLastCurrentDept) => {
//   const fixedColumns = ['S/N', 'Name', 'Empno', 'Grade/Step'];
//   const headerChunks = chunkArray(deptData.headers, 8);
//   const maxColumnsPerRow = fixedColumns.length + 8;

//   // Calculate more accurate rows per page (landscape A4 with 8px font)
//   const ROWS_PER_PAGE = 35; // Increased from 25 to better utilize space
//   const totalDataRows = deptData.records.length * headerChunks.length;

//   let departmentHTML = `
//     <div class="department-container" style="page-break-before: ${isFirstDept ? 'auto' : 'always'}; page-break-after: always;">
//       <table class="department-table">
//   `;

//   // Non-repeating title section (appears only once per department)
//   let titleHTML = `
//     <thead class="non-repeating-header">
//       <!-- Headquarter Title Row - only show for first department -->
//       ${isFirstDept ? `
//       <tr>
//         <td colspan="${maxColumnsPerRow}" class="hq-title">
//           ${hqData.headquarter}
//         </td>
//       </tr>
//       ` : ''}

//       <!-- Department Title Row -->
//       <tr>
//         <td colspan="${maxColumnsPerRow}" class="dept-title">
//           ${deptData.department} - Total Records: ${deptData.records.length}
//         </td>
//       </tr>
//     </thead>
//   `;

//   // Repeating column headers
//   let repeatingHeaderHTML = `
//     <thead class="repeating-header">
//   `;

//   headerChunks.forEach((headerChunk, chunkIndex) => {
//     repeatingHeaderHTML += `<tr class="${chunkIndex === 0 ? 'header-row' : 'header-row-alt'}">`;

//     // Fixed columns
//     if (chunkIndex === 0) {
//       fixedColumns.forEach(fixedHeader => {
//         repeatingHeaderHTML += `<th>${fixedHeader.toUpperCase()}</th>`;
//       });
//     } else {
//       fixedColumns.forEach(() => {
//         repeatingHeaderHTML += `<th></th>`;
//       });
//     }

//     // Dynamic headers
//     headerChunk.forEach(header => {
//       repeatingHeaderHTML += `<th>${header.replaceAll("_", " ").toUpperCase()}</th>`;
//     });

//     // Fill remaining cells
//     if (headerChunk.length < 8) {
//       Array.from({ length: 8 - headerChunk.length }).forEach(() => {
//         repeatingHeaderHTML += `<th></th>`;
//       });
//     }

//     repeatingHeaderHTML += `</tr>`;
//   });

//   repeatingHeaderHTML += `</thead>`;

//   // Add the headers to the table
//   departmentHTML += titleHTML + repeatingHeaderHTML;

//   // Generate table body with improved page break logic
//   departmentHTML += `<tbody>`;

//   let currentRowCount = 0;
//   deptData.records.forEach((record, recordIndex) => {
//     headerChunks.forEach((headerChunk, chunkIndex) => {
//       const rowClass = recordIndex % 2 === 0 ? 'data-row-even' : 'data-row-odd';

//       // Improved page break logic - only break when we have sufficient rows
//       // and we're not near the end of the dataset
//       const remainingRows = (deptData.records.length - recordIndex) * headerChunks.length;
//       const shouldBreakBefore = currentRowCount > 0 &&
//                                currentRowCount % ROWS_PER_PAGE === 0 &&
//                                remainingRows > 10 && // Only break if we have more than 10 rows left
//                                recordIndex > 0; // Never break on the first record

//       departmentHTML += `<tr class="${rowClass}${shouldBreakBefore ? ' internal-page-break' : ''}">`;

//       // Fixed columns data
//       if (chunkIndex === 0) {
//         departmentHTML += `<td style="text-align: center;">${record['S/N']}</td>`;
//         departmentHTML += `<td class="name-cell">${record['Name'] || record['name'] || 'N/A'}</td>`;
//         departmentHTML += `<td style="text-align: center;">${record['Empno'] || record['empno'] || record['EMPNO'] || 'N/A'}</td>`;
//         const gradeStep = record['Grd'] && record['Stp'] ?
//           `${record['Grd']}/${record['Stp']}` :
//           (record['Grade'] || record['Grade'] === 0) && (record['Step'] || record['Step'] === 0) ?
//           `${record['Grade']}/${record['Step']}` : 'N/A';
//         departmentHTML += `<td style="text-align: center;">${gradeStep}</td>`;
//       } else {
//         fixedColumns.forEach(() => {
//           departmentHTML += `<td></td>`;
//         });
//       }

//       // Dynamic data
//       headerChunk.forEach(header => {
//         const value = record[header] === 0 ? 0 : record[header] || 'N/A';
//         const isNumeric = header === 'Net' || header.toLowerCase().includes('net') ||
//                          header.toLowerCase().includes('amount') || header.toLowerCase().includes('salary') ||
//                          (Number.isFinite(Number(record[header])) && record[header] != 0);

//         const displayValue = isNumeric ? formatNumberWithComma(value) : value;
//         departmentHTML += `<td style="text-align: center;">${displayValue}</td>`;
//       });

//       // Fill remaining cells
//       if (headerChunk.length < 8) {
//         Array.from({ length: 8 - headerChunk.length }).forEach(() => {
//           departmentHTML += `<td></td>`;
//         });
//       }

//       departmentHTML += `</tr>`;
//       currentRowCount++;
//     });
//   });

//   departmentHTML += `</tbody>`;

//   // Footer with totals (non-repeating, appears only at the end)
//   departmentHTML += `
//     <tfoot>
//       <tr class="total-row">
//         <td colspan="${maxColumnsPerRow}" style="text-align: left; padding: 10px;">
//           <div style="display: flex; gap: 20px; width: 100%; justify-content: left;">
//             <span>
//               <span style="color: #374151; font-weight: 600;">Total Gross:</span> ${formatNumberWithComma(deptData.totalGross)}
//             </span>
//             <span>
//               <span style="color: #374151; font-weight: 600;">Total Deduction:</span> ${formatNumberWithComma(deptData.totalDeduction)}
//             </span>
//             <span>
//               <span style="color: #374151; font-weight: 600;">Total Net:</span> ${formatNumberWithComma(deptData.totalNet)}
//             </span>
//           </div>
//         </td>
//       </tr>
//       ${isLastCurrentDept ? `
//       <tr class="total-row">
//         <td colspan="${maxColumnsPerRow}" style="text-align: left; padding: 10px; background-color: #e3f2fd; font-weight: 600;">
//           (${hqData.headquarter})
//            <div style="display: flex; gap: 20px; width: 100%; justify-content: left; margin-top: 4px;">
//             <span>
//               <span style="color: #374151; font-weight: 600;">Total Gross:</span> ${formatNumberWithComma(hqData.totalGross)}
//             </span>
//             <span>
//               <span style="color: #374151; font-weight: 600;">Total Deduction:</span> ${formatNumberWithComma(hqData.totalDeduction)}
//             </span>
//             <span>
//               <span style="color: #374151; font-weight: 600;">Total Net:</span> ${formatNumberWithComma(hqData.totalNet)}
//             </span>
//           </div>
//         </td>
//       </tr>
//       ` : ''}
//     </tfoot>
//   `;

//   departmentHTML += `
//       </table>
//     </div>
//   `;

//   return departmentHTML;
// };

// v2 work but minor issue
// Function to generate HTML for printing with repeating headers
// const generatePrintHTMLWithRepeatingHeaders = (processedData, overallTotal, overallGrossTotal, overallDeductionTotal, totalStaffCount, title) => {
//   let htmlContent = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <title>${title}</title>
//       <style>
//         @media print {
//           @page {
//             margin: 0.5in;
//             size: landscape;
//           }
//         }

//         body {
//           font-family: Arial, sans-serif;
//           margin: 0;
//           padding: 20px;
//         }

//         .department-table {
//           width: 100%;
//           border-collapse: collapse;
//           margin-bottom: 20px;
//         }

//         .department-table th,
//         .department-table td {
//           border: 1px solid #d1d5db;
//           padding: 6px 8px;
//           font-size: 8px;
//           text-align: left;
//         }

//         .header-row,
//         .header-row-alt {
//           background-color: #374151;
//           color: white;
//           font-weight: bold;
//         }

//         .header-row th,
//         .header-row-alt th {
//           border-color: #6b7280;
//         }

//         .hq-title {
//           font-size: 14px;
//           font-weight: bold;
//           text-align: center;
//           background-color: #e0e0e0;
//           width: 100%;
//         }

//         .dept-title {
//           font-size: 12px;
//           font-weight: bold;
//           text-align: center;
//           background-color: #f5f5f5;
//         }

//         .total-row {
//           background-color: #ffffcc;
//           font-weight: bold;
//         }

//         .data-row-even {
//           background-color: #f3f4f6;
//         }

//         .data-row-odd {
//           background-color: #ffffff;
//         }

//         .name-cell {
//           white-space: normal;
//           word-wrap: break-word;
//           max-width: 150px;
//         }

//         /* Ensure each department gets its own page */
//         .department-container {
//           page-break-before: always;
//           page-break-after: always;
//           min-height: 100vh;
//         }

//         .department-container:first-child {
//           page-break-before: auto;
//         }

//         .page-break-before {
//           page-break-before: always;
//         }

//         .avoid-break {
//           page-break-inside: avoid;
//         }

//         /* Ensure header rows repeat on new pages */
//         thead {
//           display: table-header-group;
//         }

//         tbody {
//           display: table-row-group;
//         }
//       </style>
//     </head>
//     <body>
//   `;

//   // Generate content for each department with repeating headers
//   processedData.forEach((hqData, hqIndex) => {
//     hqData.departments.forEach((deptData, deptIndex) => {
//       let isFirstDept = deptIndex === 0;
//       let isLastCurrentDept = deptIndex === processedData[hqIndex].departments.length - 1;
//       htmlContent += generateDepartmentHTMLWithRepeatingHeaders(hqData, deptData, title, isFirstDept, isLastCurrentDept);
//     });
//   });

//   // Add grand totals
//   htmlContent += `
//     <div style="margin-top: 30px; padding: 20px; border: 2px solid #333; page-break-before: always;">
//       <h2 style="text-align: center; margin-bottom: 10px;">GRAND TOTALS</h2>
//       <p style="font-size: 16px; font-weight: bold;">Overall Grand Gross Total: ${formatNumberWithComma(overallGrossTotal)}</p>
//       <p style="font-size: 16px; font-weight: bold;">Overall Grand Deduction Total: ${formatNumberWithComma(overallDeductionTotal)}</p>
//       <p style="font-size: 16px; font-weight: bold;">Overall Grand Net Total: ${formatNumberWithComma(overallTotal)}</p>
//       <p style="font-size: 16px; font-weight: bold;">Total Staff Count: ${totalStaffCount}</p>
//     </div>
//   `;

//   htmlContent += `
//     </body>
//     </html>
//   `;

//   return htmlContent;
// };

// // Function to generate HTML for a single department with repeating headers
// const generateDepartmentHTMLWithRepeatingHeaders = (hqData, deptData, title, isFirstDept, isLastCurrentDept) => {
//   const fixedColumns = ['S/N', 'Name', 'Empno', 'Grade/Step'];
//   const headerChunks = chunkArray(deptData.headers, 8);
//   const maxColumnsPerRow = fixedColumns.length + 8;

//   // Calculate approximate rows per page (considering header size and margins)
//   const ROWS_PER_PAGE = 25; // Adjust based on your page size and row height
//   const totalDataRows = deptData.records.length * headerChunks.length;
//   const needsPageBreak = totalDataRows > ROWS_PER_PAGE;

//   let departmentHTML = `
//     <div style="page-break-before: ${isFirstDept ? 'auto' : 'always'}; page-break-after: always;">
//       <table class="department-table">
//   `;

//   // Generate table header that will repeat on each page
//   let headerHTML = `
//     <thead>
//       <!-- Headquarter Title Row -->
//       <tr style="${isFirstDept ? 'display:table-row' : 'display:none'}">
//         <td colspan="${maxColumnsPerRow}" class="hq-title">
//           ${hqData.headquarter}
//         </td>
//       </tr>

//       <!-- Department Title Row -->
//       <tr>
//         <td colspan="${maxColumnsPerRow}" class="dept-title">
//           ${deptData.department} - Total Records: ${deptData.records.length}
//         </td>
//       </tr>
//   `;

//   // Add header rows to thead
//   headerChunks.forEach((headerChunk, chunkIndex) => {
//     headerHTML += `<tr class="${chunkIndex === 0 ? 'header-row' : 'header-row-alt'}">`;

//     // Fixed columns
//     if (chunkIndex === 0) {
//       fixedColumns.forEach(fixedHeader => {
//         headerHTML += `<th>${fixedHeader.toUpperCase()}</th>`;
//       });
//     } else {
//       fixedColumns.forEach(() => {
//         headerHTML += `<th></th>`;
//       });
//     }

//     // Dynamic headers
//     headerChunk.forEach(header => {
//       headerHTML += `<th>${header.replaceAll("_", " ").toUpperCase()}</th>`;
//     });

//     // Fill remaining cells
//     if (headerChunk.length < 8) {
//       Array.from({ length: 8 - headerChunk.length }).forEach(() => {
//         headerHTML += `<th></th>`;
//       });
//     }

//     headerHTML += `</tr>`;
//   });

//   headerHTML += `</thead>`;

//   // Add the header to the table
//   departmentHTML += headerHTML;

//   // Generate table body
//   departmentHTML += `<tbody>`;

//   // Add data rows with strategic page breaks
//   let currentRowCount = 0;
//   deptData.records.forEach((record, recordIndex) => {
//     headerChunks.forEach((headerChunk, chunkIndex) => {
//       const rowClass = recordIndex % 2 === 0 ? 'data-row-even' : 'data-row-odd';

//       // Add page break class if we're approaching the row limit and not on the last few rows
//       // Only break within the same department, not between departments
//       const shouldBreakBefore = needsPageBreak &&
//                                currentRowCount > 0 &&
//                                currentRowCount % ROWS_PER_PAGE === 0 &&
//                                recordIndex < deptData.records.length - 3; // Leave more buffer to avoid breaking near end

//       departmentHTML += `<tr class="${rowClass}${shouldBreakBefore ? ' page-break-before' : ''}">`;

//       // Fixed columns data
//       if (chunkIndex === 0) {
//         departmentHTML += `<td style="text-align: center;">${record['S/N']}</td>`;
//         departmentHTML += `<td class="name-cell">${record['Name'] || record['name'] || 'N/A'}</td>`;
//         departmentHTML += `<td style="text-align: center;">${record['Empno'] || record['empno'] || record['EMPNO'] || 'N/A'}</td>`;
//         const gradeStep = record['Grd'] && record['Stp'] ?
//           `${record['Grd']}/${record['Stp']}` :
//           (record['Grade'] || record['Grade'] === 0) && (record['Step'] || record['Step'] === 0) ?
//           `${record['Grade']}/${record['Step']}` : 'N/A';
//         departmentHTML += `<td style="text-align: center;">${gradeStep}</td>`;
//       } else {
//         fixedColumns.forEach(() => {
//           departmentHTML += `<td></td>`;
//         });
//       }

//       // Dynamic data
//       headerChunk.forEach(header => {
//         const value = record[header] === 0 ? 0 : record[header] || 'N/A';
//         const isNumeric = header === 'Net' || header.toLowerCase().includes('net') ||
//                          header.toLowerCase().includes('amount') || header.toLowerCase().includes('salary') ||
//                          (Number.isFinite(Number(record[header])) && record[header] != 0);

//         const displayValue = isNumeric ? formatNumberWithComma(value) : value;
//         departmentHTML += `<td style="text-align: center;">${displayValue}</td>`;
//       });

//       // Fill remaining cells
//       if (headerChunk.length < 8) {
//         Array.from({ length: 8 - headerChunk.length }).forEach(() => {
//           departmentHTML += `<td></td>`;
//         });
//       }

//       departmentHTML += `</tr>`;
//       currentRowCount++;
//     });
//   });

//   departmentHTML += `</tbody>`;

//   // Add footer with totals (these will appear at the end of each table)
//   departmentHTML += `
//     <tfoot>
//       <tr class="total-row">
//         <td colspan="${maxColumnsPerRow}" style="text-align: left; padding: 10px;">
//           <div style="display: flex; gap: 20px; width: 100%; justify-content: left;">
//             <span>
//               <span style="color: #374151; font-weight: 600;">Total Gross:</span> ${formatNumberWithComma(deptData.totalGross)}
//             </span>
//             <span>
//               <span style="color: #374151; font-weight: 600;">Total Deduction:</span> ${formatNumberWithComma(deptData.totalDeduction)}
//             </span>
//             <span>
//               <span style="color: #374151; font-weight: 600;">Total Net:</span> ${formatNumberWithComma(deptData.totalNet)}
//             </span>
//           </div>
//         </td>
//       </tr>
//       <tr class="total-row" style="${isLastCurrentDept ? 'display: table-row' : 'display: none'}">
//         <td colspan="${maxColumnsPerRow}" style="text-align: left; padding: 10px; background-color: #e3f2fd; font-weight: 600;">
//           (${hqData.headquarter})
//            <div style="display: flex; gap: 20px; width: 100%; justify-content: left; margin-top: 4px;">
//             <span>
//               <span style="color: #374151; font-weight: 600;">Total Gross:</span> ${formatNumberWithComma(hqData.totalGross)}
//             </span>
//             <span>
//               <span style="color: #374151; font-weight: 600;">Total Deduction:</span> ${formatNumberWithComma(hqData.totalDeduction)}
//             </span>
//             <span>
//               <span style="color: #374151; font-weight: 600;">Total Net:</span> ${formatNumberWithComma(hqData.totalNet)}
//             </span>
//           </div>
//         </td>
//       </tr>
//     </tfoot>
//   `;

//   departmentHTML += `
//       </table>
//     </div>
//   `;

//   return departmentHTML;
// };

// V1!
// Function to generate HTML for printing
// const generatePrintHTML = (processedData, overallTotal, overallGrossTotal, overallDeductionTotal, totalStaffCount, title ) => {
//   let htmlContent = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <title>${title}</title>
//       <style>
//         @media print {
//           @page {
//             margin: 0.5in;
//             size: landscape;
//           }
//         }

//         body {
//           font-family: Arial, sans-serif;
//           margin: 0;
//           padding: 20px;
//         }
//         .block {
//           display:block;
//           width: 100%;

//         }

//         .none {
//           display:none
//         }

//         .department-page {
//           page-break-before: always;
//           page-break-after: always;
//           min-height: 100vh;
//         }

//         .department-page:first-child {
//           page-break-before: auto;
//         }

//         .complex-payroll-table {
//           width: 100%;
//           border-collapse: collapse;
//           margin-bottom: 20px;
//         }

//         .complex-payroll-table th,
//         .complex-payroll-table td {
//           border: 1px solid #d1d5db;
//           padding: 6px 8px;
//           font-size: 8px;
//           text-align: left;
//         }

//         .header-row,
//         .header-row-alt {
//           background-color: #374151;
//           color: white;
//           font-weight: bold;
//           }

//           .header-row th,
//           .header-row-alt th {
//             border-color: #6b7280;
//           }

//         .hq-title {
//           font-size: 14px;
//           font-weight: bold;
//           text-align: center;
//           background-color: #e0e0e0;
//           width:full;
//         }

//         .dept-title {
//           font-size: 12px;
//           font-weight: bold;
//           text-align: center;
//           background-color: #f5f5f5;
//         }

//         .total-row {
//           background-color: #ffffcc;
//           font-weight: bold;
//         }

//         .data-row-even {
//           background-color: #f3f4f6;
//         }

//         .data-row-odd {
//           background-color: #ffffff;
//         }

//         .name-cell {
//           white-space: normal;
//           word-wrap: break-word;
//           max-width: 150px;
//         }
//       </style>
//     </head>
//     <body>
//   `;

//   // Generate content for each department
//   processedData.forEach((hqData, hqIndex) => {
//     hqData.departments.forEach((deptData, deptIndex) => {
//       let isFirstDept = deptIndex === 0
//       let isLastCurrentDept = deptIndex === processedData[hqIndex].departments.length -1
//       htmlContent += generateDepartmentHTML(hqData, deptData, title, isFirstDept, isLastCurrentDept);
//     });
//   });

//   // Add grand totals
//   htmlContent += `
//     <div style="margin-top: 30px; padding: 20px; border: 2px solid #333;">
//       <h2 style="text-align: center; margin-bottom: 10px;">GRAND TOTALS</h2>
//       <p style="font-size: 16px; font-weight: bold;">Overall Grand Gross Total: ${formatNumberWithComma(overallGrossTotal)}</p>
//       <p style="font-size: 16px; font-weight: bold;">Overall Grand Deduction Total: ${formatNumberWithComma(overallDeductionTotal)}</p>
//       <p style="font-size: 16px; font-weight: bold;">Overall Grand Net Total: ${formatNumberWithComma(overallTotal)}</p>
//       <p style="font-size: 16px; font-weight: bold;">Total Staff Count: ${totalStaffCount}</p>
//     </div>
//   `;

//   htmlContent += `
//     </body>
//     </html>
//   `;

//   return htmlContent;
// };

// // Function to generate HTML for a single department
// const generateDepartmentHTML = (hqData, deptData, title, isFirstDept, isLastCurrentDept) => {
//   const fixedColumns = ['S/N', 'Name', 'Empno', 'Grade/Step'];
//   const headerChunks = chunkArray(deptData.headers, 8);
//   const maxColumnsPerRow = fixedColumns.length + 8;

//   let departmentHTML = `
//     <div class="department-page">
//       <table class="complex-payroll-table">
//         <tbody>

//           <!-- Headquarter Title Row -->
//           <tr style="${isFirstDept ? 'display:table-row' : 'display:none'}">
//             <td colspan="${maxColumnsPerRow}" class="hq-title">
//               ${hqData.headquarter}
//             </td>
//           </tr>

//           <!-- Department Title Row -->
//           <tr>
//             <td colspan="${maxColumnsPerRow}" class="dept-title">
//               ${deptData.department} - Total Records: ${deptData.records.length}
//             </td>
//           </tr>
//   `;

//   // Add header rows
//   headerChunks.forEach((headerChunk, chunkIndex) => {
//     departmentHTML += `<tr class="${chunkIndex === 0 ? 'header-row' : 'header-row-alt'}">`;

//     // Fixed columns
//     if (chunkIndex === 0) {
//       fixedColumns.forEach(fixedHeader => {
//         departmentHTML += `<th>${fixedHeader.toUpperCase()}</th>`;
//       });
//     } else {
//       fixedColumns.forEach(() => {
//         departmentHTML += `<th></th>`;
//       });
//     }

//     // Dynamic headers
//     headerChunk.forEach(header => {
//       departmentHTML += `<th>${header.replaceAll("_", " ").toUpperCase()}</th>`;
//     });

//     // Fill remaining cells
//     if (headerChunk.length < 8) {
//       Array.from({ length: 8 - headerChunk.length }).forEach(() => {
//         departmentHTML += `<th></th>`;
//       });
//     }

//     departmentHTML += `</tr>`;
//   });

//   // Add data rows
//   deptData.records.forEach((record, recordIndex) => {
//     headerChunks.forEach((headerChunk, chunkIndex) => {
//       const rowClass = recordIndex % 2 === 0 ? 'data-row-even' : 'data-row-odd';
//       departmentHTML += `<tr class="${rowClass}">`;

//       // Fixed columns data
//       if (chunkIndex === 0) {
//         departmentHTML += `<td style="text-align: center;">${record['S/N']}</td>`;
//         departmentHTML += `<td class="name-cell">${record['Name'] || record['name'] || 'N/A'}</td>`;
//         departmentHTML += `<td style="text-align: center;">${record['Empno'] || record['empno'] || record['EMPNO'] || 'N/A'}</td>`;
//         const gradeStep = record['Grd'] && record['Stp'] ?
//           `${record['Grd']}/${record['Stp']}` :
//           record['Grade'] && record['Step'] ?
//           `${record['Grade']}/${record['Step']}` : 'N/A';
//         departmentHTML += `<td style="text-align: center;">${gradeStep}</td>`;
//       } else {
//         fixedColumns.forEach(() => {
//           departmentHTML += `<td></td>`;
//         });
//       }

//       // Dynamic data
//       headerChunk.forEach(header => {
//         const value = record[header] === 0 ? 0 : record[header] || 'N/A';
//         const isNumeric = header === 'Net' || header.toLowerCase().includes('net') ||
//                          header.toLowerCase().includes('amount') || header.toLowerCase().includes('salary') ||
//                          header === 'Net' || header.toLowerCase().includes('net') ||
//                         header.toLowerCase().includes('amount') || header.toLowerCase().includes('salary') ||
//                         (Number.isFinite(Number(record[header])) && record[header] != 0)

//         const displayValue = isNumeric ? formatNumberWithComma(value) : value;
//         departmentHTML += `<td style="text-align: center;">${displayValue}</td>`;
//       });

//       // Fill remaining cells
//       if (headerChunk.length < 8) {
//         Array.from({ length: 8 - headerChunk.length }).forEach(() => {
//           departmentHTML += `<td></td>`;
//         });
//       }

//       departmentHTML += `</tr>`;
//     });
//   });

//   //  Department Net Total (${deptData.department}): ${formatNumberWithComma(deptData.totalNet)} | Staff Count: ${deptData.staffCount}

//   // Add totals
//   departmentHTML += `
//     <tr class="total-row">
//       <td colspan="${maxColumnsPerRow}" style="text-align: left; padding: 10px;">
//         <div style="display: flex; gap: 20px; width: 100%; justify-content: left;">
//           <span>
//             <span style="color: #374151; font-weight: 600;">Total Gross:</span> ${formatNumberWithComma(deptData.totalGross)}
//           </span>
//           <span>
//             <span style="color: #374151; font-weight: 600;">Total Deduction:</span> ${formatNumberWithComma(deptData.totalDeduction)}
//           </span>
//           <span>
//             <span style="color: #374151; font-weight: 600;">Total Net:</span> ${formatNumberWithComma(deptData.totalNet)}
//           </span>
//         </div>
//       </td>
//     </tr>
//     <tr class="total-row" style="${isLastCurrentDept ? 'display: table-row' : 'display: none'}">
//       <td colspan="${maxColumnsPerRow}" style="text-align: left; padding: 10px; background-color: #e3f2fd; font-weight: 600;">
//         (${hqData.headquarter})
//          <div style="display: flex; gap: 20px; width: 100%; justify-content: left; margin-top:1">
//           <span>
//             <span style="color: #374151; font-weight: 600;">Total Gross:</span> ${formatNumberWithComma(hqData.totalGross)}
//           </span>
//           <span>
//             <span style="color: #374151; font-weight: 600;">Total Deduction:</span> ${formatNumberWithComma(hqData.totalDeduction)}
//           </span>
//           <span>
//             <span style="color: #374151; font-weight: 600;">Total Net:</span> ${formatNumberWithComma(hqData.totalNet)}
//           </span>
//         </div>
//       </td>
//     </tr>

//   </tbody>
//   </table>
//     </div>
//   `;

//   return departmentHTML;
// };

// @media print and (min-height:335mm) and (max-height: 305mm) {
//     .chrome.container::before {
//         content: "EXECUTIVE";
//     }
//     .page-break	{
//     display: block; page-break-before: always;
//     };

//      thead {
//         display: table-header-group;
//       };
// }

// *************** complex table V3 ***************
// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// import { useMemo, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableColumn,
//   TableHeader,
//   TableRow,
// } from "@nextui-org/react";
// import { formatNumberWithComma } from "../../../utils/utitlities";
// import ActionButton from "../../forms/FormElements/ActionButton";
// import { MdOutlineFileDownload, MdPrint } from "react-icons/md";
// import propType from "prop-types";
// import * as XLSX from "xlsx";

// // Utility function to chunk array into groups of specified size
// const chunkArray = (array, chunkSize) => {
//   const chunks = [];
//   for (let i = 0; i < array.length; i += chunkSize) {
//     chunks.push(array.slice(i, i + chunkSize));
//   }
//   return chunks;
// };

// // Function to process complex data structure
// function processComplexData(complexData) {
//   const processedData = [];
//   let totalStaffCount = 0;

//   Object.keys(complexData).forEach(headquarter => {
//     const headquarterData = {
//       headquarter: headquarter.trim(),
//       departments: [],
//       totalNet: 0,
//       staffCount: 0
//     };

//     Object.keys(complexData[headquarter]).forEach(department => {
//       const departmentData = {
//         department: department.trim(),
//         records: [],
//         totalNet: 0,
//         headers: [],
//         staffCount: 0
//       };

//       // Extract records from department (ignore the keys like "P2271")
//       const departmentRecords = complexData[headquarter][department];
//       const recordsArray = Object.values(departmentRecords);

//       // Get unique headers for this department, excluding fixed columns and Grade/Step related fields
//       const fixedColumns = ['S/N', 'Name', 'Empno', 'Grade/Step'];
//       const excludedFields = ['Grd', 'Stp', 'Grade', 'Step']; // These should not appear as separate columns
//       const departmentHeaders = new Set();
//       recordsArray.forEach(record => {
//         Object.keys(record).forEach(key => {
//           // Skip if it's a fixed column or excluded field
//           const isFixedColumn = fixedColumns.some(fixed =>
//             key.toLowerCase().includes(fixed.toLowerCase()) ||
//             fixed.toLowerCase().includes(key.toLowerCase())
//           );
//           const isExcludedField = excludedFields.some(excluded =>
//             key.toLowerCase() === excluded.toLowerCase()
//           );

//           if (!isFixedColumn && !isExcludedField) {
//             departmentHeaders.add(key);
//           }
//         });
//       });

//       departmentData.headers = Array.from(departmentHeaders);
//       departmentData.records = recordsArray.map((record, index) => ({
//         ...record,
//         'S/N': index + 1
//       }));
//       departmentData.staffCount = recordsArray.length;

//       // Calculate department total
//       recordsArray.forEach(record => {
//         departmentData.totalNet += parseFloat(record.Net || 0);
//       });

//       headquarterData.departments.push(departmentData);
//       headquarterData.totalNet += departmentData.totalNet;
//       headquarterData.staffCount += departmentData.staffCount;
//     });

//     processedData.push(headquarterData);
//     totalStaffCount += headquarterData.staffCount;
//   });

//   return { processedData, totalStaffCount };
// }

// // Function to prepare Excel data
// function prepareExcelData(processedData) {
//   const excelData = [];

//   processedData.forEach(hqData => {
//     hqData.departments.forEach(deptData => {
//       // Add headquarter and department headers
//       excelData.push({
//         'Headquarter': hqData.headquarter,
//         'Department': deptData.department,
//         'Total Records': deptData.records.length,
//         'Department Total': deptData.totalNet
//       });

//       // Add empty row for spacing
//       excelData.push({});

//       // Add data records with all keys as headers (no fixed columns for Excel)
//       deptData.records.forEach(record => {
//         const excelRecord = {};

//         // Add all record keys as headers (no exclusions for Excel)
//         Object.keys(record).forEach(key => {
//           excelRecord[key.replaceAll("_", " ").toUpperCase()] = record[key];
//         });

//         excelData.push(excelRecord);
//       });

//       // Add department total row
//       excelData.push({
//         'SUMMARY': `Department Total: ${formatNumberWithComma(deptData.totalNet)} | Staff Count: ${deptData.staffCount}`
//       });

//       // Add spacing between departments
//       excelData.push({});
//       excelData.push({});
//     });

//     // Add headquarter summary
//     excelData.push({
//       'HEADQUARTER SUMMARY': `${hqData.headquarter} Total: ${formatNumberWithComma(hqData.totalNet)} | Staff Count: ${hqData.staffCount}`
//     });

//     excelData.push({});
//     excelData.push({});
//   });

//   return excelData;
// }

// // Main component for handling complex payroll data
// const ComplexPayrollReportTable = ({ tableData }) => {
//   const [isPrintMode, setIsPrintMode] = useState(false);

//   const { processedData, totalStaffCount } = useMemo(() => {
//     return processComplexData(tableData);
//   }, [tableData]);

//   // Calculate overall total
//   const overallTotal = useMemo(() => {
//     return processedData.reduce((total, hq) => total + hq.totalNet, 0);
//   }, [processedData]);

//   // Enhanced print function for drawer compatibility
//   const handlePrintAll = () => {
//     setIsPrintMode(true);

//     // Create a new window for printing to avoid drawer conflicts
//     const printWindow = window.open('', '_blank', 'width=1200,height=800');

//     // Generate the print content
//     const printContent = generatePrintContent();

//     printWindow.document.write(`
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <title>Complex Payroll Report</title>
//           <style>
//             body {
//               font-family: Arial, sans-serif;
//               margin: 0;
//               padding: 20px;
//               font-size: 12px;
//             }

//             .department-page {
//               page-break-before: always;
//               page-break-after: always;
//               min-height: 100vh;
//               margin-bottom: 40px;
//             }

//             .department-page:first-child {
//               page-break-before: auto;
//             }

//             .complex-payroll-table {
//               width: 100%;
//               border-collapse: collapse;
//               margin-bottom: 20px;
//             }

//             .complex-payroll-table th,
//             .complex-payroll-table td {
//               border: 1px solid #000;
//               padding: 6px 8px;
//               font-size: 8px;
//               text-align: left;
//               vertical-align: top;
//             }

//             .header-row {
//               background-color: #374151;
//               color: white;
//               font-weight: bold;
//             }

//             .header-row-alt {
//               background-color: #4b5563;
//               color: white;
//               font-weight: bold;
//             }

//             .hq-title {
//               font-size: 14px;
//               font-weight: bold;
//               text-align: center;
//               background-color: #e5e7eb;
//               padding: 10px;
//             }

//             .dept-title {
//               font-size: 12px;
//               font-weight: bold;
//               text-align: center;
//               background-color: #f3f4f6;
//               padding: 8px;
//             }

//             .total-row {
//               background-color: #fef3c7;
//               font-weight: bold;
//             }

//             .data-row-even {
//               background-color: #f9fafb;
//             }

//             .data-row-odd {
//               background-color: #ffffff;
//             }

//             .name-cell {
//               white-space: normal;
//               word-wrap: break-word;
//               max-width: 150px;
//             }

//             @page {
//               margin: 0.5in;
//               size: landscape;
//             }

//             @media print {
//               .department-page {
//                 page-break-before: always;
//                 page-break-after: always;
//               }
//             }
//           </style>
//         </head>
//         <body>
//           ${printContent}
//         </body>
//       </html>
//     `);

//     printWindow.document.close();

//     // Wait for content to load then print
//     setTimeout(() => {
//       printWindow.focus();
//       printWindow.print();
//       printWindow.close();
//       setIsPrintMode(false);
//     }, 500);
//   };

//   // Generate print content HTML
//   const generatePrintContent = () => {
//     let content = '';

//     processedData.forEach((hqData, hqIndex) => {
//       hqData.departments.forEach((deptData, deptIndex) => {
//         content += `
//           <div class="department-page">
//             ${generateDepartmentTableHTML(hqData.headquarter, deptData, hqData.totalNet)}
//           </div>
//         `;
//       });
//     });

//     return content;
//   };

//   // Generate individual department table HTML
//   const generateDepartmentTableHTML = (headquarter, department, headquarterTotal) => {
//     const fixedColumns = ['S/N', 'Name', 'Empno', 'Grade/Step'];
//     const headerChunks = chunkArray(department.headers, 8);
//     const maxColumnsPerRow = fixedColumns.length + 8;

//     let tableHTML = `
//       <table class="complex-payroll-table">
//         <tbody>
//           <tr>
//             <td colspan="${maxColumnsPerRow}" class="hq-title">
//               ${headquarter}
//             </td>
//           </tr>
//           <tr>
//             <td colspan="${maxColumnsPerRow}" class="dept-title">
//               ${department.department} - Total Records: ${department.records.length}
//             </td>
//           </tr>
//     `;

//     // Header rows
//     headerChunks.forEach((headerChunk, chunkIndex) => {
//       tableHTML += `<tr class="${chunkIndex === 0 ? 'header-row' : 'header-row-alt'}">`;

//       if (chunkIndex === 0) {
//         fixedColumns.forEach(fixedHeader => {
//           tableHTML += `<th>${fixedHeader.toUpperCase()}</th>`;
//         });
//       } else {
//         fixedColumns.forEach(() => {
//           tableHTML += `<th></th>`;
//         });
//       }

//       headerChunk.forEach(header => {
//         tableHTML += `<th>${header?.replaceAll("_", " ")?.toUpperCase()}</th>`;
//       });

//       // Fill remaining cells
//       for (let i = headerChunk.length; i < 8; i++) {
//         tableHTML += `<th></th>`;
//       }

//       tableHTML += `</tr>`;
//     });

//     // Data rows
//     department.records.forEach((record, recordIndex) => {
//       headerChunks.forEach((headerChunk, chunkIndex) => {
//         tableHTML += `<tr class="${recordIndex % 2 === 0 ? 'data-row-even' : 'data-row-odd'}">`;

//         if (chunkIndex === 0) {
//           tableHTML += `<td>${record['S/N']}</td>`;
//           tableHTML += `<td class="name-cell">${record['Name'] || record['name'] || 'N/A'}</td>`;
//           tableHTML += `<td>${record['Empno'] || record['empno'] || record['EMPNO'] || 'N/A'}</td>`;
//           tableHTML += `<td>${record['Grd'] && record['Stp'] ? `${record['Grd']}/${record['Stp']}` : 'N/A'}</td>`;
//         } else {
//           fixedColumns.forEach(() => {
//             tableHTML += `<td></td>`;
//           });
//         }

//         headerChunk.forEach(header => {
//           const value = record[header] || 'N/A';
//           const isNumeric = header === 'Net' || header.toLowerCase().includes('net') ||
//                            header.toLowerCase().includes('amount') || header.toLowerCase().includes('salary') ||
//                            header.toLowerCase().includes('gs') || header.toLowerCase().includes('cs') ||
//                            header.toLowerCase().includes('ice') || header.toLowerCase().includes('pin') ||
//                            header.toLowerCase().includes('ilw') || header.toLowerCase().includes('peon') ||
//                            header.toLowerCase().includes('pt') || header.toLowerCase().includes('nop') ||
//                            header.toLowerCase().includes('tx') || header.toLowerCase().includes('deion');

//           tableHTML += `<td>${isNumeric ? formatNumberWithComma(value) : value}</td>`;
//         });

//         // Fill remaining cells
//         for (let i = headerChunk.length; i < 8; i++) {
//           tableHTML += `<td></td>`;
//         }

//         tableHTML += `</tr>`;
//       });
//     });

//     // Total rows
//     tableHTML += `
//       <tr class="total-row">
//         <td colspan="${maxColumnsPerRow}">
//           Department Total (${department.department}): ${formatNumberWithComma(department.totalNet)} | Staff Count: ${department.staffCount}
//         </td>
//       </tr>
//       <tr class="total-row">
//         <td colspan="${maxColumnsPerRow}">
//           Headquarter Total (${headquarter}): ${formatNumberWithComma(headquarterTotal)}
//         </td>
//       </tr>
//     `;

//     tableHTML += `
//         </tbody>
//       </table>
//     `;

//     return tableHTML;
//   };

//   // Enhanced Excel export function
//   const exportToExcel = () => {
//     try {
//       const excelData = prepareExcelData(processedData);

//       // Create workbook and worksheet
//       const wb = XLSX.utils.book_new();
//       const ws = XLSX.utils.json_to_sheet(excelData);

//       // Auto-size columns
//       const colWidths = [];
//       const maxCols = Math.max(...excelData.map(row => Object.keys(row).length));

//       for (let i = 0; i < maxCols; i++) {
//         colWidths.push({ wch: 15 }); // Set minimum width
//       }

//       // Calculate optimal column widths
//       excelData.forEach(row => {
//         Object.keys(row).forEach((key, index) => {
//           const value = String(row[key] || '');
//           const width = Math.max(key.length, value.length) + 2;
//           if (colWidths[index] && width > colWidths[index].wch) {
//             colWidths[index].wch = Math.min(width, 50); // Cap at 50 characters
//           }
//         });
//       });

//       ws['!cols'] = colWidths;

//       // Add the worksheet to workbook
//       XLSX.utils.book_append_sheet(wb, ws, "Complex Payroll Report");

//       // Add summary worksheet
//       const summaryData = [
//         { 'Summary': 'Complex Payroll Report Summary' },
//         {},
//         { 'Total Headquarters': processedData.length },
//         { 'Total Departments': processedData.reduce((total, hq) => total + hq.departments.length, 0) },
//         { 'Total Staff Count': totalStaffCount },
//         { 'Overall Grand Total': formatNumberWithComma(overallTotal) },
//         {},
//         { 'Headquarter Breakdown': '' }
//       ];

//       processedData.forEach(hq => {
//         summaryData.push({
//           'Headquarter': hq.headquarter,
//           'Departments': hq.departments.length,
//           'Staff Count': hq.staffCount,
//           'Total Amount': formatNumberWithComma(hq.totalNet)
//         });
//       });

//       const summaryWs = XLSX.utils.json_to_sheet(summaryData);
//       summaryWs['!cols'] = [
//         { wch: 25 },
//         { wch: 15 },
//         { wch: 15 },
//         { wch: 20 }
//       ];

//       XLSX.utils.book_append_sheet(wb, summaryWs, "Summary");

//       // Generate filename with timestamp
//       const timestamp = new Date().toISOString().split('T')[0];
//       const filename = `Complex_Payroll_Report_${timestamp}.xlsx`;

//       // Save the file
//       XLSX.writeFile(wb, filename);

//       console.log("Excel export completed successfully!");

//     } catch (error) {
//       console.error("Error exporting to Excel:", error);
//       alert("Error exporting to Excel. Please try again.");
//     }
//   };

//   const TopContent = () => (
//     <div className="flex justify-end gap-2 mb-4 no-print">
//       <ActionButton
//         className="flex gap-1 items-center"
//         onClick={handlePrintAll}
//       >
//         <MdPrint size={16} /> Print All Departments
//       </ActionButton>
//       <ActionButton
//         className="flex gap-1 items-center"
//         onClick={exportToExcel}
//       >
//         Export as Excel <MdOutlineFileDownload size={20} />
//       </ActionButton>
//     </div>
//   );

//   return (
//     <>
//       <TopContent />

//       <div className={isPrintMode ? "print-container" : ""}>
//         {processedData.map((hqData, hqIndex) => (
//           <div key={hqIndex}>
//             {hqData.departments.map((deptData, deptIndex) => (
//               <div key={`${hqIndex}-${deptIndex}`} className="department-page">
//                 <DepartmentTable
//                   headquarter={hqData.headquarter}
//                   department={deptData}
//                   headquarterTotal={hqData.totalNet}
//                   overallTotal={overallTotal}
//                   totalStaffCount={totalStaffCount}
//                   isPrint={isPrintMode}
//                 />
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// // Separate component for rendering individual department tables
// const DepartmentTable = ({
//   headquarter,
//   department,
//   headquarterTotal,
//   overallTotal,
//   totalStaffCount,
//   isPrint
// }) => {
//   // Fixed columns that should remain single (keep Grade/Step as a combined column)
//   const fixedColumns = ['S/N', 'Name', 'Empno', 'Grade/Step'];

//   // Chunk only the non-fixed headers into groups of 8 (back to 8 since we have 4 fixed columns)
//   const headerChunks = useMemo(() => {
//     return chunkArray(department.headers, 8);
//   }, [department.headers]);

//   // Calculate total columns needed for each row
//   const maxColumnsPerRow = fixedColumns.length + 8;

//   return (
//     <div className={`bg-white shadow-sm border border-gray-100 rounded-[14px] p-4 mb-6 ${isPrint ? 'department-content' : ''}`}>

//       <div className="overflow-x-auto">
//         <table className="complex-payroll-table w-full border-collapse">
//           <tbody>
//             {/* Headquarter Title Row */}
//             <tr>
//               <td
//                 colSpan={maxColumnsPerRow}
//                 className="hq-title border border-gray-300 px-4 py-3 bg-gray-200 font-bold text-center text-lg"
//               >
//                 {headquarter}
//               </td>
//             </tr>

//             {/* Department Title Row with Record Count */}
//             <tr>
//               <td
//                 colSpan={maxColumnsPerRow}
//                 className="dept-title border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-center"
//               >
//                 {department.department} - Total Records: {department.records.length}
//               </td>
//             </tr>

//             {/* Multi-row Headers - Fixed columns only in first row */}
//             {headerChunks.map((headerChunk, chunkIndex) => (
//               <tr key={`header-chunk-${chunkIndex}`} className={chunkIndex === 0 ? "header-row" : "header-row-alt"}>
//                 {/* Fixed columns only in the first header row */}
//                 {chunkIndex === 0 ? (
//                   fixedColumns.map((fixedHeader, fixedIndex) => (
//                     <th
//                       key={`fixed-header-${fixedIndex}`}
//                       className="border border-gray-500 px-3 py-2 bg-[#374151] text-white font-bold text-center text-xs min-w-[80px]"
//                     >
//                       {fixedHeader.toUpperCase()}
//                     </th>
//                   ))
//                 ) : (
//                   // Empty cells for subsequent header rows with matching header styling
//                   fixedColumns.map((_, fixedIndex) => (
//                     <th
//                       key={`empty-fixed-header-${chunkIndex}-${fixedIndex}`}
//                       className="border border-gray-500 px-3 py-2 bg-[#374151] text-white min-w-[80px]"
//                     >
//                     </th>
//                   ))
//                 )}

//                 {/* Dynamic headers for this chunk */}
//                 {headerChunk.map((header, headerIndex) => (
//                   <th
//                     key={`header-${chunkIndex}-${headerIndex}`}
//                     className={`border border-gray-500 px-2 py-2 font-bold text-center text-xs min-w-[70px] text-white ${
//                         "bg-[#374151]"
//                     //   chunkIndex === 0 ? 'bg-blue-700' : 'bg-blue-600'
//                     }`}
//                   >
//                     {header?.replaceAll("_", " ")?.toUpperCase()}
//                   </th>
//                 ))}

//                 {/* Fill remaining cells if this chunk is smaller than 8 */}
//                 {headerChunk.length < 8 &&
//                   Array.from({ length: 8 - headerChunk.length }).map((_, emptyIndex) => (
//                     <th
//                       key={`empty-header-${chunkIndex}-${emptyIndex}`}
//                       className={`border border-gray-500 px-2 py-2 ${
//                         "bg-[#374151]"
//                         // chunkIndex === 0 ? 'bg-blue-700' : 'bg-blue-600'
//                       }`}
//                     >
//                     </th>
//                   ))
//                 }
//               </tr>
//             ))}

//             {/* Data Rows - Each record spans multiple rows based on header chunks */}
//             {department.records.map((record, recordIndex) => (
//               headerChunks.map((headerChunk, chunkIndex) => (
//                 <tr
//                   key={`record-${recordIndex}-chunk-${chunkIndex}`}
//                   className={`
//                     ${chunkIndex === headerChunks.length - 1 ? 'border-b-2 border-gray-400' : ''}
//                     ${recordIndex % 2 === 0 ? 'data-row-even bg-gray-50' : 'data-row-odd bg-white'}
//                   `}
//                 >
//                   {/* Fixed columns data - only show in first chunk row */}
//                   {chunkIndex === 0 ? (
//                     <>
//                       <td className="border border-gray-300 px-3 py-2 text-center text-xs font-medium">
//                         {record['S/N']}
//                       </td>
//                       <td className="border border-gray-300 px-3 py-2 text-left text-xs name-cell whitespace-normal break-words min-w-[120px]">
//                         {record['Name'] || record['name'] || 'N/A'}
//                       </td>
//                       <td className="border border-gray-300 px-3 py-2 text-center text-xs font-medium">
//                         {record['Empno'] || record['empno'] || record['EMPNO'] || 'N/A'}
//                       </td>
//                       <td className="border border-gray-300 px-3 py-2 text-center text-xs font-medium">
//                         {record['Grd'] && record['Stp'] ?
//                           `${record['Grd']}/${record['Stp']}` :
//                           record['Grade'] && record['Step'] ?
//                           `${record['Grade']}/${record['Step']}` : 'N/A'
//                         }
//                       </td>
//                     </>
//                   ) : (
//                     // Empty cells for subsequent data rows
//                     fixedColumns.map((_, fixedIndex) => (
//                       <td
//                         key={`empty-fixed-data-${recordIndex}-${chunkIndex}-${fixedIndex}`}
//                         className="border border-gray-300 px-3 py-2 min-w-[80px]"
//                       >
//                       </td>
//                     ))
//                   )}

//                   {/* Dynamic data for this chunk */}
//                   {headerChunk.map((header, headerIndex) => (
//                     <td
//                       key={`data-${recordIndex}-${chunkIndex}-${headerIndex}`}
//                       className="border border-gray-300 px-2 py-2 text-center text-xs"
//                     >
//                       {header === 'Net' || header.toLowerCase().includes('net') ||
//                        header.toLowerCase().includes('amount') || header.toLowerCase().includes('salary') ||
//                        header.toLowerCase().includes('gs') || header.toLowerCase().includes('cs') ||
//                        header.toLowerCase().includes('ice') || header.toLowerCase().includes('pin') ||
//                        header.toLowerCase().includes('ilw') || header.toLowerCase().includes('peon') ||
//                        header.toLowerCase().includes('pt') || header.toLowerCase().includes('nop') ||
//                        header.toLowerCase().includes('tx') || header.toLowerCase().includes('deion')
//                         ? formatNumberWithComma(record[header] || 0)
//                         : (record[header] || 'N/A')
//                       }
//                     </td>
//                   ))}

//                   {/* Fill remaining cells if this chunk is smaller than 8 */}
//                   {headerChunk.length < 8 &&
//                     Array.from({ length: 8 - headerChunk.length }).map((_, emptyIndex) => (
//                       <td
//                         key={`empty-data-${recordIndex}-${chunkIndex}-${emptyIndex}`}
//                         className="border border-gray-300 px-2 py-2"
//                       >
//                       </td>
//                     ))
//                   }
//                 </tr>
//               ))
//             ))}

//             {/* Department Total Row */}
//             <tr className="total-row">
//               <td
//                 colSpan={maxColumnsPerRow}
//                 className="border border-gray-300 px-4 py-3 bg-yellow-100 font-bold text-center text-sm"
//               >
//                 Department Total ({department.department}): {formatNumberWithComma(department.totalNet)} | Staff Count: {department.staffCount}
//               </td>
//             </tr>

//             {/* Headquarter Total Row */}
//             <tr className="total-row">
//               <td
//                 colSpan={maxColumnsPerRow}
//                 className="border border-gray-300 px-4 py-3 bg-blue-100 font-bold text-center text-sm"
//               >
//                 Headquarter Total ({headquarter}): {formatNumberWithComma(headquarterTotal)}
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       {/* Overall Grand Total and Staff Sum - Show on last department */}
//       {!isPrint && (
//         <div className="mt-4 space-y-2">
//           <div className="p-3 bg-green-50 rounded border-l-4 border-green-400">
//             <div className="flex justify-between items-center">
//               <span className="font-semibold text-gray-700">Overall Grand Total:</span>
//               <span className="font-bold text-xl text-green-700">
//                 {formatNumberWithComma(overallTotal)}
//               </span>
//             </div>
//           </div>
//           <div className="p-3 bg-purple-50 rounded border-l-4 border-purple-400">
//             <div className="flex justify-between items-center">
//               <span className="font-semibold text-gray-700">Total Staff Count:</span>
//               <span className="font-bold text-xl text-purple-700">
//                 {totalStaffCount}
//               </span>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// DepartmentTable.propTypes = {
//   headquarter: propType.string,
//   department: propType.object,
//   headquarterTotal: propType.number,
//   overallTotal: propType.number,
//   totalStaffCount: propType.number,
//   isPrint: propType.bool
// };

// export default ComplexPayrollReportTable;

// *************** complex table V3 ***************
// /* eslint-disable no-unused-vars */

// /* eslint-disable react/prop-types */
// import { useMemo, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableColumn,
//   TableHeader,
//   TableRow,
// } from "@nextui-org/react";
// import { formatNumberWithComma } from "../../../utils/utitlities";
// import ActionButton from "../../forms/FormElements/ActionButton";
// import { MdOutlineFileDownload, MdPrint } from "react-icons/md";
// import propType from "prop-types";

// // Utility function to chunk array into groups of specified size
// const chunkArray = (array, chunkSize) => {
//   const chunks = [];
//   for (let i = 0; i < array.length; i += chunkSize) {
//     chunks.push(array.slice(i, i + chunkSize));
//   }
//   return chunks;
// };

// // Function to process complex data structure
// function processComplexData(complexData) {
//   const processedData = [];
//   let totalStaffCount = 0;

//   Object.keys(complexData).forEach(headquarter => {
//     const headquarterData = {
//       headquarter: headquarter.trim(),
//       departments: [],
//       totalNet: 0,
//       staffCount: 0
//     };

//     Object.keys(complexData[headquarter]).forEach(department => {
//       const departmentData = {
//         department: department.trim(),
//         records: [],
//         totalNet: 0,
//         headers: [],
//         staffCount: 0
//       };

//       // Extract records from department (ignore the keys like "P2271")
//       const departmentRecords = complexData[headquarter][department];
//       const recordsArray = Object.values(departmentRecords);

//       // Get unique headers for this department, excluding fixed columns
//       const fixedColumns = ['S/N', 'Name', 'Empno', 'Grd', 'Stp'];
//       const departmentHeaders = new Set();
//       recordsArray.forEach(record => {
//         Object.keys(record).forEach(key => {
//           if (!fixedColumns.some(fixed =>
//             key.toLowerCase().includes(fixed.toLowerCase()) ||
//             fixed.toLowerCase().includes(key.toLowerCase())
//           )) {
//             departmentHeaders.add(key);
//           }
//         });
//       });

//       departmentData.headers = Array.from(departmentHeaders);
//       departmentData.records = recordsArray.map((record, index) => ({
//         ...record,
//         'S/N': index + 1
//       }));
//       departmentData.staffCount = recordsArray.length;

//       // Calculate department total
//       recordsArray.forEach(record => {
//         departmentData.totalNet += parseFloat(record.Net || 0);
//       });

//       headquarterData.departments.push(departmentData);
//       headquarterData.totalNet += departmentData.totalNet;
//       headquarterData.staffCount += departmentData.staffCount;
//     });

//     processedData.push(headquarterData);
//     totalStaffCount += headquarterData.staffCount;
//   });

//   return { processedData, totalStaffCount };
// }

// // Main component for handling complex payroll data
// const ComplexPayrollReportTable = ({ tableData }) => {
//   const [isPrintMode, setIsPrintMode] = useState(false);

//   const { processedData, totalStaffCount } = useMemo(() => {
//     return processComplexData(tableData);
//   }, [tableData]);

//   // Calculate overall total
//   const overallTotal = useMemo(() => {
//     return processedData.reduce((total, hq) => total + hq.totalNet, 0);
//   }, [processedData]);

//   // Print all departments using react-to-print library alternative
//   const handlePrintAll = () => {
//     setIsPrintMode(true);

//     // Create print styles
//     const printStyles = document.createElement('style');
//     printStyles.textContent = `
//       @media print {
//         body * {
//           visibility: hidden;
//         }

//         .print-container, .print-container * {
//           visibility: visible;
//         }

//         .print-container {
//           position: absolute;
//           left: 0;
//           top: 0;
//           width: 100%;
//         }

//         .department-page {
//           page-break-before: always;
//           page-break-after: always;
//           min-height: 100vh;
//         }

//         .department-page:first-child {
//           page-break-before: auto;
//         }

//         .complex-payroll-table {
//           width: 100% !important;
//           border-collapse: collapse !important;
//         }

//         .complex-payroll-table th,
//         .complex-payroll-table td {
//           border: 1px solid #000 !important;
//           padding: 6px 8px !important;
//           font-size: 8px !important;
//           text-align: left !important;
//         }

//         .header-row {
//           background-color: #f0f0f0 !important;
//           font-weight: bold !important;
//         }

//         .header-row-alt {
//           background-color: #f8f9fa !important;
//         }

//         .hq-title {
//           font-size: 14px !important;
//           font-weight: bold !important;
//           text-align: center !important;
//           background-color: #e0e0e0 !important;
//         }

//         .dept-title {
//           font-size: 12px !important;
//           font-weight: bold !important;
//           text-align: center !important;
//           background-color: #f5f5f5 !important;
//         }

//         .total-row {
//           background-color: #ffffcc !important;
//           font-weight: bold !important;
//         }

//         .data-row-even {
//           background-color: #fafafa !important;
//         }

//         .data-row-odd {
//           background-color: #ffffff !important;
//         }

//         .no-print {
//           display: none !important;
//         }

//         @page {
//           margin: 0.5in;
//           size: landscape;
//         }
//       }
//     `;
//     document.head.appendChild(printStyles);

//     setTimeout(() => {
//       window.print();
//       setIsPrintMode(false);
//       document.head.removeChild(printStyles);
//     }, 100);
//   };

//   const exportToExcel = () => {
//     console.log("Exporting complex data to Excel...", processedData);
//     // Implementation for Excel export would go here
//   };

//   const TopContent = () => (
//     <div className="flex justify-end gap-2 mb-4 no-print">
//       <ActionButton
//         className="flex gap-1 items-center"
//         onClick={handlePrintAll}
//       >
//         <MdPrint size={16} /> Print All Departments
//       </ActionButton>
//       <ActionButton
//         className="flex gap-1 items-center"
//         onClick={exportToExcel}
//       >
//         Export as Excel <MdOutlineFileDownload size={20} />
//       </ActionButton>
//     </div>
//   );

//   return (
//     <>
//       <TopContent />

//       <div className={isPrintMode ? "print-container" : ""}>
//         {processedData.map((hqData, hqIndex) => (
//           <div key={hqIndex}>
//             {hqData.departments.map((deptData, deptIndex) => (
//               <div key={`${hqIndex}-${deptIndex}`} className="department-page">
//                 <DepartmentTable
//                   headquarter={hqData.headquarter}
//                   department={deptData}
//                   headquarterTotal={hqData.totalNet}
//                   overallTotal={overallTotal}
//                   totalStaffCount={totalStaffCount}
//                   isPrint={isPrintMode}
//                 />
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// // Separate component for rendering individual department tables
// const DepartmentTable = ({
//   headquarter,
//   department,
//   headquarterTotal,
//   overallTotal,
//   totalStaffCount,
//   isPrint
// }) => {
//   // Fixed columns that should remain single
//   const fixedColumns = ['S/N', 'Name', 'Empno', 'Grade/Step'];

//   // Chunk only the non-fixed headers into groups of 8
//   const headerChunks = useMemo(() => {
//     return chunkArray(department.headers, 8);
//   }, [department.headers]);

//   // Calculate total columns needed for each row
//   const maxColumnsPerRow = fixedColumns.length + 8;

//   return (
//     <div className={`bg-white shadow-sm border border-gray-100 rounded-[14px] p-4 mb-6 ${isPrint ? 'department-content' : ''}`}>

//       <div className="overflow-x-auto">
//         <table className="complex-payroll-table w-full border-collapse">
//           <tbody>
//             {/* Headquarter Title Row */}
//             <tr>
//               <td
//                 colSpan={maxColumnsPerRow}
//                 className="hq-title border border-gray-300 px-4 py-3 bg-gray-200 font-bold text-center text-lg"
//               >
//                 {headquarter}
//               </td>
//             </tr>

//             {/* Department Title Row with Record Count */}
//             <tr>
//               <td
//                 colSpan={maxColumnsPerRow}
//                 className="dept-title border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-center"
//               >
//                 {department.department} - Total Records: {department.records.length}
//               </td>
//             </tr>

//             {/* Multi-row Headers - Fixed columns only in first row */}
//             {headerChunks.map((headerChunk, chunkIndex) => (
//               <tr key={`header-chunk-${chunkIndex}`} className={chunkIndex === 0 ? "header-row" : "header-row-alt"}>
//                 {/* Fixed columns only in the first header row */}
//                 {chunkIndex === 0 ? (
//                   fixedColumns.map((fixedHeader, fixedIndex) => (
//                     <th
//                       key={`fixed-header-${fixedIndex}`}
//                       className="border border-gray-300 px-3 py-2 bg-gray-50 font-bold text-center text-xs min-w-[80px]"
//                     >
//                       {fixedHeader.toUpperCase()}
//                     </th>
//                   ))
//                 ) : (
//                   // Empty cells for subsequent header rows
//                   fixedColumns.map((_, fixedIndex) => (
//                     <th
//                       key={`empty-fixed-header-${chunkIndex}-${fixedIndex}`}
//                       className="border border-gray-300 px-3 py-2 bg-gray-100 min-w-[80px]"
//                     >
//                     </th>
//                   ))
//                 )}

//                 {/* Dynamic headers for this chunk */}
//                 {headerChunk.map((header, headerIndex) => (
//                   <th
//                     key={`header-${chunkIndex}-${headerIndex}`}
//                     className="border border-gray-300 px-2 py-2 bg-gray-50 font-bold text-center text-xs min-w-[70px]"
//                   >
//                     {header?.replaceAll("_", " ")?.toUpperCase()}
//                   </th>
//                 ))}

//                 {/* Fill remaining cells if this chunk is smaller than 8 */}
//                 {headerChunk.length < 8 &&
//                   Array.from({ length: 8 - headerChunk.length }).map((_, emptyIndex) => (
//                     <th
//                       key={`empty-header-${chunkIndex}-${emptyIndex}`}
//                       className="border border-gray-300 px-2 py-2 bg-gray-50"
//                     >
//                     </th>
//                   ))
//                 }
//               </tr>
//             ))}

//             {/* Data Rows - Each record spans multiple rows based on header chunks */}
//             {department.records.map((record, recordIndex) => (
//               headerChunks.map((headerChunk, chunkIndex) => (
//                 <tr
//                   key={`record-${recordIndex}-chunk-${chunkIndex}`}
//                   className={`
//                     ${chunkIndex === headerChunks.length - 1 ? 'border-b-2 border-gray-400' : ''}
//                     ${recordIndex % 2 === 0 ? 'data-row-even bg-gray-50' : 'data-row-odd bg-white'}
//                   `}
//                 >
//                   {/* Fixed columns data - only show in first chunk row */}
//                   {chunkIndex === 0 ? (
//                     <>
//                       <td className="border border-gray-300 px-3 py-2 text-center text-xs font-medium">
//                         {record['S/N']}
//                       </td>
//                       <td className="border border-gray-300 px-3 py-2 text-left text-xs max-w-[120px] truncate">
//                         {record['Name'] || record['name'] || 'N/A'}
//                       </td>
//                       <td className="border border-gray-300 px-3 py-2 text-center text-xs font-medium">
//                         {record['Empno'] || record['empno'] || record['EMPNO'] || 'N/A'}
//                       </td>
//                       <td className="border border-gray-300 px-3 py-2 text-center text-xs font-medium">
//                         {record['Grd'] && record['Stp'] ?
//                           `${record['Grd']}/${record['Stp']}` :
//                           record['Grade'] && record['Step'] ?
//                           `${record['Grade']}/${record['Step']}` : 'N/A'
//                         }
//                       </td>
//                     </>
//                   ) : (
//                     // Empty cells for subsequent data rows
//                     fixedColumns.map((_, fixedIndex) => (
//                       <td
//                         key={`empty-fixed-data-${recordIndex}-${chunkIndex}-${fixedIndex}`}
//                         className="border border-gray-300 px-3 py-2 min-w-[80px]"
//                       >
//                       </td>
//                     ))
//                   )}

//                   {/* Dynamic data for this chunk */}
//                   {headerChunk.map((header, headerIndex) => (
//                     <td
//                       key={`data-${recordIndex}-${chunkIndex}-${headerIndex}`}
//                       className="border border-gray-300 px-2 py-2 text-center text-xs"
//                     >
//                       {header === 'Net' || header.toLowerCase().includes('net') ||
//                        header.toLowerCase().includes('amount') || header.toLowerCase().includes('salary') ||
//                        header.toLowerCase().includes('gs') || header.toLowerCase().includes('cs') ||
//                        header.toLowerCase().includes('ice') || header.toLowerCase().includes('pin') ||
//                        header.toLowerCase().includes('ilw') || header.toLowerCase().includes('peon') ||
//                        header.toLowerCase().includes('pt') || header.toLowerCase().includes('nop') ||
//                        header.toLowerCase().includes('tx') || header.toLowerCase().includes('deion')
//                         ? formatNumberWithComma(record[header] || 0)
//                         : (record[header] || 'N/A')
//                       }
//                     </td>
//                   ))}

//                   {/* Fill remaining cells if this chunk is smaller than 8 */}
//                   {headerChunk.length < 8 &&
//                     Array.from({ length: 8 - headerChunk.length }).map((_, emptyIndex) => (
//                       <td
//                         key={`empty-data-${recordIndex}-${chunkIndex}-${emptyIndex}`}
//                         className="border border-gray-300 px-2 py-2"
//                       >
//                       </td>
//                     ))
//                   }
//                 </tr>
//               ))
//             ))}

//             {/* Department Total Row */}
//             <tr className="total-row">
//               <td
//                 colSpan={maxColumnsPerRow}
//                 className="border border-gray-300 px-4 py-3 bg-yellow-100 font-bold text-center text-sm"
//               >
//                 Department Total ({department.department}): {formatNumberWithComma(department.totalNet)} | Staff Count: {department.staffCount}
//               </td>
//             </tr>

//             {/* Headquarter Total Row */}
//             <tr className="total-row">
//               <td
//                 colSpan={maxColumnsPerRow}
//                 className="border border-gray-300 px-4 py-3 bg-blue-100 font-bold text-center text-sm"
//               >
//                 Headquarter Total ({headquarter}): {formatNumberWithComma(headquarterTotal)}
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       {/* Overall Grand Total and Staff Sum - Show on last department */}
//       {!isPrint && (
//         <div className="mt-4 space-y-2">
//           <div className="p-3 bg-green-50 rounded border-l-4 border-green-400">
//             <div className="flex justify-between items-center">
//               <span className="font-semibold text-gray-700">Overall Grand Total:</span>
//               <span className="font-bold text-xl text-green-700">
//                 {formatNumberWithComma(overallTotal)}
//               </span>
//             </div>
//           </div>
//           <div className="p-3 bg-purple-50 rounded border-l-4 border-purple-400">
//             <div className="flex justify-between items-center">
//               <span className="font-semibold text-gray-700">Total Staff Count:</span>
//               <span className="font-bold text-xl text-purple-700">
//                 {totalStaffCount}
//               </span>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// DepartmentTable.propTypes = {
//   headquarter: propType.string,
//   department: propType.object,
//   headquarterTotal: propType.number,
//   overallTotal: propType.number,
//   totalStaffCount: propType.number,
//   isPrint: propType.bool
// };

// export default ComplexPayrollReportTable;

// *************** complex table V2 ***************
// /* eslint-disable no-unused-vars */

// /* eslint-disable react/prop-types */
// import { useMemo, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableColumn,
//   TableHeader,
//   TableRow,
// } from "@nextui-org/react";
// import { formatNumberWithComma } from "../../../utils/utitlities";
// import ActionButton from "../../forms/FormElements/ActionButton";
// import { MdOutlineFileDownload, MdPrint } from "react-icons/md";
// import propType from "prop-types";

// // Utility function to chunk array into groups of specified size
// const chunkArray = (array, chunkSize) => {
//   const chunks = [];
//   for (let i = 0; i < array.length; i += chunkSize) {
//     chunks.push(array.slice(i, i + chunkSize));
//   }
//   return chunks;
// };

// // Function to process complex data structure
// function processComplexData(complexData) {
//   const processedData = [];
//   let totalStaffCount = 0;

//   Object.keys(complexData).forEach(headquarter => {
//     const headquarterData = {
//       headquarter: headquarter.trim(),
//       departments: [],
//       totalNet: 0,
//       staffCount: 0
//     };

//     Object.keys(complexData[headquarter]).forEach(department => {
//       const departmentData = {
//         department: department.trim(),
//         records: [],
//         totalNet: 0,
//         headers: [],
//         staffCount: 0
//       };

//       // Extract records from department (ignore the keys like "P2271")
//       const departmentRecords = complexData[headquarter][department];
//       const recordsArray = Object.values(departmentRecords);

//       // Get unique headers for this department, excluding fixed columns
//       const fixedColumns = ['S/N', 'Name', 'Empno', 'Grd', 'Stp'];
//       const departmentHeaders = new Set();
//       recordsArray.forEach(record => {
//         Object.keys(record).forEach(key => {
//           if (!fixedColumns.some(fixed =>
//             key.toLowerCase().includes(fixed.toLowerCase()) ||
//             fixed.toLowerCase().includes(key.toLowerCase())
//           )) {
//             departmentHeaders.add(key);
//           }
//         });
//       });

//       departmentData.headers = Array.from(departmentHeaders);
//       departmentData.records = recordsArray.map((record, index) => ({
//         ...record,
//         'S/N': index + 1
//       }));
//       departmentData.staffCount = recordsArray.length;

//       // Calculate department total
//       recordsArray.forEach(record => {
//         departmentData.totalNet += parseFloat(record.Net || 0);
//       });

//       headquarterData.departments.push(departmentData);
//       headquarterData.totalNet += departmentData.totalNet;
//       headquarterData.staffCount += departmentData.staffCount;
//     });

//     processedData.push(headquarterData);
//     totalStaffCount += headquarterData.staffCount;
//   });

//   return { processedData, totalStaffCount };
// }

// // Main component for handling complex payroll data
// const ComplexPayrollReportTable = ({ tableData }) => {
//   const [isPrintMode, setIsPrintMode] = useState(false);

//   const { processedData, totalStaffCount } = useMemo(() => {
//     return processComplexData(tableData);
//   }, [tableData]);

//   // Calculate overall total
//   const overallTotal = useMemo(() => {
//     return processedData.reduce((total, hq) => total + hq.totalNet, 0);
//   }, [processedData]);

//   // Print all departments using react-to-print library alternative
//   const handlePrintAll = () => {
//     setIsPrintMode(true);

//     // Create print styles
//     const printStyles = document.createElement('style');
//     printStyles.textContent = `
//       @media print {
//         body * {
//           visibility: hidden;
//         }

//         .print-container, .print-container * {
//           visibility: visible;
//         }

//         .print-container {
//           position: absolute;
//           left: 0;
//           top: 0;
//           width: 100%;
//         }

//         .department-page {
//           page-break-before: always;
//           page-break-after: always;
//           min-height: 100vh;
//         }

//         .department-page:first-child {
//           page-break-before: auto;
//         }

//         .complex-payroll-table {
//           width: 100% !important;
//           border-collapse: collapse !important;
//         }

//         .complex-payroll-table th,
//         .complex-payroll-table td {
//           border: 1px solid #000 !important;
//           padding: 6px 8px !important;
//           font-size: 8px !important;
//           text-align: left !important;
//         }

//         .header-row {
//           background-color: #f0f0f0 !important;
//           font-weight: bold !important;
//         }

//         .hq-title {
//           font-size: 14px !important;
//           font-weight: bold !important;
//           text-align: center !important;
//           background-color: #e0e0e0 !important;
//         }

//         .dept-title {
//           font-size: 12px !important;
//           font-weight: bold !important;
//           text-align: center !important;
//           background-color: #f5f5f5 !important;
//         }

//         .total-row {
//           background-color: #ffffcc !important;
//           font-weight: bold !important;
//         }

//         .no-print {
//           display: none !important;
//         }

//         @page {
//           margin: 0.5in;
//           size: landscape;
//         }
//       }
//     `;
//     document.head.appendChild(printStyles);

//     setTimeout(() => {
//       window.print();
//       setIsPrintMode(false);
//       document.head.removeChild(printStyles);
//     }, 100);
//   };

//   const exportToExcel = () => {
//     console.log("Exporting complex data to Excel...", processedData);
//     // Implementation for Excel export would go here
//   };

//   const TopContent = () => (
//     <div className="flex justify-end gap-2 mb-4 no-print">
//       <ActionButton
//         className="flex gap-1 items-center"
//         onClick={handlePrintAll}
//       >
//         <MdPrint size={16} /> Print All Departments
//       </ActionButton>
//       <ActionButton
//         className="flex gap-1 items-center"
//         onClick={exportToExcel}
//       >
//         Export as Excel <MdOutlineFileDownload size={20} />
//       </ActionButton>
//     </div>
//   );

//   return (
//     <>
//       <TopContent />

//       <div className={isPrintMode ? "print-container" : ""}>
//         {processedData.map((hqData, hqIndex) => (
//           <div key={hqIndex}>
//             {hqData.departments.map((deptData, deptIndex) => (
//               <div key={`${hqIndex}-${deptIndex}`} className="department-page">
//                 <DepartmentTable
//                   headquarter={hqData.headquarter}
//                   department={deptData}
//                   headquarterTotal={hqData.totalNet}
//                   overallTotal={overallTotal}
//                   totalStaffCount={totalStaffCount}
//                   isPrint={isPrintMode}
//                 />
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// // Separate component for rendering individual department tables
// const DepartmentTable = ({
//   headquarter,
//   department,
//   headquarterTotal,
//   overallTotal,
//   totalStaffCount,
//   isPrint
// }) => {
//   // Fixed columns that should remain single
//   const fixedColumns = ['S/N', 'Name', 'Empno', 'Grade/Step'];

//   // Chunk only the non-fixed headers into groups of 8
//   const headerChunks = useMemo(() => {
//     return chunkArray(department.headers, 8);
//   }, [department.headers]);

//   // Calculate total columns needed for each row
//   const maxColumnsPerRow = fixedColumns.length + 8;

//   return (
//     <div className={`bg-white shadow-sm border border-gray-100 rounded-[14px] p-4 mb-6 ${isPrint ? 'department-content' : ''}`}>

//       <div className="overflow-x-auto">
//         <table className="complex-payroll-table w-full border-collapse">
//           <tbody>
//             {/* Headquarter Title Row */}
//             <tr>
//               <td
//                 colSpan={maxColumnsPerRow}
//                 className="hq-title border border-gray-300 px-4 py-3 bg-gray-200 font-bold text-center text-lg"
//               >
//                 {headquarter}
//               </td>
//             </tr>

//             {/* Department Title Row with Record Count */}
//             <tr>
//               <td
//                 colSpan={maxColumnsPerRow}
//                 className="dept-title border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-center"
//               >
//                 {department.department} - Total Records: {department.records.length}
//               </td>
//             </tr>

//             {/* Multi-row Headers */}
//             {headerChunks.map((headerChunk, chunkIndex) => (
//               <tr key={`header-chunk-${chunkIndex}`} className="header-row">
//                 {/* Fixed columns in every header row */}
//                 {fixedColumns.map((fixedHeader, fixedIndex) => (
//                   <th
//                     key={`fixed-header-${chunkIndex}-${fixedIndex}`}
//                     className="border border-gray-300 px-3 py-2 bg-gray-50 font-bold text-center text-xs min-w-[80px]"
//                   >
//                     {fixedHeader.toUpperCase()}
//                   </th>
//                 ))}

//                 {/* Dynamic headers for this chunk */}
//                 {headerChunk.map((header, headerIndex) => (
//                   <th
//                     key={`header-${chunkIndex}-${headerIndex}`}
//                     className="border border-gray-300 px-2 py-2 bg-gray-50 font-bold text-center text-xs min-w-[70px]"
//                   >
//                     {header?.replaceAll("_", " ")?.toUpperCase()}
//                   </th>
//                 ))}

//                 {/* Fill remaining cells if this chunk is smaller than 8 */}
//                 {headerChunk.length < 8 &&
//                   Array.from({ length: 8 - headerChunk.length }).map((_, emptyIndex) => (
//                     <th
//                       key={`empty-header-${chunkIndex}-${emptyIndex}`}
//                       className="border border-gray-300 px-2 py-2 bg-gray-50"
//                     >
//                     </th>
//                   ))
//                 }
//               </tr>
//             ))}

//             {/* Data Rows - Each record spans multiple rows based on header chunks */}
//             {department.records.map((record, recordIndex) => (
//               headerChunks.map((headerChunk, chunkIndex) => (
//                 <tr
//                   key={`record-${recordIndex}-chunk-${chunkIndex}`}
//                   className={chunkIndex === headerChunks.length - 1 ? 'border-b-2 border-gray-400' : ''}
//                 >
//                   {/* Fixed columns data */}
//                   <td className="border border-gray-300 px-3 py-2 text-center text-xs font-medium">
//                     {record['S/N']}
//                   </td>
//                   <td className="border border-gray-300 px-3 py-2 text-left text-xs max-w-[120px] truncate">
//                     {record['Name'] || record['name'] || 'N/A'}
//                   </td>
//                   <td className="border border-gray-300 px-3 py-2 text-center text-xs font-medium">
//                     {record['Empno'] || record['empno'] || record['EMPNO'] || 'N/A'}
//                   </td>
//                   <td className="border border-gray-300 px-3 py-2 text-center text-xs font-medium">
//                     {record['Grd'] && record['Stp'] ?
//                       `${record['Grd']}/${record['Stp']}` :
//                       record['Grade'] && record['Step'] ?
//                       `${record['Grade']}/${record['Step']}` : 'N/A'
//                     }
//                   </td>

//                   {/* Dynamic data for this chunk */}
//                   {headerChunk.map((header, headerIndex) => (
//                     <td
//                       key={`data-${recordIndex}-${chunkIndex}-${headerIndex}`}
//                       className="border border-gray-300 px-2 py-2 text-center text-xs"
//                     >
//                       {header === 'Net' || header.toLowerCase().includes('net') ||
//                        header.toLowerCase().includes('amount') || header.toLowerCase().includes('salary') ||
//                        header.toLowerCase().includes('gs') || header.toLowerCase().includes('cs') ||
//                        header.toLowerCase().includes('ice') || header.toLowerCase().includes('pin') ||
//                        header.toLowerCase().includes('ilw') || header.toLowerCase().includes('peon') ||
//                        header.toLowerCase().includes('pt') || header.toLowerCase().includes('nop') ||
//                        header.toLowerCase().includes('tx') || header.toLowerCase().includes('deion')
//                         ? formatNumberWithComma(record[header] || 0)
//                         : (record[header] || 'N/A')
//                       }
//                     </td>
//                   ))}

//                   {/* Fill remaining cells if this chunk is smaller than 8 */}
//                   {headerChunk.length < 8 &&
//                     Array.from({ length: 8 - headerChunk.length }).map((_, emptyIndex) => (
//                       <td
//                         key={`empty-data-${recordIndex}-${chunkIndex}-${emptyIndex}`}
//                         className="border border-gray-300 px-2 py-2"
//                       >
//                       </td>
//                     ))
//                   }
//                 </tr>
//               ))
//             ))}

//             {/* Department Total Row */}
//             <tr className="total-row">
//               <td
//                 colSpan={maxColumnsPerRow}
//                 className="border border-gray-300 px-4 py-3 bg-yellow-100 font-bold text-center text-sm"
//               >
//                 Department Total ({department.department}): {formatNumberWithComma(department.totalNet)} | Staff Count: {department.staffCount}
//               </td>
//             </tr>

//             {/* Headquarter Total Row */}
//             <tr className="total-row">
//               <td
//                 colSpan={maxColumnsPerRow}
//                 className="border border-gray-300 px-4 py-3 bg-blue-100 font-bold text-center text-sm"
//               >
//                 Headquarter Total ({headquarter}): {formatNumberWithComma(headquarterTotal)}
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       {/* Overall Grand Total and Staff Sum - Show on last department */}
//       {!isPrint && (
//         <div className="mt-4 space-y-2">
//           <div className="p-3 bg-green-50 rounded border-l-4 border-green-400">
//             <div className="flex justify-between items-center">
//               <span className="font-semibold text-gray-700">Overall Grand Total:</span>
//               <span className="font-bold text-xl text-green-700">
//                 {formatNumberWithComma(overallTotal)}
//               </span>
//             </div>
//           </div>
//           <div className="p-3 bg-purple-50 rounded border-l-4 border-purple-400">
//             <div className="flex justify-between items-center">
//               <span className="font-semibold text-gray-700">Total Staff Count:</span>
//               <span className="font-bold text-xl text-purple-700">
//                 {totalStaffCount}
//               </span>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// DepartmentTable.propTypes = {
//   headquarter: propType.string,
//   department: propType.object,
//   headquarterTotal: propType.number,
//   overallTotal: propType.number,
//   totalStaffCount: propType.number,
//   isPrint: propType.bool
// };

// export default ComplexPayrollReportTable;

// *************** complex table V1 ***************
// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// import { useMemo, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableColumn,
//   TableHeader,
//   TableRow,
// } from "@nextui-org/react";
// import { formatNumberWithComma } from "../../../utils/utitlities";
// import ActionButton from "../../forms/FormElements/ActionButton";
// import { MdOutlineFileDownload, MdPrint } from "react-icons/md";
// import propType from "prop-types";

// // Utility function to chunk array into groups of specified size
// const chunkArray = (array, chunkSize) => {
//   const chunks = [];
//   for (let i = 0; i < array.length; i += chunkSize) {
//     chunks.push(array.slice(i, i + chunkSize));
//   }
//   return chunks;
// };

// // Function to process complex data structure
// function processComplexData(complexData) {
//   const processedData = [];

//   Object.keys(complexData).forEach(headquarter => {
//     const headquarterData = {
//       headquarter: headquarter.trim(),
//       departments: [],
//       totalNet: 0
//     };

//     Object.keys(complexData[headquarter]).forEach(department => {
//       const departmentData = {
//         department: department.trim(),
//         records: [],
//         totalNet: 0,
//         headers: []
//       };

//       // Extract records from department (ignore the keys like "P2271")
//       const departmentRecords = complexData[headquarter][department];
//       const recordsArray = Object.values(departmentRecords);

//       // Get unique headers for this department
//       const departmentHeaders = new Set();
//       recordsArray.forEach(record => {
//         Object.keys(record).forEach(key => departmentHeaders.add(key));
//       });

//       departmentData.headers = Array.from(departmentHeaders);
//       departmentData.records = recordsArray;

//       // Calculate department total
//       recordsArray.forEach(record => {
//         departmentData.totalNet += parseFloat(record.Net || 0);
//       });

//       headquarterData.departments.push(departmentData);
//       headquarterData.totalNet += departmentData.totalNet;
//     });

//     processedData.push(headquarterData);
//   });

//   return processedData;
// }

// // Main component for handling complex payroll data
// const ComplexPayrollReportTable2 = ({ tableData }) => {
//   const [isPrintMode, setIsPrintMode] = useState(false);

//   const processedData = useMemo(() => {
//     return processComplexData(tableData);
//   }, [tableData]);

//   // Calculate overall total
//   const overallTotal = useMemo(() => {
//     return processedData.reduce((total, hq) => total + hq.totalNet, 0);
//   }, [processedData]);

//   // Print all departments using react-to-print library alternative
//   const handlePrintAll = () => {
//     setIsPrintMode(true);

//     // Create print styles
//     const printStyles = document.createElement('style');
//     printStyles.textContent = `
//       @media print {
//         body * {
//           visibility: hidden;
//         }

//         .print-container, .print-container * {
//           visibility: visible;
//         }

//         .print-container {
//           position: absolute;
//           left: 0;
//           top: 0;
//           width: 100%;
//         }

//         .department-page {
//           page-break-before: always;
//           page-break-after: always;
//           min-height: 100vh;
//         }

//         .department-page:first-child {
//           page-break-before: auto;
//         }

//         .complex-payroll-table {
//           width: 100% !important;
//           border-collapse: collapse !important;
//         }

//         .complex-payroll-table th,
//         .complex-payroll-table td {
//           border: 1px solid #000 !important;
//           padding: 4px 6px !important;
//           font-size: 8px !important;
//           text-align: center !important;
//         }

//         .header-row {
//           background-color: #f0f0f0 !important;
//           font-weight: bold !important;
//         }

//         .hq-title {
//           font-size: 14px !important;
//           font-weight: bold !important;
//           text-align: center !important;
//           background-color: #e0e0e0 !important;
//         }

//         .dept-title {
//           font-size: 12px !important;
//           font-weight: bold !important;
//           text-align: center !important;
//           background-color: #f5f5f5 !important;
//         }

//         .total-row {
//           background-color: #ffffcc !important;
//           font-weight: bold !important;
//         }

//         .no-print {
//           display: none !important;
//         }

//         @page {
//           margin: 0.5in;
//           size: landscape;
//         }
//       }
//     `;
//     document.head.appendChild(printStyles);

//     setTimeout(() => {
//       window.print();
//       setIsPrintMode(false);
//       document.head.removeChild(printStyles);
//     }, 100);
//   };

//   const exportToExcel = () => {
//     console.log("Exporting complex data to Excel...", processedData);
//     // Implementation for Excel export would go here
//   };

//   const TopContent = () => (
//     <div className="flex justify-end gap-2 mb-4 no-print">
//       <ActionButton
//         className="flex gap-1 items-center"
//         onClick={handlePrintAll}
//       >
//         <MdPrint size={16} /> Print All Departments
//       </ActionButton>
//       <ActionButton
//         className="flex gap-1 items-center"
//         onClick={exportToExcel}
//       >
//         Export as Excel <MdOutlineFileDownload size={20} />
//       </ActionButton>
//     </div>
//   );

//   return (
//     <>
//       <TopContent />

//       <div className={isPrintMode ? "print-container" : ""}>
//         {processedData.map((hqData, hqIndex) => (
//           <div key={hqIndex}>
//             {hqData.departments.map((deptData, deptIndex) => (
//               <div key={`${hqIndex}-${deptIndex}`} className="department-page">
//                 <DepartmentTable
//                   headquarter={hqData.headquarter}
//                   department={deptData}
//                   headquarterTotal={hqData.totalNet}
//                   overallTotal={overallTotal}
//                   isPrint={isPrintMode}
//                 />
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// // Separate component for rendering individual department tables
// const DepartmentTable = ({
//   headquarter,
//   department,
//   headquarterTotal,
//   overallTotal,
//   isPrint
// }) => {
//   // Chunk headers into groups of 8 for multi-row headers
//   const headerChunks = useMemo(() => {
//     return chunkArray(department.headers, 8);
//   }, [department.headers]);

//   // Calculate how many rows we need for headers
//   const headerRowCount = headerChunks.length;

//   return (
//     <div className={`bg-white shadow-sm border border-gray-100 rounded-[14px] p-4 mb-6 ${isPrint ? 'department-content' : ''}`}>

//       <div className="overflow-x-auto">
//         <table className="complex-payroll-table w-full border-collapse">
//           <tbody>
//             {/* Headquarter Title Row */}
//             <tr>
//               <td
//                 colSpan={Math.max(8, department.headers.length)}
//                 className="hq-title border border-gray-300 px-4 py-3 bg-gray-200 font-bold text-center text-lg"
//               >
//                 {headquarter}
//               </td>
//             </tr>

//             {/* Department Title Row with Record Count */}
//             <tr>
//               <td
//                 colSpan={Math.max(8, department.headers.length)}
//                 className="dept-title border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-center"
//               >
//                 {department.department} - Total Records: {department.records.length}
//               </td>
//             </tr>

//             {/* Multi-row Headers */}
//             {headerChunks.map((headerChunk, chunkIndex) => (
//               <tr key={`header-chunk-${chunkIndex}`} className="header-row">
//                 {headerChunk.map((header, headerIndex) => (
//                   <th
//                     key={`header-${chunkIndex}-${headerIndex}`}
//                     className="border border-gray-300 px-2 py-2 bg-gray-50 font-bold text-center text-xs"
//                   >
//                     {header?.replaceAll("_", " ")?.toUpperCase()}
//                   </th>
//                 ))}
//                 {/* Fill remaining cells if this chunk is smaller than 8 */}
//                 {headerChunk.length < 8 &&
//                   Array.from({ length: 8 - headerChunk.length }).map((_, emptyIndex) => (
//                     <th
//                       key={`empty-header-${chunkIndex}-${emptyIndex}`}
//                       className="border border-gray-300 px-2 py-2 bg-gray-50"
//                     >
//                     </th>
//                   ))
//                 }
//               </tr>
//             ))}

//             {/* Data Rows - Each record spans multiple rows based on header chunks */}
//             {department.records.map((record, recordIndex) => (
//               headerChunks.map((headerChunk, chunkIndex) => (
//                 <tr key={`record-${recordIndex}-chunk-${chunkIndex}`}>
//                   {headerChunk.map((header, headerIndex) => (
//                     <td
//                       key={`data-${recordIndex}-${chunkIndex}-${headerIndex}`}
//                       className="border border-gray-300 px-2 py-1 text-center text-xs"
//                     >
//                       {header === 'Net' || header.toLowerCase().includes('net') ||
//                        header.toLowerCase().includes('amount') || header.toLowerCase().includes('salary') ||
//                        header.toLowerCase().includes('gs') || header.toLowerCase().includes('cs')
//                         ? formatNumberWithComma(record[header] || 0)
//                         : (record[header] || 'N/A')
//                       }
//                     </td>
//                   ))}
//                   {/* Fill remaining cells if this chunk is smaller than 8 */}
//                   {headerChunk.length < 8 &&
//                     Array.from({ length: 8 - headerChunk.length }).map((_, emptyIndex) => (
//                       <td
//                         key={`empty-data-${recordIndex}-${chunkIndex}-${emptyIndex}`}
//                         className="border border-gray-300 px-2 py-1"
//                       >
//                       </td>
//                     ))
//                   }
//                 </tr>
//               ))
//             ))}

//             {/* Department Total Row */}
//             <tr className="total-row">
//               <td
//                 colSpan={Math.max(8, department.headers.length)}
//                 className="border border-gray-300 px-4 py-2 bg-yellow-100 font-bold text-center"
//               >
//                 Department Total ({department.department}): {formatNumberWithComma(department.totalNet)}
//               </td>
//             </tr>

//             {/* Headquarter Total Row (only show after last department of HQ) */}
//             <tr className="total-row">
//               <td
//                 colSpan={Math.max(8, department.headers.length)}
//                 className="border border-gray-300 px-4 py-2 bg-blue-100 font-bold text-center"
//               >
//                 Headquarter Total ({headquarter}): {formatNumberWithComma(headquarterTotal)}
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       {/* Overall Grand Total - Show on last department */}
//       {!isPrint && (
//         <div className="mt-4 p-3 bg-green-50 rounded border-l-4 border-green-400">
//           <div className="flex justify-between items-center">
//             <span className="font-semibold text-gray-700">Overall Grand Total:</span>
//             <span className="font-bold text-xl text-green-700">
//               {formatNumberWithComma(overallTotal)}
//             </span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// DepartmentTable.propTypes = {
//   headquarter: propType.string,
//   department: propType.object,
//   headquarterTotal: propType.number,
//   overallTotal: propType.number,
//   isPrint: propType.bool
// };

// export default ComplexPayrollReportTable2;
