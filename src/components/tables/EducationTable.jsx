/* eslint-disable no-unused-vars */
import React, { useCallback, useMemo, useState } from "react";
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
import { columns, statusOptions } from "./datas/Educationdata";
import EduInformationDrawer from "../profile/profileDrawer/EduInformationDrawer";
import { useGetProfile } from "../../API/profile";
import { API_URL } from "../../API/api_urls/api_urls";
import moment from "moment";
import { Tag } from "antd";
import useFileModal from "../../hooks/useFileModal";
import FileAttachmentView from "../profile/FileAttachmentView";
import ActionIcons from "../core/shared/ActionIcons";
import { toStringDate } from "../../utils/utitlities";
import StarLoader from "../core/loaders/StarLoader";

const INITIAL_VISIBLE_COLUMNS = [
  "institution_name",
  "course",
  "degree",
  "start date",
  "end date",
  "attachment",
  "status",
];
export default function EducationTable() {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleEditClick = () => {
    setIsDrawerOpen(true);
  };

  //data request
  const { data: getAcademics, isLoading } = useGetProfile({
    path: API_URL.getAcademics,
    key: "academics",
  });

  const package_id = getAcademics?.data?.package_id;

  let academicsData = getAcademics?.data; // this will have { approved, and package_id, pending}

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const pendingAcademic = academicsData?.pending?.length
    ? academicsData?.pending?.map((item) => {
        return {
          ...item,
          isPending: true,
        };
      })
    : [];


  const approvedAcademic = academicsData?.approved?.length
    ? academicsData?.approved?.map((item) => {
        return {
          ...item,
          isPending: false,
        };
      })
    : [];

  const combinedAcademics = approvedAcademic?.concat(pendingAcademic);

  const updatedAcademic = useMemo(() => {
    return combinedAcademics?.length
      ? combinedAcademics
          ?.map((item, index) => ({
            ...item,
            id: `item-${index}`,
          }))
          ?.filter((item) => item?.INSTITUTION_NAME)
      : [];
  }, [combinedAcademics]);



  const filteredItems = React.useMemo(() => {
    let filteredUsers = updatedAcademic?.length ? [...updatedAcademic] : [];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      );
    }

    return filteredUsers;
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
      case "institution_name":
        return (
          <div className="">
            <p className="w-36 font-helvetica text-[0.82rem] opacity-45 hyphens-auto overflow-hidden break-words">
              {user.INSTITUTION_NAME ?? "NIL"}
            </p>
          </div>
        );

      case "course":
        return (
          <p className="w-32 capitalize font-helvetica text-[0.82rem] opacity-45 hyphens-auto overflow-hidden break-words">
            {user?.COURSE_NAME ?? "NIL"}
          </p>
        );
      case "degree":
        return (
          <p className="w-36 font-helvetica text-[0.82rem] opacity-45">
            {user?.DEGREE_NAME ?? "N/A"}
          </p>
        );
      case "start date":
        return (
          <p className="w-32 capitalize font-helvetica text-[0.82rem] opacity-45 hyphens-auto overflow-hidden break-words">
            {toStringDate(user?.START_DATE)}
          </p>
        );
      case "end date":
        return (
          <p className="w-32 capitalize font-helvetica text-[0.82rem] opacity-45 hyphens-auto overflow-hidden break-words">
            {toStringDate(user?.END_DATE)}
          </p>
        );
      case "attachment":
        return (
          <FileAttachmentView
            attachments={user}
            package_id={package_id}
            position_id={user?.STAFF_INSTITUTION_ID}
            key={"academic"}
          />
        );
      case "status":
        return (
          <>
            <Tag color={user?.isPending ? "warning" : "cyan"}>
              {user?.isPending ? "Pending" : "Approved"}
            </Tag>
          </>
        );
      case "actions":
        return (
          <div className="relative flex justifyend items-center gap-2">
            <ActionIcons variant={"EDIT"} action={() => handleEditClick()} />
            <ActionIcons variant={"DELETE"} />
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

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between my-2 gap-3 items-center mt-3">
          <h1>Education</h1>
          <div className="flex gap-3 justify-between ">
            <button
              className="header_btnStyle bg-[#00bcc2] rounded text-white font-semibold py-[7px] leading-[19.5px] mx-2 my-1 md:my-0 px-[16px] uppercase"
              onClick={handleEditClick}
            >
              Add Education
            </button>
          </div>
        </div>
      </div>
    );
  }, []);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
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
            topContent={topContent}
            topContentPlacement="outside"
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
            <TableBody emptyContent={
          isLoading? (
            <StarLoader />
          ): (
            <p className="font-helvetica">No Data Available</p>
          )
        } isLoading={isLoading} items={sortedItems}>
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
        <EduInformationDrawer
          isOpen={isDrawerOpen}
          setIsOpen={setIsDrawerOpen}
        />
      )}
    </>
  );
}
