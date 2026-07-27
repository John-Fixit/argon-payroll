import { useContext, useEffect } from "react";
import { dashboardContext } from "../../context/Dashboard";
import SubMenuExtended from "./SubMenuExtended";

const SubMenuSidebar = () => {
  const {
    sidebarOpen,
    setSidebarOpen,
    isTablet,
    sidebarMinimized,
    showminimizedsubMenu,
    setShowminimizedsubMenu,
  } = useContext(dashboardContext);

  useEffect(() => {
    if (isTablet) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isTablet, setSidebarOpen]);

  useEffect(() => {
    return () => {
      setShowminimizedsubMenu(false);
    };
  }, [setShowminimizedsubMenu]);

  return (
    <>
      {sidebarOpen && sidebarMinimized && showminimizedsubMenu && (
        <div className="relative bg-sidebarBg w-[93%] z-[99999]">
          <div
            className="md:z-[9] z-[99999] max-w-[16rem]  w-[16rem] 
                fixed top-0 left-[7.5rem]
              h-screen  dark:!text-gray-100 bg-sidebarBg"
          >
            <div className="flex flex-col  h-full">
              <ul className="whitespace-pre text-[0.9rem] py-5 flex flex-col gap-1 overflow-x-hidden  font-medium  scrollbar-thin dark:scrollbar-track-slate-400  scrollbar-track-white scrollbar-thumb-slate-100 dark:scrollbar-thumb-slate-700  md:h-[78%] h-[75%]  px-0">
                <div className="flex flex-col gap-1">
                  <SubMenuExtended />
                </div>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubMenuSidebar;
