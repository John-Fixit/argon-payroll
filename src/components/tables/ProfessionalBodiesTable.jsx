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
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Spinner,
  CardBody,
  Divider,
  CardHeader,
  Card,
} from "@nextui-org/react";
import { EditIcon, Eye, PlusIcon, Trash2Icon } from "lucide-react";
import {
  columns,
  users,
  statusOptions,
  professionalData,
} from "./datas/Professionaldata";
import { BsThreeDotsVertical } from "react-icons/bs";
import ProfessionalBodyDrawer from "../profile/profileDrawer/ProfessionalBodyDrawer";
import { GrDocumentImage } from "react-icons/gr";
import { useGetProfile } from "../../API/profile";
import { API_URL } from "../../API/api_urls/api_urls";
import moment from "moment";
import { Tag, Timeline } from "antd";
import useFileModal from "../../hooks/useFileModal";
import FileAttachmentView from "../profile/FileAttachmentView";
import ActionIcons from "../core/shared/ActionIcons";
import { toStringDate } from "../../utils/utitlities";
import { FaDatabase } from "react-icons/fa";
import StarLoader from "../core/loaders/StarLoader";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = [
  "professional_name",
  "organization_number",
  "start date",
  "attachment",
  "status",
  // "actions",
];

export default function ProfessionalBodiesTable() {
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

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const { openModal } = useFileModal();

  //data request
  const { data: getProfession, isLoading } = useGetProfile({
    path: API_URL.getProfession,
    key: "profession",
  });

  const package_id = getProfession?.data?.package_id;

  let professionData = getProfession?.data || []; // this will have { package_id, pending, approved}

  const pendingProfession = professionData?.pending?.length
    ? professionData?.pending?.map((item) => {
        return {
          ...item,
          isPending: true,
        };
      })
    : [];
  const approvedProfession = professionData?.approved?.length
    ? professionData?.approved?.map((item) => {
        return {
          ...item,
          isPending: false,
        };
      })
    : [];

  const professionDatas = approvedProfession?.concat(pendingProfession);

  const updatedApprovedProfession = useMemo(()=>{
      return professionDatas?.length
      ? professionDatas
          ?.map((item, index) => ({
            ...item,
            id: `item-${index}`,
          }))
          ?.filter((item) => item?.PROFESSIONAL_NAME)
      : [];
  }, [professionDatas])

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    // let filteredUsers = [...users]
    let filteredUsers = updatedApprovedProfession?.length
      ? [...updatedApprovedProfession]
      : [];

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
    // }, [users, filterValue, statusFilter])
  }, [updatedApprovedProfession, hasSearchFilter, statusFilter, filterValue]);

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

  //formatInitialName
  const formatInitialName = (val) => {
    const words = val?.split(" ");
    const initials = words ? words[0][0] + words[words.length - 1][0] : "";

    return initials?.toUpperCase();
  };

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "professional_name":
        return (
          <>
            <p className="font-helvetica text-[0.82rem] opacity-45">
              {user?.PROFESSIONAL_NAME ?? "N/A"}
            </p>
          </>
        );
      case "organization_number":
        return (
          <p className="capitalize font-helvetica text-[0.82rem] opacity-45">
            {user.ORGANIZATION_NUMBER ?? "N/A"}
          </p>
        );
      case "start date":
        return (
          <p className="w-32 capitalize font-helvetica text-[0.82rem] opacity-45 hyphens-auto overflow-hidden break-words">
            {toStringDate(user?.DATE_JOINED)}
          </p>
        );

      case "attachment":
        return (
          <>
            <FileAttachmentView
              attachments={user}
              package_id={package_id}
              position_id={user?.SPD_ID}
              key={"profession"}
            />
          </>
        );
      case "status":
        return (
          <Tag color={user?.isPending ? "warning" : "cyan"}>
            {user?.isPending ? "Pending" : "Approved"}
          </Tag>
        );
      case "actions":
        return (
          <div className="relative flex justifyend items-center gap-1">
            <ActionIcons variant={"VIEW"} />
            <ActionIcons variant={"EDIT"} action={() => handleEditClick()} />
            <ActionIcons variant={"DELETE"} />
          </div>
        );

      default:
        return cellValue;
    }
  }, [package_id]);

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
        <div className="flex justify-between my-2 gap-3 items-center">
          <h1>professonal</h1>
          <div className="flex gap-3 justify-between ">
            <button
              className="header_btnStyle bg-[#00bcc2] rounded text-white font-semibold py-[7px] leading-[19.5px] mx-2 my-1 md:my-0 px-[16px] uppercase"
              onClick={handleEditClick}
            >
              Add Profession
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



  const hasName = updatedApprovedProfession?.some(
    (item) => item?.PROFESSIONAL_NAME
  );

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
              wrapper: "max-h-[382px]",
            }}
            className="fontOswald"
            selectedKeys={selectedKeys}
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
        } items={sortedItems}>
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
        <ProfessionalBodyDrawer
          isOpen={isDrawerOpen}
          setIsOpen={setIsDrawerOpen}
        />
      )}
    </>
  );
}
