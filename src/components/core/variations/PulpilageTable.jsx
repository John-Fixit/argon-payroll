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
import { useGetProfile } from "../../../API/profile";
import { API_URL } from "../../../API/api_urls/api_urls";
import { toStringDate } from "../../../utils/utitlities";
import ActionIcons from "../shared/ActionIcons";
import StarLoader from "../loaders/StarLoader";
import WorkInformationDrawer from "../../profile/profileDrawer/WorkInformationDrawer";
import PropTypes from "prop-types";
import { MdOutlineFileOpen } from "react-icons/md";

const columns = [
  { name: 'ID', uid: 'id', sortable: true },
  { name: 'NAME', uid: 'name', sortable: false },
  { name: 'DIRECTORATE', uid: 'directorate', sortable: false },
  { name: 'DEPARTMENT', uid: 'department', sortable: false },
  { name: 'FIRST APPOINTMENT', uid: 'first_appointment', sortable: false },
  { name: 'CURRENT APPOINTMENT', uid: 'current_appointment', sortable: false },
  { name: 'PROFFESSION', uid: 'proffession', sortable: false },
  { name: 'GRADE', uid: 'grade', sortable: false },
  { name: 'ACTIONS', uid: 'actions', sortable: false },
]


const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "directorate",
  "department",
  "first_appointment",
  "current_appointment",
  "proffession",
  "grade",
  "actions",
];
export default function PulpilageTable({incomingData}) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );

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

  const expData = pendingExperience?.concat(approvedExperience);

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
      case "organisation_name":
        return (
          <div>
            <p className="w-32 font-helvetica text-[0.82rem] opacity-45 hyphens-auto overflow-hidden break-words uppercase">
              {user?.ORGANIZATION_NAME}
            </p>
          </div>
        );
      case "work_type":
        return (
          <p className={`capitalize font-helvetica text-[0.82rem] opacity-45`}>
            {user?.WORK_TYPE ?? "NIL"}
          </p>
        );
      case "company":
        return (
          <p className={`capitalize font-helvetica text-[0.82rem] opacity-45`}>
            {user?.DES_NAME ?? "NIL"}
          </p>
        );
      case "leave_reason":
        return (
          <p
            className={`capitalize w-48 font-helvetica text-[0.82rem] opacity-45 line-clamp-1`}
          >
            {user?.REASON_FOR_LEAVING}
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
      case "actions":
        return (
          <div className="relative flex justifyend items-center gap-2">
            <ActionIcons variant={"VIEW"} />
            <div className="hover:bg-gray-200/50 p-1 rounded-lg transition-all duration-100 cursor-pointer">
                <MdOutlineFileOpen size={20} strokeWidth={2.5} className="text-gray-600 " onClick={()=>{}} />
                <span>Send To Audit</span>
            </div>
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
      {isDrawerOpen && (
        <WorkInformationDrawer
          isOpen={isDrawerOpen}
          setIsOpen={setIsDrawerOpen}
        />
      )}
    </>
  );
}

PulpilageTable.propTypes = {
    incomingData: PropTypes.array
};
