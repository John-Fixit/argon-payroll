/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Aperture, Building, CreditCard } from "lucide-react";
import { FaSimCard } from "react-icons/fa";
import { RiMovieFill } from "react-icons/ri";
import { MdHome, MdElectricBolt } from "react-icons/md";
import {
  PiAirTrafficControl,
  PiTreePalmThin,
  PiShoppingCartSimpleFill,
  PiDatabaseFill,
  PiTelevisionFill,
} from "react-icons/pi";
import ExpandedDrawerWithButton from "../../components/modals/ExpandedDrawerWithButton";
const ServicesQuickLinks = ({ clickedTab }) => {
  const quickLinks = [
    { name: "Buy airtime", _color: "text-yellow-600", bg_color: "bg-yellow-200", icon: FaSimCard },
    { name: "Buy data", _color: "text-green-600", bg_color: "bg-green-200", icon: PiDatabaseFill },
    { name: "Electricity", _color: "text-blue-600", bg_color: "bg-blue-200", icon: MdElectricBolt },
    { name: "DSTV/GoTV", _color: "text-orange-600", bg_color: "bg-orange-200", icon: PiTelevisionFill },
    { name: "Pay merchant", _color: "text-red-600", bg_color: "bg-red-200", icon: CreditCard },
    { name: "Create order", _color: "text-purple-600", bg_color: "bg-purple-200", icon: PiShoppingCartSimpleFill },
    { name: "Buy movies", _color: "text-lime-600", bg_color: "bg-lime-200", icon: RiMovieFill },
    { name: "Buy HMO", _color: "text-violet-600", bg_color: "bg-violet-200", icon: Aperture },
    { name: "Rent", _color: "text-orange-600", bg_color: "bg-orange-200", icon: MdHome },
  ];

  const [open, setOpen] = useState({status: false, quickLinkIndex: null});
  
  const handleOpenDrawer = (index) => {
   setOpen({status: true, quickLinkIndex: index})
  }
  const handleCloseDrawer = () => {
    setOpen({status: false})
  }

  return (
    <>
    <div className="rounded-lg bg-white py-2 shadow-sm order-last md:order-last">
      <div className="text-sm flex flex-col">
        <div className="flex  px-[1.8rem] items-start">
          <span className="text-gray-700 font-poppins font-semibold text-lg">
            {/* Our Services */}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-x-4  gap-y-1 place-items-center  pt-2 h-full ">
          {quickLinks?.map((item, index) => {
            return (
              <div
                key={index}
                className=" rounded-lg p-2 flex flex-col justify-center items-center w-[85px] gap-y-1 "
              >
                <div
                  className={`rounded-full ${item?.bg_color} w-[48px] h-[48px] flex justify-center items-center cursor-pointer`}
                  onClick={() => handleOpenDrawer(index)}
                >
                  <item.icon
                    size={23}
                    className={`!font-bold ${item._color}`}
                  />
                </div>

                <div
                  // href='/training'
                  className=" w-[70px] text-center mxauto  truncate  text-xs"
                >
                  {item?.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>

    <ExpandedDrawerWithButton isOpen={open.status} onClose={handleCloseDrawer} maxWidth={'35rem'}>
        <div className="my-10 px-3">
          {
            open.quickLinkIndex===0?("Buy Airtime"):  open.quickLinkIndex===1?("Buy data"):  open.quickLinkIndex===2?("Electrucity"): open.quickLinkIndex===3?("DSTV/GoTV"): ("Coming soon")
          }
        </div>
      </ExpandedDrawerWithButton>
    </>
  );
};

export default ServicesQuickLinks;
