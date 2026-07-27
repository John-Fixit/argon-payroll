import { useContext, useState } from "react";
import { MdMenu } from "react-icons/md";
import { dashboardContext } from "../../context/Dashboard";
import UserDropdown from "../components/UserDropdown";
import DropdownNotification from "../components/DropdownNotification";
import { Search } from "lucide-react";
// import { FaGlobeAmericas } from "react-icons/fa";
import { useLocation } from "react-router-dom";
// import { TbMessage2 } from "react-icons/tb";
// import { Tooltip } from "@nextui-org/react";
// import { TiShoppingCart } from "react-icons/ti";
import SearchProfile from "../SearchProfile";
import { TbMessage2 } from "react-icons/tb";
import { cn } from "@nextui-org/react";
import ChatDrawer from "../../pages/home/rightMenu/components/ChatDrawer";
import AppSwitcher from "../../components/core/AppSwitcher";

const Navbar = () => {
  const { toggleSideBar, sidebarOpen, sidebarMinimized, sidebarMinimizedHome } =
    useContext(dashboardContext);
  const { pathname } = useLocation();
  const [showLargeChatContainer, setShowLargeChatContainer] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);

  ///===================== code for search bar =================================
  const [openSearchContainer, setOpenSearchContainer] = useState(false);
  const showSearchContainer = () => {
    setOpenSearchContainer(true);
  };
  //============================== ends here! ==================================

  const selectAChat = () => {
    setShowLargeChatContainer(true);
    setSelectedChat(null);
  };

  const handleOnclose = () => {
    setShowLargeChatContainer(false);
    setSelectedChat(null);
  };

  return (
    <div
      className={`right-0 left-0 p-2 shadow-md  sticky top-0 dark:shadow-md  bg-white  ${
        pathname.includes("engage/posts") ? "z-40" : "z-10"
      }`}
    >
      <div className="px-3 py-1 ">
        <div className="flex items-center justify-between">
          <div
            className={`flex items-center justify-between gap-2 ${
              sidebarMinimized && !sidebarOpen
                ? "flex ml-0"
                : sidebarMinimized && sidebarOpen
                  ? "flex ml-[7.2rem]"
                  : sidebarOpen
                    ? "flex"
                    : !sidebarMinimized && !sidebarOpen && "flex ml-0"
            }`}
          >
            <div
              className="lg:hidden cursor-pointer"
              onClick={() => toggleSideBar()}
            >
              <MdMenu size={25} />
            </div>

            <img
              src="/assets/images/community-logo.png"
              alt="comuneety-logo"
              className={`w-32  ${
                sidebarMinimizedHome && sidebarOpen && "hidden"
              }`}
            />

            <div className="hidden md:block">
              <div
                className={`flex items-center h-full bg-gray-100 rounded-md  
            ${
              sidebarMinimized
                ? "lg:ml-[1.5rem]"
                : sidebarOpen
                  ? "lg:ml-32"
                  : !sidebarMinimized && !sidebarOpen && "lg:ml-0"
            }
            `}
              >
                <div className="mr-auto flex  h-full  ">
                  <button className="pl-3  py-1 pt-[0.5rem] outline-none rounded">
                    {" "}
                    <Search className=" text-gray-400" size={12} />
                  </button>
                </div>
                <input
                  onClick={showSearchContainer}
                  name=""
                  id=""
                  className="outline-none border-none bg-transparent  px-2 w-full placeholder:text-xs py-2 placeholder:text-gray-400 text-gray-500 cursor-pointer"
                  type="text"
                  readOnly
                  placeholder="Search..."
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between md:gap-8  gap-3 pr-4">
            {/* <Tooltip showArrow={true} placement="top" content="Marketplace">
              <span>
                <TiShoppingCart
                  size={23}
                  className="text-gray-500 cursor-pointer"
                />
              </span>
            </Tooltip>
            <Tooltip showArrow={true} placement="top" content="Global">
              <span>
                <FaGlobeAmericas
                  size={20}
                  className="text-gray-500 cursor-pointer"
                />
              </span>
            </Tooltip>
            <Tooltip showArrow={true} placement="top" content="Chatroom">
              <span>
                <TbMessage2
                  size={23}
                  className="text-gray-500 cursor-pointer"
                />
              </span>
            </Tooltip>
            <Tooltip showArrow={true} placement="top" content="Setting">
              <Settings size={21} className="text-gray-500 cursor-pointer" />
            </Tooltip> */}
            <div>
              <DropdownNotification />
            </div>
            <div className="">
              <AppSwitcher name="argon" title="Argon Apps" />
            </div>
            <UserDropdown className="font-medium text-gray-600" />

            <div
              onClick={selectAChat}
              className={cn(
                "rounded-full p-1 bg-gray-300 h-10 w-10 cursor-pointer   items-center justify-center",
                pathname === "/engage/home" ? "flex md:hidden" : "flex",
              )}
            >
              <TbMessage2 className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
      <SearchProfile
        openSearchContainer={openSearchContainer}
        setOpenSearchContainer={setOpenSearchContainer}
      />

      {
        <ChatDrawer
          isOpen={showLargeChatContainer}
          onClose={handleOnclose}
          user={selectedChat}
          setUser={() => setSelectedChat(null)}
        />
      }
    </div>
  );
};

export default Navbar;
