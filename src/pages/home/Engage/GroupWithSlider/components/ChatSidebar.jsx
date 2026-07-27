/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import {  MessageCircleMore, Search } from "lucide-react";
import { MdCancel } from "react-icons/md";
import { Avatar } from "@nextui-org/react";
import useCurrentUser from "../../../../../hooks/useCurrentUser";
import { useContext } from "react";
import { SocketContext } from "../../../../../context/SocketContext";
import clsx from "clsx";
import allUser from "../../../Engage/GroupChat/components/data";
import { filePrefix } from "../../../../../utils/filePrefix";
import { IoClose } from "react-icons/io5";

const ChatSidebar = ({
  showSearchInp,
  onClose,
  selectedUserData,
  allGroupChatHistory,
  allGroupChatHistoryFilter,
  searchTerm,
  handleChange,
  selectAChat,
  toggleInp,
  isGroup
}) => {

  const { userData } = useCurrentUser();

  const {setCurrentPickedChat, onlineUsers} = useContext(SocketContext)


  // console.log(allGroupChatHistory)

  const  setCurrent = (data)=>{
    selectAChat(data)
   !isGroup && setCurrentPickedChat(data)
  }

  return (
    <div
      className={`h-full w-60  bg-chatsidebar ${
        (!selectedUserData) ? "w-full md:w-60 block" : "hidden md:block"
      }
      `}
    >
      <div className="py-[0.68rem] w-full text-gray-400 border-b border-slate-600 flex items-center justify-between  px-5">
        {!showSearchInp && <h3 className=" text-center">{ isGroup ? "Group Message" : "Chat Message"}</h3>}
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
              onChange={(e)=>handleChange(e)}
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


          {
            !selectedUserData &&
              <IoClose
                      size={32}
                      onClick={onClose}
                      className=" 
                        cursor-pointer
                        rounded-xl bg-gray-600 text-gray-400 hover:text-gray-500 outline-none hover:border-btnColor hover:border-2
                        transition
                      "
                    />
          }
        </div>
      </div>

      <div className="py-4 text-gray-400">
        <div className="flex flex-col space-y-4">
          {/* max-h-[550px] */}
          <div className=" max-h-[80vh]  overflow-y-auto pb-10   scrollbar-thin  scrollbar-thumb-scrollbarColor/20 scrollbar-track-transparent ">

            {
              isGroup ? (

                  <>
                              {
             (allUser)?.map((user) => (
                <div
                  key={user?.id}
                  className="flex justify-between items-start cursor-pointer rounded-md hover:bg-slate-600 p-2 py-3"
                  onClick={() => setCurrent(user)}
                >
                  <div className="flex gap-x-4">

                    <div className="relative">
                        <Avatar
                          isBordered
                          size="sm"
                          color="default"
                          name={'A'}
                          className=" cursor-pointer"
                        />
                    
                    </div>
                    <div className="flex flex-col gap-y-1 w-[8rem]">
                          <span className=" truncate w-[8rem] text-xs font-medium text-slate-200/80">{user.name}</span>
                          <span className=" truncate w-[8rem] text-[0.55rem] ">Ada, Siji and 27 others</span>
                  
                        </div>
                  </div>
                </div>
              ))}
                  
                  
                  </>


              ) : (
                  <>
                  
                  {(allGroupChatHistoryFilter?.length > 0 ? allGroupChatHistoryFilter  : allGroupChatHistory)?.map((grp) => (
                    <div
                      key={grp?.GROUP_ID}
                      className="flex justify-between overflow-hidden items-start cursor-pointer rounded-sm hover:bg-slate-600  truncate p-2 px-4 py-3 h-fit border-b-2 border-btnColor/5"
                      onClick={() => setCurrent(grp)}
                    >

                    <div className="flex gap-x-4 flex-col gap-y-1">
                      <div className="flex flex-col gap-y-[0rem] truncate w-[11rem]">
                        <span className=" truncate font-medium text-slate-200/80">
                          {grp?.GROUP_NAME}
                        </span>

                        {
                          grp?.LAST_CHAT &&
                        <span className=" truncate w-[11rem] text-[0.75rem] text-slate-200/60 mb-1 ">
                        {grp?.LAST_CHAT} </span>
                        }
                      </div>
                      <div className="flex gap-2 items-center">
                        {
                          grp?.MEMBERS?.slice(0, 4)?.map((mm, i)=> (
                            <Avatar key={i} size="sm" className="w-7 h-7" src={ filePrefix +  mm?.FILE_NAME}/>
                          ))
                        }
                        {/* {
                          grp?.COUNT_MEMBERS > 2 &&
                          <span className="text-slate-200/80 text-xs">+ {grp?.COUNT_MEMBERS - 2} others</span>
                        } */}
                    </div>
                    </div>
                      {
                        grp?.UNREAD_CHAT > 0  &&
                      <div className="min-w-5 min-h-5 bg-chatsidebar-more flex justify-center items-center text-white rounded-full text-xs font-bold">
                        {grp?.UNREAD_CHAT}
                      </div>
                      }
                    </div>
                  ))}
               
                  </>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
