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
} from "@nextui-org/react";
import { Button, Modal, ConfigProvider, Input } from "antd";
import PropTypes from "prop-types";
import StarLoader from "../../loaders/StarLoader";
import {
  formatNumberWithComma,
  toStringDate,
} from "../../../../utils/utitlities";
import { errorToast, successToast } from "../../../../utils/toastMsgPop";
import {
  useAddMultipleStaffToPayroll,
  useAddStaffToPayroll,
} from "../../../../API/payroll_staff";
import ActionIcons from "../../shared/ActionIcons";
import ExpandedDrawerWithButton from "../../../modals/ExpandedDrawerWithButton";
import FormDrawer from "../../../payroll_components/FormDrawer";
import DefaultDetails from "../../../../pages/Approval/DefaultDetails";
import AttachmentDetailsApproval from "../../approvals/AttachmentDetailsApproval";
import NoteDetailsApproval from "../../approvals/NoteDetailsApproval";
import ApprovalHistory from "../../../../pages/Approval/ApprovalHistory";
import { useGetRequestDetail } from "../../../../API/api_urls/my_approvals";
import { ExclamationCircleFilled } from "@ant-design/icons";
import useCurrentUser from "../../../../hooks/useCurrentUser";

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: false },
  { name: "EMPLOYEE NUMBER", uid: "EMPLOYEE_NO", sortable: false },
  {
    name: "CURRENT APPOINTMENT DATE",
    uid: "CURRENT_APPOINTMENT_DATE",
    sortable: false,
  },
  { name: "ACTIONS", uid: "actions", sortable: false },
];

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "EMPLOYEE_NO",
  "CURRENT_APPOINTMENT_DATE",
  "actions",
];
export default function AwaitingMemberStaffTable({
  incomingData,
  isLoading,
  tab,
}) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );

  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "",
    direction: "ascending",
  });
  const [currentStaff, setCurrentStaff] = React.useState(null);

  const [details, setDetails] = useState({
    approvers: [],
    attachments: [],
    data: null,
    notes: [],
    requestID: null,
  });

  const { userData } = useCurrentUser();

  const [openViewStaffDrawer, setOpenViewStaffDrawer] = useState(false);

  const { mutateAsync: mutateAdd, isPending: isAdding } =
    useAddStaffToPayroll(tab);

  const { mutateAsync: mutateAddMultiple, isPending: isAddingMultiple } =
    useAddMultipleStaffToPayroll();

  const { mutate: getDetails, isPending: isGettingDetail } =
    useGetRequestDetail();

  const [page, setPage] = React.useState(1);

  const tableData = incomingData?.map((item, index) => ({
    ...item,
    id: item?.STAFF_ID,
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

    if (hasSearchFilter) {
      const value = filterValue?.toLowerCase();

      const searchTerms = value.toLowerCase().trim().split(" ");

      const updatedData = tableData?.filter((item) => {
        const fullName = `${item?.first_name} ${item?.last_name}`.toLowerCase();

        const matches = [
          item?.EMPLOYEE_NO?.toString()?.toLowerCase(),
          item?.CURRENT_APPOINTMENT_DATE?.toString()?.toLowerCase(),
          item?.FIRST_NAME?.toString()?.toLowerCase(),
          item?.LAST_NAME?.toString()?.toLowerCase(),
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

  const executeAddStaffToPayroll = async (json) => {
    setCurrentStaff(json?.STAFF_ID);
    try {
      const res = await mutateAdd(json?.STAFF_ID);
      successToast(res?.data?.message || "successful!");
    } catch (err) {
      const errMsg = err?.response?.data?.message || err?.message;
      errorToast(errMsg);
    }
  };

  const addStaffToPayroll = (json) => {
    Modal.confirm({
      title: (
        <p className="font-light">
          Are you sure to Add{" "}
          <span className="font-semibold">
            {json?.FIRST_NAME} {json?.LAST_NAME}
          </span>{" "}
          to Payroll?
        </p>
      ),
      icon: <ExclamationCircleFilled />,
      okText: "Add to Payroll",
      cancelText: "Cancel",
      async onOk() {
        await executeAddStaffToPayroll(json);
      },
    });
  };

  const handleViewStaff = (action, staff) => {
    setCurrentStaff(staff?.STAFF_ID);
    const requestID = staff?.REQUEST_ID;

    getDetails(
      { request_id: requestID },
      {
        onSuccess: (data) => {
          const value = data?.data?.data;
          const approvers = value?.approvers;
          const attachments = value?.attachments;
          const requestData = value?.data;
          const notes = value?.notes;

          setDetails({
            ...details,
            approvers,
            attachments,
            notes,
            data: requestData,
            requestID: requestID,
          });

          setOpenViewStaffDrawer(true);
        },
        onError: (err) => {
          errorToast(err?.response?.data?.message || err?.message);
        },
      }
    );
  };

  const renderCell = React.useCallback(
    (user, columnKey, currentStaff, isAdding) => {
      const cellValue = user[columnKey];
      switch (columnKey) {
        case "name":
          return (
            <div>
              <p className="font-helvetica text-[0.82rem] opacity-45 hyphens-auto overflow-hidden  uppercase">
                <User
                  name={user?.LAST_NAME + " " + user?.FIRST_NAME}
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
        case "current_payment":
          return (
            <p
              className={`capitalize font-helvetica text-[0.82rem] opacity-45`}
            >
              {formatNumberWithComma(Number(cellValue)) ?? "NIL"}
            </p>
          );
        case "CURRENT_APPOINTMENT_DATE":
          return (
            <p
              className={`capitalize  font-helvetica text-[0.82rem] opacity-45 line-clamp-1`}
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
              {isGettingDetail && currentStaff === user?.STAFF_ID ? (
                <StarLoader size={20} />
              ) : (
                <ActionIcons
                  variant={"VIEW"}
                  action={() => handleViewStaff("view", user)}
                />
              )}
              {isAdding && currentStaff === user?.STAFF_ID ? (
                <StarLoader size={20} />
              ) : (
                !(selectedKeys?.size || selectedKeys === "all") && (
                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: "#00bcc2",
                      },
                    }}
                  >
                    <Button
                      size="small"
                      onClick={() => addStaffToPayroll(user)}
                      className="text-xs font-helvetica"
                      type="primary"
                    >
                      Add staff to payroll
                    </Button>
                  </ConfigProvider>
                )
              )}
            </div>
          );

        default:
          return cellValue;
      }
    },
    [isGettingDetail, selectedKeys]
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

  const executeAddMultipleStaffToPayroll = async (json) => {
    try {
      const res = await mutateAddMultiple(json);
      successToast(res?.data?.message || "successful!");
    } catch (err) {
      const errMsg = err?.response?.data?.message || err?.message;
      errorToast(errMsg);
    }
  };

  const topContent = React.useMemo(() => {
    const keys = tableData.map((item) => item.STAFF_ID);

    const staffIDs = selectedKeys === "all" ? keys : Array.from(selectedKeys);

    const handleAddMultipToPayroll = async () => {
      const json = {
        company_id: userData?.data?.COMPANY_ID,
        staff_id: staffIDs,
      };
      Modal.confirm({
        title: (
          <p className="">Are you sure to Add the Selected Staff to Payroll?</p>
        ),
        icon: <ExclamationCircleFilled />,
        okText: "Add to Payroll",
        cancelText: "Cancel",
        async onOk() {
          await executeAddMultipleStaffToPayroll(json);
        },
      });
    };

    return (
      <div>
        <div className="flex justify-between items-center">
          <Input
            allowClear
            value={filterValue}
            placeholder="Search here..."
            onChange={(e) => setFilterValue(e.target.value)}
            className="max-w-sm"
            size="large"
          />
          {(selectedKeys.size || selectedKeys === "all") && (
            <Button
              type="primary"
              onClick={() => handleAddMultipToPayroll()}
              loading={isAddingMultiple}
            >
              Add to payroll
            </Button>
          )}
        </div>
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

  const handleCloseDetailDrawer = () => {
    setOpenViewStaffDrawer(false);
  };

  const viewOnboardTabs = [
    {
      title: "Details",
      component: (
        <DefaultDetails
          title={"Payroll Staff"}
          details={details}
          handleClose={handleCloseDetailDrawer}
          currentStatus={"awaiting_for_approval"}
        />
      ),
    },
    {
      title: "Attachment",
      component: <AttachmentDetailsApproval details={details} />,
    },
    { title: "Note", component: <NoteDetailsApproval details={details} /> },
  ];

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
          selectionMode={"multiple"}
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
          className="fontOswald mt-10"
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
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
                    {renderCell(item, columnKey, currentStaff, isAdding)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </>

      <ExpandedDrawerWithButton
        isOpen={openViewStaffDrawer}
        onClose={handleCloseDetailDrawer}
      >
        <FormDrawer
          title={""}
          tabs={[
            ...viewOnboardTabs,
            {
              title: "Approval history",
              component: <ApprovalHistory details={details} />,
            },
          ]}
        ></FormDrawer>
      </ExpandedDrawerWithButton>
    </>
  );
}

AwaitingMemberStaffTable.propTypes = {
  incomingData: PropTypes.array,
  isLoading: PropTypes.bool,
  tab: PropTypes.any,
};
