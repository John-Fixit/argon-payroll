/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, Fragment } from "react";
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
  AvatarGroup,
  Avatar,
  Tooltip,
} from "@nextui-org/react";
import { columns, users, statusOptions } from "./data";

import ActionButton from "../../../../../components/forms/FormElements/ActionButton";
import { Plus } from "lucide-react";
import { IoEllipsisVertical } from "react-icons/io5";

const statusColorMap = {
  completed: "success",
  pending: "warning",
  cancelled: "warning",
  rejected: "danger",
};

const locationColorMap = {
  // local: '#4ba2ee',
  local: "bg-[#4ba2ee]",
  international: "bg-success-600",
  online: "bg-[#fff30e]",
};

const INITIAL_VISIBLE_COLUMNS = [
  "training",
  "location",
  "date",
  "co-trainees",
  "actions",
];

export default function TrainingTable2({ view }) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handlePreview = () => {
    setIsDrawerOpen(true);
  };
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(users.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

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
  }, [users, filterValue, statusFilter]);

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
    // console.log(columnKey, user);

    switch (columnKey) {
      case "training":
        return (
          <Fragment>
            {
              user?.trainingImg ? (
              <User
                avatarProps={{
                  radius: "sm",
                  size: "md",
                  src: user?.trainingImg,
                  name: "img",
                }}
                classNames={{
                  description: "text-default-500",
                  name: "font-medium",
                }}
                // description={user.training}
                name={cellValue}
              ></User>
            ) : (
              <p className="text-bold text-sm capitalize text-default-600 font-medium ">
                {user.training}
              </p>
            )
          }
          </Fragment>
        );
      case "request type":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-tiny capitalize text-default-400">
              {user.type}
            </p>
          </div>
        );
      case "date":
        return (
          <div className="">
            <p className="text-sm text-gray-400 capitalize">{user?.date}</p>
          </div>
        );
      case "assigned staff":
        return (
          <User
            avatarProps={{ radius: "full", size: "sm", src: user.avatar }}
            classNames={{
              description: "text-default-500",
            }}
            description={user.name}
          >
            {user.name}
          </User>
        );
      case "location":
        return (
          <div className="">
            <Chip
              classNames={{
                base: `" ${
                  locationColorMap[user.location]
                } border-1 border-slate-500 shadow-sm"`,
                // dot: "dot-classes",
                // content: "content-classes",
                // avatar: "avatar-classes",
                // closeButton: "close-button-classes"
              }}
              className="capitalize border-none gap-1 text-slate-800"
              size="sm"
              variant="solid"
            >
              {cellValue}
            </Chip>
          </div>
        );

      case "priority":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown className="bg-background border-1 border-default-200">
              <DropdownTrigger>
                <Chip
                  className="capitalize border-none gap-1 text-default-600"
                  color={statusColorMap[user.status]}
                  size="sm"
                  variant="solid"
                >
                  {cellValue}
                </Chip>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>
                  <Chip
                    className="capitalize border-none gap-1 text-default-600"
                    color={statusColorMap.paused}
                    size="sm"
                    variant="dot"
                  >
                    High
                  </Chip>
                </DropdownItem>
                <DropdownItem>
                  <Chip
                    className="capitalize border-none gap-1 text-default-600"
                    color={statusColorMap.vacation}
                    size="sm"
                    variant="dot"
                  >
                    Medium
                  </Chip>
                </DropdownItem>
                <DropdownItem>
                  <Chip
                    className="capitalize border-none gap-1 text-default-600"
                    // color={statusColorMap[user.status.active]}
                    color={statusColorMap.active}
                    size="sm"
                    variant="dot"
                  >
                    Low
                  </Chip>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      case "co-trainees":
        return (
          <div className="relative flex gap-4 items-center">
            <AvatarGroup>
              {user?.coTrainees?.map((tr) => (
                <Tooltip
                  key={tr}
                  showArrow={true}
                  placement="bottom"
                  content="name"
                >
                  {tr?.length > 6 ? (
                    <Avatar size="sm" src={tr} name={tr} />
                  ) : (
                    <Avatar
                      size="sm"
                      name={tr}
                      classNames={{
                        base: "bg-white border font-bold",
                      }}
                    />
                  )}
                </Tooltip>
              ))}
            </AvatarGroup>
            <Avatar
              classNames={{
                base: "bg-white border",
                img: "image-classes",
                name: "name-classes",
                icon: "icon-classes",
                fallback: "fallback-classes",
              }}
              size="sm"
              className={`${
                user?.coTrainees?.length == 2 ? "ml-8" : "ml-2"
              } cursor-pointer`}
              icon={<Plus strokeWidth={3} size={13} color="gray" />}
            />
          </div>
        );
      case "actions":
        return (
          <div className="relative gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="md" variant="">
                  <IoEllipsisVertical className="text-slate-600" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem onClick={view}>
                  {/* <Button
                  className=" bg-blue-500 w-full text-white"
                  onClick={()=>handleOpenDrawer({group: user, role: "edit"})}
                > */}
                  View
                  {/* </Button> */}
                </DropdownItem>

                <DropdownItem>
                  {/* <Button
                  className=" bg-blue-500 w-full text-white"
                >  */}
                  Edit
                  {/* </Button> */}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );

      default:
        return cellValue;
    }
  }, []);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
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
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h[382px]", "max-w3xl", "bg-white"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        "border-b py-2",
        "border-divider",
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    []
  );

  return (
    <>
      {/* <Table
        isCompact
        removeWrapper
        aria-label='Example table with custom cells, pagination and sorting'
        bottomContent={bottomContent}
        bottomContentPlacement='outside'
        checkboxesProps={{
          classNames: {
            wrapper:
              'after:bg-foreground  after:text-background text-background',
          },
        }}
        className='bg-white p-2 border overflow-auto rounded'
        classNames={classNames}
        selectedKeys={selectedKeys}
        selectionMode='multiple'
        sortDescriptor={sortDescriptor}
        topContentPlacement='outside'
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === 'actions' ? 'center' : 'start'}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={'No users found'} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table> */}
      <Table
        isStriped
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper:
            "max-h-[382px] rounded-none flex items-center justify-center border-none shadow-none",
        }}
        className={classNames}
        selectedKeys={selectedKeys}
        //   selectionMode='multiple'
        sortDescriptor={sortDescriptor}
        // topContent={topContent}
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
              {column.name}
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
  );
}
