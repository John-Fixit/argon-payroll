/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Avatar,
  User,
} from "@nextui-org/react";
import { Button, Modal, ConfigProvider, Input } from "antd";
import PropTypes from "prop-types";
import StarLoader from "../../loaders/StarLoader";
import {
  formatNumberWithComma,
  toStringDate,
} from "../../../../utils/utitlities";
import { ca } from "date-fns/locale";
import ActionIcons from "../../shared/ActionIcons";

// Emp No, Title, name, Address, gender, Region, Date Employed, Division Name, Grade, Step, Rank Name, Action

//         "nhf_no" :"",
//         "bank" :"",
//         "account_no" :"",
//         "designation" :"",
//         "department" :"",
//         "pfa" :"",
//         "pension_no" :"",
//         "state" :"",
// "appointment_date" :"",
//         "tin_no":"",
//         "region":""

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "YEAR", uid: "year", sortable: false },
  { name: "MONTH", uid: "month", sortable: false },
  // { name: "MONTH NAME", uid: "month_string", sortable: false },
  { name: "ACTIONS", uid: "actions", sortable: false },
];

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "year",
  "month",
  "month_string",
  "actions",
];

const montToString = (month) => {
  const monthIndex = month - 1;
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
  return monthNames[monthIndex];
};
export default function ThirteenthMonthTable({
  incomingData,
  isLoading,
  isLoadingDetails,
  viewDetails,
  isGenerating,
  generateReport,
}) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowId, setRowId] = React.useState(null);

  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const tableData = incomingData?.map((item, index) => ({
    ...item,
  }));

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredData = tableData?.length ? [...tableData] : [];

    if (hasSearchFilter) {
      const value = filterValue?.toLowerCase();

      const searchTerms = value.toLowerCase().trim().split(" ");

      const updatedData = tableData?.filter((item) => {
        const fullName = `${item?.first_name} ${item?.last_name}`.toLowerCase();

        const matches = [
          item?.yeay?.toString()?.toLowerCase(),
          item?.month?.toString()?.toLowerCase(),
          // item?.pfa_code?.toLowerCase(),
          // item?.nhf_no?.toLowerCase(),
          // item?.designation?.toLowerCase(),
          // item?.department?.toLowerCase(),
          // item?.tin_no?.toLowerCase(),
          // item?.REGION_NAME?.toLowerCase(),
          // item?.state?.toLowerCase(),
          // item?.bank?.toLowerCase(),
          // item?.account_no?.toLowerCase(),
          // item?.date_employed?.toLowerCase(),

          // toStringDate(item?.commence_date)?.toLowerCase(),
          // fullName,
        ].some((field) => field?.includes(value));

        const fullNameMatches = searchTerms.every((term) =>
          fullName.includes(term)
        );

        return matches || fullNameMatches;
      });

      filteredData = updatedData.length ? updatedData : [];
    }

    return filteredData;
  }, [tableData, hasSearchFilter, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const startViewDetails = (data) => {
    setRowId(data?.id);
    viewDetails(data);
  };
  const startGeneratingReport = (data) => {
    setRowId(data?.id);
    generateReport(data);
  };

  const renderCell = React.useCallback(
    (user, columnKey, rowId, isLoadingDetails, isGenerating) => {
      const cellValue = user[columnKey];
      switch (columnKey) {
        case "name":
          return (
            <div>
              <p className="w-48 font-helvetica text-[0.82rem] opacity-45 hyphens-auto overflow-hidden  uppercase">
                <User
                  name={user?.LAST_NAME + " " + user?.FIRST_NAME}
                  className="font-helvetica"
                  classNames={{
                    name: "font-helvetica",
                  }}
                />
              </p>
            </div>
          );
        case "month":
          return (
            <p
              className={`capitalize font-helvetica justify-center text-[0.82rem]`}
            >
              {montToString(cellValue)}
            </p>
          );
        case "year":
        case "month_string":
        case "account_no":
        case "grade":
        case "step":
        case "REGION_NAME":
          return (
            <p
              className={`capitalize font-helvetica justify-center text-[0.82rem]`}
            >
              {cellValue}
            </p>
          );
        case "nhf_no":
        case "pfa_code":
          return (
            <p
              className={`capitalize font-helvetica text-[0.82rem] opacity-45`}
            >
              {cellValue ?? "NIL"}
            </p>
          );
        case "current_payment":
          return (
            <p
              className={`capitalize font-helvetica text-[0.82rem] opacity-45`}
            >
              {formatNumberWithComma(Number(cellValue)) ?? "NIL"}
            </p>
          );
        case "date_added":
          return (
            <p
              className={`capitalize w-40 font-helvetica text-[0.82rem] opacity-45 line-clamp-1`}
            >
              {cellValue ? toStringDate(cellValue) : "NIL"}
              {/* toStringDate(cellValue) */}
            </p>
          );
        case "commence_date":
          return (
            <p
              className={`capitalize max-w-[14rem] font-helvetica text-[0.82rem] opacity-45 line-clamp-2`}
            >
              {cellValue}
            </p>
          );

        case "actions":
          return (
            <div className="relative flex items-center justify-end gap-2">
              {isLoadingDetails && rowId === user?.id ? (
                <StarLoader size={20} />
              ) : (
                <ActionIcons
                  variant={"VIEW"}
                  action={() => startViewDetails(user)}
                />
              )}
              {isGenerating && rowId === user?.id ? (
                <StarLoader size={20} />
              ) : (
                <Button onClick={() => startGeneratingReport(user)}>
                  Generate Report
                </Button>
              )}
            </div>
          );

        default:
          return cellValue;
      }
    },
    []
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

  const topContent = React.useMemo(() => {
    const keys = tableData.map((item) => item.request_id);
    const requestIDs = selectedKeys === "all" ? keys : Array.from(selectedKeys);
    const json = {
      variation_id: requestIDs,
    };

    return (
      <div>
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
      </div>
    );
  }, [selectedKeys, tableData, filterValue]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        {pages > 1 && (
          <>
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={setPage}
            />
          </>
        )}
      </div>
    );
  }, [page, pages, onPreviousPage, onNextPage]);

  return (
    <>
      <>
        <Table
          isStriped
          aria-label="Example table with custom cells, pagination and sorting"
          isHeaderSticky
          // topContent={topContent}
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          classNames={{
            wrapper: "max-h-[50rem] py-5 ", //max-w-[1000px]
          }}
          className="fontOswald mt-10"
          //   selectedKeys={selectedKeys}
          sortDescriptor={sortDescriptor}
          //   onSelectionChange={setSelectedKeys}
          onSortChange={setSortDescriptor}
          //   selectionMode={currentTab !== "2" && "multiple"}
          //   onRowAction={() => {}}
        >
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "end" : "end"}
                allowsSorting={column.sortable}
              >
                <span className="font-helvetica text-black text-[0.80rem] opacity-80">
                  {column.name}
                </span>
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            emptyContent={
              isLoading ? (
                <StarLoader />
              ) : (
                <p className="font-helvetica">No Data Available</p>
              )
            }
            items={sortedItems}
          >
            {(item) => (
              <TableRow key={item.id} className="font-helvetica justify-center">
                {(columnKey) => (
                  <TableCell className="!font-helvetica">
                    {renderCell(
                      item,
                      columnKey,
                      rowId,
                      isLoadingDetails,
                      isGenerating
                    )}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </>
    </>
  );
}

ThirteenthMonthTable.propTypes = {
  incomingData: PropTypes.array,
  isLoading: PropTypes.bool,
  isGenerating: PropTypes.bool,
  isLoadingDetails: PropTypes.any,
  viewDetails: PropTypes.func,
  generateReport: PropTypes.func,
};
