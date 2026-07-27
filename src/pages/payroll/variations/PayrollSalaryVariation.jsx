/* eslint-disable no-unused-vars */
import { useCallback, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import {
  MdOutlineCheckCircle,
  MdOutlinePending,
  MdOutlineCancel,
} from "react-icons/md";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { useGetRequestDetail } from "../../../API/api_urls/my_approvals";
import DefaultDetails from "../../Approval/DefaultDetails";
import AttachmentDetailsApproval from "../../../components/core/approvals/AttachmentDetailsApproval";
import NoteDetailsApproval from "../../../components/core/approvals/NoteDetailsApproval";
import { errorToast, successToast } from "../../../utils/toastMsgPop";
import PageHeader from "../../../components/payroll_components/PageHeader";
import ExpandedDrawerWithButton from "../../../components/modals/ExpandedDrawerWithButton";
import FormDrawer from "../../../components/payroll_components/FormDrawer";
import ApprovalHistory from "../../Approval/ApprovalHistory";
import PayrollSalaryVariationTable from "../../../components/core/payroll/variations/PayrollSalaryVariationTable";
import { useGetVariation } from "../../../API/payroll";
import VariationTemplateDrawer from "../../../components/core/variations/templates/VariationTemplateDrawer";
import { Button, ConfigProvider } from "antd";
import {
  useGetVariationAwaitingArrears,
  useGetVariationOnPayroll,
  useRejectVariation,
} from "../../../API/variation";
import RequestCard from "../../Approval/RequestCard";
import { formatNaira } from "../../../utils/utitlities";
import { FiClock } from "react-icons/fi";
import dayjs from "dayjs";
const statusData = [
  {
    id: "1",
    label: "Awaiting Payroll Onboard",
    icon: MdOutlinePending,
    b_color: "bg-amber-100",
    t_color: "text-amber-400",
  },
  {
    id: "2",
    label: "Awaiting Arrears Run",
    icon: FiClock,
    b_color: "bg-orange-100",
    t_color: "text-orange-500",
  },
  {
    id: "3",
    label: "On Payroll",
    icon: MdOutlineCheckCircle,
    b_color: "bg-green-100",
    t_color: "text-green-500",
  },
];

const PayrollSalaryVariation = () => {
  const { userData } = useCurrentUser();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenViewVariation, setIsOpenViewVariation] = useState({
    type: "",
    status: false,
  });

  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const [currentRowID, setCurrentRowID] = useState(null);

  const [isApprovedModalOpen, setIsApprovedModalOpen] = useState(false);

  const [viewTemplate, setViewTemplate] = useState({ state: false, data: {} });

  const [details, setDetails] = useState({
    approvers: [],
    attachments: [],
    data: null,
    notes: [],
    requestID: null,
  });

  const [detailsStatus, setDetailsStatus] = useState("1");

  const { mutate: getDetails, isPending: isGettingDetail } =
    useGetRequestDetail();

  const { mutateAsync: mutateRejectVariation } = useRejectVariation();

  const getVariationPayload = {
    staff_id: userData?.data?.STAFF_ID,
    company_id: userData?.data?.COMPANY_ID,
  };

  const {
    data: getPendingVariation,
    isPending: isLoading,
    refetch: refetchPending,
  } = useGetVariation(getVariationPayload);
  const {
    data: getVariationOnPayroll,
    isPending: isLoadingVariationOnpayroll,
    refetch: refetchOnPayroll,
  } = useGetVariationOnPayroll({
    ...getVariationPayload,
    month: selectedMonth,
    year: selectedYear,
  });
  const {
    data: getAwaitArrears,
    isPending: isLoadingAwaitArrears,
    refetch: refetchAwaitArrears,
  } = useGetVariationAwaitingArrears(getVariationPayload);

  const selectTab = (value) => {
    setDetailsStatus(value);
  };

  const detailsNo = (value) => {
    if (value == "1") {
      return getPendingVariation || [];
    } else if (value == "2") {
      return getAwaitArrears || [];
    } else if (value == "3") {
      return getVariationOnPayroll || [];
    } else {
      return [];
    }
  };

  //=============view variation================

  const handleClose = (refreshSignnal) => {
    setIsOpenViewVariation({ type: "", status: false });

    setDetails({
      approvers: [],
      attachments: [],
      data: null,
      notes: [],
      requestID: null,
    });

    if (refreshSignnal === "refresh") {
      refetchPending();
      refetchOnPayroll();
      refetchAwaitArrears();
    }
  };

  //<<<<<<<<<<<<<<<<<<<<<< function to handle payroll rejection >>>>>>>>>>>>>>>>>>>>>>
  const handleRejectPayroll = async (json, stopLoading, onRejectModalClose) => {
    const { rejection_note, variation_id } = json;

    const payloadForRejection = {
      company_id: userData?.data?.COMPANY_ID,
      staff_id: userData?.data?.STAFF_ID,
      variation_id,
      note: rejection_note,
    };

    try {
      const res = await mutateRejectVariation(payloadForRejection);
      if (res) {
        successToast(res?.data?.message);
        stopLoading();
        onRejectModalClose();
        handleClose("refresh");
      }
    } catch (error) {
      errorToast(
        `${error?.response?.data?.message || error?.message}. Please retry.`
      );
      stopLoading();
    }
  };

  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const tabs = [
    {
      title: "Variation",
      component: (
        <DefaultDetails
          title={isOpenViewVariation?.type}
          details={details}
          handleClose={handleClose}
          currentStatus={"none"}
          isPayroll={true}
          handleRejectPayroll={handleRejectPayroll}
        />
      ),
    },
    {
      title: "Attachment",
      component: <AttachmentDetailsApproval details={details} />,
    },
    { title: "Note", component: <NoteDetailsApproval details={details} /> },
  ];

  const handleOpenViewVariation = (id, type, rowID) => {
    setCurrentRowID(rowID);
    getDetails(
      { request_id: id },
      {
        onSuccess: (data) => {
          const value = data?.data?.data;
          const approvers = value?.approvers;
          const attachments = value?.attachments;
          const requestData = value?.data;
          const notes = value?.notes;

          const {
            staff_id,
            current_payment,
            past_payment,
            directorate_name,
            department_name,
            designation,
            current_grade,
            current_step,
            next_grade,
            next_step,
            ...restSummary
          } = requestData.summary; // removed staff_id, current_payment and past_payment out, I don't want to show them

          const calc_annual_previous_pay = Number(past_payment) * 12; //parse the value to number in case, it is not in type number and then multi[ly it by 12
          const calc_annual_current_pay = Number(current_payment) * 12;

          // formatted values
          const gross_previous_annual_payment = calc_annual_previous_pay;
          const gross_current_annual_payment = calc_annual_current_pay;

          const formattedData = {
            ...requestData,
            summary: {
              ...restSummary,
              DIRECTORATE: directorate_name,
              DEPARTMENT: department_name,
              DESIGNATION: designation,
              CURRENT_GRADE: current_grade,
              CURRENT_STEP: current_step,
              next_grade: next_grade,
              next_step: next_step,
              gross_current_payment: past_payment,
              gross_current_annual_payment: gross_previous_annual_payment,
              gross_next_payment: current_payment,
              gross_next_annual_payment: gross_current_annual_payment,
            },
          };

          setDetails({
            ...details,
            approvers,
            attachments,
            notes,
            data: formattedData,
            requestID: id,
          });
          setIsOpenViewVariation({ type: type, status: true });
        },
        onError: (err) => {
          errorToast(err?.response?.data?.message || err?.message);
        },
      }
    );
  };

  //==============

  //========view template function ==========
  const handleOpenViewTemplate = (paramData) => {
    setViewTemplate({ state: true, data: paramData });
  };
  const handleCloseViewTemplate = () => {
    setViewTemplate({ state: false });
  };
  //============

  return (
    <>
      <PageHeader
        header_text={"Salary Variation"}
        breadCrumb_data={[{ name: "Payroll" }, { name: "Variation" }]}
      />
      <RequestCard
        requestHistory={statusData}
        selectTab={selectTab}
        requestStatus={detailsStatus}
        requestNo={detailsNo}
        loading={{
          1: isLoading,
          2: isLoadingAwaitArrears,
          3: isLoadingVariationOnpayroll,
        }}
      />

      <PayrollSalaryVariationTable
        incomingData={detailsNo(detailsStatus)}
        currentTab={detailsStatus}
        onViewDetail={handleOpenViewVariation}
        isGettingDetail={isGettingDetail}
        currentRowID={currentRowID}
        isLoading={isLoading}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        setSelectedMonth={setSelectedMonth}
        setSelectedYear={setSelectedYear}
      />

      <ExpandedDrawerWithButton
        maxWidth={isOpenViewVariation.type == "variation" ? 1100 : 920}
        isOpen={isOpenViewVariation.status}
        onClose={handleClose}
      >
        <div className="">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#00bcc2",
              },
            }}
          >
            <Button
              type="primary"
              size="small"
              className="text-xs"
              onClick={() => handleOpenViewTemplate(details)}
            >
              View Template
            </Button>
          </ConfigProvider>
        </div>
        <FormDrawer
          title={""}
          tabs={[
            ...tabs,
            {
              title: "Approval history",
              component: <ApprovalHistory details={details} />,
            },
          ]}
        ></FormDrawer>
      </ExpandedDrawerWithButton>
      <VariationTemplateDrawer
        isOpen={viewTemplate.state}
        variationDetail={viewTemplate.data}
        handleClose={handleCloseViewTemplate}
      />
    </>
  );
};

export default PayrollSalaryVariation;
