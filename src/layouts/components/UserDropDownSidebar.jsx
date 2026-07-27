import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import UserOne from "../../assets/images/avatar2.jpg";
import { MdKeyboardArrowDown } from "react-icons/md";
import { dashboardContext } from "../../context/Dashboard";

const UserDropDownSidebar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {sidebarMinimized, setShowminimizedsubMenu, setExtendedSubMenuData} = useContext(dashboardContext)

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const showSubMenu = ()=>{
    if(sidebarMinimized){
      setShowminimizedsubMenu(true)
      setExtendedSubMenuData({name: 'user sub profile'})
    }
    // toggleTab(data.name)
  }

  return (
    <div className="relative w-full bg-white rounded-full ">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen( sidebarMinimized ? showSubMenu : !dropdownOpen)}
        className={`flex items-center justify-between px-4 hover:no-underline text-inherit ${sidebarMinimized ? "py-0" : 'py-1'}`}
        to="#"
      >
        <div className="flex-1 flex">
          <span className="h-10 w-10 rounded-full flex items-center">
            <img
              src={UserOne}
              alt="User"
              className="rounded-full w-[2rem] h-[2rem]"
            />
          </span>
          <div className={`block ${sidebarMinimized ? "hidden" : 'block'}`}>
            <span className="block text-sm ">Laza Bogdan</span>
            <span className="block text-xs text-gray-400">Administrator</span>
          </div>
        </div>
        <MdKeyboardArrowDown className="text-gray-400" />
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className="relative"
      >
        <div className={dropdownOpen === true ? "block" : "hidden"}>
          <svg
            className={`fill-current sm:block absolute  right-28 top-[0rem] z-50 rotate-180`}
            fill="#272C33"
            color="white"
            width="16"
            height="13"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 386.257 386.257"
          >
            <polygon points="0,96.879 193.129,289.379 386.257,96.879 " />
          </svg>
        </div>
        <div
          className={`absolute right-0 mt-[0.55rem] flex w-56 flex-col rounded border border-stroke dark:border-transparent z-[555] bg-white dark:text-gray-100 dark:bg-slate-900 text-xs shadow-default dark:border-strokedark dark:bg-boxdark ${
            dropdownOpen === true ? "block" : "hidden"
          }`}
        >
          <div className="px-4 pt-3">
            <h5 className="text-xs font-medium ">Account</h5>
          </div>
          <ul className="flex flex-col gap-2 border-b border-stroke px-4 py-3 dark:border-gray-500 text-gray-500 text-sm">
            <li className=" cursor-pointer hover:text-black"><div>Edit Account</div></li>
            <li className=" cursor-pointer hover:text-black"><div>Profile</div></li>
            <li className=" cursor-pointer hover:text-black"><div>Payments</div></li>
            <li className=" cursor-pointer hover:text-black"><div>Logout</div></li>
          </ul>
          <div className="px-4 pt-3">
            <h5 className="text-xs font-medium ">Select company</h5>
          </div>
          <ul className="flex flex-col  text-xs border-stroke px-3 dark:border-gray-500">
            <li>
              <Link
                className="flex gap-x-2  border-stroke px-1 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                to="/messages"
              >
                <div className="h-10 w-10 rounded-lg bg-blue-400 text-center flex items-center justify-center">
                  <span className="text-white font-semibold ">FM</span>
                </div>

                <div>
                  <h6 className="text-xs font-medium text-black">
                    FrontendMatter Inc.
                  </h6>
                  <p className="text-xs text-slate-400">Administrator</p>
                </div>
              </Link>
            </li>
            <li>
              <Link
                className="flex gap-4  border-stroke px-1 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                to="/messages"
              >
                 <div className="h-10 w-10 rounded-lg bg-btnColor text-center flex items-center justify-center">
                  <span className="text-white font-semibold ">HH</span>
                </div>

                <div>
                  <h6 className="text-sm font-medium text-black">
                    HumanHuma Inc.
                  </h6>
                  <p className="text-sm text-slate-400">Publisher</p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default UserDropDownSidebar;
