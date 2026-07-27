/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import React from 'react'
import { Avatar, Skeleton, Spinner } from "@nextui-org/react";
import { file_Prefix } from "../../API/leave";
import { Edit2Icon } from "lucide-react";
import ContactInformationDrawer from "../profile/profileDrawer/ContactInformationDrawer";
import { useState } from "react";
import { Button, Modal } from "antd";
import { FaPencil } from "react-icons/fa6";
import { uploadFileData } from "../../utils/uploadfile";
import { errorToast, successToast } from "../../utils/toastMsgPop";
import { useUpdateProfile } from "../../API/profile";
import profileImage from "../../assets/images/user_profile.png";
import { useLocation, useParams } from "react-router-dom";
import { useUpdateOfficial } from "../../API/officials";

const Profile = ({
  personal_information,
  contact_information,
  isLoading,
  profile_picture,
  can_edit_official,
}) => {
  const location = useLocation().pathname;

  const preview_staff_id = useParams()?.staff_id;
  const official_edit =
    preview_staff_id && location.includes("/people/self/profile_details");

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const onEditClick = () => {
    setIsDrawerOpen(true);
  };

  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [openPictureModal, setOpenPictureModal] = useState(false);
  const [isLoadingPP, setIsLoading] = useState(false);

  const updateMutation = official_edit ? useUpdateOfficial : useUpdateProfile;

  const updateProfile = updateMutation();

  const handleChooseFile = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreviewImage(URL.createObjectURL(file));

    handleOpenPictureModal();
  };

  const saveProfilePicture = async () => {
    const json = {
      package_id: 14,
      company_id: personal_information?.COMPANY_ID,
      staff_id: personal_information?.staff_id,
      profile_picture: "",
    };

    if (official_edit) {
      json["preview_staff_id"] = preview_staff_id;
    }

    setIsLoading(true);

    try {
      const fileFormData = new FormData();

      fileFormData.append("file", imageFile);

      let res = await uploadFileData(fileFormData);

      json["profile_picture"] = res?.file_url_id;

      updateProfile.mutate(json, {
        onSuccess: () => {
          successToast("Profile picture update request sent");
          handleClosePictureModal();
        },
        onError: (err) => {
          const errMsg = err?.response?.data?.message;
          errorToast(errMsg);
        },
        onSettled: () => {
          setIsLoading(false);
        },
      });
    } catch (err) {
      const errMsg = err?.response?.data?.message ?? err?.message;
      errorToast(errMsg);
      setIsLoading(false);
    }
  };

  const handleOpenPictureModal = () => {
    setOpenPictureModal(true);
  };
  const handleClosePictureModal = () => {
    setOpenPictureModal(false);
  };
  return (
    <>
      <div className="relative flex flex-col min-w-0 rounded-xl break-words border bg-white shadow">
        <div className="flex-auto p-6 pb-0">
          <div className="grid grid-cols-1 md:grid-cols-8  items-center">
            <div className="md:col-span-3 mx-auto md:mx-0">
              <div className="text-center mx-auto md:mx-0 flex flex-col items-center">
                <div className="relative">
                  <div className="w-[7rem] h-[7rem] rounded-full border-2 border-gray-200 mx-auto overflow-auto bg-gray-50">
                    <img
                      src={
                        profile_picture
                          ? `${file_Prefix}${profile_picture}`
                          : profileImage
                      }
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                  {can_edit_official ? (
                    <label
                      htmlFor="image"
                      className="absolute bottom-0 right-0 z-10"
                    >
                      <div className="h-8 w-8 rounded-full flex justify-center items-center bg-[#00bcc2] text-white cursor-pointer">
                        <FaPencil fontSize={"1rem"} className="" />
                      </div>
                      <input
                        type="file"
                        accept=".jpg, .jpeg, .png, .gif, .pdf"
                        size="sm"
                        className="rounded-sm hidden"
                        label="Image"
                        placeholder="image"
                        id="image"
                        name="image"
                        onChange={handleChooseFile} // Add the desired file types
                      />
                    </label>
                  ) : null}
                </div>
                <h4 className="text-secondary font-helvetica font-[500] mt-3 text-[19px] uppercase">
                  {personal_information?.FIRST_NAME}{" "}
                  {personal_information?.LAST_NAME}
                </h4>
                <h5 className="text-gray-400 font-[400] mb-4 text-[14px]">
                  {personal_information?.DEPARTMENT}
                </h5>
              </div>
            </div>
            {/* <!-- end col --> */}
            <div className="md:col-span-5 px-4 md:px-2 md:border-l md:pl-2">
              <div className="ms-3">
                <div>
                  <div className="flex justify-between items-center gap-2">
                    <h4 className="mb-2 text-[16px] font-[500] font-helvetica text-gray-500">
                      CONTACT INFORMATION
                    </h4>
                    {can_edit_official ? (
                      <div className="flex justify-end ">
                        <button
                          className="bg-blue-100 p-2 rounded-full"
                          onClick={onEditClick}
                        >
                          <Edit2Icon className="w-4 h-4 text-blue-400" />
                        </button>
                      </div>
                    ) : null}
                  </div>
                  {isLoading ? (
                    <div className="max-w-[300px] w-full flex items-center gap-3">
                      <div className="w-full flex flex-col gap-2">
                        <Skeleton className="h-3 w-3/5 rounded-lg" />
                        <Skeleton className="h-3 w-4/5 rounded-lg" />
                        <Skeleton className="h-3 w-4/5 rounded-lg" />
                        <Skeleton className="h-3 w-4/5 rounded-lg" />
                      </div>
                    </div>
                  ) : (
                    <ul className=" mt-2 text-[0.9rem] flex flex-col space-y-3">
                      <li className=" grid grid-cols-2  ">
                        <span className="text-gray-500 text-sm font-medium font-helvetica uppercase">
                          EMAIL:
                        </span>
                        <span className="text-[#888888] text-end pb-2 w-full  max-w-sm fontbold font-profileFontSize font-helvetica hyphens-auto overflow-hidden break-words opacity-[0.7]">
                          {contact_information?.EMAIL ?? "N/A"}
                        </span>
                      </li>
                      <li className="grid grid-cols-2">
                        <span className="text-gray-500 text-sm font-medium font-helvetica uppercase">
                          {" "}
                          OTHER EMAIL:
                        </span>
                        <span className="text-[#888888] text-[0.9rem] text-end pb-2 w-full max-w-sm   font-profileFontSize font-helvetica hyphens-auto overflow-hidden break-words opacity-[0.7]">
                          {contact_information?.OTHER_EMAIL ?? "N/A"}
                        </span>
                      </li>
                      <li className="grid grid-cols-2">
                        <span className="text-gray-500 text-sm font-medium font-helvetica uppercase">
                          {" "}
                          PHONE NUMBER:
                        </span>
                        <span className="text-[#888888] text-[0.9rem] text-end pb-2 w-full max-w-sm   font-profileFontSize font-helvetica hyphens-auto overflow-hidden break-words opacity-[0.7]">
                          {contact_information?.PHONE ?? "N/A"}
                        </span>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isDrawerOpen && (
        <ContactInformationDrawer
          isOpen={isDrawerOpen}
          setIsOpen={setIsDrawerOpen}
          staff_id={personal_information?.staff_id}
          official_edit={can_edit_official}
        />
      )}

      <Modal
        open={openPictureModal}
        onCancel={handleClosePictureModal}
        footer={[
          <div className="flex justify-end py-3" key={1}>
            <button
              type="submit"
              className="bg-btnColor px-6 py-2 header_h3 outline-none flex gap-2 text-white rounded hover:bg-btnColor/70 items-center"
              onClick={saveProfilePicture}
            >
              {isLoadingPP ? <Spinner color="default" size="sm" /> : null}
              Upload Profile Picture
            </button>
          </div>,
        ]}
      >
        <div className="flex justify-center">
          <Avatar
            src={previewImage}
            alt="preview image"
            className="h-48 w-48 rounded-full"
          ></Avatar>
        </div>
      </Modal>
    </>
  );
};

export default Profile;
