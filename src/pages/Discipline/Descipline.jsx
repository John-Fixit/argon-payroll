/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Drawer from "../../components/Request&FormComponent/Drawer";
import Separator from "../../components/payroll_components/Separator";
import LeaveHistory from "../../components/Leave/LeaveApprovalHistory";
import Note from "../../components/Request&FormComponent/Note";
import Attachments from "../../components/Request&FormComponent/Attachments";
import DisciplineForm from "../../components/DisciplineComponents/DisciplineForm";
import Header from "../../components/DisciplineComponents/Header";
import HistoryTable from "../../components/DisciplineComponents/HistoryTable";

const Discipline = () => {
     const [disciplineInformation, setDisciplineInformation] = useState({
  title:'',
  description:'',
  status:'',
  employee:'',
  official:'',
  report_date:'',
  attachments:[],
  note:'',
  })
  const [isOpen, setIsOpen] = useState(false);
  const [whatTodo, setWhatTodo] = useState('');
  const [sideBarNeeded, setSideBarNeeded] = useState(true);
     const [selectedTab, setSelectedTab] = useState(0)


  const [tabs, setTabs] = useState([
    { title: "Form", sub: "Fill form" },
    {
      title: "Attachments",
      sub: "Upload ",
    },
    { title: "Notes", sub: "Add Note" },
  ]);

  useEffect(() => { 
 setSelectedTab(0)
}, [isOpen])

  // show the drawer for the createSanction form
  const createSanction = () => {
    // setTabs([
    //   { title: "Form", sub: "Fill form" },
    //   {
    //     title: "Attachments",
    //     sub: "Upload ",
    //   },
    //   { title: "Notes", sub: "Add Note" },
    // ]);
    setWhatTodo('createSanction');
    setSideBarNeeded(false);
    setIsOpen(true);
  };


  // show the drawer for the view form
  const view = () => {
    setSideBarNeeded(false);
    setWhatTodo('view');
    setIsOpen(true);
  };

  return (
    <div className="py-8 font-helvetica">
      <Header createSanction={createSanction} />
     <div className="mb-6">
  <Separator separator_text={'History'}/>
  </div>

      <HistoryTable view={view} />
      <Drawer
        sideBarNeeded={sideBarNeeded}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        tabs={tabs}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
       {whatTodo=='createSanction'&&<div>
       {tabs[selectedTab].title.toLowerCase()==('form').toLowerCase()&&<DisciplineForm disciplineInformation={disciplineInformation} setDisciplineInformation={setDisciplineInformation} />}
      {tabs[selectedTab].title.toLowerCase()==('Attachments').toLowerCase()&&<Attachments setInformation={setDisciplineInformation} setSelectedTab={setSelectedTab} />}
      {tabs[selectedTab].title.toLowerCase()==('Notes').toLowerCase()&&<Note setInformation={setDisciplineInformation} setSelectedTab={setSelectedTab} />}
      </div>}
       {whatTodo=='view'&&<LeaveHistory/>}
      </Drawer>
    </div>
  );
};

export default Discipline;
