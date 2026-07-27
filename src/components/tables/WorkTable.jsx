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
  Card,
  CardHeader,
  Divider,
  CardBody,
} from "@nextui-org/react";
import { EditIcon, EyeIcon, PlusIcon, Trash2Icon } from "lucide-react";
import {
  columns,
  users,
  statusOptions,
  workExperienceData,
} from "./datas/Workdata";
import { BsThreeDotsVertical } from "react-icons/bs";
import WorkInformationDrawer from "../profile/profileDrawer/WorkInformationDrawer";
import { GrDocumentImage } from "react-icons/gr";
import { useGetProfile } from "../../API/profile";
import { API_URL } from "../../API/api_urls/api_urls";
import moment from "moment";
import { Tag, Timeline, Tooltip } from "antd";
import ActionIcons from "../core/shared/ActionIcons";
import { toStringDate } from "../../utils/utitlities";
import { FaDatabase } from "react-icons/fa";
import StarLoader from "../core/loaders/StarLoader";
import TimeLine from "../self_services/timeline/TimeLine";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = [
  "organisation_name",
  "work_type",
  "company",
  "leave_reason",
  "start date",
  "end date",
  "status",
];
export default function WorkTable() {
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

  const combinedExperience = pendingExperience?.concat(approvedExperience);

  const updatedExperience = useMemo(() => {
    return combinedExperience?.length
      ? combinedExperience?.map((item, index) => ({
          ...item,
          id: `item-${index}`,
        }))
      : [];
  }, [combinedExperience]);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = updatedExperience?.length ? [...updatedExperience] : [];

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
  }, [updatedExperience, hasSearchFilter, statusFilter, filterValue]);

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
            {/* <Tooltip title={user?.REASON_FOR_LEAVING}> */}
            {user?.REASON_FOR_LEAVING}
            {/* </Tooltip> */}
          </p>
        );
      case "start date":
        return (
          <p className="w-32 capitalize font-helvetica text-[0.82rem] opacity-45 hyphens-auto overflow-hidden break-words">
            {/* {user.startDate} */}
            {toStringDate(user?.START_DATE)}
          </p>
        );
      case "end date":
        return (
          <p className="w-32 capitalize font-helvetica text-[0.82rem] opacity-45 hyphens-auto overflow-hidden break-words">
            {/* {user.endDate} */}
            {toStringDate(user?.END_DATE)}
          </p>
        );
      case "status":
        return (
          <Tag color={user?.isPending ? "warning" : "cyan"}>
            {user?.isPending ? "Pending" : "Approved"}
          </Tag>
        );
      // case 'attachment':
      //   return <GrDocumentImage className='text-red-500' size={30} />
      case "actions":
        return (
          <div className="relative flex justifyend items-center gap-2">
            <ActionIcons variant={"VIEW"} />
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
        <div className="flex justify-between my-2 gap-3 items-center mt-3">
          <h1>Work Experience</h1>
          <div className="flex gap-3 justify-between ">
            <button
              className="header_btnStyle bg-[#00bcc2] rounded text-white font-semibold py-[7px] leading-[19.5px] mx-2 my-1 md:my-0 px-[16px] uppercase"
              onClick={handleEditClick}
            >
              Add Experience
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

  const timelineItems = useCallback((experiences) => {
    return experiences.map((experience, index) =>
      experience?.ORGANIZATION_NAME ? (
        {
          label: (
            <span
              className={`ms-3 flex font-light font-helvetica ${
                index % 2 === 0 ? "justify-end" : "justify-start"
              }`}
            >
              {experience?.WORK_TYPE}
            </span>
          ),
          color: index % 2 === 0 ? "rgb(239 68 68)" : "#00bcc2",
          children: (
            <div>
              <p
                className={`text-xs ${
                  index % 2 === 0 ? "text-red-500" : "text-btnColor"
                } font-light font-helvetica`}
              >
                {moment(experience?.START_DATE).format("MMM DD YYYY")} -{" "}
                {moment(experience?.END_DATE).format("MMM DD YYYY")}
              </p>
              <p>
                <small className="text-muted font-bold text-[12px] font-helvetica">
                  {experience?.IS_ARMED_FORCES ? experience?.DES_NAME : ""}
                </small>
              </p>
              <h6 className="text-muted font-bold text-[14px] font-helvetica">
                {experience?.ORGANIZATION_NAME}
              </h6>
              <p>
                {experience?.IS_ARMED_FORCES ? (
                  <small className="text-muted font-bold text-[13px] font-helvetica">
                    {experience?.ARM_OF_SERVICE} {" | "} {experience?.LAST_UNIT}
                    <span className="text-gray-600 font-helvetica text-[11px] capitalize">
                      ({experience?.SERVICE_NUMBER?.toLowerCase()})
                    </span>
                  </small>
                ) : (
                  ""
                )}
              </p>
              <p>
                <small className="text-muted font-bold text-[13px] font-helvetica">
                  {experience?.JOB_DESCRIPTION}
                </small>
              </p>
              <p>
                <small className="text-muted font-bold opacity-[0.7] text-[12px] font-helvetica">
                  {experience?.REASON_FOR_LEAVING}
                </small>
              </p>
            </div>
          ),
        }
      ) : (
        <div className="flex items-center justify-center" key={"empty_______"}>
          <h5 className="font-helvetica">No data</h5>
        </div>
      )
    );
  }, []);

  const hasName = updatedExperience?.some((item) => item?.ORGANIZATION_NAME);

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
