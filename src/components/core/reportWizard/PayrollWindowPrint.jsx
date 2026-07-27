
// printPayrollReport.js
import { formatNumberWithComma, toStringDate } from "../../../utils/utitlities";

export const printPayrollReport = ({
  tableData,
  is_grouped,
  is_staff = false,
  is_yearly = false,
  is_allowance = false,
  title,
  generateTableHead,
  rearrangeData,
  rearrangeStaffData,
  reformatData
}) => {
  // Process data same way as component
  const rowsData = is_staff ? rearrangeStaffData(tableData, is_yearly, is_allowance) : 
                   is_grouped ? rearrangeData(tableData, is_yearly, is_allowance) : 
                   reformatData(tableData, is_yearly);
  const headers = generateTableHead();

  // Calculate total
  let totalNet = 0;
  if (is_grouped || is_staff) {
    totalNet = rowsData.reduce((total, section) => {
      const sectionTotal = section.data
        .filter(item => !item.__isSummary && !item.__isDifference && !item.__isStaffNet && !item.__isStaffNetSpacer)
        .reduce((subTotal, item) => {
          return subTotal + (item.NET || item.Net || Number(item?.amount) || Number(item?.Amount) || 0);
        }, 0);
      return total + sectionTotal;
    }, 0);
  } else {
    totalNet = rowsData
      .filter(item => !item.__isSummary && !item.__isDifference)
      .reduce((total, item) => {
        return total + (item?.NET || item?.Net || Number(item?.amount) || Number(item?.Amount) || Number(item?.Total) || Number(item?.sum_pay) || 0);
      }, 0);
  }

  // Generate print HTML
  const printContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title?.replaceAll("'", "") || 'Payroll Report'}</title>
      <style>
        @media print {
          @page {
            size: A4 landscape;
            margin: 0.5in;
          }
          body { margin: 0; }
        }
        
        body {
          font-family: 'Helvetica', Arial, sans-serif;
          font-size: 10px;
          line-height: 1.2;
          margin: 0;
          padding: 20px;
        }
        
        .report-title {
          text-align: center;
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 20px;
          text-transform: uppercase;
        }
        
        .print-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 10px;
        }
        
        .print-table th,
        .print-table td {
          border: 1px solid #ddd;
          padding: 4px 6px;
          text-align: left;
          font-size: 9px;
        }
        
        .print-table th {
          background-color: #f5f5f5;
          font-weight: bold;
          text-align: center;
        }
        
        .group-header {
          background-color: #f0f0f0;
          font-weight: bold;
          text-transform: uppercase;
        }
        
        .staff-header {
          background-color: #e3f2fd;
          font-weight: bold;
          text-transform: uppercase;
          color: #1976d2;
        }
        
        .summary-row {
          background-color: #fff3cd;
          font-weight: bold;
        }
        
        .difference-row {
          background-color: #d1ecf1;
          font-weight: bold;
          color: #0c5460;
        }
        
        .staff-net-row {
          background-color: #e8f5e8;
          font-weight: bold;
          color: #2e7d32;
        }
        
        .staff-net-spacer {
          background-color: #ffffff;
          height: 20px;
        }
        
        .total-row {
          background-color: #e9ecef;
          font-weight: bold;
          font-size: 11px;
        }
        
        .number-cell {
          text-align: right;
        }
        
        .break-words {
          word-break: break-word;
          max-width: 120px;
        }
      </style>
    </head>
    <body>
      <div class="report-title">${title?.replaceAll("'", "") || 'Payroll Report'}</div>
      
      <table class="print-table">
        <thead>
          <tr>
            ${headers.map(header => 
              `<th>${header?.replaceAll("_", " ")?.toUpperCase() || ''}</th>`
            ).join('')}
          </tr>
        </thead>
        <tbody>
          ${(is_grouped || is_staff) ? 
            rowsData.map(section => {
              const groupRows = section.header ? 
                `<tr class="${section.isStaffHeader ? 'staff-header' : 'group-header'}">
                  <td colspan="${headers.length}">
                    ${section.header || 'Unknown'} 
                    ${section.groupLength ? `(${section.groupLength})` : ''}
                  </td>
                </tr>` : '';
              
              const dataRows = section.data.map(row => {
                const rowClass = row.__isDifference ? 'difference-row' : 
                                row.__isSummary ? 'summary-row' : 
                                row.__isStaffNet ? 'staff-net-row' :
                                row.__isStaffNetSpacer ? 'staff-net-spacer' : '';
                
                return `<tr class="${rowClass}">
                  ${headers.map(header => {
                    const value = row[header];
                    const isNumber = !header.includes("S/N") && 
                                    !header.includes("SNo") &&
                                    !header.includes("NO OF STAFF") &&
                                    !header.includes("Grade") &&
                                    !header.includes("grade") &&
                                    !header.includes("STEP") &&
                                    !header.includes("GRADE") &&
                                    !header.includes("PFA CODE") &&
                                    !header.includes("remita_code") &&
                                    !header.includes("REMITA CODE") &&
                                    !header.includes("TIN NO") &&
                                    !header.includes("ACCOUNT NO") &&
                                    !header.includes("Duration") &&
                                    !header.includes("Step") &&
                                    !header.includes("step") &&
                                    !header.includes("Counter") &&
                                    !header.includes("COUNTER") &&
                                    !header.includes("account_no") &&
                                    !header.includes("staff_id") &&
                                   Number.isFinite(Number(value)) && 
                                   value != 0;
                    
                    const isDate = header?.includes("DATE");
                    const isMonthColumn = is_yearly && ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec', 'net'].includes(header.toLowerCase());
                    
                    let displayValue = value ?? "N/A";
                    
                    if (isDate && value) {
                      displayValue = toStringDate(value);
                    } else if(value === 0) {
                      displayValue = "0"
                    } else if(!value && value != '' && value != ' ' ) {
                      displayValue = "N/A"
                    } else if (isNumber || isMonthColumn) {
                      displayValue = formatNumberWithComma(parseFloat(value || 0));
                    }
                    
                    const cellClass = (isNumber || isMonthColumn) ? 'number-cell' : 
                                    ['HOME_ADDRESS', 'DIRECTORATE', 'DESIGNATION_NAME', 'NAME'].includes(header) ? 'break-words' : '';
                    
                    return `<td class="${cellClass}">${displayValue}</td>`;
                  }).join('')}
                </tr>`;
              }).join('');
              
              return groupRows + dataRows;
            }).join('') :
            
            rowsData.map(row => {
              const rowClass = row.__isDifference ? 'difference-row' : 
                              row.__isSummary ? 'summary-row' : '';
              
              return `<tr class="${rowClass}">
                ${headers.map(header => {
                  const value = row[header];
                  const isNumber = !header.includes("payroll_run_id") &&
                                  !header.includes("S/N") &&
                                    !header.includes("name") &&
                                    !header.includes("NO OF STAFF") &&
                                    !header.includes("Grade") &&
                                    !header.includes("grade") &&
                                    !header.includes("STEP") &&
                                    !header.includes("GRADE") &&
                                    !header.includes("PFA CODE") &&
                                    !header.includes("remita_code") &&
                                    !header.includes("REMITA CODE") &&
                                    !header.includes("ACCOUNT NO") &&
                                    !header.includes("Duration") &&
                                    !header.includes("Step") &&
                                    !header.includes("TIN NO") &&
                                    !header.includes("step") &&
                                    !header.includes("Counter") &&
                                    !header.includes("COUNTER") &&
                                    !header.includes("account_no") &&
                                    !header.includes("staff_id") &&
                                 Number.isFinite(Number(value)) &&
                                 value != 0;
                  
                  const isDate = header?.includes("DATE");
                  const isMonthColumn = is_yearly && ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec', 'net'].includes(header.toLowerCase());
                  
                  let displayValue = value ?? "N/A";
                  
                  if (isDate && value) {
                    displayValue = toStringDate(value);
                  } else if (isNumber || isMonthColumn) {
                    displayValue = formatNumberWithComma(parseFloat(value || 0));
                  }
                  
                  const cellClass = (isNumber || isMonthColumn) ? 'number-cell' : 
                                  ['HOME_ADDRESS', 'DIRECTORATE', 'DESIGNATION_NAME', 'NAME'].includes(header) ? 'break-words' : '';
                  
                  return `<td class="${cellClass}">${displayValue}</td>`;
                }).join('')}
              </tr>`;
            }).join('')
          }
        </tbody>
      </table>
      
      ${!!totalNet && !is_allowance ? `
        <table class="print-table">
          <tr class="total-row">
            <td style="width: 200px;">NET TOTAL</td>
            <td class="number-cell">${formatNumberWithComma(totalNet)}</td>
          </tr>
        </table>
      ` : ''}
    </body>
    </html>
  `;

  // Open print window
  const printWindow = window.open('', '_blank');
  printWindow.document.writeln(printContent);
  printWindow.document.close();
  
  // Wait for content to load then print
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };
};

























// // printPayrollReport.js
// import { formatNumberWithComma, toStringDate } from "../../../utils/utitlities";

// export const printPayrollReport = ({
//   tableData,
//   is_grouped,
//   is_yearly = false,
//   is_allowance = false,
//   title,
//   generateTableHead,
//   rearrangeData,
//   reformatData
// }) => {
//   // Process data same way as component
//   const rowsData = is_grouped ? rearrangeData(tableData, is_yearly, is_allowance) : reformatData(tableData, is_yearly);
//   const headers = generateTableHead();

//   // Calculate total
//   let totalNet = 0;
//   if (is_grouped) {
//     totalNet = rowsData.reduce((total, section) => {
//       const sectionTotal = section.data
//         .filter(item => !item.__isSummary && !item.__isDifference)
//         .reduce((subTotal, item) => {
//           return subTotal + (item.NET || item.Net || Number(item?.amount) || Number(item?.Amount) || 0);
//         }, 0);
//       return total + sectionTotal;
//     }, 0);
//   } else {
//     totalNet = rowsData
//       .filter(item => !item.__isSummary && !item.__isDifference)
//       .reduce((total, item) => {
//         return total + (item?.NET || item?.Net || Number(item?.amount) || Number(item?.Amount) || Number(item?.Total) || Number(item?.sum_pay) || 0);
//       }, 0);
//   }

//   // Generate print HTML
//   const printContent = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <title>${title?.replaceAll("'", "") || 'Payroll Report'}</title>
//       <style>
//         @media print {
//           @page {
//             size: A4 landscape;
//             margin: 0.5in;
//           }
//           body { margin: 0; }
//         }
        
//         body {
//           font-family: 'Helvetica', Arial, sans-serif;
//           font-size: 10px;
//           line-height: 1.2;
//           margin: 0;
//           padding: 20px;
//         }
        
//         .report-title {
//           text-align: center;
//           font-size: 16px;
//           font-weight: bold;
//           margin-bottom: 20px;
//           text-transform: uppercase;
//         }
        
//         .print-table {
//           width: 100%;
//           border-collapse: collapse;
//           margin-bottom: 10px;
//         }
        
//         .print-table th,
//         .print-table td {
//           border: 1px solid #ddd;
//           padding: 4px 6px;
//           text-align: left;
//           font-size: 9px;
//         }
        
//         .print-table th {
//           background-color: #f5f5f5;
//           font-weight: bold;
//           text-align: center;
//         }
        
//         .group-header {
//           background-color: #f0f0f0;
//           font-weight: bold;
//           text-transform: uppercase;
//         }
        
//         .summary-row {
//           background-color: #fff3cd;
//           font-weight: bold;
//         }
        
//         .difference-row {
//           background-color: #d1ecf1;
//           font-weight: bold;
//           color: #0c5460;
//         }
        
//         .total-row {
//           background-color: #e9ecef;
//           font-weight: bold;
//           font-size: 11px;
//         }
        
//         .number-cell {
//           text-align: right;
//         }
        
//         .break-words {
//           word-break: break-word;
//           max-width: 120px;
//         }
//       </style>
//     </head>
//     <body>
//       <div class="report-title">${title?.replaceAll("'", "") || 'Payroll Report'}</div>
      
//       <table class="print-table">
//         <thead>
//           <tr>
//             ${headers.map(header => 
//               `<th>${header?.replaceAll("_", " ")?.toUpperCase() || ''}</th>`
//             ).join('')}
//           </tr>
//         </thead>
//         <tbody>
//           ${is_grouped ? 
//             rowsData.map(section => {
//               const groupRows = section.header ? 
//                 `<tr class="group-header">
//                   <td colspan="${headers.length}">
//                     ${section.header || 'Unknown'} 
//                     (${section?.data?.filter(d => !d.__isSummary && !d.__isDifference)?.length || 0})
//                   </td>
//                 </tr>` : '';
              
//               const dataRows = section.data.map(row => {
//                 const rowClass = row.__isDifference ? 'difference-row' : 
//                                 row.__isSummary ? 'summary-row' : '';
                
//                 return `<tr class="${rowClass}">
//                   ${headers.map(header => {
//                     const value = row[header];
//                     const isNumber = !header.includes("S/N") && 
//                                     !header.includes("SNo") &&
//                                     !header.includes("NO OF STAFF") &&
//                                     !header.includes("Grade") &&
//                                     !header.includes("grade") &&
//                                     !header.includes("remita_code") &&
//                                     !header.includes("REMITA CODE") &&
//                                     !header.includes("ACCOUNT NO") &&
//                                     !header.includes("Step") &&
//                                     !header.includes("step") &&
//                                     !header.includes("Counter") &&
//                                     !header.includes("COUNTER") &&
//                                     !header.includes("account_no") &&
//                                     !header.includes("staff_id") &&
//                                    Number.isFinite(Number(value)) && 
//                                    value != 0;
                    
//                     const isDate = header?.includes("DATE");
//                     const isMonthColumn = is_yearly && ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec', 'net'].includes(header.toLowerCase());
                    
//                     let displayValue = value ?? "N/A";
                    

//                     if (isDate && value) {
//                       displayValue = toStringDate(value);
//                     }else if(value === 0){
//                          displayValue = "0"
//                     }
//                      else if (isNumber || isMonthColumn) {
//                       displayValue = formatNumberWithComma(parseFloat(value || 0));
//                     }
                    
//                     const cellClass = (isNumber || isMonthColumn) ? 'number-cell' : 
//                                     ['HOME_ADDRESS', 'DIRECTORATE', 'DESIGNATION_NAME', 'NAME'].includes(header) ? 'break-words' : '';
                    
//                     return `<td class="${cellClass}">${displayValue}</td>`;
//                   }).join('')}
//                 </tr>`;
//               }).join('');
              
//               return groupRows + dataRows;
//             }).join('') :
            
//             rowsData.map(row => {
//               const rowClass = row.__isDifference ? 'difference-row' : 
//                               row.__isSummary ? 'summary-row' : '';
              
//               return `<tr class="${rowClass}">
//                 ${headers.map(header => {
//                   const value = row[header];
//                   const isNumber = !header.includes("payroll_run_id") &&
//                                   !header.includes("S/N") &&
//                                     !header.includes("name") &&
//                                     !header.includes("NO OF STAFF") &&
//                                     !header.includes("Grade") &&
//                                     !header.includes("grade") &&
//                                     !header.includes("remita_code") &&
//                                     !header.includes("REMITA CODE") &&
//                                     !header.includes("ACCOUNT NO") &&
//                                     !header.includes("Step") &&
//                                     !header.includes("step") &&
//                                     !header.includes("Counter") &&
//                                     !header.includes("COUNTER") &&
//                                     !header.includes("account_no") &&
//                                     !header.includes("staff_id") &&
//                                  Number.isFinite(Number(value)) &&
//                                  value != 0;
                  
//                   const isDate = header?.includes("DATE");
//                   const isMonthColumn = is_yearly && ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec', 'net'].includes(header.toLowerCase());
                  
//                   let displayValue = value ?? "N/A";
                  
//                   if (isDate && value) {
//                     displayValue = toStringDate(value);
//                   } else if (isNumber || isMonthColumn) {
//                     displayValue = formatNumberWithComma(parseFloat(value || 0));
//                   }
                  
//                   const cellClass = (isNumber || isMonthColumn) ? 'number-cell' : 
//                                   ['HOME_ADDRESS', 'DIRECTORATE', 'DESIGNATION_NAME', 'NAME'].includes(header) ? 'break-words' : '';
                  
//                   return `<td class="${cellClass}">${displayValue}</td>`;
//                 }).join('')}
//               </tr>`;
//             }).join('')
//           }
//         </tbody>
//       </table>
      
//       ${!!totalNet && !is_allowance ? `
//         <table class="print-table">
//           <tr class="total-row">
//             <td style="width: 200px;">NET TOTAL</td>
//             <td class="number-cell">${formatNumberWithComma(totalNet)}</td>
//           </tr>
//         </table>
//       ` : ''}
//     </body>
//     </html>
//   `;

//   // Open print window
//   const printWindow = window.open('', '_blank');
//   printWindow.document.writeln(printContent);
//   printWindow.document.close();
  
//   // Wait for content to load then print
//   printWindow.onload = () => {
//     setTimeout(() => {
//       printWindow.print();
//       printWindow.close();
//     }, 250);
//   };
// };