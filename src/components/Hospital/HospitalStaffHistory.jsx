/* eslint-disable react/prop-types */
import { Button, Skeleton } from "@nextui-org/react";
import { CiLocationOn } from "react-icons/ci";
import ActionButton from "../forms/FormElements/ActionButton";
import { useGetProfile } from "../../API/profile";
import { filePrefix } from "../../utils/filePrefix";
import profileImage from "../../assets/images/user_profile.png";
import { API_URL } from "../../API/api_urls/api_urls";
import { Progress } from "antd";
import { useCallback, useMemo } from "react";
import HospitalWithReviews from "./HospitalWithReview";

const HospitalStaffHistory = ({ add, makeComment }) => {
  const { data: profile } = useGetProfile({
    path: API_URL.getProfile,
    key: "profile",
  });
  const { data: hospital_data, isLoading } = useGetProfile({
    path: API_URL.getHospital,
    key: "staff_hospital",
  });

  const hospitalData = useMemo(() => {
    return hospital_data?.data?.hospitals?.length
      ? hospital_data?.data?.hospitals
          .map((item, index) => ({
            ...item,
            _id: index + "hospital",
            is_family: item?.RELATIONSHIP ? true : false,
            NAME: item?.RELATIONSHIP
              ? `${item?.STAFF_FAMILY_FIRST_NAME} ${item?.STAFF_FAMILY_LAST_NAME}`
              : `${profile?.BIODATA?.FIRST_NAME} ${profile?.BIODATA?.LAST_NAME}`,
            PICTURE: item?.RELATIONSHIP
              ? item?.FILE_NAME
              : profile?.PROFILE_PICTURE?.FILE_NAME,
          }))
          .filter((item) => !item.is_family) // Filter by is_family
      : [];
  }, [hospital_data, profile]);

  const progressStatus = useCallback((progress) => {
    if (progress >= 80) {
      return "rgb(34 197 94)";
    } else if (progress >= 60) {
      return "rgb(59 130 246)";
    } else if (progress >= 40) {
      return "rgb(234 179 8)";
    } else {
      return "rgb(239 68 68)";
    }
  }, []);

  return (
    <div>
      <div className="my-8 grid lg:grid-cols-3 md:grid-cols-2 gap-6">
        <div className="bg-white rounded shadow-md">
          <h3 className="px-4 border-b text-medium font-medium py-2 text-[1rem] font-helvetica uppercase opacity-90">
            Profile
          </h3>
          <div className="py-6 px-4">
            <div className="w-[12rem] h-[12rem] my-4 rounded-full border-2 border-gray-200 mx-auto overflow-auto bg-gray-50">
              <img
                src={
                  profile?.PROFILE_PICTURE?.FILE_NAME
                    ? filePrefix + profile?.PROFILE_PICTURE.FILE_NAME
                    : profileImage
                }
                className="w-full h-full object-cover"
                alt="Profile picture"
              />
            </div>
            <p className="my-4 text-center tracking-wider font-helvetica text-[0.90rem]">
              {profile?.BIODATA?.FIRST_NAME} {""} {profile?.BIODATA?.LAST_NAME}
            </p>
            <div className="flex justify-center">
              <Button
                className="px-6 py-2 bg-btnColor hover:bg-[#44bec2] rounded-full text-white font-medium font-helvetica text-[0.83rem]"
                onClick={add}
              >
                Add Hospital
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded shadow-md">
          <h3 className="px-4 border-b text-medium font-medium py-2 text-[1rem] font-helvetica uppercase opacity-90">
            Hospitals
          </h3>
          <div className="py-6 px-4">
            {isLoading ? (
              <div className=" my-4 py-3 px-2 rounded border">
                <div className="mb-4 ">
                  <div className="m-0 p-0 tracking-wider font-helvetica text-[0.83rem]">
                    <Skeleton className="h-3 w-60 rounded-lg" />
                  </div>
                  <div className="mt-2 p-0 font-helvetica text-[0.80rem] opacity-50">
                    <Skeleton className="h-3 w-48 rounded-lg" />
                  </div>
                </div>
                <div className="flex gap-1">
                  <CiLocationOn />
                  <div className="font-helvetica text-[0.83rem] opacity-40">
                    <Skeleton className="h-3 w-48 rounded-lg" />
                  </div>
                </div>
                <div className="flex items-center gap-2 my-2">
                  <Skeleton className="h-4 w-60 rounded-lg" />
                </div>
                <div className="mt-4 flex justify-end">
                  <Skeleton className="h-6 w-16 rounded-lg" />
                </div>
              </div>
            ) : (
              hospitalData?.map((hospital, index) => (
                <div
                  className=" my-4 py-3 px-2 rounded border"
                  key={index + "hospital_feedback"}
                >
                  <div className="mb-4 ">
                    <p className="m-0 p-0 tracking-wider font-helvetica text-[0.83rem]">
                      {hospital?.HOSPITAL_NAME}
                    </p>
                    <p className="m-0 p-0 font-helvetica text-[0.80rem] opacity-50">
                      {hospital?.SPECIALTY}
                    </p>
                  </div>
                  <div className="flex items-center justify-end gap-1">
                    <CiLocationOn />
                    <p className="font-helvetica text-[0.83rem] opacity-40">
                      {hospital?.ADDRESS} {hospital?.LGA} {hospital?.STATE}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 my-2">
                    <p className="font-helvetica text-[0.82rem] opacity-80">
                      Rating
                    </p>
                    <Progress
                      percent={hospital?.RATINGS * 20}
                      size="small"
                      strokeColor={progressStatus(hospital?.RATINGS * 20)}
                    />
                  </div>
                  <div className="mt-4 flex justify-end">
                    <ActionButton
                      className="shadow"
                      onClick={() => makeComment(hospital?.HOSPITAL_ID)}
                    >
                      comment
                    </ActionButton>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="bg-white rounded shadow-md">
          <h3 className="px-4 border-b text-medium font-medium py-2 text-[1rem] font-helvetica uppercase opacity-90">
            My Activities
          </h3>
          <div className="py-6 px-4">
            <ol className="relative ms-4 my-4 text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">

              
              {
              isLoading? (
                Array(4).fill('').map((item, index)=>(
                  <li className="mb-10 ms-8" key={item+index+"___skeleton"}>
                <span className="absolute w-[10px] h-[10px] border-2 border-btnColor bg-white rounded-full -start-[5.8px]"></span>
                <h3 className="font-medium leading-tight font-helvetica">
                  <Skeleton className="h-4 w-60 rounded-lg" />
                </h3>
              </li>
                ))
              ): (
                hospitalData?.map((hospital, index) => {
                  return (
                    <HospitalWithReviews
                      key={index + "___hospital_review"}
                      makeComment={makeComment}
                      hospital={hospital}
                    />
                  );
                })
              )
              }
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalStaffHistory;
