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
  Pagination
} from "@nextui-org/react";
import { Tag } from "antd";
import { useGetProfile } from "../../../../API/profile";
import { API_URL } from "../../../../API/api_urls/api_urls";
import { toStringDate } from "../../../../utils/utitlities";
import ActionIcons from "../../shared/ActionIcons";
import StarLoader from "../../loaders/StarLoader";
import WorkInformationDrawer from "../../../profile/profileDrawer/WorkInformationDrawer";
import PropTypes from "prop-types";
import SalaryAdvanceDrawer from "../SalaryAdvanceDrawer"

const columns = [
  { name: 'ID', uid: 'id', sortable: true },
  { name: 'AMOUNT', uid: 'amount', sortable: false },
  { name: 'DURATION', uid: 'duration', sortable: false },
  { name: 'MONTHLY REPAYMENT', uid: 'monthly_repayment', sortable: false },
  // { name: 'START DATE', uid: 'start_date', sortable: false },
  // { name: 'END DATE', uid: 'end_date', sortable: false },
  { name: 'ACTION', uid: 'action', sortable: false },
]


const INITIAL_VISIBLE_COLUMNS = [
  "amount",
  "duration",
  "monthly_repayment",
  "reason",
  "start_date",
  "end_date",
  "action",
];
export default function SalaryAdvanceTable({salaryAdvanceData, isLoading}) {



  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );

  const [openSalaryDetail, setOpenSalaryDetail] = useState({state: false, data: {}});

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


  const handleOpenViewDetail=(data)=>{
    setOpenSalaryDetail({state: true, data: data})
  }

  const handleCloseDetail=()=>{
    setOpenSalaryDetail({state: false, data: {}})
  }

 
  const tableData = salaryAdvanceData?.map((item, index) => ({
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
    let filteredUsers = tableData?.length
      ? [...tableData]
      : [];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
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
      case "amount":
        return (
          <div>
            <p className="w-32 font-helvetica text-[0.82rem] opacity-45 hyphens-auto overflow-hidden break-words uppercase">
              ₦{Number(Number(user?.AMOUNT)?.toFixed(2))?.toLocaleString("en-US")}
            </p>
          </div>
        );
      case "monthly_repayment":
        return (
          <p className={`capitalize font-helvetica text-[0.82rem] opacity-45`}>
            ₦{Number(Number(user?.MONTHLY_REPAYMENT)?.toFixed(2))?.toLocaleString("en-US")}
          </p>
        );
      case "duration":
        return (
          <p className={`capitalize font-helvetica text-[0.82rem] opacity-45`}>
            {user?.DURATION ?? "NIL"} Month
          </p>
        );
      case "reason":
        return (
          <p
            className={`capitalize w-48 font-helvetica text-[0.82rem] opacity-45 line-clamp-1`}
          >
            {user?.REASON}
          </p>
        );
      case "start_date":
        return (
          <p className="w-32 capitalize font-helvetica text-[0.82rem] opacity-45 hyphens-auto overflow-hidden break-words">
            {toStringDate(user?.START_DATE)}
          </p>
        );
      case "end_date":
        return (
          <p className="w-32 capitalize font-helvetica text-[0.82rem] opacity-45 hyphens-auto overflow-hidden break-words">
            {toStringDate(user?.END_DATE)}
          </p>
        );
      case "status":
        return (
          <Tag color={user?.isPending ? "warning" : "cyan"}>
            {user?.isPending ? "Pending" : "Approved"}
          </Tag>
        );
      case "action":
        return (
          <div className="relative flex justifyend items-center gap-2">
            <ActionIcons variant={"VIEW"} action={()=>handleOpenViewDetail(user)}/>
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



  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between my-2 gap-3 items-center mt-3">
          {/* <h1>Work Experience</h1> */}
          {/* <div className="flex gap-3 justify-between ">
            <button
              className="header_btnStyle bg-[#00bcc2] rounded text-white font-semibold py-[7px] leading-[19.5px] mx-2 my-1 md:my-0 px-[16px] uppercase"
              onClick={handleEditClick}
            >
              Add Experience
            </button>
          </div> */}
        </div>
      </div>
    );
  }, []);

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
      

<SalaryAdvanceDrawer isOpen={openSalaryDetail.state} salaryData={openSalaryDetail?.data} onClose={handleCloseDetail}/>

      
    </>
  );
}

SalaryAdvanceTable.propTypes = {
  salaryAdvanceData: PropTypes.array,
  isLoading: PropTypes.bool,
};
