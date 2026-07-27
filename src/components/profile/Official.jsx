
import { Skeleton } from "@nextui-org/react";
import Card from "./Card";
import { toStringDate } from "../../utils/utitlities";
import PropTypes from "prop-types"

export default function Official({ profile, isLoading }) {
  return (
    <Card title="Official" hasEditIcon={false}>
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
        <ul className=" mt-2 flex flex-col space-y-3">
          {profile?.SETTINGS?.HAS_DIRECTORATE && (
            <li className="grid grid-cols-2 border-b">
              <span className="text-gray-500 text-sm font-medium font-helvetica uppercase text-start">
                Directorate:
              </span>
              <span className="h-auto hyphens-auto overflow-hidden text-end  break-words pb-2 w-full max-w-sm font-helvetica text-[0.85rem] opacity-45">
                {profile?.BIODATA?.DIRECTORATE}
              </span>
            </li>
          )}
          {profile?.SETTINGS?.HAS_DEPARTMENT && (
            <li className="grid grid-cols-2 border-b ">
              <span className="text-gray-500 text-sm font-medium font-helvetica uppercase text-start">
                {" "}
                Department:
              </span>
              <span className="h-auto hyphens-auto overflow-hidden text-end  break-words pb-2 w-full max-w-sm font-helvetica text-[0.85rem] opacity-45">
                {profile?.BIODATA?.DEPARTMENT ?? "N/A"}
              </span>
            </li>
          )}
          {profile?.SETTINGS?.HAS_UNIT && (
            <li className="grid grid-cols-2 border-b">
              <span className="text-gray-500 text-sm font-medium font-helvetica uppercase text-start">
                Unit:
              </span>
              <span className="h-auto hyphens-auto overflow-hidden text-end  break-words pb-2 w-full max-w-sm font-helvetica text-[0.85rem] opacity-45">
                {profile?.BIODATA?.UNIT ?? "N/A"}
              </span>
            </li>
          )}
          {profile?.SETTINGS?.DESIGNATION && (
            <li className="grid grid-cols-2 border-b">
              <span className="text-gray-500 text-sm font-medium font-helvetica uppercase text-start">
                Designation:
              </span>
              <span className="h-auto hyphens-auto overflow-hidden text-end  break-words pb-2 w-full max-w-sm font-helvetica text-[0.85rem] opacity-45">
                {profile?.BIO_DATA?.DESIGNATION}
              </span>
            </li>
          )}
          {profile?.SETTINGS?.HAS_GRADING && (
            <li className="grid grid-cols-2 border-b">
              <span className="text-gray-500 text-sm font-medium font-helvetica uppercase text-start">
                Grade Level:
              </span>
              <span className="h-auto hyphens-auto overflow-hidden text-end  break-words pb-2 w-full max-w-sm font-helvetica text-[0.85rem] opacity-45">
                {profile?.BIODATA?.GRADE ?? "N/A"}
              </span>
            </li>
          )}
          {profile?.SETTINGS?.HAS_STEPS && (
            <li className="grid grid-cols-2 border-b">
              <span className="text-gray-500 text-sm font-medium font-helvetica uppercase text-start">
                Step:
              </span>
              <span className="h-auto hyphens-auto overflow-hidden text-end  break-words pb-2 w-full max-w-sm font-helvetica text-[0.85rem] opacity-45">
                {profile?.BIODATA?.STEP ?? "N/A"}
              </span>
            </li>
          )}
          <li className="grid grid-cols-2 border-b">
            <span className="text-gray-500 text-sm font-medium font-helvetica uppercase text-start">
              Employee Type:
            </span>
            <span className="h-auto hyphens-auto overflow-hidden text-end  break-words pb-2 w-full max-w-sm font-helvetica text-[0.85rem] opacity-45">
              {profile?.BIODATA?.EMPLOYEE_TYPE ?? "N/A"}
            </span>
          </li>
          <li className="grid grid-cols-2 border-b">
            <span className="text-gray-500 text-sm font-medium font-helvetica uppercase text-start">
              Date of First Appointment:
            </span>
            <span className="h-auto hyphens-auto overflow-hidden text-end  break-words pb-2 w-full max-w-sm font-helvetica text-[0.85rem] opacity-45">
              {profile?.BIODATA?.DATE_OF_FIRST_APPOINTMENT
                ? toStringDate(profile?.BIODATA?.DATE_OF_FIRST_APPOINTMENT)
                : "N/A"}
            </span>
          </li>
          <li className="grid grid-cols-2 border-b">
            <span className="text-gray-500 text-sm font-medium font-helvetica uppercase text-start">
              Current Appointment Date:
            </span>
            <span className="h-auto hyphens-auto overflow-hidden text-end  break-words pb-2 w-full max-w-sm font-helvetica text-[0.85rem] opacity-45">
              {profile?.BIODATA?.CURRENT_APPOINTMENT_DATE
                ? toStringDate(profile?.BIODATA?.CURRENT_APPOINTMENT_DATE)
                : "N/A"}
            </span>
          </li>
          <li className="grid grid-cols-2 border-b">
            <span className="text-gray-500 text-sm font-medium font-helvetica uppercase text-start">
              Present Posting:
            </span>
            <span className="h-auto hyphens-auto overflow-hidden text-end  break-words pb-2 w-full max-w-sm font-helvetica text-[0.85rem] opacity-45">
              {profile?.BIODATA?.REGION_OFFICE ?? "N/A"}
            </span>
          </li>
        </ul>
      )}
    </Card>
  );
}

Official.propTypes = {
  profile: PropTypes.object,
  isLoading: PropTypes.bool
}