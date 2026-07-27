/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useDisclosure } from "@nextui-org/react";
import ExpandedDrawerWithButton from "../../components/modals/ExpandedDrawerWithButton";
import AddNoteRejection from "../../components/core/approvals/AddNoteRejection";
import ConfirmApprovalModal from "../../components/core/approvals/ConfirmApprovalModal";
import { useApprovedApprovalRequest, useCanAssign, useDeclineApprovalRequest } from "../../API/api_urls/my_approvals";
import useCurrentUser from "../../hooks/useCurrentUser";
import toast from "react-hot-toast";
import { toStringDate } from "../../utils/utitlities";
import { useEffect, useState } from "react";
import AssignStaff from "../../components/core/approvals/AssignStaff";


export default function AcademicDetail({role, title, details, handleClose, currentStatus}){
  const {isOpen:isRejectModalOpen, onOpen:onRejectModalOpen, onClose:onRejectModalClose} = useDisclosure()
  const {isOpen:isModalOpen, onOpen:openModal, onClose: onModalCancel} = useDisclosure()
  const {isOpen:Loading, onOpen:startLoading, onClose: stopLoading} = useDisclosure()
  const {
    isOpen: isAssignModalOpen,
    onOpen: onAssignModalOpen,
    onClose: onAssignModalClose,
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





    return(
        <>
            <div className="bg-white py-4 px-6 shadow rounded">
      <h2 className="mb-5 text-[1.5rem] my-auto font-[600] font-helvetica text-[#444e4e] capitalize">{title} Detail</h2>
        <ul className="flex flex-col gap-5 my-4">
            { details?.data && Object.entries(details?.data)?.filter(([key]) => key !== 'FILE_NAME' && key !== "REQUEST_ID")?.map(([key,value], i) => (
              <li className="grid grid-cols-3 gap-4 border-b-1 pb-2" key={i}>
                <p className="font-medium font-helvetica uppercase">{key.replace(/_/g, ' ')}</p>
                <span className="text-gray-400 col-span-2">{
                (key?.includes("IS") && value === 1  ) ? "YES" : (key?.includes("IS") && value === 0  ) ? "NO" :
                key.includes('DATE') ? toStringDate(value) || "N/A" : (value !== null ? value : 'N/A')}</span>
              </li>
            ))}
          </ul>

      </div>

      {
        (!currentStatus ? true : currentStatus === "pending" ) &&  details?.data && role !== 'request' &&
        <div className="flex justify-between mt-3">
            <button  disabled={Loading} className="header_btnStyle bg-red-500 rounded text-white font-semibold  mx-2 my-1 md:my-0 px-[13px] py-[7px] uppercase" onClick={onRejectModalOpen}>Reject</button>

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

              <button disabled={Loading} className="header_btnStyle bg-[#00bcc2] rounded text-white font-semibold  mx-2 my-1 md:my-0 px-[13px] py-[7px] uppercase" onClick={openModal}>Approve</button>
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
    )
}