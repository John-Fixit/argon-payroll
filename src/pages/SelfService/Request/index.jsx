/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import PageHeader from "../../../components/payroll_components/PageHeader";
import Separator from "../../../components/payroll_components/Separator";
import TopCards from "./TopCards";
import ExpandedDrawerWithButton from "../../../components/modals/ExpandedDrawerWithButton";
import FormDrawer from "../../../components/payroll_components/FormDrawer";
import { Tabs, Tab, useDisclosure } from "@nextui-org/react";
import RequestTable from "./RequestTable";
import {
  APPROVED_REQUEST,
  DECLINED_REQUEST,
  PENDING_REQUEST,
  data,
} from "./data";
import LeaveDetail from "../../Approval/LeaveDetail";
import BioDataDetail from "../../Approval/BioDataDetail";
import ExpenseDetail from "../../Approval/ExpenseDetail";
import AcademicDetail from "../../Approval/AcademicDetail";
import AttachmentDetail from "../../Approval/AttachmentDetail";
import ApprovalHistory from "../../Approval/ApprovalHistory";
import DTA_FORM from "./DTA_form";
import Expense_FORM from "./Expense_Form";
import GeneralTabs from "../../../components/tabs/GeneralTabs";
import RequestTable2 from "./RequestTable2";
import OtherRequest from "./OtherRequest";
import Label from "../../../components/forms/FormElements/Label";
import { DatePicker } from "antd";
import moment from "moment";
import { TbBuildingMonument } from "react-icons/tb";
import { GiTeamIdea } from "react-icons/gi";
import { FaHouseMedical } from "react-icons/fa6";
import {
  MdOutlineCancel,
  MdOutlineCheckCircle,
  MdOutlinePending,
  MdOutlineReviews,
} from "react-icons/md";
import {
  useGetMyRequests,
  useGetRequestDetail,
} from "../../../API/api_urls/my_approvals";
import useCurrentUser from "../../../hooks/useCurrentUser";
import Drawer from "../../../components/Request&FormComponent/Drawer";
import RequestDetail from "./RequestDetail";
import { useQueryClient } from "@tanstack/react-query";
import ProfileDetail from "../../Approval/ProfileDetails";
import AttachmentDetailsApproval from "../../../components/core/approvals/AttachmentDetailsApproval";
import NoteDetailsApproval from "../../../components/core/approvals/NoteDetailsApproval";
import FamilyDetail from "../../Approval/FamilyDetail";
import SignMemo from "../../home/Engage/memo/components/SignMemo";
import DefaultDetails from "../../Approval/DefaultDetails";
import LeaveReturnDetails from "../../Approval/LeaveReturn";
import PerformanceApprovalDrawer from "../../Approval/AperApprovalView";

// new
const tabElements = [
  {
    name: "request",
    label: "Request",
    step: 1,
  },
  {
    name: "others",
    label: "Other Request",
    step: 2,
  },
];

// new

export default function Request() {
  // new
  const [requestStatus, setRequestStatus] = useState("");
  const [details, setDetails] = useState({
    approvers: [],
    attachments: [],
    data: null,
    notes: [],
  });

  // for aper
  const [selectedTab, setSelectedTab] = useState(0);
  const {isOpen:isAperOpen, onOpen:onAperOpen, onClose:onAperClose} = useDisclosure()

  const { mutate: getDetails } = useGetRequestDetail();

  const [selected, setSelected] = useState("");

  const [isOpen, setIsOpen] = useState({ type: "", status: false });
  const [dates, setDates] = useState({ start_date: "", end_date: "" });

  const { userData } = useCurrentUser();
  const queryClient = useQueryClient();

  const { data: pending, isLoading: pendingLoading } = useGetMyRequests(
    "pending_hr_request",
    {
      company_id: userData?.data?.COMPANY_ID,
      staff_id: userData?.data?.STAFF_ID,
      start_date: dates.start_date,
      end_date: dates.end_date,
      status: "pending",
    }
  );
  const { data: approved, isLoading: approvedLoading } = useGetMyRequests(
    "approved_hr_request",
    {
      company_id: userData?.data?.COMPANY_ID,
      staff_id: userData?.data?.STAFF_ID,
      start_date: dates.start_date,
      end_date: dates.end_date,
      status: "approved",
    }
  );
  const { data: declined, isLoading: declinedLoading } = useGetMyRequests(
    "declined_hr_request",
    {
      company_id: userData?.data?.COMPANY_ID,
      staff_id: userData?.data?.STAFF_ID,
      start_date: dates.start_date,
      end_date: dates.end_date,
      status: "declined",
    }
  );

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
          if(type === "Performance"){
           onAperOpen()
          }else{
            setIsOpen({ type: type, status: true });
          }
        },
        onError: (err) => {
          console.log(err);
          setIsOpen({ type: type, status: false });
        },
      }
    );
  };

  const selectTab = (value) => {
    setRequestStatus(value);
  };

  const handleClose = () => {
    setIsOpen({ type: "", status: false });
    setDetails({
      approvers: [],
      attachments: [],
      data: null,
      notes: [],
    })
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

  const approvedData = approved?.data?.requests?.map((item) => {
    return {
      ...item,
      status: "approved",
    };
  });
  const pendingData = pending?.data?.requests?.map((item) => {
    return {
      ...item,
      status: "approved",
    };
  });
  const declinedData = declined?.data?.requests?.map((item) => {
    return {
      ...item,
      status: "approved",
    };
  });

  useEffect(() => {
    setRequestStatus("pending");
  }, []);

  useEffect(() => {
    const payload = {
      company_id: userData?.data?.COMPANY_ID,
      staff_id: userData?.data?.STAFF_ID,
      start_date: dates.start_date,
      end_date: dates.end_date,
    };
    if (requestStatus == "approved") {
      queryClient.invalidateQueries([
        "approved",
        {
          ...payload,
          status: "approved",
        },
      ]);
    } else if (requestStatus == "pending") {
      queryClient.invalidateQueries([
        "pending",
        {
          ...payload,
          status: "pending",
        },
      ]);
    } else if (requestStatus == "declined") {
      queryClient.invalidateQueries([
        "declined",
        {
          ...payload,
          status: "declined",
        },
      ]);
    }
  }, [requestStatus, dates, queryClient, userData]);

  let tableData =
    requestStatus === "pending"
      ? pendingData
      : requestStatus === "approved"
      ? approvedData
      : requestStatus === "declined"
      ? declinedData
      : [];

  const requestNo = (value) => {
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

  const requestHistory = [
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

  const handleFromDateChange = (date) => {
    setDates((prev) => {
      return { ...prev, start_date: moment(date).format("YYYY-MM-DD") };
    });
  };
  const handleToDateChange = (date) => {
    setDates((prev) => {
      return { ...prev, end_date: moment(date).format("YYYY-MM-DD") };
    });
  };

  return (
    <>
      <main>
        <PageHeader
          header_text={"Request"}
          breadCrumb_data={[{ name: "Self Service" }, { name: "Request" }]}
        />
        <>
          <Separator separator_text={"OVERVIEW"} />
          <TopCards
            requestHistory={requestHistory}
            requestId={requestStatus}
            requestNo={requestNo}
            selectTab={selectTab}
            loading={{
              pending: pendingLoading,
              approved: approvedLoading,
              declined: declinedLoading,
            }}
          />
        </>
        <div className="mt-5">
          <hr />
        </div>

        {/* new */}
        <div className="bg-white rounded-lg border mt-8">
          <div className="flex flex-col md:flex-row mx-3 mt-4">
            <div className="flex gap-2">
              <div className="m-2">
                <Label>From</Label>
                <DatePicker
                  onChange={(e) => handleFromDateChange(e.$d)}
                  className="w-full border outline-none focus:border-transparent h-10 rounded-md focus:outline-none md:col-span-2"
                />
              </div>

              <div className="m-2">
                <Label htmlFor="to">To</Label>
                <DatePicker
                  onChange={(e) => handleToDateChange(e.$d)}
                  className=" w-full border outline-none focus:border-transparent h-10 rounded-md focus:outline-none md:col-span-2"
                />
              </div>
            </div>
          </div>

          <RequestTable2
            rows={tableData?.length ? tableData : []}
            handleOpenDrawer={openModal}
            requestStatus={requestStatus}
            isLoading={pendingLoading || approvedLoading || declinedLoading}
          />
        </div>
      </main>

      <ExpandedDrawerWithButton maxWidth={isOpen.type == "Variation" ? 1100 :  920} isOpen={isOpen?.status} onClose={handleClose}>
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

      <PerformanceApprovalDrawer
        isOpen={isAperOpen}
        setIsOpen={()=>onAperClose()}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        incomingData={details}
        handleClose={handleClose}
        viewMode={true}
      />
    </>
  );
}
