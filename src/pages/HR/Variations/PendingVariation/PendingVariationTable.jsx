/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Pagination,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Chip,
} from "@nextui-org/react";
import { VerticalDotsIcon } from "../../../tables/components/VerticalDotsIcon";
import { useClassNames } from "../../../../utils/tableClassNames";

const SearchIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];

const columns = [
  { name: "S/N", uid: "s_n", sortable: true },
  { name: "name", uid: "name", sortable: true },
  { name: "year", uid: "year", sortable: true },
  { name: "month", uid: "month", sortable: true },
  { name: "staff", uid: "staff", sortable: true },
  { name: "comment", uid: "comment", sortable: true },
  { name: "actions", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = [
  "s_n",
  "name",
  "year",
  "month",
  "staff",
  "comment",
  "actions",
];

const PendingVariationTable = ({ handleOpenDrawer, rows }) => {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "name",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredrows = [...rows];

    if (hasSearchFilter) {
      filteredrows = filteredrows.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredrows = filteredrows.filter((user) =>
        Array.from(statusFilter).includes(user.name)
      );
    }

    return filteredrows;
  }, [rows, filterValue, statusFilter]);

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

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "s_n":
        return <p className="text-bold text-small">{user?._id}</p>;
      case "name":
        return <p className="text-bold text-small">{cellValue}</p>;
      case "year":
        return <p className="text-bold text-small">{cellValue}</p>;
      case "month":
        return <p className="text-bold text-small">{cellValue}</p>;
      case "staff":
        return <p className="text-bold text-small">{cellValue}</p>;
      case "comment":
        return (
          <Chip
            className="capitalize"
            color={
              cellValue === "Completed"
                ? "success"
                : cellValue === "Pending" && "warning"
            }
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="md" variant="">
                  <VerticalDotsIcon className="text-slate-600" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>
                  <Button
                    className="bg-[#00bcc2] w-full text-white"
                    onClick={handleOpenDrawer}
                  >
                    View
                  </Button>
                </DropdownItem>
                <DropdownItem>
                  <Button className="bg-red-500 w-full text-white">
                    Send to Audit
                  </Button>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
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
      <div className="flex flex-col gap-4">
        <div className="flex justify-between flex-wrap items-center">
          <Input
            isClearable
            className="w-full py-3 sm:max-w-[44%]"
            placeholder="Search here..."
            startContent={<SearchIcon />}
            value={filterValue}
            variant="bordered"
            onClear={() => onClear()}
            size="sm"
            onValueChange={onSearchChange}
          />
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
              value={rowsPerPage}
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
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    rows.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys.size === 0 ? (
            <span className="text-default-400 text-small">
              Total {rows.length} Variations
            </span>
          ) : selectedKeys === "all" ? (
            "All items selected"
          ) : (
            `${selectedKeys.size} of ${filteredItems.length} selected`
          )}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
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
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <div className="">
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isStriped
        showSelectionCheckboxes={true}
        // isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={useClassNames()}
        // selectedKeys={selectedKeys}
        // selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
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
              className="uppercase"
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No Variation found"} items={sortedItems}>
          {(item, index) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell className="">
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
export default PendingVariationTable;

PendingVariationTable.propTypes = {
  handleOpenDrawer: PropTypes.func,
  rows: PropTypes.array,
};
