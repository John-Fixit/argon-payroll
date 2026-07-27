/* eslint-disable react/prop-types */
// import React from 'react'

import StarLoader from "../../../../components/core/loaders/StarLoader";

// import { leaveHistory } from "./data"

const LeaveCards = ({ leaveHistory, selectTab, leaveId, leaveNo, loading }) => {
  return (
    <div className="grid grid-cols-1 bottom-0 sm:grid-cols-2 md:grid-cols-4 gap-4 my-4">
      {leaveHistory.map((leave) => (
        <div
          key={leave?.id}
          className={`${
            leave.id == leaveId ? "bg-slate-100" : "bg-white"
          } py-4 cursor-pointer shadow-sm -top border border-[#dfe2e6] flex rounded-t-[0.5rem] items-center justify-between px-4 gap-3`}
          style={{
            boxShadow:
              "0 3px 3px -2px rgba(39,44,51,.1), 0 3px 4px 0 rgba(39,44,51,.04), 0 1px 8px 0 rgba(39,44,51,.02)",
          }}
          onClick={() => selectTab(leave?.id)}
        >
          <div className="flex gap-2 items-center">
            <div
              className={`rounded-full ${leave?.b_color} w-[50px] h-[50px] flex justify-center items-center`}
            >
              <leave.icon
                size={25}
                className={`!font-bold ${leave?.t_color}`}
              />
            </div>
            <span className="text-[15px] text-[rgb(39, 44, 51)] font-[400] leading-[19.5px]">
              {leave.label}
            </span>
          </div>
          <span className="text-[14px] leading-[19.5px] text-[rgba(39, 44, 51, 0.5)] font-[400] font-Roboto">
            {/* {leaveNo(leave?.id)?.length} */}
            {loading?.[leave?.id] ? (
              <StarLoader size={20} />
            ) : leaveNo ? (
              leaveNo(leave?.id)?.length
            ) : null}
          </span>
        </div>
      ))}
    </div>
  );
};

export default LeaveCards;
