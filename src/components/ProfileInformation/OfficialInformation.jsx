/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Card from "../profile/Card";
import { Skeleton } from "@nextui-org/react";
import { Edit2Icon } from "lucide-react";

const OfficialInformation = ({
  isLoading,
  information,
  setIsOpen,
  editInfo,
}) => {
  return (
    <Card
      title="Official Information"
      onEditClick={editInfo}
      hasEditIcon={information?.CAN_EDIT_OFFICIAL == 1 ? true : false}
    >
      {isLoading ? (
        <div className="max-w-[300px] w-full flex items-center gap-3">
          <div className="w-full flex flex-col gap-3">
            <Skeleton className="h-3 w-3/5 rounded-lg" />
            <Skeleton className="h-3 w-4/5 rounded-lg" />
            <Skeleton className="h-3 w-4/5 rounded-lg" />
            <Skeleton className="h-3 w-4/5 rounded-lg" />
          </div>
        </div>
      ) : (
        <ul className=" mt-2 flex flex-col space-y-3">
          {information?.SETTINGS?.HAS_DIRECTORATE && (
            <li className="grid grid-cols-2 border-b">
              <span className="text-gray-500 text-sm font-medium font-helvetica uppercase ">
                Directorate:
              </span>
              <span className="h-auto hyphens-auto overflow-hidden text-end  break-words pb-2 w-full max-w-sm font-helvetica text-[0.85rem] opacity-45">
                {information?.BIODATA?.DIRECTORATE}
              </span>
            </li>
          )}
          {information?.SETTINGS?.HAS_DESIGNATION && (
            <li className="grid grid-cols-2 border-b">
              <span className="text-gray-500 text-sm font-medium font-helvetica uppercase ">
                Designation:
              </span>
              <span className="h-auto hyphens-auto overflow-hidden text-end  break-words pb-2 w-full max-w-sm font-helvetica text-[0.85rem] opacity-45">
                {information?.BIODATA?.DESIGNATION}
              </span>
            </li>
          )}
          {information?.SETTINGS?.HAS_DEPARTMENT && (
            <li className="grid grid-cols-2 border-b ">
              <span className="text-gray-500 text-sm font-medium font-helvetica uppercase ">
                {" "}
                Department:
              </span>
              <span className="h-auto hyphens-auto overflow-hidden text-end  break-words pb-2 w-full max-w-sm font-helvetica text-[0.85rem] opacity-45">
                {information?.BIODATA?.DEPARTMENT ?? "N/A"}
              </span>
            </li>
          )}
          {information?.SETTINGS?.HAS_UNIT && (
            <li className="grid grid-cols-2 border-b">
              <span className="text-gray-500 text-sm font-medium font-helvetica uppercase ">
                Unit:
              </span>
              <span className="h-auto hyphens-auto overflow-hidden text-end  break-words pb-2 w-full max-w-sm font-helvetica text-[0.85rem] opacity-45">
                {information?.BIODATA?.UNIT ?? "N/A"}
              </span>
            </li>
          )}
          {information?.SETTINGS?.DESIGNATION && (
            <li className="grid grid-cols-2 border-b">
              <span className="text-gray-500 text-sm font-medium font-helvetica uppercase ">
                Designation:
              </span>
              <span className="h-auto hyphens-auto overflow-hidden text-end  break-words pb-2 w-full max-w-sm font-helvetica text-[0.85rem] opacity-45">
                {information?.BIO_DATA?.DESIGNATION}
              </span>
            </li>
          )}
          {information?.SETTINGS?.HAS_GRADING && (
            <li className="grid grid-cols-2 border-b">
              <span className="text-gray-500 text-sm font-medium font-helvetica uppercase ">
                Grade Level:
              </span>
              <span className="h-auto hyphens-auto overflow-hidden text-end  break-words pb-2 w-full max-w-sm font-helvetica text-[0.85rem] opacity-45">
                {information?.BIODATA?.GRADE ?? "N/A"}
              </span>
            </li>
          )}
          {information?.SETTINGS?.HAS_STEPS && (
            <li className="grid grid-cols-2 border-b">
              <span className="text-gray-500 text-sm font-medium font-helvetica uppercase ">
                Step:
              </span>
              <span className="h-auto hyphens-auto overflow-hidden text-end  break-words pb-2 w-full max-w-sm font-helvetica text-[0.85rem] opacity-45">
                {information?.BIODATA?.STEP ?? "N/A"}
              </span>
            </li>
          )}
          <li className="grid grid-cols-2 border-b">
            <span className="text-gray-500 text-sm font-medium font-helvetica uppercase ">
              Employee Type:
            </span>
            <span className="h-auto hyphens-auto overflow-hidden text-end  break-words pb-2 w-full max-w-sm font-helvetica text-[0.85rem] opacity-45">
              {information?.BIODATA?.EMPLOYEE_TYPE ?? "N/A"}
            </span>
          </li>
          <li className="grid grid-cols-2 border-b">
            <span className="text-gray-500 text-sm font-medium font-helvetica uppercase ">
              Date of First Appointment:
            </span>
            <span className="h-auto hyphens-auto overflow-hidden text-end  break-words pb-2 w-full max-w-sm font-helvetica text-[0.85rem] opacity-45">
              {information?.BIODATA?.DATE_OF_FIRST_APPOINTMENT ?? "N/A"}
            </span>
          </li>
          <li className="grid grid-cols-2 border-b">
            <span className="text-gray-500 text-sm font-medium font-helvetica uppercase ">
              Current Appointment Date:
            </span>
            <span className="h-auto hyphens-auto overflow-hidden text-end  break-words pb-2 w-full max-w-sm font-helvetica text-[0.85rem] opacity-45">
              {information?.BIODATA?.CURRENT_APPOINTMENT_DATE ?? "N/A"}
            </span>
          </li>
          <li className="grid grid-cols-2 border-b">
            <span className="text-gray-500 text-sm font-medium font-helvetica uppercase ">
              Present Posting:
            </span>
            <span className="h-auto hyphens-auto overflow-hidden text-end  break-words pb-2 w-full max-w-sm font-helvetica text-[0.85rem] opacity-45">
              {information?.BIODATA?.REGION_OFFICE ?? "N/A"}
            </span>
          </li>
        </ul>
      )}
    </Card>
    //    <Card title="OFFICIAL INFORMATION" hasEditIcon={information?.CAN_EDIT_OFFICIAL==1? true : false}>

    // </Card>
  );
};

export default OfficialInformation;
