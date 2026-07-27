import { useEffect, useState } from "react";
import Drawer from "../../components/Request&FormComponent/Drawer";
import Separator from "../../components/payroll_components/Separator";
import Note from "../../components/Request&FormComponent/Note";
import Header from "../../components/ExpensesComponents/Header";
import HistoryTable from "../../components/ExpensesComponents/HistoryTable";
import ExpensesForm from "../../components/ExpensesComponents/ExpensesForm";
import ExpensesDetails from "../../components/ExpensesComponents/ExpensesDetails";
import ApprovalForm from "../../components/Request&FormComponent/ApprovalForm";
import Attachments from "../../components/Request&FormComponent/Attachments";
import ExpensesCards from "../../components/ExpensesComponents/ExpensesCards";
import { tableData } from "../../components/ExpensesComponents/data";

const Expenses = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [whatTodo, setWhatTodo] = useState('');
  const [sideBarNeeded, setSideBarNeeded] = useState(true);
  const [currentViewExpenses,setCurrentViewExpenses]=useState({});
  const [selectedTable, setSelectedTable] = useState("All Approvals");
  const [selectedTableData, setSelectedTableData] = useState([])
     const [selectedTab, setSelectedTab] = useState(0)
     const [drawerHeader, setDrawerHeader] = useState({
  
  })
  //      const [newExpenses, setNewExpenses] = useState({
  //   item: "",
  //   purchased_from: "",
  //   description: "",
  //   amount: "",
  //   date: "",
  //   purchased_by: "",
  //   paid_by: "",
  //   note: "",
  //   approvals: [],
  //   attachments: [],
  //   status:''
  // });
       const [newExpenses, setNewExpenses] = useState({
    item: "",
    amount: "",
    date: "",
    approvals: [],
    attachments: [],
    status:''
  });

    const expensesNo = (value) => {
    if (value == "pending") {
      return  tableData.filter((data) => data.status == "pending")
    } else if (value == "approved") {
      return  tableData.filter((data) => data.status == "approved")
    } else{
    return tableData
    }
  };


  const [tabs, setTabs] = useState([
    { title: "Form", },
    {
      title: "Attachments",
    },
    { title: "Notes", },
    {
      title: "HandOver",
    },
    {
      title: "Approval",
    },
  ]);

  useEffect(() => { 
 setSelectedTab(0)
}, [isOpen])
  useEffect(() => { 
 setSelectedTableData(tableData)
}, [])

  useEffect(() => {
    if (selectedTable=='all') {
      setSelectedTableData(tableData)
    }
    else if (selectedTable=='pending') {
      setSelectedTableData(tableData.filter(data=>data.status=='pending'))
    }
    else if (selectedTable=='approved') {
      setSelectedTableData(tableData.filter(data=>data.status=='approved'))
    }
  }, [selectedTable]);

  // show the drawer for the apply form
  const addNew = () => {
    setTabs([
      { title: "Form", },
      {
        title: "Attachments",
      },
      {
        title: "Approval",
      },
    ]);
    setWhatTodo('add');
    setSideBarNeeded(true);
    setIsOpen(true);
  };


  // show the drawer for the view form
  const view = () => {
    setSideBarNeeded(false);
    setWhatTodo('view');
    setIsOpen(true);
  };



useEffect(() => {
  if (whatTodo.toLowerCase()=='add'.toLowerCase()) {
    if (tabs[selectedTab].title.toLowerCase()=="form".toLowerCase()) {
      setDrawerHeader({title:'Expenses Form', description:'Fill the form for your neew expenses'});
    }
    else if (tabs[selectedTab].title.toLowerCase()=="Approval".toLowerCase()) {
      setDrawerHeader({title:'Approval', description:'Select your approvals'});
    }
    else if (tabs[selectedTab].title.toLowerCase()=="Attachments".toLowerCase()) {
      setDrawerHeader({title:'Attachments', description:'Add your attachments'});
    }
    else if (tabs[selectedTab].title.toLowerCase()=="Notes".toLowerCase()) {
      setDrawerHeader({title:'Notes', description:'Add your notes'});
    }
  }
  else if (whatTodo.toLowerCase()=='view'.toLowerCase()) {
      setDrawerHeader({title:'Expenses Details', description:'This is the details of your expenses'});
  
  }
  }, [tabs,selectedTab,whatTodo]);


  //   const submitForm=()=>{
  //     if (newExpenses.item == ""||newExpenses.description == ""||newExpenses.amount == ""||newExpenses.date == ""||newExpenses.purchased_from == ""||newExpenses.purchased_by == ""||newExpenses.paid_by == "") {
  //     alert("Every input in the form must be filled");
  //   } 
  //   else{
  //     console.log(newExpenses);
  //   }
  // }
    const submitForm=()=>{
      if (newExpenses.item == ""||newExpenses.amount == ""||newExpenses.date == "") {
      alert("Every input in the form must be filled");
    } 
    else{
      // console.log(newExpenses);
    }
  }


  return (
    <div className="py-8 font-helvetica">
      <Header addNew={addNew} />
     <div className="mb-6">
  <Separator separator_text={'History'}/>
  </div>

<ExpensesCards setSelected={setSelectedTable} expenseNo={expensesNo} />
<HistoryTable
   tableData={selectedTableData}
        setCurrentViewExpenses={setCurrentViewExpenses}
        view={view}
      
      />
      <Drawer
      handleSubmit={submitForm}
        sideBarNeeded={sideBarNeeded}
        selectedTab={selectedTab}
         header={drawerHeader}
        setSelectedTab={setSelectedTab}
        tabs={tabs}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
       {whatTodo=='add'&&<div>
       {tabs[selectedTab].title.toLowerCase()==('form').toLowerCase()&&<ExpensesForm newExpenses={newExpenses} setNewExpenses={setNewExpenses} setSelectedTab={setSelectedTab} />}
      {tabs[selectedTab].title.toLowerCase()==('Attachments').toLowerCase()&&<Attachments setInformation={setNewExpenses} setSelectedTab={setSelectedTab}/>}
      {tabs[selectedTab].title.toLowerCase()==('Notes').toLowerCase()&&<Note setInformation={setNewExpenses} setSelectedTab={setSelectedTab}/>}
      {tabs[selectedTab].title.toLowerCase()==('Approval').toLowerCase()&&<ApprovalForm setInformation={setNewExpenses} setSelectedTab={setSelectedTab}  />}
      </div>}
     {whatTodo=='view' &&  <ExpensesDetails handleSideModal={setIsOpen} currentViewExpenses={currentViewExpenses}/> }
      </Drawer>
    </div>
  );
};

export default Expenses;
