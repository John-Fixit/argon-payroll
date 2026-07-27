/* eslint-disable no-unused-vars */

import { useState } from "react";
import StaffVarationSummaryTable from "./StaffVarationSummaryTable";
import Separator from "../../../../../components/payroll_components/Separator";
export default function StaffVariationSummary() {
  const data = [
    {
      _id: 1,
      staffNo: "P1806",
      name: "ABAH ISAAC",
      payment: "332,872.02",
      deduction: "26,646.60",
      comment: ''
    },
    {
      _id: 2,
      staffNo: "P1806",
      name: "ABAH ISAAC",
      payment: "332,872.02",
      deduction: "26,646.60",
      comment: ''
    },
    {
      _id: 3,
      staffNo: "P1806",
      name: "ABAH ISAAC",
      payment: "332,872.02",
      deduction: "26,646.60",
      comment: ''
      
      
    },
    {
      _id: 4,
      staffNo: "P1806",
      name: "ABAH ISAAC",
      payment: "332,872.02",
      deduction: "26,646.60",
      comment: ''
      
      
    },
    {
      _id: 5,
      staffNo: "P1806",
      name: "ABAH ISAAC",
      payment: "332,872.02",
      deduction: "26,646.60",
      comment: ''
      
    },
    
  ];

  const [open, setOpen] = useState({status: false, data: null})

  const handleOpenDrawer=(data)=>{
    setOpen({...open, status: true, data})
  }

  const handleCloseDrawer=()=>{
    setOpen({...open, status: false})
  }
  return (
    <>
      <section className="">
         <section>
         <Separator separator_text={'Staff Variation Summary'}/>

          <StaffVarationSummaryTable rows={data} handleOpenDrawer={handleOpenDrawer}/>
        </section>
      </section>
    </>
  );
}
