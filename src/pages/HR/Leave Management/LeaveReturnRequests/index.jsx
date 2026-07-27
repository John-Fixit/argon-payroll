/* eslint-disable no-unused-vars */

import { useState } from "react";
import PageHeader from "../../../../components/payroll_components/PageHeader";
import Separator from "../../../../components/payroll_components/Separator";
import LeaveReturnRequestTable from "./LeaveReturnRequestTable";
import ExpandedDrawerWithButton from "../../../../components/modals/ExpandedDrawerWithButton";
import FormDrawer from "../../../../components/payroll_components/FormDrawer";
export default function LeaveReturnRequests() {
  const data = [
    {
      _id: 1,
      staff: "ABAH ISAAC",
      date: "2023-12-01",
      overshootDays: "0",
      resumptionDate: "2023-08-11",
      status: 'Completed'
    },
    {
      _id: 2,
      staff: "ROTIMI AROGUNJO (NCAA/P.85)",
      date: "2023-12-01",
      overshootDays: "0",
      resumptionDate: "2023-08-11",
      status: 'Completed'
    },
    {
      _id: 3,
      staff: "ROTIMI AROGUNJO (NCAA/P.85)",
      date: "2023-12-01",
      overshootDays: "0",
      resumptionDate: "2023-08-11",
      status: 'Pending'
      
      
    },
    {
      _id: 4,
      staff: "ROTIMI AROGUNJO (NCAA/P.85)",
      date: "2023-12-01",
      overshootDays: "0",
      resumptionDate: "30",
      status: 'Completed'
      
      
    },
    {
      _id: 5,
      staff: "ROTIMI AROGUNJO (NCAA/P.85)",
      date: "2023-12-01",
      overshootDays: "0",
      resumptionDate: "2023-08-11",
      status: 'Pending'
      
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
      <PageHeader header_text={'Leave Return Requests'} btnAvailable = {false}/>
        
         {/* leave return list table */}
         <section>
         <Separator separator_text={'Leave Return Requests'}/>

          <LeaveReturnRequestTable rows={data} handleOpenDrawer={handleOpenDrawer}/>
        </section>
      </section>


      {/* <ExpandedDrawerWithButton isOpen={open.status} onClose={handleCloseDrawer}>
        <FormDrawer tabs={[{title: 'Request'}]}>
          View Request {open?.data?.staff}
        </FormDrawer>
      </ExpandedDrawerWithButton> */}
    </>
  );
}
