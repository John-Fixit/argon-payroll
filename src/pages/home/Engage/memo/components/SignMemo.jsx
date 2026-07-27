/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, cn, Tooltip } from "@nextui-org/react";
import styles from "./body.module.css";
import React, { useState, useRef, useEffect } from "react";
import ExpandedDrawerWithButton from "../../../../../components/modals/ExpandedDrawerWithButton";
import SignatureView from "./SignatureView";
import ViewNotes from "./MemoNotes";
import AddNote from "./AddNote";
import generatePDF, { Margin } from "react-to-pdf";
import { MdSaveAlt } from "react-icons/md";
import { LuDelete } from "react-icons/lu";
import { Spinner } from "@nextui-org/react";
import {
  useDisclosure,
} from "@nextui-org/react";
import { Modal } from "antd";
import { formatError } from "../../../../../utils/messagePopup";
import { convertBase64ToFile, toStringDate } from "../../../../../utils/utitlities";
import useCurrentUser from "../../../../../hooks/useCurrentUser";
import { ImCancelCircle } from "react-icons/im";
import { Edit2Icon } from "lucide-react";
import QuilInput from "../../../../../components/core/approvals/QuilInput";
import AddNoteRejection from "../../../../../components/core/approvals/AddNoteRejection";
import { useApprovedApprovalRequest, useDeclineApprovalRequest } from "../../../../../API/api_urls/my_approvals";
import toast from "react-hot-toast";
import { uploadFileData } from "../../../../../utils/uploadfile";
import { baseURL } from "../../../../../utils/filePrefix";





const SignMemo = ({memo, role, handleClose, details, currentStatus }) => {
  const targetRef = useRef();
  const [open, setOpen] = useState({ status: false, type: "" });
  const {userData} = useCurrentUser()
  const [isEditingMemo, setisEditingMemo] = useState(false)
  const [editedMemo, setEditedMemo] = useState(null)
  const sigCanvas = useRef({});
  const {isOpen:Loading, onOpen:startLoading, onClose: stopLoading} = useDisclosure()
  const {mutateAsync:declineRequestAction} = useDeclineApprovalRequest()
  const {mutateAsync:approveRequestAction} = useApprovedApprovalRequest()
  const [imageUrl, setImageUrl] = useState('');


  /* a function that uses the canvas ref to clear the canvas 
  via a method given by react-signature-canvas */
  const clear = () => sigCanvas.current.clear();

  
  const openDrawer = (type) => {
    setOpen({ ...open, status: true, type });
  };
  
  const closeDrawer = () => {
    setOpen({ ...open, status: false });
  };
  
  const options = {
    filename: `${memo?.DESIGNATION_NAME || 'user'}.pdf`,
    method: "save",
    page: {
      margin: Margin.MEDIUM,
    },
  };

  // edit memo 
  const handleEditMemoContent = ()=>{
    if(isEditingMemo){
      setEditedMemo(null)
      setisEditingMemo(!isEditingMemo)
    }else{
      setisEditingMemo(!isEditingMemo)
    }
  }
  
  const handleEditMemo = (value)=>{
    setEditedMemo(value)
    setisEditingMemo(!isEditingMemo)
  }

  const handleCancelEditMemo = ()=>{
      closeDrawer()
      setEditedMemo(null)
  }




  // download PDF
  const downloadPDF = () => generatePDF(targetRef, options);
  



  /* a function that uses the canvas ref to trim the canvas 
  from white spaces via a method given by react-signature-canvas
  then saves it in our state */
  const save = () => {
    if(sigCanvas?.current?._sigPad?._isEmpty) return

    const base64String = sigCanvas.current
      .getTrimmedCanvas()
      .toDataURL("image/png");

        const file = convertBase64ToFile(base64String, 'example.png');
        const url = URL.createObjectURL(file);
        setImageUrl(url);

        prepareFile(file)
    closeDrawer();
    clear()
  };
  
    const prepareFile = async (file)=>{
    const image = await uploadFileData(file, userData?.token)
  
      if(image){
        // console.log(image)
        approveRequest(image?.file_url_id)
      }
    }



  const setUploadData = (value)=>{
    if(!value) return
     const {attachment, file} = value

    //  console.log(attachment, file) // 84510

     const url = URL.createObjectURL(file);
     setImageUrl(url);
     closeDrawer();

     approveRequest(attachment)

  }

  


const approveRequest = async (file)=>{

  if(!file){
    toast.error("Error loading your file. Please pick or re-write your signature", {duration: 2000})
    return
  }
  const json =    {
    "company_id": userData?.data?.COMPANY_ID,
    "staff_id": userData?.data?.STAFF_ID,
    "request_id":details?.requestID,
    "memo_content": editedMemo ? editedMemo : memo?.MEMO_CONTENT,
    "memo_signature":file,
    "leave_start_date":null,
    "leave_end_date":null,
    "leave_date_array": null,
    "duration":null
  }
  // console.log(json)

  try {
    startLoading()
    const res = await approveRequestAction(json)
    if(res){
      toast.success("You successfully approve request", {duration: 7000})
      stopLoading()
      handleClose('refresh')
    }
  } catch (error) {
    toast.error("Error approving request. Please retry.", {duration: 7000})
    stopLoading()
  }
}



const rejectMemoRequest = async (rejectnote)=>{
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
        closeDrawer()
        handleClose('refresh')
      }
    } catch (error) {
      toast.error("Error declining request. Please retry.", {duration: 5000})
      stopLoading()
    }
}







  return (
    <>
      <div className="bg-white p-3 w-full d-flex gap-3 flex-wrap rounded-md font-Helvetica">
          {
            (!currentStatus ? true : currentStatus === "pending" ) &&  role !== "request" &&  (
              <button
              className={`header_btnStyle bg-red-500 rounded text-white font-semibold py-[8px] leading-[19.5px mx-2 my-1 text-[0.7125rem] md:my-0 px-[16px] uppercase `}
              onClick={() => openDrawer("addNote")}
            >
              Decline Memo
            </button>
            )
          }
          {
              (!currentStatus ? true : currentStatus === "pending" ) && 
            role !== "request" &&  (
              <button
              className={`header_btnStyle bg-[#00bcc2] rounded text-white font-semibold py-[8px] leading-[19.5px mx-2 my-1 text-[0.7125rem] md:my-0 px-[16px] uppercase `}
              onClick={() => openDrawer("signature")}
            >
              Apply Signature
            </button>
            )
          }
      </div>
      <div
        className={`flex-1 shadow-md p-3 mb-10 overflow-y-scroll ${styles.custom_scrollbar}`}
      >
        <div className="bg-white p-8 relative">
          <div className="absolute top-0 right-12 mb-3 flex gap-3">
              <>
                <Tooltip
                  showArror={true}
                  content="Download as PDF"
                  placement="bottom"
                >
                  <Button
                    isIconOnly
                    size="sm"
                    onClick={downloadPDF}
                    className="bg-blue-100 text-cyan-600"
                  >
                    <MdSaveAlt size={"1.5rem"} />
                  </Button>
                </Tooltip>
              </>
          </div>
          <div className="absolute top-0 right-2 mb-3 flex gap-3">
            {   (!currentStatus ? true : currentStatus === "pending" ) &&  role !== "request" && (
         
                       <Tooltip showArrow color='default' content={isEditingMemo ? "Cancel" :'Edit'} delay={300}>
                         <button
                           className={cn('p-2 rounded-lg', isEditingMemo ? "bg-red-50 " : "bg-blue-100 ")}
                           onClick={handleEditMemoContent}
                         >
                             {
                               isEditingMemo ?    <ImCancelCircle className='w-4 h-4 text-red-300' /> :
                               <Edit2Icon className='w-4 h-4 text-blue-400' />
                             }
                         </button>
                       </Tooltip>
            )}
          </div>
          <div ref={targetRef}>
            <div className="header_address">
              <table border={0} className=" leading-7 md:leading-8 w-full  relative">
                <tbody>
                  <tr>
                    <td className="font-semibold font-Exotic">To: </td>
                    <td className="pl-2 md:pl-2">{memo?.TO}   {memo?.RECIPIENT_TYPE  && memo?.RECIPIENT_TYPE  !== "STAFF" && `(${memo?.RECIPIENT_TYPE})`}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold font-Exotic ">From: </td>
                    <td className="pl-2 md:pl-2">
                      {memo?.LAST_NAME} {memo?.FIRST_NAME} {memo?.DESIGNATION_NAME &&  `(${memo?.DESIGNATION_NAME})`}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold font-Exotic ">Date: </td>
                    <td className="pl-2 md:pl-2">{toStringDate(memo?.REQUEST_DATE || memo?.DATE_CREATED)}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold font-Exotic ">Subject: </td>
                    <td className="font-bold text-base font-Exotic pl-2 md:pl-2">
                      {memo?.SUBJECT}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <hr className="my-3 border-t-2 border-gray-500" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {
              isEditingMemo ? (
                <QuilInput initialValue={memo?.MEMO_CONTENT} handleConfirm={handleEditMemo} handleCancel={handleEditMemoContent} />
              ) : (
                <div className="body_of_memo !text-black font-Exotic text-base mt-2">
                  <p
                        dangerouslySetInnerHTML={{
                          __html:
                            ( editedMemo ? editedMemo :  memo?.MEMO_CONTENT),
                        }}
                      />
                  <br />
                  <span className="text-gray-500">
                  {memo?.LAST_NAME} {memo?.FIRST_NAME}
                  </span>
                </div>
              )
            }

            {
              !isEditingMemo && 
                <div className="my-5">
                  <div className="flex gap-9 flex-wrap items-start">
                    {memo?.APPROVALS_DETAILS?.map((item, index) => (
                      <div
                        className="flex flex-col items-center w-[9rem] "
                        key={index + "_"}
                      >
                        <div className="border-b-2 flex justify-center border-b-black w-full">
                          <img
                            src={ baseURL+"attachments/1723484630.png" ||imageUrl}
                            alt=""
                            className="max-h-[100%] max-w-[100%]"
                          />
                        </div>
                        <span className="font-Exotic text-black pb-2 font-semibold text-xs">
                          {item?.LAST_NAME || item?.APPROVERS?.LAST_NAME} {item?.FIRST_NAME || item?.APPROVERS?.FIRST_NAME}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
            }
          </div>
        </div>
      </div>

      <ExpandedDrawerWithButton maxWidth={700} isOpen={open.status} onClose={closeDrawer}>
        <div className="mt-10 mx-5">
          {open.type === "signature" ? (
            <SignatureView
              save={save}
              clear={clear}
              sigCanvas={sigCanvas}
              setUploadData={setUploadData}
            />
          ) : open.type === "viewNote" ? (
            <ViewNotes />
          ) : open.type === "addNote" ? (
            <AddNoteRejection handleCancel={handleCancelEditMemo} handleConfirm={rejectMemoRequest} />
          ) : null}
        </div>
      </ExpandedDrawerWithButton>     
    </>
  );
};

export default SignMemo;
