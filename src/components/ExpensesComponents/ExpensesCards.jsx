/* eslint-disable react/prop-types */
// import React from 'react'

import { useEffect, useState } from "react"
import { expensesHistory } from "./data.js"

const ExpensesCards = ({setSelected,expenseNo}) => {
const [selectedCard, setSelectedCard] = useState('')
useEffect(() => {
setSelected('all')
setSelectedCard('all')
}, [])

const handleSelect =(value)=>{
setSelected(value)
setSelectedCard(value)

}
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-4">
      {expensesHistory?.map((expenses,i)=>(
  <div
              key={i}
              className={`${expenses.id==selectedCard?'bg-slate-100':'bg-white'} py-4 cursor-pointer shadow-sm -top border border-[#dfe2e6] flex rounded-t-[0.5rem] items-center justify-between px-4 gap-3`}
              style={{
                boxShadow: "0 3px 3px -2px rgba(39,44,51,.1), 0 3px 4px 0 rgba(39,44,51,.04), 0 1px 8px 0 rgba(39,44,51,.02)"
              }}
              onClick={()=>handleSelect(expenses.id)}
            >
              <div className="flex gap-2 items-center">
                <div
                  className={`rounded-full ${expenses?.b_color} w-[50px] h-[50px] flex justify-center items-center`}
                >
                  <expenses.icon
                    size={25}
                    className={`!font-bold ${expenses.t_color}`}
                  />
                </div>
                <span className="text-[13px] text-[rgb(39, 44, 51)] font-[500] leading-[19.5px]">
                 {expenses.label}
                </span>
              </div>
              <span className="text-[16px] leading-[19.5px] text-[rgba(39, 44, 51, 0.5)] font-[400] font-Roboto">
                  {expenseNo(expenses?.id).length}
                </span>
            </div>
      ))}
      </div>
  )
}

export default ExpensesCards