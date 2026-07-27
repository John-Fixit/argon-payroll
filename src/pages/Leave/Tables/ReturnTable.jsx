/* eslint-disable react/prop-types */
// import React from 'react'

import { Tab, Tabs } from "@nextui-org/react"
import { useState } from "react";
import { returnColumns, returnTableData } from "../../../components/Leave/data";
import ReturnHistoryTable from "../../../components/Leave/ReturnHistoryTable";

const ReturnTable = ({setCurrentView,view,resume}) => {
const [selectedTableData, setSelectedTableData] = useState([])

const select=(value)=>{
  if (value=='Pending') {
      setSelectedTableData(returnTableData.filter(data=>data.status=='pending'))
    }
    else if (value=='Approved') {
      setSelectedTableData(returnTableData.filter(data=>data.status=='approved'))
    }
}

const optionTabs=[
   {
  id:'pending',
  label:'Pending',
   content: ReturnHistoryTable,
  },
   {
  id:'approved',
  label:'Approved',
   content: ReturnHistoryTable,
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
onSelectionChange={select}
>
{(item)=>(
<Tab key={item.label} title={item.label} >
{<item.content tableData={selectedTableData}
        setCurrentView={setCurrentView}
       columns = {returnColumns}
        view={view}
        resume={resume}/>}
</Tab>
)}
</Tabs>
      </div>
  )
}

export default ReturnTable