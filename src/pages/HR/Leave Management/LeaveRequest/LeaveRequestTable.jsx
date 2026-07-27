/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { Fragment, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Pagination,
  User,
  Spinner,
} from "@nextui-org/react";
import { MdFilterList } from "react-icons/md";
import ActionIcons from "../../../../components/core/shared/ActionIcons";
import ActionButton from "../../../../components/forms/FormElements/ActionButton";
import { filePrefix } from "../../../../utils/filePrefix";
import { formatDate, toStringDate } from "../../../../utils/utitlities";
import { useDeletePendingLeave } from "../../../../API/leave";
import { DatePicker, Drawer, Input, Modal } from "antd";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import { errorToast, successToast } from "../../../../utils/toastMsgPop";
import LeaveAdvice from "../../../../components/ProfileInformation/LeaveAdvice";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import DownloadHeader from "../../../Leave/DownloadHeader";
import Label from "../../../../components/forms/FormElements/Label";
import dayjs from "dayjs";

const initialColumns = [
  { name: "ID", uid: "REQUEST_ID", sortable: true },
  { name: "USER", uid: "FIRST_NAME", sortable: true },
  { name: "TYPE", uid: "LEAVE_NAME", sortable: true },
  { name: "START DATE", uid: "START_DATE", sortable: true },
  { name: "END DATE", uid: "END_DATE", sortable: true },
  { name: "REQUEST DATE", uid: "REQUEST_DATE", sortable: true },
  { name: "DURATION(DAYS)", uid: "DURATION", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  // { name: "REASON", uid: "reason", sortable: true },
  // { name: "HANDED OVER TO", uid: "approval", sortable: true },
  { name: "ACTIONS", uid: "ACTIONS" },
];
const tableHeader = [
  "FIRST_NAME",
  "LAST_NAME",
  "LEAVE_NAME",
  "START_DATE",
  "END_DATE",
  "REQUEST_DATE",
  "DURATION",
  "LEAVE ADVICE",
  "ACTIONS",
];

const LeaveRequestTable = ({
  handleOpenDrawer,
  tableData,
  setCurrentView,
  resume,
  view,
  setStartDate,
  setEndDate,
  endDate,
  startDate,
  isLoading = true,
}) => {
  const viewDetails = (information) => {
    setCurrentView(information);
    view();
  };

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(tableHeader)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "date",
    direction: "ascending",
  });

  const [leaveInformation, setLeaveInformation] = useState({});

  const [leaveAdviceDrawer, setLeaveAdviceDrawer] = useState({ open: false });

  const [open, setOpen] = useState(false);

  const leaveAdviceRef = useRef();

  const handleCancel = () => {
    setOpen(false);
  };

  const deleteMutation = useDeletePendingLeave();

  const { userData } = useCurrentUser();
  const staff_id = userData?.data.STAFF_ID;
  const company_id = userData?.data.COMPANY_ID;

  const handleOk = (leave) => {
    const json = {
      company_id,
      staff_id,
      request_id: leave?.REQUEST_ID,
    };
    deleteMutation?.mutate(json, {
      onSuccess: (data) => {
        setOpen(false);
        successToast(data?.data?.message);
      },
      onError: (err) => {
        errorToast(err?.response?.data?.message ?? err?.message);
      },
    });
  };

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const activeTabStatus = tableData?.[0]?.status;

  const columns = useMemo(() => {
    if (activeTabStatus === "approved") {
      const remainingColums = initialColumns?.filter(
        (column) => column.uid !== "REQUEST_DATE"
      );
      const secondToLastIndex = remainingColums.length - 2;
      remainingColums.splice(secondToLastIndex, 0, {
        uid: "LEAVE ADVICE",
        name: "LEAVE ADVICE",
      });
      return remainingColums;
    }
    if (activeTabStatus === "unreturned") {
      const remainingColums = initialColumns?.filter(
        (column) => column.uid !== "REQUEST_DATE"
      );
      return remainingColums;
    }

    return initialColumns;
  }, [activeTabStatus]);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column?.uid)
    );
  }, [visibleColumns, columns]);

  const filteredItems = React.useMemo(() => {
    let filteredData =
      tableData?.length > 0
        ? tableData?.map((each, i) => {
            each.S_N = i + 1;

            return each;
          })
        : [];

    if (hasSearchFilter) {
      const value = filterValue?.toLowerCase();

      const searchTerms = value.toLowerCase().trim().split(" ");

      const updatedData = tableData?.filter((item) => {
        const fullName = `${item?.FIRST_NAME} ${item?.LAST_NAME}`.toLowerCase();

        const matches = [
          item?.FIRST_NAME?.toLowerCase(),
          item?.LAST_NAME?.toLowerCase(),
          item?.STAFF_NUMBER?.toLowerCase(),
          item?.LEAVE_NAME?.toLowerCase(),
          item?.department_name?.toLowerCase(),
          toStringDate(item?.commence_date)?.toLowerCase(),
          fullName,
        ].some((field) => field?.includes(value));

        const fullNameMatches = searchTerms.every((term) =>
          fullName.includes(term)
        );

        return matches || fullNameMatches;
      });

      filteredData = updatedData.length ? updatedData : [];
    }

    return filteredData;
  }, [tableData, hasSearchFilter, filterValue]);

  const pages = Math.ceil(filteredItems?.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems?.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return items?.sort((a, b) => {
      const first = a[sortDescriptor.column];

      console.log(first);
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const preview = React.useCallback((information) => {
    if (information) {
      setLeaveInformation(information);
      setLeaveAdviceDrawer({ open: true });
    }
  }, []);

  const downloadPDF = () => {
    const input = leaveAdviceRef.current;

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("Leave Advice.pdf");
    });
  };

  const renderCell = React.useCallback((leave, columnKey) => {
    const cellValue = leave[columnKey];
    switch (columnKey) {
      case "FIRST_NAME":
        return (
          <>
            <User
              avatarProps={{
                radius: "lg",
                src: leave?.FILE_NAME ? filePrefix + leave?.FILE_NAME : "",
              }}
              name={`${leave?.LAST_NAME || ""} ${leave?.FIRST_NAME || ""}`}
              classNames={{
                description: "max-w-48 truncate",
              }}
              description={leave?.DEPARTMENT}
            >
              {leave?.LAST_NAME} {leave?.FIRST_NAME}
            </User>
          </>
        );
      case "LAST_NAME":
        return <p>{cellValue}</p>;
      case "LEAVE_NAME":
        return <p>{cellValue}</p>;
      case "START_DATE":
        return (
          <p className="text-bold text-small capitalize">
            {leave?.status !== "approved"
              ? toStringDate(
                  leave?.SELECTED_DATES
                    ? leave?.SELECTED_DATES?.split(",")[0]
                    : cellValue
                )
              : leave?.SELECTED_DATES
              ? leave?.SELECTED_DATES?.split(",")[0]
              : cellValue}
          </p>
        );
      case "END_DATE":
        return (
          <p className="text-bold text-small capitalize">
            {leave?.status !== "approved"
              ? toStringDate(
                  leave?.SELECTED_DATES
                    ? leave?.SELECTED_DATES?.split(",")[
                        leave?.SELECTED_DATES?.split(",")?.length - 1
                      ]
                    : cellValue
                )
              : leave?.SELECTED_DATES
              ? leave?.SELECTED_DATES?.split(",")[
                  leave?.SELECTED_DATES?.split(",")?.length - 1
                ]
              : cellValue}
          </p>
        );
      case "REQUEST_DATE":
        return (
          <p className="text-bold text-small capitalize">
            {leave?.status !== "approved" ? toStringDate(cellValue) : cellValue}
          </p>
        );
      case "DURATION":
        return (
          <p className="text-bold text-small capitalize">
            {cellValue > 1 ? `${cellValue} days` : `${cellValue} day`}
          </p>
        );
      case "LEAVE ADVICE":
        return (
          <div className="flex justify-center font-helvetica items-center">
            <ActionIcons variant={"DOWNLOAD"} action={() => preview(leave)} />
          </div>
        );
      case "ACTIONS":
        return (
          <div>
            <div className="">
              {leave?.status === "pending" && (
                <div className="text-center flex gap-x-1 justify-center">
                  <ActionIcons
                    variant={"VIEW"}
                    action={() => viewDetails(leave)}
                  />

                  <ActionIcons
                    variant={"DELETE"}
                    action={() => {
                      Modal.confirm({
                        title: "Confirm",
                        content: "Are you sure to delete?",
                        footer: (_, { OkBtn, CancelBtn }) => (
                          <div className="flex gap-x-3">
                            <button
                              onClick={() => handleCancel()}
                              className="bg-btnColor px-6 py-2 header_h3 outline-none  text-white rounded hover:bg-btnColor/70 flex items-center"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleOk(leave)}
                              className="bg-red-400 px-6 py-2 header_h3 outline-none  text-white rounded hover:bg-red-400 flex items-center"
                            >
                              {deleteMutation?.isPending ? (
                                <Spinner color="default" size="sm" />
                              ) : null}
                              Confirm
                            </button>
                          </div>
                        ),
                      });
                    }}
                  />
                </div>
              )}
              {leave?.status === "declined" && (
                <div className="text-center ">
                  <ActionIcons
                    variant={"VIEW"}
                    action={() => viewDetails(leave)}
                  />
                </div>
              )}
              {leave?.status === "completed" && (
                <div className="text-center">
                  <ActionButton onClick={() => resume(leave)}>
                    Return
                  </ActionButton>
                </div>
              )}
              {(leave?.status === "approved" ||
                leave?.status === "pending_return") && (
                <div className="relative flex justify-center items-center gap-2">
                  <ActionIcons
                    variant={"VIEW"}
                    action={() => viewDetails(leave)}
                  />
                </div>
              )}
              {leave?.status === "unreturned" && (
                <div className="relative flex justify-center items-center gap-2">
                  <ActionIcons
                    variant={"VIEW"}
                    action={() => viewDetails(leave)}
                  />
                </div>
              )}
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
      <div className="flex justify-between items-end flex-col md:flex-row">
        <div>
          <Label>Search Here</Label>
          <Input
            allowClear
            placeholder="Search here..."
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="w-full max-w-md"
            size="large"
          />
        </div>
        <div className="flex gap-2">
          <div className="">
            <Label>From</Label>
            <DatePicker
              placeholder="Select Start Date"
              onChange={(e, dateString) => setStartDate(dateString)}
              className="h-8 w-full border outline-none focus:border-transparent rounded-md focus:outline-none md:col-span-2"
            />
          </div>
          <div className="">
            <Label htmlFor="to">To</Label>
            <DatePicker
              placeholder="Select End Date"
              onChange={(e, dateString) => setEndDate(dateString)}
              className="h-8  w-full border outline-none focus:border-transparent rounded-md focus:outline-none md:col-span-2"
            />
          </div>
        </div>
      </div>
    );
  }, [filterValue, setStartDate, setEndDate]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center font-medium">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems?.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
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
  }, [
    selectedKeys,
    filteredItems?.length,
    page,
    pages,
    onPreviousPage,
    onNextPage,
  ]);

  return (
    <Fragment>
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        isStriped
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[550px]",
        }}
        selectedKeys={selectedKeys}
        // selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        // topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
        className="lg:col-span-4"
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column?.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column?.sortable}
              className={`font-medium ${
                column?.uid === "actions" && "text-center"
              }`}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No leave found"}
          items={sortedItems}
          isLoading={isLoading}
          // loadingContent={}
        >
          {(item) => (
            <TableRow key={item?.REQUEST_ID}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Drawer
        open={leaveAdviceDrawer.open}
        onClose={() => setLeaveAdviceDrawer({ open: false })}
        placement="right"
        width={820}
        title={
          <div>
            <DownloadHeader downloadPDF={downloadPDF} />
          </div>
        }
      >
        <div>
          <LeaveAdvice request_detail={leaveInformation} ref={leaveAdviceRef} />
        </div>
      </Drawer>
    </Fragment>
  );
};
export default LeaveRequestTable;

LeaveRequestTable.propTypes = {
  handleOpenDrawer: PropTypes.func,
  tableData: PropTypes.array,
  columns: PropTypes.array,
};
