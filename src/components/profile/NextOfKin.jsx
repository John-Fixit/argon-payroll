import { useState } from 'react'
import NextOfKinDrawer from './profileDrawer/NextOfKinDrawer'
import { Card } from '@nextui-org/card'
import { Edit2Icon, EyeIcon } from 'lucide-react'
import { useGetProfile } from '../../API/profile'
import useCurrentUser from '../../hooks/useCurrentUser'
import { Avatar, Skeleton, Tooltip } from '@nextui-org/react'
import PreviewNextOfKinInfoRequest from './previewDrawer/PreviewNextOfKinInfoRequest'
import profileImage from '.../../../../assets/images/user_profile.png'
import { filePrefix } from '../../utils/filePrefix'
import { Tag } from 'antd'

export default function NextOfKin() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const handleEditClick = () => {
    setIsDrawerOpen(true)
  }
  const [previewRequest, setPreviewRequest] = useState(false)
  const handlePreview = () => {
    setPreviewRequest(true)
  }

  const { userData } = useCurrentUser()

  const { data: profile, isLoading } = useGetProfile({path: "/profile/get_profile", key: "profile" })



  let pending_N_O_K = profile?.PENDING_NEXT_OF_KIN ? profile?.PENDING_NEXT_OF_KIN : {}

  pending_N_O_K["isPending"] = true



  const NEXT_OF_KIN_DATA = profile?.NEXT_OF_KIN?.STAFF_FAMILY_FIRST_NAME ? profile?.NEXT_OF_KIN : pending_N_O_K


  return (
    <>
      <Card className=' md:max-h[24rem] h-full shadow-none max-w[20rem] p-4 rounded-md '>
        <div className='flex justify-between items-center gap-4 border-b relative'>
          <h2 className='text-[1rem] font-medium font-helvetica uppercase text-gray-500'>
            Next Of Kin
          </h2>
          {profile?.NEXT_OF_KIN?.HAS_PENDING_APPROVAL ? (
            <div className='flex justify-end absolute right-0 top-0'>
              <Tooltip color='default' content='Preview Request' delay={300}>
                <button
                  className='bg-gray-100 text-yellow-800 p-2 rounded-full'
                  onClick={handlePreview}
                >
                  <EyeIcon />
                </button>
              </Tooltip>
            </div>
          ) : (
            <div className='flex justify-end absolute right-0 top-0'>
              <Tooltip color='default' content='Edit' delay={300}>
                <button
                  className='bg-gray-100 p-2 rounded-full'
                  onClick={handleEditClick}
                >
                  <Edit2Icon className='w-4 h-4' />
                </button>
              </Tooltip>
            </div>
          )}
        </div>
   
        {isLoading ? (
          <div className='max-w-[300px] w-full flex items-center gap-3'>
            <div className='w-full flex flex-col gap-2'>
              <Skeleton className='h-3 w-3/5 rounded-lg' />
              <Skeleton className='h-3 w-4/5 rounded-lg' />
              <Skeleton className='h-3 w-4/5 rounded-lg' />
              <Skeleton className='h-3 w-4/5 rounded-lg' />
            </div>
          </div>
        ) : NEXT_OF_KIN_DATA?.STAFF_FAMILY_FIRST_NAME ? (
          <Card className=' mdmax-h-[24rem] shadow-none max-w[20rem] py-4 rounded-md h-auto'>
            <div className='flex flex-col text-[500] gap-4 '>
              {/* <div className='profile-img-wrap py-4 md:py-0 flex justify-center'>
                <Avatar
                   src={NEXT_OF_KIN_DATA?.FILE_NAME ? NEXT_OF_KIN_DATA?.FILE_NAME: profileImage}
                  alt='User Image'
                  className='h-24 w-24 rounded-full'
                  // className='h-36 w-36 rounded-full'
                />
              </div> */}
              <ul className=" mt-2 text-[0.9rem] flex flex-col space-y-3">
                    <li className=" flex justify-between gap-x-5 border-b  ">
                      <span className="text-gray-500 text-sm font-medium font-helvetica uppercase text-start">
                        {" "}
                        Name:
                      </span>
                      <span className="text-end pb-2 w-full  max-w-sm fontbold font-helvetica text-[0.85rem] opacity-45 hyphens-auto overflow-hidden break-words">
                        {NEXT_OF_KIN_DATA?.STAFF_FAMILY_FIRST_NAME}{" "}
                        {NEXT_OF_KIN_DATA?.STAFF_FAMILY_LAST_NAME ?? "N/A"}
                      </span>
                    </li>
                    <li className="flex justify-between gap-x-5 border-b">
                      <span className="text-gray-500 text-sm font-medium font-helvetica uppercase text-start">
                        {" "}
                        RELATIONSHIP:
                      </span>
                      <span className="text-end pb-2 w-full max-w-sm font-helvetica text-[0.85rem] opacity-45 hyphens-auto overflow-hidden break-words">
                        {NEXT_OF_KIN_DATA?.RELATIONSHIP ?? "N/A"}
                      </span>
                    </li>
                    {/* <li className="flex justify-between gap-x-5 border-b">
                      <span className="text-gray-500 text-sm font-medium font-helvetica uppercase text-start">
                        {" "}
                        EMAIL:
                      </span>
                      <span className="text-[0.9rem] text-end pb-2 w-full max-w-sm   font-helvetica text-[0.85rem] opacity-45 hyphens-auto overflow-hidden break-words">
                        {NEXT_OF_KIN_DATA?.STAFF_FAMILY_EMAIL ?? "N/A"}
                      </span>
                    </li>
                    <li className="flex justify-between gap-x-5 border-b">
                      <span className="text-gray-500 text-sm font-medium font-helvetica uppercase text-start">
                        {" "}
                        PHONE:
                      </span>
                      <span className="text-[0.9rem] text-end pb-2 w-full max-w-sm  font-helvetica text-[0.85rem] opacity-45 hyphens-auto overflow-hidden break-words">
                        {NEXT_OF_KIN_DATA?.STAFF_FAMILY_PHONE ?? "N/A"}
                      </span>
                    </li> */}
                  </ul>

          
            </div>
          </Card>
      
        ): ""}
      </Card>
      {isDrawerOpen && (
        <NextOfKinDrawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
      )}
      {previewRequest && (
        <PreviewNextOfKinInfoRequest
          isOpen={previewRequest}
          setIsOpen={setPreviewRequest}
        />
      )}
    </>
  )
}
