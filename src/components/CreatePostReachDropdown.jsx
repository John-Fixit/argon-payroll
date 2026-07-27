
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';




import { IoIosArrowDown } from "react-icons/io";
import { LuUser, LuUsers2 } from 'react-icons/lu';
import { Globe } from 'lucide-react';


const CreatePostReachDropdown = ({bottom}) => {
    
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
    <div className="relative dark:text-gray-700 " >
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="p-1 flex items-center rounded-lg cursor-pointer"
        to="#"
      >
        
        <div className=' space-x-1 flex text-sm font-medium items-center dark:text-gray-400 text-main-text-color '>
            <span>Public</span>
        <IoIosArrowDown color='grey'
          size={15} className='font-medium text-main-text-color z-10'/>

        </div>
   
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute md:-right-25 right-0 mt-2.5 flex h-fit flex-col z-[555]
        w-[10rem]
        rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:-right-6 sm:w-[10rem]  ${
          dropdownOpen === true ? 'block' : 'hidden'
        } ${bottom && 'right-20 -top-4'}` }
      >
        <ul className="flex h-auto flex-col overflow-y-auto py-2  gap-y-1">
            <li className='flex gap-4 hover:cursor-pointer w-full hover:bg-gray-100 px-3 py-1 text-sm'>
                <Globe className='text-main-text-color' size={15}/> Public
            </li>
            <div className='border-[0.5px] w-[95%] self-center -mt-1'></div>
            <li className='flex gap-4 hover:cursor-pointer w-full hover:bg-gray-100 px-3 py-1 text-sm'>
                <LuUsers2/> Friends
            </li>
            <div className='border-[0.5px] w-[95%] self-center -mt-1'></div>
            <li className='flex gap-4 hover:cursor-pointer w-full hover:bg-gray-100 px-3 py-1 text-sm'>
                <LuUser/> Friends Except
            </li>
            <div className='border-[0.5px] w-[95%] self-center -mt-1'></div>
            <li className='flex gap-4 hover:cursor-pointer w-full hover:bg-gray-100 px-3 py-1 text-sm'>
                <LuUser/> Specific Friends
            </li>
            <div className='border-[0.5px] w-[95%] self-center -mt-1'></div>
            <li className='flex gap-4 hover:cursor-pointer w-full hover:bg-gray-100 px-3 py-1 text-sm'>
                <LuUser/> Only Me
            </li>
        </ul>
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default CreatePostReachDropdown;
