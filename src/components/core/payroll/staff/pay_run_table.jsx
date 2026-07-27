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
  Chip,
  cn,
} from "@nextui-org/react";
import { Button, Modal, ConfigProvider, Input } from "antd";
import PropTypes from "prop-types";
import StarLoader from "../../loaders/StarLoader";
import {
  formatNumberWithComma,
  toStringDate,
} from "../../../../utils/utitlities";
import { Lock, Redo } from "lucide-react";
import { CgPushUp } from "react-icons/cg";
import { is } from "date-fns/locale";

const columns = [
  { name: "Month", uid: "month", sortable: true },
  { name: "Year", uid: "year", sortable: true },
  { name: "Status", uid: "status", sortable: true },
  { name: "Action", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = ["month", "year", "status", "actions"];
export default function PayrunTable({
  incomingData,
  isLoading,
  isPushingToStaff,
  isRerunning,
  isRerunningTax,
  isLocking,
  pushToStaff,
  reRun,
  reRunTax,
  lock,
}) {
  const [filterValue, setFilterValue] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const visibleColumns = new Set(INITIAL_VISIBLE_COLUMNS);

  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "",
    direction: "ascending",
  });

  const [rowId, setRowId] = React.useState(null);

  const [page, setPage] = React.useState(1);

  const tableData = incomingData?.map((item, index) => ({
    ...item,
  }));

  const months = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };
  const status = {
    0: "Open",
    1: "Locked",
  };

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
          months[item?.month]?.toString()?.toLowerCase(),
          status[item?.is_locked]?.toString()?.toLowerCase(),
          item?.year?.toString()?.toLowerCase(),
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
    (data, columnKey, rowId, isPushingToStaff, isRerunning, isLocking, isRerunningTax) => {
      const cellValue = data[columnKey];
      switch (columnKey) {
        case "name":
          return (
            <div>
              <p className="w-48 font-helvetica text-[0.82rem] opacity-45 hyphens-auto overflow-hidden  uppercase">
                <User
                  name={data?.LAST_NAME + " " + data?.FIRST_NAME}
                  className="font-helvetica"
                  classNames={{
                    name: "font-helvetica",
                  }}
                />
              </p>
            </div>
          );
        case "year":
          return (
            <p className={`capitalize font-helvetica text-[0.82rem]`}>
              {cellValue}
            </p>
          );
        case "month":
          return (
            <p className={`capitalize font-helvetica text-[0.82rem]`}>
              {months[cellValue]}
            </p>
          );
        case "status":
          return (
            <p
              className={cn(
                `capitalize font-helvetica text-[0.82rem] opacity-45`,
                data?.is_locked === 0 && "opacity-100"
              )}
            >
              <Chip color={data?.is_locked === 0 ? "success" : "default"}>
                {data?.is_locked === 0 ? "Open" : "Locked"}
              </Chip>
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
              {data?.is_locked === 1 && (
                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: "#00bcc2",
                    },
                  }}
                >
                  {isPushingToStaff && rowId === data?.id ? (
                    <StarLoader size={20} />
                  ) : (
                    <Button
                      size="small"
                      onClick={() => {
                        setRowId(data?.id);
                        pushToStaff(data);
                      }}
                      className="text-xs font-helvetica rounded"
                      type="primary"
                    >
                      <CgPushUp size={10} />
                      Push to Staff
                    </Button>
                  )}
                </ConfigProvider>
              )}

              {data?.is_locked === 0 && (
                <div className="flex gap-3">
                  {isRerunning && rowId === data?.id ? (
                    <StarLoader size={20} />
                  ) : (
                    <Button
                      color="orange"
                      size="small"
                      onClick={() => {
                        setRowId(data?.id);
                        reRun(data);
                      }}
                      disabled={isRerunning}
                      className="text-sm font-helvetica rounded bg-orange-700 text-white"
                    >
                      <Redo size={10} />
                      Re-run
                    </Button>
                  )}
                  {isRerunningTax && rowId === data?.id ? (
                    <StarLoader size={20} />
                  ) : (
                    <Button
                      color="orange"
                      size="small"
                      onClick={() => {
                        setRowId(data?.id);
                        reRunTax(data);
                      }}
                      disabled={isRerunningTax}
                      className="text-sm font-helvetica rounded bg-indigo-600 text-white"
                    >
                      <Redo size={10} />
                      Re-run Tax
                    </Button>
                  )}

                  {isLocking && rowId === data?.id ? (
                    <StarLoader size={20} />
                  ) : (
                    <Button
                      size="small"
                      color="orange"
                      onClick={() => {
                        setRowId(data?.id);
                        lock(data);
                      }}
                      className="text-sm font-helvetica rounded bg-pink-500"
                      type="primary"
                      disabled={isLocking}
                    >
                      <Lock size={10} />
                      Lock
                    </Button>
                  )}
                </div>
              )}
            </div>
          );

        default:
          return cellValue;
      }
    },
    []
  );

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
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
  }, [filterValue]);

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
  }, [page, pages]);

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
            wrapper: "max-h-[50rem] py-5 max-w-[1200px] ", //max-w-[1000px]
            table: "items-center justify-center mx-auto",
            thead: "mx-auto",
            tbody: "mx-auto",
          }}
          className="fontOswald mt-10 mx-auto"
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
              <TableRow key={item.id} className="font-helvetica content-center">
                {(columnKey) => (
                  <TableCell className="!font-helvetica">
                    {renderCell(
                      item,
                      columnKey,
                      rowId,
                      isPushingToStaff,
                      isRerunning,
                      isLocking,
                      isRerunningTax
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

PayrunTable.propTypes = {
  incomingData: PropTypes.array,
  isLoading: PropTypes.bool,
  restoreStaff: PropTypes.func,
  isPushingToStaff: PropTypes.any,
  isRerunning: PropTypes.any,
  isRerunningTax: PropTypes.any,
  isLocking: PropTypes.func,
  pushToStaff: PropTypes.func,
  reRun: PropTypes.func,
  reRunTax: PropTypes.func,
  lock: PropTypes.func,
};
