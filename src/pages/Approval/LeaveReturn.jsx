/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Chip, useDisclosure } from "@nextui-org/react";
import AddNoteRejection from "../../components/core/approvals/AddNoteRejection";
import ConfirmApprovalModal from "../../components/core/approvals/ConfirmApprovalModal";
import ExpandedDrawerWithButton from "../../components/modals/ExpandedDrawerWithButton";
import { toStringDate } from "../../utils/utitlities";
import { useApprovedApprovalRequest, useCanAssign, useDeclineApprovalRequest } from "../../API/api_urls/my_approvals";
import useCurrentUser from "../../hooks/useCurrentUser";
import toast from "react-hot-toast";
import { BsEnvelopePaper } from "react-icons/bs";
import { useEffect, useState } from "react";
import AssignStaff from "../../components/core/approvals/AssignStaff";
import { Loader2Icon } from "lucide-react";


export default function LeaveReturnDetails({ role, details, title, handleClose, currentStatus }) {


  const {isOpen:isRejectModalOpen, onOpen:onRejectModalOpen, onClose:onRejectModalClose} = useDisclosure()
  const {isOpen:isModalOpen, onOpen:openModal, onClose: onModalCancel} = useDisclosure()
  const {isOpen:Loading, onOpen:startLoading, onClose: stopLoading} = useDisclosure()
  const {isOpen: isAssignModalOpen, onOpen: onAssignModalOpen, onClose: onAssignModalClose,
  } = useDisclosure();

  const {mutateAsync:declineRequestAction, isPending:isDeclinePending} = useDeclineApprovalRequest()
  const {mutateAsync:approveRequestAction, isPending:isApprovePending} = useApprovedApprovalRequest()
  const {userData} = useCurrentUser()

  const { mutateAsync:checkCanAssign } = useCanAssign();
  const [canAssign, setCanAssign] = useState()
  const [canAssignPk, setCanAssignPk] = useState(null)



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
  const json =    {
    "company_id": userData?.data?.COMPANY_ID,
    "staff_id": userData?.data?.STAFF_ID,
   "request_id":details?.requestID,
     "leave_start_date":null,
    "leave_end_date":null,
    "leave_date_array": null,
    "memo_content": null,
    "memo_signature":null,
    "duration":null
  }

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

  return (
    <>
      <div className="shadow  rounded p-4 bg-white w-full font-helvetica">
        <h4 className="text-2xl font-medium">Leave Return Details</h4>

        {
          !details?.data || details?.data?.length === 0 ? (

            <div className="flex flex-col gap-2  items-center justify-center h-full pt-5 ">
            <BsEnvelopePaper className="text-gray-300" size={40}/>  
            <span className=" text-default-400 font-bold text-md">Empty Records</span>
            </div>

          ) :
          details?.data[0] && details?.data[0]?.ATTRIBUTE_NAME ? (

              <div className="flex flex-col">
                   <div className='fle justify-betwee items-center gap-4 mb-3 grid grid-cols-3 border-b pb-1 my-3'>
                    <h2 className=' text-[1rem] my-auto font-[600] font-helvetica text-[#444e4e] capitalize'>
                    </h2>
                    <h2 className=' text-[1rem] my-auto font-[600] font-helvetica text-[#444e4e] capitalize'>
                      Previous
                    </h2>
                    <h2 className=' text-[1rem] my-auto font-[600] font-helvetica text-[#444e4e] capitalize'>
                      New Detail
                    </h2>
                  </div>
                  <ul className=' mt-2 text-[15px] flex flex-col space-y-3'> 
                    {
                      details?.data?.map(dt => (
                        <li key={dt?.ATTRIBUTE_NAME} className=' grid grid-cols-3  my-3 border-b pb-1'>
                          <span className='text-[#444e4e] font-helvetica font-[500] text-[0.9rem] capitalize '>
                            {' '}
                            {dt?.ATTRIBUTE_NAME?.replace(/_/g, ' ')}:
                          </span>
                          <span className='text-[#888888]  text-en w-full  max-w-sm fontbold font-profileFontSize '>
                            {dt?.CURRENT_VALUE || "N/A"}
                          </span>
                          <span className='text-[#888888]  text-en w-full  max-w-sm fontbold font-profileFontSize '>
                            {dt?.NEW_NAME || dt?.NEW_VALUE}
                          </span>
                        </li>

                      ))
                    }           
                    </ul>
              </div>


          ) : (

              <div className="flex flex-col ">
                {
                  details?.data?.FILE_NAME && (
                    <div className="w-[5rem] h-[5rem] my-4 rounded-full border-2 border-gray-200 overflow-auto bg-gray-50">
                      <img
                        src={
                          details?.data?.FILE_NAME
                            ? details?.data?.FILE_NAME
                            : "/assets/images/profiles/user-2.png"
                        }
                        className="w-full h-full object-cover"
                        alt=""
                      />
                    </div>
                  )
                }
                    <ul className="flex flex-col gap-5 my-4">
                      {details?.data &&
                        Object.entries(details?.data)
                          ?.filter(([key]) => key !== "FILE_NAME" && key !== "REQUEST_ID" && key !== "SELECTED_DATES" && key !== "ACTUAL_LEAVE_DAYS" && key !== "LEAVE_OVERSHOOT_DAYS" && key !== "UNUSED_LEAVE_DAYS"  && key !== "TYPE_ID" && key !== "COMPANY_ID")
                          ?.map(([key, value], i) => (
                            <li className="grid grid-cols-3 gap-4 border-b-1 pb-2" key={i}>
                              <p className="font-medium font-helvetica uppercase">
                                {key?.replace(/_/g, " ")}
                              </p>
                              <span className="text-gray-400 col-span-2">

                                {
                                key?.includes("SELECTED_DATES") ? value?.split(", ")?.map((el, i) => (
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

                                key?.includes("DATE")
                                  ? !value
                                    ? "N/A"
                                    : toStringDate(value) || "N/A"
                                  : value !== null
                                  ? value || "N/A"
                                  : "N/A"}
                              </span>
                            </li>
                          ))}
                        
                        <li className="grid grid-cols-3 gap-4 border-b-1 pb-2">
                                <p className="font-medium font-helvetica uppercase">
                                ACTUAL DURATION USED
                              </p>    
                              <span className="text-gray-400 col-span-2">
                                {
                                    details?.data?.ACTUAL_LEAVE_DAYS
                                }
                                </span> 
                        </li>
                        <li className="grid grid-cols-3 gap-4 border-b-1 pb-2">
                                <p className="font-medium font-helvetica uppercase">
                                OVER SHOOT DAYS
                              </p>    
                              <span className="text-gray-400 col-span-2">
                                {
                                    details?.data?.LEAVE_OVERSHOOT_DAYS
                                }
                                </span> 
                        </li>
                        <li className="grid grid-cols-3 gap-4 border-b-1 pb-2">
                                <p className="font-medium font-helvetica uppercase">
                                UNUSED LEAVE DAYS
                              </p>    
                              <span className="text-gray-400 col-span-2">
                                {
                                    details?.data?.UNUSED_LEAVE_DAYS
                                }
                                </span> 
                        </li>

                    </ul>
              </div>
          )
        }





      </div>
      {   (!currentStatus ? true : currentStatus === "pending" ) &&   role !== "request" && details?.data && (
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


            {
              (details?.data || details?.data?.length > 0 ) && (
                <button
                disabled={Loading || isApprovePending}
                className="header_btnStyle bg-[#00bcc2] rounded text-white font-semibold  mx-2 my-1 md:my-0 px-[13px] py-[7px] uppercase flex items-center gap-2" onClick={openModal}>

              { isApprovePending &&
                  <Loader2Icon className="animate-spin"/>
                }
                  
                  Approve</button>
              )
            }
          </div>


        </div>
      )}




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
