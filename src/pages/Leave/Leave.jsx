/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import Header from "../../components/Leave/Header";
import HistoryTable from "../../components/Leave/HistoryTable";
import Drawer from "../../components/Request&FormComponent/Drawer";
import Separator from "../../components/payroll_components/Separator";
import Note from "../../components/Request&FormComponent/Note";
import LeaveReturnTextForm from "../../components/Request&FormComponent/LeaveReturnForms/LeaveReturnTextForm";
import LeaveReturnApprovalForm from "../../components/Request&FormComponent/LeaveReturnForms/LeaveReturnApprovalForm";
import LeaveForm from "../../components/Leave/LeaveForm";
import Attachments from "../../components/Request&FormComponent/Attachments";
import ApprovalForm from "../../components/Request&FormComponent/ApprovalForm";
import HandOverForm from "../../components/Request&FormComponent/HandOverForm";
import DataHistory from "../../components/Leave/LeaveDetails";
import AttachmentDetail from "../../components/Leave/AttachmentDetail";
import LeaveCards from "../../components/Leave/LeaveCards";
import { Tab, Tabs } from "@nextui-org/react";
import LeaveTable from "./Tables/LeaveTable";
import ReturnTable from "./Tables/ReturnTable";
import LeaveDetails from "../../components/Leave/LeaveDetails";
import LeaveInformation from "../../components/Leave/LeaveInformation";
import ScheduleForm from "../../components/Leave/ScheduleForm";
import useCurrentUser from "../../hooks/useCurrentUser";
import {
  useApplyLeave,
  useGetPendingRequest,
  useApplyReturn,
} from "../../API/leave";
import { useGetRequest_Detail } from "../../API/api_urls/my_approvals";
import NoteDetail from "../../components/Leave/NoteDetail";
import LeaveApprovalHistory from "../../components/Leave/LeaveApprovalHistory";
import { useSaveData } from "../../components/Leave/Hooks";
import { errorToast, successToast } from "../../utils/toastMsgPop";
import LeaveAdvice from "../../components/ProfileInformation/LeaveAdvice";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import DownloadHeader from "./DownloadHeader";

const Leave = () => {
  const [loading, setLoading] = useState(false);
  const [returnLoading, setReturnLoading] = useState(false);
  const [currentView, setCurrentView] = useState({});
  const [startDate, setStartDate] = useState("");
  const { userData } = useCurrentUser();
  const leaveAdviceRef = useRef();

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
  const [leaveReturnInformation, setLeaveReturnInformation] = useState({
    company_id: userData?.data?.COMPANY_ID,
    staff_id: userData?.data?.STAFF_ID,
    package_id: 7,
    return_date: "",
    leave_id: "",
    request_id: "",
    notes: "",
    attachment: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [whatTodo, setWhatTodo] = useState("");
  const [sideBarNeeded, setSideBarNeeded] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [drawerWidth, setDrawerWidth] = useState(720);
  const [drawerHeader, setDrawerHeader] = useState({});

  const [antDate, setAntDate] = useState("");
  const { clearData } = useSaveData();
  const { mutate: applyReturn } = useApplyReturn();
  const { mutate: applyForLeave } = useApplyLeave();
  const { data: pendingLeaveRequest, isLoading: pending_loading } =
    useGetPendingRequest({
      company_id: userData?.data?.COMPANY_ID,
      staff_id: userData?.data?.STAFF_ID,
    });

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
          description: "",
        });
      } else if (
        tabs[selectedTab].title.toLowerCase() == "Approval".toLowerCase()
      ) {
        setDrawerHeader({
          title: "Approval",
          description: "",
        });
      } else if (
        tabs[selectedTab].title.toLowerCase() == "Handover".toLowerCase()
      ) {
        setDrawerHeader({
          title: "Hand Over",
          description: "",
        });
      } else if (
        tabs[selectedTab].title.toLowerCase() == "Attachments".toLowerCase()
      ) {
        setDrawerHeader({
          title: "Attachments",
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
          description: "",
        });
      } else if (
        tabs[selectedTab].title.toLowerCase() == "Approval".toLowerCase()
      ) {
        setDrawerHeader({
          title: "Approval",
          description: "",
        });
      }
    } else if (whatTodo.toLowerCase() == "view".toLowerCase()) {
      if (tabs[selectedTab].title.toLowerCase() == "leave".toLowerCase()) {
        setDrawerHeader({
          title: "Leave Details",
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
          description: "",
        });
      } else if (
        tabs[selectedTab].title.toLowerCase() == "Notes".toLowerCase()
      ) {
        setDrawerHeader({
          title: "Notes",
          description: "",
        });
      }
    }
  }, [tabs, selectedTab, whatTodo]);

  const goToNextTab = () => {
    if (selectedTab < tabs.length - 1) {
      setSelectedTab((prevTab) => prevTab + 1);
    }
  };

  // show the drawer for the schedule form
  const schedule = () => {
    setTabs([
      { title: "Form" },
      {
        title: "HandOver",
      },
      {
        title: "Approval",
      },
      {
        title: "Attachments",
      },
      { title: "Notes" },
    ]);
    setDrawerWidth(1000);
    setWhatTodo("schedule");
    setSideBarNeeded(true);
    setIsOpen(true);
  };
  // show the drawer for the resume form
  const resume = (leave) => {
    const dateString = leave?.START_DATE;
    const formattedDate = dateString.split(" ")[0];
    setStartDate(formattedDate);
    setLeaveReturnInformation((info) => ({
      ...info,
      leave_id: leave?.LEAVE_ID,
      request_id: leave?.REQUEST_ID,
    }));
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

  const viewDownload = () => {
    setWhatTodo("view_download");
    setSideBarNeeded(false);
    setDrawerWidth(720);
    setDrawerHeader({ title: <DownloadHeader downloadPDF={downloadPDF} /> });
    setIsOpen(true);
  };


  // Submitting Leave ScheduleForm
  const handleSubmitSchedule = () => {
    let info = JSON.parse(sessionStorage.getItem("scheduleInformation"));
    if (info?.length > 0) {
      info = [...info, scheduleInformation];
      sessionStorage.setItem("scheduleInformation", JSON.stringify(info));
    } else {
      sessionStorage.setItem(
        "scheduleInformation",
        JSON.stringify([scheduleInformation])
      );
    }
  };

  // Submitting leave Return form
  const handleSubmitReturnForm = () => {
    if (
      leaveReturnInformation?.return_date
    ) {

      setReturnLoading(true);
      applyReturn(leaveReturnInformation, {
        onSuccess: (data) => {
          setReturnLoading(false);
          successToast(data?.data?.message);
          setLeaveReturnInformation({
            company_id: userData?.data?.COMPANY_ID,
            staff_id: userData?.data?.STAFF_ID,
            package_id: 7,
            return_date: "",
            leave_id: "",
            request_id: "",
            notes: "",
            attachment: "",
          });
          setIsOpen(false);
        },
        onError: (error) => {
          console.log(error?.response?.data?.message);
          setReturnLoading(false);
          errorToast(error?.response?.data?.message ?? error?.message);
        },
      });
    } else {
      errorToast("Your Returning date is required");
    }
  };

  const downloadPDF = () => {
    const input = leaveAdviceRef.current;

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("Leave Advice.pdf");
    });
  };


  return (
    <div className="py-8 font-helvetica">
      <Header setIsOpen={setIsOpen} isOpen={isOpen}/>
      <LeaveInformation
        pendingRequest={pendingLeaveRequest?.data?.pending_leave}
        userData={userData}
        schedule={schedule}
      />
      <div className="mb-6">
        <Separator separator_text={"History"} />
      </div>

      <LeaveTable
        userData={userData}
        setCurrentView={setCurrentView}
        view={view}
        viewDownload={viewDownload}
        resume={resume}
        pendingRequest={pendingLeaveRequest?.data?.pending_leave}
        pending_loading={pending_loading}
      />
      <Drawer
        sideBarNeeded={sideBarNeeded}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        header={drawerHeader}
        tabs={tabs}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
       
        {whatTodo == "schedule" && (
          <div>
            
            {tabs[selectedTab].title.toLowerCase() == "form".toLowerCase() && (
              <ScheduleForm
                goToNextTab={goToNextTab}
                information={scheduleInformation}
                setInformation={setScheduleInformation}
              />
            )}
            {tabs[selectedTab].title.toLowerCase() ==
              "Attachments".toLowerCase() && (
              <Attachments
                setInformation={setScheduleInformation}
                goToNextTab={goToNextTab}
              />
            )}
            {tabs[selectedTab].title.toLowerCase() == "Notes".toLowerCase() && (
              <Note
                handleSubmit={handleSubmitSchedule}
                setInformation={setScheduleInformation}
                goToNextTab={goToNextTab}
              />
            )}
            {tabs[selectedTab].title.toLowerCase() ==
              "Handover".toLowerCase() && (
              <HandOverForm
                setInformation={setScheduleInformation}
                goToNextTab={goToNextTab}
              />
            )}
            {tabs[selectedTab].title.toLowerCase() ==
              "Approval".toLowerCase() && (
              <ApprovalForm
                setInformation={setScheduleInformation}
                goToNextTab={goToNextTab}
              />
            )}
          </div>
        )}
        {whatTodo == "resume" && (
          <div>
            {tabs[selectedTab].title.toLowerCase() == "form".toLowerCase() && (
              <LeaveReturnTextForm
                startDate={startDate}
                goToNextTab={goToNextTab}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                information={leaveReturnInformation}
                setInformation={setLeaveReturnInformation}
                setAntDate={setAntDate}
                antDate={antDate}
              />
            )}
            {/* {tabs[selectedTab].title.toLowerCase() ==
              "Approval".toLowerCase() && (
              <ApprovalForm
                setInformation={setLeaveReturnInformation}
                information={leaveReturnInformation}
                goToNextTab={goToNextTab}
              />
            )} */}
            {tabs[selectedTab].title.toLowerCase() ==
              "Attachments".toLowerCase() && (
              <Attachments
                setInformation={setLeaveReturnInformation}
                token={userData?.token}
                goToNextTab={goToNextTab}
              />
            )}
            {tabs[selectedTab].title.toLowerCase() == "Notes".toLowerCase() && (
              <Note
                handleSubmit={handleSubmitReturnForm}
                setInformation={setLeaveReturnInformation}
                goToNextTab={goToNextTab}
                isLoading={returnLoading}
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
        {whatTodo == "view_download" && (
          <div>
            <LeaveAdvice request_detail={currentView} ref={leaveAdviceRef} />
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Leave;
