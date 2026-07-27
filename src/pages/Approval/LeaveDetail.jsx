/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Chip, cn, Tooltip, useDisclosure } from "@nextui-org/react";
import { Button, DatePicker } from "antd";
import { Edit2Icon, Loader2Icon, PlusCircle } from "lucide-react";
import moment from "moment";
import { useEffect, useMemo, useRef, useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import ExpandedDrawerWithButton from "../../components/modals/ExpandedDrawerWithButton";
import AddNoteRejection from "../../components/core/approvals/AddNoteRejection";
import ConfirmApprovalModal from "../../components/core/approvals/ConfirmApprovalModal";
import { toStringDate } from "../../utils/utitlities";
import { useApprovedApprovalRequest, useCanAssign, useDeclineApprovalRequest } from "../../API/api_urls/my_approvals";
import useCurrentUser from "../../hooks/useCurrentUser";
import toast from "react-hot-toast";
import { useDuration, useLeaveType } from "../../API/leave";
import { IoReload } from "react-icons/io5";
import AssignStaff from "../../components/core/approvals/AssignStaff";
import dayjs from "dayjs";
import { FiEdit2 } from "react-icons/fi";



const dataDum = {
  data : {
    "REQUEST_ID": 39020,
    "FIRST_NAME": "Admin",
    "LAST_NAME": "Africacodes",
    "STAFF_NUMBER": null,
    "LEAVE_NAME": "Emergency",
    "REASON": "Personal",
    "DURATION": 5,
    "START_DATE": null, //"2024-08-05 00:00:00.000",
    "END_DATE": null, // "2024-08-09 00:00:00.000",
    "SELECTED_DATES": '2024-08-05, 2024-08-15, 2024-08-25, 2024-08-31',
    "REQUEST_DATE": "2024-08-02 06:05:45.000"
  },
  requestID: 21456
}



export default function LeaveDetail({role, details, handleClose, currentStatus}) {
  // const [detail, setDetail] = useState({...dataDum})

  const {isOpen:isRejectModalOpen, onOpen:onRejectModalOpen, onClose:onRejectModalClose} = useDisclosure()
  const {isOpen:isModalOpen, onOpen:openModal, onClose: onModalCancel} = useDisclosure()
  const {isOpen:Loading, onOpen:startLoading, onClose: stopLoading} = useDisclosure()

  const {
    isOpen: isAssignModalOpen,
    onOpen: onAssignModalOpen,
    onClose: onAssignModalClose,
  } = useDisclosure();

  const [latestdetails, setLatestDetails] = useState({})
  const [isEditing, seIsEditing] = useState(false)
  const [dates, setDates] = useState({ start_date: '', end_date: ''});


  const [defaultV, setDefaultV] = useState({ start_date: null, end_date: null });
  const [defaultSelectedV, setDefaultSelectedV] = useState(null);
  const {mutateAsync:declineRequestAction, isPending:isDeclinePending} = useDeclineApprovalRequest()
  const {mutateAsync:approveRequestAction, isPending:isApprovePending} = useApprovedApprovalRequest()
  const {userData} = useCurrentUser()
  const {mutateAsync: getDuration} = useDuration()
  const {data: leaveType} = useLeaveType({
    company_id: userData?.data?.COMPANY_ID
  })
  const [leaveVariant, setLeaveVariant] = useState([])

  const { mutateAsync:checkCanAssign } = useCanAssign();
  const [canAssign, setCanAssign] = useState()
  const [canAssignPk, setCanAssignPk] = useState(null)


  const [editingIndex, setEditingIndex] = useState(null);
  const [newDate, setNewDate] = useState(null);

  const datePickerRefs = useRef([]);


  // console.log(defaultSelectedV, latestdetails)




  // Ensure refs array matches the number of dates
  useEffect(() => {
    datePickerRefs.current = datePickerRefs.current.slice(0, defaultSelectedV?.length);
  }, [defaultSelectedV?.length]);




useEffect(() => {
  const checkReassignStatus = async ()=>{

   const json =  {
      company_id: userData?.data?.COMPANY_ID,
      staff_id: userData?.data?.STAFF_ID,
      request_id: details?.requestID,
    }

      const res = await checkCanAssign(json)

      if(res){
        setCanAssign(res?.data?.can_assign)
        setCanAssignPk(res?.data?.package_id)
      }
  }


  checkReassignStatus()

  return ()=>{
    setCanAssign(false)
  }

}, [checkCanAssign, details, userData])


useEffect(() => {

  if(leaveType?.data?.data){
    setLeaveVariant(leaveType?.data?.data)
  }
  
}, [leaveType])





  const rejectRequest = async (rejectnote)=>{
      if(isDeclinePending) return
      startLoading()
      let notes = ""

    if(rejectnote && rejectnote !== "<p><br></p>" ){
      notes = rejectnote
    }
    const json =    {
          "company_id": userData?.data?.COMPANY_ID,
          "staff_id": userData?.data?.STAFF_ID,
          
        "request_id":details?.requestID,
        "rejection_note":notes
        }

        try {


          const res = await declineRequestAction(json)
          if(res){
            toast.success("You successfully decline request", {duration: 5000})
            stopLoading()
            onRejectModalClose()
            handleClose('refresh')
          }
        } catch (error) {
          toast.error(`${error?.response?.data?.message}.`, {duration: 10000})
          stopLoading()
        }
}



const approveRequest = async ()=>{
  if(isApprovePending) return
  onModalCancel()


  const start =  latestdetails["START_DATE"] ?? "" //details?.data['START_DATE']
  const end =  latestdetails["END_DATE"]  ??  "" // details?.data['END_DATE']
  const dur = latestdetails["DURATION"] ??  "" // details?.data['DURATION']
  const arrayOfDates = latestdetails["SELECTED_DATES"] ? latestdetails["SELECTED_DATES"]?.split(",")  :  ""  // details?.data?.SELECTED_DATES ?  //details?.data?.SELECTED_DATES?.split(",") :  null




  const json =    {
    "company_id": userData?.data?.COMPANY_ID,
    "staff_id": userData?.data?.STAFF_ID,
    "request_id":details?.requestID,
    "leave_start_date":start,
    "leave_end_date":end,
    "duration":dur,
    "leave_date_array": arrayOfDates,
    // "memo_content": null,
    // "memo_signature":null
  }

  // if (latestdetails["START_DATE"]) {
  //   json.leave_start_date  = latestdetails["START_DATE"]
  //   json.leave_end_date  = latestdetails["END_DATE"]
  //   json.duration  = latestdetails["DURATION"]
  // }

  // if(latestdetails["SELECTED_DATES"]){
  //   json.leave_date_array  = latestdetails["SELECTED_DATES"]?.split(",")
  //   // json.duration  = latestdetails["DURATION"]
  // }
  // console.log(json)

  try {
    startLoading()
    const res = await approveRequestAction(json)
    if(res){
      toast.success("You successfully approve request", {duration: 2000})
      stopLoading()
      onRejectModalClose()
      handleClose('refresh')
    }
  } catch (error) {
    toast.error(`${error?.response?.data?.message}.`, {duration: 10000})
    stopLoading()
  }
}





const calculateDiff = (start, resumptionDate)=>{
  // Convert the strings to moment objects
  const startDate = moment(start);
  const endDate = moment(resumptionDate);

  // Calculate the difference in days
  const dayDifference = endDate.diff(startDate, 'days');
  return dayDifference;
}


const getleaveDuration = async (start, resumptionDate, type)=>{
  const json = {
    company_id: userData?.data?.COMPANY_ID,
    start_date: start,
    end_date: resumptionDate,
    leave_type: type,
  }

  try {
    const res = await getDuration(json)
    if(res){
      // console.log(res)
      // const val = typeof res?.data === "string"  ? formatToJSON(res?.data) : res?.data
      const val =  res?.data
      // console.log(val?.days)
      return val?.days
    }
  } catch (error) {
    console.log(error)
  }
}


const handleEditLeave = ()=>{
  if(!isEditing){

    if(details?.data?.SELECTED_DATES){
      const arrayOfDates =  details?.data?.SELECTED_DATES?.split(",")?.map(el => el)
      setDefaultSelectedV(arrayOfDates)
      // setDefaultSelectedV(["2025-08-05", "2025-08-15", "2025-08-25", "2025-08-31"])
    }else{   
      const start = details?.data["START_DATE"] ? moment(details?.data["START_DATE"]).format("YYYY-MM-DD") : null
      const end = details?.data['END_DATE'] ? moment(details?.data["END_DATE"]).format("YYYY-MM-DD") : null
  
      setDefaultV({start_date: start, end_date: end })
      setDates({ start_date: '', end_date: ''})
    }

  }
  seIsEditing(!isEditing)
}


const handleReload = ()=>{
  setLatestDetails({})
}


// moment(date).format("YYYY-MM-DD")
const handleToDateChange = (date, type) => {
  if(!date) {
    type === 'start' ? setDates({ ...dates,  start_date: ''}) :  setDates({ ...dates,  end_date: ''})
    return
  }

  if(type === "start"){
      setDates((prev) => {
        return { ...prev, start_date: date };
      });
  }else if(type === "end") {
    setDates((prev) => {
      return { ...prev, end_date:date };
    });
  }
};



const handleSaveEdit = async ()=>{


  if(details?.data?.SELECTED_DATES){

    const edittedDate = defaultSelectedV?.join(",")
    setLatestDetails({ ...details?.data, 
      "SELECTED_DATES": edittedDate,
    })
  }else{

      if(!dates.start_date  && !dates.end_date) return
    
      const start =  dates?.start_date ?  dates?.start_date  : details?.data['START_DATE']
      const end =  dates?.end_date ?  dates?.end_date  : details?.data['END_DATE']

      const startjson = moment(start).format("YYYY-MM-DD")
      const endjson = moment(end).format("YYYY-MM-DD")
      const leaveTypejson = leaveVariant?.find(lv => lv.TYPE_NAME === details?.data['LEAVE_NAME'] )?.TYPE_ID

      if(moment(startjson).isSameOrAfter(moment(endjson), "day")){
        toast.error("start date must be bofore end date", {duration: 8000})
        return
      }
    

      const dataDiff =  await getleaveDuration(startjson, endjson, leaveTypejson)
      const leaveStart = moment(start).format('YYYY-MM-DD HH:mm:ss.SSS')
      const leaveEnd = moment(end).format('YYYY-MM-DD HH:mm:ss.SSS')
    
      setLatestDetails({ ...details?.data,
        "START_DATE": leaveStart,
        "END_DATE" : leaveEnd ,
        "DURATION": dataDiff || 1,
      })

  }

  seIsEditing(false)
}


// console.log(latestdetails)


const canEdit = useMemo(() => {

    if(role === 'request'){
      return false
    }

      const findHandOver = details?.approvers?.find(el => el?.DESIGNATION === "HAND OVER") 

      if(findHandOver && findHandOver?.REQUEST_STATUS === "Pending"){
        return false
      }

      return true

}, [details, role])


// SELECTED DATE UPDATE MODE
const removeSelectedDate = (id)=>{
  setDefaultSelectedV(defaultSelectedV?.filter((el, idx) => idx !== id ))
}
const onSelectedDateChange = (value, id)=>{
  setDefaultSelectedV(defaultSelectedV?.map((el, idx) => idx === id ? value : el ))

  // const updatedDates = [...defaultSelectedV];
  // updatedDates[id] = value;
  // setDefaultSelectedV(updatedDates);
  setEditingIndex(null);
}
const toggleDateEdit = (index) => {
  setEditingIndex(index);
  // Use setTimeout to ensure the DOM is updated
  setTimeout(() => {
    if (datePickerRefs.current[index]) {
      datePickerRefs.current[index].focus();
    }
  }, 0);
};

const addNewDate = () => {
  if (newDate) {
    setDefaultSelectedV([...defaultSelectedV, newDate]);
    setNewDate(null); 
  }
};






  return (
    <>
      <div className="  rounded p-4 bg-white w-full font-helvetica">
        <h4 className="text-2xl font-medium">LEAVE DETAILS</h4>
        <div className='flex justify-end '>
          {
           (!currentStatus ? true : currentStatus === "pending" ) &&   canEdit && (
            <Tooltip showArrow color='default' content={isEditing ? "Cancel" :'Edit'} delay={300}>
              <button
                className={cn('p-2 rounded-full', isEditing ? "bg-red-50 " : "bg-blue-100 ")}
                onClick={handleEditLeave}
              >
                  {
                    isEditing ?    <ImCancelCircle className='w-4 h-4 text-red-300' /> :
                    <Edit2Icon className='w-4 h-4 text-blue-400' />
                  }
              </button>
            </Tooltip>
            )
          }
          {
            Object.keys(latestdetails).length > 0  &&
           (!currentStatus ? true : currentStatus === "pending" ) &&   canEdit && (
            <Tooltip showArrow color='default' content={'Relaod'} delay={300}>
              <button
                className={cn('p-2 rounded-full bg-blue-100  mx-2 ')}
                onClick={handleReload}
              >
                    <IoReload strokeWidth={2} className='w-4 h-4 text-blue-300 text-bold' />
              </button>
            </Tooltip>
            )
          }
        </div>

        {
          isEditing ?  
            (
              details?.data?.SELECTED_DATES ? (
                <div className="flex flex-col gap-5 my-4">

                <div className="grid grid-cols-3 md:grid-cols-4 items-center gap-4 border-b border-b-gray-100 pb-2 ">
                  <p className="font-medium font-helvetica uppercase">ADD DATES</p>

                  <div className="flex col-span-3 flex-wrap w-full gap-2 gap-x-8 transition-all duration-300">

                  <div className="flex items-center">
                    <DatePicker
                      size="middle"
                      className="border-gray-300 rounded-md focus:outline-none"
                      onChange={(date, dateString) => {
                        setNewDate(dayjs(dateString).format("YYYY-MM-DD"));
                      }}
                      value={newDate ? dayjs(newDate, "YYYY-MM-DD") : null}
                    />
                    <Button 
                      onClick={addNewDate}
                      className="ml-2 p-1 px-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
                      disabled={!newDate}
                    >
                      <PlusCircle size={20} className="text-blue-500" />
                    </Button>
                  </div>

                  </div>
                </div>

                <div className="grid grid-cols-3 md:grid-cols-4 items-center gap-4 border-b pb-2 ">
                   <p className="font-medium font-helvetica uppercase">EDIT DATES</p>
                     <div className="flex col-span-3 flex-wrap w-full gap-2 gap-x-8 transition-all duration-300">
                        {
                          defaultSelectedV?.map((el, i) => (
                            <div key={i} className="relative flex ">
                                <Chip
                                  color="warning"
                                  className="m-1 px-2 py-2 transition-all duration-300"
                                  size="md"
                                  variant="flat"
                                >
                                  {toStringDate(el) || ''}
                                </Chip>

                                <Tooltip showArrow color='default' content={'Change Date'} delay={300}>
                                    <div 
                                      onClick={() => toggleDateEdit(i)} 
                                      className="cursor-pointer mx-1 absolute top-3 -right-7 bg-white rounded-full p-[0.18rem]  border border-gray-300 shadow-sm"
                                      aria-label={`Edit date ${toStringDate(el)}`}
                                    >
                                      <FiEdit2 size={11} className="text-blue-500" />
                                    </div>  
                                </Tooltip>
                                {
                                  defaultSelectedV?.length > 1 && (
                                    <div onClick={()=>removeSelectedDate(i)} className="absolute top-0 right-0 cursor-pointer"><ImCancelCircle className="text-red-400" /> </div>
                                  )
                                }

                              <div className="absolute opacity-0 pointer-events-none">
                                <DatePicker
                                  ref={el => datePickerRefs.current[i] = el}
                                  defaultValue={dayjs(el, "YYYY-MM-DD")}
                                  onChange={(date, dateString) => {
                                    onSelectedDateChange(dayjs(dateString).format("YYYY-MM-DD"), i);
                                  }}
                                  open={editingIndex === i}
                                  onOpenChange={(open) => {
                                    if (!open) setEditingIndex(null);
                                  }}
                                />
                              </div>
                            </div>
                          ))
                        }
                    

                     </div>
                </div>
                <button onClick={handleSaveEdit} disabled={!details?.data?.SELECTED_DATES} className="header_btnStyle bg-[#00bcc2] rounded text-white font-semibold w-20  disabled:cursor-not-allowed ml-auto mx-2 my-1 md:my-0 px-[13px] py-[7px] uppercase">Edit</button>
              </div>
              ) :
              <div className="flex flex-col gap-5 my-4">

                <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-4 border-b pb-2">
                   <p className="font-medium font-helvetica uppercase">START DATE</p>
                   <DatePicker
                    placeholder={defaultV?.start_date}
                  onChange={(e) => handleToDateChange(e?.$d, 'start')}
                  className=" w-full border  outline-none focus:border-transparent h-10 rounded-md focus:outline-none md:col-span-2"
                />  
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-4 border-b-1 pb-2">
                   <p className="font-medium font-helvetica uppercase">END DATE</p>
                   <DatePicker
                      placeholder={defaultV?.end_date}
                  onChange={(e) => handleToDateChange(e?.$d, 'end')}
                  className=" w-full border outline-none focus:border-transparent h-10 rounded-md focus:outline-none md:col-span-2"
                />
                </div>
                {/* {(dates?.start_date)?.toString()} {(dates?.end_date)?.toString()} */}
                <button onClick={handleSaveEdit} disabled={!dates?.start_date  && !dates?.end_date} className="header_btnStyle bg-[#00bcc2] rounded text-white font-semibold w-20  disabled:cursor-not-allowed ml-auto mx-2 my-1 md:my-0 px-[13px] py-[7px] uppercase">Edit</button>
              </div>
            )
          :
              <ul className="flex flex-col gap-5 my-4">
                {(Object.keys(latestdetails).length > 0 ?  Object.entries(latestdetails) :  Object.entries(details?.data))?.filter(([key]) => key !== 'FILE_NAME' && key !== "REQUEST_ID")?.map(([key,value], i) => (
                  <li className="grid grid-cols-3 gap-4 border-b-1 pb-2" key={i}>
                    <p className="font-medium font-helvetica uppercase">{key.replace(/_/g, ' ')}</p>
                    <span className="text-gray-500/90 col-span-2">{
                      // key?.includes("SELECTED_DATES") ? value?.join(", ") ||  'N/A'   :
                      key?.includes("SELECTED_DATES") ? value?.split(",")?.map((el, i) => (
                            <Chip
                              key={i}
                              color="primary"
                              className="m-1"
                              size="sm"
                              variant="flat"
                            >
                              {toStringDate(el) || ''}
                            </Chip>
                          
                      )) || 'N/A'   :
                    (
                      (key.includes('DATE')) || (key.includes('DATES')) || (key.includes('Date')) ) ? (value ? toStringDate(
                        key === 'START_DATE' &&
                        details?.data['SELECTED_DATES'] ? details?.data?.SELECTED_DATES?.split(',')[0] :

                         key === 'END_DATE' &&
                         details?.data?.SELECTED_DATES ? details?.data?.SELECTED_DATES?.split(',')[details?.data?.SELECTED_DATES?.split(',')?.length -1]
                         
                         :         value
                         ) || "N/A" : "N/A" ) : (value !== null ? value : 'N/A')}</span>
                  </li>
                ))}
              </ul>
        }
      </div>

      {
         (!currentStatus ? true : currentStatus === "pending" ) &&  !isEditing && role !== 'request' &&
         details?.data &&
        <div className="flex justify-between mt-3">
            <button
            disabled={isDeclinePending}
            className="header_btnStyle bg-red-500 rounded text-white font-semibold  mx-2 my-1 md:my-0 px-[13px] py-[7px] uppercase flex items-center gap-2" onClick={onRejectModalOpen}>
            { isDeclinePending &&
                    <Loader2Icon className="animate-spin"/>
                  }
              Reject</button>


            <div className="flex gap-2">

              {
                canAssign && 
                <button
                  disabled={Loading}
                  className="header_btnStyle bg-gray-600 rounded text-white font-semibold  mx-2 my-1 md:my-0 px-[13px] py-[7px] uppercase disabled:cursor-not-allowed disabled:bg-gray-300"
                  onClick={onAssignModalOpen}
                >
                  Re-Assign
                </button>
              }

               <button
               disabled={Loading || isApprovePending}
               className="header_btnStyle bg-[#00bcc2] rounded text-white font-semibold  mx-2 my-1 md:my-0 px-[13px] py-[7px] uppercase flex items-center gap-2" onClick={openModal}>
               { isApprovePending &&
                    <Loader2Icon className="animate-spin"/>
                  }
                
                Approve</button>
            </div>


        </div>
      }



      <ExpandedDrawerWithButton maxWidth={600} isOpen={isRejectModalOpen} onClose={onRejectModalClose}>
                    <div className="mt-10 mx-5">
                        <AddNoteRejection handleConfirm={rejectRequest} loading={Loading} handleCancel={onRejectModalClose} />
                    </div>
        </ExpandedDrawerWithButton>

        <ExpandedDrawerWithButton isOpen={isAssignModalOpen} onClose={onAssignModalClose} maxWidth={450}>
          <AssignStaff closeDrawer={()=>handleClose('refresh')} package_id={canAssignPk} request_id={details?.requestID}/>
      </ExpandedDrawerWithButton>

        <ConfirmApprovalModal subject={"Are you sure you want to approve request?"} isOpen={isModalOpen} loading={isApprovePending}  handleOk={approveRequest}  handleCancel={onModalCancel}  />

    </>
  );
}
