/* eslint-disable react/prop-types */
import { Avatar, Button } from '@nextui-org/react'
import ExpandedDrawer from '../../../../../components/modals/ExpandedDrawer'
import { filePrefix } from '../../../../../utils/filePrefix'

export default function PreviewEventMember({
  isOpen,
  setIsOpen,
  memberDetails,
  setCurUser,
  openDrawer,
}) {
  const openWishDrawer = () => {
    setCurUser(memberDetails)
    openDrawer()
  }

  return (
    <>
      <ExpandedDrawer isOpen={isOpen} onClose={setIsOpen}>
        <div className='bg-[#f5f7fa] min-h-screen  p-10'>
          <h4 className='header_h3 text-2xl text-center'> Full Information</h4>

          {memberDetails ? (
            <div className='bg-white max-w-[35rem] mx-auto mt-16 text-[0.9rem] shadow-md py-4 rounded border'>
              <div className='flex flex-col text-center items-center gap-2'>
                <Avatar
                  src={
                    memberDetails?.FILE_NAME
                      ? filePrefix + memberDetails?.FILE_NAME
                      : '/assets/images/placeholder.jpg' ||
                        '/assets/images/placeholder.jpg'
                  }
                  alt='User Image'
                  className='h-24 w-24 rounded-full'
                />
                <div>
                  <p>
                    <span className='text-[#444e4e] font-[500] text-[0.9rem] capitalize'>
                      Name:
                    </span>{' '}
                    <span className='text-[#888888] text-end font-profileFontSize'>
                      {memberDetails?.FIRST_NAME} {''}{' '}
                      {memberDetails?.LAST_NAME}
                    </span>
                  </p>
                  <p>
                    <span className='text-[#444e4e] font-[500] text-[0.9rem] capitalize'>
                      Department:
                    </span>{' '}
                    <span className='text-[#888888] text-end font-profileFontSize'>
                      {memberDetails?.DEPARTMENT_NAME}
                    </span>
                  </p>
                  <p>
                    <span className='text-[#444e4e] font-[500] text-[0.9rem] capitalize'>
                      Staff Id:
                    </span>{' '}
                    <span className='text-[#888888] text-end font-profileFontSize'>
                      {memberDetails?.STAFF_ID}
                    </span>
                  </p>

                  <Button
                    fullWidth
                    color='primary'
                    className='bg-blue-500'
                    radius='full'
                    size='md'
                    onClick={openWishDrawer}
                  >
                    Congratulation
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <p>No member details available</p>
          )}
        </div>
      </ExpandedDrawer>
    </>
  )
}
