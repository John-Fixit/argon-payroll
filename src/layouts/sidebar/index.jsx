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

  return (
    <div className="relative bg-sidebarBg shadow-sidebar">
      <div
        onClick={() => overlayClicked()}
        className={`md:hidden fixed inset-0 max-h-screen z-[90] bg-chatoverlay cursor-pointer ${
          sidebarOpen ? "block" : "hidden"
        } `}
      ></div>
      <SubMenuSidebar />
      <motion.div
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
        className="shadow-sidebar group  lg:z-[49] z-[91] max-w-[16rem]  w-[16rem] 
             fixed top-0 left-0
           h-screen  dark:!text-gray-100 bg-sidebarBg"
      >
        {/* top bar */}
        <div className="flex flex-col  h-full ">
          <ul className="whitespace-pre text-[0.9rem] flex flex-col overflow-x-hidden font-medium  scrollbar-thin scrollbar-thumb-transparent  group-hover:scrollbar-thumb-scrollbarColor scrollbar-track-transparent menuScrollBar  h-full  px-0  pb-20">
            {/* logo & search section */}
            <div
              className={`flex flex-col bg-sidebarBg  ${
                sidebarMinimized && " h-28"
              }`}
            >
              <div
                className={`w-full   flex-col gap-4 justify-center p-1 px-3 items-center`}
              >
                <div
                  className={`mr-8 py-2  pt-4 cursor-pointer  ${
                    sidebarMinimized ? "hidden" : "block"
                  }`}
                  onClick={routeToHome}
                >
                  <img
                    src="/assets/images/community_logo_light.png"
                    alt="comuneety-logo"
                  />
                </div>
              </div>
            </div>
            {filteredSideMenu?.map((route, i) => (
              <Fragment key={i}>
                <div className="p-0">
                  {!sidebarMinimized && route?.title && (
                    <small
                      className={`mx-[1.2rem] text-menuItemTitle font-bold text-sm inline-block tracking-widest px-2 mb-2 font-Lato ${
                        i === 0 ? "pt-3" : "pt-7"
                      }`}
                    >
                      {route.title?.toLocaleUpperCase()}
                    </small>
                  )}
                  {route?.withSubMenu ? (
                    <>
                      <div className=" w-full p-0">
                        {route.submenu?.map((menu, i) => (
                          <div key={i} className="flex flex-col gap-1">
                            <SubMenu
                              data={menu}
                              routeMerge={route?.routeMerge}
                            />
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      {route?.name?.toLowerCase() === "chat room" ? (
                        <li
                          className={` ${
                            sidebarMinimized &&
                            "border-b border-gray-800 py-0  hover:text-white "
                          }`}
                        >
                          <div
                            onClick={openMessageRoom}
                            className={`group/navitem ${
                              sidebarMinimized
                                ? "flex flex-col text-center justify-center hover:no-underline   gap-1 cursor-pointer  duration-300 font-medium text-gray-400"
                                : "link"
                            }`}
                          >
                            <route.icon
                              size={sidebarMinimized ? 30 : 20}
                              className={`min-w-max group-hover/navitem:text-menuItemColor ${
                                sidebarMinimized && "mx-auto"
                              }
                                ${
                                  pathname.includes(route?.route)
                                    ? "text-white"
                                    : "text-menuItemIcon"
                                }`}
                            />
                            {route?.name}
                          </div>
                        </li>
                      ) : (
                        route?.name && (
                          <li
                            className={` ${
                              sidebarMinimized &&
                              "border-b border-gray-800 py-0  hover:text-white "
                            }`}
                          >
                            <NavLink
                              to={route?.enabled ? route?.route : "#"}
                              className={`group/navitem ${
                                sidebarMinimized
                                  ? "flex flex-col text-center justify-center hover:no-underline   gap-1 cursor-pointer  duration-300 font-medium text-gray-400"
                                  : "link"
                              }`}
                            >
                              <route.icon
                                size={sidebarMinimized ? 30 : 20}
                                className={`min-w-max group-hover/navitem:text-menuItemColor ${
                                  sidebarMinimized && "mx-auto"
                                }
                                    ${
                                      pathname.includes(route?.route)
                                        ? "text-white"
                                        : "text-menuItemIcon"
                                    }`}
                              />
                              <span
                                className={`${
                                  !route?.enabled && "text-menuItemIcon"
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
                </div>
              </Fragment>
            ))}
            {/* menu section */}
          </ul>
        </div>
      </motion.div>
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
