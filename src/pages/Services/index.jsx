/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./services.css";
import product from "../../assets/images/iphone.jpg";
import bill from "../../assets/images/bill.png";
import product2 from "../../assets/images/summer-shade.jpg";
import ServicesQuickLinks from "./ServicesQuickLinks";
import Transactions from "./Transactions";
import { MdElectricBolt } from "react-icons/md";
import { Aperture, CreditCard } from "lucide-react";
import { FaSimCard } from "react-icons/fa";
import { PiShoppingCartSimpleFill, PiTelevisionFill } from "react-icons/pi";
import ExpandedDrawerWithButton from "../../components/modals/ExpandedDrawerWithButton";
import { Button } from "@nextui-org/react";


export default function Services() {
  const transactionData= [
    {name: "Buy airtime", color: "yellow", icon: FaSimCard, subText: "MTN", amount: 5000},
    {name: "Create order", color: "purple", icon: PiShoppingCartSimpleFill, subText: "MTN", amount: 12000},
  {name: "Pay merchant", color: "red", icon: CreditCard, subText: "Adeyemi Paul", amount: 25000},
  {name: "DSTV/GoTV", color: "orange", icon: PiTelevisionFill, subText: "Regular package", amount: 10000},
  {name: "Buy HMO", color: "violet", icon: Aperture, subText: "Silver package", amount: 10000},
  {name: "Electricity", color: "blue", icon: MdElectricBolt, subText: "Regular package", amount: 10000},
    {name: "Buy airtime", color: "yellow", icon: FaSimCard, subText: "MTN", amount: 5000},
    {name: "Create order", color: "purple", icon: PiShoppingCartSimpleFill, subText: "MTN", amount: 12000}
  ]

 const [open, setOpen] = useState(false)
  
 const handleOpenDrawer = () => {
  setOpen(true)
 }
 const handleCloseDrawer = () => {
  setOpen(false);
 }
  const clickTab=(val)=>{
    // console.log(val)
  }



  return (
    <>
      <h1 className="font-semibold my-3 text-[25px] font-poppins text-[#000000]">
        Services
      </h1>
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
          <div className="flex flex-col space-y-7 hidden md:block">
          <div className="w-full">
                <p className="font-medium font-poppins text-[35px] my-2 tracking-3 text-[#000000]">
                  Start Making Bill Payment
                </p>
                <Button color="primary" className="mt-4 w-full" onClick={handleOpenDrawer}>
            See all
          </Button>
                {/* <img
                  alt="Bill payment"
                  src={bill}
                  className="object-cover h-auto w-full"
                /> */}
              </div>
            {/* <div className="flex space-x-3 h-[208px]">
              <div className="clippy_bg flex flex-col text-center gap-2 pt-5 w-[100px] h-[208px] bg-[#3F83F8]">
                <p className="text-white font-semibold text-md font-poppins">
                  Special Offers
                </p>
                <span className="text-white text-medium font-[16px]">
                  $1,100
                </span>
              </div>
              <div className="w-full">
                <p className="font-semibold font-poppins text-[15px] tracking-3 text-[#000000]">
                  Iphone 14 Pro
                </p>
                <img
                  alt="NextUI hero Image"
                  src={product}
                  className="object-cover h-[185px] w-full"
                />
              </div>
            </div>
            <div className="flex space-x-3 h-[208px]">
              <div className="clippy_bg flex flex-col text-center gap-2 pt-5 w-[100px] h-[208px] bg-[#3F83F8]">
                <p className="text-white font-semibold text-md font-poppins">
                  Special Offers
                </p>
                <span className="text-white text-medium font-[16px]">
                  $1,100
                </span>
              </div>
              <div className="w-full">
                <p className="font-semibold font-poppins text-[15px] tracking-3 text-[#000000]">
                  Summer Shade
                </p>
                <img
                  alt="NextUI hero Image"
                  src={product2}
                  className="object-cover h-[185px] w-full"
                />
              </div>
            </div> */}
            
          </div>
          <ServicesQuickLinks clickedTab={clickTab}/>
          <Transactions showMoreBtn={true} handleOpenDrawer={handleOpenDrawer}/>
        </div>
      </section>

      <ExpandedDrawerWithButton isOpen={open} onClose={handleCloseDrawer} maxWidth={620}>
        <div className="my-10">
            <Transactions showMoreBtn={false} transactionData={transactionData}/>
        </div>
      </ExpandedDrawerWithButton>


    </>
  );
}
