import { useState } from "react";
import {
  useGetMyRequests,
  useGetRequestDetail,
} from "../../../API/api_urls/my_approvals";
import useCurrentUser from "../../../hooks/useCurrentUser";
import ExpandedDrawerWithButton from "../../modals/ExpandedDrawerWithButton";
import FormDrawer from "../../payroll_components/FormDrawer";
import LeaveDetail from "../../../pages/Approval/LeaveDetail";
import DefaultDetails from "../../../pages/Approval/DefaultDetails";
import ApprovalHistory from "../../../pages/Approval/ApprovalHistory";
import AcademicDetail from "../../../pages/Approval/AcademicDetail";
import SignMemo from "../../../pages/home/Engage/memo/components/SignMemo";
import BioDataDetail from "../../../pages/Approval/BioDataDetail";
import ProfileDetail from "../../../pages/Approval/ProfileDetails";
import LeaveReturnDetails from "../../../pages/Approval/LeaveReturn";
import Expense_FORM from "../../../pages/SelfService/Request/Expense_Form";
import DTA_FORM from "../../../pages/SelfService/Request/DTA_form";
import AttachmentDetailsApproval from "../approvals/AttachmentDetailsApproval";
import RequestTable2 from "../../../pages/SelfService/Request/RequestTable2";
import NoteDetailsApproval from "../approvals/NoteDetailsApproval";
import PageHeader from "../../payroll_components/PageHeader";

const QuickRequestComponent = () => {
  //=================== react hooks ==============================================
  const [details, setDetails] = useState({
    approvers: [],
    attachments: [],
    data: null,
    notes: [],
    requestID: null,
  });
  const [isOpen, setIsOpen] = useState({ type: "", status: false });
  //==============================================================================

  //================================== External hook =============================
  const { userData } = useCurrentUser();

  const { mutate: getDetails } = useGetRequestDetail();

  const { data: pending, isLoading: pendingLoading } = useGetMyRequests(
    "pending_hr_request",
    {
      company_id: userData?.data?.COMPANY_ID,
      staff_id: userData?.data?.STAFF_ID,
      start_date: "",
      end_date: "",
      status: "pending",
    }
  );

  //================================================================================

  const pendingData = pending?.data?.requests?.map((item) => {
    return {
      ...item,
      status: "pending",
    };
  });

  let tableData = pendingData || [];

  const handleClose = () => {
    setIsOpen({ type: "", status: false });
  };

  const tabs = !isOpen?.status
    ? []
    : isOpen?.type === "create_dta"
    ? [
        {
          title: "DTA Request",
          component: <DTA_FORM role="request" />,
          header_text: "DTA Request Form",
        },
      ]
    : isOpen?.type === "create_expense"
    ? [
        {
          title: "Create Expense",
          component: <Expense_FORM role="request" />,
          header_text: "Create Expense",
        },
      ]
    : isOpen?.type === "Leave"
    ? [
        {
          title: "Leave",
          component: <LeaveDetail details={details} role="request" />,
        },
        {
          title: "Attachment",
          component: <AttachmentDetailsApproval details={details} />,
        },
        { title: "Note", component: <NoteDetailsApproval details={details} /> },
      ]
    : isOpen?.type === "Leave Return"
    ? [
        {
          title: "Leave Return",
          component: <LeaveReturnDetails details={details} role="request" />,
        },
        {
          title: "Attachment",
          component: <AttachmentDetailsApproval details={details} />,
        },
        { title: "Note", component: <NoteDetailsApproval details={details} /> },
      ]
    : isOpen?.type?.includes("Profile")
    ? [
        {
          title: "Profile",
          component: <ProfileDetail details={details} role="request" />,
        },
        {
          title: "Attachment",
          component: <AttachmentDetailsApproval details={details} />,
        },
        { title: "Note", component: <NoteDetailsApproval details={details} /> },
      ]
    : isOpen?.type === "Biodata"
    ? [
        {
          title: "Bio Data",
          component: <BioDataDetail details={details} role="request" />,
        },
        {
          title: "Attachment",
          component: <AttachmentDetailsApproval details={details} />,
        },
        { title: "Note", component: <NoteDetailsApproval details={details} /> },
      ]
    : isOpen?.type === "Memo"
    ? [
        {
          title: "Memo",
          component: (
            <SignMemo
              role="request"
              memo={{ ...details?.data, APPROVALS_DETAILS: details?.approvers }}
              details={details}
            />
          ),
        },
        {
          title: "Attachment",
          component: <AttachmentDetailsApproval details={details} />,
        },
        { title: "Note", component: <NoteDetailsApproval details={details} /> },
      ]
    : isOpen?.type === "academics" ||
      isOpen?.type === "Certifications" ||
      isOpen?.type === "Education" ||
      isOpen?.type === "Professional Bodies" ||
      isOpen?.type === "Work Experience"
    ? [
        {
          title: isOpen?.type,
          component: (
            <AcademicDetail
              title={isOpen?.type}
              details={details}
              handleClose={handleClose}
              role="request"
            />
          ),
        },
        {
          title: "Attachment",
          component: <AttachmentDetailsApproval details={details} />,
        },
        { title: "Note", component: <NoteDetailsApproval details={details} /> },
      ]
    : [
        {
          title: isOpen?.type || "Details",
          component: (
            <DefaultDetails
              title={isOpen?.type}
              details={details}
              role="request"
            />
          ),
        },
        {
          title: "Attachment",
          component: <AttachmentDetailsApproval details={details} />,
        },
        { title: "Note", component: <NoteDetailsApproval details={details} /> },
      ];

  const openModal = (id, type) => {
    getDetails(
      { request_id: id },
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
          });
          setIsOpen({ type: type, status: true });
        },
        onError: (err) => {
          console.log(err);
          setIsOpen({ type: type, status: true });
        },
      }
    );
  };

  return (
    <>
      <PageHeader
        header_text={"Request"}
        breadCrumb_data={[{ name: "Self Service" }, { name: "Request" }]}
      />
      <RequestTable2
        rows={tableData?.length ? tableData : []}
        handleOpenDrawer={openModal}
        requestStatus={"pending"}
        isLoading={pendingLoading}
      />

      <ExpandedDrawerWithButton isOpen={isOpen?.status} onClose={handleClose}>
        <FormDrawer
          title={"Who you be:"}
          tabs={[
            ...tabs,
            {
              title: "Approval history",
              component: <ApprovalHistory details={details} />,
            },
          ]}
        ></FormDrawer>
      </ExpandedDrawerWithButton>
    </>
  );
};

export default QuickRequestComponent;
