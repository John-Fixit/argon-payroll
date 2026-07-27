/* eslint-disable no-unused-vars */
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";

export const exportPayrollReportExcel = async ({
  excelData,
  fileName,
  is_grouped,
  is_staff = false,
  is_yearly = false,
  is_allowance = false,
}) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  if (!excelData || excelData?.length === 0) return;

  const getHeadersFromFirstData = (dataSection) => {
    const allHeaders = Object.keys(dataSection || {}).filter(
      (key) => !key.startsWith("__")
    );


    
    // Apply the same NET column ordering logic as in the table component
    const netColumns = allHeaders.filter(col => col.includes('NET'));

    const nonNetColumns = allHeaders.filter(col => !col.includes('NET') && !col.includes('S/N') && !col.includes("SNo")  && !col.includes('FULLNAME') || col.includes("FULL NAME") && !col.includes('STAFF NUMBER'));
    
    const sntColumns = allHeaders.filter(col => col.includes("S/N") ||  col.includes("SNo") || col.includes("FULLNAME") || col.includes("FULL NAME") || col.includes("STAFF NUMBER") );

    
    return  [ ...sntColumns, ...nonNetColumns, ...netColumns];
  };

  const getValueFromRow = (row, header) => {
    const exactMatch = row?.[header];
    if (exactMatch === 0) return 0;
    if (exactMatch !== undefined && exactMatch !== null) return exactMatch;
    return "";
  };

  const writeSheetWithGroupedData = () => {
    let firstSectionData;
    if (is_staff) {
      const firstDataSection = excelData.find(
        (section) => section?.data?.length > 0 && !section?.isStaffHeader
      );
      firstSectionData = firstDataSection?.data?.[0];
    } else {
      firstSectionData = excelData?.[0]?.data?.[0];
    }
    if (!firstSectionData) return;

    const headers = getHeadersFromFirstData(firstSectionData);
    const ws = XLSX.utils.aoa_to_sheet([headers]);
    let rowOffset = 1;
    let totalNet = 0;

    excelData.forEach((section) => {
      if (is_staff && section?.isStaffHeader) {
        if (section?.header?.trim()) {
          XLSX.utils.sheet_add_aoa(ws, [[section.header]], {
            origin: { r: rowOffset, c: 0 },
          });
          ws["!merges"] = ws["!merges"] || [];
          ws["!merges"].push({
            s: { r: rowOffset, c: 0 },
            e: { r: rowOffset, c: headers.length - 1 },
          });
          rowOffset += 1;
        }
        return;
      }

      if (is_staff && section?.isStaffNetSpacer) {
        XLSX.utils.sheet_add_aoa(ws, [[...headers.map(() => "")]], {
          origin: { r: rowOffset, c: 0 },
        });
        rowOffset += 1;
        return;
      }

      if (section?.header?.trim() && !section?.isStaffHeader) {
        const label = `${section.header} (${section.data?.filter(
          (d) => !d.__isSummary && !d.__isDifference && !d.__isStaffNet && !d.__isStaffNetSpacer
        )?.length || 0})`;

        XLSX.utils.sheet_add_aoa(ws, [[label]], {
          origin: { r: rowOffset, c: 0 },
        });
        ws["!merges"] = ws["!merges"] || [];
        ws["!merges"].push({
          s: { r: rowOffset, c: 0 },
          e: { r: rowOffset, c: headers.length - 1 },
        });
        rowOffset += 1;
      }

      section?.data?.forEach((row) => {
        const rowData = headers.map((header) => getValueFromRow(row, header));

        // Track net total for summary
        if (!row.__isSummary && !row.__isDifference && !row.__isStaffNet && !row.__isStaffNetSpacer) {
          totalNet +=
            Number(row.NET || row.Net || row.net || row.Amount  || row.AMOUNT || row.amount || row.Total || row.total || 0);
        }

        XLSX.utils.sheet_add_aoa(ws, [rowData], {
          origin: { r: rowOffset, c: 0 },
        });
        rowOffset += 1;
      });
    });

    if (!is_allowance && totalNet > 0) {
      rowOffset += 1;
      const totalRow = ["GRAND TOTAL", totalNet];
      while (totalRow.length < headers.length) totalRow.push("");
      XLSX.utils.sheet_add_aoa(ws, [totalRow], {
        origin: { r: rowOffset, c: 0 },
      });
    }

    return ws;
  };

  const writeSheetWithFlatData = () => {
    const cleanedData = excelData.map((row) => {
      const copy = { ...row };
      delete copy.__isSummary;
      delete copy.__isDifference;
      delete copy.__isStaffNet;
      delete copy.__isStaffNetSpacer;
      return copy;
    });

    // Apply NET column ordering to flat data as well
    if (cleanedData.length > 0) {
      const firstRow = cleanedData[0];
      const orderedHeaders = getHeadersFromFirstData(firstRow);
      
      // Reorder all rows to match the header order
      const reorderedData = cleanedData.map(row => {
        const reorderedRow = {};
        orderedHeaders.forEach(header => {
          reorderedRow[header] = row[header];
        });
        return reorderedRow;
      });
      
      cleanedData.splice(0, cleanedData.length, ...reorderedData);
    }

    let totalNet = 0;
    if (!is_allowance) {
      // FIX: Only calculate total from non-summary rows to avoid double counting
      excelData
        .filter(item => !item.__isSummary && !item.__isDifference)
        .forEach((item) => {
          totalNet +=
            Number(item?.NET || item?.Net || item?.net ||
            item?.Amount || item?.amount  || item?.AMOUNT || item?.Total || item?.total || 0);
        });
    }

    if (!is_allowance && totalNet > 0) {
      const totalRow = {};
      const keys = Object.keys(cleanedData[0] || {});
      keys.forEach((key, index) => {
        if (index === 0) totalRow[key] = "GRAND TOTAL";
        else if (
          key.toLowerCase().includes("net") ||
          key.toLowerCase().includes("amount") ||
          key.toLowerCase().includes("total") ||
          index === 1
        ) {
          totalRow[key] = totalNet;
        } else {
          totalRow[key] = "";
        }
      });
      cleanedData.push(totalRow);
    }

    const ws = XLSX.utils.json_to_sheet(cleanedData);
    return ws;
  };

  const ws = (is_grouped || is_staff)
    ? writeSheetWithGroupedData()
    : writeSheetWithFlatData();

  if (!ws) return;

  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, fileName + fileExtension);
};






















// /* eslint-disable no-unused-vars */
// import * as XLSX from "xlsx";
// import * as FileSaver from "file-saver";

// export const exportPayrollReportExcel = async ({
//   excelData,
//   fileName,
//   is_grouped,
//   is_staff = false,
//   is_yearly = false,
//   is_allowance = false,
// }) => {
//   const fileType =
//     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
//   const fileExtension = ".xlsx";

//   if (!excelData || excelData?.length === 0) return;

//   const getHeadersFromFirstData = (dataSection) => {
//     return Object.keys(dataSection || {}).filter(
//       (key) => !key.startsWith("__")
//     );
//   };

//   const getValueFromRow = (row, header) => {
//     const exactMatch = row?.[header];
//     if (exactMatch === 0) return 0;
//     if (exactMatch !== undefined && exactMatch !== null) return exactMatch;
//     return "";
//   };

//   const writeSheetWithGroupedData = () => {
//     let firstSectionData;
//     if (is_staff) {
//       const firstDataSection = excelData.find(
//         (section) => section?.data?.length > 0 && !section?.isStaffHeader
//       );
//       firstSectionData = firstDataSection?.data?.[0];
//     } else {
//       firstSectionData = excelData?.[0]?.data?.[0];
//     }
//     if (!firstSectionData) return;

//     const headers = getHeadersFromFirstData(firstSectionData);
//     const ws = XLSX.utils.aoa_to_sheet([headers]);
//     let rowOffset = 1;
//     let totalNet = 0;

//     excelData.forEach((section) => {
//       if (is_staff && section?.isStaffHeader) {
//         if (section?.header?.trim()) {
//           XLSX.utils.sheet_add_aoa(ws, [[section.header]], {
//             origin: { r: rowOffset, c: 0 },
//           });
//           ws["!merges"] = ws["!merges"] || [];
//           ws["!merges"].push({
//             s: { r: rowOffset, c: 0 },
//             e: { r: rowOffset, c: headers.length - 1 },
//           });
//           rowOffset += 1;
//         }
//         return;
//       }

//       if (is_staff && section?.isStaffNetSpacer) {
//         XLSX.utils.sheet_add_aoa(ws, [[...headers.map(() => "")]], {
//           origin: { r: rowOffset, c: 0 },
//         });
//         rowOffset += 1;
//         return;
//       }

//       if (section?.header?.trim() && !section?.isStaffHeader) {
//         const label = `${section.header} (${section.data?.filter(
//           (d) => !d.__isSummary && !d.__isDifference && !d.__isStaffNet && !d.__isStaffNetSpacer
//         )?.length || 0})`;

//         XLSX.utils.sheet_add_aoa(ws, [[label]], {
//           origin: { r: rowOffset, c: 0 },
//         });
//         ws["!merges"] = ws["!merges"] || [];
//         ws["!merges"].push({
//           s: { r: rowOffset, c: 0 },
//           e: { r: rowOffset, c: headers.length - 1 },
//         });
//         rowOffset += 1;
//       }

//       section?.data?.forEach((row) => {
//         const rowData = headers.map((header) => getValueFromRow(row, header));

//         // Track net total for summary
//         if (!row.__isSummary && !row.__isDifference && !row.__isStaffNet && !row.__isStaffNetSpacer) {
//           totalNet +=
//             Number(row.NET || row.Net || row.net || row.Amount || row.amount || row.Total || row.total || 0);
//         }

//         XLSX.utils.sheet_add_aoa(ws, [rowData], {
//           origin: { r: rowOffset, c: 0 },
//         });
//         rowOffset += 1;
//       });
//     });

//     if (!is_allowance && totalNet > 0) {
//       rowOffset += 1;
//       const totalRow = ["GRAND TOTAL", totalNet];
//       while (totalRow.length < headers.length) totalRow.push("");
//       XLSX.utils.sheet_add_aoa(ws, [totalRow], {
//         origin: { r: rowOffset, c: 0 },
//       });
//     }

//     return ws;
//   };

//   const writeSheetWithFlatData = () => {
//     const cleanedData = excelData.map((row) => {
//       const copy = { ...row };
//       delete copy.__isSummary;
//       delete copy.__isDifference;
//       delete copy.__isStaffNet;
//       delete copy.__isStaffNetSpacer;
//       return copy;
//     });

//     let totalNet = 0;
//     if (!is_allowance) {
//       // FIX: Only calculate total from non-summary rows to avoid double counting
//       excelData
//         .filter(item => !item.__isSummary && !item.__isDifference)
//         .forEach((item) => {
//           totalNet +=
//             Number(item?.NET || item?.Net || item?.net ||
//             item?.Amount || item?.amount || item?.Total || item?.total || 0);
//         });
//     }

//     if (!is_allowance && totalNet > 0) {
//       const totalRow = {};
//       const keys = Object.keys(cleanedData[0] || {});
//       keys.forEach((key, index) => {
//         if (index === 0) totalRow[key] = "GRAND TOTAL";
//         else if (
//           key.toLowerCase().includes("net") ||
//           key.toLowerCase().includes("amount") ||
//           key.toLowerCase().includes("total") ||
//           index === 1
//         ) {
//           totalRow[key] = totalNet;
//         } else {
//           totalRow[key] = "";
//         }
//       });
//       cleanedData.push(totalRow);
//     }

//     const ws = XLSX.utils.json_to_sheet(cleanedData);
//     return ws;
//   };

//   const ws = (is_grouped || is_staff)
//     ? writeSheetWithGroupedData()
//     : writeSheetWithFlatData();

//   if (!ws) return;

//   const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
//   const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
//   const data = new Blob([excelBuffer], { type: fileType });
//   FileSaver.saveAs(data, fileName + fileExtension);
// };










// /* eslint-disable no-unused-vars */
// import * as XLSX from "xlsx";
// import * as FileSaver from "file-saver";

// export const exportPayrollReportExcel = async ({
//   excelData,
//   fileName,
//   is_grouped,
//   is_staff = false,
//   is_yearly = false,
//   is_allowance = false,
// }) => {
//   console.log("Excel Data:", excelData);

//   const fileType =
//     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
//   const fileExtension = ".xlsx";

//   // If there's no data, return early
//   if (!excelData || excelData?.length === 0) return;

//   if (is_grouped || is_staff) {
//     // Get headers from the first section's first data item
//     // For is_staff, skip staff headers and look for actual data
//     let firstSectionData;
//     if (is_staff) {
//       // Find the first section with actual data (not staff header)
//       const firstDataSection = excelData?.find(section => 
//         section?.data?.length > 0 && !section?.isStaffHeader
//       );
//       firstSectionData = firstDataSection?.data;
//     } else {
//       firstSectionData = excelData?.[0]?.data;
//     }
    
//     if (!firstSectionData || firstSectionData.length === 0) return;

//     const heads = Object.keys(firstSectionData[0])
//       ?.filter(key => !key.startsWith('__')) // Exclude special markers like __isSummary, __isDifference, __isStaffNet, __isStaffNetSpacer
//       ?.map((header) => header?.toUpperCase());

//     const netColumns = heads.filter(col => col.includes('NET'));
//     const nonNetColumns = heads.filter(col => !col.includes('NET'));

//     const headers = [...nonNetColumns, ...netColumns]

//     // Create worksheet with headers
//     const ws = XLSX.utils.aoa_to_sheet([headers]);
//     let rowOffset = 1;

//     // Style headers
//     headers.forEach((header, colIndex) => {
//       const cellAddress = XLSX.utils.encode_cell({ r: 0, c: colIndex });
//       if (ws[cellAddress]) {
//         ws[cellAddress].s = {
//           font: { bold: true },
//           alignment: { horizontal: "center" },
//           fill: { fgColor: { rgb: "D1D5DB" } }
//         };
//       }
//     });

//     excelData?.forEach((section) => {
//       // Handle staff headers differently
//       if (is_staff && section?.isStaffHeader) {
//         // Add staff header row
//         if (section?.header && section?.header.trim()) {
//           XLSX.utils.sheet_add_aoa(ws, [[section.header]], {
//             origin: { r: rowOffset, c: 0 },
//           });

//           // Merge cells for staff header
//           ws["!merges"] = ws["!merges"] || [];
//           ws["!merges"].push({
//             s: { r: rowOffset, c: 0 },
//             e: { r: rowOffset, c: headers.length - 1 },
//           });

//           // Style staff header with different color
//           const staffHeaderAddress = XLSX.utils.encode_cell({ r: rowOffset, c: 0 });
//           if (ws[staffHeaderAddress]) {
//             ws[staffHeaderAddress].s = {
//               font: { bold: true, size: 14 },
//               alignment: { horizontal: "center" },
//               fill: { fgColor: { rgb: "DBEAFE" } } // Blue background for staff headers
//             };
//           }

//           rowOffset += 1;
//         }
//         return; // Skip processing data for staff headers
//       }

//       // Handle staff net rows
//       if (is_staff && section?.isStaffNet) {
//         section?.data?.forEach((row) => {
//           const rowData = headers.map((header) => {
//             const lowerHeader = header.toString()?.toLowerCase();
//             let value = row[lowerHeader] || row[header] || row[header?.toString().charAt(0)?.toString().toUpperCase() + header.toString().slice(1).toLowerCase()];
            
//             if (value === undefined || value === null) {
//               const originalValue = row[lowerHeader] !== undefined ? row[lowerHeader] : 
//                                    row[header] !== undefined ? row[header] : 
//                                    row[header?.toString().charAt(0)?.toString().toUpperCase() + header?.toString().slice(1).toLowerCase()];
//               if (originalValue === 0) {
//                 return 0;
//               }
//               return "";
//             }
            
//             return value;
//           });

//           XLSX.utils.sheet_add_aoa(ws, [rowData], {
//             origin: { r: rowOffset, c: 0 },
//           });

//           // Style staff net row
//           headers.forEach((header, colIndex) => {
//             const cellAddress = XLSX.utils.encode_cell({ r: rowOffset, c: colIndex });
//             if (ws[cellAddress]) {
//               ws[cellAddress].s = {
//                 font: { bold: true, color: { rgb: "059669" } }, // Green color for staff net
//                 alignment: { horizontal: "left" },
//                 fill: { fgColor: { rgb: "ECFDF5" } } // Light green background
//               };
//             }
//           });

//           rowOffset += 1;
//         });
//         return; // Skip further processing for staff net sections
//       }

//       // Handle staff net spacer rows
//       if (is_staff && section?.isStaffNetSpacer) {
//         // Add empty row for spacing
//         const emptyRow = headers.map(() => "");
//         XLSX.utils.sheet_add_aoa(ws, [emptyRow], {
//           origin: { r: rowOffset, c: 0 },
//         });
//         rowOffset += 1;
//         return;
//       }

//       // Add section header only if it exists and is not empty (for group headers)
//       if (section?.header && section?.header.trim() && !section?.isStaffHeader) {
//         const nonSpecialDataCount = section?.data?.filter(item => 
//           !item.__isSummary && !item.__isDifference && !item.__isStaffNet && !item.__isStaffNetSpacer
//         )?.length || 0;
        
//         // Add section header row
//         XLSX.utils.sheet_add_aoa(ws, [[section.header + ` (${nonSpecialDataCount})`]], {
//           origin: { r: rowOffset, c: 0 },
//         });

//         // Merge cells for section header
//         ws["!merges"] = ws["!merges"] || [];
//         ws["!merges"].push({
//           s: { r: rowOffset, c: 0 },
//           e: { r: rowOffset, c: headers.length - 1 },
//         });

//         // Style section header
//         const sectionHeaderAddress = XLSX.utils.encode_cell({ r: rowOffset, c: 0 });
//         if (ws[sectionHeaderAddress]) {
//           ws[sectionHeaderAddress].s = {
//             font: { bold: true, size: 12 },
//             alignment: { horizontal: "center" },
//             fill: { fgColor: { rgb: "F3F4F6" } }
//           };
//         }

//         rowOffset += 1;
//       }

//       // Process section data
//       section?.data?.forEach((row) => {
//         const rowData = headers.map((header) => {
//           const lowerHeader = header.toString()?.toLowerCase();
//           let value = row[lowerHeader] || row[header] || row[header?.toString().charAt(0)?.toString().toUpperCase() + header.toString().slice(1).toLowerCase()];
          
//           // If value is undefined or null, check for exact 0
//           if (value === undefined || value === null) {
//             // Check if the original value is exactly 0
//             const originalValue = row[lowerHeader] !== undefined ? row[lowerHeader] : 
//                                  row[header] !== undefined ? row[header] : 
//                                  row[header?.toString().charAt(0)?.toString().toUpperCase() + header?.toString().slice(1).toLowerCase()];
//             if (originalValue === 0) {
//               return 0;
//             }
//             return "";
//           }
          
//           // Return the actual value without any processing
//           return value;
//         });

//         XLSX.utils.sheet_add_aoa(ws, [rowData], {
//           origin: { r: rowOffset, c: 0 },
//         });

//         // Apply styling based on row type
//         headers.forEach((header, colIndex) => {
//           const cellAddress = XLSX.utils.encode_cell({ r: rowOffset, c: colIndex });
//           if (ws[cellAddress]) {
//             let cellStyle = {
//               alignment: { horizontal: "left" },
//             };

//             // Special styling for different row types
//             if (row.__isDifference) {
//               cellStyle.font = { bold: true, color: { rgb: "1E3A8A" } };
//               cellStyle.fill = { fgColor: { rgb: "DBEAFE" } };
//             } else if (row.__isSummary) {
//               cellStyle.font = { bold: true };
//               cellStyle.fill = { fgColor: { rgb: "FEF3C7" } };
//             } else if (row.__isStaffNet) {
//               cellStyle.font = { bold: true, color: { rgb: "059669" } };
//               cellStyle.fill = { fgColor: { rgb: "ECFDF5" } };
//             }

//             ws[cellAddress].s = cellStyle;
//           }
//         });

//         rowOffset += 1;
//       });
//     });

//     // Add overall total for non-allowance reports only
//     if (!is_allowance) {
//       let totalNet = 0;
      
//       excelData
//         .filter(section => section.header && section.header.trim() && !section.isStaffHeader && !section.isStaffNet && !section.isStaffNetSpacer)
//         .forEach(section => {
//           section.data
//             .filter(item => !item.__isSummary && !item.__isDifference && !item.__isStaffNet && !item.__isStaffNetSpacer)
//             .forEach(item => {
//               totalNet += (item.NET || item.Net || item.net || 
//                           Number(item.Amount) || Number(item.amount) || 
//                           Number(item.Total) || Number(item.total) || 0);
//             });
//         });

//       if (totalNet > 0) {
//         rowOffset += 1; // Add spacing

//         const totalRow = ["GRAND TOTAL", totalNet];
//         while (totalRow.length < headers.length) {
//           totalRow.push("");
//         }

//         XLSX.utils.sheet_add_aoa(ws, [totalRow], {
//           origin: { r: rowOffset, c: 0 },
//         });

//         // Style total row
//         headers.forEach((_, colIndex) => {
//           const cellAddress = XLSX.utils.encode_cell({ r: rowOffset, c: colIndex });
//           if (ws[cellAddress]) {
//             ws[cellAddress].s = {
//               font: { bold: true, size: 12 },
//               alignment: { horizontal: colIndex === 0 ? "left" : "right" },
//               fill: { fgColor: { rgb: "E5E7EB" } },
//               numFmt: colIndex === 1 ? "#,##0.00" : undefined
//             };
//           }
//         });
//       }
//     }

//     const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
//     const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
//     const data = new Blob([excelBuffer], { type: fileType });
//     FileSaver.saveAs(data, fileName + fileExtension);

//   } else {
//     // Handle non-grouped data (unchanged)
//     const validData = excelData.filter(item => item && typeof item === 'object');
    
//     if (validData.length === 0) return;

//     // Remove special markers from data
//     const cleanedData = validData.map(item => {
//       const cleaned = { ...item };
//       delete cleaned.__isSummary;
//       delete cleaned.__isDifference;
//       delete cleaned.__isStaffNet;
//       delete cleaned.__isStaffNetSpacer;
//       return cleaned;
//     });

//     // Calculate total for non-allowance reports only
//     let totalNet = 0;
//     if (!is_allowance) {
//       validData
//         .filter(item => !item.__isSummary && !item.__isDifference && !item.__isStaffNet && !item.__isStaffNetSpacer)
//         .forEach(item => {
//           totalNet += (item?.NET || item?.Net || item?.net || 
//                       Number(item?.Amount) || Number(item?.amount) || 
//                       Number(item?.Total) || Number(item?.total) || 
//                       Number(item?.sum_pay) || 0);
//         });
//     }

//     // Add total row if applicable (only for non-allowance reports)
//     if (!is_allowance && totalNet > 0) {
//       const totalRow = {};
//       const keys = Object.keys(cleanedData[0] || {});

//       keys.forEach((key, index) => {
//         if (index === 0) {
//           totalRow[key] = "GRAND TOTAL";
//         } else if (key.toLowerCase().includes('net') || key.toLowerCase().includes('amount') || 
//                    key.toLowerCase().includes('total') || index === 1) {
//           totalRow[key] = totalNet;
//         } else {
//           totalRow[key] = "";
//         }
//       });

//       cleanedData.push(totalRow);
//     }

//     const ws = XLSX.utils.json_to_sheet(cleanedData);

//     // Apply styling
//     const range = XLSX.utils.decode_range(ws['!ref']);
    
//     // Style headers
//     for (let col = range.s.c; col <= range.e.c; col++) {
//       const headerAddress = XLSX.utils.encode_cell({ r: 0, c: col });
//       if (ws[headerAddress]) {
//         ws[headerAddress].s = {
//           font: { bold: true },
//           alignment: { horizontal: "center" },
//           fill: { fgColor: { rgb: "D1D5DB" } }
//         };
//       }
//     }

//     // Style data rows
//     for (let row = range.s.r + 1; row <= range.e.r; row++) {
//       const isLastRow = row === range.e.r && totalNet > 0 && !is_allowance;
//       const originalIndex = row - 1;
//       const originalData = originalIndex < validData.length ? validData[originalIndex] : null;
      
//       for (let col = range.s.c; col <= range.e.c; col++) {
//         const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
//         if (ws[cellAddress]) {
//           let cellStyle = {
//             alignment: { horizontal: "left" },
//           };

//           // Special styling
//           if (isLastRow) {
//             cellStyle.font = { bold: true, size: 12 };
//             cellStyle.fill = { fgColor: { rgb: "E5E7EB" } };
//           } else if (originalData?.__isDifference) {
//             cellStyle.font = { bold: true, color: { rgb: "1E3A8A" } };
//             cellStyle.fill = { fgColor: { rgb: "DBEAFE" } };
//           } else if (originalData?.__isSummary) {
//             cellStyle.font = { bold: true };
//             cellStyle.fill = { fgColor: { rgb: "FEF3C7" } };
//           } else if (originalData?.__isStaffNet) {
//             cellStyle.font = { bold: true, color: { rgb: "059669" } };
//             cellStyle.fill = { fgColor: { rgb: "ECFDF5" } };
//           }

//           ws[cellAddress].s = cellStyle;
//         }
//       }
//     }

//     const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
//     const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
//     const data = new Blob([excelBuffer], { type: fileType });
//     FileSaver.saveAs(data, fileName + fileExtension);
//   }
// };












// /* eslint-disable no-unused-vars */
// import * as XLSX from "xlsx";
// import * as FileSaver from "file-saver";

// export const exportPayrollReportExcel = async ({
//   excelData,
//   fileName,
//   is_grouped,
//   is_yearly = false,
//   is_allowance = false,
// }) => {
//   console.log("Excel Data:", excelData);

//   const fileType =
//     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
//   const fileExtension = ".xlsx";

//   // If there's no data, return early
//   if (!excelData || excelData?.length === 0) return;

//   if (is_grouped) {
//     // Get headers from the first section's first data item
//     const firstSectionData = excelData?.[0]?.data;
//     if (!firstSectionData || firstSectionData.length === 0) return;

//     const heads = Object.keys(firstSectionData[0])
//       ?.filter(key => !key.startsWith('__')) // Exclude special markers like __isSummary, __isDifference
//       ?.map((header) => header?.toUpperCase());

//   const netColumns = heads.filter(col => col.includes('NET'));
//   const nonNetColumns = heads.filter(col => !col.includes('NET'));

//   const headers = [...nonNetColumns, ...netColumns]

//     // Create worksheet with headers
//     const ws = XLSX.utils.aoa_to_sheet([headers]);
//     let rowOffset = 1;

//     // Style headers
//     headers.forEach((header, colIndex) => {
//       const cellAddress = XLSX.utils.encode_cell({ r: 0, c: colIndex });
//       if (ws[cellAddress]) {
//         ws[cellAddress].s = {
//           font: { bold: true },
//           alignment: { horizontal: "center" },
//           fill: { fgColor: { rgb: "D1D5DB" } }
//         };
//       }
//     });

//     excelData?.forEach((section) => {
//       // Add section header only if it exists and is not empty
//       if (section?.header && section?.header.trim()) {
//         const nonSpecialDataCount = section?.data?.filter(item => !item.__isSummary && !item.__isDifference)?.length || 0;
        
//         // Add section header row
//         XLSX.utils.sheet_add_aoa(ws, [[section.header + ` (${nonSpecialDataCount})`]], {
//           origin: { r: rowOffset, c: 0 },
//         });

//         // Merge cells for section header
//         ws["!merges"] = ws["!merges"] || [];
//         ws["!merges"].push({
//           s: { r: rowOffset, c: 0 },
//           e: { r: rowOffset, c: headers.length - 1 },
//         });

//         // Style section header
//         const sectionHeaderAddress = XLSX.utils.encode_cell({ r: rowOffset, c: 0 });
//         if (ws[sectionHeaderAddress]) {
//           ws[sectionHeaderAddress].s = {
//             font: { bold: true, size: 12 },
//             alignment: { horizontal: "center" },
//             fill: { fgColor: { rgb: "F3F4F6" } }
//           };
//         }

//         rowOffset += 1;
//       }

//       // Process section data
//       section?.data?.forEach((row) => {
//         const rowData = headers.map((header) => {

//           const lowerHeader = header.toString()?.toLowerCase();
//           let value = row[lowerHeader] || row[header] || row[header?.toString().charAt(0)?.toString().toUpperCase() + header.toString().slice(1).toLowerCase()];
          
//           // If value is undefined or null, check for exact 0
//           if (value === undefined || value === null) {
//             // Check if the original value is exactly 0
//             const originalValue = row[lowerHeader] !== undefined ? row[lowerHeader] : 
//                                  row[header] !== undefined ? row[header] : 
//                                  row[header?.toString().charAt(0)?.toString().toUpperCase() + header?.toString().slice(1).toLowerCase()];
//             if (originalValue === 0) {
//               return 0;
//             }
//             return "";
//           }
          
//           // Return the actual value without any processing
//           return value;
//         });

//         XLSX.utils.sheet_add_aoa(ws, [rowData], {
//           origin: { r: rowOffset, c: 0 },
//         });

//         // Apply styling based on row type
//         headers.forEach((header, colIndex) => {
//           const cellAddress = XLSX.utils.encode_cell({ r: rowOffset, c: colIndex });
//           if (ws[cellAddress]) {
//             let cellStyle = {
//               alignment: { horizontal: "left" },
//             };

//             // Special styling for summary and difference rows
//             if (row.__isDifference) {
//               cellStyle.font = { bold: true, color: { rgb: "1E3A8A" } };
//               cellStyle.fill = { fgColor: { rgb: "DBEAFE" } };
//             } else if (row.__isSummary) {
//               cellStyle.font = { bold: true };
//               cellStyle.fill = { fgColor: { rgb: "FEF3C7" } };
//             }

//             // Format numbers - don't format anything, just apply styling
//             const cellValue = ws[cellAddress].v;
//             // Remove number formatting to show raw values
//             // if (typeof cellValue === 'number') {
//             //   cellStyle.numFmt = "#,##0.00";
//             // }

//             ws[cellAddress].s = cellStyle;
//           }
//         });

//         rowOffset += 1;
//       });
//     });

//     // Add overall total for non-allowance reports only
//     if (!is_allowance) {
//       let totalNet = 0;
      
//       excelData
//         .filter(section => section.header && section.header.trim())
//         .forEach(section => {
//           section.data
//             .filter(item => !item.__isSummary && !item.__isDifference)
//             .forEach(item => {
//               totalNet += (item.NET || item.Net || item.net || 
//                           Number(item.Amount) || Number(item.amount) || 
//                           Number(item.Total) || Number(item.total) || 0);
//             });
//         });

//       if (totalNet > 0) {
//         rowOffset += 1; // Add spacing

//         const totalRow = ["GRAND TOTAL", totalNet];
//         while (totalRow.length < headers.length) {
//           totalRow.push("");
//         }

//         XLSX.utils.sheet_add_aoa(ws, [totalRow], {
//           origin: { r: rowOffset, c: 0 },
//         });

//         // Style total row
//         headers.forEach((_, colIndex) => {
//           const cellAddress = XLSX.utils.encode_cell({ r: rowOffset, c: colIndex });
//           if (ws[cellAddress]) {
//             ws[cellAddress].s = {
//               font: { bold: true, size: 12 },
//               alignment: { horizontal: colIndex === 0 ? "left" : "right" },
//               fill: { fgColor: { rgb: "E5E7EB" } },
//               numFmt: colIndex === 1 ? "#,##0.00" : undefined
//             };
//           }
//         });
//       }
//     }

//     const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
//     const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
//     const data = new Blob([excelBuffer], { type: fileType });
//     FileSaver.saveAs(data, fileName + fileExtension);

//   } else {
//     // Handle non-grouped data
//     const validData = excelData.filter(item => item && typeof item === 'object');
    
//     if (validData.length === 0) return;

//     // Remove special markers from data
//     const cleanedData = validData.map(item => {
//       const cleaned = { ...item };
//       delete cleaned.__isSummary;
//       delete cleaned.__isDifference;
//       return cleaned;
//     });

//     // Calculate total for non-allowance reports only
//     let totalNet = 0;
//     if (!is_allowance) {
//       validData
//         .filter(item => !item.__isSummary && !item.__isDifference)
//         .forEach(item => {
//           totalNet += (item?.NET || item?.Net || item?.net || 
//                       Number(item?.Amount) || Number(item?.amount) || 
//                       Number(item?.Total) || Number(item?.total) || 
//                       Number(item?.sum_pay) || 0);
//         });
//     }

//     // Add total row if applicable (only for non-allowance reports)
//     if (!is_allowance && totalNet > 0) {
//       const totalRow = {};
//       const keys = Object.keys(cleanedData[0] || {});

//       keys.forEach((key, index) => {
//         if (index === 0) {
//           totalRow[key] = "GRAND TOTAL";
//         } else if (key.toLowerCase().includes('net') || key.toLowerCase().includes('amount') || 
//                    key.toLowerCase().includes('total') || index === 1) {
//           totalRow[key] = totalNet;
//         } else {
//           totalRow[key] = "";
//         }
//       });

//       cleanedData.push(totalRow);
//     }

//     const ws = XLSX.utils.json_to_sheet(cleanedData);

//     // Apply styling
//     const range = XLSX.utils.decode_range(ws['!ref']);
    
//     // Style headers
//     for (let col = range.s.c; col <= range.e.c; col++) {
//       const headerAddress = XLSX.utils.encode_cell({ r: 0, c: col });
//       if (ws[headerAddress]) {
//         ws[headerAddress].s = {
//           font: { bold: true },
//           alignment: { horizontal: "center" },
//           fill: { fgColor: { rgb: "D1D5DB" } }
//         };
//       }
//     }

//     // Style data rows
//     for (let row = range.s.r + 1; row <= range.e.r; row++) {
//       const isLastRow = row === range.e.r && totalNet > 0 && !is_allowance;
//       const originalIndex = row - 1;
//       const originalData = originalIndex < validData.length ? validData[originalIndex] : null;
      
//       for (let col = range.s.c; col <= range.e.c; col++) {
//         const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
//         if (ws[cellAddress]) {
//           let cellStyle = {
//             alignment: { horizontal: "left" },
//           };

//           // Special styling
//           if (isLastRow) {
//             cellStyle.font = { bold: true, size: 12 };
//             cellStyle.fill = { fgColor: { rgb: "E5E7EB" } };
//           } else if (originalData?.__isDifference) {
//             cellStyle.font = { bold: true, color: { rgb: "1E3A8A" } };
//             cellStyle.fill = { fgColor: { rgb: "DBEAFE" } };
//           } else if (originalData?.__isSummary) {
//             cellStyle.font = { bold: true };
//             cellStyle.fill = { fgColor: { rgb: "FEF3C7" } };
//           }

//           // Format numbers - don't format to show raw values including 0
//           const cellValue = ws[cellAddress].v;
//           // Removed number formatting
//           // if (typeof cellValue === 'number') {
//           //   cellStyle.numFmt = "#,##0.00";
//           // }

//           ws[cellAddress].s = cellStyle;
//         }
//       }
//     }

//     const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
//     const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
//     const data = new Blob([excelBuffer], { type: fileType });
//     FileSaver.saveAs(data, fileName + fileExtension);
//   }
// };



















// v4 
// /* eslint-disable no-unused-vars */
// import * as XLSX from "xlsx";
// import * as FileSaver from "file-saver";

// export const exportPayrollReportExcel = async ({
//   excelData,
//   fileName,
//   is_grouped,
//   is_yearly = false,
//   is_allowance = false,
// }) => {
//   console.log("Excel Data:", excelData);

//   const fileType =
//     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
//   const fileExtension = ".xlsx";

//   // If there's no data, return early
//   if (!excelData || excelData?.length === 0) return;

//   if (is_grouped) {
//     // Get headers from the first section's first data item
//     const firstSectionData = excelData?.[0]?.data;
//     if (!firstSectionData || firstSectionData.length === 0) return;

//     const headers = Object.keys(firstSectionData[0])
//       ?.filter(key => !key.startsWith('__')) // Exclude special markers like __isSummary, __isDifference
//       ?.map((header) => header?.toUpperCase());

//     // Create worksheet with headers
//     const ws = XLSX.utils.aoa_to_sheet([headers]);
//     let rowOffset = 1;

//     // Style headers
//     headers.forEach((header, colIndex) => {
//       const cellAddress = XLSX.utils.encode_cell({ r: 0, c: colIndex });
//       if (ws[cellAddress]) {
//         ws[cellAddress].s = {
//           font: { bold: true },
//           alignment: { horizontal: "center" },
//           fill: { fgColor: { rgb: "D1D5DB" } }
//         };
//       }
//     });

//     excelData?.forEach((section) => {
//       // Add section header only if it exists and is not empty
//       if (section?.header && section?.header.trim()) {
//         const nonSpecialDataCount = section?.data?.filter(item => !item.__isSummary && !item.__isDifference)?.length || 0;
        
//         // Add section header row
//         XLSX.utils.sheet_add_aoa(ws, [[section.header + ` (${nonSpecialDataCount})`]], {
//           origin: { r: rowOffset, c: 0 },
//         });

//         // Merge cells for section header
//         ws["!merges"] = ws["!merges"] || [];
//         ws["!merges"].push({
//           s: { r: rowOffset, c: 0 },
//           e: { r: rowOffset, c: headers.length - 1 },
//         });

//         // Style section header
//         const sectionHeaderAddress = XLSX.utils.encode_cell({ r: rowOffset, c: 0 });
//         if (ws[sectionHeaderAddress]) {
//           ws[sectionHeaderAddress].s = {
//             font: { bold: true, size: 12 },
//             alignment: { horizontal: "center" },
//             fill: { fgColor: { rgb: "F3F4F6" } }
//           };
//         }

//         rowOffset += 1;
//       }

//       // Process section data
//       section?.data?.forEach((row) => {
//         const rowData = headers.map((header) => {
//           const lowerHeader = header.toLowerCase();
//           const value = row[lowerHeader] || row[header] || row[header.charAt(0).toUpperCase() + header.slice(1).toLowerCase()] || "";
          
//           // Handle numeric values - show 0 if it's actually 0
//           if (typeof value === 'number') {
//             return value || 0;
//           }
          
//           // Handle string numbers - show 0 if it's actually "0"
//           if (typeof value === 'string' && !isNaN(value) && value !== '' && 
//               !header.includes('S/N') && !header.includes('STAFF_NUMBER') && 
//               !header.includes('COUNTER') && !header.includes('ID')) {
//             const numValue = parseFloat(value);
//             return isNaN(numValue) ? value : numValue;
//           }
          
//           // Return empty string if value is empty, otherwise return the value
//           return value === '' ? '' : value;
//         });

//         XLSX.utils.sheet_add_aoa(ws, [rowData], {
//           origin: { r: rowOffset, c: 0 },
//         });

//         // Apply styling based on row type
//         headers.forEach((header, colIndex) => {
//           const cellAddress = XLSX.utils.encode_cell({ r: rowOffset, c: colIndex });
//           if (ws[cellAddress]) {
//             let cellStyle = {
//               alignment: { horizontal: "left" },
//             };

//             // Special styling for summary and difference rows
//             if (row.__isDifference) {
//               cellStyle.font = { bold: true, color: { rgb: "1E3A8A" } };
//               cellStyle.fill = { fgColor: { rgb: "DBEAFE" } };
//             } else if (row.__isSummary) {
//               cellStyle.font = { bold: true };
//               cellStyle.fill = { fgColor: { rgb: "FEF3C7" } };
//             }

//             // Format numbers
//             const cellValue = ws[cellAddress].v;
//             if (typeof cellValue === 'number' && 
//                 !header.includes('S/N') && !header.includes('STAFF_NUMBER') && 
//                 !header.includes('COUNTER') && !header.includes('ID')) {
//               cellStyle.numFmt = "#,##0.00";
//             }

//             ws[cellAddress].s = cellStyle;
//           }
//         });

//         rowOffset += 1;
//       });
//     });

//     // Add overall total for non-allowance reports only
//     if (!is_allowance) {
//       let totalNet = 0;
      
//       excelData
//         .filter(section => section.header && section.header.trim())
//         .forEach(section => {
//           section.data
//             .filter(item => !item.__isSummary && !item.__isDifference)
//             .forEach(item => {
//               totalNet += (item.NET || item.Net || item.net || 
//                           Number(item.Amount) || Number(item.amount) || 
//                           Number(item.Total) || Number(item.total) || 0);
//             });
//         });

//       if (totalNet > 0) {
//         rowOffset += 1; // Add spacing

//         const totalRow = ["GRAND TOTAL", totalNet];
//         while (totalRow.length < headers.length) {
//           totalRow.push("");
//         }

//         XLSX.utils.sheet_add_aoa(ws, [totalRow], {
//           origin: { r: rowOffset, c: 0 },
//         });

//         // Style total row
//         headers.forEach((_, colIndex) => {
//           const cellAddress = XLSX.utils.encode_cell({ r: rowOffset, c: colIndex });
//           if (ws[cellAddress]) {
//             ws[cellAddress].s = {
//               font: { bold: true, size: 12 },
//               alignment: { horizontal: colIndex === 0 ? "left" : "right" },
//               fill: { fgColor: { rgb: "E5E7EB" } },
//               numFmt: colIndex === 1 ? "#,##0.00" : undefined
//             };
//           }
//         });
//       }
//     }

//     const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
//     const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
//     const data = new Blob([excelBuffer], { type: fileType });
//     FileSaver.saveAs(data, fileName + fileExtension);

//   } else {
//     // Handle non-grouped data
//     const validData = excelData.filter(item => item && typeof item === 'object');
    
//     if (validData.length === 0) return;

//     // Remove special markers from data
//     const cleanedData = validData.map(item => {
//       const cleaned = { ...item };
//       delete cleaned.__isSummary;
//       delete cleaned.__isDifference;
//       return cleaned;
//     });

//     // Calculate total for non-allowance reports only
//     let totalNet = 0;
//     if (!is_allowance ) {
//       validData
//         .filter(item => !item.__isSummary && !item.__isDifference)
//         .forEach(item => {
//           totalNet += (item?.NET || item?.Net || item?.net || 
//                       Number(item?.Amount) || Number(item?.amount) || 
//                       Number(item?.Total) || Number(item?.total) || 
//                       Number(item?.sum_pay) || 0);
//         });
//     }

//     // Add total row if applicable (only for non-allowance reports)
//     if (!is_allowance && totalNet > 0) {
//       const totalRow = {};
//       const keys = Object.keys(cleanedData[0] || {});

//       keys.forEach((key, index) => {
//         if (index === 0) {
//           totalRow[key] = "GRAND TOTAL";
//         } else if (key.toLowerCase().includes('net') || key.toLowerCase().includes('amount') || 
//                    key.toLowerCase().includes('total') || index === 1) {
//           totalRow[key] = totalNet;
//         } else {
//           totalRow[key] = "";
//         }
//       });

//       cleanedData.push(totalRow);
//     }

//     const ws = XLSX.utils.json_to_sheet(cleanedData);

//     // Apply styling
//     const range = XLSX.utils.decode_range(ws['!ref']);
    
//     // Style headers
//     for (let col = range.s.c; col <= range.e.c; col++) {
//       const headerAddress = XLSX.utils.encode_cell({ r: 0, c: col });
//       if (ws[headerAddress]) {
//         ws[headerAddress].s = {
//           font: { bold: true },
//           alignment: { horizontal: "center" },
//           fill: { fgColor: { rgb: "D1D5DB" } }
//         };
//       }
//     }

//     // Style data rows
//     for (let row = range.s.r + 1; row <= range.e.r; row++) {
//       const isLastRow = row === range.e.r && totalNet > 0 && !is_allowance;
//       const originalIndex = row - 1;
//       const originalData = originalIndex < validData.length ? validData[originalIndex] : null;
      
//       for (let col = range.s.c; col <= range.e.c; col++) {
//         const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
//         if (ws[cellAddress]) {
//           let cellStyle = {
//             alignment: { horizontal: "left" },
//           };

//           // Special styling
//           if (isLastRow) {
//             cellStyle.font = { bold: true, size: 12 };
//             cellStyle.fill = { fgColor: { rgb: "E5E7EB" } };
//           } else if (originalData?.__isDifference) {
//             cellStyle.font = { bold: true, color: { rgb: "1E3A8A" } };
//             cellStyle.fill = { fgColor: { rgb: "DBEAFE" } };
//           } else if (originalData?.__isSummary) {
//             cellStyle.font = { bold: true };
//             cellStyle.fill = { fgColor: { rgb: "FEF3C7" } };
//           }

//           // Format numbers - this will now show 0 when the value is 0
//           const cellValue = ws[cellAddress].v;
//           if (typeof cellValue === 'number') {
//             cellStyle.numFmt = "#,##0.00";
//           }

//           ws[cellAddress].s = cellStyle;
//         }
//       }
//     }

//     const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
//     const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
//     const data = new Blob([excelBuffer], { type: fileType });
//     FileSaver.saveAs(data, fileName + fileExtension);
//   }
// };

// v3 
// /* eslint-disable no-unused-vars */
// import * as XLSX from "xlsx";
// import * as FileSaver from "file-saver";

// export const exportPayrollReportExcel = async ({
//   excelData,
//   fileName,
//   is_grouped,
//   is_yearly = false,
//   is_allowance = false,
// }) => {
//   console.log("Excel Data:", excelData);

//   const fileType =
//     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
//   const fileExtension = ".xlsx";

//   // If there's no data, return early
//   if (!excelData || excelData?.length === 0) return;

//   if (is_grouped) {
//     // Get headers from the first section's first data item
//     const firstSectionData = excelData?.[0]?.data;
//     if (!firstSectionData || firstSectionData.length === 0) return;

//     const headers = Object.keys(firstSectionData[0])
//       ?.filter(key => !key.startsWith('__')) // Exclude special markers like __isSummary, __isDifference
//       ?.map((header) => header?.toUpperCase());

//     // Create worksheet with headers
//     const ws = XLSX.utils.aoa_to_sheet([headers]);
//     let rowOffset = 1;

//     // Style headers
//     headers.forEach((header, colIndex) => {
//       const cellAddress = XLSX.utils.encode_cell({ r: 0, c: colIndex });
//       if (ws[cellAddress]) {
//         ws[cellAddress].s = {
//           font: { bold: true },
//           alignment: { horizontal: "center" },
//           fill: { fgColor: { rgb: "D1D5DB" } }
//         };
//       }
//     });

//     excelData?.forEach((section) => {
//       // Add section header only if it exists and is not empty
//       if (section?.header && section?.header.trim()) {
//         const nonSpecialDataCount = section?.data?.filter(item => !item.__isSummary && !item.__isDifference)?.length || 0;
        
//         // Add section header row
//         XLSX.utils.sheet_add_aoa(ws, [[section.header + ` (${nonSpecialDataCount})`]], {
//           origin: { r: rowOffset, c: 0 },
//         });

//         // Merge cells for section header
//         ws["!merges"] = ws["!merges"] || [];
//         ws["!merges"].push({
//           s: { r: rowOffset, c: 0 },
//           e: { r: rowOffset, c: headers.length - 1 },
//         });

//         // Style section header
//         const sectionHeaderAddress = XLSX.utils.encode_cell({ r: rowOffset, c: 0 });
//         if (ws[sectionHeaderAddress]) {
//           ws[sectionHeaderAddress].s = {
//             font: { bold: true, size: 12 },
//             alignment: { horizontal: "center" },
//             fill: { fgColor: { rgb: "F3F4F6" } }
//           };
//         }

//         rowOffset += 1;
//       }

//       // Process section data
//       section?.data?.forEach((row) => {
//         const rowData = headers.map((header) => {
//           const lowerHeader = header.toLowerCase();
//           const value = row[lowerHeader] || row[header] || row[header.charAt(0).toUpperCase() + header.slice(1).toLowerCase()] || "";
          
//           // Handle numeric values
//           if (typeof value === 'number') {
//             return value;
//           }
          
//           // Handle string numbers
//           if (typeof value === 'string' && !isNaN(value) && value !== '' && 
//               !header.includes('S/N') && !header.includes('STAFF_NUMBER') && 
//               !header.includes('COUNTER') && !header.includes('ID')) {
//             const numValue = parseFloat(value);
//             return isNaN(numValue) ? value : numValue;
//           }
          
//           return value;
//         });

//         XLSX.utils.sheet_add_aoa(ws, [rowData], {
//           origin: { r: rowOffset, c: 0 },
//         });

//         // Apply styling based on row type
//         headers.forEach((header, colIndex) => {
//           const cellAddress = XLSX.utils.encode_cell({ r: rowOffset, c: colIndex });
//           if (ws[cellAddress]) {
//             let cellStyle = {
//               alignment: { horizontal: "left" },
//             };

//             // Special styling for summary and difference rows
//             if (row.__isDifference) {
//               cellStyle.font = { bold: true, color: { rgb: "1E3A8A" } };
//               cellStyle.fill = { fgColor: { rgb: "DBEAFE" } };
//             } else if (row.__isSummary) {
//               cellStyle.font = { bold: true };
//               cellStyle.fill = { fgColor: { rgb: "FEF3C7" } };
//             }

//             // Format numbers
//             const cellValue = ws[cellAddress].v;
//             if (typeof cellValue === 'number' && 
//                 !header.includes('S/N') && !header.includes('STAFF_NUMBER') && 
//                 !header.includes('COUNTER') && !header.includes('ID')) {
//               cellStyle.numFmt = "#,##0.00";
//             }

//             ws[cellAddress].s = cellStyle;
//           }
//         });

//         rowOffset += 1;
//       });
//     });

//     // Add overall total for non-allowance reports
//     if (!is_allowance) {
//       let totalNet = 0;
      
//       excelData
//         .filter(section => section.header && section.header.trim())
//         .forEach(section => {
//           section.data
//             .filter(item => !item.__isSummary && !item.__isDifference)
//             .forEach(item => {
//               totalNet += (item.NET || item.Net || item.net || 
//                           Number(item.Amount) || Number(item.amount) || 
//                           Number(item.Total) || Number(item.total) || 0);
//             });
//         });

//       if (totalNet > 0) {
//         rowOffset += 1; // Add spacing

//         const totalRow = ["GRAND TOTAL", totalNet];
//         while (totalRow.length < headers.length) {
//           totalRow.push("");
//         }

//         XLSX.utils.sheet_add_aoa(ws, [totalRow], {
//           origin: { r: rowOffset, c: 0 },
//         });

//         // Style total row
//         headers.forEach((_, colIndex) => {
//           const cellAddress = XLSX.utils.encode_cell({ r: rowOffset, c: colIndex });
//           if (ws[cellAddress]) {
//             ws[cellAddress].s = {
//               font: { bold: true, size: 12 },
//               alignment: { horizontal: colIndex === 0 ? "left" : "right" },
//               fill: { fgColor: { rgb: "E5E7EB" } },
//               numFmt: colIndex === 1 ? "#,##0.00" : undefined
//             };
//           }
//         });
//       }
//     }

//     const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
//     const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
//     const data = new Blob([excelBuffer], { type: fileType });
//     FileSaver.saveAs(data, fileName + fileExtension);

//   } else {
//     // Handle non-grouped data
//     const validData = excelData.filter(item => item && typeof item === 'object');
    
//     if (validData.length === 0) return;

//     // Remove special markers from data
//     const cleanedData = validData.map(item => {
//       const cleaned = { ...item };
//       delete cleaned.__isSummary;
//       delete cleaned.__isDifference;
//       return cleaned;
//     });

//     // Calculate total for non-allowance reports
//     let totalNet = 0;
//     if (!is_allowance) {
//       validData
//         .filter(item => !item.__isSummary && !item.__isDifference)
//         .forEach(item => {
//           totalNet += (item?.NET || item?.Net || item?.net || 
//                       Number(item?.Amount) || Number(item?.amount) || 
//                       Number(item?.Total) || Number(item?.total) || 
//                       Number(item?.sum_pay) || 0);
//         });
//     }

//     // Add total row if applicable
//     if (!is_allowance && totalNet > 0) {
//       const totalRow = {};
//       const keys = Object.keys(cleanedData[0] || {});

//       keys.forEach((key, index) => {
//         if (index === 0) {
//           totalRow[key] = "GRAND TOTAL";
//         } else if (key.toLowerCase().includes('net') || key.toLowerCase().includes('amount') || 
//                    key.toLowerCase().includes('total') || index === 1) {
//           totalRow[key] = totalNet;
//         } else {
//           totalRow[key] = "";
//         }
//       });

//       cleanedData.push(totalRow);
//     }

//     const ws = XLSX.utils.json_to_sheet(cleanedData);

//     // Apply styling
//     const range = XLSX.utils.decode_range(ws['!ref']);
    
//     // Style headers
//     for (let col = range.s.c; col <= range.e.c; col++) {
//       const headerAddress = XLSX.utils.encode_cell({ r: 0, c: col });
//       if (ws[headerAddress]) {
//         ws[headerAddress].s = {
//           font: { bold: true },
//           alignment: { horizontal: "center" },
//           fill: { fgColor: { rgb: "D1D5DB" } }
//         };
//       }
//     }

//     // Style data rows
//     for (let row = range.s.r + 1; row <= range.e.r; row++) {
//       const isLastRow = row === range.e.r && totalNet > 0 && !is_allowance;
//       const originalIndex = row - 1;
//       const originalData = originalIndex < validData.length ? validData[originalIndex] : null;
      
//       for (let col = range.s.c; col <= range.e.c; col++) {
//         const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
//         if (ws[cellAddress]) {
//           let cellStyle = {
//             alignment: { horizontal: "left" },
//           };

//           // Special styling
//           if (isLastRow) {
//             cellStyle.font = { bold: true, size: 12 };
//             cellStyle.fill = { fgColor: { rgb: "E5E7EB" } };
//           } else if (originalData?.__isDifference) {
//             cellStyle.font = { bold: true, color: { rgb: "1E3A8A" } };
//             cellStyle.fill = { fgColor: { rgb: "DBEAFE" } };
//           } else if (originalData?.__isSummary) {
//             cellStyle.font = { bold: true };
//             cellStyle.fill = { fgColor: { rgb: "FEF3C7" } };
//           }

//           // Format numbers
//           const cellValue = ws[cellAddress].v;
//           if (typeof cellValue === 'number') {
//             cellStyle.numFmt = "#,##0.00";
//           }

//           ws[cellAddress].s = cellStyle;
//         }
//       }
//     }

//     const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
//     const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
//     const data = new Blob([excelBuffer], { type: fileType });
//     FileSaver.saveAs(data, fileName + fileExtension);
//   }
// };








// v1 
// /* eslint-disable no-unused-vars */
// import * as XLSX from "xlsx";
// import * as FileSaver from "file-saver";

// export const exportPayrollReportExcel = async ({
//   excelData,
//   fileName,
//   is_grouped,
// }) => {
//   console.log(excelData[0]);

 
//   const fileType =
//     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
//   const fileExtension = ".xlsx";

//   // If there's no data, return early
//   if (!excelData || excelData?.length === 0) return;

//   if (is_grouped) {
//     // Dynamically generate headers based on the first section's data keys
//     const firstSectionData = excelData?.[0]?.data;
//     const headers =
//       firstSectionData?.length > 0
//         ? Object.keys(firstSectionData[0])?.map((header) =>
//             header?.toUpperCase()
//           )
//         : [];

//     // Start with an empty sheet and insert the headers first
//     const ws = XLSX.utils.aoa_to_sheet([headers]);
//     let rowOffset = 1; // Start after the headers row

//     excelData?.forEach((section) => {
//       const totalCount = section?.data?.length || 0;
//       const countText = `(${totalCount})`;

//       // Add a merged header row for each section (e.g., "Governor Table")
//       XLSX.utils.sheet_add_aoa(ws, [[section?.header]], {
//         origin: { r: rowOffset, c: 0 },
//       });

//       XLSX.utils.sheet_add_aoa(ws, [[countText]], {
//         origin: { r: rowOffset, c: headers?.length - 1 },
//       });

//       ws["!merges"] = ws["!merges"] || [];
//       // Merge only the middle columns, leaving first and last separate
//       if (headers?.length > 2) {
//         ws["!merges"].push({
//           s: { r: rowOffset, c: 1 },
//           e: { r: rowOffset, c: headers?.length - 2 },
//         });
//       }

//       // Apply bold style to the group header
//       ws[`A${rowOffset + 1}`].s = {
//         font: { bold: true },
//         alignment: { horizontal: "center" },
//       };

//       rowOffset += 1;

//       // Add the data rows for the group
//       const dataRows = section?.data?.map((row) =>
//         headers?.map((header) => row[header?.toUpperCase()] || "")
//       );
//       XLSX.utils.sheet_add_aoa(ws, dataRows, {
//         origin: { r: rowOffset, c: 0 },
//       });

//       // Apply left alignment to all data cells
//       dataRows.forEach((row, rowIndex) => {
//         row.forEach((cell, colIndex) => {
//           const cellAddress = XLSX.utils.encode_cell({
//             r: rowOffset + rowIndex,
//             c: colIndex,
//           });

//           if (ws[cellAddress]) {
//             ws[cellAddress].s = {
//               alignment: { horizontal: "left" },
//             };
//           }
//         });
//       });

//       rowOffset += dataRows.length; // Move the offset after the data
//     });

//     // Move Net Total calculation and addition OUTSIDE the forEach loop
//     const totalNet = excelData.reduce((total, v) => {
//       const itemTotal = v.data.reduce((subTotal, el) => {
//         return subTotal + (el.NET || 0);
//       }, 0);
//       return total + itemTotal;
//     }, 0);

//     rowOffset += 1; // Add space before Net Total

//     XLSX.utils.sheet_add_aoa(ws, [["Net Total", totalNet]], {
//       origin: { r: rowOffset, c: 0 },
//     });

//     // Merge columns from the third column onwards (if there are more than 2 columns)
//     if (headers?.length > 2) {
//       ws["!merges"] = ws["!merges"] || [];
//       ws["!merges"].push({
//         s: { r: rowOffset, c: 2 },
//         e: { r: rowOffset, c: headers?.length - 1 },
//       });
//     }

//     // Apply bold style to Net Total row
//     ws[`A${rowOffset + 1}`].s = { font: { bold: true } };
//     ws[`B${rowOffset + 1}`].s = { font: { bold: true } };

//     const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
//     const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
//     const data = new Blob([excelBuffer], { type: fileType });
//     FileSaver.saveAs(data, fileName + fileExtension);
//   } else {
//     // Calculate the net total
//     const totalNet = excelData.reduce((total, item) => {
//       return total + (item.NET || 0);
//     }, 0);

//     // Create Net Total row - put "Net Total" in first column and value in second column
//     const netTotalRow = {};
//     const firstItem = excelData[0] || {};
//     const keys = Object.keys(firstItem);

//     keys.forEach((key, index) => {
//       if (index === 0) {
//         netTotalRow[key] = "Net Total";
//       } else if (index === 1) {
//         netTotalRow[key] = totalNet;
//       } else {
//         netTotalRow[key] = "";
//       }
//     });

//     // Add Net Total row to the data
//     const dataWithTotal = [...excelData, netTotalRow];

//     const ws = XLSX.utils.json_to_sheet(dataWithTotal);

//     // Apply bold style to the Net Total row (first two columns)
//     const lastRowIndex = dataWithTotal.length;
//     const firstCellAddress = XLSX.utils.encode_cell({
//       r: lastRowIndex - 1,
//       c: 0,
//     });
//     const secondCellAddress = XLSX.utils.encode_cell({
//       r: lastRowIndex - 1,
//       c: 1,
//     });

//     if (ws[firstCellAddress]) {
//       ws[firstCellAddress].s = { font: { bold: true } };
//     }
//     if (ws[secondCellAddress]) {
//       ws[secondCellAddress].s = { font: { bold: true } };
//     }

//     const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
//     const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
//     const data = new Blob([excelBuffer], { type: fileType });
//     FileSaver.saveAs(data, fileName + fileExtension);


//   }
// };













// ***********DATA********************


    //     // Calculate the net total
    // const totalNet = excelData.reduce((total, item) => {
    //   return total + (item.NET || 0);
    // }, 0);

    // // Create Net Total row - get first item's keys and set appropriate values
    // const netTotalRow = {};
    // const firstItem = excelData[0] || {};
    // const firstKey = Object.keys(firstItem)[0]; // Get the first property name

    // Object.keys(firstItem).forEach(key => {
    //   if (key === 'NET') {
    //     netTotalRow[key] = totalNet;
    //   } else if (key === firstKey) {
    //     netTotalRow[key] = 'Net Total';
    //   } else {
    //     netTotalRow[key] = '';
    //   }
    // });

    // // Add Net Total row to the data
    // const dataWithTotal = [...excelData, netTotalRow];

    // const ws = XLSX.utils.json_to_sheet(dataWithTotal);

    // // Apply bold style to the last row (Net Total row)
    // const lastRowIndex = dataWithTotal.length;
    // Object.keys(firstItem).forEach((key, colIndex) => {
    //   const cellAddress = XLSX.utils.encode_cell({ r: lastRowIndex - 1, c: colIndex });
    //   if (ws[cellAddress]) {
    //     ws[cellAddress].s = { font: { bold: true } };
    //   }
    // });

    //   const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    //   const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    //   const data = new Blob([excelBuffer], { type: fileType });
    //   FileSaver.saveAs(data, fileName + fileExtension);

    // const ws = XLSX.utils.json_to_sheet(excelData);
    // const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    // const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    // const data = new Blob([excelBuffer], { type: fileType });
    // FileSaver.saveAs(data, fileName + fileExtension);






//  const excelDatas = [
//     {
//       header: "Statement 1",
//       data: [
//         {
//           id: "653e1dd7dc36e18e26a927d4",
//           type: "debit",
//           amount: 10000,
//           narration:
//             "TRF null TO CLAN AFRICA INNOVATION LIMITED-BAM BAM COSMETICS FROM TAIWO ENOCH",
//           balance: null,
//           date: "2023-10-23T00:00:00.000Z",
//           currency: "NGN",
//         },
//         {
//           id: "653e1dd7dc36e18e26a927d0",
//           type: "debit",
//           amount: 82000,
//           narration: "POS WEB PMT PALMPAY LIMITED LA LANG",
//           balance: null,
//           date: "2023-10-23T00:00:00.000Z",
//           currency: "NGN",
//         },
//         {
//           id: "653e1dd7dc36e18e26a927d1",
//           type: "debit",
//           amount: 50000,
//           narration: "AIRTIME MTN 08102637956",
//           balance: null,
//           date: "2023-10-23T00:00:00.000Z",
//           currency: "NGN",
//         },
//         {
//           id: "653e1dd7dc36e18e26a927d2",
//           type: "debit",
//           amount: 1002687,
//           narration: "TRF FRM TAIWO ENOCH TO FOLASHADE CECILIA OLUGBENGA- 076",
//           balance: null,
//           date: "2023-10-23T00:00:00.000Z",
//           currency: "NGN",
//         },
//         {
//           id: "653e1dd7dc36e18e26a927d3",
//           type: "debit",
//           amount: 50000,
//           narration:
//             "TRF null TO CLAN AFRICA INNOVATION LIMITED-SOJI ORIYOMI OKUNUGA FROM TAIWO ENOCH",
//           balance: null,
//           date: "2023-10-23T00:00:00.000Z",
//           currency: "NGN",
//         },
//         {
//           id: "653e1dd7dc36e18e26a927d6",
//           type: "debit",
//           amount: 620000,
//           narration: "POS WEB PMT LA 00NG",
//           balance: null,
//           date: "2023-10-22T00:00:00.000Z",
//           currency: "NGN",
//         },
//         {
//           id: "653e1dd7dc36e18e26a927d7",
//           type: "debit",
//           amount: 181075,
//           narration: "TRF FRM TAIWO ENOCH TO ISAH NUHU DANLAMI- 011",
//           balance: null,
//           date: "2023-10-22T00:00:00.000Z",
//           currency: "NGN",
//         },
//         {
//           id: "653e1dd7dc36e18e26a927d5",
//           type: "debit",
//           amount: 141075,
//           narration: "TRF FRM TAIWO ENOCH TO BABATUNDE JAMIU YUSUF- 033",
//           balance: null,
//           date: "2023-10-22T00:00:00.000Z",
//           currency: "NGN",
//         },
//       ],
//     },
//     {
//       header: "Statement section 2",
//       data: [
//         {
//           id: "653e1dd7dc36e18e26a927c5",
//           type: "debit",
//           amount: 50000,
//           narration: "AIRTIME MTN 09064531611",
//           balance: null,
//           date: "2023-10-29T00:00:00.000Z",
//           currency: "NGN",
//         },
//         {
//           id: "653e1dd7dc36e18e26a927c6",
//           type: "debit",
//           amount: 500000,
//           narration: "AIRTIME MTN 09064531611",
//           balance: null,
//           date: "2023-10-29T00:00:00.000Z",
//           currency: "NGN",
//         },
//         {
//           id: "653e1dd7dc36e18e26a927c7",
//           type: "debit",
//           amount: 748900,
//           narration: "T696628 2TAB9ZQ7 DCIR POS LANG",
//           balance: null,
//           date: "2023-10-26T00:00:00.000Z",
//           currency: "NGN",
//         },
//         {
//           id: "653e1dd7dc36e18e26a927cc",
//           type: "debit",
//           amount: 101075,
//           narration: "TRF FRM TAIWO ENOCH TO KAUSARA OMOWUNMI RABIU- 033",
//           balance: null,
//           date: "2023-10-25T00:00:00.000Z",
//           currency: "NGN",
//         },
//       ],
//     },
//     {
//       header: "Third Statement, Department of Banking and Finance of John",
//       data: [
//         {
//           id: "653e1dd7dc36e18e26a927cb",
//           type: "debit",
//           amount: 44290,
//           narration: "SMS Alert Fee-24 09-23 10 2023 + VAT",
//           balance: null,
//           date: "2023-10-25T00:00:00.000Z",
//           currency: "NGN",
//         },
//         {
//           id: "653e1dd7dc36e18e26a927ca",
//           type: "debit",
//           amount: 201075,
//           narration: "TRF FRM TAIWO ENOCH TO MFY BUY- 035",
//           balance: null,
//           date: "2023-10-25T00:00:00.000Z",
//           currency: "NGN",
//         },
//         {
//           id: "653e1dd7dc36e18e26a927c9",
//           type: "debit",
//           amount: 301075,
//           narration: "TRF FRM TAIWO ENOCH TO ESTHER TIMOTHY- 033",
//           balance: null,
//           date: "2023-10-25T00:00:00.000Z",
//           currency: "NGN",
//         },
//       ],
//     },
//     {
//       header: "DIRECTORATES OF LEGAL SERVICES",
//       data: [
//         {
//           id: "653e1dd7dc36e18e26a927c8",
//           type: "debit",
//           amount: 1502688,
//           narration: "TRF FRM TAIWO ENOCH TO JOHN OLUWAKAYODE ADEOYE- C03",
//           balance: null,
//           date: "2023-10-25T00:00:00.000Z",
//           currency: "NGN",
//         },
//         {
//           id: "653e1dd7dc36e18e26a927ce",
//           type: "debit",
//           amount: 550000,
//           narration: "AIRTIME MTN 09064531611",
//           balance: null,
//           date: "2023-10-24T00:00:00.000Z",
//           currency: "NGN",
//         },
//       ],
//     },
//   ];