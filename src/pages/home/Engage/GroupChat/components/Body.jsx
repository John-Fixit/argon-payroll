/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */



import { useContext, useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import Allchat from './chat'
import useCurrentUser from "../../../../../hooks/useCurrentUser";
import { SocketContext } from "../../../../../context/SocketContext";
import { useInView } from "react-intersection-observer";
import { getAllChatMessage2Action, getMoreChatMessage2Action } from "../../../../../API/chat";
import { Chip } from "@nextui-org/react";
import { Dot } from "lucide-react";
import MBox from "./MBox";


const Body = ({mate, temporaryGroup}) => {

  const bottomRef = useRef(null);


  const { userData } = useCurrentUser();
  // const [pageStart, setPageStart] = useState(10);
  
  const [allAvailableChat, setAllAvailableChat] = useState([])
  const [allChatInitial, setAllChatInitial] = useState([]);
  const [allChatPage, setAllChatPage] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { ref, inView } = useInView();
  const {allChat, setChat, clearChat, shouldScroll,  setShouldScroll, setMoreChat, typingObj, setCurrentPickedChat} = useContext(SocketContext)
  const chatContainerRef = useRef(null);

  const [scrollTop, setScrollTop] = useState(0);



  // scroll test 
  const [unreadMessageIndex, setUnreadMessageIndex] = useState(-1);






  


  useEffect(() => {
        

    const rerun = ()=>{
      // console.log(mate)
      clearChat()
      bottomRef?.current?.scrollIntoView({behavior: 'smooth'});
      // setPageStart(10);
      setAllChatInitial([])
      setAllChatPage([])
      setAllAvailableChat([])
      getInitialChat()
      setCurrentPickedChat(mate)

      setTimeout(() => {
        
        bottomRef?.current?.scrollIntoView({behavior: 'smooth'});
      }, 1000);

    }

    rerun()



  }, [mate])








  useEffect(() => {
    
    const findFirstUnread = ()=>{
        const firstWhere = allChat?.findIndex(el => el.STATUS === 0)
        if(firstWhere){
          setUnreadMessageIndex(firstWhere)
          scrollToUnreadMessage(firstWhere)
        }else{
        
          bottomRef?.current?.scrollIntoView({behavior: 'smooth'});
        }
    }

    findFirstUnread()
  
 
  }, [])
  


// scroll test
const scrollToUnreadMessage = (firstWhere) => {
  if (firstWhere !== -1 && chatContainerRef.current) {
    const unreadMessageElement = chatContainerRef.current.children[firstWhere - 3];
    // console.log('there', unreadMessageElement)
    if (unreadMessageElement) {
      // console.log('there')
      unreadMessageElement.scrollIntoView({ behavior: 'smooth' });
      // setUnreadMessageIndex(-1); // Mark all messages as read
    }
  }
};














  const getInitialChat = async ()=>{
    try {
          const res = await getAllChatMessage2Action({...userData, ...mate})
          if(res){
            // console.log(res)
            setChat(res?.data)
          }
    } catch (error) {
      console.log(error)
    }
}


const getMoreChat = async ()=>{
  const chatContainer = chatContainerRef.current;
  const scrollHeightBefore = chatContainer.scrollHeight;
    try {


      // console.log(allChat?.length % 10 === 0)

      if(allChat?.length > 0 && allChat?.length % 10 === 0){
        setIsLoadingMore(prev => !prev)
          const res = await getMoreChatMessage2Action({...userData, offset:allChat?.length,  ...mate})

          if(res){
            // console.log(scrollHeightBefore, scrollHeightAfter)
            // console.log(res)
            const scrollHeightAfter = chatContainer.scrollHeight;
            setMoreChat(res?.data)
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
    
    setTimeout(() => {
      getMoreChat();
    }, 500);
  }  

}, [inView, isLoadingMore])


useEffect(() => {
  if(shouldScroll){

    // console.log('here')
    bottomRef?.current?.scrollIntoView({behavior: 'smooth'});
    setShouldScroll(false)

  }
 }, [shouldScroll]);


//  useEffect(() => {
//   bottomRef?.current?.scrollIntoView({behavior: 'smooth'});
// }, []);




  return ( 
    <div className="flex-1 overflow-y-auto mx-14 lg:mx-32 h-full relative scrollbar-track-slate-400 scrollbar-thin scrollbar-none" ref={chatContainerRef}>
      {
        ( <div ref={ref} >
                 </div>)
        }
      {/* {allChat?.map((message) => (
        <MessageBox 
          key={message.CHAT_ID} 
          data={message}
          isLarge={true}
          otherUser={mate}
        />
      ))} */}
      {Allchat?.map((message) => (
        <MBox 
          key={message.id} 
          data={message}
          isLarge={true}
          otherUser={temporaryGroup}
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