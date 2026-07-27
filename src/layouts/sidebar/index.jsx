import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { useRef } from "react";
import SubMenu from "./SubMenu";
import { motion } from "framer-motion";
import {
  // MessagingSectionMenu,
  // PayrollSectionMenu,
  PeopleSectionMenu,
} from "./routes";
import { NavLink, useLocation } from "react-router-dom";
import { dashboardContext } from "../../context/Dashboard";
import SubMenuSidebar from "../submenuSidebar";
import ChatDrawer from "../../pages/home/rightMenu/components/ChatDrawer";
import { useNavigate } from "react-router-dom";
import SearchProfile from "../SearchProfile";
import useCurrentUser from "../../hooks/useCurrentUser";
import { filePrefix } from "../../utils/filePrefix";
import { ChevronDown } from "lucide-react";

const getFilteredSideMenu = (sideMenu, userData) => {
  // Create a copy of the side menu to avoid mutating the original
  let filteredMenu = [...sideMenu];

  // Apply each filtering condition based on user permissions

  // If user is not HR and not Administrator
  if (!userData?.data?.IS_HR) {
    filteredMenu = filteredMenu.filter((el) => el?.name !== "HRIS");
  }

  // If user is not SALARY (payroll manager)
  if (!userData?.data?.IS_SALARY) {
    filteredMenu = filteredMenu.filter(
      (el) => el?.name?.toLowerCase() !== "Payroll".toLowerCase(),
    );
  }

  // If user is not HR
  if (!userData?.data?.IS_HR) {
    filteredMenu = filteredMenu.filter(
      (el) =>
        el?.name?.toLowerCase() !== "Admin".toLowerCase() &&
        el?.name?.toLowerCase() !== "HRIS".toLowerCase(),
    );
  }
  if (!userData?.data?.IS_AUDIT) {
    filteredMenu = filteredMenu.filter(
      (el) => el?.name?.toLowerCase() !== "Audit".toLowerCase(),
    );
  }

  // If user is not Administrator
  if (!userData?.data?.IS_ADMINISTRATOR) {
    filteredMenu = filteredMenu.filter(
      (el) => el?.name?.toLowerCase() !== "Administrator".toLowerCase(),
    );
  }

  return filteredMenu;
};

const Sidebar = () => {
  const navigate = useNavigate();
  const {
    sidebarOpen,
    setSidebarOpen,
    isTablet,
    sidebarMinimized,
    // currentHomeSidemenu,
    // setCurrentHomeSidemenu,
    // minimizeSidebarHome,
  } = useContext(dashboardContext);

  const [sideMenu, setSideMenu] = useState([]);
  const [showLargeChatContainer, setShowLargeChatContainer] = useState(false);
  const sidebarRef = useRef();
  const { pathname } = useLocation();
  const { userData } = useCurrentUser();
  //search profile functions
  const [openSearchContainer, setOpenSearchContainer] = useState(false);

  const determineSidebarMenu = useCallback(() => {
    return PeopleSectionMenu;
    // switch (currentHomeSidemenu) {
    //   case "People":
    //     return PeopleSectionMenu;
    //   case "Messaging":
    //     return MessagingSectionMenu;
    //   case "Workflow (Memos)":
    //     return WorkflowSectionMenu;
    //   case "Payroll":
    //     return PayrollSectionMenu;
    //   default:
    //     return defaultMenu;
    // }
    // }, [currentHomeSidemenu]); //PREVIOUS DEPENDENCY
  }, []);

  useEffect(() => {
    const menus = determineSidebarMenu();
    setSideMenu(menus);
    return () => {
      setSideMenu([]);
    };
  }, [determineSidebarMenu]);

  useEffect(() => {
    if (isTablet) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isTablet, setSidebarOpen]);

  const overlayClicked = () => {
    // setShowminimizedsubMenu(false);
    setSidebarOpen(false);
  };

  useEffect(() => {
    isTablet && setSidebarOpen(false);
  }, [pathname, isTablet, setSidebarOpen]);

  const Nav_animation = isTablet
    ? {
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -350,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
        minimize: {
          x: 0,
          width: "7.5rem",
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "0rem",
          transition: {
            damping: 40,
          },
        },
        minimize: {
          width: "7.5rem",
          transition: {
            damping: 40,
          },
        },
      };

  const routeToHome = () => {
    navigate("/payroll/staff/all");
    // navigate("/engage/home");
    // minimizeSidebarHome();
    // setCurrentHomeSidemenu(null);
  };

  const openMessageRoom = () => {
    setShowLargeChatContainer(true);
    isTablet && setSidebarOpen(false);
  };

  const filteredSideMenu = getFilteredSideMenu(sideMenu, userData);

  const userName =
    `${userData?.data?.LAST_NAME ?? ""} ${userData?.data?.FIRST_NAME ?? ""}`.trim();
  const userInitial =
    userData?.data?.FIRST_NAME?.trim()?.[0]?.toUpperCase() ?? "U";
  const userRole = userData?.data?.IS_ADMINISTRATOR
    ? "Administrator"
    : userData?.data?.IS_HR
      ? "HR"
      : userData?.data?.IS_SALARY
        ? "Payroll Manager"
        : "Staff";

  // shared nav-item styling for the flat (no submenu) routes
  const navItemClass = (isActive) =>
    `group/navitem flex items-center gap-3 rounded-xl px-3 py-2 text-[14px] font-medium transition-colors hover:bg-white/5 hover:text-white hover:no-underline ${
      isActive ? "bg-white/10 text-white" : "text-slate-300"
    } ${
      sidebarMinimized
        ? "flex-col justify-center gap-1 px-1 py-3 text-center text-[11px] leading-tight"
        : ""
    }`;

  const navIconClass = (isActive) =>
    `min-w-max shrink-0 transition-colors group-hover/navitem:text-white ${
      isActive ? "text-white" : "text-slate-400"
    }`;

  return (
    <div className="relative bg-[#0F172A] shadow-sidebar">
      <div
        onClick={() => overlayClicked()}
        aria-hidden="true"
        className={`lg:hidden fixed inset-0 z-[90] cursor-pointer bg-slate-900/50 backdrop-blur-sm ${
          sidebarOpen ? "block" : "hidden"
        }`}
      ></div>
      <SubMenuSidebar />
      <motion.aside
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTablet ? -350 : 0 }}
        animate={
          sidebarMinimized && sidebarOpen
            ? "minimize"
            : !sidebarMinimized && sidebarOpen
              ? "open"
              : "closed"
        }
        className="group fixed inset-y-0 left-0 z-[91] lg:z-[49] flex h-screen w-[16rem] max-w-[16rem] flex-col overflow-hidden
             bg-gradient-to-b from-[#1E293B] via-[#1B2638] to-[#0F172A] text-slate-300 shadow-sidebar dark:!text-slate-300"
      >
        {/* Logo */}
        <div
          onClick={routeToHome}
          className={`flex shrink-0 cursor-pointer items-center gap-3 py-5 ${
            sidebarMinimized ? "justify-center px-2" : "px-5"
          }`}
        >
          <img
            src="/NCAA.png"
            alt="NCAA"
            className="h-11 w-11 shrink-0 rounded-full border-4 border-white object-cover shadow-md"
          />
          {!sidebarMinimized && (
            <div className="flex flex-col leading-tight">
              <span className="text-[15px] font-bold text-white">
                Nigerian Civil
              </span>
              <span className="text-[15px] font-bold text-white">
                Aviation Authority
              </span>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="scrollbar-slim flex-1 overflow-y-auto overflow-x-hidden px-3 pb-4">
          {filteredSideMenu?.map((route, i) => (
            <Fragment key={i}>
              <div className={i === 0 ? "mt-1" : "mt-5"}>
                {!sidebarMinimized && route?.title && (
                  <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    {route.title?.toLocaleUpperCase()}
                  </p>
                )}
                <ul className="space-y-1">
                  {route?.withSubMenu ? (
                    route.submenu?.map((menu, i) => (
                      <SubMenu
                        key={i}
                        data={menu}
                        routeMerge={route?.routeMerge}
                      />
                    ))
                  ) : (
                    <>
                      {route?.name?.toLowerCase() === "chat room" ? (
                        <li>
                          <div
                            onClick={openMessageRoom}
                            className={`cursor-pointer ${navItemClass(
                              pathname.includes(route?.route),
                            )}`}
                          >
                            <route.icon
                              size={sidebarMinimized ? 26 : 20}
                              className={navIconClass(
                                pathname.includes(route?.route),
                              )}
                            />
                            <span className="flex-1 truncate text-left">
                              {route?.name}
                            </span>
                          </div>
                        </li>
                      ) : (
                        route?.name && (
                          <li>
                            <NavLink
                              to={route?.enabled ? route?.route : "#"}
                              className={navItemClass(
                                pathname.includes(route?.route),
                              )}
                            >
                              <route.icon
                                size={sidebarMinimized ? 26 : 20}
                                className={navIconClass(
                                  pathname.includes(route?.route),
                                )}
                              />
                              <span
                                className={`flex-1 truncate text-left ${
                                  !route?.enabled && "text-slate-500"
                                }`}
                              >
                                {route?.name}
                              </span>
                            </NavLink>
                          </li>
                        )
                      )}
                    </>
                  )}
                </ul>
              </div>
            </Fragment>
          ))}
        </nav>

        {/* Profile */}
        <div className="shrink-0 border-t border-white/10 p-3">
          <button
            type="button"
            className={`flex w-full items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-white/5 ${
              sidebarMinimized ? "justify-center" : ""
            }`}
          >
            {userData?.data?.FILE_NAME ? (
              <img
                src={filePrefix + userData.data.FILE_NAME}
                alt={userName}
                className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-indigo-500/50"
              />
            ) : (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white">
                {userInitial}
              </div>
            )}
            {!sidebarMinimized && (
              <>
                <div className="min-w-0 flex-1 text-left leading-tight">
                  <p className="truncate text-sm font-semibold uppercase text-white">
                    {userName}
                  </p>
                  <p className="truncate text-xs text-slate-400">{userRole}</p>
                </div>
                <ChevronDown
                  className="h-4 w-4 shrink-0 text-slate-400"
                  strokeWidth={2}
                />
              </>
            )}
          </button>
        </div>
      </motion.aside>
      {
        <ChatDrawer
          // fromMessageRoom={true} // Message room has been PEND for now
          isOpen={showLargeChatContainer}
          onClose={() => setShowLargeChatContainer(false)}
        />
      }
      <SearchProfile
        openSearchContainer={openSearchContainer}
        setOpenSearchContainer={setOpenSearchContainer}
      />
    </div>
  );
};
export default Sidebar;
