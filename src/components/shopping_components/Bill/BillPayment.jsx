// import React from 'react'

import Separator from "../../payroll_components/Separator"
import Header from "./Header"
import HistoryTable from "./HistoryTable"

const BillPayment = () => {
  return (
        <div className="py-8 font-helvetica">
      <Header />
     <div className="mb-6">
  <Separator separator_text={'History'}/>
  </div>

      <HistoryTable/>
      </div>
  )
}

export default BillPayment