/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useGetProfile } from "../../API/profile";
import useCurrentUser from "../../hooks/useCurrentUser";
import { Skeleton, useDisclosure } from "@nextui-org/react";
import {
  useApprovedApprovalRequest,
  useCanAssign,
  useDeclineApprovalRequest,
} from "../../API/api_urls/my_approvals";
import toast from "react-hot-toast";
import ExpandedDrawerWithButton from "../../components/modals/ExpandedDrawerWithButton";
import AddNoteRejection from "../../components/core/approvals/AddNoteRejection";
import ConfirmApprovalModal from "../../components/core/approvals/ConfirmApprovalModal";

import AssignStaff from "../../components/core/approvals/AssignStaff";
import { useEffect, useState } from "react";
import { Loader2Icon } from "lucide-react";

export default function BioDataDetail({
  role,
  details,
  title,
  handleClose,
  currentStatus,
}) {
  const {
    isOpen: isRejectModalOpen,
    onOpen: onRejectModalOpen,
    onClose: onRejectModalClose,
  } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: onModalCancel,
  } = useDisclosure();

  const {
    isOpen: isAssignModalOpen,
    onOpen: onAssignModalOpen,
    onClose: onAssignModalClose,
  } = useDisclosure();

  const {
    isOpen: Loading,
    onOpen: startLoading,
    onClose: stopLoading,
  } = useDisclosure();

  const { mutateAsync: declineRequestAction, isPending:isDeclinePending } = useDeclineApprovalRequest();
  const { mutateAsync: approveRequestAction, isPending:isApprovePending } = useApprovedApprovalRequest();
  const { userData } = useCurrentUser();
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












  const rejectRequest = async (rejectnote) => {
    if(isDeclinePending) return
    startLoading();
    let notes = "";

    if (rejectnote && rejectnote !== "<p><br></p>") {
      notes = rejectnote;
    }
    const json = {
      company_id: userData?.data?.COMPANY_ID,
      staff_id: userData?.data?.STAFF_ID,
      request_id: details?.requestID,
      rejection_note: notes,
    };

    try {
      const res = await declineRequestAction(json);
      if (res) {
        toast.success("You successfully decline request", { duration: 5000 });
        stopLoading();
        onRejectModalClose();
        handleClose("refresh");
      }
    } catch (error) {
      toast.error(`${error?.response?.data?.message}.`, {duration: 10000})
      stopLoading();
    }
  };

  const approveRequest = async () => {
    if(isApprovePending) return
    onModalCancel();
    const json = {
      company_id: userData?.data?.COMPANY_ID,
      staff_id: userData?.data?.STAFF_ID,
      request_id: details?.requestID,
      leave_start_date: null,
      leave_end_date: null,
      leave_date_array: null,
      memo_content: null,
      memo_signature: null,
      duration: null,
    };

    try {
      startLoading()
      const res = await approveRequestAction(json)
      if(res){
        toast.success("You successfully approve request", {duration: 7000})
        stopLoading()
        onRejectModalClose()
        handleClose('refresh')
      }
    } catch (error) {
      toast.error(`${error?.response?.data?.message}.`, {duration: 10000})
      stopLoading();
    }
  };

  const { data: profile, isLoading } = useGetProfile({
    user: userData?.data,
    path: "/profile/get_profile",
  });


  // console.log(currentStatus, details, role)
  // console.log((!currentStatus ? true : currentStatus === "pending") &&
  // details?.data &&
  // role !== "request")

  return (
    <>
      <div className={`bg-white rounded-md p-4  h-full`}>
        <div className="flex justify-between items-center gap-4 mb-">
          <h2 className=" text-[1.5rem] my-auto font-[600] font-helvetica text-[#444e4e] capitalize">
            {title ? title : "Personal Informations"}
          </h2>
        </div>

        <div className="fle justify-betwee items-center gap-4 mb-3 grid grid-cols-3 border-b pb-1 my-3">
          <h2 className=" text-[1rem] my-auto font-[600] font-helvetica text-[#444e4e] capitalize"></h2>
          <h2 className=" text-[1rem] my-auto font-[600] font-helvetica text-[#444e4e] capitalize">
            Previous
          </h2>
          <h2 className=" text-[1rem] my-auto font-[600] font-helvetica text-[#444e4e] capitalize">
            New Detail
          </h2>
        </div>
        {isLoading ? (
          <div className="max-w-[300px] w-full flex items-center gap-3">
            <div className="w-full flex flex-col gap-2">
              <Skeleton className="h-3 w-3/5 rounded-lg" />
              <Skeleton className="h-3 w-4/5 rounded-lg" />
              <Skeleton className="h-3 w-4/5 rounded-lg" />
              <Skeleton className="h-3 w-4/5 rounded-lg" />
              <Skeleton className="h-3 w-4/5 rounded-lg" />
              <Skeleton className="h-3 w-4/5 rounded-lg" />
              <Skeleton className="h-3 w-4/5 rounded-lg" />
            </div>
          </div>
        ) : (
          <ul className=" mt-2 text-[15px] flex flex-col space-y-3">
            {details && details?.data?.map((dt) => (
              <li
                key={dt?.ATTRIBUTE_NAME}
                className=" grid grid-cols-3  my-3 border-b pb-1"
              >
                <span className="text-[#444e4e] font-helvetica font-[500] text-[0.9rem] capitalize ">
                  {" "}
                  {dt?.ATTRIBUTE_NAME?.replace(/_/g, " ")}:
                </span>
                <span className="text-[#888888]  text-en w-full  max-w-sm fontbold font-profileFontSize ">
                  {dt?.CURRENT_VALUE || "N/A"}
                </span>
                <span className="text-[#888888]  text-en w-full  max-w-sm fontbold font-profileFontSize ">
                  {dt?.NEW_NAME || dt?.NEW_VALUE}
                </span>
              </li>
            ))}
          </ul>
        )}
        {(!currentStatus ? true : currentStatus === "pending") &&
          (details?.data) &&
          role !== "request" && (
            <div className="flex justify-between mt-3">
              <button
                disabled={isDeclinePending}
                className="header_btnStyle bg-red-500 rounded text-white font-semibold  mx-2 my-1 md:my-0 px-[13px] py-[7px] uppercase flex items-center gap-2"
                onClick={onRejectModalOpen}
              >
                  { isDeclinePending &&
                    <Loader2Icon className="animate-spin"/>
                  }
                Reject
              </button>

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
                  className="header_btnStyle bg-[#00bcc2] rounded text-white font-semibold  mx-2 my-1 md:my-0 px-[13px] py-[7px] uppercase disabled:cursor-not-allowed disabled:bg-gray-300 flex items-center gap-2"
                  onClick={openModal}
                >
                  { isApprovePending &&
                    <Loader2Icon className="animate-spin"/>
                  }
                  Approve
                </button>

            </div>
            </div>
          )}
      </div>

      <ExpandedDrawerWithButton
        maxWidth={600}
        isOpen={isRejectModalOpen}
        onClose={onRejectModalClose}
      >
        <div className="mt-10 mx-5">
          <AddNoteRejection
            handleConfirm={rejectRequest}
            loading={Loading}
            handleCancel={onRejectModalClose}
          />
        </div>
      </ExpandedDrawerWithButton>

      <ExpandedDrawerWithButton isOpen={isAssignModalOpen} onClose={onAssignModalClose} maxWidth={450}>
          <AssignStaff closeDrawer={()=>handleClose('refresh')} package_id={canAssignPk} request_id={details?.requestID}/>
      </ExpandedDrawerWithButton>

      <ConfirmApprovalModal
        subject={"Are you sure you want to approve request?"}
        isOpen={isModalOpen}
        handleOk={approveRequest}
        handleCancel={onModalCancel}
        loading={isApprovePending}
      />
    </>
  );
}