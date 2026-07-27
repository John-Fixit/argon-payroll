/* eslint-disable no-unused-vars */
import React, { useCallback, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Pagination,
} from "@nextui-org/react";
import { Tag } from "antd";
import { useGetProfile } from "../../../../API/profile";
import { API_URL } from "../../../../API/api_urls/api_urls";
import { toStringDate } from "../../../../utils/utitlities";
import ActionIcons from "../../shared/ActionIcons";
import StarLoader from "../../loaders/StarLoader";
import WorkInformationDrawer from "../../../profile/profileDrawer/WorkInformationDrawer";

import PropTypes from "prop-types";

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "STAFF", uid: "STAFF_NAME", sortable: false },
  { name: "SEPARATION DATE", uid: "SEPARATION_DATE", sortable: false },
  { name: "EXIT REASON", uid: "EXIT_REASON", sortable: false },
  { name: "APPLICATION DATE", uid: "ADDED_ON", sortable: false },
  { name: "ACTION", uid: "ACTION", sortable: false },
];

const INITIAL_VISIBLE_COLUMNS = [
  "STAFF_NAME",
  "SEPARATION_DATE",
  "EXIT_REASON",
  "ADDED_ON",
  "ACTION",
];
export default function ExitTable({ exitData, handleOpenView }) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );

  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  //data request
  const { data: getExperience, isLoading } = useGetProfile({
    path: API_URL.getExperience,
    key: "experience",
  });

  let experienceData = getExperience?.data || []; // this will have { package_id, pending, approved}

  const pendingExperience = experienceData?.pending?.length
    ? experienceData?.pending?.map((item) => {
        return {
          ...item,
          isPending: true,
        };
      })
    : [];
  const approvedExperience = experienceData?.approved?.length
    ? experienceData?.approved?.map((item) => {
        return {
          ...item,
          isPending: false,
        };
      })
    : [];

  const tableData = exitData?.map((item, index) => ({
    ...item,
    id: `item-${index}`,
  }));

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = tableData?.length ? [...tableData] : [];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredUsers;
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
      case "STAFF_NAME":
        return (
          <p
            className={`capitalize w-64 font-helvetica text-[0.82rem] opacity-45 line-clamp- flex flex-col`}
          >
            {user?.FIRST_NAME} {user?.LAST_NAME} {user?.OTHER_NAMES}
            <span className="font-helvetica text-gray-500 text-sm font-light">
              {user?.STAFF_NUMBER}
            </span>
          </p>
        );
      case "EXIT_REASON":
        return (
          <p
            className={`capitalize w-64 font-helvetica text-[0.82rem] opacity-45 line-clamp-`}
          >
            {user?.EXIT_REASON}
          </p>
        );
      case "SEPARATION_DATE":
        return (
          <p className="w-48 capitalize font-helvetica text-[0.82rem] opacity-45 hyphens-auto overflow-hidden">
            {toStringDate(user?.SEPARATION_DATE)}
          </p>
        );
      case "ADDED_ON":
        return (
          <p className="w-48 capitalize font-helvetica text-[0.82rem] opacity-45 hyphens-auto overflow-hidden">
            {toStringDate(user?.ADDED_ON)}
          </p>
        );
      case "status":
        return (
          <Tag color={user?.isPending ? "warning" : "cyan"}>
            {user?.isPending ? "Pending" : "Approved"}
          </Tag>
        );
      case "ACTION":
        return (
          <div className="relative flex justifyend items-center gap-2">
            {user?.REQUEST_ID && (
              <ActionIcons
                variant={"VIEW"}
                action={() => handleOpenView(user)}
              />
            )}
            {/* <ActionIcons variant={"EDIT"} action={() => handleEditClick()} />
            <ActionIcons variant={"DELETE"} /> */}
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
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          classNames={{
            wrapper: "max-h-[382px] ",
          }}
          className="fontOswald"
          selectedKeys={selectedKeys}
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
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </>
      {isDrawerOpen && (
        <WorkInformationDrawer
          isOpen={isDrawerOpen}
          setIsOpen={setIsDrawerOpen}
        />
      )}
    </>
  );
}

ExitTable.propTypes = {
  exitData: PropTypes.array,
  handleOpenView: PropTypes.func,
};
