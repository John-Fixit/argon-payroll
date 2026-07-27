/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from "react";

import { DatePicker, Input, Select } from "antd";
import moment from "moment";
import {
  MdOutlineCancel,
  MdOutlineCheckCircle,
  MdOutlinePending,
} from "react-icons/md";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetAllRequests,
  useGetPackage,
  useGetRequestDetail,
} from "../../../API/api_urls/my_approvals";
import useCurrentUser from "../../../hooks/useCurrentUser";
import LeaveDetail from "../../Approval/LeaveDetail";
import FamilyDetail from "../../Approval/FamilyDetail";
import BioDataDetail from "../../Approval/BioDataDetail";
import SignMemo from "../../home/Engage/memo/components/SignMemo";

import AcademicDetail from "../../Approval/AcademicDetail";
import PageHeader from "../../../components/payroll_components/PageHeader";
import Separator from "../../../components/payroll_components/Separator";
import RequestCard from "../../Approval/RequestCard";
import Label from "../../../components/forms/FormElements/Label";

import ExpandedDrawerWithButton from "../../../components/modals/ExpandedDrawerWithButton";
import FormDrawer from "../../../components/payroll_components/FormDrawer";
import ApprovalHistory from "../../Approval/ApprovalHistory";
import RequestTable2 from "../../SelfService/Request/RequestTable2";
import DefaultDetails from "../../Approval/DefaultDetails";
import AttachmentDetailsApproval from "../../../components/core/approvals/AttachmentDetailsApproval";
import NoteDetailsApproval from "../../../components/core/approvals/NoteDetailsApproval";
import ProfileDetail from "../../Approval/ProfileDetails";
import ApprovalHRTable from "./components/ApprovalHRTable";
import ApprovalBarChart from "./components/ApprovalBarChart";
import ApprovalPieChart from "./components/ApprovalPieChart";
import { extractStatisticsByCategory } from "../../../utils/extractStatisticByCategory";
import StatPieChart from "../../../components/statisticGraphs/StatPieChart";
import StatBarChart from "../../../components/statisticGraphs/StatBarChart";
import LeaveReturnDetails from "../../Approval/LeaveReturn";

// const memoData = {
//   APPROVALS: "2543,2544,2560",
//   APPROVALS_DETAILS: [
//     {
//       DEPARTMENT_NAME: "ADMINISTRATION",
//       FILE_NAME: null,
//       FIRST_NAME: "OLUGBILE",
//       IS_APPROVED: 0,
//       IS_CANCELLED: 0,
//       LAST_NAME: "OGUNRONBI",
//       REJECTION_NOTE: null,
//       REQUEST_ID: 39076,
//       REQUEST_STATUS: "Declined",
//       SN: 1,
//       STAFF_NUMBER: "NCAA/P.1203",
//       TIME_TREATED: null,
//     },
//     {
//       FIRST_NAME: "AGBEZE",
//       LAST_NAME: "OKAM",
//       STAFF_NUMBER: "NCAA/P.1059",
//       FILE_NAME: null,
//       REQUEST_ID: 39076,
//       IS_APPROVED: 0,
//       IS_CANCELLED: 0,
//       REJECTION_NOTE: null,
//       REQUEST_STATUS: "Declined",
//       SN: 2,
//       TIME_TREATED: null,
//     },
//     {
//       FIRST_NAME: "BUSOLA",
//       LAST_NAME: "AJAYI",
//       STAFF_NUMBER: "NCAA/P.1797",
//       FILE_NAME: null,
//       REQUEST_ID: 39076,
//       IS_APPROVED: 0,
//       IS_CANCELLED: 0,
//       REJECTION_NOTE: null,
//       REQUEST_STATUS: "Declined",
//       SN: 3,
//       TIME_TREATED: null,
//     },
//   ],
//   CURRENT_SN: 1,
//   DATE_TREATED: null,
//   DESIGNATION_NAME: "AVIATION SAFETY INSPECTOR",
//   FIRST_NAME: "ABDULWAHAB",
//   LAST_NAME: "WILLIAMS",
//   MAX_SN: 3,
//   MEMO_CONTENT:
//     "<p>Timely project submission for new staff under their jurisdictions</p>",
//   PACKAGE_ID: 19,
//   PACKAGE_NAME: "Memo",
//   RECIPIENT: [
//     {
//       STAFF_ID: 1828,
//       FIRST_NAME: "ISIOMA",
//       LAST_NAME: "NWABUDIKE",
//       DESIGNATION_NAME: "PRINCIPAL AVSEC OFFICER",
//     },
//     {
//       STAFF_ID: 1970,
//       FIRST_NAME: "OLAYINKA",
//       LAST_NAME: "BABAOYE-IRIOBE",
//       DESIGNATION_NAME: "GM. (ATO)",
//     },
//   ],
//   RECIPIENT_TYPE: "STAFF",
//   RECIPIENT_VALUE: null,
//   REQUEST_DATE: "2024-08-09 01:29:05.000",
//   REQUEST_ID: 39076,
//   SUBJECT: "project Submission",
//   TO: "ISIOMA NWABUDIKE (PRINCIPAL AVSEC OFFICER),OLAYINKA BABAOYE-IRIOBE (GM. (ATO))",
// };

const ApprovalHR = () => {
  const [filterOpened, setFilterOpened] = useState(false);
  const [actionOpened, setActionOpened] = useState(false);
  const [isOpen, setIsOpen] = useState({ type: "", status: false });
  const [dates, setDates] = useState({ start_date: "", end_date: "" });
  const [details, setDetails] = useState({
    approvers: [],
    attachments: [],
    data: null,
    notes: [],
  });

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [datesAndPackageID, setDatesAndPackageID] = useState({
    start_date: "",
    end_date: "",
    package_id: null,
  });
  const [staffname, setStaffName] = useState("");

  const [approvalStatus, setApprovalStatus] = useState("pending");
  const { userData } = useCurrentUser();

  // const { mutate: getMyApprovals } = useGetMyApprovals();
  const { mutate: getDetails } = useGetRequestDetail();

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

  const { data: pending, isLoading: pending_loading } = useGetAllRequests(
    "pending",
    {
      company_id: userData?.data?.COMPANY_ID,
      staff_id: userData?.data?.STAFF_ID,
      start_date: datesAndPackageID.start_date,
      end_date: datesAndPackageID.end_date,
      status: "pending",
    }
  );
  const { data: approved, isLoading: approved_loading } = useGetAllRequests(
    "approved",
    {
      company_id: userData?.data?.COMPANY_ID,
      staff_id: userData?.data?.STAFF_ID,
      start_date: datesAndPackageID?.start_date,
      end_date: datesAndPackageID?.end_date,
      status: "approved",
    }
  );
  const { data: declined, isLoading: declined_loading } = useGetAllRequests(
    "declined",
    {
      company_id: userData?.data?.COMPANY_ID,
      staff_id: userData?.data?.STAFF_ID,
      start_date: datesAndPackageID.start_date,
      end_date: datesAndPackageID.end_date,

      status: "declined",
    }
  );

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
    // {
    //   id: "cancelled",
    //   label: "Cancelled",
    //   icon: TiCancel,
    //   b_color: "bg-gray-100",
    //   t_color: "text-gray-500",
    // },
  ];

  const openModal = (id, type) => {
    getDetails(
      { request_id: id },
      {
        onSuccess: (data) => {
          // console.log(data?.data?.data);
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

  const selectTab = (value) => {
    setApprovalStatus(value);
  };

  const handleClose = () => {
    setIsOpen({ type: "", status: false });
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
    : isOpen?.type === "Family" || isOpen?.type === "Next Of Kin"
    ? [
        {
          title: isOpen?.type === "Family" ? "Family Details" : "Next Of Kin",
          component: (
            <FamilyDetail
              title={
                isOpen?.type === "Family" ? "Family Details" : "Next Of Kin"
              }
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
              memo={{ ...details?.data, APPROVALS_DETAILS: details?.approvers }}
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
    const payload = {
      company_id: userData?.data?.COMPANY_ID,
      staff_id: userData?.data?.STAFF_ID,
      start_date: datesAndPackageID.start_date,
      end_date: datesAndPackageID.end_date,
    };
    if (approvalStatus == "approved") {
      queryClient.invalidateQueries([
        "approved",
        {
          ...payload,
          status: "approved",
        },
      ]);
    } else if (approvalStatus == "pending") {
      queryClient.invalidateQueries([
        "pending",
        {
          ...payload,
          status: "pending",
        },
      ]);
    } else if (approvalStatus == "declined") {
      queryClient.invalidateQueries([
        "declined",
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
  }, [
    approvalStatus,
    datesAndPackageID.end_date,
    datesAndPackageID.start_date,
    queryClient,
    userData,
  ]);

  let tableData = useMemo(() => {
    const potentialData =
      approvalStatus === "pending"
        ? pendingData
        : approvalStatus === "approved"
        ? approvedData
        : approvalStatus === "declined"
        ? declinedData
        : [];
    if (datesAndPackageID?.package_id) {
      return potentialData?.filter(
        (item) => item?.PACKAGE_ID === datesAndPackageID?.package_id
      );
    }
    return potentialData;
  }, [
    approvalStatus,
    approvedData,
    datesAndPackageID?.package_id,
    declinedData,
    pendingData,
  ]);

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

  // const handleFromDateChange = (date) => {
  //   if (!date) {
  //     setDates((prev) => {
  //       return { ...prev, start_date: "" };
  //     });
  //     return;
  //   }
  //   setDates((prev) => {
  //     return { ...prev, start_date: moment(date).format("YYYY-MM-DD") };
  //   });
  // };

  // const handleToDateChange = (date) => {
  //   if (!date) {
  //     setDates((prev) => {
  //       return { ...prev, end_date: "" };
  //     });
  //     return;
  //   }
  //   setDates((prev) => {
  //     return { ...prev, end_date: moment(date).format("YYYY-MM-DD") };
  //   });
  // };

  //================================statistics data===================

  const statData = useMemo(() => {
    return approvalStatus === "pending"
      ? pending?.data?.statistics
      : approvalStatus === "approved"
      ? approved?.data?.statistics
      : approvalStatus === "declined"
      ? declined?.data?.statistics
      : [];
  }, [
    approvalStatus,
    pending?.data?.statistics,
    approved?.data?.statistics,
    declined?.data?.statistics,
  ]);

  const extractedData = useMemo(() => {
    return statData ? extractStatisticsByCategory(statData) : null;
  }, [statData]);

  // const is_loading = useMemo(()=>{

  // }, [])

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

  const handleChange = (value) => {
    setRowsPerPage(value);
  };

  return (
    <>
      <div className="py-8 font-helvetica" onClick={close}>
        <PageHeader
          header_text={"Request"}
          breadCrumb_data={[{ name: "HRIS" }, { name: "Request" }]}
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

        {/* <ApprovalBarChart />
        <ApprovalPieChart /> */}
        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 mt-4 mb-5 gap-5">
          <StatPieChart
            title={"DEPARTMENT"}
            labels={extractedData?.DEPARTMENT?.labels}
            stat_data={extractedData?.DEPARTMENT?.stat_data}
          />
          <StatPieChart
            title={"PACKAGE"}
            labels={extractedData?.PACKAGE?.labels}
            stat_data={extractedData?.PACKAGE?.stat_data}
          />
        </div>

        <div className="bg-white rounded-xl border mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center mt-4 mx-2">
            <div className="flex gap-2">
              <div className="m-2">
                <Label>From</Label>
                <DatePicker
                  onChange={(e) => handleFromDateChange(e?.$d)}
                  className="w-full border outline-none focus:border-transparent h-10 rounded-md focus:outline-none md:col-span-2"
                />
              </div>

              <div className="m-2">
                <Label htmlFor="to">To</Label>
                <DatePicker
                  onChange={(e) => handleToDateChange(e?.$d)}
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
            <div className="space-x-2">
              <span className="font-helvetica">Rows per page:</span>
              <Select
                defaultValue="15"
                value={rowsPerPage}
                onChange={handleChange}
                options={[
                  {
                    value: "15",
                    label: "15",
                  },
                  {
                    value: "25",
                    label: "25",
                  },
                  {
                    value: "50",
                    label: "50",
                  },
                  {
                    value: "100",
                    label: "100",
                  },
                  {
                    value: tableData?.length,
                    label: "All",
                  },
                ]}
              />
            </div>
          </div>
          <ApprovalHRTable
            rows={tableData?.length ? tableData : []}
            handleOpenDrawer={openModal}
            approvalStatus={approvalStatus}
            filterValue={staffname}
            rowsPerPage={rowsPerPage}
          />
          {/* <ApprovalTable rows={tableData?.length?tableData:[]} handleOpenDrawer={openModal} /> */}
        </div>

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
      </div>
    </>
  );
};

export default ApprovalHR;
