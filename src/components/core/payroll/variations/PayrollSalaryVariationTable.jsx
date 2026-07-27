/* eslint-disable no-unused-vars */
import React, { useCallback, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import { Button, Modal, ConfigProvider, Input, Select, DatePicker } from "antd";
import PropTypes from "prop-types";
import { ExclamationCircleFilled } from "@ant-design/icons";
import StarLoader from "../../loaders/StarLoader";
import {
  formatNumberWithComma,
  toStringDate,
} from "../../../../utils/utitlities";
import ActionIcons from "../../shared/ActionIcons";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import { useOnboardVariation } from "../../../../API/payroll";
import {
  useCancelArrears,
  useRemoveArrears,
  useRunArrears,
} from "../../../../API/variation";
import { useGetAllAllowances } from "../../../../API/allowance";
import { errorToast, successToast } from "../../../../utils/toastMsgPop";
import dayjs from "dayjs";
import { MdRemoveDone } from "react-icons/md";

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "", uid: "selector", sortable: false },
  { name: "NAME", uid: "name", sortable: false },
  { name: "STAFF NUMBER", uid: "staff_number", sortable: false },
  { name: "VARIATION NAME", uid: "variation_name", sortable: false },
  { name: "CURRENT PAYMENT(₦)", uid: "current_payment", sortable: false },
  { name: "PAST PAYMENT(₦)", uid: "past_payment", sortable: false },
  { name: "COMMENCE DATE", uid: "commence_date", sortable: false },
  { name: "ACTIONS", uid: "actions", sortable: false },
];

const INITIAL_VISIBLE_COLUMNS = [
  "selector",
  "name",
  "staff_number",
  "variation_name",
  "current_payment",
  "past_payment",
  "commence_date",
  "actions",
];
export default function PayrollSalaryVariationTable({
  incomingData,
  onViewDetail,
  isGettingDetail,
  currentRowID,
  isLoading,
  currentTab,
  selectedDate,
  setSelectedDate,
  setSelectedMonth,
  setSelectedYear,
}) {
  const [filterValue, setFilterValue] = React.useState("");

  const [selectedVariationName, setSelectedVariationName] = React.useState("");

  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );

  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const { userData } = useCurrentUser();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleEditClick = () => {
    setIsDrawerOpen(true);
  };

  const { mutateAsync: mutateOnboardVariation, isPending: isRemovingRequest } =
    useOnboardVariation();

  const { mutateAsync: mutateRunArrears, isPending: isRunningArrears } =
    useRunArrears();
  const { mutateAsync: mutateCancelArrears, isPending: isCancellingArrears } =
    useCancelArrears();
  const { mutateAsync: mutateRemoveArrears, isPending: isRemovingArrears } =
    useRemoveArrears();

  const tableData = incomingData?.map((item, index) => ({
    ...item,
    selection_value: item?.id,
  }));

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredData = tableData?.length ? [...tableData] : [];

    // Filter by variation name first
    if (selectedVariationName && selectedVariationName !== "all") {
      filteredData = filteredData.filter(
        (item) => item?.variation_name === selectedVariationName
      );
    }

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
  }, [tableData, hasSearchFilter, filterValue, selectedVariationName]);

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

  const executeRequestFunction = useCallback(
    async (json, type) => {
      const payloadBody = {
        ...json,
        company_id: userData?.data?.COMPANY_ID,
        staff_id: userData?.data?.STAFF_ID,
      };

      try {
        const res =
          type === "add_to_payroll"
            ? await mutateOnboardVariation(payloadBody)
            : type === "run_arrears"
            ? await mutateRunArrears(payloadBody)
            : type === "cancel_arrears"
            ? await mutateCancelArrears(payloadBody)
            : type === "remove_arrears"
            ? await mutateRemoveArrears(payloadBody)
            : null;
        successToast(res?.data?.message);
        setSelectedKeys(new Set([]));
        window.location.reload();
      } catch (err) {
        const errMsg = err?.response?.data?.message || err?.message;
        errorToast(errMsg);
      }
    },
    [
      mutateCancelArrears,
      mutateOnboardVariation,
      mutateRunArrears,
      mutateRemoveArrears,
      userData?.data?.COMPANY_ID,
      userData?.data?.STAFF_ID,
    ]
  );

  const handleAddToPayroll = useCallback(
    (requestID) => {
      Modal.confirm({
        title: "Are you sure to continue with this action?",
        icon: <ExclamationCircleFilled />,
        okText: "Confirm",
        cancelText: "Cancel",
        async onOk() {
          await executeRequestFunction(requestID, "add_to_payroll");
        },
      });
    },
    [executeRequestFunction]
  );
  const handleRunArrears = useCallback(
    (requestID) => {
      Modal.confirm({
        title: "Are you sure to continue Running the Arrears?",
        icon: <ExclamationCircleFilled />,
        okText: "Confirm",
        cancelText: "Cancel",
        async onOk() {
          await executeRequestFunction(requestID, "run_arrears");
        },
      });
    },
    [executeRequestFunction]
  );
  const handleCancelArrears = useCallback(
    (requestID) => {
      Modal.confirm({
        title: "Are you sure to cancel the Running Arrears?",
        icon: <ExclamationCircleFilled />,
        okText: "Cancel",
        okButtonProps: { danger: true },
        cancelText: "Cancel",
        async onOk() {
          await executeRequestFunction(requestID, "cancel_arrears");
        },
      });
    },
    [executeRequestFunction]
  );
  const handleRemoveArrears = useCallback(
    (requestID) => {
      Modal.confirm({
        title: "Are you sure to Remove the selected Arrears?",
        icon: <ExclamationCircleFilled />,
        okText: "Remove",
        okButtonProps: { danger: true },
        cancelText: "Cancel",
        async onOk() {
          await executeRequestFunction(requestID, "remove_arrears");
        },
      });
    },
    [executeRequestFunction]
  );

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
              className={`capitalize w-48 font-helvetica text-[0.82rem] opacity-45 line-clamp-1`}
            >
              {formatNumberWithComma(Number(cellValue))}
            </p>
          );
        case "commence_date":
          return (
            <p
              className={`capitalize max-w-[14rem] font-helvetica text-[0.82rem] opacity-45 line-clamp-2`}
            >
              {cellValue}
            </p>
          );

        case "actions":
          return (
            <div className="relative flex items-center gap-2">
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
              {!(selectedKeys?.size || selectedKeys === "all") ? (
                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: "#00bcc2",
                    },
                  }}
                >
                  {currentTab === "1" ? (
                    <Button
                      size="small"
                      onClick={() =>
                        handleAddToPayroll({ variation_id: [user?.id] })
                      }
                      className="text-xs"
                      type="primary"
                    >
                      Add to payroll
                    </Button>
                  ) : currentTab === "2" && !user?.is_arrears_calculated ? (
                    <Button
                      size="small"
                      onClick={() =>
                        handleRunArrears({ variation_id: [user?.id] })
                      }
                      className="text-xs"
                      type="primary"
                    >
                      Run Arrears
                    </Button>
                  ) : (
                    ""
                  )}
                  {currentTab === "2" ? (
                    <Button
                      size="small"
                      onClick={() =>
                        handleCancelArrears({ variation_id: [user?.id] })
                      }
                      className="text-xs"
                      // type="primary"
                      danger
                    >
                      Cancel Arrears
                    </Button>
                  ) : currentTab === "3" &&
                    dayjs(user?.date_on_payroll).isSame(dayjs(), "month") ? (
                    !user?.is_arrears_cancelled ? (
                      <Button
                        size="small"
                        onClick={() =>
                          handleRemoveArrears({ variation_id: [user?.id] })
                        }
                        className="text-xs"
                        danger
                        disabled={
                          !dayjs(user?.date_on_payroll).isSame(dayjs(), "month")
                        }
                      >
                        Remove Arrears
                      </Button>
                    ) : (
                      ""
                    )
                  ) : (
                    //this is for the past months
                    <Button
                      size="small"
                      onClick={() =>
                        handleRemoveArrears({ variation_id: [user?.id] })
                      }
                      className="text-xs"
                      danger
                      disabled={
                        !dayjs(user?.date_on_payroll).isSame(dayjs(), "month")
                      }
                    >
                      Remove Arrears
                    </Button>
                  )}
                </ConfigProvider>
              ) : (
                ""
              )}
            </div>
          );

        default:
          return cellValue;
      }
    },
    [
      currentRowID,
      currentTab,
      handleAddToPayroll,
      handleCancelArrears,
      handleRunArrears,
      isGettingDetail,
      handleRemoveArrears,
      onViewDetail,
      selectedKeys,
    ]
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

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const variationOptions = useMemo(() => {
    const uniqueVariations = [
      ...new Set(incomingData.map((item) => item.variation_name)),
    ];
    return uniqueVariations.map((variation) => ({
      value: variation,
      label: variation,
    }));
  }, [incomingData]);

  const topContent = React.useMemo(() => {
    const keys = tableData
      ?.filter((item) =>
        currentTab === "1" ? true : item?.is_arrears_calculated
      )
      .map((item) => item.selection_value);
    const requestIDs = selectedKeys === "all" ? keys : Array.from(selectedKeys);
    const json = {
      variation_id: requestIDs,
    };

    // Disable dates before 2020
    const disabledDate = (current) => {
      return (
        current &&
        (current.year() < 2020 || current.year() > new Date().getFullYear())
      );
    };
    const handleChange = (date) => {
      setSelectedDate(date);
      setSelectedMonth(date.format("M"));
      setSelectedYear(date.format("YYYY"));
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
                {currentTab === "1" ? (
                  <Button
                    type="primary"
                    onClick={() => handleAddToPayroll(json)}
                  >
                    Add to payroll
                  </Button>
                ) : currentTab === "2" ? (
                  <>
                    <Button
                      type="primary"
                      onClick={() => handleRunArrears(json)}
                    >
                      Run Arrears
                    </Button>
                    <Button
                      onClick={() => handleCancelArrears(json)}
                      type="primary"
                      danger
                    >
                      Cancel Arrears
                    </Button>
                  </>
                ) : (
                  currentTab === "3" && (
                    <Button
                      onClick={() => handleRemoveArrears(json)}
                      type="primary"
                      danger
                    >
                      Remove Arrears
                    </Button>
                  )
                )}
              </ConfigProvider>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="flex justify-between items-center">
          <div className="flex gap-6">
            <Input
              allowClear
              value={filterValue}
              placeholder="Search here..."
              onChange={(e) => setFilterValue(e.target.value)}
              className="w-full max-wmd"
              size="large"
            />
            {currentTab === "3" && (
              <>
                <DatePicker
                  picker="month"
                  value={selectedDate}
                  onChange={handleChange}
                  disabledDate={disabledDate}
                  format="MMMM YYYY"
                  placeholder="Select month and year"
                  style={{ width: "350px" }}
                  size={"large"}
                />
                <Select
                  defaultValue="15"
                  value={selectedVariationName}
                  placeholder="filter by variation name"
                  onChange={(value) => setSelectedVariationName(value)}
                  options={variationOptions}
                  style={{ width: "350px" }}
                  size="large"
                  allowClear
                />
              </>
            )}
          </div>
          <div className="flex justify-between items-center">
            <label className="flex items-center text-default-400 text-small">
              Rows per page:
              <select
                className="bg-transparent outline-none text-default-400 text-small"
                onChange={onRowsPerPageChange}
                value={rowsPerPage}
              >
                <option value="20">20</option>
                <option value="500">50</option>
                <option value="100">100</option>
                <option value={filteredItems?.length}>All</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    );
  }, [
    tableData,
    selectedKeys,
    currentTab,
    filterValue,
    onRowsPerPageChange,
    rowsPerPage,
    filteredItems?.length,
    handleAddToPayroll,
    handleRunArrears,
    handleCancelArrears,
    selectedDate,
    setSelectedDate,
    setSelectedMonth,
    setSelectedYear,
  ]);

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

  // console.log(Array.from(selectedKeys));

  // console.log(sortedItems);

  return (
    <>
      <Table
        isStriped
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        topContent={topContent}
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        className="fontOswald"
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
        selectionMode={"multiple"}
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        classNames={{
          wrapper: "max-h-[50rem]",
          tr: "[&[data-disabled=true]]:!opacity-100 [&[data-disabled=true]]:!cursor-pointer [&[data-disabled=true][data-odd=true]]:!bg-default-100 [&[data-disabled=true][data-even=true]]:!bg-white [&[data-disabled=true]_td]:!text-foreground",
        }}
        disabledKeys={React.useMemo(() => {
          return currentTab === "1"
            ? []
            : currentTab === "3"
            ? sortedItems
                .filter(
                  (item) =>
                    !dayjs(item.date_on_payroll).isSame(dayjs(), "month")
                )
                .map((item) => item?.selection_value?.toString())
            : sortedItems
                .filter((item) => item?.is_arrears_calculated)
                .map((item) => item?.selection_value?.toString());
        }, [currentTab, sortedItems])}
        onRowAction={() => {}}
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
    </>
  );
}

PayrollSalaryVariationTable.propTypes = {
  incomingData: PropTypes.array,
  onViewDetail: PropTypes.func,
  isGettingDetail: PropTypes.bool,
  isLoading: PropTypes.bool,
  currentRowID: PropTypes.string,
  currentTab: PropTypes.string,
};
