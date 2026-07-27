/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Pagination,
  Spinner,
} from "@nextui-org/react";
import { columns, statusOptions } from "../../components/tables/datas/Workdata";
import useFileModal from "../../hooks/useFileModal";
import { toStringDate } from "../../utils/utitlities";
import PropTypes from "prop-types";
import { IoMdAdd } from "react-icons/io";
import WorkInformationDrawer from "../../components/profile/profileDrawer/WorkInformationDrawer";

const INITIAL_VISIBLE_COLUMNS = [
  "organisation_name",
  "work_type",
  "company",
  "leave_reason",
  "start date",
  "end date",
  "status",
  // "actions",
];
export default function Experience({
  experiences,
  isLoading,
  can_edit_official,
}) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { openModal } = useFileModal();

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const updatedAcademic = React.useMemo(
    () =>
      experiences?.length
        ? experiences?.map((item, index) => ({
            ...item,
            id: `item-${index}`,
          }))
        : [],
    [experiences],
  );
  // ?.filter((item)=>item?.INSTITUTION_NAME) : [];

  const filteredItems = React.useMemo(() => {
    // let filteredUsers = [...users]
    let filteredUsers = updatedAcademic?.length ? [...updatedAcademic] : []; //[...academicsData?.approved]

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status),
      );
    }

    return filteredUsers;
    // }, [users, filterValue, statusFilter])
  }, [updatedAcademic, hasSearchFilter, statusFilter, filterValue]);

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
      case "organisation_name":
        return (
          <div>
            <p className="w-32 font-helvetica text-[0.82rem] opacity-45 hyphens-auto overflow-hidden break-words uppercase">
              {user?.ORGANIZATION_NAME ?? "N/A"}
            </p>
          </div>
        );
      case "work_type":
        return (
          <p className={`capitalize font-helvetica text-[0.82rem] opacity-45`}>
            {user?.WORK_TYPE ?? "N/A"}
          </p>
        );
      case "company":
        return (
          <p className={`capitalize font-helvetica text-[0.82rem] opacity-45`}>
            {user?.DES_NAME ?? "N/A"}
          </p>
        );
      case "leave_reason":
        return (
          <p
            className={`capitalize w-48 font-helvetica text-[0.82rem] opacity-45 line-clamp-1`}
          >
            {/* <Tooltip title={user?.REASON_FOR_LEAVING}> */}
            {user?.REASON_FOR_LEAVING ?? "N/A"}
            {/* </Tooltip> */}
          </p>
        );
      case "start date":
        return (
          <p className="w-32 capitalize font-helvetica text-[0.82rem] opacity-45 hyphens-auto overflow-hidden break-words">
            {/* {user.startDate} */}
            {toStringDate(user?.START_DATE) ?? "N/A"}
          </p>
        );
      case "end date":
        return (
          <p className="w-32 capitalize font-helvetica text-[0.82rem] opacity-45 hyphens-auto overflow-hidden break-words">
            {/* {user.endDate} */}
            {toStringDate(user?.END_DATE) ?? "N/A"}
          </p>
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

  const handleAddMore = () => {
    setIsDrawerOpen(true);
  };

  const topContent = React.useMemo(() => {
    return (
      <div className="flex justify-between items-center">
        <h1>Work Experience</h1>
        {can_edit_official ? (
          <div>
            <Button
              onPress={handleAddMore}
              size="sm"
              className="bg-btnColor text-white flex gap-1 font-helvetica"
            >
              <IoMdAdd size={20} /> ADD
            </Button>
          </div>
        ) : null}
      </div>
    );
  }, [can_edit_official]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-end items-center">
        {pages > 1 && (
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={setPage}
          />
        )}
      </div>
    );
  }, [page, pages]);

  // console.log(updatedAcademic);
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spinner color="default" />
        </div>
      ) : (
        <>
          <Table
            isStriped
            aria-label="Example table with custom cells, pagination and sorting"
            isHeaderSticky
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{
              wrapper: "max-h-[382px] ",
            }}
            className="fontOswald"
            selectedKeys={selectedKeys}
            //   selectionMode='multiple'
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            // topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
          >
            <TableHeader className="" columns={headerColumns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                  allowsSorting={column.sortable}
                >
                  <span className="font-helvetica text-black text-[0.80rem] opacity-80">
                    {column.name}
                  </span>
                </TableColumn>
              )}
            </TableHeader>
            <TableBody emptyContent={"No Data found"} items={sortedItems}>
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </>
      )}
      {isDrawerOpen && (
        <WorkInformationDrawer
          isOpen={isDrawerOpen}
          setIsOpen={setIsDrawerOpen}
        />
      )}
    </>
  );
}
Experience.propTypes = {
  experiences: PropTypes.array,
  isLoading: PropTypes.bool,
  can_edit_official: PropTypes.any,
};
