/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useRef, useState } from "react";
import { dashboardContext } from "../../../../context/Dashboard";
import { motion } from "framer-motion";
import Sidebar from "./components/Sidebar";
import { useMediaQuery } from "react-responsive";
import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import { SocketContext } from "../../../../context/SocketContext";
import { getGroupChatHistoryAction, getGroupChatMemberAction } from "../../../../API/group-chat";
import EmptyChat from "../../../../assets/images/empty-chat.png"
import ExpandedDrawer from "../../../../components/modals/ExpandedDrawer";

const Group = ({isOpen, onClose, user, fromSupport, setFromSupport}) => {
  const { toggleSideBar, sidebarMinimizedHome } = useContext(dashboardContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  let isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  let isMediumScreen = useMediaQuery({ query: "(max-width: 1024px)" });
  const { userData } = useCurrentUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchInp, setShowSearchInp] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const temporaryGroup = null;

const {setChatGroupHistory, allGroupChatHistory, allGroupChatHistoryFilter, onGroupPage} = useContext(SocketContext)
const [groupMember, setGroupMember] = useState([])
  const sidebarRef = useRef();
  const sidebarWidth = "23rem";
  const sidebar_animation = isSmallScreen
    ? {
        open: {
          x: 0,
          width: sidebarWidth,
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -350,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
        minimize: {
          x: "7.5rem",
          width: "7.5rem",
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : isMediumScreen
    ? {
        //medium //
      }
    : {
        open: {
          x: "16rem",
          width: sidebarWidth,
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
        minimize: {
          x:"7.5rem",
          width: "7.5rem",
          transition: {
            damping: 40,
          },
        },
      };

  useEffect(() => {
    if (isSmallScreen) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isSmallScreen]);

  // group chat
  const selectAChat = (group) => {
    setSelectedChat(group);
    selectConversation()
    getGroupMember(group)
  };

  const toggleInp = () => {
    setSearchTerm("");
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
  };

  const selectConversation = () => {
    if (isSmallScreen) {
        setSidebarOpen(false);
    }
  };

  const getGroupMember = async (group)=>{
    try {

      const json = {
        COMPANY_ID: userData?.data?.COMPANY_ID,
        GROUP_ID : group?.GROUP_ID
      }

      const res = await getGroupChatMemberAction(json)
      if(res){
        setGroupMember(res?.data)
      }
      
    } catch (error) {
      console.log(error)
    }
  }

useEffect(() => {
  const fetchGroupHistory = async () => {
    try {
      const res = await getGroupChatHistoryAction(userData?.data);
      if (res) {
        const incoming = [...res.data]?.sort((a, b) => {
          if (a.LAST_CHAT === null && b.LAST_CHAT !== null) {
              return 1; // a should come after b
          } else if (a.LAST_CHAT !== null && b.LAST_CHAT === null) {
              return -1; // a should come before b
          } else if (a.LAST_CHAT === null && b.LAST_CHAT === null) {
              return 0; // no change in order
          } else {
              return a.LAST_CHAT.localeCompare(b.LAST_CHAT); // both values are non-null, compare them
          }
      })

        const uniqueIds = new Set();
        const uniqueArray = incoming.filter(obj => {
          if (!uniqueIds.has(obj.GROUP_ID)) {
            uniqueIds.add(obj.GROUP_ID);
            return true;
          }
          return false;
        });

        setChatGroupHistory([...uniqueArray]);

        for (let i = 0; i < uniqueArray.length; i++) {
          const element = uniqueArray[i];
          onGroupPage(element?.GROUP_ID)
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  fetchGroupHistory();
}, [userData]);





const handleClose = ()=>{
  // clearChat()
  // setCurrentPickedChat(null)
  setSelectedChat(null)
  onClose()
}


  return (
    // addedexperimental drawer
    // <ExpandedDrawer isOpen={isOpen} onClose={handleClose}> 
      <div className="flex h-screen flex-col overflow-y-clip font-Exotic ">
        <div
          onClick={() => setSidebarOpen(false)}
          className={`md:hidden fixed inset-0 max-h-screen z-[50] bg-chatoverlay cursor-pointer ${
            sidebarOpen ? "block" : "hidden"
          } `}
        ></div>

        <div className="px-0 h-screen">
          <div className="relative  h-screen flex-1  flex">
            {/* the drawer sidebar */}

            <motion.div
              ref={sidebarRef}
              variants={sidebar_animation}
              initial={{ x: isSmallScreen ? 350 : 0 }}
              animate={ 
                sidebarMinimizedHome && sidebarOpen
                  ? "minimize"
                  : !sidebarMinimizedHome && sidebarOpen
                ? "open" : "closed"
            
            }
              className={`shadow-sidebar group md:z-[10] z-[50] max-w-[20rem] w-[${sidebarWidth}] 
                    fixed md:top-[4.5rem] top-0  left-0
                h-[100vh]`}
            >
              <Sidebar
                showSearchInp={showSearchInp}
                setShowSearchInp={setShowSearchInp}
                selectConversation={selectConversation}
                allGroupChatHistory={allGroupChatHistory}
                allGroupChatHistoryFilter={allGroupChatHistoryFilter}
                searchTerm={searchTerm}
                handleChange={handleChange}
                selectAChat={selectAChat}
                closeInp={toggleInp}
                selectedUserData={selectedChat}
                handleUserFilter={()=>{}}
              />
            </motion.div>

            {/* the drawer side end */}
            {
              selectedChat ? 
                <div
                  className={`flex-1 flex flex-col w-full h-[93%] sticky top-[4rem]   ${
                    sidebarOpen ? `md:ml-[20rem]` : !sidebarOpen && "md:ml-0"
                  }`}
                >
                  <Header
                    toggleSideBar={toggleSideBar}
                    showDrawer={() => setSidebarOpen(true)}
                    selectedUserData={selectedChat}
                    isCreatingGroup={isCreatingGroup}
                    setIsCreatingGroup={setIsCreatingGroup}
                    temporaryGroup={temporaryGroup}
                  />
                  <Body
                    groupData={selectedChat}
                    isCreatingGroup={isCreatingGroup}
                    temporaryGroup={temporaryGroup}
                  />
                  <Form groupData={selectedChat} />
                </div> : <div className={`flex-1 flex flex-col w-full h-[80%] sticky top-[4rem] items-center justify-center text-lg md:text-md    ${
                    sidebarOpen ? `md:ml-[20rem]` : !sidebarOpen && "md:ml-0"
                  }`}>
                    <img className="w-[50rem] " src={EmptyChat} alt="chatUI" />
                    <span className="text-slate-400">Start a Conversation or Create a new Group</span>
                  </div>
            }
          </div>
        </div>
      </div>
      // </ExpandedDrawer>
    // {/* </> */}
  );
};

export default Group;
