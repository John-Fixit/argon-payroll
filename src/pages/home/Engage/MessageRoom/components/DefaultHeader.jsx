/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { PiUsersLight } from 'react-icons/pi';

const DefaultHeader = ({showDrawer, toggleSideBar}) => {
  return (
    <>
    <div 
      className="
        bg-white 
        w-full 
        flex
        sm:px-4 
        py-3 
        px-6 
        lg:px-8 
        justify-between 
        items-center 
        border-b
        border-gray-200
        md:hidden
      "
    > 
      <div className="flex gap-4 items-center">
      </div>
      <div className='center-profile2 cursor-pointer'  onClick={showDrawer}>
            <PiUsersLight
              size={32}
              className="   
                cursor-pointer
                rounded-md bg-white text-gray-400 hover:text-gray-500 outline-none hover:border-btnColor hover:border-2
                transition md:hidden
              "
            />
      </div>
    </div>
    </>
  )
}

export default DefaultHeader
