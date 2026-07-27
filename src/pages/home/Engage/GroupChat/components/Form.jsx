/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */


import { 
    HiPaperAirplane, 
    // HiPhoto
  } from "react-icons/hi2";
  import MessageInput from "../../../rightMenu/components/MessageInput";
  // import {  
  //   useForm 
  // } from "react-hook-form";
  import axios from "axios";
  import { useContext, useState } from "react";
  import { CiCircleRemove } from "react-icons/ci";
  import { GrAttachment } from "react-icons/gr";
import useCurrentUser from "../../../../../hooks/useCurrentUser";
import { SocketContext } from "../../../../../context/SocketContext";
import toast from "react-hot-toast";
import { sendChatMessage2Action } from "../../../../../API/chat";
import { baseURL } from "../../../../../utils/filePrefix";
  
  
  
  const   Form = ({mate, temporaryGroup}) => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const { userData } = useCurrentUser();
    const {addChat, setShouldScroll, reArrangeChatHistory, sendMessage, sendTypingSignal} = useContext(SocketContext)






    const handleMessage = (e)=>{
      e.preventDefault()
      // console.log(e.target.value)
      setMessage(e.target.value)

      if(e?.target?.value){
        // {senderId: typingObj?.SENDER_ID,  receiverId: typingObj?.RECEIVER_ID,}
        sendTypingSignal({
          SENDER_ID: userData?.data?.STAFF_ID,
          RECEIVER_ID: mate?.STAFF_ID
        })
      }
  }


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
    // setValue("message", "", { shouldValidate: true });
    // console.log(data);

    

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

      if(fileUrl || message?.trim()){
        const res = await sendChatMessage2Action(value);
        if (res) {
          // console.log(res);

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
          sendMessage(newChat) //coming soon
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

































    // const [assetImageList, setAssetImageList] = useState([]);
    // const [fileAssetList, setFileAssetList] = useState([]);
    // useRef for the update i.e push
    // const list = useRef([]);
    // const fileList = useRef([]);
    // const fileListType = useRef([]);
  
    // const {
    //   register,
    //   handleSubmit,
    //   setValue,
    //   formState: {
    //     errors,
    //   }
    // } = useForm({
    //   defaultValues: {
    //     message: ''
    //   }
    // });
  
    // const onSubmit = (data) => {
    //   setValue('message', '', { shouldValidate: true });
    //   axios.post('/api/messages', {
    //     ...data,
    //   })
    // }
  
   
    // const removeImage = async (index) => {
    //   let newList = assetImageList.filter((item, i) => i !== index);
    //   setAssetImageList([...newList]);
    // };
    
    // const removeFile = async (index, name) => {
    //   let newList = fileAssetList.filter((itm, i) => i !== index);
  
    //   let latest = fileListType.current.filter((item) => item !== name)
  
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
    //         if (e.target.result) {
    //           // console.log(e.target.result)
    //           fileList.current.push(e.target.result);
    //           setFileAssetList([...fileAssetList, ...fileList.current]);
    //         }
            
    //       };
    //       reader.readAsDataURL(e.target.files[index]);
    //       fileListType.current.push(e.target.files[index].name);
    //       // console.log(e.target.files[index].name)
    //   }
    //   fileList.current = [];
    // }
  
  
  
  
  const sett = (e)=>{
    e.preventDefault()
  }
  
  
  
    return ( 
  
      <div className="border  m-6 mx-10 lg:mx-32 rounded-lg bg-white">
  
        {/* {
          assetImageList?.length > 0 && 
        <div className="flex gap-x-4 p-1 flex-wrap space-y-1">
            {
              assetImageList?.map((img, i)=>(
                <div key={img} className="relative">
                  <img src={img} alt="" className="h-14 w-14"  />
                  <CiCircleRemove size={22} strokeWidth={2.4} className="text-red-400 absolute -right-4 top-0 cursor-pointer" onClick={()=>removeImage(i)}/>
                </div>
              ))
            }
        </div>
        } */}
        {/* {
          fileAssetList?.length > 0 && 
        <div className="flex gap-x-4 p-1 flex-wrap space-y-1">
            {
              fileAssetList?.map((fl, i)=>(
                <div key={fl} className="relative">
                  <div  alt="" className="border py-2 px-1 shadow-sm">
                    <span>
                        {
                          fileListType.current[i]
                        }
                    </span>
                  </div>
                  <CiCircleRemove size={22} strokeWidth={2.4} className="text-red-400 absolute -right-4 top-0 cursor-pointer" onClick={()=>removeFile(i, fileListType.current[i])}/>
                </div>
              ))
            }
        </div>
        } */}






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
  
            {/* <label htmlFor="img" className=" cursor-pointer">
              <HiPhoto size={20} className="text-chatinactive"  />
            </label> */}
            <label htmlFor="file" className=" cursor-pointer">
              <GrAttachment size={15} className="text-sky-500"  />
            </label>
  
            {/* <input type="file" className="hidden" multiple accept="application/*" name="" id="file" onChange={handlefileUpload} />
            <input type="file" className="hidden" multiple accept="image/*" name="" id="img" onChange={handleImageUpload} /> */}


            <input
          type="file"
          className="hidden"
          accept=".jpg, .png, .jpeg, application/*"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
  
          <form 
            onSubmit={sett} 
            className="flex items-center gap-2 lg:gap-4 w-full"
          >
            <MessageInput 
              id="message"
              // register={register}
              // errors={errors}
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
              {/* bg-chatinactive  */}
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