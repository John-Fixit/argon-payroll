/* eslint-disable react/prop-types */

import { MessageCircleMore, Search } from "lucide-react";
import { MdCancel } from "react-icons/md";
// import Avatar from "../../../../components/Avatar";

// import allUser from "./user";
// import { useState } from "react";
import { Avatar } from "@nextui-org/react";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import { useContext } from "react";
import { SocketContext } from "../../../../context/SocketContext";
import clsx from "clsx";
import allUser from "../../Engage/GroupChat/components/data";
import { filePrefix } from "../../../../utils/filePrefix";
import { IoClose } from "react-icons/io5";

const ChatSidebar = ({
  // showchatContainer,
  showSearchInp,
  // setShowSearchInp,
  // setshowchatContainer,
  onClose,
  selectedUserData,
  allChatHistory,
  allChatHistoryFilter,
  searchTerm,
  handleChange,
  selectAChat,
  toggleInp,
  isGroup,
}) => {
  const { userData } = useCurrentUser();

  const { setCurrentPickedChat, onlineUsers } = useContext(SocketContext);

  const setCurrent = (data) => {
    selectAChat(data);
    !isGroup && setCurrentPickedChat(data);
  };

  // for group
  // const [searchValue, setSearchValue] = useState('')
  // const [filteredData, setFilteredData] = useState('')

  // const handleUserFilter = (e) => {
  //     const value = e.target.value;
  //     let updatedData = [];
  //     setSearchValue(value);

  //     if (value.length) {
  //       updatedData = allUser?.filter((item) => {
  //         const startsWith =
  //           item?.name?.toLowerCase().startsWith(value.toLowerCase())

  //         const includes =
  //           item?.name?.toLowerCase().includes(value.toLowerCase())

  //         if (startsWith) {
  //           return startsWith;
  //         } else if (!startsWith && includes) {
  //           return includes;
  //         } else return null;
  //       });
  //       setFilteredData(updatedData);
  //       setSearchValue(value);
  //     }
  //   };

  // const filePrefix = "http://lamp3.ncaa.gov.ng/pub/"

  return (
    // closeConversation
    <div
      className={`h-full w-60  bg-chatsidebar ${
        !selectedUserData ? "w-full md:w-60 block" : "hidden md:block"
      }
      `}
    >
      <div className="py-[0.68rem] w-full text-gray-400 border-b border-slate-600 flex items-center justify-between  px-5">
        {!showSearchInp && (
          <h3 className=" text-center">
            {isGroup ? "Group Message" : "Chat Message"}
          </h3>
        )}
        <div className={`m-0 pl-2 px-1 flex items-center gap-x-2`}>
          <div
            className={`flex items-center h-10 bg-sidebarInpColor/30    rounded-2xl px-4 relative shadow   ${
              showSearchInp ? "" : "w-11"
            }`}
          >
            <input
              name=""
              id=""
              autoFocus={true}
              className={` outline-none border-none bg-transparent  px-2 w-full placeholder:text-xs  transition-all duration-700     placeholder:text-sidebarInptextColor text-gray-500 ${
                showSearchInp ? "chatInpShow" : "chatInp"
              } `}
              onChange={(e) => handleChange(e)}
              value={searchTerm}
              type="text"
              placeholder="Search"
            />
            <div
              className="ml-auto h-full  items-center  cursor-pointer"
              onClick={toggleInp}
            >
              <button className="pl-3  outline-none rounded flex items-center justify-center">
                {" "}
                {showSearchInp ? (
                  <MdCancel
                    className=" text-sidebarInptextColor text-center  absolute top-[0.9rem] right-4"
                    size={14}
                  />
                ) : (
                  <Search
                    className=" text-sidebarInptextColor text-center  absolute top-[0.9rem] right-4"
                    size={14}
                  />
                )}
              </button>
            </div>
          </div>

          {!selectedUserData && (
            <IoClose
              size={32}
              onClick={onClose}
              className=" 
                        cursor-pointer
                        rounded-xl bg-gray-600 text-gray-400 hover:text-gray-500 outline-none hover:border-btnColor hover:border-2
                        transition
                      "
            />
          )}
        </div>
      </div>

      <div className="py-4 text-gray-400">
        <div className="flex flex-col space-y-4">
          {/* <div className="w-full flex justify-between px-5 py-3">
            <div>
              <span className="text-white">Direct Chats</span>
            </div>
            <div className=" cursor-pointer">
              <Plus strokeWidth={2.5} className=" text-chatsidebar-add" />
            </div>
          </div> */}

          {/* max-h-[550px] */}
          <div className=" max-h-[80vh]  overflow-y-auto  px-3 pb-10   scrollbar-thin  scrollbar-thumb-scrollbarColor/20 scrollbar-track-transparent ">
            {isGroup ? (
              <>
                {allUser?.map((user) => (
                  <div
                    key={user?.id}
                    // className="flex justify-between items-start cursor-pointer rounded-md hover:bg-slate-50 p-3 px-5 border-y-[0.5px] border-slate-200"
                    className="flex justify-between items-start cursor-pointer rounded-md hover:bg-slate-600 p-2 py-3"
                    onClick={() => setCurrent(user)}
                  >
                    <div className="flex gap-x-4">
                      {/* <Avatar isActive={user?.active}  fromChat={true} /> */}

                      <div className="relative">
                        <Avatar
                          isBordered
                          size="sm"
                          color="default"
                          name={"A"}
                          className=" cursor-pointer"
                        />
                      </div>

                      {/* <span className=" truncate w-[8.5rem] text-gray-700 font-medium text-[0.85rem]">{user?.name}</span> */}

                      <div className="flex flex-col gap-y-1 w-[8rem]">
                        <span className=" truncate w-[8rem] text-xs font-medium text-slate-200/80">
                          {user.name}
                        </span>
                        <span className=" truncate w-[8rem] text-[0.55rem] ">
                          Ada, Siji and 27 others
                        </span>
                      </div>
                    </div>

                    {/* {user?.UNREAD_COUNT > 0 && (
                    <div className="min-w-5 min-h-5 bg-chatsidebar-more flex justify-center items-center text-white rounded-full text-xs font-bold">
                      {user?.UNREAD_COUNT}
                    </div>
                  )} */}
                  </div>
                ))}
              </>
            ) : (
              <>
                {(allChatHistoryFilter?.length > 0
                  ? allChatHistoryFilter
                  : allChatHistory
                )
                  ?.filter((el) => el?.STAFF_ID !== userData?.data?.STAFF_ID)
                  ?.map((user) => (
                    <div
                      key={user?.STAFF_ID}
                      className="flex justify-between items-start cursor-pointer rounded-md hover:bg-slate-600 p-2 py-3"
                      onClick={() => setCurrent(user)}
                    >
                      <div className="flex gap-x-3">
                        <div className="relative">
                          {/* <Avatar isActive={true} /> */}
                          {
                            // user?.FILE_NAME?.includes("http") ? (

                            user?.LAST_NAME === "Support Team" ? (
                              <Avatar
                                size="md"
                                className="bg-supportIconBg  text-white "
                                icon={
                                  <MessageCircleMore className="w-5 h-5 text-white " />
                                }
                              />
                            ) : user?.FILE_NAME ? (
                              <Avatar
                                size="md"
                                src={filePrefix + user?.FILE_NAME}
                              />
                            ) : (
                              <Avatar
                                isBordered
                                size="sm"
                                color="default"
                                name={user?.FIRST_NAME?.trim()[0]}
                                className=" cursor-pointer"
                                // title={user?.LAST_NAME + " " + user?.FIRST_NAME}
                              />
                            )
                          }

                          {onlineUsers?.find(
                            (el) => el?.userId === user?.STAFF_ID
                          ) && (
                            <div>
                              <span
                                className={clsx(
                                  "absolute block rounded-full ring-white  ring-1 h-[0.4rem] w-[0.4rem] md:h-[0.5rem] md:w-[0.5rem] bg-chatactive right-[0rem] -bottom-[0.1rem] "

                                  // fromChat &&  bigger ? ' ring-1 h-[0.4rem] w-[0.4rem] md:h-[0.5rem] md:w-[0.5rem] bg-chatactive right-[0.22rem] bottom-[0.45rem]' :

                                  // fromChat && big ? ' ring-1 h-[0.4rem] w-[0.4rem] md:h-[0.5rem] md:w-[0.5rem] bg-chatactive right-[0.075rem] bottom-[0.4rem]' :
                                )}
                              />
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col gap-y-1 w-[8rem]">
                          <span className=" truncate w-[8rem] text-xs font-medium text-slate-200/80">
                            {user?.LAST_NAME + " " + user?.FIRST_NAME}
                          </span>
                          <span className=" truncate w-[8rem] text-[0.55rem] ">
                            {user?.DEPARTMENT}
                          </span>
                        </div>
                      </div>

                      {user?.UNREAD_COUNT > 0 && (
                        <div className="min-w-5 min-h-5 bg-chatsidebar-more flex justify-center items-center text-white rounded-full text-xs font-bold">
                          {user?.UNREAD_COUNT}
                        </div>
                      )}
                    </div>
                  ))}
              </>
            )}
          </div>

          {/* <div className=" max-h-[78vh]  overflow-y-auto  px-3 pb-10">
            {  (searchValue? filteredData : allUser)?.map((user) => (
              <div
                key={user?.id}
                className="flex justify-between items-start cursor-pointer rounded-md hover:bg-slate-600 p-2"
                onClick={() => setshowchatContainer(true)}
              >
                <div className="flex gap-x-2">
                  <Avatar isActive={true} />
                  <span className=" truncate w-[8.5rem]">{user?.name}</span>
                </div>

                {
                  user?.unseen > 0 &&
                <div className="min-w-5 min-h-5 bg-chatsidebar-more flex justify-center items-center text-white rounded-full text-xs font-bold">
                  {user?.unseen}
                </div>
                }
              </div>
            ))}
          </div> */}

          {/* <div
            className="flex justify-between items-start cursor-pointer hover:bg-slate-600 p-2"
            onClick={() => setshowchatContainer(true)}
          >
            <div className="flex gap-x-2">
              <Avatar isActive={true} />
              <span className=" truncate w-[8.5rem]">John Doe</span>
            </div>
            <div className="min-w-5 min-h-5 bg-chatsidebar-more flex justify-center items-center text-white rounded-full text-xs font-bold">
              1
            </div>
          </div>
          <div
            className="flex justify-between items-start cursor-pointer hover:bg-slate-600 p-2"
            onClick={() => setshowchatContainer(true)}
          >
            <div className="flex gap-x-2">
              <Avatar isActive={true} />
              <span className=" truncate w-[8.5rem]">Richard Miles</span>
            </div>
            <div className="w-5 h-5 bg-chatsidebar-more flex justify-center items-center text-white rounded-full text-xs font-bold">
              7
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
