/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, Card, CardBody, Spinner } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";

import { Input } from "@nextui-org/react";
import axios from "axios";
import toast from "react-hot-toast";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useForm } from "react-hook-form";
import { MdBrowseGallery } from "react-icons/md";
import { Trash2Icon } from "lucide-react";
import useFormStore from "../formRequest/store";
import { GrDocumentCsv, GrDocumentPdf, GrDocumentZip } from "react-icons/gr";
import { FaFileUpload, FaRegFileImage } from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5";
import { debounce } from "lodash";
import {
  BsFileEarmarkPdfFill,
  BsFiletypeDoc,
  BsFiletypeDocx,
} from "react-icons/bs";
import { baseURL } from "../../utils/filePrefix";

const AttarchmentForm = ({ onNext, onPrev }) => {
  const [uploadLoading, setUploadLoading] = useState(false);

  const { updateData, data } = useFormStore();

  const {
    handleSubmit,
    //  formState: { errors },
    setValue,
    register,
    getValues,
    watch,
  } = useForm({
    defaultValues: {
      attachmentss: data?.familyAttachment?.attachmentss ?? [],
    },
  });


  const { userData } = useCurrentUser();


  const formValues = watch();

  // Debounced function to update data
  const debouncedUpdateData = debounce((values) => {
    updateData({ familyAttachment: { ...values } });
  }, 500); // Adjust the delay as needed

  useEffect(() => {
    // Only update when form values change
    debouncedUpdateData(formValues);

    // Cleanup debounce on component unmount
    return () => {
      debouncedUpdateData.cancel();
    };
  }, [formValues]);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      if (file?.name.trim() !== "" && file) {

        setValue("attachmentss", [
          ...getValues().attachmentss,
          { name: file?.name, file: file, file_url: URL.createObjectURL(file) },
        ]);
      }
    }
  };

  const handleDeleteAttachment = (index) => {
    const updatedAttachments = getValues().attachmentss?.filter(
      (_, i) => i !== index
    );
    setValue("attachmentss", updatedAttachments);
  };

  const uploadFile = async (formData) => {
    setUploadLoading(true);
    try {
      const res = await axios({
        method: "post",
        url:baseURL +"attachment/addChatFile",
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
        toast.error(err?.response?.data?.message);
    }
  };

  const onSubmit = async (data) => {
    const { attachmentss } = data;
    setUploadLoading(true);
    try {
      const uploadedAttachmentIDs = await Promise.all(
        attachmentss.map(async (attachment, index) => {
          const formData = new FormData();
          formData.append("file", attachment.file);

          const res = await uploadFile(formData);

          // setValue("attachmentss", [...getValues().attachmentss, { name: res?.name, file: res?.file_url }])

          return res.file_url_id;

          // //======in case we want to be saving the uploaded one after saving====================
          // return {
          //   file_url: res?.file_url,
          //   file_url_id: res?.file_url_id,
          // };
        })
      );
      setUploadLoading(false);

      //     const fileUrlIds = uploadedAttachments.map((item) => item.file_url_id);

      // // Step 3: Update react-hook-form with the full file_url for each attachment
      // setValue(
      //   "attachmentss",
      //   uploadedAttachments.map((item, index) => ({
      //     ...attachmentss[index], // Preserve other existing properties
      //     file_url: item.file_url, // Update the file_url
      //   }))
      // );

      //step 1: split the IDs and join first
      const reversedArray = uploadedAttachmentIDs.map((item) =>
        item.split("").join("")
      );

      // Step 2: Join the reversed strings with a comma
      const resultIDs = reversedArray.join(",");

      // console.log(uploadedAttachmentIDs);

      updateData({
        attachments: uploadedAttachmentIDs,
        familyAttachment: {},
      });

      onNext();
    } catch (error) {
      console.log("Error:", error);
      setUploadLoading(false);
    }
  };

  const fileExtension = useCallback((filePath) => {
    return filePath?.split(".")?.pop()?.toLowerCase();
  }, []);

  const checkFileType = (fileName, extensions) => {
    return extensions.some((ext) => fileName?.toLowerCase().includes(ext));
  };

  return (
    <>
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white rounded">
            <div className=" grid gap-3">
              <div className="grid md:grid-cols-[1] gap-1 gap-y-5 items-center py-3 px-5">
                <label className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
                  Add attachment
                </label>
              </div>
            </div>
          </div>

          <div className="w-full px-8 bg-white rounded">
            <div
              className={`border-2 border-dashed rounded-xl p-4 min-h-[15rem]`}
            >
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
                        hidden
                        name=""
                        id="imageFile"
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
         
            {getValues()?.attachmentss?.map((data, i) => (
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
          {/* {attachments.length > 0 && 
        ( */}

          <div className="flex justify-end py-3">
            <button
              type="submit"
              className="bg-btnColor px-6 py-2 header_h3 outline-none  text-white rounded hover:bg-btnColor/70 flex gap-2"
            >
              {uploadLoading ? <Spinner color="default" size="sm" /> : ""}
              Upload & Next
            </button>
          </div>
          {/* )} */}
        </form>
      </div>
    </>
  );
};

export default AttarchmentForm;
