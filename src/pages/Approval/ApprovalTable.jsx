/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
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

import { toStringDate } from "../../utils/utitlities";
import ActionIcons from "../../components/core/shared/ActionIcons";
import { filePrefix } from "../../utils/filePrefix";
import StarLoader from "../../components/core/loaders/StarLoader";
import { LoaderIcon } from "lucide-react";
import { Select } from "antd";

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const ApprovalTable = ({
  handleOpenDrawer,
  rows,
  requestStatus,
  isLoading,
  detailsPending,
  filterValue,
}) => {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "STAFF",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);
  const [currentRow, setCurrentRow] = React.useState(null);
  const hasSearchFilter = Boolean(filterValue);

  useEffect(() => {
    setPage(1);
  }, [requestStatus]);

  const visibleColumns = useMemo(() => {
    return new Set(
      requestStatus === "pending"
        ? [
            "STAFF",
            "LAST_NAME",
            "REQUEST_TYPE",
            "REQUEST_DATE",
            "APPROVING_LEVEL",
            "ACTIONS",
          ]
        : [
            "STAFF",
            "LAST_NAME",
            "REQUEST_TYPE",
            "REQUEST_DATE",
            "DATE_TREATED",
            "ACTIONS",
          ]
    );
  }, [requestStatus]);

  const columns = useMemo(() => {
    return requestStatus === "pending"
      ? [
          { name: "S/N", uid: "S_N", sortable: true },
          { name: "STAFF", uid: "STAFF", sortable: true },
          { name: "REQUEST TYPE", uid: "REQUEST_TYPE", sortable: true },
          { name: "REQUEST DATE", uid: "REQUEST_DATE", sortable: true },
          { name: "APPROVING LEVEL", uid: "APPROVING_LEVEL", sortable: true },
          { name: "ACTIONS", uid: "ACTIONS" },
        ]
      : [
          { name: "S/N", uid: "S_N", sortable: true },
          { name: "STAFF", uid: "STAFF", sortable: true },
          { name: "REQUEST TYPE", uid: "REQUEST_TYPE", sortable: true },
          { name: "REQUEST DATE", uid: "REQUEST_DATE", sortable: true },
          { name: "DATE TREATED", uid: "DATE_TREATED", sortable: true },
          { name: "ACTIONS", uid: "ACTIONS" },
        ];
  }, [requestStatus]);

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
          `${item?.FIRST_NAME} ${item?.LAST_NAME}`?.toLowerCase();
        const matches = [
          item?.FIRST_NAME?.toLowerCase(),
          item?.LAST_NAME?.toLowerCase(),
          item?.STAFF_NUMBER?.toLowerCase(),
          item?.PACKAGE_NAME?.toLowerCase(),
          item?.DESIGNATION?.toLowerCase(),
          item?.DEPARTMENT_NAME?.toLowerCase(),
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
  }, [rows, filterValue, statusFilter]);

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

  const renderCell = React.useCallback((VALUE, columnKey, loading, curRow) => {
    const cellValue = VALUE[columnKey];
    switch (columnKey) {
      case "STAFF":
        return (
          <User
            avatarProps={{
              radius: "lg",
              src: VALUE?.FILE_NAME ? filePrefix + VALUE?.FILE_NAME : "",
            }}
            name={`${VALUE?.FIRST_NAME || ""} ${VALUE?.LAST_NAME || ""}`}
            classNames={{
              name: "font-helvetica text-xs opacity-70 uppercase",
              description:
                "max-w-48 truncate font-helvetica my-auto text-black opacity-30",
            }}
            description={VALUE?.DEPARTMENT_NAME}
          >
            {VALUE?.DEPARTMENT_NAME}
          </User>
        );

      case "REQUEST_TYPE":
        return (
          <p className="font-helvetica text-[0.85rem] opacity-45">
            {VALUE?.PACKAGE_NAME}
          </p>
        );

      case "REQUEST_DATE":
        return (
          <p className="font-helvetica text-[0.85rem] opacity-45">
            {toStringDate(cellValue)}
          </p>
        );
      case "APPROVING_LEVEL":
        return (
          <p className="font-helvetica text-[0.85rem] opacity-45">
            {VALUE?.DESIGNATION}
          </p>
        );

      case "DATE_TREATED":
        return (
          <p className="font-helvetica text-[0.85rem] opacity-45">
            {" "}
            {cellValue ? toStringDate(cellValue) : "NIL"}
          </p>
        );

      case "ACTIONS":
        return (
          <div className="relative flex gap-2 pl-4">
            {curRow === VALUE?.REQUEST_ID && loading ? (
              <StarLoader size={20} />
            ) : (
              <ActionIcons
                variant={"VIEW"}
                action={() => {
                  setCurrentRow(VALUE?.REQUEST_ID);

                  handleOpenDrawer(
                    VALUE?.REQUEST_ID,
                    VALUE?.PACKAGE_NAME,
                    VALUE?.PACKAGE_ID
                  );
                }}
              />
            )}
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

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

  const handleChange = (value) => {
    setRowsPerPage(value);
  };

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 mx-5 flex justify-between items-center">
        <Pagination
          // showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          initialPage={1}
          variant="light"
          onChange={setPage}
        />
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <div>
      <div className="flex gap-x-3 my-auto justify-end mx-3">
        <div className="space-x-2">
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
      <Table
        key={requestStatus}
        aria-label="Example table with custom cells, pagination and sorting "
        isStriped
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        radius="none"
        shadow="none"
        className="w-full rounded-none mt-5"
        sortDescriptor={sortDescriptor}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
              className="font-helvetica text-black text-[0.80rem] opacity-80"
            >
              {column.name}
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
          {(item, index) => (
            <TableRow key={item?.REQUEST_ID}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(item, columnKey, detailsPending, currentRow)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
export default ApprovalTable;

ApprovalTable.propTypes = {
  handleOpenDrawer: PropTypes.func,
  rows: PropTypes.array,
  requestStatus: PropTypes.any,
  isLoading: PropTypes.bool,
  detailsPending: PropTypes.bool,
  filterValue: PropTypes.string,
};
