import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import UserOne from '../../assets/images/avatar2.jpg';

import { FaRegEnvelope } from "react-icons/fa6";

const DropdownMessage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className="relative dark:text-gray-700 z-[9999955]" >
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="p-1 flex items-center rounded-lg cursor-pointer"
        to="#"
      >
       {/* <BsChatDots */}
       <FaRegEnvelope
       color='grey'
                     size={22} className='font-medium text-gray-200'/>
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute md:-right-25 right-0 mt-2.5 flex h-96 flex-col 
        w-[19rem] z-[555]
        rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80 px-3 ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        <div className="px-4 py-3">
          <h5 className="text-sm font-medium ">Messages</h5>
        </div>

        <ul className="flex h-auto flex-col overflow-y-auto">
          <li>
            <Link
              className="flex gap-4 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              to="/messages"
            >
              <div className="h-12.5 w-12.5 rounded-full">
                <img src={UserOne} alt="User" className='rounded-lg' />
              </div>

              <div>
                <h6 className="text-sm font-medium text-black">
                  Mariya Desoja
                </h6>
                <p className="text-sm">I like your confidence 💪</p>
                <p className="text-xs">2min ago</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-4 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              to="/messages"
            >
              <div className="h-12.5 w-12.5 rounded-full">
                <img src={UserOne} alt="User"  className='rounded-lg'/>
              </div>

              <div>
                <h6 className="text-sm font-medium text-black dark:text-white">
                  Robert Jhon
                </h6>
                <p className="text-sm">Can you share your offer?</p>
                <p className="text-xs">10min ago</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-4 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              to="/messages"
            >
              <div className="h-12.5 w-12.5 rounded-full">
                <img src={UserOne} alt="User" className='rounded-lg' />
              </div>

              <div>
                <h6 className="text-sm font-medium text-black ">
                  Henry Dholi
                </h6>
                <p className="text-sm">I cam across your profile and...</p>
                <p className="text-xs">1day ago</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-4 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              to="/messages"
            >
              <div className="h-12.5 w-12.5 rounded-full">
                <img src={UserOne} alt="User" className='rounded-lg' />
              </div>

              <div>
                <h6 className="text-sm font-medium text-black ">
                  Cody Fisher
                </h6>
                <p className="text-sm">I’m waiting for you response!</p>
                <p className="text-xs">5days ago</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-4 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              to="/messages"
            >
              <div className="h-12.5 w-12.5 rounded-full">
                <img src={UserOne} alt="User"  className='rounded-lg'/>
              </div>

              <div>
                <h6 className="text-sm font-medium text-black ">
                  Mariya Desoja
                </h6>
                <p className="text-sm">I like your confidence 💪</p>
                <p className="text-xs">2min ago</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-4 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              to="/messages"
            >
              <div className="h-12.5 w-12.5 rounded-full">
                <img src={UserOne} alt="User" className='rounded-lg' />
              </div>

              <div>
                <h6 className="text-sm font-medium text-black ">
                  Cody Fisher
                </h6>
                <p className="text-sm">I’m waiting for you response!</p>
                <p className="text-xs">5days ago</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-4 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              to="/messages"
            >
              <div className="h-12.5 w-12.5 rounded-full">
                <img src={UserOne} alt="User"  className='rounded-lg'/>
              </div>

              <div>
                <h6 className="text-sm font-medium text-black ">
                  Mariya Desoja
                </h6>
                <p className="text-sm">I like your confidence 💪</p>
                <p className="text-xs">2min ago</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-4 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              to="/messages"
            >
              <div className="h-12.5 w-12.5 rounded-full">
                <img src={UserOne} alt="User" className='rounded-lg' />
              </div>

              <div>
                <h6 className="text-sm font-medium text-black ">
                  Cody Fisher
                </h6>
                <p className="text-sm">I’m waiting for you response!</p>
                <p className="text-xs">5days ago</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-4 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              to="/messages"
            >
              <div className="h-12.5 w-12.5 rounded-full">
                <img src={UserOne} alt="User"  className='rounded-lg'/>
              </div>

              <div>
                <h6 className="text-sm font-medium text-black ">
                  Mariya Desoja
                </h6>
                <p className="text-sm">I like your confidence 💪</p>
                <p className="text-xs">2min ago</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-4 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              to="/messages"
            >
              <div className="h-12.5 w-12.5 rounded-full">
                <img src={UserOne} alt="User" className='rounded-lg' />
              </div>

              <div>
                <h6 className="text-sm font-medium text-black ">
                  Cody Fisher
                </h6>
                <p className="text-sm">I’m waiting for you response!</p>
                <p className="text-xs">5days ago</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-4 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              to="/messages"
            >
              <div className="h-12.5 w-12.5 rounded-full">
                <img src={UserOne} alt="User"  className='rounded-lg'/>
              </div>

              <div>
                <h6 className="text-sm font-medium text-black ">
                  Mariya Desoja
                </h6>
                <p className="text-sm">I like your confidence 💪</p>
                <p className="text-xs">2min ago</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-4 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              to="/messages"
            >
              <div className="h-12.5 w-12.5 rounded-full">
                <img src={UserOne} alt="User" className='rounded-lg' />
              </div>

              <div>
                <h6 className="text-sm font-medium text-black ">
                  Cody Fisher
                </h6>
                <p className="text-sm">I’m waiting for you response!</p>
                <p className="text-xs">5days ago</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-4 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              to="/messages"
            >
              <div className="h-12.5 w-12.5 rounded-full">
                <img src={UserOne} alt="User"  className='rounded-lg'/>
              </div>

              <div>
                <h6 className="text-sm font-medium text-black ">
                  Mariya Desoja
                </h6>
                <p className="text-sm">I like your confidence 💪</p>
                <p className="text-xs">2min ago</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-4 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              to="/messages"
            >
              <div className="h-12.5 w-12.5 rounded-full">
                <img src={UserOne} alt="User" className='rounded-lg' />
              </div>

              <div>
                <h6 className="text-sm font-medium text-black ">
                  Cody Fisher
                </h6>
                <p className="text-sm">I’m waiting for you response!</p>
                <p className="text-xs">5days ago</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-4 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              to="/messages"
            >
              <div className="h-12.5 w-12.5 rounded-full">
                <img src={UserOne} alt="User"  className='rounded-lg'/>
              </div>

              <div>
                <h6 className="text-sm font-medium text-black ">
                  Mariya Desoja
                </h6>
                <p className="text-sm">I like your confidence 💪</p>
                <p className="text-xs">2min ago</p>
              </div>
            </Link>
          </li>
        </ul>
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownMessage;
