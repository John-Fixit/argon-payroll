/* eslint-disable react/prop-types */
import { MdCancel, MdFilterList } from "react-icons/md";
import { Avatar } from "@nextui-org/react";
import { useContext } from "react";
import { SocketContext } from "../../../../../context/SocketContext";
import { Plus } from "lucide-react";
import CreateGroupModal from "./CreateGroupModal";
import { filePrefix } from "../../../../../utils/filePrefix";

const Sidebar = ({
  showSearchInp,
  allGroupChatHistory,
  searchTerm,
  selectAChat,
  closeInp,
}) => {
  const { setCurrentPickedGroupChat} = useContext(SocketContext);

  const setCurrent = (data) => {
    setCurrentPickedGroupChat(data);
    selectAChat(data);
  };




  return (
    <div className={`h-full w-[20rem]  bg-[#e6e7e9] border-l-1 mx-1  shadow `}>
      <div className="py-[0.7rem] w-full text-gray-400    flex items-center  bg-white justify-center">
        <div className={`m-0 px-2    w-full flex gap-3 items-center justify-center`}>
          <div
            className={`flex gap-x-2 items-center h-10 border border-sidebarInpColor/10   rounded-md px-4 relative    ${
              showSearchInp ? "" : ""
            }`}
          >
            <div className="mr-auto h-full  items-center  cursor-pointer">
              <button className="pl-3  outline-none rounded flex items-center justify-center">
                {" "}
                {searchTerm ? (
                  <MdCancel
                    onClick={closeInp}
                    className=" text-sidebarInptextColor text-center  absolute top-[0.75rem] left-4"
                    size={14}
                  />
                ) : (
                  <MdFilterList
                    className=" text-gray-700 text-center  absolute top-[0.75rem] left-4"
                    size={14}
                  />
                )}
              </button>
            </div>
            <input
              name=""
              id=""
              className={` outline-none border-none bg-transparent  px-2 w-full 
              placeholder:text-[0.80rem]  transition-all duration-700 placeholder:text-sidebarInptextColor  text-gray-500 ${
                showSearchInp ? "chatInpShow" : "chatInpShow"
              } `}
              onChange={()=>{}}
              type="text"
              placeholder="Filter groups"
            />
          </div>
          <CreateGroupModal>
            <Plus
              size={32}
              className=" 
                cursor-pointer
                bg-white text-gray-500 hover:text-gray-500 outline-none hover:border-btnColor hover:border-2
                transition border rounded-full p-1 border-gray-400 mt-2
              "
            />
          </CreateGroupModal>
        </div>
      </div>

      <div className="py-0 text-gray-400">
        <div className="flex flex-col ">
          <div className=" md:max-h-[80vh]  max-h-[96vh]  overflow-y-auto  px-0 pb-10 space-y-[0.15rem] py-[0.1rem]">
            {
             (allGroupChatHistory)?.map((grp) => (
                <div
                  key={grp?.GROUP_ID}
                  className={`flex justify-between items-start cursor-pointer  hover:bg-slate-50 py-2 px-5 h-[100px] overflow-hidden  border-slate-300 bg-white rounded  `}
                 
                  onClick={() => setCurrent(grp)}
                >
                  <div className="flex gap-x-4 flex-col gap-y-3">
                    <div className="flex flex-col gap-y-[0.15rem] w-[10rem]">
                      <span className=" truncate w-[10rem] font-medium text-gray-600/90">
                        {grp?.GROUP_NAME}
                      </span>
                      <span className=" truncate w-[16rem] text-[0.75rem] text-gray-500/70 ">
                      {grp?.LAST_CHAT} </span>
                    </div>
                    <div className="flex gap-2 items-center">
                      {
                        grp?.MEMBERS?.map((mm)=> (
                          <Avatar key={mm?.STAFF_ID} size="sm" className="w-7 h-7" src={ filePrefix +  mm?.FILE_NAME}/>
                        ))
                      }
                        <span className="text-gray-600/40 text-xs">+ {grp?.COUNT_MEMBERS - 2} others</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
