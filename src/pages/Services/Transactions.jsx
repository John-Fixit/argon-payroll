/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Aperture, Building, CreditCard } from "lucide-react";
import { FaSimCard } from "react-icons/fa";
import { RiMovieFill } from "react-icons/ri";
import { MdHome, MdElectricBolt } from "react-icons/md";
import { PiShoppingCartSimpleFill, PiTelevisionFill } from "react-icons/pi";
import RoundedIcon from "./RoundedIcon";
import { LuArrowLeftToLine } from "react-icons/lu";
import { Button } from "@nextui-org/react";
import ExpandedDrawerWithButton from "../../components/modals/ExpandedDrawerWithButton";
import TransactionReciept from "./TransactionReciept";

const Transactions = ({ showMoreBtn, transactionData, handleOpenDrawer }) => {
  const transactions = [
    {
      name: "Buy airtime",
      color: "yellow",
      icon: FaSimCard,
      subText: "MTN",
      amount: 5000,
    },
    {
      name: "Create order",
      color: "purple",
      icon: PiShoppingCartSimpleFill,
      subText: "MTN",
      amount: 12000,
    },
    {
      name: "Pay merchant",
      color: "red",
      icon: CreditCard,
      subText: "Adeyemi Paul",
      amount: 25000,
    },
    {
      name: "DSTV/GoTV",
      color: "orange",
      icon: PiTelevisionFill,
      subText: "Regular package",
      amount: 10000,
    },
    {
      name: "Buy HMO",
      color: "violet",
      icon: Aperture,
      subText: "Silver package",
      amount: 10000,
    },
    {
      name: "Electricity",
      color: "blue",
      icon: MdElectricBolt,
      subText: "Regular package",
      amount: 10000,
    },
  ];

  //handle open side drawer
  const [open, setOpen] = useState(false)
  
 const openDrawer = () => {
  setOpen(true)
 }
 const closeDrawer = () => {
  setOpen(false);
 }

  return (
    <>
    <div className="rounded-lg bg-white py-2 shadow-sm p-3 order-first md:order-last">
      <div className="text-sm flex flex-col">
        <div className="flex items-start">
          <span className="text-gray-700 font-poppins font-semibold text-lg">
            Top purchase
          </span>
        </div>
        <div className="my-2">
          {(transactionData ? transactionData : transactions)?.map(
            (item, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-between border-b border-b-1 py-3 cursor-pointer"
                  onClick={openDrawer}
                >
                  <div className="flex space-x-2">
                    <RoundedIcon icon={item.icon} color={item.color} />
                    <div className="text-black flex flex-col space-y-2">
                      <p className="font-semibold leading-3 font-poppins">
                        {item?.name}
                      </p>
                      <span
                        className={"text-[#475367] flex items-center space-x-2"}
                      >
                        <LuArrowLeftToLine />{item?.subText}
                      </span>
                    </div>
                  </div>
                  <p className="my-auto text-[#DF1205] text-[15px] font-semibold font-poppins">
                    -N{item?.amount}
                  </p>
                </div>
              );
            }
          )}
        </div>
        {showMoreBtn && (
          <Button color="primary" className="mt-4" onClick={handleOpenDrawer}>
            See all
          </Button>
        )}
      </div>
    </div>


    <ExpandedDrawerWithButton sideBarNeeded={false} isOpen={open} onClose={closeDrawer} maxWidth={'40rem'}>
          <div className="my-10">
            <TransactionReciept />
          </div>
      </ExpandedDrawerWithButton>
    </>
  );
};

export default Transactions;
