/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useState,  useEffect } from "react";
import { io } from "socket.io-client";
import useCurrentUser from "../hooks/useCurrentUser";
import { updateChatStatusAction } from "../API/chat";
import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useGetAllChatHistory } from "../lib/query/queryandMutation";

const SocketContext = createContext();

// https://blockchain.creditclan.com/hr/ -> attendance backend
// https://clansocket.onrender.com/ ->render
const socket = io("https://clansocket.onrender.com/", {
  // transports: ["websocket"], //
  // autoConnect: true,
});

const SocketContextProvider = ({ children }) => {
  const [allChat, setAllChat] = useState([]);
  const [allGroupChat, setAllGroupChat] = useState([]);

  const [typingObj, setTypingObj] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [allChatHistory, setAllChatHistory] = useState([]);
  const [allChatHistoryFilter, setAllChatHistoryFilter] = useState([]);

  const [allGroupChatHistory, setAllGroupChatHistory] = useState([]);
  const [allGroupChatHistoryFilter, setAllGroupChatHistoryFilter] = useState([]);

  const [shouldScroll, setShouldScroll] = useState(false);
  const {userData} = useCurrentUser()

  const [currentPickedChat, setCurrentPickedChat] = useState(null)
  const [currentPickedGroupChat, setCurrentPickedGroupChat] = useState(null)

  const { mutateAsync: allChatHistoryCall } = useGetAllChatHistory();

  const allChatHistoryRef = useRef()
  const allChatHistoryFilterRef = useRef()
  const currentPickedChatRef = useRef()
  const chatUpdateTimeRef = useRef()


  const allChatRef = useRef()
  const allGroupChatHistoryRef = useRef()
  const allGroupChatRef = useRef([])
  const allGroupChatHistoryFilterRef = useRef()
  const currentPickedGroupChatRef = useRef()
  const groupChatUpdateTimeRef = useRef()



  const { pathname } = useLocation();








  useEffect(() => {
    
    currentPickedChatRef.current = currentPickedChat

  }, [currentPickedChat,])


  useEffect(() => {

    currentPickedGroupChatRef.current = currentPickedGroupChat

  }, [currentPickedGroupChat])

  useEffect(() => {

    allGroupChatRef.current =  allGroupChat

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allGroupChat.length])



// initial data setup
  const setChat = (data) => {
    const incoming = [...data]
    const uniqueIds = new Set();
    const uniqueArray = incoming.filter(obj => {
      if (!uniqueIds.has(obj.CHAT_ID)) {
        uniqueIds.add(obj.CHAT_ID);
        return true;
      }
      return false;
    });
    setAllChat([...uniqueArray]);

    allChatRef.current = [...uniqueArray]

    setTimeout(() => {
      updateUnread(data)
    }, 200);
  };

  const setGroupChat = (data) => {
    setAllGroupChat([...data]);

    setTimeout(() => {
      // updateGroupUnread(data) //pending call
    }, 200);
  };
  // initial data setup




  // set more paginated chat
  const setMoreChat = (data) => {
    const incoming = [...data, ...allChat]
            const uniqueIds = new Set();
            const uniqueArray = incoming.filter(obj => {
              if (!uniqueIds.has(obj.CHAT_ID)) {
                uniqueIds.add(obj.CHAT_ID);
                return true;
              }
              return false;
            });

    setAllChat([...uniqueArray]);
    allChatRef.current = [...uniqueArray]
    setTimeout(() => {
      updateUnread(uniqueArray)
    }, 200);
  };

  const setMoreGroupChat = (data) => {
    const incoming = [...data, ...allGroupChat]
            const uniqueIds = new Set();
            const uniqueArray = incoming.filter(obj => {
              if (!uniqueIds.has(obj.CHAT_ID)) {
                uniqueIds.add(obj.CHAT_ID);
                return true;
              }
              return false;
            });

    setAllGroupChat([...uniqueArray]);
    setTimeout(() => {
      // updateGroupUnread(uniqueArray) //pending call
    }, 200);
  };
  // set more paginated chat



  //  add new chat
  const addChat = (data) => {
    setAllChat([...allChat, data]);
    allChatRef.current = [...allChat, data]
  };


  //  DELETE chat
  const deleteAChat = (data) => {
    const currentChat = [...allChat] 

    const latest = currentChat?.filter(ch => ch?.CHAT_ID !== data?.CHAT_ID)

    setAllChat([...latest]);
    allChatRef.current = [...latest]
  };


  //  DELETE Group chat
  const deleteAGroupChat = (data) => {
    const currentChat = [...allGroupChat] 

    const latest = currentChat?.filter(ch => ch?.CHAT_ID !== data?.CHAT_ID)

    setAllGroupChat([...latest]);
  };

  const addGroupChat = (data) => {
    const incoming = [...allGroupChat, data]
    const uniqueIds = new Set();
    const uniqueArray = incoming.filter(obj => {
      if (!uniqueIds.has(obj.CHAT_ID)) {
        uniqueIds.add(obj.CHAT_ID);
        return true;
      }
      return false;
    });
    setAllGroupChat([...uniqueArray]);
  };
  //  add new chat



// clear all chat
  const clearChat = () => {
    setAllChat([]);
    allChatRef.current = []
  };

  const clearGroupChat = () => {
    setAllGroupChat([]);
  };
  // clear all chat



  // set chat history
  const setChatHistory = (data) => {
    setAllChatHistory([...data]);
    allChatHistoryRef.current = [...data]
  };

  const setChatGroupHistory = (data) => {
    setAllGroupChatHistory([...data]);
    allGroupChatHistoryRef.current = [...data]
  };
  // set chat history


  // set chat history filter
  const setChatHistoryFilter = (data) => {
    const incoming = [...data]
    const uniqueIds = new Set();
    const uniqueArray = incoming.filter(obj => {
      if (!uniqueIds.has(obj.STAFF_ID)) {
        uniqueIds.add(obj.STAFF_ID);
        return true;
      }
      return false;
    });

    setAllChatHistoryFilter([...uniqueArray]);
    allChatHistoryFilterRef.current = [...uniqueArray]
  };

  const setChatHistoryGroupFilter = (data) => {
    setAllGroupChatHistoryFilter([...data]);
    allGroupChatHistoryFilterRef.current = [...data]
  };
  // set chat history filter





//  update unread
  const updateUnread = async (data) => {
    try {    
          let filterUnreadIDs = data
            ?.filter(
              (el) =>
                el?.SENDER_ID === currentPickedChatRef.current?.STAFF_ID && el.STATUS === 0
            )
            ?.map((e) => e.CHAT_ID)
            ?.join(",");
    
          let theChatUser = (
            allChatHistoryFilterRef.current?.length > 0 ? allChatHistoryFilterRef.current : allChatHistoryRef.current
          )?.find((chatUser) => chatUser.STAFF_ID === currentPickedChatRef.current?.STAFF_ID);
    
        // console.log(filterUnreadIDs)
        if(!theChatUser) return

        theChatUser.UNREAD_COUNT = 0

          const latestHistory = (
            allChatHistoryFilterRef.current?.length > 0 ? allChatHistoryFilterRef.current : allChatHistoryRef.current
          )?.map((el) =>
            el?.STAFF_ID === theChatUser.STAFF_ID ? theChatUser : el
          );
    
          if (filterUnreadIDs) {
            const res = await updateChatStatusAction(filterUnreadIDs);
            if (res) {
              if (allChatHistoryFilterRef.current?.length === 0) {
                setAllChatHistory([...latestHistory]);
              } else {
                setAllChatHistoryFilter([...latestHistory]);
              }
            }
          }
        } catch (error) {
          console.log(error);
        }
  };


  // const updateGroupMsgUnread = async (data) => {
  //   try {    
  //         let filterUnreadIDs = data
  //           ?.filter(
  //             (el) =>
  //               el?.GROUP_ID === currentPickedGroupChatRef.current?.GROUP_ID && el.STATUS === 0
  //           )
  //           ?.map((e) => e.CHAT_ID)
  //           ?.join(",");
    
  //         let theChatUser = (
  //           allGroupChatHistoryFilterRef.current?.length > 0 ? allGroupChatHistoryFilterRef.current : allGroupChatHistoryRef.current
  //         )?.find((chatUser) => chatUser.GROUP_ID === currentPickedGroupChatRef.current?.GROUP_ID);
    
  //       // console.log(filterUnreadIDs)
  //       if(!theChatUser) return

  //       theChatUser.UNREAD_COUNT = 0

  //         const latestHistory = (
  //           allGroupChatHistoryFilterRef.current?.length > 0 ? allGroupChatHistoryFilterRef.current : allGroupChatHistoryRef.current
  //         )?.map((el) =>
  //           el?.GROUP_ID === theChatUser.GROUP_ID ? theChatUser : el
  //         );
    
  //         if (filterUnreadIDs) {
  //           const res = await updateChatStatusAction(filterUnreadIDs);
  //           if (res) {
  //             if (allGroupChatHistoryFilterRef.current?.length === 0) {
  //               setAllGroupChatHistory([...latestHistory]);
  //             } else {
  //               setAllGroupChatHistoryFilter([...latestHistory]);
  //             }
  //           }
  //         }
  //       } catch (error) {
  //         console.log(error);
  //       }
  // };
  //  update unread









// rearrange chat block


  const reArrangeChatHistory = (chatuser) => {
      if (allChatHistoryFilter.length  === 0) {
        let values = [...allChatHistory];
        const index = values.findIndex(
          (data) => data?.STAFF_ID === chatuser?.STAFF_ID
        );

        //if at first row  //console.log('here', index, chatuser, values)
        if(index === 0) return
        
        //if found  // console.log('there', index)
        if (index !== -1) {
          // remove from position and return the element
          const element = values.splice(index, 1)[0];
          // console.log('here', element)
          // add the element to the first position
          values.splice(0, 0, element);
          // console.log(element, values);
          setAllChatHistory([...values]);
        }else{
          // if not found in the original container
          values?.splice(0, 0, chatuser);
          // console.log(values2);
          setAllChatHistory([...values]);
        }
        
      }else{

        let valuesFilter = [...allChatHistoryFilter];
          const indexFilter = valuesFilter.findIndex(
            (data) => data?.STAFF_ID === chatuser?.STAFF_ID
          );

          // if not at position 0 but found
          if(indexFilter !== 0 && indexFilter !== -1) {
              const elementFilter = valuesFilter?.splice(indexFilter, 1)[0];
              // console.log(elementFilter, valuesFilter);
              valuesFilter.splice(0, 0, elementFilter);
              setAllChatHistoryFilter([...valuesFilter]);
          }


        //update the original container after search is done with the latest snapshot 
          let values2 = [...allChatHistory];
          const index2 = values2.findIndex(
            (data) => data?.STAFF_ID === chatuser?.STAFF_ID
          );
  
          if(index2 === 0) return
          
      
          if (index2 !== -1) {
            const element2 = values2.splice(index2, 1)[0];
            values2.splice(0, 0, element2);
            // console.log(element2, values2);
            setAllChatHistory([...values2]);
          }else{
            // if not found in the original container
            values2?.splice(0, 0, chatuser);
            // console.log(values2);
            setAllChatHistory([...values2]);
          }
      }



  };

  const reArrangeGroupChatHistory = (chatBlock) => {
      if (allGroupChatHistoryFilter.length  === 0) {
        let values = [...allGroupChatHistory];
        const index = values.findIndex(
          (data) => data?.GROUP_ID === chatBlock?.GROUP_ID
        );

        //if at first row  //console.log('here', index, chatuser, values)
        if(index === 0){
           values[0] = chatBlock;
          //  console.log(values, 'here')
           return  setAllGroupChatHistory([...values]);
        } 
        
        //if found  // console.log('there', index)
        if (index !== -1) {
          // remove from position and return the element
          values.splice(index, 1);
          // console.log('here', element)
          // add the element to the first position
          values.splice(0, 0, chatBlock);
          // console.log(values, 'here2')
          // console.log(element, values);
          setAllGroupChatHistory([...values]);
        }
        
      }else{

        let valuesFilter = [...allGroupChatHistoryFilter];
          const indexFilter = valuesFilter.findIndex(
            (data) => data?.GROUP_ID === chatBlock?.GROUP_ID
          );

          // if not at position 0 but found
          if(indexFilter !== 0 && indexFilter !== -1) {
              valuesFilter?.splice(indexFilter, 1);
              // console.log(elementFilter, valuesFilter);
              valuesFilter.splice(0, 0, chatBlock);
              setAllGroupChatHistoryFilter([...valuesFilter]);
          }

          if(indexFilter === 0) {
                 values2[0] = chatBlock;
                 setAllGroupChatHistoryFilter([...values2]);
            
          }


        //update the original container after search is done with the latest snapshot 
          let values2 = [...allGroupChatHistory];
          const index2 = values2.findIndex(
            (data) => data?.GROUP_ID === chatBlock?.GROUP_ID
          );
  
          if(index2 === 0) {
                 values2[0] =  chatBlock;
            setAllGroupChatHistory([...values2]);
            return
          }
           
          
      
          if (index2 !== -1) {
            values2.splice(index2, 1);
            values2.splice(0, 0, chatBlock);
            // console.log(element2, values2);
            setAllGroupChatHistory([...values2]);
          }else{
            // if not found in the original container
            values2[0] = chatBlock;
            // console.log(values2);
            setAllGroupChatHistory([...values2]);
          }
      }
  };
  // rearrange chat block




// =====================================socket==================================

  useEffect(() => {

    function onConnect() {
      socket.emit('addUser', userData?.data?.STAFF_ID)

    }

    function onDisconnect() {
      // console.timeLog("disconnected");
    }

    if( (pathname.includes('/message_rooms')) || (pathname==='/engage/posts') || (pathname==='/engage/home')  || (pathname.includes('/messaging/engage/group')) ){
          // socket.connect()
          socket.on("connect", onConnect);
          socket.emit('addUser', userData?.data?.STAFF_ID)
          socket.on("disconnect", onDisconnect);
    }


   

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [pathname, userData?.data?.STAFF_ID]);





  
  const onGroupPage = (room)=>{
      if(socket){
        socket.emit('join', room)
      }
  }






  const fetchHistory = async () => {
    try {

      if((pathname==='/engage/home' || pathname==='/engage/posts')){
          const res = await allChatHistoryCall(userData?.data);
          if (res) {
            const incoming = [...res.data.data, ...res.data.dept_data]
            const uniqueIds = new Set();
            const uniqueArray = incoming.filter(obj => {
              if (!uniqueIds.has(obj.STAFF_ID)) {
                uniqueIds.add(obj.STAFF_ID);
                return true;
              }
              return false;
            });

            const all =  uniqueArray.map(el => {
              if(el.STAFF_ID === 1){
               el.DEPARTMENT= "CUSTOMER SUPPORT",
                el.DIRECTORATE= "",
                el.LAST_NAME= "Support Team"
                el.FIRST_NAME= ""
                  return el
              }
              return el
            } )
  
            setChatHistory([...all]);
          }
      }
    } catch (error) {
      console.log(error);
    }
  };
  



// update incoming
  const updateIncomingInactiveChat = (msg) =>{

    if(chatUpdateTimeRef.current === msg?.messageObj?.CHAT_ID){
        return
    }

    let theChatUser = (
      allChatHistoryFilterRef.current?.length > 0 ? allChatHistoryFilterRef.current : allChatHistoryRef.current
    )?.find((cUser) => cUser.STAFF_ID === msg?.messageObj?.SENDER_ID);

    // console.log(theChatUser)

    if(!theChatUser){
      fetchHistory()
      return
    }

    theChatUser.UNREAD_COUNT += 1
    // console.log(theChatUser, msg?.messageObj)



    const latestHistory = (
      allChatHistoryFilterRef.current?.length > 0 ? allChatHistoryFilterRef.current : allChatHistoryRef.current
    )?.map((el) =>
      el?.STAFF_ID === theChatUser.STAFF_ID ? theChatUser : el
    );

    if (allChatHistoryFilterRef.current?.length === 0) {
      setAllChatHistory([...latestHistory]);
    } else {
      setAllChatHistoryFilter([...latestHistory]);
    }
    chatUpdateTimeRef.current = msg?.messageObj?.CHAT_ID
    reArrangeChatHistory(theChatUser)
  }


  const updateIncomingInactiveGroupChat = (msg) =>{

    if(groupChatUpdateTimeRef.current === msg?.messageObj?.CHAT_ID || msg?.messageObj?.SENDER_ID === userData?.data?.STAFF_ID){
      // console.log('sametime')
        return
    }

    let theGROUPChat = (
      allGroupChatHistoryFilterRef.current?.length > 0 ? allGroupChatHistoryFilterRef.current : allGroupChatHistoryRef.current
    )?.find((cGroup) => cGroup.GROUP_ID === msg?.messageObj?.GROUP_ID);

    // console.log(theChatUser)

    // theGROUPChat.UNREAD_COUNT += 1
    theGROUPChat.UNREAD_CHAT += 1
    // console.log(theChatUser, msg?.messageObj)



    const latestHistory = (
      allGroupChatHistoryFilterRef.current?.length > 0 ? allGroupChatHistoryFilterRef.current : allGroupChatHistoryRef.current
    )?.map((el) =>
      el?.GROUP_ID === theGROUPChat.GROUP_ID ? theGROUPChat : el
    );

    if (allChatHistoryFilterRef.current?.length === 0) {
      setAllGroupChatHistory([...latestHistory]);
    } else {
      setAllGroupChatHistoryFilter([...latestHistory]);
    }
    groupChatUpdateTimeRef.current = msg?.messageObj?.CHAT_ID
    // reArrangeGroupChatHistory(theGROUPChat)
  }
  // update incoming

  



  

  const removeTyping = ()=>{
    setTypingObj(null)
  }
  
  
  const sendMessage = (msg)=>{
    socket.emit('sendMessage', {senderId: msg?.SENDER_ID,  receiverId:  msg?.RECEIVER_ID,     messageObj: msg})
  }

  const sendGroupMessage = (msg)=>{
    // console.log('sending...', msg)
    socket.emit('sendGroupMessage', {senderId: msg?.GROUP_ID,  room:  msg?.ROOM,  messageObj: msg})
    // console.log('sent 100%')
  }
  


  const sendTypingSignal = (typingObj)=>{
    // console.log(typingObj)

    socket.emit('sendTyping', {senderId: typingObj?.SENDER_ID,  receiverId: typingObj?.RECEIVER_ID,})
  }
  
  
  useEffect(() => {

    const incomingOnlineUser = (users)=>{
      // console.log(users)
      setOnlineUsers([...users])
  
    }
  
    socket.on('getUsers', (incoming) => incomingOnlineUser(incoming));
  
  }, [onlineUsers]);



  useEffect(() => {

    const incomingMessage = (msg)=>{

      if(currentPickedChatRef.current?.STAFF_ID === msg?.messageObj?.SENDER_ID ){
        setAllChat([...allChat, msg.messageObj])
        setShouldScroll(true)
        removeTyping()
        
        setTimeout(() => {
          // console.log(msg, currentPickedChat)
  
          updateUnread([...allChat, msg.messageObj])
        }, 200);
  
      }else{
  
        // console.log(allChatHistoryFilter, allChatHistory, )
        updateIncomingInactiveChat(msg)
      
      }
    }
  
    socket.on('getMessage', (incomingMsg) => incomingMessage(incomingMsg));

  
  }, [allChat, currentPickedChat, onlineUsers,]);



  useEffect(() => {
    const incomingGroupMessage = (msg)=>{
 
      if(currentPickedGroupChatRef.current?.GROUP_ID === msg?.messageObj?.GROUP_ID && msg?.messageObj?.SENDER_ID !== userData?.data?.STAFF_ID ){
        // console.log('here')

        if(groupChatUpdateTimeRef.current !== msg?.messageObj?.CHAT_ID){
          setGroupChat([...allGroupChatRef.current, msg.messageObj])
          setShouldScroll(true)
          groupChatUpdateTimeRef.current = msg?.messageObj?.CHAT_ID
        }
        // removeTyping()
        
        setTimeout(() => {
          // updateGroupMsgUnread([...allGroupChat, msg.messageObj])
          reArrangeGroupChatHistory(msg?.messageObj)
        }, 200);
  
      }else{
        updateIncomingInactiveGroupChat(msg)
      }
    }
  
    socket.on('groupMessage', (incomingMsg) => incomingGroupMessage(incomingMsg));

  
  }, [allChat, currentPickedChat, onlineUsers,]);


  useEffect(() => {

    const incomingTypingSignal = (data)=>{
      // console.log('typing', data?.senderId)
  
      // console.log(currentPickedChatRef.current?.STAFF_ID, data?.senderId)
  
      if(currentPickedChatRef.current?.STAFF_ID === data?.senderId ){
        setTypingObj(data?.senderId)
  
       setTimeout(() => { removeTyping() }, 5000);
      }
  
    }
  
    socket.on('getTyping', (incomingID) => incomingTypingSignal(incomingID));

  
  }, [currentPickedChat]);



  // function to handle when a user or socket is typing
  // const handleUserTyping = () => {
  //   clearTimeout(timeout);
  //   socket.emit('userTyping', socket.id, 'start');
  //   var timeout = setTimeout(() => { socket.emit('userTyping', socket.id, 'stop'); }, 1000);
  // };

   // scroll to bottom page function when message is sent
    //  const scrollToBottom = () => {
    //   window.scroll({
    //     top: document.body.offsetHeight, left: 0, behavior: 'smooth',
    //   });
    // };

  

// =====================================socket==================================





  return (
    <SocketContext.Provider
      value={{
        setAllChat,
        allChat,
        setChat,
        addChat,
        clearChat,
        shouldScroll,
        setShouldScroll,
        allChatHistory,
        setChatHistory,
        reArrangeChatHistory,
        setMoreChat,
        setChatHistoryFilter,
        allChatHistoryFilter,
        sendMessage,
        sendTypingSignal,
        onlineUsers,
        typingObj,
        setCurrentPickedChat,
        currentPickedChat,
        allChatRef,
        deleteAChat,




        //group 
        sendGroupMessage,
        onGroupPage,
        setChatHistoryGroupFilter,
        setChatGroupHistory,
        clearGroupChat,
        addGroupChat,
        setMoreGroupChat,
        setGroupChat,
        setCurrentPickedGroupChat,
        currentPickedGroupChat,
        allGroupChatHistoryFilter,
        allGroupChatHistory,
        allGroupChat,
        allGroupChatRef,
        reArrangeGroupChatHistory,
        deleteAGroupChat
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContextProvider, SocketContext };
