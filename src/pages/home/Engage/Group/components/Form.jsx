
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
import { sendGroupMessageAction } from "../../../../../API/group-chat";
import { baseURL } from "../../../../../utils/filePrefix";
  
  
  
  const   Form = ({groupData}) => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { userData } = useCurrentUser();
    const {addGroupChat, setShouldScroll, reArrangeGroupChatHistory, sendGroupMessage} = useContext(SocketContext)



    const handleMessage = (e)=>{
      e.preventDefault()
      setMessage(e.target.value)

      if(e?.target?.value){
        // {senderId: typingObj?.SENDER_ID,  receiverId: typingObj?.RECEIVER_ID,}
        // sendTypingSignal({
        //   SENDER_ID: userData?.data?.STAFF_ID,
        //   RECEIVER_ID: groupData?.STAFF_ID
        // })
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
        url: baseURL +"attachment/addChatFile",
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
    if (loading) return;
    setLoading(true)
    let fileUrl;
    if (file) {
      fileUrl = await upload();
    }
    
    const value = {
      "sender_id": userData?.data?.STAFF_ID,  
      "message": message, 
      "file_id": fileUrl?.file_url_id || '',
      "group_id": groupData?.GROUP_ID   
    };

    try {

      if(fileUrl || message?.trim()){
        const res = await sendGroupMessageAction(value);
        if (res) {
        const newChat = {
          CHAT_ID: res?.data?.CHAT_ID || Date.now(),
          CHAT_TIME: Date.now() / 1000,
          FILE_ID: fileUrl?.file_url_id,
          FILE_NAME: fileUrl?.file_url,
          MESSAGE : message,
          LAST_CHAT: message,
          LAST_CHAT_FILE_NAME: fileUrl?.file_url,
          MESSAGE_TYPE: fileUrl?.file_url_id ? 1 : 0,
          SENDER_ID: userData?.data?.STAFF_ID,
          STATUS: 0,
          GROUP_ID: groupData?.GROUP_ID,
          GROUP_NAME: groupData?.GROUP_NAME,
          MEMBERS: groupData?.MEMBERS,
          UNREAD_COUNT: groupData?.UNREAD_COUNT,
          COUNT_MEMBERS: groupData?.COUNT_MEMBERS,
          IS_GROUP_CHAT: 1,
          RECEIVER_ID:  groupData?.GROUP_ID, 
          ROOM: groupData?.GROUP_ID  
        }
          addGroupChat(newChat)
          sendGroupMessage(newChat) 
          setMessage('')
          setFile(null)
          setShouldScroll(true)
          setLoading(false)
          reArrangeGroupChatHistory({...groupData, LAST_CHAT: newChat?.MESSAGE  })
        }
      }

    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  
  
  
    return ( 
  
      <div className="border  m-6 mx-0 rounded-lg bg-white stcky bottom-2 w-full">
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
              <GrAttachment size={15} className="text-slate-500"  />
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
            className="flex items-center gap-2 lg:gap-4  flex-1"
          >
            <MessageInput 
              id="message"
              value={message}
              onChange={(e)=>handleMessage(e)}
              required
              placeholder="Write a message"
            />
            <button 
            disabled={ loading || (!(message?.trim()) && !file) }
              type="submit" 
              className="
                rounded-full 
                p-2 
                bg-slate-600 
                cursor-pointer 
                hover:bg-slate-600 
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