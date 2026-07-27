/* eslint-disable react-hooks/exhaustive-deps */
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
  Avatar,
  User,
  Tooltip,
} from "@nextui-org/react";
import { Button, Modal, ConfigProvider, Input } from "antd";
import PropTypes from "prop-types";
import StarLoader from "../../loaders/StarLoader";
import {
  formatNumberWithComma,
  toStringDate,
} from "../../../../utils/utitlities";
import { ca } from "date-fns/locale";
import ActionIcons from "../../shared/ActionIcons";
import { IoIosRefreshCircle } from "react-icons/io";
import { MdDelete, MdOutlineRefresh } from "react-icons/md";
import { BsExclamationCircleFill } from "react-icons/bs";
import { errorToast, successToast } from "../../../../utils/toastMsgPop";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import {
  useDelete13thMonthStaff,
  useRefresh13thMonthStaff,
} from "../../../../API/payroll_staff";

// Emp No, Title, name, Address, gender, Region, Date Employed, Division Name, Grade, Step, Rank Name, Action

//         "nhf_no" :"",
//         "bank" :"",
//         "account_no" :"",
//         "designation" :"",
//         "department" :"",
//         "pfa" :"",
//         "pension_no" :"",
//         "state" :"",
// "appointment_date" :"",
//         "tin_no":"",
//         "region":""

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: false },
  { name: "STAFF NO", uid: "empno", sortable: false },
  { name: "SUM PAY", uid: "sum_pay", sortable: false },
  { name: "GRADE", uid: "grade", sortable: false },
  { name: "STEP", uid: "step", sortable: false },
  { name: "ACTIONS", uid: "actions", sortable: false },
];

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "empno",
  "sum_pay",
  "grade",
  "step",
  "actions",
];
export default function StaffThirteenthMonthTable({
  incomingData,
  isLoading,
  viewDetails,
  recalculate,
  isFetchingOverview,
}) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );

  const { userData } = useCurrentUser();
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "",
    direction: "ascending",
  });

  const { mutateAsync: refresh13Month, isPending: isRefreshing } =
    useRefresh13thMonthStaff();

  const { mutateAsync: delete13Month, isPending: isDeleting } =
    useDelete13thMonthStaff();

  const [page, setPage] = React.useState(1);

  const tableData = incomingData?.map((item, index) => ({
    ...item,
    id: item?.staff_id,
  }));

  const [rowId, setRowId] = React.useState(null);

  const hasSearchFilter = Boolean(filterValue);

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
          item?.fullname?.toString()?.toLowerCase(),
          item?.empno?.toString()?.toLowerCase(),
          item?.grade?.toString().toLowerCase(),
          item?.step?.toString().toLowerCase(),
          item?.sum_pay?.toString().toLowerCase(),
          item?.STAFF_ID?.toString()?.toLowerCase(),
          item?.staff_id?.toString()?.toLowerCase(),
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

  const startViewDetails = (data) => {
    setRowId(data?.id);
    viewDetails(data);
  };

  console.log(selectedKeys.size);

  const renderCell = React.useCallback(
    (user, columnKey, rowId, isFetchingOverview) => {
      const cellValue = user[columnKey];
      switch (columnKey) {
        case "name":
          return (
            <div>
              <p className="font-helvetica text-[0.82rem] opacity-45 hyphens-auto overflow-hidden  uppercase">
                <User
                  name={user?.fullname}
                  className="font-helvetica"
                  classNames={{
                    name: "font-helvetica",
                  }}
                />
              </p>
            </div>
          );
        case "empno":
        case "state":
        case "bank_name":
        case "account_no":
        case "grade":
        case "step":
        case "REGION_NAME":
          return (
            <p className={`capitalize font-helvetica text-[0.82rem]`}>
              {cellValue}
            </p>
          );
        case "nhf_no":
        case "pfa_code":
          return (
            <p
              className={`capitalize font-helvetica text-[0.82rem] opacity-45`}
            >
              {cellValue ?? "NIL"}
            </p>
          );
        case "sum_pay":
          return (
            <p
              className={`capitalize font-helvetica text-[0.82rem] opacity-45`}
            >
              {formatNumberWithComma(Number(cellValue)) ?? "NIL"}
            </p>
          );
        case "date_added":
          return (
            <p
              className={`capitalize w-40 font-helvetica text-[0.82rem] opacity-45 line-clamp-1`}
            >
              {cellValue ? toStringDate(cellValue) : "NIL"}
              {/* toStringDate(cellValue) */}
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
              {!(selectedKeys.size || selectedKeys === "all") && (
                <Tooltip content="Refresh Staff">
                  <div className="hover:bg-gray-200/50 p-1 rounded-lg transition-all duration-100 cursor-pointer ">
                    <MdOutlineRefresh
                      size={28}
                      className={"text-green-600 p-1"}
                      onClick={() =>
                        handleSetSelectedRecord(
                          "refresh",
                          [user?.staff_id],
                          user?.payroll_run_id
                        )
                      }
                    />
                  </div>
                </Tooltip>
              )}
              {isFetchingOverview && rowId === user?.id ? (
                <StarLoader size={20} />
              ) : (
                <ActionIcons
                  variant={"VIEW"}
                  action={() => startViewDetails(user)}
                />
              )}

              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#00bcc2",
                  },
                }}
              >
                <Button
                  size="small"
                  onClick={() => recalculate(user)}
                  className="text-xs font-helvetica rounded"
                  type="primary"
                >
                  Re-calculate
                </Button>
                {!(selectedKeys.size || selectedKeys === "all") && (
                  <Tooltip content="Delete Staff">
                    <div className="hover:bg-gray-200/50 p-1 rounded-lg transition-all duration-100 cursor-pointer ">
                      <MdDelete
                        size={28}
                        className={"text-red-600 p-1"}
                        onClick={() =>
                          handleSetSelectedRecord(
                            "delete",
                            [user?.staff_id],
                            user?.payroll_run_id
                          )
                        }
                      />
                    </div>
                  </Tooltip>
                )}
              </ConfigProvider>
            </div>
          );

        default:
          return cellValue;
      }
    },
    [selectedKeys.size]
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

  const [selectedRecord, setSelectedRecord] = useState({});

  const handleSetSelectedRecord = (action, staff_ids, payroll_run_id) => {
    setSelectedRecord({
      isOpenConfirmModal: true,
      action,
      staff_ids,
      payroll_run_id,
    });
  };

  const handleRefresh = async () => {
    if (
      !selectedRecord.staff_ids &&
      !selectedRecord.payroll_run_id &&
      !selectedRecord.action
    )
      return;

    const action = selectedRecord.action;
    const json = {
      staff_id: selectedRecord.staff_ids,
      company_id: userData.COMPANY_ID,
      payroll_run_id: selectedRecord.payroll_run_id,
    };

    const mutationAction =
      action === "refresh" ? refresh13Month : delete13Month;
    try {
      const res = await mutationAction(json);
      if (res) {
        successToast(res?.data?.message || "successful!");
      }
    } catch (error) {
      const errmSG = error?.response?.data?.message || error.message;
      errorToast(errmSG);
    }
  };

  const handleCloseConfirmModal = () => {
    setSelectedRecord({
      isOpenConfirmModal: false,
    });
  };

  const topContent = React.useMemo(() => {
    const keys = tableData.map((item) => item.staff_id);
    const staffIDs = selectedKeys === "all" ? keys : Array.from(selectedKeys);
    return (
      <div className="flex justify-between gap-3">
        <div className="flex-1">
          <Input
            allowClear
            value={filterValue}
            placeholder="Search here..."
            onChange={(e) => setFilterValue(e.target.value)}
            className="max-w-sm"
            size="large"
          />
        </div>
        {selectedKeys.size || selectedKeys === "all" ? (
          <div className="flex items-center gap-4">
            <Tooltip content="Refresh">
              <Button
                onClick={() =>
                  handleSetSelectedRecord(
                    "refresh",
                    staffIDs,
                    tableData?.[0]?.payroll_run_id
                  )
                }
                size="small"
                className="bg-green-600 text-white hover:bg-green-600 hover:text-white"
              >
                <MdOutlineRefresh size={30} className={"p-1"} />
                Refresh
              </Button>
            </Tooltip>
            <Tooltip content="Delete">
              <Button
                onClick={() =>
                  handleSetSelectedRecord(
                    "delete",
                    staffIDs,
                    tableData?.[0]?.payroll_run_id
                  )
                }
                size="small"
                className="bg-red-600 text-white hover:bg-red-600 hover:text-white"
              >
                <MdDelete size={25} className={"p-1"} />
                Delete
              </Button>
            </Tooltip>
          </div>
        ) : null}
      </div>
    );
  }, [selectedKeys, tableData, filterValue]);

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
          topContent={topContent}
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          classNames={{
            wrapper: "max-h-[50rem] py-5 ", //max-w-[1000px]
          }}
          className="fontOswald mt-10"
          selectedKeys={selectedKeys}
          sortDescriptor={sortDescriptor}
          onSelectionChange={setSelectedKeys}
          onSortChange={setSortDescriptor}
          selectionMode={"multiple"}
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
              <TableRow key={item.id} className="font-helvetica">
                {(columnKey) => (
                  <TableCell className="!font-helvetica">
                    {renderCell(item, columnKey, rowId, isFetchingOverview)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </>

      <Modal
        maskClosable={false}
        title={
          <BsExclamationCircleFill size={15} className="text-red-600 mb-2" />
        }
        open={selectedRecord.isOpenConfirmModal}
        okType="primary"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="faded" size="sm" onClick={handleCloseConfirmModal}>
              Cancel
            </Button>
            <Button
              className="bg-primary text-white"
              size="sm"
              onClick={handleRefresh}
              loading={isRefreshing || isDeleting}
            >
              Confirm
            </Button>
          </div>
        }
      >
        <div className="mt-4">
          <p className="text-lg font-semibold text-gray-800 mb-2">
            Confirm Action
          </p>
          <p className="text-sm text-gray-600">
            Are you sure you want to proceed? This action cannot be undone.
          </p>
        </div>
      </Modal>
    </>
  );
}

StaffThirteenthMonthTable.propTypes = {
  incomingData: PropTypes.array,
  isLoading: PropTypes.bool,
  viewDetails: PropTypes.func,
  recalculate: PropTypes.func,
  isFetchingOverview: PropTypes.bool,
};
