/* eslint-disable react/prop-types */
import React from 'react'

const TabCard = ({data, stepper, setstepper}) => {
  
  return (
   <>
   
 <div className="grid grid-cols-1 bottom-0 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
      {data?.map((item,i) => (
          <div
            key={i}
            className={`${item.id==stepper?'bg-slate-100':'bg-white'} py-4 cursor-pointer shadow-sm -top border border-[#dfe2e6] flex rounded-t-[0.5rem] items-center justify-between px-4 gap-3 z-0`}
            style={{
              boxShadow:
                "0 3px 3px -2px rgba(39,44,51,.1), 0 3px 4px 0 rgba(39,44,51,.04), 0 1px 8px 0 rgba(39,44,51,.02)",
            }}
            onClick={() => setstepper(item?.id)}
          >
            <div className="flex gap-2 items-center">
              <div
                className={`rounded-full ${item?.b_color} w-[50px] h-[50px] flex justify-center items-center`}
              >
                <item.icon
                  size={25}
                  className={`!font-bold ${item?.t_color}`}
                />
              </div>
              <span className="text-[15px] text-[rgb(39, 44, 51)] font-[400] leading-[19.5px] font-helvetica">
                {item.label}
              </span>
            </div>
            <span className="text-[14px] leading-[19.5px] text-[rgba(39, 44, 51, 0.5)] font-[400] font-Roboto">
              
            </span>
          </div>
        ))}
        </div>
   </>
  )
}

export default TabCard