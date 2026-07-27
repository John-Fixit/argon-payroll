/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { NavLink, useLocation } from "react-router-dom";
import { dashboardContext } from "../../context/Dashboard";

const ThirdSubMenu = ({ data, routeMerge }) => {
  const {
    sidebarOpen,
    tabClicked,
    toggleTab,
    sidebarMinimized,
    setShowminimizedsubMenu,
    setExtendedSubMenuData,
  } = useContext(dashboardContext);
  const { pathname } = useLocation();

  const [showDropDown, setShowDropDown] = useState(false);

  const trigger = useRef(null);

  const showSubMenu = () => {
    if (sidebarMinimized) {
      setShowminimizedsubMenu(true);
      setExtendedSubMenuData(data);
    }
    toggleTab(data.name);
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




  return (
    <>
      <li
        className={`relative z-40 w-[15rem] group/navitemsub  hover:cursor-pointer ${
          !sidebarMinimized && tabClicked === data.name && "bg-sidebarSubMenuBg "
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
          className={`min-w-max group-hover/navitemsub:text-menuItemColor ${sidebarMinimized && "mx-auto"} ${
            pathname.includes(data.name)
              ? "text-white"
              : "text-menuItemIcon"
          }`}
        />

        <p
          className={`flex-1 capitalize  ${
           
            pathname.includes(data.name) ? '!text-white' : pathname.includes(data?.prefix) && '!text-white'
          } `}
        >
          {data.name}
        </p>

        {!sidebarMinimized && (
          <IoIosArrowDown
            strokeWidth={2}
            className={`${
              tabClicked !== data.name ? "-rotate-90 duration-200" : "rotate-30 duration-200"
            }  mr-1 group-hover/navitemsub:text-menuItemColor`}
          />
        )}
      </li>

      {sidebarOpen && (
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
          className={`flex h-0 flex-col pl-7    z-10 font-normal overflow-hidden w-[15rem] relative -top-2 rounded-br-[0.65rem] ${
            (tabClicked === data.name || pathname.includes(data.name)) &&
            "bg-sidebarSubMenuBg"
          }`}
        >
          <div
            className={` left-6 h-full absolute mx-3 border-[0.6px] border-sidebarLineColor ${
              tabClicked === data.name || pathname.includes(data.name)
                ? "block"
                : "hidden"
            }`}
          ></div>

          {data.menus?.map((menu) => (
            <li
              key={menu.name}
              className="!font-[400] !text-[15px] text-menuItemColor !leading-8"
            >
              <NavLink
                to={ routeMerge ?  `/${data.name}${menu.route}` :  `${menu.route}`}
                className="link-sub-menu  capitalize relative hover:text-white hover:cursor-pointer hover:no-underline  visited:no-underline active:no-underline"
              >
                {pathname.includes(menu.route) && (
                  <span className="w-2 h-2 rounded-full bg-btnColor absolute left-[0.3rem] duration-200 transition-all"></span>
                )}
                {menu.name}
              </NavLink>
            </li>
          ))}
        </motion.ul>
      )}
    </>
  );
};

export default ThirdSubMenu;
