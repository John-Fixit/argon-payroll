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
// import { Dropdown } from 'antd'
import { EditIcon, PlusIcon, Trash2Icon } from "lucide-react";
import {
  columns,
  users,
  statusOptions,
  certificationData,
} from "./datas/Educationdata";
import { BsThreeDotsVertical } from "react-icons/bs";
import CertInformationDrawer from "../profile/profileDrawer/CertInformationDrawer";
import { GrDocumentImage } from "react-icons/gr";
import { useGetProfile } from "../../API/profile";
import { API_URL } from "../../API/api_urls/api_urls";
import moment from "moment";
import { Tag, Timeline } from "antd";
import useFileModal from "../../hooks/useFileModal";
import ActionButton from "../forms/FormElements/ActionButton";
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
  "authority_name",
  "CERTIFICATE_NAME",
  "CERTIFICATE_TYPE",
  "license_number",
  "start date",
  "end date",
  "attachment",
  "status",
  // "actions",
];

export default function CertificationTable() {
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

  const { openModal } = useFileModal();

  const handleEditClick = () => {
    setIsDrawerOpen(true);
  };

  //fetching of data here
  const { data: getCertificate, isLoading } = useGetProfile({
    path: API_URL.getCertificate,
    key: "certification",
  });

  const package_id = getCertificate?.data?.package_id;

  let certificateData = getCertificate?.data || []; // this will have { package_id, pending, approved}

  const pendingCertificate = certificateData?.pending?.length
    ? certificateData?.pending?.map((item) => {
        return {
          ...item,
          isPending: true,
        };
      })
    : [];
  const approvedCertificate = certificateData?.approved?.length
    ? certificateData?.approved?.map((item) => {
        return {
          ...item,
          isPending: false,
        };
      })
    : [];

  const combinedCertificates = approvedCertificate?.concat(pendingCertificate);


  const updatedCertificates = useMemo(() => {
    return combinedCertificates?.length ? combinedCertificates?.map((item, index) => ({
      ...item,
      id: `item-${index}`,
    }))?.filter((item)=>item?.CERTIFICATE_NAME) : []
  }, [combinedCertificates]);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    // let filteredUsers = [...users]
    let filteredUsers = updatedCertificates?.length
      ? [...updatedCertificates]
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
  }, [updatedCertificates, filterValue, statusFilter]);

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
      case "authority_name":
        return (
          <>
            <p className="w-48 font-helvetica text-[0.82rem] opacity-45">
              {user?.AUTHORITY_NAME ?? "NIL"}
            </p>
          </>
        );
      case "CERTIFICATE_NAME":
        return (
          <>
            <p className="w-36 font-helvetica text-[0.82rem] opacity-45">
              {user?.CERTIFICATE_NAME ?? "NIL"}
            </p>
          </>
        );
        case "CERTIFICATE_TYPE":
          return (
            <>
              <p className="w-36 font-helvetica text-[0.82rem] opacity-45">
                {user?.CERTIFICATION_TYPE ?? "NIL"}
              </p>
            </>
          );
      case "license_number":
        return (
          <>
            <p className="w-36 font-helvetica text-[0.82rem] opacity-45">
              {user?.LICENSE_NUMBER ?? "NIL"}
            </p>
          </>
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
      case "attachment":
        return (
          <FileAttachmentView
            attachments={user}
            package_id={package_id}
            position_id={user?.STAFF_CERTIFICATION_ID}
            key={"certification"}
          />
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
        <div className="flex justify-between my-2 gap-3 items-center">
          <h1>Certification</h1>
          <div className="flex gap-3 justify-between ">
            <button
              className="header_btnStyle bg-[#00bcc2] rounded text-white font-semibold py-[7px] leading-[19.5px] mx-2 my-1 md:my-0 px-[16px] uppercase"
              onClick={handleEditClick}
            >
              Add Certificate
            </button>
          </div>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    // users.length,
    updatedCertificates?.length,
    onSearchChange,
    hasSearchFilter,
  ]);

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
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const timelineItems = useCallback((certificates) => {
    return certificates.map((certificate, index) =>
      certificate?.CERTIFICATE_NAME
        ? {
            label: (
              <span
                className={`flex ${
                  index % 2 === 0 ? "justify-end" : "justify-start"
                }`}
              >
                <FileAttachmentView
                  attachments={certificate}
                  package_id={package_id}
                  position_id={certificate?.STAFF_CERTIFICATION_ID}
                  key={"certification"}
                />
              </span>
            ),
            color: index % 2 === 0 ? "rgb(239 68 68)" : "#00bcc2",
            children: (
              <div>
                <Tag color={certificate?.isPending ? "warning" : "cyan"}>
                  {certificate?.isPending ? "Pending" : "Approved"}
                </Tag>
                <p
                  className={`text-xs ${
                    index % 2 === 0 ? "text-red-500" : "text-btnColor"
                  } font-light font-helvetica`}
                >
                  {moment(certificate?.START_DATE).format("MMM DD YYYY")} -{" "}
                  {moment(certificate?.END_DATE).format("MMM DD YYYY")}
                </p>
                <h6 className="text-muted font-bold text-[14px] mb-2 font-helvetica">
                  {certificate?.CERTIFICATE_NAME}
                </h6>
                <p>
                  <small className="text-muted font-bold text-[13px] font-helvetica">
                    {certificate?.AUTHORITY_NAME}
                  </small>
                </p>
                <p>
                  <small className="text-muted font-bold text-[12px] font-helvetica">
                    {certificate?.LICENSE_NUMBER}
                  </small>
                </p>
                <p>
                  <a
                    href={certificate?.CERTIFICATION_URL}
                    className="text-muted font-bold text-[12px] opacity-[0.7] font-helvetica"
                  >
                    {certificate?.CERTIFICATION_URL}{" "}
                  </a>
                </p>
              </div>
            ),
          }
        : null
    );
  }, []);

  const hasName = updatedCertificates?.some((item) => item?.CERTIFICATE_NAME);

  return (
    <>
        <>
          <Table
          isStriped
          aria-label='Example table with custom cells, pagination and sorting'
          isHeaderSticky
          bottomContent={bottomContent}
          bottomContentPlacement='outside'
          classNames={{
            wrapper: 'max-h-[382px] ',
          }}
          className='fontOswald'
          selectedKeys={selectedKeys}
          sortDescriptor={sortDescriptor}
          topContent={topContent}
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
        <CertInformationDrawer
          isOpen={isDrawerOpen}
          setIsOpen={setIsDrawerOpen}
        />
      )}
    </>
  );
}
