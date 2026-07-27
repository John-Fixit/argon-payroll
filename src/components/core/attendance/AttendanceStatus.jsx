/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import StarLoader from "../loaders/StarLoader";

const AttendanceStatusCards = ({ statuses, data, loading }) => {
  // console.log(requestHistory)
  return (
    <div className="grid grid-cols-1 bottom-0 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4 mb-10">
      {statuses.map((status, i) => (
        <div
          key={i}
          className={`bg-white py-4 cursor-pointer shadow-sm -top border border-[#dfe2e6] flex rounded-t-[0.5rem] items-center justify-between px-4 gap-3`}
          style={{
            boxShadow:
              "0 3px 3px -2px rgba(39,44,51,.1), 0 3px 4px 0 rgba(39,44,51,.04), 0 1px 8px 0 rgba(39,44,51,.02)",
          }}
        >
          <div className="flex gap-2 items-center">
            <div
              className={`rounded-full ${status?.b_color} w-[50px] h-[50px] flex justify-center items-center`}
            >
              <status.icon
                size={25}
                className={`!font-bold ${status?.t_color}`}
              />
            </div>
            <span className="text-[15px] text-[rgb(39, 44, 51)] font-[400] leading-[19.5px] font-helvetica">
              {status.label}
            </span>
          </div>
          <span className="text-[14px] leading-[19.5px] text-[rgba(39, 44, 51, 0.5)] font-[400] font-Roboto">
            {loading ? <StarLoader size={20} /> : data ? data[i]?.value : ""}
          </span>
        </div>
      ))}
    </div>
  );
};

export default AttendanceStatusCards;
