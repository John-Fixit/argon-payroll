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
import { Button, Modal, ConfigProvider, Input } from "antd";
import PropTypes from "prop-types";
import { ExclamationCircleFilled } from "@ant-design/icons";
import StarLoader from "../../loaders/StarLoader";
import {
  formatNaira,
  formatNumberWithComma,
  toStringDate,
} from "../../../../utils/utitlities";
import ActionIcons from "../../shared/ActionIcons";
import { errorToast, successToast } from "../../../../utils/toastMsgPop";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import { useOnboardVariation } from "../../../../API/payroll";

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: false },
  { name: "STAFF NUMBER", uid: "staff_number", sortable: false },
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
export default function AuditVariationTable({
  incomingData,
  onViewDetail,
  isGettingDetail,
  currentRowID,
  isLoading,
}) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );

  const [rowsPerPage, setRowsPerPage] = React.useState(15);
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

  const tableData = incomingData?.map((item, index) => ({
    ...item,
    id: item?.request_id,
  }));

  const hasSearchFilter = Boolean(filterValue?.trim());

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

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
              {/* {!(selectedKeys?.size || selectedKeys === "all") ? (
                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: "#00bcc2",
                    },
                  }}
                >
                  <Button
                    size="small"
                    onClick={() =>
                      handleAddToPayroll({ variation_id: [user?.request_id] })
                    }
                    className="text-xs"
                    type="primary"
                  >
                    Add to payroll
                  </Button>
                </ConfigProvider>
              ) : (
                ""
              )} */}
            </div>
          );

        default:
          return cellValue;
      }
    },
    [currentRowID, isGettingDetail, onViewDetail, selectedKeys]
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
      variation_id: requestIDs,
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
                <Button type="primary" onClick={() => handleAddToPayroll(json)}>
                  Add to payroll
                </Button>
              </ConfigProvider>
            </div>
          </div>
        ) : (
          ""
        )}
        <div>
          <Input
            allowClear
            value={filterValue}
            placeholder="Search here..."
            onChange={(e) => setFilterValue(e.target.value)}
            className="w-full max-w-md"
            size="large"
          />
        </div>
      </div>
    );
  }, [selectedKeys, tableData]);

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

  const handleAddToPayroll = (requestID) => {
    Modal.confirm({
      title: "Are you sure to continue with this action?",
      icon: <ExclamationCircleFilled />,
      okText: "Confirm",
      cancelText: "Cancel",
      async onOk() {
        await addToPayrollRequestExec(requestID);
      },
    });
  };

  const addToPayrollRequestExec = async (json) => {
    const payloadBody = {
      ...json,
      company_id: userData?.data?.COMPANY_ID,
      staff_id: userData?.data?.STAFF_ID,
    };
    try {
      const res = await mutateOnboardVariation(payloadBody);
      successToast(res?.data?.message);
      setSelectedKeys(new Set([]));
    } catch (err) {
      const errMsg = err?.response?.data?.message || err?.message;
      errorToast(errMsg);
    }
  };

  return (
    <>
      <>
        <Table
          isStriped
          aria-label="Example table with custom cells, pagination and sorting"
          isHeaderSticky
          topContent={topContent}
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          classNames={{
            wrapper: "max-h-[50rem]",
          }}
          className="fontOswald"
          selectedKeys={selectedKeys}
          sortDescriptor={sortDescriptor}
          onSelectionChange={setSelectedKeys}
          onSortChange={setSortDescriptor}
          //   selectionMode="multiple"
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
    </>
  );
}

AuditVariationTable.propTypes = {
  incomingData: PropTypes.array,
  onViewDetail: PropTypes.func,
  isGettingDetail: PropTypes.bool,
  isLoading: PropTypes.bool,
  currentRowID: PropTypes.string,
  currentTab: PropTypes.string,
};
