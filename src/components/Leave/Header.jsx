import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import "./leave.css";
import { Button } from "@nextui-org/react";
import ApplyLeave from "../core/leave/ApplyLeave";
// import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const apply = () => {
    setIsOpen(true);
  };

  return (
    <Fragment>
      <section>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-helvetica font-bold text-3xl">Leave</h2>
            <div>
              <span className="text-gray-400 uppercase text-xs flex items-center gap-1 font-helvetica">
                Self service <IoIosArrowForward className="text-md" /> Leave
              </span>
            </div>
          </div>
          <Button
            className="bg-[#00BCC2] hover:bg-[#00979C] transition-all text-xs rounded-[4px] text-white font-medium px-4 py-2 font-helvetica shadow"
            onClick={apply}
          >
            APPLY
          </Button>
        </div>
      </section>
      <ApplyLeave setIsOpen={setIsOpen} isOpen={isOpen} />
    </Fragment>
  );
}

Header.propTypes = {
  setIsOpen: PropTypes.func,
  isOpen: PropTypes.bool,
};
