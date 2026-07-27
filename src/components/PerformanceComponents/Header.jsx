/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { Fragment } from "react";
import {
  IoIosArrowForward,
  IoMdAddCircle,
  IoMdHelpCircle,
} from "react-icons/io";
import PropTypes from "prop-types";

const Header = ({ handleCreateAppraise, period }) => {
  return (
    <Fragment>
      <section>
        <div className="sm:flex justify-between items-center gap-4">
          <div className="mb-4 sm:mb-0">
            <h2 className="font-helvetica font-bold text-2xl sm:text-3xl">
              Performance
            </h2>
            <div>
              <span className="text-gray-400 uppercase text-xs flex items-center gap-1 font-helvetica">
                Self service <IoIosArrowForward className="text-md" />{" "}
                Performance
              </span>
            </div>
          </div>
          {period?.is_active ? (
            <div className="flex items-center gap-4">
              <button
                className="bg-[#00BCC2] hover:bg-[#00979C] transition-all text-xs rounded-[4px] text-white font-medium px-4 py-2 font-helvetica flex items-center gap-1 shadow-md"
                onClick={handleCreateAppraise}
              >
                New Appraisal
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </section>
    </Fragment>
  );
};

export default Header;

Header.propTypes = {
  setIsOpen: PropTypes.func,
  period: PropTypes.object,
  handleCreateAppraise: PropTypes.func,
};
