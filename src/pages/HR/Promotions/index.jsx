/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Header from "./Header";
import Separator from "../../../components/payroll_components/Separator";
import HistoryTable from "./HistoryTable";
import Drawer from "../../../components/Request&FormComponent/Drawer";
import PromotionDetails from "./PromotionDetails";
import PromotionForm from "./PromotionForm";
import PromotionsCard from "./PromotionsCard";
import LeaveForm from "../../../components/Leave/LeaveForm";
import Attachments from "../../../components/Request&FormComponent/Attachments";
import Note from "../../../components/Request&FormComponent/Note";
import HandOverForm from "../../../components/Request&FormComponent/HandOverForm";
import ApprovalForm from "../../../components/Request&FormComponent/ApprovalForm";
// import Attachments from "../../Request&FormComponent/Attachments";
// import Note from "../../Request&FormComponent/Note";
// import ApprovalForm from "../../Request&FormComponent/ApprovalForm";

const HRPromotions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [whatTodo, setWhatTodo] = useState("");
  const [sideBarNeeded, setSideBarNeeded] = useState(true);
  const [submitButtonNeeded, setSubmitButtonNeeded] = useState(true)
  const [currentViewLoan, setCurrentViewLoan] = useState({});
  const [selectedTab, setSelectedTab] = useState(0);
  const [newPromotion, setNewPromotion] = useState({
    first_name: "",
    last_name: "",
    promoted_from: "",
    promoted_to: "",
    promotion_reason: "",
    promotion_date: "",
  });


  const [leaveInformation, setLeaveInformation] = useState({
    type: "",
    from: "",
    to: "",
    no_of_days: "",
    reason: "",
    approvals: [],
    hand_overs: [],
    attachments: [],
    note: "",
    status: "pending",
  });

  const [tabs, setTabs] = useState([
    { title: "Form", sub: "Fill form" },
    {
      title: "Attachments",
      sub: "Upload ",
    },
    { title: "Notes", sub: "Add Note" },
    // {
    //   title: "HandOver",
    //   sub: "Upload ",
    // },
    {
      title: "Approval",
      sub: "Add Note",
    },
  ]);

  const [drawerHeader, setDrawerHeader] = useState({
  
  })

  useEffect(() => {
    setSelectedTab(0);
  }, [isOpen]);



useEffect(() => {
    if (whatTodo.toLowerCase()=='add'.toLowerCase()) {
      // console.log(whatTodo, selectedTab )
      if (tabs[selectedTab].title.toLowerCase()=="form".toLowerCase()) {
        setDrawerHeader({title:'Promotion Form', description:'Fill form'});
      }
      else if (tabs[selectedTab].title.toLowerCase()=="Approval".toLowerCase()) {
        setDrawerHeader({title:'Approval', description:'Select approvals'});
      }
      // else if (tabs[selectedTab].title.toLowerCase()=="Handover".toLowerCase()) {
      //   setDrawerHeader({title:'Hand Over', description:'Choose whom to hand over to'});
      // }
      else if (tabs[selectedTab].title.toLowerCase()=="Attachments".toLowerCase()) {
        setDrawerHeader({title:'Attachments', description:'Add attachments'});
      }
      else if (tabs[selectedTab].title.toLowerCase()=="Notes".toLowerCase()) {
        setDrawerHeader({title:'Notes', description:'Add notes'});
      }
    }
   

    }, [tabs,selectedTab,whatTodo]);
  // show the Drawer for the apply form
  // const addNew = () => {
  //   setTabs([
  //     { title: "Form", sub: "Fill form" },
  //     {
  //       title: "Attachments",
  //       sub: "Upload ",
  //     },
  //     { title: "Notes", sub: "Add Note" },
  //   ]);
  //   setWhatTodo("add");
  //   setSideBarNeeded(false);
  //   setIsOpen(true);
  // };


    // show the drawer for the apply form
    const addNew = () => {
      setTabs([
        { title: "Form" },
        {
          title: "Attachments",
        },
        { title: "Notes" },
        {
          title: "Approval",
        },
      ]);
      setWhatTodo("add");
      setSideBarNeeded(true);
      setIsOpen(true);
      setSubmitButtonNeeded(true);
    };

  // show the Drawer for the view form
  // const view = () => {
  //   setSideBarNeeded(false);
  //   setWhatTodo("view");
  //   setIsOpen(true);
  // };

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
    setIsOpen(true);
    setSubmitButtonNeeded(false);
  };















  return (
    <div className="py-8 font-helvetica">
      <Header addNew={addNew} />
      <div className="mb-6">
        <Separator separator_text={"History"} />
      </div>
      <div className="my-8">
      <PromotionsCard/>
      </div>

      <HistoryTable setCurrentViewLoan={setCurrentViewLoan} view={view} />
      <Drawer
        sideBarNeeded={sideBarNeeded}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        tabs={tabs}
        isOpen={isOpen}
        header={drawerHeader}
        setIsOpen={setIsOpen}
      >
         {whatTodo == "add" && (
          <div>
            {tabs[selectedTab].title.toLowerCase() == "form".toLowerCase() && (
              <PromotionForm
              newPromotion={newPromotion} setNewPromotion={setNewPromotion}
              />

              // <LeaveForm
              //   leaveInformation={leaveInformation}
              //   setLeaveInformation={setLeaveInformation}
              // />
            )}
            {tabs[selectedTab].title.toLowerCase() ==
              "Attachments".toLowerCase() && (
              <Attachments
                setInformation={setLeaveInformation}
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
                setSelectedTab={setSelectedTab}
              />
            )}
            {tabs[selectedTab].title.toLowerCase() ==
              "Approval".toLowerCase() && (
              <ApprovalForm
                setInformation={setLeaveInformation}
                setSelectedTab={setSelectedTab}
              />
            )}
          </div>
        )}
        {whatTodo == "view" && (
          <PromotionDetails
            handleSideModal={setIsOpen}
            currentViewLoan={currentViewLoan}
          />
        )}
      </Drawer>
    </div>
  );
};

export default HRPromotions;
