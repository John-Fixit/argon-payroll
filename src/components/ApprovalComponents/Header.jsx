// import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';
import PropTypes from 'prop-types'
import { Fragment} from "react";
import { FiSearch } from 'react-icons/fi';
import { IoIosArrowForward, IoMdArrowDropdown, } from "react-icons/io";
// import './leave.css'
// import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";

export default function Header({handleActionClick,handleFilterClick,actionOpened,filterOpened}) {

  return (
    <Fragment>
      <section>
        <div className="md:flex justify-between items-center gap-4">
              <div className="mb-4 md:mb-0">
                <h2 className="font-helvetica font-bold text-xl md:text-3xl">
                  My Approvals
                </h2>
                <div >
                  <span className="text-gray-400 uppercase text-xs flex items-center gap-1 font-helvetica">Self service <IoIosArrowForward className="text-md" /> Approval</span>
                </div>
              </div>
<div className='flex items-center gap-4'>
              {/* search */}
                <div className="relative font-normal">
          <input
            type="text"
            name=""
            id="regular"
            className="w-full py-2 ps-2 pe-6 text-sm outline-none rounded border"
            placeholder="Search"
          />
          <FiSearch  className="lucide lucide-search font-bold  text-sidebarInptextColor absolute top-[14px] right-2" />
        </div>

              {/* filter */}
                <div className="relative font-normal">
                <div
                  className="inline-flex items-center overflow-hidden rounded-md border px-2 py-1 gap-1 cursor-pointer"
                  onClick={handleFilterClick}
                >
                 <p>Filter</p>
                 <IoMdArrowDropdown />
                </div>

                <div
                  className={`absolute w-[8rem] divide-y py-2 divide-gray-100 rounded-md border-gray-100 bg-white shadow-md animate-fade-down animate-once animate-duration-300 right-2 z-[999] ${
                    !filterOpened && "hidden"
                  }`}
                  role="menu"
                >
                  <ul className='px-2 leading-8'>
                  <li><button>All Requests</button></li>
                  <li><button>My Requests</button></li>
                  </ul>
                </div>
              </div>

              {/* action */}
                <div className="relative font-normal">
                <div
                  className="inline-flex items-center overflow-hidden rounded-md border px-2 py-1 gap-1 cursor-pointer"
                  onClick={handleActionClick}
                >
                 <p>Bulk Actions</p>
                 <IoMdArrowDropdown />
                </div>

                <div
                  className={`absolute w-[8rem] divide-y py-2 divide-gray-100 rounded-md border-gray-100 bg-white shadow-md animate-fade-down animate-once animate-duration-300 right-2 z-[999] ${
                    !actionOpened && "hidden"
                  }`}
                  role="menu"
                >
                  <ul className='px-2 leading-8'>
                  <li>Transfer Request</li>
                  </ul>
                </div>
              </div>
              {/* end */}
</div>
       
              
        </div>
      </section>
    </Fragment>
  );
}

Header.propTypes={
handleActionClick:PropTypes.func,
handleFilterClick:PropTypes.func,
actionOpened:PropTypes.bool,
filterOpened:PropTypes.bool,
}