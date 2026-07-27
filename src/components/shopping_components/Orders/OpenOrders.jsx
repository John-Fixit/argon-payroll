/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import React from 'react'

import { Button, Image } from "@nextui-org/react"

const OpenOrders = ({orders,view,setCurrentInformation}) => {

const viewDetails=(order)=>{
setCurrentInformation(order)
view()
}
  return (
    <div>
    <ul className="flex flex-col gap-6">
    {orders?.map((order,i)=>(
    <li className="flex justify-between border px-4 py-2 rounded" key={i}>
   <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
     <Image
      width={120}
      alt="NextUI hero Image"
      src={order.img}
    />
    <div>
     <p className="md:text-[18px] font-medium">{order.name.length>50?order.name.substr(0,50)+'...':order.name}</p>
    <p className="text-gray-400 m-0">Order {order.order_no}</p>

    <p className="inline-block bg-green-400 text-white font-medium px-3 py-1 uppercase rounded">Delivered</p>
    <p className="md:text-[16px] font-medium">{order.delivered_date}</p>
    </div>
   </div>
   <Button className="bg-transparent font-medium text-sm md:text-[16px] uppercase text-[#06b6d4] tracking-wide" onClick={()=>viewDetails(order)}>See Details</Button>
    </li>
    ))}
    
    </ul>
    </div>
  )
}

export default OpenOrders