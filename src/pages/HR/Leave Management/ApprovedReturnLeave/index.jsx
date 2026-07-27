/* eslint-disable no-unused-vars */

import { useState } from "react";
import PageHeader from "../../../../components/payroll_components/PageHeader";
import Separator from "../../../../components/payroll_components/Separator";
import ApprovedReturnLeaveTable from "./ApprovedReturnLeaveTable";
import ExpandedDrawerWithButton from "../../../../components/modals/ExpandedDrawerWithButton";
import FormDrawer from "../../../../components/payroll_components/FormDrawer";
export default function ApprovedReturnLeave() {
  const data = [
    {
      _id: 1,
      staff: "ROTIMI AROGUNJO (NCAA/P.85)",
      date: "2023-12-01",
      type: "Annual",
      duration: "30",
      startDate: '2023-12-11',
      endDate: '2023-12-11',
      resumptionDate: '2023-12-11',
      leaveBalance: '0',
      leaveReturnDate: '2023-02-09',
      currentApproval: 'Level 2',
      
    },
    {
      _id: 2,
      staff: "ROTIMI AROGUNJO (NCAA/P.85)",
      date: "2023-12-01",
      type: "Annual",
      duration: "30",
      startDate: '2023-12-11',
      endDate: '2023-12-11',
      resumptionDate: '2023-12-11',
      leaveBalance: '0',
      leaveReturnDate: '2023-02-09',
      currentApproval: 'Level 2',
      
    },
    {
      _id: 3,
      staff: "ROTIMI AROGUNJO (NCAA/P.85)",
      date: "2023-12-01",
      type: "Annual",
      duration: "30",
      startDate: '2023-12-11',
      endDate: '2023-12-11',
      resumptionDate: '2023-12-11',
      leaveBalance: '0',
      leaveReturnDate: '2023-02-09',
      currentApproval: 'Level 2',
      
    },
    {
      _id: 4,
      staff: "ROTIMI AROGUNJO (NCAA/P.85)",
      date: "2023-12-01",
      type: "Annual",
      duration: "30",
      startDate: '2023-12-11',
      endDate: '2023-12-11',
      resumptionDate: '2023-12-11',
      leaveBalance: '0',
      leaveReturnDate: '2023-02-09',
      currentApproval: 'Level 2',
      
    },
    {
      _id: 5,
      staff: "ROTIMI AROGUNJO (NCAA/P.85)",
      date: "2023-12-01",
      type: "Annual",
      duration: "30",
      startDate: '2023-12-11',
      endDate: '2023-12-11',
      resumptionDate: '2023-12-11',
      leaveBalance: '0',
      leaveReturnDate: '2023-02-09',
      currentApproval: 'Level 2',
      
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
      <PageHeader header_text={'Leave Return Requests Awaiting Approvals'} btnAvailable = {false}/>
        
         {/* leave return request await approval list table */}
         <section>
         <Separator separator_text={'Return Approved'}/>

          <ApprovedReturnLeaveTable rows={data} handleOpenDrawer={handleOpenDrawer}/>
        </section>
      </section>


      <ExpandedDrawerWithButton isOpen={open.status} onClose={handleCloseDrawer}>
        <FormDrawer tabs={[{title: 'Request'}]}>
          View Request {open?.data?.staff}
        </FormDrawer>
      </ExpandedDrawerWithButton>
    </>
  );
}
