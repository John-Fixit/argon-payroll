/* eslint-disable no-unused-vars */

import {
  MdOutlineCheckCircle,
  MdOutlinePending,
  MdOutlineReviews,
} from "react-icons/md";
import PageHeader from "../../../../components/payroll_components/PageHeader";
import Separator from "../../../../components/payroll_components/Separator";
import LeaveRequestTable from "./LeaveRequestTable";
import { useEffect, useMemo, useState } from "react";
import LeaveCards from "./LeaveCards";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import {
  useGetStaffApprovedRequest,
  useGetStaffPendingRequest,
  useGetStaffUnreturnedRequest,
} from "../../../../API/leave";
import Drawer from "../../../../components/Request&FormComponent/Drawer";
import LeaveForm from "../../../../components/Leave/LeaveForm";
import Attachments from "../../../../components/Request&FormComponent/Attachments";
import Note from "../../../../components/Request&FormComponent/Note";
import HandOverForm from "../../../../components/Request&FormComponent/HandOverForm";
import ApprovalForm from "../../../../components/Request&FormComponent/ApprovalForm";
import ScheduleForm from "../../../../components/Leave/ScheduleForm";
import LeaveReturnTextForm from "../../../../components/Request&FormComponent/LeaveReturnForms/LeaveReturnTextForm";
import LeaveDetails from "../../../../components/Leave/LeaveDetails";
import AttachmentDetail from "../../../../components/Leave/AttachmentDetail";
import NoteDetail from "../../../../components/Leave/NoteDetail";
import LeaveApprovalHistory from "../../../../components/Leave/LeaveApprovalHistory";
import { IoLockClosedOutline } from "react-icons/io5";
import { extractStatisticsByCategory } from "../../../../utils/extractStatisticByCategory";
import StatBarChart from "../../../../components/statisticGraphs/StatBarChart";
import StatPieChart from "../../../../components/statisticGraphs/StatPieChart";
import { DatePicker } from "antd";

export default function LeaveRequest() {
  const [selectedTableData, setSelectedTableData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [currentView, setCurrentView] = useState();

  const [leaveId, setLeaveId] = useState("");

  const { userData } = useCurrentUser();

  const queryPayload = {
    company_id: userData?.data?.COMPANY_ID,
    staff_id: userData?.data?.STAFF_ID,
    start_date: startDate || `1/1/${new Date().getFullYear()}`,
    end_date: endDate || new Date().toISOString().split("T")[0],
  };

  const {
    data: pendingRequest,
    refetch: refetchPending,
    isLoading: pending_loading,
    isFetching: pending_fetching,
  } = useGetStaffPendingRequest({
    ...queryPayload,
    name: "pending",
  });
  const {
    data: pendingReturnRequest,
    refetch: refetchPendingReturn,
    isLoading: pending_return_loading,
    isFetching: pending_return_fetching,
  } = useGetStaffPendingRequest({
    ...queryPayload,
    name: "pending_return",
  });

  const {
    data: approvedRequest,
    refetch: refetchApproved,
    isLoading: approved_loading,
    isFetching: approved_fetching,
  } = useGetStaffApprovedRequest(queryPayload);
  const {
    data: unreturnedRequest,
    refetch: refetchUnreturned,
    isLoading: unreturned_loading,
    isFetching: unreturned_fetching,
  } = useGetStaffUnreturnedRequest(queryPayload);

  useEffect(() => {
    setSelectedTableData(
      pendingRequest?.data?.pending?.map((leave) => {
        return { ...leave, status: "pending" };
      })
    );
    setLeaveId("pending");
  }, [pendingRequest]);

  useEffect(() => {
    if (startDate || endDate) {
      refetchPending();
      refetchPendingReturn();
      refetchApproved();
      refetchUnreturned();
    }
  }, [
    endDate,
    refetchApproved,
    refetchPending,
    refetchPendingReturn,
    refetchUnreturned,
    startDate,
  ]);

  const leaveHistory = [
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
      id: "pending_return",
      label: "Pending Return",
      icon: MdOutlinePending,
      b_color: "bg-orange-100",
      t_color: "text-orange-500",
    },
    {
      id: "unreturned",
      label: "Not Return",
      icon: IoLockClosedOutline,
      b_color: "bg-red-100",
      t_color: "text-red-300",
    },
  ];

  const leaveNo = (value) => {
    if (value == "pending") {
      return pendingRequest?.data?.pending;
    } else if (value == "approved") {
      return approvedRequest?.data?.approved;
    } else if (value == "unreturned") {
      return unreturnedRequest?.data?.unreturned;
    } else if (value == "pending_return") {
      return pendingReturnRequest?.data?.pending;
    }
  };

  const selectTab = (value) => {
    setLeaveId(value);
    if (value == "pending") {
      setSelectedTableData(
        pendingRequest?.data?.pending?.map((leave) => {
          return { ...leave, status: "pending" };
        })
      );
    } else if (value == "approved") {
      setSelectedTableData(
        approvedRequest?.data?.approved?.map((leave) => {
          return { ...leave, status: "approved" };
        })
      );
    } else if (value == "unreturned") {
      setSelectedTableData(
        unreturnedRequest?.data?.unreturned?.map((leave) => {
          return { ...leave, status: "unreturned" };
        })
      );
    } else if (value == "pending_return") {
      setSelectedTableData(
        pendingReturnRequest?.data?.pending?.map((leave) => {
          return { ...leave, status: "pending_return" };
        })
      );
    }
  };

  const [leaveInformation, setLeaveInformation] = useState({
    company_id: userData?.data?.COMPANY_ID,
    staff_id: userData?.data?.STAFF_ID,
    package_id: 5,
    leave_type: "",
    start_date: "",
    end_date: "",
    multi_date: [],
    duration: "",
    reason: "",
    internal_approvals: [],
    attachment: null,
    handovers: null,
    notes: "",
  });
  const [scheduleInformation, setScheduleInformation] = useState({
    type: "",
    dates: [],
    approvals: [],
    hand_over: {},
    attachments: [],
    note: "",
  });
  const [leaveReturnInformation, setLeaveReturnInformation] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [whatTodo, setWhatTodo] = useState("");
  const [sideBarNeeded, setSideBarNeeded] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [drawerWidth, setDrawerWidth] = useState(720);
  const [drawerHeader, setDrawerHeader] = useState({});

  const [antDate, setAntDate] = useState("");

  const [tabs, setTabs] = useState([
    { title: "Form", sub: "Fill form" },
    {
      title: "Attachments",
      sub: "Upload ",
    },
    { title: "Notes", sub: "Add Note" },
    {
      title: "HandOver",
      sub: "Upload ",
    },
    {
      title: "Approval",
      sub: "Add Note",
    },
  ]);

  useEffect(() => {
    setSelectedTab(0);
  }, [isOpen]);

  useEffect(() => {
    if (whatTodo.toLowerCase() == "apply".toLowerCase()) {
      if (tabs[selectedTab].title.toLowerCase() == "form".toLowerCase()) {
        setDrawerHeader({
          title: "Leave Form",
          description: "Fill your leave form",
        });
      } else if (
        tabs[selectedTab].title.toLowerCase() == "Approval".toLowerCase()
      ) {
        setDrawerHeader({
          title: "Approval",
          description: "Select your approvals",
        });
      } else if (
        tabs[selectedTab].title.toLowerCase() == "Handover".toLowerCase()
      ) {
        setDrawerHeader({
          title: "Hand Over",
          description: "Choose whom to hand over to",
        });
      } else if (
        tabs[selectedTab].title.toLowerCase() == "Attachments".toLowerCase()
      ) {
        setDrawerHeader({
          title: "Attachments",
          description: "Add your attachments",
        });
      } else if (
        tabs[selectedTab].title.toLowerCase() == "Notes".toLowerCase()
      ) {
        setDrawerHeader({ title: "Notes", description: "Add your notes" });
      }
    }
    if (whatTodo.toLowerCase() == "schedule".toLowerCase()) {
      if (tabs[selectedTab].title.toLowerCase() == "form".toLowerCase()) {
        setDrawerHeader({
          title: "Schedule Form",
          // description: "Schedule your leave",
          description: "",
        });
      } else if (
        tabs[selectedTab].title.toLowerCase() == "Approval".toLowerCase()
      ) {
        setDrawerHeader({
          title: "Approval",
          // description: "Select your approvals",
          description: "",
        });
      } else if (
        tabs[selectedTab].title.toLowerCase() == "Handover".toLowerCase()
      ) {
        setDrawerHeader({
          title: "Hand Over",
          // description: "Choose whom to hand over to",
          description: "",
        });
      } else if (
        tabs[selectedTab].title.toLowerCase() == "Attachments".toLowerCase()
      ) {
        setDrawerHeader({
          title: "Attachments",
          // description: "Add your attachments",
          description: "",
        });
      } else if (
        tabs[selectedTab].title.toLowerCase() == "Notes".toLowerCase()
      ) {
        setDrawerHeader({ title: "Notes", description: "Add your notes" });
      }
    }
    if (whatTodo.toLowerCase() == "resume".toLowerCase()) {
      if (tabs[selectedTab].title.toLowerCase() == "form".toLowerCase()) {
        setDrawerHeader({
          title: "Return Form",
          // description: "Select your return date",
          description: "",
        });
      } else if (
        tabs[selectedTab].title.toLowerCase() == "Approval".toLowerCase()
      ) {
        setDrawerHeader({
          title: "Approval",
          // description: "Select your approvals",
          description: "",
        });
      }
    } else if (whatTodo.toLowerCase() == "view".toLowerCase()) {
      if (tabs[selectedTab].title.toLowerCase() == "leave".toLowerCase()) {
        setDrawerHeader({
          title: "Leave Details",
          // description: "This is the details of your leave",
          description: "",
        });
      } else if (
        tabs[selectedTab].title.toLowerCase() ==
        "Approval History".toLowerCase()
      ) {
        setDrawerHeader({
          title: "Approval History",
          description: "Her shows your approvals",
        });
      } else if (
        tabs[selectedTab].title.toLowerCase() == "Attachments".toLowerCase()
      ) {
        setDrawerHeader({
          title: "Attachments",
          // description: "The is the list of your attachments",
          description: "",
        });
      } else if (
        tabs[selectedTab].title.toLowerCase() == "Notes".toLowerCase()
      ) {
        setDrawerHeader({
          title: "Notes",
          // description: "This are your note history",
          description: "",
        });
      }
    }
  }, [tabs, selectedTab, whatTodo]);

  const submitForm = () => {
    // console.log(leaveInformation);
    setLeaveInformation({
      leave_type: "",
      company_id: userData?.data?.COMPANY_ID,
      staff_id: userData?.data?.STAFF_ID,
      package_id: 5,
      start_date: "",
      end_date: "",
      multiple_date: [],
      duration: null,
      reason: "",
      approvals: [],
      attachment: null,
      handovers: null,
      notes: "",
    });
  };

  // show the drawer for the resume form
  const resume = (leave) => {
    setLeaveReturnInformation({
      company_id: userData?.data?.COMPANY_ID,
      staff_id: userData?.data?.STAFF_ID,
      package_id: 7,
      leave_id: leave?.LEAVE_ID,
      request_id: leave?.REQUEST_ID,
    });
    setTabs([
      { title: "Form" },
      {
        title: "Attachments",
      },
      { title: "Notes" },
    ]);
    setDrawerWidth(720);
    setSideBarNeeded(true);
    setWhatTodo("resume");
    setIsOpen(true);
  };

  // show the drawer for the view form
  const view = () => {
    setWhatTodo("view");
    setSideBarNeeded(true);
    setTabs([
      { title: "Leave" },
      {
        title: "Attachments",
      },
      { title: "Notes" },
      { title: "Approval History" },
    ]);
    setDrawerWidth(720);
    setIsOpen(true);
  };

  ////=======================getting of leave statistics=================================

  const statData = useMemo(() => {
    return leaveId === "pending"
      ? pendingRequest?.data?.statistics
      : leaveId === "approved"
      ? approvedRequest?.data?.statistics
      : leaveId === "unreturned"
      ? unreturnedRequest?.data?.statistics
      : leaveId === "unreturned"
      ? unreturnedRequest?.data?.statistics
      : leaveId === "pending_return"
      ? pendingReturnRequest?.data?.statistics
      : [];
  }, [
    approvedRequest?.data?.statistics,
    leaveId,
    pendingRequest?.data?.statistics,
    unreturnedRequest?.data?.statistics,
    pendingReturnRequest?.data?.statistics,
  ]);

  const extractedData = useMemo(() => {
    return statData ? extractStatisticsByCategory(statData) : null;
  }, [statData]);

  //===================================ends here========================

  return (
    <>
      <section className="max-w-[90rem] !overflow-hidden">
        <PageHeader header_text={"Leave Requests"} btnAvailable={false} />
        <Separator separator_text={"History"} />
        <LeaveCards
          leaveHistory={leaveHistory}
          leaveId={leaveId}
          leaveNo={leaveNo}
          selectTab={selectTab}
          loading={{
            pending: pending_loading || pending_fetching,
            approved: approved_loading || approved_fetching,
            unreturned: unreturned_loading || unreturned_fetching,
            pending_return: pending_return_loading || pending_return_fetching,
          }}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 mt-4 mb-5 gap-5">
          <StatBarChart
            title={"DEPARTMENT"}
            labels={extractedData?.DEPARTMENT?.labels}
            stat_data={extractedData?.DEPARTMENT?.stat_data}
          />
          <StatPieChart
            title={"LEAVE TYPE"}
            labels={extractedData?.LEAVE_TYPE?.labels}
            stat_data={extractedData?.LEAVE_TYPE?.stat_data}
          />
        </div>
        {/* leave request list table */}
        <section>
          <LeaveRequestTable
            tableData={selectedTableData}
            view={view}
            resume={resume}
            setCurrentView={setCurrentView}
            setEndDate={setEndDate}
            setStartDate={setStartDate}
            startDate={startDate}
            endDate={endDate}
            isLoading={
              pending_loading ||
              pending_fetching ||
              approved_loading ||
              approved_fetching ||
              unreturned_loading ||
              unreturned_fetching ||
              pending_return_loading ||
              pending_return_fetching
            }
          />
        </section>
      </section>

      <Drawer
        handleSubmit={submitForm}
        sideBarNeeded={sideBarNeeded}
        // drawerWidth={drawerWidth}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        header={drawerHeader}
        tabs={tabs}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        {whatTodo == "apply" && (
          <div>
            {tabs[selectedTab].title.toLowerCase() == "form".toLowerCase() && (
              <LeaveForm
                leaveInformation={leaveInformation}
                setLeaveInformation={setLeaveInformation}
              />
            )}
            {tabs[selectedTab].title.toLowerCase() ==
              "Attachments".toLowerCase() && (
              <Attachments
                setInformation={setLeaveInformation}
                token={userData?.token}
                setSelectedTab={setSelectedTab}
              />
            )}
            {tabs[selectedTab].title.toLowerCase() == "Notes".toLowerCase() && (
              <Note
                setInformation={setLeaveInformation}
                setSelectedTab={setSelectedTab}
              />
            )}
            {tabs[selectedTab].title.toLowerCase() ==
              "Handover".toLowerCase() && (
              <HandOverForm
                setInformation={setLeaveInformation}
                information={leaveInformation}
                setSelectedTab={setSelectedTab}
              />
            )}
            {tabs[selectedTab].title.toLowerCase() ==
              "Approval".toLowerCase() && (
              <ApprovalForm
                setInformation={setLeaveInformation}
                information={leaveInformation}
                setSelectedTab={setSelectedTab}
              />
            )}
          </div>
        )}
        {whatTodo == "schedule" && (
          <div>
            {tabs[selectedTab].title.toLowerCase() == "form".toLowerCase() && (
              <ScheduleForm
                information={scheduleInformation}
                setInformation={setScheduleInformation}
              />
            )}
            {tabs[selectedTab].title.toLowerCase() ==
              "Attachments".toLowerCase() && (
              <Attachments
                setInformation={setScheduleInformation}
                setSelectedTab={setSelectedTab}
              />
            )}
            {tabs[selectedTab].title.toLowerCase() == "Notes".toLowerCase() && (
              <Note
                setInformation={setScheduleInformation}
                setSelectedTab={setSelectedTab}
              />
            )}
            {tabs[selectedTab].title.toLowerCase() ==
              "Handover".toLowerCase() && (
              <HandOverForm
                setInformation={setScheduleInformation}
                setSelectedTab={setSelectedTab}
              />
            )}
            {tabs[selectedTab].title.toLowerCase() ==
              "Approval".toLowerCase() && (
              <ApprovalForm
                setInformation={setScheduleInformation}
                setSelectedTab={setSelectedTab}
              />
            )}
          </div>
        )}
        {whatTodo == "resume" && (
          <div>
            {tabs[selectedTab].title.toLowerCase() == "form".toLowerCase() && (
              <LeaveReturnTextForm
                setSelectedTab={setSelectedTab}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                information={leaveReturnInformation}
                setInformation={setLeaveReturnInformation}
                setAntDate={setAntDate}
                antDate={antDate}
              />
            )}
            {tabs[selectedTab].title.toLowerCase() ==
              "Attachments".toLowerCase() && (
              <Attachments
                setInformation={setLeaveReturnInformation}
                token={userData?.token}
                setSelectedTab={setSelectedTab}
              />
            )}
            {tabs[selectedTab].title.toLowerCase() == "Notes".toLowerCase() && (
              <Note
                setInformation={setLeaveReturnInformation}
                setSelectedTab={setSelectedTab}
              />
            )}
          </div>
        )}
        {whatTodo == "view" && (
          <div>
            {tabs[selectedTab].title.toLowerCase() == "leave".toLowerCase() && (
              <LeaveDetails currentView={currentView} />
            )}
            {tabs[selectedTab].title.toLowerCase() ==
              "Attachments".toLowerCase() && (
              <AttachmentDetail currentView={currentView} />
            )}
            {tabs[selectedTab].title.toLowerCase() == "Notes".toLowerCase() && (
              <NoteDetail currentView={currentView} />
            )}
            {tabs[selectedTab].title.toLowerCase() ==
              "Approval History".toLowerCase() && (
              <LeaveApprovalHistory currentView={currentView} />
            )}
          </div>
        )}
      </Drawer>
    </>
  );
}
