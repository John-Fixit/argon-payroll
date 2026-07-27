/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { NavLink, useLocation } from "react-router-dom";
import { dashboardContext } from "../../context/Dashboard";
import ChatDrawer from "../../pages/home/rightMenu/components/ChatDrawer";
import useCurrentUser from "../../hooks/useCurrentUser";

const SubMenu = ({ data, routeMerge }) => {
  const {
    sidebarOpen,
    setSidebarOpen,
    tabClicked,
    toggleTab,
    sidebarMinimized,
    setShowminimizedsubMenu,
    setExtendedSubMenuData,
    isTablet,
    toggleTabLV3,
    tabClickedLV3,
  } = useContext(dashboardContext);
  const { pathname } = useLocation();
  const [showDropDown, setShowDropDown] = useState(false);
  const [showLargeChatContainer, setShowLargeChatContainer] = useState(false);
  const trigger = useRef(null);
  const { userData } = useCurrentUser();

  const showSubMenu = () => {
    if (sidebarMinimized) {
      setShowminimizedsubMenu(true);
      setExtendedSubMenuData(data);
    }
    toggleTab(data.name);
  };

  const showSubMenuLV3 = (name) => {
    if (sidebarMinimized) {
      setShowminimizedsubMenu(true);
      setExtendedSubMenuData(data);
    }
    toggleTabLV3(name);
  };

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!showDropDown || trigger.current.contains(target)) return;
      setShowDropDown(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  const variants = {
    visible: (custom) => ({
      opacity: 1,
      transition: { delay: custom * 0.1 },
    }),
  };

  const openMessageRoom = () => {
    setShowLargeChatContainer(true);
    isTablet && setSidebarOpen(false);
  };

  const getFilteredSideMenu = (menu, userData) => {
    // Create a copy of the side menu to avoid mutating the original
    let filteredMenu = [...menu];

    if (data.name === "HRIS" && !userData?.data?.CAN_ONBOARD) {
      filteredMenu = filteredMenu.filter((el) => el?.name !== "Onboard");
    }
    if (data.name === "HRIS" && !userData?.data?.IS_VARIATION) {
      filteredMenu = filteredMenu.filter((el) => el?.name !== "Variation");
    }
    if (data.name === "HRIS" && !userData?.data?.IS_LEAVE_OFFICER) {
      filteredMenu = filteredMenu.filter((el) => el?.name !== "Leave");
    }
    if (data.name === "HRIS" && !userData?.data?.IS_PERFORMANCE) {
      filteredMenu = filteredMenu.filter((el) => el?.name !== "Performance");
    }
    if (data.name === "HRIS" && !userData?.data?.IS_EXIT_USER) {
      filteredMenu = filteredMenu.filter((el) => el?.name !== "Exit Request");
    }
    return filteredMenu;
  };

  return (
    <>
      <li
        className={`relative z-40 w-[15rem] group/navitemsub  hover:cursor-pointer ${
          !sidebarMinimized &&
          tabClicked === data.name &&
          "bg-sidebarSubMenuBg "
        } ${
          sidebarMinimized
            ? "border-b border-gray-800 py-4"
            : "border-0 border-transparent"
        } ${
          sidebarMinimized
            ? "flex flex-col text-center justify-center gap-1 cursor-pointer  duration-300 font-medium text-gray-400"
            : "link !pr-2 "
        }`}
        onClick={showSubMenu}
        ref={trigger}
      >
        <data.icon
          size={sidebarMinimized ? 30 : 18}
          className={`min-w-max group-hover/navitemsub:text-menuItemColor ${
            sidebarMinimized && "mx-auto"
          } ${
            pathname.includes(data.name) || pathname.includes(data.prefix)
              ? "text-white"
              : "text-menuItemIcon"
          }`}
        />

        <p
          className={`flex-1 capitalize  ${
            pathname.includes(data.name)
              ? "!text-white"
              : pathname.includes(data?.prefix) && "!text-white"
          } `}
        >
          {data.name}
        </p>

        {!sidebarMinimized && (
          <IoIosArrowDown
            strokeWidth={2}
            className={`${
              tabClicked !== data.name
                ? "-rotate-90 duration-200"
                : "rotate-30 duration-200"
            }  mr-1 group-hover/navitemsub:text-menuItemColor`}
          />
        )}
      </li>

      {tabClicked === data.name && sidebarOpen && (
        <motion.ul
          variants={variants}
          animate={
            !sidebarMinimized && tabClicked === data.name
              ? {
                  height: "fit-content",
                }
              : {
                  height: 0,
                }
          }
          className={`flex h-0 flex-col pl-7 pb-4 pt-2 gap-y-2 z-10 font-normal overflow-hidden w-[15rem] relative -top-2 rounded-br-[0.65rem] ${
            (tabClicked === data.name || pathname.includes(data.name)) &&
            "bg-sidebarSubMenuBg"
          }`}
        >
          {!data?.subLV3 && (
            <div
              className={` left-6 h-full absolute mx-3 border-[0.6px] border-sidebarLineColor ${
                tabClicked === data.name || pathname.includes(data.name)
                  ? "block"
                  : "hidden"
              }`}
            ></div>
          )}

          {getFilteredSideMenu(data.menus, userData)?.map((menu) => (
            <li
              key={menu.name}
              className="!font-[400] !text-[15px] text-menuItemColor !leading-8 w-full "
            >
              {menu?.withSubMenu3 ? (
                <div className="link-sub-menu3   capitalize relative hover:text-white hover:cursor-pointer hover:no-underline  visited:no-underline active:no-underline">
                  {pathname.includes(menu.route) && (
                    <span className="w-2 h-2 rounded-full bg-btnColor absolute left-[0.3rem] duration-200 transition-all"></span>
                  )}

                  <div
                    className="flex justify-between items-center w-[10.8rem] "
                    onClick={() => showSubMenuLV3(menu.name)}
                  >
                    <div className="flex items-center gap-x-1">
                      <menu.icon
                        size={sidebarMinimized ? 30 : 15}
                        className={`min-w-max group-hover/navitemsub:text-menuItemColor ${
                          sidebarMinimized && "mx-auto"
                        } ${
                          pathname.includes(menu.name) ||
                          pathname.includes(menu.prefix)
                            ? "text-white"
                            : "text-menuItemIcon"
                        }`}
                      />

                      {menu.name}
                    </div>

                    {!sidebarMinimized && (
                      <IoIosArrowDown
                        strokeWidth={2}
                        size={12}
                        className={`${
                          tabClickedLV3 !== menu.name
                            ? "-rotate-90 duration-200"
                            : "rotate-30 duration-200"
                        }  mr-1 group-hover/navitemsub:text-menuItemColor`}
                      />
                    )}
                  </div>

                  {sidebarOpen && (
                    <motion.ul
                      animate={
                        tabClickedLV3 === menu.name
                          ? {
                              height: "fit-content",
                            }
                          : {
                              height: 0,
                            }
                      }
                      className={`flex h-0 flex-col   z-10 font-normal overflow-hidden w-full relative rounded-br-[0.65rem]    ${
                        tabClickedLV3 === menu.name && "bg-sidebarSubMenuBg"
                      }`}
                    >
                      <div
                        className={` -left-[0.35rem] h-full absolute mx-3 border-[0.6px] border-sidebarLineColor ${
                          tabClickedLV3 === menu.name ||
                          pathname.includes(menu.name)
                            ? "block"
                            : "hidden"
                        }`}
                      ></div>

                      {menu?.menus?.map((menu3) => (
                        <li
                          key={menu3.name}
                          className="!font-[400] !text-[15px] text-menuItemColor  !leading-8 "
                        >
                          <NavLink
                            to={menu3?.enabled ? `${menu3.route}` : "#"}
                            className="link-sub-menu4  capitalize relative hover:text-white hover:cursor-pointer hover:no-underline  visited:no-underline active:no-underline "
                          >
                            {pathname.includes(menu3.route) && (
                              <span className="w-2 h-2 rounded-full bg-btnColor absolute left-[0.2rem] top-3 duration-200 transition-all"></span>
                            )}
                            {menu3.name}
                          </NavLink>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </div>
              ) : (
                <>
                  {menu?.name?.toLowerCase() === "message room" ? (
                    <div
                      onClick={openMessageRoom}
                      className={` ${
                        menu?.icon ? "link-sub-menu3" : "link-sub-menu"
                      }    capitalize relative hover:text-white hover:cursor-pointer hover:no-underline  visited:no-underline active:no-underline`}
                    >
                      {pathname.includes(menu.route) && (
                        <span
                          className={`w-2 h-2 rounded-full bg-btnColor absolute left-[0.1.7rem] duration-200 top-3 transition-all ${
                            menu?.icon ? "left-[0rem]" : "left-[0.30rem]"
                          }`}
                        ></span>
                      )}
                      <span>{menu.name}</span>
                    </div>
                  ) : (
                    <NavLink
                      to={
                        menu?.enabled
                          ? routeMerge
                            ? `/${data.name}${menu.route}`
                            : `${menu.route}`
                          : `#`
                      }
                      className={` ${
                        menu?.icon ? "link-sub-menu3" : "link-sub-menu"
                      }    capitalize relative hover:text-white hover:cursor-pointer hover:no-underline  visited:no-underline active:no-underline`}
                    >
                      {pathname.includes(menu.route) && (
                        <span
                          className={`w-2 h-2 rounded-full bg-btnColor absolute left-[0.1.7rem] duration-200 top-3 transition-all ${
                            menu?.icon ? "left-[0rem]" : "left-[0.30rem]"
                          }`}
                        ></span>
                      )}

                      {menu?.icon ? (
                        <div className="flex items-center gap-x-1 ">
                          <menu.icon
                            size={sidebarMinimized ? 30 : 12}
                            className={`min-w-max group-hover/navitemsub:text-menuItemColor ${
                              sidebarMinimized && "mx-auto"
                            } ${
                              pathname.includes(menu.name)
                                ? "text-white"
                                : "text-menuItemIcon"
                            }`}
                          />

                          {menu.name}
                        </div>
                      ) : (
                        <span
                          className={`${!menu?.enabled && "text-menuItemIcon"}`}
                        >
                          {menu.name}
                        </span>
                      )}
                    </NavLink>
                  )}
                </>
              )}
            </li>
          ))}
        </motion.ul>
      )}

      {
        <ChatDrawer
          // fromMessageRoom={true} // from message room PEND for now
          isOpen={showLargeChatContainer}
          onClose={() => setShowLargeChatContainer(false)}
        />
      }
    </>
  );
};

export default SubMenu;
