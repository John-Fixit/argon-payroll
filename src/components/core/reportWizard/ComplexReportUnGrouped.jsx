/* eslint-disable react/prop-types */

import { useMemo, useState } from "react";
import {
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

  Object.keys(complexData).forEach((headquarter) => {
    const headquarterData = {
      headquarter: headquarter.trim(),
      departments: [],
      totalNet: 0,
    };

    Object.keys(complexData[headquarter]).forEach((department) => {
      const departmentData = {
        department: department.trim(),
        records: [],
        totalNet: 0,
      };

      // Extract records from department (ignore the keys like "P2271")
      const departmentRecords = complexData[headquarter][department];
      Object.values(departmentRecords).forEach((record) => {
        departmentData.records.push(record);
        departmentData.totalNet += parseFloat(record.Net || 0);
      });

      headquarterData.departments.push(departmentData);
      headquarterData.totalNet += departmentData.totalNet;
    });

    processedData.push(headquarterData);
  });

  return processedData;
}

// Function to get all unique column headers from records
function getColumnHeaders(processedData) {
  const headers = new Set();

  processedData.forEach((hq) => {
    hq.departments.forEach((dept) => {
      dept.records.forEach((record) => {
        Object.keys(record).forEach((key) => headers.add(key));
      });
    });
  });

  return Array.from(headers);
}

// Main component for handling complex payroll data
const ComplexReportUnGrouped = ({ tableData }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPrintMode, setIsPrintMode] = useState(false);

  const processedData = useMemo(() => {
    return processComplexData(tableData);
  }, [tableData]);

  const columnHeaders = useMemo(() => {
    return getColumnHeaders(processedData);
  }, [processedData]);

  // Chunk headers into groups of 8 for printing
  const headerChunks = useMemo(() => {
    return chunkArray(columnHeaders, 8);
  }, [columnHeaders]);

  // Calculate overall total
  const overallTotal = useMemo(() => {
    return processedData.reduce((total, hq) => total + hq.totalNet, 0);
  }, [processedData]);

  // Flatten departments for printing (each department on separate page)
  const departmentPages = useMemo(() => {
    const pages = [];
    processedData.forEach((hq) => {
      hq.departments.forEach((dept) => {
        pages.push({
          headquarter: hq.headquarter,
          department: dept.department,
          records: dept.records,
          totalNet: dept.totalNet,
          headquarterTotal: hq.totalNet,
        });
      });
    });
    return pages;
  }, [processedData]);

  const currentDepartment = departmentPages[currentPage];

  // Print all departments
  const handlePrintAll = () => {
    setIsPrintMode(true);
    // Add print styles
    const printStyles = document.createElement("style");
    printStyles.textContent = `
      @media print {
        .department-page {
          page-break-before: always;
          page-break-after: always;
        }
        
        .department-page:first-child {
          page-break-before: auto;
        }
        
        .complex-payroll-table th,
        .complex-payroll-table td {
          border: 1px solid #000 !important;
          padding: 4px 6px !important;
          font-size: 10px !important;
        }
        
        .no-print {
          display: none !important;
        }
        
        @page {
          margin: 0.5in;
          size: landscape;
        }
        
        .totals-section {
          page-break-inside: avoid;
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

  const exportToExcel = () => {
    console.log("Exporting complex data to Excel...", processedData);
    // Implementation for Excel export would go here
  };

  const TopContent = () => (
    <div className="flex justify-between items-center mb-4 no-print">
      <div className="flex gap-4">
        <button
          onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
          disabled={currentPage === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous Dept
        </button>
        <button
          onClick={() =>
            setCurrentPage(
              Math.min(departmentPages.length - 1, currentPage + 1)
            )
          }
          disabled={currentPage === departmentPages.length - 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next Dept
        </button>
        <span className="px-4 py-2 bg-gray-100 rounded">
          Department {currentPage + 1} of {departmentPages.length}
        </span>
      </div>
      <div className="flex gap-2">
        <ActionButton
          className="flex gap-1 items-center"
          onClick={handlePrintAll}
        >
          <MdPrint size={16} /> Print All Departments
        </ActionButton>
        <ActionButton
          className="flex gap-1 items-center"
          onClick={exportToExcel}
        >
          Export as Excel <MdOutlineFileDownload size={20} />
        </ActionButton>
      </div>
    </div>
  );

  if (!currentDepartment) {
    return <div>No data available</div>;
  }

  return (
    <>
      <TopContent />

      {/* Print Mode - All Departments */}
      {isPrintMode && (
        <div className="print-all-departments">
          {departmentPages.map((dept, pageIndex) => (
            <div key={pageIndex} className="department-page">
              <DepartmentTable
                department={dept}
                headerChunks={headerChunks}
                overallTotal={overallTotal}
                isPrint={true}
              />
            </div>
          ))}
        </div>
      )}

      {/* Screen Mode - Single Department */}
      {!isPrintMode && (
        <DepartmentTable
          department={currentDepartment}
          headerChunks={headerChunks}
          overallTotal={overallTotal}
          currentPage={currentPage}
          totalPages={departmentPages.length}
          isPrint={false}
        />
      )}
    </>
  );
};

// Separate component for rendering individual department tables
const DepartmentTable = ({
  department,
  headerChunks,
  overallTotal,
  currentPage,
  totalPages,
  isPrint,
}) => {
  return (
    <div
      className={`bg-white shadow-sm border border-gray-100 rounded-[14px] p-6 ${
        isPrint ? "department-content" : ""
      }`}
    >
      {/* Department Header */}
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold mb-2">{department.headquarter}</h2>
        <h3 className="text-lg font-semibold mb-4 text-blue-600">
          {department.department}
        </h3>
        <div className="text-sm text-gray-600">
          Total Records: {department.records.length}
        </div>
      </div>

      {/* Render tables for each header chunk */}
      {headerChunks.map((headerChunk, chunkIndex) => (
        <div key={chunkIndex} className="mb-6">
          <div className="overflow-x-auto">
            <Table
              removeWrapper={true}
              className="complex-payroll-table min-w-full"
              classNames={{
                table: "border-collapse",
                tr: "",
                td: "border border-gray-300 px-2 py-1 text-center",
                th: "border border-gray-300 px-2 py-1 bg-gray-100 font-bold text-center",
              }}
            >
              <TableHeader>
                {headerChunk.map((header, index) => (
                  <TableColumn
                    key={`${chunkIndex}-${index}`}
                    className="font-helvetica text-black text-[0.70rem] min-w-[80px]"
                  >
                    {header?.replaceAll("_", " ")?.toUpperCase()}
                  </TableColumn>
                ))}
              </TableHeader>

              <TableBody>
                {department.records.map((record, recordIndex) => (
                  <TableRow key={`${chunkIndex}-record-${recordIndex}`}>
                    {headerChunk.map((header, headerIndex) => (
                      <TableCell
                        key={`${chunkIndex}-${recordIndex}-${headerIndex}`}
                        className="font-helvetica text-xs"
                      >
                        {header === "Net" ||
                        header.toLowerCase().includes("net") ||
                        header.toLowerCase().includes("amount") ||
                        header.toLowerCase().includes("salary")
                          ? formatNumberWithComma(record[header] || 0)
                          : record[header] || "N/A"}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Add spacing between table chunks */}
          {chunkIndex < headerChunks.length - 1 && (
            <div className="my-4">
              <hr className="border-gray-300" />
            </div>
          )}
        </div>
      ))}

      {/* Totals Section */}
      <div className="mt-8 space-y-3 totals-section border-t-2 border-gray-300 pt-4">
        <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">
              Department Total ({department.department}):
            </span>
            <span className="font-bold text-lg text-yellow-700">
              {formatNumberWithComma(department.totalNet)}
            </span>
          </div>
        </div>

        <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">
              Headquarter Total ({department.headquarter}):
            </span>
            <span className="font-bold text-lg text-blue-700">
              {formatNumberWithComma(department.headquarterTotal)}
            </span>
          </div>
        </div>

        <div className="bg-green-50 p-3 rounded border-l-4 border-green-400">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">
              Overall Grand Total:
            </span>
            <span className="font-bold text-xl text-green-700">
              {formatNumberWithComma(overallTotal)}
            </span>
          </div>
        </div>
      </div>

      {/* Footer info - only show in screen mode */}
      {!isPrint && (
        <div className="mt-6 text-center text-sm text-gray-500 no-print border-t pt-4">
          <p>
            Department {currentPage + 1} of {totalPages}
          </p>
          <p className="text-xs mt-1">
            Each department will print on a separate page
          </p>
        </div>
      )}
    </div>
  );
};

DepartmentTable.propTypes = {
  department: propType.any,
  headerChunks: propType.any,
  overallTotal: propType.any,
  currentPage: propType.any,
  totalPages: propType.any,
  isPrint: propType.any,
};

export default ComplexReportUnGrouped;
