/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { 
    HiPaperAirplane, 
  } from "react-icons/hi2";
  import MessageInput from "../../../rightMenu/components/MessageInput";
  import axios from "axios";
  import { useContext, useState } from "react";
  import { CiCircleRemove } from "react-icons/ci";
  import { GrAttachment } from "react-icons/gr";
import useCurrentUser from "../../../../../hooks/useCurrentUser";
import { SocketContext } from "../../../../../context/SocketContext";
import toast from "react-hot-toast";
import { sendChatMessage2Action } from "../../../../../API/chat";
import { baseURL } from "../../../../../utils/filePrefix";
  
  const   Form = ({mate}) => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const { userData } = useCurrentUser();
    const {addChat, setShouldScroll, reArrangeChatHistory, sendMessage, sendTypingSignal} = useContext(SocketContext)

    const handleMessage = (e)=>{
      e.preventDefault()
      setMessage(e.target.value)

      if(e?.target?.value){
        sendTypingSignal({
          SENDER_ID: userData?.data?.STAFF_ID,
          RECEIVER_ID: mate?.STAFF_ID
        })
      }
  }


  const upload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await uploadFile(formData);
    if (res) {
      return res;
    }
  };


  const uploadFile = async (formData) => {
    try {
      const res = await axios({
        method: "post",
        url:  baseURL + "attachment/addChatFile",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          token: userData?.token,
        },
      });

      if (res) {
        return res.data;
      }
    } catch (err) {
      if (
        err?.response?.data?.message !==
        "There was an error uploading your file"
      )
        toast.error(err?.response?.data?.message);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault()
    let fileUrl;
    if (file) {
      fileUrl = await upload();
    }
    const value = {
      ...userData,
      ...mate,
      MESSAGE: !message?.trim() ? null : message?.trim(),
      FILE: fileUrl?.file_url_id,
    };

    try {

      if(fileUrl || message?.trim()){
        const res = await sendChatMessage2Action(value);
        if (res) {

        const newChat = {
          CHAT_ID: res?.data?.CHAT_ID || Date.now(),
          CHAT_TIME: Date.now() / 1000,
          FILE_ID: fileUrl?.file_url_id,
          FILE_NAME: fileUrl?.file_url,
          MESSAGE : message,
          MESSAGE_TYPE: fileUrl?.file_url_id ? 1 : 0,
          RECEIVER_ID:  mate?.STAFF_ID,
          SENDER_ID: userData?.data?.STAFF_ID,
          STATUS: 0    
        }
          addChat(newChat)
          sendMessage(newChat)
          setMessage('')
          setFile(null)
          setShouldScroll(true)
          reArrangeChatHistory(mate)
        }
      }

    } catch (error) {
      console.log(error);
    }


  };
  
    return ( 
      <div className="border  m-6 mx-10 rounded-lg bg-white">
      <div className={`bg-white  rounded-lg ${file && 'p-2'}`}>
        {file &&  file?.type?.includes('application') ? (
               <div className="relative w-fit h-10">
                <div alt="" className="border py-2 px-1 shadow-sm">
                <span>{file?.name}</span>
              </div>
               <CiCircleRemove
                 size={22}
                 strokeWidth={2.4}
                 className="text-red-400 absolute -right-4 top-0 cursor-pointer"
                 onClick={() => setFile(null)}
               />
             </div>
        ) : file && file?.type?.includes('image') && (
          
          <div className="relative w-20 h-10">
            <img className="w-20 h-20" alt="" src={URL.createObjectURL(file)} />
            <CiCircleRemove
              size={22}
              strokeWidth={2.4}
              className="text-red-400 absolute -right-4 top-0 cursor-pointer"
              onClick={() => setFile(null)}
            />
          </div>
        )}
      </div>
        <div 
          className="
            py-4 
            px-4 
            bg-white 
            rounded-lg
            flex 
            items-center 
            gap-2 
            lg:gap-4 
            w-full
            h-full
          "
        >
            <label htmlFor="file" className=" cursor-pointer">
              <GrAttachment size={15} className="text-sky-500"  />
            </label>
            <input
          type="file"
          className="hidden"
          accept=".jpg, .png, .jpeg, application/*"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
  
          <form 
            onSubmit={onSubmit} 
            className="flex items-center gap-2 lg:gap-4 w-full"
          >
            <MessageInput 
              id="message"
              value={message}
              onChange={(e)=>handleMessage(e)}
              required
              placeholder="Write a message"
            />
            <button 
            disabled={!(message?.trim()) && !file }
              type="submit" 
              className="
                rounded-full 
                p-2 
                bg-sky-600 
                cursor-pointer 
                hover:bg-sky-600 
                transition
                "
                >
              <HiPaperAirplane
                size={18}
                className="text-white"
              />
            </button>
          </form>
        </div>
  
      </div>
    );
  }
   
  export default Form;