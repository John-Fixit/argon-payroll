/* eslint-disable react/prop-types */


import { HiChevronLeft } from 'react-icons/hi'
// import Avatar from '../../../../components/Avatar';
import { formatDistanceToNow } from 'date-fns';
import { IoClose } from 'react-icons/io5';
import { Avatar, cn } from '@nextui-org/react';
import { useContext } from 'react';
import { SocketContext } from '../../../../context/SocketContext';
import clsx from 'clsx';
import { TbMessage2 } from 'react-icons/tb';
import { FaWhatsapp } from 'react-icons/fa';
import { filePrefix } from '../../../../utils/filePrefix';
import { MessageCircleMore } from 'lucide-react';
// import { useMemo, useState } from "react";







const Header = ({onClose, setshowchatContainer, selectedUserData, openMessage, isGroup}) => {
  const { onlineUsers } = useContext(SocketContext)
  // const statusText = useMemo(() => {
  //   if (conversation.isGroup) {
  //     return `${conversation.users.length} members`;
  //   }

  //   return isActive ? 'Active' : 'Offline'
  // }, [conversation, isActive]);








//   function isValidTimestamp(_timestamp) {
//     const newTimestamp = new Date(_timestamp).getTime();
//     return isNumeric(newTimestamp);
// }

// function isNumeric(n) {
//     return !isNaN(parseFloat(n)) && isFinite(n);
// }


//   console.log(isValidTimestamp(selectedUserData?.LAST_SEEN))




  const redirectToWhatsapp = () => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (isMobile) {
      window.open("whatsapp://", "_blank");
    } else {
      window.open("https://web.whatsapp.com/", "_blank");
    }
  };





  // const filePrefix = "http://lamp3.ncaa.gov.ng/pub/"




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
        
          {/* <Avatar  big/> */}

          <div className='relative'>
            {

              selectedUserData?.LAST_NAME === "Support Team" ? 
              <Avatar
                size="md"
                className='bg-supportIconBg  text-white' icon={<MessageCircleMore className="w-6 h-6 text-white " />}
              />


            // selectedUserData?.FILE_NAME?.includes("http") ? (
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
                  
                  name={selectedUserData?.FIRST_NAME?.trim()[0]}
                  
                  // title={user?.LAST_NAME + " " + user?.FIRST_NAME}
                />
              )}

                  { onlineUsers?.find(
                        (el) => el?.userId === selectedUserData?.STAFF_ID
                      ) && (
                        <div>
                          <span
                            className={clsx(
                              "absolute block rounded-full ring-white  ring-1 h-[0.4rem] w-[0.4rem] md:h-[0.5rem] md:w-[0.5rem] bg-chatactive right-[0.2rem] bottom-[0.1rem] "

                              // fromChat &&  bigger ? ' ring-1 h-[0.4rem] w-[0.4rem] md:h-[0.5rem] md:w-[0.5rem] bg-chatactive right-[0.22rem] bottom-[0.45rem]' :

                              // fromChat && big ? ' ring-1 h-[0.4rem] w-[0.4rem] md:h-[0.5rem] md:w-[0.5rem] bg-chatactive right-[0.075rem] bottom-[0.4rem]' :
                            )}
                          />
                        </div>
                      )}

          </div>
        
        <div className="flex flex-col">
          <div className='text-[0.82rem] truncate'>{ isGroup   ?  selectedUserData?.name   :     (selectedUserData?.LAST_NAME + " " + selectedUserData?.FIRST_NAME)}</div>
          <div className='text-[0.59rem] text-slate-500 flex gap-x-3 flex-wrap truncate'>
            {selectedUserData?.DEPARTMENT || selectedUserData?.DEPARTMENT_NAME}
            <div className='flex gap-x-1 items-center'>
              <div className={cn('w-1 h-1 rounded-full bg-slate-500', selectedUserData?.DIRECTORATE || selectedUserData?.DESIGNATION_NAME ? "block" : "hidden" )}></div>
              <span>{isGroup ? 'Ada, Siji and 27 others'     :  (selectedUserData?.DIRECTORATE || selectedUserData?.DESIGNATION_NAME)}</span>
            </div>
          </div>
          <div className="text-xs font-light text-neutral-500 truncate">
            {
              selectedUserData?.LAST_SEEN && (
                <>
                {/* Last seen today at {format(new Date(selectedUserData?.LAST_SEEN), 'paa')} */}
                Last seen {formatDistanceToNow(new Date(selectedUserData?.LAST_SEEN * 1000), { addSuffix: true })}
                {/* {format(new Date(selectedUserData?.LAST_SEEN * 1000), 'paa')} */}
                </>

              )
            }
          </div>
        </div>
      </div>

      

      <div className="flex gap-4">


        {
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

        }
         
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
