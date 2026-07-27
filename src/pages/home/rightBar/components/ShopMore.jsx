import { LucideRefreshCcw } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { GrFormView } from "react-icons/gr";

const ShopMore = () => {

  // const navigate = useNavigate()

  const moveToShop  = ()=>{
    // navigate('/marketplace/shopping')
  }


  return (
    <div className="flex flex-col bg-white h-full rounded-md subsemi:p-3 p-2 gap-0 overflow-clip">
      <div className="flex justify-between items-center pb-4 pt-1 px-2 ">
        <div className="flex justify-between">
          <div>
            <span className=" font-bold text-md ">Shop More</span>
          </div>
        </div>
        <div className="flex gap-x-2 items-start">
          <div className="p-1 h-fit rounded-full cursor-pointer lightbtn-md  z-10 group">
            <LucideRefreshCcw
              className=" z-20 p-[0.1rem]   text-gray-500"
              size={15}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-[0.35rem]  overflow-clip">
        <div className="bg-gray-500 w-[100%] h-28 cursor-pointer">
          <img
            src="/assets/images/shopevent/bag.webp"
            className=" object-cover h-full w-full shadow"
            alt=""
          />
        </div>
        <div className="bg-pink-500 w-[100%] h-28 cursor-pointer">
          <img
            src="/assets/images/shopevent/phone.webp"
            className=" object-cover h-full w-full"
            alt=""
          />
        </div>
        <div className="bg-yellow-500 w-[100%] h-28 cursor-pointer">
          <img
            src="/assets/images/shopevent/shoe.jpeg"
            className=" object-cover h-full w-full"
            alt=""
          />
        </div>
        <div className="bg-cyan-500 w-[100%] h-28 cursor-pointer">
          <img
            src="/assets/images/shopevent/hat.webp"
            className=" object-cover h-full w-full"
            alt=""
          />
        </div>
        <div className="bg-purple-500 w-full h-[14.35rem] col-span-2 row-span-2 overflow-clip cursor-pointer">
          <img
            src="/assets/images/shopevent/cart.avif"
            className=" object-fill max-w-[100%] h-full align-middle box-border overflow-clip"
            alt=""
          />
        </div>
        <div className="bg-blue-500 w-[100%] h-28 cursor-pointer shadow">
          <img
            src="/assets/images/shopevent/coat.webp"
            className=" object-cover h-full w-full"
            alt=""
          />
        </div>
      </div>

      <div className="flex flex-col mt-3">
        <div className="flex items-center justify-center">
          <button onClick={moveToShop} className="border border-gray-400 px-10 py-1  mx-10 rounded-full text-[0.9rem] hover:shadow active:border-gray-800 flex items-center gap-2 justify-center">
            {/* <GrFormView  /> */}
            {/* <LucideView size={20} /> */}
            <span> View More</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopMore;
