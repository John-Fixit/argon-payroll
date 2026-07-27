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

  const isGroupActive =
    pathname.includes(data.name) || pathname.includes(data.prefix);
  const isExpanded = tabClicked === data.name;

  // shared styling for every child link inside an expanded group
  const subLinkClass = (isActive) =>
    `flex items-center gap-2 rounded-lg px-3 py-1.5 text-[13.5px] capitalize transition-colors hover:bg-white/5 hover:text-white hover:no-underline visited:no-underline active:no-underline ${
      isActive ? "bg-white/10 text-white" : "text-slate-400"
    }`;

  return (
    <>
      <li
        className={`group/navitemsub flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-[14px] font-medium transition-colors hover:bg-white/5 hover:text-white ${
          isGroupActive ? "text-white" : "text-slate-300"
        } ${!sidebarMinimized && isExpanded ? "bg-white/5" : ""} ${
          sidebarMinimized
            ? "flex-col justify-center gap-1 px-1 py-3 text-center text-[11px] leading-tight"
            : ""
        }`}
        onClick={showSubMenu}
        ref={trigger}
      >
        <data.icon
          size={sidebarMinimized ? 26 : 18}
          className={`min-w-max shrink-0 transition-colors group-hover/navitemsub:text-white ${
            isGroupActive ? "text-white" : "text-slate-400"
          }`}
        />

        <p className="flex-1 truncate capitalize">{data.name}</p>

        {!sidebarMinimized && (
          <IoIosArrowDown
            strokeWidth={2}
            className={`${
              isExpanded ? "rotate-0" : "-rotate-90"
            } shrink-0 text-slate-400 duration-200 group-hover/navitemsub:text-white`}
          />
        )}
      </li>

      {isExpanded && sidebarOpen && !sidebarMinimized && (
        <motion.ul
          variants={variants}
          animate={
            isExpanded
              ? {
                  height: "fit-content",
                }
              : {
                  height: 0,
                }
          }
          className="ml-[1.4rem] mt-1 flex h-0 flex-col gap-y-0.5 overflow-hidden border-l border-white/10 pl-2 font-normal"
        >
          {getFilteredSideMenu(data.menus, userData)?.map((menu) => (
            <li key={menu.name} className="w-full">
              {menu?.withSubMenu3 ? (
                <div className="capitalize">
                  <div
                    className={`${subLinkClass(
                      pathname.includes(menu.route),
                    )} cursor-pointer justify-between`}
                    onClick={() => showSubMenuLV3(menu.name)}
                  >
                    <div className="flex min-w-0 items-center gap-x-2">
                      <menu.icon
                        size={15}
                        className={`min-w-max shrink-0 ${
                          pathname.includes(menu.name) ||
                          pathname.includes(menu.prefix)
                            ? "text-white"
                            : "text-slate-500"
                        }`}
                      />
                      <span className="truncate">{menu.name}</span>
                    </div>

                    <IoIosArrowDown
                      strokeWidth={2}
                      size={12}
                      className={`${
                        tabClickedLV3 !== menu.name ? "-rotate-90" : "rotate-0"
                      } shrink-0 text-slate-500 duration-200`}
                    />
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
                      className="ml-4 mt-0.5 flex h-0 flex-col gap-y-0.5 overflow-hidden border-l border-white/10 pl-2 font-normal"
                    >
                      {menu?.menus?.map((menu3) => (
                        <li key={menu3.name} className="w-full">
                          <NavLink
                            to={menu3?.enabled ? `${menu3.route}` : "#"}
                            className={subLinkClass(
                              pathname.includes(menu3.route),
                            )}
                          >
                            <span className="truncate">{menu3.name}</span>
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
                      className={`${subLinkClass(
                        pathname.includes(menu.route),
                      )} cursor-pointer`}
                    >
                      {pathname.includes(menu.route) && (
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400"></span>
                      )}
                      <span className="truncate">{menu.name}</span>
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
                      className={subLinkClass(pathname.includes(menu.route))}
                    >
                      {pathname.includes(menu.route) && (
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400"></span>
                      )}

                      {menu?.icon ? (
                        <div className="flex min-w-0 items-center gap-x-2">
                          <menu.icon
                            size={12}
                            className={`min-w-max shrink-0 ${
                              pathname.includes(menu.name)
                                ? "text-white"
                                : "text-slate-500"
                            }`}
                          />
                          <span className="truncate">{menu.name}</span>
                        </div>
                      ) : (
                        <span
                          className={`truncate ${
                            !menu?.enabled && "text-slate-600"
                          }`}
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
