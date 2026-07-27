/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { Button, Modal, ConfigProvider, Input, Select } from "antd";
import PropTypes from "prop-types";
import StarLoader from "../../loaders/StarLoader";
import {
  formatNumberWithComma,
  toStringDate,
} from "../../../../utils/utitlities";
import { ca } from "date-fns/locale";

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: false },
  { name: "STAFF NO", uid: "empno", sortable: false },
  { name: "GRADE", uid: "grade", sortable: false },
  { name: "STEP", uid: "step", sortable: false },
  { name: "PENSION MANAGER", uid: "pfa_name", sortable: false },
  { name: "PENSION ACCOUNT NO", uid: "pfa_acc_number", sortable: false },
  // { name: "PFA NO", uid: "pfa_acc_number", sortable: false },
  // { name: "NHF NO", uid: "nhf_no", sortable: false },
  // { name: "TAX NO", uid: "tin_no", sortable: false },

  // { name: "DESIGNATION NAME", uid: "DESIGNATION_NAME", sortable: false },
  // { name: "DEPARTMENT NAME", uid: "DEPARTMENT_NAME", sortable: false },
  { name: "REGION", uid: "REGION_NAME", sortable: false },
  { name: "STATE", uid: "STATE_NAME", sortable: false },
  // { name: "STAFF TYPE", uid: "is_contract", sortable: false },
  { name: "BANK", uid: "bank_name", sortable: false },
  { name: "ACCOUNT NO", uid: "account_no", sortable: false },
  // { name: "APPOINTMENT DATE", uid: "date_employed", sortable: false },

  { name: "ACTIONS", uid: "actions", sortable: false },
];

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "empno",
  "pfa_name",
  "pfa_acc_number",
  // "nhf_no",
  // "tin_no",
  "is_contract",
  // "DESIGNATION_NAME",
  // "DEPARTMENT_NAME",
  "REGION_NAME",
  "STATE_NAME",
  "bank_name",
  "account_no",
  // "date_employed",
  "grade",
  "step",
  "actions",
];
export default function AllCompanyStaffTable({
  incomingData,
  isLoading,
  updatePayroll,
  isLoadingStaffDetail,
}) {
  const [filterValue, setFilterValue] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(50);
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );

  console.log(isLoadingStaffDetail);

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
          item?.fullname?.toString()?.toLowerCase(),
          item?.empno?.toString()?.toLowerCase(),
          item?.nhf_no?.toString()?.toLowerCase(),
          item?.pfa_acc_number?.toString()?.toLowerCase(),
          item?.pfa_name?.toString()?.toLowerCase(),
          item?.tin_no?.toString()?.toLowerCase(),
          item?.STATE_NAME?.toString()?.toLowerCase(),
          item?.REGION_NAME?.toString()?.toLowerCase(),
          item?.state?.toString()?.toLowerCase(),
          item?.bank?.toString()?.toLowerCase(),
          item?.account_no?.toString()?.toLowerCase(),
          item?.date_employed?.toString()?.toLowerCase(),

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

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "name":
        return (
          <div>
            <div className="w-48 font-helvetica text-[0.82rem] opacity-45 hyphens-auto overflow-hidden  uppercase">
              <div>
                <User
                  name={user?.fullname}
                  className="font-helvetica"
                  classNames={{
                    name: "font-helvetica",
                  }}
                />
              </div>
            </div>
          </div>
        );
      case "empno":
      case "STATE_NAME":
      case "bank_name":
      case "account_no":
      case "grade":
      case "tin_no":
      case "step":
      case "REGION_NAME":
        return (
          <p className={`capitalize font-helvetica text-[0.82rem]`}>
            {cellValue}
          </p>
        );
      case "nhf_no":
      case "pfa_name":
      case "pfa_acc_number":
        return (
          <p className={`capitalize font-helvetica text-[0.82rem] opacity-45`}>
            {cellValue ?? "NIL"}
          </p>
        );
      case "current_payment":
        return (
          <p className={`capitalize font-helvetica text-[0.82rem] opacity-45`}>
            {formatNumberWithComma(Number(cellValue)) ?? "NIL"}
          </p>
        );
      case "is_contract":
        return (
          <p className={`capitalize font-helvetica text-[0.82rem] opacity-45`}>
            {cellValue == 0 ? "Regular" : cellValue == 1 ? "Contract" : "NIL"}
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
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#00bcc2",
                },
              }}
            >
              <Button
                size="small"
                onClick={() => updatePayroll(user)}
                className="text-xs font-helvetica"
                type="primary"
              >
                {isLoadingStaffDetail?.loading &&
                isLoadingStaffDetail?.id == user?.staff_id ? (
                  <StarLoader />
                ) : (
                  "Update staff payroll"
                )}
              </Button>
            </ConfigProvider>
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
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="150">150</option>
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

  const generateTableHead = useCallback(() => {
    const firstGroup = incomingData?.[0];
    if (!firstGroup) return [];

    // Create a Set for quick lookup of column names in tableHead
    const tableHeadSet = new Set(columns.map((head) => head?.uid));

    // Get the ordered head columns based on tableHead
    const orderedHead = columns
      .map((head) => head.column_name)
      .filter((columnName) => columnName in firstGroup); // Ensure they exist in firstGroup

    // Get additional columns that are not in tableHead
    const additionalColumns = Object.keys(firstGroup).filter(
      (key) => !tableHeadSet.has(key) // Check for keys not in tableHead
    );

    // Combine ordered head columns with additional columns
    return [...orderedHead, ...additionalColumns];
  }, []);

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
  return (
    <>
      <div className="bg-white p-4 rounded-[14px]">
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
                <option value="100">100</option>
                <option value="150">150</option>
                <option value="200">200</option>
                <option value={filteredItems?.length}>All</option>
              </select>
            </label>
          </div>
        </div>
        <div className="relative">
          <div
            ref={tableContainerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onScroll={() => syncScroll(tableContainerRef, scrollbarRef)}
            className="pb-10 overflow-x-scroll pe-5 rounded-b-[14px] md:max-w-[900px] xl:max-w-[1350px]"
          >
            <Table
              isStriped
              aria-label="Example table with custom cells, pagination and sorting"
              isHeaderSticky
              bottomContent={bottomContent}
              bottomContentPlacement="outside"
              removeWrapper={true}
              className="fontOswald mt-6"
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
                        {renderCell(item, columnKey)}
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div
            ref={scrollbarRef}
            className="fixed bottom-0 left-0 right-0 h-4 overflow-x-auto scrollbar-visible"
            onScroll={() => syncScroll(scrollbarRef, tableContainerRef)}
          >
            <div className="h-4"></div>{" "}
          </div>
        </div>
      </div>
    </>
  );
}

AllCompanyStaffTable.propTypes = {
  incomingData: PropTypes.array,
  isLoading: PropTypes.bool,
  updatePayroll: PropTypes.func,
  isLoadingStaffDetail: PropTypes.object,
};
