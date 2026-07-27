/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useContext, useEffect, useRef, useState } from "react";

import Body from "./Body";
import Header from "./Header";
import Form from "./Form";
import ExpandedDrawer from "../../../../components/modals/ExpandedDrawer";

import ChatSidebar from "./ChatSidebar";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import {
  useGetAllChatHistory,
  useGetAllChatHistoryByName,
} from "../../../../lib/query/queryandMutation";
import { SocketContext } from "../../../../context/SocketContext";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
import { Pencil, Send } from "lucide-react";
import { Chip } from "@nextui-org/react";
import { IoClose } from "react-icons/io5";

const ChatDrawer = ({
  isOpen,
  onClose,
  user,
  setUser,
  isGroup,
  fromMessageRoom,
  fromBirthday,
  setFromBirthday,
  fromSupport = false,
  setFromSupport,
}) => {
  const [showchatContainer, setshowchatContainer] = useState(true);
  const [showSearchInp, setShowSearchInp] = useState(false);
  const { pathname } = useLocation();
  const chatTimeRef = useRef();

  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [isCompose, setIsCompose] = useState(false);
  const [message, setMessage] = useState("");

  //
  const { userData } = useCurrentUser();
  const { mutateAsync: allChatHistoryCall } = useGetAllChatHistory();
  const { mutateAsync: searchChat } = useGetAllChatHistoryByName();

  const [searchTerm, setSearchTerm] = useState("");

  // const [allChatHistory, setAllChatHistory] = useState([]);
  // const [allChatHistoryFilter, setAllChatHistoryFilter] = useState([]);

  const [selectedChat, setSelectedChat] = useState(null);

  const {
    allChatHistory,
    setChatHistory,
    setChatHistoryFilter,
    allChatHistoryFilter,
    clearChat,
    setCurrentPickedChat,
  } = useContext(SocketContext);

  // =======================
  const messageModalRef = useRef();

  let isMidScreen = useMediaQuery({ query: "(max-width: 1023px)" });

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

  const closeMsg = () => {
    if (isCompose) {
      setIsCompose(false);
      return;
    }
    openMessage();
  };

  const openMessage = () => {
    setMessageModalOpen(!messageModalOpen);
  };
  // =======================

  useEffect(() => {
    const fetchHistory = async () => {
      if (isGroup) {
        return;
      }

      try {
        if (
          (pathname === "/engage/home" ||
            pathname === "/engage/posts" 
            // ||
            // fromMessageRoom
          ) &&
          chatTimeRef.current !== 1
        ) {
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

            const all = uniqueArray.map((el) => {
              if (el.STAFF_ID === 1) {
                (el.DEPARTMENT = "CUSTOMER SUPPORT"),
                  (el.DIRECTORATE = ""),
                  (el.LAST_NAME = "Support Team");
                el.FIRST_NAME = "";
                return el;
              }
              return el;
            });

            setChatHistory([...all]);
            chatTimeRef.current = 1;
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchHistory();

    return () => {
      chatTimeRef.current = 0;
    };
  }, [pathname]);

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
    if (isGroup) {
      return;
    }
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
    // console.log("Searching for:", searchTerm);

    searchConversation(searchTerm);
  }, 2500);

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    handleSearch(value);
  };

  const toggleInp = () => {
    if (showSearchInp) {
      setChatHistoryFilter([]);
      setSearchTerm("");
    }
    setShowSearchInp(!showSearchInp);
  };

  const selectAChat = (user) => {
    if (isGroup) {
      return;
    }
    setshowchatContainer(true);
    setSelectedChat(user);
  };

  const closeConversation = () => {
    setshowchatContainer(false);
    setSelectedChat(null);
    setUser(null);
  };

  const closeBirthdayCard = () => {
    setFromBirthday(false);
  };

  const handleClose = () => {
    clearChat();
    setCurrentPickedChat(null);
    setSelectedChat(null);
    onClose();
  };

  return (
    <ExpandedDrawer isOpen={isOpen} onClose={handleClose}>
      <div className="flex h-screen flex-col overflow-y-clip bg-white  shadow-xl">
        <div
          onClick={() => setMessageModalOpen(false)}
          className={`fixed inset-0 max-h-screen z-[20] cursor-pointer   ${
            messageModalOpen ? "block" : "hidden"
          } `}
        ></div>

        <div className="px-0  h-screen">
          <div className="relative  h-screen flex-1  flex">
            {/* the drawer sidebar */}

            <ChatSidebar
              showchatContainer={showchatContainer}
              showSearchInp={showSearchInp}
              allChatHistory={allChatHistory}
              allChatHistoryFilter={allChatHistoryFilter}
              searchTerm={searchTerm}
              handleChange={handleChange}
              selectAChat={selectAChat}
              toggleInp={toggleInp}
              selectedUserData={selectedChat || user}
              isGroup={isGroup}
              onClose={handleClose}
            />

            {/* the drawer side end */}
            {showchatContainer && (user || selectedChat) ? (
              <div className="h-full flex-1 flex flex-col">
                <Header
                  onClose={handleClose}
                  setshowchatContainer={closeConversation}
                  selectedUserData={selectedChat || user}
                  openMessage={openMessage}
                  isGroup={isGroup}
                />
                <Body
                  mate={selectedChat || user}
                  isGroup={isGroup}
                  fromBirthday={fromBirthday}
                  fromSupport={fromSupport}
                  setFromSupport={setFromSupport}
                  closeBirthdayCard={closeBirthdayCard}
                />
                <Form mate={selectedChat || user} isGroup={isGroup} />
              </div>
            ) : (
              !(user || selectedChat) && (
                <div className="h-full flex-1  flex-col items-center justify-center hidden md:flex">
                  <span className="text-gray-200  italic text-center text-xl md:text-5xl">
                    Start a Conversation
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        {/* the drawer message */}

        <motion.div
          ref={messageModalRef}
          variants={messageModal}
          initial={{ x: 0 }}
          animate={messageModalOpen ? "open" : "closed"}
          className={`shadow-sidebar group  md:z-[30] z-[40] 
                    fixed  right-0
                h-screen top-0`}
        >
          <div className=" bg-white h-full border-2 border-gray-300/50 rounded-l-lg p-4 shadow relative">
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
    </ExpandedDrawer>
  );
};

export default ChatDrawer;
