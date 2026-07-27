/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-unused-vars */

import { useCallback, useContext, useEffect, useRef, useState } from "react";
import MessageBox from "../../../../../components/MessageBox";
import Allchat from '../../../../../components/chat'
import useCurrentUser from "../../../../../hooks/useCurrentUser";
import { useInView } from "react-intersection-observer";
import { getAllChatMessage2Action, getMoreChatMessage2Action } from "../../../../../API/chat";
import { SocketContext } from "../../../../../context/SocketContext";
import { Chip } from "@nextui-org/react";
import MBox from "./MBox";
import { getGroupMessageAction, getMoreGroupChatMessageAction } from "../../../../../API/group-chat";





const Body = ({groupData, isGroup, fromBirthday, closeBirthdayCard, fromSupport, setFromSupport, chatClicked}) => {

    const [showDropDown, setShowDropDown] = useState(true)
    const bottomRef = useRef(null);
    const { userData } = useCurrentUser();
    
    const [allAvailableChat, setAllAvailableChat] = useState([])
    const [allChatInitial, setAllChatInitial] = useState([]);
    const [allChatPage, setAllChatPage] = useState([]);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const { ref, inView } = useInView();
    const {allGroupChat, allGroupChatRef, setGroupChat, clearGroupChat, setMoreGroupChat, setCurrentPickedGroupChat, shouldScroll,  setShouldScroll, setMoreChat, typingObj, reArrangeGroupChatHistory} = useContext(SocketContext)
    const chatContainerRef = useRef(null);

    const [scrollTop, setScrollTop] = useState(0);

// ------------------------------group------------------------------
const getInitialChat = useCallback(async ()=>{
  try {
      const json = {
        group_id: groupData?.GROUP_ID,
        staff_id: userData?.data?.STAFF_ID
      }
        if(chatClicked){
          const res = await getGroupMessageAction(json)
          if(res){
            setGroupChat(res?.data)
          }
        }
        setTimeout(() => {
          if(fromSupport) addInitialWelcome()
        }, 2000);
  } catch (error) {
    console.log(error)
  }
}, [groupData?.GROUP_ID, userData?.data?.STAFF_ID])



const addInitialWelcome = async () => {
  const message = "Hello, how can we help you?";
  try {
      const newChat = {
          CHAT_ID: 12234343455,
          CHAT_TIME: Date.now() / 1000,
          FILE_ID: null,
          FILE_NAME: null,
          MESSAGE : message,
          MESSAGE_TYPE: 0,
          LAST_CHAT: message,
          LAST_CHAT_FILE_NAME: null,
          SENDER_ID: groupData?.GROUP_ID,
          STATUS: 0,
          GROUP_ID: groupData?.GROUP_ID,
          GROUP_NAME: groupData?.GROUP_NAME,
          MEMBERS: groupData?.MEMBERS,
          UNREAD_COUNT: groupData?.UNREAD_COUNT,
          UNREAD_CHAT: groupData?.UNREAD_CHAT,
          COUNT_MEMBERS: groupData?.COUNT_MEMBERS,
          IS_GROUP_CHAT: 1,
          RECEIVER_ID: userData?.data?.STAFF_ID, 
          ROOM: groupData?.GROUP_ID,
          FIRST_NAME: "- 1",
          LAST_NAME: "SUPPORT"
      }
      // console.log([...allChatRef.current, newChat])
          const incoming = [...allGroupChatRef.current, newChat]
          const uniqueIds = new Set();
          const uniqueArray = incoming.filter(obj => {
            if (!uniqueIds.has(obj.CHAT_ID)) {
              uniqueIds.add(obj.CHAT_ID);
              return true;
            }
            return false;
          });

        setGroupChat([...uniqueArray])
        setShouldScroll(true)
        setFromSupport(false)
        reArrangeGroupChatHistory({...groupData})
  } catch (error) {
    console.log(error);
  }
};


useEffect(() => {
  const rerun = ()=>{
    clearGroupChat()
    bottomRef?.current?.scrollIntoView({behavior: 'smooth'});

    getInitialChat()
    setCurrentPickedGroupChat(groupData)
    setTimeout(() => {
      bottomRef?.current?.scrollIntoView({behavior: 'smooth'});
    }, 1000);
  }

  // if(chatClicked){
    rerun()
  // }
}, [getInitialChat, chatClicked])



const animateScroll =useCallback( (targetScrollTop) => {
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
}, []);






const getMoreChat = useCallback(async ()=>{
  const chatContainer = chatContainerRef.current;
  const scrollHeightBefore = chatContainer?.scrollHeight;
    try {

      if(allGroupChat?.length > 0 && allGroupChat?.length % 10 === 0){
        setIsLoadingMore(prev => !prev)

        const json = {
          "staff_id":userData?.data?.STAFF_ID,
          "group_id": groupData?.GROUP_ID,
          "limit": allGroupChat?.length
        }
          const res = await getMoreGroupChatMessageAction(json)

          if(res){
            const scrollHeightAfter = chatContainer.scrollHeight;
            setMoreGroupChat(res?.data)
            setIsLoadingMore(prev => !prev)
            setTimeout(() => {

              const newScrollTop = (scrollHeightAfter + (res?.data?.length * 140)) - scrollHeightBefore;
              chatContainer.scrollTop = (scrollHeightAfter + (res?.data?.length * 140)) - scrollHeightBefore;
              animateScroll(newScrollTop);

            }, 100);
          }
      }
    } catch (error) {
      console.log(error)
      setIsLoadingMore(prev => !prev)
    }
}, [allGroupChat?.length, animateScroll, groupData?.GROUP_ID, setMoreGroupChat, userData?.data?.STAFF_ID])







useEffect(() => {
  if (inView && !isLoadingMore) {
    
    setTimeout(() => {
      getMoreChat();
    }, 1000);
  }  

}, [getMoreChat, inView, isLoadingMore])




useEffect(() => {
  if(shouldScroll){
    bottomRef?.current?.scrollIntoView({behavior: 'smooth'});
    setShouldScroll(false)

  }
 }, [shouldScroll]);



 useEffect(() => {
  bottomRef?.current?.scrollIntoView({behavior: 'smooth'});
}, []);

// ------------------------------group------------------------------


    // const addInitialWelcome = async () => {
    //   const message = "Hello, how can we help you";
    //   try {
    //       const newChat = {
    //         CHAT_ID: '12234343455',
    //         CHAT_TIME: Date.now() / 1000,
    //         FILE_ID: null,
    //         FILE_NAME: null,
    //         MESSAGE : message,
    //         MESSAGE_TYPE: 0,
    //         RECEIVER_ID: userData?.data?.STAFF_ID  ,
    //         SENDER_ID: mate.STAFF_ID,
    //         STATUS: 0    
    //       }
    //         setChat([...allChatRef.current, newChat])
    //         setShouldScroll(true)
    //         setFromSupport(false)
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
   
















  return ( 
    <div className="flex-1 overflow-y-auto px-4 relative" ref={chatContainerRef}>
      {
        ( <div ref={ref} >
                 </div>)
        }
      <div className="pt-20"  />


        {
          isGroup ? (
            <>
                { Allchat?.map((message) => (
                    <MBox 
                      key={message.id} 
                      data={message}
                      isLarge={true}
                      otherUser={true}
                    />
                  ))}
            
            </>
          ) : (
            <>
            
            {allGroupChat?.map((message) => (
              <MBox 
                key={message?.CHAT_ID} 
                data={message}
                isLarge={true}
              />
            ))}
            
            </>
          )
        }


      <div className="pt-24" ref={bottomRef} />
      {
        typingObj && (
      <div className=" sticky bottom-[1.5rem] left-10 z-10 flex" >
        <Chip size="lg" className="flex animate-bounce ">
          <div className="flex items-end">
            <div className=" text-gray-600 text-sm">Typing</div>   
            <div className=" flex py-1 px-1 gap-x-1 animate-bounce "> 
              <div className="animate-bounce duration-200 h-full">
                   <div className="w-1 h-1 bg-gray-600 rounded-full  "></div>  
              </div>
              <div className="animate-bounce duration-100 h-full">
                   <div className="w-1 h-1 bg-gray-600 rounded-full  "></div>  
              </div>
              <div className="animate-bounce duration-75 h-full">
                   <div className="w-1 h-1 bg-gray-600 rounded-full  "></div>  
              </div>
            </div>
          </div>
        </Chip>
      </div>

        )
      }
    </div>
  );
}

export default Body;