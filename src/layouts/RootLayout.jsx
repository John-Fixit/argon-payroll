import { useContext } from "react";
import { dashboardContext } from "../context/Dashboard";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { Outlet, useLocation } from "react-router-dom";
import DefaultSidebar from "./defaultSidebar";

function RootLayout() {
  const {
    sidebarOpen,
    sidebarMinimized,
    isTablet,
    currentHomeSidemenu,
    sidebarMinimizedHome,
  } = useContext(dashboardContext);
  const { pathname } = useLocation();

  return (
    <div
      className={`dark:text-gray-100 dark:bg-slate-700 ${
        pathname === "/payroll/dashboard" ? "bg-white" : "bg-lighten"
      } duration-200 ease-in-out z-1 overflow-visible`}
    >
      {!pathname === "/engage/memos" ? null : <Navbar />}
      <div className="flex w-full ">
        {/* {currentHomeSidemenu === null ? <DefaultSidebar /> : <Sidebar />} */}
        <Sidebar />
        <div
          className={`w-full min-h-[93vh] ${
            sidebarMinimizedHome
              ? "lg:ml-[7.5rem]"
              : sidebarOpen
                ? "lg:ml-64"
                : !sidebarMinimizedHome && !sidebarOpen && "lg:ml-0"
          }`}
        >
          {pathname.includes("/home") ? (
            <main
              className={`py-4 flex-1  mx-auto w-full overflow-clip
                          ${
                            sidebarOpen && !isTablet
                              ? " w-[98%] lg:w-[73%] subsemi:w-[90%]   xx:w-[84%]  "
                              : " max-w-[90%] sm:w-[72%] md:w-[75%] lg:w-[70%] "
                          }
                        `}
            >
              <Outlet />
            </main>
          ) : pathname === "/engage/memos" ? (
            <main
              className={`py-0 flex-1 max-w-[87%] overflow-clip mx-auto ${
                !sidebarMinimized && !sidebarOpen && "lg:ml-[16rem]"
              }`}
            >
              <Outlet />
            </main>
          ) : pathname?.includes("/self/profile_details/") ? (
            <main
              className={`py-0 flex-1 max-w-[95%] overflow-clip mx-auto ${
                !sidebarMinimized && !sidebarOpen && "lg:ml-[16rem]"
              }`}
            >
              <Outlet />
            </main>
          ) : pathname?.includes("/self/profile") ? (
            <main
              className={`py-0 flex-1 max-w-[90%] overflow-clip mx-auto ${
                !sidebarMinimized && !sidebarOpen && "lg:ml-[16rem]"
              }`}
            >
              <Outlet />
            </main>
          ) : pathname === "/engage/group" ||
            pathname === "/messaging/engage/group" ? (
            <main
              className={`py-0 flex-1 max-w-[93.5%] overflow-clip mx-auto ${
                !sidebarMinimizedHome && !sidebarOpen && "lg:ml-[16rem]"
              }`}
            >
              <Outlet />
            </main>
          ) : pathname === "/integrate/settings" ? (
            <main
              className={`py-0 flex-1 max-w-[100%] overflow-clip mx-auto ${
                !sidebarMinimized && !sidebarOpen && "lg:ml-[16rem]"
              }`}
            >
              <Outlet />
            </main>
          ) : pathname === "/people/hr/staff_data" ? (
            <main
              className={`py-0 flex-1 max-w-[100%] md:max-w-[95%] overflow-clip mx-auto px-6 ${
                !sidebarMinimized && !sidebarOpen && "lg:ml-[16rem]"
              }`}
            >
              <Outlet />
            </main>
          ) : (
            <main
              className={`py-4 flex-1 max-w-[100%] md:max-w-[95%] overflow-clip mx-auto px-6 ${
                !sidebarMinimized && !sidebarOpen && "lg:ml-0"
              }`}
            >
              <Outlet />
            </main>
          )}
        </div>
      </div>
      {/* <SessionTimeout /> */}
    </div>
  );
}

export default RootLayout;
