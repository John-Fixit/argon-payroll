/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Separator from "../../components/payroll_components/Separator";
import PageHeader from "../../components/payroll_components/PageHeader";
import ApprovalTable from "./ApprovalTable";
import ExpandedDrawerWithButton from "../../components/modals/ExpandedDrawerWithButton";
import FormDrawer from "../../components/payroll_components/FormDrawer";
import LeaveDetail from "./LeaveDetail";
import BioDataDetail from "./BioDataDetail";
import ApprovalHistory from "./ApprovalHistory";
import AcademicDetail from "./AcademicDetail";
import useCurrentUser from "../../hooks/useCurrentUser";
import {
  useGetMyApprovals,
  useGetRequestDetail,
  useGetPackage,
} from "../../API/api_urls/my_approvals";
import Label from "../../components/forms/FormElements/Label";
import { DatePicker, Input, Select } from "antd";
import moment from "moment";
import {
  MdOutlineCancel,
  MdOutlineCheckCircle,
  MdOutlinePending,
} from "react-icons/md";
import RequestCard from "./RequestCard";
import { useQueryClient } from "@tanstack/react-query";

import FamilyDetail from "./FamilyDetail";
import SignMemo from "../home/Engage/memo/components/SignMemo";
import DefaultDetails from "./DefaultDetails";
import AttachmentDetailsApproval from "../../components/core/approvals/AttachmentDetailsApproval";
import NoteDetailsApproval from "../../components/core/approvals/NoteDetailsApproval";
import ProfileDetail from "./ProfileDetails";
import useGetNotificationData from "../../hooks/useGetNotificationData";
import LeaveReturnDetails from "./LeaveReturn";
import PerformanceApprovalDrawer from "./AperApprovalView";
import { useDisclosure } from "@nextui-org/react";
import { formatNaira } from "../../utils/utitlities";

const memoData = {
  APPROVALS: "2543,2544,2560",
  APPROVALS_DETAILS: [
    {
      DEPARTMENT_NAME: "ADMINISTRATION",
      FILE_NAME: null,
      FIRST_NAME: "OLUGBILE",
      IS_APPROVED: 0,
      IS_CANCELLED: 0,
      LAST_NAME: "OGUNRONBI",
      REJECTION_NOTE: null,
      REQUEST_ID: 39076,
      REQUEST_STATUS: "Declined",
      SN: 1,
      STAFF_NUMBER: "NCAA/P.1203",
      TIME_TREATED: null,
    },
    {
      FIRST_NAME: "AGBEZE",
      LAST_NAME: "OKAM",
      STAFF_NUMBER: "NCAA/P.1059",
      FILE_NAME: null,
      REQUEST_ID: 39076,
      IS_APPROVED: 0,
      IS_CANCELLED: 0,
      REJECTION_NOTE: null,
      REQUEST_STATUS: "Declined",
      SN: 2,
      TIME_TREATED: null,
    },
    {
      FIRST_NAME: "BUSOLA",
      LAST_NAME: "AJAYI",
      STAFF_NUMBER: "NCAA/P.1797",
      FILE_NAME: null,
      REQUEST_ID: 39076,
      IS_APPROVED: 0,
      IS_CANCELLED: 0,
      REJECTION_NOTE: null,
      REQUEST_STATUS: "Declined",
      SN: 3,
      TIME_TREATED: null,
    },
  ],
  CURRENT_SN: 1,
  DATE_TREATED: null,
  DESIGNATION_NAME: "AVIATION SAFETY INSPECTOR",
  FIRST_NAME: "ABDULWAHAB",
  LAST_NAME: "WILLIAMS",
  MAX_SN: 3,
  MEMO_CONTENT:
    "<p>Timely project submission for new staff under their jurisdictions</p>",
  PACKAGE_ID: 19,
  PACKAGE_NAME: "Memo",
  RECIPIENT: [
    {
      STAFF_ID: 1828,
      FIRST_NAME: "ISIOMA",
      LAST_NAME: "NWABUDIKE",
      DESIGNATION_NAME: "PRINCIPAL AVSEC OFFICER",
    },
    {
      STAFF_ID: 1970,
      FIRST_NAME: "OLAYINKA",
      LAST_NAME: "BABAOYE-IRIOBE",
      DESIGNATION_NAME: "GM. (ATO)",
    },
  ],
  RECIPIENT_TYPE: "STAFF",
  RECIPIENT_VALUE: null,
  REQUEST_DATE: "2024-08-09 01:29:05.000",
  REQUEST_ID: 39076,
  SUBJECT: "project Submission",
  TO: "ISIOMA NWABUDIKE (PRINCIPAL AVSEC OFFICER),OLAYINKA BABAOYE-IRIOBE (GM. (ATO))",
};

const Approval = () => {
  const [filterOpened, setFilterOpened] = useState(false);
  const [actionOpened, setActionOpened] = useState(false);
  const [isOpen, setIsOpen] = useState({ type: "", status: false });
  const [filtertableData, setFiltertableData] = useState([]);
  const [staffname, setStaffName] = useState("");
  const [datesAndPackageID, setDatesAndPackageID] = useState({
    start_date: "",
    end_date: "",
    package_id: null,
  });
  const [details, setDetails] = useState({
    approvers: [],
    attachments: [],
    data: null,
    notes: [],
    requestID: null,
  });

  // for aper
  const [selectedTab, setSelectedTab] = useState(0);
  const {
    isOpen: isAperOpen,
    onOpen: onAperOpen,
    onClose: onAperClose,
  } = useDisclosure();

  const [approvalStatus, setApprovalStatus] = useState("pending");
  const { userData } = useCurrentUser();
  const { getAvailableNotification } = useGetNotificationData();

  // const { mutate: getMyApprovals } = useGetMyApprovals();
  const { mutate: getDetails, isPending: detailsPending } =
    useGetRequestDetail();

  const queryClient = useQueryClient();

  const { data: get_packages, isLoading: packageLoading } = useGetPackage(
    userData?.data?.COMPANY_ID
  );

  const packageData = get_packages?.data?.data?.map((item) => {
    return {
      ...item,
      value: item.PACKAGE_ID,
      label: item.PACKAGE_NAME,
    };
  });

  const {
    data: pending,
    isLoading: pending_loading,
    refetch,
  } = useGetMyApprovals("pending_approval", {
    company_id: userData?.data?.COMPANY_ID,
    staff_id: userData?.data?.STAFF_ID,
    start_date: datesAndPackageID?.start_date,
    end_date: datesAndPackageID?.end_date,
    package_id: datesAndPackageID?.package_id,
    status: "pending",
  });

  const {
    data: approved,
    isLoading: approved_loading,
    refetch: refetchApproved,
  } = useGetMyApprovals("approved_approval", {
    company_id: userData?.data?.COMPANY_ID,
    staff_id: userData?.data?.STAFF_ID,
    start_date: datesAndPackageID.start_date,
    end_date: datesAndPackageID.end_date,
    package_id: datesAndPackageID?.package_id,
    status: "approved",
  });
  const {
    data: declined,
    isLoading: declined_loading,
    refetch: refetchDeclined,
  } = useGetMyApprovals("declined_approval", {
    company_id: userData?.data?.COMPANY_ID,
    staff_id: userData?.data?.STAFF_ID,
    start_date: datesAndPackageID.start_date,
    end_date: datesAndPackageID.end_date,
    package_id: datesAndPackageID?.package_id,
    status: "declined",
  });

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

  const formatVariationDetail = useCallback((requestData) => {
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
    return formattedData;
  }, []);

  // console.log('hrer')
  const openModal = (id, type, pk) => {
    // if(id != null ) return;
    // console.log('here' );
    // console.log(id, '59388' );

    getDetails(
      { request_id: id }, // 59388 },
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
            data:
              type === "Variation"
                ? formatVariationDetail(requestData)
                : requestData, // removed staff_id from summary
            requestID: id, //59388 //
          });
          if (type === "Performance") {
            onAperOpen();
          } else {
            setIsOpen({ type: type, status: true });
          }
        },
        onError: (err) => {
          // console.log(err);
          setIsOpen({ type: type, status: false });
        },
      }
    );
  };

  const selectTab = (value) => {
    setApprovalStatus(value);
  };

  const handleClose = (refreshSignnal) => {
    setIsOpen({ type: "", status: false });

    setDetails({
      approvers: [],
      attachments: [],
      data: null,
      notes: [],
      requestID: null,
    });

    if (refreshSignnal === "refresh") {
      refetch();
      refetchApproved();
      refetchDeclined();
      getAvailableNotification();
      setSelectedTab(0);
      setStaffName("");
    }
  };

  // close the modal onclicking the body
  const close = () => {
    if (filterOpened) {
      setFilterOpened(false);
    }
    if (actionOpened) {
      setActionOpened(false);
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
              currentStatus={approvalStatus}
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
              currentStatus={approvalStatus}
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
              currentStatus={approvalStatus}
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
              currentStatus={approvalStatus}
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
              currentStatus={approvalStatus}
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
              currentStatus={approvalStatus}
            />
          ),
        },
        {
          title: "Attachment",
          component: <AttachmentDetailsApproval details={details} />,
        },
        { title: "Note", component: <NoteDetailsApproval details={details} /> },
      ]
    : isOpen.type == "Variation"
    ? [
        {
          title: "Variation",
          component: (
            <DefaultDetails
              title={isOpen?.type}
              details={details}
              handleClose={handleClose}
              currentStatus={approvalStatus}
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
              currentStatus={approvalStatus}
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
      status: "pending",
    };
  });
  const declinedData = declined?.data?.requests?.map((item) => {
    return {
      ...item,
      status: "declined",
    };
  });

  useEffect(() => {
    const payload = {
      company_id: userData?.data?.COMPANY_ID,
      staff_id: userData?.data?.STAFF_ID,
      start_date: datesAndPackageID.start_date,
      end_date: datesAndPackageID.end_date,
    };
    if (approvalStatus == "approved") {
      queryClient.invalidateQueries([
        "approved_approval",
        {
          ...payload,
          status: "approved",
        },
      ]);
    } else if (approvalStatus == "pending") {
      queryClient.invalidateQueries([
        "pending_approval",
        {
          ...payload,
          status: "pending",
        },
      ]);
    } else if (approvalStatus == "declined") {
      queryClient.invalidateQueries([
        "declined_approval",
        {
          ...payload,
          status: "declined",
        },
      ]);
    } else if (approvalStatus == "cancelled") {
      //        queryClient.invalidateQueries([
      // "cancelled",
      // {
      //    ...payload,
      //     status: "cancelled"
      //   }
      // ])
    }
  }, [approvalStatus, datesAndPackageID, queryClient, userData]);

  let tableData =
    approvalStatus === "pending"
      ? pendingData
      : approvalStatus === "approved"
      ? approvedData
      : approvalStatus === "declined"
      ? declinedData
      : [];

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

  const handleFromDateChange = (date) => {
    if (!date) {
      setDatesAndPackageID((prev) => {
        return { ...prev, start_date: "" };
      });
      return;
    }
    setDatesAndPackageID((prev) => {
      return { ...prev, start_date: moment(date).format("YYYY-MM-DD") };
    });
  };

  const handleToDateChange = (date) => {
    if (!date) {
      setDatesAndPackageID((prev) => {
        return { ...prev, end_date: "" };
      });
      return;
    }
    setDatesAndPackageID((prev) => {
      return { ...prev, end_date: moment(date).format("YYYY-MM-DD") };
    });
  };

  const handleSelectPackage = (value) => {
    setDatesAndPackageID((prev) => {
      return { ...prev, package_id: value };
    });
  };
  const handleSearchByStaff = (e) => {
    // e.preventDefault();

    setStaffName(e.target.value);

    // const data = tableData?.filter(
    //   (d) =>
    //     d?.FIRST_NAME?.toLowerCase()?.includes(e.target.value) ||
    //     d?.LAST_NAME?.toLowerCase()?.includes(e.target.value)
    // );

    // setFiltertableData(data);
  };

  return (
    <>
      <div className="py-8 font-helvetica" onClick={close}>
        <PageHeader
          header_text={"Approval"}
          breadCrumb_data={[{ name: "Self Service" }, { name: "Approvals" }]}
        />

        <>
          <Separator separator_text={"OVERVIEW"} />
        </>

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
        <div className="bg-white rounded-lg border mt-8">
          <div className="flex flex-col md:flex-row mt-4 mx-2">
            <div className="flex gap-2">
              <div className="m-2">
                <Label>From</Label>
                <DatePicker
                  size="large"
                  placeholder="Select Start Date"
                  onChange={(e) => handleFromDateChange(e.$d)}
                  className="w-full border outline-none focus:border-transparent h-10 rounded-md focus:outline-none md:col-span-2"
                />
              </div>
              <div className="m-2">
                <Label htmlFor="to">To</Label>
                <DatePicker
                  size="large"
                  placeholder="Select End Date"
                  onChange={(e) => handleToDateChange(e.$d)}
                  className=" w-full border outline-none focus:border-transparent h-10 rounded-md focus:outline-none md:col-span-2"
                />
              </div>
              <div className="m-2">
                <Label htmlFor="to">Request Type</Label>
                <Select
                  size="large"
                  allowClear
                  showSearch
                  placeholder="Select Package"
                  optionFilterProp="label"
                  options={packageData}
                  loading={packageLoading}
                  value={datesAndPackageID?.package_id}
                  className="w-full rounded-md"
                  onChange={handleSelectPackage}
                />
              </div>
              <div className="m-2">
                <Label htmlFor="to">Search by Staff</Label>
                <Input
                  size="large"
                  placeholder="Search"
                  value={staffname}
                  allowClear
                  className="w-full rounded-md"
                  onChange={handleSearchByStaff}
                />
              </div>
            </div>
          </div>
          <ApprovalTable
            rows={tableData?.length ? tableData : []}
            handleOpenDrawer={openModal}
            requestStatus={approvalStatus}
            isLoading={pending_loading || approved_loading || declined_loading}
            detailsPending={detailsPending}
            filterValue={staffname}
          />
        </div>

        <ExpandedDrawerWithButton
          maxWidth={isOpen.type == "Variation" ? 1100 : 920}
          isOpen={isOpen.status}
          onClose={handleClose}
        >
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
      </div>
      <PerformanceApprovalDrawer
        isOpen={isAperOpen}
        setIsOpen={() => onAperClose()}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        incomingData={details}
        handleClose={handleClose}
      />
    </>
  );
};

export default Approval;
