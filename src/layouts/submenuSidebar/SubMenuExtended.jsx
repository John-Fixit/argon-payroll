import { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { Link, NavLink, useLocation } from "react-router-dom";
import { dashboardContext } from "../../context/Dashboard";
import usePrevious from "../../hooks/usePrevious";

const  SubMenuExtended = () => {
  const {tabClicked,  setShowminimizedsubMenu, extendedSubMenuData} = useContext(dashboardContext)
  const { pathname } = useLocation();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const previousExtendedMenuData = usePrevious(extendedSubMenuData?.name)
  const trigger = useRef(null);

  const showSubMenu = ()=>{
      setSubMenuOpen(!subMenuOpen)
  }

useEffect(() => {
    if(extendedSubMenuData?.name !==previousExtendedMenuData ){
        setSubMenuOpen(true)
    }else if(tabClicked){
        setSubMenuOpen(true)
    }
  }, [extendedSubMenuData, tabClicked, previousExtendedMenuData]);

 const close = ()=>{
    setShowminimizedsubMenu(false);
 }

  return (
    <>
    {
        extendedSubMenuData && extendedSubMenuData?.name === "user sub profile"  ? (
            <>
                <div
          className={`  mt-[0.55rem] flex w-56 flex-col rounded   text-xs`}
        >
          <div className="px-4 py-3">
            <h5 className=" text-base font-medium text-menuItemTitle tracking-widest">ACCOUNT</h5>
          </div>
          <ul className="flex flex-col gap-2  px-4 py-3 text-gray-500 text-sm font-medium tracking-wide">
            <li className=" cursor-pointer hover:text-white"><div>Edit Account</div></li>
            <li className=" cursor-pointer hover:text-white"><div>Profile</div></li>
            <li className=" cursor-pointer hover:text-white"><div>Payments</div></li>
            <li className=" cursor-pointer hover:text-white"><div>Logout</div></li>
          </ul>
          <div className="px-4 py-3">
            <h5 className="text-base font-medium text-menuItemTitle tracking-widest">SELECT COMPANY</h5>
          </div>
          <ul className="flex flex-col  text-xs  px-3 ">
            <li>
              <Link
                className="flex gap-x-2   px-1 py-1  "
                to="#"
              >
                <div className="h-10 w-10 rounded-md bg-blue-400 text-center flex items-center justify-center">
                  <span className="text-white font-semibold ">FM</span>
                </div>
                <div>
                  <h6 className="text-xs font-medium text-menuItemTitle">
                    FrontendMatter Inc.
                  </h6>
                  <p className="text-xs text-menuItemTitle">Administrator</p>
                </div>
              </Link>
            </li>
            <li>
              <Link
                className="flex gap-4   px-1 py-1 "
                to="#"
              >
                 <div className="h-10 w-10 rounded-md bg-btnColor text-center flex items-center justify-center">
                  <span className="text-white font-semibold ">HH</span>
                </div>
                <div>
                  <h6 className="text-sm font-medium text-menuItemTitle">
                    HumanHuma Inc.
                  </h6>
                  <p className="text-sm text-menuItemTitle">Publisher</p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
            </>
        ) : (
            <>
            {
                extendedSubMenuData && (
                    <>     
                        <li
                            className={`relative  hover:text-white hover:cursor-pointer bg-sidebarSubMenuBg link2`}
                            onClick={showSubMenu} ref={trigger}
                        >
                            <extendedSubMenuData.icon size={23}  className={`min-w-max`} />
                            <p className="flex-1 capitalize">{extendedSubMenuData?.name}</p>
                                <IoIosArrowDown
                                className={`${ subMenuOpen ? "rotate-30" :"-rotate-90"} duration-200 `}
                                />
                        </li>
                        {
                            subMenuOpen && (
                                <motion.ul
                                animate={
                                    (tabClicked === extendedSubMenuData?.name) ||pathname.includes(extendedSubMenuData?.name)
                                    ? {
                                        height: "fit-content",
                                        }
                                    : {
                                        height: 0,
                                        }
                                }
                                className={`flex h-0 flex-col pl-12 text-[0.8rem] font-normal overflow-hidden w-[15rem] relative -top-2 rounded-br-md ${(tabClicked === extendedSubMenuData?.name ||pathname.includes(extendedSubMenuData?.name)) && "bg-sidebarSubMenuBg"}` }
                                >
                                <div className={`bg-gray-700 left-3 h-full absolute w-[0.9px] mx-3.5 border-1 ${(tabClicked === extendedSubMenuData?.name ||pathname.includes(extendedSubMenuData?.name)) ? 'block': 'hidden'}`}></div>
                                {extendedSubMenuData.menus?.map((menu) => (
                                    <li key={menu.name}
                                    >
                                    <NavLink
                                        onClick={close}
                                        to={`/${extendedSubMenuData?.name}${menu.route}`}
                                        className="link !bg-transparent capitalize relative hover:text-white hover:cursor-pointer"
                                    >
                                        {
                                            pathname.includes(menu.route) && (
                                            <span className="w-2 h-2 rounded-full bg-btnColor absolute -left-[1.6rem] duration-200 transition-all"></span>
                                            )
                                        }
                                        {menu.name}
                                    </NavLink>
                                    </li>
                                ))}
                                </motion.ul>
                            )
                        }
                    </>
                )
            }
            </>
        )
    }
    </>
  );
};

export default SubMenuExtended;
