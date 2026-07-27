/* eslint-disable no-unused-vars */
import { useState, useMemo } from "react";
import PageHeader from "../../../../components/payroll_components/PageHeader";
import Separator from "../../../../components/payroll_components/Separator";
import TopCards from "./TopCards";
import ExpandedDrawerWithButton from "../../../../components/modals/ExpandedDrawerWithButton";
import FormDrawer from "../../../../components/payroll_components/FormDrawer";

// import PendingTrainingTable from "../PendingTraining/PendingTrainingTable";
import NewTrainingForm from "./NewTrainingForm";
// import { trainingData } from "./trainingData.js"
import ApprasealForm from "../../../../components/self_services/aper/ApprasealForm.jsx";
import TrainingTable2 from "./components/TrainingTable2.jsx";
import { MoreHorizontal } from "lucide-react";
// import FormBuilder from "../../../HR/Performance/Setup/FormBuilder.jsx";

import Drawer from "../../../../components/Request&FormComponent/Drawer";
import Note from "../../../../components/Request&FormComponent/Note.jsx";
import ApprovalForm from "../../../../components/Request&FormComponent/ApprovalForm.jsx";
import TrainingDetails from "./components/TrainingDetails.jsx";



export default function TrainingDashboard() {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(  {
      name: "Open",
      progress: 14,
      total: 4,
      stroke: 'stroke-amber-500',
      bg: 'bg-amber-500',
    },)


// drawer data
const [sideBarNeeded, setSideBarNeeded] = useState(true);
const [selectedTab, setSelectedTab] = useState(0);
const [isOpen, setIsOpen] = useState(false);
const [drawerHeader, setDrawerHeader] = useState({})
const [whatTodo, setWhatTodo] = useState("");
const [submitButtonNeeded, setSubmitButtonNeeded] = useState(true)

const [tabs, setTabs] = useState([
  { title: "Training", sub: "Training" },
  {
    title: "Approvals",
    sub: "Add Approval",
  },
  { title: "Comments", sub: "Add Comments" },
]);
// drawer data






// drawer func
// const addNew = () => {
//   setTabs([
//     { title: "Form" },
//     {
//       title: "Attachments",
//     },
//     { title: "Notes" },
//     {
//       title: "Approval",
//     },
//   ]);
//   setWhatTodo("add");
//   setSideBarNeeded(true);
//   setIsOpen(true);
//   setSubmitButtonNeeded(true);
// };



const view = () => {

  setWhatTodo("view");
  setSideBarNeeded(true);
  setTabs([
    { title: "Training" },
    { title: "Approvals" },
    { title: "Comments" },
  ]);
  setIsOpen(true);
  setSubmitButtonNeeded(false);

};
// drawer func










    const handleOpen=()=>{
        setOpen(true)
    }

    const handleClose=()=>{
        setOpen(false)
    }




    const handleSeleted = (item)=>{
      // console.log(item)
      setSelected(item)
    }





    // const rowData1 = useMemo(()=>{
    //   if(selected==='open'){
    //     return trainingData?.filter(item=>(item?.category)==='Pending')
    //   }
    //   else if(selected === "in progress"){
    //     return trainingData?.filter(item=>(item?.category)==='Cancelled')

    //   }
    //   else if(selected === "closed"){
    //     return trainingData?.filter(item=>(item?.category)==='Completed')
    //   }else{
    //     return trainingData?.filter(item=>(item?.category)==='Pending')
    //   }
    // }, [selected])


    // const rowData = useMemo(()=>{
    //   if(selected==='pending_training'){
    //     return trainingData?.filter(item=>(item?.category)==='Pending')
    //   }
    //   else if(selected === "cancelled_training"){
    //     return trainingData?.filter(item=>(item?.category)==='Cancelled')

    //   }
    //   else if(selected === "completed_training"){
    //     return trainingData?.filter(item=>(item?.category)==='Completed')
    //   }else{
    //     return trainingData?.filter(item=>(item?.category)==='Pending')
    //   }
    // }, [selected])



  return (
    <>
      <main>
        <PageHeader
          header_text={"Training"}
          breadCrumb_data={[{ name: "Self Service" }, { name: "Training" }]}
          buttonProp={[{ button_text: "New Training", fn: handleOpen }]}
        />
        <div className="mt-5">
          {/* <hr /> */}
        </div>
        <>
          <Separator separator_text={"OVERVIEW"} />
          <TopCards setSelected={handleSeleted}/>
        </>
        
              {/* <Tabs
                  aria-label="Options"
                  selectedKey={selected}
                  onSelectionChange={setSelected}
                  className="mt-4 flex justify-en"
                  variant="bordered"
                  color="secondary"
                  classNames={{
                  base: "rounded",
                  tabList: "outline-none border-[1px] shadow-none"
                  }}
                  radius="sm"
                >
                <Tab key="pending_training" title="Pending Training">
                  <PendingTrainingTable rows={trainingData?.filter(item=>(item?.category)==='Pending')}/>
                </Tab>
                <Tab key="cencelled_training" title="Cancelled Taining">
                  <PendingTrainingTable rows={trainingData?.filter(item=>(item?.category)==='Cancelled')}/>
                </Tab>
                <Tab key="completed_training" title="Completed Training">
                  <PendingTrainingTable rows={trainingData?.filter(item=>(item?.category)==='Completed')}/>
                </Tab>
                
                </Tabs> */}

          <div className='bg-white rounded-lg border mt-8'>
              {/* <GeneralTabs step={setstepper} tabElements={tabElements}/> */}
              <div className="w-full bg-white flex flex-col border-b-4 p-3 rounded-t-md relative overflow-">
                  <div className="flex gap-5">
                      <span className="font-semibold">{selected?.name}</span>
                      <MoreHorizontal className="text-gray-400"/> 
                      <span className="text-gray-300 font-semibold">{selected?.total}</span>

                  </div>
                      <div className={`w-32 h-1 absolute -bottom-1 left-[0.2px] ${selected?.bg}`}></div>
              </div>
              <div className='space-y-5 '>
                  <TrainingTable2  view={view} />
                </div>

              
          </div>














          {/* <PendingTrainingTable rows={rowData}/> */}













          <div className="pt-40">
              <ApprasealForm />
          </div>



      </main>


      <Drawer
        sideBarNeeded={sideBarNeeded}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        tabs={tabs}
        isOpen={isOpen}
        header={drawerHeader}
        setIsOpen={setIsOpen}
      >
         {whatTodo == "view" && (
          <div>
            {tabs[selectedTab].title.toLowerCase() == "training".toLowerCase() && (
              <div className="flex flex-col gap-2">
                <h1 className="mb-5 font-helvetica">Training Details</h1>
                <TrainingDetails/>
              </div>
            )}
            {tabs[selectedTab].title.toLowerCase() == "Comments".toLowerCase() && (
              <Note
                setInformation={()=>{}}
                setSelectedTab={setSelectedTab}
              />
            )}
            {tabs[selectedTab].title.toLowerCase() ==
              "Approvals".toLowerCase() && (
              <ApprovalForm
                setInformation={()=>{}}
                setSelectedTab={setSelectedTab}
              />
            )}
          </div>
        )}
      </Drawer>





      <ExpandedDrawerWithButton isOpen={open} onClose={handleClose}>
        <FormDrawer tabs={[{title: "New Training", }]}>
          <NewTrainingForm />
        </FormDrawer>
      </ExpandedDrawerWithButton>
    </>
  );
}
