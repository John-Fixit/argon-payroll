/* eslint-disable no-unused-vars */

import React, { Fragment } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  Avatar,
  AvatarGroup,
  User,
} from "@nextui-org/react";
import { tableHeader, status, statusColor,} from "./data";
import { MdError, MdFilterList } from "react-icons/md";
import PropTypes from "prop-types";
import { VerticalDotsIcon } from "../../../tables/components/VerticalDotsIcon";
import ActionButton from "../../../../components/forms/FormElements/ActionButton";
import { filePrefix } from "../../../../utils/filePrefix";


const columns = [
  {name: "S/N", uid: "S_N", sortable: true},
  {name: "STAFF", uid: "STAFF", sortable: true},
  {name: "REQUEST TYPE", uid: "REQUEST_TYPE", sortable: true},
  {name: "REQUEST DATE", uid: "REQUEST_DATE", sortable: true},
  {name: "ACTIONS", uid: "ACTIONS", sortable: true},
];

const INITIAL_VISIBLE_COLUMNS = [
  "STAFF",
  "LAST_NAME",
  "REQUEST_TYPE",
  "REQUEST_DATE",
  "ACTIONS"
];

const HistoryTable = ({ view, tableData }) => {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "date",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const viewRequest = (id) => {
    view(id);
  };

  // console.log(tableData)

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredApprovals = [...tableData];

    if (hasSearchFilter) {
      filteredApprovals = filteredApprovals.filter(
        (approval) =>
          approval.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          approval.employment_type
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          approval.status.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== status.length
    ) {
      filteredApprovals = filteredApprovals.filter((approval) =>
        Array.from(statusFilter).includes(approval.status)
      );
    }

    return filteredApprovals;
  }, [tableData, filterValue, statusFilter]);

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

  const formatDate = (date) => {
    const date1 = new Date(date);
return `${(date1.getDate() < 10 ? '0' : '') + date1.getDate()}/${(date1.getMonth() < 9 ? '0' : '') + (date1.getMonth() + 1)}/${date1.getFullYear()}`;
  };

  // const filePrefix = 'http://lamp3.ncaa.gov.ng/pub/'

  const renderCell = React.useCallback((VALUE, columnKey) => {
    const cellValue = VALUE[columnKey];
    // console.log(VALUE)
    switch (columnKey) {
      case "STAFF":
        return  <User
        avatarProps={{ radius: "lg", src: VALUE?.FILE_NAME ?  filePrefix + VALUE?.FILE_NAME : "" }}
        name={(`${VALUE?.LAST_NAME || ''} ${VALUE?.FIRST_NAME || ''}`)}
    >
        {VALUE?.LAST_NAME}  {VALUE?.FIRST_NAME}
    </User>;

      case "REQUEST_TYPE":
        return <p className="text-bold text-sm capitalize text-default-400">{VALUE?.PACKAGE_NAME}</p>;
     
        case "REQUEST_DATE":
          return <p className="text-bold text-sm capitalize text-default-400">{formatDate(cellValue)}</p>;
 
        case "ACTIONS":
        return (
          <div className="relative flex gap-2">
             <Dropdown>
                    <DropdownTrigger>
                      <Button isIconOnly size="sm" variant="light">
                        <VerticalDotsIcon className="text-default-300" />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                    
                      <DropdownItem className="text-center" onClick={()=>viewRequest(VALUE?.REQUEST_ID)} > View </DropdownItem>
                    </DropdownMenu>
              </Dropdown>
                    {/* <ActionButton onClick={()=>handleOpenDrawer(user?.REQUEST_ID)}>View</ActionButton> */}
          
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

  // const topContent = React.useMemo(() => {
  //   return (
  //     <div className="flex flex-col gap-4 font-medium">
  //       <Input
  //         isClearable
  //         className="w-full sm:max-w-[44%]"
  //         placeholder="Filter by name, employment type and status"
  //         startContent={<MdFilterList size={20} />}
  //         value={filterValue}
  //         onClear={() => onClear()}
  //         onValueChange={onSearchChange}
  //         classNames={{
  //         inputWrapper:'bg-white round-0 py-0 shadow hover:bg-white focus:bg-white active:bg-white',
  //         innerWrapper:'focus:bg-white active:bg-white'
  //         }}
  //       />
  //       <div className="flex justify-between items-center">
  //         <span className="text-default-400 text-small">
  //           Total: {tableData.length} Approvals
  //         </span>
  //         <label className="flex items-center text-default-400 text-small">
  //           Rows per page:
  //           <select
  //             className="bg-transparent outline-none text-default-400 text-small"
  //             onChange={onRowsPerPageChange}
  //           >
  //             <option value="5">5</option>
  //             <option value="10">10</option>
  //             <option value="15">15</option>
  //             <option value="20">20</option>
  //           </select>
  //         </label>
  //       </div>
  //     </div>
  //   );
  // }, [
  //   filterValue,
  //   statusFilter,
  //   visibleColumns,
  //   onRowsPerPageChange,
  //   tableData.length,
  //   onSearchChange,
  //   hasSearchFilter,
  // ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center font-medium">
        <Pagination
          isCompact
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
        {/* <div className="hidden sm:flex w-[30%] justify-end gap-2">
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
        </div> */}
      </div>
    );
  }, [page, pages]);

  return (
    <Fragment>
      <div className="">
     
        <Table
          aria-label="Example table with custom cells, pagination and sorting"
          isHeaderSticky
          bottomContent={bottomContent}
          radius="none"
          shadow="none"
          bottomContentPlacement="outside"
          classNames={{
            wrapper: "max-h-[550px]",
          }}

          isStriped
          sortDescriptor={sortDescriptor}
          // topContent={topContent}
          topContentPlacement="outside"
          onSelectionChange={setSelectedKeys}
          onSortChange={setSortDescriptor}
          className="lg:col-span-4"
        >
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
                allowsSorting={column?.sortable}
                className={`font-medium uppercase ${
                  column.uid === "actions" && "text-center"
                }`}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={"No record found"} items={sortedItems}>
            {(item) => (
              <TableRow key={item?.REQUEST_ID}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Fragment>
  );
};
export default HistoryTable;

HistoryTable.propTypes = {
  view: PropTypes.func,
  tableData: PropTypes.array,
};
