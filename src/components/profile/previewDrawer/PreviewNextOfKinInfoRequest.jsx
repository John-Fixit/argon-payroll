/* eslint-disable react/prop-types */
import { Spinner } from "@nextui-org/react";

import useCurrentUser from "../../../hooks/useCurrentUser";
import { useGetProfile } from "../../../API/profile";
import FamilyDetail from "../../../pages/Approval/FamilyDetail";
import { useGetRequest_Detail } from "../../../API/api_urls/my_approvals";
import AttachmentDetailsApproval from "../../core/approvals/AttachmentDetailsApproval";
import NoteDetailsApproval from "../../core/approvals/NoteDetailsApproval";
import ExpandedDrawerWithButton from "../../modals/ExpandedDrawerWithButton";
import FormDrawer from "../../payroll_components/FormDrawer";
import ApprovalHistory from "../../../pages/Approval/ApprovalHistory";
import { Result } from "antd";

export default function PreviewNextOfKinInfoRequest({ isOpen, setIsOpen }) {
  const { userData } = useCurrentUser();
  const { data: profile } = useGetProfile({
    user: userData?.data,
    path: "/profile/get_profile",
  });

  const { data, isPending, isError, error } = useGetRequest_Detail(
    profile?.NEXT_OF_KIN?.PENDING_REQUEST_ID
  );

  const request_detail = data?.data?.data;

  const details = {
    data: request_detail?.data,
    approvers: request_detail?.approvers,
    notes: request_detail?.notes,
    attachments: request_detail?.attachments,
    isLoading: isPending,
    isError: isError,
  };

  const tabs = [
    {
      title: "Next of Kin",
      component: (
        <FamilyDetail
          title={"Next of Kin Details"}
          details={details}
          role="request"
        />
      ),
    },
    {
      title: "Attachment",
      component: <AttachmentDetailsApproval details={details} />,
    },
    { title: "Note", component: <NoteDetailsApproval details={details} /> },
  ];

  return (
    <>
      {
        //       (
        //       <ExpandedDrawer isOpen={isOpen} onClose={setIsOpen}>
        //         <div className='flex hfull gap-2 flex-col md:flex-row overflow-y-scrol'>
        //           <div className='flex flex-col md:min-h-screen w-full md:w-60 bg-chatsidebar    '>
        //             <h3 className=' text-center text-gray-400 border-gray-400 border-b-2 p-2'>
        //               Next Of Kin Request
        //             </h3>
        //           </div>
        //           {isLoading ? (
        //             <div className='max-w-[300px] w-full flex items-center gap-3'>
        //               <div className='w-full flex flex-col gap-2'>
        //                 <Skeleton className='h-3 w-3/5 rounded-lg' />
        //                 <Skeleton className='h-3 w-4/5 rounded-lg' />
        //                 <Skeleton className='h-3 w-4/5 rounded-lg' />
        //                 <Skeleton className='h-3 w-4/5 rounded-lg' />
        //                 <Skeleton className='h-3 w-4/5 rounded-lg' />
        //                 <Skeleton className='h-3 w-4/5 rounded-lg' />
        //                 <Skeleton className='h-3 w-4/5 rounded-lg' />
        //               </div>
        //             </div>
        //           ) : (
        //             <div className=' wfull w-[60%] mx-auto grid p-4  gap-8'>
        //               <Card className='bg-white w-full fontOswald rounded-md shadow-md p-4  hfull '>
        //                 <div className='flex flex-col font-applesystem fontOswald text-[500] items-center gap-4 my-4'>
        //                   <div className='profile-img-wrap py-4 md:py-0'>
        //                     <Avatar
        //                       src={
        //                         PENDING_NEXT_OF_KIN?.FILE_NAME
        //                           ? PENDING_NEXT_OF_KIN.FILE_NAME
        //                           : ''
        //                       }
        //                       alt='User Image'
        //                       // className='h-28 w-28 rounded-full'
        //                       className='h-36 w-36 rounded-full'
        //                     />
        //                   </div>
        //                   <div className='profile-info-left mb-4 '>
        //                     {/* <h3 className='text-[24px] text-[#333333] font-semibold '>
        //                       {PENDING_NEXT_OF_KIN?.STAFF_FAMILY_LAST_NAME} {''}
        //                       {PENDING_NEXT_OF_KIN?.STAFF_FAMILY_FIRST_NAME}
        //                     </h3>
        //                     <h6 className='text-mute font-bold text-[12px]'>
        //                       {PENDING_NEXT_OF_KIN?.DIRECTORATE}
        //                     </h6>
        //                     <small className='text-muted font-bold text-[12px]'>
        //                       {PENDING_NEXT_OF_KIN?.DEPARTMENT}
        //                     </small>
        //                     <div className='staff-id text-black font-semibold text-[14px] mt-2'>
        //                       Employee ID : FT-{PENDING_NEXT_OF_KIN?.STAFF_NUMBER}
        //                     </div> */}
        //                     <h3 className='text-[24px] text-[#333333] font-semibold '>
        //                       {PENDING_NEXT_OF_KIN?.STAFF_FAMILY_LAST_NAME} {''}
        //                       {PENDING_NEXT_OF_KIN?.STAFF_FAMILY_FIRST_NAME}
        //                     </h3>
        //                   <p className=''>
        //                     <span className='text-[#444e4e] font-medium font-helvetica uppercase'>
        //                       Relationship:
        //                     </span>{' '}
        //                     <span className='text-[#888888] text-end font-profileFontSize'>
        //                     {PENDING_NEXT_OF_KIN?.RELATIONSHIP ?? 'NIL'}
        //                     </span>
        //                   </p>
        //                   <p>
        //                     <span className='text-[#444e4e] font-medium font-helvetica uppercase'>
        //                       Phone:
        //                     </span>{' '}
        //                     <span className='text-[#888888] text-end font-profileFontSize'>
        //                       {PENDING_NEXT_OF_KIN?.
        // STAFF_FAMILY_PHONE}
        //                     </span>
        //                   </p>
        //                   <p>
        //                     <span className='text-[#444e4e] font-medium font-helvetica uppercase'>
        //                       Email:
        //                     </span>{' '}
        //                     <span className='text-[#888888] text-end font-profileFontSize'>
        //                       {PENDING_NEXT_OF_KIN?.STAFF_FAMILY_EMAIL
        //                       }
        //                     </span>
        //                   </p>
        //                   <p>
        //                     <span className='text-[#444e4e] font-medium font-helvetica uppercase'>
        //                       Address:
        //                     </span>{' '}
        //                     <span className='text-[#888888] text-end font-profileFontSize'>
        //                       {PENDING_NEXT_OF_KIN?.STAFF_FAMILY_ADDRESS
        //                       }
        //                     </span>
        //                   </p>
        //                   </div>
        //                 </div>
        //               </Card>
        //               {/* <Card className='bg-white w-full  fontOswald rounded-md shadow-md p-4  hfull '>
        //                 <div className='flex flex-col font-applesystem fontOswald text-[500] items-center gap-4 my-4'>
        //                   <div className='profile-img-wrap py-4 md:py-0'>
        //                     <Avatar
        //                       src={
        //                         profile?.NEXT_OF_KIN?.FILE_NAME
        //                           ? profile?.NEXT_OF_KIN.FILE_NAME
        //                           : ''
        //                       }
        //                       alt='User Image'
        //                       // className='h-28 w-28 rounded-full'
        //                       className='h-36 w-36 rounded-full'
        //                     />
        //                   </div>
        //                   <div className='profile-info-left mb-4 '>
        //                     <h3 className='text-[24px] text-[#333333] font-semibold '>
        //                       {profile?.NEXT_OF_KIN?.LAST_NAME} {''}
        //                       {profile?.NEXT_OF_KIN?.FIRST_NAME}
        //                     </h3>
        //                     <h6 className='text-muted font-bold text-[12px]'>
        //                       {profile?.NEXT_OF_KIN?.DIRECTORATE}
        //                     </h6>
        //                     <small className='text-muted font-bold text-[12px]'>
        //                       {profile?.NEXT_OF_KIN?.DEPARTMENT}
        //                     </small>
        //                     <div className='staff-id text-black font-semibold text-[14px] mt-2'>
        //                       Employee ID : FT-{profile?.NEXT_OF_KIN?.STAFF_NUMBER}
        //                     </div>
        //                   </div>
        //                 </div>
        //               </Card> */}
        //             </div>
        //           )}
        //         </div>
        //       </ExpandedDrawer>
        //       )
      }

      <ExpandedDrawerWithButton
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <FormDrawer
          title={"Who you be:"}
          tabs={
            isPending
              ? []
              : isError
              ? []
              : [
                  ...tabs,
                  {
                    title: "Approval history",
                    component: <ApprovalHistory details={details} />,
                  },
                ]
          }
        >
          {isPending ? (
            <div className="flex justify-center items-center">
              <Spinner color="default" />
            </div>
          ) : (
            <Result
              status="error"
              title={error?.response?.data?.message ?? error?.message}
              extra={null}
            />
          )}
        </FormDrawer>
      </ExpandedDrawerWithButton>
    </>
  );
}
