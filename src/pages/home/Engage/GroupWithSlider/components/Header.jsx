/* eslint-disable react/prop-types */


import { HiChevronLeft } from 'react-icons/hi'
// import { formatDistanceToNow } from 'date-fns';
import { IoClose } from 'react-icons/io5';
import { Avatar,  } from '@nextui-org/react';
import { useContext } from 'react';
import { SocketContext } from '../../../../../context/SocketContext';
import clsx from 'clsx';
// import { TbMessage2 } from 'react-icons/tb';
// import { FaWhatsapp } from 'react-icons/fa';
import { filePrefix } from '../../../../../utils/filePrefix';
import { MessageCircleMore } from 'lucide-react';

const Header = ({onClose, setshowchatContainer, selectedUserData, isGroup}) => {
  const { onlineUsers } = useContext(SocketContext)



  return (
  <>
    <div 
      className="
        bg-white 
        w-full 
        flex 
        border-b-[1px] 
        sm:px-4 
        py-3 
        px-4 
        lg:px-6 
        justify-between 
        items-center 
        shadow-sm
      "
    > 
      <div className="flex gap-2 items-center">
        <div
        onClick={setshowchatContainer}
          className="
            md:hidden 
            block 
            text-sky-500 
            hover:text-sky-600 
            transition 
            cursor-pointer
          "
        >
          <HiChevronLeft size={32} />
        </div>

          <div className='relative'>
            {

              selectedUserData?.GROUP_NAME?.toLowerCase()?.includes("support")  ? 
              <Avatar
                size="md"
                className='bg-supportIconBg  text-white' icon={<MessageCircleMore className="w-6 h-6 text-white " />}
              />

            : selectedUserData?.FILE_NAME ? (
                <Avatar
                  size="md"
                  src={
                    filePrefix + selectedUserData?.FILE_NAME
                  }
            
                />
              ) : (
                <Avatar
                  size="md"
                  name={selectedUserData?.GROUP_NAME}
                />
              )}

                  { onlineUsers?.find(
                        (el) => el?.userId === selectedUserData?.STAFF_ID
                      ) && (
                        <div>
                          <span
                            className={clsx(
                              "absolute block rounded-full ring-white  ring-1 h-[0.4rem] w-[0.4rem] md:h-[0.5rem] md:w-[0.5rem] bg-chatactive right-[0.2rem] bottom-[0.1rem] "
                            )}
                          />
                        </div>
                      )}

          </div>
        
        <div className="flex flex-col">
          <div className='text-[0.82rem] truncate'>{ isGroup   ?  selectedUserData?.name   :     (selectedUserData?.GROUP_NAME)}</div>
          <div className='text-[0.59rem] text-slate-500 flex gap-x-3 flex-wrap truncate'>
            {
              selectedUserData?.GROUP_NAME?.toLowerCase()?.includes("support") && 
              <span>CUSTOMER SUPPORT</span>
            }
          </div>
              <div className="flex gap-x-1 items-center">
                <div className="w-1 h-1 rounded-full bg-slate-400  "></div>
                <span className="text-[0.7rem] text-slate-600"> {(selectedUserData?.COUNT_MEMBERS )}  {"people"}</span>
              </div>
          {/* <div className="text-xs font-light text-neutral-500 truncate">
            {
              selectedUserData?.LAST_SEEN && (
                <>
                Last seen {formatDistanceToNow(new Date(selectedUserData?.LAST_SEEN * 1000), { addSuffix: true })}
                </>
              )
            }
          </div> */}
        </div>
      </div>

      

      <div className="flex gap-4">
        {/* {
              !isGroup  && 

              (
                <TbMessage2
                  onClick={openMessage}
                  size={32}
                  className=" 
                    cursor-pointer
                    rounded-md bg-white text-gray-500 hover:text-gray-500 outline-none hover:border-btnColor hover:border-2
                    transition 
                  "
                />
                
              )

        }
        {
              !isGroup  && 

              (
                <FaWhatsapp
                    onClick={redirectToWhatsapp}
                    size={32}
                    className=" 
                      cursor-pointer
                      rounded-md text-green-400  hover:text-gray-500 outline-none hover:border-btnColor hover:border-2
                      transition 
                    "
                  />
                
              )

        } */}
         
          <div></div>
          <div></div>

          <IoClose
            size={32}
            onClick={onClose}
            className=" 
              cursor-pointer
              rounded-md bg-white text-gray-400 hover:text-gray-500 outline-none hover:border-btnColor hover:border-2
              transition
            "
          />
        </div>



    </div>
    </>
  );
}
 
export default Header;
