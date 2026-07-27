/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import React from 'react'

import { Fragment, useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Divider, Progress } from "rsuite";
import { MdDelete, MdOutlineFileDownload } from "react-icons/md";
import { IoIosClose, IoMdCheckmarkCircle } from "react-icons/io";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  CircularProgress,
  Spinner,
  Tooltip,
} from "@nextui-org/react";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { uploadFileData } from "../../utils/uploadfile";
import { useGetRequest_Detail } from "../../API/api_urls/my_approvals";
import { Upload } from "antd";
import { GrDocumentPdf } from "react-icons/gr";
import { fileExtension } from "../../utils/fileExtension";
import { FaFileUpload, FaRegFileImage } from "react-icons/fa";
import { Trash2Icon } from "lucide-react";

const Attachments = ({
  setInformation,
  goToNextTab,
  token,
  setValue,
  trigger,
  handleSubmit,
  isSubmitting,
  isAnnouncement,
}) => {
  const fileInputRef = useRef(null);
  const [percent, setPercent] = useState(30);
  const [isUploading, setisUploading] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const [previewImage, setPreviewImage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const status = percent === 100 ? "success" : null;
  const color = percent === 100 ? "#52c41a" : "#3385ff";

  const uploadAttachment = async () => {
    // setisUploading(true)
    if (attachments[0]?.file) {
      const file = attachments[0]?.file;
      setIsLoading(true);
      const result = await uploadFileData(file, token);

      const attachment = isAnnouncement ? result.file_url : result.file_url_id;

      setIsLoading(false);
      if (setValue) {
        //because of the component that is using this component, that setValue is defined
        setValue("attachments", attachment);
      } else {
        setInformation((information) => {
          return {
            ...information,
            attachment: attachment,
            // attachment: information.isAnnouncement
            //   ? result.file_url
            //   : result.file_url_id,
          };
        });
      }
      return attachment;
    }
    goToNextTab && goToNextTab();
    return null;
  };
  const onFileSelect = (e) => {
    const files = e.target.files;
    if (files.length == 0) return;
    for (let i = 0; i < files.length; i++) {
      if (!attachments.some((e) => e.name == files[i].name)) {
        setAttachments((previousAttachments) => [
          // ...previousAttachments,
          {
            name: files[i].name,
            imageUrl: URL.createObjectURL(files[i]),
            file: files[i],
          },
        ]);
      }
    }

    // uploadAttachment(files)

    // const file = e.target.files[0]
    // setPreviewImage(URL.createObjectURL(file))

    // console.log(file
  };

  const onDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
    event.dataTransfer.dropEffect = "copy";
  };
  const onDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };
  const onDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    for (let i = 1; i < files.length; i++) {
      if (!attachments.some((e) => e.name == files[i].name)) {
        setAttachments((previousAttachments) => [
          // ...previousAttachments,
          { name: files[i].name, imageUrl: URL.createObjectURL(files[i]) },
        ]);
      }
    }

    // //  uploadAttachment(files)

    // const file = event.dataTransfer.files[0]
    // // console.log(file);
    //  uploadAttachment(file)
  };

  const handleDeleteAttachment = (i) => {
    setAttachments((previousAttachments) =>
      previousAttachments.filter((_, index) => index !== i)
    );
  };

  const handleFinalSubmit = async () => {
    const attachment = await uploadAttachment();
    handleSubmit && handleSubmit(attachment);
  };

  return (
    <Fragment>
      <div className="w-full shadow p-8 bg-white rounded">
        <div
          className={`${
            isUploading || (isDragging && "bg-slate-50 border-blue-400")
          } border-2 border-dashed rounded-xl p-4 min-h-[15rem]`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
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
                <div>
                  <div className="flex flex-col justify-center items-center">
                    <div className="inline-block p-4 my-5 rounded-full bg-slate-100">
                      <IoCloudUploadOutline color="gray" size={32} />
                    </div>
                    <p>
                      <label htmlFor="imageFile">
                        <span className="text-blue-400 font-medium cursor-pointer">
                          Click to upload
                        </span>{" "}
                        <input
                          type="file"
                          ref={fileInputRef}
                          hidden
                          name=""
                          id="imageFile"
                          onChange={onFileSelect}
                        />
                      </label>
                      or drag and drop
                    </p>
                    <p className="text-gray-300">
                      SVG, PNG, JPG or GIF (max. 800x400px)
                    </p>
                  </div>
                  {/* <Divider>OR</Divider> */}
                  <div className=" flex justify-center mb-4">
                    {/* <Button
                      onClick={() => fileInputRef.current.click()}
                      size="sm"
                      color="primary"
                      className="rounded-md text-white shadow font-medium"
                    >
                      Browse Files
                    </Button> */}
                    {/* <input
                      type="file"
                      multiple
                      ref={fileInputRef}
                      hidden
                      name=""
                      id=""
                      onChange={onFileSelect}
                    /> */}
                    {/* <input
                      type="file"
                      ref={fileInputRef}
                      hidden
                      name=""
                      id=""
                      onChange={onFileSelect}
                    /> */}
                  </div>
                </div>
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
                    <span className="font-semibold">
                      {" "}
                      {fileExtension(attachment?.name) === "pdf" ? (
                        <GrDocumentPdf
                          fontSize={"2rem"}
                          className="text-red-500"
                        />
                      ) : ["jpg", "jpeg", "png", "gif"].includes(
                          fileExtension(attachment?.name)
                        ) ? (
                        <FaRegFileImage
                          fontSize={"2rem"}
                          className="text-[#00BCD4]"
                        />
                      ) : (
                        <FaFileUpload
                          fontSize={"2rem"}
                          className="text-[#9E9E9E]"
                        />
                      )}
                    </span>{" "}
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

      {/* <div className=" flex justify-center">
          <Button
            color="primary"
            onClick={uploadAttachment}
            className="rounded-md text-white shadow font-medium"
            isLoading={isLoading}
          >
            Next
          </button>
        </div> */}
      <div className="flex justify-end py-3">
        {/* <button
              onClick={uploadAttachment}
              className="bg-btnColor px-6 py-2 header_h3 outline-none  text-white rounded hover:bg-btnColor/70 flex gap-2"

            >
              {
                isLoading? (
                  <Spinner color="default" size="sm"/>
                ): (
                  ""
                )
              }
              Save
            </button> */}
        <Button
          size="sm"
          className="rounded-md font-medium shadow font-helvetica uppercase"
          color="secondary"
          onClick={handleFinalSubmit}
        >
          {isLoading || isSubmitting ? (
            <Spinner color="default" size="sm" />
          ) : (
            ""
          )}
          Submit
        </Button>
      </div>
    </Fragment>
  );
};

export default Attachments;
