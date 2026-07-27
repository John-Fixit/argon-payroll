/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Chip, useDisclosure } from "@nextui-org/react";
import AddNoteRejection from "../../components/core/approvals/AddNoteRejection";
import ConfirmApprovalModal from "../../components/core/approvals/ConfirmApprovalModal";
import ExpandedDrawerWithButton from "../../components/modals/ExpandedDrawerWithButton";
import { formatNumberWithComma, toStringDate } from "../../utils/utitlities";
import {
  useApprovedApprovalRequest,
  useCanAssign,
  useDeclineApprovalRequest,
} from "../../API/api_urls/my_approvals";
import useCurrentUser from "../../hooks/useCurrentUser";
import toast from "react-hot-toast";
import { BsEnvelopePaper } from "react-icons/bs";
import { useEffect, useMemo, useState } from "react";
import AssignStaff from "../../components/core/approvals/AssignStaff";
import OnboardApproveModal from "../../components/core/approvals/OnboardApproveModal";
import { Loader2Icon } from "lucide-react";
import { useCallback } from "react";
import ActionIcons from "../../components/core/shared/ActionIcons";
import { Button, ConfigProvider, Drawer, Input, Select } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useGetCompanyDesignation } from "../../API/officials";
import { useUpdateAllowance, useUpdateDesignation } from "../../API/variation";
import { errorToast, successToast } from "../../utils/toastMsgPop";

export default function DefaultDetails({
  role,
  details,
  title,
  handleClose,
  currentStatus,
  isPayroll, //Fixit: intentionally passing this prop (isPayroll) to this component, using it to show only reject button so it can be rejected
  handleRejectPayroll, //Fixit: using this function to handle the payroll rejection because it's api is different
  can_edit_designation, //Fixit: using this props to show edit designation button
  can_edit_variation_breakdown, //Fixit: using this prop to show edit variation breakdown button
}) {
  const {
    isOpen: isRejectModalOpen,
    onOpen: onRejectModalOpen,
    onClose: onRejectModalClose,
  } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: onModalCancel,
  } = useDisclosure();
  const {
    isOpen: Loading,
    onOpen: startLoading,
    onClose: stopLoading,
  } = useDisclosure();
  const {
    isOpen: isAssignModalOpen,
    onOpen: onAssignModalOpen,
    onClose: onAssignModalClose,
  } = useDisclosure();

  const [isOpenUpdateDesignation, setIsOpenUpdateDesignation] = useState({
    state: false,
    data: {},
  });
  const [isOpenUpdateAllowance, setIsOpenUpdateAllowance] = useState({
    state: false,
    data: {},
  });

  const { mutateAsync: declineRequestAction, isPending: isDeclinePending } =
    useDeclineApprovalRequest();
  const { mutateAsync: approveRequestAction, isPending: isApprovePending } =
    useApprovedApprovalRequest();
  const { userData } = useCurrentUser();
  const { mutateAsync: checkCanAssign } = useCanAssign();
  const [canAssign, setCanAssign] = useState();
  const [canAssignPk, setCanAssignPk] = useState(null);

  const [totals, setTotal] = useState({
    newTotal: 0,
    pastTotal: 0,
    difference: 0,
    annualNewTotal: 0,
    annualPastTotal: 0,
    annualDifferenceTotal: 0,
    percentageChange: 0,
  });

  useEffect(() => {
    const checkReassignStatus = async () => {
      const json = {
        company_id: userData?.data?.COMPANY_ID,
        staff_id: userData?.data?.STAFF_ID,
        request_id: details?.requestID,
      };

      const res = await checkCanAssign(json);

      if (res) {
        setCanAssign(res?.data?.can_assign);
        setCanAssignPk(res?.data?.package_id);
      }
    };

    checkReassignStatus();

    return () => {
      setCanAssign(false);
    };
  }, [checkCanAssign, details, userData]);

  const rejectRequest = async (rejectnote) => {
    if (isDeclinePending) return;
    startLoading();
    let notes = "";

    if (rejectnote && rejectnote !== "<p><br></p>") {
      notes = rejectnote;
    }
    const json = {
      company_id: userData?.data?.COMPANY_ID,
      staff_id: userData?.data?.STAFF_ID,
      request_id: details?.requestID,
      rejection_note: notes,
    };

    if (isPayroll) {
      //<<<<<<<<<<<<<<<<<<<< This block will run only if isPayroll is true >>>>>>>>>>>>>>>>>>>>>>>>>>>
      await handleRejectPayroll(
        { ...json, variation_id: details?.data?.summary?.id },
        stopLoading,
        onRejectModalClose
      );
      //<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    } else {
      try {
        const res = await declineRequestAction(json);
        if (res) {
          toast.success("You successfully decline request", { duration: 5000 });
          stopLoading();
          onRejectModalClose();
          handleClose("refresh");
        }
      } catch (error) {
        toast.error(`${error?.response?.data?.message}. Please retry.`, {
          duration: 10000,
        });
        stopLoading();
      }
    }
  };

  const approveRequest = async () => {
    if (isApprovePending) return;
    startLoading();
    const json = {
      company_id: userData?.data?.COMPANY_ID,
      staff_id: userData?.data?.STAFF_ID,
      request_id: details?.requestID,
      leave_start_date: null,
      leave_end_date: null,
      leave_date_array: null,
      memo_content: null,
      memo_signature: null,
      duration: null,
    };

    try {
      startLoading();
      const res = await approveRequestAction(json);
      if (res) {
        toast.success("You successfully approve request", { duration: 2000 });
        stopLoading();
        onRejectModalClose();
        handleClose("refresh");
      }
    } catch (error) {
      toast.error(`${error?.response?.data?.message}. Please retry.`, {
        duration: 10000,
      });
      stopLoading();
    }
  };

  const approveOnboardingRequest = async (data) => {
    // onModalCancel()
    const json = {
      company_id: userData?.data?.COMPANY_ID,
      staff_id: userData?.data?.STAFF_ID,
      request_id: details?.requestID,
      ...data,
    };
    try {
      startLoading();
      const res = await approveRequestAction(json);
      if (res) {
        toast.success("You successfully approve request", { duration: 2000 });
        stopLoading();
        onModalCancel();
        handleClose("refresh");
      }
    } catch (error) {
      toast.error(`${error?.response?.data?.message}. Please retry.`, {
        duration: 10000,
      });
      stopLoading();
    }
  };

  const FormattedAmount = (amount) => {
    const formattedAmount = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);

    return formattedAmount;
  };

  // Function to normalize data structure
  const normalizeData = (data) => {
    // If data has a "summary" property and it's an object, use that
    if (data?.summary && typeof data.summary === "object") {
      return data.summary;
    }
    // Otherwise, use the data as is
    return data;
  };

  // Get the normalized data
  const normalizedData = details?.data ? normalizeData(details.data) : null;

  const reorderEntries = (entries) => {
    // Priority keys that should appear in this specific order
    const priorityKeys = [
      "last_name",
      "first_name",
      "variation_name",
      "remark",
      "commence_date",
    ];
    // Extract entries for priority keys and other fields
    const priorityEntries = [];
    const otherEntries = [];

    entries.forEach((entry) => {
      const key = entry[0].toLowerCase();

      if (priorityKeys.includes(key)) {
        // Store in a way we can sort by priority later
        priorityEntries.push({
          entry,
          index: priorityKeys.indexOf(key),
        });
      } else {
        otherEntries.push(entry);
      }
    });

    // Sort priority entries by their specified order
    const sortedPriorityEntries = priorityEntries
      .sort((a, b) => a.index - b.index)
      .map((item) => item.entry);

    // Combine all entries in desired order: priority keys, then other fields
    return [...sortedPriorityEntries, ...otherEntries];

    // const remarkEntry = entries.find(([key]) => key.toLowerCase() === "remark");
    // const otherEntries = entries.filter(
    //   ([key]) => key.toLowerCase() !== "remark"
    // );

    // // Return all entries without remark, then append remark if it exists
    // return remarkEntry ? [...otherEntries, remarkEntry] : otherEntries;
  };

  // Get detailed salary information
  const salaryDetails = useMemo(
    () =>
      details?.data?.details?.map((item) => ({
        ...item,
        annual_past_payment: Number(item?.past_payment) * 12,
        annual_new_payment: Number(item?.new_payment) * 12,
      })) || [],
    [details]
  );

  const calculateTotals = useCallback(() => {
    let newTotal = 0;
    let pastTotal = 0;
    let annualPastTotal = 0;
    let annualNewTotal = 0;

    salaryDetails.forEach((item) => {
      newTotal += parseFloat(item.new_payment || 0);
      pastTotal += parseFloat(item.past_payment || 0);
      annualPastTotal += item.annual_past_payment || 0;
      annualNewTotal += item.annual_new_payment || 0;
    });

    setTotal({
      newTotal: newTotal.toFixed(4),
      pastTotal: pastTotal.toFixed(4),
      annualNewTotal: annualNewTotal.toFixed(4),
      annualPastTotal: annualPastTotal.toFixed(4),
      annualDifferenceTotal: (annualNewTotal - annualPastTotal).toFixed(4),
      difference: (newTotal - pastTotal).toFixed(4),
      percentageChange: pastTotal
        ? (((newTotal - pastTotal) / pastTotal) * 100).toFixed(2) + "%"
        : "N/A",
    });
  }, [salaryDetails]);

  useEffect(() => {
    if (details.data && salaryDetails.length > 0) {
      calculateTotals();
    }
  }, [details, salaryDetails, calculateTotals]);

  // const totals = calculateTotals();

  const openUpdateDesignation = () => {
    setIsOpenUpdateDesignation({
      state: true,
      data: {
        variation: details?.data?.summary,
        affected_staff_id: details?.staff_id,
      },
    });
  };
  const closeUpdateDesignationDrawer = () => {
    setIsOpenUpdateDesignation({ state: false, data: {} });
  };

  const openUpdateAllowance = (allowance) => {
    setIsOpenUpdateAllowance({
      state: true,
      data: {
        variation: details?.data?.summary,
        allowance,
        affected_staff_id: details?.staff_id,
      },
    });
  };
  const closeUpdateAllowanceDrawer = () => {
    setIsOpenUpdateAllowance({ state: false, data: {} });
  };

  return (
    <>
      <div className="shadow  rounded p-4 bg-white w-full font-helvetica">
        <h4 className="text-2xl font-medium">{title} Details</h4>

        {!details?.data || details?.data?.length === 0 ? (
          <div className="flex flex-col gap-2  items-center justify-center h-full pt-5 ">
            <BsEnvelopePaper className="text-gray-300" size={40} />
            <span className=" text-default-400 font-bold text-md">
              Empty Records
            </span>
          </div>
        ) : details?.data[0] && details?.data[0]?.ATTRIBUTE_NAME ? (
          <div className="flex flex-col">
            <div className="fle justify-betwee items-center gap-4 mb-3 grid grid-cols-3 border-b pb-1 my-3">
              <h2 className=" text-[1rem] my-auto font-[600] font-helvetica text-[#444e4e] capitalize"></h2>
              <h2 className=" text-[1rem] my-auto font-[600] font-helvetica text-[#444e4e] capitalize">
                Previous
              </h2>
              <h2 className=" text-[1rem] my-auto font-[600] font-helvetica text-[#444e4e] capitalize">
                New Detail
              </h2>
            </div>
            <ul className=" mt-2 text-[15px] flex flex-col space-y-3">
              {details?.data?.map((dt) => (
                <li
                  key={dt?.ATTRIBUTE_NAME}
                  className=" grid grid-cols-3  my-3 border-b pb-1"
                >
                  <span className="text-[#444e4e] font-helvetica font-[500] text-[0.9rem] capitalize ">
                    {" "}
                    {dt?.ATTRIBUTE_NAME?.replace(/_/g, " ")}:
                  </span>
                  <span className="text-[#888888]  text-en w-full  max-w-sm fontbold font-profileFontSize ">
                    {dt?.CURRENT_VALUE || "N/A"}
                  </span>
                  <span className="text-[#888888]  text-en w-full  max-w-sm fontbold font-profileFontSize ">
                    {dt?.NEW_NAME || dt?.NEW_VALUE}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="flex flex-col ">
            {details?.data?.FILE_NAME && (
              <div className="w-[5rem] h-[5rem] my-4 rounded-full border-2 border-gray-200 overflow-auto bg-gray-50">
                <img
                  src={
                    details?.data?.FILE_NAME
                      ? details?.data?.FILE_NAME
                      : "/assets/images/profiles/user-2.png"
                  }
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
            )}
            <ul className="flex flex-col gap-5 my-4">
              {details?.data &&
                // Object.entries(details?.data)

                reorderEntries(Object.entries(normalizedData))
                  ?.filter(
                    ([key]) =>
                      key !== "FILE_NAME" &&
                      key !== "REQUEST_ID" &&
                      key !== "STAFF_ID" &&
                      key !== "request_id" &&
                      key !== "id"
                  )
                  ?.map(([key, value], i) => (
                    <li
                      className="grid grid-cols-3 gap-4 border-b-1 pb-2"
                      key={i}
                    >
                      <p className="font-medium font-helvetica uppercase">
                        {key?.replace(/_/g, " ")}
                      </p>
                      <span className="text-gray-400 col-span-2 text-sm !font-light font-helvetica flex gap-3 items-center">
                        {key?.includes("PRINCIPAL") ||
                        key?.includes("MONTHLY_REPAYMENT") ||
                        key?.includes("current_payment") ||
                        key?.includes("past_payment") ||
                        key?.includes("payment")
                          ? FormattedAmount(value)
                          : key?.includes("SELECTED_DATES")
                          ? value?.split(", ")?.map((el, i) => (
                              <Chip
                                key={i}
                                color="primary"
                                className="m-1"
                                size="sm"
                                variant="flat"
                              >
                                {toStringDate(el) || ""}
                              </Chip>
                            )) || "N/A"
                          : key?.includes("DATE") ||
                            key?.includes("commence_date")
                          ? !value
                            ? "N/A"
                            : toStringDate(value) || "N/A"
                          : value !== null
                          ? value || "N/A"
                          : "N/A"}
                        {key === "designation" && can_edit_designation && (
                          <ActionIcons
                            variant={"EDIT"}
                            action={openUpdateDesignation}
                          />
                        )}
                      </span>
                    </li>
                  ))}
            </ul>
          </div>
        )}

        {/* Salary Details Table */}
        {salaryDetails.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden font-helvetica">
            <h2 className="text-xl font-semibold text-gray-800 p-6 pb-4 border-b">
              Variation Breakdown
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-helvetica">
                      {/* Component */} Name
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider font-helvetica">
                      Month Old Amount(₦)
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider font-helvetica">
                      Month New Amount(₦)
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider font-helvetica">
                      Difference(₦)
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider font-helvetica">
                      Annual Old Amount(₦)
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider font-helvetica">
                      Annual New Amount(₦)
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider font-helvetica">
                      Annual Difference(₦)
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider font-helvetica">
                      {can_edit_variation_breakdown && "Action"}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 font-helvetica">
                  {salaryDetails.map((item, index) => {
                    const newPayment = Number(item.new_payment || 0);

                    const pastPayment = Number(item.past_payment || 0);
                    const difference = newPayment - pastPayment;

                    const annualDifference =
                      item.annual_new_payment - item.annual_past_payment;
                    const isPositive = difference > 0;
                    const isAnnualPositive = annualDifference > 0;

                    return (
                      <tr
                        key={index}
                        className={
                          index % 2 === 0
                            ? "bg-white font-helvetica"
                            : "bg-gray-50 font-helvetica"
                        }
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900  font-helvetica">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500 font-helvetica">
                          {formatNumberWithComma(item.past_payment)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500 font-helvetica">
                          {formatNumberWithComma(item.new_payment)}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm text-right font-helvetica ${
                            isPositive
                              ? "text-green-500"
                              : difference < 0
                              ? "text-red-500"
                              : "text-gray-500"
                          }`}
                        >
                          {formatNumberWithComma(difference)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500 font-helvetica">
                          {formatNumberWithComma(item.annual_past_payment)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500 font-helvetica">
                          {formatNumberWithComma(item.annual_new_payment)}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm text-right font-helvetica ${
                            isAnnualPositive
                              ? "text-green-500"
                              : difference < 0
                              ? "text-red-500"
                              : "text-gray-500"
                          }`}
                        >
                          {formatNumberWithComma(annualDifference)}
                        </td>

                        <td
                          className={`py-4 whitespace-nowrap text-sm flex justify-center font-helvetica`}
                        >
                          {can_edit_variation_breakdown && (
                            <ActionIcons
                              action={() => openUpdateAllowance(item)}
                              variant={"EDIT"}
                            />
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {/* Total row */}
                  <tr className="bg-gray-50 font-semibold font-helvetica">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-helvetica">
                      TOTAL
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 font-helvetica">
                      {formatNumberWithComma(totals.pastTotal)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 font-helvetica">
                      {formatNumberWithComma(totals.newTotal)}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm text-right font-helvetica font-medium ${
                        parseFloat(totals.difference) > 0
                          ? "text-green-600"
                          : parseFloat(totals.difference) < 0
                          ? "text-red-600"
                          : "text-gray-900"
                      }`}
                    >
                      {formatNumberWithComma(totals.difference)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 font-helvetica">
                      {formatNumberWithComma(totals.annualPastTotal)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 font-helvetica">
                      {formatNumberWithComma(totals.annualNewTotal)}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm text-right font-helvetica font-medium ${
                        parseFloat(totals.annualDifferenceTotal) > 0
                          ? "text-green-600"
                          : parseFloat(totals.annualDifferenceTotal) < 0
                          ? "text-red-600"
                          : "text-gray-900"
                      }`}
                    >
                      {formatNumberWithComma(totals.annualDifferenceTotal)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {(!currentStatus ? true : currentStatus === "pending") &&
        role !== "request" &&
        details?.data && (
          <div className="flex justify-between mt-3">
            <button
              disabled={isDeclinePending}
              className="header_btnStyle bg-red-500 rounded text-white font-semibold  mx-2 my-1 md:my-0 px-[13px] py-[7px] uppercase flex items-center gap-2"
              onClick={onRejectModalOpen}
            >
              {isDeclinePending && <Loader2Icon className="animate-spin" />}
              Reject
            </button>

            <div className="flex gap-2">
              {canAssign && (
                <button
                  disabled={Loading}
                  className="header_btnStyle bg-gray-600 rounded text-white font-semibold  mx-2 my-1 md:my-0 px-[13px] py-[7px] uppercase disabled:cursor-not-allowed disabled:bg-gray-300"
                  onClick={onAssignModalOpen}
                >
                  Re-Assign
                </button>
              )}

              {(details?.data || details?.data?.length > 0) && (
                <button
                  disabled={Loading || isApprovePending}
                  className="header_btnStyle bg-[#00bcc2] rounded text-white font-semibold  mx-2 my-1 md:my-0 px-[13px] py-[7px] uppercase flex items-center gap-2"
                  onClick={openModal}
                >
                  {isApprovePending && <Loader2Icon className="animate-spin" />}
                  Approve
                </button>
              )}
            </div>
          </div>
        )}

      {isPayroll && (
        <div className="flex justify-end mt-5">
          <button
            disabled={isDeclinePending}
            className="header_btnStyle bg-red-500 rounded text-white font-semibold  mx-2 my-1 md:my-0 px-[13px] py-[7px] uppercase flex items-center gap-2"
            onClick={onRejectModalOpen}
          >
            {isDeclinePending && <Loader2Icon className="animate-spin" />}
            Reject
          </button>
        </div>
      )}

      <ExpandedDrawerWithButton
        maxWidth={600}
        isOpen={isRejectModalOpen}
        onClose={onRejectModalClose}
      >
        <div className="mt-10 mx-5">
          <AddNoteRejection
            handleConfirm={rejectRequest}
            loading={Loading}
            handleCancel={onRejectModalClose}
          />
        </div>
      </ExpandedDrawerWithButton>

      <ExpandedDrawerWithButton
        isOpen={isAssignModalOpen}
        onClose={onAssignModalClose}
        maxWidth={450}
      >
        <AssignStaff
          closeDrawer={() => handleClose("refresh")}
          package_id={canAssignPk}
          request_id={details?.requestID}
        />
      </ExpandedDrawerWithButton>

      <UpdateDesignationDrawer
        openUpdateDesignation={isOpenUpdateDesignation.state}
        closeUpdateDesignationDrawer={closeUpdateDesignationDrawer}
        userData={userData}
        incomingData={isOpenUpdateDesignation.data}
        closeParentDrawer={handleClose}
      />
      <UpdateAllowanceDrawer
        openUpdateAllowance={isOpenUpdateAllowance.state}
        closeUpdateAllowanceDrawer={closeUpdateAllowanceDrawer}
        userData={userData}
        incomingData={isOpenUpdateAllowance.data}
        closeParentDrawer={handleClose}
      />

      {title === "Employee Onboarding" &&
      (!details?.data?.STAFF_NUMBER ||
        !details?.data?.PENSION_NO ||
        !details?.data?.PENSION_COMPANY) ? (
        <ExpandedDrawerWithButton
          maxWidth={450}
          isOpen={isModalOpen}
          onClose={onModalCancel}
        >
          <div className="mt-10 mx-5">
            <OnboardApproveModal
              details={details?.data}
              handleConfirm={approveOnboardingRequest}
              handleCancel={onModalCancel}
              loading={Loading}
            />
          </div>
        </ExpandedDrawerWithButton>
      ) : (
        <ConfirmApprovalModal
          subject={"Are you sure you want to approve request?"}
          isOpen={isModalOpen}
          loading={isApprovePending}
          handleOk={approveRequest}
          handleCancel={onModalCancel}
        />
      )}
    </>
  );
}

const UpdateDesignationDrawer = ({
  openUpdateDesignation,
  closeUpdateDesignationDrawer,
  userData,
  incomingData,
  closeParentDrawer,
}) => {
  const { mutateAsync: mutateUpdateDesignation, isPending: isUpdating } =
    useUpdateDesignation();
  const {
    handleSubmit,
    control,
    formState: { errors, touchedFields },
    reset,
  } = useForm({
    defaultValues: {
      next_designation: "",
    },
  });

  const { data: getCompanyDesignation, isPending: isLoadingOrgDesignation } =
    useGetCompanyDesignation(userData?.data?.COMPANY_ID);

  const companyDesignation = useMemo(
    () =>
      getCompanyDesignation?.data?.data?.map((item) => ({
        ...item,
        label: item?.DESIGNATION_NAME,
        value: item?.DESIGNATION_ID,
      })),
    [getCompanyDesignation?.data?.data]
  );

  const onSubmit = async (values) => {
    const { next_designation } = values;

    const payload = {
      company_id: userData?.data?.COMPANY_ID,
      affected_staff_id: incomingData?.affected_staff_id,
      request_id: incomingData?.variation?.request_id, //if contract, disable annual and promotion
      variation_id: incomingData?.variation?.id,
      next_designation: next_designation,
    };

    try {
      const res = await mutateUpdateDesignation(payload);
      successToast(res?.data?.message);
      reset();
      closeUpdateDesignationDrawer();
      closeParentDrawer();
    } catch (err) {
      errorToast(err?.response?.data?.message || err?.message);
    }
  };
  return (
    <Drawer
      width={500}
      open={openUpdateDesignation}
      onClose={closeUpdateDesignationDrawer}
      title={
        <div className="text-center font-helvetica text-lg">
          <h3>Update Designation</h3>
        </div>
      }
      classNames={{
        header: "bg-btnColor text-white rounded-br-3xl",
        content: "bg-gray-100",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-gray-100 py-4 px-6 rounded-lg shadow border border-gray-100 max-w-md mx-auto"
      >
        <div className="">
          <h5 className="header_h3 uppercase text-gray-500 mb-1 text-[0.825rem] font-medium leading-[1.5] tracking-[2px] ">
            Next Designation
          </h5>
          <Controller
            name="next_designation"
            control={control}
            render={({ field }) => (
              <div>
                <Select
                  aria-label="next_designation"
                  size="large"
                  showSearch
                  placeholder="Select Next Designation"
                  optionFilterProp="label"
                  options={companyDesignation}
                  virtual={false}
                  loading={isLoadingOrgDesignation}
                  status={
                    touchedFields?.next_designation && errors?.next_designation
                      ? "error"
                      : ""
                  }
                  {...field}
                  className="w-full"
                />
                <span className="text-red-500">
                  {touchedFields?.staff_type && errors?.staff_type?.message}
                </span>
              </div>
            )}
            rules={{ required: "This field is required" }}
          />
        </div>

        <div className="flex justify-end">
          <ConfigProvider theme={{ token: { colorPrimary: "#00bcc2" } }}>
            <Button
              type="primary"
              size="large"
              loading={isUpdating}
              htmlType="submit"
            >
              Submit
            </Button>
          </ConfigProvider>
        </div>
      </form>
    </Drawer>
  );
};

const UpdateAllowanceDrawer = ({
  openUpdateAllowance,
  closeUpdateAllowanceDrawer,
  userData,
  incomingData,
  closeParentDrawer,
}) => {
  const { mutateAsync: mutateUpdateAllowance, isPending: isUpdating } =
    useUpdateAllowance();
  const { handleSubmit, setValue, reset, watch } = useForm({
    defaultValues: {
      amount: Number(0),
    },
  });

  useEffect(() => {
    reset({
      amount: Number(incomingData?.allowance?.new_payment),
    });
  }, [incomingData?.allowance?.new_payment, reset]);

  const onSubmit = async (values) => {
    const { amount } = values;

    const payload = {
      company_id: userData?.data?.COMPANY_ID,
      affected_staff_id: incomingData?.affected_staff_id,
      request_id: incomingData?.variation?.request_id, //if contract, disable annual and promotion
      variation_id: incomingData?.variation?.id,
      amount,
      allowance_id: incomingData?.allowance?.allowance_id,
    };

    try {
      const res = await mutateUpdateAllowance(payload);
      successToast(res?.data?.message);
      reset();
      closeUpdateAllowanceDrawer();
      closeParentDrawer();
    } catch (err) {
      errorToast(err?.response?.data?.message || err?.message);
    }
  };
  return (
    <Drawer
      width={500}
      open={openUpdateAllowance}
      onClose={closeUpdateAllowanceDrawer}
      title={
        <div className="text-center font-helvetica text-lg">
          <h3>Update Allowance</h3>
        </div>
      }
      classNames={{
        header: "bg-btnColor text-white rounded-br-3xl",
        content: "bg-gray-100",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        // className="space-y-4"
        className="space-y-6 bg-gray-100 py-4 px-6 rounded-lg shadow border border-gray-100 max-w-md mx-auto"
      >
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            New Amount
          </label>
          <Input
            type="number"
            value={watch("amount")}
            onChange={(e) => setValue("amount", e.target.value)}
            className="w-full px-3 py-2"
          />
        </div>

        <div className="flex justify-end">
          <ConfigProvider theme={{ token: { colorPrimary: "#00bcc2" } }}>
            <Button type="primary" loading={isUpdating} htmlType="submit">
              Update Allowance
            </Button>
          </ConfigProvider>
        </div>
      </form>
    </Drawer>
  );
};
