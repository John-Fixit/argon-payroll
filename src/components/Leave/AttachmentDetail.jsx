/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import React from 'react'

import { Avatar, CircularProgress } from "@nextui-org/react";
import {
  BsFileEarmarkPdfFill,
  BsFiletypeDoc,
  BsFiletypeDocx,
} from "react-icons/bs";
import { MdDelete, MdOutlineFileDownload } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import ImageModal from "../modals/ImageModal";
import { useState } from "react";
import { ImFilePdf } from "react-icons/im";
import { GrDocumentCsv, GrDocumentZip } from "react-icons/gr";
import { useGetRequest_Detail } from "../../API/api_urls/my_approvals";
import { FaFile } from "react-icons/fa6";

const AttachmentDetail = ({currentView}) => {

  const [imageModalOpen, setImageModalOpen] = useState({
    status: false,
    file: null,
  });


  const { data, isPending, isError } = useGetRequest_Detail(currentView?.REQUEST_ID);

  const request_detail = data?.data?.data

  // console.log(request_detail)

  const details = {
    data: request_detail?.data,
    approvers: request_detail?.approvers,
    notes: request_detail?.notes,
    attachments: request_detail?.attachments,
    isLoading: isPending,
    isError: isError
  }




  const percent = 30;
  const color = percent === 100 ? "#52c41a" : "#3385ff";

  const onDocClick = (url, name) => {
    const pdfUrl = url;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.setAttribute("target", "_blank");
    link.download = name; // specify the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full">
      <div className="mt-6">
      {details?.attachments?.length>0? <div className="flex flex-col gap-4">
          {details?.attachments?.map((data, i) => (
            <div
              key={i}
              className="flex justify-between items-center bg-white shadow p-2"
            >
              {data?.FILE_NAME ? (
                <div className="group w-full">
                  {data?.FILE_NAME?.toLowerCase().includes(".jpg") ||
                  data?.FILE_NAME?.toLowerCase().includes(".jpeg") ||
                  data?.FILE_NAME?.toLowerCase().includes(".png") ? (
                    <div className="relative">
                      <img
                        alt="Image"
                        height="200"
                        width="200"
                        onClick={() =>
                          setImageModalOpen({ status: true, file: data?.FILE_NAME })
                        }
                        src={data.FILE_NAME}
                        className="
                                  object-cover 
                                  cursor-pointer 
                                  hover:scale-110 
                                  transition 
                                  translate
                                  flex items-center gap-2
                                "
                      />
                      <div
                        onClick={() =>
                          onDocClick(
                            data?.FILE_NAME.includes("http") && data?.FILE_NAME,
                            data?.FILE_NAME
                          )
                        }
                        className="absolute bottom-1 right-1 group-hover:block   rounded-full bg-gray-100 p-1 cursor-pointer items-center gap-2"
                      >
                        <MdOutlineFileDownload size={20} />
                      </div>
                    </div>
                  ) : (
                    data.FILE_NAME.includes(
                      "pdf" || "doc" || "csv" || "docx" || "zip"
                    ) && (
                      <div className="flex gap-x-4 flex-wrap space-y-1 mt-5 items-center w-full">
                        <div className="relative w-full flex">
                          <div className=" flex gap-1 px-2 cursor-pointer">
                            {data?.FILE_NAME.includes("pdf") ? (
                              <BsFileEarmarkPdfFill
                                size={35}
                                className="text-red-500"
                              />
                            ) : data?.FILE_NAME.includes("doc") ? (
                              <BsFiletypeDoc
                                size={35}
                                className="text-blue-500"
                              />
                            ) : data?.FILE_NAME.includes("docx") ? (
                              <BsFiletypeDocx
                                size={35}
                                className="text-blue-500"
                              />
                            ) : data?.FILE_NAME.includes("csv") ? (
                              <GrDocumentCsv
                                size={35}
                                className="text-blue-500"
                              />
                            ) : (
                              data?.FILE_NAME.includes("zip") && (
                                <GrDocumentZip
                                  size={35}
                                  className="text-blue-500"
                                />
                              )
                            )}

                            <span>{data?.FILE_NAME?.slice(0, 30)}</span>
                          </div>
                          <div
                            onClick={() =>
                              onDocClick(
                                data?.FILE_NAME.includes("http") &&
                                  data?.FILE_NAME,
                                data?.FILE_NAME
                              )
                            }
                            className=" ml-auto w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 p-1 cursor-pointer  gap-2"
                          >
                            <MdOutlineFileDownload size={20} />
                          </div>
                        </div>
                      </div>
                    )
                  )}

                  <div></div>
                </div>
              ) : null}
            </div>
          ))}
        </div>:<div className="h-[15rem] flex flex-col gap-3 justify-center items-center bg-white shadow text-gray-300">
          <FaFile size={30} />
          <p className="font-helvetica tracking-wider">No Attachment</p>
          </div>}
       
      </div>

      <ImageModal
        src={imageModalOpen.file}
        isOpen={imageModalOpen.status}
        onClose={() => setImageModalOpen({ status: false, file: null })}
      />
    </div>
  );
};

export default AttachmentDetail;