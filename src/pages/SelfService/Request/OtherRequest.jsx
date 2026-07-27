
import Laptop from "../../../assets/images/requestTemplate.png";

const OtherRequest = () => {
  return (
    <div className="flex flex-col py-4">
      <div className="grid xl:grid-cols-[1fr_1.6fr] px-14 gap-10">
        <div className="gap-10 flex flex-col">
          <div className="bg-white border-1 border-gray-300 rounded  w-full h-[33rem] shadow-lg px-6 py-8 relative overflow-clip">
            <div className="flex flex-col gap-12 ">
              <div className="text-green-500 text-3xl font-medium">Letters</div>

              <div className="flex flex-col gap-5 w-[70%] pl-5 ">

                <input className="border-b-2 outline-none"/>
                <input className="border-b-2 outline-none text-lg" value={"Embassy"}/>
                <input className="border-b-2 outline-none text-lg" value={"Bank introduction"}/>
                <input className="border-b-2 outline-none"/>
                <input className="border-b-2 outline-none"/>
        

              </div>
            </div>
                <img
                  src={Laptop}
                  alt="laptop"
                  className="absolute w-40 -bottom-3 -right-10"
                />
          </div>
          <div className="bg-white border-1 border-gray-300 rounded  w-full h-[33rem] shadow-lg">
            
          </div>
        </div>
        <div className="gap-10 flex flex-col">
          <div className="bg-white border-1 border-gray-300 rounded  w-full h-[25rem] shadow-lg px-6 py-8">
                <div className="flex flex-col items-end">
                <div className="text-green-500 text-3xl font-medium flex w-[53%]">ICT</div>

                    <div className="flex flex-col gap-5 w-[56%] pl-5  ">

                    <input className="border-b-2 outline-none"/>
                    <input className="border-b-2 outline-none text-lg" value={"Embassy"}/>
                    <input className="border-b-2 outline-none text-lg" value={"Bank introduction"}/>
                    <input className="border-b-2 outline-none text-lg" value={"Phone recharge"}/>
                    


                    
                    </div>
                </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border-1 border-gray-300 rounded  w-full h-[23rem] shadow-lg">
            <div className="text-green-500 text-3xl font-medium p-4">Letters</div>
            </div>
            <div className="bg-white border-1 border-gray-300 rounded  w-full h-[23rem] shadow-lg">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherRequest;
