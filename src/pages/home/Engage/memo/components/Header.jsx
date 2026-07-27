/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import Avatar from "../../../../../components/Avatar";
import { format } from "date-fns";
import { PiUsersLight } from "react-icons/pi";
import { MdMenu } from "react-icons/md";
import UserOne from "../../../../../assets/images/avatar2.jpg";
import { Button } from "@nextui-org/react";
import { MdTune } from "react-icons/md";
import clsx from "clsx";
import { IoPencil } from "react-icons/io5";
// import { useMemo, useState } from "react";

// eslint-disable-next-line no-unused-vars
const Header = ({
  showDrawer,
  toggleSideBar,
  sidebarOpen,
  compose,
  handleOpenDrawer,
  showComposeBtn,
}) => {
  return (
    <>
      <div
        className="
        bg-white 
        w-full 
        flex
        sm:px-4 
        py-3 
        px-6 
        lg:px-8 
        justify-between 
        !items-center 
        border-b
        border-gray-200
      
      "
      >
        {/* <div className="flex gap-4 items-center">
          <div
            className="lg:hidden cursor-pointer border rounded-full"
            onClick={() => toggleSideBar()}
          >
            <MdMenu size={25} className="p-1" />
          </div>

          <Avatar
            image={UserOne}
            bigger={true}
            isActive={true}
            fromChat={true}
          />

          <div className="flex flex-col">
            <div className="font-medium tracking-wide text-gray-800">
              Michelle Smith
            </div>
            <div className="text-sm font-light text-neutral-500">
              Last seen today at {format(new Date("1 Jan 2013"), "paa")}
            </div>
          </div>
        </div> */}
        {/* <PiUsersLight
          size={32}
          onClick={showDrawer}
          className=" 
          cursor-pointer
          rounded-md bg-white text-gray-400 hover:text-gray-500 outline-none hover:border-btnColor hover:border-2
          transition md:hidden
        "
        /> */}
        <div className="flex gap-3">
          <Button
            size="sm"
            onClick={showDrawer}
            startContent={<MdTune size={"15.375px"} />}
            className={clsx(
              "py-[0.25rem] px-[0.5rem] rounded-[0.2rem] font-Exotic",
              sidebarOpen ? "bg-[#c8d1d7]" : "bg-[#edf0f2]"
            )}
            radius="small"
          >
            INBOX
          </Button>
          {showComposeBtn ? (
            <Button
              size="sm"
              onClick={() => handleOpenDrawer("compose_memo")}
              startContent={<IoPencil size={"15.375px"} />}
              className={clsx(
                "py-[0.25rem] px-[0.5rem] rounded-[0.2rem] font-Exotic",
                compose ? "bg-[#c8d1d7]" : "bg-[#edf0f2]"
              )}
              radius="small"
            >
              COMPOSE
            </Button>
          ) : (
            <>
              <div className="w-[8rem] h-7 border border-black my-auto"></div>
            </>
          )}
        </div>
        <div
          className="lg:hidden cursor-pointer border rounded-full"
          onClick={() => toggleSideBar()}
        >
          <MdMenu size={25} className="p-1" />
        </div>
      </div>
    </>
  );
};

export default Header;
