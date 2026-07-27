/* eslint-disable react/prop-types */
import { Spinner } from '@nextui-org/react'
import useCurrentUser from '../../../hooks/useCurrentUser'
import { useGetProfile } from '../../../API/profile'
import { useGetRequest_Detail } from '../../../API/api_urls/my_approvals'
import AttachmentDetailsApproval from '../../core/approvals/AttachmentDetailsApproval'
import NoteDetailsApproval from '../../core/approvals/NoteDetailsApproval'
import ExpandedDrawerWithButton from '../../modals/ExpandedDrawerWithButton'
import FormDrawer from '../../payroll_components/FormDrawer'
import ApprovalHistory from '../../../pages/Approval/ApprovalHistory'
import { Result } from 'antd'
import BioDataDetail from '../../../pages/Approval/BioDataDetail'

export default function PreviewResindetialInfoRequest({ isOpen, setIsOpen }) {
  const { userData } = useCurrentUser()
  const { data: profile } = useGetProfile({ user: userData?.data, path: "/profile/get_profile" })


  const { data, isPending, isError, error } = useGetRequest_Detail(profile?.RESIDENTIAL_INFORMATION?.PENDING_REQUEST_ID);

  const request_detail = data?.data?.data



  const details = {
    data: request_detail?.data,
    approvers: request_detail?.approvers,
    notes: request_detail?.notes,
    attachments: request_detail?.attachments,
    isLoading: isPending,
    isError: isError
  }



  const tabs = [
    {
      title: "Residential Information",
      component:  <BioDataDetail
      title={"Residential Information"}
      details={details}
      role={'request'}
    />,
    },
    {
      title: "Attachment",
      component: <AttachmentDetailsApproval details={details} />,
    },
    { title: "Note", component: <NoteDetailsApproval details={details} /> },
  ]

  return (
    <>
    {
      // (
      // <ExpandedDrawer isOpen={isOpen} onClose={setIsOpen}>
      //   <div className='flex hfull gap-2 flex-col md:flex-row overflow-y-scrol'>
      //     <div className='flex md:min-h-screen flex-col  w-full md:w-60 bg-chatsidebar    '>
      //       <h3 className=' text-center text-gray-400 border-gray-400 border-b-2 p-2'>
      //         Residential Information
      //       </h3>
      //     </div>
      //     {isLoading ? (
      //       <div className='max-w-[300px] w-full flex items-center gap-3'>
      //         <div className='w-full flex flex-col gap-2'>
      //           <Skeleton className='h-3 w-3/5 rounded-lg' />
      //           <Skeleton className='h-3 w-4/5 rounded-lg' />
      //           <Skeleton className='h-3 w-4/5 rounded-lg' />
      //           <Skeleton className='h-3 w-4/5 rounded-lg' />
      //           <Skeleton className='h-3 w-4/5 rounded-lg' />
      //           <Skeleton className='h-3 w-4/5 rounded-lg' />
      //           <Skeleton className='h-3 w-4/5 rounded-lg' />
      //         </div>
      //       </div>
      //     ) : (
      //       <div className=' wfull w-[60%] mx-auto grid p-4  gap-8'>
      //         <Card className='bg-white w-full fontOswald rounded-md shadow-md p-4  hfull '>
      //           <ul className=' mt-2 text-[15px] flex flex-col space-y-3'>
      //             <li className='grid grid-cols-2'>
      //               <span className='text-[#444e4e] font-medium font-helvetica uppercase'>
      //                 {' '}
      //                 Address:
      //               </span>
      //               <span className='text-[#888] text-end pb-2 border-b-2 w-full max-w-sm  font-profileFontSize '>
      //                 {profile?.RESIDENTIAL_INFORMATION?.HOME_ADDRESS}
      //               </span>
      //             </li>

      //             <li className='grid grid-cols-2'>
      //               <span className='text-[#444e4e] font-medium font-helvetica uppercase'>
      //                 State:
      //               </span>
      //               <span className='text-[#888] text-end pb-2 border-b-2 w-full max-w-sm  font-profileFontSize '>
      //                 {profile?.RESIDENTIAL_INFORMATION?.HOME_STATE}
      //               </span>
      //             </li>
      //             <li className='grid grid-cols-2'>
      //               <span className='text-[#444e4e] font-medium font-helvetica uppercase'>
      //                 LGA:
      //               </span>
      //               <span className='text-[#888] text-end pb-2 border-b-2 w-full max-w-sm  font-profileFontSize '>
      //                 {profile?.RESIDENTIAL_INFORMATION?.HOME_LGA}
      //               </span>
      //             </li>
      //           </ul>
      //         </Card>
      //         {/* <Card className='bg-white w-full  fontOswald rounded-md shadow-md p-4  hfull '>
      //           <ul className=' mt-2 text-[15px] flex flex-col space-y-3'>
      //             <li className='grid grid-cols-2'>
      //               <span className='text-[#444e4e] font-medium font-helvetica uppercase'>
      //                 {' '}
      //                 Address:
      //               </span>
      //               <span className='text-[#888] text-end pb-2 border-b-2 w-full max-w-sm  font-profileFontSize '>
      //                 {profile?.RESIDENTIAL_INFORMATION?.HOME_ADDRESS}
      //               </span>
      //             </li>

      //             <li className='grid grid-cols-2'>
      //               <span className='text-[#444e4e] font-medium font-helvetica uppercase'>
      //                 State:
      //               </span>
      //               <span className='text-[#888] text-end pb-2 border-b-2 w-full max-w-sm  font-profileFontSize '>
      //                 {profile?.RESIDENTIAL_INFORMATION?.HOME_STATE}
      //               </span>
      //             </li>
      //             <li className='grid grid-cols-2'>
      //               <span className='text-[#444e4e] font-medium font-helvetica uppercase'>
      //                 LGA:
      //               </span>
      //               <span className='text-[#888] text-end pb-2 border-b-2 w-full max-w-sm  font-profileFontSize '>
      //                 {profile?.RESIDENTIAL_INFORMATION?.HOME_LGA}
      //               </span>
      //             </li>
      //           </ul>
      //         </Card> */}
      //       </div>
      //     )}
      //   </div>
      // </ExpandedDrawer>

      // )
    }
    <ExpandedDrawerWithButton isOpen={isOpen} onClose={()=>setIsOpen(false)}>
        <FormDrawer title={"Who you be:"} tabs={
          isPending?[]:
          isError?[]:
          [...tabs,
            { title: "Approval history", component: <ApprovalHistory  details={details}  /> },

        ]}>
          {
            isPending ? (
          <div className="flex justify-center items-center">
          <Spinner color="default" />
        </div>
            ): (
              <Result
              status="error"
              title={error?.response?.data?.message ?? error?.message}
              extra={null}
            />
            )
          }
        </FormDrawer>

      </ExpandedDrawerWithButton>
    </>
  )
}
