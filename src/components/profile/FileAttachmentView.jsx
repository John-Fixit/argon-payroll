/* eslint-disable react/prop-types */
import { Avatar, Modal, Tooltip } from "antd";
import { fileExtension } from "../../utils/fileExtension";
import { GrDocumentCsv, GrDocumentPdf, GrDocumentZip } from "react-icons/gr";
import useFileModal from "../../hooks/useFileModal";
import { FaFileUpload } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { useCallback, useState } from "react";
import axios from "axios";
import useCurrentUser from "../../hooks/useCurrentUser";
import { errorToast, successToast } from "../../utils/toastMsgPop";
import { Spinner } from "@nextui-org/react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Trash2Icon } from "lucide-react";
import { useUpdateAttachment } from "../../API/profile";
import {
  BsFileEarmarkPdfFill,
  BsFiletypeDoc,
  BsFiletypeDocx,
} from "react-icons/bs";
import ExpandedDrawerWithButton from "../modals/ExpandedDrawerWithButton";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import { baseURL } from "../../utils/filePrefix";

const FileAttachmentView = ({
  attachments,
  package_id,
  position_id,
  key: queryKey,
  cannotUpload
}) => {
  const [attachmentList, setAttachmentList] = useState([]);
  const [uploadLoading, setUploadLoading] = useState(false);

  const { userData } = useCurrentUser();

  const mutation = useUpdateAttachment(queryKey);

  const staff_id = userData?.data.STAFF_ID;
  const company_id = userData?.data.COMPANY_ID;

  const { openModal } = useFileModal();

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // setSelectedFile(URL.createObjectURL(file)); // Create a URL for preview

      if (file?.name.trim() !== "" && file) {
        setAttachmentList([
          ...attachmentList,
          { name: file?.name, file: file, file_url: URL.createObjectURL(file) },
        ]);
      }
    }
  };

  const handleDeleteAttachment = (index) => {
    const updatedAttachments = attachmentList.filter((_, i) => i !== index);
    setAttachmentList(updatedAttachments);
  };

  const uploadFile = async (formData) => {
    setUploadLoading(true);
    try {
      const res = await axios({
        method: "post",
        url: baseURL +"attachment/addChatFile",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          token: userData?.token,
        },
      });
      setUploadLoading(false);

      if (res) {
        return res.data;
      }
    } catch (err) {
      setUploadLoading(false);
      if (
        err?.response?.data?.message !==
        "There was an error uploading your file"
      )
        errorToast(err?.response?.data?.message);
    }
  };

  const onSave = async () => {
    setUploadLoading(true);
    try {
      const uploadedAttachmentIDs = await Promise.all(
        attachmentList.map(async (attachment) => {
          const formData = new FormData();
          formData.append("file", attachment.file);

          const res = await uploadFile(formData);

          return res.file_url_id;
        })
      );
      setUploadLoading(false);

      // Update attachmentList state immediately
      setAttachmentList((prevAttachments) =>
        prevAttachments.map((attachment, index) => ({
          ...attachment,
          attachmentList: uploadedAttachmentIDs[index],
        }))
      );

      //step 1: split the IDs and join first
      const reversedArray = uploadedAttachmentIDs.map((item) =>
        item.split("").join("")
      );

      // Step 2: Join the reversed strings with a comma
      const resultIDs = reversedArray.join(",");

      //================I will send the code to server here=====================

      const json = {
        staff_id: staff_id,
        company_id: company_id,
        package_id: package_id,
        position_id: position_id,
        // request_id: attachments?.isPending ? attachments?.REQUEST_ID : null,
        attachment: uploadedAttachmentIDs,
      };

      mutation.mutate(json, {
        onSuccess: (data) => {
          setAttachmentList([]);
          successToast(data?.data?.message);
          setIsOpen(false);
          // Update the attachmentList state on the server here
        },
        onError: (err) => {
          errorToast(err?.response?.data?.message ?? err?.message);
        },
      });
    } catch (error) {
      setUploadLoading(false);
      errorToast(error?.response?.data?.message ?? error?.message);
    }
  };

  const checkFileType = (fileName, extensions) => {
    return extensions.some((ext) => fileName?.toLowerCase().includes(ext));
  };

  //===================== open drawer, download file, and preview functions=====================

  const [drawerOpen, setDrawerOpen] = useState({ state: false, data: null });

  const handleOpenDrawer = (data) => {
    setDrawerOpen({ state: true, data: data });
  };
  const handleCloseDrawer = () => {
    setDrawerOpen({ state: false });
  };

  const downloadFile = async (url, fileName, fileType) => {
    try {
      // Fetch the file
      const response = await fetch(url);

      if (!response.ok) {
        // throw new Error(`HTTP error! status: ${response.status}`);
        onDocClick(url, fileName);
      }

      // Get the blob from the response
      const blob = await response.blob();

      // Create a new blob with the correct MIME type if provided
      const file = fileType ? new Blob([blob], { type: fileType }) : blob;

      // Create a URL for the blob
      const blobUrl = window.URL.createObjectURL(file);

      // Create a temporary anchor element
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;

      // Append to the document, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the blob URL
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const onDocClick = (url, name) => {
    try {
      const pdfUrl = url;
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.setAttribute("target", "_blank");
      link.download = name; // specify the filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const getFileName = useCallback((url) => {
    return url.substring(url.lastIndexOf("/") + 1);
  }, []);

  //======================== ends here ==============================

  return (
    <>
      {attachments?.ATTACHMENTS?.length ? (
        <>
          <Avatar.Group
            size="large"
            max={{
              count: 3,
              style: { color: "#f56a00", backgroundColor: "#fde3cf" },
            }}
          >
            {attachments?.ATTACHMENTS?.map((item, index) => (
              <Tooltip
                title={item?.FILE_NAME}
                placement="top"
                key={index + "avatar"}
              >
                {item?.FILE_NAME ? (
                  fileExtension(item?.FILE_NAME) === "pdf" ? (
                    <Avatar
                      icon={<GrDocumentPdf />}
                      className="cursor-pointer text-red-500"
                      // onClick={() => openModal(item?.FILE_NAME)}
                      onClick={() => handleOpenDrawer(item)}
                    />
                  ) : ["jpg", "jpeg", "png", "gif"].includes(
                      fileExtension(item?.FILE_NAME)
                    ) ? (
                    <Avatar
                      src={item?.FILE_NAME}
                      className="cursor-pointer"
                      // onClick={() => openModal(item?.FILE_NAME)}
                      onClick={() => handleOpenDrawer(item)}
                    />
                  ) : (
                    <label htmlFor="imgFile">
                      <Avatar
                        icon={<FaFileUpload />}
                        className="cursor-pointer text-[#9E9E9E]"
                        // onClick={() => openModal(item?.FILE_NAME)}
                        onClick={() => handleOpenDrawer(item)}
                      />
                    </label>
                  )
                ) : null}
              </Tooltip>
            ))}

            {cannotUpload? null : (
               attachments?.isPending ? null : (
                <Avatar
                  icon={
                    <Tooltip title="Upload file">
                      <FiUpload
                        size={20}
                        strokeWidth={2.5}
                        className="text-gray-600 "
                      />
                    </Tooltip>
                  }
                  className="cursor-pointer text-[#9E9E9E]"
                  onClick={() => handleOpenModal()}
                />
              )
            )
           
          }
          </Avatar.Group>
        </>
      ) : (
        cannotUpload ? null : (
          attachments?.isPending ? null : (
           <Avatar
             icon={
               <Tooltip title="Upload file">
                 <FiUpload
                   size={20}
                   strokeWidth={2.5}
                   className="text-gray-600 "
                 />
               </Tooltip>
             }
             className="cursor-pointer text-[#9E9E9E]"
             onClick={() => handleOpenModal()}
           />
         )
       )
      )}

      {
        //========================= Modal that opens when they want to upload attachment
        <Modal
          open={isOpen}
          onCancel={handleCloseModal}
          footer={null}
          // width={"auto"}
          className="!top-[20px]"
        >
          <div className="w-full shadow p-8 bg-white rounded">
            <div
              className={`border-2 border-dashed rounded-xl p-4 min-h-[15rem]`}
            >
              <div>
                <div className="flex flex-col justify-center items-center">
                  <div className="inline-block p-4 my-5 rounded-full bg-slate-100">
                    <IoCloudUploadOutline color="gray" size={32} />
                  </div>
                  <p>
                    <label htmlFor="updateAttachment">
                      <span className="text-blue-400 font-medium cursor-pointer">
                        Click to upload
                      </span>{" "}
                      <input
                        type="file"
                        hidden
                        name=""
                        id="updateAttachment"
                        onChange={handleFileInputChange}
                      />
                    </label>
                  </p>
                  <p className="text-gray-300">SVG, PNG, JPG or GIF</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            {/* <ul className="">
            {attachmentList.map((attachment, index) => (
              <Card key={index} className=" my-2 shadow ">
                <CardBody className="flex flex-row justify-between items-center gap-3">
                  <div
                    className="flex items-center gap-x-2
                  "
                  >
                    {" "}
                    <span className="font-semibold">
                      {fileExtension(attachment?.file?.name) === "pdf" ? (
                        <GrDocumentPdf
                          fontSize={"2rem"}
                          className="text-red-500"
                        />
                      ) : ["jpg", "jpeg", "png", "gif"].includes(
                          fileExtension(attachment?.file?.name)
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
                    {attachment?.file?.name}
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
          </ul> */}

            {attachmentList?.map((data, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-white shadow p-2 my-2"
              >
                {data?.file_url ? (
                  <div className="group w-full">
                    {checkFileType(data?.name || data?.file_url, [
                      ".jpg",
                      ".jpeg",
                      ".png",
                    ]) ? (
                      <div className="relative">
                        <img
                          alt="Image"
                          height="80"
                          width="80"
                          // onClick={() =>
                          //   setImageModalOpen({
                          //     status: true,
                          //     file: data?.file_url,
                          //   })
                          // }
                          src={data.file_url}
                          className="
                                      object-cover 
                                      cursor-zoom-in 
                                      hover:scale-110 
                                      transition 
                                      translate
                                      flex items-center gap-2
                                    "
                        />
                        <div
                          onClick={() => handleDeleteAttachment(i)}
                          className="absolute bottom-1 right-1 group-hover:block   rounded-full bg-gray-100 p-1 cursor-pointer items-center gap-2"
                        >
                          <Trash2Icon className="text-red-500" />
                        </div>
                      </div>
                    ) : (
                      checkFileType(data?.name || data?.file_url, [
                        ".pdf",
                        ".doc",
                        ".csv",
                        ".docx",
                        ".zip",
                      ]) && (
                        <div className="flex gap-x-4 flex-wrap space-y-1 mt-5 items-center w-full">
                          <div className="relative w-full flex">
                            <div className=" flex gap-1 px-2 pr-4 cursor-pointer items-center flex-1 truncate ">
                              {checkFileType(data?.name || data?.file_url, [
                                ".pdf",
                              ]) ? (
                                <BsFileEarmarkPdfFill
                                  size={35}
                                  className="text-red-500"
                                />
                              ) : checkFileType(data?.name || data?.file_url, [
                                  ".doc",
                                ]) ? (
                                <BsFiletypeDoc
                                  size={35}
                                  className="text-blue-500"
                                />
                              ) : checkFileType(data?.name || data?.file_url, [
                                  ".docx",
                                ]) ? (
                                <BsFiletypeDocx
                                  size={35}
                                  className="text-blue-500"
                                />
                              ) : checkFileType(data?.name || data?.file_url, [
                                  ".csv",
                                ]) ? (
                                <GrDocumentCsv
                                  size={35}
                                  className="text-blue-500"
                                />
                              ) : (
                                checkFileType(data?.name || data?.file_url, [
                                  ".zip",
                                ]) && (
                                  <GrDocumentZip
                                    size={35}
                                    className="text-blue-500"
                                  />
                                )
                              )}

                              <span className=" line-clamp-1 truncate w-full">
                                {data?.name}
                              </span>
                            </div>
                            <div
                              onClick={() => handleDeleteAttachment(i)}
                              className=" ml-auto w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 p-1 cursor-pointer  gap-2"
                            >
                              <Trash2Icon className="text-red-500" />
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
          </div>

          <div className="flex justify-end py-3">
            <button
              onClick={onSave}
              className="bg-btnColor px-6 py-2 header_h3 outline-none  text-white rounded hover:bg-btnColor/70 flex gap-2"
            >
              {uploadLoading ? <Spinner color="default" size="sm" /> : ""}
              Save
            </button>
          </div>
        </Modal>

        //=====================ends here ======================
      }

      {
        //====================Drawer that opens when they click the avatar where they can download and preview================
        <ExpandedDrawerWithButton
          isOpen={drawerOpen?.state}
          onClose={handleCloseDrawer}
          maxWidth={400}
        >
          {
            <div className="flex justify-between items-center bg-white shadow p-2">
              {drawerOpen?.data?.FILE_NAME ? (
                <div className="group w-full">
                  {checkFileType(drawerOpen?.data?.FILE_NAME, [
                    ".jpg",
                    ".jpeg",
                    ".png",
                  ]) ? (
                    <div className="relative">
                      <img
                        alt="Image"
                        height="100"
                        width="100"
                        onClick={() => openModal(drawerOpen?.data?.FILE_NAME)}
                        src={drawerOpen?.data.FILE_NAME}
                        className="
                                        object-cover 
                                        cursor-zoom-in 
                                        hover:scale-110 
                                        transition 
                                        translate
                                        flex items-center gap-2
                                      "
                      />
                      <div
                        onClick={() =>
                          downloadFile(
                            drawerOpen?.data?.FILE_NAME.includes("http") &&
                              drawerOpen?.data?.FILE_NAME,
                            drawerOpen?.data?.FILE_NAME
                          )
                        }
                        className="absolute bottom-1 right-1 group-hover:block   rounded-full bg-gray-100 p-1 cursor-pointer items-center gap-2"
                      >
                        <MdOutlineFileDownload size={20} />
                      </div>
                    </div>
                  ) : checkFileType(drawerOpen?.data?.FILE_NAME, [
                      ".pdf",
                      ".doc",
                      ".csv",
                      ".docx",
                      ".zip",
                    ]) ? (
                    <div className="flex gap-x-4 flex-wrap space-y-1 mt-5 items-center w-full">
                      <div className="relative w-full flex">
                        <div className=" flex gap-1 px-2 pr-4 cursor-pointer items-center flex-1 truncate ">
                          {drawerOpen?.data?.FILE_NAME.includes("pdf") ? (
                            <BsFileEarmarkPdfFill
                              size={50}
                              onClick={() =>
                                openModal(drawerOpen?.data?.FILE_NAME)
                              }
                              className="
                            text-red-500
                            cursor-pointer 
                            hover:scale-110 
                            transition 
                            translate
                            flex items-center gap-2
                          "
                            />
                          ) : drawerOpen?.data?.FILE_NAME.includes("doc") ? (
                            <BsFiletypeDoc
                              size={50}
                              onClick={() =>
                                openModal(drawerOpen?.data?.FILE_NAME)
                              }
                              className="text-blue-500  cursor-pointer 
                            hover:scale-110 
                            transition 
                            translate
                            flex items-center gap-2"
                            />
                          ) : drawerOpen?.data?.FILE_NAME.includes("docx") ? (
                            <BsFiletypeDocx
                              size={50}
                              onClick={() =>
                                openModal(drawerOpen?.data?.FILE_NAME)
                              }
                              className="text-blue-500  cursor-pointer 
                            hover:scale-110 
                            transition 
                            translate
                            flex items-center gap-2"
                            />
                          ) : drawerOpen?.data?.FILE_NAME.includes("csv") ? (
                            <GrDocumentCsv
                              size={50}
                              onClick={() =>
                                openModal(drawerOpen?.data?.FILE_NAME)
                              }
                              className="text-blue-500  cursor-pointer 
                            hover:scale-110 
                            transition 
                            translate
                            flex items-center gap-2"
                            />
                          ) : (
                            drawerOpen?.data?.FILE_NAME.includes("zip") && (
                              <GrDocumentZip
                                size={50}
                                onClick={() =>
                                  openModal(drawerOpen?.data?.FILE_NAME)
                                }
                                className="text-blue-500  cursor-pointer 
                            hover:scale-110 
                            transition 
                            translate
                            flex items-center gap-2"
                              />
                            )
                          )}

                          <span className=" line-clamp-1 truncate w-full">
                            {getFileName(drawerOpen?.data?.FILE_NAME)}
                          </span>
                        </div>
                        <div
                          onClick={() =>
                            downloadFile(
                              drawerOpen?.data?.FILE_NAME.includes("http") &&
                                drawerOpen?.data?.FILE_NAME,
                              drawerOpen?.data?.FILE_NAME
                            )
                          }
                          className=" ml-auto w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 p-1 cursor-pointer  gap-2"
                        >
                          <MdOutlineFileDownload size={20} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full flex">
                      <div className=" flex gap-1 px-2 pr-4 cursor-pointer items-center flex-1 truncate ">
                        <FaFileAlt
                          size={50}
                          onClick={() => openModal(drawerOpen?.data?.FILE_NAME)}
                          className="text-default-500  cursor-pointer 
                            hover:scale-110 
                            transition 
                            translate
                            flex items-center gap-2"
                        />

                        <span className=" line-clamp-1 truncate w-full">
                          {getFileName(drawerOpen?.data?.FILE_NAME)}
                        </span>
                      </div>
                      <div
                        onClick={() =>
                          downloadFile(
                            drawerOpen?.data?.FILE_NAME.includes("http") &&
                              drawerOpen?.data?.FILE_NAME,
                            drawerOpen?.data?.FILE_NAME
                          )
                        }
                        className=" ml-auto w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 p-1 cursor-pointer  gap-2"
                      >
                        <MdOutlineFileDownload size={20} />
                      </div>
                    </div>
                  )}

                  <div></div>
                </div>
              ) : null}
            </div>
          }
        </ExpandedDrawerWithButton>

        //======================= Ends here =======================
      }
    </>
  );
};

export default FileAttachmentView;
