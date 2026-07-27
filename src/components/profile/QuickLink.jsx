/* eslint-disable react/prop-types */

import { Tooltip } from "antd";
import { Aperture, Building, CreditCard } from "lucide-react";
import { MdApproval } from "react-icons/md";
import { PiAirTrafficControl, PiTreePalmThin } from "react-icons/pi";

const QuickLink = ({ clickedTab }) => {
  return (
    <div className="">
      <div className="bg-white rounded -z-10 w-full">
        <div className="py-0 text-sm">
          <div className="ml-6">
            <span className="text-[1rem] font-medium font-helvetica uppercase text-start text-gray-500">
              Quick Links
            </span>
          </div>

          <div className="grid grid-cols-3 bg-white gap-y-4 pt-2">
            <div
              className=" rounded-lg p-2 flex flex-col justify-center items-center  cursor-pointer bg-white opacity-90 text-gray-600"
              onClick={() => clickedTab("leave")}
            >
              <div className="rounded-full  bg-purple-300 w-[50px] h-[50px] flex justify-center items-center">
                <PiTreePalmThin
                  size={30}
                  className="!font-bold text-purple-600"
                />
              </div>
              <div className="text-center font-bold text-[13px] font-helvetica">
                Leave
              </div>
            </div>
            <div
              className=" rounded-lg p-2 flex flex-col justify-center items-center  cursor-pointer bg-white opacity-90 text-gray-600"
              onClick={() => clickedTab("request")}
            >
              <div className="rounded-full  bg-green-200 w-[50px] h-[50px] flex justify-center items-center">
                <Aperture size={30} className="!font-bold text-green-500 " />
              </div>
              <div className="text-center font-bold text-[13px] font-helvetica">
                Request
              </div>
            </div>
            <div
              className=" rounded-lg p-2 flex flex-col justify-center items-center  cursor-pointer bg-white opacity-90 text-gray-600"
              onClick={() => clickedTab("approvals")}
            >
              <div className="rounded-full  bg-teal-200 w-[50px] h-[50px] flex justify-center items-center">
                <MdApproval size={30} className="!font-bold text-teal-500 " />
              </div>
              <div className="text-center font-bold text-[13px] font-helvetica">
                Approval
              </div>
            </div>
            <div
              className=" rounded-lg p-2 flex flex-col justify-center items-center  cursor-pointer bg-white opacity-90 text-gray-600"
              onClick={() => clickedTab("attendance")}
            >
              <div className="rounded-full  bg-green-300 w-[50px] h-[50px] flex justify-center items-center">
                <PiAirTrafficControl
                  size={30}
                  className="!font-bold text-green-900 "
                />
              </div>
              <div className="text-center font-bold text-[13px] font-helvetica">
                Attendance
              </div>
            </div>
            <div
              className=" rounded-lg p-2 flex flex-col justify-center items-center  cursor-pointer bg-white opacity-90 text-gray-600"
              onClick={() => clickedTab("salary")}
            >
              <div className="rounded-full  bg-yellow-200 w-[50px] h-[50px] flex justify-center items-center">
                <CreditCard size={30} className="!font-bold text-yellow-500" />
              </div>
              <div className="text-center font-bold text-[13px] font-helvetica">
                Salary
              </div>
            </div>

            <div
              className=" rounded-lg p-2 flex flex-col justify-center items-center  cursor-pointer bg-white opacity-90 text-gray-600"
              onClick={() => clickedTab("performance")}
            >
              <div className="rounded-full  bg-orange-300 w-[50px] h-[50px] flex justify-center items-center">
                <Building size={30} className="!font-bold text-orange-500 " />
              </div>
              <div className="text-center font-bold text-[13px] font-helvetica">
                Performance
              </div>
            </div>

            {/* <div
              className="bg-white rounded-lg p-2  flex flex-col justify-center items-center  cursor-pointer  opacity-90 text-gray-600 "
              // onClick={() => clickedTab('training')}
            >
              <Tooltip title={"Coming soon!"}>
                <div className="rounded-full  bg-red-300 w-[50px] h-[50px] flex justify-center items-center">
                  <CreditCard size={30} className="!font-bold text-red-500 " />
                </div>
              </Tooltip>
              <div className="text-center font-bold text-[13px] font-helvetica">
                Training
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickLink;
