/* eslint-disable no-unused-vars */
import { useCallback, useRef, useState } from "react";
import PageHeader from "../../components/payroll_components/PageHeader";
import SalaryAdvanceForm from "../../components/core/salaryAdvance/SalaryAdvanceForm";
import SalaryPreview from "../../components/core/salaryAdvance/SalaryPreview";
import { useReactToPrint } from "react-to-print";
import RequestCard from "../Approval/RequestCard";
import {
  MdOutlineCheckCircle,
  MdOutlinePending,
  MdOutlineCancel,
  MdOutlineFilePresent,
} from "react-icons/md";
import { useGetStaffDetails } from "../../API/staff_details";
import useCurrentUser from "../../hooks/useCurrentUser";
import SalaryAdvanceTable from "../../components/core/salaryAdvance/table/SalaryAdvanceTable";
import VariationForm from "../../components/core/variations/VariationsForm";
import VariationTable from "../../components/core/variations/VariationTable";
import PulpilageTable from "../../components/core/variations/PulpilageTable";
import { useDisclosure } from "@nextui-org/react";
import ExpandedDrawerWithButton from "../../components/modals/ExpandedDrawerWithButton";
import DetailModal from "../../components/core/variations/details/detail_modal";
import OverallVariation from "../../components/core/variations/details/Overall_Variation";
import SalaryVariationAdvice from "../../components/core/variations/templates/SalaryVariationAdvice";
import { useGetVariationRequest } from "../../API/variation";
import { MdDrafts } from "react-icons/md";
import FormDrawer from "../../components/payroll_components/FormDrawer";
import DefaultDetails from "../Approval/DefaultDetails";
import AttachmentDetailsApproval from "../../components/core/approvals/AttachmentDetailsApproval";
import NoteDetailsApproval from "../../components/core/approvals/NoteDetailsApproval";
import ApprovalHistory from "../Approval/ApprovalHistory";
import { useGetRequestDetail } from "../../API/api_urls/my_approvals";
import { errorToast } from "../../utils/toastMsgPop";
import VariationTemplateDrawer from "../../components/core/variations/templates/VariationTemplateDrawer";
import { Button, ConfigProvider } from "antd";
import { FcCancel } from "react-icons/fc";
import { formatNaira } from "../../utils/utitlities";

const statusData = [
  {
    id: "1",
    label: "Pending",
    icon: MdOutlinePending,
    b_color: "bg-yellow-100",
    t_color: "text-yellow-400",
  },
  {
    id: "2",
    label: "Approved",
    icon: MdOutlineCheckCircle,
    b_color: "bg-green-100",
    t_color: "text-green-500",
  },
  {
    id: "3",
    label: "Decline",
    icon: MdOutlineCancel,
    b_color: "bg-red-100",
    t_color: "text-red-500",
  },
  {
    id: "4",
    label: "Draft",
    icon: MdDrafts,
    b_color: "bg-gray-100",
    t_color: "text-gray-500",
  },
  {
    id: "5",
    label: "Payroll Rejected",
    icon: FcCancel,
    b_color: "bg-red-100",
    t_color: "text-red-500",
  },
];

const Variations = () => {
  const { userData } = useCurrentUser();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenViewVariation, setIsOpenViewVariation] = useState({
    type: "",
    status: false,
  });

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

  const getVariatioinPayload = {
    staff_id: userData?.data?.STAFF_ID,
    company_id: userData?.data?.COMPANY_ID,
  };

  const {
    data: getPendingVariation,
    isPending: isLoadingPending,
    refetch: refetchPending,
  } = useGetVariationRequest(getVariatioinPayload, "pending");
  const {
    data: getApprovedVariation,
    isPending: isLoadingApproved,
    refetch: refetchApproved,
  } = useGetVariationRequest(getVariatioinPayload, "approved");
  const {
    data: getDeclineVariation,
    isPending: isLoadingDecline,
    refetch: refetchDecline,
  } = useGetVariationRequest(getVariatioinPayload, "declined");
  const {
    data: getDraftVariation,
    isPending: isLoadingDraft,
    refetch: refetchDraft,
  } = useGetVariationRequest(getVariatioinPayload, "draft");
  const {
    data: getPayrollRejected,
    isPending: isLoadingPayrollRejected,
    refetch: refetchPayrollRejected,
  } = useGetVariationRequest(getVariatioinPayload, "payroll_rejected");

  const selectTab = (value) => {
    setDetailsStatus(value);
  };

  const detailsNo = (value) => {
    if (value == "1") {
      return getPendingVariation || [];
    } else if (value == "2") {
      return getApprovedVariation || [];
    } else if (value == "3") {
      return getDeclineVariation || [];
    } else if (value == "4") {
      return getDraftVariation || [];
    } else if (value == "5") {
      return getPayrollRejected || [];
    } else {
      return [];
    }
  };

  const handleOpenDrawer = () => {
    setIsOpen(true);
  };

  const componentRef = useRef();

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
      refetchApproved();
      refetchDecline();
      refetchDraft();
      refetchPayrollRejected();
    }
  };

  const tabs = [
    {
      title: "Variation",
      component: (
        <DefaultDetails
          title={isOpenViewVariation?.type}
          details={details}
          handleClose={handleClose}
          currentStatus={"none"}
          can_edit_designation={detailsStatus === "3"}
          can_edit_variation_breakdown={detailsStatus === "3"}
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
            new_grade,
            new_step,
            ...restSummary
          } = requestData.summary; // removed staff_id, current_payment and past_payment out, I don't want to show them

          const calc_annual_previous_pay = Math.round(
            Number(past_payment) * 12
          ); //parse the value to number in case, it is not in type number and then multi[ly it by 12
          const calc_annual_current_pay = Math.round(
            Number(current_payment) * 12
          );

          // formatted values
          const gross_previous_annual_payment = calc_annual_previous_pay;
          const gross_current_annual_payment = calc_annual_current_pay;

          const formattedData = {
            ...requestData,
            summary: {
              ...restSummary,
              directorate_name,
              department_name,
              designation,
              current_grade: current_grade,
              current_step: current_step,
              new_grade: new_grade,
              new_step: new_step,
              gross_current_payment: past_payment,
              gross_current_annual_payment: gross_previous_annual_payment,
              gross_new_payment: current_payment,
              gross_new_annual_payment: gross_current_annual_payment,
            },
          };

          setDetails({
            ...details,
            approvers,
            attachments,
            notes,
            data: formattedData,
            requestID: id,
            staff_id: staff_id,
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
    <div className="">
      <PageHeader
        header_text={"Variation"}
        breadCrumb_data={[{ name: "Self Service" }, { name: "Variation" }]}
        buttonProp={[{ button_text: "Create Variation", fn: handleOpenDrawer }]}
      />

      <RequestCard
        requestHistory={statusData}
        selectTab={selectTab}
        requestStatus={detailsStatus}
        requestNo={detailsNo}
        loading={{
          1: isLoadingPending,
          2: isLoadingApproved,
          3: isLoadingDecline,
          4: isLoadingDraft,
          5: isLoadingPayrollRejected,
        }}
      />

      {
        <VariationTable
          incomingData={detailsNo(detailsStatus)}
          currentTab={detailsStatus}
          onViewDetail={handleOpenViewVariation}
          isGettingDetail={isGettingDetail}
          currentRowID={currentRowID}
          isLoading={
            isLoadingPending ||
            isLoadingApproved ||
            isLoadingDecline ||
            isLoadingDraft ||
            isLoadingPayrollRejected
          }
        />
      }

      <VariationForm isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="hidden">
        <SalaryVariationAdvice componentRef={componentRef} />
        <div ref={componentRef}>
          <SalaryPreview />
        </div>
      </div>
      <ExpandedDrawerWithButton
        maxWidth={isOpenViewVariation.type == "variation" ? 1100 : 920}
        isOpen={isOpenViewVariation.status}
        onClose={handleClose}
      >
        {detailsStatus !== "4" && (
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
                className="text-xs font-helvetica"
                onClick={() =>
                  // onViewDetail(user?.request_id, "template", rowID)
                  handleOpenViewTemplate(details)
                }
              >
                View Template
              </Button>
            </ConfigProvider>
          </div>
        )}
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
    </div>
  );
};

export default Variations;
