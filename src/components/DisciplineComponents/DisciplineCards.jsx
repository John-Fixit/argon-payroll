// import React from 'react'

import { dsciplineOverview } from "./data"

const DisciplineCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-4">
      {dsciplineOverview.map((discipline,i)=>(
  <div
              key={i}
              className="py-4 cursor-pointer shadow-sm -top border border-[#dfe2e6] bg-white flex rounded-t-[0.5rem] items-center justify-between px-4 gap-3"
              style={{
                boxShadow: "0 3px 3px -2px rgba(39,44,51,.1), 0 3px 4px 0 rgba(39,44,51,.04), 0 1px 8px 0 rgba(39,44,51,.02)"
              }}
            >
              <div className="flex gap-2 items-center">
                <div
                  className={`rounded-full ${discipline?.b_color} w-[50px] h-[50px] flex justify-center items-center`}
                >
                  <discipline.icon
                    size={25}
                    className={`!font-bold ${discipline.t_color}`}
                  />
                </div>
                <span className="text-[13px] text-[rgb(39, 44, 51)] font-[500] leading-[19.5px]">
                 {discipline.title}
                </span>
              </div>
              <span className="text-[16px] leading-[19.5px] text-[rgba(39, 44, 51, 0.5)] font-[400] font-Roboto">
                  {discipline.no_of_people}
                </span>
            </div>
      ))}
      </div>
  )
}

export default DisciplineCards