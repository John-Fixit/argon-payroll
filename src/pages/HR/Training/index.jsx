import { useEffect, useState } from "react";
import Header from "./components/Header";
import TrainingDetails from "./components/TrainingDetails";
import HistoryTable from "./components/HistoryTable";
// import TrainingForm from "./components/TrainingForm";
import Separator from "../../../components/payroll_components/Separator";
import Drawer from "../../../components/Request&FormComponent/Drawer";
import Note from "../../../components/Request&FormComponent/Note";
import Attachments from "../../../components/Request&FormComponent/Attachments";
import { Tab, Tabs } from "@nextui-org/react";
import TrainingCards from "./components/TrainingCards";
import NewTrainingForm from "./components/NewTrainingForm";
const HrTraining = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [whatTodo, setWhatTodo] = useState("");
  const [sideBarNeeded, setSideBarNeeded] = useState(true);
  const [currentViewTraining, setCurrentViewTraining] = useState({});
  const [selectedTab, setSelectedTab] = useState(0);
  const [newTraining, setNewTraining] = useState({
    type: "",
    trainer: "",
    description: "",
    cost: "",
    from: "",
    to: "",
    status: "active",
    employees: [],
  });



  const [tabs, setTabs] = useState([
    { title: "Form", sub: "Fill form" },
    // {
    //   title: "Attachments",
    //   sub: "Upload ",
    // },
    // { title: "Notes", sub: "Add Note" },
  ]);

  useEffect(() => {
    setSelectedTab(0);
  }, [isOpen]);

const SubmitForm=()=>{
// console.log(newTraining);
}

  // show the drawer for the apply form
  const addNew = () => {
    setTabs([
      { title: "Form", sub: "Fill form" },
      // {
      //   title: "Attachments",
      //   sub: "Upload ",
      // },
      // { title: "Notes", sub: "Add Note" },
    ]);
    setWhatTodo("add");
    setSideBarNeeded(true);
    setIsOpen(true);
  };

  // show the drawer for the view form
  const view = () => {
    setSideBarNeeded(false);
    setWhatTodo("view");
    setIsOpen(true);
  };

  const optionTabs=[
  {
  id:'training_request',
  label:'Training Request',
   content: <HistoryTable
        setCurrentViewTraining={setCurrentViewTraining}
        view={view}
      />,
  },
  {
  id:'aprroved_training',
  label:'Approved Training',
   content: <HistoryTable
        setCurrentViewTraining={setCurrentViewTraining}
        view={view}
      />,
  },
  {
  id:'rejected_training',
  label:'Rejected Training',
   content: <HistoryTable
        setCurrentViewTraining={setCurrentViewTraining}
        view={view}
      />,
  },
  ]


  return (
    <div className="py-8 font-helvetica">
      <Header addNew={addNew} />
      <div className="mb-6">
        <Separator separator_text={"History"} />
      </div>
      <div className="my-8">
 <TrainingCards/>
      </div>
      <Tabs 
items={optionTabs} 
color="secondary"
classNames={{
tabList:'bg-slate-200 text-medium',
}} 
>
{(item)=>(
<Tab key={item.id} title={item.label}>
{item.content}
</Tab>
)}
</Tabs>
      <Drawer
      handleSubmit={SubmitForm}
        sideBarNeeded={sideBarNeeded}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        tabs={tabs}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        {whatTodo == "add" && (
          <div>
            {tabs[selectedTab].title.toLowerCase() == "form".toLowerCase() && (
              <NewTrainingForm
                // newTraining={newTraining}
                // setNewTraining={setNewTraining}
                setSelectedTab={setSelectedTab}
              />
            )}
            {tabs[selectedTab].title.toLowerCase()==('Attachments').toLowerCase()&&<Attachments setInformation={setNewTraining} setSelectedTab={setSelectedTab}/>}
      {tabs[selectedTab].title.toLowerCase()==('Notes').toLowerCase()&&<Note setInformation={setNewTraining} setSelectedTab={setSelectedTab}/>}
          </div>
        )}
        {whatTodo == "view" && (
          <TrainingDetails
            handleSideModal={setIsOpen}
            currentViewTraining={currentViewTraining}
          />
        )}
      </Drawer>
    </div>
  );
};

export default HrTraining;
