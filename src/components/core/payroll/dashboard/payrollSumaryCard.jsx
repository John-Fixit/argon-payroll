import { FaUsers } from "react-icons/fa6";
import { FaMoneyBillWave } from "react-icons/fa";
import { TiCalculator } from "react-icons/ti";
import { MdOutlineRequestPage } from "react-icons/md";
/* eslint-disable react/prop-types */
const PayrollSummaryCard = ({
  requestHistory,
  selectTab,
  requestStatus,
  requestNo,
  externalAction,
  action,
  loading,
}) => {
  const summaryList = [
    {
      label: "Total Employees",
      count: 256,
      icon: FaUsers,
      b_color: "bg-green-100/60",
      t_color: "text-green-700",
    },
    {
      label: "Average Salary",
      count: "N3, 256",
      icon: FaMoneyBillWave,
      b_color: "bg-red-100/60",
      t_color: "text-red-500",
    },
    {
      label: "Total Outstanding",
      count: "N89, 235",
      icon: TiCalculator,
      b_color: "bg-blue-100/60",
      t_color: "text-blue-500",
    },
    {
      label: "Total Request",
      count: 35,
      icon: MdOutlineRequestPage,
      b_color: "bg-amber-100/60",
      t_color: "text-amber-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 bottom-0 md:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
      {summaryList.map((request, i) => (
        <div
          key={i}
          // ${
          //   request.id === "" ? "bg-slate-100" : "bg-white"
          // }
          className={`${request?.b_color} py-4 shadow-sm -top rounded-[0.5rem] px-4 gap-3`}
          style={{
            boxShadow:
              "0 3px 3px -2px rgba(39,44,51,.1), 0 3px 4px 0 rgba(39,44,51,.04), 0 1px 8px 0 rgba(39,44,51,.02)",
          }}
          // onClick={() => (externalAction ? action() : selectTab(request?.id))}
        >
          <div className="flex gap-3 items-center mb-3">
            <div
              className={`rounded-full bg-white w-[50px] h-[50px] flex justify-center items-center`}
            >
              <request.icon
                size={25}
                className={`!font-bold ${request?.t_color}`}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[20px] leading-[19.5px] text-[rgba(39, 44, 51, 0.5)] font-[600] font-helvetica">
                {request?.count}

                {/* {loading?.[request?.id] ? (
              <StarLoader size={20} />
              ) : (
                (requestNo && requestNo(request?.id)?.length) || 0
              )} */}
              </span>
              <span className="text-[0.8rem] text-[rgb(39, 44, 51)] font-[400] leading-[19.5px] font-helvetica opacity-60">
                {request.label}
              </span>
            </div>
          </div>
          <hr className="border-white" />
          <p>
            <small className="font-helvetica opacity-50 text-xs">
              +3.4% last month
            </small>
          </p>
        </div>
      ))}
    </div>
  );
};

export default PayrollSummaryCard;
