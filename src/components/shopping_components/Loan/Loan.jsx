import { useEffect, useState } from "react";
import Header from "./Header";
// import Attachments from "../../Request&FormComponent/Attachments";
// import Note from "../../Request&FormComponent/Note";
// import ApprovalForm from "../../Request&FormComponent/ApprovalForm";
import LoanForm from "./LoanForm";
import Drawer from "../../Request&FormComponent/Drawer";
import HistoryTable from "./HistoryTable";
import Separator from "../../payroll_components/Separator";
import LoanDetails from "./LoanDetails";

const Loan = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [whatTodo, setWhatTodo] = useState('');
  const [sideBarNeeded, setSideBarNeeded] = useState(true);
  const [currentViewLoan,setCurrentViewLoan]=useState({});
     const [selectedTab, setSelectedTab] = useState(0)
       const [newLoan, setNewLoan] = useState( {
    type: "",
    amount: "",
    interest_rate: "",
    due_date:"",
  },);


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

  // show the drawer for the apply form
  const addNew = () => {
    setTabs([
      { title: "Form", sub: "Fill form" },
      {
        title: "Attachments",
        sub: "Upload ",
      },
      { title: "Notes", sub: "Add Note" },
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

      <HistoryTable setCurrentViewLoan={setCurrentViewLoan} view={view}/>
      <Drawer
        sideBarNeeded={sideBarNeeded}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        tabs={tabs}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
       {whatTodo=='add'&&<div>
       {tabs[selectedTab].title.toLowerCase()==('form').toLowerCase()&&<LoanForm newLoan={newLoan} setNewLoan={setNewLoan} setSelectedTab={setSelectedTab} />}
      {/* {tabs[selectedTab].title.toLowerCase()==('Attachments').toLowerCase()&&<Attachments setInformation={setNewLoan} setSelectedTab={setSelectedTab}/>}
      {tabs[selectedTab].title.toLowerCase()==('Notes').toLowerCase()&&<Note setInformation={setNewLoan} setSelectedTab={setSelectedTab}/>}
      {tabs[selectedTab].title.toLowerCase()==('Approval').toLowerCase()&&<ApprovalForm setInformation={setNewLoan} setSelectedTab={setSelectedTab}  />} */}
      </div>}
     {whatTodo=='view' &&  <LoanDetails handleSideModal={setIsOpen}  currentViewLoan={currentViewLoan}/> }
      </Drawer>
    </div>
  );
};

export default Loan;
