/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import StarLoader from "../../../components/core/loaders/StarLoader";

export default function OverviewCaTopCards({
  requestHistory,
  selectTab,
  requestId,
  requestNo,
  loading
}) {
  return (
    <>
      <div className="grid grid-cols-1 bottom-0 sm:grid-cols-2 md:grid-cols-3 gap-4 my-4">
        {requestHistory?.map((request) => (
          <div
            key={request?.id}
            className={`${
              request.id == requestId ? "bg-slate-100" : "bg-white"
            } py-4 cursor-pointer shadow-sm -top border border-[#dfe2e6] flex rounded-t-[0.5rem] items-center justify-between px-4 gap-3`}
            style={{
              boxShadow:
                "0 3px 3px -2px rgba(39,44,51,.1), 0 3px 4px 0 rgba(39,44,51,.04), 0 1px 8px 0 rgba(39,44,51,.02)",
            }}
            onClick={() => selectTab(request?.id)}
          >
            <div className="flex gap-2 items-center">
              <div
                className={`rounded-full ${request?.b_color} w-[50px] h-[50px] flex justify-center items-center`}
              >
                <request.icon
                  size={25}
                  className={`!font-bold ${request?.t_color}`}
                />
              </div>
              <span className="text-[15px] text-[rgb(39, 44, 51)] font-[400] leading-[19.5px] font-helvetica ">
                {request.label}
              </span>
            </div>
            <span className="text-[14px] leading-[19.5px] text-[rgba(39, 44, 51, 0.5)] font-[400] font-Roboto">
              {/* {requestNo(request?.id)?.length} */}
              {
              loading?.[request?.id] ? (
                 <StarLoader size={20}/>
              ): (
                requestNo && requestNo(request?.id)?.length
              )
            }
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
