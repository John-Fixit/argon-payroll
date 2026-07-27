import { LucideRefreshCcw } from "lucide-react";
import { LiaShareSolid } from "react-icons/lia";




const EventUI = () => {
  return (
    <div className="bg-white rounded ">
      <div className="h-52 relative">
        <img
          src="/assets/images/shopevent/event1.jpeg"
          alt="adsimg"
          className="inset-0 h-full w-full object-cover z-2 align-middle rounded-t  "
        />
        <div className="absolute w-full h-full bg-white top-0 opacity-10"></div>

        <div className="absolute top-0 w-full p-4">
        <div className='flex justify-between text-white items-center'>
                <div className='flex flex-col gap-1 leading-tight'>
                  <span className='font-bold text-lg'>Events</span>
                  
                </div>

                <div className='flex gap-x-2 items-start'>
                  <div className='p-1 h-fit rounded-full cursor-pointer lightbtn  z-10 '>
                    <LucideRefreshCcw className=' z-20 p-1  text-white' strokeWidth={4} size={20} />
                  </div>

                  {/* <div className='p-1 h-fit rounded-full cursor-pointer lightbtn  z-10 group'>
                    <SunMedium className=' z-20 group-hover:text-cyan-200' strokeWidth={3}  size={20} />
                  </div> */}
                </div>
              </div>
        </div>
      </div>










      <div className="h-52">
        <div className="flex flex-col p-3 px-4 gap-y-5" >
            <div>
                <div className="flex justify-between items-center">

                    <div>
                        <div className="text-gray-500 text-lg font-extrabold tracking-wide">
                            <span>Christmas 2024</span>
                        </div>
                        <div>
                            <span className="text-xs">26 January 2024</span>
                        </div>
                    </div>

                    <div className="flex gap-3 items-center cursor-pointer bg-xinputLight h-9 p-3 rounded-lg font-extrabold">
                        <span><LiaShareSolid strokeWidth={2}/></span>
                    </div>
                    

                </div>

                <div className="text-gray-400">
                    <span>
                    Lorem Ipsum is simply dummy text of the printing and typesetting
                    industry  <span className="text-gray-500">15256 People Going</span>   
                    </span>
                </div>
            </div>

          <div className="w-fit text-mainColor mt-3">
            <div className="flex gap-3 items-center cursor-pointer bg-xinputLight px-3 py-2 rounded-lg font-extrabold">
              <span>Going / Not Going</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventUI;
