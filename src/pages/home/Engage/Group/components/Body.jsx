/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useCallback, useContext, useEffect, useRef, useState } from "react";
import useCurrentUser from "../../../../../hooks/useCurrentUser";
import { SocketContext } from "../../../../../context/SocketContext";
import { useInView } from "react-intersection-observer";
import { Chip } from "@nextui-org/react";
import MBox from "./MBox";
import { getGroupMessageAction, getMoreGroupChatMessageAction } from "../../../../../API/group-chat";
const Body = ({groupData, temporaryGroup}) => {

  const bottomRef = useRef(null);
  const { userData } = useCurrentUser();
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { ref, inView } = useInView();
  const {allGroupChat, setGroupChat, clearGroupChat, shouldScroll,  setShouldScroll, setMoreGroupChat, typingObj, setCurrentPickedGroupChat} = useContext(SocketContext)
  const chatContainerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);



  const getInitialChat = useCallback(async ()=>{
    try {
        const json = {
          group_id: groupData?.GROUP_ID,
          staff_id: userData?.data?.STAFF_ID
        }
          const res = await getGroupMessageAction(json)
          if(res){
            setGroupChat(res?.data)
          }
    } catch (error) {
      console.log(error)
    }
}, [groupData?.GROUP_ID, userData?.data?.STAFF_ID])


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

    rerun()
  }, [getInitialChat])



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
  const scrollHeightBefore = chatContainer.scrollHeight;
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


  return ( 
    <div className="flex-1 overflow-y-auto mx-4 h-full relative scrollbar-track-slate-400 scrollbar-thin scrollbar-none" ref={chatContainerRef}>
      {
        ( <div ref={ref} >
                 </div>)
        }
      {allGroupChat?.map((message) => (
        <MBox 
          key={message?.CHAT_ID} 
          data={message}
          isLarge={true}
        />
      ))}
      <div className="pt-24" ref={bottomRef} />
      {
        typingObj && (
      <div className="sticky bottom-[0.5rem] left-10 z-10 flex" >
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