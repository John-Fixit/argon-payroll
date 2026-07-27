/* eslint-disable no-unused-vars */
// import React from 'react'

import { Tab, Tabs } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { orders } from "../../components/shopping_components/Orders/data"
import Drawer from "../../components/Request&FormComponent/Drawer"
import OrderDetails from "../../components/shopping_components/Orders/OrderDetails"
import MyShoppings from "../../components/shopping_components/Orders/MyShoppings"
import MyTraining from "../../components/shopping_components/Training/MyTraining"
import Loan from "../../components/shopping_components/Loan/Loan"
import BillPayment from "../../components/shopping_components/Bill/BillPayment"
import MyCourses from "../../components/CoursesComponent/MyCourses"

const Orders = () => {
const [currentInformation, setCurrentInformation] = useState({})
const [openOrders, setOpenOrders] = useState([])
const [closedOrders, setClosedOrders] = useState([])
const [isOpen, setIsOpen] = useState(false);
const [sideBarNeeded, setSideBarNeeded] = useState(true);

useEffect(() => {
setOpenOrders(orders.filter(order=>order.status==='delivered'))
setClosedOrders(orders.filter(order=>order.status==='unsuccessful_payment'))
}, [])


   const view = () => {
    setSideBarNeeded(false);
    setIsOpen(true);
  };


const optionTabs=[
  {
  id:'shopping',
  label:'Shopping',
   content:<MyShoppings view={view} setCurrentInformation={setCurrentInformation} closedOrders={closedOrders} openOrders={openOrders} />,
  },
  {
  id:'courses',
  label:'Courses',
   content:<MyCourses/>,
  },
  {
  id:'training',
  label:'Training',
  content:<MyTraining/>,
  },
  {
  id:'loan',
  label:'Loan',
  content:<Loan/>,
  },
  {
  id:'bills_payment',
  label:'Bills Payment',
  content:<BillPayment/>,
  },
  ]
  return (
<div>
<Tabs 
items={optionTabs} 
color="secondary"
classNames={{
tabList:'bg-slate-200 text-medium',
}} 
>
{(item)=>(
<Tab key={item.id} title={item.label}>
{item.content}
</Tab>
)}
</Tabs>
        <Drawer isOpen={isOpen} setIsOpen={setIsOpen} sideBarNeeded={sideBarNeeded}>
        <OrderDetails currentInformation={currentInformation}/>
        </Drawer>
</div>
  )
}

export default Orders