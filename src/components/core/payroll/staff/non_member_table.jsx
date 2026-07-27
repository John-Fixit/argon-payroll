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
import { formatNumberWithComma } from "../../../../utils/utitlities";
import { errorToast, successToast } from "../../../../utils/toastMsgPop";
import { useAddStaffToPayroll } from "../../../../API/payroll_staff";
import ActionIcons from "../../shared/ActionIcons";

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: false },
  { name: "STAFF NO", uid: "empno", sortable: false },
  // { name: "ACTIONS", uid: "actions", sortable: false },
];

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "empno",
  // "actions",
];
export default function NonMemberStaffTable({ incomingData, isLoading, tab }) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );

  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "",
    direction: "ascending",
  });
  const [currentStaff, setCurrentStaff] = React.useState(null);

  const { mutateAsync: mutateAdd, isPending: isAdding } =
    useAddStaffToPayroll(tab);

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
          item?.STAFF_ID?.toString()?.toLowerCase(),
          item?.staff_id?.toString()?.toLowerCase(),
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

  const addStaffToPayroll = async (json) => {
    setCurrentStaff(json?.staff_id);
    try {
      const res = await mutateAdd(json?.staff_id);
      successToast(res?.data?.message);
    } catch (err) {
      const errMsg = err?.response?.data?.message || err?.message;
      errorToast(errMsg);
    }
  };

  const renderCell = React.useCallback(
    (user, columnKey, currentStaff, isAdding) => {
      const cellValue = user[columnKey];
      switch (columnKey) {
        case "name":
          return (
            <div>
              <p className="font-helvetica text-[0.82rem] opacity-45 hyphens-auto overflow-hidden  uppercase">
                <User
                  name={user?.fullname}
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
        case "date_employed":
          return (
            <p
              className={`capitalize  font-helvetica text-[0.82rem] opacity-45 line-clamp-1`}
            >
              {cellValue ? cellValue : "NIL"}
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
              {isAdding && currentStaff === user?.staff_id ? (
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
                    onClick={() => addStaffToPayroll(user)}
                    className="text-xs font-helvetica"
                    type="primary"
                  >
                    Add staff to payroll
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

            <div className="hidden sm:flex w-[30%] justify-end gap-2">
              <Button
                isDisabled={pages === 1}
                size="sm"
                variant="flat"
                onPress={onPreviousPage}
              >
                Previous
              </Button>
              <Button
                isDisabled={pages === 1}
                size="sm"
                variant="flat"
                onPress={onNextPage}
              >
                Next
              </Button>
            </div>
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
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
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
                    {renderCell(item, columnKey, currentStaff, isAdding)}
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

NonMemberStaffTable.propTypes = {
  incomingData: PropTypes.array,
  isLoading: PropTypes.bool,
  tab: PropTypes.any,
};
