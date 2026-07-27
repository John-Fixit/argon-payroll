import { useState } from "react";
import PersonalInformationDrawer from "./profileDrawer/ProfileInformationDrawer";
import { useGetProfile } from "../../API/profile";
import useCurrentUser from "../../hooks/useCurrentUser";
import { Edit2Icon, EyeIcon } from "lucide-react";
import { Skeleton, Tooltip } from "@nextui-org/react";
import PreviewPersonalInfoRequest from "./previewDrawer/PreviewPersonalInfoRequest";
import { toStringDate } from "../../utils/utitlities";

export default function PersonalInformation() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [previewRequest, setPreviewRequest] = useState(false);

  const handleEditClick = () => {
    setIsDrawerOpen(true);
  };
  const handlePreview = () => {
    setPreviewRequest(true);
  };

  const { userData } = useCurrentUser();
  const { data: profile, isLoading } = useGetProfile({
    user: userData?.data,
    path: "/profile/get_profile",
  });

  return (
    <>
      <div className={`bg-white rounded-md p-4  h-full`}>
        <div className="flex justify-between border-b items-center gap-4 pb-3">
          <h2 className="text-[1rem] font-medium font-helvetica uppercase text-start text-gray-500">
            Personal Information
          </h2>

          {profile?.BIODATA?.HAS_PENDING_APPROVAL ? (
            <div className="flex justify-end ">
              <Tooltip color="default" content="Preview Request" delay={300}>
                <button
                  className="bg-blue-100 text-yellow-800 p-2 rounded-full"
                  onClick={handlePreview}
                >
                  <EyeIcon className="text-blue-400" />
                </button>
              </Tooltip>
            </div>
          ) : (
            <div className="flex justify-end ">
              <Tooltip color="default" content="Edit" delay={300}>
                <button
                  className="bg-blue-100 p-2 rounded-full"
                  onClick={handleEditClick}
                >
                  <Edit2Icon className="w-4 h-4 text-blue-400" />
                </button>
              </Tooltip>
            </div>
          )}
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
          <ul className=" mt-2 flex flex-col space-y-3">
            <li className=" grid grid-cols-2 border-b  ">
              <span className="text-gray-500 text-sm font-medium font-helvetica uppercase text-start">
                {" "}
                Last Name:
              </span>
              <span className="text-end pb-2 w-full  max-w-sm fontbold font-helvetica text-[0.85rem] opacity-45 hyphens-auto overflow-hidden break-words">
                {profile?.BIODATA?.LAST_NAME ?? "N/A"}
              </span>
            </li>
            <li className="grid grid-cols-2 border-b">
              <span className="text-gray-500 text-sm font-medium font-helvetica uppercase text-start">
                {" "}
                First Name:
              </span>
              <span className="text-end pb-2 w-full max-w-sm   font-helvetica text-[0.85rem] opacity-45 hyphens-auto overflow-hidden break-words">
                {profile?.BIODATA?.FIRST_NAME ?? "N/A"}
              </span>
            </li>
            <li className="grid grid-cols-2 border-b">
              <span className="text-gray-500 text-sm font-medium font-helvetica uppercase text-start">
                Other Names:
              </span>
              <span className="text-end pb-2 w-full max-w-sm  font-helvetica text-[0.85rem] opacity-45 hyphens-auto overflow-hidden break-words">
                {profile?.BIODATA?.OTHER_NAMES ?? "N/A"}
              </span>
            </li>
            <li className="grid grid-cols-2 border-b">
              <span className="text-gray-500 text-sm font-medium font-helvetica uppercase text-start">
                Title:
              </span>
              <span className="text-end pb-2 w-full max-w-sm  font-helvetica text-[0.85rem] opacity-45 hyphens-auto overflow-hidden break-words">
                {profile?.BIODATA?.TITLE ?? "N/A"}
              </span>
            </li>
            <li className="grid grid-cols-2 border-b">
              <span className="text-gray-500 text-sm font-medium font-helvetica uppercase text-start">
                {" "}
                Marital Status:
              </span>
              <span className="text-end pb-2 w-full max-w-sm  font-helvetica text-[0.85rem] opacity-45 hyphens-auto overflow-hidden break-words">
                {profile?.BIODATA?.MARITAL_STATUS ?? "N/A"}
              </span>
            </li>
            <li className="grid grid-cols-2 border-b">
              <span className="text-gray-500 text-sm font-medium font-helvetica uppercase text-start">
                Date of Birth:
              </span>
              <span className="text-end pb-2 w-full max-w-sm  font-helvetica text-[0.85rem] opacity-45 hyphens-auto overflow-hidden break-words">
                {profile?.BIODATA?.DATE_OF_BIRTH
                  ? toStringDate(profile?.BIODATA?.DATE_OF_BIRTH)
                  : "N/A"}
              </span>
            </li>
            <li className="grid grid-cols-2 border-b">
              <span className="text-gray-500 text-sm font-medium font-helvetica uppercase text-start">
                Nationality:
              </span>
              <span className="text-end pb-2 w-full max-w-sm  font-helvetica text-[0.85rem] opacity-45 hyphens-auto overflow-hidden break-words">
                {profile?.BIODATA?.NATIONALITY ?? "N/A"}
              </span>
            </li>
            <li className="grid grid-cols-2 border-b">
              <span className="text-gray-500 text-sm font-medium font-helvetica uppercase text-start">
                State of Origin:
              </span>
              <span className="text-end pb-2 w-full max-w-sm  font-helvetica text-[0.85rem] opacity-45 hyphens-auto overflow-hidden break-words">
                {profile?.BIODATA?.STATE_OF_ORIGIN ?? "N/A"}
              </span>
            </li>
            <li className="grid grid-cols-2 border-b">
              <span className="text-gray-500 text-sm font-medium font-helvetica uppercase text-start">
                LGA:
              </span>
              <span className="text-end pb-2 w-full max-w-sm  font-helvetica text-[0.85rem] opacity-45 hyphens-auto overflow-hidden break-words">
                {profile?.BIODATA?.LGA ?? "N/A"}
              </span>
            </li>
          </ul>
        )}
      </div>

      {isDrawerOpen && (
        <PersonalInformationDrawer
          isOpen={isDrawerOpen}
          setIsOpen={setIsDrawerOpen}
        />
      )}
      {previewRequest && (
        <PreviewPersonalInfoRequest
          isOpen={previewRequest}
          setIsOpen={setPreviewRequest}
        />
      )}
    </>
  );
}
