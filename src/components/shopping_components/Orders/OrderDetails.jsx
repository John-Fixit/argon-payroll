/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Button, Image } from "@nextui-org/react";
import { BsArrowCounterclockwise } from "react-icons/bs";

const OrderDetails = ({ currentInformation }) => {
  return (
    <div className="bg-white rounded shadow">
      <h1 className="border-b px-6 py-1 my-4">Order Details</h1>
      <div className="my-4 mx-6">
        <ul className="text-gray-400">
          <li className="text-black font-medium text-medium">
            Order no 5467890
          </li>
          <li>1 item</li>
          <li>Placed on 02-03-2024</li>
          <li>Total: ₦ 16,740.00</li>
        </ul>

        <div className="my-6">
          <p className="font-medium uppercase my-1 px-4">Items in your Order</p>
          <div className="flex flex-col gap-6">
            {[1].map((item, i) => (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 border px-4 py-3 rounded" key={i}>
          <div className="md:col-span-3">
          
          {currentInformation.status=='delivered'&&<p className="inline-block bg-green-400 text-white font-medium px-3 py-1 uppercase rounded">Delivered</p>}
          {currentInformation.status=='unsuccessful_payment'&&<p className="inline-block bg-gray-400 text-white px-1 uppercase rounded-sm text-xs">Cancelled - Payment unsuccessful</p>}
          <p className="md:text-[16px] font-medium">{currentInformation.delivered_date}</p>
          <p className="text-gray-400 m-0">May be eligible for return within 7 days for marketplace items and official stores untill Monday, 11-03</p>
 <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
     <Image
      width={120}
      alt="NextUI hero Image"
      src={currentInformation.img}
    />
    <div>
     <p className="md:text-[16px] font-medium">{currentInformation.name.length>50?currentInformation.name.substr(0,50)+'...':currentInformation.name}</p>
<p className="text-gray-400 my-2">QTY: 1</p>
<p className="font-medium"><span>{currentInformation.price}</span> <span className="line-through text-gray-400">₦64,800.00</span></p>
    </div>
   </div>
   <p className="mt-6 flex flex-col md:flex-row md:items-center gap-1"><p className="flex items-center gap-1"><BsArrowCounterclockwise size={20} /> <span>Return possible until (11-3-2024)</span></p> <a href="#" className=" text-sm outline-none">Access our Return Policy</a></p>
          </div>
          <div className="flex flex-col gap-3">
          <Button className="w-full uppercase font-medium rounded-[5px] bg-[#06b6d4] text-white shadow-md">Buy again</Button>
          <Button className="w-full uppercase font-medium rounded-[5px] bg-transparent border border-[#06b6d4] text-[#06b6d4] hover:bg-[#06b6d4] hover:text-white px-4">Request a return</Button>
          <Button className="w-full uppercase font-medium rounded-[5px] bg-transparent text-[#06b6d4] px-4">See Status History</Button>
          </div>
          </div>
            ))}
          </div>
        </div>
        <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded py-2">
          <p className="font-medium uppercase border-b px-4 pb-2">Order Information</p>
          <div className="px-4 my-2">
          <p className="font-medium">
            Payment Methods
          </p>
           <p className="text-gray-400 text-xs m-0">
           Pay with Cards, Bank Transfer or USSD
        </p>
          </div>
          <div className="px-4 my-6">
          <p className="font-medium">
            Payment Details
          </p>
           <ul className="text-gray-400 text-xs tracking-wide leading-6">
          <li>Items total: ₦ 8,180.00</li>
          <li>Delivery Fees: ₦ 1,240.00</li>
          <li>Coupon Discount: ₦ 2,279.00</li>
          <li>Total: ₦ 7,141.00</li>
        </ul>
          </div>
          </div>
          <div className="border rounded py-2">
          <p className="font-medium uppercase border-b px-4 pb-2">Delivery Information</p>
          <div className="px-4 my-2">
          <p className="font-medium">
            Delivery Methods
          </p>
           <p className="text-gray-400 text-xs m-0">
           Door Delivery
        </p>
          </div>
          <div className="px-4 my-6">
          <p className="font-medium">
           Shipping Address
          </p>
           <ul className="text-gray-400 text-xs tracking-wide leading-6">
          <li>Adeoye John</li>
          <li>4 Kate Gada Str, Igwe Ngbe, Abule Egba(Ekoro Road)</li>
          <li>Abule Egba (Ekoro Road) Lagos</li>
        </ul>
          </div>
          <div className="px-4 my-6">
          <p className="font-medium">
           Shipping Details
          </p>
           <ul className="text-gray-400 text-xs tracking-wide leading-6">
          <li>Door Delivery. Fulfilled by Green Channel</li>
          <li>Delivery between <b>19 February</b> and <b>20 February</b></li>
          <li>Abule Egba (Ekoro Road) Lagos</li>
        </ul>
          </div>
          </div>
       
        </div>
        <p className="uppercase text-center font-medium text-[#06b6d4]">Need Help?</p>
      </div>
    </div>
  );
};

export default OrderDetails;
