import { Fragment } from "react";
import { IoIosArrowForward } from "react-icons/io";

const Header = () => {
  return (
    <Fragment>
      <section>
        <div>
          <div>
            <h2 className="font-helvetica font-bold text-xl md:text-3xl">
              Records
            </h2>
            <div>
              <span className="text-gray-400 uppercase text-xs flex items-center gap-1 font-helvetica">
                Hr Operations <IoIosArrowForward className="text-md" /> Records
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 my-4">
            <h1 className="font-helvetica">History</h1>
            <hr className="w-full" />
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Header;
