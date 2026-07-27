import PropTypes from 'prop-types'
import { Fragment} from "react";
import { IoIosArrowForward } from "react-icons/io";

export default function Header({createSanction}) {
  return (
    <Fragment>
      <section>
        <div className="flex justify-between items-center">
              <div className="text-center">
                <h2 className="font-helvetica font-bold text-3xl">
                  Discipline
                </h2>
                <div >
                  <span className="text-gray-400 uppercase text-xs flex items-center gap-1 font-helvetica">hr <IoIosArrowForward className="text-md" /> Discipline</span>
                </div>
              </div>
                 <button className="bg-[#00BCC2] hover:bg-[#00979C] transition-all text-xs rounded-[4px] text-white font-medium px-4 py-2 font-helvetica" onClick={createSanction}>
              Create Sanction
              </button>
              
        </div>
      </section>
    </Fragment>
  );
}

Header.propTypes={
createSanction:PropTypes.func
}
