import { useEffect, useMemo, useState } from "react";
import LeaveForm from "../../Leave/LeaveForm";
import Drawer from "../../Request&FormComponent/Drawer";
import Attachments from "../../Request&FormComponent/Attachments";
import Note from "../../Request&FormComponent/Note";
import HandOverForm from "../../Request&FormComponent/HandOverForm";
import ApprovalForm from "../../Request&FormComponent/ApprovalForm";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { errorToast, successToast } from "../../../utils/toastMsgPop";
import { useSaveData } from "../../Leave/Hooks";
import { useApplyLeave } from "../../../API/leave";
import PropTypes from "prop-types";

const ApplyLeave = ({ isOpen, setIsOpen }) => {

  

  //==================================react hooks========================================
  const tabs = useMemo(
    () => [
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
    ],
    []
  );

  const [loading, setLoading] = useState(false);

  const { userData } = useCurrentUser();

  const [drawerHeader, setDrawerHeader] = useState({});

  const [selectedTab, setSelectedTab] = useState(0);
  //===============================================================================

  //===========================external hooks======================================
  const { clearData } = useSaveData();
  const { mutate: applyForLeave } = useApplyLeave();

  //=================================================================================

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
    attachment: [],
    handovers: null,
    notes: "",
  });

  const goToNextTab = () => {
    if (selectedTab < tabs.length - 1) {
      setSelectedTab((prevTab) => prevTab + 1);
    }
  };

  useEffect(() => {
    setSelectedTab(0);
  }, [isOpen]);

  useEffect(() => {
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
        description: "Choose whom to hand over to"
      });
    } else if (
      tabs[selectedTab].title.toLowerCase() == "Attachments".toLowerCase()
    ) {
      setDrawerHeader({
        title: "Attachments",
        description: "Add your attachments",
      });
    } else if (tabs[selectedTab].title.toLowerCase() == "Notes".toLowerCase()) {
      setDrawerHeader({ title: "Notes", description: "Add your notes" });
    }
    // }
  }, [selectedTab, tabs]);

  // Submitting Leave form
  const handleSubmit = () => {
     if (leaveInformation.handovers == null) {
      errorToast("Handover is required");
    } else if (
      leaveInformation.leave_type == "" ||
      leaveInformation.internal_approvals == "" ||
      leaveInformation.reason == ""
    ) {
      errorToast("Fill all required fields");
    } else {
      setLoading(true);
      applyForLeave(leaveInformation, {
        onSuccess: (data) => {
          setLoading(false);
          successToast(data?.data?.message);
          clearData();
          setLeaveInformation((info) => {
            return {
              ...info,
              leave_type: "",
              start_date: "",
              end_date: "",
              multiple_date: [],
              duration: "",
              reason: "",
              internal_approvals: [],
              attachment: null,
              handovers: null,
              notes: "",
            };
          });
          setIsOpen(false);
        },
        onError: (error) => {
          setLoading(false);
          errorToast(error?.response?.data?.message);
        },
      });
    }
  };

  return (
    <>
      <Drawer
        sideBarNeeded={true}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        header={drawerHeader}
        tabs={tabs}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        
      >
        
        <>
          {tabs[selectedTab]?.title.toLowerCase() == "form".toLowerCase() && (
            <LeaveForm
              leaveInformation={leaveInformation}
              setLeaveInformation={setLeaveInformation}
              goToNextTab={goToNextTab}
            />
          )}
          {tabs[selectedTab].title.toLowerCase() ==
            "Attachments".toLowerCase() && (
            <Attachments
              setInformation={setLeaveInformation}
              token={userData?.token}
              goToNextTab={goToNextTab}
            />
          )}
          {tabs[selectedTab].title.toLowerCase() == "Notes".toLowerCase() && (
            <Note
              handleSubmit={handleSubmit}
              isLoading={loading}
              setInformation={setLeaveInformation}
              goToNextTab={goToNextTab}
            />
          )}
          {tabs[selectedTab].title.toLowerCase() ==
            "Handover".toLowerCase() && (
            <HandOverForm
              setInformation={setLeaveInformation}
              information={leaveInformation}
              goToNextTab={goToNextTab}
            />
          )}
          {tabs[selectedTab].title.toLowerCase() ==
            "Approval".toLowerCase() && (
            <ApprovalForm
              setInformation={setLeaveInformation}
              information={leaveInformation}
              goToNextTab={goToNextTab}
            />
          )}
        </>
      </Drawer>
    </>
  );
};

export default ApplyLeave;

ApplyLeave.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};
