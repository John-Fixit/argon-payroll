/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
  } from "@nextui-org/react";
  import { Send } from "lucide-react";
  import { useContext, useState } from "react";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import { SocketContext } from "../../../../context/SocketContext";
import { sendChatMessage2Action } from "../../../../API/chat";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { useGetAllChatHistory } from "../../../../lib/query/queryandMutation";
  
  export default function WishInputDrawer({ isOpen, onOpenChange, curUser }) {
    const [message, setMessage] = useState('');
    const { pathname } = useLocation();
    const {userData} = useCurrentUser()
    const {setChatHistory, sendMessage} = useContext(SocketContext)
    const { mutateAsync: allChatHistoryCall } = useGetAllChatHistory();
  
    const handleMessage = (e)=>{
      e.preventDefault()
      setMessage(e.target.value)
  }


  const handleSubmit = async ()=>{
    const value = {
      ...userData,
      ...curUser,
      MESSAGE: message?.trim(),
      FILE: null,
    };

    try {

      if(message?.trim()){
        const res = await sendChatMessage2Action(value);
        if (res) {
        const newChat = {
          CHAT_ID: res?.data?.CHAT_ID || Date.now(),
          CHAT_TIME: Date.now() / 1000 ,
          FILE_ID: null,
          FILE_NAME: null,
          MESSAGE : message,
          MESSAGE_TYPE: 0,
          RECEIVER_ID:  curUser?.STAFF_ID,
          SENDER_ID: userData?.data?.STAFF_ID,
          STATUS: 0    
        }
          sendMessage(newChat) 
          setMessage('')
          fetchHistory()
          toast.success('Message sent successfully')
          onOpenChange()
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  const fetchHistory = async () => {
    try {

      if((pathname==='/engage/home') ){
            const res = await allChatHistoryCall(userData?.data);
            if (res) {
              const incoming = [...res.data.data, ...res.data.dept_data]
              const uniqueIds = new Set();
              const uniqueArray = incoming.filter(obj => {
                if (!uniqueIds.has(obj.STAFF_ID)) {
                  uniqueIds.add(obj.STAFF_ID);
                  return true;
                }
                return false;
              });
  
              setChatHistory([...uniqueArray]);
            }
      }
    } catch (error) {
      console.log(error);
    }
  };

    return (
      <div className="!z-[5555555555555]">
        <Modal
          size="xl"
          placement="top"
          className="!z-[5555555555555] py-5 px-4"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Wish {curUser?.LAST_NAME  + ' ' +  curUser?.FIRST_NAME}
                </ModalHeader>
                <ModalBody className="pb-6">
                <div
                        className="flex items-center  bg-xinputLight rounded cursor-pointer"
                    >
                        <Input
                        className=" !cursor-pointer hover:!cursor-pointer"
                        type="text"
                        autoFocus={false}
                        value={message}
                        onChange={(e)=>handleMessage(e)}
                        placeholder="Write Something Here..."
                        />
                    </div>
                </ModalBody>
  
                <ModalFooter className="flex justify-end">
                    <button disabled={!message} onClick={handleSubmit}  className="px-2 md:px-6  h-10  rounded-md item-center justify-center outline-none  flex space-x-2 items-center cursor-pointer bg-btnColor tracking-wider  text-white hover:shadow focus:bg-blue-600 disabled:bg-gray-200 w-fit">
                      <Send size={15} />
                      <span className="font-semibold text-sm">Send</span>
                    </button>
       
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    );
  }
  