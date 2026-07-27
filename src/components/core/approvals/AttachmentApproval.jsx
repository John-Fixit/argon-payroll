/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import React from 'react'

import { Fragment, useEffect, useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Progress } from "rsuite";
import {
  Button,
  Card,
  CardBody,
  Spinner,
} from "@nextui-org/react";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { uploadFileData } from "../../../utils/uploadfile";
import { GrDocumentPdf } from "react-icons/gr";
import { fileExtension } from "../../../utils/fileExtension";
import { FaFileUpload, FaRegFileImage } from "react-icons/fa";
import { Trash2Icon } from "lucide-react";
import useCurrentUser from "../../../hooks/useCurrentUser";


const AttachmentApproval = ({setInformation}) => {
  const fileInputRef = useRef(null);
  const [percent, setPercent] = useState(30);
  const [isUploading, setisUploading] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const {userData} = useCurrentUser()
  const [isLoading, setIsLoading] = useState(false)
  const status = percent === 100 ? "success" : null;
  const color = percent === 100 ? "#52c41a" : "#3385ff";



  const uploadAttachment=async()=>{
  // setisUploading(true)
  const file = attachments[0]?.file
  setIsLoading(true)
  const result = await uploadFileData(file,userData?.token)

  setIsLoading(false)

    if(result){
      setInformation( {attachment:result?.file_url_id, file:file, url:result?.file_url})
      setAttachments([])
    }
  }


  const onFileSelect = (e) => {
    const files = e.target.files[0];
    if (!files) return;

      if (!attachments.some((e) => e.name == files.name)) {
        setAttachments((previousAttachments) => [
          // ...previousAttachments,
          { name: files.name, imageUrl: URL.createObjectURL(files), file: files },
        ]);
      }
  };


  useEffect(() => {
    return () => {
        setAttachments([])
    }
  }, [])
  

  const onDragOver=(event)=>{
  event.preventDefault()
  setIsDragging(true)
  event.dataTransfer.dropEffect='copy'
  }

  const onDragLeave=(event)=>{
  event.preventDefault()
  setIsDragging(false)
  }

  const onDrop=(event)=>{
  event.preventDefault()
  setIsDragging(false)
  const files=event.dataTransfer.files[0]

      if (!attachments.some((e) => e.name == files.name)) {
        setAttachments((previousAttachments) => [
          // ...previousAttachments,
          { name: files.name, imageUrl: URL.createObjectURL(files) },
        ]);
      }
  }

  const handleDeleteAttachment=(i)=>{
   setAttachments((previousAttachments) => previousAttachments.filter((_, index)=>index!==i));
  }

  return (
    <Fragment>
      <div className="w-full shadow p-8 bg-white rounded">
      
        <div
          className={`${
            isUploading || (isDragging && "bg-slate-50 border-blue-400")
          } border-2 border-dashed rounded-xl p-4 min-h-[15rem]`}
          onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}
        >
          {/* Before upload */}
          {!isUploading ? (
            <div>
              {isDragging ? (
                <div className="flex flex-col justify-center items-center h-[12rem]">
                  <div className="inline-block p-4 my-5 rounded-full bg-slate-100 animate-bounce">
                    <IoCloudUploadOutline color="blue" size={32} />
                  </div>
                  <p className="text-blue-400 font-medium cursor-pointer">
                    {" "}
                    Drop file(s) here{" "}
                  </p>
                </div>
              ) : (
              <label htmlFor="imageFile">
                <div  className=" cursor-pointer">
                  <div className="flex flex-col justify-center items-center" >
                    <div className="inline-block p-4 my-5 rounded-full bg-slate-100">
                      <IoCloudUploadOutline color="gray" size={32} />
                    </div>
                    <p>
                      <span className="text-blue-400 font-medium cursor-pointer">
                        Click to upload
                      </span>{" "}
                      <input
                      type="file"
                      ref={fileInputRef}
                      hidden
                      name=""
                      id="imageFile"
                      accept="image/*"
                      onChange={onFileSelect}
                      
                    />
                      or drag and drop
                    </p>
                    <p className="text-gray-300">
                      SVG, PNG, JPG or GIF (max. 800x400px)
                    </p>
                  </div>
                  {/* <Divider>OR</Divider> */}
                  <div className=" flex justify-center mb-4">
                   
                  </div>
                </div>
                      </label>
              )}
            </div>
          ) : (
            <div>
              {/* When uploading */}
              <BsFileEarmarkPdfFill
                size={35}
                className="text-red-500 mx-auto my-4"
              />
              <p
                className={`w-[${percent}%] text-end text-gray-400 text-xs m-0`}
              >
                {percent}%
              </p>
              <Progress.Line
                percent={percent}
                strokeColor={color}
                status={status}
                strokeWidth={6}
                showInfo={false}
              />
              <div className="flex flex-col justify-center items-center my-4">
                <span className="font-semibold text-md tracking-[2px]">
                  Uploading Document...
                </span>
                <span className="text-xs text-gray-400">
                  [Name of the document]
                </span>
              </div>
            </div>
          )}
        </div>
     


        <div>
          <ul className="">
            {attachments.map((attachment, index) => (
              <Card key={index} className=" my-2 shadow ">
                <CardBody className="flex flex-row justify-between items-center gap-3">
                  <div className="flex items-center gap-x-2">
                    {" "}
                    <span className="font-semibold">  {
                        fileExtension(attachment?.name)==="pdf"?
                        <GrDocumentPdf fontSize={'2rem'} className="text-red-500"/>:

                        ['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension(attachment?.name))?
                        <FaRegFileImage fontSize={'2rem'} className="text-[#00BCD4]"/>:
                        <FaFileUpload fontSize={'2rem'} className="text-[#9E9E9E]"/>

                      }</span>{" "}
                    {attachment.name}
                  </div>
                  <Button
                    type="button"
                    className="bg-white text-md font-semibold rounded-md"
                    onClick={() => handleDeleteAttachment(index)}
                    isIconOnly
                  >
                    <Trash2Icon className="text-red-500" />
                  </Button>
                </CardBody>
              </Card>
            ))}
          </ul>
        </div>







    
      </div>
        <div className="flex justify-end py-3">
            <button
              onClick={uploadAttachment}
              disabled={attachments?.length === 0}
              className="bg-btnColor px-6 py-2 header_h3 outline-none  text-white rounded flex gap-2 disabled:hover:bg-btnColor/20"

            >
              {
                isLoading? (
                  <Spinner color="default" size="sm"/>
                ): (
                  ""
                )
              }
              Save
            </button>
          </div>
      
    </Fragment>
  );
};

export default AttachmentApproval;
