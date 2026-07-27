import { useEffect, useState } from "react";
import Header from "./Header";
import Separator from "../../payroll_components/Separator";
import HistoryTable from "./HistoryTable";
import Drawer from "../../Request&FormComponent/Drawer";
import TrainingForm from "./TrainingForm";
// import Attachments from "../../Request&FormComponent/Attachments";
// import Note from "../../Request&FormComponent/Note";
// import ApprovalForm from "../../Request&FormComponent/ApprovalForm";
import TrainingDetails from "./TrainingDetails";

const MyTraining = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [whatTodo, setWhatTodo] = useState('');
  const [sideBarNeeded, setSideBarNeeded] = useState(true);
  const [currentViewTraining,setCurrentViewTraining]=useState({});
     const [selectedTab, setSelectedTab] = useState(0)
       const [newTraining, setNewTraining] = useState( {
    type: "",
    trainer: "",
    description: "",
    cost: "",
    from:"",
    to:"",
    status: "active",
    employees: [],
  },);


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
 setSelectedTab(0)
}, [isOpen])

  // show the drawer for the apply form
  const addNew = () => {
    setTabs([
      { title: "Form", sub: "Fill form" },
      {
        title: "Attachments",
        sub: "Upload ",
      },
      { title: "Notes", sub: "Add Note" },
      {
        title: "Approval",
        sub: "Add Note",
      },
    ]);
    setWhatTodo('add');
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
      <Header addNew={addNew} />
     <div className="mb-6">
  <Separator separator_text={'History'}/>
  </div>

      <HistoryTable setCurrentViewTraining={setCurrentViewTraining} view={view}/>
      <Drawer
        sideBarNeeded={sideBarNeeded}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        tabs={tabs}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
       {whatTodo=='add'&&<div>
       {tabs[selectedTab].title.toLowerCase()==('form').toLowerCase()&&<TrainingForm newTraining={newTraining} setNewTraining={setNewTraining} setSelectedTab={setSelectedTab} />}
      {/* {tabs[selectedTab].title.toLowerCase()==('Attachments').toLowerCase()&&<Attachments setInformation={setNewTraining} setSelectedTab={setSelectedTab}/>}
      {tabs[selectedTab].title.toLowerCase()==('Notes').toLowerCase()&&<Note setInformation={setNewTraining} setSelectedTab={setSelectedTab}/>}
      {tabs[selectedTab].title.toLowerCase()==('Approval').toLowerCase()&&<ApprovalForm setInformation={setNewTraining} setSelectedTab={setSelectedTab}  />} */}
      </div>}
     {whatTodo=='view' &&  <TrainingDetails handleSideModal={setIsOpen} currentViewTraining={currentViewTraining}/> }
      </Drawer>
    </div>
  );
};

export default MyTraining;
