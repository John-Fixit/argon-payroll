/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useEffect, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Pagination,
} from "@nextui-org/react";

import { useClassNames } from "../../../../utils/tableClassNames";
import { toStringDate } from "../../../../utils/utitlities";
import ActionIcons from "../../../../components/core/shared/ActionIcons";
import { filePrefix } from "../../../../utils/filePrefix";
import { Select } from "antd";

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];

export default function ApprovalHRTable({
  handleOpenDrawer,
  rows,
  approvalStatus,
  filterValue,
  rowsPerPage,
}) {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [statusFilter, setStatusFilter] = React.useState("all");

  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "STAFF",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);
  const hasSearchFilter = Boolean(filterValue);

  useEffect(() => {
    setPage(1);
  }, [approvalStatus]);

  const visibleColumns = useMemo(() => {
    return new Set(
      approvalStatus === "pending"
        ? ["STAFF", "REQUEST_TYPE", "REQUEST_DATE", "ACTIONS"]
        : ["STAFF", "REQUEST_TYPE", "REQUEST_DATE", "DATE_TREATED", "ACTIONS"]
    );
  }, [approvalStatus]);

  const columns = useMemo(() => {
    return approvalStatus === "pending"
      ? [
          { name: "STAFF", uid: "STAFF", sortable: true },
          { name: "REQUEST TYPE", uid: "REQUEST_TYPE", sortable: true },
          { name: "REQUEST DATE", uid: "REQUEST_DATE", sortable: true },
          { name: "ACTIONS", uid: "ACTIONS" },
        ]
      : [
          { name: "STAFF", uid: "STAFF", sortable: true },
          { name: "REQUEST TYPE", uid: "REQUEST_TYPE", sortable: true },
          { name: "REQUEST DATE", uid: "REQUEST_DATE", sortable: true },
          { name: "DATE TREATED", uid: "DATE_TREATED", sortable: true },
          { name: "ACTIONS", uid: "ACTIONS" },
        ];
  }, [approvalStatus]);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredData = rows?.length ? [...rows] : [];

    if (hasSearchFilter) {
      const value = filterValue?.toLowerCase();

      const searchTerms = value.toLowerCase().trim().split(" ");

      const updatedData = rows?.filter((item) => {
        const fullName =
          `${item?.FIRST_NAME} ${item?.LAST_NAME} ${item?.OTHER_NAMES}`?.toLowerCase();
        const matches = [
          item?.FIRST_NAME?.toLowerCase(),
          item?.LAST_NAME?.toLowerCase(),
          item?.OTHER_NAMES?.toLowerCase(),
          item?.PACKAGE_NAME?.toLowerCase(),
          item?.DEPARTMENT?.toLowerCase(),
          item?.EMPLOYEE_TYPE?.toLowerCase(),
          item?.DIRECTORATE?.toLowerCase(),
          toStringDate(item?.REQUEST_DATE)?.toLowerCase(),
          fullName,
        ].some((field) => field?.includes(value));

        const fullNameMatches = searchTerms.every((term) =>
          fullName.includes(term)
        );

        return matches || fullNameMatches;
      });

      filteredData = updatedData.length ? updatedData : [];
    }
    return filteredData;
  }, [rows, hasSearchFilter, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      let first, second;

      switch (sortDescriptor.column) {
        case "STAFF":
          first = `${a.FIRST_NAME ?? ""} ${a.LAST_NAME ?? ""}`.toLowerCase();
          second = `${b.FIRST_NAME ?? ""} ${b.LAST_NAME ?? ""}`.toLowerCase();
          break;
        default:
          first = a[sortDescriptor.column];
          second = b[sortDescriptor.column];
          break;
      }

      // Handle undefined/null gracefully
      if (first == null) first = "";
      if (second == null) second = "";

      // Use localeCompare for strings
      let cmp =
        typeof first === "string" && typeof second === "string"
          ? first.localeCompare(second)
          : first < second
          ? -1
          : first > second
          ? 1
          : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const formatDate = (date) => {
    const date1 = new Date(date);
    return `${(date1.getDate() < 10 ? "0" : "") + date1.getDate()}/${
      (date1.getMonth() < 9 ? "0" : "") + (date1.getMonth() + 1)
    }/${date1.getFullYear()}`;
  };
  // const filePrefix = 'http://lamp3.ncaa.gov.ng/pub/'

  const renderCell = React.useCallback((request, columnKey) => {
    const cellValue = request[columnKey];
    switch (columnKey) {
      case "STAFF":
        return (
          <User
            avatarProps={{
              radius: "lg",
              src: request?.FILE_NAME ? filePrefix + request?.FILE_NAME : "",
            }}
            name={`${request?.FIRST_NAME || ""} ${request?.LAST_NAME || ""}`}
            classNames={{
              description: "max-w-48 truncate",
            }}
            description={request?.DEPARTMENT_NAME}
          >
            {request?.LAST_NAME} {request?.FIRST_NAME}
          </User>
        );
      case "REQUEST_TYPE":
        return (
          <p className="text-bold text-sm capitalize text-default-500">
            {request?.PACKAGE_NAME}
          </p>
        );

      case "REQUEST_DATE":
        return (
          <p className="text-bold text-sm text-default-400">
            {toStringDate(cellValue)}
          </p>
        );
      case "DATE_TREATED":
        return (
          <p className="text-bold text-sm  text-default-400">
            {" "}
            {cellValue ? toStringDate(cellValue) : "NIL"}
          </p>
        );
      case "ACTIONS":
        return (
          <div className="relative flex gap-2 py-2 pl-4">
            <ActionIcons
              variant={"VIEW"}
              action={() =>
                handleOpenDrawer(request?.REQUEST_ID, request?.PACKAGE_NAME)
              }
            />
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-4 px-2 flex mx-4 justify-between items-center">
        <Pagination
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
      </div>
    );
  }, [page, pages, hasSearchFilter]);

  return (
    <div>
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isStriped
        key={approvalStatus}
        isHeaderSticky
        showSelectionCheckboxes={true}
        radius="none"
        shadow="none"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={useClassNames()}
        className="w-full"
        sortDescriptor={sortDescriptor}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              // align={column.uid === "REQUEST_TYPE" ? "start" : "center"}
              allowsSorting={column.sortable}
              className="uppercase"
              // className="capitalize font-helvetica uppercase text-[14px] "
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No Record found"} items={sortedItems}>
          {(item, index) => (
            <TableRow key={item?.REQUEST_ID}>
              {(columnKey) => (
                //   <TableCell className="text-[12px]  font-helvetica capitalize">{renderCell(item, columnKey)}</TableCell>
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
