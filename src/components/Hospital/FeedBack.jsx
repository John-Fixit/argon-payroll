/* eslint-disable react/prop-types */
import { Avatar, Spinner } from "@nextui-org/react";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useGetHospitalReview } from "../../API/profile";
import { filePrefix } from "../../utils/filePrefix";
import moment from "moment";

const FeedBack = ({hospitalID}) => {


  const { userData } = useCurrentUser();

    const company_id = userData?.data.COMPANY_ID;
  const { data: getReview, isLoading, isError } = useGetHospitalReview({
    hospital_id: hospitalID, // Pass the hospital_id
    company_id: company_id, // Assuming you have company_id from the profile
  });



  const comments = getReview?.comments



  return (
    <div className="shadow border rounded p-4 bg-white">
    <div className="my-4 w-full">
    <ul className="ms-12 my-4 text-gray-500 border-s-2 border-gray-200">


       {
       isLoading?  <div className='flex justify-center items-center'>
       <Spinner color="default"/>
       </div>:
       isError? <p className="font-helvetica ">Error loading feedbacks...</p>
       :
       comments?.map((user,i)=>(
            <li className="mb-10 ms-4 relative group" key={i+"feedback"}>
            <div className="border p-2 rounded">
              <Avatar
              isBordered
                src={user?.FILE_NAME? filePrefix+user?.FILE_NAME: ""}
                size="sm"
                className="absolute top-3 -start-[64px]"
              />
              <span className="absolute w-[12px] h-[12px] group-hover:bg-btnColor bg-gray-200 border-2 border-white rounded-full -start-[24px] top-5"></span>
            <div className="mb-2">
              <p className="uppercase font-helvetica text-blue-400 text-sm">{user.FIRST_NAME} {user?.LAST_NAME}</p>
              
              <span className=" text-xs font-helvetica text-gray-400">{moment(user?.DATE_POSTED).format("MMM Do, YYYY")}</span>
            </div>
          <p className="font-helvetica font-light">{user.COMMENT}</p>
          {/* <p className="my-2 text-end text-xs text-gray-400">{moment(user?.DATE_POSTED).format("LT")}</p> */}
            </div>
            </li>
          ))}
    </ul>
    </div>
    </div>
  )
}

export default FeedBack