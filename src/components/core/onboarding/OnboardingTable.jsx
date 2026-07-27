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
import { useEffect, useMemo, useRef, useState } from "react";
import { ConfigProvider, DatePicker, Input, Select } from "antd";
import { toStringDate } from "../../../utils/utitlities";
import ActionIcons from "../shared/ActionIcons";
import StarLoader from "../loaders/StarLoader";
import dayjs from "dayjs";

const OnboardingTable = ({
  tableData,
  isLoading,
  handleAction,
  currentTab,
}) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  // ===============functions to handle filter============================

  const tableHead = [
    { name: "NAME", column_name: "NAME" },
    { name: "EMPLOYEE NO.", column_name: "STAFF_NUMBER" },
    { name: "PHONE", column_name: "PHONE" },
    { name: "EMAIL", column_name: "EMAIIL" },
    {
      name: "DATE OF FIRST APPOINT.",
      column_name: "DATE_OF_FIRST_APPOINTMENT",
    },
    { name: "DATE OF FIRST APPROVAL", column_name: "DATE_OF_FIRST_APPROVAL" },
    { name: "CREATED ON", column_name: "CREATED_ON" },
    currentTab === "1" && { name: "STAGE", column_name: "STAGE" },
    { name: "ACTION", column_name: "ACTION" },
  ].filter(Boolean);

  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [selectedDate, setSelectedDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [sortDescriptor, setSortDescriptor] = useState({
    column: "date",
    direction: "ascending",
  });

  const updatedTableData = useMemo(() => tableData, [tableData]);

  useEffect(() => {
    const filterData = () => {
      let updatedData = [...updatedTableData];

      // Filter by search value
      if (searchValue?.trim()) {
        const value = searchValue?.toLowerCase();
        const searchTerms = value.toLowerCase().trim().split(" ");

        updatedData = updatedData.filter((item) => {
          const fullName =
            `${item?.FIRST_NAME} ${item?.LAST_NAME}`.toLowerCase();

          const matches = [
            item?.FIRST_NAME?.toLowerCase(),
            item?.LAST_NAME?.toLowerCase(),
            item?.STAFF_NUMBER?.toLowerCase(),
            toStringDate(item?.DATE_OF_BIRTH)?.toLowerCase(),
            fullName,
          ].some((field) => field?.includes(value));

          const fullNameMatches = searchTerms.every((term) =>
            fullName.includes(term)
          );

          return matches || fullNameMatches;
        });
      }

      // // Filter by date
      // if (selectedDate) {
      //   updatedData = updatedData?.filter((item) => {
      //     if (!item?.CREATED_ON) return false;

      //     const itemDate = new Date(item.CREATED_ON)
      //       .toISOString()
      //       .split("T")[0];

      //     let filterDate;
      //     if (selectedDate.$d) {
      //       filterDate = new Date(selectedDate.$d).toISOString().split("T")[0];
      //     } else if (selectedDate instanceof Date) {
      //       filterDate = new Date(selectedDate).toISOString().split("T")[0];
      //     } else if (typeof selectedDate === "string") {
      //       filterDate = new Date(selectedDate).toISOString().split("T")[0];
      //     } else {
      //       filterDate = selectedDate.format
      //         ? selectedDate.format("YYYY-MM-DD")
      //         : null;
      //     }

      //     const matches = itemDate === filterDate;

      //     return matches;
      //   });
      // }

      // // Filter by date
      // if (selectedDate) {
      //   updatedData = updatedData?.filter((item) => {
      //     if (!item?.CREATED_ON) return false;

      //     // Create date objects without time components
      //     const itemDate = new Date(item.CREATED_ON);
      //     const itemDateOnly = new Date(
      //       itemDate.getFullYear(),
      //       itemDate.getMonth(),
      //       itemDate.getDate()
      //     );

      //     let filterDateOnly;

      //     // Handle different date formats from the date picker
      //     if (selectedDate.$d) {
      //       // Day.js object
      //       const tempDate = new Date(selectedDate.$d);
      //       filterDateOnly = new Date(
      //         tempDate.getFullYear(),
      //         tempDate.getMonth(),
      //         tempDate.getDate()
      //       );
      //     } else if (selectedDate instanceof Date) {
      //       filterDateOnly = new Date(
      //         selectedDate.getFullYear(),
      //         selectedDate.getMonth(),
      //         selectedDate.getDate()
      //       );
      //     } else if (typeof selectedDate === "string") {
      //       const tempDate = new Date(selectedDate);
      //       filterDateOnly = new Date(
      //         tempDate.getFullYear(),
      //         tempDate.getMonth(),
      //         tempDate.getDate()
      //       );
      //     } else if (selectedDate.format) {
      //       // Day.js with format method
      //       const dateStr = selectedDate.format("YYYY-MM-DD");
      //       const tempDate = new Date(dateStr + "T00:00:00");
      //       filterDateOnly = new Date(
      //         tempDate.getFullYear(),
      //         tempDate.getMonth(),
      //         tempDate.getDate()
      //       );
      //     } else {
      //       return false;
      //     }

      //     // Compare timestamps
      //     return itemDateOnly.getTime() === filterDateOnly.getTime();
      //   });
      // }

      // Filter by date range
      if (startDate || endDate) {
        updatedData = updatedData?.filter((item) => {
          if (!item?.CREATED_ON) return false;

          // Get item date as string (YYYY-MM-DD format)
          const itemDate = new Date(item.CREATED_ON);
          const itemDateStr = `${itemDate.getFullYear()}-${String(
            itemDate.getMonth() + 1
          ).padStart(2, "0")}-${String(itemDate.getDate()).padStart(2, "0")}`;

          // Get start and end date strings if they exist
          const startDateStr = startDate ? startDate : null;
          const endDateStr = endDate ? endDate : null;

          // If only start date is selected
          if (startDateStr && !endDateStr) {
            const result = itemDateStr >= startDateStr;

            return result;
          }

          // If only end date is selected
          if (!startDateStr && endDateStr) {
            const result = itemDateStr <= endDateStr;
            return result;
          }

          // If both dates are selected (date range)
          if (startDateStr && endDateStr) {
            const result =
              itemDateStr >= startDateStr && itemDateStr <= endDateStr;
            return result;
          }

          return true;
        });
      }

      setFilteredData(updatedData);
    };

    filterData();
  }, [searchValue, selectedDate, updatedTableData, startDate, endDate]);

  const rowsData =
    searchValue?.length || startDate || endDate
      ? filteredData
      : updatedTableData;

  const pages = Math.ceil(rowsData?.length / rowsPerPage);

  useEffect(() => {
    setPage(1);
  }, [rowsData]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return rowsData?.slice(start, end);
  }, [page, rowsData, rowsPerPage]);

  // Updated sorting logic with better handling for different data types

  const sortedItems = useMemo(() => {
    if (!items?.length) return items;

    return [...items].sort((a, b) => {
      const column = sortDescriptor.column;
      let first, second;

      // Handle NAME column specially (combine FIRST_NAME and LAST_NAME)
      if (column === "NAME") {
        first = `${a?.FIRST_NAME || ""} ${a?.LAST_NAME || ""}`
          .trim()
          .toLowerCase();
        second = `${b?.FIRST_NAME || ""} ${b?.LAST_NAME || ""}`
          .trim()
          .toLowerCase();
      } else {
        first = a[column];
        second = b[column];
      }

      // Handle null/undefined values
      if (first == null && second == null) return 0;
      if (first == null) return 1;
      if (second == null) return -1;

      // Handle date columns (DATE_OF_FIRST_APPOINTMENT, DATE_OF_FIRST_APPROVAL, CREATED_ON)
      if (column.includes("DATE") || column === "CREATED_ON") {
        const firstDate = new Date(first).getTime();
        const secondDate = new Date(second).getTime();

        if (!isNaN(firstDate) && !isNaN(secondDate)) {
          const cmp =
            firstDate < secondDate ? -1 : firstDate > secondDate ? 1 : 0;
          return sortDescriptor.direction === "descending" ? -cmp : cmp;
        }
      }

      // Convert to lowercase for string comparison
      if (typeof first === "string") first = first.toLowerCase();
      if (typeof second === "string") second = second.toLowerCase();

      // Compare values
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const handleChange = (value) => {
    setRowsPerPage(value);
  };

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
        const columnCount = tableHead.length; // Number of columns
        const columnWidth = 155; // Approximate column width, adjust as needed
        const totalWidth = columnCount * columnWidth;

        scrollbarRef.current.firstChild.style.width = `${totalWidth}px`;
      }
    };

    updateScrollbarWidth();
    window.addEventListener("resize", updateScrollbarWidth);

    return () => {
      window.removeEventListener("resize", updateScrollbarWidth);
    };
  }, [rowsData]);

  //===================== ends here =================================

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            /* here is your global tokens */
            colorPrimary: "#d9d9d9",
            colorPrimaryHover: "#d9d9d9",
          },
          components: {
            Input: {
              hoverBorderColor: "#d9d9d9",
              activeBorderColor: "#d9d9d9",
              activeShadow: "#d9d9d9",
            },
            Select: {
              hoverBorderColor: "#d9d9d9",
              activeBorderColor: "#d9d9d9",
              activeShadow: "#d9d9d9",
            },
          },
        }}
      >
        <div className="flex justify-between flex-wrap gap-y-2">
          <div className="flex gap-x-3 my-auto items-end">
            <div className="flex flex-col">
              <span className="font-helvetica">Search here</span>
              <Input
                type="search"
                placeholder="Search here...."
                size="large"
                onChange={(e) => setSearchValue(e.target.value)}
                className="lg:w-[100%] md:w-[50%]"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-helvetica">Start Date</span>
              <DatePicker
                placeholder="Created On"
                size="large"
                value={startDate ? dayjs(startDate) : null}
                disabledDate={(current) =>
                  endDate
                    ? current && current > dayjs(endDate).endOf("day")
                    : false
                }
                onChange={(dateString, date) => setStartDate(date)}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-helvetica">End Date</span>
              <DatePicker
                placeholder="Created On"
                size="large"
                value={endDate ? dayjs(endDate) : null}
                disabledDate={(current) =>
                  startDate
                    ? current && current < dayjs(startDate).startOf("day")
                    : false
                }
                onChange={(dateString, date) => setEndDate(date)}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-helvetica">Rows per page:</span>
            <Select
              defaultValue="15"
              value={rowsPerPage}
              onChange={handleChange}
              options={[
                {
                  value: "15",
                  label: "15",
                },
                {
                  value: "25",
                  label: "25",
                },
                {
                  value: "50",
                  label: "50",
                },
                {
                  value: "100",
                  label: "100",
                },
              ]}
            />
          </div>
        </div>
      </ConfigProvider>

      <div className="relative">
        <div
          ref={tableContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onScroll={() => syncScroll(tableContainerRef, scrollbarRef)}
          // Add padding to avoid overlap with the scrollbar
          className="table_default_hor_scrollbar pt-3 pb-10 overflow-x-scroll bg-white shadow-sm border border-gray-100 ps-4 pe-5 rounded-[14px] mt-4"
        >
          <Table
            isStriped
            aria-label="staff_data Table"
            removeWrapper={true}
            onSortChange={setSortDescriptor}
            sortDescriptor={sortDescriptor}
          >
            <TableHeader>
              {tableHead?.map((head, index) => (
                <TableColumn
                  key={head?.column_name}
                  allowsSorting={head?.column_name !== "ACTION"}
                  className="font-helvetica text-black text-[0.80rem]"
                >
                  {head?.name}
                </TableColumn>
              ))}
            </TableHeader>
            <TableBody
              emptyContent={
                isLoading ? (
                  <StarLoader />
                ) : (
                  <p className="font-helvetica">No Data Available</p>
                )
              }
            >
              {
                // items?.length &&
                //   items?.map((data, index) => (
                //     <TableRow
                //       key={index + "datas____"}
                //       className={`${
                //         index % 2 === 0 ? "bg-white" : "bg-gray-100"
                //       }`}
                //       style={{
                //         borderRadius: "10px",
                //       }}
                //     >
                //       {tableHead?.map((head, index) => (
                //         <TableCell
                //           key={index + "_____cell_data" + head?.column_name}
                //           className={
                //             index === 0
                //               ? "rounded-tl-lg rounded-bl-lg"
                //               : index === tableHead?.length - 1
                //               ? "rounded-tr-lg rounded-br-lg"
                //               : ""
                //           }
                //         >
                //           {head?.column_name === "NAME" ? (
                //             <>
                //               <div className="flex flex-col">
                //                 <h4 className="w-48 font-helvetica text-xs uppercase">
                //                   {data?.FIRST_NAME || ""} {data?.LAST_NAME || ""}
                //                 </h4>
                //                 {/* <div className="flex flex-col gap-y-1 justify-center w-48">
                //                     <p className="font-helvetica my-auto text-black opacity-50 capitalize">
                //                       {data?.DEPARTMENT?.toLowerCase()}
                //                     </p>
                //                     <p className="font-helvetica text-black opacity-30 my-auto capitalize">
                //                       {data?.UNIT}
                //                     </p>
                //                   </div> */}
                //               </div>
                //             </>
                //           ) : head?.name?.includes("DATE") ? (
                //             <h5 className="font-helvetica text-xs opacity-65">
                //               {data[head?.column_name]
                //                 ? toStringDate(data[head?.column_name])
                //                 : "-"}
                //             </h5>
                //           ) : head?.column_name === "ACTION" ? (
                //             <div className="flex">
                //               {
                //                 <>
                //                   {!data?.IS_DRAFT ? (
                //                     <ActionIcons
                //                       variant={"VIEW"}
                //                       action={() => handleAction("view", data)}
                //                     />
                //                   ) : null}
                //                   {(currentTab === "3" || currentTab === "4") && (
                //                     <ActionIcons
                //                       variant={"EDIT"}
                //                       action={() => handleAction("edit", data)}
                //                     />
                //                   )}
                //                   {currentTab === "1" && (
                //                     <ActionIcons
                //                       variant={"DELETE"}
                //                       action={() => handleAction("delete", data)}
                //                     />
                //                   )}
                //                 </>
                //               }
                //             </div>
                //           ) : (
                //             <h5
                //               className={`font-helvetica text-xs opacity-65 ${
                //                 head?.name?.includes(
                //                   "DIRECTORATE" || "DESIGNATION"
                //                 )
                //                   ? "w-48"
                //                   : ""
                //               }`}
                //             >
                //               {data[head?.column_name] ?? "-"}
                //             </h5>
                //           )}
                //         </TableCell>
                //       ))}
                //     </TableRow>
                //   ))
              }
              {sortedItems?.length &&
                sortedItems?.map((data, index) => (
                  <TableRow
                    key={index + "datas____"}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-100"
                    }`}
                    style={{
                      borderRadius: "10px",
                    }}
                  >
                    {tableHead?.map((head, index) => (
                      <TableCell
                        key={index + "_____cell_data" + head?.column_name}
                        className={
                          index === 0
                            ? "rounded-tl-lg rounded-bl-lg"
                            : index === tableHead?.length - 1
                            ? "rounded-tr-lg rounded-br-lg"
                            : ""
                        }
                      >
                        {head?.column_name === "NAME" ? (
                          <>
                            <div className="flex flex-col">
                              <h4 className="w-48 font-helvetica text-xs uppercase">
                                {data?.FIRST_NAME || ""} {data?.LAST_NAME || ""}
                              </h4>
                            </div>
                          </>
                        ) : head?.name?.includes("DATE") ? (
                          <h5 className="font-helvetica text-xs opacity-65">
                            {data[head?.column_name]
                              ? toStringDate(data[head?.column_name])
                              : "-"}
                          </h5>
                        ) : head?.column_name === "ACTION" ? (
                          <div className="flex">
                            {
                              <>
                                {!data?.IS_DRAFT ? (
                                  <ActionIcons
                                    variant={"VIEW"}
                                    action={() => handleAction("view", data)}
                                  />
                                ) : null}
                                {(currentTab === "3" || currentTab === "4") && (
                                  <ActionIcons
                                    variant={"EDIT"}
                                    action={() => handleAction("edit", data)}
                                  />
                                )}
                                {currentTab === "1" && (
                                  <ActionIcons
                                    variant={"DELETE"}
                                    action={() => handleAction("delete", data)}
                                  />
                                )}
                              </>
                            }
                          </div>
                        ) : (
                          <h5
                            className={`font-helvetica text-xs opacity-65 ${
                              head?.name?.includes(
                                "DIRECTORATE" || "DESIGNATION"
                              )
                                ? "w-48"
                                : ""
                            }`}
                          >
                            {data[head?.column_name] ?? "-"}
                          </h5>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>

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
        </div>

        <div
          ref={scrollbarRef}
          className="fixed bottom-0 left-0 right-0 h-4 overflow-x-scroll"
          onScroll={() => syncScroll(scrollbarRef, tableContainerRef)}
        >
          <div className="h-4"></div>
        </div>
      </div>
    </>
  );
};

export default OnboardingTable;
