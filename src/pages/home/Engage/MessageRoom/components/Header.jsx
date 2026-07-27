/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { format } from "date-fns";
import { PiUsersLight } from "react-icons/pi";
import { Avatar } from "@nextui-org/react";
import clsx from "clsx";
import { useContext } from "react";
import { SocketContext } from "../../../../../context/SocketContext";
import { TbMessage2 } from "react-icons/tb";
import { FaWhatsapp } from "react-icons/fa";
import { filePrefix } from "../../../../../utils/filePrefix";

const Header = ({
  showDrawer,
  selectedUserData,
  openMessage,
}) => {
  const { onlineUsers } = useContext(SocketContext);
  const redirectToWhatsapp = () => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (isMobile) {
      window.open("whatsapp://", "_blank");
    } else {
      window.open("https://web.whatsapp.com/", "_blank");
    }
  };

  return (
    <>
      <div
        className="
        bg-white 
        flex
        sm:px-4 
        py-5 
        px-6 
        lg:px-8 
        justify-between 
        items-center 
        border-b
        border-gray-200
        mx-10
        rounded-lg
    
      "
      >
        <div className="flex gap-4 items-center">

          <div className="relative">
            {
            selectedUserData?.FILE_NAME  ? (
              <Avatar size="md" src={filePrefix + selectedUserData?.FILE_NAME} />
            ) : (
              <Avatar
                size="md"
                name={selectedUserData?.FIRST_NAME?.trim()[0]}

              />
            )}

            {onlineUsers?.find(
              (el) => el?.userId === selectedUserData?.STAFF_ID
            ) && (
              <div>
                <span
                  className={clsx(
                    "absolute block rounded-full ring-white  ring-1 h-[0.4rem] w-[0.4rem] md:h-[0.5rem] md:w-[0.5rem] bg-chatactive right-[0.2rem] bottom-[0.1rem] "
                  )}
                />
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <div className="text-[0.82rem]">
              {selectedUserData?.LAST_NAME + " " + selectedUserData?.FIRST_NAME}
            </div>
            <div className="text-[0.59rem] text-slate-500 flex gap-x-3 flex-wrap">
              {selectedUserData?.DEPARTMENT}
              <div className="flex gap-x-1 items-center">
                <div className="w-1 h-1 rounded-full bg-slate-500"></div>
                <span>{selectedUserData?.DIRECTORATE}</span>
              </div>
            </div>
            <div className="text-xs font-light text-neutral-500">
              {selectedUserData?.LAST_SEEN && (
                <>
                  {!onlineUsers?.find(
                    (el) => el?.userId === selectedUserData?.STAFF_ID
                  ) && (
                    <>
                      Last seen{" "}
                      {format(new Date(selectedUserData?.LAST_SEEN), "paa")}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <TbMessage2
            onClick={openMessage}
            size={32}
            className=" 
              cursor-pointer
              rounded-md bg-white text-gray-500 hover:text-gray-500 outline-none hover:border-btnColor hover:border-2
              transition 
            "
          />
          <FaWhatsapp
            onClick={redirectToWhatsapp}
            size={32}
            className=" 
              cursor-pointer
              rounded-md text-green-400  hover:text-gray-500 outline-none hover:border-btnColor hover:border-2
              transition 
            "
          />

          <div className="center-profile2 cursor-pointer" onClick={showDrawer}>
            <PiUsersLight
              size={32}
              className=" 
                cursor-pointer
                rounded-md bg-white text-gray-400 hover:text-gray-500 outline-none hover:border-btnColor hover:border-2
                transition md:hidden
              "
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
