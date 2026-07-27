/* eslint-disable react/prop-types */
// import React from 'react'

import { organogramHistory } from "./data"

const OrganogramCards = ({selectedCard, setSelectedCard}) => {

 const selectTab = (value) => {
  setSelectedCard(value)
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 my-8">
      {organogramHistory.map((organogram,i)=>(
  <div
              key={i}
               className={`${organogram.type==selectedCard?'bg-slate-50':'bg-white'} py-4 cursor-pointer shadow-sm -top border border-[#dfe2e6] flex rounded-t-[0.5rem] items-center justify-between px-4 gap-3`}
              style={{
                boxShadow: "0 3px 3px -2px rgba(39,44,51,.1), 0 3px 4px 0 rgba(39,44,51,.04), 0 1px 8px 0 rgba(39,44,51,.02)"
              }}
              onClick={() => selectTab(organogram?.type)}
            >
              <div className="flex gap-2 items-center">
                <div
                  className={`rounded-full ${organogram?.b_color} w-[50px] h-[50px] flex justify-center items-center`}
                >
                  <organogram.icon
                    size={25}
                    className={`!font-bold ${organogram.t_color}`}
                  />
                </div>
                <span className="text-[13px] text-[rgb(39, 44, 51)] font-[500] leading-[19.5px]">
                 {organogram.type}
                </span>
              </div>
              <span className="text-[16px] leading-[19.5px] text-[rgba(39, 44, 51, 0.5)] font-[400] font-Roboto">
                  {organogram?.no_of_trees}
                </span>
            </div>
      ))}
      </div>
  )
}

export default OrganogramCards