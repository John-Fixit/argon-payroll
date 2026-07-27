/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */


import { Button } from 'antd';
import { useContext, useEffect, useRef, useState} from 'react';
import useCurrentUser from '../../../../hooks/useCurrentUser';
import { SocketContext } from '../../../../context/SocketContext';
import { sendChatMessage2Action } from '../../../../API/chat';

const BirthdayModal = ({uiItems, setShowDropDown, showDropDown, mate}) => {
  const { userData } = useCurrentUser();
  const {addChat, setShouldScroll, reArrangeChatHistory, sendMessage} = useContext(SocketContext)
  const dropdown = useRef(null);
  const [loading, setLoading] = useState(false)




// close on click outside or on sub link clicked
    useEffect(() => {
    const clickHandler = ({ target }) => {

          if (!dropdown.current) return;
          if (
          !dropdown.current.contains(target) 
          )
          return;
          setShowDropDown();
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
    });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!showDropDown || keyCode !== 27) return;
      setShowDropDown();
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });



  const onSubmit = async (e) => {
    e?.preventDefault()
    setLoading(true)

    const message = "Happy Birthday to you!";
    // const message = "Happy Birthday to you! 🎂🎁🎉 ";

    const value = {
      ...userData,
      ...mate,
      MESSAGE: message,
      FILE: null,
    };

    try {

        const res = await sendChatMessage2Action(value);
        if (res) {
          setShowDropDown()

        const newChat = {
          CHAT_ID: res?.data?.CHAT_ID || Date.now(),
          CHAT_TIME: Date.now() / 1000,
          FILE_ID: null,
          FILE_NAME: null,
          MESSAGE : message,
          MESSAGE_TYPE: 0,
          RECEIVER_ID:  mate?.STAFF_ID,
          SENDER_ID: userData?.data?.STAFF_ID,
          STATUS: 0    
        }

          addChat(newChat)
          sendMessage(newChat) 
          setShouldScroll(true)
          reArrangeChatHistory(mate)
        }


    } catch (error) {
      console.log(error);
    }finally {
      setLoading(false)
    }


  };


















const wishBirthday = ()=>{
  onSubmit()
}




    
  return (
    <div className="relative flex items-start justify-center h-full w-full ">
    <div
        onClick={() => setShowDropDown()}
        className={`fixed top-0 flex items-start justify-center h-full w-full z-[4] cursor-pointer   ${
            showDropDown ? "block" : "hidden"
        } `}
      ></div> 
      {/* bg-chatoverlay  */}



      {
        showDropDown && (
          
          <div
            ref={dropdown}
            // onFocus={() => setShowDropDown(true)}
            onBlur={() => console.log('here')}
            className={`fixed  z-[5]  flex w-[25rem]  h-[18rem] overflow-clip  flex-col border rounded-3xl shadow-default  ${
              showDropDown === true ? 'block' : 'hidden'
            }`}
          >
            <ul className="flex flex-col dark:border-gray-500 px-4 py-10">

                  <li  className=' group py-1 flex items-center px-5 w-full  duration-200 ease-in-out' >
                        <div className='flex flex-col text-gray-700 gap-8'>
                            <div><span className='!text-gray-700 text-2xl font-Lato'>Wish {mate?.LAST_NAME +' '+ mate?.FIRST_NAME} a <br /> happy birthday</span></div>
                            <div>
                                <Button disabled={loading}  size='large' className='bg-[#0096d7] text-white px-8 border-transparent' onClick={onSubmit}>Send</Button>
                            </div>
                        </div>
                  </li>

            
             
            </ul>

                
                <img src="/assets/images/birthdaycakes.png" className='text-red-300 absolute -right-[7.5rem] -bottom-6  h-52' alt="" />
            
          </div>
        )
      }
    </div>
  )
}

export default BirthdayModal

