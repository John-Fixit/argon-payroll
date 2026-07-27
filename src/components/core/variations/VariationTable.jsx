/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import { Button, Modal, ConfigProvider, Input, Select } from "antd";
import { formatNumberWithComma, toStringDate } from "../../../utils/utitlities";
import ActionIcons from "../shared/ActionIcons";
import StarLoader from "../loaders/StarLoader";
import WorkInformationDrawer from "../../profile/profileDrawer/WorkInformationDrawer";
import PropTypes from "prop-types";
import { errorToast, successToast } from "../../../utils/toastMsgPop";
import {
  useRemoveVariationRequest,
  useSendForApproval,
} from "../../../API/variation";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { BsTrash } from "react-icons/bs";

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "STAFF NUMBER", uid: "staff_number", sortable: false },
  { name: "DIRECTORATE", uid: "directorate_name", sortable: false },
  { name: "DEPARTMENT", uid: "department_name", sortable: false },
  { name: "VARIATION NAME", uid: "variation_name", sortable: false },
  { name: "CURRENT PAYMENT(₦)", uid: "current_payment", sortable: false },
  { name: "PAST PAYMENT(₦)", uid: "past_payment", sortable: false },
  { name: "COMMENCE DATE", uid: "commence_date", sortable: false },
  { name: "ACTIONS", uid: "actions", sortable: false },
];

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "staff_number",
  "variation_name",
  "current_payment",
  "past_payment",
  "commence_date",
  "actions",
];
export default function VariationTable({
  incomingData,
  onViewDetail,
  isGettingDetail,
  currentRowID,
  currentTab,
  isLoading,
}) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );

  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "name",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { mutateAsync: mutateRemoveRequest, isPending: isRemovingRequest } =
    useRemoveVariationRequest();

  const {
    mutateAsync: mutateSendForApproval,
    isPending: isSendingForApproval,
  } = useSendForApproval();

  const tableData = incomingData?.map((item, index) => ({
    ...item,
    id: item?.request_id,
  }));

  const hasSearchFilter = Boolean(filterValue?.trim());

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from([
        ...visibleColumns,
        currentTab === "4" && "directorate_name",
        currentTab === "4" && "department_name",
      ]).includes(column.uid)
    );
  }, [visibleColumns, currentTab]);

  const filteredItems = React.useMemo(() => {
    let filteredData = tableData?.length ? [...tableData] : [];

    if (hasSearchFilter) {
      const value = filterValue?.toLowerCase();

      const searchTerms = value.toLowerCase().trim().split(" ");

      const updatedData = tableData?.filter((item) => {
        const fullName = `${item?.first_name} ${item?.last_name}`.toLowerCase();

        const matches = [
          item?.first_name?.toLowerCase(),
          item?.last_name?.toLowerCase(),
          item?.staff_number?.toLowerCase(),
          item?.variation_name?.toLowerCase(),
          item?.current_payment?.toLowerCase(),
          item?.past_payment?.toLowerCase(),
          item?.directorate_name?.toLowerCase(),
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

  const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      let first, second;

      switch (sortDescriptor.column) {
        case "name":
          first = `${a.first_name ?? ""} ${a.last_name ?? ""}`.toLowerCase();
          second = `${b.first_name ?? ""} ${b.last_name ?? ""}`.toLowerCase();
          break;

        default:
          first = a[sortDescriptor.column];
          second = b[sortDescriptor.column];
          break;
      }

      // Handle undefined/null gracefully
      if (first == null) first = "";
      if (second == null) second = "";

      // Use localeCompare for strings
      let cmp =
        typeof first === "string" && typeof second === "string"
          ? first.localeCompare(second)
          : first < second
          ? -1
          : first > second
          ? 1
          : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (user, columnKey, rowID) => {
      const cellValue = user[columnKey];
      switch (columnKey) {
        case "name":
          return (
            <div>
              <p className="w-32 font-helvetica text-[0.82rem] opacity-45 hyphens-auto overflow-hidden break-words uppercase">
                {user?.first_name} {user?.last_name}
              </p>
            </div>
          );
        case "staff_number":
          return (
            <p
              className={`capitalize font-helvetica text-[0.82rem] opacity-45`}
            >
              {cellValue}
            </p>
          );
        case "directorate_name":
          return (
            <p
              className={`capitalize font-helvetica text-[0.82rem] opacity-45`}
            >
              {cellValue}
            </p>
          );
        case "department_name":
          return (
            <p
              className={`capitalize font-helvetica text-[0.82rem] opacity-45`}
            >
              {cellValue}
            </p>
          );
        case "variation_name":
          return (
            <p
              className={`capitalize font-helvetica text-[0.82rem] opacity-45`}
            >
              {cellValue ?? "NIL"}
            </p>
          );
        case "current_payment":
          return (
            <p
              className={`capitalize font-helvetica text-[0.82rem] opacity-45`}
            >
              {formatNumberWithComma(Number(cellValue)) ?? "NIL"}
            </p>
          );
        case "past_payment":
          return (
            <p
              className={`capitalize font-helvetica text-[0.82rem] opacity-45 line-clamp-1`}
            >
              {formatNumberWithComma(Number(cellValue))}
            </p>
          );
        case "commence_date":
          return (
            <p
              className={`capitalize font-helvetica text-[0.82rem] opacity-45 line-clamp-2`}
            >
              {cellValue}
            </p>
          );

        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#00bcc2",
                  },
                }}
              >
                {isGettingDetail && currentRowID === rowID ? (
                  <StarLoader size={20} />
                ) : (
                  <ActionIcons
                    variant={"VIEW"}
                    action={() =>
                      onViewDetail(user?.request_id, "variation", rowID)
                    }
                  />
                )}
                {currentTab === "4" && ( // status code 4 is for draft
                  <ActionIcons
                    variant={"DELETE"}
                    action={() =>
                      handleRemoveRequest({ request_id: [user?.request_id] })
                    }
                  />
                )}
                {currentTab === "4" && ( // status code 4 is for draft
                  <Button
                    type="primary"
                    size="small"
                    onClick={() =>
                      handleSendForApprove({ request_id: [user?.request_id] })
                    }
                    className="text-xs"
                  >
                    Send for approval
                  </Button>
                )}
              </ConfigProvider>
            </div>
          );
        default:
          return cellValue;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentRowID, currentTab, isGettingDetail, onViewDetail]
  );

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
    const keys = tableData.map((item) => item.request_id);
    const requestIDs = selectedKeys === "all" ? keys : Array.from(selectedKeys);
    const json = {
      request_id: requestIDs,
    };

    return (
      <div>
        {selectedKeys?.size || selectedKeys === "all" ? (
          <div className="flex justify-between items-center transition-all">
            <div>
              <p className="text-[#00bcc2] capitalize">
                {selectedKeys?.size || selectedKeys} selected
              </p>
            </div>
            <div className="space-x-2 flex items-center">
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#00bcc2",
                  },
                }}
              >
                {currentTab === "4" && (
                  <Button
                    type="primary"
                    onClick={() => handleSendForApprove(json)}
                  >
                    Send for approval
                  </Button>
                )}
              </ConfigProvider>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#ef4444",
                  },
                }}
              >
                <Button
                  type="primary"
                  onClick={() => handleRemoveRequest(json)}
                >
                  <BsTrash />
                  Delete
                </Button>
              </ConfigProvider>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }, [currentTab, selectedKeys, tableData]);

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

  const handleRemoveRequest = (requestID) => {
    Modal.confirm({
      title: "Are you sure to delete this?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        await removeRequestExec(requestID);
      },
    });
  };

  const handleSendForApprove = (json) => {
    Modal.confirm({
      title: "Are you sure to continue this Approval?",
      icon: <ExclamationCircleFilled />,
      okText: "Confirm",
      okButtonProps: {},
      cancelText: "Cancel",
      async onOk() {
        await sendForApprovalRequestExec(json);
      },
    });
  };

  const removeRequestExec = async (payload) => {
    try {
      const res = await mutateRemoveRequest(payload);
      successToast(res?.data?.message);
      setSelectedKeys(new Set([]));
    } catch (err) {
      const errMsg = err?.response?.data?.message || err?.message;
      errorToast(errMsg);
    }
  };

  const sendForApprovalRequestExec = async (payload) => {
    try {
      const res = await mutateSendForApproval(payload);
      successToast(res?.data?.message);
      setSelectedKeys(new Set([]));
    } catch (err) {
      const errMsg = err?.response?.data?.message || err?.message;
      errorToast(errMsg);
    }
  };

  const handleChange = (value) => {
    setRowsPerPage(value);
  };

  return (
    <div className="w-full lg:max-w-[75vw]">
      <div className="bg-white p-3 rounded-xl space-y-2">
        <div className="flex justify-between items-center">
          <div>
            <Input
              allowClear
              value={filterValue}
              placeholder="Search here..."
              onChange={(e) => setFilterValue(e.target.value)}
              size="large"
            />
          </div>
          <div className="flex gap-x-3 my-auto items-center">
            <span className="font-helvetica">Rows per page:</span>
            <Select
              defaultValue="15"
              value={rowsPerPage}
              onChange={handleChange}
              options={[
                {
                  value: "15",
                  label: "15",
                },
                {
                  value: "25",
                  label: "25",
                },
                {
                  value: "50",
                  label: "50",
                },
                {
                  value: "100",
                  label: "100",
                },
              ]}
            />
          </div>
        </div>
        <Table
          isStriped
          aria-label="Example table with custom cells, pagination and sorting"
          isHeaderSticky
          topContent={topContent}
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          classNames={{
            wrapper: "max-h-[500px]",

            table: "w-full xl:!max-w-[95vw]",
          }}
          className="fontOswald"
          selectedKeys={selectedKeys}
          sortDescriptor={sortDescriptor}
          onSelectionChange={setSelectedKeys}
          onRowAction={() => {}}
          onSortChange={setSortDescriptor}
          selectionMode={currentTab !== "5" && "multiple"}
        >
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "start" : "start"}
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
                  <TableCell>{renderCell(item, columnKey, item.id)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {isDrawerOpen && (
        <WorkInformationDrawer
          isOpen={isDrawerOpen}
          setIsOpen={setIsDrawerOpen}
        />
      )}
    </div>
  );
}

VariationTable.propTypes = {
  incomingData: PropTypes.array,
  onViewDetail: PropTypes.func,
  isGettingDetail: PropTypes.bool,
  isLoading: PropTypes.bool,
  currentRowID: PropTypes.any,
  currentTab: PropTypes.string,
};
