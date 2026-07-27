// import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';
import { Fragment,} from "react";
import { IoIosArrowForward, } from "react-icons/io";
// import './leave.css'
// import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";

export default function Header() {
  return (
    <Fragment>
      <section>
        <div>
              <div>
                <h2 className="font-helvetica font-bold text-xl md:text-3xl">
                 Hr Operations
                </h2>
                <div >
                  <span className="text-gray-400 uppercase text-xs flex items-center gap-1 font-helvetica">Hr Operations <IoIosArrowForward className="text-md" /> Hr Operations</span>
                </div>
              </div>    
        </div>
      </section>
    </Fragment>
  );
}
