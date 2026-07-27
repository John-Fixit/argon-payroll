import { useState } from "react";
import {
  useGetMyApprovals,
  useGetRequestDetail,
} from "../../../API/api_urls/my_approvals";
import useCurrentUser from "../../../hooks/useCurrentUser";
import ApprovalTable from "../../../pages/Approval/ApprovalTable";
import ExpandedDrawerWithButton from "../../modals/ExpandedDrawerWithButton";
import FormDrawer from "../../payroll_components/FormDrawer";
import LeaveDetail from "../../../pages/Approval/LeaveDetail";
import DefaultDetails from "../../../pages/Approval/DefaultDetails";
import AttachmentDetailsApproval from "./AttachmentDetailsApproval";
import NoteDetailsApproval from "./NoteDetailsApproval";
import ApprovalHistory from "../../../pages/Approval/ApprovalHistory";
import AcademicDetail from "../../../pages/Approval/AcademicDetail";
import SignMemo from "../../../pages/home/Engage/memo/components/SignMemo";
import BioDataDetail from "../../../pages/Approval/BioDataDetail";
import ProfileDetail from "../../../pages/Approval/ProfileDetails";
import LeaveReturnDetails from "../../../pages/Approval/LeaveReturn";
import PageHeader from "../../payroll_components/PageHeader";
import RequestCard from "../../../pages/Approval/RequestCard";
import { MdOutlineCancel, MdOutlineCheckCircle, MdOutlinePending } from "react-icons/md";

const QuickApprovalComponent = () => {
  //=================== react hooks ==============================================
  const [details, setDetails] = useState({
    approvers: [],
    attachments: [],
    data: null,
    notes: [],
    requestID: null,
  });
  const [isOpen, setIsOpen] = useState({ type: "", status: false });

  const [approvalStatus, setApprovalStatus] = useState("pending");
  //==============================================================================

  //================================== External hook =============================
  const { userData } = useCurrentUser();

  const { mutate: getDetails } = useGetRequestDetail();

  const {
    data: pending,
    isLoading: pending_loading,
    refetch,
  } = useGetMyApprovals("pending_approval", {
    company_id: userData?.data?.COMPANY_ID,
    staff_id: userData?.data?.STAFF_ID,
    start_date: "",
    end_date: "",
    status: "pending",
  });

  const {
    data: approved,
    isLoading: approved_loading,
    refetch: refetchApproved,
  } = useGetMyApprovals("approved_approval", {
    company_id: userData?.data?.COMPANY_ID,
    staff_id: userData?.data?.STAFF_ID,
    start_date: "",
    end_date: "",
    package_id: 2,
    status: "approved",
  });
  const {
    data: declined,
    isLoading: declined_loading,
    refetch: refetchDeclined,
  } = useGetMyApprovals("declined_approval", {
    company_id: userData?.data?.COMPANY_ID,
    staff_id: userData?.data?.STAFF_ID,
    start_date: "",
    end_date: "",
    package_id: 2,
    status: "declined",
  });

  //================================================================================

  const pendingData = pending?.data?.requests?.map((item) => {
    return {
      ...item,
      status: "pending",
    };
  });
  const approvedData = approved?.data?.requests?.map((item) => {
    return {
      ...item,
      status: "approved",
    };
  });
  const declinedData = declined?.data?.requests?.map((item) => {
    return {
      ...item,
      status: "declined",
    };
  });

  let tableData =
    approvalStatus === "pending"
      ? pendingData
      : approvalStatus === "approved"
      ? approvedData
      : approvalStatus === "declined"
      ? declinedData
      : [];

  const handleClose = (refreshSignnal) => {
    setIsOpen({ type: "", status: false });

    if (refreshSignnal === "refresh") {
      refetch();
      refetchApproved();
      refetchDeclined();
        // getAvailableNotification();
    }
  };

  const tabs = !isOpen?.status
    ? []
    : isOpen?.type === "Leave"
    ? [
        {
          title: "Leave",
          component: (
            <LeaveDetail
              details={details}
              handleClose={handleClose}
              currentStatus={"pending"}
            />
          ),
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
          component: (
            <LeaveReturnDetails
              details={details}
              handleClose={handleClose}
              currentStatus={"pending"}
            />
          ),
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
          component: (
            <ProfileDetail
              details={details}
              handleClose={handleClose}
              currentStatus={"pending"}
            />
          ),
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
          component: (
            <BioDataDetail
              details={details}
              handleClose={handleClose}
              currentStatus={"pending"}
            />
          ),
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
              role="approve"
              memo={{ ...details?.data, APPROVALS_DETAILS: details?.approvers }}
              details={details}
              handleClose={handleClose}
              currentStatus={"pending"}
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
          title: "Educations",
          component: (
            <AcademicDetail
              title={isOpen?.type}
              details={details}
              handleClose={handleClose}
              currentStatus={"pending"}
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
              handleClose={handleClose}
              currentStatus={"pending"}
            />
          ),
        },
        {
          title: "Attachment",
          component: <AttachmentDetailsApproval details={details} />,
        },
        { title: "Note", component: <NoteDetailsApproval details={details} /> },
      ];

  const openModal = (id, type, ) => {
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
            requestID: id,
          });
          setIsOpen({ type: type, status: true });
        },
        onError: (err) => {
          console.log(err);
          setIsOpen({ type: type, status: false });
        },
      }
    );
  };



  const approvalHistory = [
    {
      id: "pending",
      label: "Pending",
      icon: MdOutlinePending,
      b_color: "bg-amber-100",
      t_color: "text-amber-500",
    },
    {
      id: "approved",
      label: "Approved",
      icon: MdOutlineCheckCircle,
      b_color: "bg-green-100",
      t_color: "text-green-500",
    },
    {
      id: "declined",
      label: "Declined",
      icon: MdOutlineCancel,
      b_color: "bg-red-100",
      t_color: "text-red-500",
    },
  ];

  const selectTab = (value) => {
    setApprovalStatus(value);
    if (value == "pending") {
      refetch()
    }else if(value == "approved"){
      refetchApproved()
    }else if(value == "declined"){
      refetchDeclined()
    }
  };

  const approvalNo = (value) => {
    if (value == "pending") {
      return pendingData;
    } else if (value == "approved") {
      return approvedData;
    } else if (value == "declined") {
      return declinedData;
    } else {
      return [];
    }
  };


  return (
    <>
    <PageHeader
          header_text={"Approvals"}
          breadCrumb_data={[{ name: "Self Service" }, { name: "Approvals" }]}
        />


      <RequestCard
          requestHistory={approvalHistory}
          selectTab={selectTab}
          requestStatus={approvalStatus}
          requestNo={approvalNo}
          loading={{
            pending: pending_loading,
            approved: approved_loading,
            declined: declined_loading,
          }}
        />


      <ApprovalTable
        rows={tableData?.length ? tableData : []}
        handleOpenDrawer={openModal}
        requestStatus={approvalStatus}
        isLoading={pending_loading || approved_loading || declined_loading}
      />

      <ExpandedDrawerWithButton isOpen={isOpen.status} onClose={handleClose}>
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
    </>
  );
};

export default QuickApprovalComponent;
