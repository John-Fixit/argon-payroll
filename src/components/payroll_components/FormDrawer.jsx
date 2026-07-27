/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Fragment, useMemo, useState } from "react";
import PropType from "prop-types";
import "./formDrawer.css";
import useMemoData from "../../hooks/useMemoData";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useCreateMemo, useUpdateMemo } from "../../API/memo";
import toast from "react-hot-toast";
import { useDisclosure } from "@nextui-org/react";
import ExpandedDrawerWithButton from "../modals/ExpandedDrawerWithButton";
import RenderMemo from "../../pages/home/Engage/memo/components/RenderMemo";

export default function FormDrawer({
  tabs,
  onClose,
  children,
  type,
  showButton,
  title,
  subtitle,
}) {
  const [selectedTab, setSelectedTab] = useState(0);
  const { updateData, updateDefault, data } = useMemoData();
  const { userData, } = useCurrentUser()
  const {mutateAsync:create} = useCreateMemo()
  const {mutateAsync:update} = useUpdateMemo()

  const {isOpen:isRenderOpen, onOpen:onRenderOpen, onClose: onRenderClose} = useDisclosure()


  const handleSave = async ()=>{
    const date =  Date.now()
    const user =  (data?.from === "Me" || !data?.from ) ? userData?.data?.STAFF_ID : data?.from
    const recp =  data?.recipient_type === "STAFF" ?  data?.recipients : null; 
  
    // const value = {...data, }

    // memo_subject: draft?.SUBJECT,
    // content: draft?.MEMO_CONTENT,
    // from: null,
    // recipient_type: draft?.RECIPIENT_TYPE,
    // recipient_value: null,
    // recipients: [],
    // approvals: draft?.APPROVALS?.length ?  draft?.APPROVALS?.split(',') : [],
    // is_draft: 0,
    // package_id: 19,
    // staff_id: null,
    // company_id: null,
    // memo_number: null,
    // memo_id: draft?.MEMO_ID

    const val = {...data, company_id: userData?.data?.COMPANY_ID, staff_id: userData?.data?.STAFF_ID,  memo_number: date, for: user,   }
    try {
       const res =    val?.memo_id ? await update(val) : await create(val)
       if(res){
        updateDefault()
        toast.success('memo created successfully', {duration: 2000})
        onClose(true)
       }else{
        toast.error('error creating memo', {duration: 2000})
       }
    } catch (error) {
      console.log(error)
      toast.error('error creating memo', {duration: 2000})
    }

  }




  const handleSaveasDraft = async ()=>{
    const date =  Date.now()
    const user =  (data?.from === "Me" || !data?.from ) ? userData?.data?.STAFF_ID : data?.from
    const recp =  data?.recipient_type === "STAFF" ?  data?.recipients : null; 

    const val = {...data, company_id: userData?.data?.COMPANY_ID, staff_id: userData?.data?.STAFF_ID,  memo_number: date, for: user,  is_draft: 1   }
    try {
       const res = await   create(val)
       if(res){
        updateDefault()
        toast.success(' draft memo created successfully', {duration: 2000})
        onClose(true)
       }else{
        toast.error('error creating draft memo', {duration: 2000})
       }
    } catch (error) {
      console.log(error)
      toast.error('error creating draft memo', {duration: 2000})
    }

  }






  const isFormReady = useMemo(() => {
    const { content, memo_subject, recipient_type,  recipient_value, recipients, approvals } = data      

    if(content && memo_subject && recipient_type && (recipients?.length || recipient_value) && approvals?.length){
        return true
    }else{
      return false
    }
  }, [data])

  const isDraftFormReady = useMemo(() => {
    const {content, memo_subject, recipient_type,  recipient_value, recipients } = data      

    if(content  && memo_subject && recipient_type && (recipients?.length || recipient_value)){
        return true
    }else{
      return false
    }
  }, [data])



  const handleExit = ()=>{
    onRenderClose()
    onClose(true)
  }


  const handleGenerateMemo = ()=>{
    onRenderOpen()
  }



  return (
    <Fragment>
      <div className="flex flex-col font-Roboto mb-3">
        <div className="text-2xl font-bold">
          {tabs[selectedTab]?.header_text}
        </div>
        <div className="text-gray-400 font-medium">
          {tabs[selectedTab]?.sub_text}
        </div>
      </div>
      <div className="grid grid-cols-1 h-ful md:grid-cols-4 gap-4">
        <div className="my- w-full p-5 overflow-y-auto col-span-3 shadow-xl bg-white rounded-[0.25rem] mb-[1rem] form_drawer_body_container order-2 md:order-1 ">
          {tabs[selectedTab]?.component ?? children}



          {
            type === "create_memo" || type === "edit_memo" ? (
              <div className="_compose_submit flex justify-between mt-3">
                <div className="attach my-auto">

                  {
                    !data?.memo_id && (
                        <button
                        disabled={!isDraftFormReady}
                          className={`header_btnStyle bg-[#fff] rounded text-[#00bcc2] border border-[#00bcc2] font-semibold py-[8px] leading-[19.5px mx-2 my-1 text-[0.7125rem] md:my-0 px-[16px] uppercase isabled:cursor-not-allowed `}
                          onClick={handleSaveasDraft}
                          type="submit"
                        >
                          Save as draft
                        </button>
                    )
                  }
                </div>
                {/* <button
                  disabled={!isFormReady}
                  className={`header_btnStyle bg-[#00bcc2] rounded text-white font-semibold py-[8px] leading-[19.5px mx-2 my-1 text-[0.7125rem] md:my-0 px-[20px] uppercase disabled:cursor-not-allowed `}
                  onClick={handleSave}
                >
                  Save
                </button> */}
                <button
                  disabled={!isFormReady}
                  className={`header_btnStyle bg-[#00bcc2] rounded text-white font-semibold py-[8px] leading-[19.5px mx-2 my-1 text-[0.7125rem] md:my-0 px-[20px] uppercase disabled:cursor-not-allowed `}
                  onClick={handleGenerateMemo}
                >
                  Generate
                </button>
              </div> 

            ) : null
          }
        </div>

        <div className="flex flex-col border-l-1 border-gray-400 py-10 text-sm gap-3 px-4 ms-8 md:ms-2 my-5 md:my-0 md:h-full order-1 md:order-2">
          {tabs?.map((tab, index) => (
            <div
              key={index}
              onClick={() => setSelectedTab(index)}
              className={`${
                selectedTab === index ? "font-[500]" : "font-[400]"
              } relative cursor-pointer font-[13px] leading-[19.5px] text-[rgba(39, 44, 51, 0.7)]`}
            >
              {tab?.title}
              <span
                className={`w-[0.7rem] h-[0.7rem] rounded-full  ${
                  selectedTab === index ? "bg-[#00bcc2]" : "bg-gray-300"
                }  border-1 border-white absolute -left-[22px] top-1 duration-200 transition-all`}
              ></span>
            </div>
          ))}
          {/* {
            showButton && (
            <button className="header_btnStyle bg-[#00bcc2] rounded text-white font-semibold py-[8px] leading-[19.5px] mx-2 my-1 md:my-0 px-[16px] uppercase" onClick={handleSubmit}>
              Submit
            </button>
            )
          } */}
        </div>
      </div>
          

      {/* maxWidth={"47rem"} */}
      <ExpandedDrawerWithButton isOpen={isRenderOpen}  maxWidth={700}         maskClosable={false} onClose={onRenderClose} >
        <RenderMemo  handleClose={handleExit}/>
      </ExpandedDrawerWithButton>




















      {/* <div className="flex flex-col gap-5  px-4 ">
          <div className="flex flex-col font-Roboto">
            <div className="text-2xl font-bold">{tabs[selectedTab]?.header_text}</div>
            <div className="text-gray-400 font-medium">
              {tabs[selectedTab]?.sub_text}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[1fr_140px]  gap-7 h-full">

            <div className="flex flex-col border shadow-xl bg-white rounded-md  py-5">
                
            {tabs[selectedTab]?.component ?? children}
            </div>

            <div className="h-[100px] sm:h-[300px]">
              <div className=" h-full border-l-1 border-gray-400  ">


                <div className="flex flex-col py-5 md:py-10 text-sm gap-3 ml-2 ">
                  {tabs?.map((pk, index) => (
                    <div
                      key={pk}
                      className={`${
                        selectedTab === index && "font-bold"
                      } relative cursor-pointer`}
                      onClick={() => setSelectedTab(index)}
                    >
                        <span className=" ml-3">
                                {pk?.title}
                        </span>
                     
                      <span
                        className={`w-[0.7rem] h-[0.7rem] rounded-full  ${
                            selectedTab === index
                            ? "bg-green-700/80"
                            : "bg-gray-300"
                        }  border-1 border-gray-400 absolute -left-[0.9rem] top-1 duration-200 transition-all`}
                      ></span>
                    </div>
                    ))}       
                </div>
              </div>
            </div>

          </div>
        </div> */}
    </Fragment>
  );
}

FormDrawer.propTypes = {
  tabs: PropType.any,
  children: PropType.element,
  page: PropType.string,
};
