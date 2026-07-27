/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { PiUsersLight } from "react-icons/pi";
import { MdCancel, MdMenu } from "react-icons/md";
import { Camera, Plus, Search } from "lucide-react";
import { Button, Chip, Input } from "@nextui-org/react";
import { useState } from "react";

const DefaultHeader = ({ showDrawer, toggleSideBar, isCreatingGroup, setIsCreatingGroup, handleUserFilter, searchValue, setSearchValue }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const closeInp = () => {};

  const handleChange = (e) => {
    e?.preventDefault()
    handleUserFilter(e)
  };

  return (
    <>
      <div
        className="
        bg-white 
        w-full 
        flex
        sm:px-4 
        py-5 
        px-6 
        lg:px-8 
        justify-between 
        items-center 
        border-b
        border-gray-200
        border
        rounded-lg 
        mb-6
        
      
      "
      >
        {isCreatingGroup ? (
          <div className="flex flex-col w-full text-medium gap-5">
            <div className="flex items-center justify-between w-full">
              <Button radius="full" size="sm" className="bg-slate-50/90 " onClick={()=>setIsCreatingGroup(false)}>
                {" "}
                Back
              </Button>

              <div className="shadow-sm rounded">
                <Chip color="white" >
                  <span>Add Members (4/1023) </span>
                </Chip>
              </div>
              <Button
                color="light"
                radius="full"
                size="sm"
                className=" text-blue-500 text-lg  "
              >
                {" "}
                Create
              </Button>
            </div>

            <div className="flex flex-col">
              <div className="flex gap-3 items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer">
                    <Camera size={20} className="text-btnColor"/>
                  </div>

                  <Input  placeholder="Group Name" variant="underlined" className="w-80"/>
                  {/* <span>Group Name</span> */}
              </div>
            </div>

            <div>
              <div
                className={`flex gap-x-2 items-center h-10 border border-sidebarInpColor/10 w-[23.5rem]    rounded-xl px-4 relative `}
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
                      <Search
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
                   placeholder:text-[0.80rem]  transition-all duration-700 placeholder:text-sidebarInptextColor  text-gray-500`}
                  onChange={(e) =>setSearchTerm(e.target.value)}
                  type="text"
                  value={searchTerm}
                  placeholder="Search name"
                />
              </div>
            </div>
          </div>
        ) : (


          <div className="flex justify-between  w-full flex-wrap gap-2">
               <div
                className={`flex gap-x-2 items-center h-10 border border-sidebarInpColor/10 w-[23.5rem]    rounded-xl px-4 relative `}
              >
                <div className="mr-auto h-full  items-center  cursor-pointer">
                  <button className="pl-3  outline-none rounded flex items-center justify-center">
                    {" "}
                    {searchValue ? (
                      <MdCancel
                        onClick={()=>setSearchValue('')}
                        className=" text-sidebarInptextColor text-center  absolute top-[0.75rem] left-4"
                        size={14}
                      />
                    ) : (
                      <Search
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
                   placeholder:text-[0.80rem]  transition-all duration-700 placeholder:text-sidebarInptextColor  text-gray-500`}
                  onChange={handleChange}
                  type="text"
                  value={searchValue}
                  placeholder="Search name"
                />
              </div>
            <div className=" cursor-pointer">
              <div className="w-full flex justify-between items-center px-5 py-1  cursor-pointer gap-2 bg-lighten border-double border-2 rounded-lg border-gray-400 hover:shadow-md active:border-lighten/40"   onClick={()=>setIsCreatingGroup(true)}>
                <div className="border rounded-full p-[0.2px] cursor-pointer">
                  <Plus strokeWidth={2.5} className=" text-chatsidebar-add" />
                </div>
                <div>
                  <span className="text-gray-400 font-semibold text-sm tracking-widest font-Exotic">
                    CREATE GROUP
                  </span>
                </div>
              </div>
          
            </div>

          </div>
        )}
      </div>
    </>
  );
};

export default DefaultHeader;
