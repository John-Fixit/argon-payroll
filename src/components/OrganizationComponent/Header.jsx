import PropTypes from 'prop-types'
import { Fragment} from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Button } from '@nextui-org/react';
// import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";

export default function Header({create}) {
  return (
    <Fragment>
      <section>
        <div className="flex justify-between items-center">
              <div>
                <h2 className="font-helvetica font-bold text-3xl">
                  Organogram
                </h2>
                <div >
                  <span className="text-gray-400 uppercase text-xs flex items-center gap-1 font-helvetica">People <IoIosArrowForward className="text-md" /> HRIS</span>
                </div>
              </div>
                 <Button className="bg-[#00BCC2] hover:bg-[#00979C] transition-all text-xs rounded-[4px] text-white font-medium px-4 py-2 font-helvetica shadow" onClick={create}>
              Create Organogram
              </Button>
              
        </div>
      </section>
    </Fragment>
  );
}

Header.propTypes={
create:PropTypes.func
}
