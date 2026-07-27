/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Edit2Icon, EyeIcon } from "lucide-react";
import { Skeleton, Tooltip } from "@nextui-org/react";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useGetProfile } from "../../API/profile";
import PersonalInformationDrawer from "../profile/profileDrawer/ProfileInformationDrawer";

export default function PersonalInformation({
  personal_information,
  isLoading,
  can_edit_official,
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [previewRequest, setPreviewRequest] = useState(false);

  const handleEditClick = () => {
    setIsDrawerOpen(true);
  };
  const handlePreview = () => {
    setPreviewRequest(true);
  };

  const [isDrawerOpenProfile, setIsDrawerOpenProfile] = useState(false);
  const onEditClick = () => {
    setIsDrawerOpenProfile(true);
  };

  return (
    <>
      <div className={`bg-white rounded-lg p-4 h-full`}>
        <div className="flex justify-between gap-2 items-center">
          <h2 className="text-[16px] leading-6 font-medium font-helvetica uppercase pb-3">
            Personal Information
          </h2>
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
              <Skeleton className="h-3 w-4/5 rounded-lg" />
              <Skeleton className="h-3 w-4/5 rounded-lg" />
              <Skeleton className="h-3 w-4/5 rounded-lg" />
            </div>
          </div>
        ) : (
          <ul className=" mt-2 text-[0.9rem] flex flex-col space-y-3">
            <li className=" grid grid-cols-2 border-b  ">
              <span className="text-gray-500 text-sm font-medium font-helvetica uppercase">
                {" "}
                Last Name:
              </span>
              <span className="text-[#888888] text-end pb-2 w-full  max-w-sm fontbold font-profileFontSize font-helvetica hyphens-auto overflow-hidden break-words opacity-[0.7]">
                {personal_information?.LAST_NAME ?? "N/A"}
              </span>
            </li>
            <li className="grid grid-cols-2 border-b">
              <span className="text-gray-500 text-sm font-medium font-helvetica uppercase">
                {" "}
                First Name:
              </span>
              <span className="text-[#888888] text-[0.9rem] text-end pb-2 w-full max-w-sm   font-profileFontSize font-helvetica hyphens-auto overflow-hidden break-words opacity-[0.7]">
                {personal_information?.FIRST_NAME ?? "N/A"}
              </span>
            </li>
            <li className="grid grid-cols-2 border-b">
              <span className="text-gray-500 text-sm font-medium font-helvetica uppercase">
                Other Names:
              </span>
              <span className="text-[#888888] text-end pb-2 w-full max-w-sm  font-profileFontSize font-helvetica hyphens-auto overflow-hidden break-words opacity-[0.7]">
                {personal_information?.OTHER_NAMES ?? "N/A"}
              </span>
            </li>
            <li className="grid grid-cols-2 border-b">
              <span className="text-gray-500 text-sm font-medium font-helvetica uppercase">
                Title:
              </span>
              <span className="text-[#888888] text-end pb-2 w-full max-w-sm  font-profileFontSize font-helvetica hyphens-auto overflow-hidden break-words opacity-[0.7]">
                {personal_information?.TITLE ?? "N/A"}
              </span>
            </li>
            <li className="grid grid-cols-2 border-b">
              <span className="text-gray-500 text-sm font-medium font-helvetica uppercase">
                {" "}
                Marital Status:
              </span>
              <span className="text-[#888888] text-end pb-2 w-full max-w-sm  font-profileFontSize font-helvetica hyphens-auto overflow-hidden break-words opacity-[0.7]">
                {personal_information?.MARITAL_STATUS ?? "N/A"}
              </span>
            </li>
            <li className="grid grid-cols-2 border-b">
              <span className="text-gray-500 text-sm font-medium font-helvetica uppercase">
                Date of Birth:
              </span>
              <span className="text-[#888888] text-end pb-2 w-full max-w-sm  font-profileFontSize font-helvetica hyphens-auto overflow-hidden break-words opacity-[0.7]">
                {personal_information?.DATE_OF_BIRTH ?? "N/A"}
              </span>
            </li>
            <li className="grid grid-cols-2 border-b">
              <span className="text-gray-500 text-sm font-medium font-helvetica uppercase">
                Nationality:
              </span>
              <span className="text-[#888888] text-end pb-2 w-full max-w-sm  font-profileFontSize font-helvetica hyphens-auto overflow-hidden break-words opacity-[0.7]">
                {personal_information?.NATIONALITY ?? "N/A"}
              </span>
            </li>
            <li className="grid grid-cols-2 border-b">
              <span className="text-gray-500 text-sm font-medium font-helvetica uppercase">
                State of Origin:
              </span>
              <span className="text-[#888888] text-end pb-2 w-full max-w-sm  font-profileFontSize font-helvetica hyphens-auto overflow-hidden break-words opacity-[0.7]">
                {personal_information?.STATE_OF_ORIGIN ?? "N/A"}
              </span>
            </li>
            <li className="grid grid-cols-2 border-b">
              <span className="text-gray-500 text-sm font-medium font-helvetica uppercase">
                LGA:
              </span>
              <span className="text-[#888888] text-end pb-2 w-full max-w-sm  font-profileFontSize font-helvetica hyphens-auto overflow-hidden break-words opacity-[0.7]">
                {personal_information?.LGA ?? "N/A"}
              </span>
            </li>
          </ul>
        )}
      </div>

      {isDrawerOpenProfile && (
        <PersonalInformationDrawer
          isOpen={isDrawerOpenProfile}
          setIsOpen={setIsDrawerOpenProfile}
          staff_id={personal_information?.staff_id}
        />
      )}
    </>
  );
}
