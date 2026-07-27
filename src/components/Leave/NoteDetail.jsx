/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import React from 'react'

import { Avatar } from "@nextui-org/react";
import moment from "moment";
import { BiEnvelopeOpen } from "react-icons/bi";
import { useGetRequest_Detail } from "../../API/api_urls/my_approvals";
import { filePrefix } from "../../utils/filePrefix";
// const filePrefix = 'http://lamp3.ncaa.gov.ng/pub/'

const NoteDetail = ({currentView}) => {


    const { data, isPending, isError } = useGetRequest_Detail(currentView?.REQUEST_ID);

    const request_detail = data?.data?.data
  
    const details = {
      data: request_detail?.data,
      approvers: request_detail?.approvers,
      notes: request_detail?.notes,
      attachments: request_detail?.attachments,
      isLoading: isPending,
      isError: isError
    }




  return (
    <div className="">
      { details?.notes?.length > 0 ?
      details?.notes.map((note, i) => (
        <div 
          key={i}
          className="p-6 pb-0 rounded border bg-white shadow mt-4 min-h-[10rem]"
        >
          <div className="flex gap-3 mb-2">
            <Avatar isBordered src={note?.FILE_NAME ? (filePrefix + note?.FILE_NAME) : null } />
            <div className="">
              <p className="text-lg font-helvetica">{note?.LAST_NAME} {note?.FIRST_NAME}</p>
              
              <span className=" text-sm text-gray-400">{moment(
                                  note?.TIME_REQUESTED
                                ).format("MMMM Do YYYY, h:mm:ss a")}</span>
            </div>
          </div>
          <p>{note?.NOTE_CONTENT || '...'}</p>
          {/* <p className="my-2 text-end text-sm text-gray-400">{note.time}</p> */}
        </div>
      )
    ) :  <div className="flex flex-col gap-2  items-center justify-center h-full ">
      <BiEnvelopeOpen className="text-gray-300" size={32}/>  
      <span className=" text-default-500 font-bold textlg">Empty Note Records</span>
      
      </div>
  }
    </div>
  );
};

export default NoteDetail;