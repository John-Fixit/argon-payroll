/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useContext, useEffect, useRef, useState } from "react";


import { ImEnlarge } from "react-icons/im";
import { X } from "lucide-react";
import { FiPlusCircle, FiSend } from "react-icons/fi";
import { FiImage } from "react-icons/fi";
import { GrAttachment } from "react-icons/gr";
import Allchat from '../../../../components/chat.js'
import MessageBox from "../../../../components/MessageBox.jsx";
import { Avatar, Chip } from "@nextui-org/react";
import useCurrentUser from "../../../../hooks/useCurrentUser.jsx";
import { useInView } from "react-intersection-observer";
import { SocketContext } from "../../../../context/SocketContext.jsx";
import { getAllChatMessage2Action, getMoreChatMessage2Action, sendChatMessage2Action } from "../../../../API/chat.js";
import axios from "axios";
import toast from "react-hot-toast";
import { CiCircleRemove } from "react-icons/ci";
import clsx from "clsx";
import { baseURL } from "../../../../utils/filePrefix.js";

const MiniMessagePopup = ({ ShowChatPopup, expand, user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(true);
  const [showMsgOption, setShowMsgOption] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);
  const bottomRef = useRef(null);


  const { userData } = useCurrentUser();
  const [pageStart, setPageStart] = useState(10);
  
  const [allAvailableChat, setAllAvailableChat] = useState([])
  const [allChatInitial, setAllChatInitial] = useState([]);
  const [allChatPage, setAllChatPage] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { ref, inView } = useInView();
  const {allChat, setChat, clearChat} = useContext(SocketContext)




  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const {addChat, setShouldScroll, reArrangeChatHistory, shouldScroll, setMoreChat, onlineUsers,  sendMessage, sendTypingSignal, typingObj} = useContext(SocketContext)
  const [scrollTop, setScrollTop] = useState(0);

  const chatContainerRef = useRef(null);







  useEffect(() => {
        

    const rerun = ()=>{
      // console.log(mate)
      clearChat()
      bottomRef?.current?.scrollIntoView({behavior: 'smooth'});
      setPageStart(10);
      setAllChatInitial([])
      setAllChatPage([])
      setAllAvailableChat([])
      getInitialChat()

      setTimeout(() => {
        bottomRef?.current?.scrollIntoView({behavior: 'smooth'});
      }, 1000);

    }

    rerun()



  }, [user])



  const getInitialChat = async ()=>{
    try {
          const res = await getAllChatMessage2Action({...userData, ...user})
          if(res){
            setChat(res?.data)
            // console.log(res?.data)
            bottomRef?.current?.scrollIntoView();

          }
    } catch (error) {
      console.log(error)
    }
}


  function scrollToPosition(y) {
    // window.scrollTo(0, y);
    bottomRef?.current?.scrollTo(0, y);
  }


const getMoreChat = async ()=>{
   // Remember scroll height before adding new messages
   const chatContainer = chatContainerRef.current;
   const scrollHeightBefore = chatContainer.scrollHeight;

  try {

    

    // if(allChat?.length > 9){
    //   setIsLoadingMore(prev => !prev)
    //     const res = await getMoreChatMessage2Action({...userData, offset:pageStart,  ...user})

    //     if(res){
    //       // console.log(res)
    //       setMoreChat(res?.data)
    //       setIsLoadingMore(prev => !prev)
    //     }
    // }
    // console.log(allChat?.length % 10 === 0)

    if(allChat?.length > 0 && allChat?.length % 10 === 0 ){
      setIsLoadingMore(prev => !prev)
        const res = await getMoreChatMessage2Action({...userData, offset:allChat?.length,  ...user})

        if(res){
          const scrollHeightAfter = chatContainer.scrollHeight;
          // console.log(scrollHeightBefore, scrollHeightAfter)

          setMoreChat(res?.data)
          // scrollToPosition(res?.data?.length * 200)
          setIsLoadingMore(false)
          setTimeout(() => {
            const newScrollTop = (scrollHeightAfter + (res?.data?.length * 130)) - scrollHeightBefore;
            chatContainer.scrollTop = (scrollHeightAfter + (res?.data?.length * 130)) - scrollHeightBefore;
            animateScroll(newScrollTop);
          }, 100);

        }
    }


  } catch (error) {
    console.log(error)
    setIsLoadingMore(prev => !prev)
  }
}

const animateScroll = (targetScrollTop) => {
  const startTime = performance.now();
  const startScrollTop = scrollTop;

  function scrollAnimation(currentTime) {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / 500, 1); // Adjust duration here
    const easing = progress; // Linear easing, can be replaced with other easing functions

    setScrollTop(startScrollTop + (targetScrollTop - startScrollTop) * easing);

    if (progress < 1) {
      requestAnimationFrame(scrollAnimation);
    }
  }

  requestAnimationFrame(scrollAnimation);
};














// useEffect(() => {
//   if ( allChatInitial?.length === 0) {
//     getInitialChat()
//   }
// }, []);


useEffect(() => {
  if (inView && !isLoadingMore) {
    // console.log('called now more chat')
    getMoreChat();
  }  

}, [inView, isLoadingMore])





  useEffect(() => {
    bottomRef?.current?.scrollIntoView({behavior: 'smooth'});
  }, []);




  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });




// console.log(user, allChat)







// methods
const handleMessage = (e)=>{
  e.preventDefault()
  // console.log(e.target.value)
  setMessage(e.target.value)

  sendTypingSignal({
    SENDER_ID: userData?.data?.STAFF_ID,
    RECEIVER_ID: user?.STAFF_ID
  })

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
      url:baseURL +"attachment/addChatFile",
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
    ...user,
    MESSAGE: !message?.trim() ? null : message?.trim(),
    FILE: fileUrl?.file_url_id,
  };

  try {

    if(fileUrl || message?.trim()){
      const res = await sendChatMessage2Action(value);
      if (res) {
        // console.log(res, file);

      const newChat = {
        CHAT_ID: res?.data?.CHAT_ID || Date.now(),
        CHAT_TIME: Date.now() /1000,
        FILE_ID: fileUrl?.file_url_id,
        FILE_NAME: fileUrl?.file_url,
        MESSAGE : message,
        MESSAGE_TYPE: fileUrl?.file_url_id ? 1 : 0,
        RECEIVER_ID:  user?.STAFF_ID,
        SENDER_ID: userData?.data?.STAFF_ID,
        STATUS: 0    
      }

        addChat(newChat)
        sendMessage(newChat)
        setMessage('')
        setFile(null)
        setShouldScroll(true)
        reArrangeChatHistory(user)
      }
    }

  } catch (error) {
    console.log(error);
  }


};





useEffect(() => {
  if(shouldScroll){
    bottomRef?.current?.scrollIntoView({behavior: 'smooth'});
    setShouldScroll(false)

  }
 }, [shouldScroll]);

























  return (
    <div className="relative dark:text-gray-700 z-50">
      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        // onFocus={() => setDropdownOpen(true)}
        // onBlur={() => setDropdownOpen(false)}
        className={`fixed bottom-0  right-[11.8rem] xlg:right-[20.8rem] z-[99]  mt-2.5 flex h-96 flex-col 
        w-[19rem] rounded-t-xl  bg-white shadow-2xl drop-shadow   sm:w-80  ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <div className="px-4 py-3 shadow-lg shadow-gray-100 drop-shadow-sm">
          <div className="flex justify-between  items-center">
            <div className="flex gap-x-2 items-center">
              <div>
                <span className="h-10 w-10 rounded-full flex items-center relative">
                  {/* <img
                    src="/assets/images/profiles/avatar-07.jpg"
                    alt="User"
                    className="rounded-full w-[2rem] h-[2rem]"
                  /> */}

                  <div className="relative">
                    {user?.FILE_NAME?.includes("http") ? (
                      <Avatar
                        size="md"
                        src={
                          user?.FILE_NAME
                        }
                        title={user?.LAST_NAME + " " + user?.FIRST_NAME}
                      />
                    ) : (
                      <Avatar
                        size="md"
                        name={user?.FIRST_NAME?.trim()[0]}
                        className=" cursor-pointer"
                        title={user?.LAST_NAME + " " + user?.FIRST_NAME}
                      />
                    )}

                      { onlineUsers?.find(
                        (el) => el?.userId === user?.STAFF_ID
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
                </span>
              </div>
              <div className="text-xs max-w-32  whitespace-nowrap ">
                <div className="font-bold text-gray-600 text-sm  w-full truncate">
                {user?.LAST_NAME + " " + user?.FIRST_NAME}
                </div>
                {/* <span>30 Mins Ago</span> */}
              </div>
            </div>

            <div className="flex gap-x-4 items-center text-gray-500">
              <ImEnlarge size={12} onClick={expand} className=" cursor-pointer" />
              <X
                size={20}
                onClick={() => ShowChatPopup(false)}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>

        <ul className="flex h-auto flex-col overflow-y-auto p2-3 mb-14 z-1" ref={chatContainerRef}>
        
           <div ref={ref} >
                 </div>
        

            { 
                allChat?.map(ch =>(
                        <li key={ch?.CHAT_ID}>
                            <MessageBox data={ch} otherUser={user}/>
                            
                        </li>
                ))
            }
          
        <div className="pt-2" ref={bottomRef} />
        {
              typingObj && (
            <div className="absolute bottom-[4.5rem] left-4 z-10 flex" >
              <Chip size="md" className="flex animate-bounce ">
                <div className="flex items-end">
                  <div className=" text-gray-600 text-xs">Typing</div>   
                  <div className=" flex py-1 px-1 gap-x-1 animate-bounce "> 
                    <div className="animate-bounce duration-200 h-full">
                        <div className="w-[0.2rem] h-[0.2rem] bg-gray-600 rounded-full  "></div>  
                    </div>
                    <div className="animate-bounce duration-100 h-full">
                        <div className="w-[0.2rem] h-[0.2rem] bg-gray-600 rounded-full  "></div>  
                    </div>
                    <div className="animate-bounce duration-75 h-full">
                        <div className="w-[0.2rem] h-[0.2rem] bg-gray-600 rounded-full  "></div>  
                    </div>
                  
                  </div>
                </div>
              </Chip>
            </div>

              )
            }
        </ul>

        <div className="py-1 absolute bottom-0 w-full shadow-2xl z-20 shadow-slate-500 bg-white">
                <div className="p-1">
                {file &&  file?.type?.includes('application') ? (
                      <div className="relative w-20 h-10 truncate">
                        <div alt="" className="border py-2 px-1 shadow-sm">
                        <span>{file?.name}</span>
                      </div>
                      <CiCircleRemove
                        size={15}
                        strokeWidth={2}
                        className="text-red-400 absolute -right-4 top-0 cursor-pointer"
                        onClick={() => setFile(null)}
                      />
                    </div>
                ) : file && file?.type?.includes('image') && (
                  
                  <div className="relative w-10 h-10">
                    <img className="w-10 h-10" alt="" src={URL.createObjectURL(file)} />
                    <CiCircleRemove
                      size={15}
                      strokeWidth={2}
                      className="text-red-400 absolute -right-4 top-0 cursor-pointer"
                      onClick={() => setFile(null)}
                    />
                  </div>
                )}
              </div>
            <div className="flex items-center h-full  rounded-md w-full">
                <input
                    name=""
                    id=""
                    className="outline-none border-none bg-transparent  px-2 w-full placeholder:text-xs py-3 placeholder:text-gray-400 text-gray-500"
                    type="text"
                    autoFocus
                    onChange={(e)=>handleMessage(e)}
                    value={message}
                    placeholder="Type Your Message Here..."
                />
                <div className="ml-auto flex pr-2 gap-x-2  h-full ">
                    <button className="py-3 outline-none rounded"  disabled={!(message?.trim()) && !file }>
                    {" "}
                    <FiSend onClick={onSubmit}   size={20} />
                    </button>

                    <input
                        type="file"
                        className="hidden"
                        accept=".jpg, .png, .jpeg, application/*"
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])}
                      />

                    <button className="py-3 outline-none rounded">
                    {" "}
                      <label htmlFor="file" className=" cursor-pointer">
                          <GrAttachment size={22} />
                      </label>
                    </button>
                    {/* <button className="py-3 outline-none rounded">
                    {" "}
                    <FiPlusCircle onClick={()=>setShowMsgOption(!showMsgOption)}  size={22} />
                    </button> */}
                </div>
            </div>

            <div className={`minichatOptions ${ showMsgOption && 'minichatOptionsShow'} `}>
                <ul className="flex flex-col space-y-2">
                    <li className="bg-blue-300 text-white p-1 rounded-full cursor-pointer"><FiImage/></li>
                    <li className="bg-red-500 text-white p-1 rounded-full cursor-pointer"><GrAttachment/></li>
                </ul>
            </div>

        </div>
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default MiniMessagePopup;
