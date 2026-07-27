/* eslint-disable react/prop-types */
import { useEffect, useRef} from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';

const DropDown = ({uiItems, setShowDropDown, showDropDown}) => {
const dropdown = useRef(null);
// close on click outside or on sub link clicked
    useEffect(() => {
    const clickHandler = ({ target }) => {
          if (!dropdown.current) return;
          if (
          !dropdown.current.contains(target) 
          )
          return;
          setShowDropDown(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
    });
  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!showDropDown || keyCode !== 27) return;
      setShowDropDown(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className="relative ">
      {
        showDropDown && (
          <div
            ref={dropdown}
            onFocus={() => setShowDropDown(true)}
            onBlur={() => setShowDropDown(false)}
            className={`fixed top-2/4 ml-8 z-[555]  flex w-60 flex-col rounded-3xl border dark:border-transparent bg-white dark:text-gray-100 dark:bg-slate-900 shadow-default  ${
              showDropDown === true ? 'block' : 'hidden'
            }`}
          >
            <ul className="flex flex-col dark:border-gray-500">
              {
                uiItems?.menus?.map(menu=> (
                  <li key={menu} className=' group py-1 flex items-center px-5 w-full hover:bg-gray-100 hover:text-black hover:rounded-3xl duration-200 ease-in-out' >
                     <NavLink
                        to={`/${uiItems?.name}/${menu}`}
                        className="link !bg-transparent capitalize w-full"
                        >
                          <HiDotsHorizontal className='group-hover:rotate-90 duration-75 ease-in-out'/>
                        {menu}
                    </NavLink>
                  </li>

                ))
              }
            </ul>
          </div>
        )
      }
    </div>
  )
}

export default DropDown
