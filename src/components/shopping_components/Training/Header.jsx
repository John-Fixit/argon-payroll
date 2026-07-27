import { Button } from '@nextui-org/react';
import PropTypes from 'prop-types'
import { Fragment} from "react";
import { IoIosArrowForward, IoMdAddCircle } from "react-icons/io";
// import './leave.css'
// import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";

export default function Header({addNew}) {
  return (
    <Fragment>
      <section>
        <div className="flex justify-between items-center">
              <div className="text-center">
                <h2 className="font-helvetica font-bold text-3xl">
                  Training
                </h2>
                <div >
                  <span className="text-gray-400 uppercase text-xs flex items-center gap-1 font-helvetica">Orders <IoIosArrowForward className="text-md" /> Training</span>
                </div>
              </div>
                 <Button className="bg-[#00BCC2] hover:bg-[#00979C] transition-all text-xs rounded-[4px] text-white font-medium px-4 py-2 font-helvetica flex items-center gap-1 shadow" onClick={addNew}>
                 <IoMdAddCircle size={18} />
                 <span>
              Add New
                 </span>
              </Button>
              
        </div>
      </section>
    </Fragment>
  );
}

Header.propTypes={
addNew:PropTypes.func
}
