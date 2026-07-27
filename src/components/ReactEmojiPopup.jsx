
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';

const ReactEmojiPopup = ({bottom,}) => {
    
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

//   const availableRoles = [ "Software Engineer", "Software Tester", "Frontend Developer", "UI/UX Developer"]

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
      {/* <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="p-1 flex items-center rounded-lg cursor-pointer"
        to="#"
      >


       
      </Link> */}

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute  -right-10 mt-2.5 -top-7 min-h-fit flex-col z-[555] min-w-fit
        rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0
        block ${bottom && 'right-20 -top-4'}` }
      >

        <div className="flex gap-x-5 items-center  h-full ">
          <div className="flex gap-x-4  text-2xl p-3">
            <span className=" cursor-pointer  rounded p1 animateReaction ">👍</span>
            <span className=" cursor-pointer  rounded p1 animateReaction ">😀</span>
            <span className=" cursor-pointer  rounded p1 animateReaction ">🥰</span>
            <span className=" cursor-pointer  rounded p1 animateReaction ">😥</span> <span className=" cursor-pointer  rounded p1 animateReaction ">😳</span> </div>
        </div>
        {/* <ul className="flex h-auto flex-col overflow-y-auto py-2 gap-y-1">
                <li className='flex gap-4 hover:cursor-pointer w-full hover:bg-gray-100 px-3 py-1'>
                Software Engineer
            </li>
        </ul> */}
      </div>
    </div>
  );
};

export default ReactEmojiPopup;

