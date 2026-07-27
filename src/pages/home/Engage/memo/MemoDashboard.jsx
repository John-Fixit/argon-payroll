/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react";
import { Input, Select, SelectItem } from "@nextui-org/react";
import PageHeader from "../../../../components/payroll_components/PageHeader";
import Separator from "../../../../components/payroll_components/Separator";
import Attachement from "../../../../components/Request&FormComponent/Attachement";
import OverviewCards from "./components/OverviewCards";

import ExpandedDrawerWithButton from "../../../../components/modals/ExpandedDrawerWithButton";
import FormDrawer from "../../../../components/payroll_components/FormDrawer";
import Training_UploadForm from "./components/Training_UploadForm";
import ExpenseForm from "./components/ExpenseForm";
import TravelForm from "./components/TravelForm";
import InvoiceForm from "./components/InvoiceForm";
import AccessForm from "./components/AccessForm";
import EditMemo from "./components/EditMemo";
import SignMemo from "./components/SignMemo";

import Form from "./components/Form.jsx";

import { data } from "./memoDoomyData.js";
import AddNote from "./components/AddNote.jsx";
import MemoCard from "./components/MemoCard.jsx";
import ViewNotes from "./components/MemoNotes.jsx";
import MemoAttachment from "./components/MemoAttachment.jsx";
import MemoApproval from "./components/MemoApproval.jsx";

import { Tabs, Tab } from "@nextui-org/react";
import MemoApprovalHistory from "./components/MemoApprovalHistory.jsx";
import MemoNotes from "./components/MemoNotes.jsx";
import Memotable from "./components/Memotable.jsx";
import { useGetMyMemoRequest } from "../../../../API/memo.js";
import useCurrentUser from "../../../../hooks/useCurrentUser.jsx";
import useMemoData from "../../../../hooks/useMemoData.jsx";
import { DatePicker } from "antd";
import toast from "react-hot-toast";
import MemoBarChart from "./components/MemoBarChart.jsx";
import MemoPieChart from "./components/MemoPieChart.jsx";
// import { useForm } from "react-hook-form";

export default function MemoDashboard() {
  const [open, setOpen] = useState({ status: false, role: null, memo: null });
  const [openDrawer, setOpenDrawer] = useState({ status: false, type: null });
  const [selectedMemo, setSelectedMemo] = useState("");
  const {mutateAsync: getMyRequest, isPending} = useGetMyMemoRequest() 
  const {userData} = useCurrentUser()
  const [pendingMemo, setPendingMemo] = useState([])
  const [draftMemo, setDraftMemo] = useState([])
  const [approvedMemo, setApprovedMemo] = useState([])
  const [declinedMemo, setDeclinedMemo] = useState([])
  const [receivedMemo, setReceivedMemo] = useState([])
  const [completedMemo, setCompletedMemo] = useState([])
  const [selectedMemoData, setSelectedMemoData] = useState([]);
  const {updateDefault} = useMemoData()
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [selected, setSelected] = useState("Pending");
  const [refresh, setRefresh] = useState(0)


  useEffect(() => {
   const json = {
      "company_id": userData?.data?.COMPANY_ID,
      "staff_id": userData?.data?.STAFF_ID,
      "status":"Pending",
      "start_date":"",
      "end_date":""
    }

    const getData = async ()=>{
      try {
        const res = await  getMyRequest(json)
        if(res){
          setPendingMemo(res?.data?.requests)
        }
      } catch (error) {
        console.log(error)
      }
    }
    
      getData()

  }, [getMyRequest, userData, refresh])

  useEffect(() => {
   const json = {
      "company_id": userData?.data?.COMPANY_ID,
      "staff_id": userData?.data?.STAFF_ID,
      "status":"Draft",
      "start_date":"",
      "end_date":""
    }

    const getData = async ()=>{
      try {
        const res = await  getMyRequest(json)
        if(res){
          setDraftMemo(res?.data?.requests)
        }
      } catch (error) {
        console.log(error)
      }
    }
    
      getData()

  }, [getMyRequest, userData, refresh])



  useEffect(() => {
   const json = {
      "company_id": userData?.data?.COMPANY_ID,
      "staff_id": userData?.data?.STAFF_ID,
      "status":"Approved",
      "start_date":"",
      "end_date":""
    }

    const getData = async ()=>{
      try {
        const res = await  getMyRequest(json)
        if(res){
          setApprovedMemo(res?.data?.requests)
        }
      } catch (error) {
        console.log(error)
      }
    }
    
      getData()

  }, [getMyRequest, userData, refresh])


  useEffect(() => {
   const json = {
      "company_id": userData?.data?.COMPANY_ID,
      "staff_id": userData?.data?.STAFF_ID,
      "status":"Declined",
      "start_date":"",
      "end_date":""
    }

    const getData = async ()=>{
      try {
        const res = await  getMyRequest(json)
        if(res){
          setDeclinedMemo(res?.data?.requests)
        }
      } catch (error) {
        console.log(error)
      }
    }
    
      getData()

  }, [getMyRequest, userData, refresh])

  useEffect(() => {
   const json = {
      "company_id": userData?.data?.COMPANY_ID,
      "staff_id": userData?.data?.STAFF_ID,
      "status":"Received",
      "start_date":"",
      "end_date":""
    }

    const getData = async ()=>{
      try {
        const res = await  getMyRequest(json)
        if(res){
          setReceivedMemo(res?.data?.requests)
        }
      } catch (error) {
        console.log(error)
      }
    }
    
      getData()

  }, [getMyRequest, userData, refresh])

  useEffect(() => {
   const json = {
      "company_id": userData?.data?.COMPANY_ID,
      "staff_id": userData?.data?.STAFF_ID,
      "status":"Completed",
      "start_date":"",
      "end_date":""
    }

    const getData = async ()=>{
      try {
        const res = await  getMyRequest(json)
        if(res){
          setCompletedMemo(res?.data?.requests)
        }
      } catch (error) {
        console.log(error)
      }
    }
    
      getData()

  }, [getMyRequest, userData, refresh])









  const handleOpenDrawer = (role, memo) => {
    setOpen({ status: true, role: role });
    setSelectedMemo(memo);
  };
  const handleCloseDrawer = () => {
    setOpen({ status: false });
  };

  //second drawer
  const openDrawerFn = (type, memo) => {
    // setSelectedMemo(memo);
    if(type === 'create_memo'){
      updateDefault()
    }
    setOpenDrawer({ ...openDrawer, status: true, type: type });
  };
  const closeDrawerFn = (change) => {
    setOpenDrawer({ ...openDrawer, status: false });
    updateDefault()

    if(change){
      // const value = draftMemo?.filter(dft => dft?.MEMO_ID !== draftID)
      // setDraftMemo([...value])
      setRefresh(prev=> prev + 1)
    }
  };



  const modifiedData = useMemo(() => {
    if (selected === "all") {
      return data;
    } else if (selected === "Draft") {
      return data?.filter(
        (memo) => memo?.created_by === "me" && memo?.status === "draft"
      );
    } else if (selected === "Approval") {
      return data?.filter((memo) => memo?.created_by !== "me");
    } else if (selected === "Pending") {
      return data?.filter((memo) => memo?.created_by === "me" && memo?.status === "pending");
    }
  }, [selected]);


  const modifiedMemoData = useMemo(() => {
     if (selected === "Draft") {
       setSelectedMemoData(draftMemo)
      return draftMemo;
    } else if (selected === "Approved") {
      setSelectedMemoData(approvedMemo)
      return approvedMemo;
    } else if (selected === "Pending") {
      setSelectedMemoData(pendingMemo)
      return pendingMemo;
    }else if (selected === "Received") {
      setSelectedMemoData(receivedMemo)
      return receivedMemo;
    }else if (selected === "Declined"){
      setSelectedMemoData(declinedMemo)
      return declinedMemo;
    }else if (selected === "Completed"){
      setSelectedMemoData(completedMemo)
      return declinedMemo;
    }else {
      setSelectedMemoData(pendingMemo)
      return pendingMemo;
    }
  }, [selected, draftMemo, approvedMemo, pendingMemo, receivedMemo, declinedMemo]);


  setReceivedMemo
  const onDateSelected = (e, from) => {
    if(e === null){
      if(from === "start"){
        setStartDate(null)
      }else{
        setEndDate(null)
      }
      return
  }
    const year = e?.$y;
    const month = formatMonth((e?.$M + 1)?.toString());
    const day = formatDay(e?.$D?.toString());
    const date = `${year}-${month}-${day}`;
    const monthFormat = `${year}-${month}`;

    if (!year) return;

    if(from === "start"){
      setStartDate(date)
    }else{
      setEndDate(date)
    }
  };

  const formatDay = (value) => {
    if (!value) return null;
    if (value.length == 1) return `0${value}`;
    return value;
  };
  const formatMonth = (value) => {
    if (!value) return null;
    if (value.length === 1) return `0${value}`;
    return value;
  };


  const handleSearch = async ()=>{

    if(!startDate && !endDate){
      toast.error("start date and end date is required")
      return
    } 
    const json = {
      "company_id": userData?.data?.COMPANY_ID,
      "staff_id": userData?.data?.STAFF_ID,
      "status": selected,//Draft, Pending, Approved, Declined, Received
      "start_date":startDate,
      "end_date":endDate
    }

    try {
      const res = await  getMyRequest(json)
      if(res){
        updateAppropriate(res?.data?.requests)
      }
    } catch (error) {
      console.log(error)
    }

  }


  const updateAppropriate = (value)=>{
    switch (selected) {
      case 'Pending':
          setPendingMemo(value)
        break;
      case 'Draft':
          setDraftMemo(value)
        break;
      case 'Approved':
          setApprovedMemo(value)
        break;
      case 'Declined':
          setDeclinedMemo(value)
        break;
      case 'Received':
          setReceivedMemo(value)
        break;
      default:
        break;
    }
  }








  return (
    <>
      <main>
        <section className="header_dashboard_section ">
          <PageHeader
            header_text={"Memos"}
            breadCrumb_data={[{ name: "Home" }, { name: "Memos" }]}
            buttonProp={[
              // { button_text: "My Aproval Memo" },
              {
                button_text: "Create Memo",
                fn: () => openDrawerFn("create_memo"),
              },
            ]}
          />
        </section>
        <div className="mt-5">
          <hr />
        </div>
        <>
          <Separator separator_text={"OVERVIEW"} />
          <OverviewCards 
            selected={selected}
            pendingMemo={pendingMemo}
            draftMemo={draftMemo}
            approvedMemo={approvedMemo}
            declinedMemo={declinedMemo}
            receivedMemo={receivedMemo}
            memos={data} 
            setSelected={setSelected}
            loading={isPending}
          />
        </>
        <Separator separator_text={"ALL MEMOS"} />

          {/* <div className="grid sm:grid-cols-2 gap-6 mb-20 mt-6">
      <MemoBarChart/>
      <MemoPieChart/>
      </div> */}

        <section className="memos_section mt-3">
            <div className="flex justify-center items-center flex-col md:flex-row gap-4 mt-12 mb-4 md:w-[80%]">
              <DatePicker
                placeholder="Start date"
                onChange={(e) => onDateSelected(e, "start")}
                className=" w-full border h-[50px] rounded-md focus:outline-none font-medium"
              />
              <DatePicker
                placeholder="End date"
                onChange={(e) => onDateSelected(e, "end")}
                className=" w-full border h-[50px] rounded-md focus:outline-none font-medium"
              />

                <button onClick={handleSearch} className="uppercase h-[47px] text-center rounded-[6px] text-[16px] font-[400] font-[circularstd, sans-serif] leading-[24px] bg-[#00bcc2] w-full text-white">
                  Search
                </button>
            </div>
        </section>





        <section className="memos_section mt-3">
          {/* <div className="filter_section grid grid-cols-1 md:grid-cols-4 gap-5">
            <div>
              <Input
                type="text"
                variant={"bordered"}
                label="Memo Name"
                className="text-[rgb(33, 37, 41)] font-[400] h-[50px] text-[15px] leading-[2]"
                classNames={{
                  inputWrapper:
                    "outline-none border-[1px] shadow-none rounded-[0.375rem] bg-white",
                  label: "z-1",
                }}
              />
            </div>
            <div>
              <Input
                type="text"
                variant={"bordered"}
                label="Memo Name"
                className="text-[rgb(33, 37, 41)] bg-[rgb(255, 255, 255)] font-[400] h-[50px] text-[15px]"
                classNames={{
                  inputWrapper: [
                    "outline-none",
                    "border-[1px]",
                    "shadow-none",
                    "rounded-[0.375rem]",
                    "bg-white",
                  ],
                  label: "z-1",
                }}
              />
            </div>
            <div>
              <Select
                value={"Select Designation"}
                className="text-[#000] text-semibold bg-[rgb(255, 255, 255)] text-[15px] leading-[2] py-0"
                variant="bordered"
                aria-label="Select Designation"
                size="sm"
                classNames={{
                  mainWrapper: ["h-[50px]"],
                  trigger: [
                    "outline-none",
                    "border-[1px]",
                    "shadow-none",
                    "rounded-[0.375rem]",
                    "bg-white",
                  ],
                  value: [
                    "text-[rgb(103, 103, 103)]",
                    "text-[14px]",
                    "font-[500]",
                  ],
                }}
              >
                <SelectItem value="Select Designation">
                  Select Designation
                </SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
                <SelectItem value="option3">Option 3</SelectItem>
              </Select>
            </div>
            <div>
              <button className="uppercase h-[47px] text-center rounded-[6px] text-[16px] font-[400] font-[circularstd, sans-serif] leading-[24px] bg-[#00bcc2] w-full text-white">
                Search
              </button>
            </div>
          </div> */}

          {/* <Tabs
            aria-label="Options"
            selectedKey={selected}
            onSelectionChange={setSelected}
            className="mt-4 flex justify-en"
            variant="bordered"
            color="secondary"
            classNames={{
            base: "rounded"
            }}
            radius="sm"
          >
            <Tab key="my_memos" title="My Memos">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-7 lg:gap-5">
                {data
                  ?.filter((memo) => memo?.created_by === "me")
                  ?.map((item, index) => (
                    <MemoCard
                      key={index + "_memo"}
                      memo={item}
                      handleOpenDrawer={handleOpenDrawer}
                      openDrawerFn={openDrawerFn}
                    />
                  ))}
              </div>
            </Tab>
            <Tab key="approval_memo" title="Approval Memo">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-7 lg:gap-5">
                {data
                  ?.filter((memo) => memo.created_by !== "me")
                  ?.map((item, index) => (
                    <MemoCard
                      key={index + "_memo"}
                      memo={item}
                      handleOpenDrawer={handleOpenDrawer}
                      openDrawerFn={openDrawerFn}
                    />
                  ))}
              </div>
            </Tab>
          </Tabs> */}

          {/* <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-7 lg:gap-5 mt-3">
            {modifiedData?.map((item, index) => (
              <MemoCard
                key={index + "_memo"}
                memo={item}
                handleOpenDrawer={handleOpenDrawer}
                openDrawerFn={openDrawerFn}
              />
            ))}
          </div> */}
        </section>
      </main>


      <Memotable 
        memoData={modifiedMemoData}  
        status={selected}   
        handleOpenDrawer={handleOpenDrawer} 
        onEditDrawer={()=>openDrawerFn("edit_memo")}
      />

      <ExpandedDrawerWithButton
          maskClosable={false}
        isOpen={openDrawer.status}
        onClose={closeDrawerFn}
        maxWidth={"47rem"}
      >

        {/* staff, dept, unit, derectorate, region,  */}
        {
        // openDrawer.type === "viewMemo" || openDrawer === "viewNote" ? (
        //   <div className="mt-5 mb-5">
        //     {openDrawer.type === "viewNote" ? (
        //       <ViewNotes />
        //     ) : (
        //       <SignMemo
        //         memo={selectedMemo}
        //         openDrawerFn={openDrawerFn}
        //         handleOpenDrawer={handleOpenDrawer}
        //       />
        //     )}
        //   </div>
        // ) : 
        (
          <FormDrawer
            onClose={closeDrawerFn}
            type={openDrawer?.type}
            tabs={
              openDrawer?.type === "create_memo"
                ? [
                    {
                      title: "Create Memo",
                      component: <Form handleCloseDrawer={closeDrawerFn}/>,
                      header_text: "Create Memo",
                      subText: "",
                    },
                    {
                      title: "Add Signer",
                      component: <MemoApproval />,
                      header_text: "Signer",
                    },
                    // {
                    //   title: "Add Attachment",
                    //   component: <Attachement />,
                    //   header_text: "Attachment",
                    // },
                    // {
                    //   title: "Add Approval",
                    //   component: <MemoApproval />,
                    //   header_text: "Approvals",
                    // },
                    // {
                    //   title: "Add Note",
                    //   component: <AddNote />,
                    //   header_text: "Add Note",
                    // },
                  ]
                : openDrawer?.type === "edit_memo"
                ? [
                    {
                      title: "Edit Memo",
                      component: <Form />,
                      header_text: "Edit Memo",
                      sub_text: "",
                    },
                    // {
                    //   title: "Attachment",
                    //   component: <Attachement />,
                    //   header_text: "Attachment",
                    //   sub_text: "",
                    // },
                    {
                      title: "Approval",
                      component: <MemoApproval />,
                      header_text: "Approval History",
                    },
                    // { title: "Note", component: <AddNote /> }
                  ]
                : openDrawer.type === "addNote"
                ? [
                    {
                      title: "Add Note",
                      component: <AddNote />,
                      header_text: "Add Note",
                    },
                  ]
                : openDrawer.type === "viewNote" ? [
                    { title: "Notes", component: <MemoNotes />, header_text: "Notes" },
                    // { title: "Attachment", component: <MemoAttachment />, header_text: "Memo Attachment" },
                    // { title: "Approval", component: <MemoApprovalHistory />, header_text: "Memo Approval History" },
                  ]
                : openDrawer.type==='approval_history' && [
                  { title: "Approval", component: <MemoApprovalHistory />, header_text: "Memo Approval History" },
                    // { title: "Notes", component: <MemoNotes />, header_text: "Notes" },
                    // { title: "Attachment", component: <MemoAttachment />, header_text: "Memo Attachment" },
                  ]
            }
          >
           
            <Form />

          </FormDrawer>
        )}
      </ExpandedDrawerWithButton>

      <ExpandedDrawerWithButton
        isOpen={open.status}
        onClose={handleCloseDrawer}
      >
        <div className="my-6 overflow-y-auto">
          <img className="min-h-[80vh] w-full" src={selectedMemo?.FILE_NAME} alt="completed memo image" />
        </div>
      </ExpandedDrawerWithButton>


      {/* VERSION ONE *IMPORTANT* */}
      {/* <ExpandedDrawerWithButton
        isOpen={open.status}
        onClose={handleCloseDrawer}
      >
        <SignMemo memo={selectedMemo} role={"request"} handleClose={handleCloseDrawer}  handleOpenDrawer={openDrawerFn} />
      </ExpandedDrawerWithButton> */}

      
    </>
  );
}
