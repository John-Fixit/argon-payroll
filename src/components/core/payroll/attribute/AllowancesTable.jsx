/* eslint-disable no-unused-vars */
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import ActionIcons from "../../shared/ActionIcons";
import {
  useActivateAllStaffAllowance,
  useRecomputeAllowance,
  useStopAllStaffAllowance,
} from "../../../../API/allowance";
import { errorToast, successToast } from "../../../../utils/toastMsgPop";
import ConfirmApprovalModal from "../../approvals/ConfirmApprovalModal";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import { upperCase } from "lodash";
import { Input, Tooltip } from "antd";
import Label from "../../../forms/FormElements/Label";
import { IoPowerOutline } from "react-icons/io5";
import { LuPowerOff } from "react-icons/lu";
import { Power, PowerOff, ToggleLeft, ToggleRight } from "lucide-react";
import clsx from "clsx";

const tableColumns = [
  { name: "Name", uid: "name", sortable: true },
  { name: "Code", uid: "code", sortable: true },
  { name: "Regular", uid: "regular", sortable: true },
  { name: "Payment Type", uid: "type", sortable: true },
  { name: "recompute", uid: "recompute", sortable: true },
  { name: "Action", uid: "actions" },
];

const AllowancesTable = ({ tableData, handleOpenDrawer, isPending }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedKeys, setSelectedKeys] = useState(new Set([]));

  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const [filterValue, setFilterValue] = useState("");

  const [confirmModalData, setConfirmModalData] = useState({});

  const hasSearchFilter = Boolean(filterValue?.trim());

  const { userData } = useCurrentUser();

  const [rowsPerPage, setRowsPerPage] = useState(20);

  const {
    mutateAsync: mutateRecomputeAllowance,
    isPending: isRecomputingAllowance,
  } = useRecomputeAllowance();

  const { mutateAsync: mutateStopAllowance } = useStopAllStaffAllowance();
  const { mutateAsync: mutateActivateAllowance } =
    useActivateAllStaffAllowance();

  const pages = useMemo(() => {
    setCurrentPage(1);
    return Math.ceil(tableData?.length / rowsPerPage) || null; // total divided by row-per-page
  }, [tableData]);

  const filteredItems = useMemo(() => {
    let filteredData = tableData?.length ? [...tableData] : [];

    if (hasSearchFilter) {
      const value = filterValue?.toLowerCase();

      const searchTerms = value.toLowerCase().trim().split(" ");

      const updatedData = tableData?.filter((item) => {
        const fullName = `${item?.first_name} ${item?.last_name}`.toLowerCase();

        const matches = [
          item?.name?.toLowerCase(),
          item?.code?.toLowerCase(),
          item?.staff_number?.toLowerCase(),
          item?.variation_name?.toLowerCase(),
          item?.current_payment?.toLowerCase(),
          item?.past_payment?.toLowerCase(),
          item?.directorate_name?.toLowerCase(),
          item?.department_name?.toLowerCase(),
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

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [currentPage, filteredItems, rowsPerPage]);

  const handleRecompute = (allowance) => {
    handleOpenConfirmModal({
      company_id: userData?.data?.COMPANY_ID,
      allowance_id: allowance?.id,
    });
    setConfirmModalData({
      confirm_subject: "Are you sure to continue this operation",
      confirmation_function: executeRecompute,
    });
  };

  const executeRecompute = async (payload) => {
    try {
      const res = await mutateRecomputeAllowance(payload);

      successToast(res?.data?.message);

      handleCloseConfirmModal();
    } catch (err) {
      const errMsg = err?.response?.data?.message || err?.message;
      errorToast(errMsg);
    }
  };

  const handleOpenConfirmModal = (payload) => {
    setOpenConfirmModal({ state: true, payload });
  };
  const handleCloseConfirmModal = () => {
    setOpenConfirmModal({ state: false });
  };

  const executeFunc = async ({ type, payload }) => {
    try {
      const res =
        type === "activate"
          ? await mutateActivateAllowance(payload)
          : await mutateStopAllowance(payload);
      successToast(res?.data?.message);
      handleCloseConfirmModal();
    } catch (err) {
      errorToast(err?.response?.data?.message || err?.message);
    }
  };

  const handleActivateForAllStaff = (allowance) => {
    handleOpenConfirmModal({
      type: "activate",
      payload: {
        allowance_id: allowance?.id,
      },
    });
    setConfirmModalData({
      confirm_subject: "Are you sure to continue to activate this allowance",
      confirmation_function: executeFunc,
    });
  };
  const handleDeactivateForAllStaff = (allowance) => {
    handleOpenConfirmModal({
      type: "deactivate",
      payload: {
        allowance_id: allowance?.id,
      },
    });
    setConfirmModalData({
      confirm_subject: "Are you sure to continue to deactivate this allowance",
      confirmation_function: executeFunc,
    });
  };

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  }, []);

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="mb-3 flex flex-col max-w-lg">
          <Label htmlFor="to">Search</Label>
          <Input
            allowClear
            value={filterValue}
            placeholder="Search here..."
            onChange={(e) => setFilterValue(e.target.value)}
            className="w-full !max-w-lg"
            size="large"
          />
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
      <div>
        <Table
          aria-label="Attribute Table"
          isHeaderSticky
          isStriped
          css={{
            height: "auto",
            minWidth: "100%",
          }}
        >
          <TableHeader>
            {tableColumns?.map((column, index) => {
              return (
                <TableColumn
                  key={index + "____Table_head"}
                  className={clsx(
                    "uppercase font-helvetica text-sm",
                    column?.uid === "actions" && "text-center"
                  )}
                >
                  {column?.name}
                </TableColumn>
              );
            })}
          </TableHeader>
          <TableBody
            emptyContent={
              <div className="flex items-center justify-center text-lg font-helvetica">
                Empty data
              </div>
            }
          >
            {paginatedData?.map((row, rowIndex) => (
              <TableRow key={row.id + "__table_row"}>
                {tableColumns?.map((column, index) => (
                  <TableCell
                    key={rowIndex + "__table_column" + index + "___"}
                    className=""
                  >
                    <div
                      className={`font-helvetica ${
                        column?.uid !== "actions" && "opacity-60"
                      } text-[0.80rem] ${
                        column?.uid === "name" && "uppercase"
                      } ${column?.uid !== "code" && "capitalize"}`}
                    >
                      {column?.uid === "actions" ? (
                        <div className="flex ">
                          <div className="pl-4 flex items-center">
                            <ActionIcons
                              variant={"EDIT"}
                              action={() => handleOpenDrawer(row)}
                            />
                            <Tooltip title="Activate for all Staff">
                              <div
                                className="hover:bg-gray-200/50 p-1 rounded-lg transition-all duration-100 cursor-pointer"
                                onClick={() => handleActivateForAllStaff(row)}
                              >
                                <Power
                                  size={20}
                                  strokeWidth={2}
                                  className="text-green-600"
                                />
                              </div>
                            </Tooltip>
                            <Tooltip title="Deactivate for all Staff">
                              <div
                                className="hover:bg-gray-200/50 p-1 rounded-lg transition-all duration-100 cursor-pointer"
                                onClick={() => handleDeactivateForAllStaff(row)}
                              >
                                <PowerOff
                                  size={20}
                                  strokeWidth={2}
                                  className="text-red-600"
                                />
                              </div>
                            </Tooltip>
                          </div>
                        </div>
                      ) : column?.uid === "recompute" ? (
                        <button
                          onClick={() => handleRecompute(row)}
                          disabled={!row?.can_recompute}
                          className="bg-btnColor disabled:bg-gray-400 disabled:text-gray-200 px-2 py-0.5 outline-none  text-white rounded text-xs font-helvetica hover:bg-btnColor/70"
                        >
                          Recompute
                        </button>
                      ) : column?.uid === "regular" ? (
                        <>{row?.is_regular ? "Yes" : "No"}</>
                      ) : column?.uid === "type" ? (
                        <>{row?.pay_deduct ? "Deduction" : "Income"}</>
                      ) : (
                        row[column?.uid]?.toLowerCase()
                      )}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex mt-4">
          <Pagination
            total={pages}
            initialPage={1}
            page={currentPage}
            onChange={(page) => setCurrentPage(page)}
            showControls={true}
          />
        </div>
      </div>
      <ConfirmApprovalModal
        isOpen={openConfirmModal.state}
        handleOk={() =>
          confirmModalData.confirmation_function(openConfirmModal.payload)
        }
        handleCancel={handleCloseConfirmModal}
        subject={confirmModalData?.confirm_subject}
        loading={isRecomputingAllowance}
      />
    </>
  );
};

AllowancesTable.propTypes = {
  tableData: PropTypes.array,
  handleOpenDrawer: PropTypes.func,
  isPending: PropTypes.bool,
};

export default AllowancesTable;
