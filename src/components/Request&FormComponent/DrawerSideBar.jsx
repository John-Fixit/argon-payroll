/* eslint-disable no-unused-vars */

// import React from 'react'
import PropTypes from 'prop-types'

import './request.css'
import { Button } from '@nextui-org/react'


const DrawerSideBar = ({tabs, setSelectedTab, selectedTab,handleSubmit,submitButtonNeeded,}) => {
  return (
  <>
    {/* <div
        className="h-[3rem] md:h-full w-full md:w-[16rem] hide-scrollbar bg-[#303840] overflow-x-scroll md:overflow-x-hidden" 
      >

       <ul className="leading-10 px-4 md:my-8 flex justify-between md:flex-col">
       {tabs.map((tab, index) => (
              <li
                key={index}
                onClick={() => setSelectedTab(index)}
                className={`${
                  selectedTab === index
                    ? ' text-gray-200 text-[16px]'
                    : 'text-gray-500 text-[15px]'
                }  font-medium transition-all text-md cursor-pointer hover:text-gray-400 hover:text-[16px] font-Lato relative flex justify-between items-center`}
              >
               {selectedTab === index && <span className="w-2 h-2 rounded-full absolute top-4 bg-btnColor duration-200 transition-all"></span>}
               <span className='ps-5'>{tab.title}</span>
          <span className='text-xs bg-btnColor text-white font-medium px-1 rounded-full'>{tab.title==handOverNotification?.name && handOverNotification?.notification_count>0 && handOverNotification?.notification_count}</span>
              <span className='text-xs bg-btnColor text-white font-medium px-1 rounded-full'>{tab.title==approvalNotification?.name && approvalNotification?.notification_count>0 && approvalNotification?.notification_count}</span>
              </li>
            ))}
      </ul>
     </div> */}

        <div className="flex flex-col border-l text-sm gap-3 px-4 ms-8 py-4 md:ms-2 my-4 md:my-0 md:w-1/4 md:h-auto">
              {tabs?.map((tab, index) => (
                <div
                  key={index}
                onClick={() => setSelectedTab(index)}
                  className={`${
                   selectedTab === index &&
                    "font-medium text-[#00BCC2]"
                  } relative cursor-pointer font-helvetica`}
                >
                  {tab?.title}
                  <span
                    className={`w-3 h-3 rounded-full  ${
                     selectedTab === index
                        ? "bg-[#00BCC2]"
                        : "bg-gray-300"
                    }  border-2 border-white absolute -left-[22px] top-1 duration-200 transition-all`}
                  ></span>
                </div>
              ))}
              {/* <Button color='secondary' className={`rounded-md font-medium shadow font-helvetica uppercase ${ !submitButtonNeeded && 'hidden'}`}  onClick={handleSubmit}>Submit</Button> */}
            </div>
  </>
  )
}

export default DrawerSideBar

DrawerSideBar.propTypes={
tabs:PropTypes.array,
approvalNotification:PropTypes.object,
handOverNotification:PropTypes.object,
handleSubmit: PropTypes.func,
submitButtonNeeded: PropTypes.bool,
selectedTab:PropTypes.number, 
setSelectedTab: PropTypes.func,
}