/* eslint-disable react/prop-types */

import { PiCake } from "react-icons/pi";

const QuickLink = ({ clickedTab }) => {
  return (
    <div className="relative mt-4 subsemi:mt-0 max-h-fit z-0" >
      <div className="rounded h-[22rem] w-full z-1 ">
        <img
          src="/assets/images/birthday-bg.jpg"
          alt="birthdaybg"
          className="absolute inset-0 h-full w-full object-cover z-2 align-middle rounded"
        />

        <div className="blur-up-cover rounded"></div>

        <div className="z-30  absolute text-white top-0 left-0 right-0 p-6 py-0 text-sm">
          <div className="flex justify-between">
            <div className=" text-white p-2 ">
              <span className=" font-semibold text-lg">Quick Links</span>
            </div>
          </div>

          <div className="flex  flex-wrap justify-evenly gap-y-4 gap-x-2  pt-2 items-center h-full  w-[80%] mx-auto">
            <div
              className=" rounded-lg p-2 flex flex-col justify-center items-center shadow cursor-pointer bg-white opacity-90 text-gray-600 w-[85px] gap-y-1"
              onClick={() => clickedTab("service")}
            >
              <div className="rounded-full  bg-gray-200 w-[50px] h-[50px] flex justify-center items-center">
                <PiCake size={25} className="!font-bold " />
              </div>

              <div className=" w-[70px] text-center truncate  text-xs">
                Self Service
              </div>
            </div>

            <div
              className=" rounded-lg p-2 flex flex-col justify-center items-center shadow cursor-pointer bg-white opacity-90 text-gray-600 w-[85px] gap-y-1"
              onClick={() => clickedTab("leave")}
            >
              <div className="rounded-full  bg-gray-200 w-[50px] h-[50px] flex justify-center items-center">
                <PiCake size={25} className="!font-bold " />
              </div>
              <div className=" w-[70px] text-center truncate  text-xs">
                Leave
              </div>
            </div>
            <div
              className=" rounded-lg p-2 flex flex-col justify-center items-center shadow cursor-pointer bg-white opacity-90 text-gray-600 w-[85px] gap-y-1"
              onClick={() => clickedTab("payroll")}
            >
              <div className="rounded-full  bg-gray-200 w-[50px] h-[50px] flex justify-center items-center">
                <PiCake size={25} className="!font-bold " />
              </div>
              <div className=" w-[70px] text-center truncate  text-xs">
                Payroll
              </div>
            </div>
            <div
              className=" rounded-lg p-2 flex flex-col justify-center items-center shadow cursor-pointer bg-white opacity-90 text-gray-600 w-[85px] gap-y-1"
              onClick={() => clickedTab("forms")}
            >
              <div className="rounded-full  bg-gray-200 w-[50px] h-[50px] flex justify-center items-center">
                <PiCake size={25} className="!font-bold " />
              </div>
              <div className=" w-[70px] text-center truncate  text-xs">
                Request
              </div>
            </div>
            {/* <div
              className=" rounded-lg p-2 flex flex-col justify-center items-center shadow cursor-pointer bg-white opacity-90 text-gray-600 w-[85px] gap-y-1"
              onClick={() => clickedTab("forms")}
            >
              <div className="rounded-full  bg-gray-200 w-[50px] h-[50px] flex justify-center items-center">
                <PiCake size={25} className="!font-bold " />
              </div>
              <div className=" w-[70px] text-center truncate  text-xs">
                Request
              </div>
            </div>
            <div
              className=" rounded-lg p-2 flex flex-col justify-center items-center shadow cursor-pointer bg-white opacity-90 text-gray-600 w-[85px] gap-y-1"
              onClick={() => clickedTab("forms")}
            >
              <div className="rounded-full  bg-gray-200 w-[50px] h-[50px] flex justify-center items-center">
                <PiCake size={25} className="!font-bold " />
              </div>
              <div className=" w-[70px] text-center truncate  text-xs">
                Request
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickLink;
