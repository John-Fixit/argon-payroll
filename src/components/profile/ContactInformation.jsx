import { useState } from 'react'
// import Card from './Card'
import ContactInformationDrawer from './profileDrawer/ContactInformationDrawer'
import useCurrentUser from '../../hooks/useCurrentUser'
import { useGetProfile } from '../../API/profile'
import { Skeleton, Tooltip } from '@nextui-org/react'
import { Edit2Icon, EyeIcon } from 'lucide-react'
import PreviewContactInfoRequest from './previewDrawer/PreviewContactInfoRequest'

export default function ContactInformation() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [previewRequest, setPreviewRequest] = useState(false)

  const handleEditClick = () => {
    setIsDrawerOpen(true)
  }

  const handlePreview = () => {
    setPreviewRequest(true)
  }

  const { userData } = useCurrentUser()
  const { data: profile, isLoading } = useGetProfile({ user: userData?.data, path: "/profile/get_profile" })

  return (
    <>
      <div className={`bg-white rounded-md p-4  h-full `}>
        <div className='flex justify-between border-b items-center gap-4 pb-3'>
          <h2 className='text-[1rem] font-medium font-helvetica uppercase text-start text-gray-500'>
            Contact Information
          </h2>

          {profile?.CONTACT_INFORMATION?.HAS_PENDING_APPROVAL ? (
            <div className='flex justify-end '>
              <Tooltip color='default' content='Preview Request' delay={300}>
                <button
                  className='bg-blue-100 text-yellow-800 p-2 rounded-full'
                  onClick={handlePreview}
                >
                  <EyeIcon className='text-blue-400' />
                </button>
              </Tooltip>
            </div>
          ) : (
            <div className='flex justify-end '>
              <Tooltip color='default' content='Edit' delay={300}>
                <button
                  className='bg-blue-100 p-2 rounded-full'
                  onClick={handleEditClick}
                >
                  <Edit2Icon className='w-4 h-4 text-blue-400' />
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
        ) : (
          <ul className=' text-[15px]  mt-2 flex flex-col space-y-3'>
            <li className='grid grid-cols-2 border-b'>
              <span className='text-gray-500 text-sm font-medium font-helvetica uppercase text-start'>
                {' '}
                Official Email:
              </span>
              <span className='h-auto hyphens-auto text-end break-words pb-2 w-full max-w-sm font-helvetica text-[0.85rem] opacity-45'>
                {profile?.CONTACT_INFORMATION?.EMAIL ?? "N/A"}
              </span>
            </li>
            <li className='grid grid-cols-2 border-b '>
              <span className='text-gray-500 text-sm font-medium font-helvetica uppercase text-start'>
                {' '}
                Alternative Email:
              </span>
              <span className='h-auto hyphens-auto break-words text-end pb-2 w-full max-w-sm  font-helvetica text-[0.85rem] opacity-45'>
                {profile?.CONTACT_INFORMATION?.OTHER_EMAIL ?? "N/A"}
              </span>
            </li>
            <li className='grid grid-cols-2 border-b '>
              <span className='text-gray-500 text-sm font-medium font-helvetica uppercase text-start'>
                Primary Phone:
              </span>
              <span className='h-auto break-words text-end pb-2 w-full max-w-sm  font-helvetica text-[0.85rem] opacity-45'>
                {profile?.CONTACT_INFORMATION?.PHONE ?? "N/A"}
              </span>
            </li>
            <li className='grid grid-cols-2 border-b '>
              <span className='text-gray-500 text-sm font-medium font-helvetica uppercase text-start'>
                {' '}
                Alternative Phone:
              </span>
              <span className='h-auto break-words text-end pb-2 w-full max-w-sm  font-helvetica text-[0.85rem] opacity-45'>
                {profile?.CONTACT_INFORMATION?.OTHER_PHONES ?? "N/A"}
              </span>
            </li>
          </ul>
        )}
      </div>

      {isDrawerOpen && (
        <ContactInformationDrawer
          isOpen={isDrawerOpen}
          setIsOpen={setIsDrawerOpen}
        />
      )}
      {previewRequest && (
        <PreviewContactInfoRequest
          isOpen={previewRequest}
          setIsOpen={setPreviewRequest}
        />
      )}
    </>
  )
}
