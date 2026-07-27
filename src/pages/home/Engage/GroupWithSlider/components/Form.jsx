/* eslint-disable react/prop-types */
import { HiPaperAirplane } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { useContext, useRef, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { GrAttachment } from "react-icons/gr";
import useCurrentUser from "../../../../../hooks/useCurrentUser";
import axios from "axios";
import toast from "react-hot-toast";
import { SocketContext } from "../../../../../context/SocketContext";
import { baseURL } from "../../../../../utils/filePrefix";
import { truncateFileName } from "../../../../../utils/utitlities";
import { sendGroupMessageAction } from "../../../../../API/group-chat";

const Form = ({ groupData, isGroup }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loadingSend, setLoadingSend] = useState(false);
  const { userData } = useCurrentUser();
  const {addGroupChat, allGroupChatHistory,  setShouldScroll, reArrangeGroupChatHistory, sendGroupMessage} = useContext(SocketContext)



  const fileInputRef = useRef(null);

  const handleMessage = (e) => {
    e.preventDefault();

    if (isGroup) return;
    setMessage(e.target.value);

    // if (e?.target?.value) {
    //   sendTypingSignal({
    //     SENDER_ID: userData?.data?.STAFF_ID,
    //     RECEIVER_ID: groupData?.STAFF_ID,
    //   });
    // }
  };

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
        url: baseURL + "attachment/addChatFile",
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
    e.preventDefault();

    if (loadingSend) return;
    setLoadingSend(true)



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

        if(groupData.GROUP_NAME?.toLowerCase()?.includes("support")){
          value.is_support = 1
        }

        const res = await sendGroupMessageAction(value);
        const dataFromAllHistory = allGroupChatHistory?.find(d => d?.GROUP_ID === groupData?.GROUP_ID)
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
          MEMBERS: dataFromAllHistory?.MEMBERS ?? groupData?.MEMBERS,
          UNREAD_COUNT: groupData?.UNREAD_COUNT,
          UNREAD_CHAT: groupData?.UNREAD_CHAT,
          COUNT_MEMBERS: groupData?.COUNT_MEMBERS,
          IS_GROUP_CHAT: 1,
          RECEIVER_ID:  groupData?.GROUP_ID, 
          ROOM: groupData?.GROUP_ID,
          FIRST_NAME: userData?.data?.FIRST_NAME ?? "",
          LAST_NAME: userData?.data?.LAST_NAME  ?? ""
        }

        groupData.MEMBERS = dataFromAllHistory?.MEMBERS ?? groupData?.MEMBERS;
        // console.log(newChat)
          addGroupChat(newChat)
          sendGroupMessage(newChat) 
          setMessage('')
          setFile(null)
          setShouldScroll(true)
          setLoadingSend(false)
          reArrangeGroupChatHistory({...groupData, LAST_CHAT: newChat?.MESSAGE  })
        }
      }
    } catch (error) {
      console.log(error);
      setLoadingSend(false)
    }
  };



  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset input
    }
  };

  return (
    <div className="border-t">
      <div className="p-1 py-2">
        {file && file?.type?.includes("application") ? (
          <div className="relative max-w-[10rem] h-10 ">
            <div alt="" className="border  py-2 px-1 shadow-sm">
              <span>{truncateFileName(file?.name)}</span>
            </div>

            <div className="absolute -right-3 top-0">
              <CiCircleRemove
                size={22}
                strokeWidth={2.4}
                className="text-red-400 cursor-pointer"
                onClick={() =>{
                  URL.revokeObjectURL(file)
                  setFile(null)
                } }
              />
            </div>
          </div>
        ) : (
          file &&
          file?.type?.includes("image") && (
            <div className="relative w-24 h-20">
              <img
                className="w-20 h-20"
                alt=""
                src={URL.createObjectURL(file)}
              />
              <CiCircleRemove
                size={22}
                strokeWidth={2.4}
                className="text-red-400 absolute -right-4 top-0 cursor-pointer"
                onClick={() => setFile(null)}
              />
            </div>
          )
        )}
      </div>


      <div
        className="
          py-4 
          px-4 
          bg-white 

          flex 
          items-center 
          gap-2 
          lg:gap-4 
          w-full
        "
      >
        <label htmlFor="file" className=" cursor-pointer" onClick={handleClick}>
          <GrAttachment size={25} className="text-sky-500" />
        </label>
        <input
          type="file"
          className="hidden"
          accept=".jpg, .png, .jpeg, application/*"
          id="file"
          ref={fileInputRef}
          onChange={(e) => setFile(e.target.files[0])}
        />

        <form
          onSubmit={onSubmit}
          className="flex items-center gap-2 lg:gap-4 w-full"
        >
          <MessageInput
            id="message"
            value={message}
            onChange={(e) => handleMessage(e)}
            required
            placeholder="Write a message"
          />
          <button
            type="submit"
            disabled={loadingSend || (!message.trim() && !file)}
            className=" disabled:bg-sky-200 
              rounded-full 
              p-2 
              bg-sky-500 
              cursor-pointer 
              hover:bg-sky-600 
              transition
            "
          >
            <HiPaperAirplane size={18} className="text-white" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
