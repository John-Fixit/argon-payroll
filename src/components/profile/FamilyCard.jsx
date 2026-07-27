/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Card } from "@nextui-org/card";
import { Edit2Icon, EyeIcon, PlusIcon } from "lucide-react";
import { getProfile, useGetProfile } from "../../API/profile";
import useCurrentUser from "../../hooks/useCurrentUser";
import { Avatar, Button, Tooltip } from "@nextui-org/react";
import PreviewNextOfKinInfoRequest from "./previewDrawer/PreviewNextOfKinInfoRequest";
import FamilyInformationDrawer from "./profileDrawer/FamilyInformationDrawer";
// import profileImage from '.../../../../assets/images/user_profile.png'
import NextOfKin from "./NextOfKin";
import PreviewFamilyMember from "./previewDrawer/PreviewFamilyMember";
import { filePrefix } from "../../utils/filePrefix";
import { Tag } from "antd";

export default function FamilyCard() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleEditClick = () => {
    setIsDrawerOpen(true);
  };
  const [selectedMemberId, setSelectedMemberId] = useState(null);

  const { data: profile, isLoading } = useGetProfile({
    path: "/profile/get_profile",
  });

  const [previewRequest, setPreviewRequest] = useState(false);
  const [previewFamily, setPreviewFamily] = useState(false);
  const handlePreview = () => {
    setPreviewRequest(true);
  };
  const { userData } = useCurrentUser();

  // const [familyInfo, setFamilyInfo] = useState([])
  const handleCardClick = (memberId) => {
    setSelectedMemberId(memberId);
    setPreviewFamily(true); // Update to open the PreviewFamilyMember drawer
  };


  const pendingFamily = profile?.PENDING_FAMILY?.length
    ? profile?.PENDING_FAMILY?.map((item) => {
        return {
          ...item,
          isPending: true,
        };
      })
    : [];
  const approvedFamily = profile?.FAMILY?.FAMILY?.length
    ? profile?.FAMILY?.FAMILY?.map((item) => {
        return {
          ...item,
          isPending: false,
        };
      })
    : [];

  const familyData = pendingFamily?.concat(approvedFamily);

  // useEffect(() => {
  //   familyDetails()
  // }, [])
  return (
    <>
      <div className="">
        <div className="flex flex-col gap-4">
          <div className="flex  justify-end my-2 gap-3 items-center">
          <button
              className="header_btnStyle bg-[#00bcc2] rounded text-white font-semibold py-[7px] leading-[19.5px] mx-2 my-1 md:my-0 px-[16px] uppercase"
              onClick={handleEditClick}
            >
              Add Family
            </button>
      
          </div>
        </div>

        <div className=" grid lg:grid-cols-3 md:grid-cols-2 gap-4 mt-4 h-full">
          <NextOfKin />
          {familyData?.map((member, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(member)}
              className=""
            >
              <Card className=" cursor-pointer shadow-none p-4 rounded-md h-full">
                <div className="flex justify-between items-center gap-4 border-b pb-3s ">
                  <h2 className="text-[1rem] font-medium font-helvetica uppercase text-gray-500">
                    Family
                  </h2>
                  {member?.isPending && (
                    <Tag color={member?.isPending ? "warning" : "success"}>
                      {member?.isPending ? "Pending" : "Approved"}
                    </Tag>
                  )}
                </div>

                <div className="flex flex-col text-[500] gap-4 my-4">
                  {/* <div className="py-4 md:py-0 flex justify-center">
                    <Avatar
                      src={
                        member?.FILE_NAME
                          ? filePrefix + member?.FILE_NAME
                          : null
                      }
                      alt="User Image"
                      className="h-24 w-24 rounded-full"
                    />
                  </div> */}
                  <ul className=" mt-2 flex flex-col space-y-3">
                    <li className=" flex justify-between gap-x-5 border-b  ">
                      <span className="text-gray-500 text-sm font-medium font-helvetica uppercase text-start">
                        {" "}
                        Name:
                      </span>
                      <span className="text-end pb-2 w-full  max-w-sm fontbold font-helvetica text-[0.85rem] opacity-45 hyphens-auto overflow-hidden break-words">
                        {member?.STAFF_FAMILY_FIRST_NAME}{" "}
                        {member?.STAFF_FAMILY_LAST_NAME ?? "N/A"}
                      </span>
                    </li>
                    <li className="flex justify-between gap-x-5 border-b">
                      <span className="text-gray-500 text-sm font-medium font-helvetica uppercase text-start">
                        {" "}
                        RELATIONSHIP:
                      </span>
                      <span className="text-end pb-2 w-full max-w-sm   font-helvetica text-[0.85rem] opacity-45 hyphens-auto overflow-hidden break-words capitalize">
                        {member?.RELATIONSHIP ?? "N/A"}
                      </span>
                    </li>
                    {/* <li className="flex justify-between gap-x-5 border-b">
                      <span className="text-gray-500 text-sm font-medium font-helvetica uppercase text-start">
                        {" "}
                        EMAIL:
                      </span>
                      <span className="text-end pb-2 w-full max-w-sm font-helvetica text-[0.85rem] opacity-45 hyphens-auto overflow-hidden break-words">
                        {member?.STAFF_FAMILY_EMAIL ?? "N/A"}
                      </span>
                    </li>
                    <li className="flex justify-between gap-x-5 border-b">
                      <span className="text-gray-500 text-sm font-medium font-helvetica uppercase text-start">
                        {" "}
                        PHONE:
                      </span>
                      <span className="text-end pb-2 w-full max-w-sm   font-helvetica text-[0.85rem] opacity-45 hyphens-auto overflow-hidden break-words">
                        {member?.STAFF_FAMILY_PHONE ?? "N/A"}
                      </span>
                    </li> */}
                  </ul>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
      {previewFamily && (
        <PreviewFamilyMember
          isOpen={previewFamily}
          setIsOpen={setPreviewFamily}
          // memberId={selectedMemberId}
          memberDetails={selectedMemberId}
        />
      )}
      {isDrawerOpen && (
        <FamilyInformationDrawer
          isOpen={isDrawerOpen}
          setIsOpen={setIsDrawerOpen}
        />
      )}
      {previewRequest && (
        <PreviewNextOfKinInfoRequest
          isOpen={previewRequest}
          setIsOpen={setPreviewRequest}
        />
      )}
    </>
  );
}
