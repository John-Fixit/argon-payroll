import { Fragment, useContext, useEffect } from "react";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { dashboardContext } from "../../context/Dashboard";
import { defaultMenuHome, defaultMenuHomeAll } from "../sidebar/routes";
// import { PiArrowsLeftRightBold } from "react-icons/pi";
import { cn, Tooltip } from "@nextui-org/react";

const DefaultSidebar = () => {
  const {
    sidebarOpen,
    setSidebarOpen,
    isTablet,
    minimizeSidebarHome,
    sidebarMinimizedHome,
    setCurrentHomeSidemenu,
    setSidebarMinimizedHome,
  } = useContext(dashboardContext);
  const sidebarRef = useRef();
  const { pathname } = useLocation();
  const navigate = useNavigate();

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

  const foldSidebar = () => {
    minimizeSidebarHome();
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

  const showSubMenu = (menu) => {
    if (menu === "Dashboard") {
      navigate("/engage/home");
      return;
    }

    setSidebarMinimizedHome(false);
    setCurrentHomeSidemenu(menu);
  };

  return (
    <div className="relative bg-sidebarBg shadow-sidebar">
      <div
        onClick={() => overlayClicked()}
        className={`lg:hidden fixed inset-0 max-h-screen z-[90] bg-chatoverlay cursor-pointer   ${
          sidebarOpen ? "block" : "hidden"
        } `}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTablet ? -350 : 0 }}
        animate={
          sidebarMinimizedHome && sidebarOpen
            ? "minimize"
            : !sidebarMinimizedHome && sidebarOpen
            ? "open"
            : "closed"
        }
        className="shadow-sidebar group  lg:z-[49] z-[91] max-w-[16rem]  w-[16rem] 
             fixed top-0 left-0
           h-screen  dark:!text-gray-100 bg-sidebarBg"
        id="s-sidebar"
      >
        <div className="flex flex-col  h-full ">
          <ul className="whitespace-pre text-[0.9rem] flex flex-col overflow-x-hidden font-medium  scrollbar-thin scrollbar-thumb-transparent  group-hover:scrollbar-thumb-scrollbarColor scrollbar-track-transparent menuScrollBar  h-full  px-0  pb-20">
            {/* logo */}
            <div
              className={`flex flex-col bg-sidebarBg  ${
                sidebarMinimizedHome && " h-28"
              }`}
            >
              <div className="flex items-center justify-center h-20 py-6">
                <img
                  src="/assets/images/NCAA.png"
                  alt="comuneety-logo"
                  className={cn(
                    ` w-10`,
                    sidebarMinimizedHome ? "block" : "hidden"
                  )}
                />
                <img
                  src="/assets/images/community_logo_light.png"
                  alt="comuneety-logo"
                  className={cn(
                    ` w-52 mt-10`,
                    sidebarMinimizedHome ? "hidden" : "block"
                  )}
                />
              </div>
              {/* <div
                className={`w-100 h-4  flex justify-end my-2   p-3 px-4 font-medium hover:cursor-pointer ${
                  sidebarMinimizedHome && "justify-center"
                }`}
                onClick={foldSidebar}
              >
                <PiArrowsLeftRightBold
                  size={25}
                  className="text-menuItemColor"
                />
              </div> */}

              <div
                className={`w-full   flex-col gap-4 justify-center p-1 px-3 items-center mt-24`}
              ></div>
            </div>
            {/* logo */}

            {sidebarMinimizedHome ? (
              <>
                {defaultMenuHome?.map((route, i) => (
                  <Fragment key={i}>
                    <div className="p-0">
                      {
                        <>
                          <Tooltip
                            showArrow={true}
                            placement="right"
                            content={
                              route?.enabled || route?.name === "More"
                                ? route?.name
                                : "Coming soon"
                            }
                            color="default"
                          >
                            <li
                              className={`relative  hover:text-white hover:cursor-pointer  link3 flex-col border-b-[1.6px] border-sidebarSubMenuBg/50   ${
                                route.name === "Dashboard" && "!text-white"
                              }`}
                              onClick={() =>
                                route?.name === "More"
                                  ? foldSidebar()
                                  : route?.enabled
                                  ? showSubMenu(route?.name)
                                  : () => {}
                              }
                            >
                              <route.icon size={30} className={`min-w-max`} />
                              <p className="flex-1 capitalize text-md w-full text-center truncate">
                                {route?.name}
                              </p>
                            </li>
                          </Tooltip>
                        </>
                      }
                    </div>
                  </Fragment>
                ))}
              </>
            ) : (
              <>
                {defaultMenuHomeAll?.map((route, i) => (
                  <Fragment key={i}>
                    <div className="relative  grid grid-cols-2 gap-2 mx-3 border-b-[1.6px] border-sidebarSubMenuBg/50">
                      {route?.map((section, ind) => (
                        <Fragment key={ind}>
                          <Tooltip
                            showArrow={true}
                            placement="bottom"
                            content={
                              section?.enabled ? section?.name : "Coming soon"
                            }
                            color="default"
                          >
                            <li
                              className={`relative  hover:text-white hover:cursor-pointer  link4 flex-col ${
                                section?.name === "Dashboard" && "!text-white"
                              }`}
                              onClick={
                                section?.enabled
                                  ? () => showSubMenu(section?.name)
                                  : () => {}
                              }
                            >
                              <section.icon size={30} className={`min-w-max`} />

                              <p className="flex-1 capitalize text-md w-full text-center truncate">
                                {section?.name}
                              </p>
                            </li>
                          </Tooltip>
                        </Fragment>
                      ))}
                    </div>
                  </Fragment>
                ))}
              </>
            )}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default DefaultSidebar;
