/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from "react";
import {
  IoIosArrowForward,
  IoMdAddCircle,
  IoMdArrowDropdown,
  IoMdHelpCircle,
} from "react-icons/io";
import PropTypes from "prop-types";

const Header = ({ setIsOpen,templateChosen, setTemplateChosen }) => {
const [template, setTemplate] = useState('My Templates')
 const handleChooseClick = () => {
    setTemplateChosen(!templateChosen);
  };

const changeChoice=(choice)=>{
setTemplate(choice)
    setTemplateChosen(false);
}

  return (
    <Fragment>
      <section>
        <div className="flex justify-between items-center gap-4">
                   <div className="relative font-normal">
                <div
                  className="inline-flex items-center overflow-hidden rounded-md border px-2 py-1 gap-1 cursor-pointer"
                  onClick={handleChooseClick}
                >
                 <p>{template}</p>
                 <IoMdArrowDropdown />
                </div>

                <div
                  className={`absolute w-[8rem] divide-y py-2 divide-gray-100 rounded-md border-gray-100 bg-white shadow-md animate-fade-down animate-once animate-duration-300  z-[999] ${
                    !templateChosen && "hidden"
                  }`}
                  role="menu"
                >
                  <ul className='px-2 leading-8'>
                  <li><button onClick={()=>changeChoice('My Templates')}>My Templates</button></li>
                  <li><button onClick={()=>changeChoice('All Templates')}>All Templates</button></li>
                  </ul>
                </div>
              </div>
          <div className="flex items-center gap-4">
               <button className="bg-[#00BCC2] hover:bg-[#00979C] transition-all text-xs rounded-[4px] text-white font-medium px-4 py-2 font-helvetica flex items-center gap-1 shadow-md" onClick={()=>setIsOpen(true)}>
    <IoMdAddCircle size={18} />
              New template
              </button>
            <button className="bg-[#00BCC2] hover:bg-[#00979C] transition-all text-xs rounded-[4px] text-white font-medium px-4 py-2 font-helvetica flex items-center gap-1 shadow-md">
              Import kpi templates
            </button>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Header;

Header.propTypes = {
  setIsOpen: PropTypes.func,
  templateChosen:PropTypes.bool, 
  setTemplateChosen:PropTypes.func
};
