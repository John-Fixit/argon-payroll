/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useCallback, useState } from "react";
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
  { name: "NAME", uid: "name", sortable: false },
  { name: "STAFF NO", uid: "empno", sortable: false },

  { name: "SUSPENSION TYPE", uid: "suspension_type", sortable: false },
  // { name: "PFA", uid: "pfa_code", sortable: false },
  // { name: "DESIGNATION NAME", uid: "DESIGNATION_NAME", sortable: false },
  // { name: "DEPARTMENT NAME", uid: "DEPARTMENT_NAME", sortable: false },
  // { name: "STATE", uid: "state", sortable: false },
  // { name: "BANK", uid: "bank_name", sortable: false },
  // { name: "ACCOUNT NO", uid: "account_no", sortable: false },
  { name: "REGION", uid: "REGION_NAME", sortable: false },
  { name: "DATE", uid: "date_added", sortable: false },
  { name: "GRADE", uid: "grade", sortable: false },
  { name: "STEP", uid: "step", sortable: false },
  { name: "ACTIONS", uid: "actions", sortable: false },
];

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "empno",
  "suspension_type",
  // "pfa_code",
  // "nhf_no",
  // "DESIGNATION_NAME",
  // "DEPARTMENT_NAME",
  // "bank_name",
  // "account_no",
  // "state",
  "REGION_NAME",
  "date_added",
  "grade",
  "step",
  "actions",
];
export default function SuspendStaffTable({
  incomingData,
  isRestoring,
  isLoading,
  restoreStaff,
}) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );

  const [rowId, setRowId] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const tableData = incomingData?.map((item, index) => ({
    ...item,
    id: `item-${index}`,
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
          item?.name?.toString()?.toLowerCase(),
          item?.empno?.toString()?.toLowerCase(),
          item?.suspension_type?.toString()?.toLowerCase(),
          item?.nhf_no?.toString()?.toLowerCase(),
          item?.STAFF_ID?.toString()?.toLowerCase(),
          item?.staff_id?.toString()?.toLowerCase(),
          item?.REGION_NAME?.toString()?.toLowerCase(),
          item?.grade?.toString()?.toLowerCase(),
          item?.step?.toString()?.toLowerCase(),
          item?.date_added?.toString()?.toLowerCase(),
          item?.account_no?.toString()?.toLowerCase(),
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

  const renderCell = React.useCallback(
    (user, columnKey, rowId, isRestoring) => {
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
        case "empno":
        case "state":
        case "bank_name":
        case "account_no":
        case "grade":
        case "step":
        case "REGION_NAME":
          return (
            <p className={`capitalize font-helvetica text-[0.82rem]`}>
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
            <div className="relative flex items-center gap-2">
              {isRestoring && rowId === user?.STAFF_ID ? (
                <StarLoader size={20} />
              ) : (
                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: "#00bcc2",
                    },
                  }}
                >
                  <Button
                    size="small"
                    onClick={() => {
                      setRowId(user?.STAFF_ID);
                      restoreStaff(user);
                    }}
                    className="text-xs font-helvetica rounded"
                    type="primary"
                  >
                    Restore staff
                  </Button>
                </ConfigProvider>
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

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    const keys = tableData.map((item) => item.request_id);
    const requestIDs = selectedKeys === "all" ? keys : Array.from(selectedKeys);
    const json = {
      variation_id: requestIDs,
    };

    return (
      <div className="flex justify-between items-center">
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
        <div className="flex justify-between items-center">
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
              value={rowsPerPage}
            >
              <option value="20">20</option>
              <option value="500">50</option>
              <option value="100">100</option>
              <option value={filteredItems?.length}>All</option>
            </select>
          </label>
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
          topContent={topContent}
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
                align={column.uid === "actions" ? "start" : "start"}
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
              <TableRow key={item.id} className="font-helvetica">
                {(columnKey) => (
                  <TableCell className="!font-helvetica">
                    {renderCell(item, columnKey, rowId, isRestoring)}
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

SuspendStaffTable.propTypes = {
  incomingData: PropTypes.array,
  isLoading: PropTypes.bool,
  isRestoring: PropTypes.bool,
  restoreStaff: PropTypes.func,
};
