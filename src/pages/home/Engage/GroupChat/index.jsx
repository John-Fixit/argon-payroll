/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";
import Body from "./components/Body";
import Header from "./components/Header";
import Form from "./components/Form";
import Sidebar from "./components/Sidebar";
import { dashboardContext } from "../../../../context/Dashboard";
import { useMediaQuery } from "react-responsive";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import {
  useGetAllChatHistory,
  useGetAllChatHistoryByName,
} from "../../../../lib/query/queryandMutation";
import { SocketContext } from "../../../../context/SocketContext";
import DefaultHeader from "./components/DefaultHeader";
import { IoClose } from "react-icons/io5";
import { Avatar, Chip, Radio, RadioGroup } from "@nextui-org/react";
import { InfoIcon, Pencil, Send } from "lucide-react";
import { CiCircleRemove } from "react-icons/ci";
import ChatDrawer from "../../rightMenu/components/ChatDrawer";
// import { MdRemoveCircle } from "react-icons/md";
import allUser from "./components/data";

const GroupChatRoom = () => {
  const { toggleSideBar } = useContext(dashboardContext);

  const [showSearchInp, setShowSearchInp] = useState(false);

  const [chatSidebarOpen, setChatSidebarOpen] = useState(false);
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [isCompose, setIsCompose] = useState(false);
  const [message, setMessage] = useState("");

  let isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  let isMidScreen = useMediaQuery({ query: "(max-width: 1023px)" });
  // let isMediumScreen = useMediaQuery({ query: "(max-width: 1024px)" });

  const sidebarRef = useRef();
  const messageModalRef = useRef();

  //
  const { userData } = useCurrentUser();
  const { mutateAsync: allChatHistoryCall } = useGetAllChatHistory();
  const { mutateAsync: searchChat } = useGetAllChatHistoryByName();

  const [searchTerm, setSearchTerm] = useState("");
  
  const {
    allChatHistory,
    setChatHistory,
    setChatHistoryFilter,
    allChatHistoryFilter,
  } = useContext(SocketContext);
  
  //  Group
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [temporaryGroup, setTemporaryGroup] = useState(null);
  
  
  
  
  
  
  
  // chat group slider 
  const [showLargeChatContainer, setShowLargeChatContainer] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  
  
  


  // 
  // for group
    const [searchValue, setSearchValue] = useState('hello')
    const [filteredData, setFilteredData] = useState([])



    const handleUserFilter = (e) => {
        const value = e.target.value;
        let updatedData = [];
        setSearchValue(value);
    
        if (value.length) {
          updatedData = allUser?.filter((item) => {
            const startsWith =
              item?.name?.toLowerCase().startsWith(value.toLowerCase()) 
              
            const includes =
              item?.name?.toLowerCase().includes(value.toLowerCase()) 
          
            if (startsWith) {
              return startsWith;
            } else if (!startsWith && includes) {
              return includes;
            } else return null;
          });
          setFilteredData(updatedData);
          setSearchValue(value);
        }
      };

  
  
  
  
  const selectConversation = () => {
    if (isSmallScreen) {
      setChatSidebarOpen(false);
    }
  };

  const sidebar_animation = isSmallScreen
    ? {
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: 350,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "0rem",
          transition: {
            damping: 40,
          },
        },
      };

  const messageModal = isMidScreen
    ? {
        open: {
          x: 0,
          width: "23rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: 350,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          x: 0,
          width: "24rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: 350,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      };

  useEffect(() => {
    if (isSmallScreen) {
      setChatSidebarOpen(false);
    } else {
      setChatSidebarOpen(true);
    }
  }, [isSmallScreen]);

  // =========================
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await allChatHistoryCall(userData?.data);
        if (res) {
          const incoming = [...res.data.data, ...res.data.dept_data];
          const uniqueIds = new Set();
          const uniqueArray = incoming.filter((obj) => {
            if (!uniqueIds.has(obj.STAFF_ID)) {
              uniqueIds.add(obj.STAFF_ID);
              return true;
            }
            return false;
          });

          setChatHistory([...uniqueArray]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchHistory();
  }, [userData]);

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };

  const searchConversation = async (value) => {
    try {
      if (value.length < 2) return;

      const data = { ...userData?.data, SEARCH: value };
      const res = await searchChat(data);
      if (res) {
        setChatHistoryFilter(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = debounce((searchTerm) => {
    searchConversation(searchTerm);
  }, 2500);

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    handleSearch(value);
  };

  const toggleInp = () => {
    // if(showSearchInp){
    setChatHistoryFilter([]);
    setSearchTerm("");

    // }
    // setShowSearchInp(false)
  };

  // const selectAChat = (user) => {
  //   setSelectedChat(user);
  //   if (isSmallScreen) {
  //     setChatSidebarOpen(false);
  //   }
  // };

  // useEffect(() => {

  //  const timer = setTimeout(() => {
  //    if(allChatHistory?.length > 0 && !selectedChat){
  //       // console.log(allChatHistory)
  //       const firstUser = allChatHistory[0]
  //       selectAChat(firstUser)
  //     }
  //   }, 3000);

  //   return () => {
  //     clearTimeout(timer)
  //   }
  // }, [allChatHistory, selectedChat])

  // useEffect(() => {

  //   return () => {
  //     setCurrentPickedChat(null)
  //   }
  // }, [])

  // =========================

  const openMessage = () => {
    setMessageModalOpen(!messageModalOpen);
  };

  const closeMsg = () => {
    if (isCompose) {
      setIsCompose(false);
      return;
    }
    openMessage();
  };

  const openDefaultChatScreen = (value) => {
    setTemporaryGroup(value);
  };









  // group chat
  const selectAChat = (user)=>{
    setShowLargeChatContainer(true);
    setSelectedChat(user)
  }




































  return (
    <div className="flex h-[90%] flex-col overflow-y-clip font-Exotic ">
      <div
        onClick={() => setChatSidebarOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[50] bg-chatoverlay cursor-pointer   ${
          chatSidebarOpen ? "block" : "hidden"
        } `}
      ></div>

      <div
        onClick={() => setMessageModalOpen(false)}
        className={`fixed inset-0 max-h-screen z-[20] cursor-pointer   ${
          messageModalOpen ? "block" : "hidden"
        } `}
      ></div>

      <div className="px-0  h-full">
        <div className="relative  h-full flex-1  flex">
          {/* {`w-full min-h-[93vh] ${ (sidebarMinimized) ?  'lg:ml-[7.5rem]'  : (sidebarOpen) ? 'lg:ml-64' : (!sidebarMinimized &&!sidebarOpen) &&'lg:ml-0'}`} */}

          {
            // selectedChat  ? (
            //   <div className={`h-full flex-1 flex flex-col chatw fixed top-[4.6rem] left-[16rem] right-64   ${(chatSidebarOpen) ? 'md:mr-64' : (!chatSidebarOpen) &&'md:ml-0'}`}>
            //     <Header
            //           toggleSideBar={toggleSideBar}
            //           showDrawer={()=>setChatSidebarOpen(true)}
            //           selectedUserData={selectedChat}
            //     />
            //     <Body mate={selectedChat} />
            //     <Form mate={selectedChat} />
            //   </div>

            //selectedChat && !isCreatingGroup  ? (
            temporaryGroup && !isCreatingGroup ? (
              <div
                className={`h-[94%] flex-1 flex flex-col fixed py-2 left-[0rem] lg:left-[16rem] ${
                  isSmallScreen
                    ? "chatw-sm"
                    : isMidScreen
                    ? "chatw-lg"
                    : "chatw"
                }    ${
                  chatSidebarOpen
                    ? "md:mr-[16rem] "
                    : !chatSidebarOpen && "md:ml-0 mr-[0rem]"
                }`}
              >
                {/* <div className="flex flex-col mx-10"> */}
                <Header
                  toggleSideBar={toggleSideBar}
                  showDrawer={() => setChatSidebarOpen(true)}
                  selectedUserData={selectedChat}
                  openMessage={openMessage}
                  isCreatingGroup={isCreatingGroup}
                  setIsCreatingGroup={setIsCreatingGroup}
                  temporaryGroup={temporaryGroup}
                />
                <Body
                  mate={selectedChat}
                  isCreatingGroup={isCreatingGroup}
                  temporaryGroup={temporaryGroup}
                />
                <Form mate={selectedChat} temporaryGroup={temporaryGroup} />

                {/* </div> */}
              </div>
            ) : (
              // <div className={`h-[94%] flex-1 flex flex-col fixed  left-[0rem] lg:left-[16rem] ${ isSmallScreen ? 'chatw-sm' : isMidScreen ? 'chatw-lg' :  'chatw'}    ${(chatSidebarOpen) ? 'md:mr-[16rem] ' : (!chatSidebarOpen) &&'md:ml-0 mr-[0rem]'}`}>

              //     <Header
              //           toggleSideBar={toggleSideBar}
              //           showDrawer={()=>setChatSidebarOpen(true)}
              //           selectedUserData={selectedChat}
              //     />
              //     <Body mate={selectedChat} />
              //     <Form mate={selectedChat} />

              // </div>

              // <div className={`w-full h-full flex-1  flex-col items-center justify-center ${chatSidebarOpen && 'mr-[16rem]'}`}>

              //   <DefaultHeader toggleSideBar={toggleSideBar}
              //         showDrawer={()=>setChatSidebarOpen(true)}/>

              //   <div className={`h-full flex-1  flex-col items-center justify-center flex w-full ${chatSidebarOpen && 'mr-[16rem]'}`}>
              //       <span className="text-gray-300  italic text-center text-xl md:text-5xl ">Start a Conversation</span>
              //   </div>

              // </div>
              <div
                className={`w-full overflow-y-auto scrollbar-thumb-slate-100 scrollbar-none h-[90vh] flex-1 mt-1  flex-col items-center justify-center 
                   "
                }`}
                // className={`w-full overflow-y-auto scrollbar-thumb-slate-100 scrollbar-none h-[90vh] flex-1 mt-1  flex-col items-center justify-center ${
                //   chatSidebarOpen && "mr-[16rem] "
                // }`}
              >
                <DefaultHeader
                  toggleSideBar={toggleSideBar}
                  isCreatingGroup={isCreatingGroup}
                  showDrawer={() => setChatSidebarOpen(true)}
                  setIsCreatingGroup={setIsCreatingGroup}
                  handleUserFilter={handleUserFilter}
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                />

                {/* <div className={`h-full flex-1  flex-col items-center justify-center flex w-full ${chatSidebarOpen && 'mr-[16rem]'}`}>
                    <span className="text-gray-300  italic text-center text-xl md:text-5xl ">Start a Conversation</span>
                </div> */}
                <div
                  className={`h-full  flex-1  flex-col  flex w-full gap-3 mt-2`}
                >
                  {/* <span className="text-gray-400  italic text-xl md:text-3xl ">Start a Conversation</span> */}

                  {isCreatingGroup ? (
                    <div className="flex flex-col mt-4">
                      <div className="bg-white p-5 rounded-md flex gap-5">
                        <div className="flex flex-col gap-2 relative items-center">
                          <Avatar size="lg" />
                          <CiCircleRemove
                            size={22}
                            strokeWidth={0.8}
                            className="text-white absolute border-gray-200 bg-bgDarkColor rounded-full  -right-2 top-0 cursor-pointer"
                            onClick={() => {}}
                          />
                          <span className=" font-bold">Adeoye</span>
                        </div>
                        <div className="flex flex-col gap-2 relative items-center">
                          <Avatar size="lg" />
                          <CiCircleRemove
                            size={22}
                            strokeWidth={0.8}
                            className="text-white absolute border-gray-200 bg-bgDarkColor rounded-full  -right-2 top-0 cursor-pointer"
                            onClick={() => {}}
                          />
                          <span className=" font-bold">Adewale</span>
                        </div>
                        <div className="flex flex-col gap-2 relative items-center">
                          <Avatar size="lg" />
                          <CiCircleRemove
                            size={22}
                            strokeWidth={0.8}
                            className="text-white absolute border-gray-200 bg-bgDarkColor rounded-full  -right-2 top-0 cursor-pointer"
                            onClick={() => {}}
                          />
                          <span className=" font-bold">Adeyemi</span>
                        </div>
                        <div className="flex flex-col gap-2 relative items-center">
                          <Avatar size="lg" />
                          <CiCircleRemove
                            size={22}
                            strokeWidth={0.8}
                            className="text-white absolute border-gray-200 bg-bgDarkColor rounded-full  -right-2 top-0 cursor-pointer"
                            onClick={() => {}}
                          />
                          <span className=" font-bold">Adeolu</span>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        {/* next */}
                        <div className="py-2">
                          <span className="text-xl font-bold py-1">A</span>
                          <div className="bg-white p-4 rounded-md  flex flex-col">
                            <label htmlFor="f" className="cursor-pointer">
                              <RadioGroup label="">
                                <div className="flex items-center justify-between border-b py-2">
                                  <div className="flex gap-3 ">
                                    <Avatar size="lg" />
                                    <div className="flex flex-col gap-1">
                                      <span className="text-medium font-bold">
                                        Adewale Emmanuel
                                      </span>
                                      <span>Human Resouerces</span>
                                    </div>
                                  </div>
                                  <Radio id="f" value={"e"}></Radio>
                                </div>
                              </RadioGroup>
                            </label>
                            <label htmlFor="g" className="cursor-pointer">
                              <RadioGroup label="">
                                <div className="flex items-center justify-between border-b py-2">
                                  <div className="flex gap-3 ">
                                    <Avatar size="lg" />
                                    <div className="flex flex-col gap-1">
                                      <span className="text-medium font-bold">
                                        Adewale Emmanuel
                                      </span>
                                      <span>Human Resouerces</span>
                                    </div>
                                  </div>
                                  <Radio id="g" value={"e"}></Radio>
                                </div>
                              </RadioGroup>
                            </label>
                            <label htmlFor="h" className="cursor-pointer">
                              <RadioGroup label="">
                                <div className="flex items-center justify-between border-b py-2">
                                  <div className="flex gap-3 ">
                                    <Avatar size="lg" />
                                    <div className="flex flex-col gap-1">
                                      <span className="text-medium font-bold">
                                        Adewale Emmanuel
                                      </span>
                                      <span>Human Resouerces</span>
                                    </div>
                                  </div>
                                  <Radio id="h" value={"e"}></Radio>
                                </div>
                              </RadioGroup>
                            </label>
                            <label htmlFor="i" className="cursor-pointer">
                              <RadioGroup label="">
                                <div className="flex items-center justify-between border-b py-2">
                                  <div className="flex gap-3 ">
                                    <Avatar size="lg" />
                                    <div className="flex flex-col gap-1">
                                      <span className="text-medium font-bold">
                                        Adewale Emmanuel
                                      </span>
                                      <span>Human Resouerces</span>
                                    </div>
                                  </div>
                                  <Radio id="i" value={"e"}></Radio>
                                </div>
                              </RadioGroup>
                            </label>
                          </div>
                        </div>
                        {/* next */}

                        {/* next */}
                        <div className="py-2">
                          <span className="text-xl font-bold py-1">B</span>
                          <div className="bg-white p-4 rounded-md  flex flex-col">
                            <label htmlFor="e" className="cursor-pointer">
                              <RadioGroup label="">
                                <div className="flex items-center justify-between border-b py-2">
                                  <div className="flex gap-3 ">
                                    <Avatar size="lg" />
                                    <div className="flex flex-col gap-1">
                                      <span className="text-medium font-bold">
                                        Babajide Emmanuel
                                      </span>
                                      <span>Human Resouerces</span>
                                    </div>
                                  </div>
                                  <Radio id="e" value={"e"}></Radio>
                                </div>
                              </RadioGroup>
                            </label>
                            <label htmlFor="b" className="cursor-pointer">
                              <RadioGroup label="">
                                <div className="flex items-center justify-between border-b py-2">
                                  <div className="flex gap-3 ">
                                    <Avatar size="lg" />
                                    <div className="flex flex-col gap-1">
                                      <span className="text-medium font-bold">
                                        Babajide Emmanuel
                                      </span>
                                      <span>Human Resouerces</span>
                                    </div>
                                  </div>
                                  <Radio id="b" value={"e"}></Radio>
                                </div>
                              </RadioGroup>
                            </label>
                            <label htmlFor="c" className="cursor-pointer">
                              <RadioGroup label="">
                                <div className="flex items-center justify-between border-b py-2">
                                  <div className="flex gap-3 ">
                                    <Avatar size="lg" />
                                    <div className="flex flex-col gap-1">
                                      <span className="text-medium font-bold">
                                        Babajide Emmanuel
                                      </span>
                                      <span>Human Resouerces</span>
                                    </div>
                                  </div>
                                  <Radio id="c" value={"e"}></Radio>
                                </div>
                              </RadioGroup>
                            </label>
                            <label htmlFor="d" className="cursor-pointer">
                              <RadioGroup label="">
                                <div className="flex items-center justify-between border-b py-2">
                                  <div className="flex gap-3 ">
                                    <Avatar size="lg" />
                                    <div className="flex flex-col gap-1">
                                      <span className="text-medium font-bold">
                                        Babajide Emmanuel
                                      </span>
                                      <span>Human Resouerces</span>
                                    </div>
                                  </div>
                                  <Radio id="d" value={"e"}></Radio>
                                </div>
                              </RadioGroup>
                            </label>
                          </div>
                        </div>
                        {/* next */}
                      </div>
                    </div>
                  ) : (
                    // <img src="/assets/images/default.jpeg" className=" h-[80%] rounded-md "  alt="" />

                    <div className="flex flex-col">
                      <div className="bg-white p-8 rounded-md flex gap-10 gap-x-14 flex-wrap">
                        {
                         (searchValue ? filteredData :  allUser)?.map(grp =>(
                          <div key={grp?.id} className="flex flex-col gap-2 relative items-center cursor-pointer"  onClick={()=>selectAChat(grp)}>
                            <Avatar size="lg" />
                            <InfoIcon
                              size={22}
                              strokeWidth={2}
                              className="text-white absolute border-gray-200 bg-bgDarkColor rounded-full  -right-2 top-0 cursor-pointer"
                              onClick={() => {}}
                            />
                            <span className=" font-bold truncate w-12 ">{grp?.name}</span>
                          </div>

                          ))
                        }

                       
                        {/* <div className="flex flex-col gap-2 relative items-center cursor-pointer">
                          <Avatar size="lg" />
                          <CiCircleRemove
                            size={22}
                            strokeWidth={0.8}
                            className="text-white absolute border-gray-200 bg-bgDarkColor rounded-full  -right-2 top-0 cursor-pointer"
                            onClick={() => {}}
                          />
                          <span className=" font-bold">Group C</span>
                        </div>
                        <div className="flex flex-col gap-2 relative items-center cursor-pointer">
                          <Avatar size="lg" />
                          <CiCircleRemove
                            size={22}
                            strokeWidth={0.8}
                            className="text-white absolute border-gray-200 bg-bgDarkColor rounded-full  -right-2 top-0 cursor-pointer"
                            onClick={() => {}}
                          />
                          <span className=" font-bold">Group D</span>
                        </div>
                        <div className="flex flex-col gap-2 relative items-center cursor-pointer">
                          <Avatar size="lg" />
                          <CiCircleRemove
                            size={22}
                            strokeWidth={0.8}
                            className="text-white absolute border-gray-200 bg-bgDarkColor rounded-full  -right-2 top-0 cursor-pointer"
                            onClick={() => {}}
                          />
                          <span className=" font-bold">Group D</span>
                        </div>
                        <div className="flex flex-col gap-2 relative items-center cursor-pointer">
                          <Avatar size="lg" />
                          <CiCircleRemove
                            size={22}
                            strokeWidth={0.8}
                            className="text-white absolute border-gray-200 bg-bgDarkColor rounded-full  -right-2 top-0 cursor-pointer"
                            onClick={() => {}}
                          />
                          <span className=" font-bold">Group D</span>
                        </div>
                        <div className="flex flex-col gap-2 relative items-center cursor-pointer">
                          <Avatar size="lg" />
                          <CiCircleRemove
                            size={22}
                            strokeWidth={0.8}
                            className="text-white absolute border-gray-200 bg-bgDarkColor rounded-full  -right-2 top-0 cursor-pointer"
                            onClick={() => {}}
                          />
                          <span className=" font-bold">Group D</span>
                        </div>
                        <div className="flex flex-col gap-2 relative items-center cursor-pointer">
                          <Avatar size="lg" />
                          <CiCircleRemove
                            size={22}
                            strokeWidth={0.8}
                            className="text-white absolute border-gray-200 bg-bgDarkColor rounded-full  -right-2 top-0 cursor-pointer"
                            onClick={() => {}}
                          />
                          <span className=" font-bold">Group D</span>
                        </div>
                        <div className="flex flex-col gap-2 relative items-center cursor-pointer">
                          <Avatar size="lg" />
                          <CiCircleRemove
                            size={22}
                            strokeWidth={0.8}
                            className="text-white absolute border-gray-200 bg-bgDarkColor rounded-full  -right-2 top-0 cursor-pointer"
                            onClick={() => {}}
                          />
                          <span className=" font-bold">Group D</span>
                        </div>
                        <div className="flex flex-col gap-2 relative items-center cursor-pointer">
                          <Avatar size="lg" />
                          <CiCircleRemove
                            size={22}
                            strokeWidth={0.8}
                            className="text-white absolute border-gray-200 bg-bgDarkColor rounded-full  -right-2 top-0 cursor-pointer"
                            onClick={() => {}}
                          />
                          <span className=" font-bold">Group D</span>
                        </div>
                        <div className="flex flex-col gap-2 relative items-center cursor-pointer">
                          <Avatar size="lg" />
                          <CiCircleRemove
                            size={22}
                            strokeWidth={0.8}
                            className="text-white absolute border-gray-200 bg-bgDarkColor rounded-full  -right-2 top-0 cursor-pointer"
                            onClick={() => {}}
                          />
                          <span className=" font-bold">Group D</span>
                        </div>
                        <div className="flex flex-col gap-2 relative items-center cursor-pointer">
                          <Avatar size="lg" />
                          <CiCircleRemove
                            size={22}
                            strokeWidth={0.8}
                            className="text-white absolute border-gray-200 bg-bgDarkColor rounded-full  -right-2 top-0 cursor-pointer"
                            onClick={() => {}}
                          />
                          <span className=" font-bold">Group D</span>
                        </div> */}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          }

          {/* the drawer sidebar */}

          {/* <motion.div
                ref={sidebarRef}
                variants={sidebar_animation}
                initial={{ x: isSmallScreen ? 350 : 0 }}
                animate={
                    chatSidebarOpen
                    ? "open"
                    : "closed"
                }
                className={`shadow-sidebar group  ${chatSidebarOpen && isSmallScreen ? 'md:z-[40] z-[60]' : 'md:z-[5] z-[5]' } max-w-[16rem]  w-[16rem] 
                    fixed  right-0
                h-screen  ${chatSidebarOpen && isSmallScreen ? 'top-0' :  'top-[4.2rem]'}      `}
            >
                    <Sidebar 
                        showSearchInp={showSearchInp}
                        setShowSearchInp={setShowSearchInp} 
                        selectConversation={selectConversation}
                        allChatHistory={allChatHistory}
                        allChatHistoryFilter={allChatHistoryFilter}
                        searchTerm={searchTerm}
                        handleChange={handleChange}
                        selectAChat={selectAChat}
                        closeInp={toggleInp}
                        selectedUserData={selectedChat}
                        setIsCreatingGroup={()=>setIsCreatingGroup(true)}
                        openDefaultChatScreen={openDefaultChatScreen}
                    />
            </motion.div> */}

          {/* the drawer side end */}

          {/* the drawer message */}

          <motion.div
            ref={messageModalRef}
            variants={messageModal}
            initial={{ x: 0 }}
            animate={messageModalOpen ? "open" : "closed"}
            className={`shadow-sidebar group  md:z-[30] z-[40] 
                    fixed  right-0 hidden
                h-screen  ${
                  messageModalOpen && isSmallScreen ? "top-0" : "top-[4.2rem]"
                }      `}
          >
            <div className=" bg-white h-full border-2  border-gray-300 rounded-l-lg p-4 shadow relative">
              <div>
                <div
                  className={`absolute cursor-pointer hover:bg-slate-50 top-2 md:top-3 right-5  border border-slate-400 rounded-full`}
                >
                  <IoClose
                    className="text-slate-400 font-thin"
                    size={20}
                    onClick={closeMsg}
                  />
                </div>
              </div>

              {isCompose ? (
                <div className="flex flex-col gap-4 mt-7 px-2">
                  <div className="text-xl font-Lato">
                    Send SMS to <br /> Micheal Smith
                  </div>

                  <textarea
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    className="border-1 shadow-md border-gray-400/70 p-2 rounded-md"
                    placeholder="type a message..."
                    name=""
                    id=""
                    cols="30"
                    rows="6"
                    maxLength={150}
                  ></textarea>

                  <div className="flex justify-end">
                    <Chip className="flex shadow" color="light">
                      <span>{message?.length}</span>
                      <span>/150</span>
                    </Chip>
                  </div>
                  <button className="bg-blue-900/70 py-3 rounded-md text-white  flex items-center justify-center gap-2">
                    <Send size={15} />
                    <span className="font-bold ">Send</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4 mt-4 ">
                  <div>
                    <button
                      onClick={() => setIsCompose(true)}
                      className="bg-blue-900/70 text-white px-3 py-2 rounded outline-none hover:bg-blue-900/50  active:bg-blue-900/90 flex gap-2 items-center"
                    >
                      <Pencil size={14} />
                      Compose
                    </button>
                  </div>

                  <div className="text-xl font-Lato">SMS to Micheal Smith</div>

                  <div className="flex flex-col ">
                    <div className=" shadow-md rounded-md p-3 border">
                      <span>
                        Dear william smith, pls attend to my report as soon as
                        possible
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* the drawer message end */}
        </div>
      </div>





      {
        <ChatDrawer
          isOpen={showLargeChatContainer}
          onClose={() => setShowLargeChatContainer(false)}
          user={selectedChat}
          setUser={()=>setSelectedChat(null)}
          isGroup={true}
        />
      }
    </div>
  );
};

export default GroupChatRoom;
