/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-unused-vars */



import { useContext, useEffect, useRef, useState } from "react";
import MessageBox from "../../../../components/MessageBox";
import Allchat from '../../../../components/chat'
import useCurrentUser from "../../../../hooks/useCurrentUser";
import { useGetChatInfinite, useGetChatInitial } from "../../../../lib/query/queryandMutation";
import { useInView } from "react-intersection-observer";
import { getAllChatMessage2Action, getMoreChatMessage2Action, sendChatMessage2Action } from "../../../../API/chat";
import { SocketContext } from "../../../../context/SocketContext";
import { Chip } from "@nextui-org/react";
import MBox from "../../Engage/GroupChat/components/MBox";
import BirthdayModal from "./BirthdayModal";
import { useStateManager } from "react-select";
import { FaLinesLeaning } from "react-icons/fa6";
// import Allchat from './chat'




const Body = ({mate, isGroup, fromBirthday, closeBirthdayCard, fromSupport, setFromSupport}) => {

  const [showDropDown, setShowDropDown] = useState(true)

  const bottomRef = useRef(null);
  // const [messages, setMessages] = useState([...Allchat]);




    // useGetChatInitial
    // const [isLoading, setIsLoading] = useState(false);
    
    // const { data: chatDatasInitial, isPending,  } = useGetChatInitial(
      //   userData, mate
      // );
      
      // const { data: chatDatasInfinite, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetChatInfinite(
        //   userData, pageStart, mate
        // );
        
        
        
        // const {allAvailableChat, setAllAvailableChat} = useState([])
        // const {allAvailablePost, setAllAvailablePost, addAComment } = useContext(postContext)


    const { userData } = useCurrentUser();
    // const [pageStart, setPageStart] = useState(10);
    
    const [allAvailableChat, setAllAvailableChat] = useState([])
    const [allChatInitial, setAllChatInitial] = useState([]);
    const [allChatPage, setAllChatPage] = useState([]);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const { ref, inView } = useInView();
    const {allChat, allChatRef, setChat, addChat, clearChat, shouldScroll,  setShouldScroll, setMoreChat, typingObj} = useContext(SocketContext)
    const chatContainerRef = useRef(null);

    const [scrollTop, setScrollTop] = useState(0);

// console.log(allChat)



    // useGetChatInitial
    





      useEffect(() => {
        

        const rerun = ()=>{

          if(isGroup) {
            return
          }
          // console.log(mate)
          clearChat()
          bottomRef?.current?.scrollIntoView({behavior: 'smooth'});
          // setPageStart(10);
          setAllChatInitial([])
          setAllChatPage([])
          setAllAvailableChat([])
          getInitialChat()
          setTimeout(() => {
            
            bottomRef?.current?.scrollIntoView({behavior: 'smooth'});
          }, 1000);

        }

        rerun()


  
      }, [mate])
      











    // useEffect(() => {

    //   if ( chatDatasInitial?.pages[0]?.data?.data?.length > 0) {
  
    //     // test
    //     console.log(chatDatasInitial)
    //     let initial = [...chatDatasInitial?.pages[0]?.data?.data]

    //     setAllChatInitial([...initial]);
    //     // console.log(initial)
        
    //     if (allChatPage?.length > 0) {
    //       setAllAvailableChat([...initial,   ...allChatPage])
    //     } else {
    //       setAllAvailableChat([...initial]);
    //     }
    //     // test
        
    //   }
    // }, [chatDatasInitial, allChatPage]);
  
  
  
  
  //   useEffect(() => {
  //     if (inView && !isFetchingNextPage) {
  //       fetchNextPage();
  //     }  
  
  //  }, [inView, isFetchingNextPage, mate])
  
  
  
    // useEffect(() => {
    //     if (!isFetchingNextPage && chatDatasInfinite) {
    //       const all = []
  
    //       console.log(chatDatasInfinite, allAvailableChat)

    //       setPageStart((prev) => prev + 10);
  
    //       chatDatasInfinite?.pages?.map(info=>{
    //         info?.data?.data?.map(dt=>{
    //           all?.push(dt)
    //           return all
    //         })
    //       })
  
    //       setAllChatPage([...all])
  
    //       // test
    //       setAllAvailableChat([...allChatInitial, ...all]);
    //       // test
  
    //     }
    // }, [inView, isFetchingNextPage])











    const getInitialChat = async ()=>{
      if(isGroup) {
        return
      }
        try {
          // console.log(mate)
              const res = await getAllChatMessage2Action({...userData, ...mate})
              if(res){
                setChat(res?.data)

                setTimeout(() => {
                  if(fromSupport) addInitialWelcome()
                }, 2000);

              }
        } catch (error) {
          console.log(error)
        }
    }


    const addInitialWelcome = async () => {
      const message = "Hello, how can we help you";
      try {
          const newChat = {
            CHAT_ID: '12234343455',
            CHAT_TIME: Date.now() / 1000,
            FILE_ID: null,
            FILE_NAME: null,
            MESSAGE : message,
            MESSAGE_TYPE: 0,
            RECEIVER_ID: userData?.data?.STAFF_ID  ,
            SENDER_ID: mate.STAFF_ID,
            STATUS: 0    
          }
          // console.log([...allChatRef.current, newChat])
            setChat([...allChatRef.current, newChat])
            setShouldScroll(true)
            setFromSupport(false)
      } catch (error) {
        console.log(error);
      }
    };



    const getMoreChat = async ()=>{
      if(isGroup) {
        return
      }
      const chatContainer = chatContainerRef.current;
      const scrollHeightBefore = chatContainer.scrollHeight;
        try {


          // console.log(allChat?.length % 10 === 0)



          if(allChat?.length > 0 && allChat?.length % 10 === 0){
            setIsLoadingMore(prev => !prev)
              const res = await getMoreChatMessage2Action({...userData, offset:allChat?.length,  ...mate})

              if(res){
                const scrollHeightAfter = chatContainer.scrollHeight;
                // console.log(scrollHeightBefore, scrollHeightAfter)
                // console.log(res)
          
                setMoreChat(res?.data)
                setIsLoadingMore(prev => !prev)
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















    useEffect(() => {
      if (inView && !isLoadingMore) {
        getMoreChat();
      }  
  
   }, [inView, isLoadingMore])









   
     useEffect(() => {
      if(shouldScroll){
        bottomRef?.current?.scrollIntoView({behavior: 'smooth'});
        setShouldScroll(false)

      }
     }, [shouldScroll]);









  useEffect(() => {
    bottomRef?.current?.scrollIntoView({behavior: 'smooth'});
  }, []);




  const closemodal = ()=>{
    setShowDropDown(false)
    closeBirthdayCard()
  }

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
            
            {allChat?.map((message) => (
              <MessageBox 
                key={message?.CHAT_ID} 
                data={message}
                isLarge={true}
                otherUser={mate}
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

      {
        fromBirthday && (
          <BirthdayModal showDropDown={showDropDown}  setShowDropDown={closemodal} mate={mate}/>
          // <div onClick={closeBirthdayCard}>birthday card</div> 
        )
      }
    </div>
  );
}

export default Body;