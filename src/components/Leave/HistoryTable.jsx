/* eslint-disable no-unused-vars */

import React, { Fragment } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Pagination,
  Avatar,
} from "@nextui-org/react";
import { tableHeader, status } from "./data";
import { MdFilterList } from "react-icons/md";
import PropTypes from "prop-types";
import ActionButton from "../forms/FormElements/ActionButton";

import ActionIcons from "../core/shared/ActionIcons";
import { toStringDate } from "../../utils/utitlities";
import moment from "moment";
import { Tag } from "antd";

const HistoryTable = ({
  resume,
  view,
  viewDownload,
  setCurrentView,
  tableData,
  columns,
}) => {
  const updatedColumns = columns.map((column) => {
    if (tableData?.[0]?.status === "approved" && column.uid === "ACTIONS") {
      return { uid: "LEAVE ADVICE", name: "LEAVE ADVICE" }; //This will replace the ACTIONS column with LEAVE ADVICE, the ACTIONs column will be added back in the below code using push
    } else if (
      tableData?.[0]?.status === "completed" &&
      column.uid === "ACTIONS"
    ) {
      return { uid: "RESUMPTION_DATE", name: "RESUMPTION DATE" }; //This will replace the ACTIONS column with RESUMPTION DATE, the ACTIONs column will be added back in the below code using push
    } else if (
      tableData?.[0]?.status === "return" &&
      column.uid === "DURATION"
    ) {
      return { uid: "STATUS", name: "STATUS" }; //This will replace the ACTIONS column with STATUS, the ACTIONs column will be added back in the below code using push
    }
    return column;
  });

  if (tableData?.[0]?.status === "approved") {
    //==========Will check if the leave has started already before seeing the return==============
    updatedColumns.push({
      name: "ACTIONS",
      uid: "ACTIONS",
      sortable: true,
    });
  }
  if (tableData?.[0]?.status === "completed") {
    updatedColumns.push({
      name: "DAYS EXCEEDED",
      uid: "DAYS_EXCEEDED",
      sortable: true,
    });
    updatedColumns.push({
      name: "ACTIONS",
      uid: "ACTIONS",
      sortable: true,
    });
  }

  const viewDetails = React.useCallback(
    (information) => {
      setCurrentView(information);
      view();
    },
    [setCurrentView, view]
  );
  const Preview = React.useCallback(
    (information) => {
      setCurrentView(information);
      viewDownload();
    },
    [setCurrentView, viewDownload]
  );

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(tableHeader)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "date",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return updatedColumns;

    const cols = updatedColumns.filter((column) =>
      Array.from(visibleColumns).includes(column?.uid)
    );
    return cols;
  }, [visibleColumns, updatedColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredLeaves =
      tableData?.length > 0
        ? tableData?.map((each, i) => {
            each.S_N = i + 1;

            return each;
          })
        : [];

    if (hasSearchFilter) {
      filteredLeaves = filteredLeaves?.filter((leave) =>
        leave?.LEAVE_NAME?.toLowerCase().includes(filterValue?.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== status.length
    ) {
      filteredLeaves = filteredLeaves.filter((leave) =>
        Array.from(statusFilter).includes(leave.status)
      );
    }

    return filteredLeaves;
  }, [tableData, hasSearchFilter, statusFilter, filterValue]);

  const pages = Math.ceil(filteredItems?.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems?.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return items?.sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const getOrdinalSuffix = React.useCallback((day) => {
    if (day > 3 && day < 21) return "th"; // Special case for teens
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }, []);

  // Function to format the date
  const formatDate = React.useCallback(
    (dateString) => {
      // Check if the date is already in the desired format
      if (/\d{1,2}(st|nd|rd|th) of [A-Za-z]+ \d{4}/.test(dateString)) {
        return dateString; // Return the date as is if it matches the desired format
      }

      // Parse the date if it's in the format "YYYY-MM-DD HH:MM:SS.000"
      const dateRegex = /^(\d{4})-(\d{2})-(\d{2})/;
      const match = dateString.match(dateRegex);

      if (match) {
        const [_, year, month, day] = match;
        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        const dayNumber = parseInt(day, 10);
        const monthName = monthNames[parseInt(month, 10) - 1];
        const dayWithSuffix = dayNumber + getOrdinalSuffix(dayNumber);

        return `${dayWithSuffix} of ${monthName}, ${year}`;
      }

      return dateString; // Return the original date string if it doesn't match any known format
    },
    [getOrdinalSuffix]
  );

  const formatDates = (datesString) => {
    // Function to get the ordinal suffix for a day
    const getOrdinalSuffix = (day) => {
      if (day > 3 && day < 21) return "th"; // Special case for teens
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    // Function to format a single date
    const formatDate = (dateString) => {
      const [year, month, day] = dateString.split("-");
      const dayWithSuffix =
        parseInt(day, 10) + getOrdinalSuffix(parseInt(day, 10));
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return {
        day: dayWithSuffix,
        month: monthNames[parseInt(month, 10) - 1],
        year,
      };
    };

    // Split the string into an array of dates and format them
    const formattedDatesArray = datesString.split(",").map(formatDate);

    // Group dates by month
    const groupedByMonth = formattedDatesArray.reduce((acc, date) => {
      const key = `${date.month} ${date.year}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(date.day);
      return acc;
    }, {});

    // Create the formatted output string
    let formattedDates = "";
    for (const [key, days] of Object.entries(groupedByMonth)) {
      if (formattedDates) {
        formattedDates += ", and ";
      }
      if (days.length > 1) {
        formattedDates +=
          days.slice(0, -1).join(", ") + " and " + days[days.length - 1];
      } else {
        formattedDates += days[0];
      }
      formattedDates += ` of ${key}`;
    }
    return formattedDates;
  };

  const renderCell = React.useCallback(
    (leave, columnKey) => {
      const cellValue = leave[columnKey];

      const currentDate = moment().startOf("day");

      // const dateToCheck = moment(leave?.START_DATE, "Do of MMMM YYYY");
      const dateToCheck = moment(
        leave?.START_DATE,
        "Do [of] MMMM YYYY"
      ).startOf("day");

      if (columnKey === "LEAVE_NAME") {
        return (
          <p className="text-bold text-small font-helvetica opacity-45">
            {cellValue}
          </p>
        );
      } else if (columnKey === "SELECTED_DATES") {
        return (
          <p className="text-bold text-small font-helvetica opacity-45">
            {/* {cellValue} */}
            {formatDates(cellValue)}
          </p>
        );
      } else if (columnKey === "START_DATE") {
        return (
          <p className="text-bold text-small font-helvetica opacity-45">
            {leave?.SELECTED_DATES
              ? toStringDate(leave?.SELECTED_DATES?.split(",")[0])
              : formatDate(cellValue)}
          </p>
        );
      } else if (columnKey === "END_DATE") {
        return (
          <p className="text-bold text-small font-helvetica opacity-45">
            {leave?.SELECTED_DATES
              ? toStringDate(
                  leave?.SELECTED_DATES?.split(",")[
                    leave?.SELECTED_DATES?.split(",")?.length - 1
                  ]
                )
              : formatDate(cellValue)}
            {/* {formatDate(cellValue)} */}
            {/* {leave?.status === 'approved'?cellValue:formatDate(cellValue)} */}
          </p>
        );
      } else if (columnKey === "DURATION") {
        return (
          <p className="text-bold text-small font-helvetica opacity-45 capitalize">
            {cellValue > 1 ? `${cellValue} days` : `${cellValue} day`}
          </p>
        );
      } else if (columnKey === "RESUMPTION_DATE") {
        return (
          <p className="text-bold text-small font-helvetica opacity-45">
            {cellValue ? formatDate(cellValue) : "N/A"}
          </p>
        );
      } else if (columnKey === "DAYS_EXCEEDED") {
        return (
          <p className="text-bold text-small font-helvetica opacity-45 capitalize">
            {cellValue ? cellValue : "N/A"}
          </p>
        );
      } else if (columnKey === "STATUS") {
        return (
          <div className="text-bold text-small font-helvetica">
            <Tag
              color={
                cellValue?.toLowerCase() === "declined"
                  ? "red"
                  : cellValue?.toLowerCase() === "approved"
                  ? "green"
                  : "orange"
              }
            >
              {cellValue}
            </Tag>
          </div>
        );
      } else if (columnKey === "LEAVE ADVICE") {
        return (
          <div className="flex justify-center font-helvetica items-center">
            <ActionIcons variant={"VIEW"} action={() => Preview(leave)} />
          </div>
        );
      } else if (columnKey === "ACTIONS") {
        return (
          <div>
            {leave?.status === "pending" && (
              <div className="text-center font-helvetica flex items-center justify-center">
                <ActionIcons
                  variant={"VIEW"}
                  action={() => viewDetails(leave)}
                />
              </div>
            )}
            {leave?.status === "declined" && (
              <div className="text-center font-helvetica flex items-center justify-center">
                <ActionIcons
                  variant={"VIEW"}
                  action={() => viewDetails(leave)}
                />
              </div>
            )}
            {leave?.status === "return" && (
              <div className="text-center font-helvetica flex items-center justify-center">
                <ActionIcons
                  variant={"VIEW"}
                  action={() => viewDetails(leave)}
                />
              </div>
            )}
            {leave?.status === "completed" && (
              <div className="text-center font-helvetica flex items-center justify-center">
                {leave?.IS_RETURNED ? (
                  <ActionIcons
                    variant={"VIEW"}
                    action={() => viewDetails(leave)}
                  />
                ) : (
                  <ActionButton onClick={() => resume(leave)}>
                    Return
                  </ActionButton>
                )}
              </div>
            )}
            {leave?.status === "approved" && (
              <div className="">
                {currentDate.isAfter(dateToCheck) &&
                  leave?.LEAVE_NAME !== "Academics" && (
                    <ActionButton onClick={() => resume(leave)}>
                      Return
                    </ActionButton>
                  )}
              </div>
            )}
          </div>
        );
      } else {
        return cellValue;
      }
    },
    [Preview, formatDate, resume, viewDetails]
  );

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4 font-medium">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Filter by type"
          startContent={<MdFilterList size={20} />}
          value={filterValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total: {tableData?.length}{" "}
            {tableData?.length > 1 ? "leave requests" : "leave request"}
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    onSearchChange,
    tableData?.length,
    onRowsPerPageChange,
    onClear,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center font-medium">
        <Pagination
          isCompact
          classNames={{
            wrapper:
              "gap-0 overflow-visible h-full rounded-xl bg-transparent  shadow",
            item: "w-10 h-10 text-small rounded-none bg-transparent",
            active: "bg-red-500",
            cursor:
              "bg-btnColor shadow from-default-500 to-default-800 dark:from-default-300 dark:to-default-100 text-white font-bold",
          }}
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
    );
  }, [page, pages]);

  return (
    <Fragment>
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        isStriped
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[550px] mt-20",
        }}
        selectedKeys={selectedKeys}
        // selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        // topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
        className="lg:col-span-4"
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column?.uid}
              align={column.uid === "actions" ? "start" : "start"}
              allowsSorting={column?.sortable}
              className={`font-medium font-helvetica ${
                column?.uid === "actions" && "text-start"
              }`}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No leave found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item?.REQUEST_ID}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Fragment>
  );
};
export default HistoryTable;

HistoryTable.propTypes = {
  resume: PropTypes.func,
  viewDownload: PropTypes.func,
  view: PropTypes.func,
  tableData: PropTypes.array,
  columns: PropTypes.array,
  setCurrentView: PropTypes.func,
};
