/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Pagination,
  User,
} from "@nextui-org/react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { ConfigProvider, Input, Select } from "antd";
import { formatNumberWithComma, toStringDate } from "../../../utils/utitlities";
import ActionButton from "../../forms/FormElements/ActionButton";
import { MdOutlineFileDownload, MdPrint } from "react-icons/md";
import { exportPayrollReportExcel } from "../../../utils/exportReportPayrollExcel";
import { printPayrollReport } from "./PayrollWindowPrint";

const tableHead = [
  { name: "FIRST_NAME", column_name: "FIRST_NAME" },
  { name: "LAST_NAME", column_name: "LAST_NAME" },
  { name: "EMPLOYEE NO", column_name: "STAFF_NUMBER" },
  { name: "DESIGNATION", column_name: "DESIGNATION_NAME" },
  { name: "GRADE", column_name: "GRADE" },
  { name: "DATE OF BIRTH", column_name: "DATE_OF_BIRTH" },
  { name: "DATE OF 1ST APP.", column_name: "DATE_OF_FIRST_APPOINTMENT" },
  { name: "CURRENT APP. DATE", column_name: "CURRENT_APPOINTMENT_DATE" },
  { name: "GENDER", column_name: "GENDER" },
  { name: "STATE OF ORIGIN", column_name: "STATE_OF_ORIGIN" },
  { name: "LGA", column_name: "LGA" },
  { name: "QUALIFICATION", column_name: "QUALIFICATION" },
  { name: "OUTSTATION", column_name: "OUTSTATION" },
  { name: "REMARK", column_name: "REMARK" },
];

// Monthly columns for yearly reports (case-insensitive matching)
const monthColumns = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Net", "VARIATION"];
const monthColumnsLower = monthColumns.map(month => month.toLowerCase());

// New function to handle is_staff data structure
// Updated rearrangeStaffData function
function rearrangeStaffData(inputData, is_yearly = false, is_allowance = false) {
  const result = [];
  let lastnum = 0;

  // Iterate through each staff member
  Object.keys(inputData).forEach((staffKey) => {
    const staffData = inputData[staffKey];
    
    let staffTotalIncome = 0;
    let staffTotalDeduction = 0;
    let staffGroupLength = 0;
    const staffSections = [];

    // Process each group within the staff (Income, Deduction, etc.)
    Object.keys(staffData).forEach((groupKey) => {
      const groupData = staffData[groupKey];
      
      if (Array.isArray(groupData)) {
        staffGroupLength += groupData.length;
        
        // Create group data with S/N
        const processedGroupData = groupData.map((item, index) => {
          return { "S/N": lastnum + index + 1, "SNo": index + 1, ...item };
        });

        // Calculate group totals
        let groupTotal = 0;
        processedGroupData.forEach(item => {
          const netAmount = item.Net || item.NET || item.Amount || 0;
          groupTotal += Number(netAmount);
        });

        // Track staff totals
        if (groupKey.toLowerCase().includes('income')) {
          staffTotalIncome += groupTotal;
        } else if (groupKey.toLowerCase().includes('deduction')) {
          staffTotalDeduction += groupTotal;
        }

        // Create group summary row
        const groupSummaryRow = {};
        Object.keys(processedGroupData[0] || {}).forEach(key => {
          // || key === 'Amount'
          if (key === 'Net' || key === 'NET' ) {
            groupSummaryRow[key] = groupTotal;
          } else if (key === 'S/N' || Object.keys(processedGroupData[0] || {})[0] === key) {
            groupSummaryRow[key] =  '' //`${groupKey} Total`;
          } else {
            groupSummaryRow[key] = '';
          }
        });
        groupSummaryRow.__isSummary = true;

        // Create group section
        const groupSection = {
          header: groupKey,
          data: [...processedGroupData, groupSummaryRow],
          groupLength: groupData.length,
          isGroupHeader: true,
          parentStaff: staffKey
        };

        staffSections.push(groupSection);
        lastnum += groupData.length;
      }
    });

    // Add staff header first
    const staffHeader = {
      header: staffKey,
      data: [],
      groupLength: '', //staffGroupLength,
      isStaffHeader: true
    };
    result.push(staffHeader);

    // Add all staff sections
    result.push(...staffSections);

    // Add staff net difference row
    if (staffSections.length > 0) {
      const staffNetDifference = staffTotalIncome - staffTotalDeduction;
      const firstGroupData = staffSections[0]?.data?.[0] || {};
      
      const staffNetRow = {};
      Object.keys(firstGroupData).forEach(key => {
        // || key === 'Amount'
        if (key === 'Net' || key === 'NET' ) {
          staffNetRow[key] = staffNetDifference;
        } else if (key === 'S/N' || Object.keys(firstGroupData)[0] === key) {
          staffNetRow[key] = `Net Difference`; //`${staffKey} - Net Difference`;
        } else {
          staffNetRow[key] = '';
        }
      });
      staffNetRow.__isStaffNet = true;

      // Add staff net as a separate section
      result.push({
        header: '',
        data: [staffNetRow],
        groupLength: 0,
        isStaffNet: true,
        parentStaff: staffKey
      });
    }
    // Add staff net  difference  spacer row (for readability)
    if (staffSections.length > 0) {
      const firstGroupData = staffSections[0]?.data?.[0] || {};
      
      const staffNetSpacerRow = {};
      Object.keys(firstGroupData).forEach(key => {
            staffNetSpacerRow[key] = '';
      });
      staffNetSpacerRow.__isStaffNetSpacer = true;

      // Add staff net as a separate section
      result.push({
        header: '',
        data: [staffNetSpacerRow],
        groupLength: 0,
        isStaffNetSpacer: true,
        parentStaff: staffKey
      });
    }
  });
 
  return result;
}

function rearrangeData(inputData, is_yearly = false, is_allowance = false) {
  const result = [];
  let lastnum = 0;
  const groupSums = {}; // Store monthly sums for each group when is_allowance is true

  // Iterate through each key in the input object
  Object.keys(inputData).forEach((key) => {
    // Replace empty string key with "Unknown"
    // const header = key === "" ? "Unknown" : key.trim(); // Trim to remove extra spaces/newlines
    const header = key === "" ? " " : key.trim(); // Trim to remove extra spaces/newlines


    // get length of each group
    const groupLength = inputData[key]?.length
    

    // Create the header and dynamically build the data array
    const groupData = inputData[key].map((item, index) => {
      return {"S/N": lastnum + index + 1, "SNo":  index + 1,  ...item };
    });

    // If is_yearly is true, calculate monthly sums for this group
    if (is_yearly) {
      const monthlySums = {};
      
      // Get all keys from first record to identify actual month column names
      const firstRecord = groupData[0] || {};
      const actualMonthColumns = Object.keys(firstRecord).filter(key => 
        monthColumnsLower.includes(key.toLowerCase())
      );
      
      // Initialize sums for each actual month column found
      actualMonthColumns.forEach(month => {
        monthlySums[month] = 0;
      });

      // Calculate sums for each month across all records in this group
      groupData.forEach(record => {
        actualMonthColumns.forEach(month => {
          if (record[month] && !isNaN(Number(record[month]))) {
            monthlySums[month] += Number(record[month]);
          }
        });
      });

      // Store group sums for allowance calculation
      if (is_allowance) {
        groupSums[header] = monthlySums;
      }

      // Create summary row with empty strings for non-month columns
      const summaryRow = {};
      Object.keys(groupData[0] || {}).forEach(key => {
        if (actualMonthColumns.includes(key)) {
          summaryRow[key] = monthlySums[key];
        } else {
          summaryRow[key] = ''; // Empty string for other columns
        }
      });

      // Mark this row as a summary for styling purposes
      summaryRow.__isSummary = true;
      
      // Add summary row to the group data
      groupData.push(summaryRow);
    }else if(is_allowance){
      // for case where is_allowance is true but yearly is false, in this case Amount key is in each group
                    const ammountSums = {};

              Object.keys(inputData).forEach(key => {
              ammountSums[key] = 0;
            });

              groupData.forEach(record => {
              if (record["Amount"] && !isNaN(Number(record["Amount"]))) {
                ammountSums[header]  += Number(record["Amount"]);
              }
            });

            groupSums[header] = ammountSums
            
        // Create summary row with empty strings for non-amount columns
        const summaryRow = {};

        Object.keys(groupData[0] || {}).forEach(key => {
          if (key === "Amount") {
            summaryRow[key] = ammountSums[header];
          } else {
            summaryRow[key] = ''; // Empty string for other columns
          }
        });

        // // Mark this row as a summary for styling purposes
        summaryRow.__isSummary = true;
        
        // // Add summary row to the group data
        groupData.push(summaryRow);
    }

    const section = {
      header: header,
      data: groupData,
      groupLength: groupLength
    };

    lastnum += inputData[key].length;
    // Push the section into the result array
    result.push(section);
  });

  // Add difference row for allowance reports
  if (is_allowance && is_yearly && Object.keys(groupSums).length >= 2) {
    const groupKeys = Object.keys(groupSums);
    const firstGroupSums = groupSums[groupKeys[0]]; // Income group
    const secondGroupSums = groupSums[groupKeys[1]]; // Deduction group
    
    // Calculate differences
    const differenceRow = {};
    const actualMonthColumns = Object.keys(firstGroupSums);
    
    // Set up the difference row structure
    const firstRecord = result[0]?.data?.[0] || {};
    Object.keys(firstRecord).forEach(key => {
      if (actualMonthColumns.includes(key)) {
        // Calculate difference: Income - Deduction
        differenceRow[key] = (firstGroupSums[key] || 0) - (secondGroupSums[key] || 0);
      } else if (key === 'S/N' || Object.keys(firstRecord)[0] === key) {
        // Use first column for the difference label
        differenceRow[key] = 'Net Difference';
      } else {
        differenceRow[key] = ''; // Empty string for other columns
      }
    });

    // Mark this row as a difference row for styling
    differenceRow.__isDifference = true;
    
    // Add difference row as a separate section
    result.push({
      header: '',
      data: [differenceRow]
    });
  }else if(is_allowance && Object.keys(groupSums).length >= 2){
      const groupKeys = Object.keys(groupSums);
      const firstGroupSums = groupSums[groupKeys[0]]; // Income group
      const secondGroupSums = groupSums[groupKeys[1]]; // Deduction group

      // Calculate differences
      const differenceRow = {};
      const inc = firstGroupSums?.Income
      const dec = secondGroupSums?.Deduction

    //       // Set up the difference row structure
    const firstRecord = result[0]?.data?.[0] || {};
    Object.keys(firstRecord).forEach(key => {
      if (key === "Amount") {
        // Calculate difference: Income - Deduction
        differenceRow[key] = (inc || 0) - (dec || 0);
      } else if (key === 'S/N' || Object.keys(firstRecord)[0] === key) {
        // Use first column for the difference label
        differenceRow[key] = 'Net Difference';
      } else {
        differenceRow[key] = ''; // Empty string for other columns
      }
    });

    //       // Mark this row as a difference row for styling
      differenceRow.__isDifference = true;
      
    //   // Add difference row as a separate section
      result.push({
        header: '',
        data: [differenceRow]
      });
  }

  return result;
}

function reformatData(inputData, is_yearly = false) {
  // Iterate through each key in the input object
  const result = inputData.map((item, index) => {
    return {"S/N": index + 1, ...item };
  });

  // If is_yearly is true, calculate monthly sums and add summary row
  if (is_yearly && result.length > 0) {
    const monthlySums = {};
    
    // Get all keys from first record to identify actual month column names
    const firstRecord = result[0] || {};
    const actualMonthColumns = Object.keys(firstRecord).filter(key => 
      monthColumnsLower.includes(key.toLowerCase())
    );
    
    // Initialize sums for each actual month column found
    actualMonthColumns.forEach(month => {
      monthlySums[month] = 0;
    });

    // Calculate sums for each month across all records
    result.forEach(record => {
      actualMonthColumns.forEach(month => {
        if (record[month] && !isNaN(Number(record[month]))) {
          monthlySums[month] += Number(record[month]);
        }
      });
    });

    // Create summary row with empty strings for non-month columns
    const summaryRow = {};
    Object.keys(result[0] || {}).forEach(key => {
      if (actualMonthColumns.includes(key)) {
        summaryRow[key] = monthlySums[key];
      } else {
        summaryRow[key] = ''; // Empty string for other columns
      }
    });

    // Mark this row as a summary for styling purposes
    summaryRow.__isSummary = true;
    
    // Add summary row to the result
    result.push(summaryRow);
  }

  return result;
}

const PayrollReportTableArrears = ({ tableData, isLoading, is_grouped, is_staff = false, is_yearly = false, is_allowance = false, title }) => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [filterValue, setFilterValue] = React.useState("");

  const tableRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const tableContainerRef = useRef(null);
  const scrollbarRef = useRef(null);

  // Process the raw data (grouped, staff, or ungrouped)
  const rowsData = useMemo(() => {
    if (is_staff) {
      return rearrangeStaffData(tableData, is_yearly, is_allowance);
    } else if (is_grouped) {
      return rearrangeData(tableData, is_yearly, is_allowance);
    } else {
      return reformatData(tableData, is_yearly);
    }
  }, [tableData, is_grouped, is_staff, is_yearly, is_allowance]);

  // Search function for grouped/staff data
  // I need to ensure data with group.isStaffHeader also appaear in the search as its important for the is_staff data. 
  // const searchGroupedData = useCallback((data, searchTerm) => {
  //   if (!searchTerm?.trim()) return data;
    
  //   const searchValue = searchTerm.toLowerCase();
    
  //   return data.map(group => ({
  //     ...group,
  //     data: group.data.filter(item => {

  //       // Don't filter summary, difference, or staff net rows
  //       if (item.__isSummary || item.__isDifference || item.__isStaffNet || item.__isStaffNetSpacer ) return true;
        
  //       // Search through all object values
  //       return Object.values(item).some(value => 
  //         value && value.toString().toLowerCase().includes(searchValue)
  //       );
  //     })
  //   })).filter(group =>  group.data.length > 0 ); // Remove empty groups
  // }, []);
  // Search function for grouped/staff data
// Updated to ensure staff headers always appear when is_staff is true
const searchGroupedData = useCallback((data, searchTerm) => {
  if (!searchTerm?.trim()) return data;
  
  const searchValue = searchTerm.toLowerCase();
  
  return data.map(group => ({
    ...group,
    data: group.data.filter(item => {
      // Don't filter summary, difference, or staff net rows
      if (item.__isSummary || item.__isDifference || item.__isStaffNet || item.__isStaffNetSpacer) return true;
      
      // Search through all object values
      return Object.values(item).some(value => 
        value && value.toString().toLowerCase().includes(searchValue)
      );
    })
  })).filter(group => {
    // For staff data, always keep groups with staff headers
    if (is_staff && group.isStaffHeader) return true;
    
    // For other cases, only keep groups with matching data
    return group.data.length > 0;
  });
}, [is_staff]);


  // Search function for ungrouped data
  const searchUngroupedData = useCallback((data, searchTerm) => {
    if (!searchTerm?.trim()) return data;
    
    const searchValue = searchTerm.toLowerCase();
    
    return data.filter(item => {
      // Don't filter summary or difference rows
      if (item.__isSummary || item.__isDifference) return true;
      
      // Search through all object values
      return Object.values(item).some(value => 
        value && value.toString().toLowerCase().includes(searchValue)
      );
    });
  }, []);

  // Apply search filter
  const filteredData = useMemo(() => {
    if (is_grouped || is_staff) {
    return searchGroupedData(rowsData, filterValue);
    } else {
      return searchUngroupedData(rowsData, filterValue);
    }
  }, [rowsData, filterValue, is_grouped, is_staff, searchGroupedData, searchUngroupedData]);

  // Calculate total items for pagination (excluding summary/difference/staff net rows)
  const totalItems = useMemo(() => {
    if (is_grouped || is_staff) {
      return filteredData.reduce((total, group) => {
        const dataRows = group.data.filter(item => !item.__isSummary && !item.__isDifference && !item.__isStaffNet && !item.__isStaffNetSpacer );
        return total + dataRows.length;
      }, 0);
    } else {
      return filteredData.filter(item => !item.__isSummary && !item.__isDifference).length;
    }
  }, [filteredData, is_grouped, is_staff]);

  // Calculate pages
  const pages = useMemo(() => {
    if (rowsPerPage === filteredData.length || rowsPerPage >= totalItems) {
      return 1; // Show all data, no pagination needed
    }
    return Math.ceil(totalItems / rowsPerPage);
  }, [totalItems, rowsPerPage, filteredData.length]);

  // Apply pagination
  const paginatedData = useMemo(() => {
    // If "All" is selected, return all filtered data

    console.log(rowsPerPage, filteredData.length)

    if (rowsPerPage === filteredData.length || rowsPerPage >= totalItems) {
      return filteredData;
    }

        console.log(rowsPerPage, filteredData.length, 'here')

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    if (is_grouped || is_staff) {
      let currentCount = 0;
      const result = [];
      
      for (const group of filteredData) {
        const dataRows = group.data.filter(item => !item.__isSummary && !item.__isDifference && !item.__isStaffNet && !item.__isStaffNetSpacer);
        const summaryRows = group.data.filter(item => item.__isSummary || item.__isDifference || item.__isStaffNet || item.__isStaffNetSpacer);
        
        if (currentCount >= end) break;
        
        if (currentCount + dataRows.length <= start) {
          currentCount += dataRows.length;
          continue;
        }
        
        const groupStart = Math.max(0, start - currentCount);
        const groupEnd = Math.min(dataRows.length, end - currentCount);
        
        if (groupStart < dataRows.length) {
          const paginatedGroupData = [
            ...dataRows.slice(groupStart, groupEnd),
            ...summaryRows
          ];
          
          result.push({
            ...group,
            data: paginatedGroupData
          });
        }
        
        currentCount += dataRows.length;
      }
      
      return result;
    } else {
      const dataRows = filteredData.filter(item => !item.__isSummary && !item.__isDifference);
      const summaryRows = filteredData.filter(item => item.__isSummary || item.__isDifference);
      
      return [
        ...dataRows.slice(start, end),
        ...summaryRows
      ];
    }
  }, [filteredData, page, rowsPerPage, is_grouped, is_staff, totalItems]);



  // Reset page when data changes
  useEffect(() => {
    setPage(1);
  }, [filteredData, rowsPerPage]);

  const generateTableHead = useCallback(() => {
    // console.log(rowsData)
    const firstGroup = is_staff ? rowsData?.[1]?.data?.[0] :  (is_grouped) ? rowsData?.[0]?.data?.[0] : rowsData?.[0];
    if (!firstGroup) return [];

    // Create a Set for quick lookup of column names in tableHead
    const tableHeadSet = new Set(tableHead.map((head) => head.column_name));

    // Get the ordered head columns based on tableHead
    const orderedHead = tableHead
      .map((head) => head.column_name)
      .filter((columnName) => columnName in firstGroup); // Ensure they exist in firstGroup

    // Get additional columns that are not in tableHead
    const additionalColumns = Object.keys(firstGroup).filter(
      (key) => !tableHeadSet.has(key) && key !== '__isSummary' && key !== '__isDifference' && key !== '__isStaffNet' && key !== '__isStaffNetSpacer' // Exclude summary, difference, and staff net markers
    );

    // Combine ordered head columns with additional columns
    const allColumns = [...orderedHead, ...additionalColumns];

    // Sort: move columns containing "NET" to the end
    const netColumns = allColumns.filter(col => col.includes('NET'));
    const nonNetColumns = allColumns.filter(col => !col.includes('NET'));

    return [...nonNetColumns, ...netColumns];
  }, [rowsData, is_grouped, is_staff]);

  

  // const navigateToProfile = (staffID) => {
  //   navigate(`/self/profile_details/${staffID}`);
  // };

  const onRowsPerPageChange = useCallback((e, val) => {
    const value = Number(e?.target?.value);

    if(value || val){
      setRowsPerPage(value || val);
    }
    setPage(1);
  }, []);


  useEffect(() => {
    if(is_staff){
      onRowsPerPageChange(null, totalItems || filteredData.length)
    }
  }, [totalItems, filteredData.length, onRowsPerPageChange, is_staff])
  

  const topContent = React.useMemo(() => {
    return (
      <>
        <div className="flex justify-between items-center w-full">
          <div>
            <Input
              allowClear
              value={filterValue}
              placeholder="Search here..."
              onChange={(e) => setFilterValue(e.target.value)}
              className="max-w-sm"
              size="large"
              />
          </div>
              {
                is_staff ? null : 
          <div className="flex justify-between items-center ml-auto">
            <label htmlFor="select" className="flex items-center text-default-400 text-small">
              Rows per page:
              <select
                id='select'
                name='rowsPerPage'
                className="bg-transparent outline-none text-default-400 text-small "
                onChange={onRowsPerPageChange}
                value={rowsPerPage}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
              >
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value={totalItems || filteredData.length}>All</option>
              </select>
            </label>
          </div>
        }
        </div>

      </>
    );
  }, [filterValue, totalItems, filteredData.length, onRowsPerPageChange, rowsPerPage, is_staff]);

  //==================== Table mouse scrolling by dragging horizontally ======================

  const handleMouseDown = (e) => {
    e.preventDefault(); // Prevent default behavior
    setIsDragging(true);
    setStartX(e.pageX - tableContainerRef.current.getBoundingClientRect().left);
    setScrollLeft(tableContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault(); // Prevent default behavior
    const x = e.pageX - tableContainerRef.current.getBoundingClientRect().left;
    const walk = (x - startX) * 2; // Adjust scroll speed as needed
    tableContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const syncScroll = (sourceRef, targetRef) => {
    if (sourceRef.current && targetRef.current) {
      targetRef.current.scrollLeft = sourceRef.current.scrollLeft;
    }
  };

  useEffect(() => {
    const updateScrollbarWidth = () => {
      if (scrollbarRef.current && tableContainerRef.current) {
        const columnCount = generateTableHead().length; // Number of columns
        const columnWidth = 142; // Approximate column width, adjust as needed
        const totalWidth = columnCount * columnWidth;

        scrollbarRef.current.firstChild.style.width = `${totalWidth}px`;
      }
    };

    updateScrollbarWidth();
    window.addEventListener("resize", updateScrollbarWidth);

    return () => {
      window.removeEventListener("resize", updateScrollbarWidth);
    };
  }, [paginatedData, generateTableHead]);

  //===================== ends here =================================

  const TopContent = () => {
    return (
      <div className="flex justify-end  gap-2 no-print">
        <ActionButton
        className={"flex gap-1 items-center"}
        onClick={() =>
          printPayrollReport({
            tableData: tableData,
            is_grouped,
            is_staff,
            is_yearly,
            is_allowance,
            title,
            generateTableHead,
            rearrangeData,
            rearrangeStaffData,
            reformatData
          })
        }
      >
        Print Report <MdPrint size={20} />
      </ActionButton>

        <ActionButton
          className={"flex gap-1 items-center"}
          onClick={() =>
            exportPayrollReportExcel({
              excelData: rowsData,
              fileName: title ?? "Reports",
              is_grouped: is_grouped || is_staff,
            })
          }
        >
          Export as Excel <MdOutlineFileDownload size={20} />
        </ActionButton>
      </div>
    );
  };

  const totalNet = useMemo(() => {
    if (is_grouped && !is_staff) {
      const val = paginatedData.reduce((total, v) => {
        const itemTotal = v.data
          .filter(el => !el.__isSummary && !el.__isDifference && !el.__isStaffNet && !el.__isStaffNetSpacer) // Exclude summary, difference, and staff net rows from total calculation
          .reduce((subTotal, el) => {
            return subTotal + (el.NET || el.Net || Number(el?.amount) || Number(el?.Amount) || 0);
          }, 0);
        return total + itemTotal;
      }, 0);

      return val;
    } else {
      const val = paginatedData
        .filter(v => !v.__isSummary && !v.__isDifference) // Exclude summary and difference rows from total calculation
        .reduce((total, v) => {
          return total + (v?.NET || v?.Net || Number(v?.amount) || Number(v?.Amount) || Number(v?.Total) || Number(v?.sum_pay) || 0);
        }, 0);

      return val;
    }
  }, [paginatedData, is_grouped, is_staff]);

  return (
    <>
      {rowsData?.length ? <TopContent /> : null}

      <div className="relative">
        <div className="hq-title px-4 py-3 font-bold text-center text-lg">
          {title?.replaceAll("'", "")}
        </div>
        <div
          ref={tableContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onScroll={() => syncScroll(tableContainerRef, scrollbarRef)}
          // Add padding to avoid overlap with the scrollbar
          className=" pt-3 pb-10 overflow-x-auto bg-white shadow-sm border border-gray-100 ps-4 pe-5 rounded-[14px] mt-4 w-full max-w-[100vw] sm:max-w-[95vw] md:max-w-[90vw] lg:max-w-[85vw] xl:max-w-[80vw]"
        >
          {generateTableHead()?.length ? (
            <>
              <Table
                topContent={topContent}
                classNames={{
                  table: "min-w-full",
                  wrapper: "overflow-x-auto",
                  tr: "border-b",
                  tbody: "divide-y divide-gray-200",
                  thead: "bg-gray-50",
                  th: "min-w-[120px] whitespace-nowrap",
                  td: "min-w-[120px] whitespace-nowrap",
                }}
                isStriped
                aria-label="staff_data Table"
                removeWrapper={true}
                className="overflow-x-scroll"
              >
                {/* Generate the table header dynamically based on the keys in the first item */}
                <TableHeader>
                  {generateTableHead()?.map((key, index) => (
                    <TableColumn
                      key={index + "_header"}
                      className="font-helvetica text-black text-[0.80rem]"
                    >
                      {key ? key?.replaceAll("_", " ")?.toUpperCase() : ""}{" "}
                      {/* Display key in uppercase */}
                    </TableColumn>
                  ))}
                </TableHeader>

                <TableBody
                  emptyContent={
                    <div className="flex items-center justify-center text-lg">
                      No Data Available
                    </div>
                  }
                >
                  {paginatedData?.length > 0 ? (
                    (is_grouped || is_staff) ? (
                      paginatedData.flatMap((group, groupIndex) => [
                        // Group Header as a TableRow (skip empty headers for difference/staff net rows)
                        ...(group?.header ? [
                          <TableRow 
                            key={`group-header-${groupIndex}`}
                            className={
                              group.isStaffHeader 
                                ? "bg-blue-100 font-bold border-t-2 border-blue-300" 
                                : group.isGroupHeader 
                                ? "bg-gray-100 font-semibold" 
                                : ""
                            }
                          >
                            {generateTableHead()?.map((head, index) => (
                              <TableCell
                                key={index + "____header"}
                                className={`font-bold font-helvetica text-sm uppercase`}
                              >
                                {index === 0 ? group?.header || "Unknown" : ""}
                                {index == generateTableHead()?.length - 1 ? (
                                  <span>{  group?.groupLength}</span>
                                ) : null}
                              </TableCell>
                            ))}
                          </TableRow>
                        ] : []),

                        // Grouped Data as multiple TableRows
                        ...(group && group.data
                          ? group.data.map((rowData, rowIndex) => (
                              <TableRow
                                key={`group-row-${groupIndex}-${rowIndex}`}
                                className={
                                  rowData.__isDifference 
                                    ? "bg-blue-50 font-bold border-t-2 border-blue-200" 
                                    : rowData.__isSummary 
                                    ? "bg-yellow-50 font-bold" 
                                    : rowData.__isStaffNet
                                    ? "bg-green-50 font-bold border-t-2 border-green-100"
                                    : ""
                                }
                              >
                                {generateTableHead() &&
                                  generateTableHead().map((key, index) => (
                                    <TableCell
                                      key={`cell-${groupIndex}-${rowIndex}-${index}`}
                                      className={`font-helvetica text-xs ${
                                        rowData.__isDifference
                                          ? "font-bold text-blue-800 opacity-100 py-4 text-sm"
                                          : rowData.__isSummary 
                                          ? "font-bold text-black opacity-100 py-4" 
                                          : rowData.__isStaffNet
                                          ? "font-bold text-green-600 opacity-100 py-4 text-sm"
                                          : rowData.__isStaffNetSpacer
                                          ? "font-bold py-6 text-sm"
                                          : "opacity-65"
                                      }`}
                                    >
                                      {rowData && rowData[key] !== undefined
                                        ? rowData[key] === 0 ? '0' : rowData[key] === '' ? '' : !rowData[key] ? "N/A" : key.includes("NET") || key.includes("Net") || key.includes("net") || 
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
                                          ?  formatNumberWithComma(parseFloat(rowData[key] || 0))
                                          : rowData[key] ?? "N/A"
                                        : "N/A"}
                                    </TableCell>
                                  ))}
                              </TableRow>
                            ))
                          : []),
                      ])
                    ) : (
                      paginatedData?.map((data, index) => (
                        <TableRow
                          key={index + "datas____"}
                          className={`${
                            data.__isDifference
                              ? "bg-blue-50 font-bold border-t-2 border-blue-200"
                              : data.__isSummary 
                              ? "bg-yellow-50 font-bold" 
                              : index % 2 === 0 
                              ? "bg-white" 
                              : "bg-gray-100"
                          }`}
                          style={{
                            borderRadius: "10px",
                          }}
                        >
                          {generateTableHead()?.map((head, index) => (
                            <TableCell
                              key={index + "_____cell_data" + head}
                              className={
                                data.__isDifference || data.__isSummary ? 
                                "py-4 rounded-tr-lg rounded-br-lg "  
                              :
                               index === 0
                                 ? "rounded-tl-lg rounded-bl-lg"
                                 : index === generateTableHead()?.length - 1
                                 ? "rounded-tr-lg rounded-br-lg"
                                 : ""
                              }
                            >
                              {head?.includes("DATE") ? (
                                <h5 className={`font-helvetica text-xs ${
                                  data.__isDifference
                                    ? "font-bold text-blue-800 opacity-100"
                                    : data.__isSummary 
                                    ? "font-bold text-black opacity-100" 
                                    : "opacity-65"
                                }`}>
                                  {data?.[head] ? toStringDate(data?.[head]) : "N/A"}
                                </h5>
                              ) : (
                                <h5
                                  className={`font-helvetica text-xs ${
                                    data.__isDifference
                                      ? "font-bold text-blue-800 opacity-100"
                                      : data.__isSummary 
                                      ? "font-bold text-black opacity-100" 
                                      : "opacity-65"
                                  } ${
                                    [
                                      "HOME_ADDRESS",
                                      "DIRECTORATE",
                                      "DESIGNATION_NAME",
                                      "NAME",
                                    ].includes(head)
                                      ? "w-48"
                                      : ""
                                  }`}
                                >
                                  {(!head.includes("payroll_run_id") &&
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
                                    Number.isFinite(Number(data[head])) &&
                                    data[head] != 0) ||
                                  (is_yearly && monthColumnsLower.includes(head.toLowerCase()) && data[head] !== '')
                                    ? formatNumberWithComma(parseFloat(data[head] || 0))
                                    : data[head] ?? "N/A"}
                                </h5>
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    )
                  ): (
                    <TableRow>
                      <TableCell
                        colSpan={generateTableHead()?.length}
                        className="text-center"
                      >
                        No Data Available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              <div>
                {!!totalNet && !is_allowance && (
                  <div className="bg-gray-50 font-semibold font-helvetica flex w-full ">
                    <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-helvetica">
                      NET TOTAL
                    </div>
                    <div className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 font-helvetica">
                      {formatNumberWithComma(totalNet)}
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex justify-center">
              <h1 className="font-helvetica">No Data Available</h1>
            </div>
          )}
        </div>

        {pages > 1 ? (
          <div className="flex w-full justify-center mt-4">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        ) : null}

        <div
          ref={scrollbarRef}
          className="fixed bottom-0 left-0 right-0 h-4 overflow-x-auto"
          onScroll={() => syncScroll(scrollbarRef, tableContainerRef)}
        >
          <div className="h-4"></div>{" "}
        </div>
      </div>
    </>
  );
};

export default PayrollReportTableArrears;






