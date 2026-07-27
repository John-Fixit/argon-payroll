import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';



import { HiBriefcase } from 'react-icons/hi';


const  DropdownCompany = () => {
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
    <div className="relative dark:text-gray-700 z-[955]" >
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="p-1 flex items-center rounded-lg cursor-pointer"
        to="#"
      >
       {/* <BsChatDots */}
       <HiBriefcase
       color='grey'
                     size={22} className='font-medium text-gray-200'/>
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute md:-right-25 right-0 mt-2.5 top-10 flex h-fit flex-col 
        w-[19rem] z-[555]
        rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80 px-3 ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        <div className="px-4 py-3">
          <h5 className="text-sm font-medium ">Select company</h5>
        </div>

        <ul className="flex h-auto flex-col overflow-y-auto">
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
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownCompany;
