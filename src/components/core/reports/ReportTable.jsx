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
} from "@nextui-org/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toStringDate } from "../../../utils/utitlities";
import ActionButton from "../../forms/FormElements/ActionButton";
import { MdOutlineFileDownload } from "react-icons/md";
import { exportExcel } from "../../../utils/exportReportAsExcel";

const tableHead = [
  { name: "FIRST_NAME", column_name: "FIRST_NAME" },
  { name: "LAST_NAME", column_name: "LAST_NAME" },
  { name: "EMPLOYEE NAMES", column_name: "EMPLOYEE_NAMES" },
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

function rearrangeData(inputData) {
  const result = [];

  // Iterate through each key in the input object
  Object.keys(inputData).forEach((key) => {
    // Replace empty string key with "Unknown"
    const header = key === "" ? "Unknown" : key.trim(); // Trim to remove extra spaces/newlines

    // Create the header and dynamically build the data array
    const section = {
      header: header,
      data: inputData[key].map((item, i) => {
        // Dynamically construct the object from the input data
        return { ...item, S_N: i + 1 };
      }),
    };

    // Push the section into the result array
    result.push(section);
  });

  return result;
}

const ReportTable = ({
  tableData,
  isLoading,
  is_grouped,
  is_nominal_report,
}) => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  // ===============functions to handle filter============================

  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filterData = () => {
      if (searchValue?.trim()) {
        const value = searchValue?.toLowerCase();
        const updatedData = tableData?.filter((item) => {
          const matches = [
            item?.FIRST_NAME?.toLowerCase(),
            item?.LAST_NAME?.toLowerCase(),
            item?.EMPLOYEE_TYPE?.toLowerCase(),
            item?.STAFF_NUMBER?.toLowerCase(),
            item?.DIRECTORATE?.toLowerCase(),
            item?.DEPARTMENT?.toLowerCase(),
            item?.DESIGNATION?.toLowerCase(),
            String(item?.GRADE)?.toLowerCase(),
            item?.STATE?.toLowerCase(),
            toStringDate(item?.DATE_OF_BIRTH)?.toLowerCase(),
          ].some((field) => field?.includes(value));
          return matches;
        });

        setFilteredData(updatedData.length ? updatedData : []);
      } else {
        // If search is cleared, show full data
        setFilteredData(tableData);
      }
    };

    filterData();
  }, [searchValue, tableData]);

  //====================== ends here ====================

  const rowsData = useMemo(() => {
    return is_grouped ? rearrangeData(tableData) : tableData;
  }, [tableData, is_grouped]);

  const pages = Math.ceil(rowsData?.length / rowsPerPage);

  useEffect(() => {
    setPage(1);
  }, [rowsData]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return rowsData?.length ? rowsData?.slice(start, end) : [];
  }, [page, rowsData, rowsPerPage]);

  const generateTableHead = useCallback(() => {
    const firstGroup = is_grouped ? rowsData?.[0]?.data?.[0] : rowsData?.[0];
    if (!firstGroup) return [];

    // Define columns to exclude (case-insensitive)
    const excludedColumns = ["STAFF_ID"];

    // Define the desired order for priority columns (case-insensitive)
    const nominalReportPriorityOrder = [
      "EMPLOYEE NAMES",
      "FILE NO",
      "GRADE LEVEL",
      "STEP",
      "EMPLOYMENT CADRE",
      "GENDER",
      "QUALIFICATION WITH DATES",
      "DATE OF BIRTH",
      "DATE OF FIRST APPOINTMENT",
      "DATE OF PRESENT APPOINTMENT",
      "DATE OF CONFIRMATION",
      "STATE",
      "LGA",
      "DEPARTMENT",
      "STATION",
      "REMARK",
    ];
    const priorityOrder = is_nominal_report
      ? nominalReportPriorityOrder
      : [
          "S_N",
          "FULL NAME",
          "STAFF NUMBER",
          "EMPLOYEE NAMES",
          "FILE NO",
          "GRADE LEVEL",
          "STEP",
          "EMPLOYMENT CADRE",
          "GENDER",
          "GRADE",
          "STEP",
        ];

    // Column that should always be last
    const lastColumn = "REMARK";

    // Create a Set for quick lookup of column names in tableHead
    const tableHeadSet = new Set(tableHead.map((head) => head.column_name));

    // Get all columns from firstGroup (excluding the ones in excludedColumns)
    const allColumns = Object.keys(firstGroup).filter((key) => {
      const upperKey = key.toUpperCase();
      return !excludedColumns.some((excluded) => excluded === upperKey);
    });

    // Separate columns into priority, last, and remaining
    const priorityColumns = [];
    const remainingColumns = [];
    let remarkColumn = null;

    allColumns.forEach((col) => {
      const upperCol = col.toUpperCase();
      const priorityIndex = priorityOrder.findIndex((p) => p === upperCol);

      if (priorityIndex !== -1) {
        priorityColumns.push({ col, index: priorityIndex });
      } else if (upperCol === lastColumn) {
        remarkColumn = col;
      } else {
        remainingColumns.push(col);
      }
    });

    // Sort priority columns by their defined order
    priorityColumns.sort((a, b) => a.index - b.index);
    const sortedPriorityColumns = priorityColumns.map((item) => item.col);

    // If tableHead exists, prioritize its columns first, then add missing ones
    let orderedColumns;

    if (tableHead.length > 0) {
      // Get columns that exist in both tableHead and our data
      const tableHeadColumns = tableHead
        .map((head) => head.column_name)
        .filter(
          (columnName) =>
            columnName in firstGroup &&
            !excludedColumns.some(
              (excluded) => excluded === columnName.toUpperCase()
            )
        );

      // Get columns from data that are NOT in tableHead
      const additionalColumns = allColumns.filter(
        (key) => !tableHeadSet.has(key)
      );

      // Combine and reorder based on priority
      const allAvailableColumns = [...tableHeadColumns, ...additionalColumns];

      // Separate and sort
      const finalPriority = [];
      const finalRemaining = [];
      let finalRemark = null;

      allAvailableColumns.forEach((col) => {
        const upperCol = col.toUpperCase();
        const priorityIndex = priorityOrder.findIndex((p) => p === upperCol);

        if (priorityIndex !== -1) {
          finalPriority.push({ col, index: priorityIndex });
        } else if (upperCol === lastColumn) {
          finalRemark = col;
        } else {
          finalRemaining.push(col);
        }
      });

      finalPriority.sort((a, b) => a.index - b.index);
      orderedColumns = [
        ...finalPriority.map((item) => item.col),
        ...finalRemaining,
        ...(finalRemark ? [finalRemark] : []),
      ];
    } else {
      // No tableHead, use all columns from data
      orderedColumns = [
        ...sortedPriorityColumns,
        ...remainingColumns,
        ...(remarkColumn ? [remarkColumn] : []),
      ];
    }

    return orderedColumns;
  }, [rowsData, is_grouped, tableHead]);

  //==================== Table mouse scrolling by dragging horizontally ======================

  const tableRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const tableContainerRef = useRef(null);
  const scrollbarRef = useRef(null);

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
  }, [items, generateTableHead]);

  //===================== ends here =================================

  const TopContent = () => {
    return (
      <div className="flex justify-end">
        <ActionButton
          className={"flex gap-1 items-center"}
          onClick={() =>
            exportExcel({
              excelData: rowsData,
              fileName: "Reports",
              is_grouped,
              is_nominal_report,
            })
          }
        >
          Export as Excel <MdOutlineFileDownload size={20} />
        </ActionButton>
      </div>
    );
  };
  // console.log(rowsData);
  // console.log(generateTableHead());

  return (
    <>
      {rowsData?.length ? <TopContent /> : null}

      <div className="relative">
        <div
          ref={tableContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onScroll={() => syncScroll(tableContainerRef, scrollbarRef)}
          // Add padding to avoid overlap with the scrollbar
          className="table_default_hor_scrollba pt-3 pb-10 overflow-x-scroll bg-white shadow-sm border border-gray-100 ps-4 pe-5 rounded-[14px] mt-4 md:max-w-[900px] w-[1000px lg:max-w-[1000px xl:max-w-[1300px] mx-auto"
        >
          {generateTableHead()?.length ? (
            <Table isStriped aria-label="staff_data Table" removeWrapper={true}>
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
                    No Report Data Found
                  </div>
                }
              >
                {items?.length > 0 ? (
                  is_grouped ? (
                    items.flatMap((group, groupIndex) => [
                      // Group Header as a TableRow
                      <TableRow key={`group-header-${groupIndex}`}>
                        <TableCell
                          colSpan={generateTableHead()?.length}
                          className="font-bold font-helvetica text-sm uppercase bg-blue-400 text-white"
                        >
                          {group?.header || "Unknown"}{" "}
                          <span className="text-white ml-3 font-sembold tracking-wide">
                            ({group.data?.length})
                          </span>
                        </TableCell>
                        {Array.from({
                          length: generateTableHead()?.length - 1,
                        }).map((_, i) => (
                          <TableCell key={i} className="hidden"></TableCell>
                        ))}
                      </TableRow>,

                      // Grouped Data as multiple TableRows
                      ...(group && group.data
                        ? group.data.map((rowData, rowIndex) => (
                            <TableRow
                              key={`group-row-${groupIndex}-${rowIndex}`}
                            >
                              {generateTableHead() &&
                                generateTableHead().map((key, index) => (
                                  <TableCell
                                    key={`cell-${groupIndex}-${rowIndex}-${index}`}
                                    className="font-helvetica text-xs opacity-65"
                                  >
                                    {rowData && rowData[key] !== undefined
                                      ? rowData[key]
                                      : "N/A"}
                                  </TableCell>
                                ))}
                            </TableRow>
                          ))
                        : []),
                    ])
                  ) : (
                    items?.map((data, index) => (
                      <TableRow
                        key={index + "datas____"}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-gray-100"
                        }`}
                        style={{
                          borderRadius: "10px",
                        }}
                      >
                        {generateTableHead()?.map((head, index) => (
                          <TableCell
                            key={index + "_____cell_data" + head}
                            className={
                              index === 0
                                ? "rounded-tl-lg rounded-bl-lg"
                                : index === generateTableHead()?.length - 1
                                ? "rounded-tr-lg rounded-br-lg"
                                : ""
                            }
                          >
                            {/\bdate\b/i.test(head) ? (
                              <h5 className="font-helvetica text-xs opacity-65">
                                {data?.[head] && data?.[head] !== "N/A"
                                  ? toStringDate(data?.[head])
                                  : "N/A"}
                              </h5>
                            ) : (
                              <h5
                                className={`font-helvetica text-xs opacity-65 ${
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
                                {data[head] ?? "N/A"}
                              </h5>
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  )
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={generateTableHead()?.length}
                      className="text-center"
                    >
                      No Report Data Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          ) : (
            <div className="flex justify-center h-32 items-center">
              <h1 className="font-helvetica">No Report Data Found</h1>
            </div>
          )}

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
        </div>
        {/* </div> */}

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

export default ReportTable;
