// import React from 'react'

import { useEffect, useState } from "react";
import Header from "../../components/OrganizationComponent/Header";
import Separator from "../../components/payroll_components/Separator";
import Drawer from "../../components/Request&FormComponent/Drawer";
import OrganogramForm from "../../components/OrganizationComponent/OrganogramForm";
import OrganizationalChartView from "../../components/OrganizationComponent/OrganizationalChartView";
import OrganogramCards from "../../components/OrganizationComponent/OrganogramCards";
import HistoryTable from "../../components/OrganizationComponent/HistoryTable";
import OrganogramEdit from "../../components/OrganizationComponent/OrganogramEdit";

const Organization = () => {
//   const [currentView, setCurrentView] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [whatTodo, setWhatTodo] = useState("");
  const [sideBarNeeded, setSideBarNeeded] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
   const [selectedCard, setSelectedCard] = useState('Company')
  const [drawerHeader, setDrawerHeader] = useState({
  
  })


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
  if (whatTodo.toLowerCase()=='create'.toLowerCase()) {
      setDrawerHeader({title:'Create Organogram', description:'We make it easy for you to create Organogram'});
  }
  else if (whatTodo.toLowerCase()=='edit'.toLowerCase()) {
      setDrawerHeader({title:'Edit Organogram', description:'Make your changes if update is needed.'});
  }
  else if (whatTodo.toLowerCase()=='view'.toLowerCase()) {
      setDrawerHeader({title:'Organogram Details', description:'This is to show the list of organogram tree we have.'});
  }
  }, [tabs,selectedTab,whatTodo]);

//   const submitForm=()=>{
//     if (leaveInformation.type == ""||leaveInformation.from == ""||leaveInformation.to == ""||leaveInformation.no_of_days == ""||leaveInformation.reason == "") {
//       alert("Every input in the form must be filled");
//     } 
//     else{
//       console.log(leaveInformation);
//       setLeaveInformation({
//   type:'',
//   from:'',
//   to:'',
//   no_of_days:'',
//   reason:'',
//   approvals:[],
//   hand_overs:[],
//   attachments:[],
//   note:'',
//   status:'pending'
//   })
//     }
//   }

  // show the drawer for the create form
  const create = () => {
    setTabs([
      { title: "Form" },
      {
        title: "Attachments",
      },
      { title: "Notes" },
      {
        title: "HandOver",
      },
      {
        title: "Approval",
      },
    ]);
    setWhatTodo("create");
    setSideBarNeeded(false);
    setIsOpen(true);
  };
  const edit = () => {
    setWhatTodo("edit");
    setSideBarNeeded(false);
    setIsOpen(true);
  };

  // show the drawer for the view form
  const view = () => {
    setWhatTodo("view");
    setSideBarNeeded(false);
    setIsOpen(true);
  };

  return (
    <div className="py-8 font-helvetica">
      <Header create={create} />
      {/* <div className="mb-6">
        <Separator separator_text={"Balance"} />
      </div> */}
      {/* <LeaveCards/> */}
      <div className="mb-6">
        <Separator separator_text={"History"} />
      </div>

<OrganogramCards selectedCard={selectedCard} setSelectedCard={setSelectedCard} />

{/* <Button className="bg-[#00BCC2] hover:bg-[#00979C] transition-all text-xs rounded-[4px] text-white font-medium px-4 py-2 font-helvetica shadow" onClick={view}>
              view
              </Button> */}

{selectedCard=='Company'?<OrganizationalChartView/>:<HistoryTable edit={edit} view={view} />}
      
      <Drawer
        sideBarNeeded={sideBarNeeded}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        header={drawerHeader}
        tabs={tabs}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        drawerWidth={1200}
      >
        {whatTodo == "create" && <OrganogramForm/>}
        {whatTodo == "edit" && <OrganogramEdit/>}
       
        {whatTodo == "view" && <OrganizationalChartView/>}
      </Drawer>
    </div>
  )
}

export default Organization