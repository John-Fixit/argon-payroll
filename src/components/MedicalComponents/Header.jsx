/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react'
import { IoIosArrowForward, IoMdAddCircle, IoMdHelpCircle } from 'react-icons/io'
import PropTypes from 'prop-types'

const Header = ({setIsOpen}) => {
  return (
     <Fragment>
      <section>
        <div className="flex justify-between items-center gap-4">
              <div className="">
                <h2 className="font-helvetica font-bold text-2xl md:text-3xl">
                  Medical
                </h2>
                <div >
                  <span className="text-gray-400 uppercase text-xs flex items-center gap-1 font-helvetica">Self service <IoIosArrowForward className="text-md" /> Medical</span>
                </div>
              </div>
<div className='flex items-center gap-4'>
    <button className="bg-[#00BCC2] hover:bg-[#00979C] transition-all text-xs rounded-[4px] text-white font-medium px-4 py-2 font-helvetica flex items-center gap-1 shadow-md">
    <IoMdHelpCircle size={18} />
              HELP
              </button>
    <button className="bg-[#00BCC2] hover:bg-[#00979C] transition-all text-xs rounded-[4px] text-white font-medium px-4 py-2 font-helvetica flex items-center gap-1 shadow-md" onClick={()=>setIsOpen(true)}>
    <IoMdAddCircle size={18} />
              ADD
              </button>
</div>
       
              
        </div>
      </section>
    </Fragment>
  )
}

export default Header

Header.propTypes={
setIsOpen:PropTypes.func
}