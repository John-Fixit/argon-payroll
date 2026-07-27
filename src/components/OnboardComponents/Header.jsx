import PropTypes from 'prop-types'
import { Fragment} from "react";
import { IoIosArrowForward } from "react-icons/io";
// import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";

export default function Header({apply}) {
  return (
    <Fragment>
      <section>
        <div className="flex justify-between items-center">
              <div className="text-center">
                <h2 className="font-helvetica font-bold text-3xl">
                  Onboarding 
                </h2>
                <div >
                  {/* <Breadcrumbs 
                itemClasses={{
                  item: "text-[rgba(39,44,51,.5)] data-[current=true]:text-[rgba(39,44,51,.35)]",
                  separator: "text-[rgba(39,44,51,.5)]",
                }}
                >
                <BreadcrumbItem className="breadcrumb">Self services</BreadcrumbItem>
                <BreadcrumbItem className="breadcrumb text-[rgba(39,44,51,.5)]">Leave</BreadcrumbItem>
              </Breadcrumbs> */}
                  <span className="text-gray-400 uppercase text-xs flex items-center gap-1 font-helvetica">HR <IoIosArrowForward className="text-md" /> Onboard Staff</span>
                </div>
              </div>
                 <button className="bg-[#00BCC2] hover:bg-[#00979C] transition-all text-xs rounded-[4px] text-white font-medium px-4 py-2 font-helvetica" onClick={apply}>
              New onboard
              </button>
              
        </div>
      </section>
    </Fragment>
  );
}

Header.propTypes={
apply:PropTypes.func
}
