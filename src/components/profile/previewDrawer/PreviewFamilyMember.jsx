/* eslint-disable react/prop-types */
import { Avatar } from "@nextui-org/react";
import { filePrefix } from "../../../utils/filePrefix";
import ExpandedDrawerWithButton from "../../modals/ExpandedDrawerWithButton";
// import useCurrentUser from '../../../hooks/useCurrentUser'
// import { useGetProfile } from '../../../API/profile'

export default function PreviewFamilyMember({
  isOpen,
  setIsOpen,
  memberDetails,
}) {
  return (
    <>
      <ExpandedDrawerWithButton isOpen={isOpen} onClose={()=>setIsOpen(false)} maxWidth={600}>
      <div className="bg-[#f5f7fa] min-h-screen  p-5">
          <h4 className="header_h3 text-2xl text-center">
            {" "}
            Family Member Details
          </h4>

          {memberDetails ? (
            <div className="bg-white max-w-[35rem] mx-auto mt-5 text-[0.9rem] shadow-md py-4 rounded border">
              <div className="flex flex-col text-center items-center gap-2">
                <Avatar
                  src={
                    memberDetails?.FILE_NAME
                      ? filePrefix + memberDetails?.FILE_NAME
                      : null
                  }
                  alt="User Image"
                  className="h-24 w-24 rounded-full"
                />
                <div>
                  <p>
                    <span className="text-[#444e4e] font-medium font-helvetica uppercase">
                      Name:
                    </span>{" "}
                    <span className="text-end font-helvetica opacity-45 font-[300]">
                      {memberDetails?.STAFF_FAMILY_FIRST_NAME}{" "}
                      {memberDetails?.STAFF_FAMILY_LAST_NAME}
                    </span>
                  </p>
                  <p>
                    <span className="text-[#444e4e] font-medium font-helvetica uppercase">
                      Relationship:
                    </span>{" "}
                    <span className="text-end font-helvetica opacity-45 font-[300]">
                      {memberDetails?.RELATIONSHIP ?? "NIL"}
                    </span>
                  </p>
                  <p>
                    <span className="text-[#444e4e] font-medium font-helvetica uppercase">
                      Phone:
                    </span>{" "}
                    <span className="text-end font-helvetica opacity-45 font-[300]">
                      {memberDetails?.STAFF_FAMILY_PHONE}
                    </span>
                  </p>
                  <p>
                    <span className="text-[#444e4e] font-medium font-helvetica uppercase">
                      Email:
                    </span>{" "}
                    <span className="text-end font-helvetica opacity-45 font-[300]">
                      {memberDetails?.STAFF_FAMILY_EMAIL}
                    </span>
                  </p>
                  <p>
                    <span className="text-[#444e4e] font-medium font-helvetica uppercase">
                      Address:
                    </span>{" "}
                    <span className="text-end font-helvetica opacity-45 font-[300]">
                      {memberDetails?.STAFF_FAMILY_ADDRESS}
                    </span>
                  </p>

                  {/* <p>
                    <span className='text-[#444e4e] font-medium font-helvetica uppercase'>
                      Emergency Contact:
                    </span>{' '}
                    <span className='text-end font-helvetica opacity-45 font-[300]'>
                      {memberDetails?.emergencyContact ? 'Yes' : 'No'}
                    </span>
                  </p>

                  <p>
                    <span className='text-[#444e4e] font-medium font-helvetica uppercase'>
                      Health Information:
                    </span>{' '}
                    <span className='text-end font-helvetica opacity-45 font-[300]'>
                      {memberDetails?.healthInfo ? 'Yes' : 'No'}
                    </span>
                  </p>

                  <p>
                    <span className='text-[#444e4e] font-medium font-helvetica uppercase'>
                      Legal Documentation:
                    </span>{' '}
                    <span className='text-end font-helvetica opacity-45 font-[300]'>
                      {memberDetails?.legalDocs}
                    </span>
                  </p>

                  <p>
                    <span className='text-[#444e4e] font-medium font-helvetica uppercase'>
                      Financial Dependents:
                    </span>{' '}
                    <span className='text-end font-helvetica opacity-45 font-[300]'>
                      {memberDetails?.financialDependents ? 'Yes' : 'No'}
                    </span>
                  </p> */}
                </div>
                {/* Display other member details as needed */}
              </div>
            </div>
          ) : (
            <p>No member details available</p>
          )}
        </div>
      </ExpandedDrawerWithButton>
     
    </>
  );
}
