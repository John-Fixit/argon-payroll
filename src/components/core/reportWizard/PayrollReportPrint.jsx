

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { formatNumberWithComma, toStringDate } from "../../../utils/utitlities";

// Print component that renders the table for printing
const PrintableTable = React.forwardRef(({ 
  tableData, 
  is_grouped, 
  is_staff = false,
  is_yearly, 
  is_allowance, 
  title, 
  generateTableHead,
  rearrangeStaffData,
  rearrangeData,
  reformatData 
}, ref) => {
  const rowsData = React.useMemo(() => {
    if (is_staff) {
      console.log('heres')
      return rearrangeStaffData(tableData, is_yearly, is_allowance);
    } else if (is_grouped && !is_staff) {
      console.log('here')
      return  rearrangeData(tableData, is_yearly, is_allowance);
    } else {
      return reformatData(tableData, is_yearly);
    }
  }, [tableData, is_grouped, is_staff, is_yearly, is_allowance, rearrangeData, rearrangeStaffData, reformatData]);

  const totalNet = React.useMemo(() => {
    if (is_grouped && !is_staff) {
      const val = rowsData.reduce((total, v) => {
        const itemTotal = v.data
          .filter(el => !el.__isSummary && !el.__isDifference && !el.__isStaffNet && !el.__isStaffNetSpacer)
          .reduce((subTotal, el) => {
            return subTotal + (el.NET || el.Net || Number(el?.amount) || Number(el?.Amount) || 0);
          }, 0);
        return total + itemTotal;
      }, 0);
      return val;
    } else {
      const val = rowsData
        .filter(v => !v.__isSummary && !v.__isDifference)
        .reduce((total, v) => {
          return total + (v?.NET || v?.Net || Number(v?.amount) || Number(v?.Amount) || Number(v?.Total) || Number(v?.sum_pay) || 0);
        }, 0);
      return val;
    }
  }, [rowsData, is_grouped, is_staff]);

  const monthColumnsLower = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec", "net"];

  return (
    <div ref={ref} className="print-container">
      <style>{`
        @media print {
          .print-container {
            width: 100% !important;
            margin: 0 !important;
            padding: 20px !important;
            font-size: 10px !important;
          }
          
          .print-title {
            text-align: center;
            font-weight: bold;
            font-size: 16px !important;
            margin-bottom: 20px !important;
            page-break-inside: avoid;
          }
          
          .print-table {
            width: 100% !important;
            border-collapse: collapse !important;
            font-size: 8px !important;
            margin-bottom: 20px !important;
          }
          
          .print-table th,
          .print-table td {
            border: 1px solid #000 !important;
            padding: 4px !important;
            text-align: left !important;
            vertical-align: top !important;
            word-wrap: break-word !important;
            max-width: 100px !important;
          }
          
          .print-table th {
            background-color: #f0f0f0 !important;
            font-weight: bold !important;
            text-align: center !important;
          }
          
          .group-header {
            background-color: #f8f8f8 !important;
            font-weight: bold !important;
            text-transform: uppercase !important;
          }
          
          .staff-header {
            background-color: #e3f2fd !important;
            font-weight: bold !important;
            text-transform: uppercase !important;
            border-top: 2px solid #1976d2 !important;
          }
          
          .summary-row {
            background-color: #fff3cd !important;
            font-weight: bold !important;
          }
          
          .difference-row {
            background-color: #dbeafe !important;
            font-weight: bold !important;
            color: #1e40af !important;
          }
          
          .staff-net-row {
            background-color: #e8f5e8 !important;
            font-weight: bold !important;
            color: #2e7d32 !important;
            border-top: 2px solid #4caf50 !important;
          }
          
          .staff-net-spacer {
            border: none !important;
            background: transparent !important;
            height: 20px !important;
          }
          
          .net-total {
            background-color: #e5e7eb !important;
            font-weight: bold !important;
            border-top: 2px solid #000 !important;
          }
          
          @page {
            size: A4 landscape;
            margin: 0.5in;
          }
        }
      `}</style>
      
      <div className="print-title">
        {title?.replaceAll("'", "") || "Payroll Report"}
      </div>
      
      <table className="print-table">
        <thead>
          <tr>
            {generateTableHead()?.map((key, index) => (
              <th key={index}>
                {key ? key?.replaceAll("_", " ")?.toUpperCase() : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowsData?.length > 0 ? (
            (is_grouped || is_staff) ? (
              rowsData.flatMap((group, groupIndex) => [
                // Group Header (including Staff Headers)
                ...(group?.header ? [
                  <tr 
                    key={`group-header-${groupIndex}`} 
                    className={
                      group.isStaffHeader 
                        ? "staff-header" 
                        : group.isGroupHeader 
                        ? "group-header" 
                        : "group-header"
                    }
                  >
                    {generateTableHead()?.map((head, index) => (
                      <td key={index}>
                        {index === 0 ? group?.header || "Unknown" : ""}
                        {index === generateTableHead()?.length - 1 ? (
                          <span>{group?.groupLength}</span>
                        ) : null}
                      </td>
                    ))}
                  </tr>
                ] : []),

                // Group Data
                ...(group && group.data
                  ? group.data.map((rowData, rowIndex) => (
                      <tr
                        key={`group-row-${groupIndex}-${rowIndex}`}
                        className={
                          rowData.__isDifference 
                            ? "difference-row" 
                            : rowData.__isSummary 
                            ? "summary-row" 
                            : rowData.__isStaffNet
                            ? "staff-net-row"
                            : rowData.__isStaffNetSpacer
                            ? "staff-net-spacer"
                            : ""
                        }
                      >
                        {generateTableHead().map((key, index) => (
                          <td key={`cell-${groupIndex}-${rowIndex}-${index}`}>
                            {rowData && rowData[key] !== undefined
                              ? rowData[key] === 0 ? '0' : rowData[key] === '' ? '' : key.includes("NET") || key.includes("Net") || key.includes("net") || 
                                (is_yearly && monthColumnsLower.includes(key.toLowerCase()))
                                ? formatNumberWithComma(rowData[key])
                                : (!key.includes("S/N") &&
                                    !key.includes("SNo") &&
                                    !key.includes("NO OF STAFF") &&
                                    !key.includes("Grade") &&
                                    !key.includes("grade") &&
                                    !key.includes("remita_code") &&
                                    !key.includes("REMITA CODE") &&
                                    !key.includes("ACCOUNT NO") &&
                                    !key.includes("account_no") &&
                                    !key.includes("Step") &&
                                    !key.includes("step") &&
                                    !key.includes("Counter") &&
                                    !key.includes("COUNTER") &&
                                    !key.includes("staff_id") &&
                                    !key.includes("STAFF ID") &&
                                    Number.isFinite(Number(rowData[key])) &&
                                    rowData[key] != 0)
                                ? formatNumberWithComma(parseFloat(rowData[key] || 0))
                                : rowData[key] ?? "N/A"
                              : "N/A"}
                          </td>
                        ))}
                      </tr>
                    ))
                  : []),
              ])
            ) : (
              rowsData?.map((data, index) => (
                <tr
                  key={index}
                  className={
                    data.__isDifference
                      ? "difference-row"
                      : data.__isSummary 
                      ? "summary-row" 
                      : ""
                  }
                >
                  {generateTableHead()?.map((head, cellIndex) => (
                    <td key={cellIndex}>
                      {head?.includes("DATE") ? (
                        data?.[head] ? toStringDate(data?.[head]) : "N/A"
                      ) : (
                        (!head.includes("payroll_run_id") &&
                          !head.includes("S/N") &&
                          !head.includes("name") &&
                          !head.includes("NO OF STAFF") &&
                          !head.includes("Grade") &&
                          !head.includes("grade") &&
                          !head.includes("remita_code") &&
                          !head.includes("REMITA CODE") &&
                          !head.includes("ACCOUNT NO") &&
                          !head.includes("Step") &&
                          !head.includes("step") &&
                          !head.includes("Counter") &&
                          !head.includes("COUNTER") &&
                          !head.includes("account_no") &&
                          !head.includes("staff_id") &&
                          !head.includes("STAFF ID") &&
                          Number.isFinite(Number(data[head])) &&
                          data[head] != 0) ||
                        (is_yearly && monthColumnsLower.includes(head.toLowerCase()) && data[head] !== '')
                          ? formatNumberWithComma(parseFloat(data[head] || 0))
                          : data[head] ?? "N/A"
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )
          ) : (
            <tr>
              <td colSpan={generateTableHead()?.length} style={{ textAlign: 'center' }}>
                No Data Available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {!!totalNet && !is_allowance && (
        <table className="print-table">
          <tbody>
            <tr className="net-total">
              <td style={{ fontWeight: 'bold' }}>NET TOTAL</td>
              <td style={{ fontWeight: 'bold', textAlign: 'right' }}>
                {formatNumberWithComma(totalNet)}
              </td>
              {generateTableHead()?.slice(2).map((_, index) => (
                <td key={index}></td>
              ))}
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
});

PrintableTable.displayName = 'PrintableTable';

// Hook to use the print functionality
export const usePrintPayrollReport = () => {
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'Payroll Report',
    pageStyle: `
      @page {
        size: A4 landscape;
        margin: 0.5in;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
      }
    `,
    onBeforeGetContent: () => {
      return new Promise((resolve) => {
        // Small delay to ensure content is ready
        setTimeout(resolve, 100);
      });
    },
    onAfterPrint: () => {
      console.log('Print completed');
    },
  });

  return { printRef, handlePrint, PrintableTable };
};
























// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// /* eslint-disable react-refresh/only-export-components */
// import React, { useRef } from 'react';
// import { useReactToPrint } from 'react-to-print';
// import { formatNumberWithComma, toStringDate } from "../../../utils/utitlities";

// // Print component that renders the table for printing
// const PrintableTable = React.forwardRef(({ 
//   tableData, 
//   is_grouped, 
//   is_yearly, 
//   is_allowance, 
//   title, 
//   generateTableHead,
//   rearrangeStaffData,
//   rearrangeData,
//   reformatData 
// }, ref) => {
//   const rowsData = React.useMemo(() => {
//     return  is_grouped ? rearrangeData(tableData, is_yearly, is_allowance) : reformatData(tableData, is_yearly);
//   }, [tableData, is_grouped, is_yearly, is_allowance, rearrangeData, reformatData]);

//   const totalNet = React.useMemo(() => {
//     if (is_grouped) {
//       const val = rowsData.reduce((total, v) => {
//         const itemTotal = v.data
//           .filter(el => !el.__isSummary && !el.__isDifference)
//           .reduce((subTotal, el) => {
//             return subTotal + (el.NET || el.Net || Number(el?.amount) || Number(el?.Amount) || 0);
//           }, 0);
//         return total + itemTotal;
//       }, 0);
//       return val;
//     } else {
//       const val = rowsData
//         .filter(v => !v.__isSummary && !v.__isDifference)
//         .reduce((total, v) => {
//           return total + (v?.NET || v?.Net || Number(v?.amount) || Number(v?.Amount) || Number(v?.Total) || Number(v?.sum_pay) || 0);
//         }, 0);
//       return val;
//     }
//   }, [rowsData, is_grouped]);

//   const monthColumnsLower = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec", "net"];

//   return (
//     <div ref={ref} className="print-container">
//       <style>{`
//         @media print {
//           .print-container {
//             width: 100% !important;
//             margin: 0 !important;
//             padding: 20px !important;
//             font-size: 10px !important;
//           }
          
//           .print-title {
//             text-align: center;
//             font-weight: bold;
//             font-size: 16px !important;
//             margin-bottom: 20px !important;
//             page-break-inside: avoid;
//           }
          
//           .print-table {
//             width: 100% !important;
//             border-collapse: collapse !important;
//             font-size: 8px !important;
//             margin-bottom: 20px !important;
//           }
          
//           .print-table th,
//           .print-table td {
//             border: 1px solid #000 !important;
//             padding: 4px !important;
//             text-align: left !important;
//             vertical-align: top !important;
//             word-wrap: break-word !important;
//             max-width: 100px !important;
//           }
          
//           .print-table th {
//             background-color: #f0f0f0 !important;
//             font-weight: bold !important;
//             text-align: center !important;
//           }
          
//           .group-header {
//             background-color: #f8f8f8 !important;
//             font-weight: bold !important;
//             text-transform: uppercase !important;
//           }
          
//           .summary-row {
//             background-color: #fff3cd !important;
//             font-weight: bold !important;
//           }
          
//           .difference-row {
//             background-color: #dbeafe !important;
//             font-weight: bold !important;
//             color: #1e40af !important;
//           }
          
//           .net-total {
//             background-color: #e5e7eb !important;
//             font-weight: bold !important;
//             border-top: 2px solid #000 !important;
//           }
          
//           @page {
//             size: A4 landscape;
//             margin: 0.5in;
//           }
//         }
//       `}</style>
      
//       <div className="print-title">
//         {title?.replaceAll("'", "") || "Payroll Report"}
//       </div>
      
//       <table className="print-table">
//         <thead>
//           <tr>
//             {generateTableHead()?.map((key, index) => (
//               <th key={index}>
//                 {key ? key?.replaceAll("_", " ")?.toUpperCase() : ""}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {rowsData?.length > 0 ? (
//             is_grouped ? (
//               rowsData.flatMap((group, groupIndex) => [
//                 // Group Header
//                 ...(group?.header ? [
//                   <tr key={`group-header-${groupIndex}`} className="group-header">
//                     {generateTableHead()?.map((head, index) => (
//                       <td key={index}>
//                         {index === 0 ? group?.header || "Unknown" : ""}
//                         {index === generateTableHead()?.length - 1 ? (
//                           <span>({group?.data?.filter(d => !d.__isSummary && !d.__isDifference)?.length})</span>
//                         ) : null}
//                       </td>
//                     ))}
//                   </tr>
//                 ] : []),

//                 // Group Data
//                 ...(group && group.data
//                   ? group.data.map((rowData, rowIndex) => (
//                       <tr
//                         key={`group-row-${groupIndex}-${rowIndex}`}
//                         className={
//                           rowData.__isDifference 
//                             ? "difference-row" 
//                             : rowData.__isSummary 
//                             ? "summary-row" 
//                             : ""
//                         }
//                       >
//                         {generateTableHead().map((key, index) => (
//                           <td key={`cell-${groupIndex}-${rowIndex}-${index}`}>
//                             {rowData && rowData[key] !== undefined
//                               ? key.includes("NET") || key.includes("Net") || key.includes("net") || 
//                                 (is_yearly && monthColumnsLower.includes(key.toLowerCase()))
//                                 ? formatNumberWithComma(rowData[key])
//                                 : (!key.includes("S/N") &&
//                                     !key.includes("NO OF STAFF") &&
//                                     !key.includes("Grade") &&
//                                     !key.includes("Step") &&
//                                     !key.includes("Counter") &&
//                                     !key.includes("staff_id") &&
//                                     Number.isFinite(Number(rowData[key])) &&
//                                     rowData[key] != 0)
//                                 ? formatNumberWithComma(parseFloat(rowData[key] || 0))
//                                 : rowData[key] ?? "N/A"
//                               : "N/A"}
//                           </td>
//                         ))}
//                       </tr>
//                     ))
//                   : []),
//               ])
//             ) : (
//               rowsData?.map((data, index) => (
//                 <tr
//                   key={index}
//                   className={
//                     data.__isDifference
//                       ? "difference-row"
//                       : data.__isSummary 
//                       ? "summary-row" 
//                       : ""
//                   }
//                 >
//                   {generateTableHead()?.map((head, cellIndex) => (
//                     <td key={cellIndex}>
//                       {head?.includes("DATE") ? (
//                         data?.[head] ? toStringDate(data?.[head]) : "N/A"
//                       ) : (
//                         (!head.includes("payroll_run_id") &&
//                           !head.includes("S/N") &&
//                           !head.includes("NO OF STAFF") &&
//                           !head.includes("Grade") &&
//                           !head.includes("grade") &&
//                           !head.includes("remita_code") &&
//                           !head.includes("Step") &&
//                           !head.includes("step") &&
//                           !head.includes("Counter") &&
//                           !head.includes("account_no") &&
//                           !head.includes("staff_id") &&
//                           Number.isFinite(Number(data[head])) &&
//                           data[head] != 0) ||
//                         (is_yearly && monthColumnsLower.includes(head.toLowerCase()) && data[head] !== '')
//                           ? formatNumberWithComma(parseFloat(data[head] || 0))
//                           : data[head] ?? "N/A"
//                       )}
//                     </td>
//                   ))}
//                 </tr>
//               ))
//             )
//           ) : (
//             <tr>
//               <td colSpan={generateTableHead()?.length} style={{ textAlign: 'center' }}>
//                 No Data Available
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {!!totalNet && !is_allowance && (
//         <table className="print-table">
//           <tbody>
//             <tr className="net-total">
//               <td style={{ fontWeight: 'bold' }}>NET TOTAL</td>
//               <td style={{ fontWeight: 'bold', textAlign: 'right' }}>
//                 {formatNumberWithComma(totalNet)}
//               </td>
//               {generateTableHead()?.slice(2).map((_, index) => (
//                 <td key={index}></td>
//               ))}
//             </tr>
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// });

// PrintableTable.displayName = 'PrintableTable';

// // Hook to use the print functionality
// export const usePrintPayrollReport = () => {
//   const printRef = useRef();

//   const handlePrint = useReactToPrint({
//     content: () => printRef.current,
//     documentTitle: 'Payroll Report',
//     pageStyle: `
//       @page {
//         size: A4 landscape;
//         margin: 0.5in;
//       }
//       @media print {
//         body {
//           -webkit-print-color-adjust: exact !important;
//           color-adjust: exact !important;
//         }
//       }
//     `,
//     onBeforeGetContent: () => {
//       return new Promise((resolve) => {
//         // Small delay to ensure content is ready
//         setTimeout(resolve, 100);
//       });
//     },
//     onAfterPrint: () => {
//       console.log('Print completed');
//     },
//   });

//   return { printRef, handlePrint, PrintableTable };
// };