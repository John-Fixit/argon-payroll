/* eslint-disable react/prop-types */
import { HiPaperAirplane } from "react-icons/hi2";
import MessageInput from "./MessageInput";
// import { useForm } from "react-hook-form";
// import axios from "axios";
import { useContext, useRef, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { GrAttachment } from "react-icons/gr";
import { sendChatMessage2Action } from "../../../../API/chat";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import axios from "axios";
import toast from "react-hot-toast";
import { SocketContext } from "../../../../context/SocketContext";
import { baseURL } from "../../../../utils/filePrefix";
import { truncateFileName } from "../../../../utils/utitlities";

const Form = ({ mate, isGroup }) => {
  // const [assetImageList, setAssetImageList] = useState([]);
  // const [fileAssetList, setFileAssetList] = useState([]);

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loadingSend, setLoadingSend] = useState(false);
  const { userData } = useCurrentUser();
  const {
    addChat,
    setShouldScroll,
    reArrangeChatHistory,
    sendMessage,
    sendTypingSignal,
  } = useContext(SocketContext);
  const fileInputRef = useRef(null);

  // console.log(file, file?.name)

  // useRef for the update i.e push
  // const list = useRef([]);

  // const fileList = useRef([]);
  // const fileListType = useRef([]);

  // const {
  //   register,
  //   handleSubmit,
  //   setValue,
  //   getValues,
  //   formState: { errors },
  // } = useForm({
  //   defaultValues: {
  //     message: " ",
  //   },
  // });

  const handleMessage = (e) => {
    e.preventDefault();


    if (isGroup) return;





    // console.log(e.target.value, message)
    setMessage(e.target.value);

    if (e?.target?.value) {
      // {senderId: typingObj?.SENDER_ID,  receiverId: typingObj?.RECEIVER_ID,}
      sendTypingSignal({
        SENDER_ID: userData?.data?.STAFF_ID,
        RECEIVER_ID: mate?.STAFF_ID,
      });
    }
  };

  const upload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    // console.log(formData, file)
    const res = await uploadFile(formData);
    if (res) {
      // console.log(res)
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

  // const formatDate = (currentDate)=>{
  // // Extract year, month, day, hour, minute, second, and millisecond values
  // let year = currentDate.getFullYear();
  // let month = String(currentDate.getMonth() + 1).padStart(2, '0');
  // let day = String(currentDate.getDate()).padStart(2, '0');
  // let hours = String(currentDate.getHours()).padStart(2, '0');
  // let minutes = String(currentDate.getMinutes()).padStart(2, '0');
  // let seconds = String(currentDate.getSeconds()).padStart(2, '0');
  // let milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0');

  // // Construct the desired format
  // let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;

  //   return formattedDate
  // }

  const onSubmit = async (e) => {
    e.preventDefault();

    if (loadingSend) return;

    // setValue("message", "", { shouldValidate: true });
    // console.log(data);
    setLoadingSend(true)

    if (isGroup) return;

    let fileUrl;

    if (file) {
      // console.log(file)
      fileUrl = await upload();
      // console.log(fileUrl);
    }

    // const value = {
    //   ...userData,
    //   ...mate,
    //   MESSAGE: data?.message?.trim() === "" ?  data?.message?.trim() : null ,
    //   FILE: fileUrl?.file_url_id,
    // };
    const value = {
      ...userData,
      ...mate,
      MESSAGE: !message?.trim() ? null : message?.trim(),
      FILE: fileUrl?.file_url_id,
    };

    try {
      if (fileUrl || message?.trim()) {
        const res = await sendChatMessage2Action(value);
        if (res) {
          // console.log(res, file);

          const newChat = {
            CHAT_ID: res?.data?.CHAT_ID || Date.now(),
            CHAT_TIME: Date.now() / 1000,
            FILE_ID: fileUrl?.file_url_id,
            FILE_NAME: fileUrl?.file_url,
            MESSAGE: message,
            MESSAGE_TYPE: fileUrl?.file_url_id ? 1 : 0,
            RECEIVER_ID: mate?.STAFF_ID,
            SENDER_ID: userData?.data?.STAFF_ID,
            STATUS: 0,
          };

          addChat(newChat);
          sendMessage(newChat); //coming soon
          setMessage("");
          setFile(null);
          setShouldScroll(true);
          reArrangeChatHistory(mate);
          setLoadingSend(false)
        }
      }
    } catch (error) {
      console.log(error);
      setLoadingSend(false)
    }
  };

  // const removeImage = async (index) => {
  //   let newList = assetImageList.filter((item, i) => i !== index);
  //   setAssetImageList([...newList]);
  // };

  // const removeFile = async (index, name) => {
  //   let newList = fileAssetList.filter((itm, i) => i !== index);

  //   let latest = fileListType.current.filter((item) => item !== name);

  //   fileListType.current = [...latest];
  //   setFileAssetList([...newList]);
  // };

  // img creation
  // async function handleImageUpload(e) {
  //   for (let index = 0; index < e.target.files.length; index++) {
  //     let reader = new FileReader();
  //     reader.onload = (e) => {
  //       // setTimeout(async () => {
  //         if (e.target.result) {
  //           // console.log(e.target.result)
  //           list.current.push(e.target.result);
  //           setAssetImageList([...assetImageList ,...list.current]);
  //         }
  //       // }, 2000);
  //     };
  //     reader.readAsDataURL(e.target.files[index]);
  //   }
  //   list.current = [];
  // }

  // file creation
  // async function handlefileUpload(e) {
  //   for (let index = 0; index < e.target.files.length; index++) {
  //     let reader = new FileReader();
  //     reader.onload = (e) => {
  //       if (e.target.result) {
  //         // console.log(e.target.result)
  //         fileList.current.push(e.target.result);
  //         setFileAssetList([...fileAssetList, ...fileList.current]);
  //       }
  //     };
  //     reader.readAsDataURL(e.target.files[index]);
  //     fileListType.current.push(e.target.files[index].name);
  //     // console.log(e.target.files[index].name)
  //   }
  //   fileList.current = [];
  // }




  // const isDisabled = () => {
  //   console.log(loadingSend, !message.trim(), !file)

  //   const  res = loadingSend || (!message.trim() && !file);
  //   console.log(res)

  //   return res
  // };

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

      {/* {assetImageList?.length > 0 && (
        <div className="flex gap-x-4 p-1 flex-wrap space-y-1">
          {assetImageList?.map((img, i) => (
            <div key={img} className="relative">
              <img src={img} alt="" className="h-14 w-14" />
              <CiCircleRemove
                size={22}
                strokeWidth={2.4}
                className="text-red-400 absolute -right-4 top-0 cursor-pointer"
                onClick={() => removeImage(i)}
              />
            </div>
          ))}
        </div>
      )} */}
      {/* {fileAssetList?.length > 0 && (
        <div className="flex gap-x-4 p-1 flex-wrap space-y-1">
          {fileAssetList?.map((fl, i) => (
            <div key={fl} className="relative">
              <div alt="" className="border py-2 px-1 shadow-sm">
                <span>{fileListType.current[i]}</span>
              </div>
              <CiCircleRemove
                size={22}
                strokeWidth={2.4}
                className="text-red-400 absolute -right-4 top-0 cursor-pointer"
                onClick={() => removeFile(i, fileListType.current[i])}
              />
            </div>
          ))}
        </div>
      )} */}

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
        {/* <label htmlFor="img" className=" cursor-pointer">
          <HiPhoto size={30} className="text-sky-500" />
        </label> */}
        {/* <label htmlFor="file" className=" cursor-pointer">
          <GrAttachment size={25} className="text-sky-500" />
        </label> */}
        <label htmlFor="file" className=" cursor-pointer" onClick={handleClick}>
          <GrAttachment size={25} className="text-sky-500" />
        </label>

        {/* <input
          type="file"
          className="hidden"
          multiple
          accept="application/*"
          name=""
          id="file"
          onChange={handlefileUpload}
        /> */}
        {/* <input type="file" className="hidden" multiple accept="image/*" name="" id="img" onChange={handleImageUpload} /> */}

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
            // register={register}
            // errors={errors}
            value={message}
            onChange={(e) => handleMessage(e)}
            required
            placeholder="Write a message"
          />
          <button
            type="submit"
            // || (!message?.trim() && !file)
            // false && (!message?.trim() && !file
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
