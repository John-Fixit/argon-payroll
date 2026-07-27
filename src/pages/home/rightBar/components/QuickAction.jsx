/* eslint-disable react/prop-types */
import { PiCake } from "react-icons/pi";


const QuickAction = ({clickedTab}) => {


  return (
    <div className="h-fit pb-4 shadow rounded-lg relative bg-gray-200 overflow-clip">
      <div className="flex flex-col rounded-lg  gap-2">
        <div className=" bg-gray-300 p-2 ">
          <span className=" font-semibold">Quick Links</span>
        </div>

        <div className="">
          <div className="z-40  text-white top-0 left-0 right-0 px-3 text-sm">
            <div className="flex  flex-wrap justify-evenly gap-y-4 gap-x-2  pt-2 items-center h-full">
              <div className=" rounded-lg p-2 flex flex-col justify-center items-center shadow cursor-pointer bg-white opacity-80 text-gray-600 w-[85px] gap-y-1" onClick={()=>clickedTab('service')}>
                {/* <img
                  src="assets/images/center-profile.jpeg"
                  className="rounded-full z-30  w-[50px] h-[50px]"
                  alt=""
                /> */}
                <div className="rounded-full  bg-gray-200 w-[50px] h-[50px] flex justify-center items-center">
                   <PiCake size={25} className='!font-bold ' />
                </div>

                <div className=" w-[70px] text-center truncate  text-xs">
                  Self Service
                </div>
              </div>

              <div className=" rounded-lg p-2 flex flex-col justify-center items-center shadow cursor-pointer bg-white opacity-80 text-gray-600 w-[85px] gap-y-1" onClick={()=>clickedTab('leave')}>
                  <div className="rounded-full  bg-gray-200 w-[50px] h-[50px] flex justify-center items-center">
                      <PiCake size={25} className='!font-bold ' />
                    </div>
                <div className=" w-[70px] text-center truncate  text-xs">
                  Leave
                </div>
              </div>
              <div className=" rounded-lg p-2 flex flex-col justify-center items-center shadow cursor-pointer bg-white opacity-80 text-gray-600 w-[85px] gap-y-1" onClick={()=>clickedTab('payroll')}>
                  <div className="rounded-full  bg-gray-200 w-[50px] h-[50px] flex justify-center items-center">
                      <PiCake size={25} className='!font-bold ' />
                  </div>
                <div className=" w-[70px] text-center truncate  text-xs">
                  Payroll
                </div>
              </div>
              <div className=" rounded-lg p-2 flex flex-col justify-center items-center shadow cursor-pointer bg-white opacity-80 text-gray-600 w-[85px] gap-y-1" onClick={()=>clickedTab('forms')}>
                    <div className="rounded-full  bg-gray-200 w-[50px] h-[50px] flex justify-center items-center">
                        <PiCake size={25} className='!font-bold ' />
                      </div>
                <div className=" w-[70px] text-center truncate  text-xs">
                  Request
                </div>
              </div>
              {/* <div className=" rounded-lg p-2 flex flex-col justify-center items-center shadow cursor-pointer bg-white opacity-80 text-gray-600 w-[85px] gap-y-1">
                <img
                  src="assets/images/center-profile.jpeg"
                  className="rounded-full z-30  w-[50px] h-[50px]"
                  alt=""
                />
                <div className=" w-[70px] text-center truncate  text-xs">
                  IT
                </div>
              </div> */}
              {/* <div className=" rounded-lg p-2 flex flex-col justify-center items-center shadow cursor-pointer bg-white opacity-80 text-gray-600 w-[85px] gap-y-1">
                <img
                  src="assets/images/center-profile.jpeg"
                  className="rounded-full z-30  w-[50px] h-[50px]"
                  alt=""
                />
                <div className=" w-[70px] text-center truncate  text-xs">
                  Training
                </div>
              </div> */}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickAction;
