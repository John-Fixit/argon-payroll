/* eslint-disable react/prop-types */
// import React from 'react'

import ClosedOrders from "./ClosedOrders"
import OpenOrders from "./OpenOrders"
import { Tab, Tabs } from "@nextui-org/react"

const MyShoppings = ({view,setCurrentInformation,closedOrders,openOrders}) => {
const orderTabs=[
  {
  id:'open_orders',
  label:'Open Orders',
  content:<OpenOrders view={view} setCurrentInformation={setCurrentInformation} orders={openOrders}/>,
  },
  {
  id:'closed_orders',
  label:'Closed Order',
  content:<ClosedOrders view={view} setCurrentInformation={setCurrentInformation} orders={closedOrders}/>,
  },
  ]
  return (
     <div className="my-6 bg-white rounded-md px-6 py-4 shadow min-h-[80vh]">
<h1 className="border-b mb-6">Orders</h1>
  <Tabs
          aria-label="Dynamic tabs"
          items={orderTabs}
          color="primary"
          variant="underlined"
          classNames={{
            tabList:
              "gap-6 w-full relative  rounded-none p-0 text-lg border-divider",
            cursor: "w-full bg-[#22d3ee]",
            tabContent: "group-data-[selected=true]:text-[#06b6d4] font-medium uppercase",
          }}
        >
          {(item) => (
            <Tab key={item.id} title={item.label} className="px-0">
             
      {item.content}
            </Tab>
          )}
        </Tabs>

    </div>
  )
}

export default MyShoppings